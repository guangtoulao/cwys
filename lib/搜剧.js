var HOME_BLOCK = `js:
try {
    var items = [];
    var j = JSON.parse(rule.SJ_req('GET', '/v1/feed/home?scope=public&mode=preview&sections=6&cards=12'));
    var secs = j.sections || [];
    for (var s = 0; s < secs.length; s++) {
        items = items.concat(rule.SJ_cards_to_items(secs[s].cards || []));
    }
    if (!items.length) {
        var j2 = JSON.parse(rule.SJ_req('GET', '/v1/browse/catalog?kind=movie&page=1&limit=24'));
        items = rule.SJ_cards_to_items(j2.cards || []);
    }
    setResult(items.slice(0, 60));
} catch (e) {
    setResult([]);
}
`;

var CATE_BLOCK = `js:
try {
    var kind = (typeof MY_CATE !== 'undefined' && MY_CATE) ? String(MY_CATE) : 'movie';
    var page = (typeof MY_PAGE !== 'undefined' && MY_PAGE) ? parseInt(MY_PAGE) : 1;
    if (!page || page < 1) page = 1;
    var fl = (typeof MY_FL === 'object' && MY_FL) ? MY_FL : {};
    var qs = 'kind=' + encodeURIComponent(kind) + '&page=' + page + '&limit=24';
    var year = fl['年份'] || fl.year || '';
    var sort = fl['排序'] || fl.sort || '';
    if (year) qs += '&year=' + encodeURIComponent(year);
    if (sort) qs += '&sort=' + encodeURIComponent(sort);
    var j = JSON.parse(rule.SJ_req('GET', '/v1/browse/catalog?' + qs));
    setResult(rule.SJ_cards_to_items(j.cards || []));
} catch (e) {
    setResult([]);
}
`;

var SEARCH_BLOCK = `js:
try {
    var kw = (typeof KEY !== 'undefined' && KEY) ? String(KEY) : '';
    if (!kw && typeof MY_URL !== 'undefined') kw = String(MY_URL || '');
    var page = (typeof MY_PAGE !== 'undefined' && MY_PAGE) ? parseInt(MY_PAGE) : 1;
    if (!page || page < 1) page = 1;
    var qs = 'q=' + encodeURIComponent(kw) + '&page=' + page + '&limit=24';
    var j = JSON.parse(rule.SJ_req('GET', '/v1/browse/catalog?' + qs));
    setResult(rule.SJ_cards_to_items(j.cards || []));
} catch (e) {
    setResult([]);
}
`;

var DETAIL_BLOCK = `js:
try {
    var raw = String(MY_URL || input || '');
    var id = raw.split('?')[0].split('/').pop();
    if (!id) id = raw;
    var d = JSON.parse(rule.SJ_req('GET', '/v1/catalog/' + id));
    var eps = d.episodes || [];
    if (!eps.length) {
        var d2 = JSON.parse(rule.SJ_req('GET', '/v1/catalog/' + id + '/episodes'));
        eps = d2.episodes || [];
    }
    var names = [], lineUrls = [];
    var t0 = (eps[0] || {}).token || '';
    if (t0) {
        try {
            var pr = JSON.parse(rule.SJ_req('GET', '/v1/playback/resolve/' + t0 + '?view=compact'));
            var los = pr.line_options || [];
            var seen = {};
            for (var q = 0; q < los.length; q++) {
                var lo = los[q];
                if (lo && lo.url_kind === 'm3u8' && lo.resolved && lo.url) {
                    var nm0 = String(lo.label || lo.name || '线路' + (q + 1));
                    if (seen[nm0]) nm0 = nm0 + (q + 1);
                    seen[nm0] = 1;
                    names.push(nm0);
                    lineUrls.push([]);
                }
            }
        } catch (e2) {}
    }
    if (!names.length) { names = ['搜剧AI']; lineUrls = [[]]; }
    for (var i = 0; i < eps.length; i++) {
        var nm = eps[i].display_name || eps[i].title || ('第' + (eps[i].number || i + 1) + '集');
        var tk = eps[i].token || '';
        if (!tk) continue;
        for (var k = 0; k < names.length; k++) lineUrls[k].push(nm + '$' + tk + '@' + k);
    }
    if (!lineUrls[0].length) lineUrls[0].push('暂无资源$' + id);
    VOD = {
        vod_id: id,
        vod_name: d.title || d.normalized_title || '',
        vod_pic: d.poster_url || '',
        vod_remarks: d.remarks || '',
        type_name: (d.genres || []).join('/'),
        vod_year: d.year || '',
        vod_area: d.area || '',
        vod_lang: d.language || '',
        vod_actor: (d.actors || []).join('/'),
        vod_director: (d.directors || []).join('/'),
        vod_content: ((d.description || '') + ((d.genres || []).length ? ' ' + (d.genres || []).join('/') : '')).trim(),
        vod_play_from: names.join('$$$'),
        vod_play_url: lineUrls.map(function (a) { return a.join('#'); }).join('$$$')
    };
} catch (e) {
    VOD = { vod_name: '详情获取失败', vod_play_from: '搜剧AI', vod_play_url: '重试$' + String(MY_URL || input || '') };
}
`;

