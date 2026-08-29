var rule = {
  title: "悟空",
  host: "https://www.iziguang.com",
  homeUrl: '/',
  url: "/category/fyclass.html",
  searchUrl: "/search.php?keyword=**",
  searchable: 2,
  headers: { 'User-Agent': 'MOBILE_UA' },
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视&综艺&动漫&短剧",
  class_url: "1282&1283&1284&1285&1286",
  推荐: ".myui-vodlist__box;a&&title;.myui-vodlist__thumb&&style;.pic-text&&Text;a&&href",
  一级: ".myui-vodlist__box;a&&title;.myui-vodlist__thumb&&style;.pic-text&&Text;a&&href",
  搜索: "#searchList li;h4.title a&&Text;.myui-vodlist__thumb&&data-original;.pic-text&&Text;a&&href",
  二级: $js.toString(() => {
var pdfa=(typeof jsp!=='undefined'&&jsp.pdfa)?jsp.pdfa:pdfa, pdfh=(typeof jsp!=='undefined'&&jsp.pdfh)?jsp.pdfh:pdfh, pd=(typeof jsp!=='undefined'&&jsp.pd)?jsp.pd:pd;
  var host = "https://www.iziguang.com";
  var detailHtml = request(input);
  VOD = {};
  VOD.vod_name = pdfh(detailHtml, 'h1&&Text') || '';
  VOD.vod_pic = '';
  VOD.vod_content = pdfh(detailHtml, 'meta[name=description]&&content') || '';
  var blockHtml = pdfh(detailHtml, '#playlist1&&Html') || pdfh(detailHtml, '.myui-content__list&&Html') || pdfh(detailHtml, '.stui-content__playlist&&Html') || '';
  var linkArr = blockHtml ? pdfa(blockHtml, 'a') : [];
  if (!linkArr || linkArr.length === 0) {
    var all = detailHtml.match(/href="([^"]*\/ksplay[^"]*)"/gi) || [];
    if (!all.length) all = detailHtml.match(/href="([^"]*\/watch\/\d+\/\d+\.html)"/gi) || [];
    if (!all.length) all = detailHtml.match(/href="([^"]*\/play\/\d+\/\d+\.html)"/gi) || [];
    if (!all.length) all = detailHtml.match(/href="([^"]*\/vodplay\/\d+-\d+(?:-\d+)?\.html)"/gi) || [];
    linkArr = all;
  }
  var urls = [];
  for (var j = 0; j < linkArr.length; j++) {
    var s = (linkArr[j] && typeof linkArr[j].toString === 'function') ? linkArr[j].toString() : String(linkArr[j]);
    var hm = s.match(/href="([^"]*\/ksplay[^"]*)"/i) || s.match(/href="([^"]*\/watch\/\d+\/\d+\.html)"/i) || s.match(/\/watch\/\d+\/\d+\.html/i) || s.match(/href="([^"]*\/play\/\d+\/\d+\.html)"/i) || s.match(/\/play\/\d+\/\d+\.html/i) || s.match(/href="([^"]*\/vodplay\/\d+-\d+(?:-\d+)?\.html)"/i) || s.match(/\/vodplay\/\d+-\d+(?:-\d+)?\.html/i);
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
  var m = playHtml.match(/https?:\/\/[^"'<>]+?\.(?:m3u8|mp4)[^"'<>]*/i);
  if (m) {
    input = { url: m[0], parse: 0 };
  } else {
    // 页面无直链（artplayer/云播 类站点，如 iziguang）：交给 TVBox 自带解析
    input = { url: input, parse: 1 };
  }
}),
  lazy: $js.toString(() => {
  var playHtml = request(input);
  var m = playHtml.match(/https?:\/\/[^"'<>]+?\.(?:m3u8|mp4)[^"'<>]*/i);
  if (m) {
    input = { url: m[0], parse: 0 };
  } else {
    // 页面无直链（artplayer/云播 类站点，如 iziguang）：交给 TVBox 自带解析
    input = { url: input, parse: 1 };
  }
})
};