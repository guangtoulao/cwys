/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '可可影视',
  '类型': '影视',
  lang: 'dr2'
})
*/

/*
 * 可可影视 keke5.app  (drpy2 规则)
 *
 * 三道坎（与原版一致，未动）：
 *  1) cdndefend 盾：无 cookie 直接返回 850。预置一份算好的 cookie，
 *     万一失效，hostJs 会在启动时按盾页里的 40 位 hash 现算一份。
 *  2) 搜索必须带 t：t 由服务器校验，错一个字符就是 200 + 0 条。
 *     所以搜索用 js: 现抓首页 token，再自己拼 URL、自己解析。
 *  3) 海报是相对路径 /vod1/...：引擎补成站内绝对地址后，用 图片替换 换到图片 CDN。
 *
 * 【线路名替换 / 排序 / 删除】实现方式（关键）：
 *  二级 用 js: 实现，但解析部分**逐字调用引擎自己的 pdfa / pdfh / pd**（drpy2 的 js 二级 作用域里暴露的就是这三个全局，不带下划线）
 *  （与对象式二级内部用的就是同一套函数），所以解析结果和原对象式二级 100% 一致，
 *  播放绝不会丢。仅在最后一步按"位置序号"把线路名改成 君子兰①②③…，
 *  因此无论引擎给重复线路加什么后缀（蓝光1-1 / 蓝光1-2 / 蓝光11 …），都能覆盖。
 *
 *  改配置只动下面 js 里的三个变量：
 *    zzPrefix : 线路名前缀，'' 表示保留源站原名
 *    zzOrder  : 排序，如 ['4K','蓝光'] 把含这些子串的线路排到前面；[] 不排序
 *    zzDrop   : 删除，填要删的线路序号(从0起)，如 [5,6] 删第6、7条；[] 不删
 */