var PLAYER_BLOCK = `js:
try {
    var s = String(input || '');
    var idx = 0, token = s;
    var at = s.lastIndexOf('@');
    if (at > 0) {
        var n = parseInt(s.substring(at + 1), 10);
        if (!isNaN(n) && n >= 0) { idx = n; token = s.substring(0, at); }
    }
    var out = token;
    if (token && token.indexOf('http') !== 0) {
        var pr = JSON.parse(rule.SJ_req('GET', '/v1/playback/resolve/' + token + '?view=compact'));
        var los = pr.line_options || [];
        var cand = [];
        for (var i = 0; i < los.length; i++) {
            var lo = los[i];
            if (lo && lo.url_kind === 'm3u8' && lo.resolved && lo.url) cand.push(lo.url);
        }
        if (cand.length) out = cand[idx] || cand[0];
    }
    input = out;
} catch (e) {
    var s2 = String(input || '');
    var at2 = s2.lastIndexOf('@');
    input = at2 > 0 ? s2.substring(0, at2) : s2;
}
`;

var rule = {
    title: '搜剧AI',
    编码: 'utf-8',
    host: 'https://souju6.ai',
    homeUrl: '/',
    url: '/v1/browse/catalog',
    detailUrl: '/v1/catalog/fyid',
    searchUrl: '/v1/browse/catalog',
    searchable: 1,
    filterable: 1,
    quickSearch: 1,
    class_name: '电影&连续剧&动漫&综艺&纪录片&短剧',
    class_url: 'movie&series&anime&variety&documentary&short_drama',
    class_parse: '',

    filter: (function () {
        var years = ['全部', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '更早'];
        var sorts = [['默认', ''], ['最新', 'latest'], ['最热', 'hot']];
        var yv = [], sv = [];
        for (var i = 0; i < years.length; i++) {
            var v = years[i] === '全部' ? '' : years[i];
            if (years[i] === '更早') v = '2017';
            yv.push({ n: years[i], v: v });
        }
        for (var k = 0; k < sorts.length; k++) sv.push({ n: sorts[k][0], v: sorts[k][1] });
        var kinds = ['movie', 'series', 'anime', 'variety', 'documentary', 'short_drama'];
        var f = {};
        for (var j = 0; j < kinds.length; j++) f[kinds[j]] = [{ key: '年份', name: '年份', value: yv }, { key: '排序', name: '排序', value: sv }];
        return f;
    })(),

    play_parse: true,
    play_json: [{ re: '*', json: { jx: 0, parse: 0 } }],
    timeout: 30000,
    limit: 24,

    SJ_sha256: function (ascii) {
        function rightRotate(value, amount) { return (value >>> amount) | (value << (32 - amount)); }
        var mathPow = Math.pow, maxWord = mathPow(2, 32), lengthProperty = 'length', i, j, result = '', words = [];
        var asciiBitLength = ascii[lengthProperty] * 8;
        var hash = [], k = [], primeCounter = 0, isComposite = {};
        for (var candidate = 2; primeCounter < 64; candidate++) {
            if (!isComposite[candidate]) {
                for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
                hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
                k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
            }
        }
        ascii += '\x80';
        while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
        for (i = 0; i < ascii[lengthProperty]; i++) {
            j = ascii.charCodeAt(i);
            if (j >> 8) return '';
            words[i >> 2] |= j << ((3 - i) % 4) * 8;
        }
        words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
        words[words[lengthProperty]] = (asciiBitLength);
        for (j = 0; j < words[lengthProperty];) {
            var w = words.slice(j, j += 16), oldHash = hash; hash = hash.slice(0, 8);
            for (i = 0; i < 64; i++) {
                var w15 = w[i - 15], w2 = w[i - 2], a = hash[0], e = hash[4];
                var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
                    + ((e & hash[5]) ^ ((~e) & hash[6])) + k[i]
                    + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))) | 0);
                var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
                    + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
                hash = [(temp1 + temp2) | 0, a, hash[1], hash[2], (hash[3] + temp1) | 0, e, hash[5], hash[6]];
            }
            for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i]) | 0;
        }
        for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) {
            var b = (hash[i] >> (j * 8)) & 255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
        return result;
    },

    SJ_sha256Bytes: function (ascii) {
        var hex = this.SJ_sha256(ascii), out = [];
        for (var i = 0; i < hex.length; i += 2) out.push(parseInt(hex.substr(i, 2), 16));
        return out;
    },

    SJ_hmac: function (key, data) {
        var blockSize = 64, kb = [];
        for (var i = 0; i < key.length; i++) kb.push(key.charCodeAt(i) & 0xff);
        if (kb.length > blockSize) kb = this.SJ_sha256Bytes(key);
        while (kb.length < blockSize) kb.push(0);
        var oKeyPad = '', iKeyPad = '';
        for (i = 0; i < blockSize; i++) {
            oKeyPad += String.fromCharCode((kb[i] ^ 0x5c) & 0xff);
            iKeyPad += String.fromCharCode((kb[i] ^ 0x36) & 0xff);
        }
        var inner = this.SJ_sha256Bytes(iKeyPad + data);
        var innerStr = '';
        for (i = 0; i < inner.length; i++) innerStr += String.fromCharCode(inner[i] & 0xff);
        return this.SJ_sha256(oKeyPad + innerStr);
    },

    SJ_nonce: function () {
        var s = '';
        for (var i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
        return s;
    },

    SJ_req: function (method, pathQuery) {
        method = String(method || 'GET').toUpperCase();
        var KEY = 'f39d73aa7a6426203cdee1ef17b31d3b7ea8c23f4c59c62a3a8aa0f39ee5e79d';
        var ORIGIN = 'https://souju6.ai';
        for (var attempt = 0; attempt < 2; attempt++) {
            try {
                var ts = Date.now();
                var nonce = this.SJ_nonce();
                var msg = method + '\n' + pathQuery + '\n' + ts + '\n' + nonce;
                var sig = this.SJ_hmac(KEY, msg);
                var headers = {
                    'x-ai-movie-client-name': 'movie-search-frontend',
                    'x-ai-movie-client-version': '1.0.0',
                    'x-ai-movie-protocol-version': '2026-07-05.library-v2.playback-v1',
                    'x-ai-movie-timestamp': String(ts),
                    'x-ai-movie-nonce': nonce,
                    'x-ai-movie-signature': sig,
                    'x-ai-movie-site-host': ORIGIN,
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 Chrome/124.0 Mobile Safari/537.36'
                };
                var url = ORIGIN + pathQuery;
                var body = this.SJ_call(url, method, headers);
                if (body) return body;
            } catch (e) { /* 重试 */ }
        }
        return '';
    },

    SJ_ok: function (body) {
        if (!body || typeof body !== 'string' || body.length < 10) return false;
        try {
            var j = JSON.parse(body);
            if (j && typeof j === 'object') {
                if (j.detail || j.error || j.msg || j.message) return false;
            }
            return true;
        } catch (e) { return false; }
    },

    SJ_call: function (url, method, headers) {
        var hstr = '';
        try { hstr = JSON.stringify(headers); } catch (e) { hstr = ''; }
        var forms = [
            { method: method, headers: headers },
            { headers: headers },
            { method: method, header: headers },
            headers
        ];
        if (hstr) forms.push(hstr);
        for (var k = 0; k < forms.length; k++) {
            try {
                if (typeof request === 'function') {
                    var r = request(url, forms[k]);
                    if (r && typeof r === 'object' && r.content) r = r.content;
                    if (this.SJ_ok(r)) return r;
                }
            } catch (e) { /* 试下一种 */ }
            try {
                if (typeof req === 'function') {
                    var rr = req(url, forms[k]);
                    var c = (rr && rr.content) ? rr.content : (typeof rr === 'string' ? rr : '');
                    if (this.SJ_ok(c)) return c;
                }
            } catch (e) { /* 试下一种 */ }
        }
        return '';
    },

    SJ_item: function (c) {
        if (!c || !c.title || !c.id) return null;
        var genres = (c.genres || []).join('/');
        var info = [];
        if (c.year) info.push(c.year);
        if (c.area) info.push(c.area);
        var remarks = c.remarks || (info.join(' ') + (genres ? ' ' + genres : ''));
        return {
            vod_id: c.id,
            url: c.id,
            vod_name: c.title,
            title: c.title,
            vod_pic: c.poster_url || '',
            pic_url: c.poster_url || '',
            vod_remarks: remarks,
            desc: remarks,
            vod_year: c.year || '',
            vod_area: c.area || '',
            vod_lang: c.language || '',
            vod_actor: (c.actors || []).slice(0, 6).join('/'),
            vod_director: (c.directors || []).slice(0, 3).join('/')
        };
    },

    SJ_cards_to_items: function (cards) {
        var items = [];
        var cs = cards || [];
        for (var i = 0; i < cs.length; i++) {
            var it = this.SJ_item(cs[i]);
            if (it) items.push(it);
        }
        return items;
    },

    预处理: '',

    // ===== 首页 =====
    推荐: HOME_BLOCK,
    home: HOME_BLOCK,

    // ===== 分类 / 一级 =====
    一级: CATE_BLOCK,
    category: CATE_BLOCK,

    // ===== 搜索 =====
    搜索: SEARCH_BLOCK,
    search: SEARCH_BLOCK,

    // ===== 详情 =====
    二级: DETAIL_BLOCK,
    detail: DETAIL_BLOCK,

    // ===== 播放解析兜底 =====
    lazy: PLAYER_BLOCK,
    player: PLAYER_BLOCK
};
