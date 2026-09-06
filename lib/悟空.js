var rule = {
  title: "悟空",
  host: "https://www.iziguang.com",
  homeUrl: "https://www.iziguang.com/",
  url: "https://www.iziguang.com/category/fyclass.html",
  searchUrl: "https://www.iziguang.com/search.php?keyword=**",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  headers: {"User-Agent":"MOBILE_UA"},
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视&综艺&动漫&短剧",
  class_url: "1282&1283&1284&1285&1286",
  // 推荐/一级/搜索：列表;标题;图片;描述;链接（选择器串，工具自动识别）
  推荐: "ul.myui-vodlist.clearfix;li;a&&title;a&&data-original;.pic-text&&Text",
  一级: ".myui-vodlist li;a&&title;a&&data-original;.pic-text&&Text;a&&href",
  搜索: "#searchList li;a&&title;.lazyload&&data-original;.text-muted&&Text;a&&href",
  // 二级：手填区覆盖了模板字段
  二级: {"title":".myui-content__detail .title&&Text;.myui-content__detail p:eq(-2)&&Text","img":".myui-content__thumb .lazyload&&data-original","desc":".myui-content__detail p:eq(0)&&Text;.myui-content__detail p:eq(1)&&Text;.myui-content__detail p:eq(2)&&Text","content":".content&&Text","tabs":".nav-tabs:eq(0) li","lists":".myui-content__list:eq(#id) li","tab_text":"body&&Text","list_text":"a&&Text","list_url":"a&&href"},
  tab_rename: {"悟空影视":"君子兰①","同类型":"君子兰②"},
  play: $js.toString(() => {
  var u = (typeof input === "string") ? input.split(String.fromCharCode(36)).pop() : "";
  if (u) {
  var playHtml = "";
  try { playHtml = (typeof request === "function") ? request(u) : ""; } catch(e) { playHtml = ""; }
  if (!playHtml && typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) playHtml = input;
  playHtml = playHtml.split(String.fromCharCode(92) + String.fromCharCode(47)).join(String.fromCharCode(47));
  var m3u8 = "";
  var sm = playHtml.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
  if (sm) m3u8 = sm[0];
  if (!m3u8) {
    var jm = playHtml.match(/"url"\s*:\s*"([^"]+)"/gi);
    if (jm) { for (var j = 0; j < jm.length; j++) { var ju = jm[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join(String.fromCharCode(47)); if (/\.(?:m3u8|mp4)/i.test(ju) || /^https?:/i.test(ju)) { m3u8 = ju; break; } } }
  }
  if (!m3u8) {
    var pm = playHtml.match(/"第0?\d+集\$https?:\/\/[^"]*"/g);
    if (pm && pm.length) { for (var k = 0; k < pm.length; k++) { var mm = pm[k].match(/\$https?:\/\/[^"]*\.(?:m3u8|mp4)/); if (mm) { m3u8 = mm[0].replace(/^\$/, ""); break; } } }
  }
  if (m3u8) input = { parse: 0, url: m3u8, jx: 0 };
  if (typeof setResult === "function") setResult(input);
  }
}),
  lazy: $js.toString(() => {
  var u = (typeof input === "string") ? input.split(String.fromCharCode(36)).pop() : "";
  if (u) {
  var playHtml = "";
  try { playHtml = (typeof request === "function") ? request(u) : ""; } catch(e) { playHtml = ""; }
  if (!playHtml && typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) playHtml = input;
  playHtml = playHtml.split(String.fromCharCode(92) + String.fromCharCode(47)).join(String.fromCharCode(47));
  var m3u8 = "";
  var sm = playHtml.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
  if (sm) m3u8 = sm[0];
  if (!m3u8) {
    var jm = playHtml.match(/"url"\s*:\s*"([^"]+)"/gi);
    if (jm) { for (var j = 0; j < jm.length; j++) { var ju = jm[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join(String.fromCharCode(47)); if (/\.(?:m3u8|mp4)/i.test(ju) || /^https?:/i.test(ju)) { m3u8 = ju; break; } } }
  }
  if (!m3u8) {
    var pm = playHtml.match(/"第0?\d+集\$https?:\/\/[^"]*"/g);
    if (pm && pm.length) { for (var k = 0; k < pm.length; k++) { var mm = pm[k].match(/\$https?:\/\/[^"]*\.(?:m3u8|mp4)/); if (mm) { m3u8 = mm[0].replace(/^\$/, ""); break; } } }
  }
  if (m3u8) input = { parse: 0, url: m3u8, jx: 0 };
  if (typeof setResult === "function") setResult(input);
  }
})
};