// 瓜子影视 - App 加密协议版（参考桌面抓包与可用 py 源实现）
// 协议：AES-128-CBC(fixed key) 加密业务参数 -> RSA 加密 key/iv -> MD5 签名 -> form POST
// 响应：RSA 解出本次响应 key/iv -> AES 解 response_key(hex)
var GZ_HOSTS = [
    'https://apinew.uozvr.com',
    'https://api.w32z7vtd.com',
    'https://api.6a7nnf7.com',
    'https://api.umygrx3.com',
    'https://api.rmedphk.com'
];
var GZ_AES_KEY = 'OITxa5OqAYjhswxx';
var GZ_AES_IV = 'rCMNwZASNBKZ8mXV';
var GZ_DEV_OLD = 'aLFBMWpxBrIDAD1Si/KVvm41';
var GZ_N_ENC = BigInt('0xd4339fbfcbcb0fb1691dd7f4504bae17db9f44530c455c51391e503ae4caabc673ecd09aa8491a23483cb9421c2f44e95a0fa4f04501ca318d8e019e929d079426c0a14c414847da94930aecdff31550cc63b2fe894ba39efe3b9c9722464e05660e1079e4469f5ec0f44906158ff4175ecc51e9ec11e44da42f9db20000f8c9');
var GZ_N_DEC = BigInt('0x7ba84aad62e2d734268d34f5a336c4e1074578918dc6e6f195de86ac51b18a6c5f32c301e81a49869713a2e02acb0005a6988a7ad50105b5f062c614d7036beb8f175663e608c0b2e2b63cbdd9621676cc523d3ce8353a67efe85c1756537fdbd46d0337713dc142d14b070a653df08ff702235bec0a6de08f64794aa900f58d');
var GZ_E = BigInt(65537);
var GZ_D = BigInt('0x247fb80b1574ff305570b881087bd200d9b497b1deb726d387f8f6a74635b135eba3800bc006824d47aa7418d688b4a8f653700c7172abccd7f74fa03716bb73912a71657d1669555ebf1585f073719a359d778d757153eed436c9a87fa1db5d731faf44c48625dd6dff99396c377dc00bd87480db94c020fb088a299e4a71d');
var GZ_SIGN_SALT = '*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br';

