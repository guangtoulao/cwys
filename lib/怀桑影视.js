var rule = {
  title: "怀桑影视",
  host: "http://110.42.67.130:1226",
  homeUrl: "http://110.42.67.130:1226/",
  url: "http://110.42.67.130:1226/api.php/qijiappapi.index/typeFilterVodList",
  searchUrl: "http://110.42.67.130:1226/api.php/qijiappapi.index/searchList",
  detailUrl: "http://110.42.67.130:1226/api.php/qijiappapi.index/vodDetail?id=fyid",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  timeout: 15000,
  play_parse: true,
  headers: { "User-Agent": "okhttp/3.10.0" },
  class_name: "电影&剧集&综艺&动漫&短剧&直播&纪录片&教育",
  class_url: "1&2&3&4&5&6&7&8",

  推荐: $js.toString(() => {

function qiAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function qiAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function qiHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function qiPost(path, obj) {
  var HOST = "http://110.42.67.130:1226";
  var resp = request(HOST + path, { method: "POST", headers: qiHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer || outer.code === 1001) return outer;
  try {
    var j = JSON.parse(qiAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function qiSliderVerify() {
  // getSlider -> verifySlider -> true/false
  try {
    var HOST = "http://110.42.67.130:1226";
    var ts0 = "" + Math.floor(Date.now() / 1000);
    var hd0 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts0, "app-ui-mode": "light" };
    var r0 = request(HOST + "/api.php/qijiappapi.index/getSlider", { method: "POST", headers: hd0, body: "" });
    var o0 = JSON.parse(r0);
    var sg = JSON.parse(qiAesDec(o0.data));
    var ts1 = "" + Math.floor(Date.now() / 1000);
    var hd1 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/x-www-form-urlencoded", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts1, "app-ui-mode": "light" };
    var fb = "pos_x=" + sg.target_x + "&slider_id=" + sg.slider_id + "&timestamp=" + ts1;
    var rv = request(HOST + "/api.php/qijiappapi.index/verifySlider", { method: "POST", headers: hd1, body: fb });
    var ov = JSON.parse(rv);
    return ov.code === 1;
  } catch (e3) { return false; }
}
function qiParse(urlRaw, parseVal, token) {
  // POST /vodParse：url 参数 AES 加密后 base64 + URL 编码
  var HOST = "http://110.42.67.130:1226";
  var ts = "" + Math.floor(Date.now() / 1000);
  var encUrl = qiAesEnc(urlRaw);
  var encToken = qiAesEnc(token || "");
  var body = "parse_api=" + encodeURIComponent(parseVal) + "&url=" + encodeURIComponent(encUrl) + "&token=" + encodeURIComponent(encToken);
  var sign = qiAesEnc(ts);
  var hd = { "User-Agent": "okhttp/3.10.0", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
  var resp = request(HOST + "/api.php/qijiappapi.index/vodParse", { method: "POST", headers: hd, body: body });
  try {
    var o = JSON.parse(resp);
    var dec = JSON.parse(qiAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e4) {}
  return "";
}

var out = [];
  try {
    var j = qiPost("/api.php/qijiappapi.index/typeFilterVodList?page=1", { type_id: "1", page: "1" });
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

function qiAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function qiAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function qiHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function qiPost(path, obj) {
  var HOST = "http://110.42.67.130:1226";
  var resp = request(HOST + path, { method: "POST", headers: qiHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer || outer.code === 1001) return outer;
  try {
    var j = JSON.parse(qiAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function qiSliderVerify() {
  // getSlider -> verifySlider -> true/false
  try {
    var HOST = "http://110.42.67.130:1226";
    var ts0 = "" + Math.floor(Date.now() / 1000);
    var hd0 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts0, "app-ui-mode": "light" };
    var r0 = request(HOST + "/api.php/qijiappapi.index/getSlider", { method: "POST", headers: hd0, body: "" });
    var o0 = JSON.parse(r0);
    var sg = JSON.parse(qiAesDec(o0.data));
    var ts1 = "" + Math.floor(Date.now() / 1000);
    var hd1 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/x-www-form-urlencoded", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts1, "app-ui-mode": "light" };
    var fb = "pos_x=" + sg.target_x + "&slider_id=" + sg.slider_id + "&timestamp=" + ts1;
    var rv = request(HOST + "/api.php/qijiappapi.index/verifySlider", { method: "POST", headers: hd1, body: fb });
    var ov = JSON.parse(rv);
    return ov.code === 1;
  } catch (e3) { return false; }
}
function qiParse(urlRaw, parseVal, token) {
  // POST /vodParse：url 参数 AES 加密后 base64 + URL 编码
  var HOST = "http://110.42.67.130:1226";
  var ts = "" + Math.floor(Date.now() / 1000);
  var encUrl = qiAesEnc(urlRaw);
  var encToken = qiAesEnc(token || "");
  var body = "parse_api=" + encodeURIComponent(parseVal) + "&url=" + encodeURIComponent(encUrl) + "&token=" + encodeURIComponent(encToken);
  var sign = qiAesEnc(ts);
  var hd = { "User-Agent": "okhttp/3.10.0", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
  var resp = request(HOST + "/api.php/qijiappapi.index/vodParse", { method: "POST", headers: hd, body: body });
  try {
    var o = JSON.parse(resp);
    var dec = JSON.parse(qiAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e4) {}
  return "";
}

var out = [];
  try {
    var tid = (typeof MY_CATE !== "undefined") ? String(MY_CATE) : "1";
    var pg = 1;
    try { pg = parseInt(MY_PAGE, 10) || 1; } catch (e) {}
    var j = qiPost("/api.php/qijiappapi.index/typeFilterVodList?page=" + pg, { type_id: tid, page: String(pg) });
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

function qiAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function qiAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function qiHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function qiPost(path, obj) {
  var HOST = "http://110.42.67.130:1226";
  var resp = request(HOST + path, { method: "POST", headers: qiHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer || outer.code === 1001) return outer;
  try {
    var j = JSON.parse(qiAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function qiSliderVerify() {
  // getSlider -> verifySlider -> true/false
  try {
    var HOST = "http://110.42.67.130:1226";
    var ts0 = "" + Math.floor(Date.now() / 1000);
    var hd0 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts0, "app-ui-mode": "light" };
    var r0 = request(HOST + "/api.php/qijiappapi.index/getSlider", { method: "POST", headers: hd0, body: "" });
    var o0 = JSON.parse(r0);
    var sg = JSON.parse(qiAesDec(o0.data));
    var ts1 = "" + Math.floor(Date.now() / 1000);
    var hd1 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/x-www-form-urlencoded", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts1, "app-ui-mode": "light" };
    var fb = "pos_x=" + sg.target_x + "&slider_id=" + sg.slider_id + "&timestamp=" + ts1;
    var rv = request(HOST + "/api.php/qijiappapi.index/verifySlider", { method: "POST", headers: hd1, body: fb });
    var ov = JSON.parse(rv);
    return ov.code === 1;
  } catch (e3) { return false; }
}
function qiParse(urlRaw, parseVal, token) {
  // POST /vodParse：url 参数 AES 加密后 base64 + URL 编码
  var HOST = "http://110.42.67.130:1226";
  var ts = "" + Math.floor(Date.now() / 1000);
  var encUrl = qiAesEnc(urlRaw);
  var encToken = qiAesEnc(token || "");
  var body = "parse_api=" + encodeURIComponent(parseVal) + "&url=" + encodeURIComponent(encUrl) + "&token=" + encodeURIComponent(encToken);
  var sign = qiAesEnc(ts);
  var hd = { "User-Agent": "okhttp/3.10.0", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
  var resp = request(HOST + "/api.php/qijiappapi.index/vodParse", { method: "POST", headers: hd, body: body });
  try {
    var o = JSON.parse(resp);
    var dec = JSON.parse(qiAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e4) {}
  return "";
}

var out = [];
  try {
    var kw = (typeof KEY !== "undefined" && KEY) ? String(KEY) : "";
    if (!kw && typeof input !== "undefined") kw = String(input);
    var j = qiPost("/api.php/qijiappapi.index/searchList", { type_id: 0, keywords: kw, page: 1 });
    if (j && j.code === 1001) {
      qiSliderVerify();
      j = qiPost("/api.php/qijiappapi.index/searchList", { type_id: 0, keywords: kw, page: 1 });
    }
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

function qiAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function qiAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function qiHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function qiPost(path, obj) {
  var HOST = "http://110.42.67.130:1226";
  var resp = request(HOST + path, { method: "POST", headers: qiHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer || outer.code === 1001) return outer;
  try {
    var j = JSON.parse(qiAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function qiSliderVerify() {
  // getSlider -> verifySlider -> true/false
  try {
    var HOST = "http://110.42.67.130:1226";
    var ts0 = "" + Math.floor(Date.now() / 1000);
    var hd0 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts0, "app-ui-mode": "light" };
    var r0 = request(HOST + "/api.php/qijiappapi.index/getSlider", { method: "POST", headers: hd0, body: "" });
    var o0 = JSON.parse(r0);
    var sg = JSON.parse(qiAesDec(o0.data));
    var ts1 = "" + Math.floor(Date.now() / 1000);
    var hd1 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/x-www-form-urlencoded", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts1, "app-ui-mode": "light" };
    var fb = "pos_x=" + sg.target_x + "&slider_id=" + sg.slider_id + "&timestamp=" + ts1;
    var rv = request(HOST + "/api.php/qijiappapi.index/verifySlider", { method: "POST", headers: hd1, body: fb });
    var ov = JSON.parse(rv);
    return ov.code === 1;
  } catch (e3) { return false; }
}
function qiParse(urlRaw, parseVal, token) {
  // POST /vodParse：url 参数 AES 加密后 base64 + URL 编码
  var HOST = "http://110.42.67.130:1226";
  var ts = "" + Math.floor(Date.now() / 1000);
  var encUrl = qiAesEnc(urlRaw);
  var encToken = qiAesEnc(token || "");
  var body = "parse_api=" + encodeURIComponent(parseVal) + "&url=" + encodeURIComponent(encUrl) + "&token=" + encodeURIComponent(encToken);
  var sign = qiAesEnc(ts);
  var hd = { "User-Agent": "okhttp/3.10.0", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
  var resp = request(HOST + "/api.php/qijiappapi.index/vodParse", { method: "POST", headers: hd, body: body });
  try {
    var o = JSON.parse(resp);
    var dec = JSON.parse(qiAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e4) {}
  return "";
}

VOD = VOD || {};
  try {
    var mu = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
    var m = mu.match(/[?&]id=([^&]+)/);
    var vid = m ? m[1] : "";
    var j = qiPost("/api.php/qijiappapi.index/vodDetail", { vod_id: vid });
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
        var isDirect = pUrl.indexOf("http") === 0 && /(m3u8|mp4|mkv)/.test(rawUrl);
        if (isDirect) {
          eps.push(epName + "$" + rawUrl);
        } else {
          // parse_api=<parse>&url=<aes-base64>&token=<aes-base64>
          var encUrl = qiAesEnc(rawUrl);
          var encTok = qiAesEnc(token);
          var val = "parse_api=" + parseVal + "&url=" + encUrl + "&token=" + encTok;
          eps.push(epName + "$" + val);
        }
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

function qiAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function qiAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function qiHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function qiPost(path, obj) {
  var HOST = "http://110.42.67.130:1226";
  var resp = request(HOST + path, { method: "POST", headers: qiHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer || outer.code === 1001) return outer;
  try {
    var j = JSON.parse(qiAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function qiSliderVerify() {
  // getSlider -> verifySlider -> true/false
  try {
    var HOST = "http://110.42.67.130:1226";
    var ts0 = "" + Math.floor(Date.now() / 1000);
    var hd0 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts0, "app-ui-mode": "light" };
    var r0 = request(HOST + "/api.php/qijiappapi.index/getSlider", { method: "POST", headers: hd0, body: "" });
    var o0 = JSON.parse(r0);
    var sg = JSON.parse(qiAesDec(o0.data));
    var ts1 = "" + Math.floor(Date.now() / 1000);
    var hd1 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/x-www-form-urlencoded", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts1, "app-ui-mode": "light" };
    var fb = "pos_x=" + sg.target_x + "&slider_id=" + sg.slider_id + "&timestamp=" + ts1;
    var rv = request(HOST + "/api.php/qijiappapi.index/verifySlider", { method: "POST", headers: hd1, body: fb });
    var ov = JSON.parse(rv);
    return ov.code === 1;
  } catch (e3) { return false; }
}
function qiParse(urlRaw, parseVal, token) {
  // POST /vodParse：url 参数 AES 加密后 base64 + URL 编码
  var HOST = "http://110.42.67.130:1226";
  var ts = "" + Math.floor(Date.now() / 1000);
  var encUrl = qiAesEnc(urlRaw);
  var encToken = qiAesEnc(token || "");
  var body = "parse_api=" + encodeURIComponent(parseVal) + "&url=" + encodeURIComponent(encUrl) + "&token=" + encodeURIComponent(encToken);
  var sign = qiAesEnc(ts);
  var hd = { "User-Agent": "okhttp/3.10.0", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
  var resp = request(HOST + "/api.php/qijiappapi.index/vodParse", { method: "POST", headers: hd, body: body });
  try {
    var o = JSON.parse(resp);
    var dec = JSON.parse(qiAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e4) {}
  return "";
}


function qiParseRaw(urlB64, parseApi, tokenB64) {
  var HOST = "http://110.42.67.130:1226";
  try {
    var ts = "" + Math.floor(Date.now() / 1000);
    var body = "parse_api=" + encodeURIComponent(parseApi) + "&url=" + encodeURIComponent(urlB64) + "&token=" + encodeURIComponent(tokenB64);
    var sign = qiAesEnc(ts);
    var hd = { "User-Agent": "okhttp/3.10.0", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
    var resp = request(HOST + "/api.php/qijiappapi.index/vodParse", { method: "POST", headers: hd, body: body });
    var o = JSON.parse(resp);
    var dec = JSON.parse(qiAesDec(o.data));
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
  if (pure2.indexOf("http") === 0 && /(m3u8|mp4|mkv)/.test(pure2)) {
    u = pure2;
  } else if (pure2.indexOf("parse_api=") >= 0) {
    var parseApi = "";
    var mUrl = pure2.match(/url=([^&]*)/);
    var mTok = pure2.match(/token=([^&]*)/);
    var mParse = pure2.match(/parse_api=([^&]*)/);
    var urlB64 = mUrl ? mUrl[1] : "";
    var tokenB64 = mTok ? mTok[1] : "";
    if (mParse) parseApi = mParse[1];
    // 还原（detail 时已把 aes(base64) 编码进串）——这里直接 POST 原样值
    u = qiParseRaw(urlB64, parseApi, tokenB64);
  }
  if (u && u.indexOf("http") === 0) {
    input = { parse: 0, url: u, jx: 0, header: { "User-Agent": "okhttp/3.10.0", "Referer": "http://110.42.67.130:1226" } };
  }
} catch (e) {}
  }),
  lazy: $js.toString(() => {

function qiAesDec(b64) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var pt = CryptoJS.AES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(b64) }, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return pt.toString(CryptoJS.enc.Utf8);
}
function qiAesEnc(s) {
  var k = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var iv = CryptoJS.enc.Utf8.parse("kj37zs29q22jk96t");
  var ct = CryptoJS.AES.encrypt(s, k, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
  return CryptoJS.enc.Base64.stringify(ct);
}
function qiHdr() {
  var ts = "" + Math.floor(Date.now() / 1000);
  return { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts, "app-ui-mode": "light" };
}
function qiPost(path, obj) {
  var HOST = "http://110.42.67.130:1226";
  var resp = request(HOST + path, { method: "POST", headers: qiHdr(), body: JSON.stringify(obj) });
  var outer = null;
  try { outer = JSON.parse(resp); } catch (e) { outer = null; }
  if (!outer || outer.code === 1001) return outer;
  try {
    var j = JSON.parse(qiAesDec(outer.data));
    return { code: outer.code, msg: outer.msg, inner: j };
  } catch (e2) { return outer; }
}
function qiSliderVerify() {
  // getSlider -> verifySlider -> true/false
  try {
    var HOST = "http://110.42.67.130:1226";
    var ts0 = "" + Math.floor(Date.now() / 1000);
    var hd0 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/json", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts0, "app-ui-mode": "light" };
    var r0 = request(HOST + "/api.php/qijiappapi.index/getSlider", { method: "POST", headers: hd0, body: "" });
    var o0 = JSON.parse(r0);
    var sg = JSON.parse(qiAesDec(o0.data));
    var ts1 = "" + Math.floor(Date.now() / 1000);
    var hd1 = { "User-Agent": "okhttp/3.10.0", "Content-Type": "application/x-www-form-urlencoded", "app-user-device-id": "", "app-version-code": "", "app-api-verify-time": ts1, "app-ui-mode": "light" };
    var fb = "pos_x=" + sg.target_x + "&slider_id=" + sg.slider_id + "&timestamp=" + ts1;
    var rv = request(HOST + "/api.php/qijiappapi.index/verifySlider", { method: "POST", headers: hd1, body: fb });
    var ov = JSON.parse(rv);
    return ov.code === 1;
  } catch (e3) { return false; }
}
function qiParse(urlRaw, parseVal, token) {
  // POST /vodParse：url 参数 AES 加密后 base64 + URL 编码
  var HOST = "http://110.42.67.130:1226";
  var ts = "" + Math.floor(Date.now() / 1000);
  var encUrl = qiAesEnc(urlRaw);
  var encToken = qiAesEnc(token || "");
  var body = "parse_api=" + encodeURIComponent(parseVal) + "&url=" + encodeURIComponent(encUrl) + "&token=" + encodeURIComponent(encToken);
  var sign = qiAesEnc(ts);
  var hd = { "User-Agent": "okhttp/3.10.0", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
  var resp = request(HOST + "/api.php/qijiappapi.index/vodParse", { method: "POST", headers: hd, body: body });
  try {
    var o = JSON.parse(resp);
    var dec = JSON.parse(qiAesDec(o.data));
    var jsonStr = dec.json;
    if (typeof jsonStr === "string") jsonStr = JSON.parse(jsonStr);
    var u = (jsonStr && jsonStr.url) ? String(jsonStr.url) : "";
    if (u.indexOf("http") === 0) return u;
  } catch (e4) {}
  return "";
}


function qiParseRaw(urlB64, parseApi, tokenB64) {
  var HOST = "http://110.42.67.130:1226";
  try {
    var ts = "" + Math.floor(Date.now() / 1000);
    var body = "parse_api=" + encodeURIComponent(parseApi) + "&url=" + encodeURIComponent(urlB64) + "&token=" + encodeURIComponent(tokenB64);
    var sign = qiAesEnc(ts);
    var hd = { "User-Agent": "okhttp/3.10.0", "Connection": "Keep-Alive", "Content-Type": "application/x-www-form-urlencoded", "app-version-code": "", "app-ui-mode": "light", "app-user-device-id": "", "app-api-verify-time": ts, "app-api-verify-sign": sign };
    var resp = request(HOST + "/api.php/qijiappapi.index/vodParse", { method: "POST", headers: hd, body: body });
    var o = JSON.parse(resp);
    var dec = JSON.parse(qiAesDec(o.data));
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
  if (pure2.indexOf("http") === 0 && /(m3u8|mp4|mkv)/.test(pure2)) {
    u = pure2;
  } else if (pure2.indexOf("parse_api=") >= 0) {
    var parseApi = "";
    var mUrl = pure2.match(/url=([^&]*)/);
    var mTok = pure2.match(/token=([^&]*)/);
    var mParse = pure2.match(/parse_api=([^&]*)/);
    var urlB64 = mUrl ? mUrl[1] : "";
    var tokenB64 = mTok ? mTok[1] : "";
    if (mParse) parseApi = mParse[1];
    // 还原（detail 时已把 aes(base64) 编码进串）——这里直接 POST 原样值
    u = qiParseRaw(urlB64, parseApi, tokenB64);
  }
  if (u && u.indexOf("http") === 0) {
    input = { parse: 0, url: u, jx: 0, header: { "User-Agent": "okhttp/3.10.0", "Referer": "http://110.42.67.130:1226" } };
  }
} catch (e) {}
  })
};
