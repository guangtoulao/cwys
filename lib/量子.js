var rule = {
    title: '量子资源',
    host: 'https://lzizy.com',
    homeUrl: '/api.php/provide/vod?ac=detail',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    detailUrl: '/api.php/provide/vod?ac=detail&ids=fyid', //非必填,二级详情拼接链接
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    play_parse: true,
    lazy: `js:
        let html = request(input);
        let u = '';
        let m = html.match(/var\\s+main\\s*=\\s*["']([^"']+)["']/);
        if (m) u = m[1];
        if (u) {
            if (u.indexOf('http') !== 0) {
                let base = input.match(/https?:\\/\\/[^\\/]+/);
                u = (base ? base[0] : '') + u;
            }
            input = {parse: 0, jx: 0, url: u};
        }
    `,
    multi: 1,
    timeout: 15000,
    limit: 6,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Mobile Safari/537.36',
        'Referer': 'https://lzizy.com/'
    },
    url: '/api.php/provide/vod?ac=detail&t=fyclass&pg=fypage&f=',
    class_name: '国产剧&香港剧&韩国剧&欧美剧&日本剧&台湾剧&泰国剧&海外剧&短剧&动作片&喜剧片&爱情片&科幻片&剧情片&恐怖片&战争片&记录片&大陆综艺&港台综艺&日韩综艺&欧美综艺&国产动漫&日韩动漫&欧美动漫&港台动漫&海外动漫&体育',
    class_url: '13&14&15&16&22&21&24&23&46&6&7&8&9&11&10&12&20&25&26&27&28&29&30&31&32&33&36',
    推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id', // double: true, // 推荐内容是否双层定位
    // 一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    一级: `js:
        function getParam(url,name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = url.split('?')[1].match(reg); //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
                context = decodeURIComponent(r[2]);
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        }
        let d = [];
        // 忽略分类（精确匹配：34伦理片 35电影解说 45预告片）
        let cate_exclude = ['34','35','45'];
        let type_id = getParam(input,'t');
        if(cate_exclude.indexOf(type_id) === -1){
            // 站方会间歇性返回空壳200，遇空自动重试
            let list = null;
            for (let i = 0; i < 3 && !list; i++) {
                let html = request(input);
                if (html && html.indexOf('{') >= 0) {
                    try { list = JSON.parse(html).list; } catch(e) { list = null; }
                }
            }
            if (list) list.forEach(function (it){
                if(cate_exclude.indexOf(String(it.type_id)) === -1){
                    d.push({
                        title:it.vod_name,
                        img:it.vod_pic,
                        desc:it.vod_remarks,
                        url:it.vod_id
                    });
                }
            });
        }
        setResult(d);
        // log(input);
    `,
    /**
     * 资源采集站，二级链接解析
     */
    // 二级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    二级: `js:
        // 站方会间歇性返回空壳200，遇空自动重试
        let list = null;
        for (let i = 0; i < 3 && !list; i++) {
            let html = request(input);
            if (html && html.indexOf('{') >= 0) {
                try { list = JSON.parse(html).list; } catch(e) { list = null; }
            }
        }
        if(list && list.length===1){
           VOD = list[0];
            VOD.vod_blurb = VOD.vod_blurb.replace(/　/g, '').replace(/<[^>]*>/g, '');
            VOD.vod_content = VOD.vod_content.replace(/　/g, '').replace(/<[^>]*>/g, '');
        }
    `,
    /**
     * 搜索：走网页版搜索页（路径式传参，绕开防火墙对 wd= 的拦截），从结果里抠影片 id，详情仍走 JSON 接口
     */
    // 搜索: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    搜索: `js:
        let d = [];
        // 站方会间歇性返回空壳200，遇空自动重试
        let html = '';
        for (let i = 0; i < 3; i++) {
            html = request(input);
            if (html && html.indexOf('videoContent') >= 0) break;
        }
        let ul = html.match(/<ul class="videoContent">[\\s\\S]*?<\\/ul>/);
        if (ul) {
            let lis = ul[0].match(/<li>[\\s\\S]*?<\\/li>/g) || [];
            // 忽略分类（网页版是文字：伦理片/电影解说/预告片）
            let cate_exclude = ['伦理片','电影解说','预告片'];
            let ids = [];
            let items = [];
            lis.forEach(function (li){
                let href = (li.match(/class="videoName"[^>]*href="([^"]+\\.html)"/) || li.match(/href="([^"]+\\.html)"[^>]*class="videoName"/) || ['', ''])[1] || '';
                let ma = li.match(/class="videoName"[^>]*>([\\s\\S]*?)<\\/a>/);
                if (ma && href) {
                    let inner = ma[1];
                    let mi = inner.match(/<i>([\\s\\S]*?)<\\/i>/);
                    let remarks = mi ? mi[1] : '';
                    let name = inner.replace(/<i>[\\s\\S]*?<\\/i>/, '').trim();
                    let cat = (li.match(/class="category[^"]*"[^>]*>([\\s\\S]*?)<\\//) || ['', ''])[1].trim();
                    let idm = href.match(/id\\/(\\d+)\\.html/);
                    if (idm && cate_exclude.indexOf(cat) === -1) {
                        ids.push(idm[1]);
                        items.push({title: name, desc: remarks, url: idm[1]});
                    }
                }
            });
            // 搜索页本身无图：按编号批量一把抓回封面
            if (ids.length) {
                let picmap = {};
                let jhtml = '';
                for (let i = 0; i < 2; i++) {
                    jhtml = request('https://lzizy.com/api.php/provide/vod?ac=detail&ids=' + ids.join(','));
                    if (jhtml && jhtml.indexOf('{') >= 0) break;
                }
                try {
                    JSON.parse(jhtml).list.forEach(function (it){ picmap[it.vod_id] = it.vod_pic; });
                } catch(e) {}
                items.forEach(function (it){
                    d.push({
                        title: it.title,
                        img: picmap[it.url] || '',
                        desc: it.desc,
                        url: it.url
                    });
                });
            }
        }
        setResult(d);
    `,
}

;(function(){
  var _of=[], _LP="君子兰", _CI=['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮','⑯','⑰','⑱','⑲','⑳'], _ORD=[];
  if(typeof rule!=='undefined' && rule && typeof rule.detail==='function'){
    var _od=rule.detail;
    rule.detail=async function(){ var r=await _od.apply(rule,arguments); try{ var o=typeof r==='string'?JSON.parse(r):r; (o.list||[]).forEach(function(v){ if(!v||!v.vod_play_from)return; var _fs=String(v.vod_play_from).split('$$$'), _us=(v.vod_play_url===undefined||v.vod_play_url===null)?null:String(v.vod_play_url).split('$$$'), _ix=[], _k; if(_ORD&&_ORD.length){ for(_k=0;_k<_ORD.length;_k++){ if(_ORD[_k]>=0&&_ORD[_k]<_fs.length) _ix.push(_ORD[_k]); } } else { for(_k=0;_k<_fs.length;_k++) _ix.push(_k); } var _nf=[],_nu=[],_on=[]; for(_k=0;_k<_ix.length;_k++){ _nf.push(_LP+(_CI[_k]!==undefined?_CI[_k]:(_k+1))); _on.push(_fs[_ix[_k]]); if(_us) _nu.push(_us[_ix[_k]]!==undefined?_us[_ix[_k]]:''); } _of=_on; v.vod_play_from=_nf.join('$$$'); if(_us) v.vod_play_url=_nu.join('$$$');  }); return typeof r==='string'?JSON.stringify(o):o; }catch(e){ return r; } };
  }
  if(typeof rule!=='undefined' && rule && typeof rule.play==='function'){
    var _op=rule.play;
    rule.play=function(flag,id){ var idx=-1,k; for(k=0;k<_of.length;k++){ if((_LP+(_CI[k]!==undefined?_CI[k]:(k+1)))===flag){ idx=k; break; } } return _op.apply(rule,[(idx>=0?_of[idx]:flag),id].concat([].slice.call(arguments,2))); };
  }
})();
;(function(){
  if(typeof rule!=='undefined' && rule && typeof rule.detail!=='function' && typeof rule.二级==='string' && rule.二级.trim().indexOf('js:')===0){
    rule.二级=rule.二级+";(function(){var _of=[],_LP=\"君子兰\",_CI=['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮','⑯','⑰','⑱','⑲','⑳'],_ORD=[];try{if(typeof VOD!=='undefined'&&VOD&&VOD.vod_play_from){var _fs=String(VOD.vod_play_from).split('$$$'), _us=(VOD.vod_play_url===undefined||VOD.vod_play_url===null)?null:String(VOD.vod_play_url).split('$$$'), _ix=[], _k; if(_ORD&&_ORD.length){ for(_k=0;_k<_ORD.length;_k++){ if(_ORD[_k]>=0&&_ORD[_k]<_fs.length) _ix.push(_ORD[_k]); } } else { for(_k=0;_k<_fs.length;_k++) _ix.push(_k); } var _nf=[],_nu=[],_on=[]; for(_k=0;_k<_ix.length;_k++){ _nf.push(_LP+(_CI[_k]!==undefined?_CI[_k]:(_k+1))); _on.push(_fs[_ix[_k]]); if(_us) _nu.push(_us[_ix[_k]]!==undefined?_us[_ix[_k]]:''); } _of=_on; VOD.vod_play_from=_nf.join('$$$'); if(_us) VOD.vod_play_url=_nu.join('$$$'); }}catch(e){}})();";
  }
})();
