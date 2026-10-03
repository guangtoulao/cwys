var rule = {
  title: "爱电影",
  host: "http://api.wkvip.net",
  homeUrl: "http://api.wkvip.net/api.php/provide/vod/?ac=videolist&pg=1",
  url: "http://api.wkvip.net/api.php/provide/vod/?ac=videolist&t=fyclass&pg=fypage",
  searchUrl: "http://api.wkvip.net/api.php/provide/vod/?ac=videolist&wd=**&pg=fypage",
  detailUrl: "http://api.wkvip.net/api.php/provide/vod/?ac=videolist&ids=fyid",
  searchable: 1,
  quickSearch: 1,
  filterable: 0,
  timeout: 8000,
  play_parse: true,
  headers: { "User-Agent": "MOBILE_UA" },
  class_name: "动作片&喜剧片&爱情片&科幻片&恐怖片&剧情片&战争片&惊悚片&犯罪片&冒险篇&动画片&悬疑片&武侠片&奇幻片&纪录片&其他片&国产剧&港台剧&欧美剧&日韩剧&其他剧&动漫&综艺&番剧（B站）&国创（B站）&电影（B站）&电视剧（B站）",
  class_url: "21&22&23&24&25&26&27&28&29&30&31&32&33&34&35&36&38&39&40&41&42&44&46&48&49&50&51",

  // 推荐 = 首页片单接口（主接口）
  推荐: $js.toString(() => {
    var out = [];
    var API = "http://api.wkvip.net/api.php/provide/vod/";
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

  // 搜索 = 逐条线都搜一遍，按片名去重合并（只搜主接口=只出一条线的货，真机实锤不对）
  搜索: $js.toString(() => {
    var out = [];
    var API = "http://api.wkvip.net/api.php/provide/vod/";
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
      var LS = [{"n":"官采无广3","a":"http://api.wkvip.net/api.php/provide/vod","j":"https://api.jxapi.cc/api/?key=97579b9aa766dd919bbd75ca0d5a0c5c&url="},{"n":"天堂","a":"http://caiji.dyttzyapi.com/api.php/provide/vod/from/dyttm3u8","j":""},{"n":"暴风","a":"http://bf.xoxowin86cisyap.com/api.php/provide/vod","j":""},{"n":"量子","a":"https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8","j":""},{"n":"官方无广2","a":"https://cj.10010888.xyz/api.php/provide/vod","j":"https://api.jxapi.cc/api/?key=97579b9aa766dd919bbd75ca0d5a0c5c&url="}];
      var seen = {};
      for (var li = 0; li < LS.length && out.length < 60; li++) {
        var L = LS[li];
        if (!L.a) continue;
        try {
          var d = JSON.parse(request(L.a + "?ac=videolist&wd=" + encodeURIComponent(kw) + "&pg=" + pg));
          var arr = d.list || [];
          for (var i = 0; i < arr.length && out.length < 60; i++) {
            var v = arr[i] || {};
            var vn = String(v.vod_name || "").replace(/^\s+|\s+$/g, "");
            if (!vn || seen[vn]) continue;
            seen[vn] = 1;
            // 主接口的片给数字id（详情能直接查）；别条线的片给"名字id"，二级拿名字去各线并集
            var vid = (L.a === API) ? String(v.vod_id || "") : ("nm:" + encodeURIComponent(vn));
            out.push({ vod_id: vid, vod_name: vn, vod_pic: String(v.vod_pic || ""),
              vod_remarks: String(v.vod_remarks || "") });
          }
        } catch (eS) {}
      }
    }
    VODS = out;
  }),

  // 二级 = 详情 + 多线路合并：主接口拿片名，每条线路拿自己的片名去自家接口搜同名片，并成多线路
  二级: $js.toString(() => {
    VOD = VOD || {};
    try {
      var API = "http://api.wkvip.net/api.php/provide/vod/";
      var u = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
      // 两种id：数字id（主接口详情直查）和 nm:名字id（搜索时别条线上的片，主接口查不到，按名字并线）
      var raw = (u.match(/ids=([^&]+)/) || [])[1] || (u.match(/ids=(.+)$/) || [])[1] || "";
      var nmm = raw.match(/^nm:(.+)$/);
      var nmForce = "";
      var idm = null;
      if (nmm) {
        try { nmForce = decodeURIComponent(nmm[1]); } catch (eN) { nmForce = nmm[1]; }
      } else if (/^\d+$/.test(raw)) {
        idm = [null, raw];
      } else {
        var tm = u.match(/(\d+)(?:\.html)?$/);
        if (tm) idm = [null, tm[1]];
      }
      var v = {};
      if (idm) {
        try {
          var d = JSON.parse(request(API + "?ac=videolist&ids=" + idm[1]));
          v = (d.list || [])[0] || {};
        } catch (eD2) {}
      }
      // 详情字段有才覆盖（nm: 片没有主接口详情，保住列表页带来的名字和图）
      if (v.vod_id) VOD.vod_id = String(v.vod_id);
      if (v.vod_name) VOD.vod_name = String(v.vod_name);
      if (v.vod_pic) VOD.vod_pic = String(v.vod_pic);
      if (v.type_name) VOD.type_name = String(v.type_name);
      if (v.vod_area) VOD.vod_area = String(v.vod_area);
      if (v.vod_year) VOD.vod_year = String(v.vod_year);
      if (v.vod_actor) VOD.vod_actor = String(v.vod_actor).replace(/<[^>]+>/g, "").trim();
      if (v.vod_director) VOD.vod_director = String(v.vod_director).replace(/<[^>]+>/g, "").trim();
      if (v.vod_content || v.vod_blurb) VOD.vod_content = String(v.vod_content || v.vod_blurb).replace(/<[^>]+>/g, "").trim();
      var nm = String(v.vod_name || "").trim() || String(nmForce || "").trim() || String(VOD.vod_name || "").trim();
      var PANS = /pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i;
      function pick(eps) {
        var cl = [];
        for (var j = 0; j < eps.length && cl.length < 400; j++) {
          var ep = eps[j];
          if (!ep) continue;
          var dd = ep.lastIndexOf("$");
          var enm = dd >= 0 ? ep.substring(0, dd) : "第" + (cl.length + 1) + "集";
          var eur = dd >= 0 ? ep.substring(dd + 1) : ep;
          if (PANS.test(eur) || /(夸克|网盘|云盘|百度云|阿里云盘|UC盘|迅雷)/i.test(enm)) continue;
          cl.push(enm + "$" + eur);
        }
        return cl;
      }
      var LS = [{"n":"官采无广3","a":"http://api.wkvip.net/api.php/provide/vod","j":"https://api.jxapi.cc/api/?key=97579b9aa766dd919bbd75ca0d5a0c5c&url="},{"n":"天堂","a":"http://caiji.dyttzyapi.com/api.php/provide/vod/from/dyttm3u8","j":""},{"n":"暴风","a":"http://bf.xoxowin86cisyap.com/api.php/provide/vod","j":""},{"n":"量子","a":"https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8","j":""},{"n":"官方无广2","a":"https://cj.10010888.xyz/api.php/provide/vod","j":"https://api.jxapi.cc/api/?key=97579b9aa766dd919bbd75ca0d5a0c5c&url="}];
      // 全局缓存+断路器：同片名第二次进详情秒出；连不上的线路记两次就跳过，不再傻等超时
      var G = null;
      try { if (typeof globalThis !== "undefined") G = globalThis; } catch (eG0) {}
      if (G) { try { if (!G.__mlc) G.__mlc = {}; if (!G.__mlbad) G.__mlbad = {}; } catch (eG1) { G = null; } }
      var fr = [], us = [];
      var ck = nm + "|" + (idm ? idm[1] : "");
      var fromCache = false;
      if (G && G.__mlc[ck]) {
        fr = G.__mlc[ck].f; us = G.__mlc[ck].u; fromCache = true;
      }
      if (!fromCache) {
      for (var li = 0; li < LS.length && fr.length < 12; li++) {
        var L = LS[li];
        if (!L.a) continue;
        if (G && L.a !== API && G.__mlbad[L.a] >= 2) continue;
        var hit = null;
        if (L.a === API && v.vod_play_url) { hit = v; }
        if (!hit) {
          try {
            var h = JSON.parse(request(L.a + "?ac=videolist&wd=" + encodeURIComponent(nm) + "&pg=1"));
            var arr = h.list || [];
            var x;
            for (x = 0; x < arr.length; x++) {
              if (String(arr[x].vod_name || "").trim() === nm) { hit = arr[x]; break; }
            }
            if (!hit) {
              for (x = 0; x < arr.length; x++) {
                var vn2 = String(arr[x].vod_name || "").trim();
                if (vn2 && (vn2.indexOf(nm) >= 0 || nm.indexOf(vn2) >= 0)) { hit = arr[x]; break; }
              }
            }
          } catch (eS) {
            if (G) { try { G.__mlbad[L.a] = (G.__mlbad[L.a] || 0) + 1; } catch (eB) {} }
          }
        }
        if (!hit || !hit.vod_play_url) continue;
        var cl = pick(String(hit.vod_play_url).split("###")[0].split("#"));
        if (cl.length > 0) { fr.push(L.n || ("线路" + (fr.length + 1))); us.push(cl.join("#")); }
      }
      if (G && fr.length > 0) { try { G.__mlc[ck] = { f: fr, u: us }; } catch (eC) {} }
      }
      // 兜底：一条都没并上就用主接口自带的播放数据
      if (fr.length === 0) {
        var froms = String(v.vod_play_from || "").split("$$$");
        var lines = String(v.vod_play_url || "").split("###");
        for (var i2 = 0; i2 < froms.length && i2 < lines.length; i2++) {
          var cl2 = pick(lines[i2].split("#"));
          if (cl2.length > 0) { fr.push(froms[i2]); us.push(cl2.join("#")); }
        }
      }
      if (fr.length > 0) {
        VOD.vod_play_from = fr.join("$$$");
        VOD.vod_play_url = us.join("$$$");
      }
    } catch (e) {}
  }),

  // play/lazy：直链直接播；大厂播放页走站内代理解析（站服务器有授权IP）；代理解不出再交解析线路；网盘链接明确拒绝
  play: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      var done = false;
      var fin = function (obj) { done = true; input = obj; if (typeof setResult === "function") setResult(obj); };
      if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(u)) {
        fin({ parse: 0, url: "toast://网盘类链接不支持在线播放" });
      } else if (/\.(m3u8|mp4)/i.test(u)) {
        fin({ parse: 0, url: u, jx: 0 });
      } else {
        function b64(s) {
          var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = "", i = 0;
          while (i < s.length) {
            var a = s.charCodeAt(i++) || 0, b = s.charCodeAt(i++) || 0, c = s.charCodeAt(i++) || 0;
            var n = (a << 16) | (b << 8) | c;
            o += C.charAt((n >> 18) & 63) + C.charAt((n >> 12) & 63) + C.charAt((n >> 6) & 63) + C.charAt(n & 63);
          }
          var r = s.length % 3;
          if (r === 1) o = o.slice(0, -2) + "==";
          else if (r === 2) o = o.slice(0, -1) + "=";
          return o;
        }
        var jx = "";
        try {
          var LS = [{"n":"官采无广3","a":"http://api.wkvip.net/api.php/provide/vod","j":"https://api.jxapi.cc/api/?key=97579b9aa766dd919bbd75ca0d5a0c5c&url="},{"n":"天堂","a":"http://caiji.dyttzyapi.com/api.php/provide/vod/from/dyttm3u8","j":""},{"n":"暴风","a":"http://bf.xoxowin86cisyap.com/api.php/provide/vod","j":""},{"n":"量子","a":"https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8","j":""},{"n":"官方无广2","a":"https://cj.10010888.xyz/api.php/provide/vod","j":"https://api.jxapi.cc/api/?key=97579b9aa766dd919bbd75ca0d5a0c5c&url="}];
          for (var qi = 0; qi < LS.length; qi++) { if (LS[qi].j) { jx = LS[qi].j; break; } }
        } catch (eL) {}
        if (jx) {
          var enc = "enc_" + b64(encodeURIComponent(jx)) + "_" + Date.now().toString(36);
          var pr = "";
          try {
            pr = request("https://iys.cc/api/json", { method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ jsonUrl: enc, movieUrl: u }) });
          } catch (eP) {}
          var pj = null;
          try { pj = JSON.parse(pr); } catch (eJ) {}
          if (pj && pj.success && pj.url) fin({ parse: 0, url: String(pj.url), jx: 0 });
          else fin({ parse: 1, url: u, jx: 1 });
        } else {
          fin({ parse: 1, url: u, jx: 1 });
        }
      }
      if (!done) fin({ parse: 1, url: u, jx: 1 });
    } catch (e) {}
  }),
  lazy: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      var done = false;
      var fin = function (obj) { done = true; input = obj; if (typeof setResult === "function") setResult(obj); };
      if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(u)) {
        fin({ parse: 0, url: "toast://网盘类链接不支持在线播放" });
      } else if (/\.(m3u8|mp4)/i.test(u)) {
        fin({ parse: 0, url: u, jx: 0 });
      } else {
        function b64(s) {
          var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = "", i = 0;
          while (i < s.length) {
            var a = s.charCodeAt(i++) || 0, b = s.charCodeAt(i++) || 0, c = s.charCodeAt(i++) || 0;
            var n = (a << 16) | (b << 8) | c;
            o += C.charAt((n >> 18) & 63) + C.charAt((n >> 12) & 63) + C.charAt((n >> 6) & 63) + C.charAt(n & 63);
          }
          var r = s.length % 3;
          if (r === 1) o = o.slice(0, -2) + "==";
          else if (r === 2) o = o.slice(0, -1) + "=";
          return o;
        }
        var jx = "";
        try {
          var LS = [{"n":"官采无广3","a":"http://api.wkvip.net/api.php/provide/vod","j":"https://api.jxapi.cc/api/?key=97579b9aa766dd919bbd75ca0d5a0c5c&url="},{"n":"天堂","a":"http://caiji.dyttzyapi.com/api.php/provide/vod/from/dyttm3u8","j":""},{"n":"暴风","a":"http://bf.xoxowin86cisyap.com/api.php/provide/vod","j":""},{"n":"量子","a":"https://cj.lziapi.com/api.php/provide/vod/from/lzm3u8","j":""},{"n":"官方无广2","a":"https://cj.10010888.xyz/api.php/provide/vod","j":"https://api.jxapi.cc/api/?key=97579b9aa766dd919bbd75ca0d5a0c5c&url="}];
          for (var qi = 0; qi < LS.length; qi++) { if (LS[qi].j) { jx = LS[qi].j; break; } }
        } catch (eL) {}
        if (jx) {
          var enc = "enc_" + b64(encodeURIComponent(jx)) + "_" + Date.now().toString(36);
          var pr = "";
          try {
            pr = request("https://iys.cc/api/json", { method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ jsonUrl: enc, movieUrl: u }) });
          } catch (eP) {}
          var pj = null;
          try { pj = JSON.parse(pr); } catch (eJ) {}
          if (pj && pj.success && pj.url) fin({ parse: 0, url: String(pj.url), jx: 0 });
          else fin({ parse: 1, url: u, jx: 1 });
        } else {
          fin({ parse: 1, url: u, jx: 1 });
        }
      }
      if (!done) fin({ parse: 1, url: u, jx: 1 });
    } catch (e) {}
  })
};
