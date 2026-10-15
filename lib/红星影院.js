var rule = {
    title: '红星影院',
    host: 'https://www.fanghuxiang.com',
    homeUrl: 'https://www.fanghuxiang.com/https://www.fanghuxiang.com/',
    url: 'fyclass',
    class_name: '电影&电视剧&综艺片&动漫片&预告片&体育赛事&短剧大全&电影解说',
    class_url: '/lstd/dianying-fypage.html&/lstd/dianshiju-fypage.html&/lstd/zongyipian-fypage.html&/lstd/dongmanpian-fypage.html&/lstd/yugaopian-fypage.html&/lstd/tiyusaishi-fypage.html&/lstd/duanjudaquan-fypage.html&/lstd/dianyingjieshuo-fypage.html',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    play_parse: true,
    timeout: 8000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
    },
    推荐: '.col-xs-4;.name h3 a&&Text;.img-wrapper&&data-original;.item-status&&Text;.pic a&&href',
    一级: '.col-xs-4;.name h3 a&&Text;.img-wrapper&&data-original;.item-status&&Text;.pic a&&href',
    搜索: '.col-xs-4;.name h3 a&&Text;.img-wrapper&&data-original;.item-status&&Text;.pic a&&href',
    searchUrl: '/msfw/search/-------------.html?wd=**',
    二级: {"title":".info h3&&Text","img":".vod-info .pic .lazyload&&data-original","desc":".vod-info&&Text","content":".vod-info&&Text","tabs":".ewave-tab","lists":".ewave-playlist-content:eq(#id) .ewave-playlist-item","tab_text":"body&&Text","list_text":"body&&Text","list_url":".text-overflow&&href"},
    lazy: `js:
var resp = request(input, { headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Referer': (input.indexOf('http') === 0 ? input.substring(0, input.indexOf('/', 8) + 1) : '')
} });
var html = (typeof resp === 'string') ? resp : String((resp && (resp.content || resp.body)) || '');
var u = '';
try {
    var ms = html.match(/var\\s+[A-Za-z_$][\\w$]*\\s*=\\s*\\{[\\s\\S]*?\\}\\s*;?\\s*</g) || [];
    for (var i = 0; i < ms.length; i++) {
        try {
            var s = ms[i].substring(ms[i].indexOf('{'), ms[i].lastIndexOf('}') + 1);
            var j = JSON.parse(s);
            if (j && j.url) { u = j.url; if (j.encrypt == '1') { u = unescape(u); } else if (j.encrypt == '2') { u = unescape(base64Decode(u)); } }
        } catch (e2) { }
        if (/\\.m3u8|\\.mp4/.test(u || '')) { break; }
    }
} catch (e) { }
html = html.split('\\\\/').join('/');
if (!/\\.m3u8|\\.mp4/.test(u || '')) {
    var m1 = html.match(/https?:\\/\\/[^'"<>\\s]+\\.m3u8[^'"<>\\s]*/);
    if (m1) { u = m1[0]; }
}
if (!/\\.m3u8|\\.mp4/.test(u || '')) {
    var m2 = html.match(/https?:\\/\\/[^'"<>\\s]+\\.mp4[^'"<>\\s]*/);
    if (m2) { u = m2[0]; }
}
if (/\\.m3u8|\\.mp4/.test(u || '')) { input = { jx: 0, url: u, parse: 0, header: { 'Referer': (input.indexOf('http') === 0 ? input.substring(0, input.indexOf('/', 8) + 1) : '') } }; } else { input; }
`
};
