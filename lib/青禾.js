var rule = {
  title: "青禾",
  host: "https://movie.qhdaohang.cn",
  homeUrl: "https://movie.qhdaohang.cn/api.php/provide/vod/?ac=videolist&pg=1",
  url: "https://movie.qhdaohang.cn/api.php/provide/vod/?ac=videolist&t=fyclass&pg=fypage",
  searchUrl: "https://movie.qhdaohang.cn/api.php/provide/vod/?ac=videolist&wd=**&pg=fypage",
  detailUrl: "https://movie.qhdaohang.cn/api.php/provide/vod/?ac=videolist&ids=fyid",
  searchable: 1,
  quickSearch: 1,
  filterable: 0,
  timeout: 10000,
  play_parse: true,
  headers: { "User-Agent": "MOBILE_UA" },
  class_name: "电影&动作片&喜剧片&爱情片&科幻片&恐怖片&战争片&惊悚片&犯罪片&冒险篇&动画片&悬疑片&奇幻片&纪录片&其他片&连续剧&国产剧&港台剧&欧美剧&日韩剧&其他剧&动漫&动漫&综艺&番剧（B站）&国创（B站）&电影（B站）&电视剧（B站）& Netflix电影& Netflix自制剧",
  class_url: "20&21&22&23&24&25&27&28&29&30&31&32&34&35&36&37&38&39&40&41&42&43&44&46&48&49&50&51&53&54",

  // 推荐 = 首页片单接口（分类清单是工具逐个敲门验过的有货分类，写死防"分类表里有、查出来全空"）
  推荐: $js.toString(() => {
    var out = [];
    var API = "https://movie.qhdaohang.cn/api.php/provide/vod/";
    function toCards(arr) {
      var o = [];
      if (arr && arr.length) {
        for (var i = 0; i < arr.length && o.length < 60; i++) {
          var v = arr[i] || {};
          o.push({ vod_id: String(v.vod_id || ""), vod_name: String(v.vod_name || ""),
            vod_pic: String(v.vod_pic || ""), vod_remarks: String(v.vod_remarks || "") });
        }
      }
      return o;
    }
    try {
      var d = JSON.parse(request(API + "?ac=videolist&pg=1"));
      out = toCards(d.list);
    } catch (e) {}
    VODS = out;
  }),

  // 一级 = 分类片单（input 已被引擎替换成 ?ac=videolist&t=id&pg=页）
  一级: $js.toString(() => {
    var out = [];
    try {
      var u = (typeof input !== "undefined" && input) ? String(input) : "";
      if (u) {
        var d = JSON.parse(request(u));
        var arr = d.list || [];
        for (var i = 0; i < arr.length && out.length < 60; i++) {
          var v = arr[i] || {};
          out.push({ vod_id: String(v.vod_id || ""), vod_name: String(v.vod_name || ""),
            vod_pic: String(v.vod_pic || ""), vod_remarks: String(v.vod_remarks || "") });
        }
      }
    } catch (e) {}
    VODS = out;
  }),

  // 搜索 = 搜索接口（关键词 KEY 优先，取不到从 input 的 wd= 提取）
  搜索: $js.toString(() => {
    var out = [];
    var API = "https://movie.qhdaohang.cn/api.php/provide/vod/";
    var kw = "";
    var pg = "1";
    try { if (typeof KEY !== "undefined" && KEY) kw = String(KEY); } catch (eK) {}
    if (!kw && typeof input !== "undefined" && input) {
      var s = String(input);
      var im = s.match(/[?&]w(?:d|%64)=([^&]*)/);
      if (im) kw = im[1];
      var pm = s.match(/[?&]pg=(\d+)/);
      if (pm) pg = pm[1];
      if (kw.indexOf("%") >= 0) { try { kw = decodeURIComponent(kw); } catch (eD) {} }
    }
    kw = String(kw || "").replace(/^\s+|\s+$/g, "");
    if (kw) {
      try {
        var d = JSON.parse(request(API + "?ac=videolist&wd=" + encodeURIComponent(kw) + "&pg=" + pg));
        var arr = d.list || [];
        for (var i = 0; i < arr.length && out.length < 60; i++) {
          var v = arr[i] || {};
          out.push({ vod_id: String(v.vod_id || ""), vod_name: String(v.vod_name || ""),
            vod_pic: String(v.vod_pic || ""), vod_remarks: String(v.vod_remarks || "") });
        }
      } catch (e1) {}
    }
    VODS = out;
  }),

  // 二级 = 详情接口：线路名和地址段对齐，地址段空的线路剔掉（有的站挂空线路名）
  二级: $js.toString(() => {
    VOD = VOD || {};
    try {
      var API = "https://movie.qhdaohang.cn/api.php/provide/vod/";
      var u = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
      var idm = u.match(/ids=(\d+)/) || u.match(/(\d+)(?:\.html)?$/);
      var d = JSON.parse(request(API + "?ac=videolist&ids=" + (idm ? idm[1] : "")));
      var v = (d.list || [])[0] || {};
      VOD.vod_id = String(v.vod_id || "");
      VOD.vod_name = String(v.vod_name || "");
      VOD.vod_pic = String(v.vod_pic || "");
      VOD.type_name = String(v.type_name || "");
      VOD.vod_area = String(v.vod_area || "");
      VOD.vod_year = String(v.vod_year || "");
      VOD.vod_actor = String(v.vod_actor || "").replace(/<[^>]+>/g, "").trim();
      VOD.vod_director = String(v.vod_director || "").replace(/<[^>]+>/g, "").trim();
      VOD.vod_content = String(v.vod_content || v.vod_blurb || "").replace(/<[^>]+>/g, "").trim();
      var froms = String(v.vod_play_from || "").split("$$$");
      var lines = String(v.vod_play_url || "").split("###");
      var fr = [], us = [];
      for (var i = 0; i < froms.length && i < lines.length; i++) {
        var eps = lines[i].split("#");
        var cl = [];
        for (var j = 0; j < eps.length; j++) {
          var ep = eps[j];
          if (!ep) continue;
          var dd = ep.lastIndexOf("$");
          var enm = dd >= 0 ? ep.substring(0, dd) : "第" + (j + 1) + "集";
          var eur = dd >= 0 ? ep.substring(dd + 1) : ep;
          // 网盘类源（夸克/UC/百度/115等盘链）没法直接播——整条剔除，只留能播的
          if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(eur) || /(夸克|网盘|云盘|百度云|阿里云盘|UC盘|迅雷)/i.test(enm)) continue;
          cl.push(enm + "$" + eur);
        }
        if (cl.length > 0) { fr.push(froms[i]); us.push(cl.join("#")); }
      }
      if (fr.length > 0) {
        VOD.vod_play_from = fr.join("$$$");
        VOD.vod_play_url = us.join("$$$");
      }
    } catch (e) {}
  }),

  // play/lazy：已是直链直接播；大厂播放页交解析线路；网盘链接明确拒绝；分享页/网页型地址先抓页面抠真视频地址
  play: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      // 网盘类链接播不了，明说（不放黑屏）
      if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(u)) {
        input = { parse: 0, url: "toast://网盘类链接不支持在线播放，本源已不提供网盘源" };
        if (typeof setResult === "function") setResult(input);
      } else if (/(v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|le\.com|1905\.com|fun\.tv)/i.test(u)) {
        input = { parse: 1, url: u, jx: 1 };
        if (typeof setResult === "function") setResult(input);
      } else if (u && !/\.(m3u8|mp4)/i.test(u)) {
        var htm = "";
        try { htm = request(u); } catch (e2) {}
        var url = "";
        var m = htm.match(/(?:const|var|let)\s*(?:url|main|video_?url|play_?url)\s*=\s*"([^"]+)"/i)
              || htm.match(/"url"\s*:\s*"([^"]+\.m3u8[^"]*)"/)
              || htm.match(/https?:\/\/[^"'\s<>]+\.m3u8[^"'\s<>]*/)
              || htm.match(/["'](\/[^"'\s]+?\.(?:m3u8|mp4)(?:\?[^"']*)?)["']/);
        if (m) {
          url = m[1] || m[0];
          if (url.charAt(0) === "/") url = (u.match(/^https?:\/\/[^\/]+/) || [u])[0] + url;
        }
        if (url) u = url;
        if (u && /\.(m3u8|mp4)/i.test(u)) {
          input = { parse: 0, url: u, jx: 0 };
          if (typeof setResult === "function") setResult(input);
        }
      } else if (u && /\.(m3u8|mp4)/i.test(u)) {
        input = { parse: 0, url: u, jx: 0 };
        if (typeof setResult === "function") setResult(input);
      }
    } catch (e) {}
  }),
  lazy: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      // 网盘类链接播不了，明说
      if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(u)) {
        input = { parse: 0, url: "toast://网盘类链接不支持在线播放，本源已不提供网盘源" };
        if (typeof setResult === "function") setResult(input);
      } else if (/(v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|le\.com|1905\.com|fun\.tv)/i.test(u)) {
        input = { parse: 1, url: u, jx: 1 };
        if (typeof setResult === "function") setResult(input);
      } else if (u && !/\.(m3u8|mp4)/i.test(u)) {
        var htm = "";
        try { htm = request(u); } catch (e2) {}
        var url = "";
        var m = htm.match(/(?:const|var|let)\s*(?:url|main|video_?url|play_?url)\s*=\s*"([^"]+)"/i)
              || htm.match(/"url"\s*:\s*"([^"]+\.m3u8[^"]*)"/)
              || htm.match(/https?:\/\/[^"'\s<>]+\.m3u8[^"'\s<>]*/)
              || htm.match(/["'](\/[^"'\s]+?\.(?:m3u8|mp4)(?:\?[^"']*)?)["']/);
        if (m) {
          url = m[1] || m[0];
          if (url.charAt(0) === "/") url = (u.match(/^https?:\/\/[^\/]+/) || [u])[0] + url;
        }
        if (url) u = url;
        if (u && /\.(m3u8|mp4)/i.test(u)) {
          input = { parse: 0, url: u, jx: 0 };
          if (typeof setResult === "function") setResult(input);
        }
      } else if (u && /\.(m3u8|mp4)/i.test(u)) {
        input = { parse: 0, url: u, jx: 0 };
        if (typeof setResult === "function") setResult(input);
      }
    } catch (e) {}
  })
};
