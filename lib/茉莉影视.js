var rule = {
  title: "茉莉影视",
  host: "http://103.236.72.182:3688",
  homeUrl: "http://103.236.72.182:3688/",
  url: "http://103.236.72.182:3688/api.php/getappapi.index/typeFilterVodList",
  searchUrl: "http://103.236.72.182:3688/api.php/getappapi.index/searchList",
  detailUrl: "http://103.236.72.182:3688/api.php/getappapi.index/vodDetail?id=fyid",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  timeout: 15000,
  play_parse: true,
  headers: { "User-Agent": "okhttp/3.14.9" },
  class_name: "电影&电视剧&综艺&动漫&少儿&短剧&纪录片",
  class_url: "1&2&3&4&35&23&27",

  推荐: $js.toString(() => {

function gAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function gAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function gHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.14.9", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function gPost(path, obj) {
  var HOST = "http://103.236.72.182:3688";
  var resp = request(HOST + path, { method: "POST", headers: gHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer) return outer;
  try {
    var j = JSON.parse(gAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function gParse(urlB64, parseApi, tokenB64) {
  var HOST = "http://103.236.72.182:3688";
  try {
    var ts = "" + Math.floor(Date.now() / 1000);
    var body = "parse_api=" + encodeURIComponent(parseApi) + "&url=" + encodeURIComponent(urlB64) + "&token=" + encodeURIComponent(tokenB64);
    var sign = gAesEnc(ts);
    var hd = { "User-Agent": "okhttp/3.14.9", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
    var resp = request(HOST + "/api.php/getappapi.index/vodParse", { method: "POST", headers: hd, body: body });
    var o = JSON.parse(resp);
    var dec = JSON.parse(gAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e5) {}
  return "";
}

var out = [];
  try {
    var j = gPost("/api.php/getappapi.index/typeFilterVodList?page=1", { type_id: "1", page: "1" });
    var j2 = j && j.inner ? j.inner : {};
    var rl = j2.recommend_list || [];
    for (var i = 0; i < rl.length; i++) {
      var it = rl[i];
      out.push({ vod_id: String(it.vod_id), vod_name: it.vod_name || "", vod_pic: it.vod_pic || "", vod_remarks: it.vod_remarks || "" });
    }
  } catch (e) {}
  VODS = out;
  }),

  一级: $js.toString(() => {

function gAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function gAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function gHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.14.9", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function gPost(path, obj) {
  var HOST = "http://103.236.72.182:3688";
  var resp = request(HOST + path, { method: "POST", headers: gHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer) return outer;
  try {
    var j = JSON.parse(gAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function gParse(urlB64, parseApi, tokenB64) {
  var HOST = "http://103.236.72.182:3688";
  try {
    var ts = "" + Math.floor(Date.now() / 1000);
    var body = "parse_api=" + encodeURIComponent(parseApi) + "&url=" + encodeURIComponent(urlB64) + "&token=" + encodeURIComponent(tokenB64);
    var sign = gAesEnc(ts);
    var hd = { "User-Agent": "okhttp/3.14.9", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
    var resp = request(HOST + "/api.php/getappapi.index/vodParse", { method: "POST", headers: hd, body: body });
    var o = JSON.parse(resp);
    var dec = JSON.parse(gAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e5) {}
  return "";
}

var out = [];
  try {
    var tid = (typeof MY_CATE !== "undefined") ? String(MY_CATE) : "1";
    var pg = 1;
    try { pg = parseInt(MY_PAGE, 10) || 1; } catch (e) {}
    var j = gPost("/api.php/getappapi.index/typeFilterVodList?page=" + pg, { type_id: tid, page: String(pg) });
    var j2 = j && j.inner ? j.inner : {};
    var rl = j2.recommend_list || [];
    for (var i = 0; i < rl.length; i++) {
      var it = rl[i];
      out.push({ vod_id: String(it.vod_id), vod_name: it.vod_name || "", vod_pic: it.vod_pic || "", vod_remarks: it.vod_remarks || "" });
    }
  } catch (e) {}
  VODS = out;
  }),

  搜索: $js.toString(() => {

function gAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function gAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function gHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.14.9", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function gPost(path, obj) {
  var HOST = "http://103.236.72.182:3688";
  var resp = request(HOST + path, { method: "POST", headers: gHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer) return outer;
  try {
    var j = JSON.parse(gAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function gParse(urlB64, parseApi, tokenB64) {
  var HOST = "http://103.236.72.182:3688";
  try {
    var ts = "" + Math.floor(Date.now() / 1000);
    var body = "parse_api=" + encodeURIComponent(parseApi) + "&url=" + encodeURIComponent(urlB64) + "&token=" + encodeURIComponent(tokenB64);
    var sign = gAesEnc(ts);
    var hd = { "User-Agent": "okhttp/3.14.9", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
    var resp = request(HOST + "/api.php/getappapi.index/vodParse", { method: "POST", headers: hd, body: body });
    var o = JSON.parse(resp);
    var dec = JSON.parse(gAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e5) {}
  return "";
}

var out = [];
  try {
    var kw = (typeof KEY !== "undefined" && KEY) ? String(KEY) : "";
    if (!kw && typeof input !== "undefined") kw = String(input);
    var j = gPost("/api.php/getappapi.index/searchList", { type_id: 0, keywords: kw, page: 1 });
    var j2 = j && j.inner ? j.inner : {};
    var sl = j2.search_list || [];
    for (var i = 0; i < sl.length; i++) {
      var it = sl[i];
      out.push({ vod_id: String(it.vod_id), vod_name: it.vod_name || "", vod_pic: it.vod_pic || "", vod_remarks: it.vod_remarks || "" });
    }
  } catch (e) {}
  VODS = out;
  }),

  二级: $js.toString(() => {

function gAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function gAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function gHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.14.9", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function gPost(path, obj) {
  var HOST = "http://103.236.72.182:3688";
  var resp = request(HOST + path, { method: "POST", headers: gHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer) return outer;
  try {
    var j = JSON.parse(gAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function gParse(urlB64, parseApi, tokenB64) {
  var HOST = "http://103.236.72.182:3688";
  try {
    var ts = "" + Math.floor(Date.now() / 1000);
    var body = "parse_api=" + encodeURIComponent(parseApi) + "&url=" + encodeURIComponent(urlB64) + "&token=" + encodeURIComponent(tokenB64);
    var sign = gAesEnc(ts);
    var hd = { "User-Agent": "okhttp/3.14.9", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
    var resp = request(HOST + "/api.php/getappapi.index/vodParse", { method: "POST", headers: hd, body: body });
    var o = JSON.parse(resp);
    var dec = JSON.parse(gAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e5) {}
  return "";
}

VOD = VOD || {};
  try {
    var mu = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
    var m = mu.match(/[?&]id=([^&]+)/);
    var vid = m ? m[1] : "";
    var j = gPost("/api.php/getappapi.index/vodDetail", { vod_id: vid });
    var dd = j && j.inner ? j.inner : {};
    var vodx = dd.vod || {};
    VOD.vod_id = vid;
    VOD.vod_name = vodx.vod_name || "";
    VOD.vod_pic = vodx.vod_pic || "";
    VOD.vod_remarks = vodx.vod_remarks || "";
    VOD.vod_year = vodx.vod_year || "";
    VOD.vod_area = vodx.vod_area || "";
    VOD.vod_actor = vodx.vod_actor || "";
    VOD.vod_director = vodx.vod_director || "";
    VOD.vod_content = vodx.vod_content || vodx.vod_blurb || "";
    VOD.type_name = vodx.vod_class || "";
    var pl = dd.vod_play_list || [];
    var froms = [];
    var urlsArr = [];
    for (var s = 0; s < pl.length; s++) {
      var src = pl[s];
      var pi = src.player_info || {};
      var fromName = pi.show || ("线路" + (s + 1));
      var parseVal = pi.parse || "";
      var urls = src.urls || [];
      var eps = [];
      for (var i = 0; i < urls.length; i++) {
        var u = urls[i];
        var epName = u.name || ("第" + (i + 1) + "集");
        var rawUrl = String(u.url || "");
        var pUrl = String(u.parse_api_url || "");
        var token = String(u.token || "");
        if (!rawUrl) continue;
        var final = "";
        if (pUrl.indexOf("http") === 0) {
          final = pUrl; // jar: http 开头直接作播放 url（可能是 m3u8 或解析页）
        } else if (rawUrl.indexOf("http") === 0 && /(m3u8|mp4|mkv)/.test(rawUrl)) {
          final = rawUrl;
        } else {
          var encUrl = gAesEnc(rawUrl);
          var encTok = gAesEnc(token);
          final = "parse_api=" + parseVal + "&url=" + encUrl + "&token=" + encTok;
        }
        if (final) eps.push(epName + "$" + final);
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

  play: $js.toString(() => {

function gAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function gAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function gHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.14.9", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function gPost(path, obj) {
  var HOST = "http://103.236.72.182:3688";
  var resp = request(HOST + path, { method: "POST", headers: gHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer) return outer;
  try {
    var j = JSON.parse(gAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function gParse(urlB64, parseApi, tokenB64) {
  var HOST = "http://103.236.72.182:3688";
  try {
    var ts = "" + Math.floor(Date.now() / 1000);
    var body = "parse_api=" + encodeURIComponent(parseApi) + "&url=" + encodeURIComponent(urlB64) + "&token=" + encodeURIComponent(tokenB64);
    var sign = gAesEnc(ts);
    var hd = { "User-Agent": "okhttp/3.14.9", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
    var resp = request(HOST + "/api.php/getappapi.index/vodParse", { method: "POST", headers: hd, body: body });
    var o = JSON.parse(resp);
    var dec = JSON.parse(gAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e5) {}
  return "";
}

try {
  var ep = (typeof input === "string") ? input : "";
  var pure = ep;
  var dollar = pure.lastIndexOf("$");
  if (dollar >= 0) pure = pure.substring(dollar + 1);
  var pure2 = pure.split("|")[0];
  var u = "";
  if (pure2.indexOf("http") === 0) {
    if (/(m3u8|mp4|mkv)/.test(pure2)) {
      u = pure2;
    } else if (pure2.indexOf("?url=") >= 0 || pure2.indexOf("?key=") >= 0 || pure2.indexOf("&url=") >= 0 || pure2.indexOf("&key=") >= 0) {
      // 解析页：GET 取 JSON.url 或抓 "url":"..."
      try {
        var jr = request(pure2, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36", "Referer": "http://103.236.72.182:3688" } });
        var jj = null;
        try { jj = JSON.parse(jr); } catch (e6) {}
        var cand = "";
        if (jj && jj.url) cand = String(jj.url);
        else { var mm = jr.match(/\"url\"\s*:\s*\"([^\"]+)\"/); if (mm) cand = mm[1]; }
        if (cand && cand.indexOf("http") === 0) u = cand;
      } catch (e7) {}
    } else {
      u = pure2;
    }
  } else if (pure2.indexOf("parse_api=") >= 0) {
    var mUrl = pure2.match(/url=([^&]*)/);
    var mTok = pure2.match(/token=([^&]*)/);
    var mParse = pure2.match(/parse_api=([^&]*)/);
    u = gParse(mUrl ? mUrl[1] : "", mParse ? mParse[1] : "", mTok ? mTok[1] : "");
  }
  if (u && u.indexOf("http") === 0) {
    input = { parse: 0, url: u, jx: 0, header: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36", "Referer": "http://103.236.72.182:3688" } };
  }
} catch (e) {}
  }),
  lazy: $js.toString(() => {

function gAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function gAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var iv = CryptoJS.enc.Utf8.parse("88689667dce61725");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function gHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.14.9", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function gPost(path, obj) {
  var HOST = "http://103.236.72.182:3688";
  var resp = request(HOST + path, { method: "POST", headers: gHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer) return outer;
  try {
    var j = JSON.parse(gAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function gParse(urlB64, parseApi, tokenB64) {
  var HOST = "http://103.236.72.182:3688";
  try {
    var ts = "" + Math.floor(Date.now() / 1000);
    var body = "parse_api=" + encodeURIComponent(parseApi) + "&url=" + encodeURIComponent(urlB64) + "&token=" + encodeURIComponent(tokenB64);
    var sign = gAesEnc(ts);
    var hd = { "User-Agent": "okhttp/3.14.9", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
    var resp = request(HOST + "/api.php/getappapi.index/vodParse", { method: "POST", headers: hd, body: body });
    var o = JSON.parse(resp);
    var dec = JSON.parse(gAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e5) {}
  return "";
}

try {
  var ep = (typeof input === "string") ? input : "";
  var pure = ep;
  var dollar = pure.lastIndexOf("$");
  if (dollar >= 0) pure = pure.substring(dollar + 1);
  var pure2 = pure.split("|")[0];
  var u = "";
  if (pure2.indexOf("http") === 0) {
    if (/(m3u8|mp4|mkv)/.test(pure2)) {
      u = pure2;
    } else if (pure2.indexOf("?url=") >= 0 || pure2.indexOf("?key=") >= 0 || pure2.indexOf("&url=") >= 0 || pure2.indexOf("&key=") >= 0) {
      // 解析页：GET 取 JSON.url 或抓 "url":"..."
      try {
        var jr = request(pure2, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36", "Referer": "http://103.236.72.182:3688" } });
        var jj = null;
        try { jj = JSON.parse(jr); } catch (e6) {}
        var cand = "";
        if (jj && jj.url) cand = String(jj.url);
        else { var mm = jr.match(/\"url\"\s*:\s*\"([^\"]+)\"/); if (mm) cand = mm[1]; }
        if (cand && cand.indexOf("http") === 0) u = cand;
      } catch (e7) {}
    } else {
      u = pure2;
    }
  } else if (pure2.indexOf("parse_api=") >= 0) {
    var mUrl = pure2.match(/url=([^&]*)/);
    var mTok = pure2.match(/token=([^&]*)/);
    var mParse = pure2.match(/parse_api=([^&]*)/);
    u = gParse(mUrl ? mUrl[1] : "", mParse ? mParse[1] : "", mTok ? mTok[1] : "");
  }
  if (u && u.indexOf("http") === 0) {
    input = { parse: 0, url: u, jx: 0, header: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36", "Referer": "http://103.236.72.182:3688" } };
  }
} catch (e) {}
  })
};
