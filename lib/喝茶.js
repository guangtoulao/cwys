var rule = {
  title: "喝茶",
  host: "https://www.bnjxjd.com",
  homeUrl: "https://www.bnjxjd.com/",
  url: "https://www.bnjxjd.com/vodshowfyfilter/id/fyclass/page/fypage.html",
  searchUrl: "https://www.bnjxjd.com/index.php/ajax/suggest?mid=1&wd=**&page=fypage",
  searchable: 2,
  quickSearch: 0,
  filterable: 1,
  headers: {"User-Agent":"UC_UA"},
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视剧&综艺&动漫",
  class_url: "fenlei1&fenlei2&fenlei3&fenlei4",
  // 推荐/一级/搜索：选择器串 或 API 接口函数（工具按配置生成）
  推荐: "body a.stui-vodlist__thumb;a&&title;a&&data-original;pic-text&&Text;a&&href",
  一级: "body a.stui-vodlist__thumb;a&&title;a&&data-original;pic-text&&Text;a&&href",
  搜索: $js.toString(() => {
  var wd = (typeof KEY !== "undefined" && KEY) ? KEY : ((typeof input === "string" && input && input.indexOf("://") < 0) ? input : (arguments[0] || ""));
  var wd2 = encodeURIComponent(wd || "");
  var base = "https://www.bnjxjd.com/index.php/ajax/suggest?mid=1&wd=**&page=fypage";
  var searchUrl = base.replace(/\*\*/g, wd2).replace(/fypage/gi, "1");
  var resp = "";
  try { resp = request(searchUrl) || ""; } catch(e) { resp = ""; }
  var obj = {};
  try { obj = JSON.parse(resp); } catch(e) { try { obj = JSON.parse(String(resp).replace(/\\/g, "/")); } catch(e2){} }
  var arr = obj.data || obj.list || obj.videos || (Array.isArray(obj) ? obj : []);
  var list = [];
  for (var i = 0; i < arr.length; i++) {
    var it = arr[i];
    if (!it || typeof it !== "object") continue;
    var name = it.vod_name || it.vodName || it.title || it.name || "";
    var rid = it.vod_url || it.vodUrl || it.url || it.id || "";
    if (!rid) continue;
    if (/^\d+$/.test(String(rid))) rid = "https://www.bnjxjd.com" + "/play/" + rid + "-1-1.html";
    if (typeof rid === "string" && rid.indexOf("/") === 0) rid = "https://www.bnjxjd.com" + rid;
    var pic = it.vod_pic || it.vodPic || it.pic || "";
    if (typeof pic === "string" && pic.indexOf("/") === 0) pic = "https://www.bnjxjd.com" + pic;
    list.push({ vod_id: rid, vod_name: String(name).trim(), vod_pic: pic, vod_remarks: it.vod_remarks || it.vodRemarks || "" });
  }
  VODS = list;
}),
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
  // 筛选器：TVBox 标准 filter（按分类ID 键，引擎 home() 原样返回给 TVBox 渲染筛选行）
  filter: {"fenlei1":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"/class/������"},{"n":"战争","v":"/class/������"},{"n":"青春偶像","v":"/class/������������"},{"n":"喜剧","v":"/class/������"},{"n":"家庭","v":"/class/������"},{"n":"犯罪","v":"/class/������"},{"n":"动作","v":"/class/������"},{"n":"奇幻","v":"/class/������"},{"n":"剧情","v":"/class/������"},{"n":"历史","v":"/class/������"},{"n":"其他","v":"/class/������"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"/area/������"},{"n":"韩国","v":"/area/������"},{"n":"香港","v":"/area/������"},{"n":"台湾","v":"/area/������"},{"n":"日本","v":"/area/������"},{"n":"美国","v":"/area/������"},{"n":"泰国","v":"/area/������"},{"n":"英国","v":"/area/������"},{"n":"新加坡","v":"/area/���������"},{"n":"其他","v":"/area/������"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2024","v":"/year/2024"},{"n":"2023","v":"/year/2023"},{"n":"2022","v":"/year/2022"},{"n":"2021","v":"/year/2021"},{"n":"2020","v":"/year/2020"},{"n":"2019","v":"/year/2019"},{"n":"2018","v":"/year/2018"},{"n":"2017","v":"/year/2017"},{"n":"2016","v":"/year/2016"},{"n":"2015","v":"/year/2015"},{"n":"2014","v":"/year/2014"},{"n":"2013","v":"/year/2013"},{"n":"2012","v":"/year/2012"},{"n":"2011","v":"/year/2011"},{"n":"2010","v":"/year/2010"},{"n":"2009","v":"/year/2009"},{"n":"2008","v":"/year/2008"},{"n":"2006","v":"/year/2006"},{"n":"2005","v":"/year/2005"},{"n":"2004","v":"/year/2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"/lang/������"},{"n":"英语","v":"/lang/������"},{"n":"粤语","v":"/lang/������"},{"n":"闽南语","v":"/lang/���������"},{"n":"韩语","v":"/lang/������"},{"n":"日语","v":"/lang/������"},{"n":"其它","v":"/lang/������"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],"fenlei2":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"/class/������"},{"n":"战争","v":"/class/������"},{"n":"青春偶像","v":"/class/������������"},{"n":"喜剧","v":"/class/������"},{"n":"家庭","v":"/class/������"},{"n":"犯罪","v":"/class/������"},{"n":"动作","v":"/class/������"},{"n":"奇幻","v":"/class/������"},{"n":"剧情","v":"/class/������"},{"n":"历史","v":"/class/������"},{"n":"其他","v":"/class/������"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"/area/������"},{"n":"韩国","v":"/area/������"},{"n":"香港","v":"/area/������"},{"n":"台湾","v":"/area/������"},{"n":"日本","v":"/area/������"},{"n":"美国","v":"/area/������"},{"n":"泰国","v":"/area/������"},{"n":"英国","v":"/area/������"},{"n":"新加坡","v":"/area/���������"},{"n":"其他","v":"/area/������"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2024","v":"/year/2024"},{"n":"2023","v":"/year/2023"},{"n":"2022","v":"/year/2022"},{"n":"2021","v":"/year/2021"},{"n":"2020","v":"/year/2020"},{"n":"2019","v":"/year/2019"},{"n":"2018","v":"/year/2018"},{"n":"2017","v":"/year/2017"},{"n":"2016","v":"/year/2016"},{"n":"2015","v":"/year/2015"},{"n":"2014","v":"/year/2014"},{"n":"2013","v":"/year/2013"},{"n":"2012","v":"/year/2012"},{"n":"2011","v":"/year/2011"},{"n":"2010","v":"/year/2010"},{"n":"2009","v":"/year/2009"},{"n":"2008","v":"/year/2008"},{"n":"2006","v":"/year/2006"},{"n":"2005","v":"/year/2005"},{"n":"2004","v":"/year/2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"/lang/������"},{"n":"英语","v":"/lang/������"},{"n":"粤语","v":"/lang/������"},{"n":"闽南语","v":"/lang/���������"},{"n":"韩语","v":"/lang/������"},{"n":"日语","v":"/lang/������"},{"n":"其它","v":"/lang/������"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],"fenlei3":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"/class/������"},{"n":"战争","v":"/class/������"},{"n":"青春偶像","v":"/class/������������"},{"n":"喜剧","v":"/class/������"},{"n":"家庭","v":"/class/������"},{"n":"犯罪","v":"/class/������"},{"n":"动作","v":"/class/������"},{"n":"奇幻","v":"/class/������"},{"n":"剧情","v":"/class/������"},{"n":"历史","v":"/class/������"},{"n":"其他","v":"/class/������"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"/area/������"},{"n":"韩国","v":"/area/������"},{"n":"香港","v":"/area/������"},{"n":"台湾","v":"/area/������"},{"n":"日本","v":"/area/������"},{"n":"美国","v":"/area/������"},{"n":"泰国","v":"/area/������"},{"n":"英国","v":"/area/������"},{"n":"新加坡","v":"/area/���������"},{"n":"其他","v":"/area/������"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2024","v":"/year/2024"},{"n":"2023","v":"/year/2023"},{"n":"2022","v":"/year/2022"},{"n":"2021","v":"/year/2021"},{"n":"2020","v":"/year/2020"},{"n":"2019","v":"/year/2019"},{"n":"2018","v":"/year/2018"},{"n":"2017","v":"/year/2017"},{"n":"2016","v":"/year/2016"},{"n":"2015","v":"/year/2015"},{"n":"2014","v":"/year/2014"},{"n":"2013","v":"/year/2013"},{"n":"2012","v":"/year/2012"},{"n":"2011","v":"/year/2011"},{"n":"2010","v":"/year/2010"},{"n":"2009","v":"/year/2009"},{"n":"2008","v":"/year/2008"},{"n":"2006","v":"/year/2006"},{"n":"2005","v":"/year/2005"},{"n":"2004","v":"/year/2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"/lang/������"},{"n":"英语","v":"/lang/������"},{"n":"粤语","v":"/lang/������"},{"n":"闽南语","v":"/lang/���������"},{"n":"韩语","v":"/lang/������"},{"n":"日语","v":"/lang/������"},{"n":"其它","v":"/lang/������"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],"fenlei4":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"/class/������"},{"n":"战争","v":"/class/������"},{"n":"青春偶像","v":"/class/������������"},{"n":"喜剧","v":"/class/������"},{"n":"家庭","v":"/class/������"},{"n":"犯罪","v":"/class/������"},{"n":"动作","v":"/class/������"},{"n":"奇幻","v":"/class/������"},{"n":"剧情","v":"/class/������"},{"n":"历史","v":"/class/������"},{"n":"其他","v":"/class/������"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"/area/������"},{"n":"韩国","v":"/area/������"},{"n":"香港","v":"/area/������"},{"n":"台湾","v":"/area/������"},{"n":"日本","v":"/area/������"},{"n":"美国","v":"/area/������"},{"n":"泰国","v":"/area/������"},{"n":"英国","v":"/area/������"},{"n":"新加坡","v":"/area/���������"},{"n":"其他","v":"/area/������"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2024","v":"/year/2024"},{"n":"2023","v":"/year/2023"},{"n":"2022","v":"/year/2022"},{"n":"2021","v":"/year/2021"},{"n":"2020","v":"/year/2020"},{"n":"2019","v":"/year/2019"},{"n":"2018","v":"/year/2018"},{"n":"2017","v":"/year/2017"},{"n":"2016","v":"/year/2016"},{"n":"2015","v":"/year/2015"},{"n":"2014","v":"/year/2014"},{"n":"2013","v":"/year/2013"},{"n":"2012","v":"/year/2012"},{"n":"2011","v":"/year/2011"},{"n":"2010","v":"/year/2010"},{"n":"2009","v":"/year/2009"},{"n":"2008","v":"/year/2008"},{"n":"2006","v":"/year/2006"},{"n":"2005","v":"/year/2005"},{"n":"2004","v":"/year/2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"/lang/������"},{"n":"英语","v":"/lang/������"},{"n":"粤语","v":"/lang/������"},{"n":"闽南语","v":"/lang/���������"},{"n":"韩语","v":"/lang/������"},{"n":"日语","v":"/lang/������"},{"n":"其它","v":"/lang/������"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}]},
  // 筛选默认值：各分类下各筛选项的默认取值（空=全部），配合 url 里的 {{fl.键名}} 使用
  filter_def: {"fenlei1":{"class":"","area":"","year":"","lang":"","by":""},"fenlei2":{"class":"","area":"","year":"","lang":"","by":""},"fenlei3":{"class":"","area":"","year":"","lang":"","by":""},"fenlei4":{"class":"","area":"","year":"","lang":"","by":""}},
  // 引擎只在 filter_url 非空时才对 url 做 jinja2 渲染（渲染 {{fl.xxx}}）；"&" 无副作用
  filter_url: "{{fl.class}}{{fl.area}}{{fl.lang}}{{fl.year}}{{fl.by}}",
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