var rule = {
    title: '可可影视',
    host: 'https://www.keke5.app',
    homeUrl: '/',
    url: '/show/fyclass-----2-fypage.html',
    // searchUrl 不能为空（引擎靠它建 MY_URL），真正请求由下面的 js: 搜索自己发
    searchUrl: '/search?t=o9Z8PTQ8spxIqjj4GAVojw%3D%3D&k=**&page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'MOBILE_UA',
        // 2026-09-26 修正：原预置 cookie(D6C45...)已过期导致详情页被盾挡、没数据+搜索卡。
        // 换成当日抓包里真实有效的 cookie；若再失效，hostJs/搜索里的现算逻辑会自动重算。
        'Cookie': 'cdndefend_js_cookie=211E32E40FB15488A1BF917CABEE9EEACF38B87D47539'
    },
    play_parse: true,
    limit: 20,
    class_name: '电影&连续剧&动漫&综艺纪录&短剧',
    class_url: '1&2&3&4&6',
    图片替换: 'https://www.keke5.app/=>https://vres.esadj.com/',

    // 启动时：cookie 若被盾挡掉就现算一份（盾页 850 / 含 cdndefend）
    hostJs: $js.toString(() => {
        var _hh = '';
        try { _hh = request(rule.host + '/', { headers: rule.headers }); } catch (e) { }
        if (_hh.indexOf('module-item') < 0 && (_hh.indexOf('cdndefend') >= 0 || _hh.indexOf('a0_0x2a54') >= 0)) {
            var _mc = _hh.match(/a0_0x2a54\s*=\s*\[\s*['"]([0-9A-Fa-f]{40})['"]/);
            if (_mc) {
                var _c = _mc[1], _n = parseInt('0x' + _c.charAt(0), 16);
                // 校验位：SHA1(hash + 计数器) 第 n、n+1 字节分别为 0xb0、0x0b
                for (var _kk = 0; _kk < 300000; _kk++) {
                    var _ss = CryptoJS.SHA1(_c + _kk).toString(CryptoJS.enc.Latin1);
                    if (_ss.charCodeAt(_n) === 0xb0 && _ss.charCodeAt(_n + 1) === 0x0b) {
                        rule.headers['Cookie'] = 'cdndefend_js_cookie=' + _c + _kk;
                        break;
                    }
                }
            }
        }
    }),

    // 首页「近期热门剧集」段：section-box 第 3 段（第 2 段是专题列表，结构不同）
    推荐: '.section-box:eq(2)&&.module-item;.v-item-title:eq(1)&&Text;.v-item-cover&&img:eq(1)&&data-original;.v-item-bottom&&span&&Text;a&&href',

    // 卡片里 3 个 v-item-title（2 个是水印），取第 2 个才是真标题；
    // .v-item-cover 里第 1 张 img 是占位图，第 2 张才是海报
    一级: '.module-box-inner&&.module-item;.v-item-title:eq(1)&&Text;.v-item-cover&&img:eq(1)&&data-original;.v-item-bottom&&span&&Text;a&&href',

    // 二级：js 实现（解析用引擎自己的 pdfa/pdfh/pd 全局，改名/排序/删除在末尾按序号处理）
    二级: $js.toString(() => {
        // ===== 配置：线路名前缀 / 排序 / 删除 =====
        var zzPrefix = '君子兰';
        var zzOrder = [];          // 例：['4K','蓝光'] 把含这些子串的排前；[] 不排序
        var zzDrop = [];           // 例：[5,6] 删第6、7条线路；[] 不删

        // ===== 解析函数：兼容不同引擎（有的暴露 pdfa/pdfh/pd，有的暴露 _pdfa/_pdfh/_pd）=====
        var A = (typeof pdfa === 'function') ? pdfa : ((typeof _pdfa === 'function') ? _pdfa : null);
        var H = (typeof pdfh === 'function') ? pdfh : ((typeof _pdfh === 'function') ? _pdfh : null);
        var D = (typeof pd === 'function') ? pd : ((typeof _pd === 'function') ? _pd : null);
        function _ra(s, a, b) { return String(s).split(a).join(b); }

        // ===== 解析（选择器与原对象式二级完全一致，调用引擎解析函数，结果必一致）=====
        var zzName = '.detail-pic&&img&&alt';
        var zzImg = '.detail-pic&&img&&data-original';
        var zzDesc = '.detail-tags&&Text;.detail-info-row-main&&Text';
        var zzContent = '.detail-desc&&Text';
        var zzTabs = '.source-item-label';
        var zzLists = '.episode-list:eq(#id) a';
        var zzTabText = 'body&&Text';
        var zzListText = 'body&&Text';
        var zzListUrl = 'a&&href';

        // 详情页若被盾挡住（拿不到选集容器），就地恢复 cookie 后重取一次
        var zzHtml = html;
        if (String(zzHtml).indexOf('source-item-label') < 0 && typeof request === 'function') {
            try {
                var _hm2 = request(rule.host + '/', { headers: rule.headers });
                if (_hm2.indexOf('module-item') < 0 && (_hm2.indexOf('cdndefend') >= 0 || _hm2.indexOf('a0_0x2a54') >= 0)) {
                    var _mc2 = _hm2.match(/a0_0x2a54\s*=\s*\[\s*['"]([0-9A-Fa-f]{40})['"]/);
                    if (_mc2) {
                        var _c2 = _mc2[1], _n2 = parseInt('0x' + _c2.charAt(0), 16);
                        for (var _kk2 = 0; _kk2 < 300000; _kk2++) {
                            var _ss2 = CryptoJS.SHA1(_c2 + _kk2).toString(CryptoJS.enc.Latin1);
                            if (_ss2.charCodeAt(_n2) === 0xb0 && _ss2.charCodeAt(_n2 + 1) === 0x0b) {
                                rule.headers['Cookie'] = 'cdndefend_js_cookie=' + _c2 + _kk2;
                                break;
                            }
                        }
                    }
                }
                var _rb2 = request(MY_URL, { headers: rule.headers });
                if (_rb2 && _rb2.indexOf('source-item-label') >= 0) zzHtml = _rb2;
            } catch (e) { }
        }

        var zzV = {}, zzOrig = [], zzTabList = [];
        if (A && H && D) {
            // 详情字段
            try { zzV.vod_name = H(zzHtml, zzName.split(';')[0]).replace(/\n|\t/g, '').trim(); } catch (e) { zzV.vod_name = ''; }
            try { zzV.vod_pic = D(zzHtml, zzImg.split(';')[0], MY_URL); } catch (e) { zzV.vod_pic = ''; }
            try { zzV.vod_remarks = H(zzHtml, zzDesc.split(';')[0]).replace(/\n|\t/g, '').trim(); } catch (e) { }
            try { zzV.vod_content = H(zzHtml, zzContent.split(';')[0]).replace(/\n|\t/g, '').trim(); } catch (e) { }

            // 线路名（含引擎自身的去重加后缀逻辑，保证条数与播放源一一对应）
            var zzH = A(zzHtml, zzTabs.split(';')[0]) || [];
            var zzMap = {};
            for (var zzi = 0; zzi < zzH.length; zzi++) {
                var zzt = H(zzH[zzi], zzTabText).trim();
                if (!zzt) zzt = '线路空';
                zzMap[zzt] = (zzMap[zzt] || 0) + 1;
                if (zzMap[zzt] > 1) zzt += Number(zzMap[zzt] - 1);
                zzOrig.push(zzt);
            }

            // 选集（每条线路各一组，顺序与 zzOrig 对齐）
            for (var zzi = 0; zzi < zzOrig.length; zzi++) {
                var zzP = _ra(_ra(zzLists, '#idv', zzOrig[zzi]), '#id', zzi);
                var zzVL = [];
                try {
                    var zzL = A(zzHtml, zzP) || [];
                    for (var zzj = 0; zzj < zzL.length; zzj++) {
                        zzVL.push(H(zzL[zzj], zzListText).trim() + '$' + D(zzL[zzj], zzListUrl, MY_URL));
                    }
                } catch (e) { }
                if (typeof forceOrder === 'function') {
                    try { zzVL = forceOrder(zzVL, '', function (x) { return x.split('$')[0]; }); } catch (e) { }
                }
                zzTabList.push(zzVL.join('#'));
            }
        }

        // ===== 删除 / 排序 / 改名（成对操作，保持 from 与 url 对齐）=====
        function _pairDrop(orig, lists, drop) {
            if (!drop || !drop.length) return [orig, lists];
            var o = [], l = [];
            for (var i = 0; i < orig.length; i++) { if (drop.indexOf(i) < 0) { o.push(orig[i]); l.push(lists[i]); } }
            return [o, l];
        }
        function _pairOrder(orig, lists, order) {
            if (!order || !order.length) return [orig, lists];
            var fo = [], fl = [], bo = [], bl = [];
            for (var i = 0; i < orig.length; i++) {
                var hit = false;
                for (var j = 0; j < order.length; j++) { if (orig[i].indexOf(order[j]) >= 0) { hit = true; break; } }
                if (hit) { fo.push(orig[i]); fl.push(lists[i]); } else { bo.push(orig[i]); bl.push(lists[i]); }
            }
            return [fo.concat(bo), fl.concat(bl)];
        }
        var _pd2 = _pairDrop(zzOrig, zzTabList, zzDrop); zzOrig = _pd2[0]; zzTabList = _pd2[1];
        var _po2 = _pairOrder(zzOrig, zzTabList, zzOrder); zzOrig = _po2[0]; zzTabList = _po2[1];

        var zzCI = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮','⑯','⑰','⑱','⑲','⑳'];
        for (var zzk = 0; zzk < zzOrig.length; zzk++) {
            zzOrig[zzk] = zzPrefix ? (zzPrefix + (zzCI[zzk] !== undefined ? zzCI[zzk] : (zzk + 1))) : zzOrig[zzk];
        }

        zzV.vod_play_from = zzOrig.join('$$$');
        zzV.vod_play_url = zzTabList.join('$$$');
        zzV.vod_id = MY_URL;
        VOD = zzV;
    }),

    // 搜索卡片本身就是 <a class="search-result-item">，且 token 必须现取，所以直接写 js
    搜索: $js.toString(() => {
        var _hm = '';
        try { _hm = request(rule.host + '/', { headers: rule.headers }); } catch (e) { }

        // 首页被盾挡住就地解一次 cookie，后续请求自动带上
        if (_hm.indexOf('module-item') < 0 && (_hm.indexOf('cdndefend') >= 0 || _hm.indexOf('a0_0x2a54') >= 0)) {
            var _mc = _hm.match(/a0_0x2a54\s*=\s*\[\s*['"]([0-9A-Fa-f]{40})['"]/);
            if (_mc) {
                var _c = _mc[1], _n = parseInt('0x' + _c.charAt(0), 16);
                for (var _kk = 0; _kk < 300000; _kk++) {
                    var _ss = CryptoJS.SHA1(_c + _kk).toString(CryptoJS.enc.Latin1);
                    if (_ss.charCodeAt(_n) === 0xb0 && _ss.charCodeAt(_n + 1) === 0x0b) {
                        rule.headers['Cookie'] = 'cdndefend_js_cookie=' + _c + _kk;
                        break;
                    }
                }
                try { _hm = request(rule.host + '/', { headers: rule.headers }); } catch (e) { }
            }
        }

        var _tk = '';
        var _mt = _hm.match(/name="t"[^>]*?value="([^"]*)"/);
        if (_mt) _tk = _mt[1];

        var _u = rule.host + '/search?t=' + encodeURIComponent(_tk || 'o9Z8PTQ8spxIqjj4GAVojw==')
            + '&k=' + encodeURIComponent(KEY) + '&page=' + MY_PAGE;
        var _h = '';
        try { _h = request(_u, { headers: rule.headers }); } catch (e) { }

        var _out = [];
        if (_h.indexOf('search-result-item') >= 0) {
            var _re = /<a\s([^>]*?class="[^"]*search-result-item[^"]*"[^>]*)>([\s\S]*?)<\/a>/g, _m;
            while ((_m = _re.exec(_h)) !== null) {
                var _at = _m[1], _card = _m[2];
                var _hr = _at.match(/href="([^"]+)"/);
                var _href = _hr ? _hr[1] : '';
                var _nm = (_card.match(/<div class="title">([^<]*)<\/div>/) || ['', ''])[1];
                if (!_nm) continue;
                var _pics = _card.match(/data-original="([^"]+)"/g) || [];
                var _pic = '';
                for (var _i = 0; _i < _pics.length; _i++) {
                    var _v = _pics[_i].replace(/^data-original="/, '').replace(/"$/, '');
                    if (_v.indexOf('placeholder') < 0 && _v.indexOf('esadj.com') < 0 && _v.indexOf('logo_') < 0) { _pic = _v; break; }
                }
                if (!_pic && _pics.length) _pic = _pics[0].replace(/^data-original="/, '').replace(/"$/, '');
                var _ty = (_card.match(/search-result-item-header">\s*<div>([^<]*)<\/div>/) || ['', ''])[1];
                var _yr = (_card.match(/<span>([^<]*)<\/span>/) || ['', ''])[1];
                _out.push({
                    title: _nm,
                    url: _href.indexOf('http') === 0 ? _href : rule.host + _href,
                    pic_url: _pic.indexOf('http') === 0 ? _pic : rule.host + _pic,
                    desc: [_yr, _ty].filter(function (x) { return x; }).join(' / ')
                });
            }
        }

        if (typeof setResult === 'function') {
            setResult(_out);
        } else {
            VODS = _out.map(function (_o) {
                return { vod_id: _o.url, vod_name: _o.title, vod_pic: _o.pic_url, vod_remarks: _o.desc, vod_content: '' };
            });
        }
    }),

    // 播放页把 m3u8 写在 playSource.src 里，直接取；取不到就交给内置解析
    lazy: $js.toString(() => {
        var _h = '';
        try { _h = request(input, { headers: rule.headers }); } catch (e) { }
        var _m = _h.match(/playSource[\s\S]{0,600}?src:\s*"(https?:\/\/[^"]+\.m3u8[^"]*)"/);
        input = _m ? { parse: 0, url: _m[1], header: rule.headers }
                   : { parse: 1, url: input };
    })
};
