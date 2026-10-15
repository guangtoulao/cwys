if (typeof $js === 'undefined') { var $js = { toString: function (f) { return (typeof f === 'function') ? f.toString() : String(f); } }; }

var rule = {
  title: "懂片帝",
  host: "https://dongpian1.com",
  homeUrl: "https://dongpian1.com/",
  url: "https://dongpian1.com/v1/browse/catalog?kind=fyclass&page=fypage&limit=20",
  searchUrl: "https://dongpian1.com/v1/browse/catalog?q=**&page=1&limit=20",
  detailUrl: "https://dongpian1.com/v1/catalog/fyid",
  searchable: 1,
  quickSearch: 1,
  filterable: 0,
  timeout: 15000,
  play_parse: true,
  headers: {
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    "Referer": "https://dongpian1.com/",
    "Accept": "application/json",
    "Accept-Language": "zh-CN,zh;q=0.9"
  },
  class_name: "电影&剧集&短剧&动漫&综艺&纪录片&体育",
  class_url: "movie&series&short_drama&anime&variety&documentary&sports",
  filter: false,

  // ============ 推荐 = 首页信息流（/v1/feed/home 的 sections.cards）============
  推荐: `js:
    var out = [];
    try {
      var HOST = "https://dongpian1.com";
      var _AK = "8b9a908a05eac640e1ee06f52acaa741bfe4ba9e004eeffdbeb635e532e06666";
      function _u8(s) { var o = new Array(s.length * 3), n = 0, i, c, c2, u; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 128) { o[n++] = c; } else if (c < 2048) { o[n++] = 192 | (c >> 6); o[n++] = 128 | (c & 63); } else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.length) { c2 = s.charCodeAt(i + 1); if (c2 >= 0xDC00 && c <= 0xDFFF) { u = ((c - 0xD800) << 10) + (c2 - 0xDC00) + 0x10000; o[n++] = 240 | (u >> 18); o[n++] = 128 | ((u >> 12) & 63); o[n++] = 128 | ((u >> 6) & 63); o[n++] = 128 | (u & 63); i++; } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } var e = new Array(n); for (i = 0; i < n; i++) e[i] = o[i]; return e; }
      function _h2(bs) { var s = "", i; for (i = 0; i < bs.length; i++) s += ("0" + bs[i].toString(16)).slice(-2); return s; }
      function _rr(x, n) { return (x >>> n) | (x << (32 - n)); }
      var _KC = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
      function _core(inp) { var bl = inp.length * 8, by = new Array(inp.length + 72), i, j; for (i = 0; i < inp.length; i++) by[i] = inp[i]; by[inp.length] = 128; var en = inp.length + 1; while (en % 64 !== 56) { by[en] = 0; en++; } for (i = 0; i < 8; i++) by[en + i] = 0; var L = en + 8; by[L - 4] = (bl >>> 24) & 255; by[L - 3] = (bl >>> 16) & 255; by[L - 2] = (bl >>> 8) & 255; by[L - 1] = bl & 255; var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]; var w = new Array(64), a, b, c, d, e, f, g, hh, t1, t2, s0, s1, ch, maj; for (i = 0; i < L; i += 64) { for (j = 0; j < 16; j++) { w[j] = (by[i + j * 4] << 24) | (by[i + j * 4 + 1] << 16) | (by[i + j * 4 + 2] << 8) | by[i + j * 4 + 3]; } for (j = 16; j < 64; j++) { s0 = _rr(w[j - 15], 7) ^ _rr(w[j - 15], 18) ^ (w[j - 15] >>> 3); s1 = _rr(w[j - 2], 17) ^ _rr(w[j - 2], 19) ^ (w[j - 2] >>> 10); w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0; } a = h[0]; b = h[1]; c = h[2]; d = h[3]; e = h[4]; f = h[5]; g = h[6]; hh = h[7]; for (j = 0; j < 64; j++) { s1 = _rr(e, 6) ^ _rr(e, 11) ^ _rr(e, 25); ch = (e & f) ^ (~e & g); t1 = (hh + s1 + ch + _KC[j] + w[j]) | 0; s0 = _rr(a, 2) ^ _rr(a, 13) ^ _rr(a, 22); maj = (a & b) ^ (a & c) ^ (b & c); t2 = (s0 + maj) | 0; hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0; } h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0; h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0; } var o = new Array(32); for (i = 0; i < 8; i++) { var v = h[i]; o[i * 4] = (v >>> 24) & 255; o[i * 4 + 1] = (v >>> 16) & 255; o[i * 4 + 2] = (v >>> 8) & 255; o[i * 4 + 3] = v & 255; } return o; }
      function _hmac(key, msg) { var kb = _u8(key); if (kb.length > 64) kb = _core(kb); while (kb.length < 64) kb.push(0); var mb = _u8(msg), i; var inn = new Array(64 + mb.length); for (i = 0; i < 64; i++) inn[i] = kb[i] ^ 0x36; for (i = 0; i < mb.length; i++) inn[64 + i] = mb[i]; var ih = _core(inn); var out = new Array(64 + 32); for (i = 0; i < 64; i++) out[i] = kb[i] ^ 0x5c; for (i = 0; i < 32; i++) out[64 + i] = ih[i]; return _h2(_core(out)); }
      function _enc(s) { s = String(s); var o = "", i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 0x80) { if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 45 || c === 46 || c === 95 || c === 126) { o += s.charAt(i); } else if (c === 32) { o += "%20"; } else { o += "%" + ("0" + c.toString(16)).slice(-2).toUpperCase(); } } else if (c < 0x800) { o += "%" + ("0" + (192 | (c >> 6)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } else { o += "%" + ("0" + (224 | (c >> 12)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | ((c >> 6) & 63)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } } return o; }
      function _trim(s) { s = String(s); var a = 0, b = s.length; while (a < b && (s.charCodeAt(a) === 32 || s.charCodeAt(a) === 9 || s.charCodeAt(a) === 10 || s.charCodeAt(a) === 13)) { a++; } while (b > a && (s.charCodeAt(b - 1) === 32 || s.charCodeAt(b - 1) === 9 || s.charCodeAt(b - 1) === 10 || s.charCodeAt(b - 1) === 13)) { b--; } return s.substring(a, b); }
      function _keys(o) { var k = [], i; for (i in o) { k.push(i); } return k.slice(0, 12).join(","); }
      function _sget(path) {
        var ts = String(Date.now()), nb = "", i;
        for (i = 0; i < 16; i++) nb += ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
        var sig = _hmac(_AK, "GET" + String.fromCharCode(10) + path + String.fromCharCode(10) + ts + String.fromCharCode(10) + nb);
        var hd = {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
          "Referer": HOST + "/", "Accept": "application/json",
          "x-ai-movie-timestamp": ts, "x-ai-movie-nonce": nb, "x-ai-movie-signature": sig,
          "x-ai-movie-client-name": "movie-search-frontend", "x-ai-movie-client-version": "1.0.0",
          "x-ai-movie-build-version": "dongpiandi-v2026.10.10.2-download-source-entry-aa4983cf2052-web",
          "x-ai-movie-protocol-version": "2026-07-05.library-v2.playback-v1"
        };
        var _r = request(HOST + path, { method: "get", headers: hd, timeout: 15000 });
        var _t = "";
        if (typeof _r === "string") { _t = _r; }
        else if (_r && typeof _r.content === "string") { _t = _r.content; }
        else if (_r && typeof _r.body === "string") { _t = _r.body; }
        if (_t) {
          try { return JSON.parse(_t); } catch (eP) { var _tg = new RegExp("<[^>]+>", "g"); var _ws = new RegExp("\s+", "g"); return { __raw: String(_t).replace(_tg, " ").replace(_ws, " ").slice(0, 90) }; }
        }
        if (_r && typeof _r === "object") {
          if (_r.content && typeof _r.content === "object") { return _r.content; }
          if (_r.body && typeof _r.body === "object") { return _r.body; }
          return _r;
        }
        return { __raw: "(空响应)" };
      }
      var _KIND = { movie: "电影", series: "剧集", short_drama: "短剧", anime: "动漫", variety: "综艺", documentary: "纪录片", sports: "体育", adult: "18+" };
      function _card(c) {
        if (!c || typeof c !== "object") return null;
        var id = c.selected_variant_id || c.default_variant_id || c.id || "";
        if (!id && c.detail_url) id = String(c.detail_url).replace("/v1/catalog/", "");
        if (!id) return null;
        var nm = c.title || c.normalized_title || "";
        if (!nm) return null;
        var note = c.remarks || "";
        if (!note) { note = (c.year ? String(c.year) : "") + (_KIND[c.content_kind] ? " · " + _KIND[c.content_kind] : ""); }
        var pic = String(c.poster_url || "");
        if (/placeholder|nopic|default-poster|loading\\.(gif|svg)|base64,/i.test(pic)) pic = "";
        var vurl = "/v1/catalog/" + id, vname = String(nm), vnote = String(note || ""); return { vod_id: vurl, vod_name: vname, vod_pic: pic, vod_remarks: vnote, url: vurl, title: vname, pic_url: pic, img: pic, desc: vnote, content: "" };
      }
      var d = _sget("/v1/feed/home");
      var secs = (d && d.sections) || [];
      if (d && d.__raw) { out.push({ vod_id: HOST + "/", vod_name: "【非JSON响应】" + d.__raw, vod_pic: "", vod_remarks: "", url: HOST + "/", title: "【非JSON响应】" + d.__raw, pic_url: "", img: "", desc: "", content: "" }); }
      if (d && d.error) { out.push({ vod_id: HOST + "/", vod_name: "【接口报错】" + String(d.error.message || d.error.code || "未知").slice(0, 100), vod_pic: "", vod_remarks: "", url: HOST + "/", title: "【接口报错】" + String(d.error.message || d.error.code || "未知").slice(0, 100), pic_url: "", img: "", desc: "", content: "" }); }
      if (d && !d.__raw && !d.error && !secs.length) { out.push({ vod_id: HOST + "/", vod_name: "【推荐无数据】返回键:" + _keys(d), vod_pic: "", vod_remarks: "", url: HOST + "/", title: "【推荐无数据】返回键:" + _keys(d), pic_url: "", img: "", desc: "", content: "" }); }
      for (var i = 0; i < secs.length && out.length < 60; i++) {
        var cs = (secs[i] && secs[i].cards) || [];
        for (var j = 0; j < cs.length && out.length < 60; j++) {
          var it = _card(cs[j]);
          if (it) out.push(it);
        }
      }
    } catch (e) { out.push({ vod_id: HOST + "/", vod_name: "【加载失败】" + String(e && e.message ? e.message : e).slice(0, 120), vod_pic: "", vod_remarks: "", url: HOST + "/", title: "【加载失败】" + String(e && e.message ? e.message : e).slice(0, 120), pic_url: "", img: "", desc: "", content: "" }); }
    VODS = out;
    try { result = out; } catch (eR) {}
    if (typeof setResult === "function") { try { setResult(VODS); } catch (eS) {} }
  `,

  // ============ 一级 = 分类浏览（/v1/browse/catalog?kind=&page=，kind 是站点真分类参数）============
  一级: `js:
    var out = [];
    try {
      var HOST = "https://dongpian1.com";
      var _AK = "8b9a908a05eac640e1ee06f52acaa741bfe4ba9e004eeffdbeb635e532e06666";
      function _u8(s) { var o = new Array(s.length * 3), n = 0, i, c, c2, u; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 128) { o[n++] = c; } else if (c < 2048) { o[n++] = 192 | (c >> 6); o[n++] = 128 | (c & 63); } else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.length) { c2 = s.charCodeAt(i + 1); if (c2 >= 0xDC00 && c <= 0xDFFF) { u = ((c - 0xD800) << 10) + (c2 - 0xDC00) + 0x10000; o[n++] = 240 | (u >> 18); o[n++] = 128 | ((u >> 12) & 63); o[n++] = 128 | ((u >> 6) & 63); o[n++] = 128 | (u & 63); i++; } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } var e = new Array(n); for (i = 0; i < n; i++) e[i] = o[i]; return e; }
      function _h2(bs) { var s = "", i; for (i = 0; i < bs.length; i++) s += ("0" + bs[i].toString(16)).slice(-2); return s; }
      function _rr(x, n) { return (x >>> n) | (x << (32 - n)); }
      var _KC = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
      function _core(inp) { var bl = inp.length * 8, by = new Array(inp.length + 72), i, j; for (i = 0; i < inp.length; i++) by[i] = inp[i]; by[inp.length] = 128; var en = inp.length + 1; while (en % 64 !== 56) { by[en] = 0; en++; } for (i = 0; i < 8; i++) by[en + i] = 0; var L = en + 8; by[L - 4] = (bl >>> 24) & 255; by[L - 3] = (bl >>> 16) & 255; by[L - 2] = (bl >>> 8) & 255; by[L - 1] = bl & 255; var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]; var w = new Array(64), a, b, c, d, e, f, g, hh, t1, t2, s0, s1, ch, maj; for (i = 0; i < L; i += 64) { for (j = 0; j < 16; j++) { w[j] = (by[i + j * 4] << 24) | (by[i + j * 4 + 1] << 16) | (by[i + j * 4 + 2] << 8) | by[i + j * 4 + 3]; } for (j = 16; j < 64; j++) { s0 = _rr(w[j - 15], 7) ^ _rr(w[j - 15], 18) ^ (w[j - 15] >>> 3); s1 = _rr(w[j - 2], 17) ^ _rr(w[j - 2], 19) ^ (w[j - 2] >>> 10); w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0; } a = h[0]; b = h[1]; c = h[2]; d = h[3]; e = h[4]; f = h[5]; g = h[6]; hh = h[7]; for (j = 0; j < 64; j++) { s1 = _rr(e, 6) ^ _rr(e, 11) ^ _rr(e, 25); ch = (e & f) ^ (~e & g); t1 = (hh + s1 + ch + _KC[j] + w[j]) | 0; s0 = _rr(a, 2) ^ _rr(a, 13) ^ _rr(a, 22); maj = (a & b) ^ (a & c) ^ (b & c); t2 = (s0 + maj) | 0; hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0; } h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0; h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0; } var o = new Array(32); for (i = 0; i < 8; i++) { var v = h[i]; o[i * 4] = (v >>> 24) & 255; o[i * 4 + 1] = (v >>> 16) & 255; o[i * 4 + 2] = (v >>> 8) & 255; o[i * 4 + 3] = v & 255; } return o; }
      function _hmac(key, msg) { var kb = _u8(key); if (kb.length > 64) kb = _core(kb); while (kb.length < 64) kb.push(0); var mb = _u8(msg), i; var inn = new Array(64 + mb.length); for (i = 0; i < 64; i++) inn[i] = kb[i] ^ 0x36; for (i = 0; i < mb.length; i++) inn[64 + i] = mb[i]; var ih = _core(inn); var out = new Array(64 + 32); for (i = 0; i < 64; i++) out[i] = kb[i] ^ 0x5c; for (i = 0; i < 32; i++) out[64 + i] = ih[i]; return _h2(_core(out)); }
      function _enc(s) { s = String(s); var o = "", i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 0x80) { if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 45 || c === 46 || c === 95 || c === 126) { o += s.charAt(i); } else if (c === 32) { o += "%20"; } else { o += "%" + ("0" + c.toString(16)).slice(-2).toUpperCase(); } } else if (c < 0x800) { o += "%" + ("0" + (192 | (c >> 6)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } else { o += "%" + ("0" + (224 | (c >> 12)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | ((c >> 6) & 63)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } } return o; }
      function _trim(s) { s = String(s); var a = 0, b = s.length; while (a < b && (s.charCodeAt(a) === 32 || s.charCodeAt(a) === 9 || s.charCodeAt(a) === 10 || s.charCodeAt(a) === 13)) { a++; } while (b > a && (s.charCodeAt(b - 1) === 32 || s.charCodeAt(b - 1) === 9 || s.charCodeAt(b - 1) === 10 || s.charCodeAt(b - 1) === 13)) { b--; } return s.substring(a, b); }
      function _keys(o) { var k = [], i; for (i in o) { k.push(i); } return k.slice(0, 12).join(","); }
      function _sget(path) {
        var ts = String(Date.now()), nb = "", i;
        for (i = 0; i < 16; i++) nb += ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
        var sig = _hmac(_AK, "GET" + String.fromCharCode(10) + path + String.fromCharCode(10) + ts + String.fromCharCode(10) + nb);
        var hd = {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
          "Referer": HOST + "/", "Accept": "application/json",
          "x-ai-movie-timestamp": ts, "x-ai-movie-nonce": nb, "x-ai-movie-signature": sig,
          "x-ai-movie-client-name": "movie-search-frontend", "x-ai-movie-client-version": "1.0.0",
          "x-ai-movie-build-version": "dongpiandi-v2026.10.10.2-download-source-entry-aa4983cf2052-web",
          "x-ai-movie-protocol-version": "2026-07-05.library-v2.playback-v1"
        };
        var _r = request(HOST + path, { method: "get", headers: hd, timeout: 15000 });
        var _t = "";
        if (typeof _r === "string") { _t = _r; }
        else if (_r && typeof _r.content === "string") { _t = _r.content; }
        else if (_r && typeof _r.body === "string") { _t = _r.body; }
        if (_t) {
          try { return JSON.parse(_t); } catch (eP) { var _tg = new RegExp("<[^>]+>", "g"); var _ws = new RegExp("\s+", "g"); return { __raw: String(_t).replace(_tg, " ").replace(_ws, " ").slice(0, 90) }; }
        }
        if (_r && typeof _r === "object") {
          if (_r.content && typeof _r.content === "object") { return _r.content; }
          if (_r.body && typeof _r.body === "object") { return _r.body; }
          return _r;
        }
        return { __raw: "(空响应)" };
      }
      var _KIND = { movie: "电影", series: "剧集", short_drama: "短剧", anime: "动漫", variety: "综艺", documentary: "纪录片", sports: "体育", adult: "18+" };
      function _card(c) {
        if (!c || typeof c !== "object") return null;
        var id = c.selected_variant_id || c.default_variant_id || c.id || "";
        if (!id && c.detail_url) id = String(c.detail_url).replace("/v1/catalog/", "");
        if (!id) return null;
        var nm = c.title || c.normalized_title || "";
        if (!nm) return null;
        var note = c.remarks || "";
        if (!note) { note = (c.year ? String(c.year) : "") + (_KIND[c.content_kind] ? " · " + _KIND[c.content_kind] : ""); }
        var pic = String(c.poster_url || "");
        if (/placeholder|nopic|default-poster|loading\\.(gif|svg)|base64,/i.test(pic)) pic = "";
        var vurl = "/v1/catalog/" + id, vname = String(nm), vnote = String(note || ""); return { vod_id: vurl, vod_name: vname, vod_pic: pic, vod_remarks: vnote, url: vurl, title: vname, pic_url: pic, img: pic, desc: vnote, content: "" };
      }
      // 分类：MY_CATE 优先，其次从 MY_URL 的 category= 抠，最后兜底电影
      var cate = "";
      try { if (typeof MY_CATE !== "undefined" && MY_CATE) cate = String(MY_CATE); } catch (eC) {}
      var pg = "1";
      try { if (typeof MY_PAGE !== "undefined" && MY_PAGE) pg = String(MY_PAGE); } catch (eP) {}
      var u = "";
      try { if (typeof MY_URL !== "undefined" && MY_URL) u = String(MY_URL); } catch (eU) {}
      if (!cate && u) { var cm = u.match(/[?&]category=([^&?#]+)/); if (cm) cate = cm[1]; }
      if (pg === "1" && u) { var pm = u.match(/[?&]page=(\\d+)/); if (pm) pg = pm[1]; }
      if (!cate) cate = "movie";
      if (cate.indexOf("%") >= 0) { try { cate = decodeURIComponent(cate); } catch (eD) {} }
      var d = _sget("/v1/browse/catalog?kind=" + _enc(cate) + "&page=" + _enc(pg) + "&limit=20");
      var cards = (d && d.cards) || [];
      if (d && d.__raw) { out.push({ vod_id: HOST + "/", vod_name: "【非JSON响应】" + d.__raw, vod_pic: "", vod_remarks: "cate=" + cate, url: HOST + "/", title: "【非JSON响应】" + d.__raw, pic_url: "", img: "", desc: "cate=" + cate, content: "" }); }
      if (d && d.error) { out.push({ vod_id: HOST + "/", vod_name: "【接口报错】" + String(d.error.message || d.error.code || "未知").slice(0, 100), vod_pic: "", vod_remarks: "cate=" + cate, url: HOST + "/", title: "【接口报错】" + String(d.error.message || d.error.code || "未知").slice(0, 100), pic_url: "", img: "", desc: "cate=" + cate, content: "" }); }
      if (d && !d.__raw && !d.error && !cards.length) { out.push({ vod_id: HOST + "/", vod_name: "【接口无数据】返回键:" + _keys(d), vod_pic: "", vod_remarks: "cate=" + cate, url: HOST + "/", title: "【接口无数据】返回键:" + _keys(d), pic_url: "", img: "", desc: "cate=" + cate, content: "" }); }
      for (var i = 0; i < cards.length; i++) {
        var it = _card(cards[i]);
        if (it) out.push(it);
      }
      if (d && cards.length && !out.length) { out.push({ vod_id: HOST + "/", vod_name: "【数据格式异常】" + cards.length + "条无有效片名,首条键:" + _keys(cards[0]), vod_pic: "", vod_remarks: "cate=" + cate, url: HOST + "/", title: "【数据格式异常】" + cards.length + "条无有效片名,首条键:" + _keys(cards[0]), pic_url: "", img: "", desc: "cate=" + cate, content: "" }); }
    } catch (e) { out.push({ vod_id: HOST + "/", vod_name: "【加载失败】" + String(e && e.message ? e.message : e).slice(0, 120), vod_pic: "", vod_remarks: "", url: HOST + "/", title: "【加载失败】" + String(e && e.message ? e.message : e).slice(0, 120), pic_url: "", img: "", desc: "", content: "" }); }
    VODS = out;
    try { result = out; } catch (eR) {}
    if (typeof setResult === "function") { try { setResult(VODS); } catch (eS) {} }
  `,

  // ============ 搜索 = /v1/browse/catalog?q=关键词 ============
  搜索: `js:
    var out = [];
    try {
      var HOST = "https://dongpian1.com";
      var _AK = "8b9a908a05eac640e1ee06f52acaa741bfe4ba9e004eeffdbeb635e532e06666";
      function _u8(s) { var o = new Array(s.length * 3), n = 0, i, c, c2, u; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 128) { o[n++] = c; } else if (c < 2048) { o[n++] = 192 | (c >> 6); o[n++] = 128 | (c & 63); } else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.length) { c2 = s.charCodeAt(i + 1); if (c2 >= 0xDC00 && c <= 0xDFFF) { u = ((c - 0xD800) << 10) + (c2 - 0xDC00) + 0x10000; o[n++] = 240 | (u >> 18); o[n++] = 128 | ((u >> 12) & 63); o[n++] = 128 | ((u >> 6) & 63); o[n++] = 128 | (u & 63); i++; } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } var e = new Array(n); for (i = 0; i < n; i++) e[i] = o[i]; return e; }
      function _h2(bs) { var s = "", i; for (i = 0; i < bs.length; i++) s += ("0" + bs[i].toString(16)).slice(-2); return s; }
      function _rr(x, n) { return (x >>> n) | (x << (32 - n)); }
      var _KC = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
      function _core(inp) { var bl = inp.length * 8, by = new Array(inp.length + 72), i, j; for (i = 0; i < inp.length; i++) by[i] = inp[i]; by[inp.length] = 128; var en = inp.length + 1; while (en % 64 !== 56) { by[en] = 0; en++; } for (i = 0; i < 8; i++) by[en + i] = 0; var L = en + 8; by[L - 4] = (bl >>> 24) & 255; by[L - 3] = (bl >>> 16) & 255; by[L - 2] = (bl >>> 8) & 255; by[L - 1] = bl & 255; var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]; var w = new Array(64), a, b, c, d, e, f, g, hh, t1, t2, s0, s1, ch, maj; for (i = 0; i < L; i += 64) { for (j = 0; j < 16; j++) { w[j] = (by[i + j * 4] << 24) | (by[i + j * 4 + 1] << 16) | (by[i + j * 4 + 2] << 8) | by[i + j * 4 + 3]; } for (j = 16; j < 64; j++) { s0 = _rr(w[j - 15], 7) ^ _rr(w[j - 15], 18) ^ (w[j - 15] >>> 3); s1 = _rr(w[j - 2], 17) ^ _rr(w[j - 2], 19) ^ (w[j - 2] >>> 10); w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0; } a = h[0]; b = h[1]; c = h[2]; d = h[3]; e = h[4]; f = h[5]; g = h[6]; hh = h[7]; for (j = 0; j < 64; j++) { s1 = _rr(e, 6) ^ _rr(e, 11) ^ _rr(e, 25); ch = (e & f) ^ (~e & g); t1 = (hh + s1 + ch + _KC[j] + w[j]) | 0; s0 = _rr(a, 2) ^ _rr(a, 13) ^ _rr(a, 22); maj = (a & b) ^ (a & c) ^ (b & c); t2 = (s0 + maj) | 0; hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0; } h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0; h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0; } var o = new Array(32); for (i = 0; i < 8; i++) { var v = h[i]; o[i * 4] = (v >>> 24) & 255; o[i * 4 + 1] = (v >>> 16) & 255; o[i * 4 + 2] = (v >>> 8) & 255; o[i * 4 + 3] = v & 255; } return o; }
      function _hmac(key, msg) { var kb = _u8(key); if (kb.length > 64) kb = _core(kb); while (kb.length < 64) kb.push(0); var mb = _u8(msg), i; var inn = new Array(64 + mb.length); for (i = 0; i < 64; i++) inn[i] = kb[i] ^ 0x36; for (i = 0; i < mb.length; i++) inn[64 + i] = mb[i]; var ih = _core(inn); var out = new Array(64 + 32); for (i = 0; i < 64; i++) out[i] = kb[i] ^ 0x5c; for (i = 0; i < 32; i++) out[64 + i] = ih[i]; return _h2(_core(out)); }
      function _enc(s) { s = String(s); var o = "", i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 0x80) { if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 45 || c === 46 || c === 95 || c === 126) { o += s.charAt(i); } else if (c === 32) { o += "%20"; } else { o += "%" + ("0" + c.toString(16)).slice(-2).toUpperCase(); } } else if (c < 0x800) { o += "%" + ("0" + (192 | (c >> 6)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } else { o += "%" + ("0" + (224 | (c >> 12)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | ((c >> 6) & 63)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } } return o; }
      function _trim(s) { s = String(s); var a = 0, b = s.length; while (a < b && (s.charCodeAt(a) === 32 || s.charCodeAt(a) === 9 || s.charCodeAt(a) === 10 || s.charCodeAt(a) === 13)) { a++; } while (b > a && (s.charCodeAt(b - 1) === 32 || s.charCodeAt(b - 1) === 9 || s.charCodeAt(b - 1) === 10 || s.charCodeAt(b - 1) === 13)) { b--; } return s.substring(a, b); }
      function _keys(o) { var k = [], i; for (i in o) { k.push(i); } return k.slice(0, 12).join(","); }
      function _sget(path) {
        var ts = String(Date.now()), nb = "", i;
        for (i = 0; i < 16; i++) nb += ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
        var sig = _hmac(_AK, "GET" + String.fromCharCode(10) + path + String.fromCharCode(10) + ts + String.fromCharCode(10) + nb);
        var hd = {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
          "Referer": HOST + "/", "Accept": "application/json",
          "x-ai-movie-timestamp": ts, "x-ai-movie-nonce": nb, "x-ai-movie-signature": sig,
          "x-ai-movie-client-name": "movie-search-frontend", "x-ai-movie-client-version": "1.0.0",
          "x-ai-movie-build-version": "dongpiandi-v2026.10.10.2-download-source-entry-aa4983cf2052-web",
          "x-ai-movie-protocol-version": "2026-07-05.library-v2.playback-v1"
        };
        var _r = request(HOST + path, { method: "get", headers: hd, timeout: 15000 });
        var _t = "";
        if (typeof _r === "string") { _t = _r; }
        else if (_r && typeof _r.content === "string") { _t = _r.content; }
        else if (_r && typeof _r.body === "string") { _t = _r.body; }
        if (_t) {
          try { return JSON.parse(_t); } catch (eP) { var _tg = new RegExp("<[^>]+>", "g"); var _ws = new RegExp("\s+", "g"); return { __raw: String(_t).replace(_tg, " ").replace(_ws, " ").slice(0, 90) }; }
        }
        if (_r && typeof _r === "object") {
          if (_r.content && typeof _r.content === "object") { return _r.content; }
          if (_r.body && typeof _r.body === "object") { return _r.body; }
          return _r;
        }
        return { __raw: "(空响应)" };
      }
      var _KIND = { movie: "电影", series: "剧集", short_drama: "短剧", anime: "动漫", variety: "综艺", documentary: "纪录片", sports: "体育", adult: "18+" };
      function _card(c) {
        if (!c || typeof c !== "object") return null;
        var id = c.selected_variant_id || c.default_variant_id || c.id || "";
        if (!id && c.detail_url) id = String(c.detail_url).replace("/v1/catalog/", "");
        if (!id) return null;
        var nm = c.title || c.normalized_title || "";
        if (!nm) return null;
        var note = c.remarks || "";
        if (!note) { note = (c.year ? String(c.year) : "") + (_KIND[c.content_kind] ? " · " + _KIND[c.content_kind] : ""); }
        var pic = String(c.poster_url || "");
        if (/placeholder|nopic|default-poster|loading\\.(gif|svg)|base64,/i.test(pic)) pic = "";
        var vurl = "/v1/catalog/" + id, vname = String(nm), vnote = String(note || ""); return { vod_id: vurl, vod_name: vname, vod_pic: pic, vod_remarks: vnote, url: vurl, title: vname, pic_url: pic, img: pic, desc: vnote, content: "" };
      }
      // 关键词：KEY 全局优先，其次 input，最后从 MY_URL 的 q= 抠
      var kw = "";
      try { if (typeof KEY !== "undefined" && KEY) kw = String(KEY); } catch (eK) {}
      if (!kw && typeof input !== "undefined" && input) {
        var s = String(input);
        var im = s.match(/[?&](?:wd|keyword|kw|q|key|k|s|searchword)=([^&?#]+)/);
        if (im) kw = im[1]; else if (s.indexOf("http") !== 0 && s.length < 60) kw = s;
      }
      if (!kw && typeof MY_URL !== "undefined" && MY_URL) {
        var im2 = String(MY_URL).match(/[?&](?:wd|keyword|kw|q|key|k|s|searchword)=([^&?#]+)/);
        if (im2) kw = im2[1];
      }
      if (kw.indexOf("%") >= 0) { try { kw = decodeURIComponent(kw); } catch (eD) {} }
      kw = String(kw || "").replace(/^\\s+|\\s+$/g, "");
      if (kw) {
        var d = _sget("/v1/browse/catalog?q=" + _enc(kw) + "&page=1&limit=20");
        var cards = (d && d.cards) || [];
        if (d && d.__raw) { out.push({ vod_id: HOST + "/", vod_name: "【非JSON响应】" + d.__raw, vod_pic: "", vod_remarks: "kw=" + kw, url: HOST + "/", title: "【非JSON响应】" + d.__raw, pic_url: "", img: "", desc: "kw=" + kw, content: "" }); }
        if (d && d.error) { out.push({ vod_id: HOST + "/", vod_name: "【接口报错】" + String(d.error.message || d.error.code || "未知").slice(0, 100), vod_pic: "", vod_remarks: "kw=" + kw, url: HOST + "/", title: "【接口报错】" + String(d.error.message || d.error.code || "未知").slice(0, 100), pic_url: "", img: "", desc: "kw=" + kw, content: "" }); }
        if (d && !d.__raw && !d.error && !cards.length) { out.push({ vod_id: HOST + "/", vod_name: "【搜索无结果】返回键:" + _keys(d), vod_pic: "", vod_remarks: "kw=" + kw, url: HOST + "/", title: "【搜索无结果】返回键:" + _keys(d), pic_url: "", img: "", desc: "kw=" + kw, content: "" }); }
        for (var i = 0; i < cards.length; i++) {
          var it = _card(cards[i]);
          if (it) out.push(it);
        }
        if (d && cards.length && !out.length) { out.push({ vod_id: HOST + "/", vod_name: "【数据格式异常】" + cards.length + "条无有效片名,首条键:" + _keys(cards[0]), vod_pic: "", vod_remarks: "kw=" + kw, url: HOST + "/", title: "【数据格式异常】" + cards.length + "条无有效片名,首条键:" + _keys(cards[0]), pic_url: "", img: "", desc: "kw=" + kw, content: "" }); }
      }
    } catch (e) { out.push({ vod_id: HOST + "/", vod_name: "【加载失败】" + String(e && e.message ? e.message : e).slice(0, 120), vod_pic: "", vod_remarks: "", url: HOST + "/", title: "【加载失败】" + String(e && e.message ? e.message : e).slice(0, 120), pic_url: "", img: "", desc: "", content: "" }); }
    VODS = out;
    try { result = out; } catch (eR) {}
    if (typeof setResult === "function") { try { setResult(VODS); } catch (eS) {} }
  `,

  // ============ 二级 = 详情 + 选集（多季各成一线）============
  二级: `js:
    var _vod = {};
      _vod.vod_play_from = "诊断"; _vod.vod_play_url = "正在获取详情$https://dongpian1.com/";
    try {
      var HOST = "https://dongpian1.com";
      var _AK = "8b9a908a05eac640e1ee06f52acaa741bfe4ba9e004eeffdbeb635e532e06666";
      function _u8(s) { var o = new Array(s.length * 3), n = 0, i, c, c2, u; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 128) { o[n++] = c; } else if (c < 2048) { o[n++] = 192 | (c >> 6); o[n++] = 128 | (c & 63); } else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.length) { c2 = s.charCodeAt(i + 1); if (c2 >= 0xDC00 && c <= 0xDFFF) { u = ((c - 0xD800) << 10) + (c2 - 0xDC00) + 0x10000; o[n++] = 240 | (u >> 18); o[n++] = 128 | ((u >> 12) & 63); o[n++] = 128 | ((u >> 6) & 63); o[n++] = 128 | (u & 63); i++; } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } var e = new Array(n); for (i = 0; i < n; i++) e[i] = o[i]; return e; }
      function _h2(bs) { var s = "", i; for (i = 0; i < bs.length; i++) s += ("0" + bs[i].toString(16)).slice(-2); return s; }
      function _rr(x, n) { return (x >>> n) | (x << (32 - n)); }
      var _KC = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
      function _core(inp) { var bl = inp.length * 8, by = new Array(inp.length + 72), i, j; for (i = 0; i < inp.length; i++) by[i] = inp[i]; by[inp.length] = 128; var en = inp.length + 1; while (en % 64 !== 56) { by[en] = 0; en++; } for (i = 0; i < 8; i++) by[en + i] = 0; var L = en + 8; by[L - 4] = (bl >>> 24) & 255; by[L - 3] = (bl >>> 16) & 255; by[L - 2] = (bl >>> 8) & 255; by[L - 1] = bl & 255; var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]; var w = new Array(64), a, b, c, d, e, f, g, hh, t1, t2, s0, s1, ch, maj; for (i = 0; i < L; i += 64) { for (j = 0; j < 16; j++) { w[j] = (by[i + j * 4] << 24) | (by[i + j * 4 + 1] << 16) | (by[i + j * 4 + 2] << 8) | by[i + j * 4 + 3]; } for (j = 16; j < 64; j++) { s0 = _rr(w[j - 15], 7) ^ _rr(w[j - 15], 18) ^ (w[j - 15] >>> 3); s1 = _rr(w[j - 2], 17) ^ _rr(w[j - 2], 19) ^ (w[j - 2] >>> 10); w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0; } a = h[0]; b = h[1]; c = h[2]; d = h[3]; e = h[4]; f = h[5]; g = h[6]; hh = h[7]; for (j = 0; j < 64; j++) { s1 = _rr(e, 6) ^ _rr(e, 11) ^ _rr(e, 25); ch = (e & f) ^ (~e & g); t1 = (hh + s1 + ch + _KC[j] + w[j]) | 0; s0 = _rr(a, 2) ^ _rr(a, 13) ^ _rr(a, 22); maj = (a & b) ^ (a & c) ^ (b & c); t2 = (s0 + maj) | 0; hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0; } h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0; h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0; } var o = new Array(32); for (i = 0; i < 8; i++) { var v = h[i]; o[i * 4] = (v >>> 24) & 255; o[i * 4 + 1] = (v >>> 16) & 255; o[i * 4 + 2] = (v >>> 8) & 255; o[i * 4 + 3] = v & 255; } return o; }
      function _hmac(key, msg) { var kb = _u8(key); if (kb.length > 64) kb = _core(kb); while (kb.length < 64) kb.push(0); var mb = _u8(msg), i; var inn = new Array(64 + mb.length); for (i = 0; i < 64; i++) inn[i] = kb[i] ^ 0x36; for (i = 0; i < mb.length; i++) inn[64 + i] = mb[i]; var ih = _core(inn); var out = new Array(64 + 32); for (i = 0; i < 64; i++) out[i] = kb[i] ^ 0x5c; for (i = 0; i < 32; i++) out[64 + i] = ih[i]; return _h2(_core(out)); }
      function _enc(s) { s = String(s); var o = "", i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 0x80) { if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 45 || c === 46 || c === 95 || c === 126) { o += s.charAt(i); } else if (c === 32) { o += "%20"; } else { o += "%" + ("0" + c.toString(16)).slice(-2).toUpperCase(); } } else if (c < 0x800) { o += "%" + ("0" + (192 | (c >> 6)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } else { o += "%" + ("0" + (224 | (c >> 12)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | ((c >> 6) & 63)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } } return o; }
      function _trim(s) { s = String(s); var a = 0, b = s.length; while (a < b && (s.charCodeAt(a) === 32 || s.charCodeAt(a) === 9 || s.charCodeAt(a) === 10 || s.charCodeAt(a) === 13)) { a++; } while (b > a && (s.charCodeAt(b - 1) === 32 || s.charCodeAt(b - 1) === 9 || s.charCodeAt(b - 1) === 10 || s.charCodeAt(b - 1) === 13)) { b--; } return s.substring(a, b); }
      function _keys(o) { var k = [], i; for (i in o) { k.push(i); } return k.slice(0, 12).join(","); }
      function _sget(path) {
        var ts = String(Date.now()), nb = "", i;
        for (i = 0; i < 16; i++) nb += ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
        var sig = _hmac(_AK, "GET" + String.fromCharCode(10) + path + String.fromCharCode(10) + ts + String.fromCharCode(10) + nb);
        var hd = {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
          "Referer": HOST + "/", "Accept": "application/json",
          "x-ai-movie-timestamp": ts, "x-ai-movie-nonce": nb, "x-ai-movie-signature": sig,
          "x-ai-movie-client-name": "movie-search-frontend", "x-ai-movie-client-version": "1.0.0",
          "x-ai-movie-build-version": "dongpiandi-v2026.10.10.2-download-source-entry-aa4983cf2052-web",
          "x-ai-movie-protocol-version": "2026-07-05.library-v2.playback-v1"
        };
        var _r = request(HOST + path, { method: "get", headers: hd, timeout: 15000 });
        var _t = "";
        if (typeof _r === "string") { _t = _r; }
        else if (_r && typeof _r.content === "string") { _t = _r.content; }
        else if (_r && typeof _r.body === "string") { _t = _r.body; }
        if (_t) {
          try { return JSON.parse(_t); } catch (eP) { var _tg = new RegExp("<[^>]+>", "g"); var _ws = new RegExp("\s+", "g"); return { __raw: String(_t).replace(_tg, " ").replace(_ws, " ").slice(0, 90) }; }
        }
        if (_r && typeof _r === "object") {
          if (_r.content && typeof _r.content === "object") { return _r.content; }
          if (_r.body && typeof _r.body === "object") { return _r.body; }
          return _r;
        }
        return { __raw: "(空响应)" };
      }
      var _KIND = { movie: "电影", series: "剧集", short_drama: "短剧", anime: "动漫", variety: "综艺", documentary: "纪录片", sports: "体育", adult: "18+" };
      // vod_id 形态：/v1/catalog/{id} 或裸 id 或整站 URL，统一抠出 id
      var u = "";
      try { if (typeof MY_URL !== "undefined" && MY_URL) u = String(MY_URL); } catch (eU) {}
      if (!u && typeof input !== "undefined" && input) u = String(input);
      var vid = "";
      var mm = u.match(/\\/v1\\/catalog\\/([^/?#]+)/);
      if (mm) vid = mm[1];
      else { var q = u.indexOf("?"); var head = q >= 0 ? u.substring(0, q) : u; var seg = head.split("/"); vid = seg[seg.length - 1] || ""; }
      if (vid.indexOf("%") >= 0) { try { vid = decodeURIComponent(vid); } catch (eD) {} }
      if (!vid) { _vod.vod_id = HOST; _vod.vod_name = "【详情ID缺失】地址:" + String(u || "").slice(0, 80); _vod.vod_play_from = "诊断"; _vod.vod_play_url = "ID缺失:" + String(u || "").slice(0, 60) + "$https://dongpian1.com/"; }
      if (vid) {
      var d = _sget("/v1/catalog/" + _enc(vid));
      if (d && d.__raw) { _vod.vod_id = HOST; _vod.vod_name = "【非JSON响应】" + d.__raw; _vod.vod_play_from = "诊断"; _vod.vod_play_url = d.__raw.slice(0, 60) + "$https://dongpian1.com/"; }
      else if (d && d.error) { _vod.vod_id = HOST; _vod.vod_name = "【接口报错】" + String(d.error.message || d.error.code || "未知").slice(0, 100); _vod.vod_play_from = "诊断"; _vod.vod_play_url = String(d.error.message || d.error.code || "未知").slice(0, 60) + "$https://dongpian1.com/"; }
      else if (!d || !d.title) { _vod.vod_id = HOST; _vod.vod_name = "【详情结构异常】返回键:" + (d ? _keys(d) : "空"); _vod.vod_play_from = "诊断"; _vod.vod_play_url = "结构异常:" + (d ? _keys(d) : "空").slice(0, 60) + "$https://dongpian1.com/"; }
      else {

      function _joinArr(a) { var s = "", i; if (!Array.isArray(a)) return ""; for (i = 0; i < a.length; i++) { var x = a[i]; s += (i ? "," : "") + (typeof x === "string" ? x : (x && (x.name || x.title)) || ""); } return s; }
      function _epItems(eps, pn) {
        var items = [];
        for (var k = 0; k < eps.length; k++) {
          var ep = eps[k] || {};
          var tk2 = ep.token || "";
          if (!tk2) continue;
          var nm = ep.title || ep.display_name || ("第" + (ep.number || (k + 1)) + "集");
          items.push(String(nm) + "$" + (pn ? (pn + "|" + tk2) : tk2));
        }
        return items;
      }

      _vod.vod_id = u;
      _vod.vod_name = String(d.title || "");
      var pic = String(d.poster_url || "");
      if (/placeholder|nopic|default-poster|loading\\.(gif|svg)|base64,/i.test(pic)) pic = "";
      _vod.vod_pic = pic;
      _vod.vod_year = String(d.year || "").slice(0, 4);
      _vod.vod_area = String(d.area || "");
      _vod.vod_actor = _joinArr(d.actors);
      _vod.vod_director = _joinArr(d.directors);
      _vod.type_name = _KIND[d.content_kind] || "";
      _vod.vod_content = _trim(String(d.description || "").replace(/<[^>]+>/g, ""));
      _vod.vod_remarks = String(d.remarks || d.episode_progress_text || "");

      var eps = (d && d.episodes) || [];
      var fr = [], us = [];
      // 线路表 = 解析第1集的 playback/resolve → line_options 里 direct https 直链（资源站线路）；
      // 官方 resolve:// 票二次解析必失效（实测 400 invalid_public_playback_id），不做成线路；
      // 每条线路的集数项编码为 集名$线路名|集token，play/lazy 里按线路名精确挑该集对应直链
      var eptok0 = "";
      for (var k0 = 0; k0 < eps.length; k0++) { if (eps[k0] && eps[k0].token) { eptok0 = eps[k0].token; break; } }
      var dlines = [];
      if (eptok0) {
        try {
          var r0 = _sget("/v1/playback/resolve/" + _enc(eptok0));
          var lo0 = (r0 && r0.line_options) || [];
          for (var li0 = 0; li0 < lo0.length; li0++) {
            var L0 = lo0[li0] || {};
            if (L0.url && /^https?:/i.test(String(L0.url))) dlines.push(L0);
          }
        } catch (eL0) { dlines = []; }
      }
      if (dlines.length) {
        // 精简线路：接口顺序即推荐度（选中线在前），只保留前 5 条主线路，避免二三十条杂线
        var capL = dlines.length > 5 ? 5 : dlines.length;
        for (var li2 = 0; li2 < capL; li2++) {
          var pn = String(dlines[li2].provider_name || dlines[li2].display_label || ("线路" + (li2 + 1)));
          var its = _epItems(eps, pn);
          if (its.length) { fr.push(pn); us.push(its.join("#")); }
        }
      }
      if (!fr.length) {
        var its0 = _epItems(eps, "");
        if (its0.length) { fr.push("播放"); us.push(its0.join("#")); }
      }
      if (!fr.length) { fr.push("播放"); us.push(""); }
      _vod.vod_play_from = fr.join("$$$");
      _vod.vod_play_url = us.join("$$$");
      }
      }
    } catch (e) { _vod.vod_id = HOST; _vod.vod_name = "【详情加载失败】" + String(e && e.message ? e.message : e).slice(0, 120); _vod.vod_play_from = "诊断"; _vod.vod_play_url = String(e && e.message ? e.message : e).slice(0, 80) + "$https://dongpian1.com/"; }
    VOD = _vod; VODS = _vod;
    try { result = _vod; } catch (eR2) {}
  `,

  // ============ play/lazy = token → /v1/playback/resolve 出 m3u8 直链 ============
  play: `js:
    try {
      var HOST = "https://dongpian1.com";
      var _AK = "8b9a908a05eac640e1ee06f52acaa741bfe4ba9e004eeffdbeb635e532e06666";
      function _u8(s) { var o = new Array(s.length * 3), n = 0, i, c, c2, u; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 128) { o[n++] = c; } else if (c < 2048) { o[n++] = 192 | (c >> 6); o[n++] = 128 | (c & 63); } else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.length) { c2 = s.charCodeAt(i + 1); if (c2 >= 0xDC00 && c <= 0xDFFF) { u = ((c - 0xD800) << 10) + (c2 - 0xDC00) + 0x10000; o[n++] = 240 | (u >> 18); o[n++] = 128 | ((u >> 12) & 63); o[n++] = 128 | ((u >> 6) & 63); o[n++] = 128 | (u & 63); i++; } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } var e = new Array(n); for (i = 0; i < n; i++) e[i] = o[i]; return e; }
      function _h2(bs) { var s = "", i; for (i = 0; i < bs.length; i++) s += ("0" + bs[i].toString(16)).slice(-2); return s; }
      function _rr(x, n) { return (x >>> n) | (x << (32 - n)); }
      var _KC = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
      function _core(inp) { var bl = inp.length * 8, by = new Array(inp.length + 72), i, j; for (i = 0; i < inp.length; i++) by[i] = inp[i]; by[inp.length] = 128; var en = inp.length + 1; while (en % 64 !== 56) { by[en] = 0; en++; } for (i = 0; i < 8; i++) by[en + i] = 0; var L = en + 8; by[L - 4] = (bl >>> 24) & 255; by[L - 3] = (bl >>> 16) & 255; by[L - 2] = (bl >>> 8) & 255; by[L - 1] = bl & 255; var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]; var w = new Array(64), a, b, c, d, e, f, g, hh, t1, t2, s0, s1, ch, maj; for (i = 0; i < L; i += 64) { for (j = 0; j < 16; j++) { w[j] = (by[i + j * 4] << 24) | (by[i + j * 4 + 1] << 16) | (by[i + j * 4 + 2] << 8) | by[i + j * 4 + 3]; } for (j = 16; j < 64; j++) { s0 = _rr(w[j - 15], 7) ^ _rr(w[j - 15], 18) ^ (w[j - 15] >>> 3); s1 = _rr(w[j - 2], 17) ^ _rr(w[j - 2], 19) ^ (w[j - 2] >>> 10); w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0; } a = h[0]; b = h[1]; c = h[2]; d = h[3]; e = h[4]; f = h[5]; g = h[6]; hh = h[7]; for (j = 0; j < 64; j++) { s1 = _rr(e, 6) ^ _rr(e, 11) ^ _rr(e, 25); ch = (e & f) ^ (~e & g); t1 = (hh + s1 + ch + _KC[j] + w[j]) | 0; s0 = _rr(a, 2) ^ _rr(a, 13) ^ _rr(a, 22); maj = (a & b) ^ (a & c) ^ (b & c); t2 = (s0 + maj) | 0; hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0; } h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0; h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0; } var o = new Array(32); for (i = 0; i < 8; i++) { var v = h[i]; o[i * 4] = (v >>> 24) & 255; o[i * 4 + 1] = (v >>> 16) & 255; o[i * 4 + 2] = (v >>> 8) & 255; o[i * 4 + 3] = v & 255; } return o; }
      function _hmac(key, msg) { var kb = _u8(key); if (kb.length > 64) kb = _core(kb); while (kb.length < 64) kb.push(0); var mb = _u8(msg), i; var inn = new Array(64 + mb.length); for (i = 0; i < 64; i++) inn[i] = kb[i] ^ 0x36; for (i = 0; i < mb.length; i++) inn[64 + i] = mb[i]; var ih = _core(inn); var out = new Array(64 + 32); for (i = 0; i < 64; i++) out[i] = kb[i] ^ 0x5c; for (i = 0; i < 32; i++) out[64 + i] = ih[i]; return _h2(_core(out)); }
      function _enc(s) { s = String(s); var o = "", i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 0x80) { if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 45 || c === 46 || c === 95 || c === 126) { o += s.charAt(i); } else if (c === 32) { o += "%20"; } else { o += "%" + ("0" + c.toString(16)).slice(-2).toUpperCase(); } } else if (c < 0x800) { o += "%" + ("0" + (192 | (c >> 6)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } else { o += "%" + ("0" + (224 | (c >> 12)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | ((c >> 6) & 63)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } } return o; }
      function _trim(s) { s = String(s); var a = 0, b = s.length; while (a < b && (s.charCodeAt(a) === 32 || s.charCodeAt(a) === 9 || s.charCodeAt(a) === 10 || s.charCodeAt(a) === 13)) { a++; } while (b > a && (s.charCodeAt(b - 1) === 32 || s.charCodeAt(b - 1) === 9 || s.charCodeAt(b - 1) === 10 || s.charCodeAt(b - 1) === 13)) { b--; } return s.substring(a, b); }
      function _keys(o) { var k = [], i; for (i in o) { k.push(i); } return k.slice(0, 12).join(","); }
      function _sget(path) {
        var ts = String(Date.now()), nb = "", i;
        for (i = 0; i < 16; i++) nb += ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
        var sig = _hmac(_AK, "GET" + String.fromCharCode(10) + path + String.fromCharCode(10) + ts + String.fromCharCode(10) + nb);
        var hd = {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
          "Referer": HOST + "/", "Accept": "application/json",
          "x-ai-movie-timestamp": ts, "x-ai-movie-nonce": nb, "x-ai-movie-signature": sig,
          "x-ai-movie-client-name": "movie-search-frontend", "x-ai-movie-client-version": "1.0.0",
          "x-ai-movie-build-version": "dongpiandi-v2026.10.10.2-download-source-entry-aa4983cf2052-web",
          "x-ai-movie-protocol-version": "2026-07-05.library-v2.playback-v1"
        };
        var _r = request(HOST + path, { method: "get", headers: hd, timeout: 15000 });
        var _t = "";
        if (typeof _r === "string") { _t = _r; }
        else if (_r && typeof _r.content === "string") { _t = _r.content; }
        else if (_r && typeof _r.body === "string") { _t = _r.body; }
        if (_t) {
          try { return JSON.parse(_t); } catch (eP) { var _tg = new RegExp("<[^>]+>", "g"); var _ws = new RegExp("\s+", "g"); return { __raw: String(_t).replace(_tg, " ").replace(_ws, " ").slice(0, 90) }; }
        }
        if (_r && typeof _r === "object") {
          if (_r.content && typeof _r.content === "object") { return _r.content; }
          if (_r.body && typeof _r.body === "object") { return _r.body; }
          return _r;
        }
        return { __raw: "(空响应)" };
      }
      var MUA = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1";
      // input 形态：第N集$token（引擎把 $ 后的播放地址喂进来）
      var tk = (typeof input === "string") ? input : "";
      var dp = tk.lastIndexOf("$");
      if (dp >= 0) tk = tk.substring(dp + 1);
      tk = String(tk || "").replace(/^\\s+|\\s+$/g, "");
      // 新格式 线路名|token；兼容旧格式纯 token
      var pn = "";
      var ipx = tk.indexOf("|");
      if (ipx >= 0) { pn = tk.substring(0, ipx); tk = tk.substring(ipx + 1); }
      var pn2 = pn; try { pn2 = decodeURIComponent(pn); } catch (eDp) {}
      if (tk) {
      var d = _sget("/v1/playback/resolve/" + _enc(tk));
      var lines = (d && d.line_options) || [];
      // 选线路：官方 resolve:// 票二次解析必失效（实测 400 invalid_public_playback_id），直接跳过；
      // 只收 direct https 直链。用户切了线路 → 按 provider_name 精确匹配；匹配不到（线路名被编码/该集无此线）→ 按权重回退最佳直链
      var best = null, bestW = -1, fb = null, fbW = -1, l2, i2;
      for (i2 = 0; i2 < lines.length; i2++) {
        l2 = lines[i2] || {};
        if (!l2.url) continue;
        if (!/^https?:/i.test(l2.url)) { continue; }
        var wgt2 = Number(l2.preference_weight) || 0;
        if (l2.selected === true) wgt2 += 100000;
        if (wgt2 > fbW) { fb = l2; fbW = wgt2; }
        if (pn && (String(l2.provider_name || "") === pn || String(l2.provider_name || "") === pn2 || String(l2.display_label || "") === pn) && wgt2 > bestW) { best = l2; bestW = wgt2; }
      }
      if (!best) best = fb;
      if (best && best.url) {
        var isDirect = /^https?:\\/\\//i.test(best.url);
        input = {
          parse: isDirect ? 0 : 1,
          url: best.url,
          jx: isDirect ? 0 : 1,
          header: { "User-Agent": MUA, "Referer": HOST + "/" }
        };
      } else {
        input = { parse: 0, url: "toast://解析失败:" + (d && d.error ? String(d.error.message || "").slice(0, 70) : (d && d.__raw ? d.__raw.slice(0, 70) : (d ? _keys(d) : "无响应"))), jx: 0 };
      }
      } else {
        input = { parse: 0, url: "toast://这一集没有取到播放令牌", jx: 0 };
      }
    } catch (e) {
      input = { parse: 0, url: "toast://取播放地址失败", jx: 0 };
    }
    if (typeof setResult === "function") { try { setResult(input); } catch (eS) {} }
  `,

  lazy: `js:
    try {
      var HOST = "https://dongpian1.com";
      var _AK = "8b9a908a05eac640e1ee06f52acaa741bfe4ba9e004eeffdbeb635e532e06666";
      function _u8(s) { var o = new Array(s.length * 3), n = 0, i, c, c2, u; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 128) { o[n++] = c; } else if (c < 2048) { o[n++] = 192 | (c >> 6); o[n++] = 128 | (c & 63); } else if (c >= 0xD800 && c <= 0xDBFF && i + 1 < s.length) { c2 = s.charCodeAt(i + 1); if (c2 >= 0xDC00 && c <= 0xDFFF) { u = ((c - 0xD800) << 10) + (c2 - 0xDC00) + 0x10000; o[n++] = 240 | (u >> 18); o[n++] = 128 | ((u >> 12) & 63); o[n++] = 128 | ((u >> 6) & 63); o[n++] = 128 | (u & 63); i++; } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } else { o[n++] = 224 | (c >> 12); o[n++] = 128 | ((c >> 6) & 63); o[n++] = 128 | (c & 63); } } var e = new Array(n); for (i = 0; i < n; i++) e[i] = o[i]; return e; }
      function _h2(bs) { var s = "", i; for (i = 0; i < bs.length; i++) s += ("0" + bs[i].toString(16)).slice(-2); return s; }
      function _rr(x, n) { return (x >>> n) | (x << (32 - n)); }
      var _KC = [0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
      function _core(inp) { var bl = inp.length * 8, by = new Array(inp.length + 72), i, j; for (i = 0; i < inp.length; i++) by[i] = inp[i]; by[inp.length] = 128; var en = inp.length + 1; while (en % 64 !== 56) { by[en] = 0; en++; } for (i = 0; i < 8; i++) by[en + i] = 0; var L = en + 8; by[L - 4] = (bl >>> 24) & 255; by[L - 3] = (bl >>> 16) & 255; by[L - 2] = (bl >>> 8) & 255; by[L - 1] = bl & 255; var h = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19]; var w = new Array(64), a, b, c, d, e, f, g, hh, t1, t2, s0, s1, ch, maj; for (i = 0; i < L; i += 64) { for (j = 0; j < 16; j++) { w[j] = (by[i + j * 4] << 24) | (by[i + j * 4 + 1] << 16) | (by[i + j * 4 + 2] << 8) | by[i + j * 4 + 3]; } for (j = 16; j < 64; j++) { s0 = _rr(w[j - 15], 7) ^ _rr(w[j - 15], 18) ^ (w[j - 15] >>> 3); s1 = _rr(w[j - 2], 17) ^ _rr(w[j - 2], 19) ^ (w[j - 2] >>> 10); w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0; } a = h[0]; b = h[1]; c = h[2]; d = h[3]; e = h[4]; f = h[5]; g = h[6]; hh = h[7]; for (j = 0; j < 64; j++) { s1 = _rr(e, 6) ^ _rr(e, 11) ^ _rr(e, 25); ch = (e & f) ^ (~e & g); t1 = (hh + s1 + ch + _KC[j] + w[j]) | 0; s0 = _rr(a, 2) ^ _rr(a, 13) ^ _rr(a, 22); maj = (a & b) ^ (a & c) ^ (b & c); t2 = (s0 + maj) | 0; hh = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0; } h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0; h[4] = (h[4] + e) | 0; h[5] = (h[5] + f) | 0; h[6] = (h[6] + g) | 0; h[7] = (h[7] + hh) | 0; } var o = new Array(32); for (i = 0; i < 8; i++) { var v = h[i]; o[i * 4] = (v >>> 24) & 255; o[i * 4 + 1] = (v >>> 16) & 255; o[i * 4 + 2] = (v >>> 8) & 255; o[i * 4 + 3] = v & 255; } return o; }
      function _hmac(key, msg) { var kb = _u8(key); if (kb.length > 64) kb = _core(kb); while (kb.length < 64) kb.push(0); var mb = _u8(msg), i; var inn = new Array(64 + mb.length); for (i = 0; i < 64; i++) inn[i] = kb[i] ^ 0x36; for (i = 0; i < mb.length; i++) inn[64 + i] = mb[i]; var ih = _core(inn); var out = new Array(64 + 32); for (i = 0; i < 64; i++) out[i] = kb[i] ^ 0x5c; for (i = 0; i < 32; i++) out[64 + i] = ih[i]; return _h2(_core(out)); }
      function _enc(s) { s = String(s); var o = "", i, c; for (i = 0; i < s.length; i++) { c = s.charCodeAt(i); if (c < 0x80) { if ((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 45 || c === 46 || c === 95 || c === 126) { o += s.charAt(i); } else if (c === 32) { o += "%20"; } else { o += "%" + ("0" + c.toString(16)).slice(-2).toUpperCase(); } } else if (c < 0x800) { o += "%" + ("0" + (192 | (c >> 6)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } else { o += "%" + ("0" + (224 | (c >> 12)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | ((c >> 6) & 63)).toString(16)).slice(-2).toUpperCase() + "%" + ("0" + (128 | (c & 63)).toString(16)).slice(-2).toUpperCase(); } } return o; }
      function _trim(s) { s = String(s); var a = 0, b = s.length; while (a < b && (s.charCodeAt(a) === 32 || s.charCodeAt(a) === 9 || s.charCodeAt(a) === 10 || s.charCodeAt(a) === 13)) { a++; } while (b > a && (s.charCodeAt(b - 1) === 32 || s.charCodeAt(b - 1) === 9 || s.charCodeAt(b - 1) === 10 || s.charCodeAt(b - 1) === 13)) { b--; } return s.substring(a, b); }
      function _keys(o) { var k = [], i; for (i in o) { k.push(i); } return k.slice(0, 12).join(","); }
      function _sget(path) {
        var ts = String(Date.now()), nb = "", i;
        for (i = 0; i < 16; i++) nb += ("0" + Math.floor(Math.random() * 256).toString(16)).slice(-2);
        var sig = _hmac(_AK, "GET" + String.fromCharCode(10) + path + String.fromCharCode(10) + ts + String.fromCharCode(10) + nb);
        var hd = {
          "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
          "Referer": HOST + "/", "Accept": "application/json",
          "x-ai-movie-timestamp": ts, "x-ai-movie-nonce": nb, "x-ai-movie-signature": sig,
          "x-ai-movie-client-name": "movie-search-frontend", "x-ai-movie-client-version": "1.0.0",
          "x-ai-movie-build-version": "dongpiandi-v2026.10.10.2-download-source-entry-aa4983cf2052-web",
          "x-ai-movie-protocol-version": "2026-07-05.library-v2.playback-v1"
        };
        var _r = request(HOST + path, { method: "get", headers: hd, timeout: 15000 });
        var _t = "";
        if (typeof _r === "string") { _t = _r; }
        else if (_r && typeof _r.content === "string") { _t = _r.content; }
        else if (_r && typeof _r.body === "string") { _t = _r.body; }
        if (_t) {
          try { return JSON.parse(_t); } catch (eP) { var _tg = new RegExp("<[^>]+>", "g"); var _ws = new RegExp("\s+", "g"); return { __raw: String(_t).replace(_tg, " ").replace(_ws, " ").slice(0, 90) }; }
        }
        if (_r && typeof _r === "object") {
          if (_r.content && typeof _r.content === "object") { return _r.content; }
          if (_r.body && typeof _r.body === "object") { return _r.body; }
          return _r;
        }
        return { __raw: "(空响应)" };
      }
      var MUA = "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1";
      var tk = (typeof input === "string") ? input : "";
      var dp = tk.lastIndexOf("$");
      if (dp >= 0) tk = tk.substring(dp + 1);
      tk = String(tk || "").replace(/^\\s+|\\s+$/g, "");
      // 新格式 线路名|token；兼容旧格式纯 token
      var pn = "";
      var ipx = tk.indexOf("|");
      if (ipx >= 0) { pn = tk.substring(0, ipx); tk = tk.substring(ipx + 1); }
      var pn2 = pn; try { pn2 = decodeURIComponent(pn); } catch (eDp) {}
      if (tk) {
      var d = _sget("/v1/playback/resolve/" + _enc(tk));
      var lines = (d && d.line_options) || [];
      // 选线路：官方 resolve:// 票二次解析必失效（实测 400 invalid_public_playback_id），直接跳过；
      // 只收 direct https 直链。用户切了线路 → 按 provider_name 精确匹配；匹配不到（线路名被编码/该集无此线）→ 按权重回退最佳直链
      var best = null, bestW = -1, fb = null, fbW = -1, l2, i2;
      for (i2 = 0; i2 < lines.length; i2++) {
        l2 = lines[i2] || {};
        if (!l2.url) continue;
        if (!/^https?:/i.test(l2.url)) { continue; }
        var wgt2 = Number(l2.preference_weight) || 0;
        if (l2.selected === true) wgt2 += 100000;
        if (wgt2 > fbW) { fb = l2; fbW = wgt2; }
        if (pn && (String(l2.provider_name || "") === pn || String(l2.provider_name || "") === pn2 || String(l2.display_label || "") === pn) && wgt2 > bestW) { best = l2; bestW = wgt2; }
      }
      if (!best) best = fb;
      if (best && best.url) {
        var isDirect = /^https?:\\/\\//i.test(best.url);
        input = { parse: isDirect ? 0 : 1, url: best.url, jx: isDirect ? 0 : 1, header: { "User-Agent": MUA, "Referer": HOST + "/" } };
      } else {
        input = { parse: 0, url: "toast://解析失败:" + (d && d.error ? String(d.error.message || "").slice(0, 70) : (d && d.__raw ? d.__raw.slice(0, 70) : (d ? _keys(d) : "无响应"))), jx: 0 };
      }
      } else {
        input = { parse: 0, url: "toast://这一集没有取到播放令牌", jx: 0 };
      }
    } catch (e) {
      input = { parse: 0, url: "toast://取播放地址失败", jx: 0 };
    }
    if (typeof setResult === "function") { try { setResult(input); } catch (eS) {} }
  `
};
