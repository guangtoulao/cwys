var CFG = {"name":"追影","host":"https://zhuiying1.cc","cateUrl":"https://zhuiying1.cc/vodtype/{cateId}-{catePg}.html","cats":"电影$dianying#电视剧$dianshiju#动漫$dongman#综艺$zongyi#短剧$duanju","search":"https://zhuiying1.cc/vod/search/wd/**.html","rules":{"数组":"<a href=\"/video/&&</a>","标题":"alt=\"&&\"","图片":"src=\"&&\"","链接":"data-url=\"&&\"","播放数组":"class=\"ep-square-list\"&&</div>","播放列表":"<a&&</a>","播放标题":"href=*>&&<","播放链接":"href=\"&&\"","线路数组":"class=\"source-tab\"&&</div>","线路标题":"class=\"tab-name\">&&<","简介":"<meta name=\"description\" content=\"&&\"","搜索数组":"class=\"search-list-card&&</div>","搜索标题":"title=\"&&\"","搜索图片":"src=\"&&\"","搜索链接":"href=\"&&\""}};

// 分类名/值拆开（构造期执行；钩子里看不见顶层，钩子内自己再拆）
var __CN = '', __CU = '';
(function () {
    var n = [], u = [], a = String(CFG.cats || '').split('#');
    for (var i = 0; i < a.length; i++) {
        var kv = a[i].split('$');
        if (kv.length === 2 && kv[0] && kv[1] !== undefined) { n.push(kv[0]); u.push(kv[1]); }
    }
    __CN = n.join('&');
    __CU = u.join('&');
})();

