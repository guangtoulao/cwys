var rule = {
  title: "星辰",
  host: "https://www.xcyycn.tv",
  homeUrl: "https://www.xcyycn.tv/",
  url: "https://www.xcyycn.tv/v/fyclass.html",
  searchUrl: "https://www.xcyycn.tv/s.html?wd=**",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  headers: {"User-Agent":"MOBILE_UA"},
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视剧&综艺&动漫",
  class_url: "1&2&3&4",
  // 推荐/一级/搜索：列表;标题;图片;描述;链接（选择器串，工具自动识别）
  推荐: "body div.public-list-div;a&&title;img&&data-src;.public-list-prb&&Text;a&&href",
  一级: "body div.public-list-div;a&&title;img&&data-src;;a&&href",
  搜索: "body div.public-list-box.search-box;.thumb-txt&&Text;img&&data-src;;a.public-list-exp&&href",
  // 二级：手填区覆盖了模板字段（已转 $js.toString 函数并去随机尾数）
  二级: $js.toString(() => {
  var HOST = "https://www.xcyycn.tv";
  var detailHtml = (typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) ? input : (function(){ try { return request(MY_URL); } catch(e) { return ""; } })();
  VOD = VOD || {};
  try { VOD.vod_name = pdfh(detailHtml, ".slide-info-title&&Text").replace(/\n|\t/g, "").trim(); } catch(e){}
  try { if (".fraction&&Text") {
    var _d0 = pdfh(detailHtml, ".fraction&&Text").replace(/\n|\t/g, "").trim(); VOD.vod_remarks = _d0;
    var _ds = ".fraction&&Text;.slide-info-remarks:eq(1)&&Text;.slide-info-remarks:eq(2)&&Text;.slide-info:eq(2)--strong&&Text;.slide-info:eq(1)--strong&&Text".split(";");
    if(_ds.length>1) VOD.vod_year = pdfh(detailHtml, _ds[1]).replace(/\n|\t/g,"").trim();
    if(_ds.length>2) VOD.vod_area = pdfh(detailHtml, _ds[2]).replace(/\n|\t/g,"").trim();
    if(_ds.length>3) VOD.vod_actor = pdfh(detailHtml, _ds[3]).replace(/\n|\t/g,"").trim();
    if(_ds.length>4) VOD.vod_director = pdfh(detailHtml, _ds[4]).replace(/\n|\t/g,"").trim();
  } } catch(e){}
  try { if ("#height_limit&&Text") VOD.vod_content = pdfh(detailHtml, "#height_limit&&Text").replace(/\n|\t/g, "").trim(); } catch(e){}
  try { if (".detail-pic&&data-original") VOD.vod_pic = pd(detailHtml, ".detail-pic&&data-original", MY_URL); } catch(e){}
  var tabsSel = ".anthology-tab a";
  var tabText = ".swiper-slide&&Text";
  var names = []; var seen = {};
  var tabEls = []; try { tabEls = pdfa(detailHtml, tabsSel); } catch(e) { tabEls = []; };
  for (var i=0;i<tabEls.length;i++){
    var nm = ""; try { nm = pdfh(tabEls[i], tabText).trim(); } catch(e){}
    if(!nm) nm = "线路空";
    nm = nm.replace(/\s+/g,"").replace(/\d{2,}$/,"");
    if(seen[nm]){ seen[nm]++; nm = nm + seen[nm]; } else { seen[nm]=1; }
    names.push(nm);
  }
  var listText = "a&&Text";
  var listUrl = "a&&href";
  var listPrefix = "";
  var urls = [];
  for (var i=0;i<names.length;i++){
    var p1 = ".anthology-list-box:eq(#id) li".replace(/#idv/g, names[i]).replace(/#id/g, String(i));
    var items = []; try { items = pdfa(detailHtml, p1); } catch(e) { items = []; }
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
  tab_rename: {"天王":"君子兰①","水星":"君子兰②","金星":"君子兰③","地球":"君子兰④","火星":"君子兰⑤","木星":"君子兰⑥","土星":"君子兰⑦","http下载":"君子兰⑧"},
  play: $js.toString(() => {
  // 注意：js: 代码由引擎 eval 执行，内部**不能出现 return**（会抛 Illegal return statement，
  // 被引擎 catch 后静默回退为原始播放页地址 + parse:1 → TVBox 播放失败）。改用 if(u) 包裹。
  var u = (typeof input === "string") ? input.split(String.fromCharCode(36)).pop() : "";
  if (u) {
    var playHtml = "";
    try { playHtml = (typeof request === "function") ? request(u) : ""; } catch(e) { playHtml = ""; }
    if (!playHtml && typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) playHtml = input;
    playHtml = playHtml.split(String.fromCharCode(92) + String.fromCharCode(47)).join(String.fromCharCode(47));
    var m3u8 = "";
    var sm = playHtml.match(/https?:\/\/[^" <>&]+?\.(?:m3u8|mp4)(?:\?[^" <>&]*)?/i);
    if (sm) m3u8 = sm[0];
    if (!m3u8) {
      var jm = playHtml.match(/"url"\s*:\s*"([^"]+)"/gi);
      if (jm) { for (var j = 0; j < jm.length; j++) { var ju = jm[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join(String.fromCharCode(47)); if (/\.(?:m3u8|mp4)/i.test(ju) || /^https?:/i.test(ju)) { m3u8 = ju; break; } } }
    }
    if (!m3u8) {
      var pm = playHtml.match(/"第0?\d+集\$https?:\/\/[^"]*"/g);
      if (pm && pm.length) { for (var k = 0; k < pm.length; k++) { var mm = pm[k].match(/\$https?:\/\/[^"]*\.(?:m3u8|mp4)/); if (mm) { m3u8 = mm[0].replace(/^\$/, ""); break; } } }
    }
    // 显式 parse:0：否则引擎按 SPECIAL_URL(只认 ftp/magnet/thunder/ws) 算出 parse:1，
    // TVBox 会把已提取好的 m3u8 再拿去"解析一遍"当网页处理 → 播放错误。
    if (m3u8) input = { parse: 0, url: m3u8, jx: 0 };
  }
  if (typeof setResult === "function") setResult(input);
}),
  lazy: $js.toString(() => {
  // 同 play 的注释：js: 代码由引擎 eval 执行，内部**不能出现 return**（Illegal return statement
  // 会导致引擎静默回退原始地址 + parse:1 → 播放失败）。改用 if(u) 包裹。
  var u = (typeof input === "string") ? input.split(String.fromCharCode(36)).pop() : "";
  if (u) {
    var playHtml = "";
    try { playHtml = (typeof request === "function") ? request(u) : ""; } catch(e) { playHtml = ""; }
    if (!playHtml && typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) playHtml = input;
    playHtml = playHtml.split(String.fromCharCode(92) + String.fromCharCode(47)).join(String.fromCharCode(47));
    var m3u8 = "";
    var sm = playHtml.match(/https?:\/\/[^" <>&]+?\.(?:m3u8|mp4)(?:\?[^" <>&]*)?/i);
    if (sm) m3u8 = sm[0];
    if (!m3u8) {
      var jm = playHtml.match(/"url"\s*:\s*"([^"]+)"/gi);
      if (jm) { for (var j = 0; j < jm.length; j++) { var ju = jm[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join(String.fromCharCode(47)); if (/\.(?:m3u8|mp4)/i.test(ju) || /^https?:/i.test(ju)) { m3u8 = ju; break; } } }
    }
    if (!m3u8) {
      var pm = playHtml.match(/"第0?\d+集\$https?:\/\/[^"]*"/g);
      if (pm && pm.length) { for (var k = 0; k < pm.length; k++) { var mm = pm[k].match(/\$https?:\/\/[^"]*\.(?:m3u8|mp4)/); if (mm) { m3u8 = mm[0].replace(/^\$/, ""); break; } } }
    }
    // 显式 parse:0 强制直播，避免 TVBox 二次解析
    if (m3u8) input = { parse: 0, url: m3u8, jx: 0 };
  }
  if (typeof setResult === "function") setResult(input);
})
};