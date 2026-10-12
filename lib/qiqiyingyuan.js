/**
 * ================================================================
 *  TVBox / 影视仓 spider JS（由 tvg 自动生成，请勿手工编辑）
 *  站点    : 琪琪影院
 *  类型    : html（按页面 HTML 结构 + 正则规则抓取）
 *  生成时间: 2026-10-12 19:15:12
 * ================================================================
 */

var CONFIG = {
  "type": "html",
  "sitename": "琪琪影院",
  "host": "https://www.qiqiyingyuan.net",
  "timeout": 10,
  "headers": {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Referer": "https://www.qiqiyingyuan.net/"
  },
  "categories": [
    {
      "type_id": "11",
      "type_name": "电影"
    },
    {
      "type_id": "1",
      "type_name": "国产剧"
    },
    {
      "type_id": "2",
      "type_name": "韩国剧"
    },
    {
      "type_id": "3",
      "type_name": "欧美剧"
    },
    {
      "type_id": "4",
      "type_name": "日本剧"
    },
    {
      "type_id": "5",
      "type_name": "泰国剧"
    },
    {
      "type_id": "6",
      "type_name": "香港剧"
    },
    {
      "type_id": "7",
      "type_name": "短剧"
    },
    {
      "type_id": "8",
      "type_name": "动漫"
    },
    {
      "type_id": "9",
      "type_name": "综艺"
    },
    {
      "type_id": "10",
      "type_name": "纪录片"
    }
  ],
  "rules": {
    "category_url": "/type/{cid}.html",
    "category_page_url": "/type/{cid}-{pg}.html",
    "search_url": "/vodsearch/-------------.html?wd={wd}",
    "detail_url": "/id/{id}.html",
    "home": {
      "url": "/",
      "items": "<a href=\"/id/(\\d+)\\.html\">[\\s\\S]*?</a>",
      "id": "href=\"/id/(\\d+)\\.html\"",
      "name": "class=\"card-title\">([^<]+)<",
      "pic": "<img src=\"([^\"]+)\"",
      "remarks": "class=\"card-score\">([^<]+)<"
    },
    "category": {
      "items": "<a href=\"/id/(\\d+)\\.html\">[\\s\\S]*?</a>",
      "id": "href=\"/id/(\\d+)\\.html\"",
      "name": "class=\"card-title\">([^<]+)<",
      "pic": "<img src=\"([^\"]+)\"",
      "remarks": "class=\"card-score\">([^<]+)<"
    },
    "search": {
      "items": "<a href=\"/id/(\\d+)\\.html\">[\\s\\S]*?</a>",
      "id": "href=\"/id/(\\d+)\\.html\"",
      "name": "class=\"card-title\">([^<]+)<",
      "pic": "<img src=\"([^\"]+)\"",
      "remarks": "class=\"card-score\">([^<]+)<"
    },
    "detail": {
      "name": "<h1>([^<]+)</h1>",
      "pic": "<meta property=\"og:image\" content=\"([^\"]+)\"",
      "content": "class=\"detail-desc\"[^>]*>([\\s\\S]*?)</div>",
      "remarks": "<strong style=\"color:#ff5722;\">([^<]+)</strong>",
      "sources_from": "class=\"play-source-tab[^\"]*\" data-source=\"\\d+\"[^>]*>([^<]+)<",
      "sources_block": "<div class=\"play-source-content\" data-source=\"(\\d+)\"[^>]*>([\\s\\S]*?)(?=<div class=\"play-source-content\"|<div class=\"detail-section\")",
      "episodes": "<a href=\"(/sid/[0-9-]+\\.html)\" class=\"play-episode-item\"[^>]*>([^<]+)<"
    },
    "player": {
      "url": "player_aaaa[\\s\\S]*?\"url\":\"([^\"]+)\"",
      "resource_host": "https://vip.ffzy-play6.com",
      "url2": [
        "const url = \"([^\"]+)\"",
        "var\\s+main\\s*=\\s*\"([^\"]+)\""
      ],
      "url2_host": "https://vip.ffzy-play6.com"
    }
  },
  "spider_class": "csp_qiqiyingyuan"
};

/* ---------- 基础工具 ---------- */

