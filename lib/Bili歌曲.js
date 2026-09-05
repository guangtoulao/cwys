// Bili歌曲 — 数据源: B站公开API(免登录可播720P)
// 分类数据来自 aowu ext (同 csp_BiliAmns)
// 可选: 在下行引号内粘贴B站Cookie后, "历史记录"分类可用
var BILI_COOKIE = '';
var BILI_CLASS = [{"type_id":"演唱会超清","type_name":"演唱会筛选"},{"type_id":"粤语歌曲超清","type_name":"粤语"},{"type_id":"2022年热们歌曲超清","type_name":"热榜"},{"type_id":"抖音神曲超清","type_name":"抖音神曲"},{"type_id":"经典老歌超清","type_name":"经典老歌"},{"type_id":"DJ歌曲超清","type_name":"DJ"},{"type_id":"网红翻唱歌曲超清","type_name":"网红翻唱"},{"type_id":"韩国女团演唱会超清","type_name":"韩国女团"}];
var BILI_FILTER = {"演唱会超清":[{"key":"order","name":"排序","value":[{"n":"综合排序","v":"0"},{"n":"最多点击","v":"click"},{"n":"最新发布","v":"pubdate"},{"n":"最多弹幕","v":"dm"},{"n":"最多收藏","v":"stow"}]},{"key":"tid","name":"分类","value":[{"n":"全部","v":"演唱会超清"},{"n":"A阿杜","v":"阿杜演唱会超清"},{"n":"A阿黛尔","v":"阿黛尔演唱会超清"},{"n":"BBeyond","v":"Beyond演唱会超清"},{"n":"BBy2","v":"By2演唱会超清"},{"n":"BBIGBANG","v":"BIGBANG演唱会超清"},{"n":"B布兰妮","v":"布兰妮演唱会超清"},{"n":"B坂井泉水","v":"坂井泉水演唱会超清"},{"n":"C陈奕迅","v":"陈奕迅演唱会超清"},{"n":"C蔡依林","v":"蔡依林演唱会超清"},{"n":"C初音未来","v":"初音未来演唱会超清"},{"n":"C蔡健雅","v":"蔡健雅演唱会超清"},{"n":"C陈小春","v":"陈小春演唱会超清"},{"n":"C草蜢","v":"草蜢演唱会超清"},{"n":"C陈慧娴","v":"陈慧娴演唱会超清"},{"n":"C崔健","v":"崔健演唱会超清"},{"n":"C仓木麻衣","v":"仓木麻衣演唱会超清"},{"n":"D戴荃","v":"戴荃演唱会超清"},{"n":"D动力火车","v":"动力火车演唱会超清"},{"n":"D邓丽君","v":"邓丽君演唱会超清"},{"n":"D丁当","v":"丁当演唱会超清"},{"n":"D刀郎","v":"刀郎演唱会超清"},{"n":"D邓紫棋","v":"邓紫棋演唱会超清"},{"n":"D戴佩妮","v":"戴佩妮演唱会超清"},{"n":"D邓丽君","v":"邓丽君演唱会超清"},{"n":"F飞儿乐队","v":"飞儿乐队演唱会超清"},{"n":"F费玉清","v":"费玉清演唱会超清"},{"n":"F费翔","v":"费翔演唱会超清"},{"n":"F方大同","v":"方大同演唱会超清"},{"n":"F房东的猫","v":"房东的猫演唱会超清"},{"n":"F凤飞飞","v":"凤飞飞演唱会超清"},{"n":"F凤凰传奇","v":"凤凰传奇演唱会超清"},{"n":"G郭采洁","v":"郭采洁演唱会超清"},{"n":"G光良","v":"光良演唱会超清"},{"n":"G郭静","v":"郭静演唱会超清"},{"n":"G郭富城","v":"郭富城演唱会超清"},{"n":"H胡彦斌","v":"胡彦斌演唱会超清"},{"n":"H胡夏","v":"胡夏演唱会超清"},{"n":"H韩红","v":"韩红演唱会超清"},{"n":"H黄品源","v":"黄品源演唱会超清"},{"n":"H黄小琥","v":"黄小琥演唱会超清"},{"n":"H花儿乐队","v":"花儿乐队演唱会超清"},{"n":"H黄家强","v":"黄家强演唱会超清"},{"n":"H后街男孩","v":"后街男孩演唱会超清"},{"n":"J经典老歌","v":"经典老歌演唱会超清"},{"n":"J贾斯丁比伯","v":"贾斯丁比伯演唱会超清"},{"n":"J金池","v":"金池演唱会超清"},{"n":"J金志文","v":"金志文演唱会超清"},{"n":"J焦迈奇","v":"焦迈奇演唱会超清"},{"n":"K筷子兄弟","v":"筷子兄弟演唱会超清"},{"n":"L李玟","v":"李玟演唱会超清"},{"n":"L林忆莲","v":"林忆莲演唱会超清"},{"n":"L李克勤","v":"李克勤演唱会超清"},{"n":"L刘宪华","v":"刘宪华演唱会超清"},{"n":"L李圣杰","v":"李圣杰演唱会超清"},{"n":"L林宥嘉","v":"林宥嘉演唱会超清"},{"n":"L梁静茹","v":"梁静茹演唱会超清"},{"n":"L李健","v":"李健演唱会超清"},{"n":"L林俊杰","v":"林俊杰演唱会超清"},{"n":"L李玉刚","v":"李玉刚演唱会超清"},{"n":"L林志炫","v":"林志炫演唱会超清"},{"n":"L李荣浩","v":"李荣浩演唱会超清"},{"n":"L李宇春","v":"李宇春演唱会超清"},{"n":"L洛天依","v":"洛天依演唱会超清"},{"n":"L林子祥","v":"林子祥演唱会超清"},{"n":"L李宗盛","v":"李宗盛演唱会超清"},{"n":"L黎明","v":"黎明演唱会超清"},{"n":"L刘德华","v":"刘德华演唱会超清"},{"n":"L罗大佑","v":"罗大佑演唱会超清"},{"n":"L林肯公园","v":"林肯公园演唱会超清"},{"n":"LLadyGaga","v":"LadyGaga演唱会超清"},{"n":"L旅行团乐队","v":"旅行团乐队演唱会超清"},{"n":"M莫文蔚","v":"莫文蔚演唱会超清"},{"n":"M毛不易","v":"毛不易演唱会超清"},{"n":"M梅艳芳","v":"梅艳芳演唱会超清"},{"n":"M迈克尔杰克逊","v":"迈克尔杰克逊演唱会超清"},{"n":"N南拳妈妈","v":"南拳妈妈演唱会超清"},{"n":"P朴树","v":"朴树演唱会超清"},{"n":"Q齐秦","v":"齐秦演唱会超清"},{"n":"Q青鸟飞鱼","v":"青鸟飞鱼演唱会超清"},{"n":"R容祖儿","v":"容祖儿演唱会超清"},{"n":"R任贤齐","v":"任贤齐演唱会超清"},{"n":"S水木年华","v":"水木年华演唱会超清"},{"n":"S孙燕姿","v":"孙燕姿演唱会超清"},{"n":"S苏打绿","v":"苏打绿演唱会超清"},{"n":"SSHE","v":"SHE演唱会超清"},{"n":"S孙楠","v":"孙楠演唱会超清"},{"n":"T陶喆","v":"陶喆演唱会超清"},{"n":"T谭咏麟","v":"谭咏麟演唱会超清"},{"n":"T田馥甄","v":"田馥甄演唱会超清"},{"n":"T谭维维","v":"谭维维演唱会超清"},{"n":"T逃跑计划","v":"逃跑计划演唱会超清"},{"n":"T田震","v":"田震演唱会超清"},{"n":"T谭晶","v":"谭晶演唱会超清"},{"n":"T屠洪刚","v":"屠洪刚演唱会超清"},{"n":"T泰勒·斯威夫特","v":"泰勒·斯威夫特演唱会超清"},{"n":"W王力宏","v":"王力宏演唱会超清"},{"n":"W王杰","v":"王杰演唱会超清"},{"n":"W吴克群","v":"吴克群演唱会超清"},{"n":"W王心凌","v":"王心凌演唱会超清"},{"n":"W王靖雯","v":"好声音王靖雯演唱会超清"},{"n":"W汪峰","v":"汪峰演唱会超清"},{"n":"W伍佰","v":"伍佰演唱会超清"},{"n":"W王菲","v":"王菲演唱会超清"},{"n":"W五月天","v":"五月天演唱会超清"},{"n":"W汪苏泷","v":"汪苏泷演唱会超清"},{"n":"X徐佳莹","v":"徐佳莹演唱会超清"},{"n":"X弦子","v":"弦子演唱会超清"},{"n":"X萧亚轩","v":"萧亚轩演唱会超清"},{"n":"X许巍","v":"许巍演唱会超清"},{"n":"X薛之谦","v":"薛之谦演唱会超清"},{"n":"X许嵩","v":"许嵩演唱会超清"},{"n":"X小虎队","v":"小虎队演唱会超清"},{"n":"X萧敬腾","v":"萧敬腾演唱会超清"},{"n":"X谢霆锋","v":"谢霆锋演唱会超清"},{"n":"X徐小凤","v":"徐小凤演唱会超清"},{"n":"X信乐队","v":"信乐队演唱会超清"},{"n":"Y夜愿乐队","v":"夜愿乐队演唱会超清"},{"n":"Y羽泉","v":"羽泉演唱会超清"},{"n":"Y郁可唯","v":"郁可唯演唱会超清"},{"n":"Y叶倩文","v":"叶倩文演唱会超清"},{"n":"Y杨坤","v":"杨坤演唱会超清"},{"n":"Y庾澄庆","v":"庾澄庆演唱会超清"},{"n":"Y尤长靖","v":"尤长靖演唱会超清"},{"n":"Y易烊千玺","v":"易烊千玺演唱会超清"},{"n":"Y袁娅维","v":"袁娅维演唱会超清"},{"n":"Y杨丞琳","v":"杨丞琳演唱会超清"},{"n":"Y杨千嬅","v":"杨千嬅演唱会超清"},{"n":"Y杨宗纬","v":"杨宗纬演唱会超清"},{"n":"Z郑秀文","v":"郑秀文演唱会超清"},{"n":"Z周杰伦","v":"周杰伦演唱会超清"},{"n":"Z张学友","v":"张学友演唱会超清"},{"n":"Z张信哲","v":"张信哲演唱会超清"},{"n":"Z张宇","v":"张宇演唱会超清"},{"n":"Z周华健","v":"周华健演唱会超清"},{"n":"Z张韶涵","v":"张韶涵演唱会超清"},{"n":"Z周深","v":"周深演唱会超清"},{"n":"Z纵贯线","v":"纵贯线演唱会超清"},{"n":"Z赵雷","v":"赵雷演唱会超清"},{"n":"Z周传雄","v":"周传雄演唱会超清"},{"n":"Z张国荣","v":"张国荣演唱会超清"},{"n":"Z周慧敏","v":"周慧敏演唱会超清"},{"n":"Z张惠妹","v":"张惠妹演唱会超清"},{"n":"Z周笔畅","v":"周笔畅演唱会超清"},{"n":"Z郑中基","v":"郑中基演唱会超清"},{"n":"Z张艺兴","v":"张艺兴演唱会超清"},{"n":"Z张震岳","v":"张震岳演唱会超清"},{"n":"Z张雨生","v":"张雨生演唱会超清"},{"n":"Z郑智化","v":"郑智化演唱会超清"},{"n":"Z卓依婷","v":"卓依婷演唱会超清"},{"n":"Z中岛美雪","v":"中岛美雪演唱会超清"}]},{"key":"duration","name":"时长","value":[{"n":"全部","v":"0"},{"n":"60分钟以上","v":"4"},{"n":"30~60分钟","v":"3"},{"n":"10~30分钟","v":"2"},{"n":"10分钟以下","v":"1"}]}]};
// 真实防风控 cookie: 首次向B站申请 buvid3/buvid4 并缓存, 失败退回静态兜底
function biliCookie() {
    var ck = '';
    try { ck = getItem('bili_ck', '') || ''; } catch (e) { ck = ''; }
    if (ck) { return ck; }
    try {
        var fr = JSON.parse(request('https://api.bilibili.com/x/frontend/finger/spi', { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36', 'Referer': 'https://www.bilibili.com/' } }));
        if (fr && fr.data && fr.data.b_3) {
            ck = 'buvid3=' + fr.data.b_3 + '; buvid4=' + fr.data.b_4 + '; b_nut=1';
            try { setItem('bili_ck', ck); } catch (e2) {}
        }
    } catch (e) {}
    if (!ck) { ck = 'buvid3=8F7A2B1C-4E5D-4F6A-9B8C-1A2B3C4D5E6Finfoc; b_nut=1'; }
    return ck;
}
function biliHeaders() {
    return {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com/',
        'Cookie': biliCookie()
    };
}

function fixPic(p) {
    var s = String(p || '');
    if (s.indexOf('//') === 0) { s = 'https:' + s; }
    s = s.split('http://').join('https://');
    return s;
}
function wbiMd5(s) {
    function sa(x, y) { var l = (x & 0xFFFF) + (y & 0xFFFF); var m = (x >> 16) + (y >> 16) + (l >> 16); return (m << 16) | (l & 0xFFFF); }
    function rl(n, c) { return (n << c) | (n >>> (32 - c)); }
    function cmn(q, a, b, x, s, t) { return sa(rl(sa(sa(a, q), sa(x, t)), s), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | (~b & d), a, b, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & ~d), a, b, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, b, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | ~d), a, b, x, s, t); }
    function b2h(ba) { var T = '0123456789abcdef'; var st = ''; for (var i = 0; i < ba.length * 4; i++) { st += T.charAt((ba[i >> 2] >> ((i % 4) * 8 + 4)) & 0xF) + T.charAt((ba[i >> 2] >> ((i % 4) * 8)) & 0xF); } return st; }
    var u8 = '';
    for (var iu = 0; iu < s.length; iu++) {
        var cc = s.charCodeAt(iu);
        if (cc < 128) { u8 += String.fromCharCode(cc); }
        else if (cc < 2048) { u8 += String.fromCharCode(192 | (cc >> 6), 128 | (cc & 63)); }
        else { u8 += String.fromCharCode(224 | (cc >> 12), 128 | ((cc >> 6) & 63), 128 | (cc & 63)); }
    }
    var x = [];
    var mask = 255;
    for (var ib = 0; ib < u8.length * 8; ib += 8) { x[ib >> 5] = (x[ib >> 5] || 0) | ((u8.charCodeAt(ib / 8) & mask) << (ib % 32)); }
    var bl = u8.length * 8;
    x[bl >> 5] = (x[bl >> 5] || 0) | (0x80 << (bl % 32));
    var size = (((bl + 64) >>> 9) << 4) + 14;
    for (var iz = 0; iz <= size; iz++) { x[iz] = x[iz] || 0; }
    x[size] = bl;
    var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
    for (var i = 0; i < x.length; i += 16) {
        var oa = a, ob = b, oc = c, od = d;
        a=ff(a,b,c,d,x[i],7,-680876936); d=ff(d,a,b,c,x[i+1],12,-389564586); c=ff(c,d,a,b,x[i+2],17,606105819); b=ff(b,c,d,a,x[i+3],22,-1044525330);
        a=ff(a,b,c,d,x[i+4],7,-176418897); d=ff(d,a,b,c,x[i+5],12,1200080426); c=ff(c,d,a,b,x[i+6],17,-1473231341); b=ff(b,c,d,a,x[i+7],22,-45705983);
        a=ff(a,b,c,d,x[i+8],7,1770035416); d=ff(d,a,b,c,x[i+9],12,-1958414417); c=ff(c,d,a,b,x[i+10],17,-42063); b=ff(b,c,d,a,x[i+11],22,-1990404162);
        a=ff(a,b,c,d,x[i+12],7,1804603682); d=ff(d,a,b,c,x[i+13],12,-40341101); c=ff(c,d,a,b,x[i+14],17,-1502002290); b=ff(b,c,d,a,x[i+15],22,1236535329);
        a=gg(a,b,c,d,x[i+1],5,-165796510); d=gg(d,a,b,c,x[i+6],9,-1069501632); c=gg(c,d,a,b,x[i+11],14,643717713); b=gg(b,c,d,a,x[i],20,-373897302);
        a=gg(a,b,c,d,x[i+5],5,-701558691); d=gg(d,a,b,c,x[i+10],9,38016083); c=gg(c,d,a,b,x[i+15],14,-660478335); b=gg(b,c,d,a,x[i+4],20,-405537848);
        a=gg(a,b,c,d,x[i+9],5,568446438); d=gg(d,a,b,c,x[i+14],9,-1019803690); c=gg(c,d,a,b,x[i+3],14,-187363961); b=gg(b,c,d,a,x[i+8],20,1163531501);
        a=gg(a,b,c,d,x[i+13],5,-1444681467); d=gg(d,a,b,c,x[i+2],9,-51403784); c=gg(c,d,a,b,x[i+7],14,1735328473); b=gg(b,c,d,a,x[i+12],20,-1926607734);
        a=hh(a,b,c,d,x[i+5],4,-378558); d=hh(d,a,b,c,x[i+8],11,-2022574463); c=hh(c,d,a,b,x[i+11],16,1839030562); b=hh(b,c,d,a,x[i+14],23,-35309556);
        a=hh(a,b,c,d,x[i+1],4,-1530992060); d=hh(d,a,b,c,x[i+4],11,1272893353); c=hh(c,d,a,b,x[i+7],16,-155497632); b=hh(b,c,d,a,x[i+10],23,-1094730640);
        a=hh(a,b,c,d,x[i+13],4,681279174); d=hh(d,a,b,c,x[i],11,-358537222); c=hh(c,d,a,b,x[i+3],16,-722521979); b=hh(b,c,d,a,x[i+6],23,76029189);
        a=hh(a,b,c,d,x[i+9],4,-640364487); d=hh(d,a,b,c,x[i+12],11,-421815835); c=hh(c,d,a,b,x[i+15],16,530742520); b=hh(b,c,d,a,x[i+2],23,-995338651);
        a=ii(a,b,c,d,x[i],6,-198630844); d=ii(d,a,b,c,x[i+7],10,1126891415); c=ii(c,d,a,b,x[i+14],15,-1416354905); b=ii(b,c,d,a,x[i+5],21,-57434055);
        a=ii(a,b,c,d,x[i+12],6,1700485571); d=ii(d,a,b,c,x[i+3],10,-1894986606); c=ii(c,d,a,b,x[i+10],15,-1051523); b=ii(b,c,d,a,x[i+1],21,-2054922799);
        a=ii(a,b,c,d,x[i+8],6,1873313359); d=ii(d,a,b,c,x[i+15],10,-30611744); c=ii(c,d,a,b,x[i+6],15,-1560198380); b=ii(b,c,d,a,x[i+13],21,1309151649);
        a=ii(a,b,c,d,x[i+4],6,-145523070); d=ii(d,a,b,c,x[i+11],10,-1120210379); c=ii(c,d,a,b,x[i+2],15,718787259); b=ii(b,c,d,a,x[i+9],21,-343485551);
        a=sa(a,oa); b=sa(b,ob); c=sa(c,oc); d=sa(d,od);
    }
    return b2h([a, b, c, d]);
}
var WBI_TAB = [46,47,18,2,53,8,23,32,15,50,10,31,58,3,45,35,27,43,5,49,33,9,42,19,29,28,14,39,12,38,41,13,37,48,7,16,24,55,40,61,26,17,0,1,60,51,30,4,22,25,54,21,56,59,6,63,57,62,11,36,20,34,44,52];
function wbiKeys() {
    var raw = '';
    try { raw = getItem('bili_wbi', '') || ''; } catch (e) { raw = ''; }
    if (raw) {
        var pp = raw.split('|');
        if (pp.length === 3 && pp[1] && pp[2]) {
            if (new Date().getTime() - Number(pp[0] || 0) < 10800000) { return { img: pp[1], sub: pp[2] }; }
        }
    }
    var keys = { img: '', sub: '' };
    try {
        var jn = JSON.parse(request('https://api.bilibili.com/x/web-interface/nav', { headers: biliHeaders() }));
        var w = jn.data.wbi_img;
        keys.img = w.img_url.split('/').pop().split('.')[0];
        keys.sub = w.sub_url.split('/').pop().split('.')[0];
        try { setItem('bili_wbi', '' + new Date().getTime() + '|' + keys.img + '|' + keys.sub); } catch (e2) {}
    } catch (e) {}
    if (!keys.img && raw) {
        var pp2 = raw.split('|');
        if (pp2.length === 3) { keys.img = pp2[1]; keys.sub = pp2[2]; }
    }
    return keys;
}
function wbiSign(u) {
    var keys = wbiKeys();
    var all = keys.img + keys.sub;
    var mixin = '';
    for (var i = 0; i < 32; i++) { mixin += all.charAt(WBI_TAB[i]); }
    var base = u.split('?')[0];
    var q = u.split('?')[1] || '';
    var parts = q.split('&');
    var ps = [];
    for (var j = 0; j < parts.length; j++) {
        if (!parts[j]) { continue; }
        var eq = parts[j].indexOf('=');
        var k = eq < 0 ? parts[j] : parts[j].slice(0, eq);
        var v = eq < 0 ? '' : parts[j].slice(eq + 1);
        v = v.split('!').join('').split("'").join('').split('(').join('').split(')').join('').split('*').join('');
        ps.push([k, v]);
    }
    ps.push(['wts', '' + Math.floor(new Date().getTime() / 1000)]);
    ps.sort(function (a, b) { return a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0); });
    var qs = [];
    for (var j2 = 0; j2 < ps.length; j2++) { qs.push(ps[j2][0] + '=' + ps[j2][1]); }
    var query = qs.join('&');
    return base + '?' + query + '&w_rid=' + wbiMd5(query + mixin);
}
(function(g){try{g.BILI_COOKIE=BILI_COOKIE;g.BILI_CLASS=BILI_CLASS;g.BILI_FILTER=BILI_FILTER;g.biliCookie=biliCookie;g.biliHeaders=biliHeaders;g.wbiMd5=wbiMd5;g.fixPic=fixPic;g.WBI_TAB=WBI_TAB;g.wbiKeys=wbiKeys;g.wbiSign=wbiSign;}catch(e){}})(typeof globalThis==='object'?globalThis:this);
var rule = {
    title: 'Bili歌曲',
    host: 'https://api.bilibili.com',
    homeUrl: '',
    url: '/x/web-interface/search/type?search_type=video&keyword=fyclass&page=fypage&page_size=20',
    searchUrl: '/x/web-interface/search/type?search_type=video&keyword=**&page=fypage&page_size=20',
    class_parse: 'js:input=BILI_CLASS;',
    filter: BILI_FILTER,
    searchable: 1,
    quickSearch: 0,
    filterable: 1,
    timeout: 8000,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com/',
        'Cookie': 'buvid3=8F7A2B1C-4E5D-4F6A-9B8C-1A2B3C4D5E6Finfoc; b_nut=1' + (BILI_COOKIE ? '; ' + BILI_COOKIE : '')
    },
    play_parse: true,
    lazy: `js:
var arr = String(input).split('_');
var u = 'https://api.bilibili.com/x/player/playurl?bvid=' + arr[0] + '&cid=' + arr[1] + '&qn=80&platform=html5&high_quality=1';
var j = JSON.parse(request(u, {headers: biliHeaders()}));
var d0 = (j.data && j.data.durl && j.data.durl[0]) || null;
if (d0 && d0.url) {
    input = {parse: 0, url: d0.url, jx: 0, flag: flag};
}
`,
    一级: `js:
VODS = [];
var kw = (typeof MY_CATE !== 'undefined') ? MY_CATE : '';
var PG = (typeof MY_PAGE !== 'undefined' && MY_PAGE) ? MY_PAGE : (((typeof fypage !== 'undefined') && fypage) ? fypage : 1);
var FL = (typeof MY_FL !== 'undefined' && MY_FL) ? MY_FL : {};
if (kw !== 'history' && kw !== 'created') {
    var order = (FL.order && FL.order != '0') ? FL.order : '';
    var dur = (FL.duration && FL.duration != '0') ? FL.duration : '';
    var u = 'https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=' + encodeURIComponent(kw) + '&page=' + PG + '&page_size=20';
    if (order) { u += '&order=' + order; }
    if (dur) { u += '&duration=' + dur; }
    u = wbiSign(u);
    var j = JSON.parse(request(u, {headers: biliHeaders()}));
    var list = (j.data && j.data.result) || [];
    for (var i = 0; i < list.length; i++) {
        var it = list[i];
        if (!it.bvid) { continue; }
        VODS.push({
            vod_id: 'https://api.bilibili.com/x/web-interface/view?bvid=' + it.bvid,
            vod_name: String(it.title).split('<em class="keyword">').join('').split('</em>').join('').trim(),
            vod_pic: fixPic(it.pic),
            vod_remarks: it.duration || ''
        });
    }
} else if (kw === 'history' && BILI_COOKIE) {
    var u = 'https://api.bilibili.com/x/v2/history?ps=30&pn=' + PG;
    var j = JSON.parse(request(u, {headers: biliHeaders()}));
    var list = j.data || [];
    for (var i = 0; i < list.length; i++) {
        var it = list[i];
        if (!it.bvid) { continue; }
        VODS.push({
            vod_id: 'https://api.bilibili.com/x/web-interface/view?bvid=' + it.bvid,
            vod_name: String(it.title).split('<em class="keyword">').join('').split('</em>').join('').trim(),
            vod_pic: fixPic(it.pic),
            vod_remarks: ''
        });
    }
}
`,
    二级: `js:
var m = String(input).match(/bvid=([A-Za-z0-9]+)/);
var bv = m ? m[1] : '';
var j = JSON.parse(request('https://api.bilibili.com/x/web-interface/view?bvid=' + bv, {headers: biliHeaders()}));
var data = j.data || {};
var eps = (data.pages && data.pages.length) ? data.pages : [{page: 1, cid: data.cid, part: data.title}];
var urls = [];
for (var i = 0; i < eps.length; i++) {
    var ep = eps[i];
    var name = eps.length > 1 ? ('P' + ep.page + ' ' + (ep.part || ('第' + (i + 1) + '集'))) : (ep.part || data.title);
    urls.push(name + '$' + bv + '_' + ep.cid);
}
VOD = {
    vod_id: input,
    vod_name: data.title || '',
    vod_pic: fixPic(data.pic),
    type_name: data.tname || '',
    vod_year: '',
    vod_area: '',
    vod_remarks: data.owner ? ('UP主: ' + data.owner.name) : '',
    vod_actor: '',
    vod_director: '',
    vod_content: data.desc || '',
    vod_play_from: 'B站',
    vod_play_url: urls.join('#')
};
`,
    搜索: `js:
VODS = [];
var KW = (typeof KEY !== 'undefined') ? KEY : (((typeof wd !== 'undefined') && wd) ? wd : '');
var PG = (typeof MY_PAGE !== 'undefined' && MY_PAGE) ? MY_PAGE : (((typeof fypage !== 'undefined') && fypage) ? fypage : 1);
var u = 'https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=' + encodeURIComponent(KW) + '&page=' + PG + '&page_size=20';
u = wbiSign(u);
var j = JSON.parse(request(u, {headers: biliHeaders()}));
var list = (j.data && j.data.result) || [];
for (var i = 0; i < list.length; i++) {
    var it = list[i];
    if (!it.bvid) { continue; }
    VODS.push({
        vod_id: 'https://api.bilibili.com/x/web-interface/view?bvid=' + it.bvid,
        vod_name: String(it.title).split('<em class="keyword">').join('').split('</em>').join('').trim(),
        vod_pic: fixPic(it.pic),
        vod_remarks: it.duration || ''
    });
}
`
};
