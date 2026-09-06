var rule = {
  title: "剧圈影视",
  host: "http://124.221.3.182:19987/app/bn",
  homeUrl: "http://124.221.3.182:19987/app/bn/",
  url: "http://124.221.3.182:19987/app/bn/vod/search",
  searchUrl: "http://124.221.3.182:19987/app/bn/vod/search",
  detailUrl: "http://124.221.3.182:19987/app/bn/vod/detail?id=fyid",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  class_name: "电影&剧集&动漫&综艺&动作片&喜剧片&爱情片&科幻片&恐怖片&剧情片&战争片&动画片&国产剧&港台剧&日韩剧&欧美剧&泰国剧",
  class_url: "20&21&22&23&26&27&28&29&30&31&32&33&34&35&36&37&38",
  timeout: 15000,
  play_parse: true,
  headers: { "User-Agent": "okhttp/4.9.0" },

  推荐: $js.toString(() => {

function a99post(pth, params) {
  var UUID = "5d0f47a2-8f3b-4c11-a9e6-1234567890ab";
  var HOST = "http://124.221.3.182:19987/app/bn";
  var APPKEY = "";
  var keyWA = CryptoJS.enc.Utf8.parse(UUID.replace(/-/g, ""));
  function rand16() {
    var w = [];
    for (var ri = 0; ri < 4; ri++) w.push(Math.floor(Math.random() * 4294967296));
    return CryptoJS.lib.WordArray.create(w, 16);
  }
  function encBody(o) {
    var iv = rand16();
    var ct = CryptoJS.AES.encrypt(JSON.stringify(o), keyWA, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
    var all = iv.clone(); all.concat(ct);
    return CryptoJS.enc.Base64.stringify(all);
  }
  function wa2bytes(wa) {
    var n = wa.sigBytes, b = new Uint8Array(n);
    for (var i = 0; i < n; i++) b[i] = (wa.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    return b;
  }
  function bytes2utf8(b) {
    var s = "", i = 0;
    while (i < b.length) {
      var c = b[i++];
      if (c < 0x80) s += String.fromCharCode(c);
      else if (c < 0xE0) s += String.fromCharCode(((c & 0x1F) << 6) | (b[i++] & 0x3F));
      else if (c < 0xF0) s += String.fromCharCode(((c & 0x0F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F));
      else { var cp = ((c & 0x07) << 18) | ((b[i++] & 0x3F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F) - 0x10000; s += String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00); }
    }
    return s;
  }
  function decBody(b64) {
    var wa = CryptoJS.enc.Base64.parse(b64);
    var ivWA = CryptoJS.lib.WordArray.create(wa.words.slice(0, 4), 16);
    var ctWA = CryptoJS.lib.WordArray.create(wa.words.slice(4), wa.sigBytes - 16);
    var pt = CryptoJS.AES.decrypt({ ciphertext: ctWA }, keyWA, { iv: ivWA, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var bytes = wa2bytes(pt);
    var out = null;
    if (typeof pako !== "undefined") {
      try { out = pako.inflate(bytes); } catch (e2) { out = null; }
    }
    if (!out) out = bytes;
    return bytes2utf8(out);
  }
  var ts = "" + Date.now();
  var nonce = rand16().toString(CryptoJS.enc.Base64);
  var enc = encBody(params);
  var sign = CryptoJS.SHA256(nonce + ":" + ts + ":" + enc + ":" + "" + ":" + APPKEY).toString();
  var resp = request(HOST + pth, {
    method: "POST",
    headers: { "User-Agent": "okhttp/4.9.0", "Accept": "application/json", "Content-Type": "application/json", "client_type": "android", "uuid": UUID, "timestamp": ts, "sign": sign, "nonce": nonce, "appkey": APPKEY, "version": "1.2.0", "api_version": "v1" },
    body: enc
  });
  var j = null;
  try { j = JSON.parse(decBody(resp)); } catch (e3) { j = null; }
  return j;
}

var out = [];
    try {
      var j = a99post("/vod/search", { kw: "", page: "1", limit: 21, pid: "20", orderBy: "time", isCategory: 1 });
      var arr = (j && j.data) || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        out.push({ vod_id: String(it.id), vod_name: it.name || "", vod_pic: it.pic || "", vod_remarks: it.remarks || "" });
      }
    } catch (e) {}
    VODS = out;
  }),

  一级: $js.toString(() => {

function a99post(pth, params) {
  var UUID = "5d0f47a2-8f3b-4c11-a9e6-1234567890ab";
  var HOST = "http://124.221.3.182:19987/app/bn";
  var APPKEY = "";
  var keyWA = CryptoJS.enc.Utf8.parse(UUID.replace(/-/g, ""));
  function rand16() {
    var w = [];
    for (var ri = 0; ri < 4; ri++) w.push(Math.floor(Math.random() * 4294967296));
    return CryptoJS.lib.WordArray.create(w, 16);
  }
  function encBody(o) {
    var iv = rand16();
    var ct = CryptoJS.AES.encrypt(JSON.stringify(o), keyWA, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
    var all = iv.clone(); all.concat(ct);
    return CryptoJS.enc.Base64.stringify(all);
  }
  function wa2bytes(wa) {
    var n = wa.sigBytes, b = new Uint8Array(n);
    for (var i = 0; i < n; i++) b[i] = (wa.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    return b;
  }
  function bytes2utf8(b) {
    var s = "", i = 0;
    while (i < b.length) {
      var c = b[i++];
      if (c < 0x80) s += String.fromCharCode(c);
      else if (c < 0xE0) s += String.fromCharCode(((c & 0x1F) << 6) | (b[i++] & 0x3F));
      else if (c < 0xF0) s += String.fromCharCode(((c & 0x0F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F));
      else { var cp = ((c & 0x07) << 18) | ((b[i++] & 0x3F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F) - 0x10000; s += String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00); }
    }
    return s;
  }
  function decBody(b64) {
    var wa = CryptoJS.enc.Base64.parse(b64);
    var ivWA = CryptoJS.lib.WordArray.create(wa.words.slice(0, 4), 16);
    var ctWA = CryptoJS.lib.WordArray.create(wa.words.slice(4), wa.sigBytes - 16);
    var pt = CryptoJS.AES.decrypt({ ciphertext: ctWA }, keyWA, { iv: ivWA, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var bytes = wa2bytes(pt);
    var out = null;
    if (typeof pako !== "undefined") {
      try { out = pako.inflate(bytes); } catch (e2) { out = null; }
    }
    if (!out) out = bytes;
    return bytes2utf8(out);
  }
  var ts = "" + Date.now();
  var nonce = rand16().toString(CryptoJS.enc.Base64);
  var enc = encBody(params);
  var sign = CryptoJS.SHA256(nonce + ":" + ts + ":" + enc + ":" + "" + ":" + APPKEY).toString();
  var resp = request(HOST + pth, {
    method: "POST",
    headers: { "User-Agent": "okhttp/4.9.0", "Accept": "application/json", "Content-Type": "application/json", "client_type": "android", "uuid": UUID, "timestamp": ts, "sign": sign, "nonce": nonce, "appkey": APPKEY, "version": "1.2.0", "api_version": "v1" },
    body: enc
  });
  var j = null;
  try { j = JSON.parse(decBody(resp)); } catch (e3) { j = null; }
  return j;
}

var out = [];
    try {
      var tid = (typeof MY_CATE !== "undefined") ? String(MY_CATE) : "";
      var pg = 1;
      try { pg = parseInt(MY_PAGE, 10) || 1; } catch (e) {}
      var j = a99post("/vod/search", { kw: "", page: String(pg), limit: 21, pid: tid, orderBy: "time", isCategory: 1 });
      var arr = (j && j.data) || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        out.push({ vod_id: String(it.id), vod_name: it.name || "", vod_pic: it.pic || "", vod_remarks: it.remarks || "" });
      }
    } catch (e) {}
    VODS = out;
  }),

  搜索: $js.toString(() => {

function a99post(pth, params) {
  var UUID = "5d0f47a2-8f3b-4c11-a9e6-1234567890ab";
  var HOST = "http://124.221.3.182:19987/app/bn";
  var APPKEY = "";
  var keyWA = CryptoJS.enc.Utf8.parse(UUID.replace(/-/g, ""));
  function rand16() {
    var w = [];
    for (var ri = 0; ri < 4; ri++) w.push(Math.floor(Math.random() * 4294967296));
    return CryptoJS.lib.WordArray.create(w, 16);
  }
  function encBody(o) {
    var iv = rand16();
    var ct = CryptoJS.AES.encrypt(JSON.stringify(o), keyWA, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
    var all = iv.clone(); all.concat(ct);
    return CryptoJS.enc.Base64.stringify(all);
  }
  function wa2bytes(wa) {
    var n = wa.sigBytes, b = new Uint8Array(n);
    for (var i = 0; i < n; i++) b[i] = (wa.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    return b;
  }
  function bytes2utf8(b) {
    var s = "", i = 0;
    while (i < b.length) {
      var c = b[i++];
      if (c < 0x80) s += String.fromCharCode(c);
      else if (c < 0xE0) s += String.fromCharCode(((c & 0x1F) << 6) | (b[i++] & 0x3F));
      else if (c < 0xF0) s += String.fromCharCode(((c & 0x0F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F));
      else { var cp = ((c & 0x07) << 18) | ((b[i++] & 0x3F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F) - 0x10000; s += String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00); }
    }
    return s;
  }
  function decBody(b64) {
    var wa = CryptoJS.enc.Base64.parse(b64);
    var ivWA = CryptoJS.lib.WordArray.create(wa.words.slice(0, 4), 16);
    var ctWA = CryptoJS.lib.WordArray.create(wa.words.slice(4), wa.sigBytes - 16);
    var pt = CryptoJS.AES.decrypt({ ciphertext: ctWA }, keyWA, { iv: ivWA, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var bytes = wa2bytes(pt);
    var out = null;
    if (typeof pako !== "undefined") {
      try { out = pako.inflate(bytes); } catch (e2) { out = null; }
    }
    if (!out) out = bytes;
    return bytes2utf8(out);
  }
  var ts = "" + Date.now();
  var nonce = rand16().toString(CryptoJS.enc.Base64);
  var enc = encBody(params);
  var sign = CryptoJS.SHA256(nonce + ":" + ts + ":" + enc + ":" + "" + ":" + APPKEY).toString();
  var resp = request(HOST + pth, {
    method: "POST",
    headers: { "User-Agent": "okhttp/4.9.0", "Accept": "application/json", "Content-Type": "application/json", "client_type": "android", "uuid": UUID, "timestamp": ts, "sign": sign, "nonce": nonce, "appkey": APPKEY, "version": "1.2.0", "api_version": "v1" },
    body: enc
  });
  var j = null;
  try { j = JSON.parse(decBody(resp)); } catch (e3) { j = null; }
  return j;
}

var out = [];
    try {
      var kw = (typeof KEY !== "undefined" && KEY) ? String(KEY) : "";
      if (!kw && typeof input !== "undefined") kw = String(input);
      var j = a99post("/vod/search", { kw: kw, page: 1, limit: 21, orderBy: "vod_hits_month", sort: "desc" });
      var arr = (j && j.data) || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        out.push({ vod_id: String(it.id), vod_name: it.name || "", vod_pic: it.pic || "", vod_remarks: it.remarks || "" });
      }
    } catch (e) {}
    VODS = out;
  }),

  二级: $js.toString(() => {

function a99post(pth, params) {
  var UUID = "5d0f47a2-8f3b-4c11-a9e6-1234567890ab";
  var HOST = "http://124.221.3.182:19987/app/bn";
  var APPKEY = "";
  var keyWA = CryptoJS.enc.Utf8.parse(UUID.replace(/-/g, ""));
  function rand16() {
    var w = [];
    for (var ri = 0; ri < 4; ri++) w.push(Math.floor(Math.random() * 4294967296));
    return CryptoJS.lib.WordArray.create(w, 16);
  }
  function encBody(o) {
    var iv = rand16();
    var ct = CryptoJS.AES.encrypt(JSON.stringify(o), keyWA, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
    var all = iv.clone(); all.concat(ct);
    return CryptoJS.enc.Base64.stringify(all);
  }
  function wa2bytes(wa) {
    var n = wa.sigBytes, b = new Uint8Array(n);
    for (var i = 0; i < n; i++) b[i] = (wa.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    return b;
  }
  function bytes2utf8(b) {
    var s = "", i = 0;
    while (i < b.length) {
      var c = b[i++];
      if (c < 0x80) s += String.fromCharCode(c);
      else if (c < 0xE0) s += String.fromCharCode(((c & 0x1F) << 6) | (b[i++] & 0x3F));
      else if (c < 0xF0) s += String.fromCharCode(((c & 0x0F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F));
      else { var cp = ((c & 0x07) << 18) | ((b[i++] & 0x3F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F) - 0x10000; s += String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00); }
    }
    return s;
  }
  function decBody(b64) {
    var wa = CryptoJS.enc.Base64.parse(b64);
    var ivWA = CryptoJS.lib.WordArray.create(wa.words.slice(0, 4), 16);
    var ctWA = CryptoJS.lib.WordArray.create(wa.words.slice(4), wa.sigBytes - 16);
    var pt = CryptoJS.AES.decrypt({ ciphertext: ctWA }, keyWA, { iv: ivWA, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var bytes = wa2bytes(pt);
    var out = null;
    if (typeof pako !== "undefined") {
      try { out = pako.inflate(bytes); } catch (e2) { out = null; }
    }
    if (!out) out = bytes;
    return bytes2utf8(out);
  }
  var ts = "" + Date.now();
  var nonce = rand16().toString(CryptoJS.enc.Base64);
  var enc = encBody(params);
  var sign = CryptoJS.SHA256(nonce + ":" + ts + ":" + enc + ":" + "" + ":" + APPKEY).toString();
  var resp = request(HOST + pth, {
    method: "POST",
    headers: { "User-Agent": "okhttp/4.9.0", "Accept": "application/json", "Content-Type": "application/json", "client_type": "android", "uuid": UUID, "timestamp": ts, "sign": sign, "nonce": nonce, "appkey": APPKEY, "version": "1.2.0", "api_version": "v1" },
    body: enc
  });
  var j = null;
  try { j = JSON.parse(decBody(resp)); } catch (e3) { j = null; }
  return j;
}

VOD = VOD || {};
    try {
      var mu = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
      var m = mu.match(/[?&]id=([^&]+)/);
      var vid = m ? m[1] : "";
      var j = a99post("/vod/detail", { id: vid, eps: "1", v: "2.0.0", pl: 1 });
      var data = (j && j.data) || {};
      VOD.vod_id = vid;
      VOD.vod_name = data.name || "";
      VOD.vod_pic = data.pic || data.pic_thumb || "";
      VOD.vod_remarks = data.remarks || "";
      VOD.vod_year = data.year || "";
      VOD.vod_area = data.area || "";
      VOD.vod_actor = data.actor || "";
      VOD.vod_director = data.director || "";
      VOD.vod_content = data.content || data.blurb || "";
      VOD.type_name = data.class || "";
      var pf = String(data.play_from || "").split("$$$");
      var pu = String(data.play_url || "").split("$$$");
      var cnm = { ks:"秒播",hb:"自建蓝光",cy4k:"4K",cy2k1:"2K",JD4K:"JD4K",m4u8:"2K",zijianm3u8:"新4K",yd:"YD蓝光",zl:"ZL蓝光",zj1:"ZJ蓝光",ty:"TY蓝光",wo:"LT蓝光",jz:"JZ蓝光",sxyd:"YP蓝光",kz1:"KZ蓝光",sxzj:"67蓝光",lm:"TX蓝光",qq:"TX蓝光",c2428:"C2蓝光",mizj:"MM蓝光",jpyy:"JP蓝光",BBA:"BB蓝光",YYNB:"YY蓝光",xl:"XL蓝光",IMDB:"DJ超清",dbk:"DB超清",yh:"YH蓝光",xlzj1:"XL蓝光",Ace:"AC蓝光",NBY:"NB蓝光",rr:"RR高清",vwnet:"CK蓝光",qsvip:"QV蓝光",kvod:"KK超清",iyf:"YF超清",bfzym3u8:"BF有广",ffm3u8:"FF有广","1080zyk":"YZ有广",lzm3u8:"LZ有广",rym3u8:"RY有广" };
      var froms = [];
      var urlsArr = [];
      for (var s = 0; s < pf.length && s < pu.length; s++) {
        var code = String(pf[s]);
        var epsStr = String(pu[s] || "");
        if (!epsStr) continue;
        var eps = epsStr.split("#");
        var eps2 = [];
        for (var i = 0; i < eps.length; i++) {
          var epRaw = eps[i];
          var sp = epRaw.split("$");
          var epName = sp[0] || ("第" + (i + 1) + "集");
          var urlPart = sp.slice(1).join("$");
          if (!urlPart) continue;
          var idx = epName.replace(/\D+/g, "");
          if (!idx) idx = String(i + 1);
          eps2.push(epName + "$" + urlPart + "@" + code + "@" + idx);
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

  play: $js.toString(() => {

function a99post(pth, params) {
  var UUID = "5d0f47a2-8f3b-4c11-a9e6-1234567890ab";
  var HOST = "http://124.221.3.182:19987/app/bn";
  var APPKEY = "";
  var keyWA = CryptoJS.enc.Utf8.parse(UUID.replace(/-/g, ""));
  function rand16() {
    var w = [];
    for (var ri = 0; ri < 4; ri++) w.push(Math.floor(Math.random() * 4294967296));
    return CryptoJS.lib.WordArray.create(w, 16);
  }
  function encBody(o) {
    var iv = rand16();
    var ct = CryptoJS.AES.encrypt(JSON.stringify(o), keyWA, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
    var all = iv.clone(); all.concat(ct);
    return CryptoJS.enc.Base64.stringify(all);
  }
  function wa2bytes(wa) {
    var n = wa.sigBytes, b = new Uint8Array(n);
    for (var i = 0; i < n; i++) b[i] = (wa.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    return b;
  }
  function bytes2utf8(b) {
    var s = "", i = 0;
    while (i < b.length) {
      var c = b[i++];
      if (c < 0x80) s += String.fromCharCode(c);
      else if (c < 0xE0) s += String.fromCharCode(((c & 0x1F) << 6) | (b[i++] & 0x3F));
      else if (c < 0xF0) s += String.fromCharCode(((c & 0x0F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F));
      else { var cp = ((c & 0x07) << 18) | ((b[i++] & 0x3F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F) - 0x10000; s += String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00); }
    }
    return s;
  }
  function decBody(b64) {
    var wa = CryptoJS.enc.Base64.parse(b64);
    var ivWA = CryptoJS.lib.WordArray.create(wa.words.slice(0, 4), 16);
    var ctWA = CryptoJS.lib.WordArray.create(wa.words.slice(4), wa.sigBytes - 16);
    var pt = CryptoJS.AES.decrypt({ ciphertext: ctWA }, keyWA, { iv: ivWA, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var bytes = wa2bytes(pt);
    var out = null;
    if (typeof pako !== "undefined") {
      try { out = pako.inflate(bytes); } catch (e2) { out = null; }
    }
    if (!out) out = bytes;
    return bytes2utf8(out);
  }
  var ts = "" + Date.now();
  var nonce = rand16().toString(CryptoJS.enc.Base64);
  var enc = encBody(params);
  var sign = CryptoJS.SHA256(nonce + ":" + ts + ":" + enc + ":" + "" + ":" + APPKEY).toString();
  var resp = request(HOST + pth, {
    method: "POST",
    headers: { "User-Agent": "okhttp/4.9.0", "Accept": "application/json", "Content-Type": "application/json", "client_type": "android", "uuid": UUID, "timestamp": ts, "sign": sign, "nonce": nonce, "appkey": APPKEY, "version": "1.2.0", "api_version": "v1" },
    body: enc
  });
  var j = null;
  try { j = JSON.parse(decBody(resp)); } catch (e3) { j = null; }
  return j;
}

try {
      var ep = (typeof input === "string") ? input : "";
      var pure = ep;
      var dollar = pure.lastIndexOf("$");
      if (dollar >= 0) pure = pure.substring(dollar + 1);
      var seg = pure.split("@");
      var u = seg[0] || "";
      var code = seg[1] || "";
      var finalUrl = "";
      if (u.indexOf("http") === 0) {
        finalUrl = u;
      } else if (code) {
        var pmap = { ks:1,hb:1,cy4k:8,cy2k1:8,JD4K:9,zijianm3u8:14,yd:1,zj1:1,ty:4,wo:7,jz:1,sxyd:1,kz1:8,sxzj:1,lm:1,qq:13,c2428:8,mizj:1,jpyy:14,BBA:3,YYNB:3,IMDB:1,xlzj1:8,Ace:6,NBY:12,rr:11,vwnet:2,qsvip:1,kvod:1 };
        var pid = pmap[code];
        if (pid) {
          var j2 = a99post("/app/vodParser", { id: pid, url: u });
          var du = (j2 && j2.data) ? String(j2.data) : "";
          if (du && du.indexOf("http") === 0) finalUrl = du;
        }
      }
      if (finalUrl) {
        input = { parse: 0, url: finalUrl, jx: 0, header: { "User-Agent": "okhttp/4.9.0", "Referer": "http://124.221.3.182:19987/app/bn" } };
      }
    } catch (e) {}
  }),
  lazy: $js.toString(() => {

function a99post(pth, params) {
  var UUID = "5d0f47a2-8f3b-4c11-a9e6-1234567890ab";
  var HOST = "http://124.221.3.182:19987/app/bn";
  var APPKEY = "";
  var keyWA = CryptoJS.enc.Utf8.parse(UUID.replace(/-/g, ""));
  function rand16() {
    var w = [];
    for (var ri = 0; ri < 4; ri++) w.push(Math.floor(Math.random() * 4294967296));
    return CryptoJS.lib.WordArray.create(w, 16);
  }
  function encBody(o) {
    var iv = rand16();
    var ct = CryptoJS.AES.encrypt(JSON.stringify(o), keyWA, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).ciphertext;
    var all = iv.clone(); all.concat(ct);
    return CryptoJS.enc.Base64.stringify(all);
  }
  function wa2bytes(wa) {
    var n = wa.sigBytes, b = new Uint8Array(n);
    for (var i = 0; i < n; i++) b[i] = (wa.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    return b;
  }
  function bytes2utf8(b) {
    var s = "", i = 0;
    while (i < b.length) {
      var c = b[i++];
      if (c < 0x80) s += String.fromCharCode(c);
      else if (c < 0xE0) s += String.fromCharCode(((c & 0x1F) << 6) | (b[i++] & 0x3F));
      else if (c < 0xF0) s += String.fromCharCode(((c & 0x0F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F));
      else { var cp = ((c & 0x07) << 18) | ((b[i++] & 0x3F) << 12) | ((b[i++] & 0x3F) << 6) | (b[i++] & 0x3F) - 0x10000; s += String.fromCharCode((cp >> 10) + 0xD800, (cp & 0x3FF) + 0xDC00); }
    }
    return s;
  }
  function decBody(b64) {
    var wa = CryptoJS.enc.Base64.parse(b64);
    var ivWA = CryptoJS.lib.WordArray.create(wa.words.slice(0, 4), 16);
    var ctWA = CryptoJS.lib.WordArray.create(wa.words.slice(4), wa.sigBytes - 16);
    var pt = CryptoJS.AES.decrypt({ ciphertext: ctWA }, keyWA, { iv: ivWA, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    var bytes = wa2bytes(pt);
    var out = null;
    if (typeof pako !== "undefined") {
      try { out = pako.inflate(bytes); } catch (e2) { out = null; }
    }
    if (!out) out = bytes;
    return bytes2utf8(out);
  }
  var ts = "" + Date.now();
  var nonce = rand16().toString(CryptoJS.enc.Base64);
  var enc = encBody(params);
  var sign = CryptoJS.SHA256(nonce + ":" + ts + ":" + enc + ":" + "" + ":" + APPKEY).toString();
  var resp = request(HOST + pth, {
    method: "POST",
    headers: { "User-Agent": "okhttp/4.9.0", "Accept": "application/json", "Content-Type": "application/json", "client_type": "android", "uuid": UUID, "timestamp": ts, "sign": sign, "nonce": nonce, "appkey": APPKEY, "version": "1.2.0", "api_version": "v1" },
    body: enc
  });
  var j = null;
  try { j = JSON.parse(decBody(resp)); } catch (e3) { j = null; }
  return j;
}

try {
      var ep = (typeof input === "string") ? input : "";
      var pure = ep;
      var dollar = pure.lastIndexOf("$");
      if (dollar >= 0) pure = pure.substring(dollar + 1);
      var seg = pure.split("@");
      var u = seg[0] || "";
      var code = seg[1] || "";
      var finalUrl = "";
      if (u.indexOf("http") === 0) {
        finalUrl = u;
      } else if (code) {
        var pmap = { ks:1,hb:1,cy4k:8,cy2k1:8,JD4K:9,zijianm3u8:14,yd:1,zj1:1,ty:4,wo:7,jz:1,sxyd:1,kz1:8,sxzj:1,lm:1,qq:13,c2428:8,mizj:1,jpyy:14,BBA:3,YYNB:3,IMDB:1,xlzj1:8,Ace:6,NBY:12,rr:11,vwnet:2,qsvip:1,kvod:1 };
        var pid = pmap[code];
        if (pid) {
          var j2 = a99post("/app/vodParser", { id: pid, url: u });
          var du = (j2 && j2.data) ? String(j2.data) : "";
          if (du && du.indexOf("http") === 0) finalUrl = du;
        }
      }
      if (finalUrl) {
        input = { parse: 0, url: finalUrl, jx: 0, header: { "User-Agent": "okhttp/4.9.0", "Referer": "http://124.221.3.182:19987/app/bn" } };
      }
    } catch (e) {}
  })
};
