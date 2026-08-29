var rule = {
  title: "4k",
  host: "https://www.4kdyws.top",
  homeUrl: "https://www.4kdyws.top",
  url: "/vodcate/fyclass.html",
  searchUrl: "https://www.4kdyws.top/api/show/v2/search/**/1",
  searchable: 2,
  headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36', 'Referer': "https://www.4kdyws.top" },
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视剧&动漫&综艺",
  class_url: "1&2&3&4",
  // 推荐/一级：列表;标题;图片;描述;链接（首页/分类为 SSR 直出，可用）
  推荐: "ul.stui-vodlist li;a&&title;.stui-vodlist__thumb&&data-original;;a&&href",
  一级: "ul.stui-vodlist li;a&&title;.stui-vodlist__thumb&&data-original;pic-text&&Text;a&&href",
  // 搜索：本站为 Nuxt SPA，搜索走 JSON 接口 /api/show/v2/search/{wd}/{page}
  //      引擎把 input 设为搜索 URL、KEY 设为关键字；结果写入全局 VODS（非 return）
  搜索: $js.toString(() => {
    var wd = (typeof KEY !== 'undefined' && KEY) ? String(KEY) : '';
    if (!wd && typeof input === 'string') {
      var mm = input.match(/\/search\/([^/]+)\//);
      wd = mm ? decodeURIComponent(mm[1]) : '';
    }
    var base = (typeof input === 'string' && input.match(/^https?:\/\/[^/]+/)) ? input.match(/^https?:\/\/[^/]+/)[0] : 'https://www.4kdyws.top';
    var api = base + '/api/show/v2/search/' + encodeURIComponent(wd) + '/1';
    var json = JSON.parse(request(api));
    var vods = (json && json.data && json.data.vods) || [];
    VODS = [];
    for (var i = 0; i < vods.length; i++) {
      var v = vods[i];
      VODS.push({
        vod_id: base + '/voddetail/' + v.vodId + '.html',
        vod_name: v.vodName || '',
        vod_pic: v.vodPic || '',
        vod_remarks: v.vodLastRemarks || ''
      });
    }
  }),
  // 二级：本站详情页为 SSR 仅含前 2 集，全量选集在 JSON 接口 /api/show/v2/vod/{id} 的 vod_play 里。
  //      由接口重建 /vodplay/{id}-{sid}-{nid}.html 链接（sid=源序, nid=集序），play 函数照常抽取 m3u8。
  //      引擎把 input 设为详情 URL，结果写入全局 VOD（setResult 亦兼容）。
  二级: $js.toString(() => {
    var u = String(input || '');
    var m = u.match(/voddetail\/(\d+)/) || u.match(/(\d+)\.html/);
    var id = m ? m[1] : '';
    var base = (u.match(/^https?:\/\/[^/]+/)) ? u.match(/^https?:\/\/[^/]+/)[0] : 'https://www.4kdyws.top';
    VOD = {};
    VOD.vod_name = ''; VOD.vod_pic = ''; VOD.vod_content = ''; VOD.vod_play_from = '播放'; VOD.vod_play_url = '';
    if (id) {
      try {
        var json = JSON.parse(request(base + '/api/show/v2/vod/' + id));
        var data = (json && json.data) || {};
        VOD.vod_name = data.vodName || '';
        VOD.vod_pic = data.vodPic || '';
        VOD.vod_content = data.vodContent || data.vodBlurb || '';
        var plays = data.vod_play || [];
        var froms = [], urls = [];
        for (var i = 0; i < plays.length; i++) {
          var s = plays[i];
          var name = (s.collectSource && s.collectSource.webName) ? s.collectSource.webName : ('源' + (i + 1));
          var pu = s.vodPlayUrl || '';
          var eps = pu.split('#');
          var rebuilt = [];
          for (var k = 0; k < eps.length; k++) {
            var seg = eps[k].split('$');
            var epName = seg[0] || ('第' + (k + 1) + '集');
            var sid = i + 1, nid = k + 1;
            rebuilt.push(epName + '$' + base + '/vodplay/' + id + '-' + sid + '-' + nid + '.html');
          }
          if (rebuilt.length) { froms.push(name); urls.push(rebuilt.join('#')); }
        }
        VOD.vod_play_from = froms.join('$$$') || '播放';
        VOD.vod_play_url = urls.join('$$$');
      } catch (e) {}
    }
    setResult(VOD);
  }),
  tab_rename: {"极速一":"君子兰①","极速二":"君子兰②","极速三":"君子兰③","极速四":"君子兰④"},
  play: $js.toString(() => {
  var u = String(input).split('$').pop();
  var playHtml = request(u);
  playHtml = playHtml.split(String.fromCharCode(92) + '/').join('/');
  var m3u8 = '';
  var m = u.match(/-(\d+)-(\d+)\.html$/);
  var src = m ? parseInt(m[1], 10) : 1;
  var ep = m ? parseInt(m[2], 10) : 1;
  var blocks = playHtml.match(/"第0?1集\$https?:\/\/[^"]*"/g) || [];
  var block = blocks[src - 1] || blocks[0] || '';
  if (block) {
    block = block.replace(/^"|"$/g, '');
    var eps = block.split('#');
    for (var k = 0; k < eps.length; k++) {
      var mm = eps[k].match(/https?:\/\/[^"']+?\.m3u8/);
      if (mm) {
        if (k === ep - 1) { m3u8 = mm[0]; break; }
        if (!m3u8) m3u8 = mm[0];
      }
    }
  }
  if (!m3u8) {
    var sm = playHtml.match(/https?:\/\/[^"'<>]+?\.(?:m3u8|mp4)[^"'<>]*/i);
    if (sm) m3u8 = sm[0];
  }
  if (!m3u8) {
    var jm = playHtml.match(/"url"\s*:\s*"([^"]+)"/gi);
    if (jm) {
      for (var j = 0; j < jm.length; j++) {
        var ju = jm[j].match(/:"([^"]+)"/)[1].split(String.fromCharCode(92)).join('/');
        if (/(?:m3u8|mp4)/i.test(ju) || /^https?:/i.test(ju)) { m3u8 = ju; break; }
      }
    }
  }
  if (m3u8) input = m3u8;
}),
  lazy: $js.toString(() => {
  var u = String(input).split('$').pop();
  var playHtml = request(u);
  playHtml = playHtml.split(String.fromCharCode(92) + '/').join('/');
  var m3u8 = '';
  var m = u.match(/-(\d+)-(\d+)\.html$/);
  var src = m ? parseInt(m[1], 10) : 1;
  var ep = m ? parseInt(m[2], 10) : 1;
  var blocks = playHtml.match(/"第0?1集\$https?:\/\/[^"]*"/g) || [];
  var block = blocks[src - 1] || blocks[0] || '';
  if (block) {
    block = block.replace(/^"|"$/g, '');
    var eps = block.split('#');
    for (var k = 0; k < eps.length; k++) {
      var mm = eps[k].match(/https?:\/\/[^"']+?\.m3u8/);
      if (mm) {
        if (k === ep - 1) { m3u8 = mm[0]; break; }
        if (!m3u8) m3u8 = mm[0];
      }
    }
  }
  if (!m3u8) {
    var sm = playHtml.match(/https?:\/\/[^"'<>]+?\.(?:m3u8|mp4)[^"'<>]*/i);
    if (sm) m3u8 = sm[0];
  }
  if (!m3u8) {
    var jm = playHtml.match(/"url"\s*:\s*"([^"]+)"/gi);
    if (jm) {
      for (var j = 0; j < jm.length; j++) {
        var ju = jm[j].match(/:"([^"]+)"/)[1].split(String.fromCharCode(92)).join('/');
        if (/(?:m3u8|mp4)/i.test(ju) || /^https?:/i.test(ju)) { m3u8 = ju; break; }
      }
    }
  }
  if (m3u8) input = m3u8;
})
};
