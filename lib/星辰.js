// 星辰5 —— 影视站网页源·选择器规则式（产源工具生成）
// 写法完全对齐公开在跑的 drpy2 源（农民影视/voflix 同款合约）：
// 列表/分类/详情/搜索全部用选择器字符串交给引擎原生解析——分类换号、链接拼全、翻页
// 都是引擎自带能力，几千个在跑的源长期验证；不再走手写 JS 钩子（那是之前反复踩坑的层面）。
var rule = {
    title: '星辰8',
    host: 'https://154.201.89.148',
    homeUrl: 'https://154.201.89.148/',
    url: '/v/fyclass.html',
    class_name: '电影&电视剧&综艺&动漫&短剧',
    class_url: '1&2&3&4&5',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    timeout: 8000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Host': 'www.xcyycn.cc'
    },
    play_parse: true,
    lazy: `js:
var html = request(input, { headers: { 'Host': 'www.xcyycn.cc' } });
    var u = '';
    try { var j = JSON.parse(html.match(/r player_.*?=(.*?)</)[1]); u = j.url; if (j.encrypt == '1') { u = unescape(u) } else if (j.encrypt == '2') { u = unescape(base64Decode(u)) } } catch (e) {}
    if (!/\\.m3u8|\\.mp4/.test(u || '')) { var m = html.match(/https?:\\/\\/[^"'<>\\s]+\\.m3u8[^"'<>\\s]*/); if (m) { u = m[0] } }
    if (!/\\.m3u8|\\.mp4/.test(u || '')) { var m2 = html.match(/https?:\\/\\/[^"'<>\\s]+\\.mp4[^"'<>\\s]*/); if (m2) { u = m2[0] } }
    if (/\\.m3u8|\\.mp4/.test(u || '')) { input = { jx: 0, url: u, parse: 0 } } else { input }`,
    推荐: '.public-list-box;.time-title&&Text;img&&data-src;.public-list-prb&&Text;a&&href',
    一级: '.public-list-box;.time-title&&Text;img&&data-src;.public-list-prb&&Text;a&&href',
    二级: {"title": ".slide-info-title&&Text", "img": "img&&data-src", "desc": ".slide-info-remarks&&Text;.slide-info-remarks:eq(1)&&Text", "content": "#height_limit&&Text", "tabs": ".anthology-tab a", "lists": ".anthology-list-play:eq(#id) li", "tab_text": "body&&Text", "list_text": "body&&Text", "list_url": "a&&href"},
    searchUrl: '/s.html?wd=**',
    搜索: '.public-list-box;.time-title&&Text;img&&data-src;.public-list-prb&&Text;a&&href',
};
