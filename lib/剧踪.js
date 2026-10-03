// 搜索要"牌子"的站（门牌里带 __TOKEN__ 占位）：搜前去指定页面现取新牌子，取不到用样板兜底
function _tkUrl(TS, HOSTv, su, kwEnc, pg) {
  if (TS && TS.param) {
    var tk = "";
    try {
      var hh = request(HOSTv + (TS.src || "/"));
      var tm = hh.match(new RegExp(TS.re));
      if (tm) tk = tm[1];
    } catch (eT) {}
    tk = tk || TS.sample || "";
    su = su.split("__TOKEN__").join(encodeURIComponent(tk));
  }
  var u = su.replace("**", kwEnc).replace(/fypage/g, String(pg || 1));
  if (!/^https?:\/\//.test(u)) u = HOSTv + (u.charAt(0) === "/" ? "" : "/") + u;
  return u;
}

var rule = {
  title: "juzong01",
  host: "https://www.juzong01.me",
  homeUrl: "https://www.juzong01.me",
  url: "/vodtype/1/",
  searchUrl: "/vodsearch/-------------/?wd=**",
  // 详情跳板：fyid 是 URL 编码过的相对详情地址（或热门片名）；二级里从 ~ 之间取出来解
  detailUrl: "https://www.juzong01.me/d~fyid~fyid",
  searchable: 1,
  quickSearch: 1,
  filterable: 0,
  timeout: 12000,
  play_parse: true,
  headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36", "Referer": "https://www.juzong01.me/", "Cookie": "08492f5389f64f98dbd6c6cb6bbb42fa=0ca1d15dfcb63a008b7e7c3979574e2e; server_session_cda1d5fe=494cc462d28005336172f389d70f1feb" },
  class_name: "电影&综艺&动漫&动作片&喜剧片&爱情片&科幻片&恐怖片&剧情片&战争片&国产剧&港台剧",
  class_url: "/vodtype/1/&/vodtype/3/&/vodtype/4/&/vodtype/6/&/vodtype/7/&/vodtype/8/&/vodtype/9/&/vodtype/10/&/vodtype/11/&/vodtype/12/&/vodtype/13/&/vodtype/14/",

  // 收割函数：从一段HTML里把详情卡片抠出来（链接+标题+图）
  一级: $js.toString(() => {
    var out = [];
    try {
      var _pg = (typeof MY_PAGE !== "undefined" && MY_PAGE) ? Number(MY_PAGE) || 1 : 1;
      var u = (_pg > 1 && !0) ? "about:blank" : ((typeof input !== "undefined" && input) ? String(input) : "/vodtype/1/&/vodtype/3/&/vodtype/4/&/vodtype/6/&/vodtype/7/&/vodtype/8/&/vodtype/9/&/vodtype/10/&/vodtype/11/&/vodtype/12/&/vodtype/13/&/vodtype/14/"); // 单页分类：页2起空手而归，不装翻页
      if (!/^https?:\/\//.test(u)) u = "https://www.juzong01.me" + (u.charAt(0) === "/" ? "" : "/") + u;
      function gw(u) {
      var h = "";
      try { h = request(u); } catch (eR) { h = ""; }
      for (var k = 0; k < 4; k++) {
        var hs = String(h);
        // 软墙/发证门卫(小纸条) + 防刷占位页(200但有"防无限请求"字样)：退避重敲，越敲越等
        if (hs.indexOf("防火墙") < 0 && hs.indexOf("防无限请求") < 0 && !(hs.length < 500 && hs.indexOf("window.location.href") >= 0)) break;
        var w = Date.now(); while (Date.now() - w < 1200 + k * 1200) {}
        try { h = request(u); } catch (eR2) { h = ""; }
      }
      return h;
    }
      var htm = String(gw(u)).replace(/&amp;/g, "&").replace(/<script[\s\S]*?<\/script>/gi, "");
      var RE = new RegExp('<a[^>]+href="(/voddetail/\\d+/?)"[^>]*>([\\s\\S]{1,600}?)</a>', "gi");
      var m, sd = {};
      while ((m = RE.exec(htm)) && out.length < 120) {
        var href = m[1].replace(/&amp;/g, "&");
        if (href.indexOf("%") >= 0) continue;
        if (sd[href]) continue;
        sd[href] = 1;
        var tm = m[0].match(/title="([^"]{2,40})"/) || m[0].match(/alt="([^"]{2,40})"/) || m[2].match(/title="([^"]{2,40})"/) || m[2].match(/alt="([^"]{2,40})"/);
        var txt = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
        var         nm = (tm ? tm[1].trim() : "") || txt;
        nm = nm.split(/%[0-9A-Fa-f]{2}/)[0].replace(/\s+/g, " ").trim();
        nm = nm.replace(/《([^》]{2,40})》[\s\S]{0,12}$/, "$1"); // "《片名》高清海报"这种alt壳洗成片名
        if (!nm || nm.length < 2) continue;
        // 站点防刷占位卡（404猫+"不要点,会崩的"+"无数据,防无限请求"）：绝不当数据收
        if (/防无限请求|不要点|会崩/.test(txt + " " + (tm ? tm[1] : "")) || /404\s*ERROR/i.test(m[0])) continue;
        var pm = m[0].match(/(?:data-src|data-original|src)="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i);
        var pic = pm ? pm[1] : "";
        if (pic && pic.indexOf("//") === 0) pic = "https:" + pic;
        else if (pic && pic.charAt(0) === "/") pic = "https://www.juzong01.me" + pic;
        if (pic) pic = pic.split("__NOMAP__").join("__NOMAP__");
        out.push({ vod_id: encodeURIComponent(href), vod_name: nm, vod_pic: pic, vod_remarks: "" });
      }
      if (!out.length && _pg <= 1) {
        // 热门JSON接口兜底（{items:[{title,pic}]}这类）——片名当 id，二级里拿片名去搜
        try {
          var j = JSON.parse(htm);
          var arr = j.items || j.list || j.data || [];
          for (var i = 0; i < arr.length && out.length < 120; i++) {
            var t = String((arr[i] || {}).title || (arr[i] || {}).vod_name || "");
            if (!t) continue;
            var pc = String((arr[i] || {}).pic || (arr[i] || {}).vod_pic || "");
            out.push({ vod_id: encodeURIComponent(t), vod_name: t, vod_pic: pc, vod_remarks: "" });
          }
        } catch (eJ) {}
      }
    } catch (e) {}
    VODS = out;
  }),

  // 搜索 = 搜索页收割（跟一级同一套抠法）
  搜索: $js.toString(() => {
    var out = [];
    var kw = "";
    var pg = "1";
    try { if (typeof KEY !== "undefined" && KEY) kw = String(KEY); } catch (eK) {}
    if (!kw && typeof input !== "undefined" && input) {
      var s = String(input);
      var im = s.match(/[?&](?:q|kw|wd|keyword|searchword|key|s)=([^&]*)/);
      if (im) kw = im[1];
      if (kw.indexOf("%") >= 0) { try { kw = decodeURIComponent(kw); } catch (eD) {} }
    }
    kw = String(kw || "").replace(/^\s+|\s+$/g, "");
    if (kw) {
      try {
        // 牌子逻辑内联（字段运行在独立作用域里，模板顶层的 _tkUrl 函数到不了这里——keke5/qqys实锤）
        var TS = {};
        var su = "/vodsearch/-------------/?wd=**";
        if (TS && TS.param) {
          var tk = "";
          try {
            var hh = request("https://www.juzong01.me" + (TS.src || "/"));
            var tm = hh.match(new RegExp(TS.re));
            if (tm) tk = tm[1];
          } catch (eT) {}
          tk = tk || TS.sample || "";
          su = su.split("__TOKEN__").join(encodeURIComponent(tk));
        }
        var u = su.replace("**", encodeURIComponent(kw)).replace(/fypage/g, String((typeof MY_PAGE !== "undefined" && MY_PAGE) || 1));
        if (!/^https?:\/\//.test(u)) u = "https://www.juzong01.me" + (u.charAt(0) === "/" ? "" : "/") + u;
        function gw(u) {
      var h = "";
      try { h = request(u); } catch (eR) { h = ""; }
      for (var k = 0; k < 4; k++) {
        var hs = String(h);
        if (hs.indexOf("防火墙") < 0 && hs.indexOf("防无限请求") < 0 && !(hs.length < 500 && hs.indexOf("window.location.href") >= 0)) break;
        var w = Date.now(); while (Date.now() - w < 1200 + k * 1200) {}
        try { h = request(u); } catch (eR2) { h = ""; }
      }
      return h;
    }
    var htm = String(gw(u)).replace(/&amp;/g, "&").replace(/<script[\s\S]*?<\/script>/gi, "");
        var RE = new RegExp('<a[^>]+href="(/voddetail/\\d+/?)"[^>]*>([\\s\\S]{1,600}?)</a>', "gi");
        var m, sd = {};
        while ((m = RE.exec(htm)) && out.length < 60) {
          var href = m[1].replace(/&amp;/g, "&");
          if (href.indexOf("%") >= 0) continue;
          if (sd[href]) continue;
          sd[href] = 1;
          var tm = m[0].match(/title="([^"]{2,40})"/) || m[0].match(/alt="([^"]{2,40})"/) || m[2].match(/title="([^"]{2,40})"/) || m[2].match(/alt="([^"]{2,40})"/);
          var txt = m[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
          var nm = (tm ? tm[1].trim() : "") || txt;
          nm = nm.split(/%[0-9A-Fa-f]{2}/)[0].replace(/\s+/g, " ").trim();
          nm = nm.replace(/《([^》]{2,40})》[\s\S]{0,12}$/, "$1");
          if (!nm || nm.length < 2) continue;
          // 防刷占位卡过滤
          if (/防无限请求|不要点|会崩/.test(txt + " " + (tm ? tm[1] : "")) || /404\s*ERROR/i.test(m[0])) continue;
          var pm = m[0].match(/(?:data-src|data-original|src)="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i);
          var pic = pm ? pm[1] : "";
          if (pic && pic.indexOf("//") === 0) pic = "https:" + pic;
          else if (pic && pic.charAt(0) === "/") pic = "https://www.juzong01.me" + pic;
        if (pic) pic = pic.split("__NOMAP__").join("__NOMAP__");
          out.push({ vod_id: encodeURIComponent(href), vod_name: nm, vod_pic: pic, vod_remarks: "" });
        }
      } catch (e1) {}
    }
    VODS = out;
  }),

  // 二级：fyid 解包 → 详情页抠标题/图/简介/集数链接
  二级: $js.toString(() => {
    VOD = VOD || {};
    try {
      function gw(u) {
        var h = "";
        try { h = request(u); } catch (eR) { h = ""; }
        for (var k = 0; k < 4; k++) {
          var hs = String(h);
          if (hs.indexOf("防火墙") < 0 && hs.indexOf("防无限请求") < 0 && !(hs.length < 500 && hs.indexOf("window.location.href") >= 0)) break;
          var w = Date.now(); while (Date.now() - w < 1200 + k * 1200) {}
          try { h = request(u); } catch (eR2) { h = ""; }
        }
        return h;
      }
      var enc = String((typeof MY_URL !== "undefined" && MY_URL) ? MY_URL : (typeof input !== "undefined" ? input : "")).split("~");
      enc = enc.length >= 3 ? enc[1] : (enc[enc.length - 1] || "");
      var tgt = decodeURIComponent(enc);
      var href = "";
      if (tgt.charAt(0) === "/") {
        href = tgt;
      } else {
        // 热门列表只有片名没有链接——拿片名搜一次取第一个详情
        var su = _tkUrl({}, "https://www.juzong01.me", "/vodsearch/-------------/?wd=**", encodeURIComponent(tgt), 1);
        var sh = "";
        try { sh = String(gw(su)).replace(/&amp;/g, "&"); } catch (eS) {}
        var m0 = sh.match(new RegExp('href="(/voddetail/\\d+/?)"', "i"));
        if (m0) href = m0[1].replace(/&amp;/g, "&");
      }
      if (href) {
        var du = /^https?:\/\//.test(href) ? href : "https://www.juzong01.me" + (href.charAt(0) === "/" ? "" : "/") + href;
        var dh = String(gw(du)).replace(/&amp;/g, "&").replace(/<script[\s\S]*?<\/script>/gi, "");
        var t1 = dh.match(/<h1[^>]*>([\s\S]{1,60}?)<\/h1>/i) || dh.match(/og:title" content="([^"]{2,60})/i) || dh.match(/<title>([^<]{2,60})</i);
        var vn = t1 ? t1[1].replace(/<[^>]+>/g, "").trim() : tgt;
        vn = (vn.split(/\s*[-_]\s*/)[0] || vn)                       // "名字 - 站名"取前半
              .replace(/^(在线播放|免费观看|手机观看|在线观看|手机在线看)/, "")
              .replace(/第\d+\s*[集期].*$/, "").replace(/\s{2,}/g, " ").trim();
        VOD.vod_name = vn || tgt;
        var p1 = dh.match(/og:image" content="([^"]+)"/i) || dh.match(/<img[^>]+(?:data-src|src)="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i);
        VOD.vod_pic = p1 ? p1[1] : "";
        if (VOD.vod_pic && VOD.vod_pic.indexOf("//") === 0) VOD.vod_pic = "https:" + VOD.vod_pic;
        else if (VOD.vod_pic && VOD.vod_pic.charAt(0) === "/") VOD.vod_pic = "https://www.juzong01.me" + VOD.vod_pic;
        if (VOD.vod_pic) VOD.vod_pic = VOD.vod_pic.split("__NOMAP__").join("__NOMAP__");
        var c1 = dh.match(/og:description" content="([^"]{5,400})/i) || dh.match(/<meta name="description" content="([^"]{5,400})/i);
        VOD.vod_content = c1 ? c1[1].replace(/\s+/g, " ").replace(/<[^>]+>/g, "").trim() : "";
        var RE2 = new RegExp('<a[^>]+href="(/vodplay/\\d+\\-\\d+\\-\\d+/?)"[^>]*>([\\s\\S]{1,80}?)</a>', "gi");
        var m2, seen2 = {}, o2 = [];
        while ((m2 = RE2.exec(dh)) && o2.length < 300) {
          var pu = m2[1].replace(/&amp;/g, "&");
          var et = m2[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
          // "播放/详情"这类按钮字不当集名——先空着，等后面出现的真集名顶掉
          if (/^(播放|立即播放|马上播放|点击播放|播放全集|在线播放|正片|详情|马上看)$/.test(et)) et = "";
          if (!seen2[pu]) { seen2[pu] = { n: et, btn: !et }; o2.push(pu); }
          else if (seen2[pu].btn && et) { seen2[pu].n = et; seen2[pu].btn = false; }
        }
        // 线路真名：站上线路标签（"蓝光专线1"这类）挨个认领自己名下的播放链——TVBox 标签才跟网站对得上号
        var lnName = {}, namedLs = [];
        var nsp = [], nre2 = /<a[^>]+href="#play[^"]*"[^>]*title="([^"]{2,24})"/gi, ns2;
        while ((ns2 = nre2.exec(dh))) nsp.push({ at: nre2.lastIndex, name: ns2[1].replace(/\s+/g, " ").trim() });
        var kre = new RegExp('href="(/vodplay/\\d+\\-\\d+\\-\\d+/?)"', "g");
        for (var si2 = 0; si2 < nsp.length && namedLs.length < 8; si2++) {
          var chunk = dh.substring(nsp[si2].at, si2 + 1 < nsp.length ? nsp[si2 + 1].at : dh.length);
          kre.lastIndex = 0;
          var km;
          while ((km = kre.exec(chunk))) {
            var ksm = km[1].match(/-(\d+)-(\d+)(?:\.html|\/)/);
            if (ksm && lnName[ksm[1]] === undefined) { lnName[ksm[1]] = nsp[si2].name; namedLs.push(ksm[1]); }
          }
        }
        var lnE = {}, order = namedLs.slice();
        for (var oi2 = 0; oi2 < o2.length; oi2++) {
          var pu3 = o2[oi2];
          var sm = pu3.match(/-(\d+)-(\d+)(?:\.html|\/)/);
          var et3 = seen2[pu3].n || (sm ? "第" + sm[2] + "集" : "在线播放");
          // 网盘类链接整条剔除（夸克/UC/百度/115等盘链没法直接播）
          if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(pu3) || /(夸克|网盘|云盘|百度云|阿里云盘|UC盘|迅雷)/i.test(et3)) continue;
          // 从播放页门牌里抽"线路位"（/play/片-线-集.html 的中段），抽不出全算一条线
          var L = sm ? sm[1] : "1";
          if (!lnE[L]) {
            lnE[L] = [];
            if (order.indexOf(L) < 0) { if (order.length < 8) order.push(L); else continue; }
          }
          lnE[L].push(et3 + "$" + pu3);
        }
        // 整线抽检：每条线抽第一集进播放页看真身（player_aaaa），是网盘链整条线扔掉——不要网盘源
        var eps = [];
        for (var oi = 0; oi < order.length; oi++) {
          var L2 = order[oi];
          if (oi < 4) {
            var purl = lnE[L2][0].split("$")[1];
            var fu = /^https?:\/\//.test(purl) ? purl : "https://www.juzong01.me" + (purl.charAt(0) === "/" ? "" : "/") + purl;
            var ph = "";
            try { ph = String(gw(fu)); } catch (eF) {}
            var pfi = ph.indexOf("player_aaaa");
            if (pfi < 0) pfi = ph.indexOf("player_data");
            if (pfi >= 0) {
              var pj2 = ph.indexOf("{", pfi), dep2 = 0, pk2 = pj2, seg2 = "";
              for (; pk2 >= 0 && pk2 < ph.length; pk2++) {
                var c3 = ph.charAt(pk2);
                if (c3 === "{") dep2++;
                else if (c3 === "}") { dep2--; if (!dep2) { seg2 = ph.substring(pj2, pk2 + 1); break; } }
              }
              var pb = "";
              try { pb = String((JSON.parse(seg2) || {}).url || ""); } catch (eP2) {}
              pb = pb.split("\\/").join("/");
              if (pb.indexOf("%") >= 0) { try { pb = decodeURIComponent(pb); } catch (eD3) {} }
              if (!/^https?:\/\//i.test(pb) && /^[A-Za-z0-9+\/=]{12,}$/.test(pb)) {
                // base64 马甲（MacCMS encrypt）：剥开看真身
                var _B2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", _o2 = "", _b2 = 0, _a2 = 0;
                for (var _i2 = 0; _i2 < pb.length; _i2++) {
                  var _c2 = pb.charAt(_i2); if (_c2 === "=") break;
                  var _v2 = _B2.indexOf(_c2); if (_v2 < 0) continue;
                  _a2 = (_a2 << 6) | _v2; _b2 += 6;
                  if (_b2 >= 8) { _b2 -= 8; _o2 += String.fromCharCode((_a2 >> _b2) & 0xFF); }
                }
                if (_o2) { try { pb = decodeURIComponent(_o2); } catch (eD4) { pb = _o2; } }
              }
              if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(pb)) continue;
            }
          }
          eps = eps.concat(lnE[L2]);
        }
        if (eps.length) {
          // 多条线路分家：优先用站上真线路名，编不出号才用"线路N"
          if (order.length > 1) {
            var uNm = {}, fr2 = [], us2 = [];
            order.forEach(function (L9) { if (lnName[L9]) uNm[lnName[L9]] = 1; });
            var real = Object.keys(uNm).length > 1;
            order.forEach(function (L2) {
              if (lnE[L2] && lnE[L2].length) {
                fr2.push((real && lnName[L2]) ? lnName[L2] : "juzong01·线路" + (fr2.length + 1));
                us2.push(lnE[L2].join("#"));
              }
            });
            if (fr2.length > 1) {
              VOD.vod_play_from = fr2.join("$$$");
              VOD.vod_play_url = us2.join("$$$");
            } else {
              VOD.vod_play_from = "juzong01";
              VOD.vod_play_url = us2[0] || eps.join("#");
            }
          } else {
            VOD.vod_play_from = "juzong01";
            VOD.vod_play_url = eps.join("#");
          }
        }
      }
    } catch (e) {}
  }),

  // play/lazy：播放页抠真链接——直链/播放器iframe里的url参数/页面内嵌m3u8
  play: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      if (u.indexOf("%") >= 0) { try { u = decodeURIComponent(u); } catch (eD0) {} } // 门牌是编码过的，先解回来再敲门
      var done = false;
      var fin = function (obj) { done = true; input = obj; if (typeof setResult === "function") setResult(obj); };
      if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(u)) {
        fin({ parse: 0, url: "toast://网盘类链接不支持在线播放" });
      } else {
        var pu = /^https?:\/\//.test(u) ? u : "https://www.juzong01.me" + (u.charAt(0) === "/" ? "" : "/") + u;
        if (/v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|le\.com|1905\.com/i.test(pu)) {
          fin({ parse: 1, url: pu, jx: 1 });
        } else {
        var htm = "";
        try { htm = String(request(pu)).replace(/&amp;/g, "&"); } catch (e2) {}
        // 苹果CMS播放器数据 player_aaaa={...}：真地址常藏这里（可能是编码串，也可能是网盘链）
        var pur = "";
        var pi = htm.indexOf("player_aaaa");
        if (pi < 0) pi = htm.indexOf("player_data"); // 有的站变量叫 player_data
        if (pi >= 0) {
          var pj = htm.indexOf("{", pi), dep = 0, pk = pj;
          for (; pk >= 0 && pk < htm.length; pk++) {
            var c2 = htm.charAt(pk);
            if (c2 === "{") dep++;
            else if (c2 === "}") { dep--; if (!dep) { try { pur = String((JSON.parse(htm.substring(pj, pk + 1)) || {}).url || ""); } catch (eP) {} break; } }
          }
        }
        if (pur) {
          pur = pur.split("\\/").join("/");
          // 脱马甲：百分号/base64 逐层剥，直到现出 http 直链（MacCMS encrypt 通用）
          function _b64d(_s) {
            var _B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            _s = String(_s).replace(/[^A-Za-z0-9+\/=]/g, "");
            var _o = "", _b = 0, _a = 0;
            for (var _i = 0; _i < _s.length; _i++) {
              var _c = _s.charAt(_i);
              if (_c === "=") break;
              var _v = _B.indexOf(_c);
              if (_v < 0) continue;
              _a = (_a << 6) | _v; _b += 6;
              if (_b >= 8) { _b -= 8; _o += String.fromCharCode((_a >> _b) & 0xFF); }
            }
            return _o;
          }
          try {
            var _pv = "", _n8 = 0;
            while (pur && pur !== _pv && _n8 < 4 && !/^https?:\/\//i.test(pur)) {
              _pv = pur; _n8++;
              if (pur.indexOf("%") >= 0) {
                var _t8 = pur;
                try { _t8 = decodeURIComponent(pur); } catch (eU) { _t8 = pur; }
                if (_t8 && _t8 !== pur) { pur = _t8; continue; }
              }
              if (/^[A-Za-z0-9+\/=]{12,}$/.test(pur)) {
                var _b8 = _b64d(pur);
                if (_b8) pur = _b8;
              }
            }
          } catch (e8) {}
          if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(pur)) {
            fin({ parse: 0, url: "toast://这集是网盘链接，看不了" });
          } else if (/\.m3u8|\.mp4/i.test(pur)) {
            fin({ parse: 0, url: pur, jx: 0 });
          } else if (/v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com/i.test(pur)) {
            fin({ parse: 1, url: pur, jx: 1 });
          } else if (/^https?:\/\//i.test(pur)) {
            // 真网址但不是m3u8/mp4（多半是中转/播放页）→ 交解析嗅探
            fin({ parse: 1, url: pur, jx: 1 });
          } else {
            // 剩下的是加密马甲码（自定义播放器在网页里自己解密）→ 交回播放页让TVBox开网页嗅探，别把码喂给解析（聚宗站实锤）
            fin({ parse: 1, url: pu, jx: 0 });
          }
        }
        if (!done) {
          // player_aaaa 没戏 → 播放器iframe优先（url= 参数里常藏真直链），明文直链兜底
          var im = htm.match(/<iframe[^>]+src="([^"]+)"/i);
          if (im && im[1].indexOf("${") < 0) {
            var isrc = im[1];
            var um = isrc.match(/[?&]url=([^&"]+)/);
            var vu = um ? decodeURIComponent(um[1]) : "";
            if (vu && /\.m3u8|\.mp4/i.test(vu)) fin({ parse: 0, url: vu, jx: 0 });
            else if (vu) fin({ parse: 1, url: vu, jx: 1 });
            else fin({ parse: 1, url: isrc, jx: 1 });
          } else {
            var dm = htm.match(/https?:\/\/[^"'\s<>]+\.m3u8[^"'\s<>]*/) || htm.match(/https?:\/\/[^"'\s<>]+\.mp4[^"'\s<>]*/);
            if (dm) {
              var du2 = dm[0];
              var um2 = du2.match(/[?&]url=([^&"]+)/);
              if (um2) {
                var v2 = decodeURIComponent(um2[1]);
                if (v2 && /\.m3u8|\.mp4/i.test(v2)) fin({ parse: 0, url: v2, jx: 0 });
                else if (v2) fin({ parse: 1, url: v2, jx: 1 });
                else fin({ parse: 1, url: du2, jx: 1 });
              } else {
                fin({ parse: 0, url: du2, jx: 0 });
              }
            }
          }
        }
        }
      }
      if (!done) fin({ parse: 1, url: (typeof pu === "string" && pu) ? pu : (/^https?:\/\//.test(u) ? u : "https://www.juzong01.me" + (u.charAt(0) === "/" ? "" : "/") + u), jx: 0 });  // 最后一手：交回播放页让TVBox网页嗅探（不少站直链根本不落明文）
    } catch (e) {}
  }),
  lazy: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      if (u.indexOf("%") >= 0) { try { u = decodeURIComponent(u); } catch (eD0) {} } // 门牌是编码过的，先解回来再敲门
      var done = false;
      var fin = function (obj) { done = true; input = obj; if (typeof setResult === "function") setResult(obj); };
      if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(u)) {
        fin({ parse: 0, url: "toast://网盘类链接不支持在线播放" });
      } else {
        var pu = /^https?:\/\//.test(u) ? u : "https://www.juzong01.me" + (u.charAt(0) === "/" ? "" : "/") + u;
        if (/v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|le\.com|1905\.com/i.test(pu)) {
          fin({ parse: 1, url: pu, jx: 1 });
        } else {
        var htm = "";
        try { htm = String(request(pu)).replace(/&amp;/g, "&"); } catch (e2) {}
        // 苹果CMS播放器数据 player_aaaa={...}：真地址常藏这里（可能是编码串，也可能是网盘链）
        var pur = "";
        var pi = htm.indexOf("player_aaaa");
        if (pi < 0) pi = htm.indexOf("player_data"); // 有的站变量叫 player_data
        if (pi >= 0) {
          var pj = htm.indexOf("{", pi), dep = 0, pk = pj;
          for (; pk >= 0 && pk < htm.length; pk++) {
            var c2 = htm.charAt(pk);
            if (c2 === "{") dep++;
            else if (c2 === "}") { dep--; if (!dep) { try { pur = String((JSON.parse(htm.substring(pj, pk + 1)) || {}).url || ""); } catch (eP) {} break; } }
          }
        }
        if (pur) {
          pur = pur.split("\\/").join("/");
          // 脱马甲：百分号/base64 逐层剥，直到现出 http 直链（MacCMS encrypt 通用）
          function _b64d(_s) {
            var _B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            _s = String(_s).replace(/[^A-Za-z0-9+\/=]/g, "");
            var _o = "", _b = 0, _a = 0;
            for (var _i = 0; _i < _s.length; _i++) {
              var _c = _s.charAt(_i);
              if (_c === "=") break;
              var _v = _B.indexOf(_c);
              if (_v < 0) continue;
              _a = (_a << 6) | _v; _b += 6;
              if (_b >= 8) { _b -= 8; _o += String.fromCharCode((_a >> _b) & 0xFF); }
            }
            return _o;
          }
          try {
            var _pv = "", _n8 = 0;
            while (pur && pur !== _pv && _n8 < 4 && !/^https?:\/\//i.test(pur)) {
              _pv = pur; _n8++;
              if (pur.indexOf("%") >= 0) {
                var _t8 = pur;
                try { _t8 = decodeURIComponent(pur); } catch (eU) { _t8 = pur; }
                if (_t8 && _t8 !== pur) { pur = _t8; continue; }
              }
              if (/^[A-Za-z0-9+\/=]{12,}$/.test(pur)) {
                var _b8 = _b64d(pur);
                if (_b8) pur = _b8;
              }
            }
          } catch (e8) {}
          if (/pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(pur)) {
            fin({ parse: 0, url: "toast://这集是网盘链接，看不了" });
          } else if (/\.m3u8|\.mp4/i.test(pur)) {
            fin({ parse: 0, url: pur, jx: 0 });
          } else if (/v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com/i.test(pur)) {
            fin({ parse: 1, url: pur, jx: 1 });
          } else if (/^https?:\/\//i.test(pur)) {
            // 真网址但不是m3u8/mp4（多半是中转/播放页）→ 交解析嗅探
            fin({ parse: 1, url: pur, jx: 1 });
          } else {
            // 剩下的是加密马甲码（自定义播放器在网页里自己解密）→ 交回播放页让TVBox开网页嗅探，别把码喂给解析（聚宗站实锤）
            fin({ parse: 1, url: pu, jx: 0 });
          }
        }
        if (!done) {
          // player_aaaa 没戏 → 播放器iframe优先（url= 参数里常藏真直链），明文直链兜底
          var im = htm.match(/<iframe[^>]+src="([^"]+)"/i);
          if (im && im[1].indexOf("${") < 0) {
            var isrc = im[1];
            var um = isrc.match(/[?&]url=([^&"]+)/);
            var vu = um ? decodeURIComponent(um[1]) : "";
            if (vu && /\.m3u8|\.mp4/i.test(vu)) fin({ parse: 0, url: vu, jx: 0 });
            else if (vu) fin({ parse: 1, url: vu, jx: 1 });
            else fin({ parse: 1, url: isrc, jx: 1 });
          } else {
            var dm = htm.match(/https?:\/\/[^"'\s<>]+\.m3u8[^"'\s<>]*/) || htm.match(/https?:\/\/[^"'\s<>]+\.mp4[^"'\s<>]*/);
            if (dm) {
              var du2 = dm[0];
              var um2 = du2.match(/[?&]url=([^&"]+)/);
              if (um2) {
                var v2 = decodeURIComponent(um2[1]);
                if (v2 && /\.m3u8|\.mp4/i.test(v2)) fin({ parse: 0, url: v2, jx: 0 });
                else if (v2) fin({ parse: 1, url: v2, jx: 1 });
                else fin({ parse: 1, url: du2, jx: 1 });
              } else {
                fin({ parse: 0, url: du2, jx: 0 });
              }
            }
          }
        }
        }
      }
      if (!done) fin({ parse: 1, url: (typeof pu === "string" && pu) ? pu : (/^https?:\/\//.test(u) ? u : "https://www.juzong01.me" + (u.charAt(0) === "/" ? "" : "/") + u), jx: 0 });  // 最后一手：交回播放页让TVBox网页嗅探（不少站直链根本不落明文）
    } catch (e) {}
  })
};
