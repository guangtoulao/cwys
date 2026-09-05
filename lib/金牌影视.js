var rule = {
  title: "金牌影视",
  host: "https://y2s52n7.com",
  homeUrl: "https://y2s52n7.com/",
  url: "https://y2s52n7.com/api/mw-movie/anonymous/video/list",
  searchUrl: "https://y2s52n7.com/api/mw-movie/anonymous/video/searchByWord?keyword=**&pageNum=1&pageSize=8",
  detailUrl: "https://y2s52n7.com/api/mw-movie/anonymous/video/detail?id=fyid",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  class_name: "电影&电视剧&综艺&动漫",
  class_url: "1&2&3&4",
  timeout: 30000,
  play_parse: true,
  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36" },

  // 推荐 = 首页热搜
  推荐: $js.toString(() => {
    var SEC = "cb808529bae6b6be45ecfab29a4889bc";
    var HOSTS = ["https://y2s52n7.com", "https://www.hkybqufgh.com"];
    var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";
    function signRaw(s) { var md5 = CryptoJS.MD5(s).toString().toLowerCase(); return CryptoJS.SHA1(md5).toString(); }
    function jpGet(path, params) {
      for (var i = 0; i < HOSTS.length; i++) {
        var ts = "" + Date.now();
        // params 含 {TS} 时原样作为签名串（hotSearch 的签名串是 key=..&t=.. 在前，无前置参数）
        var signedStr = (params.indexOf("{TS}") >= 0) ? params.split("{TS}").join(ts) : (params + "&key=" + SEC + "&t=" + ts);
        var sig = signRaw(signedStr);
        var resp = "";
        try {
          resp = request(HOSTS[i] + path, { headers: { "sign": sig, "T": ts, "Deviceid": "Deviceid", "User-Agent": UA, "Referer": HOSTS[i], "Origin": HOSTS[i] } });
        } catch (e) { resp = ""; }
        if (resp && resp.indexOf("{") >= 0) {
          try { var j = JSON.parse(resp); if (j && j.code === 200) return { d: j, h: HOSTS[i] }; } catch (e) {}
        }
      }
      return null;
    }
    var list = [];
    try {
      var r = jpGet("/api/mw-movie/anonymous/home/hotSearch", "key=" + SEC + "&t={TS}");
      var j = r ? r.d : null;
      var arr = (j && j.data) || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        list.push({ vod_id: String(it.vodId), vod_name: it.vodName || "", vod_pic: it.vodPic || "", vod_remarks: it.vodVersion || "" });
      }
    } catch (e) {}
    VODS = list;
  }),

  // 一级 = 分类列表
  一级: $js.toString(() => {
    var SEC = "cb808529bae6b6be45ecfab29a4889bc";
    var HOSTS = ["https://y2s52n7.com", "https://www.hkybqufgh.com"];
    var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";
    function signRaw(s) { var md5 = CryptoJS.MD5(s).toString().toLowerCase(); return CryptoJS.SHA1(md5).toString(); }
    function jpGet(path, params) {
      for (var i = 0; i < HOSTS.length; i++) {
        var ts = "" + Date.now();
        // params 含 {TS} 时原样作为签名串（hotSearch 的签名串是 key=..&t=.. 在前，无前置参数）
        var signedStr = (params.indexOf("{TS}") >= 0) ? params.split("{TS}").join(ts) : (params + "&key=" + SEC + "&t=" + ts);
        var sig = signRaw(signedStr);
        var resp = "";
        try {
          resp = request(HOSTS[i] + path, { headers: { "sign": sig, "T": ts, "Deviceid": "Deviceid", "User-Agent": UA, "Referer": HOSTS[i], "Origin": HOSTS[i] } });
        } catch (e) { resp = ""; }
        if (resp && resp.indexOf("{") >= 0) {
          try { var j = JSON.parse(resp); if (j && j.code === 200) return { d: j, h: HOSTS[i] }; } catch (e) {}
        }
      }
      return null;
    }
    var list = [];
    try {
      var tid = (typeof MY_CATE !== "undefined") ? String(MY_CATE) : "";
      var pg = 1;
      try { pg = parseInt(MY_PAGE, 10) || 1; } catch (e) {}
      var area = "", year = "";
      try { if (typeof MY_FL !== "undefined" && MY_FL && typeof MY_FL === "object") { area = MY_FL.area || ""; year = MY_FL.year || ""; } } catch (e) {}
      var apiParams = "area=" + area + "&pageNum=" + pg + "&type1=" + tid + "&year=" + year;
      var r = jpGet("/api/mw-movie/anonymous/video/list?type1=" + tid +
        "&pageNum=" + pg + "&area=" + encodeURIComponent(area) + "&year=" + encodeURIComponent(year), apiParams);
      var j = r ? r.d : null;
      var arr = (j && j.data && j.data.list) || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        list.push({ vod_id: String(it.vodId), vod_name: it.vodName || "", vod_pic: it.vodPic || "", vod_remarks: it.vodVersion || "" });
      }
    } catch (e) {}
    VODS = list;
  }),

  // 搜索：typeResult 与 result 两个列表合并去重（多数值关键词只有 result 有数据）
  搜索: $js.toString(() => {
    var SEC = "cb808529bae6b6be45ecfab29a4889bc";
    var HOSTS = ["https://y2s52n7.com", "https://www.hkybqufgh.com"];
    var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";
    function signRaw(s) { var md5 = CryptoJS.MD5(s).toString().toLowerCase(); return CryptoJS.SHA1(md5).toString(); }
    function jpGet(path, params) {
      for (var i = 0; i < HOSTS.length; i++) {
        var ts = "" + Date.now();
        // params 含 {TS} 时原样作为签名串（hotSearch 的签名串是 key=..&t=.. 在前，无前置参数）
        var signedStr = (params.indexOf("{TS}") >= 0) ? params.split("{TS}").join(ts) : (params + "&key=" + SEC + "&t=" + ts);
        var sig = signRaw(signedStr);
        var resp = "";
        try {
          resp = request(HOSTS[i] + path, { headers: { "sign": sig, "T": ts, "Deviceid": "Deviceid", "User-Agent": UA, "Referer": HOSTS[i], "Origin": HOSTS[i] } });
        } catch (e) { resp = ""; }
        if (resp && resp.indexOf("{") >= 0) {
          try { var j = JSON.parse(resp); if (j && j.code === 200) return { d: j, h: HOSTS[i] }; } catch (e) {}
        }
      }
      return null;
    }
    var list = [];
    try {
      var kw = (typeof KEY !== "undefined" && KEY) ? String(KEY) : "";
      if (!kw && typeof input !== "undefined") kw = String(input);
      var apiParams = "keyword=" + kw + "&pageNum=1&pageSize=8";
      var reqPath = "/api/mw-movie/anonymous/video/searchByWord?keyword=" + encodeURIComponent(kw) + "&pageNum=1&pageSize=8";
      var r = jpGet(reqPath, apiParams);
      var j = r ? r.d : null;
      var d0 = (j && j.data) || {};
      var arr = ((d0.typeResult && d0.typeResult.list) || []).concat((d0.result && d0.result.list) || []);
      var seen = {};
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        if (!it || it.vodClass === "伦理") continue;
        var id = String(it.vodId);
        if (seen[id]) continue;
        seen[id] = 1;
        list.push({ vod_id: id, vod_name: it.vodName || "", vod_pic: it.vodPic || "", vod_remarks: it.vodRemarks || it.vodVersion || "" });
      }
    } catch (e) {}
    VODS = list;
  }),

  // 二级 = 详情 + 剧集（episodeList -> 集名$vodId@nid）
  二级: $js.toString(() => {
    var SEC = "cb808529bae6b6be45ecfab29a4889bc";
    var HOSTS = ["https://y2s52n7.com", "https://www.hkybqufgh.com"];
    var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";
    function signRaw(s) { var md5 = CryptoJS.MD5(s).toString().toLowerCase(); return CryptoJS.SHA1(md5).toString(); }
    function jpGet(path, params) {
      for (var i = 0; i < HOSTS.length; i++) {
        var ts = "" + Date.now();
        // params 含 {TS} 时原样作为签名串（hotSearch 的签名串是 key=..&t=.. 在前，无前置参数）
        var signedStr = (params.indexOf("{TS}") >= 0) ? params.split("{TS}").join(ts) : (params + "&key=" + SEC + "&t=" + ts);
        var sig = signRaw(signedStr);
        var resp = "";
        try {
          resp = request(HOSTS[i] + path, { headers: { "sign": sig, "T": ts, "Deviceid": "Deviceid", "User-Agent": UA, "Referer": HOSTS[i], "Origin": HOSTS[i] } });
        } catch (e) { resp = ""; }
        if (resp && resp.indexOf("{") >= 0) {
          try { var j = JSON.parse(resp); if (j && j.code === 200) return { d: j, h: HOSTS[i] }; } catch (e) {}
        }
      }
      return null;
    }
    VOD = VOD || {};
    try {
      var mu = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
      var m = mu.match(/[?&]id=([^&]+)/);
      var vid = m ? m[1] : "";
      if (!vid) vid = mu.split("/").pop();
      var r = jpGet("/api/mw-movie/anonymous/video/detail?id=" + vid, "id=" + vid);
      var j = r ? r.d : null;
      var data = (j && j.data) || {};
      VOD.vod_id = vid;
      VOD.vod_name = data.vodName || "";
      VOD.vod_pic = data.vodPic || "";
      VOD.vod_remarks = data.vodRemarks || data.vodVersion || "";
      VOD.vod_year = data.vodYear || "";
      VOD.vod_area = data.vodArea || "";
      VOD.vod_actor = data.vodActor || "";
      VOD.vod_director = data.vodDirector || "";
      VOD.vod_content = (data.vodContent || data.vodBlurb || "").replace(/<[^>]+>/g, " ").trim();
      VOD.type_name = data.vodClass || data.typeName || "";
      var eps = data.episodeList || [];
      var parts = [];
      for (var i = 0; i < eps.length; i++) {
        var e = eps[i];
        var nid = e.nid || "";
        if (!nid) continue;
        var nm = e.name || "";
        if (/^\d+$/.test(nm)) nm = "第" + nm + "集";
        if (!nm) nm = "第" + (i + 1) + "集";
        parts.push(nm + "$" + vid + "@" + nid);
      }
      VOD.vod_play_from = "君子兰①";
      VOD.vod_play_url = parts.length > 0 ? parts.join("#") : ("播放$" + vid + "@");
    } catch (e) {
      VOD.vod_play_from = "君子兰①";
      VOD.vod_play_url = "";
    }
  }),

  // 播放：取流并选最优清晰度（flag=true 且 needLogin=false 里 resolution 最大者）
  play: $js.toString(() => {
    var SEC = "cb808529bae6b6be45ecfab29a4889bc";
    var HOSTS = ["https://y2s52n7.com", "https://www.hkybqufgh.com"];
    var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";
    function signRaw(s) { var md5 = CryptoJS.MD5(s).toString().toLowerCase(); return CryptoJS.SHA1(md5).toString(); }
    function jpGet(path, params) {
      for (var i = 0; i < HOSTS.length; i++) {
        var ts = "" + Date.now();
        // params 含 {TS} 时原样作为签名串（hotSearch 的签名串是 key=..&t=.. 在前，无前置参数）
        var signedStr = (params.indexOf("{TS}") >= 0) ? params.split("{TS}").join(ts) : (params + "&key=" + SEC + "&t=" + ts);
        var sig = signRaw(signedStr);
        var resp = "";
        try {
          resp = request(HOSTS[i] + path, { headers: { "sign": sig, "T": ts, "Deviceid": "Deviceid", "User-Agent": UA, "Referer": HOSTS[i], "Origin": HOSTS[i] } });
        } catch (e) { resp = ""; }
        if (resp && resp.indexOf("{") >= 0) {
          try { var j = JSON.parse(resp); if (j && j.code === 200) return { d: j, h: HOSTS[i] }; } catch (e) {}
        }
      }
      return null;
    }
    var ep = (typeof input === "string") ? input : "";
    if (ep) {
      try {
        var pure = ep;
        var dollar = pure.lastIndexOf("$");
        if (dollar >= 0) pure = pure.substring(dollar + 1);
        var sp = pure.split("@");
        var vid = sp[0] || "";
        var nid = sp[1] || "";
        if (vid && nid) {
          var r = jpGet("/api/mw-movie/anonymous/v2/video/episode/url?id=" + vid + "&nid=" + nid, "id=" + vid + "&nid=" + nid);
          var j = r ? r.d : null;
          var host = r ? r.h : HOSTS[0];
          var arr = (j && j.data && j.data.list) || [];
          var best = "", bestRes = -1;
          for (var i = 0; i < arr.length; i++) {
            var it = arr[i];
            if (it.needLogin) continue;
            if (it.flag === false) continue;
            var res = parseInt(it.resolution, 10) || 0;
            var u = it.url || "";
            if (u.indexOf("http") !== 0) continue;
            if (res > bestRes) { bestRes = res; best = u; }
          }
          if (!best && arr.length) {
            for (var k = 0; k < arr.length; k++) {
              var u2 = arr[k].url || "";
              if (u2.indexOf("http") === 0) { best = u2; break; }
            }
          }
          if (best) {
            input = { parse: 0, url: best, jx: 0, header: { "User-Agent": UA, "Referer": host, "Origin": host } };
          }
        }
      } catch (e) {}
    }
  }),
  lazy: $js.toString(() => {
    var SEC = "cb808529bae6b6be45ecfab29a4889bc";
    var HOSTS = ["https://y2s52n7.com", "https://www.hkybqufgh.com"];
    var UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36";
    function signRaw(s) { var md5 = CryptoJS.MD5(s).toString().toLowerCase(); return CryptoJS.SHA1(md5).toString(); }
    function jpGet(path, params) {
      for (var i = 0; i < HOSTS.length; i++) {
        var ts = "" + Date.now();
        // params 含 {TS} 时原样作为签名串（hotSearch 的签名串是 key=..&t=.. 在前，无前置参数）
        var signedStr = (params.indexOf("{TS}") >= 0) ? params.split("{TS}").join(ts) : (params + "&key=" + SEC + "&t=" + ts);
        var sig = signRaw(signedStr);
        var resp = "";
        try {
          resp = request(HOSTS[i] + path, { headers: { "sign": sig, "T": ts, "Deviceid": "Deviceid", "User-Agent": UA, "Referer": HOSTS[i], "Origin": HOSTS[i] } });
        } catch (e) { resp = ""; }
        if (resp && resp.indexOf("{") >= 0) {
          try { var j = JSON.parse(resp); if (j && j.code === 200) return { d: j, h: HOSTS[i] }; } catch (e) {}
        }
      }
      return null;
    }
    var ep = (typeof input === "string") ? input : "";
    if (ep) {
      try {
        var pure = ep;
        var dollar = pure.lastIndexOf("$");
        if (dollar >= 0) pure = pure.substring(dollar + 1);
        var sp = pure.split("@");
        var vid = sp[0] || "";
        var nid = sp[1] || "";
        if (vid && nid) {
          var r = jpGet("/api/mw-movie/anonymous/v2/video/episode/url?id=" + vid + "&nid=" + nid, "id=" + vid + "&nid=" + nid);
          var j = r ? r.d : null;
          var host = r ? r.h : HOSTS[0];
          var arr = (j && j.data && j.data.list) || [];
          var best = "", bestRes = -1;
          for (var i = 0; i < arr.length; i++) {
            var it = arr[i];
            if (it.needLogin) continue;
            if (it.flag === false) continue;
            var res = parseInt(it.resolution, 10) || 0;
            var u = it.url || "";
            if (u.indexOf("http") !== 0) continue;
            if (res > bestRes) { bestRes = res; best = u; }
          }
          if (!best && arr.length) {
            for (var k = 0; k < arr.length; k++) {
              var u2 = arr[k].url || "";
              if (u2.indexOf("http") === 0) { best = u2; break; }
            }
          }
          if (best) {
            input = { parse: 0, url: best, jx: 0, header: { "User-Agent": UA, "Referer": host, "Origin": host } };
          }
        }
      } catch (e) {}
    }
  })
};
