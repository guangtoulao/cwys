// 看剧屋(kanju4.com) —— API直连源（2026-10-02 依据用户抓包+站点自家前端脚本拆解制作）
// 链条：/v1/browse/catalog(首页浏览/搜索) → /v1/catalog/{id}/detail(详情) → /v1/playback/resolve/{集票}(各线路直链)
// 签名：HMAC-SHA256(站点自家密钥, "方法\n路径?参数\n毫秒时间戳\n随机32hex") → x-ai-movie-signature 头
(function () {
  var G = (typeof globalThis !== 'undefined') ? globalThis : undefined;
  if (!G || G.KJ) return;
  var KJ = {};
  G.KJ = KJ;
  KJ.HOST = 'https://kanju4.com';
  KJ.SECRET = '557d0e4ae929f438da6bd84412374e6086b8af09b3fed54bf22601d5bf8c54a0';
  KJ.UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

  var _K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];
  function _rr(x, n) { return (x >>> n) | (x << (32 - n)); }
  function _utf8(s) {
    var out = [];
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c < 0x80) out.push(c);
      else if (c < 0x800) out.push(0xc0 | (c >> 6), 0x80 | (c & 63));
      else if (c >= 0xd800 && c < 0xdc00 && i + 1 < s.length) {
        var c2 = s.charCodeAt(++i);
        var cp = 0x10000 + ((c & 0x3ff) << 10) + (c2 & 0x3ff);
        out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 63), 0x80 | ((cp >> 6) & 63), 0x80 | (cp & 63));
      } else out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
  }
  function _sha256hex(bytes) {
    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var l = bytes.length;
    var buf = bytes.concat([0x80]);
    var pad = (56 - ((l + 1) % 64) + 64) % 64;
    for (var p = 0; p < pad; p++) buf.push(0);
    var lb = l * 8;
    buf.push(0, 0, 0, 0, (lb >>> 24) & 255, (lb >>> 16) & 255, (lb >>> 8) & 255, lb & 255);
    for (var off = 0; off < buf.length; off += 64) {
      var w = new Array(64);
      for (var t = 0; t < 16; t++) w[t] = ((buf[off + 4 * t] << 24) | (buf[off + 4 * t + 1] << 16) | (buf[off + 4 * t + 2] << 8) | buf[off + 4 * t + 3]) | 0;
      for (var t2 = 16; t2 < 64; t2++) {
        var s0 = _rr(w[t2 - 15], 7) ^ _rr(w[t2 - 15], 18) ^ (w[t2 - 15] >>> 3);
        var s1 = _rr(w[t2 - 2], 17) ^ _rr(w[t2 - 2], 19) ^ (w[t2 - 2] >>> 10);
        w[t2] = (w[t2 - 16] + s0 + w[t2 - 7] + s1) | 0;
      }
      var a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (var t3 = 0; t3 < 64; t3++) {
        var S1 = _rr(e, 6) ^ _rr(e, 11) ^ _rr(e, 25);
        var ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + _K[t3] + w[t3]) | 0;
        var S0 = _rr(a, 2) ^ _rr(a, 13) ^ _rr(a, 22);
        var mj = (a & b) ^ (a & c) ^ (b & c);
        var t2v = (S0 + mj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2v) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    var hx = '';
    for (var i = 0; i < 8; i++) hx += ('00000000' + ((H[i] >>> 0).toString(16))).slice(-8);
    return hx;
  }
  function _hex2b(h) {
    var out = [];
    for (var i = 0; i < h.length; i += 2) out.push(parseInt(h.substr(i, 2), 16));
    return out;
  }
  KJ.hmac = function (key, msg) {
    var k = _utf8(key);
    if (k.length > 64) k = _hex2b(_sha256hex(k));
    while (k.length < 64) k.push(0);
    var o = [], ii = [];
    for (var i = 0; i < 64; i++) { o.push(k[i] ^ 0x5c); ii.push(k[i] ^ 0x36); }
    var inner = _hex2b(_sha256hex(ii.concat(_utf8(msg))));
    return _sha256hex(o.concat(inner));
  };
  KJ.nonce = function () {
    var s = '';
    for (var i = 0; i < 4; i++) s += ('00000000' + ((Math.random() * 4294967296) >>> 0).toString(16)).slice(-8);
    return s;
  };
  // 带签名请求：回包是 JSON 文本
  KJ.api = function (u, opt) {
    opt = opt || {};
    var ts = String(Date.now());
    var nonce = KJ.nonce();
    var pq = String(u).replace(/^https?:\/\/[^\/]+/i, '');
    var sig = KJ.hmac(KJ.SECRET, (opt.method || 'GET').toUpperCase() + '\n' + pq + '\n' + ts + '\n' + nonce);
    opt.headers = {
      'accept': 'application/json',
      'User-Agent': KJ.UA,
      'x-ai-movie-client-name': 'dianyingtiantang-frontend',
      'x-ai-movie-client-version': '1.0.0',
      'x-ai-movie-build-version': 'dianyingtiantang-v2026.09.30.1-dbb1f9857565-web',
      'x-ai-movie-protocol-version': '2026-07-05.library-v2.playback-v1',
      'x-ai-movie-timestamp': ts,
      'x-ai-movie-nonce': nonce,
      'x-ai-movie-signature': sig
    };
    if (typeof request === 'function') return request(u, opt);
    if (typeof req === 'function') return req(u, opt);
    return '';
  };
  // 带重试的取卡（站点偶发抽风/限流，重敲两次）
  KJ.cards = function (u) {
    var out = [];
    for (var a = 0; a < 3 && !out.length; a++) {
      if (a) { var w = Date.now(); while (Date.now() - w < 800) {} }
      out = (function () {
        var r2 = [];
        try {
          var j = JSON.parse(String(KJ.api(u)));
          var arr = j.cards || [];
          for (var i = 0; i < arr.length; i++) {
            var c = arr[i] || {};
            var du = String(c.detail_url || '');
            if (!du || !c.title) continue;
            var rm = String(c.remarks || (c.availability && c.availability.label) || '');
            r2.push({
              vod_id: encodeURIComponent(du),
              vod_name: String(c.title),
              vod_pic: String(c.poster_url || ''),
              vod_remarks: (c.year ? String(c.year) : '') + (rm ? ' ' + rm : '')
            });
          }
        } catch (e) {}
        return r2;
      })();
    }
    return out;
  };
})();

