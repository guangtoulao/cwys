var rule = {
  title: "乌云影视",
  host: "https://wooyun.tv",
  homeUrl: "https://wooyun.tv/",
  url: "https://wooyun.tv/",
  searchUrl: "https://wooyun.tv/movie/media/search",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  headers: {"User-Agent":"MOBILE_UA"},
  timeout: 10000,
  play_parse: true,
  // wooyun 是 Next.js 单页应用，服务端无分类路由，这里仅给出分类入口，
  // 一级统一走浏览 API（/movie/media/search 空关键词 = 全部），按 MY_PAGE 翻页。
  class_name: "最新&电影&剧集&综艺&动漫",
  class_url: "1&2&3&4&5",
  limit: 24,
  // 推荐：调用浏览 API（首页 = 第 1 页）
  推荐: $js.toString(() => {
    var HOST = "https://wooyun.tv";
    var list = [];
    try {
      var body = JSON.stringify({topCode:"", menuCodeList:[], pageIndex:1, pageSize:24, searchKey:"", sortCode:""});
      var html = "";
      try { html = (typeof request==="function") ? request(HOST+"/movie/media/search", {method:"POST", headers:{"Content-Type":"application/json"}, body:body}) : ""; } catch(e) { html = ""; }
      var txt = (typeof html==="string") ? html : (html && html.content ? html.content : "");
      var j = JSON.parse(txt);
      var recs = (j && j.data && j.data.records) || [];
      for (var i=0;i<recs.length;i++){
        var it = recs[i];
        list.push({url:"/play/"+it.id, title:it.title||"", pic_url:it.posterUrl||"", content:it.description||it.overview||""});
      }
    } catch(e) {}
    VODS = list;
    if (typeof setResult==="function") setResult(list);
  }),
  // 一级：同样走浏览 API，按 MY_PAGE 翻页（wooyun 无服务端分类，各分类内容一致）
  一级: $js.toString(() => {
    var HOST = "https://wooyun.tv";
    var pg = 1;
    try { pg = parseInt(MY_PAGE,10) || 1; } catch(e) { pg = 1; }
    var list = [];
    try {
      var body = JSON.stringify({topCode:"", menuCodeList:[], pageIndex:pg, pageSize:24, searchKey:"", sortCode:""});
      var html = "";
      try { html = (typeof request==="function") ? request(HOST+"/movie/media/search", {method:"POST", headers:{"Content-Type":"application/json"}, body:body}) : ""; } catch(e) { html = ""; }
      var txt = (typeof html==="string") ? html : (html && html.content ? html.content : "");
      var j = JSON.parse(txt);
      var recs = (j && j.data && j.data.records) || [];
      for (var i=0;i<recs.length;i++){
        var it = recs[i];
        list.push({url:"/play/"+it.id, title:it.title||"", pic_url:it.posterUrl||"", content:it.description||it.overview||""});
      }
    } catch(e) {}
    VODS = list;
    if (typeof setResult==="function") setResult(list);
  }),
  // 搜索：wooyun 搜索是客户端 Next.js 行为，服务端 ?q= 不起作用，必须调 /movie/media/search 接口
  搜索: $js.toString(() => {
    var HOST = "https://wooyun.tv";
    var pg = 1;
    try { pg = parseInt(MY_PAGE,10) || 1; } catch(e) { pg = 1; }
    var wd = (typeof KEY!=="undefined") ? KEY : (typeof input!=="undefined" ? input : "");
    var list = [];
    try {
      var body = JSON.stringify({topCode:"", menuCodeList:[], pageIndex:pg, pageSize:24, searchKey:wd, sortCode:""});
      var html = "";
      try { html = (typeof request==="function") ? request(HOST+"/movie/media/search", {method:"POST", headers:{"Content-Type":"application/json"}, body:body}) : ""; } catch(e) { html = ""; }
      var txt = (typeof html==="string") ? html : (html && html.content ? html.content : "");
      var j = JSON.parse(txt);
      var recs = (j && j.data && j.data.records) || [];
      for (var i=0;i<recs.length;i++){
        var it = recs[i];
        list.push({url:"/play/"+it.id, title:it.title||"", pic_url:it.posterUrl||"", content:it.description||it.overview||""});
      }
    } catch(e) {}
    VODS = list;
    if (typeof setResult==="function") setResult(list);
  }),
  // 二级：详情=播放同页（/play/{id}）。wooyun 是 Next.js，剧集列表内嵌在 RSC flight 数据里：
  // initialVideoGroups.packageList[].videoList[]，每项含 remark(第N集) + playUrl(直链 m3u8)。
  // 这里抠出全部剧集（按语言分组），并提取标题/封面/简介；没有剧集时退回单集兜底。
  二级: $js.toString(() => {
    var HOST = "https://wooyun.tv";
    var detailHtml = "";
    try { detailHtml = (typeof request==="function") ? request(MY_URL) : ""; } catch(e) { detailHtml = ""; }
    if (!detailHtml && typeof input==="string" && input.indexOf(String.fromCharCode(60))>-1) detailHtml = input;
    VOD = VOD || {};
    VOD.vod_id = (typeof input==="string") ? input : "";
    try { VOD.vod_name = (pdfh(detailHtml, "h4&&Text")||pdfh(detailHtml,"h1&&Text")||"").replace(/在线观看$/,"").replace(/\n|\t/g,"").trim(); } catch(e) {}
    try {
      var poster = (detailHtml.match(/https?:\/\/static\.wooyun\.tv\/movie\/poster\/[^"'<>\s]+\.(?:jpg|jpeg|png)/i)||[])[0] || pdfh(detailHtml,"img&&src") || "";
      VOD.vod_pic = poster;
    } catch(e) {}
    var content = "";
    try { content = pdfh(detailHtml, "meta[name=description]&&content").replace(/\n|\t/g,"").trim(); } catch(e) {}
    if (!content) {
      var ma = detailHtml.match(/主演[：:][^<]{2,120}/); var md = detailHtml.match(/导演[：:][^<]{2,80}/);
      var parts = []; if (ma) parts.push(ma[0]); if (md) parts.push(md[0]); content = parts.join("  ");
    }
    VOD.vod_content = content;

    // 抠剧集：拼接所有 self.__next_f.push([1,"..."]) 片段，再抽 videoList 数组（括号匹配）
    var got = false;
    try {
      var chunks = [];
      var re = /self\.__next_f\.push\(\[1,\s*("(?:[^"\\]|\\.)*")\s*\]\)/g;
      var mm;
      while ((mm = re.exec(detailHtml)) !== null) {
        try { chunks.push(JSON.parse(mm[1])); } catch(e2) {}
      }
      var all = chunks.join("\n");
      var vi = all.indexOf('"videoList":[');
      if (vi > -1) {
        var s = vi + '"videoList":'.length;
        var depth = 0, started = false, end = s;
        for (var qi = s; qi < all.length; qi++) {
          var ch = all.charAt(qi);
          if (ch === "[") { depth++; started = true; }
          else if (ch === "]") { depth--; if (started && depth === 0) { end = qi + 1; break; } }
        }
        var arr = JSON.parse(all.slice(s, end));
        var groups = {};
        for (var i = 0; i < arr.length; i++) {
          var ep = arr[i];
          var lang = ep.language || "播放";
          var name = ep.remark || ("第" + (ep.epNo || (i + 1)) + "集");
          var u = ep.playUrl || "";
          if (!u) continue;
          if (groups[lang]) groups[lang] += "#" + name + "$" + u;
          else groups[lang] = name + "$" + u;
        }
        var langs = [];
        for (var L in groups) { if (groups.hasOwnProperty(L)) langs.push(L); }
        if (langs.length) {
          var circled = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩","⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳"];
          var fromNames = langs.map(function(l, idx){ return "君子兰" + (circled[idx] || ("第"+(idx+1)+"线")); });
          VOD.vod_play_from = fromNames.join("$$$");
          VOD.vod_play_url = langs.map(function(l){ return groups[l]; }).join("$$$");
          got = true;
        }
      }
    } catch(e) {}

    // 兜底：未解析到剧集（如老结构/单集）时退回整页 URL，交给 play() 二次抠 m3u8
    if (!got) {
      VOD.vod_play_from = "君子兰①";
      VOD.vod_play_url = "播放$" + ((typeof input==="string") ? input : MY_URL);
    }
    setResult(VOD);
  }),
  // play/lazy：拿到 /play/{id} 页面，正则抠 m3u8。优先 c1.ddbbffcdn.com 直链，
  // 兜底 hls-proxy 代理（wooyun 自家 CDN，parse:0 直链交给播放器）。绝不能有 return。
  play: $js.toString(() => {
    var u = (typeof input==="string") ? input.split(String.fromCharCode(36)).pop() : "";
    if (u) {
      if (u.indexOf("http")!==0) u = "https://wooyun.tv" + (u.charAt(0)==="/" ? u : "/"+u);
      if (/\.m3u8/i.test(u)) { input = { parse:0, url:u, jx:0 }; }
      else {
      var playHtml = "";
      try { playHtml = (typeof request==="function") ? request(u) : ""; } catch(e) { playHtml = ""; }
      if (!playHtml && typeof input==="string" && input.indexOf(String.fromCharCode(60))>-1) playHtml = input;
      playHtml = (playHtml||"").split(String.fromCharCode(92)).join("/");
      var m3u8 = "";
      // 1) 优先从 hls-proxy 参数里解出真 m3u8（避免多级 302，fengbao10 直链可直接播）
      var prox = playHtml.match(/https?:\/\/wooyun\.tv\/api\/hls-proxy\?url=[^"'<>\s]+/i);
      if (prox) {
        var pm = prox[0].match(/[?&]url=([^&"'\s]+)/);
        if (pm) { try {
          var e1 = decodeURIComponent(pm[1]);
          var gm = e1.match(/gen_overseas\/(https?%3A[^"'<>\s]*)/i) || e1.match(/(https?%3A[^"'<>\s]*\.m3u8)/i);
          var inner = gm ? gm[1] : (/^https?:\/\//i.test(e1) ? e1 : "");
          if (inner) { var fin = decodeURIComponent(inner); if (/\.m3u8/i.test(fin)) m3u8 = fin; }
        } catch(e) {} }
      }
      // 2) c1 直链（部分老片仍可用）
      if (!m3u8) { var c1 = playHtml.match(/https?:\/\/c1\.ddbbffcdn\.com[^"'<>\s]+?\.m3u8[^"'<>\s]*/i); if (c1) m3u8 = c1[0]; }
      // 3) 页面里任意 m3u8
      if (!m3u8) { var sm = playHtml.match(/https?:\/\/[^"'<>\s]+?\.m3u8[^"'<>\s]*/i); if (sm) m3u8 = sm[0]; }
      // 4) 兜底：hls-proxy 原链交给播放器跟 302
      if (!m3u8 && prox) m3u8 = prox[0];
      if (!m3u8) {
        var ms = playHtml.match(/"url"\s*:\s*"([^"]+)"/g) || [];
        for (var j=0;j<ms.length;j++){ var ju = ms[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join("/"); if (/\.m3u8/i.test(ju)) { m3u8 = ju; break; } }
      }
      if (m3u8) input = { parse:0, url:m3u8, jx:0 };
      }
    }
    if (typeof setResult==="function") setResult(input);
  }),
  lazy: $js.toString(() => {
    var u = (typeof input==="string") ? input.split(String.fromCharCode(36)).pop() : "";
    if (u) {
      if (u.indexOf("http")!==0) u = "https://wooyun.tv" + (u.charAt(0)==="/" ? u : "/"+u);
      if (/\.m3u8/i.test(u)) { input = { parse:0, url:u, jx:0 }; }
      else {
      var playHtml = "";
      try { playHtml = (typeof request==="function") ? request(u) : ""; } catch(e) { playHtml = ""; }
      if (!playHtml && typeof input==="string" && input.indexOf(String.fromCharCode(60))>-1) playHtml = input;
      playHtml = (playHtml||"").split(String.fromCharCode(92)).join("/");
      var m3u8 = "";
      // 1) 优先从 hls-proxy 参数里解出真 m3u8（避免多级 302，fengbao10 直链可直接播）
      var prox = playHtml.match(/https?:\/\/wooyun\.tv\/api\/hls-proxy\?url=[^"'<>\s]+/i);
      if (prox) {
        var pm = prox[0].match(/[?&]url=([^&"'\s]+)/);
        if (pm) { try {
          var e1 = decodeURIComponent(pm[1]);
          var gm = e1.match(/gen_overseas\/(https?%3A[^"'<>\s]*)/i) || e1.match(/(https?%3A[^"'<>\s]*\.m3u8)/i);
          var inner = gm ? gm[1] : (/^https?:\/\//i.test(e1) ? e1 : "");
          if (inner) { var fin = decodeURIComponent(inner); if (/\.m3u8/i.test(fin)) m3u8 = fin; }
        } catch(e) {} }
      }
      // 2) c1 直链（部分老片仍可用）
      if (!m3u8) { var c1 = playHtml.match(/https?:\/\/c1\.ddbbffcdn\.com[^"'<>\s]+?\.m3u8[^"'<>\s]*/i); if (c1) m3u8 = c1[0]; }
      // 3) 页面里任意 m3u8
      if (!m3u8) { var sm = playHtml.match(/https?:\/\/[^"'<>\s]+?\.m3u8[^"'<>\s]*/i); if (sm) m3u8 = sm[0]; }
      // 4) 兜底：hls-proxy 原链交给播放器跟 302
      if (!m3u8 && prox) m3u8 = prox[0];
      if (!m3u8) {
        var ms = playHtml.match(/"url"\s*:\s*"([^"]+)"/g) || [];
        for (var j=0;j<ms.length;j++){ var ju = ms[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join("/"); if (/\.m3u8/i.test(ju)) { m3u8 = ju; break; } }
      }
      if (m3u8) input = { parse:0, url:m3u8, jx:0 };
      }
    }
    if (typeof setResult==="function") setResult(input);
  })
};