// ================= 内嵌工具：utf8 / base64 / md5 / aes / rsa =================
function gzU8Enc(s) {
    var out = [], i, c, n = String(s).length;
    for (i = 0; i < n; i++) {
        c = s.charCodeAt(i);
        if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
            var c2 = s.charCodeAt(i + 1);
            if (c2 >= 0xDC00 && c2 <= 0xDFFF) {
                c = 0x10000 + ((c - 0xD800) << 10) + (c2 - 0xDC00);
                i++;
            }
        }
        if (c < 0x80) out.push(c);
        else if (c < 0x800) out.push(0xC0 | (c >> 6), 0x80 | (c & 63));
        else if (c < 0x10000) out.push(0xE0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
        else out.push(0xF0 | (c >> 18), 0x80 | ((c >> 12) & 63), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
    }
    return out;
}
function gzU8Dec(bytes) {
    var out = '', i = 0, b, n = bytes.length;
    while (i < n) {
        b = bytes[i];
        if (b < 0x80) { out += String.fromCharCode(b); i += 1; }
        else if (b < 0xE0) { out += String.fromCharCode(((b & 31) << 6) | (bytes[i + 1] & 63)); i += 2; }
        else if (b < 0xF0) { out += String.fromCharCode(((b & 15) << 12) | ((bytes[i + 1] & 63) << 6) | (bytes[i + 2] & 63)); i += 3; }
        else {
            var cp = ((b & 7) << 18) | ((bytes[i + 1] & 63) << 12) | ((bytes[i + 2] & 63) << 6) | (bytes[i + 3] & 63);
            cp -= 0x10000;
            out += String.fromCharCode(0xD800 + (cp >> 10), 0xDC00 + (cp & 1023));
            i += 4;
        }
    }
    return out;
}
var GZ_B64C = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function gzB64Enc(bytes) {
    var out = '', i, n = bytes.length;
    for (i = 0; i < n; i += 3) {
        var b0 = bytes[i], b1 = i + 1 < n ? bytes[i + 1] : 0, b2 = i + 2 < n ? bytes[i + 2] : 0;
        out += GZ_B64C[b0 >> 2] + GZ_B64C[((b0 & 3) << 4) | (b1 >> 4)];
        out += i + 1 < n ? GZ_B64C[((b1 & 15) << 2) | (b2 >> 6)] : '=';
        out += i + 2 < n ? GZ_B64C[b2 & 63] : '=';
    }
    return out;
}
function gzB64Dec(s) {
    s = String(s).replace(/[^A-Za-z0-9+/]/g, '');
    var out = [], i, n = s.length;
    for (i = 0; i < n; i += 4) {
        var c0 = GZ_B64C.indexOf(s[i]), c1 = GZ_B64C.indexOf(s[i + 1]), c2 = GZ_B64C.indexOf(s[i + 2]), c3 = GZ_B64C.indexOf(s[i + 3]);
        out.push((c0 << 2) | (c1 >> 4));
        if (c2 >= 0) out.push(((c1 & 15) << 4) | (c2 >> 2));
        if (c3 >= 0) out.push(((c2 & 3) << 6) | c3);
    }
    return out;
}
// ---- MD5（输入 ASCII/UTF8）----
function gzMd5(s) {
    function add(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF), m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
    function rol(n, c) { return (n << c) | (n >>> (32 - c)); }
    function cmn(q, a, b, x, s, t) { return add(rol(add(add(a, q), add(x, t)), s), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
    var bytes = gzU8Enc(s), n = bytes.length, i;
    var x = [];
    for (i = 0; i < n; i++) x[i >> 2] = (x[i >> 2] || 0) | (bytes[i] << ((i % 4) << 3));
    x[n >> 2] = (x[n >> 2] || 0) | (0x80 << ((n % 4) << 3));
    var len = (((n + 8) >> 6) + 1) << 4;
    for (i = 0; i < len; i++) x[i] = x[i] || 0;
    x[len - 2] = (n << 3) & 0xFFFFFFFF;
    x[len - 1] = (n >> 29) & 0xFF;
    var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (i = 0; i < len; i += 16) {
        var oa = a, ob = b, oc = c, od = d;
        a = ff(a, b, c, d, x[i], 7, -680876936); d = ff(d, a, b, c, x[i + 1], 12, -389564586); c = ff(c, d, a, b, x[i + 2], 17, 606105819); b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897); d = ff(d, a, b, c, x[i + 5], 12, 1200080426); c = ff(c, d, a, b, x[i + 6], 17, -1473231341); b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416); d = ff(d, a, b, c, x[i + 9], 12, -1958414417); c = ff(c, d, a, b, x[i + 10], 17, -42063); b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682); d = ff(d, a, b, c, x[i + 13], 12, -40341101); c = ff(c, d, a, b, x[i + 14], 17, -1502002290); b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = gg(a, b, c, d, x[i + 1], 5, -165796510); d = gg(d, a, b, c, x[i + 6], 9, -1069501632); c = gg(c, d, a, b, x[i + 11], 14, 643717713); b = gg(b, c, d, a, x[i], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691); d = gg(d, a, b, c, x[i + 10], 9, 38016083); c = gg(c, d, a, b, x[i + 15], 14, -660478335); b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438); d = gg(d, a, b, c, x[i + 14], 9, -1019803690); c = gg(c, d, a, b, x[i + 3], 14, -187363961); b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467); d = gg(d, a, b, c, x[i + 2], 9, -51403784); c = gg(c, d, a, b, x[i + 7], 14, 1735328473); b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = hh(a, b, c, d, x[i + 5], 4, -378558); d = hh(d, a, b, c, x[i + 8], 11, -2022574463); c = hh(c, d, a, b, x[i + 11], 16, 1839030562); b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060); d = hh(d, a, b, c, x[i + 4], 11, 1272893353); c = hh(c, d, a, b, x[i + 7], 16, -155497632); b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174); d = hh(d, a, b, c, x[i], 11, -358537222); c = hh(c, d, a, b, x[i + 3], 16, -722521979); b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487); d = hh(d, a, b, c, x[i + 12], 11, -421815835); c = hh(c, d, a, b, x[i + 15], 16, 530742520); b = hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = ii(a, b, c, d, x[i], 6, -198630844); d = ii(d, a, b, c, x[i + 7], 10, 1126891415); c = ii(c, d, a, b, x[i + 14], 15, -1416354905); b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571); d = ii(d, a, b, c, x[i + 3], 10, -1894986606); c = ii(c, d, a, b, x[i + 10], 15, -1051523); b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359); d = ii(d, a, b, c, x[i + 15], 10, -30611744); c = ii(c, d, a, b, x[i + 6], 15, -1560198380); b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070); d = ii(d, a, b, c, x[i + 11], 10, -1120210379); c = ii(c, d, a, b, x[i + 2], 15, 718787259); b = ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = add(a, oa); b = add(b, ob); c = add(c, oc); d = add(d, od);
    }
    function hx(v) { var o = '', j; for (j = 0; j < 4; j++) { var byte = (v >> (j << 3)) & 0xFF; o += (byte < 16 ? '0' : '') + byte.toString(16); } return o; }
    return (hx(a) + hx(b) + hx(c) + hx(d));
}
// ---- AES-128-CBC ----
var gzAES = (function () {
    var SB = new Array(256), ISB = new Array(256), i, p = 1, q = 1, x;
    SB[0] = 0x63;
    do {
        p = (p ^ ((p << 1) & 0xFF) ^ (p & 0x80 ? 0x1B : 0)) & 0xFF;
        q = (q ^ ((q << 1) & 0xFF)) & 0xFF;
        q = (q ^ ((q << 2) & 0xFF)) & 0xFF;
        q = (q ^ ((q << 4) & 0xFF)) & 0xFF;
        if (q & 0x80) q ^= 0x09;
        x = (q ^ ((q << 1 | q >>> 7) & 0xFF) ^ ((q << 2 | q >>> 6) & 0xFF) ^ ((q << 3 | q >>> 5) & 0xFF) ^ ((q << 4 | q >>> 4) & 0xFF) ^ 0x63) & 0xFF;
        SB[p] = x; ISB[x] = p;
    } while (p !== 1);
    function mul(a, b) {
        var r = 0;
        while (b) { if (b & 1) r ^= a; a = ((a << 1) ^ (a & 0x80 ? 0x11B : 0)) & 0xFF; b >>= 1; }
        return r & 0xFF;
    }
    function expand(key) {
        var w = new Array(176), k, j, t, rc = 1;
        for (k = 0; k < 16; k++) w[k] = key[k];
        for (k = 4; k < 44; k++) {
            t = [w[4 * (k - 1)], w[4 * (k - 1) + 1], w[4 * (k - 1) + 2], w[4 * (k - 1) + 3]];
            if (k % 4 === 0) { t = [SB[t[1]], SB[t[2]], SB[t[3]], SB[t[0]]]; t[0] ^= rc; rc = mul(rc, 2); }
            for (j = 0; j < 4; j++) w[4 * k + j] = w[4 * (k - 4) + j] ^ t[j];
        }
        return w;
    }
    function ark(s, w, r) { for (var j = 0; j < 16; j++) s[j] ^= w[16 * r + j]; }
    function sr(s) { var t, r, j; for (r = 1; r < 4; r++) { t = [s[r], s[r + 4], s[r + 8], s[r + 12]]; for (j = 0; j < 4; j++) s[r + 4 * j] = t[(j + r) % 4]; } }
    function isr(s) { var t, r, j; for (r = 1; r < 4; r++) { t = [s[r], s[r + 4], s[r + 8], s[r + 12]]; for (j = 0; j < 4; j++) s[r + 4 * j] = t[(j + 4 - r) % 4]; } }
    function mc(s) {
        for (var c = 0; c < 4; c++) {
            var a0 = s[4 * c], a1 = s[4 * c + 1], a2 = s[4 * c + 2], a3 = s[4 * c + 3];
            s[4 * c] = mul(a0, 2) ^ mul(a1, 3) ^ a2 ^ a3;
            s[4 * c + 1] = a0 ^ mul(a1, 2) ^ mul(a2, 3) ^ a3;
            s[4 * c + 2] = a0 ^ a1 ^ mul(a2, 2) ^ mul(a3, 3);
            s[4 * c + 3] = mul(a0, 3) ^ a1 ^ a2 ^ mul(a3, 2);
        }
    }
    function imc(s) {
        for (var c = 0; c < 4; c++) {
            var a0 = s[4 * c], a1 = s[4 * c + 1], a2 = s[4 * c + 2], a3 = s[4 * c + 3];
            s[4 * c] = mul(a0, 14) ^ mul(a1, 11) ^ mul(a2, 13) ^ mul(a3, 9);
            s[4 * c + 1] = mul(a0, 9) ^ mul(a1, 14) ^ mul(a2, 11) ^ mul(a3, 13);
            s[4 * c + 2] = mul(a0, 13) ^ mul(a1, 9) ^ mul(a2, 14) ^ mul(a3, 11);
            s[4 * c + 3] = mul(a0, 11) ^ mul(a1, 13) ^ mul(a2, 9) ^ mul(a3, 14);
        }
    }
    function encBlock(s, w) {
        ark(s, w, 0);
        for (var r = 1; r < 10; r++) {
            for (var j = 0; j < 16; j++) s[j] = SB[s[j]];
            sr(s); mc(s); ark(s, w, r);
        }
        for (var j2 = 0; j2 < 16; j2++) s[j2] = SB[s[j2]];
        sr(s); ark(s, w, 10);
    }
    function decBlock(s, w) {
        ark(s, w, 10);
        for (var r = 9; r > 0; r--) {
            isr(s);
            for (var j = 0; j < 16; j++) s[j] = ISB[s[j]];
            ark(s, w, r); imc(s);
        }
        isr(s);
        for (var j2 = 0; j2 < 16; j2++) s[j2] = ISB[s[j2]];
        ark(s, w, 0);
    }
    function strToKeyBytes(ks) { var out = [], j; for (j = 0; j < 16; j++) out.push(ks.charCodeAt(j) & 0xFF); return out; }
    function cbcEnc(pt, keyS, ivS) {
        var w = expand(strToKeyBytes(keyS)), iv = strToKeyBytes(ivS);
        var pb = 16 - (pt.length % 16), data = pt.concat(), j;
        for (j = 0; j < pb; j++) data.push(pb);
        var out = [], prev = iv.slice();
        for (var off = 0; off < data.length; off += 16) {
            var blk = [];
            for (j = 0; j < 16; j++) blk.push(data[off + j] ^ prev[j]);
            encBlock(blk, w);
            out = out.concat(blk);
            prev = blk;
        }
        return out;
    }
    function cbcDec(ct, keyS, ivS) {
        var w = expand(strToKeyBytes(keyS)), iv = strToKeyBytes(ivS);
        var out = [], prev = iv.slice(), j;
        for (var off = 0; off < ct.length; off += 16) {
            var blk = ct.slice(off, off + 16), saved = blk.slice();
            decBlock(blk, w);
            for (j = 0; j < 16; j++) out.push(blk[j] ^ prev[j]);
            prev = saved;
        }
        var padN = out[out.length - 1];
        if (padN >= 1 && padN <= 16) out = out.slice(0, out.length - padN);
        return out;
    }
    return { enc: cbcEnc, dec: cbcDec, test: function () { return SB[0x53]; } };
})();
// ---- RSA PKCS1 v1.5（BigInt）----
function gzBytes2bi(b) {
    var r = BigInt(0), i;
    for (i = 0; i < b.length; i++) r = r * BigInt(256) + BigInt(b[i]);
    return r;
}
function gzBi2bytes(v, len) {
    var out = new Array(len), i;
    for (i = len - 1; i >= 0; i--) { out[i] = Number(v % BigInt(256)); v = v / BigInt(256); }
    return out;
}
function gzModpow(b, e, m) {
    var r = BigInt(1);
    b = b % m;
    while (e > BigInt(0)) {
        if ((e % BigInt(2)) === BigInt(1)) r = (r * b) % m;
        b = (b * b) % m;
        e = e / BigInt(2);
    }
    return r;
}
function gzRsaEnc(plain) {
    var m = gzU8Enc(plain), k = 128, i;
    if (m.length > k - 11) return '';
    var blk = [0, 2];
    for (i = 0; i < k - 3 - m.length; i++) {
        var nz = 0;
        while (nz === 0) nz = 1 + Math.floor(Math.random() * 255);
        blk.push(nz);
    }
    blk.push(0);
    blk = blk.concat(m);
    var c = gzModpow(gzBytes2bi(blk), GZ_E, GZ_N_ENC);
    return gzB64Enc(gzBi2bytes(c, k));
}
function gzRsaDec(b64) {
    var bytes = gzB64Dec(b64);
    var m = gzModpow(gzBytes2bi(bytes), GZ_D, GZ_N_DEC);
    var out = gzBi2bytes(m, 128), i = 2;
    while (i < out.length && out[i] !== 0) i++;
    return gzU8Dec(out.slice(i + 1));
}
// ================= 协议层 =================
var GZ_DEV_ID = '864150060' + String(100000 + Math.floor(Math.random() * 899999));
var GZ_DEV_KEY = (function () { var s = '', j; for (j = 0; j < 40; j++) s += '0123456789ABCDEF'[Math.floor(Math.random() * 16)]; return s; })();
var GZ_TOKEN = '';
var GZ_TOKEN_ID = '';
var GZ_HOST_IDX = 0;
var GZ_AUTHING = false;

