var rule={
    title: 'www.xingying78.com',
    host: 'https://www.xingying78.com',
    url: 'https://www.xingying78.com/kslist/fyclass-fypage.html',
    searchUrl: 'https://www.xingying78.com/search.php?searchword=**',
    searchable: 2,
    quickSearch: 0,
    filterable: 0,
    filter: '',
    filter_url: '',
    filter_def: {},
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 10000,
    class_url: '1&2&3&4',
    class_name: '电影&电视剧&综艺&动漫',
    class_parse: '',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = fetch(input, fetch_params);
        let m = html.match(/https?:\/\/[^"'\s<>]*?\.(?:m3u8|mp4)[^"'\s<>]*/i);
        input = { url: m ? m[0] : input, parse: 0 };
    }),
    double: true,
    推荐: 'li[class*="col-"];a&&title;a&&data-original;a&&Text;a&&href',
    一级: 'li[class*="col-"];a&&title;a&&data-original;a&&Text;a&&href',
    二级: $js.toString(() => {
        let html = fetch(input, fetch_params);
        let name = pdfh(html, 'h1&&Text') || '';
        let pic = pd(html, 'a[data-original]&&data-original') || pd(html, 'a&&data-original') || pd(html, 'img[data-original]&&data-original') || pd(html, 'img&&src') || '';
        if (!pic) {
            let st = pdfh(html, 'a&&style');
            let sm = st.match(/url\(["']?([^)"']+)/);
            pic = sm ? sm[1] : '';
        }
        let list = pdfa(html, 'a[href*="ksplay"]');
        let lines = {};
        list.forEach(function(it) {
            let outer = (it && typeof it.toString === 'function') ? it.toString() : String(it);
            let hm = outer.match(/href=["']([^"']*ksplay[^"']*)["']/i);
            if (!hm) return;
            let u = hm[1];
            let tm = outer.match(/title=["']([^"']*)["']/i);
            let t = tm ? tm[1] : (outer.replace(/<[^>]+>/g, '')).trim();
            let mm = u.match(/ksplay\/(\d+)-(\d+)-(\d+)/);
            if (!mm) return;
            let line = mm[2];
            if (!lines[line]) lines[line] = [];
            if (u.indexOf('http') !== 0) u = rule.host + u;
            lines[line].push(t + '$' + u);
        });
        const lineMap = {
            "1": "君子兰一线",
            "2": "君子兰二线",
            "3": "君子兰三线",
            "4": "君子兰四线"
        };
        let froms = [], urls = [];
        Object.keys(lines).sort((a, b) => Number(a) - Number(b)).forEach(function(k) {
            let lineName = lineMap[k] || ("备用" + k);
            froms.push(lineName);
            urls.push(lines[k].join('#'));
        });
        VOD = {
            vod_name: name,
            vod_pic: pic,
            vod_play_from: froms.join('$$$'),
            vod_play_url: urls.join('$$$')
        };
    }),
    搜索: $js.toString(() => {
        let html = fetch(input, fetch_params);
        let d = [];
        let re = /<div class="thumb">([\s\S]*?)<\/div>\s*<div class="detail">([\s\S]*?)<\/div>/g;
        let m;
        while ((m = re.exec(html)) !== null) {
            let thumb = m[1];
            let detail = m[2];
            let t = (detail.match(/<a[^>]*class="searchkey"[^>]*>([^<]*)<\/a>/i) || ['', ''])[1].trim();
            if (!t) t = (detail.match(/<h4[^>]*class="[^"]*title[^"]*"[^>]*>[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i) || ['', ''])[1].replace(/<[^>]+>/g, '').trim();
            let u = (detail.match(/<a[^>]*class="searchkey"[^>]*href="([^"]*?)"/i) || ['', ''])[1].trim();
            if (!u) u = (thumb.match(/<a[^>]*href="([^"]*?)"/i) || ['', ''])[1].trim();
            let img = (thumb.match(/data-original="([^"]*?)"/i) || thumb.match(/src="([^"]*?)"/i) || ['', ''])[1].trim();
            if (u && u.indexOf('http') !== 0) u = rule.host + u;
            if (t && u) d.push({ title: t, vod_name: t, img: img, url: u });
        }
        setResult(d);
    })
}