var rule = {
    title: CFG.name,
    host: CFG.host,
    // homeUrl 不带尾斜杠——对齐真机验证过的成品源写法
    homeUrl: CFG.host,
    url: String(CFG.cateUrl || '').replace('{cateId}', 'fyclass').replace('{catePg}', 'fypage'),
    searchUrl: String(CFG.search || '').replace('{wd}', '**'),
    // 不写 detailUrl：真机成品源都没有这项。drpy2 无 detailUrl 时用一级 vod_id（未编码相对路径）拼 MY_URL；
    // 一旦写死 /d~fyid~fyid 之类，拼出来的详情页 URL 是四不像 → 二级全废（2026-10-12 真机完全没数据的疑犯之一）
    searchable: 1,
    quickSearch: 1,
    filterable: 0,
    timeout: 15000,
    play_parse: true,
    // sniffer 必须有：WebView 嗅探总开关，缺了 lazy 返回 parse:1+jx:1 也不嗅探 → 播放死
    sniffer: 1,
    // UA 用桌面 Chrome——对齐真机跑出过数据的成品源；移动 UA 在部分站被区别对待
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
    class_name: __CN,
    class_url: __CU,
    // 注意：不写 play 字段——drpy2 无此标准字段，播放处理全走 lazy；成品源同样没有

    推荐: 'js:' + (function () {
        var C = {"name":"追影","host":"https://zhuiying1.cc","cateUrl":"https://zhuiying1.cc/vodtype/{cateId}-{catePg}.html","cats":"电影$dianying#电视剧$dianshiju#动漫$dongman#综艺$zongyi#短剧$duanju","search":"https://zhuiying1.cc/vod/search/wd/**.html","rules":{"数组":"<a href=\"/video/&&</a>","标题":"alt=\"&&\"","图片":"src=\"&&\"","链接":"data-url=\"&&\"","播放数组":"class=\"ep-square-list\"&&</div>","播放列表":"<a&&</a>","播放标题":"href=*>&&<","播放链接":"href=\"&&\"","线路数组":"class=\"source-tab\"&&</div>","线路标题":"class=\"tab-name\">&&<","简介":"<meta name=\"description\" content=\"&&\"","搜索数组":"class=\"search-list-card&&</div>","搜索标题":"title=\"&&\"","搜索图片":"src=\"&&\"","搜索链接":"href=\"&&\""}};
        var HOSTV = C.host;
        var R = C.rules || {};
        var out = [], seen = {};
        try {
            function _norm(x) { return (typeof x === 'string') ? x : String((x && x.content !== undefined && x.content !== null) ? x.content : ((x && x.body) || '')); }
            function _txt(t) { return String(t || '').replace(/<[^>]*>/g, '').replace(/&(?:amp;)+/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&[a-z#0-9]{2,};?/gi, '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); }
            function _clr(u) { return String(u || '').replace(/&amp;/g, '&').replace(/["'\r\n\t ]/g, ''); }
            function _abs(u) {
                u = _clr(u);
                if (!u) return '';
                if (u.indexOf('http') === 0) return u;
                if (u.indexOf('//') === 0) return 'https:' + u;
                if (u.charAt(0) !== '/') u = '/' + u;
                return HOSTV + u;
            }
            function _cutAll(html, rl, outH) {
                var p = String(rl || '').split('&&'), out2 = [], i = 0;
                if (!p[0]) return out2;
                while (out2.length < 400) {
                    var a = html.indexOf(p[0], i);
                    if (a < 0) break;
                    var b = p[1] ? html.indexOf(p[1], a + p[0].length) : -1;
                    if (b < 0) b = html.length;
                    out2.push(html.substring(a + p[0].length, b));
                    // 链接前缀通道：起始标记里若含 href="，它被切掉了，这里从原文捞回来（追影搜索页实锤：块内无任何链接属性）
                    if (outH) { var hm = html.substring(a, Math.min(html.length, a + 400)).match(/href="([^"]*)/); outH.push(hm ? hm[1] : ''); }
                    i = b + (p[1] ? p[1].length : 0);
                }
                return out2;
            }
            // qpic 图片链在部分真机网络被掉包成广告二维码（2026-10-12 真机实锤：js 源分类页封面全变二维码，
            // 同网络 XBPQ 正常——因为 csp 引擎带头下图，js 源 vod_pic 是裸链由 UI 层直接加载）。
            // 点选规则取到 qpic 图时，若块内有非 qpic 备选（同站大图/第二张封面），优先换掉。
            function _pickPic(block) {
                var all = String(block).match(/src="([^"]+)"/g) || [], first = '';
                for (var i = 0; i < all.length; i++) {
                    var s = all[i].substring(5, all[i].length - 1);
                    if (!first) first = s;
                    if (s.indexOf('qpic.cn') >= 0) continue;
                    if (/tps-\d|icon|logo|btn|avatar|qrcode|loading\.gif/i.test(s)) continue;
                    if (/^https?:/.test(s)) return s;
                }
                return first;
            }
            function _fld(s, rl) {
                s = String(s === null || s === undefined ? '' : s);
                if (!rl || !s) return '';
                var p = String(rl).split('&&');
                if (!p[0]) return '';
                var a = s.indexOf(p[0]);
                if (a < 0) return '';
                a += p[0].length;
                var b = p[1] ? s.indexOf(p[1], a) : -1;
                if (b < 0) b = Math.min(s.length, a + 500);
                return s.substring(a, b);
            }
            function _req(u) {
                var UA = 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
                var h = '', att;
                for (att = 0; att < 2; att++) {
                    try { h = _norm(request(u, { method: 'get', headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8' }, timeout: 10000 })); } catch (e0) { h = ''; }
                    h = String(h || '');
                    // 错误页/空响应（CDN 边缘节点抽风等）等一秒重试，最多 3 次
                    if (h && h.indexOf('__xcdn') < 0 && h.indexOf('Bot detection') < 0
                        && h.indexOf('edge node') < 0 && h.indexOf('联系不上源站') < 0 && h.length > 600) break;
                    var w9 = Date.now();
                    while (Date.now() - w9 < 500) { }
                }
                try {
                    if (String(h).indexOf('__xcdn') >= 0 || String(h).indexOf('Bot detection') >= 0) {
                        var j = null, r1 = null, ick = '';
                        for (var t9 = 0; t9 < 3 && !j; t9++) {
                            try {
                                r1 = request(HOSTV + '/__xcdn/captcha/api/init?path=/&r=' + (Date.now() % 1000000) + Math.floor(Math.random() * 1000), { method: 'get', headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/' }, timeout: 15000 });
                            } catch (eI) { r1 = null; }
                            var m9 = _norm(r1).match(/\{[^{}]*"challenge"[^{}]*\}/);
                            if (m9) { try { j = JSON.parse(m9[0]); } catch (eP) { j = null; } }
                        }
                        if (j && j.challenge) {
                            try { var sc0 = (r1 && r1.headers) ? (r1.headers['set-cookie'] || r1.headers['Set-Cookie'] || '') : ''; var pp = String(sc0).match(/[^\s;]+=[^;]+/g); if (pp) ick = pp.join('; '); } catch (eC1) { }
                            var df = Math.min(parseInt(j.difficulty, 10) || 1, 6);
                            var tg = '';
                            for (var z = 0; z < df; z++) tg += '0';
                            function _rr(v, a) { return (v >>> a) | (v << (32 - a)); }
                            function _sha(ascii) {
                                var mp = Math.pow, mw = mp(2, 32), result = '';
                                var words = [], bl = ascii.length * 8;
                                var hash = _sha.h = _sha.h || [], k = _sha.k = _sha.k || [];
                                var pc = k.length, ic = {};
                                for (var cd = 2; pc < 64; cd++) {
                                    if (!ic[cd]) {
                                        for (var q1 = 0; q1 < 313; q1 += cd) ic[q1] = cd;
                                        hash[pc] = (mp(cd, .5) * mw) | 0;
                                        k[pc++] = (mp(cd, 1 / 3) * mw) | 0;
                                    }
                                }
                                ascii += '\x80';
                                while (ascii.length % 64 - 56) ascii += '\x00';
                                for (var q2 = 0; q2 < ascii.length; q2++) {
                                    var j8 = ascii.charCodeAt(q2);
                                    if (j8 >> 8) return '';
                                    words[q2 >> 2] |= j8 << ((3 - q2) % 4) * 8;
                                }
                                words[words.length] = (bl / mw) | 0;
                                words[words.length] = bl;
                                for (var j7 = 0; j7 < words.length;) {
                                    var w = words.slice(j7, j7 += 16), oh = hash;
                                    hash = hash.slice(0, 8);
                                    for (var q3 = 0; q3 < 64; q3++) {
                                        var w15 = w[q3 - 15], w2 = w[q3 - 2];
                                        var a8 = hash[0], e8 = hash[4];
                                        var t1 = hash[7] + (_rr(e8, 6) ^ _rr(e8, 11) ^ _rr(e8, 25)) + ((e8 & hash[5]) ^ ((~e8) & hash[6])) + k[q3]
                                            + (w[q3] = (q3 < 16) ? w[q3] : (w[q3 - 16] + (_rr(w15, 7) ^ _rr(w15, 18) ^ (w15 >>> 3)) + w[q3 - 7] + (_rr(w2, 17) ^ _rr(w2, 19) ^ (w2 >>> 10))) | 0);
                                        var t2 = (_rr(a8, 2) ^ _rr(a8, 13) ^ _rr(a8, 22)) + ((a8 & hash[1]) ^ (a8 & hash[2]) ^ (hash[1] & hash[2]));
                                        hash = [(t1 + t2) | 0].concat(hash);
                                        hash[4] = (hash[4] + t1) | 0;
                                    }
                                    for (var q4 = 0; q4 < 8; q4++) hash[q4] = (hash[q4] + oh[q4]) | 0;
                                }
                                for (var q5 = 0; q5 < 8; q5++) for (var j6 = 3; j6 + 1; j6--) { var b6 = (hash[q5] >> (j6 * 8)) & 255; result += ((b6 < 16) ? 0 : '') + b6.toString(16); }
                                return result;
                            }
                            var n = 0, hh = '', t0 = Date.now();
                            while (Date.now() - t0 < 30000) { n++; hh = _sha(j.challenge + n); if (hh.substring(0, df) === tg) break; }
                            if (hh.substring(0, df) === tg) {
                                var vh = { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/', 'X-CDN-VERIFY-NONCE': String(n), 'X-CDN-VERIFY-RESULT': hh };
                                if (ick) vh['Cookie'] = ick;
                                var ck = '';
                                try {
                                    var r2 = request(HOSTV + '/__xcdn/captcha/api/verify', { method: 'get', headers: vh, timeout: 15000 });
                                    var sc = (r2 && r2.headers) ? (r2.headers['set-cookie'] || r2.headers['Set-Cookie'] || '') : '';
                                    var m8 = String(sc).match(/__xcdn_captcha_verified=[^;]+/);
                                    if (m8) ck = m8[0];
                                } catch (eV) { }
                                var tries = ck ? [{ 'User-Agent': UA, 'Referer': HOSTV + '/', 'Cookie': ck }, { 'User-Agent': UA, 'Referer': HOSTV + '/' }] : [{ 'User-Agent': UA, 'Referer': HOSTV + '/' }];
                                for (var t8 = 0; t8 < tries.length; t8++) {
                                    var h3 = '';
                                    try { h3 = _norm(request(u, { method: 'get', headers: tries[t8], timeout: 20000 })); } catch (eG) { h3 = ''; }
                                    if (h3 && h3.indexOf('__xcdn') < 0) { h = h3; break; }
                                }
                            }
                        }
                    }
                } catch (eS) { }
                return String(h || '');
            }
            var u = HOSTV + '/';
            var html = _req(u);
            var hs0 = [];
            var its = _cutAll(html, R['数组'] || '', hs0);
            for (var i = 0; i < its.length && out.length < 200; i++) {
                var it = its[i];
                var lk = _clr(_fld(it, R['链接'] || '')) || _clr(hs0[i] || '') || _clr(_fld(it, 'href="&&"'));
                if (!lk || seen[lk]) continue;
                var nm = _txt(_fld(it, R['标题'] || 'title="&&"'));
                if (!nm) continue;
                seen[lk] = 1;
                var pic = _clr(_fld(it, R['图片'] || '')) || _clr(_fld(it, 'data-original="&&"')) || _clr(_fld(it, 'src="&&"'));
                if (pic.indexOf('qpic.cn') >= 0) { var altPic = _pickPic(it); if (altPic) pic = altPic; }
                var mk = R['副标题'] ? _txt(_fld(it, R['副标题'])) : _txt(_fld(it, 'pic-text">&&<'));
                out.push({ vod_id: lk, vod_name: nm, vod_pic: _abs(pic), vod_remarks: mk });
            }
        } catch (e) { }
            /*DBG-BEGIN*/
            try {
                var _qn = 0, _fp = '';
                for (var _qi = 0; _qi < out.length; _qi++) { if (String(out[_qi].vod_pic || '').indexOf('qpic.cn') >= 0) _qn++; if (!_fp && out[_qi].vod_pic) _fp = out[_qi].vod_pic; }
                out.unshift({ vod_id: 'dbg0', vod_name: 'DBG 推荐' + out.length + '卡 qpic占' + _qn + ' 首图' + (_fp ? _fp.split('/')[2] : '无'), vod_pic: '', vod_remarks: '' });
            } catch (e9) { }
            /*DBG-END*/
        VODS = out;
        if (typeof setResult === 'function') setResult(out);
    }).toString().replace(/^function\s*\(\)\s*\{/, '').replace(/\}\s*$/, ''),

    一级: 'js:' + (function () {
        var C = {"name":"追影","host":"https://zhuiying1.cc","cateUrl":"https://zhuiying1.cc/vodtype/{cateId}-{catePg}.html","cats":"电影$dianying#电视剧$dianshiju#动漫$dongman#综艺$zongyi#短剧$duanju","search":"https://zhuiying1.cc/vod/search/wd/**.html","rules":{"数组":"<a href=\"/video/&&</a>","标题":"alt=\"&&\"","图片":"src=\"&&\"","链接":"data-url=\"&&\"","播放数组":"class=\"ep-square-list\"&&</div>","播放列表":"<a&&</a>","播放标题":"href=*>&&<","播放链接":"href=\"&&\"","线路数组":"class=\"source-tab\"&&</div>","线路标题":"class=\"tab-name\">&&<","简介":"<meta name=\"description\" content=\"&&\"","搜索数组":"class=\"search-list-card&&</div>","搜索标题":"title=\"&&\"","搜索图片":"src=\"&&\"","搜索链接":"href=\"&&\""}};
        var HOSTV = C.host;
        var R = C.rules || {};
        var out = [], seen = {};
        try {
            function _norm(x) { return (typeof x === 'string') ? x : String((x && x.content !== undefined && x.content !== null) ? x.content : ((x && x.body) || '')); }
            function _txt(t) { return String(t || '').replace(/<[^>]*>/g, '').replace(/&(?:amp;)+/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&[a-z#0-9]{2,};?/gi, '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); }
            function _clr(u) { return String(u || '').replace(/&amp;/g, '&').replace(/["'\r\n\t ]/g, ''); }
            function _abs(u) {
                u = _clr(u);
                if (!u) return '';
                if (u.indexOf('http') === 0) return u;
                if (u.indexOf('//') === 0) return 'https:' + u;
                if (u.charAt(0) !== '/') u = '/' + u;
                return HOSTV + u;
            }
            function _cutAll(html, rl, outH) {
                var p = String(rl || '').split('&&'), out2 = [], i = 0;
                if (!p[0]) return out2;
                while (out2.length < 400) {
                    var a = html.indexOf(p[0], i);
                    if (a < 0) break;
                    var b = p[1] ? html.indexOf(p[1], a + p[0].length) : -1;
                    if (b < 0) b = html.length;
                    out2.push(html.substring(a + p[0].length, b));
                    // 链接前缀通道：起始标记里若含 href="，它被切掉了，这里从原文捞回来（追影搜索页实锤：块内无任何链接属性）
                    if (outH) { var hm = html.substring(a, Math.min(html.length, a + 400)).match(/href="([^"]*)/); outH.push(hm ? hm[1] : ''); }
                    i = b + (p[1] ? p[1].length : 0);
                }
                return out2;
            }
            // qpic 图片链在部分真机网络被掉包成广告二维码（2026-10-12 真机实锤：js 源分类页封面全变二维码，
            // 同网络 XBPQ 正常——因为 csp 引擎带头下图，js 源 vod_pic 是裸链由 UI 层直接加载）。
            // 点选规则取到 qpic 图时，若块内有非 qpic 备选（同站大图/第二张封面），优先换掉。
            function _pickPic(block) {
                var all = String(block).match(/src="([^"]+)"/g) || [], first = '';
                for (var i = 0; i < all.length; i++) {
                    var s = all[i].substring(5, all[i].length - 1);
                    if (!first) first = s;
                    if (s.indexOf('qpic.cn') >= 0) continue;
                    if (/tps-\d|icon|logo|btn|avatar|qrcode|loading\.gif/i.test(s)) continue;
                    if (/^https?:/.test(s)) return s;
                }
                return first;
            }
            function _fld(s, rl) {
                s = String(s === null || s === undefined ? '' : s);
                if (!rl || !s) return '';
                var p = String(rl).split('&&');
                if (!p[0]) return '';
                var a = s.indexOf(p[0]);
                if (a < 0) return '';
                a += p[0].length;
                var b = p[1] ? s.indexOf(p[1], a) : -1;
                if (b < 0) b = Math.min(s.length, a + 500);
                return s.substring(a, b);
            }
            function _req(u) {
                var UA = 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
                var h = '', att;
                for (att = 0; att < 2; att++) {
                    try { h = _norm(request(u, { method: 'get', headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8' }, timeout: 10000 })); } catch (e0) { h = ''; }
                    h = String(h || '');
                    // 错误页/空响应（CDN 边缘节点抽风等）等一秒重试，最多 3 次
                    if (h && h.indexOf('__xcdn') < 0 && h.indexOf('Bot detection') < 0
                        && h.indexOf('edge node') < 0 && h.indexOf('联系不上源站') < 0 && h.length > 600) break;
                    var w9 = Date.now();
                    while (Date.now() - w9 < 500) { }
                }
                try {
                    if (String(h).indexOf('__xcdn') >= 0 || String(h).indexOf('Bot detection') >= 0) {
                        var j = null, r1 = null, ick = '';
                        for (var t9 = 0; t9 < 3 && !j; t9++) {
                            try {
                                r1 = request(HOSTV + '/__xcdn/captcha/api/init?path=/&r=' + (Date.now() % 1000000) + Math.floor(Math.random() * 1000), { method: 'get', headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/' }, timeout: 15000 });
                            } catch (eI) { r1 = null; }
                            var m9 = _norm(r1).match(/\{[^{}]*"challenge"[^{}]*\}/);
                            if (m9) { try { j = JSON.parse(m9[0]); } catch (eP) { j = null; } }
                        }
                        if (j && j.challenge) {
                            try { var sc0 = (r1 && r1.headers) ? (r1.headers['set-cookie'] || r1.headers['Set-Cookie'] || '') : ''; var pp = String(sc0).match(/[^\s;]+=[^;]+/g); if (pp) ick = pp.join('; '); } catch (eC1) { }
                            var df = Math.min(parseInt(j.difficulty, 10) || 1, 6);
                            var tg = '';
                            for (var z = 0; z < df; z++) tg += '0';
                            function _rr(v, a) { return (v >>> a) | (v << (32 - a)); }
                            function _sha(ascii) {
                                var mp = Math.pow, mw = mp(2, 32), result = '';
                                var words = [], bl = ascii.length * 8;
                                var hash = _sha.h = _sha.h || [], k = _sha.k = _sha.k || [];
                                var pc = k.length, ic = {};
                                for (var cd = 2; pc < 64; cd++) {
                                    if (!ic[cd]) {
                                        for (var q1 = 0; q1 < 313; q1 += cd) ic[q1] = cd;
                                        hash[pc] = (mp(cd, .5) * mw) | 0;
                                        k[pc++] = (mp(cd, 1 / 3) * mw) | 0;
                                    }
                                }
                                ascii += '\x80';
                                while (ascii.length % 64 - 56) ascii += '\x00';
                                for (var q2 = 0; q2 < ascii.length; q2++) {
                                    var j8 = ascii.charCodeAt(q2);
                                    if (j8 >> 8) return '';
                                    words[q2 >> 2] |= j8 << ((3 - q2) % 4) * 8;
                                }
                                words[words.length] = (bl / mw) | 0;
                                words[words.length] = bl;
                                for (var j7 = 0; j7 < words.length;) {
                                    var w = words.slice(j7, j7 += 16), oh = hash;
                                    hash = hash.slice(0, 8);
                                    for (var q3 = 0; q3 < 64; q3++) {
                                        var w15 = w[q3 - 15], w2 = w[q3 - 2];
                                        var a8 = hash[0], e8 = hash[4];
                                        var t1 = hash[7] + (_rr(e8, 6) ^ _rr(e8, 11) ^ _rr(e8, 25)) + ((e8 & hash[5]) ^ ((~e8) & hash[6])) + k[q3]
                                            + (w[q3] = (q3 < 16) ? w[q3] : (w[q3 - 16] + (_rr(w15, 7) ^ _rr(w15, 18) ^ (w15 >>> 3)) + w[q3 - 7] + (_rr(w2, 17) ^ _rr(w2, 19) ^ (w2 >>> 10))) | 0);
                                        var t2 = (_rr(a8, 2) ^ _rr(a8, 13) ^ _rr(a8, 22)) + ((a8 & hash[1]) ^ (a8 & hash[2]) ^ (hash[1] & hash[2]));
                                        hash = [(t1 + t2) | 0].concat(hash);
                                        hash[4] = (hash[4] + t1) | 0;
                                    }
                                    for (var q4 = 0; q4 < 8; q4++) hash[q4] = (hash[q4] + oh[q4]) | 0;
                                }
                                for (var q5 = 0; q5 < 8; q5++) for (var j6 = 3; j6 + 1; j6--) { var b6 = (hash[q5] >> (j6 * 8)) & 255; result += ((b6 < 16) ? 0 : '') + b6.toString(16); }
                                return result;
                            }
                            var n = 0, hh = '', t0 = Date.now();
                            while (Date.now() - t0 < 30000) { n++; hh = _sha(j.challenge + n); if (hh.substring(0, df) === tg) break; }
                            if (hh.substring(0, df) === tg) {
                                var vh = { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/', 'X-CDN-VERIFY-NONCE': String(n), 'X-CDN-VERIFY-RESULT': hh };
                                if (ick) vh['Cookie'] = ick;
                                var ck = '';
                                try {
                                    var r2 = request(HOSTV + '/__xcdn/captcha/api/verify', { method: 'get', headers: vh, timeout: 15000 });
                                    var sc = (r2 && r2.headers) ? (r2.headers['set-cookie'] || r2.headers['Set-Cookie'] || '') : '';
                                    var m8 = String(sc).match(/__xcdn_captcha_verified=[^;]+/);
                                    if (m8) ck = m8[0];
                                } catch (eV) { }
                                var tries = ck ? [{ 'User-Agent': UA, 'Referer': HOSTV + '/', 'Cookie': ck }, { 'User-Agent': UA, 'Referer': HOSTV + '/' }] : [{ 'User-Agent': UA, 'Referer': HOSTV + '/' }];
                                for (var t8 = 0; t8 < tries.length; t8++) {
                                    var h3 = '';
                                    try { h3 = _norm(request(u, { method: 'get', headers: tries[t8], timeout: 20000 })); } catch (eG) { h3 = ''; }
                                    if (h3 && h3.indexOf('__xcdn') < 0) { h = h3; break; }
                                }
                            }
                        }
                    }
                } catch (eS) { }
                return String(h || '');
            }
            var u = '';
            try { if (typeof input !== 'undefined' && input) u = String(input); } catch (eA) { }
            if (!u) {
                var ct = '', pg = '1';
                try { if (typeof MY_CATE !== 'undefined' && MY_CATE) ct = String(MY_CATE); } catch (eB) { }
                try { if (typeof MY_PAGE !== 'undefined' && MY_PAGE) pg = String(MY_PAGE); } catch (eQ) { }
                u = String(C.cateUrl || '').split('{cateId}').join(ct).split('{catePg}').join(pg);
            }
            /* 多 URL 回退（对齐真机成品源）：
               1) 单页码格式 /vodtype/x-2.html 实测恒返回第1页（2026-10-12 金标准注释实锤）→ 第2页起直接改用苹果CMS标准翻页格式
               2) 其它站 MY_URL 优先；失败再试 vodshow 带页码 / 无页码，多一条活路 */
            var _cands = [];
            var _mt = u.match(/\/vodtype\/([a-z0-9]+)-(\d+)\.html/);
            if (_mt && parseInt(_mt[2], 10) >= 2) {
                _cands.push(HOSTV + '/vodshow/' + _mt[1] + '--------' + _mt[2] + '---.html');
            }
            _cands.push(u);
            if (ct) {
                _cands.push(HOSTV + '/vodshow/' + ct + '--------' + pg + '---.html');
                _cands.push(HOSTV + '/vodshow/' + ct + '-----------.html');
            }
            var _uh = '', _uok = '', _dl = Date.now() + 40000;
            for (var _ci = 0; _ci < _cands.length; _ci++) {
                if (Date.now() > _dl) break;
                var _h = _req(_cands[_ci]);
                if (_h && _h.indexOf('__xcdn') < 0 && _h.indexOf('Bot detection') < 0 && _h.length > 3000) { _uh = _h; _uok = _cands[_ci]; break; }
            }
            var html = _uh;
            var hs0 = [];
            var its = _cutAll(html, R['数组'] || '', hs0);
            for (var i = 0; i < its.length && out.length < 200; i++) {
                var it = its[i];
                var lk = _clr(_fld(it, R['链接'] || '')) || _clr(hs0[i] || '') || _clr(_fld(it, 'href="&&"'));
                if (!lk || seen[lk]) continue;
                var nm = _txt(_fld(it, R['标题'] || 'title="&&"'));
                if (!nm) continue;
                seen[lk] = 1;
                var pic = _clr(_fld(it, R['图片'] || '')) || _clr(_fld(it, 'data-original="&&"')) || _clr(_fld(it, 'src="&&"'));
                if (pic.indexOf('qpic.cn') >= 0) { var altPic = _pickPic(it); if (altPic) pic = altPic; }
                var mk = R['副标题'] ? _txt(_fld(it, R['副标题'])) : _txt(_fld(it, 'pic-text">&&<'));
                out.push({ vod_id: lk, vod_name: nm, vod_pic: _abs(pic), vod_remarks: mk });
            }
        } catch (e) { }
            /*DBG-BEGIN*/
            try {
                var _qn = 0, _fp = '';
                for (var _qi = 0; _qi < out.length; _qi++) { if (String(out[_qi].vod_pic || '').indexOf('qpic.cn') >= 0) _qn++; if (!_fp && out[_qi].vod_pic) _fp = out[_qi].vod_pic; }
                var _msg = 'DBG ' + out.length + '卡 qpic占' + _qn + ' 首图' + (_fp ? _fp.split('/')[2] : '无') + ' url=' + String(_uok || '全失败').slice(0, 55) + ' len=' + (_uh ? _uh.length : 0);
                out.unshift({ vod_id: 'dbg0', vod_name: _msg, vod_pic: '', vod_remarks: '' });
            } catch (e9) { }
            /*DBG-END*/
        VODS = out;
        if (typeof setResult === 'function') setResult(out);
    }).toString().replace(/^function\s*\(\)\s*\{/, '').replace(/\}\s*$/, ''),

    搜索: 'js:' + (function () {
        var C = {"name":"追影","host":"https://zhuiying1.cc","cateUrl":"https://zhuiying1.cc/vodtype/{cateId}-{catePg}.html","cats":"电影$dianying#电视剧$dianshiju#动漫$dongman#综艺$zongyi#短剧$duanju","search":"https://zhuiying1.cc/vod/search/wd/**.html","rules":{"数组":"<a href=\"/video/&&</a>","标题":"alt=\"&&\"","图片":"src=\"&&\"","链接":"data-url=\"&&\"","播放数组":"class=\"ep-square-list\"&&</div>","播放列表":"<a&&</a>","播放标题":"href=*>&&<","播放链接":"href=\"&&\"","线路数组":"class=\"source-tab\"&&</div>","线路标题":"class=\"tab-name\">&&<","简介":"<meta name=\"description\" content=\"&&\"","搜索数组":"class=\"search-list-card&&</div>","搜索标题":"title=\"&&\"","搜索图片":"src=\"&&\"","搜索链接":"href=\"&&\""}};
        var HOSTV = C.host;
        var R = C.rules || {};
        var out = [], seen = {};
        try {
            function _norm(x) { return (typeof x === 'string') ? x : String((x && x.content !== undefined && x.content !== null) ? x.content : ((x && x.body) || '')); }
            function _txt(t) { return String(t || '').replace(/<[^>]*>/g, '').replace(/&(?:amp;)+/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&[a-z#0-9]{2,};?/gi, '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); }
            function _clr(u) { return String(u || '').replace(/&amp;/g, '&').replace(/["'\r\n\t ]/g, ''); }
            function _abs(u) {
                u = _clr(u);
                if (!u) return '';
                if (u.indexOf('http') === 0) return u;
                if (u.indexOf('//') === 0) return 'https:' + u;
                if (u.charAt(0) !== '/') u = '/' + u;
                return HOSTV + u;
            }
            function _cutAll(html, rl, outH) {
                var p = String(rl || '').split('&&'), out2 = [], i = 0;
                if (!p[0]) return out2;
                while (out2.length < 400) {
                    var a = html.indexOf(p[0], i);
                    if (a < 0) break;
                    var b = p[1] ? html.indexOf(p[1], a + p[0].length) : -1;
                    if (b < 0) b = html.length;
                    out2.push(html.substring(a + p[0].length, b));
                    // 链接前缀通道：起始标记里若含 href="，它被切掉了，这里从原文捞回来（追影搜索页实锤：块内无任何链接属性）
                    if (outH) { var hm = html.substring(a, Math.min(html.length, a + 400)).match(/href="([^"]*)/); outH.push(hm ? hm[1] : ''); }
                    i = b + (p[1] ? p[1].length : 0);
                }
                return out2;
            }
            // qpic 图片链在部分真机网络被掉包成广告二维码（2026-10-12 真机实锤：js 源分类页封面全变二维码，
            // 同网络 XBPQ 正常——因为 csp 引擎带头下图，js 源 vod_pic 是裸链由 UI 层直接加载）。
            // 点选规则取到 qpic 图时，若块内有非 qpic 备选（同站大图/第二张封面），优先换掉。
            function _pickPic(block) {
                var all = String(block).match(/src="([^"]+)"/g) || [], first = '';
                for (var i = 0; i < all.length; i++) {
                    var s = all[i].substring(5, all[i].length - 1);
                    if (!first) first = s;
                    if (s.indexOf('qpic.cn') >= 0) continue;
                    if (/tps-\d|icon|logo|btn|avatar|qrcode|loading\.gif/i.test(s)) continue;
                    if (/^https?:/.test(s)) return s;
                }
                return first;
            }
            function _fld(s, rl) {
                s = String(s === null || s === undefined ? '' : s);
                if (!rl || !s) return '';
                var p = String(rl).split('&&');
                if (!p[0]) return '';
                var a = s.indexOf(p[0]);
                if (a < 0) return '';
                a += p[0].length;
                var b = p[1] ? s.indexOf(p[1], a) : -1;
                if (b < 0) b = Math.min(s.length, a + 500);
                return s.substring(a, b);
            }
            function _req(u) {
                var UA = 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
                var h = '', att;
                for (att = 0; att < 2; att++) {
                    try { h = _norm(request(u, { method: 'get', headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8' }, timeout: 10000 })); } catch (e0) { h = ''; }
                    h = String(h || '');
                    // 错误页/空响应（CDN 边缘节点抽风等）等一秒重试，最多 3 次
                    if (h && h.indexOf('__xcdn') < 0 && h.indexOf('Bot detection') < 0
                        && h.indexOf('edge node') < 0 && h.indexOf('联系不上源站') < 0 && h.length > 600) break;
                    var w9 = Date.now();
                    while (Date.now() - w9 < 500) { }
                }
                try {
                    if (String(h).indexOf('__xcdn') >= 0 || String(h).indexOf('Bot detection') >= 0) {
                        var j = null, r1 = null, ick = '';
                        for (var t9 = 0; t9 < 3 && !j; t9++) {
                            try {
                                r1 = request(HOSTV + '/__xcdn/captcha/api/init?path=/&r=' + (Date.now() % 1000000) + Math.floor(Math.random() * 1000), { method: 'get', headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/' }, timeout: 15000 });
                            } catch (eI) { r1 = null; }
                            var m9 = _norm(r1).match(/\{[^{}]*"challenge"[^{}]*\}/);
                            if (m9) { try { j = JSON.parse(m9[0]); } catch (eP) { j = null; } }
                        }
                        if (j && j.challenge) {
                            try { var sc0 = (r1 && r1.headers) ? (r1.headers['set-cookie'] || r1.headers['Set-Cookie'] || '') : ''; var pp = String(sc0).match(/[^\s;]+=[^;]+/g); if (pp) ick = pp.join('; '); } catch (eC1) { }
                            var df = Math.min(parseInt(j.difficulty, 10) || 1, 6);
                            var tg = '';
                            for (var z = 0; z < df; z++) tg += '0';
                            function _rr(v, a) { return (v >>> a) | (v << (32 - a)); }
                            function _sha(ascii) {
                                var mp = Math.pow, mw = mp(2, 32), result = '';
                                var words = [], bl = ascii.length * 8;
                                var hash = _sha.h = _sha.h || [], k = _sha.k = _sha.k || [];
                                var pc = k.length, ic = {};
                                for (var cd = 2; pc < 64; cd++) {
                                    if (!ic[cd]) {
                                        for (var q1 = 0; q1 < 313; q1 += cd) ic[q1] = cd;
                                        hash[pc] = (mp(cd, .5) * mw) | 0;
                                        k[pc++] = (mp(cd, 1 / 3) * mw) | 0;
                                    }
                                }
                                ascii += '\x80';
                                while (ascii.length % 64 - 56) ascii += '\x00';
                                for (var q2 = 0; q2 < ascii.length; q2++) {
                                    var j8 = ascii.charCodeAt(q2);
                                    if (j8 >> 8) return '';
                                    words[q2 >> 2] |= j8 << ((3 - q2) % 4) * 8;
                                }
                                words[words.length] = (bl / mw) | 0;
                                words[words.length] = bl;
                                for (var j7 = 0; j7 < words.length;) {
                                    var w = words.slice(j7, j7 += 16), oh = hash;
                                    hash = hash.slice(0, 8);
                                    for (var q3 = 0; q3 < 64; q3++) {
                                        var w15 = w[q3 - 15], w2 = w[q3 - 2];
                                        var a8 = hash[0], e8 = hash[4];
                                        var t1 = hash[7] + (_rr(e8, 6) ^ _rr(e8, 11) ^ _rr(e8, 25)) + ((e8 & hash[5]) ^ ((~e8) & hash[6])) + k[q3]
                                            + (w[q3] = (q3 < 16) ? w[q3] : (w[q3 - 16] + (_rr(w15, 7) ^ _rr(w15, 18) ^ (w15 >>> 3)) + w[q3 - 7] + (_rr(w2, 17) ^ _rr(w2, 19) ^ (w2 >>> 10))) | 0);
                                        var t2 = (_rr(a8, 2) ^ _rr(a8, 13) ^ _rr(a8, 22)) + ((a8 & hash[1]) ^ (a8 & hash[2]) ^ (hash[1] & hash[2]));
                                        hash = [(t1 + t2) | 0].concat(hash);
                                        hash[4] = (hash[4] + t1) | 0;
                                    }
                                    for (var q4 = 0; q4 < 8; q4++) hash[q4] = (hash[q4] + oh[q4]) | 0;
                                }
                                for (var q5 = 0; q5 < 8; q5++) for (var j6 = 3; j6 + 1; j6--) { var b6 = (hash[q5] >> (j6 * 8)) & 255; result += ((b6 < 16) ? 0 : '') + b6.toString(16); }
                                return result;
                            }
                            var n = 0, hh = '', t0 = Date.now();
                            while (Date.now() - t0 < 30000) { n++; hh = _sha(j.challenge + n); if (hh.substring(0, df) === tg) break; }
                            if (hh.substring(0, df) === tg) {
                                var vh = { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/', 'X-CDN-VERIFY-NONCE': String(n), 'X-CDN-VERIFY-RESULT': hh };
                                if (ick) vh['Cookie'] = ick;
                                var ck = '';
                                try {
                                    var r2 = request(HOSTV + '/__xcdn/captcha/api/verify', { method: 'get', headers: vh, timeout: 15000 });
                                    var sc = (r2 && r2.headers) ? (r2.headers['set-cookie'] || r2.headers['Set-Cookie'] || '') : '';
                                    var m8 = String(sc).match(/__xcdn_captcha_verified=[^;]+/);
                                    if (m8) ck = m8[0];
                                } catch (eV) { }
                                var tries = ck ? [{ 'User-Agent': UA, 'Referer': HOSTV + '/', 'Cookie': ck }, { 'User-Agent': UA, 'Referer': HOSTV + '/' }] : [{ 'User-Agent': UA, 'Referer': HOSTV + '/' }];
                                for (var t8 = 0; t8 < tries.length; t8++) {
                                    var h3 = '';
                                    try { h3 = _norm(request(u, { method: 'get', headers: tries[t8], timeout: 20000 })); } catch (eG) { h3 = ''; }
                                    if (h3 && h3.indexOf('__xcdn') < 0) { h = h3; break; }
                                }
                            }
                        }
                    }
                } catch (eS) { }
                return String(h || '');
            }
            function _cards(html) {
                var SR = {
                    '数组': R['搜索数组'] || R['数组'] || '',
                    '标题': R['搜索标题'] || R['标题'] || 'title="&&"',
                    '图片': R['搜索图片'] || R['图片'] || 'data-original="&&"',
                    '链接': R['搜索链接'] || R['链接'] || 'href="&&"'
                };
                var o = [], sn = {};
                var hs1 = [];
                var its = _cutAll(html, SR['数组'], hs1);
                for (var i = 0; i < its.length && o.length < 60; i++) {
                    var it = its[i];
                    var lk = _clr(_fld(it, SR['链接'])) || _clr(hs1[i] || '') || _clr(_fld(it, 'href="&&"'));
                    if (!lk || sn[lk]) continue;
                    var nm = _txt(_fld(it, SR['标题']));
                    if (!nm) continue;
                    sn[lk] = 1;
                    var pic = _clr(_fld(it, SR['图片'])) || _clr(_fld(it, 'data-original="&&"')) || _clr(_fld(it, 'src="&&"'));
                    o.push({ vod_id: lk, vod_name: nm, vod_pic: _abs(pic), vod_remarks: '' });
                }
                return o;
            }
            var kw = '', _kwsrc = '无';
            try { if (typeof KEY !== 'undefined' && KEY) { kw = String(KEY); _kwsrc = 'KEY'; } } catch (eK) { }
            var u = '';
            try { if (typeof input !== 'undefined' && input) u = String(input); } catch (eI) { }
            try { if (!u && typeof MY_URL !== 'undefined' && MY_URL) u = String(MY_URL); } catch (eU) { }
            if (!kw && u) {
                var m7 = u.match(/[?&](?:wd|q|kw|keyword|searchword)=([^&]*)/) || u.match(/\/wd\/([^/.]+)/);
                if (m7) { kw = m7[1]; _kwsrc = 'URL'; }
                if (kw.indexOf('%') >= 0) { try { kw = decodeURIComponent(kw); } catch (eD) { } }
            }
            kw = String(kw || '').replace(/^\s+|\s+$/g, '');
            if (kw) {
                if (!u) u = String(C.search || '').replace('{wd}', '**').split('**').join(encodeURIComponent(kw));
                else if (u.indexOf('**') >= 0) u = u.split('**').join(encodeURIComponent(kw));
                // 引擎可能把 ** 直接换成没编码的中文词（影视仓实测），补一层编码，否则请求中文 URL 直接失败
                else if (u.indexOf(kw) >= 0) u = u.split(kw).join(encodeURIComponent(kw));
                if (u) {
                    var html = _req(u);
                    out = _cards(html);
                    if (!out.length && R['搜索数组'] && R['数组']) out = _cards(html);   // 规则互切没戏，同页再试一遍兜底
                }
            }
        } catch (e) { }
            /*DBG-BEGIN*/
            try {
                var _msg2 = 'DBG 搜' + out.length + '条 词来' + _kwsrc + '[' + kw + '] url=' + String(u).slice(0, 55);
                out.unshift({ vod_id: 'dbg0', vod_name: _msg2, vod_pic: '', vod_remarks: '' });
            } catch (e9) { }
            /*DBG-END*/
        VODS = out;
        if (typeof setResult === 'function') setResult(out);
    }).toString().replace(/^function\s*\(\)\s*\{/, '').replace(/\}\s*$/, ''),

    二级: 'js:' + (function () {
        VOD = VOD || {};
        try {
            var C = {"name":"追影","host":"https://zhuiying1.cc","cateUrl":"https://zhuiying1.cc/vodtype/{cateId}-{catePg}.html","cats":"电影$dianying#电视剧$dianshiju#动漫$dongman#综艺$zongyi#短剧$duanju","search":"https://zhuiying1.cc/vod/search/wd/**.html","rules":{"数组":"<a href=\"/video/&&</a>","标题":"alt=\"&&\"","图片":"src=\"&&\"","链接":"data-url=\"&&\"","播放数组":"class=\"ep-square-list\"&&</div>","播放列表":"<a&&</a>","播放标题":"href=*>&&<","播放链接":"href=\"&&\"","线路数组":"class=\"source-tab\"&&</div>","线路标题":"class=\"tab-name\">&&<","简介":"<meta name=\"description\" content=\"&&\"","搜索数组":"class=\"search-list-card&&</div>","搜索标题":"title=\"&&\"","搜索图片":"src=\"&&\"","搜索链接":"href=\"&&\""}};
            var HOSTV = C.host;
            var R = C.rules || {};
            function _norm(x) { return (typeof x === 'string') ? x : String((x && x.content !== undefined && x.content !== null) ? x.content : ((x && x.body) || '')); }
            function _txt(t) { return String(t || '').replace(/<[^>]*>/g, '').replace(/&(?:amp;)+/g, '&').replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&[a-z#0-9]{2,};?/gi, '').replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, ''); }
            function _clr(u) { return String(u || '').replace(/&amp;/g, '&').replace(/["'\r\n\t ]/g, ''); }
            function _abs(u) {
                u = _clr(u);
                if (!u) return '';
                if (u.indexOf('http') === 0) return u;
                if (u.indexOf('//') === 0) return 'https:' + u;
                if (u.charAt(0) !== '/') u = '/' + u;
                return HOSTV + u;
            }
            function _cutAll(html, rl, outH) {
                var p = String(rl || '').split('&&'), out2 = [], i = 0;
                if (!p[0]) return out2;
                while (out2.length < 400) {
                    var a = html.indexOf(p[0], i);
                    if (a < 0) break;
                    var b = p[1] ? html.indexOf(p[1], a + p[0].length) : -1;
                    if (b < 0) b = html.length;
                    out2.push(html.substring(a + p[0].length, b));
                    // 链接前缀通道：起始标记里若含 href="，它被切掉了，这里从原文捞回来（追影搜索页实锤：块内无任何链接属性）
                    if (outH) { var hm = html.substring(a, Math.min(html.length, a + 400)).match(/href="([^"]*)/); outH.push(hm ? hm[1] : ''); }
                    i = b + (p[1] ? p[1].length : 0);
                }
                return out2;
            }
            // qpic 图片链在部分真机网络被掉包成广告二维码（2026-10-12 真机实锤：js 源分类页封面全变二维码，
            // 同网络 XBPQ 正常——因为 csp 引擎带头下图，js 源 vod_pic 是裸链由 UI 层直接加载）。
            // 点选规则取到 qpic 图时，若块内有非 qpic 备选（同站大图/第二张封面），优先换掉。
            function _pickPic(block) {
                var all = String(block).match(/src="([^"]+)"/g) || [], first = '';
                for (var i = 0; i < all.length; i++) {
                    var s = all[i].substring(5, all[i].length - 1);
                    if (!first) first = s;
                    if (s.indexOf('qpic.cn') >= 0) continue;
                    if (/tps-\d|icon|logo|btn|avatar|qrcode|loading\.gif/i.test(s)) continue;
                    if (/^https?:/.test(s)) return s;
                }
                return first;
            }
            function _fld(s, rl) {
                s = String(s === null || s === undefined ? '' : s);
                if (!rl || !s) return '';
                var p = String(rl).split('&&');
                if (!p[0]) return '';
                var a = s.indexOf(p[0]);
                if (a < 0) return '';
                a += p[0].length;
                var b = p[1] ? s.indexOf(p[1], a) : -1;
                if (b < 0) b = Math.min(s.length, a + 500);
                return s.substring(a, b);
            }
            function _req(u) {
                var UA = 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
                var h = '', att;
                for (att = 0; att < 2; att++) {
                    try { h = _norm(request(u, { method: 'get', headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8' }, timeout: 10000 })); } catch (e0) { h = ''; }
                    h = String(h || '');
                    // 错误页/空响应（CDN 边缘节点抽风等）等一秒重试，最多 3 次
                    if (h && h.indexOf('__xcdn') < 0 && h.indexOf('Bot detection') < 0
                        && h.indexOf('edge node') < 0 && h.indexOf('联系不上源站') < 0 && h.length > 600) break;
                    var w9 = Date.now();
                    while (Date.now() - w9 < 500) { }
                }
                try {
                    if (String(h).indexOf('__xcdn') >= 0 || String(h).indexOf('Bot detection') >= 0) {
                        var j = null, r1 = null, ick = '';
                        for (var t9 = 0; t9 < 3 && !j; t9++) {
                            try {
                                r1 = request(HOSTV + '/__xcdn/captcha/api/init?path=/&r=' + (Date.now() % 1000000) + Math.floor(Math.random() * 1000), { method: 'get', headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/' }, timeout: 15000 });
                            } catch (eI) { r1 = null; }
                            var m9 = _norm(r1).match(/\{[^{}]*"challenge"[^{}]*\}/);
                            if (m9) { try { j = JSON.parse(m9[0]); } catch (eP) { j = null; } }
                        }
                        if (j && j.challenge) {
                            try { var sc0 = (r1 && r1.headers) ? (r1.headers['set-cookie'] || r1.headers['Set-Cookie'] || '') : ''; var pp = String(sc0).match(/[^\s;]+=[^;]+/g); if (pp) ick = pp.join('; '); } catch (eC1) { }
                            var df = Math.min(parseInt(j.difficulty, 10) || 1, 6);
                            var tg = '';
                            for (var z = 0; z < df; z++) tg += '0';
                            function _rr(v, a) { return (v >>> a) | (v << (32 - a)); }
                            function _sha(ascii) {
                                var mp = Math.pow, mw = mp(2, 32), result = '';
                                var words = [], bl = ascii.length * 8;
                                var hash = _sha.h = _sha.h || [], k = _sha.k = _sha.k || [];
                                var pc = k.length, ic = {};
                                for (var cd = 2; pc < 64; cd++) {
                                    if (!ic[cd]) {
                                        for (var q1 = 0; q1 < 313; q1 += cd) ic[q1] = cd;
                                        hash[pc] = (mp(cd, .5) * mw) | 0;
                                        k[pc++] = (mp(cd, 1 / 3) * mw) | 0;
                                    }
                                }
                                ascii += '\x80';
                                while (ascii.length % 64 - 56) ascii += '\x00';
                                for (var q2 = 0; q2 < ascii.length; q2++) {
                                    var j8 = ascii.charCodeAt(q2);
                                    if (j8 >> 8) return '';
                                    words[q2 >> 2] |= j8 << ((3 - q2) % 4) * 8;
                                }
                                words[words.length] = (bl / mw) | 0;
                                words[words.length] = bl;
                                for (var j7 = 0; j7 < words.length;) {
                                    var w = words.slice(j7, j7 += 16), oh = hash;
                                    hash = hash.slice(0, 8);
                                    for (var q3 = 0; q3 < 64; q3++) {
                                        var w15 = w[q3 - 15], w2 = w[q3 - 2];
                                        var a8 = hash[0], e8 = hash[4];
                                        var t1 = hash[7] + (_rr(e8, 6) ^ _rr(e8, 11) ^ _rr(e8, 25)) + ((e8 & hash[5]) ^ ((~e8) & hash[6])) + k[q3]
                                            + (w[q3] = (q3 < 16) ? w[q3] : (w[q3 - 16] + (_rr(w15, 7) ^ _rr(w15, 18) ^ (w15 >>> 3)) + w[q3 - 7] + (_rr(w2, 17) ^ _rr(w2, 19) ^ (w2 >>> 10))) | 0);
                                        var t2 = (_rr(a8, 2) ^ _rr(a8, 13) ^ _rr(a8, 22)) + ((a8 & hash[1]) ^ (a8 & hash[2]) ^ (hash[1] & hash[2]));
                                        hash = [(t1 + t2) | 0].concat(hash);
                                        hash[4] = (hash[4] + t1) | 0;
                                    }
                                    for (var q4 = 0; q4 < 8; q4++) hash[q4] = (hash[q4] + oh[q4]) | 0;
                                }
                                for (var q5 = 0; q5 < 8; q5++) for (var j6 = 3; j6 + 1; j6--) { var b6 = (hash[q5] >> (j6 * 8)) & 255; result += ((b6 < 16) ? 0 : '') + b6.toString(16); }
                                return result;
                            }
                            var n = 0, hh = '', t0 = Date.now();
                            while (Date.now() - t0 < 30000) { n++; hh = _sha(j.challenge + n); if (hh.substring(0, df) === tg) break; }
                            if (hh.substring(0, df) === tg) {
                                var vh = { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/', 'X-CDN-VERIFY-NONCE': String(n), 'X-CDN-VERIFY-RESULT': hh };
                                if (ick) vh['Cookie'] = ick;
                                var ck = '';
                                try {
                                    var r2 = request(HOSTV + '/__xcdn/captcha/api/verify', { method: 'get', headers: vh, timeout: 15000 });
                                    var sc = (r2 && r2.headers) ? (r2.headers['set-cookie'] || r2.headers['Set-Cookie'] || '') : '';
                                    var m8 = String(sc).match(/__xcdn_captcha_verified=[^;]+/);
                                    if (m8) ck = m8[0];
                                } catch (eV) { }
                                var tries = ck ? [{ 'User-Agent': UA, 'Referer': HOSTV + '/', 'Cookie': ck }, { 'User-Agent': UA, 'Referer': HOSTV + '/' }] : [{ 'User-Agent': UA, 'Referer': HOSTV + '/' }];
                                for (var t8 = 0; t8 < tries.length; t8++) {
                                    var h3 = '';
                                    try { h3 = _norm(request(u, { method: 'get', headers: tries[t8], timeout: 20000 })); } catch (eG) { h3 = ''; }
                                    if (h3 && h3.indexOf('__xcdn') < 0) { h = h3; break; }
                                }
                            }
                        }
                    }
                } catch (eS) { }
                return String(h || '');
            }
            var raw = '';
            try { if (typeof MY_URL !== 'undefined' && MY_URL) raw = String(MY_URL); } catch (eM) { }
            if (!raw) { try { if (typeof input !== 'undefined' && input) raw = String(input); } catch (eN) { } }
            var seg = String(raw || '').split('~');
            var href = seg.length >= 3 ? seg[1] : (seg[seg.length - 1] || '');
            try { href = decodeURIComponent(href); } catch (eE) { }
            if (/%2F|%2f/.test(href)) { try { href = decodeURIComponent(href); } catch (eE2) { } }
            if (href.indexOf('http') !== 0) href = HOSTV + (href.charAt(0) === '/' ? '' : '/') + href;
            var html = _req(href);
            VOD.vod_id = href;
            var t1 = html.match(/<h1[^>]*>([\s\S]{1,100}?)<\/h1>/i);
            var nm = t1 ? _txt(t1[1]) : '';
            if (!nm) {
                var t2 = html.match(/<title>([^<]{1,120})</i);
                if (t2) nm = _txt(t2[1].split('_')[0].split(' - ')[0]);
            }
            if (nm) VOD.vod_name = nm;
            var p1 = html.match(/data-original="([^"]{1,300})"/i) || html.match(/og:image[^>]*content="([^"]{1,300})"/i) || html.match(/<img[^>]+src="([^"]{1,300}\.(?:jpg|jpeg|png|webp)[^"]*)"/i);
            if (p1) VOD.vod_pic = _abs(p1[1]);
            var c1 = R['简介'] ? _txt(_fld(html, R['简介'])) : '';
            if (!c1) {
                var c2 = html.match(/<meta name="description" content="([^"]{1,800})"/i);
                if (c2) c1 = _txt(c2[1]);
            }
            if (c1) VOD.vod_content = c1;
            var names = [];
            if (R['线路数组']) {
                var lis = _cutAll(html, R['线路数组']);
                for (var li = 0; li < lis.length; li++) names.push(_txt(_fld(lis[li], R['线路标题'] || '>&&<')));
            }
            var fr = [], us = [];
            if (R['播放数组'] && R['播放列表']) {
                var blocks = _cutAll(html, R['播放数组']);
                var pl = R['播放列表'];
                var preP = (pl.split('&&')[0].match(/href="([^"]*)/) || [])[1] || '';
                for (var b = 0; b < blocks.length; b++) {
                    var eps = [], snE = {};
                    var its2 = _cutAll(blocks[b], pl);
                    for (var k = 0; k < its2.length; k++) {
                        var it2 = its2[k];
                        var lk2 = _clr(_fld(it2, R['播放链接'] || 'href="&&"'));
                        if (!lk2 && preP) {
                            var m6 = it2.match(/^([^"'<> ]+)/);
                            if (m6) lk2 = preP + m6[1];
                        }
                        if (!lk2) continue;
                        if (lk2.indexOf('//') === 0) lk2 = 'https:' + lk2;
                        if (lk2.indexOf('http') !== 0) lk2 = _abs(lk2);
                        if (snE[lk2]) continue;
                        if (lk2.indexOf(HOSTV) !== 0) continue;
                        snE[lk2] = 1;
                        var en = R['播放标题'] ? _txt(_fld(it2, R['播放标题'])) : '';
                        if (!en) {
                            var m5 = it2.match(/>([^<>]+)\s*$/);
                            if (m5) en = _txt(m5[1]);
                        }
                        if (!en) en = '第' + (eps.length + 1) + '集';
                        eps.push(en + '$' + lk2);
                    }
                    if (eps.length) {
                        fr.push(names[b] || ('线路' + (fr.length + 1)));
                        us.push(eps.join('#'));
                    }
                }
            }
            if (!fr.length) {
                var re = /<a[^>]*href="([^"]*\/\d+-\d+-\d+\.html?)"[^>]*>\s*([^<]{0,20})\s*<\/a>/g, m4, fmap = {}, ford = [];
                while ((m4 = re.exec(html)) !== null) {
                    var u4 = _abs(m4[1]);
                    if (u4.indexOf(HOSTV) !== 0) continue;
                    var sg4 = u4.substring(u4.lastIndexOf('/') + 1).replace(/\.html?/, '').split('-');
                    if (sg4.length < 3) continue;
                    var sid = sg4[sg4.length - 2], nid = sg4[sg4.length - 1];
                    if (!fmap[sid]) { fmap[sid] = []; ford.push(sid); }
                    fmap[sid].push((m4[2] || ('第' + nid + '集')) + '$' + u4);
                }
                ford.sort(function (x, y) { return (parseInt(x, 10) || 0) - (parseInt(y, 10) || 0); });
                for (var f2 = 0; f2 < ford.length; f2++) {
                    if (fmap[ford[f2]].length) { fr.push('线路' + (f2 + 1)); us.push(fmap[ford[f2]].join('#')); }
                }
            }
            if (fr.length) {
                VOD.vod_play_from = fr.join('$$$');
                VOD.vod_play_url = us.join('$$$');
            }
        } catch (e) { }
            /*DBG-BEGIN*/
            try {
                var _ln = String(VOD.vod_play_from || '').split('$$$').filter(function (x) { return x; }).length;
                var _epn = 0; String(VOD.vod_play_url || '').split('$$$').forEach(function (x) { var n = x.split('#').filter(function (y) { return y; }).length; if (n > _epn) _epn = n; });
                VOD.vod_remarks = 'DBG ' + _ln + '线/' + _epn + '集 名=' + String(VOD.vod_name || '').slice(0, 10) + ' url=' + String(href || '').slice(0, 50) + ' len=' + (html ? html.length : 0);
                VOD.vod_name = '[DBG]' + _ln + '线' + _epn + '集 ' + String(VOD.vod_name || '');
            } catch (e9) { }
            /*DBG-END*/
        if (typeof setResult === 'function') setResult(VOD);
    }).toString().replace(/^function\s*\(\)\s*\{/, '').replace(/\}\s*$/, ''),

    lazy: 'js:' + (function () {
        try {
            var C = {"name":"追影","host":"https://zhuiying1.cc","cateUrl":"https://zhuiying1.cc/vodtype/{cateId}-{catePg}.html","cats":"电影$dianying#电视剧$dianshiju#动漫$dongman#综艺$zongyi#短剧$duanju","search":"https://zhuiying1.cc/vod/search/wd/**.html","rules":{"数组":"<a href=\"/video/&&</a>","标题":"alt=\"&&\"","图片":"src=\"&&\"","链接":"data-url=\"&&\"","播放数组":"class=\"ep-square-list\"&&</div>","播放列表":"<a&&</a>","播放标题":"href=*>&&<","播放链接":"href=\"&&\"","线路数组":"class=\"source-tab\"&&</div>","线路标题":"class=\"tab-name\">&&<","简介":"<meta name=\"description\" content=\"&&\"","搜索数组":"class=\"search-list-card&&</div>","搜索标题":"title=\"&&\"","搜索图片":"src=\"&&\"","搜索链接":"href=\"&&\""}};
            var HOSTV = C.host;
            function _norm(x) { return (typeof x === 'string') ? x : String((x && x.content !== undefined && x.content !== null) ? x.content : ((x && x.body) || '')); }
            function _req(u) {
                var UA = 'Mozilla/5.0 (Linux; Android 12) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
                var h = '', att;
                for (att = 0; att < 2; att++) {
                    try { h = _norm(request(u, { method: 'get', headers: { 'User-Agent': UA, 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8', 'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8' }, timeout: 10000 })); } catch (e0) { h = ''; }
                    h = String(h || '');
                    // 错误页/空响应（CDN 边缘节点抽风等）等一秒重试，最多 3 次
                    if (h && h.indexOf('__xcdn') < 0 && h.indexOf('Bot detection') < 0
                        && h.indexOf('edge node') < 0 && h.indexOf('联系不上源站') < 0 && h.length > 600) break;
                    var w9 = Date.now();
                    while (Date.now() - w9 < 500) { }
                }
                try {
                    if (String(h).indexOf('__xcdn') >= 0 || String(h).indexOf('Bot detection') >= 0) {
                        var j = null, r1 = null, ick = '';
                        for (var t9 = 0; t9 < 3 && !j; t9++) {
                            try {
                                r1 = request(HOSTV + '/__xcdn/captcha/api/init?path=/&r=' + (Date.now() % 1000000) + Math.floor(Math.random() * 1000), { method: 'get', headers: { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/' }, timeout: 15000 });
                            } catch (eI) { r1 = null; }
                            var m9 = _norm(r1).match(/\{[^{}]*"challenge"[^{}]*\}/);
                            if (m9) { try { j = JSON.parse(m9[0]); } catch (eP) { j = null; } }
                        }
                        if (j && j.challenge) {
                            try { var sc0 = (r1 && r1.headers) ? (r1.headers['set-cookie'] || r1.headers['Set-Cookie'] || '') : ''; var pp = String(sc0).match(/[^\s;]+=[^;]+/g); if (pp) ick = pp.join('; '); } catch (eC1) { }
                            var df = Math.min(parseInt(j.difficulty, 10) || 1, 6);
                            var tg = '';
                            for (var z = 0; z < df; z++) tg += '0';
                            function _rr(v, a) { return (v >>> a) | (v << (32 - a)); }
                            function _sha(ascii) {
                                var mp = Math.pow, mw = mp(2, 32), result = '';
                                var words = [], bl = ascii.length * 8;
                                var hash = _sha.h = _sha.h || [], k = _sha.k = _sha.k || [];
                                var pc = k.length, ic = {};
                                for (var cd = 2; pc < 64; cd++) {
                                    if (!ic[cd]) {
                                        for (var q1 = 0; q1 < 313; q1 += cd) ic[q1] = cd;
                                        hash[pc] = (mp(cd, .5) * mw) | 0;
                                        k[pc++] = (mp(cd, 1 / 3) * mw) | 0;
                                    }
                                }
                                ascii += '\x80';
                                while (ascii.length % 64 - 56) ascii += '\x00';
                                for (var q2 = 0; q2 < ascii.length; q2++) {
                                    var j8 = ascii.charCodeAt(q2);
                                    if (j8 >> 8) return '';
                                    words[q2 >> 2] |= j8 << ((3 - q2) % 4) * 8;
                                }
                                words[words.length] = (bl / mw) | 0;
                                words[words.length] = bl;
                                for (var j7 = 0; j7 < words.length;) {
                                    var w = words.slice(j7, j7 += 16), oh = hash;
                                    hash = hash.slice(0, 8);
                                    for (var q3 = 0; q3 < 64; q3++) {
                                        var w15 = w[q3 - 15], w2 = w[q3 - 2];
                                        var a8 = hash[0], e8 = hash[4];
                                        var t1 = hash[7] + (_rr(e8, 6) ^ _rr(e8, 11) ^ _rr(e8, 25)) + ((e8 & hash[5]) ^ ((~e8) & hash[6])) + k[q3]
                                            + (w[q3] = (q3 < 16) ? w[q3] : (w[q3 - 16] + (_rr(w15, 7) ^ _rr(w15, 18) ^ (w15 >>> 3)) + w[q3 - 7] + (_rr(w2, 17) ^ _rr(w2, 19) ^ (w2 >>> 10))) | 0);
                                        var t2 = (_rr(a8, 2) ^ _rr(a8, 13) ^ _rr(a8, 22)) + ((a8 & hash[1]) ^ (a8 & hash[2]) ^ (hash[1] & hash[2]));
                                        hash = [(t1 + t2) | 0].concat(hash);
                                        hash[4] = (hash[4] + t1) | 0;
                                    }
                                    for (var q4 = 0; q4 < 8; q4++) hash[q4] = (hash[q4] + oh[q4]) | 0;
                                }
                                for (var q5 = 0; q5 < 8; q5++) for (var j6 = 3; j6 + 1; j6--) { var b6 = (hash[q5] >> (j6 * 8)) & 255; result += ((b6 < 16) ? 0 : '') + b6.toString(16); }
                                return result;
                            }
                            var n = 0, hh = '', t0 = Date.now();
                            while (Date.now() - t0 < 30000) { n++; hh = _sha(j.challenge + n); if (hh.substring(0, df) === tg) break; }
                            if (hh.substring(0, df) === tg) {
                                var vh = { 'User-Agent': UA, 'Accept': '*/*', 'Referer': HOSTV + '/', 'X-CDN-VERIFY-NONCE': String(n), 'X-CDN-VERIFY-RESULT': hh };
                                if (ick) vh['Cookie'] = ick;
                                var ck = '';
                                try {
                                    var r2 = request(HOSTV + '/__xcdn/captcha/api/verify', { method: 'get', headers: vh, timeout: 15000 });
                                    var sc = (r2 && r2.headers) ? (r2.headers['set-cookie'] || r2.headers['Set-Cookie'] || '') : '';
                                    var m8 = String(sc).match(/__xcdn_captcha_verified=[^;]+/);
                                    if (m8) ck = m8[0];
                                } catch (eV) { }
                                var tries = ck ? [{ 'User-Agent': UA, 'Referer': HOSTV + '/', 'Cookie': ck }, { 'User-Agent': UA, 'Referer': HOSTV + '/' }] : [{ 'User-Agent': UA, 'Referer': HOSTV + '/' }];
                                for (var t8 = 0; t8 < tries.length; t8++) {
                                    var h3 = '';
                                    try { h3 = _norm(request(u, { method: 'get', headers: tries[t8], timeout: 20000 })); } catch (eG) { h3 = ''; }
                                    if (h3 && h3.indexOf('__xcdn') < 0) { h = h3; break; }
                                }
                            }
                        }
                    }
                } catch (eS) { }
                return String(h || '');
            }
            var u = (typeof input === 'string') ? input : String((input && input.url) || '');
            var d9 = u.lastIndexOf('$');
            if (d9 >= 0) u = u.substring(d9 + 1);
            u = String(u || '');
            var done = false;
            var fin = function (o) { done = true; input = o; if (typeof setResult === 'function') setResult(o); };
            if (/pan\.quark|pan\.baidu|alipan|aliyundrive|115\.com|123pan|189\.cn|139\.com|weiyun|xunlei|magnet:\?|ed2k:/i.test(u)) {
                fin({ parse: 0, url: 'toast://网盘类链接不支持在线播放' });
            } else if (/\.(m3u8|mp4)/i.test(u)) {
                fin({ parse: 0, url: u, jx: 0 });
            } else if (u) {
                if (u.indexOf('http') !== 0) u = HOSTV + (u.charAt(0) === '/' ? '' : '/') + u;
                var html = _req(u);
                var pur = '';
                var i9 = html.indexOf('player_aaaa');
                if (i9 < 0) i9 = html.indexOf('player_data');
                if (i9 >= 0) {
                    var j9 = html.indexOf('{', i9);
                    if (j9 >= 0) {
                        var dep = 0, k9 = j9, sg = '';
                        for (; k9 < html.length; k9++) {
                            var ch9 = html.charAt(k9);
                            if (ch9 === '{') dep++;
                            else if (ch9 === '}') { dep--; if (!dep) { sg = html.substring(j9, k9 + 1); break; } }
                        }
                        var um = sg.match(/"url"\s*:\s*"([^"]+)"/);
                        if (um) pur = um[1];
                    }
                }
                if (pur) pur = pur.split('\\/').join('/');
                function _b64(s) {
                    var B = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/', o = '', b2 = 0, a2 = 0;
                    s = String(s).replace(/[^A-Za-z0-9+\/=]/g, '');
                    for (var q = 0; q < s.length; q++) {
                        var c9 = s.charAt(q);
                        if (c9 === '=') break;
                        var v9 = B.indexOf(c9);
                        if (v9 < 0) continue;
                        a2 = (a2 << 6) | v9; b2 += 6;
                        if (b2 >= 8) { b2 -= 8; o += String.fromCharCode((a2 >> b2) & 255); }
                    }
                    return o;
                }
                try {
                    var pv = '', n9 = 0;
                    while (pur && pur !== pv && n9 < 4 && !/^https?:\/\//i.test(pur)) {
                        pv = pur; n9++;
                        if (pur.indexOf('%') >= 0) {
                            var t7 = pur;
                            try { t7 = decodeURIComponent(pur); } catch (eU) { t7 = pur; }
                            if (t7 && t7 !== pur) { pur = t7; continue; }
                        }
                        if (/^[A-Za-z0-9+\/=]{12,}$/.test(pur)) {
                            var b8 = _b64(pur);
                            if (b8) pur = b8;
                        }
                    }
                } catch (e8) { }
                if (/pan\.quark|pan\.baidu|alipan|aliyundrive|115\.com|123pan|weiyun|xunlei|magnet:\?|ed2k:/i.test(pur)) fin({ parse: 0, url: 'toast://这集是网盘链接，看不了' });
                else if (/^https?:\/\/[^"'\s]+\.(m3u8|mp4)/i.test(pur)) fin({ parse: 0, url: pur, jx: 0 });
                else if (/v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com/i.test(pur)) fin({ parse: 1, url: pur, jx: 1 });
                else if (pur) fin({ parse: 1, url: pur, jx: 1 });
                if (!done) {
                    var im2 = html.match(/<iframe[^>]+src="([^"]+)"/i);
                    if (im2) {
                        var isc = im2[1];
                        var um2 = isc.match(/[?&]url=([^&"]+)/);
                        var vu = um2 ? decodeURIComponent(um2[1]) : '';
                        if (vu && /\.(m3u8|mp4)/i.test(vu)) fin({ parse: 0, url: vu, jx: 0 });
                        else if (vu) fin({ parse: 1, url: vu, jx: 1 });
                        else fin({ parse: 1, url: isc, jx: 1 });
                    }
                }
                if (!done) {
                    var dm = html.match(/https?:\/\/[^"'\s<>]+\.m3u8[^"'\s<>]*/) || html.match(/https?:\/\/[^"'\s<>]+\.mp4[^"'\s<>]*/);
                    if (dm) fin({ parse: 0, url: dm[0], jx: 0 });
                }
            }
            if (!done) { var uL = (typeof input !== 'undefined' && input) ? String(input) : ''; if (uL.indexOf('$') >= 0) { uL = uL.split('$').pop() || uL; } if (uL) { fin({ parse: 1, url: uL, jx: 1 }); } else { fin({ parse: 0, url: 'toast://这集的播放地址没认出来' }); } }
        } catch (e) { }
    }).toString().replace(/^function\s*\(\)\s*\{/, '').replace(/\}\s*$/, '')
};