function gzHeaders() {
    return {
        'User-Agent': 'Lavf/57.83.100',
        'code': 'GZ0369',
        'deviceId': GZ_DEV_ID,
        'lang': 'zh_cn',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Version': '2604028',
        'PackageName': 'com.ae06aebdbb.y286327f5a.ofe849883320260517',
        'Ver': '3.0.3.2',
        'api-ver': '3.0.3.2',
        'Referer': GZ_HOSTS[GZ_HOST_IDX]
    };
}
function gzRawApi(path, params) {
    var p = {}, kk;
    for (kk in params) { if (Object.prototype.hasOwnProperty.call(params, kk)) p[kk] = params[kk]; }
    if ('token' in p) p.token = GZ_TOKEN;
    if ('token_id' in p) p.token_id = GZ_TOKEN_ID;
    var keysStr = gzRsaEnc('{"iv": "' + GZ_AES_IV + '", "key": "' + GZ_AES_KEY + '"}');
    var rk = gzB64Enc ? '' : '';
    var pt = gzU8Enc(JSON.stringify(p));
    var enc = gzAES.enc(pt, GZ_AES_KEY, GZ_AES_IV);
    var hex = '';
    for (var h = 0; h < enc.length; h++) hex += (enc[h] < 16 ? '0' : '') + enc[h].toString(16);
    rk = hex.toUpperCase();
    var ts = String(Math.floor(Date.now() / 1000));
    var sign = gzMd5('token_id=,token=' + GZ_TOKEN + ',phone_type=1,request_key=' + rk + ',app_id=1,time=' + ts + ',keys=' + keysStr + GZ_SIGN_SALT).toUpperCase();
    var body = 'token=' + encodeURIComponent(GZ_TOKEN) + '&token_id=&phone_type=1&time=' + ts + '&phone_model=xiaomi-25031&keys=' + encodeURIComponent(keysStr) + '&request_key=' + encodeURIComponent(rk) + '&signature=' + sign + '&app_id=1&ad_version=1';
    var resp = request(GZ_HOSTS[GZ_HOST_IDX] + path, { method: 'POST', headers: gzHeaders(), body: body, timeout: 15000 });
    var o = JSON.parse(resp);
    if (parseInt(o.code) !== 200) throw new Error('code ' + o.code + ' ' + String(o.msg || '').slice(0, 60));
    return o;
}
function gzHex2bytes(hx) {
    var out = [], i;
    for (i = 0; i < hx.length; i += 2) out.push(parseInt(hx.substr(i, 2), 16));
    return out;
}
function gzParseResp(o) {
    var d = o.data || {};
    var ki = JSON.parse(gzRsaDec(d.keys));
    var bytes = gzAES.dec(gzHex2bytes(String(d.response_key)), ki.key, ki.iv);
    return JSON.parse(gzU8Dec(bytes));
}
function gzEnsureToken() {
    if (GZ_TOKEN || GZ_AUTHING) return;
    GZ_AUTHING = true;
    try {
        var r1 = gzParseResp(gzRawApi('/App/Authentication/Device/signUp', { new_key: GZ_DEV_KEY, old_key: GZ_DEV_OLD, phone_type: 1, code: '' }));
        GZ_TOKEN = r1.token || '';
        GZ_TOKEN_ID = r1.app_user_id || '';
        if (!GZ_TOKEN) throw new Error('signUp 无 token');
        try {
            var r2 = gzParseResp(gzRawApi('/App/Authentication/Authenticator/refresh', {}));
            if (r2.token) GZ_TOKEN = r2.token;
        } catch (e2) { }
    } finally {
        GZ_AUTHING = false;
    }
}
function gzApi(path, params) {
    gzEnsureToken();
    var tries = GZ_HOSTS.length, attempt, err = null;
    for (attempt = 0; attempt < tries; attempt++) {
        try {
            var o = gzRawApi(path, params);
            return gzParseResp(o);
        } catch (e) {
            err = e;
            var msg = String(e && e.message || e);
            if (msg.indexOf('code ') === 0 && msg.indexOf('200') < 0) {
                // 业务错误：先换 token 再换域名
                GZ_TOKEN = '';
                try { gzEnsureToken(); } catch (e3) { }
            }
            GZ_HOST_IDX = (GZ_HOST_IDX + 1) % GZ_HOSTS.length;
        }
    }
    throw err || new Error('瓜子接口全部域名失败');
}
// ================= 导出 =================
(function (g) {
    try {
        g.gzApi = gzApi; g.gzParseResp = gzParseResp; g.gzRawApi = gzRawApi;
        g.gzRsaDec = gzRsaDec; g.gzRsaEnc = gzRsaEnc; g.gzAES = gzAES;
        g.gzMd5 = gzMd5; g.gzB64Enc = gzB64Enc; g.gzB64Dec = gzB64Dec;
        g.gzU8Enc = gzU8Enc; g.gzU8Dec = gzU8Dec; g.gzHex2bytes = gzHex2bytes;
        g.gzEnsureToken = gzEnsureToken;
    } catch (e) { }
})(typeof globalThis === 'object' ? globalThis : this);

