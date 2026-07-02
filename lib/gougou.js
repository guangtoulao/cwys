// drpy爬虫脚本 - 特狗影视
// 目标站点: https://www.tegou.run
// CMS类型: stui
// 由TVBox接口生成器自动生成

var rules = {
    规则名: '特狗影视',
    作者: 'TVBox接口生成器',
    请求头: 'User-Agent$Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    编码: 'utf-8',
    图片代理: false,

    分类url: 'https://www.tegou.run/vodtype/{cateId}/page/{catePg}.html',
    分类: '电影$1#电视剧$2#动漫$3#综艺$4',
}

function init() {}

function home(filter) {
    let classes = [];
    let cateList = rules.分类.split('#');
    for (let i = 0; i < cateList.length; i++) {
        let parts = cateList[i].split('$');
        if (parts.length === 2) {
            classes.push({ 'type_id': parts[1], 'type_name': parts[0] });
        }
    }
    return JSON.stringify({ 'class': classes, 'filters': {} });
}

function homeVod() {
    let html = request('https://www.tegou.run/');
    let items = [];
    let list = pdfa(html, '.module-items .module-item');
    if (!list || list.length === 0) list = pdfa(html, '.module-item');
    if (!list || list.length === 0) list = pdfa(html, '.stui-vodlist__box, .vod-item, .movie-item');
    for (let i = 0; i < Math.min(list.length, 30); i++) {
        let item = list[i];
        let link = pd(item, 'a&&href');
        let title = pdfh(item, 'a&&title') || pdfh(item, 'a&&Text');
        let cover = pdfh(item, '.lazyload&&data-original') || pdfh(item, 'img&&data-original') || pdfh(item, 'img&&src') || '';
        let remark = pdfh(item, '.module-item-note&&Text') || pdfh(item, '.pic-text&&Text') || '';
        if (link && title) {
            if (cover && !cover.startsWith('http')) cover = 'https://www.tegou.run' + cover;
            items.push({ 'vod_id': link, 'vod_name': title, 'vod_pic': cover, 'vod_remarks': remark });
        }
    }
    return JSON.stringify(items);
}

function category(tid, pg, filter, extend) {
    let url = 'https://www.tegou.run/vodtype/' + tid + '/page/' + pg + '.html';
    let html = request(url);
    let items = [];
    let list = pdfa(html, '.module-items .module-item');
    if (!list || list.length === 0) list = pdfa(html, '.module-item');
    if (!list || list.length === 0) list = pdfa(html, '.stui-vodlist__box, .vod-item, .movie-item');
    for (let i = 0; i < Math.min(list.length, 40); i++) {
        let item = list[i];
        let link = pd(item, 'a&&href');
        let title = pdfh(item, 'a&&title') || pdfh(item, 'a&&Text');
        let cover = pdfh(item, '.lazyload&&data-original') || pdfh(item, 'img&&data-original') || '';
        let remark = pdfh(item, '.module-item-note&&Text') || pdfh(item, '.pic-text&&Text') || '';
        if (link && title) {
            if (cover && !cover.startsWith('http')) cover = 'https://www.tegou.run' + cover;
            items.push({ 'vod_id': link, 'vod_name': title, 'vod_pic': cover, 'vod_remarks': remark });
        }
    }
    return JSON.stringify(items);
}

function detail(vod_url) {
    let html = request(vod_url);
    let VOD = {
        vod_id: vod_url,
        vod_name: pdfh(html, 'h1&&Text') || '',
        vod_pic: '',
        vod_content: '',
        vod_play_from: '',
        vod_play_url: ''
    };
    VOD.vod_pic = pdfh(html, '.lazyload&&data-original') || pdfh(html, 'img&&data-original') || '';
    if (VOD.vod_pic && !VOD.vod_pic.startsWith('http')) VOD.vod_pic = 'https://www.tegou.run' + VOD.vod_pic;
    VOD.vod_content = pdfh(html, '.vod_content&&Text') || pdfh(html, '.module-info-introduction-content&&Text') || pdfh(html, '.stui-content__detail p&&Text') || '';

    // 播放源
    let tabs = pdfa(html, '.module-tab-item');
    let playFroms = [];
    if (tabs && tabs.length > 0) {
        for (let t of tabs) {
            let name = pdfh(t, 'Text');
            if (name) playFroms.push(name);
        }
    } else {
        tabs = pdfa(html, '.tab-item');
        if (tabs && tabs.length > 0) {
            for (let t of tabs) {
                let name = pdfh(t, 'Text');
                if (name) playFroms.push(name);
            }
        }
    }
    if (playFroms.length === 0) playFroms.push('高清C');

    // 播放列表
    let allPlayUrls = [];
    let containers = pdfa(html, '.module-tab-content, .module-play-list, .playlist, .stui-content__playlist');
    if (containers && containers.length > 0) {
        for (let c of containers) {
            let links = pdfa(c, 'a[href*="/vodplay/"], a[href*="/play/"]');
            let epList = [];
            for (let i = 0; links && i < links.length; i++) {
                let name = pdfh(links[i], 'Text') || ('第' + (i+1) + '集');
                let href = pd(links[i], 'href');
                if (href) {
                    if (!href.startsWith('http')) href = 'https://www.tegou.run' + href;
                    epList.push(name + '$' + href);
                }
            }
            if (epList.length > 0) allPlayUrls.push(epList.join('#'));
        }
    }
    if (allPlayUrls.length === 0) {
        let links = pdfa(html, 'a[href*="/vodplay/"], a[href*="/play/"]');
        let epList = [];
        for (let i = 0; links && i < links.length; i++) {
            let name = pdfh(links[i], 'Text') || ('第' + (i+1) + '集');
            let href = pd(links[i], 'href');
            if (href) {
                if (!href.startsWith('http')) href = 'https://www.tegou.run' + href;
                epList.push(name + '$' + href);
            }
        }
        if (epList.length > 0) allPlayUrls.push(epList.join('#'));
    }

    VOD.vod_play_from = playFroms.join('$$$');
    VOD.vod_play_url = allPlayUrls.join('$$$');
    return JSON.stringify({ 'list': [VOD] });
}

