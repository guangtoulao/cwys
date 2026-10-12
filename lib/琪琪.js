var rule = {
    title: "琪琪",
    host: "https://www.qiqiyingyuan.net",
    homeUrl: "/",
    url: "/type/fyclass-fypage.html",
    searchUrl: "",
    searchable: 0,
    quickSearch: 0,
    filterable: 0,
    timeout: 10000,
    play_parse: true,
    headers: {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"},
    class_name: "国产剧&香港剧&韩国剧&短剧&欧美剧&动漫&日本剧&综艺&泰国剧&纪录片&电影",
    class_url: "1&6&2&7&3&8&4&9&5&10&11",
    推荐: ".card;.card-title&&Text;img&&src;.card-badge&&Text;a&&href",
    一级: ".card;.card-title&&Text;img&&src;.card-badge&&Text;a&&href",
    搜索: ".card;.card-title&&Text;img&&src;.card-badge&&Text;a&&href",
    二级: {
        "title": "h1&&Text",
        "img": ".detail-poster img&&src",
        "desc": ".detail-desc&&Text",
        "content": ".detail-desc&&Text",
        "tabs": ".play-source-tab",
        "lists": ".play-episode-list:eq(#id) .play-episode-item",
        "tab_text": "body&&Text",
        "list_text": "body&&Text",
        "list_url": "&&href"
    }
};