// ================= 规则配置 =================
var GZ_AREAS = ['大陆', '香港', '台湾', '美国', '韩国', '日本', '英国', '法国', '泰国', '印度', '其他'];
var GZ_YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005'];
var GZ_SORTS = [['最新', 'd_id'], ['最热', 'd_hits'], ['推荐', 'd_score']];
var GZ_SUBS = {
    '1': [['动作', '6'], ['喜剧', '7'], ['爱情', '8'], ['科幻', '9'], ['恐怖', '10'], ['剧情', '11'], ['战争', '24']],
    '2': [['古装', '13'], ['言情', '14'], ['武侠', '15'], ['都市', '16'], ['历史', '17'], ['悬疑', '25']],
    '3': [['真人秀', '31'], ['选秀', '32'], ['情感', '33'], ['访谈', '34'], ['音乐', '35']],
    '4': [['国产', '23'], ['日本', '21'], ['欧美', '26'], ['其他', '27']],
    '64': [['男频', '65'], ['女频', '66']],
    '74': []
};
function gzFilterGroups(tid) {
    var out = [];
    var subs = GZ_SUBS[tid] || [];
    if (subs.length) {
        var sv = [{ n: '全部', v: '0' }];
        for (var i = 0; i < subs.length; i++) sv.push({ n: subs[i][0], v: subs[i][1] });
        out.push({ key: 'sub', name: '类型', value: sv });
    }
    var av = [{ n: '全部', v: '0' }];
    for (var a = 0; a < GZ_AREAS.length; a++) av.push({ n: GZ_AREAS[a], v: GZ_AREAS[a] });
    out.push({ key: 'area', name: '地区', value: av });
    var yv = [{ n: '全部', v: '0' }];
    for (var y = 0; y < GZ_YEARS.length; y++) yv.push({ n: GZ_YEARS[y], v: GZ_YEARS[y] });
    yv.push({ n: '更早', v: '2004' });
    out.push({ key: 'year', name: '年份', value: yv });
    var ov = [{ n: '全部', v: '0' }];
    for (var s = 0; s < GZ_SORTS.length; s++) ov.push({ n: GZ_SORTS[s][0], v: GZ_SORTS[s][1] });
    out.push({ key: 'sort', name: '排序', value: ov });
    return out;
}
var GZ_FILTER = {};
var GZ_CLASSES = ['1', '2', '3', '4', '64', '74'];
for (var gz_ci = 0; gz_ci < GZ_CLASSES.length; gz_ci++) { GZ_FILTER[GZ_CLASSES[gz_ci]] = gzFilterGroups(GZ_CLASSES[gz_ci]); }
(function (g) { try { g.GZ_FILTER = GZ_FILTER; } catch (e) { } })(typeof globalThis === 'object' ? globalThis : this);

