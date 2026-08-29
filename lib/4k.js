var rule = {
  title: "4k",
  host: "https://www.4kdyws.top",
  homeUrl: "https://www.4kdyws.top",
  url: "/vodcate/fyclass.html",
  searchUrl: "https://www.4kdyws.top/vodsearch/**",
  searchable: 2,
  headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36', 'Referer': "https://www.4kdyws.top" },
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视剧&动漫&综艺",
  class_url: "1&2&3&4",
  // 推荐/一级/搜索：列表;标题;图片;描述;链接（选择器串，工具自动识别）
  推荐: "ul.stui-vodlist li;a&&title;.stui-vodlist__thumb&&data-original;;a&&href",
  一级: "ul.stui-vodlist li;a&&title;.stui-vodlist__thumb&&data-original;pic-text&&Text;a&&href",
  搜索: "ul.stui-vodlist li;a&&title;.stui-vodlist__thumb&&data-original;;a&&href",
  // 二级/play/lazy：$js.toString 函数（drpy2 运行时只认函数式）
  二级: $js.toString(() => {
  
  var detailHtml = (typeof input === 'string' && input.indexOf('<') > -1) ? input : request(input);
  VOD = VOD || {};
  var froms = [], urls = [];
  var srcMap = {};
  var name = pdfh(detailHtml, 'h1&&Text') || pdfh(detailHtml, 'h1.title&&Text') || (VOD.vod_name || '');
  var pic = pdfh(detailHtml, 'img&&data-original') || pdfh(detailHtml, '.lazyload&&data-original') || pdfh(detailHtml, '.stui-vodlist__thumb&&data-original') || '';
  var content = pdfh(detailHtml, 'meta[name=description]&&content') || '';
  // mxpro 模板多源：直接扫全页 .module-play-list-link，按 URL 中的源编号分组（避免嵌套 pdfa 取不到属性）
  var links = pdfa(detailHtml, '.module-play-list-link');
  if (!links || !links.length) {
    links = pdfa(detailHtml, '.module-play-list a');
  }
  if (links && links.length) {
    for (var i = 0; i < links.length; i++) {
      var lk = pdfh(links[i], '&&href');
      if (!lk) continue;
      var m = lk.match(/\/vodplay\/[^-]+-(\d+)-(\d+)\.html/);
      if (!m) continue;
      var srcIdx = m[1];
      var epIdx = m[2];
      var epName = pdfh(links[i], '&&Text') || ('第' + epIdx + '集');
      if (lk.indexOf('http') !== 0) lk = "https://www.4kdyws.top" + lk;
      if (!srcMap[srcIdx]) srcMap[srcIdx] = [];
      srcMap[srcIdx].push(epName + '$' + lk);
    }
  }
  // 多线路检测：STUI/苹果CMS 多源，每个源一个 ul.stui-content__playlist；源名来自 ul.nav-tabs.dpplay li
  var tabs = pdfa(detailHtml, 'ul.nav-tabs.dpplay li') || pdfa(detailHtml, 'ul.nav-tabs li');
  var uls = pdfa(detailHtml, 'ul.stui-content__playlist') || pdfa(detailHtml, '.myui-content__list');
  var srcNames = [];
    for (var ti = 0; ti < tabs.length; ti++) { srcNames.push(pdfh(tabs[ti], 'a&&Text') || ('源' + (ti + 1))); }
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
  // 兜底：若 mxpro/STUI 都没命中，正则硬扫 /vodplay/ 链接
  if (!Object.keys(srcMap).length && !froms.length) {
    var all = detailHtml.match(/href="(\/vodplay\/[^"]+)"/g) || [];
    var seen = {};
    for (var j = 0; j < all.length; j++) {
      var mm = all[j].match(/href="(\/vodplay\/[^"]+)"/);
      if (!mm) continue;
      var u = mm[1];
      if (seen[u]) continue;
      seen[u] = 1;
      var m2 = u.match(/\/vodplay\/[^-]+-(\d+)-(\d+)\.html/);
      var srcIdx2 = m2 ? m2[1] : '1';
      var epIdx2 = m2 ? m2[2] : (j + 1);
      if (u.indexOf('http') !== 0) u = "https://www.4kdyws.top" + u;
      if (!srcMap[srcIdx2]) srcMap[srcIdx2] = [];
      srcMap[srcIdx2].push('第' + epIdx2 + '集$' + u);
    }
  }
  // 汇总 mxpro 分组
  if (Object.keys(srcMap).length) {
    var mxTabs = pdfa(detailHtml, '.module-tab-item');
    var idxList = Object.keys(srcMap).sort(function(a, b) { return parseInt(a) - parseInt(b); });
    for (var k = 0; k < idxList.length; k++) {
      var idx = idxList[k];
      var sname = '源' + idx;
      if (mxTabs && mxTabs[idx - 1]) {
        sname = pdfh(mxTabs[idx - 1], 'span&&Text') || pdfh(mxTabs[idx - 1], '&&Text') || sname;
      } else if (tabs && tabs[idx - 1]) {
        sname = pdfh(tabs[idx - 1], 'a&&Text') || sname;
      }
      froms.push(sname);
      urls.push(srcMap[idx].join('#'));
    }
  }
  // 最终兜底：默认线路
  if (!froms.length) {
    var blockHtml = (uls && uls.length) ? uls[0] : (pdfh(detailHtml, '#playlist1&&Html') || pdfh(detailHtml, '.module-play-list&&Html') || pdfh(detailHtml, '.myui-content__list&&Html') || pdfh(detailHtml, '.stui-content__playlist&&Html') || '');
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