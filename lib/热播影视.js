var rule = {
  title: "热播影视",
  host: "http://v.rbotv.cn",
  homeUrl: "http://v.rbotv.cn/",
  url: "http://v.rbotv.cn/v3/home/type_search",
  searchUrl: "http://v.rbotv.cn/v3/home/search",
  detailUrl: "http://v.rbotv.cn/v3/home/vod_details?id=fyid",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  class_name: "内地&电影&动漫&综艺&韩剧&泰剧&港剧&日剧&美剧&台剧",
  class_url: "10&1&11&13&2&7&8&4&5&9",
  timeout: 10000,
  play_parse: true,
  headers: { "User-Agent": "okhttp-okgo/jeasonlzy" },

  // 推荐 = 电影分类第 1 页
  推荐: $js.toString(() => {
    var SEC = "7gp0bnd2sr85ydii2j32pcypscoc4w6c7g5spl";
    var HOST = "http://v.rbotv.cn";
    var list = [];
    try {
      var ts = "" + Math.floor(Date.now() / 1000);
      var sig = CryptoJS.MD5(SEC + ts).toString();
      var body = "timestamp=" + ts + "&sign=" + sig + "&type_id=1&limit=12&page=1";
      var resp = request(HOST + "/v3/home/type_search", {
        method: "POST", headers: { "User-Agent": "okhttp-okgo/jeasonlzy", "Content-Type": "application/x-www-form-urlencoded" }, body: body
      });
      var j = JSON.parse(resp);
      var arr = (j && j.data && j.data.list) || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        var pic = it.vod_pic || it.vod_pic_thumb || "";
        list.push({ vod_id: String(it.vod_id), vod_name: it.vod_name || "", vod_pic: pic, vod_remarks: it.vod_remarks || "" });
      }
    } catch (e) {}
    VODS = list;
  }),

  // 一级 = 分类列表（POST type_search）
  一级: $js.toString(() => {
    var SEC = "7gp0bnd2sr85ydii2j32pcypscoc4w6c7g5spl";
    var HOST = "http://v.rbotv.cn";
    var list = [];
    try {
      var tid = (typeof MY_CATE !== "undefined") ? String(MY_CATE) : "";
      var pg = 1;
      try { pg = parseInt(MY_PAGE, 10) || 1; } catch (e) {}
      var ts = "" + Math.floor(Date.now() / 1000);
      var sig = CryptoJS.MD5(SEC + ts).toString();
      var body = "timestamp=" + ts + "&sign=" + sig + "&type_id=" + encodeURIComponent(tid) + "&limit=12&page=" + pg;
      var resp = request(HOST + "/v3/home/type_search", {
        method: "POST", headers: { "User-Agent": "okhttp-okgo/jeasonlzy", "Content-Type": "application/x-www-form-urlencoded" }, body: body
      });
      var j = JSON.parse(resp);
      var arr = (j && j.data && j.data.list) || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        var pic = it.vod_pic || it.vod_pic_thumb || "";
        list.push({ vod_id: String(it.vod_id), vod_name: it.vod_name || "", vod_pic: pic, vod_remarks: it.vod_remarks || "" });
      }
    } catch (e) {}
    VODS = list;
  }),

  // 搜索（引擎把搜索词放 KEY）
  搜索: $js.toString(() => {
    var SEC = "7gp0bnd2sr85ydii2j32pcypscoc4w6c7g5spl";
    var HOST = "http://v.rbotv.cn";
    var list = [];
    try {
      var kw = (typeof KEY !== "undefined" && KEY) ? String(KEY) : "";
      if (!kw && typeof input !== "undefined") kw = String(input);
      var ts = "" + Math.floor(Date.now() / 1000);
      var sig = CryptoJS.MD5(SEC + ts).toString();
      var body = "timestamp=" + ts + "&sign=" + sig + "&keyword=" + encodeURIComponent(kw) + "&limit=12&page=1";
      var resp = request(HOST + "/v3/home/search", {
        method: "POST", headers: { "User-Agent": "okhttp-okgo/jeasonlzy", "Content-Type": "application/x-www-form-urlencoded" }, body: body
      });
      var j = JSON.parse(resp);
      var arr = (j && j.data && j.data.list) || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        var pic = it.vod_pic || it.vod_pic_thumb || "";
        list.push({ vod_id: String(it.vod_id), vod_name: it.vod_name || "", vod_pic: pic, vod_remarks: it.vod_remarks || "" });
      }
    } catch (e) {}
    VODS = list;
  }),

  // 二级 = 详情 + 各源剧集
  二级: $js.toString(() => {
    var SEC = "7gp0bnd2sr85ydii2j32pcypscoc4w6c7g5spl";
    var HOST = "http://v.rbotv.cn";
    VOD = VOD || {};
    try {
      var mu = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
      var m = mu.match(/[?&]id=([^&]+)/);
      var vid = m ? m[1] : "";
      if (!vid) { var mu2 = (typeof input !== "undefined") ? String(input) : ""; var m2 = mu2.match(/[?&]id=([^&]+)/); vid = m2 ? m2[1] : ""; }
      var ts = "" + Math.floor(Date.now() / 1000);
      var sig = CryptoJS.MD5(SEC + ts).toString();
      var body = "timestamp=" + ts + "&sign=" + sig + "&vod_id=" + encodeURIComponent(vid);
      var resp = request(HOST + "/v3/home/vod_details", {
        method: "POST", headers: { "User-Agent": "okhttp-okgo/jeasonlzy", "Content-Type": "application/x-www-form-urlencoded" }, body: body
      });
      var j = JSON.parse(resp);
      var data = (j && j.data) || {};
      var pic = data.vod_pic || data.vod_pic_thumb || "";
      VOD.vod_id = vid;
      VOD.vod_name = data.vod_name || "";
      VOD.vod_pic = pic;
      VOD.vod_remarks = data.vod_remarks || "";
      VOD.vod_year = data.vod_year || "";
      VOD.vod_area = data.vod_area || "";
      VOD.vod_actor = data.vod_actor || "";
      VOD.vod_director = data.vod_director || "";
      VOD.vod_content = data.vod_content || "";
      VOD.type_name = data.vod_class || "";
      var pl = data.vod_play_list || [];
      var froms = [];
      var urlsArr = [];
      for (var s = 0; s < pl.length; s++) {
        var src = pl[s];
        var fromName = src.name || ("线路" + (s + 1));
        var ua = src.ua || "";
        var parseUrls = src.parse_urls || [];
        var parseStr = parseUrls.join("@");
        var urls = src.urls || [];
        var eps = [];
        for (var i = 0; i < urls.length; i++) {
          var u = urls[i];
          var epName = u.name || ("第" + (i + 1) + "集");
          var raw = u.url || "";
          if (!raw) continue;
          // 剧集值：parse前缀们@连接|原始url|ua —— 兼容直链(m3u8)与加密(需解密API)两种源
          eps.push(epName + "$" + parseStr + "|" + raw + "|" + ua);
        }
        if (eps.length > 0) {
          froms.push("君子兰" + (froms.length < 20 ? String.fromCharCode(9312 + froms.length) : String(froms.length + 1)));
          urlsArr.push(eps.join("#"));
        }
      }
      if (froms.length > 0) {
        VOD.vod_play_from = froms.join("$$$");
        VOD.vod_play_url = urlsArr.join("$$$");
      }
    } catch (e) {}
  }),

  // play/lazy：剧集值 = parse串|原始url|ua；兼容 TVBox 传整条 name$xxx 或只 xxx
  play: $js.toString(() => {
    var SEC = "7gp0bnd2sr85ydii2j32pcypscoc4w6c7g5spl";
    var HOST = "http://v.rbotv.cn";
    var ep = (typeof input === "string") ? input : "";
    if (ep) {
      try {
        var pure = ep;
        var dollar = pure.lastIndexOf("$");
        if (dollar >= 0) pure = pure.substring(dollar + 1);
        // 也可能直接是 m3u8 直链（无 | 分隔）
        if (pure.indexOf("|") < 0) {
          if (pure.indexOf("http") === 0) {
            input = { parse: 0, url: pure, jx: 0, header: { "User-Agent": "okhttp-okgo/jeasonlzy", "Referer": HOST } };
          }
        } else {
          var seg = pure.split("|");
          var parseStr = seg[0] || "";
          var rawUrl = seg[1] || "";
          var ua = seg[2] || "";
          if (!ua) ua = "okhttp-okgo/jeasonlzy";
          var finalUrl = "";
          var parseItems = parseStr.split("@");
          for (var i = 0; i < parseItems.length; i++) {
            var p = parseItems[i];
            if (!p) continue;
            if (p.indexOf("http") !== 0) continue;
            try {
              var enc = encodeURIComponent(rawUrl);
              var pUrl = p + enc;
              var pResp = request(pUrl, { headers: { "User-Agent": "Mozilla/5.0", "Referer": HOST } });
              var pj = JSON.parse(pResp);
              var pu = (pj && pj.url) ? String(pj.url) : "";
              if (pu && pu.indexOf("http") === 0) { finalUrl = pu; break; }
            } catch (e2) {}
          }
          if (!finalUrl && rawUrl.indexOf("http") === 0) finalUrl = rawUrl;
          if (finalUrl) {
            input = { parse: 0, url: finalUrl, jx: 0, header: { "User-Agent": ua, "Referer": HOST } };
          }
        }
      } catch (e) {}
    }
  }),
  lazy: $js.toString(() => {
    var SEC = "7gp0bnd2sr85ydii2j32pcypscoc4w6c7g5spl";
    var HOST = "http://v.rbotv.cn";
    var ep = (typeof input === "string") ? input : "";
    if (ep) {
      try {
        var pure = ep;
        var dollar = pure.lastIndexOf("$");
        if (dollar >= 0) pure = pure.substring(dollar + 1);
        // 也可能直接是 m3u8 直链（无 | 分隔）
        if (pure.indexOf("|") < 0) {
          if (pure.indexOf("http") === 0) {
            input = { parse: 0, url: pure, jx: 0, header: { "User-Agent": "okhttp-okgo/jeasonlzy", "Referer": HOST } };
          }
        } else {
          var seg = pure.split("|");
          var parseStr = seg[0] || "";
          var rawUrl = seg[1] || "";
          var ua = seg[2] || "";
          if (!ua) ua = "okhttp-okgo/jeasonlzy";
          var finalUrl = "";
          var parseItems = parseStr.split("@");
          for (var i = 0; i < parseItems.length; i++) {
            var p = parseItems[i];
            if (!p) continue;
            if (p.indexOf("http") !== 0) continue;
            try {
              var enc = encodeURIComponent(rawUrl);
              var pUrl = p + enc;
              var pResp = request(pUrl, { headers: { "User-Agent": "Mozilla/5.0", "Referer": HOST } });
              var pj = JSON.parse(pResp);
              var pu = (pj && pj.url) ? String(pj.url) : "";
              if (pu && pu.indexOf("http") === 0) { finalUrl = pu; break; }
            } catch (e2) {}
          }
          if (!finalUrl && rawUrl.indexOf("http") === 0) finalUrl = rawUrl;
          if (finalUrl) {
            input = { parse: 0, url: finalUrl, jx: 0, header: { "User-Agent": ua, "Referer": HOST } };
          }
        }
      } catch (e) {}
    }
  })
};
