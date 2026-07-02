// drpy爬虫脚本 - 特狗影视 (修复版)
// 目标站点: https://www.tegou.run
// CMS类型: stui
// 修复: 正确的分类URL、选择器、播放解析逻辑

var rules = {
    规则名: '特狗影视',
    作者: 'TVBox接口生成器',
    请求头: 'User-Agent$Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    编码: 'utf-8',
    图片代理: false,

    分类url: 'https://www.tegou.run/vodshow/id/{cateId}/page/{catePg}.html',
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
    // stui模板: ul.stui-vodlist > li > div.stui-vodlist__box > a.stui-vodlist__thumb
    let list = pdfa(html, '.stui-vodlist li');
    if (!list || list.length === 0) list = pdfa(html, '.stui-vodlist__box');
    for (let i = 0; i < Math.min(list.length, 30); i++) {
        let item = list[i];
        let a = pdfh(item, '.stui-vodlist__thumb&&data-original') ? item : pdfa(item, '.stui-vodlist__box')[0];
        if (!a) continue;
        let link = pd(a, '.stui-vodlist__thumb&&href') || pd(a, 'a&&href');
        let title = pdfh(a, '.stui-vodlist__thumb&&title') || pdfh(a, '.title&&Text') || pdfh(a, 'h4&&Text');
        let cover = pdfh(a, '.stui-vodlist__thumb&&data-original') || '';
        let remark = pdfh(a, '.pic-text&&Text') || '';
        if (link && title) {
            if (link && !link.startsWith('http')) link = 'https://www.tegou.run' + link;
            if (cover && !cover.startsWith('http')) cover = 'https://www.tegou.run' + cover;
            items.push({ 'vod_id': link, 'vod_name': title, 'vod_pic': cover, 'vod_remarks': remark });
        }
    }
    return JSON.stringify(items);
}

function category(tid, pg, filter, extend) {
    let url = 'https://www.tegou.run/vodshow/id/' + tid + '/page/' + pg + '.html';
    let html = request(url);
    let items = [];
    let list = pdfa(html, '.stui-vodlist li');
    if (!list || list.length === 0) list = pdfa(html, '.stui-vodlist__box');
    for (let i = 0; i < Math.min(list.length, 40); i++) {
        let item = list[i];
        let box = pdfa(item, '.stui-vodlist__box')[0] || item;
        let thumb = pdfa(box, '.stui-vodlist__thumb')[0];
        if (!thumb) continue;
        let link = pd(thumb, 'href');
        let title = pdfh(thumb, 'title') || pdfh(box, '.title&&Text');
        let cover = pdfh(thumb, 'data-original') || '';
        let remark = pdfh(box, '.pic-text&&Text') || '';
        if (link && title) {
            if (!link.startsWith('http')) link = 'https://www.tegou.run' + link;
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
        vod_name: pdfh(html, 'h1.title&&Text') || pdfh(html, 'h1&&Text') || '',
        vod_pic: '',
        vod_content: pdfh(html, '.detail-sketch&&Text') || pdfh(html, '.vod-desc&&Text') || '',
        vod_play_from: '',
        vod_play_url: ''
    };
    VOD.vod_pic = pdfh(html, '.vod-poster img&&data-original') || pdfh(html, '.pic img&&data-original') || '';
    if (VOD.vod_pic && !VOD.vod_pic.startsWith('http')) VOD.vod_pic = 'https://www.tegou.run' + VOD.vod_pic;

    // 播放源: .nav-tabs li a
    let tabs = pdfa(html, '.nav-tabs li');
    let playFroms = [];
    if (tabs && tabs.length > 0) {
        for (let t of tabs) {
            let name = pdfh(t, 'a&&Text');
            if (name) playFroms.push(name);
        }
    }
    if (playFroms.length === 0) playFroms.push('高清C');

    // 播放列表: .stui-content__playlist a 或 .stui-play__list a
    let allPlayUrls = [];
    let playlists = pdfa(html, '.stui-content__playlist, .stui-play__list, .playlist');
    if (playlists && playlists.length > 0) {
        for (let p of playlists) {
            let links = pdfa(p, 'a');
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
    // 备用：直接查找所有播放链接
    if (allPlayUrls.length === 0) {
        let links = pdfa(html, 'a[href*="/vodplay/"]');
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
    let list = pdfa(html, '.stui-vodlist li');
    if (!list || list.length === 0) list = pdfa(html, '.stui-vodlist__box');
    for (let i = 0; i < Math.min(list.length, 30); i++) {
        let item = list[i];
        let box = pdfa(item, '.stui-vodlist__box')[0] || item;
        let thumb = pdfa(box, '.stui-vodlist__thumb')[0];
        if (!thumb) continue;
        let link = pd(thumb, 'href');
        let title = pdfh(thumb, 'title') || pdfh(box, '.title&&Text');
        let cover = pdfh(thumb, 'data-original') || '';
        let remark = pdfh(box, '.pic-text&&Text') || '';
        if (link && title) {
            if (!link.startsWith('http')) link = 'https://www.tegou.run' + link;
            if (cover && !cover.startsWith('http')) cover = 'https://www.tegou.run' + cover;
            items.push({ 'vod_id': link, 'vod_name': title, 'vod_pic': cover, 'vod_remarks': remark });
        }
    }
    return JSON.stringify(items);
}

function play(flag, id, flags) {
    let result = { 'parse': 0, 'url': '' };
    try {
        // 1. 访问播放页，提取 player_aaaa
        let html = request(id);
        let pm = html.match(/var\s+player_aaaa\s*=\s*(\{[^}]+\})/);
        if (!pm) {
            pm = html.match(/player_aaaa\s*=\s*(\{[^}]+\})/);
        }
        if (pm) {
            let playerData = JSON.parse(pm[1]);
            let videoUrl = playerData.url || '';
            let from = playerData.from || '';
            
            if (videoUrl && from === 'link') {
                // 2. 构造解析URL
                let parseUrl = 'https://www.tegou.run/vid/vr2/vr2.php?url=' + videoUrl;
                let parseHtml = request(parseUrl);
                
                // 3. 提取 window.__PP 中的真实视频URL
                let ppMatch = parseHtml.match(/window\.__PP\s*=\s*(\{[^<]+\})/);
                if (ppMatch) {
                    let ppData = JSON.parse(ppMatch[1]);
                    if (ppData.urls) {
                        result.url = ppData.urls;
                        return JSON.stringify(result);
                    }
                }
            }
        }
        
        // 备用：直接查找视频URL
        let videoMatch = html.match(/url['"\s:=]+['"]([^'"]*\.(?:mp4|m3u8|flv)[^'"]*)['"]/i);
        if (videoMatch) {
            result.url = videoMatch[1];
            return JSON.stringify(result);
        }
        
        // 如果都失败了，使用播放器解析
        result.parse = 1;
        result.url = id;
    } catch(e) {
        result.parse = 1;
        result.url = id;
    }
    return JSON.stringify(result);
}

export default { init: init, home: home, homeVod: homeVod, category: category, detail: detail, search: search, play: play };
