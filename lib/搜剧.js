/**
 * 搜剧AI（souju6.ai）— 影视仓 / TVBox / FongMi JS 规则源（drpy2 格式）
 *
 * 全链路逆向自 souju6.ai（React SPA + 签名 REST API）：
 *   - 所有 /v1/ 接口需要【请求签名】：HMAC-SHA256，消息 =
 *     METHOD\n{path?query}\n{timestamp_ms}\n{nonce}，输出小写 hex。
 *   - 本文件【自带纯 JS 实现】SHA256 + HMAC，作为 rule 对象的方法，
 *     块内通过 rule.xxx 调用，不依赖任何运行时加密全局与顶层全局，
 *     真实影视仓 QuickJS 与 PC 引擎均可运行。
 *   - 播放采用「第三方直链 m3u8 线路」：播放解析接口返回 line_options，
 *     其中 url_kind==="m3u8" 且 resolved 的即为可直接播放的 m3u8 直链
 *     （官方 resolve_ticket 线路需客户端二次解析，本源自动跳过）。
 *
 * 已实测接口（HTTP 200）：
 *   首页推荐  GET /v1/feed/home?scope=public&mode=preview&sections=N&cards=M
 *   分类/搜索 GET /v1/browse/catalog?kind={kind}&q={kw}&page=&limit=&year=&sort=
 *             kind ∈ movie|series|anime|variety|documentary|short_drama
 *   详情      GET /v1/catalog/{id}                 -> episodes[].token
 *   播放解析  GET /v1/playback/resolve/{token}?view=compact -> line_options[].url(m3u8)
 */

var rule = {
    title: '搜剧AI',
    编码: 'utf-8',
    host: 'https://souju6.ai',
    homeUrl: '/',
    url: '/v1/browse/catalog',
    detailUrl: '',
    searchUrl: '/v1/browse/catalog',
    searchable: 1,
    filterable: 1,
    quickSearch: 1,
    class_name: '电影&连续剧&动漫&综艺&纪录片&短剧',
    class_url: 'movie&series&anime&variety&documentary&short_drama',
    class_parse: '',

    // ===== 筛选配置（年份 / 排序，内联 IIFE，不依赖任何外部名）=====
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
    timeout: 20000,
    limit: 24,

    // ============================================================
    // 加密与请求（全部为 rule 方法，块内用 rule.xxx 调用）
    // ============================================================

    // 纯 JS SHA256（完全自包含，无外部缓存；已与 Node crypto 校验一致）
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

    // 纯 JS HMAC-SHA256
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

    // 随机 nonce（16 字节 = 32 位 hex）
    SJ_nonce: function () {
        var s = '';
        for (var i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
        return s;
    },

    // 签名 + 发起请求，返回响应体字符串（自动重试一次）
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
                var body = '';
                if (typeof request === 'function') body = request(url, { headers: headers });
                else if (typeof req === 'function') body = req(url, { headers: headers });
                if (body && typeof body !== 'string') body = String(body);
                if (body && body.length > 2) return body;
            } catch (e) { /* 重试 */ }
        }
        return '';
    },

    // 卡片 -> 列表条目（drpy2 与 PC 引擎字段双写）
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

    // ===== 首页（PC 引擎「推荐」+ 真实影视仓/drpy2「home」共用）=====
    推荐: `js:
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
`,
    home: `js:
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
`,

    // ===== 一级（分类 + 筛选 + 分页）=====
    一级: `js:
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
`,

    // ===== 搜索 =====
    搜索: `js:
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
`,

    // ===== 二级（详情）：【直接】把每集解析成 m3u8 直链写进播放地址，
    //   不依赖点击时的 lazy，避免你的 App 在播放解析环节卡住 =====
    二级: `js:
try {
    var id = String(MY_URL || '');
    id = id.split('?')[0].split('/').pop();
    var d = JSON.parse(rule.SJ_req('GET', '/v1/catalog/' + id));
    var eps = d.episodes || [];
    if (!eps.length) {
        var d2 = JSON.parse(rule.SJ_req('GET', '/v1/catalog/' + id + '/episodes'));
        eps = d2.episodes || [];
    }
    var parts = [];
    for (var i = 0; i < eps.length; i++) {
        var nm = eps[i].display_name || eps[i].title || ('第' + (i + 1) + '集');
        var token = eps[i].token || '';
        var m3u8 = '';
        if (token) {
            try {
                var pr = JSON.parse(rule.SJ_req('GET', '/v1/playback/resolve/' + token + '?view=compact'));
                var los = pr.line_options || [];
                for (var li = 0; li < los.length; li++) {
                    var lo = los[li];
                    if (lo && lo.url_kind === 'm3u8' && lo.resolved && lo.url) { m3u8 = lo.url; break; }
                }
            } catch (ex) { /* 单集失败不中断整体 */ }
        }
        if (!m3u8) m3u8 = token; // 无直链时兜底为 token，交给 lazy
        parts.push(nm + '$' + m3u8);
    }
    if (!parts.length) parts.push('暂无资源$' + id);
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
        vod_play_from: '搜剧AI',
        vod_play_url: parts.join('#')
    };
} catch (e) {
    VOD = { vod_name: '详情获取失败', vod_play_from: '搜剧AI', vod_play_url: '重试$' + String(MY_URL || '') };
}
`,

    // ===== lazy（把剧集 token 解析为直链 m3u8）=====
    lazy: `js:
try {
    var token = String(input || '');
    var out = token;
    if (token && token.indexOf('http') !== 0) {
        var pr = JSON.parse(rule.SJ_req('GET', '/v1/playback/resolve/' + token + '?view=compact'));
        var los = pr.line_options || [];
        var chosen = null;
        for (var i = 0; i < los.length; i++) {
            var lo = los[i];
            if (lo && lo.url_kind === 'm3u8' && lo.resolved && lo.url) { chosen = lo; break; }
        }
        if (chosen && chosen.url) out = chosen.url;
    }
    input = out;
} catch (e) {
    input = String(input || '');
}
`
};
