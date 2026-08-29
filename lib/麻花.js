var rule = {
  title: "麻花",
  host: "https://mh-ys.cc",
  homeUrl: '/',
  url: "/mhys/fyclass/",
  searchUrl: "/smho/-------------/?wd=**",
  searchable: 2,
  headers: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36', 'Referer': "https://mh-ys.cc" },
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视剧&综艺&动漫&短剧",
  class_url: "dianying&dianshiju&zongyi&dongman&duanju",
  // 推荐/一级/搜索：列表;标题;图片;描述;链接（选择器串，工具自动识别）
  推荐: ".c2_list li;a&&title;.tc_img&&data-original;tc_wz&&Text;a&&href",
  一级: ".c2_list li;a&&title;.tc_img&&data-original;tc_wz&&Text;a&&href",
  搜索: ".result_list;.result_title a&&Text;.img_wrapper&&data-original;;a&&href",
  // 二级/play/lazy：$js.toString 函数（drpy2 运行时只认函数式）
  二级: $js.toString(() => {
  
  var host = "https://mh-ys.cc";
  var detailHtml = request(input);
  VOD = {};
  VOD.vod_name = pdfh(detailHtml, 'h1&&Text') || '';
  VOD.vod_pic = '';
  VOD.vod_content = pdfh(detailHtml, 'meta[name=description]&&content') || '';
  var blockHtml = pdfh(detailHtml, '.con_c2_list&&Html') || pdfh(detailHtml, '.myui-content__list&&Html') || pdfh(detailHtml, '.stui-content__playlist&&Html') || '';
  var linkArr = blockHtml ? pdfa(blockHtml, 'a') : [];
  if (!linkArr || linkArr.length === 0) {
    var all = detailHtml.match(/href="([^"]*\/ksplay[^"]*)"/gi) || [];
    if (!all.length) all = detailHtml.match(/href="([^"]*\/watch\/\d+\/\d+\.html)"/gi) || [];
    if (!all.length) all = detailHtml.match(/href="([^"]*\/play\/\d+\/\d+\.html)"/gi) || [];
    if (!all.length) all = detailHtml.match(/href="([^"]*\/vodplay\/\d+-\d+(?:-\d+)?\.html)"/gi) || [];
    if (!all.length) all = detailHtml.match(/href="([^"]*\/[a-z]+kan\/\d+-\d+-\d+[^"]*)"/gi) || [];
    linkArr = all;
  }
  var urls = [];
  for (var j = 0; j < linkArr.length; j++) {
    var s = (linkArr[j] && typeof linkArr[j].toString === 'function') ? linkArr[j].toString() : String(linkArr[j]);
    var hm = s.match(/href="([^"]*\/ksplay[^"]*)"/i) || s.match(/href="([^"]*\/watch\/\d+\/\d+\.html)"/i) || s.match(/\/watch\/\d+\/\d+\.html/i) || s.match(/href="([^"]*\/play\/\d+\/\d+\.html)"/i) || s.match(/\/play\/\d+\/\d+\.html/i) || s.match(/href="([^"]*\/vodplay\/\d+-\d+(?:-\d+)?\.html)"/i) || s.match(/\/vodplay\/\d+-\d+(?:-\d+)?\.html/i) || s.match(/href="([^"]*\/[a-z]+kan\/\d+-\d+-\d+[^"]*)"/i) || s.match(/\/[a-z]+kan\/\d+-\d+-\d+/i);
    if (!hm) continue;
    var u = hm[1] || hm[0];
    var tm = s.match(/title="([^"]*)"/i);
    var t = tm ? tm[1] : ('第' + (j + 1) + '集');
    if (u.indexOf('http') !== 0) u = host + u;
    urls.push(t + '$' + u);
  }
  VOD.vod_play_from = '君子兰专线';
  VOD.vod_play_url = urls.join('#');
  
}),
  play: $js.toString(() => {
  
  var playHtml = request(input);
  var m3u8 = '';
  // 1) 标准直链 m3u8/mp4
  var m = playHtml.match(/https?:\/\/[^"'<>]+?\.(?:m3u8|mp4)[^"'<>]*/i);
  if (m) m3u8 = m[0];
  // 2) MacCMS 常见 JSON 转义直链："url":"https:\/\/xxx\/index.m3u8"
  if (!m3u8) {
    var jm = playHtml.match(/"url"\s*:\s*"([^"]+)"/gi);
    if (jm) {
      for (var k = 0; k < jm.length; k++) {
        var u = jm[k].match(/:"([^"]+)"/)[1].split('\\/').join('/');
        if (/\.(?:m3u8|mp4)/i.test(u) || /^https?:\/\//i.test(u)) { m3u8 = u; break; }
      }
    }
  }
  if (m3u8) {
    input = { url: m3u8, parse: 0 };
  } else {
    input = { url: input, parse: 1 };
  }
  
}),
  lazy: $js.toString(() => {
  
  var playHtml = request(input);
  var m3u8 = '';
  // 1) 标准直链 m3u8/mp4
  var m = playHtml.match(/https?:\/\/[^"'<>]+?\.(?:m3u8|mp4)[^"'<>]*/i);
  if (m) m3u8 = m[0];
  // 2) MacCMS 常见 JSON 转义直链："url":"https:\/\/xxx\/index.m3u8"
  if (!m3u8) {
    var jm = playHtml.match(/"url"\s*:\s*"([^"]+)"/gi);
    if (jm) {
      for (var k = 0; k < jm.length; k++) {
        var u = jm[k].match(/:"([^"]+)"/)[1].split('\\/').join('/');
        if (/\.(?:m3u8|mp4)/i.test(u) || /^https?:\/\//i.test(u)) { m3u8 = u; break; }
      }
    }
  }
  if (m3u8) {
    input = { url: m3u8, parse: 0 };
  } else {
    input = { url: input, parse: 1 };
  }
  
})
};