var rule = {
    title: '瓜子影视',
    host: 'https://apinew.uozvr.com',
    homeUrl: '',
    url: '/App/IndexList/indexList',
    searchUrl: '/App/Index/findMoreVod',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    timeout: 15000,
    play_parse: 1,
    play_json: [{ re: '*', json: { jx: 0, parse: 0 } }],
    class_name: '电影&剧集&综艺&动漫&短剧&漫剧',
    class_url: '1&2&3&4&64&74',
    detailUrl: 'fyid',
    filter: GZ_FILTER,
    推荐: `js:
VODS = [];
try {
    var rj = gzApi('/App/IndexList/index', { pid: '1' });
    var mods = (rj && rj.list) ? rj.list : [];
    var out = [];
    for (var m = 1; m < mods.length && out.length < 30; m++) {
        var ml = mods[m].list || [];
        for (var i = 0; i < ml.length && out.length < 30; i++) {
            var it = ml[i];
            var rn = String(it.vod_name || '').trim();
            out.push({
                vod_id: String(it.vod_id || ''),
                vod_name: rn,
                vod_pic: String(it.vod_pic || '') + '@User-Agent=Dalvik/2.1.0',
                vod_remarks: String(it.vod_year || '').trim()
            });
        }
    }
    VODS = out;
} catch (e) { VODS = []; }
`,
    一级: `js:
VODS = [];
try {
    var tid = (typeof MY_CATE !== 'undefined') ? MY_CATE : '1';
    var pg = (typeof MY_PAGE !== 'undefined' && MY_PAGE) ? MY_PAGE : 1;
    var fl = (typeof MY_FL !== 'undefined' && MY_FL) ? MY_FL : {};
    var body = { tid: tid, page: String(pg), pageSize: '30', area: '0', year: '0', sort: 'd_id', sub: '0' };
    if (fl.area && fl.area != '0') { body.area = fl.area; }
    if (fl.year && fl.year != '0') { body.year = fl.year; }
    if (fl.sort && fl.sort != '0') { body.sort = fl.sort; }
    if (fl.sub && fl.sub != '0') { body.sub = fl.sub; }
    var r = gzApi('/App/IndexList/indexList', body);
    var lst = (r && r.list) ? r.list : [];
    VODS = [];
    for (var i = 0; i < lst.length; i++) {
        var it = lst[i];
        var cont = String(it.vod_continu || '0');
        var total = String(it.d_total || '0');
        var rm;
        if (total != '0' && cont != '0') { rm = (cont == total) ? ('全' + total + '集') : ('更新至' + cont + '集'); }
        else { rm = String(it.vod_year || '').trim(); }
        VODS.push({
            vod_id: String(it.vod_id || ''),
            vod_name: String(it.vod_name || '').trim(),
            vod_pic: String(it.vod_pic || '') + '@User-Agent=Dalvik/2.1.0',
            vod_remarks: rm
        });
    }
} catch (e) { VODS = []; }
`,
    二级: `js:
VOD = {};
try {
    var id = String(MY_URL).replace(/[^0-9]/g, '');
    var info = gzApi('/App/IndexPlay/playInfo', { token_id: '', vod_id: id, mobile_time: String(Math.floor(Date.now() / 1000)), token: '' });
    var v = (info && info.vodInfo) ? info.vodInfo : {};
    var vs = gzApi('/App/Resource/Vurl/show', { vurl_cloud_id: '2', vod_d_id: id });
    var vl = (vs && vs.list) ? vs.list : [];
    VOD.vod_id = id;
    VOD.vod_name = String(v.vod_name || '').trim();
    VOD.vod_pic = String(v.vod_pic || '') + '@User-Agent=Dalvik/2.1.0';
    VOD.vod_year = String(v.vod_year || '').trim();
    VOD.vod_area = String(v.vod_area || '').trim();
    VOD.vod_actor = v.vod_actor || '';
    VOD.vod_director = v.vod_director || '';
    VOD.vod_content = String(v.vod_use_content || '').split('\u3000').join(String.fromCharCode(10)).trim();
    // 线路：py 同构 —— 每个条目一集，格式 名字$param||清晰度@清晰度，统一走「君子兰」线路数组
    var eps2 = [];
    for (var i = 0; i < vl.length; i++) {
        var play = vl[i].play || {};
        var epName = (vl.length === 1 && VOD.vod_name) ? VOD.vod_name : String(i + 1);
        var resKeys = [], lastParam = '';
        for (var q in play) {
            if (!Object.prototype.hasOwnProperty.call(play, q)) continue;
            var ep = play[q] || {};
            if (!ep.param) continue;
            resKeys.push(String(q));
            lastParam = String(ep.param);
        }
        if (resKeys.length && lastParam) {
            eps2.push(epName + '$http://gz.play/?' + lastParam + '||' + resKeys.join('@'));
        }
    }
    var froms = [], urlsArr = [];
    if (eps2.length > 0) {
        froms.push("君子兰" + (froms.length < 20 ? String.fromCharCode(9312 + froms.length) : String(froms.length + 1)));
        urlsArr.push(eps2.join("#"));
    }
    VOD.vod_play_from = froms.length ? froms.join('$$$') : '君子兰①';
    VOD.vod_play_url = urlsArr.length ? urlsArr.join('$$$') : '';
} catch (e) {
    VOD.vod_name = '加载失败';
    VOD.vod_play_from = '君子兰①';
    VOD.vod_play_url = '';
}
`,
    搜索: `js:
VODS = [];
try {
    var kw = (typeof KEY !== 'undefined') ? KEY : '';
    if (kw) {
        var r = gzApi('/App/Index/findMoreVod', { keywords: kw, order_val: '1' });
        var lst = (r && r.list) ? r.list : [];
        VODS = [];
        for (var i = 0; i < lst.length; i++) {
            var it = lst[i];
            var cont = String(it.vod_continu || '0');
            var total = String(it.d_total || '0');
            var rm;
            if (total != '0' && cont != '0') { rm = (cont == total) ? ('全' + total + '集') : ('更新至' + cont + '集'); }
            else { rm = String(it.vod_year || '').trim(); }
            VODS.push({
                vod_id: String(it.vod_id || ''),
                vod_name: String(it.vod_name || '').trim(),
                vod_pic: String(it.vod_pic || '') + '@User-Agent=Dalvik/2.1.0',
                vod_remarks: rm
            });
        }
    }
} catch (e) { VODS = []; }
`,
    lazy: `js:
try {
    var raw = String(input).replace(/^http:\\/\\/gz\\.play\\/\\?/, '');
    var parts = raw.split('||');
    var param = parts[0], resStr = parts.length > 1 ? parts[1] : '';
    var resList = resStr ? resStr.split('@') : [];
    resList.sort(function (a, b) { var na = parseInt(a) || 0, nb = parseInt(b) || 0; return nb - na; });
    var pm = {};
    var segs = param.split('&');
    for (var i = 0; i < segs.length; i++) {
        var eq = segs[i].indexOf('=');
        if (eq > 0) { pm[segs[i].slice(0, eq)] = segs[i].slice(eq + 1); }
    }
    if (resList.length) { pm.resolution = resList[0]; }
    var r = gzApi('/App/Resource/VurlDetail/showOne', pm);
    var u = r.url || '';
    if (u) {
        input = { parse: 0, url: u, jx: 0, header: { 'User-Agent': 'Lavf/57.83.100', 'Referer': 'http://WJiZxLXA2.com/' } };
    }
} catch (e) { }
`,
    double: false,
};
