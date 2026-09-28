var rule = {
  title: "樱花",
  host: "https://v.czxygg.com",
  homeUrl: "https://v.czxygg.com/",
  url: "https://v.czxygg.com/yherls/fyclass-fypage.html",
  searchUrl: "https://v.czxygg.com/yhersc/**-------------.html",
  detailUrl: "https://v.czxygg.com/yherdl/fyid.html",
  searchable: 1,
  quickSearch: 1,
  filterable: 0,
  timeout: 10000,
  play_parse: true,
  headers: { "User-Agent": "MOBILE_UA" },
  class_name: "电影&电视剧&综艺&动漫&短剧",
  class_url: "1&2&3&4&5",
  推荐: $js.toString(() => {
    var out = [];
    try {
      var HOST = "https://v.czxygg.com";
      var u = (typeof input !== "undefined" && input) ? String(input) : "https://v.czxygg.com/";
      var html = request(u);
      var parts = html.split('<a class="myui-vodlist__thumb');
      for (var i = 1; i < parts.length && out.length < 60; i++) {
        var c = parts[i];
        var idm = c.match(/href="\/yherdl\/(\d+)\.html"/);
        if (!idm) continue;
        var nm = (c.match(/title="([^"]{1,60})"/) || [])[1] || "";
        var pic = (c.match(/data-original="([^"]{1,200})"/) || [])[1] || "";
        if (pic && pic.indexOf("http") !== 0) pic = HOST + pic;
        var note = (c.match(/pic-text[^>]*>([^<]{1,30})</) || [])[1] || "";
        out.push({ vod_id: idm[1], vod_name: nm, vod_pic: pic, vod_remarks: note });
      }
    } catch (e) {}
    VODS = out;
  }),
  一级: $js.toString(() => {
    var out = [];
    try {
      var HOST = "https://v.czxygg.com";
      var u = "";
      if (typeof input !== "undefined" && input) u = String(input);
      else if (typeof MY_URL !== "undefined" && MY_URL) u = String(MY_URL);
      if (!u && typeof MY_CATE !== "undefined" && MY_CATE) u = HOST + "/yherls/" + String(MY_CATE) + "-1.html";
      var html = request(u);
      var parts = html.split('<a class="myui-vodlist__thumb');
      for (var i = 1; i < parts.length && out.length < 150; i++) {
        var c = parts[i];
        var idm = c.match(/href="\/yherdl\/(\d+)\.html"/);
        if (!idm) continue;
        var nm = (c.match(/title="([^"]{1,60})"/) || [])[1] || "";
        var pic = (c.match(/data-original="([^"]{1,200})"/) || [])[1] || "";
        if (pic && pic.indexOf("http") !== 0) pic = HOST + pic;
        var note = (c.match(/pic-text[^>]*>([^<]{1,30})</) || [])[1] || "";
        out.push({ vod_id: idm[1], vod_name: nm, vod_pic: pic, vod_remarks: note });
      }
    } catch (e) {}
    VODS = out;
  }),
  搜索: $js.toString(() => {
    var out = [];
    var HOST = "https://v.czxygg.com";
    var kw = "";
    try { if (typeof KEY !== "undefined" && KEY) kw = String(KEY); } catch (eK) {}
    if (!kw && typeof input !== "undefined" && input) {
      var s = String(input);
      var im = s.match(/yhersc\/([^\/&?#]+)/);
      if (im) kw = im[1];
      if (!kw) { var im2 = s.match(/[?&]wd=([^&?#]+)/); if (im2) kw = im2[1]; }
      if (kw.indexOf("%") >= 0) { try { kw = decodeURIComponent(kw); } catch (eD) {} }
    }
    kw = String(kw || "").replace(/-{2,}[\s\S]*$/, "").replace(/^\s+|\s+$/g, "");
    if (!kw) { VODS = out; } else {
    try {
      var ju = HOST + "/index.php/ajax/suggest?mid=1&wd=" + encodeURIComponent(kw);
      var jo = JSON.parse(request(ju));
      if (jo && jo.list && jo.list.length > 0) {
        for (var i = 0; i < jo.list.length && out.length < 60; i++) {
          var it = jo.list[i] || {};
          var pc = String(it.pic || "");
          if (pc && pc.indexOf("http") !== 0) pc = HOST + pc;
          out.push({ vod_id: String(it.id), vod_name: String(it.name || ""), vod_pic: pc, vod_remarks: "" });
        }
      }
    } catch (e1) {}
    if (out.length === 0) {
      try {
        var u = HOST + "/yhersc/" + encodeURIComponent(kw) + "-------------.html";
        var html = request(u);
        var parts = html.split('<a class="myui-vodlist__thumb');
        for (var j = 1; j < parts.length && out.length < 60; j++) {
          var c = parts[j].substring(0, 4000);
          var lm = c.match(/href="(\/yherdl\/(\d+)\.html)"/);
          if (!lm) continue;
          var sm = c.match(/title="([^"]{1,60})"/);
          var nm = sm ? sm[1] : "";
          var pc2 = (c.match(/data-original="([^"]{1,200})"/) || [])[1] || "";
          if (pc2 && pc2.indexOf("http") !== 0) pc2 = HOST + pc2;
          var note = (c.match(/pic-text[^>]*>([^<]{1,30})</) || [])[1] || "";
          out.push({ vod_id: lm[2], vod_name: nm, vod_pic: pc2, vod_remarks: note });
        }
      } catch (e2) {}
    }
    }
    VODS = out;
  }),
  二级: $js.toString(() => {
    VOD = VOD || {};
    try {
      var HOST = "https://v.czxygg.com";
      var u = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
      var html = request(u);
      var t1 = html.match(/<h1[^>]*>([^<]{1,80})<\/h1>/);
      VOD.vod_name = t1 ? t1[1] : "";
      VOD.vod_id = u;
      var p1 = html.match(/myui-content__detail[\s\S]{0,3000}?data-original="([^"]{1,200})"/);
      var pic = p1 ? p1[1] : "";
      if (pic && pic.indexOf("http") !== 0) pic = HOST + pic;
      VOD.vod_pic = pic;
      var n1 = html.match(/pic-text[^>]*>([^<]{1,40})</);
      VOD.vod_remarks = n1 ? n1[1] : "";
      var c1 = html.match(/剧情简介','([^']{1,600})'/);
      VOD.vod_content = c1 ? c1[1].replace(/<[^>]+>/g, "").trim() : "";
      var nameMap = {};
      var tnRe = /#playlist(\d+)" data-toggle="tab">([^<]{1,30})</g;
      var tn;
      while ((tn = tnRe.exec(html)) !== null) nameMap[tn[1]] = tn[2];
      var firstPlay = html.indexOf('<div id="playlist');
      var head = firstPlay >= 0 ? html.substring(0, firstPlay) : html;
      if (!n1) {
        var n2 = head.match(/pic-text[^>]*>([^<]{1,40})</);
        VOD.vod_remarks = n2 ? n2[1] : "";
      }
      var blocks = html.split('<div id="playlist');
      var froms = [];
      var urlsArr = [];
      for (var b = 1; b < blocks.length; b++) {
        var blk = blocks[b].substring(0, 30000);
        var pid = (blk.match(/^(\d+)/) || [])[1] || String(b);
        var re = /<a class="btn btn-default" href="([^"]+)"[^>]*>([^<]{1,20})<\/a>/g;
        var eps = [];
        var m2;
        while ((m2 = re.exec(blk)) !== null) {
          var eu = m2[1];
          if (eu.indexOf("http") !== 0) eu = HOST + eu;
          eps.push(m2[2] + "$" + eu);
        }
        if (eps.length > 0) {
          froms.push(nameMap[pid] || ("线路" + (froms.length + 1)));
          urlsArr.push(eps.join("#"));
        }
      }
      if (froms.length > 0) {
        VOD.vod_play_from = froms.join("$$$");
        VOD.vod_play_url = urlsArr.join("$$$");
      }
    } catch (e) {}
  }),
  play: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      if (u && u.indexOf("http") !== 0) u = "https://v.czxygg.com" + u;
      if (u) {
        var html = "";
        try { html = (typeof request === "function") ? request(u) : ""; } catch (e2) { html = ""; }
        var url = "";
        var i = html.indexOf("player_aaaa");
        if (i >= 0) {
          var j = html.indexOf("{", i);
          if (j >= 0) {
            var depth = 0, k = j, seg = "";
            for (; k < html.length; k++) {
              var ch = html.charAt(k);
              if (ch === "{") { depth++; }
              else if (ch === "}") { depth--; if (depth === 0) { seg = html.substring(j, k + 1); break; } }
            }
            var um = seg.match(/"url"\s*:\s*"([^"]+)"/);
            if (um) url = um[1];
          }
        }
        if (url) url = url.split("\\/").join("/");
        if (!url) {
          var dm = html.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
          if (dm) url = dm[0];
        }
        if (url && /\.(m3u8|mp4)/i.test(url)) {
          input = { parse: 0, url: url, jx: 0 };
          if (typeof setResult === "function") setResult(input);
        }
      }
    } catch (e) {}
  }),
  lazy: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      if (u && u.indexOf("http") !== 0) u = "https://v.czxygg.com" + u;
      if (u) {
        var html = "";
        try { html = (typeof request === "function") ? request(u) : ""; } catch (e2) { html = ""; }
        var url = "";
        var i = html.indexOf("player_aaaa");
        if (i >= 0) {
          var j = html.indexOf("{", i);
          if (j >= 0) {
            var depth = 0, k = j, seg = "";
            for (; k < html.length; k++) {
              var ch = html.charAt(k);
              if (ch === "{") { depth++; }
              else if (ch === "}") { depth--; if (depth === 0) { seg = html.substring(j, k + 1); break; } }
            }
            var um = seg.match(/"url"\s*:\s*"([^"]+)"/);
            if (um) url = um[1];
          }
        }
        if (url) url = url.split("\\/").join("/");
        if (!url) {
          var dm = html.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
          if (dm) url = dm[0];
        }
        if (url && /\.(m3u8|mp4)/i.test(url)) {
          input = { parse: 0, url: url, jx: 0 };
          if (typeof setResult === "function") setResult(input);
        }
      }
    } catch (e) {}
  })
};