var rule = {
  title: '看剧屋',
  host: 'https://kanju4.com',
  homeUrl: 'https://kanju4.com',
  url: '/v1/browse/catalog?page=fypage&limit=24',
  searchUrl: '/v1/browse/catalog?page=fypage&limit=24&query_mode=fast_v3&search_fields=all&q=**&intent=catalog_search',
  detailUrl: 'https://kanju4.com/d~fyid~fyid',
  searchable: 1,
  quickSearch: 1,
  filterable: 0,
  timeout: 15000,
  play_parse: true,
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36' },
  class_name: '全部',
  class_url: 'all',

  // 首页浏览（feed）：无需分类，整站一张单子，按页翻
  一级: $js.toString(() => {
    var out = [];
    try {
      var L = globalThis.KJ;
      var pg = (typeof MY_PAGE !== 'undefined' && MY_PAGE) ? Number(MY_PAGE) || 1 : 1;
      out = L.cards(L.HOST + '/v1/browse/catalog?page=' + pg + '&limit=24');
    } catch (e) {}
    VODS = out;
  }),

  // 搜索：/v1/browse/catalog?q=词（现场铸签名）
  搜索: $js.toString(() => {
    var out = [];
    try {
      var L = globalThis.KJ;
      var kw = '';
      try { if (typeof KEY !== 'undefined' && KEY) kw = String(KEY); } catch (eK) {}
      if (!kw && typeof input !== 'undefined' && input) {
        var im = String(input).match(/[?&]q=([^&]*)/);
        if (im) { try { kw = decodeURIComponent(im[1]); } catch (eD) { kw = im[1]; } }
      }
      kw = String(kw || '').replace(/^\s+|\s+$/g, '');
      if (kw) {
        var pg = (typeof MY_PAGE !== 'undefined' && MY_PAGE) ? Number(MY_PAGE) || 1 : 1;
        out = L.cards(L.HOST + '/v1/browse/catalog?page=' + pg + '&limit=24&query_mode=fast_v3&search_fields=all&q=' + encodeURIComponent(kw) + '&intent=catalog_search');
      }
    } catch (e) {}
    VODS = out;
  }),

  // 二级：详情接口 → 片名/海报/简介/集票（token）
  二级: $js.toString(() => {
    VOD = VOD || {};
    try {
      var L = globalThis.KJ;
      var enc = String((typeof MY_URL !== 'undefined' && MY_URL) ? MY_URL : (typeof input !== 'undefined' ? input : '')).split('~');
      enc = enc.length >= 3 ? enc[1] : (enc[enc.length - 1] || '');
      var du = L.HOST + decodeURIComponent(enc); // 注意：不加 /detail 后缀——那是摘要版没有集数，裸 catalog 地址才是全量
      var j = JSON.parse(String(L.api(du)));
      VOD.vod_name = String(j.title || '');
      VOD.vod_pic = String(j.poster_url || '');
      VOD.vod_year = String(j.year || '');
      VOD.vod_area = String(j.area || '');
      VOD.vod_actor = (j.actors || []).join(',');
      VOD.vod_director = (j.directors || []).join(',');
      VOD.vod_remarks = String(j.remarks || (j.episode_progress_text || ''));
      VOD.type_name = (j.genres || []).join(',');
      VOD.vod_content = String(j.description || '').replace(/\s+/g, ' ').trim();
      var eps = [];
      var arr = j.episodes || [];
      for (var i = 0; i < arr.length; i++) {
        var ep = arr[i] || {};
        if (!ep.token) continue;
        var nm = String(ep.display_name || ep.title || ('第' + (i + 1) + '集'));
        eps.push(nm + '$' + ep.token);
      }
      if (eps.length) {
        VOD.vod_play_from = '看剧屋';
        VOD.vod_play_url = eps.join('#');
      }
    } catch (e) { VOD.vod_name = VOD.vod_name || '详情取失败'; }
  }),

  // lazy：拿集票去 resolve → 各线路直链里挑最优先的（resolved 直连 m3u8/mp4）
  lazy: $js.toString(() => {
    var done = false;
    var fin = function (obj) { done = true; input = obj; if (typeof setResult === 'function') setResult(obj); };
    try {
      var L = globalThis.KJ;
      var u = (typeof input === 'string') ? input : '';
      var d = u.lastIndexOf('$');
      if (d >= 0) u = u.substring(d + 1);
      if (u.indexOf('%') >= 0) { try { u = decodeURIComponent(u); } catch (eD0) {} }
      var j = JSON.parse(String(L.api(L.HOST + '/v1/playback/resolve/' + u + '?view=compact')));
      var lines = j.line_options || [];
      var sel = null, top = null;
      for (var i = 0; i < lines.length; i++) {
        var ln = lines[i] || {};
        if (!ln.url || !ln.resolved) continue;
        if (!sel && ln.selected) sel = ln;
        if (!top || (ln.preference_weight || 0) > (top.preference_weight || 0)) top = ln;
      }
      var best = sel || top;
      if (best && best.url) {
        if (/\.m3u8(\?|$)/i.test(best.url) || /\.mp4(\?|$)/i.test(best.url) || best.url_kind === 'm3u8' || best.url_kind === 'mp4') fin({ parse: 0, url: best.url, jx: 0 });
        else fin({ parse: 1, url: best.url, jx: 1 });
      } else {
        fin({ parse: 0, url: 'toast://这集没有可播的直链线路' });
      }
    } catch (e) {
      if (!done) fin({ parse: 0, url: 'toast://播放解析失败: ' + String(e.message || e).slice(0, 40) });
    }
  })
};