function search(wd, quick) {
    let searchUrl = 'https://www.tegou.run/vod/search.html?wd=' + encodeURIComponent(wd);
    let html = request(searchUrl);
    let items = [];
    let list = pdfa(html, '.module-items .module-item') || pdfa(html, '.module-item');
    if (!list || list.length === 0) list = pdfa(html, '.stui-vodlist__box, .vod-item, .movie-item');
    for (let i = 0; i < Math.min(list.length, 30); i++) {
        let item = list[i];
        let link = pd(item, 'a&&href');
        let title = pdfh(item, 'a&&title') || pdfh(item, 'a&&Text');
        let cover = pdfh(item, '.lazyload&&data-original') || '';
        let remark = pdfh(item, '.module-item-note&&Text') || '';
        if (link && title) {
            if (cover && !cover.startsWith('http')) cover = 'https://www.tegou.run' + cover;
            items.push({ 'vod_id': link, 'vod_name': title, 'vod_pic': cover, 'vod_remarks': remark });
        }
    }
    return JSON.stringify(items);
}

function play(flag, id, flags) {
    let result = { 'parse': 0, 'url': id };
    try {
        let html = request(id);

        // 1. player_aaaa变量
        let pm = html.match(/var\s+player_aaaa\s*=\s*(\{[^}]+\})/);
        if (pm) {
            try {
                let pd = JSON.parse(pm[1]);
                if (pd.url) {
                    result.url = pd.url;
                    if (pd.parse && pd.parse != 0) result.parse = 1;
                    return JSON.stringify(result);
                }
            } catch(e) {}
        }

        // 2. 直接视频URL
        let vm = html.match(/url['"\s:=]+['"]([^'"]*\.(?:mp4|m3u8|flv)[^'"]*)['"]/i);
        if (vm) {
            result.url = vm[1];
            return JSON.stringify(result);
        }

        // 3. 其他播放器变量
        for (let v of ['player_data', 'video_data', 'play_data']) {
            let m = html.match(new RegExp('var\\s+' + v + '\\s*=\\s*(\\{[^}]*url[^}]*\\})'));
            if (m) {
                try {
                    let d = JSON.parse(m[1]);
                    if (d.url) { result.url = d.url; return JSON.stringify(result); }
                } catch(e) {}
            }
        }

        // 4. iframe
        let im = html.match(/<iframe[^>]*src=['"]([^'"]+)['"]/i);
        if (im) {
            let iframeUrl = im[1];
            if (!iframeUrl.startsWith('http')) iframeUrl = 'https://www.tegou.run' + iframeUrl;
            try {
                let ih = request(iframeUrl);
                let inner = ih.match(/url['"\s:=]+['"]([^'"]*\.(?:mp4|m3u8|flv)[^'"]*)['"]/i);
                if (inner) { result.url = inner[1]; return JSON.stringify(result); }
                let ip = ih.match(/var\s+\w+\s*=\s*(\{[^}]*url[^}]*\})/);
                if (ip) {
                    try { let d = JSON.parse(ip[1]); if (d.url) { result.url = d.url; return JSON.stringify(result); } } catch(e) {}
                }
            } catch(e) {}
            result.parse = 1;
            result.url = iframeUrl;
            return JSON.stringify(result);
        }

        result.parse = 1;
    } catch(e) {
        result.parse = 1;
    }
    return JSON.stringify(result);
}

export default { init: init, home: home, homeVod: homeVod, category: category, detail: detail, search: search, play: play };
