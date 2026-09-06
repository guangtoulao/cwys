var rule = {
  title: "茶壶",
  host: "https://www.bnjxjd.com",
  homeUrl: "https://www.bnjxjd.com/",
  url: "https://www.bnjxjd.com/movie/fyclass-fypage.html",
  searchUrl: "https://www.bnjxjd.com/vodsearch.html?wd=**",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  headers: {"User-Agent":"UC_UA"},
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视剧&综艺&动漫",
  class_url: "fenlei1&fenlei2&fenlei3&fenlei4",
  // 推荐/一级/搜索：选择器串 或 API 接口函数（工具按配置生成）
  推荐: "body a.stui-vodlist__thumb;a&&title;a&&data-original;pic-text&&Text;a&&href",
  一级: "body a.stui-vodlist__thumb;a&&title;a&&data-original;pic-text&&Text;a&&href",
  搜索: "ul.stui-vodlist__media:eq(0) li,ul.stui-vodlist:eq(0) li,#searchList li;a&&title;.lazyload&&data-original;.text-muted&&Text;a&&href",
  // 二级：手填区覆盖了模板字段（已转 $js.toString 函数，并注入运行时线路统一改名）
  二级: $js.toString(() => {
  var HOST = "https://www.bnjxjd.com";
  var detailHtml = (typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) ? input : (function(){ try { return request(MY_URL); } catch(e) { return ""; } })();
  VOD = VOD || {};
  try { VOD.vod_name = pdfh(detailHtml, ".stui-content__detail .title&&Text").replace(/\n|\t/g, "").trim(); } catch(e){}
  try { if (".stui-content__detail p:eq(0)&&Text") {
    var _d0 = pdfh(detailHtml, ".stui-content__detail p:eq(0)&&Text").replace(/\n|\t/g, "").trim(); VOD.vod_remarks = _d0;
    var _ds = ".stui-content__detail p:eq(0)&&Text;.stui-content__detail p:eq(1)&&Text;.stui-content__detail p:eq(2)&&Text".split(";");
    if(_ds.length>1) VOD.vod_year = pdfh(detailHtml, _ds[1]).replace(/\n|\t/g,"").trim();
    if(_ds.length>2) VOD.vod_area = pdfh(detailHtml, _ds[2]).replace(/\n|\t/g,"").trim();
    if(_ds.length>3) VOD.vod_actor = pdfh(detailHtml, _ds[3]).replace(/\n|\t/g,"").trim();
    if(_ds.length>4) VOD.vod_director = pdfh(detailHtml, _ds[4]).replace(/\n|\t/g,"").trim();
  } } catch(e){}
  try { if (".detail&&Text") VOD.vod_content = pdfh(detailHtml, ".detail&&Text").replace(/\n|\t/g, "").trim(); } catch(e){}
  try { if (".stui-content__thumb .lazyload&&data-original") VOD.vod_pic = pd(detailHtml, ".stui-content__thumb .lazyload&&data-original", MY_URL); } catch(e){}
  var tabsSel = ".stui-vodlist__head h3";
  var tabText = "body&&Text";
  var names = []; var seen = {}; var tabAnchors = [];
  var tabEls = []; try { tabEls = pdfa(detailHtml, tabsSel); } catch(e) { tabEls = []; };
  for (var i=0;i<tabEls.length;i++){
    var nm = ""; try { nm = pdfh(tabEls[i], tabText).trim(); } catch(e){}
    if(!nm) nm = "线路空";
    nm = nm.replace(/\s+/g,"").replace(/\d{2,}$/,"");
    var th = ""; try { th = (pdfh(tabEls[i], "a&&href") || "").trim(); } catch(e) {}
    var isAnch = "" && th.indexOf("#~") === 0;
    if(/同类型|同主演|同年份|相关推荐|猜你|喜欢|热搜|排行榜|热播榜|精彩推介/.test(nm) && !isAnch) continue;
    if(seen[nm]){ seen[nm]++; nm = nm + seen[nm]; } else { seen[nm]=1; }
    names.push(nm);
    tabAnchors.push(isAnch ? th : "");
  }
  var listText = "a&&Text";
  var listUrl = "a&&href";
  var listPrefix = "";
  var listFilter = "(app|高清|下载|线路|播放|收藏|订阅|分享|复制|立即|马上|play\\s*now)";
  var listFilterRe = null;
  if (listFilter) { try { listFilterRe = new RegExp(listFilter, "i"); } catch(e) {} }
  var urls = [];
  for (var i=0;i<names.length;i++){
    var p1 = tabAnchors[i] ? (tabAnchors[i] + " li") : ".stui-content__playlist:eq(#id) li".replace(/#idv/g, names[i]).replace(/#id/g, String(i));
    var items = []; try { items = pdfa(detailHtml, p1); } catch(e) { items = []; }
    var arr = []; var dup = {};
    for (var j=0;j<items.length;j++){
      var nm2 = ""; try { nm2 = pdfh(items[j], listText).trim(); } catch(e){}
      if(!nm2) nm2 = "第"+(j+1)+"集";
      var u = ""; try { u = pd(items[j], listUrl, MY_URL); } catch(e){ u=""; }
      if(!u) continue;
      if(listFilterRe && listFilterRe.test(nm2)) continue;
      if(listPrefix) u = listPrefix + u;
      if(dup[u]) continue; dup[u]=1;
      arr.push(nm2 + "$" + u);
    }
    urls.push(arr.join("#"));
  }
  VOD.vod_play_from = names.join("$$$") || "播放";
  VOD.vod_play_url = urls.join("$$$");
  
// —— 线路运行时统一改名（工具注入）：移除→排序→前缀+序号，全部线路覆盖 ——
(function () {
  var _rm = [];
  var _od = ["高清云播","暴风资源"];
  var _pf = "君子兰";
  var _st = 1;
  function _sx(n) { return n < 20 ? String.fromCharCode(9312 + n) : String(n + 1); }
  var _f = String(VOD.vod_play_from || "").split("$$$");
  var _u = String(VOD.vod_play_url || "").split("$$$");
  var _ix = [];
  for (var _i = 0; _i < _f.length; _i++) { if (_rm.indexOf(_f[_i]) < 0) { _ix.push(_i); } }
  if (_od.length) { _ix.sort(function (a, b) { return (_od.indexOf(_f[a]) === -1 ? 9999 : _od.indexOf(_f[a])) - (_od.indexOf(_f[b]) === -1 ? 9999 : _od.indexOf(_f[b])); }); }
  var _nf = [], _nu = [];
  for (var _j = 0; _j < _ix.length; _j++) { _nf.push(_pf + _sx(_st - 1 + _j)); _nu.push(_u[_ix[_j]] || ""); }
  VOD.vod_play_from = _nf.join("$$$");
  VOD.vod_play_url = _nu.join("$$$");
})();
  setResult(VOD);
}),
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
    var ms = playHtml.match(/"url"\s*:\s*"([^"]+)"/g) || [];
    var cand = "";
    for (var j = 0; j < ms.length; j++) {
      var ju = ms[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join(String.fromCharCode(47));
      if (/\.(?:m3u8|mp4)(?:\?|$)/i.test(ju)) { m3u8 = ju; break; }
      if (/^https?:\/\//i.test(ju) && !cand) cand = ju;
    }
    if (!m3u8 && cand) {
      var p2 = "";
      try { p2 = request(cand); } catch(e) { p2 = ""; }
      p2 = String(p2 || "").split(String.fromCharCode(92)).join(String.fromCharCode(47));
      var m2 = p2.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
      if (m2) m3u8 = m2[0];
    }
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
    var ms = playHtml.match(/"url"\s*:\s*"([^"]+)"/g) || [];
    var cand = "";
    for (var j = 0; j < ms.length; j++) {
      var ju = ms[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join(String.fromCharCode(47));
      if (/\.(?:m3u8|mp4)(?:\?|$)/i.test(ju)) { m3u8 = ju; break; }
      if (/^https?:\/\//i.test(ju) && !cand) cand = ju;
    }
    if (!m3u8 && cand) {
      var p2 = "";
      try { p2 = request(cand); } catch(e) { p2 = ""; }
      p2 = String(p2 || "").split(String.fromCharCode(92)).join(String.fromCharCode(47));
      var m2 = p2.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
      if (m2) m3u8 = m2[0];
    }
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