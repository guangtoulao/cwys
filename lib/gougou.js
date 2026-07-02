var rule = {
    title: '特狗影视',
    host: 'https://www.tegou.run',
    url: '/vodshow/id/fyclass/page/fypage.html',
    searchUrl: '/vod/search.html?wd=**',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
    class_parse: '.stui-header__menu li:gt(0):lt(5);a&&Text;a&&href;.*/(\\d+).html',
    推荐: '.stui-vodlist.clearfix;li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
    double: true,
    一级: '.stui-vodlist li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
    二级: {
        "title": "h1.title&&Text",
        "img": ".vod-poster img.lazyload&&data-original",
        "desc": ".vod-meta span&&Text",
        "content": ".detail-sketch&&Text",
        "tabs": ".nav-tabs li",
        "lists": ".stui-content__playlist:eq(#id) li"
    },
    搜索: '.stui-vodlist li;a&&title;.lazyload&&data-original;.pic-text&&Text;a&&href',
    lazy: `js:
        let html = request(input);
        let pm = html.match(/player_aaaa\\s*=\\s*(\\{[^}]+\\})/);
        if (pm) {
            let pd = JSON.parse(pm[1]);
            let url = pd.url || '';
            let from = pd.from || '';
            if (url && from === 'link') {
                let parseUrl = 'https://www.tegou.run/vid/vr2/vr2.php?url=' + url;
                let parseHtml = request(parseUrl);
                let ppMatch = parseHtml.match(/window\\.__PP\\s*=\\s*(\\{[^<]+\\})/);
                if (ppMatch) {
                    let ppData = JSON.parse(ppMatch[1]);
                    if (ppData.urls) {
                        input = {parse: 0, url: ppData.urls};
                    }
                }
            }
        }
    `,
}
