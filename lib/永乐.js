var rule = {
  title: "永乐",
  host: "https://www.ylys.tv",
  homeUrl: "https://www.ylys.tv/",
  url: "https://www.ylys.tv/vodshow/fyclass--------fypage---.html",
  searchUrl: "https://www.ylys.tv/vodsearch/**----------fypage---.html",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  headers: {"User-Agent":"MOBILE_UA"},
  timeout: 10000,
  play_parse: true,
  class_name: "电影&剧集&综艺&动漫",
  class_url: "1&2&3&4",
  // 推荐/一级/搜索：列表;标题;图片;描述;链接（选择器串，工具自动识别）
  推荐: "body .module-item;a&&title;img&&data-original;;a&&href",
  一级: "body .module-item;a&&title;img&&data-original;;a&&href",
  搜索: "body .module-item;.module-card-item-title a&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href;.module-info-item-content&&Text",
  // 二级：命中模板「mxpro」，使用模板内置 二级 对象（已转 $js.toString 函数并去随机尾数）
  二级: $js.toString(() => {
  var HOST = "https://www.ylys.tv";
  var html = (typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) ? input : (function(){ try { return request(MY_URL); } catch(e) { return ""; } })();
  VOD = VOD || {};
  try { VOD.vod_name = pdfh(html, "h1&&Text").replace(/\n|\t/g, "").trim(); } catch(e){}
  try { if (".module-info-item:eq(1)&&Text") {
    var _d0 = pdfh(html, ".module-info-item:eq(1)&&Text").replace(/\n|\t/g, "").trim(); VOD.vod_remarks = _d0;
    var _ds = ".module-info-item:eq(1)&&Text;.module-info-item:eq(2)&&Text;.module-info-item:eq(3)&&Text".split(";");
    if(_ds.length>1) VOD.vod_year = pdfh(html, _ds[1]).replace(/\n|\t/g,"").trim();
    if(_ds.length>2) VOD.vod_area = pdfh(html, _ds[2]).replace(/\n|\t/g,"").trim();
    if(_ds.length>3) VOD.vod_actor = pdfh(html, _ds[3]).replace(/\n|\t/g,"").trim();
    if(_ds.length>4) VOD.vod_director = pdfh(html, _ds[4]).replace(/\n|\t/g,"").trim();
  } } catch(e){}
  try { if (".module-info-introduction&&Text") VOD.vod_content = pdfh(html, ".module-info-introduction&&Text").replace(/\n|\t/g, "").trim(); } catch(e){}
  try { if (".lazyload&&data-original") VOD.vod_pic = pd(html, ".lazyload&&data-original", MY_URL); } catch(e){}
  var tabsSel = ".module-tab-item";
  var tabText = "body&&Text";
  var names = []; var seen = {};
  var tabEls = []; try { tabEls = pdfa(html, tabsSel); } catch(e) { tabEls = []; }
  for (var i=0;i<tabEls.length;i++){
    var nm = ""; try { nm = pdfh(tabEls[i], tabText).trim(); } catch(e){}
    if(!nm) nm = "线路空";
    nm = nm.replace(/\s+/g,"").replace(/\d{2,}$/,"");
    if(seen[nm]){ seen[nm]++; nm = nm + seen[nm]; } else { seen[nm]=1; }
    names.push(nm);
  }
  var listText = "body&&Text";
  var listUrl = "a&&href";
  var listPrefix = "";
  var urls = [];
  for (var i=0;i<names.length;i++){
    var p1 = ".module-play-list:eq(#id) a".replace(/#idv/g, names[i]).replace(/#id/g, String(i));
    var items = []; try { items = pdfa(html, p1); } catch(e) { items = []; }
    var arr = []; var dup = {};
    for (var j=0;j<items.length;j++){
      var nm2 = ""; try { nm2 = pdfh(items[j], listText).trim(); } catch(e){}
      if(!nm2) nm2 = "第"+(j+1)+"集";
      var u = ""; try { u = pd(items[j], listUrl, MY_URL); } catch(e){ u=""; }
      if(!u) continue;
      if(listPrefix) u = listPrefix + u;
      if(dup[u]) continue; dup[u]=1;
      arr.push(nm2 + "$" + u);
    }
    urls.push(arr.join("#"));
  }
  VOD.vod_play_from = names.join("$$$") || "播放";
  VOD.vod_play_url = urls.join("$$$");
  setResult(VOD);
}),
  tab_rename: {"自营1线":"君子兰①","自营2线":"君子兰②","全球3线":"君子兰⑤","大陆0线":"君子兰④","大陆3线":"君子兰⑥","自营4k":"君子兰⑥","大陆5线":"君子兰⑦","大陆6线":"君子兰⑧"},
  play: $js.toString(() => {
  var u = (typeof input === "string") ? input.split(String.fromCharCode(36)).pop() : "";
  if (!u) { if (typeof setResult === "function") setResult(input); return; }
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
  if (m3u8) input = m3u8;
  if (typeof setResult === "function") setResult(input);
}),
  lazy: $js.toString(() => {
  var u = (typeof input === "string") ? input.split(String.fromCharCode(36)).pop() : "";
  if (!u) { if (typeof setResult === "function") setResult(input); return; }
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
  if (m3u8) input = m3u8;
  if (typeof setResult === "function") setResult(input);
})
};