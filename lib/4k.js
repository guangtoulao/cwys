var rule = {
  title: "4kdyws",
  host: "https://www.4kdyws.top",
  homeUrl: "/",
  url: "/vodcate/fyclass.html",
  searchUrl: "/vodsearch/**/fypage",
  searchable: 2,
  headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36', 'Referer': "https://www.4kdyws.top" },
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视剧&动漫&综艺",
  class_url: "1&2&3&4",
  推荐: "ul.stui-vodlist li;a&&title;.stui-vodlist__thumb&&data-original;;a&&href",
  一级: "ul.stui-vodlist li;a&&title;.stui-vodlist__thumb&&data-original;pic-text&&Text;a&&href",
  搜索: "ul.stui-vodlist li;a&&title;.stui-vodlist__thumb&&data-original;pic-text&&Text;a&&href",
  二级: $js.toString(() => {
  
  var detailHtml = (typeof input === 'string' && input.indexOf('<') > -1) ? input : request(input);
  VOD = VOD || {};
  var name = pdfh(detailHtml, 'h1.title&&Text') || pdfh(detailHtml, 'h1&&Text') || (VOD.vod_name || '');
  var pic = pdfh(detailHtml, '.stui-vodlist__thumb&&data-original') || pdfh(detailHtml, 'img&&data-original') || pdfh(detailHtml, '.lazyload&&data-original') || '';
  var content = pdfh(detailHtml, 'meta[name=description]&&content') || '';
  var tabs = pdfa(detailHtml, 'ul.nav-tabs.dpplay li') || pdfa(detailHtml, 'ul.nav-tabs li');
  var uls = pdfa(detailHtml, 'ul.stui-content__playlist') || pdfa(detailHtml, '.myui-content__list');
  var srcNames = ['君子兰①','君子兰②','君子兰③','君子兰④'];
  var froms = [], urls = [];
  if (uls && uls.length >= 1 && (uls.length > 1 || (tabs && tabs.length > 1))) {
    for (var ui = 0; ui < uls.length; ui++) {
      var sname = srcNames[ui] || ('源' + (ui + 1));
      var lis = pdfa(uls[ui], 'li');
      var eps = [];
      for (var li2 = 0; li2 < lis.length; li2++) {
        var epName = pdfh(lis[li2], 'a&&Text') || ('第' + (li2 + 1) + '集');
        var lk = pdfh(lis[li2], 'a&&href');
        if (lk) { if (lk.indexOf('http') !== 0) lk = "https://www.4kdyws.top" + lk; eps.push(epName + '$' + lk); }
      }
      if (eps.length) { froms.push(sname); urls.push(eps.join('#')); }
    }
  }
  if (!froms.length) {
    var blockHtml = (uls && uls.length) ? uls[0] : (pdfh(detailHtml, '#playlist1&&Html') || pdfh(detailHtml, '.myui-content__list&&Html') || pdfh(detailHtml, '.stui-content__playlist&&Html') || '');
    var linkArr = blockHtml ? pdfa(blockHtml, 'a') : [];
    if (!linkArr || linkArr.length === 0) {
      var all = detailHtml.match(/href="([^"]*\/ksplay[^"]*)"/gi) || [];
      if (!all.length) all = detailHtml.match(/href="([^"]*\/watch\/\d+\/\d+\.html)"/gi) || [];
      if (!all.length) all = detailHtml.match(/href="([^"]*\/play\/\d+\/\d+\.html)"/gi) || [];
      if (!all.length) all = detailHtml.match(/href="([^"]*\/vodplay\/\d+-\d+(?:-\d+)?\.html)"/gi) || [];
      if (!all.length) all = detailHtml.match(/href="([^"]*\/[a-z]+kan\/\d+-\d+-\d+[^"]*)"/gi) || [];
      linkArr = all;
    }
    var surls = [];
    for (var j = 0; j < linkArr.length; j++) {
      var s = (linkArr[j] && typeof linkArr[j].toString === 'function') ? linkArr[j].toString() : String(linkArr[j]);
      var hm = s.match(/href="([^"]*\/ksplay[^"]*)"/i) || s.match(/href="([^"]*\/watch\/\d+\/\d+\.html)"/i) || s.match(/\/watch\/\d+\/\d+\.html/i) || s.match(/href="([^"]*\/play\/\d+\/\d+\.html)"/i) || s.match(/\/play\/\d+\/\d+\.html/i) || s.match(/href="([^"]*\/vodplay\/\d+-\d+(?:-\d+)?\.html)"/i) || s.match(/\/vodplay\/\d+-\d+(?:-\d+)?\.html/i) || s.match(/href="([^"]*\/[a-z]+kan\/\d+-\d+-\d+[^"]*)"/i) || s.match(/\/[a-z]+kan\/\d+-\d+-\d+/i);
      if (!hm) continue;
      var u = hm[1] || hm[0];
      var tm = s.match(/title="([^"]*)"/i);
      var t = tm ? tm[1] : ('第' + (j + 1) + '集');
      if (u.indexOf('http') !== 0) u = "https://www.4kdyws.top" + u;
      surls.push(t + '$' + u);
    }
    froms.push('默认线路'); urls.push(surls.join('#'));
  }
  VOD.vod_name = name;
  VOD.vod_pic = pic;
  VOD.vod_content = content;
  VOD.vod_play_from = froms.join('$$$') || '播放';
  VOD.vod_play_url = urls.join('$$$');
  setResult(VOD);
  
  }),
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
