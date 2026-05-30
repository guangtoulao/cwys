var rule = {
    title: '瓜子影视',
    host: 'https://www.gz360.tv',
    url: '/index.php/vod/search/wd.html',
    searchUrl: '/index.php/vod/search/wd/**.html',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
    },
    class_name: '电影&电视剧&动漫&综艺',
    class_url: '1&2&3&4',
    detailUrl: '/index.php/vod/detail/id/**.html',
    playParse: '',
    t3: '',
    t4: '',
    tab: '线路$tab',
    tabEx: '#detail-play .nav-tabs a',
    list: '#searchList .search-item',
    listUrl: '/index.php/vod/show/id/**/page/**.html',
    listImg: '.search-item-img img@data-original',
    listTitle: '.search-item-title',
    listUrl: '.search-item-img a@href',
    listSub: '.search-item-info p:eq(1)',
    listDesc: '.search-item-info p:eq(0)',
    listTime: '.search-item-info p:eq(2)',
    detail: {
        title: '.vod-info h1',
        img: '.vod-pic img@data-original',
        desc: '.vod-info .vod-desc',
        class: '.breadcrumb li:eq(1) a',
        year: '.vod-info .vod-info-item:eq(1) span:eq(1)',
        area: '.vod-info .vod-info-item:eq(2) span:eq(1)',
        type: '.vod-info .vod-info-item:eq(3) span:eq(1)',
        actor: '.vod-info .vod-info-item:eq(4) span:eq(1)',
        director: '.vod-info .vod-info-item:eq(5) span:eq(1)',
        state: '.vod-info .vod-info-item:eq(6) span:eq(1)'
    },
    play: {
        url: '.playlist-box .playlist-item a@href',
        name: '.playlist-box .playlist-item',
        parse: ''
    }
};