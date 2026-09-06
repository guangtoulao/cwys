var rule = {
  title: "一起影视",
  host: "https://yzy0916.n0z6fkpuk.com",
  homeUrl: "https://yzy0916.n0z6fkpuk.com/",
  url: "https://yzy0916.n0z6fkpuk.com/v2/api/channel/topicListView",
  searchUrl: "https://yzy0916.n0z6fkpuk.com/v1/api/search/search",
  detailUrl: "https://yzy0916.n0z6fkpuk.com/v2/api/vodInfo/index?id=fyid",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  class_name: "电影&电视剧&动漫&综艺&高清韩剧",
  class_url: "2&3&8&10&56",
  timeout: 10000,
  play_parse: true,
  headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/" },

  // 推荐 = 电影频道专题列表
  推荐: $js.toString(() => {
    var out = [];
    try {
      var APPKEY = "3359de478f8d45638125e446a10ec541";
      var HOST = "https://yzy0916.n0z6fkpuk.com";
      var cs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var rid = "";
      for (var rI = 0; rI < 32; rI++) rid += cs.charAt(Math.floor(Math.random() * 62));
      var ud = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){ var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); });
      var o = { appId: "e6ddefe09e0349739874563459f56c54", cus1tom: "aabbcc", deviceInfo: "Android", reqDomain: "yqk1.app", requestId: rid, udid: ud, version: "1.2.7.104", channelId: "2" };
      var ks = Object.keys(o).sort();
      var src = "";
      for (var sI = 0; sI < ks.length; sI++) src += ks[sI] + "=" + o[ks[sI]] + "&";
      src += "appKey=" + APPKEY;
      o.sign = CryptoJS.MD5(src).toString();
      var resp = request(HOST + "/v2/api/channel/topicListView", {
        method: "POST",
        headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/", "Content-Type": "application/json" },
        body: JSON.stringify(o)
      });
      var j = JSON.parse(resp);
      var tl = (j && j.data && j.data.topicList) || [];
      for (var tI = 0; tI < tl.length && out.length < 60; tI++) {
        var vl = tl[tI].vodList || [];
        for (var vI = 0; vI < vl.length && out.length < 60; vI++) {
          var item = vl[vI];
          out.push({ vod_id: String(item.vodId), vod_name: item.vodName || "", vod_pic: item.coverImg || "", vod_remarks: (item.remark && item.remark !== "null") ? String(item.remark) : "" });
        }
      }
    } catch (e) {}
    VODS = out;
  }),

  // 一级 = 分类(channelId) 的专题列表扁平化
  一级: $js.toString(() => {
    var out = [];
    try {
      var APPKEY = "3359de478f8d45638125e446a10ec541";
      var HOST = "https://yzy0916.n0z6fkpuk.com";
      var tid = (typeof MY_CATE !== "undefined") ? String(MY_CATE) : "";
      var cs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var rid = "";
      for (var rI = 0; rI < 32; rI++) rid += cs.charAt(Math.floor(Math.random() * 62));
      var ud = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){ var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); });
      var o = { appId: "e6ddefe09e0349739874563459f56c54", cus1tom: "aabbcc", deviceInfo: "Android", reqDomain: "yqk1.app", requestId: rid, udid: ud, version: "1.2.7.104", channelId: tid };
      var ks = Object.keys(o).sort();
      var src = "";
      for (var sI = 0; sI < ks.length; sI++) src += ks[sI] + "=" + o[ks[sI]] + "&";
      src += "appKey=" + APPKEY;
      o.sign = CryptoJS.MD5(src).toString();
      var resp = request(HOST + "/v2/api/channel/topicListView", {
        method: "POST",
        headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/", "Content-Type": "application/json" },
        body: JSON.stringify(o)
      });
      var j = JSON.parse(resp);
      var tl = (j && j.data && j.data.topicList) || [];
      for (var tI = 0; tI < tl.length && out.length < 400; tI++) {
        var vl = tl[tI].vodList || [];
        for (var vI = 0; vI < vl.length && out.length < 400; vI++) {
          var item = vl[vI];
          out.push({ vod_id: String(item.vodId), vod_name: item.vodName || "", vod_pic: item.coverImg || "", vod_remarks: (item.remark && item.remark !== "null") ? String(item.remark) : "" });
        }
      }
    } catch (e) {}
    VODS = out;
  }),

  // 搜索（引擎把搜索词放 KEY）
  搜索: $js.toString(() => {
    var out = [];
    try {
      var APPKEY = "3359de478f8d45638125e446a10ec541";
      var HOST = "https://yzy0916.n0z6fkpuk.com";
      var kw = (typeof KEY !== "undefined" && KEY) ? String(KEY) : "";
      if (!kw && typeof input !== "undefined") kw = String(input);
      var cs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var rid = "";
      for (var rI = 0; rI < 32; rI++) rid += cs.charAt(Math.floor(Math.random() * 62));
      var ud = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){ var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); });
      var o = { appId: "e6ddefe09e0349739874563459f56c54", cus1tom: "aabbcc", deviceInfo: "Android", keyword: kw, nextCount: "15", reqDomain: "yqk1.app", requestId: rid, udid: ud, version: "1.2.7.104" };
      var ks = Object.keys(o).sort();
      var src = "";
      for (var sI = 0; sI < ks.length; sI++) src += ks[sI] + "=" + o[ks[sI]] + "&";
      src += "appKey=" + APPKEY;
      o.sign = CryptoJS.MD5(src).toString();
      var resp = request(HOST + "/v1/api/search/search", {
        method: "POST",
        headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/", "Content-Type": "application/json" },
        body: JSON.stringify(o)
      });
      var j = JSON.parse(resp);
      var arr = (j && j.data && j.data.items) || [];
      for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item.flags && String(item.flags).indexOf("短剧") >= 0) continue;
        out.push({ vod_id: String(item.vodId), vod_name: item.vodName || "", vod_pic: item.coverImg || "", vod_remarks: (item.remark && item.remark !== "null") ? String(item.remark) : "" });
      }
    } catch (e) {}
    VODS = out;
  }),

  // 二级 = 详情 + 各源剧集
  二级: $js.toString(() => {
    VOD = VOD || {};
    try {
      var APPKEY = "3359de478f8d45638125e446a10ec541";
      var HOST = "https://yzy0916.n0z6fkpuk.com";
      var mu = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
      var m = mu.match(/[?&]id=([^&]+)/);
      var vid = m ? m[1] : "";
      var cs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var rid = "";
      for (var rI = 0; rI < 32; rI++) rid += cs.charAt(Math.floor(Math.random() * 62));
      var ud = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){ var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); });
      var o = { appId: "e6ddefe09e0349739874563459f56c54", cus1tom: "aabbcc", deviceInfo: "Android", reqDomain: "yqk1.app", requestId: rid, udid: ud, version: "1.2.7.104", vodId: vid };
      var ks = Object.keys(o).sort();
      var src = "";
      for (var sI = 0; sI < ks.length; sI++) src += ks[sI] + "=" + o[ks[sI]] + "&";
      src += "appKey=" + APPKEY;
      o.sign = CryptoJS.MD5(src).toString();
      var resp = request(HOST + "/v2/api/vodInfo/index", {
        method: "POST",
        headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/", "Content-Type": "application/json" },
        body: JSON.stringify(o)
      });
      var j = JSON.parse(resp);
      var data = (j && j.data) || {};
      VOD.vod_id = vid;
      VOD.vod_name = data.vodName || "";
      VOD.vod_pic = data.coverImg || "";
      VOD.vod_remarks = (data.updateRemark && data.updateRemark !== "null") ? String(data.updateRemark) : "";
      VOD.vod_year = data.year || "";
      VOD.vod_area = data.areaName || "";
      var actorArr = [];
      try { var al = data.actorList || []; for (var aI = 0; aI < al.length; aI++) actorArr.push(al[aI].vodWorkerName || ""); } catch (e2) {}
      VOD.vod_actor = actorArr.join(" ");
      VOD.vod_content = data.intro || "";
      var pl = data.playerList || [];
      var froms = [];
      var urlsArr = [];
      for (var sIdx = 0; sIdx < pl.length; sIdx++) {
        var src2 = pl[sIdx];
        var fromName = src2.playerName || ("源" + (sIdx + 1));
        var eps = src2.epList || [];
        var eps2 = [];
        for (var eI = 0; eI < eps.length; eI++) {
          var ep = eps[eI];
          var epName = ep.epName || ("第" + (eI + 1) + "集");
          var epId = ep.epId;
          if (epId === undefined || epId === null || epId === "") continue;
          eps2.push(epName + "$" + epId);
        }
        if (eps2.length > 0) {
          froms.push("君子兰" + (froms.length < 20 ? String.fromCharCode(9312 + froms.length) : String(froms.length + 1)));
          urlsArr.push(eps2.join("#"));
        }
      }
      if (froms.length > 0) {
        VOD.vod_play_from = froms.join("$$$");
        VOD.vod_play_url = urlsArr.join("$$$");
      }
    } catch (e) {}
  }),

  // play/lazy：input = epId（或 epName$epId），经 epDetail 取清晰度 -> playUrl 得直链
  play: $js.toString(() => {
    var APPKEY = "3359de478f8d45638125e446a10ec541";
    var HOST = "https://yzy0916.n0z6fkpuk.com";
    try {
      var ep = (typeof input === "string") ? input : "";
      var epId = ep;
      var dollar = ep.lastIndexOf("$");
      if (dollar >= 0) epId = ep.substring(dollar + 1);
      if (epId) {
        var cs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var rid = "";
        for (var rI = 0; rI < 32; rI++) rid += cs.charAt(Math.floor(Math.random() * 62));
        var ud = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){ var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); });
        var o1 = { appId: "e6ddefe09e0349739874563459f56c54", cus1tom: "aabbcc", deviceInfo: "Android", reqDomain: "yqk1.app", requestId: rid, udid: ud, version: "1.2.7.104", vodEpId: epId };
        var ks1 = Object.keys(o1).sort();
        var src1 = "";
        for (var sI = 0; sI < ks1.length; sI++) src1 += ks1[sI] + "=" + o1[ks1[sI]] + "&";
        src1 += "appKey=" + APPKEY;
        o1.sign = CryptoJS.MD5(src1).toString();
        var resp1 = request(HOST + "/v2/api/vodInfo/epDetail", {
          method: "POST",
          headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/", "Content-Type": "application/json" },
          body: JSON.stringify(o1)
        });
        var j1 = JSON.parse(resp1);
        var arr1 = (j1 && j1.data) || [];
        var pick = null;
        for (var i = 0; i < arr1.length; i++) {
          var x = arr1[i];
          if (String(x.canPlay) === "true") {
            if (String(x.defaultSelect) === "true") { pick = x; break; }
            if (!pick) pick = x;
          }
        }
        if (pick) {
          var cs2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          var rid2 = "";
          for (var r2 = 0; r2 < 32; r2++) rid2 += cs2.charAt(Math.floor(Math.random() * 62));
          var ud2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){ var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); });
          var o2 = { appId: "e6ddefe09e0349739874563459f56c54", cus1tom: "aabbcc", deviceInfo: "Android", epId: epId, reqDomain: "yqk1.app", requestId: rid2, udid: ud2, version: "1.2.7.104", vodResolution: String(pick.vodResolution) };
          var ks2 = Object.keys(o2).sort();
          var src2 = "";
          for (var s2 = 0; s2 < ks2.length; s2++) src2 += ks2[s2] + "=" + o2[ks2[s2]] + "&";
          src2 += "appKey=" + APPKEY;
          o2.sign = CryptoJS.MD5(src2).toString();
          var resp2 = request(HOST + "/v2/api/vodInfo/playUrl", {
            method: "POST",
            headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/", "Content-Type": "application/json" },
            body: JSON.stringify(o2)
          });
          var j2 = JSON.parse(resp2);
          var u = (j2 && j2.data && j2.data.playUrl) ? String(j2.data.playUrl) : "";
          if (u && u.indexOf("http") === 0) {
            input = {
              parse: 0, url: u, jx: 0,
              header: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/" }
            };
          }
        }
      }
    } catch (e) {}
  }),
  lazy: $js.toString(() => {
    var APPKEY = "3359de478f8d45638125e446a10ec541";
    var HOST = "https://yzy0916.n0z6fkpuk.com";
    try {
      var ep = (typeof input === "string") ? input : "";
      var epId = ep;
      var dollar = ep.lastIndexOf("$");
      if (dollar >= 0) epId = ep.substring(dollar + 1);
      if (epId) {
        var cs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var rid = "";
        for (var rI = 0; rI < 32; rI++) rid += cs.charAt(Math.floor(Math.random() * 62));
        var ud = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){ var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); });
        var o1 = { appId: "e6ddefe09e0349739874563459f56c54", cus1tom: "aabbcc", deviceInfo: "Android", reqDomain: "yqk1.app", requestId: rid, udid: ud, version: "1.2.7.104", vodEpId: epId };
        var ks1 = Object.keys(o1).sort();
        var src1 = "";
        for (var sI = 0; sI < ks1.length; sI++) src1 += ks1[sI] + "=" + o1[ks1[sI]] + "&";
        src1 += "appKey=" + APPKEY;
        o1.sign = CryptoJS.MD5(src1).toString();
        var resp1 = request(HOST + "/v2/api/vodInfo/epDetail", {
          method: "POST",
          headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/", "Content-Type": "application/json" },
          body: JSON.stringify(o1)
        });
        var j1 = JSON.parse(resp1);
        var arr1 = (j1 && j1.data) || [];
        var pick = null;
        for (var i = 0; i < arr1.length; i++) {
          var x = arr1[i];
          if (String(x.canPlay) === "true") {
            if (String(x.defaultSelect) === "true") { pick = x; break; }
            if (!pick) pick = x;
          }
        }
        if (pick) {
          var cs2 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
          var rid2 = "";
          for (var r2 = 0; r2 < 32; r2++) rid2 += cs2.charAt(Math.floor(Math.random() * 62));
          var ud2 = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){ var r = Math.random() * 16 | 0; return (c === "x" ? r : (r & 3 | 8)).toString(16); });
          var o2 = { appId: "e6ddefe09e0349739874563459f56c54", cus1tom: "aabbcc", deviceInfo: "Android", epId: epId, reqDomain: "yqk1.app", requestId: rid2, udid: ud2, version: "1.2.7.104", vodResolution: String(pick.vodResolution) };
          var ks2 = Object.keys(o2).sort();
          var src2 = "";
          for (var s2 = 0; s2 < ks2.length; s2++) src2 += ks2[s2] + "=" + o2[ks2[s2]] + "&";
          src2 += "appKey=" + APPKEY;
          o2.sign = CryptoJS.MD5(src2).toString();
          var resp2 = request(HOST + "/v2/api/vodInfo/playUrl", {
            method: "POST",
            headers: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/", "Content-Type": "application/json" },
            body: JSON.stringify(o2)
          });
          var j2 = JSON.parse(resp2);
          var u = (j2 && j2.data && j2.data.playUrl) ? String(j2.data.playUrl) : "";
          if (u && u.indexOf("http") === 0) {
            input = {
              parse: 0, url: u, jx: 0,
              header: { "User-Agent": "Dart/3.1 (dart:io)", "Origin": "https://yqk1.app", "Referer": "https://yqk1.app/" }
            };
          }
        }
      }
    } catch (e) {}
  })
};