function _join(base, path) {
    if (!path) return base;
    if (/^https?:\/\//i.test(path)) return path;
    if (path.charAt(0) === '/') {
        return base.replace(/\/+$/, '') + path;
    }
    return base.replace(/\/+$/, '') + '/' + path;
}

function _req(url) {
    var headers = CONFIG.headers || {};
    var timeout = CONFIG.timeout || 8;
    if (typeof req === 'function') {
        try {
            return req(url, { headers: headers, timeout: timeout * 1000 }) || '';
        } catch (e) { return ''; }
    }
    if (typeof http !== 'undefined' && http && typeof http.get === 'function') {
        try {
            var r = http.get(url, { headers: headers, timeout: timeout * 1000 });
            return (r && r.body) ? r.body : '';
        } catch (e) { return ''; }
    }
    return '';
}

function _all(expr) {
    try { return new RegExp(expr, 'gi'); } catch (e) { return null; }
}

function _one(expr) {
    try { return new RegExp(expr, 'i'); } catch (e) { return null; }
}

/* 提取所有完整匹配块 */
function _matchAll(text, expr) {
    var re = _all(expr), out = [], m;
    if (!re || !text) return out;
    while ((m = re.exec(text)) !== null) {
        out.push(m[0]);
        if (m.index === re.lastIndex) re.lastIndex++;
    }
    return out;
}

/* 提取所有匹配，保留每个匹配的全部分组（返回 match 数组列表） */
function _matchAllM(text, expr) {
    var re = _all(expr), out = [], m;
    if (!re || !text) return out;
    while ((m = re.exec(text)) !== null) {
        out.push(m);
        if (m.index === re.lastIndex) re.lastIndex++;
    }
    return out;
}

/* URL 的 origin（scheme://host），用于拼接资源站相对路径 */
function _origin(u) {
    var m = String(u || '').match(/^(https?:\/\/[^\/]+)/i);
    return m ? m[1] : '';
}

/* 提取第一个匹配，取第 1 个捕获组（无捕获组时返回整段匹配） */
function _matchOne(text, expr) {
    var re = _one(expr), m;
    if (!re || !text) return '';
    m = text.match(re);
    if (!m) return '';
    return (m[1] !== undefined && m[1] !== null) ? m[1] : m[0];
}

/* 提取第一个匹配的全部分组（index 0 为整段，1..n 为捕获组） */
function _matchGroups(text, expr) {
    var re = _one(expr), m;
    if (!re || !text) return [];
    m = text.match(re);
    return m || [];
}

/* JSON 字符串中的 \/ 转义还原为 / */
function _jsonUrl(s) {
    return String(s || '').replace(/\\\//g, '/');
}

/* 从 HTML 中解析详情播放：优先按线路分组（sources_block）；
   否则回退单线路。返回 [{from, eps:[{url,name}], }] */
function _detailLines(html, d) {
    var lines = [];
    if (d.sources_block) {
        var blocks = _matchAllM(html, d.sources_block);
        var froms = [];
        if (d.sources_from) {
            var fbs = _matchAll(html, d.sources_from);
            for (var fi = 0; fi < fbs.length; fi++) {
                var fm = _matchGroups(fbs[fi], d.sources_from);
                froms.push(fm[1] || ('线路' + (fi + 1)));
            }
        }
        for (var bi = 0; bi < blocks.length; bi++) {
            var blockHtml = blocks[bi][2] || '';
            var eps = [];
            var ebs = _matchAll(blockHtml, d.episodes);
            for (var ei = 0; ei < ebs.length; ei++) {
                var em = _matchGroups(ebs[ei], d.episodes);
                if (em.length >= 3) {
                    eps.push({ url: em[1], name: (em[2] || '').trim() });
                }
            }
            if (!eps.length) continue;
            lines.push({ from: froms[bi] || ('线路' + (bi + 1)), eps: eps });
        }
        return lines;
    }
    var eps = [];
    var ebs = _matchAll(html, d.episodes);
    for (var i = 0; i < ebs.length; i++) {
        var m = _matchGroups(ebs[i], d.episodes);
        if (m.length >= 3) {
            eps.push({ url: m[1], name: (m[2] || '').trim() });
        }
    }
    if (eps.length) lines.push({ from: d.play_from || '线路1', eps: eps });
    return lines;
}

function _pageResult(list, page, pagecount, total) {
    return {
        code: 0,
        msg: '',
        page: page || 1,
        pagecount: pagecount || 0,
        limit: 0,
        total: total || 0,
        list: list || [],
        filters: {}
    };
}

function _classes() {
    var src = CONFIG.categories || [];
    var out = [];
    for (var i = 0; i < src.length; i++) {
        out.push({ type_id: String(src[i].type_id), type_name: String(src[i].type_name) });
    }
    return out;
}

/* ---------- 列表页解析 ---------- */

/* 从 HTML 中解析一组影片卡：r = {items, id, url?, name, pic, remarks?}
   items 匹配每个卡片的整段；卡片内的 id/url/name/pic/remarks 为正则的捕获组 1。 */
function _catVods(html, r) {
    var out = [];
    if (!r || !r.items || !html) return out;
    var blocks = _matchAll(html, r.items);
    for (var i = 0; i < blocks.length; i++) {
        var it = blocks[i];
        var id = _matchOne(it, r.id);
        if (!id) continue;
        var v = {
            vod_id: id,
            vod_name: _matchOne(it, r.name),
            vod_pic: _matchOne(it, r.pic),
            vod_remarks: r.remarks ? _matchOne(it, r.remarks) : ''
        };
        out.push(v);
    }
    return out;
}

/* ---------- 接口函数（TVBox / 影视仓 spider 约定） ---------- */

function init() { return ''; }

function homeContent(filter) {
    return {
        code: 0, msg: '',
        page: 1, pagecount: 0, limit: 0, total: 0,
        list: [], filters: {},
        classes: _classes()
    };
}

function homeVideoContent() {
    var rules = CONFIG.rules || {};
    if (!rules.home || !rules.home.url) return _pageResult([], 1, 0, 0);
    var html = _req(_join(CONFIG.host, rules.home.url));
    return _pageResult(_catVods(html, rules.home), 1, 0, 0);
}

function categoryContent(tid, pg, filter, extend) {
    var rules = CONFIG.rules || {};
    var pgnum = parseInt(pg, 10) || 1;
    var tpl = rules.category_url;
    if (rules.category_page_url && pgnum > 1) tpl = rules.category_page_url;
    if (!tpl) return _pageResult([], 1, 0, 0);
    var url = _join(CONFIG.host, tpl)
        .replace(/\{cid\}/g, String(tid))
        .replace(/\{pg\}/g, String(pgnum));
    var html = _req(url);
    return _pageResult(_catVods(html, rules.category), pgnum, 0, 0);
}

function detailContent(ids) {
    var rules = CONFIG.rules || {};
    var d = rules.detail || {};
    if (!rules.detail_url) return { list: [] };
    var url = _join(CONFIG.host, rules.detail_url).replace(/\{id\}/g, String(ids));
    var html = _req(url);

    var name = _matchOne(html, d.name);
    var pic = _matchOne(html, d.pic);
    var content = _matchOne(html, d.content);
    var remarks = d.remarks ? _matchOne(html, d.remarks) : '';

    /* 播放列表：支持多线路分组；每集捕获组 1=播放页地址、组 2=集名 */
    var lines = _detailLines(html, d);
    if (!lines.length) return { list: [] };

    var froms = [], urls = [];
    for (var li = 0; li < lines.length; li++) {
        froms.push(lines[li].from);
        var eps = lines[li].eps, seg = [];
        for (var j = 0; j < eps.length; j++) {
            seg.push(eps[j].name + '$' + _join(CONFIG.host, eps[j].url));
        }
        urls.push(seg.join('#'));
    }

    return {
        list: [{
            vod_id: String(ids),
            vod_name: name,
            vod_pic: pic,
            vod_remarks: remarks,
            vod_content: content,
            vod_play_from: froms.join('$$$'),
            vod_play_url: urls.join('$$$')
        }]
    };
}

function searchContent(key, quick) {
    var rules = CONFIG.rules || {};
    if (!rules.search_url || !rules.search || !rules.search.items) {
        return _pageResult([], 1, 0, 0);
    }
    var url = _join(CONFIG.host, rules.search_url)
        .replace(/\{wd\}/g, encodeURIComponent(key))
        .replace(/\{pg\}/g, '1');
    var html = _req(url);
    return _pageResult(_catVods(html, rules.search), 1, 0, 0);
}

function playerContent(flag, id, vipFlags) {
    var rules = CONFIG.rules || {};
    var p = rules.player || {};
    if (!p.url) {
        // 直链源：App 传入的 id 即播放地址
        return { code: 0, msg: '', parse: 0, url: id || '' };
    }
    var pageHtml = _req(id);
    var v = _jsonUrl(_matchOne(pageHtml, p.url));
    if (!v) {
        return { code: 0, msg: '', parse: 0, url: id || '' };
    }
    v = _join(p.resource_host || CONFIG.host, v);
    if (p.url2) {
        var resHtml = _req(v);
        var pats = Object.prototype.toString.call(p.url2) === '[object Array]' ? p.url2 : [p.url2];
        var m = '', pi;
        for (pi = 0; pi < pats.length; pi++) {
            m = _jsonUrl(_matchOne(resHtml, pats[pi]));
            if (m) break;
        }
        if (!m) {
            return { code: 0, msg: '', parse: 0, url: v };
        }
        /* 资源站域名以 share URL 自身 origin 为准，兼容多个资源站 */
        m = _join(_origin(v) || p.url2_host || p.resource_host || CONFIG.host, m);
        return { code: 0, msg: '', parse: 0, url: m };
    }
    return { code: 0, msg: '', parse: 0, url: v };
}

/* ---------- 影视仓 / CatVodJS 类注册 ----------
   类名须与单仓 JSON 配置中 sites[].key 一致（如 csp_qiqiyingyuan）；
   sites[].api 则填本 JS 文件的完整 http(s) 地址（以 .js 结尾）。
   影视仓通过该对象实例化 spider，再调用 homeContent/categoryContent
   /detailContent/searchContent/playerContent 等约定接口。 */
var csp_qiqiyingyuan = {
    init: init,
    homeContent: homeContent,
    homeVideoContent: homeVideoContent,
    categoryContent: categoryContent,
    detailContent: detailContent,
    searchContent: searchContent,
    playerContent: playerContent
};