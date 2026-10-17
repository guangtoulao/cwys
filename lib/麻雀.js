var rule = {
    title: '麻雀视频',
    编码: 'utf-8',
    搜索编码: 'utf-8',
    host: 'https://www.mqtv.fun',
    hostJs: '',
    homeUrl: '/',
    url: '/type/fyclass',
    detailUrl: '',
    searchUrl: '/search/**',
    searchable: 1,
    quickSearch: 1,
    filterable: 1,
    filter_url: '',
    // 筛选菜单（值就是接口参数，cat/year/area/rank）
    filter: {
        movie: [
            { key: 'rank', name: '排序', value: [
                { n: '最近热映', v: 'rankhot' }, { n: '最近上映', v: 'ranklatest' }, { n: '最受好评', v: 'rankpoint' } ] },
            { key: 'cat', name: '类型', value: [
                { n: '全部', v: '' }, { n: '喜剧', v: '喜剧' }, { n: '爱情', v: '爱情' }, { n: '动作', v: '动作' }, { n: '恐怖', v: '恐怖' },
                { n: '科幻', v: '科幻' }, { n: '剧情', v: '剧情' }, { n: '犯罪', v: '犯罪' }, { n: '奇幻', v: '奇幻' }, { n: '战争', v: '战争' },
                { n: '悬疑', v: '悬疑' }, { n: '动画', v: '动画' }, { n: '文艺', v: '文艺' }, { n: '伦理', v: '伦理' }, { n: '记录', v: '记录' },
                { n: '传记', v: '传记' }, { n: '歌舞', v: '歌舞' }, { n: '古装', v: '古装' }, { n: '历史', v: '历史' }, { n: '惊悚', v: '惊悚' },
                { n: '其他', v: '其他' } ] },
            { key: 'year', name: '年份', value: [
                { n: '全部', v: '' }, { n: '2021', v: '2021' }, { n: '2020', v: '2020' }, { n: '2019', v: '2019' }, { n: '2018', v: '2018' },
                { n: '2017', v: '2017' }, { n: '2016', v: '2016' }, { n: '2015', v: '2015' }, { n: '2014', v: '2014' }, { n: '2013', v: '2013' },
                { n: '2012', v: '2012' }, { n: '2011', v: '2011' }, { n: '2010', v: '2010' }, { n: '2009', v: '2009' }, { n: '2008', v: '2008' },
                { n: '2007', v: '2007' }, { n: '更早', v: 'other' } ] },
            { key: 'area', name: '地区', value: [
                { n: '全部', v: '' }, { n: '大陆', v: '大陆' }, { n: '美国', v: '美国' }, { n: '香港', v: '香港' }, { n: '台湾', v: '台湾' },
                { n: '韩国', v: '韩国' }, { n: '日本', v: '日本' }, { n: '印度', v: '印度' }, { n: '泰国', v: '泰国' }, { n: '法国', v: '法国' },
                { n: '英国', v: '英国' }, { n: '德国', v: '德国' }, { n: '其他', v: '其他' } ] },
        ],
        tv: [
            { key: 'rank', name: '排序', value: [
                { n: '最近热映', v: 'rankhot' }, { n: '最近上映', v: 'ranklatest' }, { n: '最受好评', v: 'rankpoint' } ] },
            { key: 'cat', name: '类型', value: [
                { n: '全部', v: '' }, { n: '喜剧', v: '喜剧' }, { n: '爱情', v: '爱情' }, { n: '动作', v: '动作' }, { n: '恐怖', v: '恐怖' },
                { n: '科幻', v: '科幻' }, { n: '剧情', v: '剧情' }, { n: '犯罪', v: '犯罪' }, { n: '奇幻', v: '奇幻' }, { n: '战争', v: '战争' },
                { n: '悬疑', v: '悬疑' }, { n: '动画', v: '动画' }, { n: '文艺', v: '文艺' }, { n: '伦理', v: '伦理' }, { n: '记录', v: '记录' },
                { n: '传记', v: '传记' }, { n: '歌舞', v: '歌舞' }, { n: '古装', v: '古装' }, { n: '历史', v: '历史' }, { n: '惊悚', v: '惊悚' },
                { n: '其他', v: '其他' } ] },
            { key: 'year', name: '年份', value: [
                { n: '全部', v: '' }, { n: '2021', v: '2021' }, { n: '2020', v: '2020' }, { n: '2019', v: '2019' }, { n: '2018', v: '2018' },
                { n: '2017', v: '2017' }, { n: '2016', v: '2016' }, { n: '2015', v: '2015' }, { n: '2014', v: '2014' }, { n: '2013', v: '2013' },
                { n: '2012', v: '2012' }, { n: '2011', v: '2011' }, { n: '2010', v: '2010' }, { n: '2009', v: '2009' }, { n: '2008', v: '2008' },
                { n: '2007', v: '2007' }, { n: '更早', v: 'other' } ] },
            { key: 'area', name: '地区', value: [
                { n: '全部', v: '' }, { n: '大陆', v: '大陆' }, { n: '美国', v: '美国' }, { n: '香港', v: '香港' }, { n: '台湾', v: '台湾' },
                { n: '韩国', v: '韩国' }, { n: '日本', v: '日本' }, { n: '印度', v: '印度' }, { n: '泰国', v: '泰国' }, { n: '法国', v: '法国' },
                { n: '英国', v: '英国' }, { n: '德国', v: '德国' }, { n: '其他', v: '其他' } ] },
        ],
        va: [
            { key: 'rank', name: '排序', value: [
                { n: '最近热映', v: 'rankhot' }, { n: '最近上映', v: 'ranklatest' }, { n: '最受好评', v: 'rankpoint' } ] },
            { key: 'cat', name: '类型', value: [
                { n: '全部', v: '' }, { n: '喜剧', v: '喜剧' }, { n: '爱情', v: '爱情' }, { n: '动作', v: '动作' }, { n: '恐怖', v: '恐怖' },
                { n: '科幻', v: '科幻' }, { n: '剧情', v: '剧情' }, { n: '犯罪', v: '犯罪' }, { n: '奇幻', v: '奇幻' }, { n: '战争', v: '战争' },
                { n: '悬疑', v: '悬疑' }, { n: '动画', v: '动画' }, { n: '文艺', v: '文艺' }, { n: '伦理', v: '伦理' }, { n: '记录', v: '记录' },
                { n: '传记', v: '传记' }, { n: '歌舞', v: '歌舞' }, { n: '古装', v: '古装' }, { n: '历史', v: '历史' }, { n: '惊悚', v: '惊悚' },
                { n: '其他', v: '其他' } ] },
            { key: 'year', name: '年份', value: [
                { n: '全部', v: '' }, { n: '2021', v: '2021' }, { n: '2020', v: '2020' }, { n: '2019', v: '2019' }, { n: '2018', v: '2018' },
                { n: '2017', v: '2017' }, { n: '2016', v: '2016' }, { n: '2015', v: '2015' }, { n: '2014', v: '2014' }, { n: '2013', v: '2013' },
                { n: '2012', v: '2012' }, { n: '2011', v: '2011' }, { n: '2010', v: '2010' }, { n: '2009', v: '2009' }, { n: '2008', v: '2008' },
                { n: '2007', v: '2007' }, { n: '更早', v: 'other' } ] },
            { key: 'area', name: '地区', value: [
                { n: '全部', v: '' }, { n: '大陆', v: '大陆' }, { n: '美国', v: '美国' }, { n: '香港', v: '香港' }, { n: '台湾', v: '台湾' },
                { n: '韩国', v: '韩国' }, { n: '日本', v: '日本' }, { n: '印度', v: '印度' }, { n: '泰国', v: '泰国' }, { n: '法国', v: '法国' },
                { n: '英国', v: '英国' }, { n: '德国', v: '德国' }, { n: '其他', v: '其他' } ] },
        ],
        ct: [
            { key: 'rank', name: '排序', value: [
                { n: '最近热映', v: 'rankhot' }, { n: '最近上映', v: 'ranklatest' }, { n: '最受好评', v: 'rankpoint' } ] },
            { key: 'cat', name: '类型', value: [
                { n: '全部', v: '' }, { n: '喜剧', v: '喜剧' }, { n: '爱情', v: '爱情' }, { n: '动作', v: '动作' }, { n: '恐怖', v: '恐怖' },
                { n: '科幻', v: '科幻' }, { n: '剧情', v: '剧情' }, { n: '犯罪', v: '犯罪' }, { n: '奇幻', v: '奇幻' }, { n: '战争', v: '战争' },
                { n: '悬疑', v: '悬疑' }, { n: '动画', v: '动画' }, { n: '文艺', v: '文艺' }, { n: '伦理', v: '伦理' }, { n: '记录', v: '记录' },
                { n: '传记', v: '传记' }, { n: '歌舞', v: '歌舞' }, { n: '古装', v: '古装' }, { n: '历史', v: '历史' }, { n: '惊悚', v: '惊悚' },
                { n: '其他', v: '其他' } ] },
            { key: 'year', name: '年份', value: [
                { n: '全部', v: '' }, { n: '2021', v: '2021' }, { n: '2020', v: '2020' }, { n: '2019', v: '2019' }, { n: '2018', v: '2018' },
                { n: '2017', v: '2017' }, { n: '2016', v: '2016' }, { n: '2015', v: '2015' }, { n: '2014', v: '2014' }, { n: '2013', v: '2013' },
                { n: '2012', v: '2012' }, { n: '2011', v: '2011' }, { n: '2010', v: '2010' }, { n: '2009', v: '2009' }, { n: '2008', v: '2008' },
                { n: '2007', v: '2007' }, { n: '更早', v: 'other' } ] },
            { key: 'area', name: '地区', value: [
                { n: '全部', v: '' }, { n: '大陆', v: '大陆' }, { n: '美国', v: '美国' }, { n: '香港', v: '香港' }, { n: '台湾', v: '台湾' },
                { n: '韩国', v: '韩国' }, { n: '日本', v: '日本' }, { n: '印度', v: '印度' }, { n: '泰国', v: '泰国' }, { n: '法国', v: '法国' },
                { n: '英国', v: '英国' }, { n: '德国', v: '德国' }, { n: '其他', v: '其他' } ] },
        ],
    },
    filter_def: {
        movie: { rank: 'rankhot' },
        tv: { rank: 'rankhot' },
        va: { rank: 'rankhot' },
        ct: { rank: 'rankhot' },
    },
    headers: {
        'User-Agent': PC_UA,
    },
    timeout: 8000,
    class_name: '电影&电视剧&综艺&动漫',
    class_url: 'movie&tv&va&ct',
    class_parse: '',
    cate_exclude: '',
    tab_exclude: '',
    tab_remove: [],
    tab_order: [],
    tab_rename: {},
    play_parse: true,
    // lazy 已经把直链解出来了，这里强制"直接播放、不丢解析器"
    play_json: [{ re: '*', json: { jx: 0, parse: 0 } }],
    pagecount: {},
    lazy: `js:
// ================= 免嗅解析（lazy） =================
// 引擎给我们的输入 input = 二级里某一集的播放地址（player.mcue.cc 的页面）
// 我们要做：请求这个播放页 → 取出密文和两个 meta id → 算出密钥 → AES 解密 → 真实 m3u8
// 算完后把 input 换成真实直链，引擎就会直接播放
try {
    if (/player\\.mcue\\.cc/.test(input)) {
        var html = request(input, {headers: {'User-Agent': PC_UA, 'Referer': 'https://www.mqtv.fun/'}});
        var enc = (html.match(/"url":\\s*"([^"]+)"/) || [])[1];
        var cs = (html.match(/meta charset="UTF-8" id="(now_[^"]+)"/) || [])[1];
        var vp = (html.match(/meta name="viewport"[^>]*id="(now_[^"]+)"/) || [])[1];
        if (enc && cs && vp) {
            var real = rule.mqtv_play(enc, cs, vp);
            if (real) {
                input = {url: real, jx: 0, parse: 0, flag: flag};
            }
        }
    }
} catch (e) {
    log('麻雀解析错误: ' + e.message);
}
`,
    limit: 6,
    double: false,
    图片来源: '',
    图片替换: '',
    预处理: '',
    推荐: `js:
// ================= 首页推荐 =================
try {
    var pageHtml = request('https://www.mqtv.fun/', {headers: {'User-Agent': PC_UA}});
    var pid = rule.mqtv_pid(pageHtml);
    var token = rule.mqtv_token(pid);
    var items = [];
    // 优先用站点自己的首页编辑数据（movie/tv/ct/rebo 区；banner 是广告位且没标题，跳过）
    try {
        var j = JSON.parse(request('https://www.mqtv.fun/libs/VodList.api.php?home=index&token=' + encodeURIComponent(token), {headers: {'User-Agent': PC_UA}}));
        ['movie', 'tv', 'ct', 'rebo'].forEach(function(k) {
            var g = (j.data || {})[k];
            (g && g.show || []).forEach(function(it) {
                if (it.title && it.url) {
                    items.push({
                        url: 'https://www.mqtv.fun' + it.url,
                        title: it.title,
                        pic_url: it.img,
                        desc: it.remark || '',
                        content: it.des || '',
                    });
                }
            });
        });
    } catch (e) {}
    // 编辑数据不够 10 条时，用各大分类的热播榜补足（这个接口永远有数据）
    if (items.length < 10) {
        ['movie', 'tv', 'ct'].forEach(function(t) {
            try {
                var j2 = JSON.parse(request('https://www.mqtv.fun/libs/VodList.api.php?type=' + t + '&rank=rankhot&cat=&year=&area=&page=1&token=' + encodeURIComponent(token), {headers: {'User-Agent': PC_UA}}));
                (j2.data || []).forEach(function(it) {
                    if (items.length < 20) {
                        items.push({
                            url: 'https://www.mqtv.fun' + it.url,
                            title: it.title,
                            pic_url: it.img,
                            desc: it.remark || '',
                            content: it.des || '',
                        });
                    }
                });
            } catch (e) {}
        });
    }
    setResult(items);
} catch (e) {
    log('麻雀推荐错误: ' + e.message);
    setResult([]);
}
`,
    一级: `js:
// ================= 一级：分类列表 =================
// 引擎给我们的变量：MY_CATE=分类id(movie/tv/va/ct) MY_PAGE=页码 MY_FL=筛选值对象
try {
    var type = MY_CATE || 'movie';
    var page = MY_PAGE || 1;
    var fl = MY_FL || {};
    var rank = fl.rank || 'rankhot';
    var cat = fl.cat || '';
    var year = fl.year || '';
    var area = fl.area || '';
    // 第一步：拉分类页，从 HTML 里挖 pageid（算 token 的原料，每次现挖）
    var pageHtml = request('https://www.mqtv.fun/type/' + type, {headers: {'User-Agent': PC_UA}});
    var pid = rule.mqtv_pid(pageHtml);
    // 第二步：算 token，调列表接口
    var api = 'https://www.mqtv.fun/libs/VodList.api.php?type=' + type
        + '&rank=' + rank
        + '&cat=' + encodeURIComponent(cat)
        + '&year=' + encodeURIComponent(year)
        + '&area=' + encodeURIComponent(area)
        + '&page=' + page
        + '&token=' + encodeURIComponent(rule.mqtv_token(pid));
    var j = JSON.parse(request(api, {headers: {'User-Agent': PC_UA}}));
    var items = (j.data || []).map(function(it) {
        return {
            url: 'https://www.mqtv.fun' + it.url,
            title: it.title,
            pic_url: it.img,
            desc: it.remark || '',
            content: it.des || '',
        };
    });
    setResult(items);
} catch (e) {
    log('麻雀一级错误: ' + e.message);
    setResult([]);
}
`,
    二级访问前: '',
    二级: `js:
// ================= 二级：详情 + 播放线路 =================
// 引擎给我们的变量：MY_URL = 一级条目的链接（https://www.mqtv.fun/play/ct/24345）
try {
    var m = MY_URL.match(/\\/play\\/(\\w+)\\/(\\d+)/);
    if (!m) {
        VOD = {vod_name: '地址解析失败', vod_play_from: '线路', vod_play_url: '播放$' + MY_URL};
    } else {
        var type = m[1], id = m[2];
        var pageHtml = request(MY_URL, {headers: {'User-Agent': PC_UA}});
        var pid = rule.mqtv_pid(pageHtml);
        var api = 'https://www.mqtv.fun/libs/VodInfo.api.php?type=' + type + '&id=' + id
            + '&token=' + encodeURIComponent(rule.mqtv_token(pid));
        var j = JSON.parse(request(api, {headers: {'User-Agent': PC_UA}}));
        var d = j.data || {};
        var playapi = (d.playapi && d.playapi[0] && d.playapi[0].url) || '//player.mcue.cc/fun/?url=';
        if (playapi.indexOf('//') === 0) playapi = 'https:' + playapi;
        var froms = [], urls = [];
        (d.playinfo || []).forEach(function(src) {
            var eps = [];
            (src.player || []).forEach(function(p, i) {
                var name = p.no || ('第' + (i + 1) + '集');
                var playUrl = playapi + p.url + '&dmid=' + type + '_' + id + '_' + (i + 1);
                eps.push(name + '$' + playUrl);
            });
            froms.push(src.cnsite || ('线路' + (froms.length + 1)));
            urls.push(eps.join('#'));
        });
        if (!froms.length) { froms = ['线路']; urls = ['播放$' + MY_URL]; }
        VOD = {
            vod_id: MY_URL,
            vod_name: d.title || '',
            vod_pic: d.img || '',
            vod_remarks: d.remark || '',
            vod_year: d.year || '',
            vod_area: (d.area || '').trim(),
            vod_actor: d.actor || '',
            vod_director: d.director || '',
            vod_content: [d.director ? '导演：' + d.director : '', d.actor ? '主演：' + d.actor : '']
                .filter(function(s) { return s; }).join('\\n'),
            vod_play_from: froms.join('$$$'),
            vod_play_url: urls.join('$$$'),
        };
    }
} catch (e) {
    log('麻雀二级错误: ' + e.message);
    VOD = {vod_name: '详情获取失败', vod_play_from: '线路', vod_play_url: '播放$' + MY_URL};
}
`,
    搜索: `js:
// ================= 搜索 =================
// 引擎给我们的变量：KEY = 搜索词
try {
    var kw = KEY;
    var pageHtml = request('https://www.mqtv.fun/search/' + encodeURIComponent(kw), {headers: {'User-Agent': PC_UA}});
    var pid = rule.mqtv_pid(pageHtml);
    var api = 'https://www.mqtv.fun/libs/VodList.api.php?search=' + encodeURIComponent(kw)
        + '&token=' + encodeURIComponent(rule.mqtv_token(pid));
    var j = JSON.parse(request(api, {headers: {'User-Agent': PC_UA}}));
    // 搜索接口的 data 是一段加密字符串，解出来是 {vod_all:[{show:[...]}]}
    var dec = rule.mqtv_jsdecode(j.data);
    var items = [];
    (dec.vod_all || []).forEach(function(g) {
        (g.show || []).forEach(function(it) {
            items.push({
                url: 'https://www.mqtv.fun' + it.url,
                title: it.title,
                pic_url: it.img,
                desc: it.remark || '',
                content: it.cont || '',
            });
        });
    });
    setResult(items);
} catch (e) {
    log('麻雀搜索错误: ' + e.message);
    setResult([]);
}
`,
    proxy_rule: '',
    sniffer: 0,
    isVideo: `js:
input = /\\.(m3u8|mp4|flv|ts)$/.test(input);
`,

    // ============================================================
    //  共享工具函数（挂在 rule 上，各个 js 字段里用 rule.xxx() 调用）
    // ============================================================

    // ---------- base64 编码（字节数组 → 字符串） ----------
    mqtv_b64e: function(bytes) {
        var m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var out = '';
        for (var i = 0; i < bytes.length; i += 3) {
            var b0 = bytes[i], b1 = bytes[i + 1], b2 = bytes[i + 2];
            out += m[b0 >> 2];
            out += m[((b0 & 3) << 4) | (i + 1 < bytes.length ? b1 >> 4 : 0)];
            out += i + 1 < bytes.length ? m[((b1 & 15) << 2) | (i + 2 < bytes.length ? b2 >> 6 : 0)] : '=';
            out += i + 2 < bytes.length ? m[b2 & 63] : '=';
        }
        return out;
    },

    // ---------- base64 解码（字符串 → 字节数组） ----------
    mqtv_b64d: function(s) {
        var m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var inv = {};
        for (var i = 0; i < m.length; i++) inv[m[i]] = i;
        var bytes = [];
        for (var i = 0; i < s.length; i += 4) {
            var c0 = inv[s[i]], c1 = inv[s[i + 1]], c2 = inv[s[i + 2]], c3 = inv[s[i + 3]];
            bytes.push((c0 << 2) | (c1 >> 4));
            if (s[i + 2] !== '=') bytes.push(((c1 & 15) << 4) | (c2 >> 2));
            if (s[i + 3] !== '=') bytes.push(((c2 & 3) << 6) | c3);
        }
        return bytes;
    },

    // ---------- 字符串 → UTF-8 字节数组 ----------
    mqtv_u8e: function(str) {
        var b = [];
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (c < 0x80) b.push(c);
            else if (c < 0x800) b.push(0xc0 | (c >> 6), 0x80 | (c & 63));
            else b.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 63), 0x80 | (c & 63));
        }
        return b;
    },

    // ---------- UTF-8 字节数组 → 字符串 ----------
    mqtv_u8d: function(bytes) {
        var out = '', i = 0;
        while (i < bytes.length) {
            var b = bytes[i++];
            if (b < 0x80) out += String.fromCharCode(b);
            else if (b < 0xe0) out += String.fromCharCode(((b & 0x1f) << 6) | (bytes[i++] & 0x3f));
            else if (b < 0xf0) out += String.fromCharCode(((b & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f));
            else {
                var cp = ((b & 0x07) << 18) | ((bytes[i++] & 0x3f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f);
                cp -= 0x10000;
                out += String.fromCharCode(0xd800 + (cp >> 10), 0xdc00 + (cp & 0x3ff));
            }
        }
        return out;
    },

    // ---------- 从页面 HTML 里找 pageid ----------
    mqtv_pid: function(html) {
        var m = (html || '').match(/pageid\s*=\s*'([^']+)'/);
        return m ? m[1] : '';
    },

    // ---------- pageid → token（接口的敲门砖） ----------
    // 算法：Base64( XOR( Base64(JSON.stringify(pageid)), "Mcxos@mucho!nmme" ) )
    mqtv_token: function(pid) {
        var key = 'Mcxos@mucho!nmme';
        var s = JSON.stringify(pid);
        var e1 = this.mqtv_b64e(this.mqtv_u8e(s));
        var b2 = this.mqtv_u8e(e1);
        var x = b2.map(function(b, i) { return b ^ key.charCodeAt(i % key.length); });
        return this.mqtv_b64e(x);
    },

    // ---------- 搜索接口加密数据解密 ----------
    // 加密链的逆运算：Base64 → XOR → Base64 → JSON
    mqtv_jsdecode: function(enc) {
        var key = 'Mcxos@mucho!nmme';
        var b1 = this.mqtv_b64d(enc);
        var x = b1.map(function(b, i) { return b ^ key.charCodeAt(i % key.length); });
        var s = this.mqtv_u8d(x);
        var j = this.mqtv_b64d(s);
        return JSON.parse(this.mqtv_u8d(j));
    },

    // ---------- MD5（纯 JS 实现，drpy2 环境里没有现成的） ----------
    mqtv_md5: function(str) {
        var K = [0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
            0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
            0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
            0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
            0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
            0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
            0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
            0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391];
        var SHIFTS = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
            5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
            4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
            6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];
        var msg = this.mqtv_u8e(str);
        var bitlen = msg.length * 8;
        msg.push(0x80);
        while (msg.length % 64 !== 56) msg.push(0);
        var lo = bitlen >>> 0;
        for (var i = 0; i < 4; i++) msg.push((lo >>> (8 * i)) & 0xff);
        for (var i = 0; i < 4; i++) msg.push(0);
        function rol(x, c) { x = x | 0; return ((x << c) | (x >>> (32 - c))) | 0; }
        var h = [0x67452301 | 0, 0xefcdab89 | 0, 0x98badcfe | 0, 0x10325476 | 0];
        for (var blk = 0; blk < msg.length; blk += 64) {
            var M = [];
            for (var j = 0; j < 16; j++) {
                M[j] = (msg[blk + j * 4] | (msg[blk + j * 4 + 1] << 8) | (msg[blk + j * 4 + 2] << 16) | (msg[blk + j * 4 + 3] << 24)) | 0;
            }
            var a = h[0], b = h[1], c = h[2], d = h[3];
            for (var i = 0; i < 64; i++) {
                var f, g;
                if (i < 16) { f = (b & c) | (~b & d); g = i; }
                else if (i < 32) { f = (d & b) | (~d & c); g = (5 * i + 1) % 16; }
                else if (i < 48) { f = b ^ c ^ d; g = (3 * i + 5) % 16; }
                else { f = c ^ (b | ~d); g = (7 * i) % 16; }
                var f2 = (a + f + K[i] + M[g]) | 0;
                var tmp = d; d = c; c = b;
                b = (b + rol(f2, SHIFTS[i])) | 0;
                a = tmp;
            }
            h[0] = (h[0] + a) | 0; h[1] = (h[1] + b) | 0; h[2] = (h[2] + c) | 0; h[3] = (h[3] + d) | 0;
        }
        var out = '';
        for (var w = 0; w < 4; w++) for (var i = 0; i < 4; i++) out += (((h[w] >>> (8 * i)) & 0xff).toString(16)).padStart(2, '0');
        return out;
    },

    // ---------- AES-128-CBC 解密（纯 JS 实现） ----------
    mqtv_aes_cbc: function(key, iv, data) {
        var SB = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
            0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
            0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
            0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
            0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
            0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
            0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
            0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
            0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
            0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
            0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
            0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
            0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
            0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
            0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
            0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
        var RSB = [];
        for (var i = 0; i < 256; i++) RSB[SB[i]] = i;
        var RC = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];
        function xtime(b) { return ((b << 1) ^ ((b & 0x80) ? 0x1b : 0)) & 0xff; }
        function mul(a, b) { var r = 0; while (b) { if (b & 1) r ^= a; a = xtime(a); b >>= 1; } return r & 0xff; }
        function keyExp(key) {
            var w = [];
            for (var i = 0; i < 4; i++) w[i] = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
            for (var i = 4; i < 44; i++) {
                var t = w[i - 1].slice();
                if (i % 4 === 0) {
                    t = [t[1], t[2], t[3], t[0]];
                    for (var j = 0; j < 4; j++) t[j] = SB[t[j]];
                    t[0] ^= RC[i / 4 - 1];
                }
                w[i] = [w[i - 4][0] ^ t[0], w[i - 4][1] ^ t[1], w[i - 4][2] ^ t[2], w[i - 4][3] ^ t[3]];
            }
            return w;
        }
        function decBlk(blk, w) {
            function addRoundKey(s, round) {
                for (var c = 0; c < 4; c++) for (var r = 0; r < 4; r++) s[c * 4 + r] ^= w[round * 4 + c][r];
            }
            var s = [];
            for (var i = 0; i < 16; i++) s[i] = blk[i];
            addRoundKey(s, 10);
            for (var round = 9; round >= 0; round--) {
                var t = s.slice();
                for (var r = 1; r < 4; r++) for (var c = 0; c < 4; c++) t[c * 4 + r] = s[((c - r + 4) % 4) * 4 + r];
                s = t;
                for (var i = 0; i < 16; i++) s[i] = RSB[s[i]];
                addRoundKey(s, round);
                if (round > 0) {
                    for (var c = 0; c < 4; c++) {
                        var a0 = s[c * 4], a1 = s[c * 4 + 1], a2 = s[c * 4 + 2], a3 = s[c * 4 + 3];
                        s[c * 4] = mul(a0, 14) ^ mul(a1, 11) ^ mul(a2, 13) ^ mul(a3, 9);
                        s[c * 4 + 1] = mul(a0, 9) ^ mul(a1, 14) ^ mul(a2, 11) ^ mul(a3, 13);
                        s[c * 4 + 2] = mul(a0, 13) ^ mul(a1, 9) ^ mul(a2, 14) ^ mul(a3, 11);
                        s[c * 4 + 3] = mul(a0, 11) ^ mul(a1, 13) ^ mul(a2, 9) ^ mul(a3, 14);
                    }
                }
            }
            return s;
        }
        var w = keyExp(key);
        var out = [];
        var prev = iv.slice();
        for (var off = 0; off < data.length; off += 16) {
            var blk = data.slice(off, off + 16);
            var dec = decBlk(blk, w);
            for (var i = 0; i < 16; i++) dec[i] ^= prev[i];
            out = out.concat(dec);
            prev = blk;
        }
        var pad = out[out.length - 1];
        if (pad > 0 && pad <= 16) out = out.slice(0, out.length - pad);
        return out;
    },

    // ---------- 播放页解密：密文 + 两个 meta id → 真实播放地址 ----------
    // 密钥推导：charset meta 的 id（去 now_）当"顺序"，viewport meta 的 id（去 now_）当"内容"，
    // 逐字配对后按数字升序排，把内容拼起来 + 盐 "lemon" → MD5 →
    // key = MD5hex 第 17~32 位、iv = MD5hex 第 1~16 位（都是按 UTF-8 字节）
    mqtv_play: function(enc, cs, vp) {
        var C = cs.replace('now_', ''), V = vp.replace('now_', '');
        var its = [];
        for (var i = 0; i < C.length; i++) its.push({ id: C[i], text: V[i] });
        its.sort(function(a, b) { return (parseInt(a.id) || 0) - (parseInt(b.id) || 0); });
        var material = its.map(function(x) { return x.text; }).join('') + 'lemon';
        var md5hex = this.mqtv_md5(material);
        var key = this.mqtv_u8e(md5hex.slice(16));
        var iv = this.mqtv_u8e(md5hex.slice(0, 16));
        var out = this.mqtv_aes_cbc(key, iv, this.mqtv_b64d(enc));
        return this.mqtv_u8d(out);
    },
};
