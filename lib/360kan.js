function jsonOf(s) {
  s = String(s || '').trim();
  try { return JSON.parse(s); } catch (e) {}
  var m = s.match(/^[a-zA-Z0-9_]+\(([\s\S]*)\)\s*;?\s*$/);
  if (m) { try { return JSON.parse(m[1]); } catch (e) {} }
  return {};
}
globalThis.jsonOf = jsonOf;
globalThis.API = 'https://api.web.360kan.com/v1';
globalThis.SIGN = 'sign=360_146029f4&device=2&net=5&callback=cb';

// 浏览分类编号：1=电影 2=电视剧 3=综艺 4=动漫
// vod_id 格式为 "cat$ent_id"（用 $ 分隔，引擎 detail() 据此拆出 fyclass/fyid 填进 detailUrl）
var rule = {
  host: 'https://www.360kan.com',
  homeUrl: 'https://www.360kan.com',
  url: 'cate',
  // searchUrl 仅用于通过引擎校验（搜索实际由下方「搜索」函数自行拼接 api.so.360kan.com）
  searchUrl: 'https://api.so.360kan.com/index?kw=**&p=fypage',
  // detailUrl：引擎会把 fyclass=cat、fyid=ent_id 填进来，得到完整 /v1/detail?...&cat=&id= 详情接口
  detailUrl: 'https://api.web.360kan.com/v1/detail?sign=360_146029f4&device=2&net=5&callback=cb&cat=fyclass&id=fyid',
  // 首页分类（一级浏览使用 rank 的 cat 参数）：1=电影 2=电视剧 3=综艺 4=动漫
  class_name: '电影&电视剧&综艺&动漫',
  class_url: '1&2&3&4',
  // 播放解析：360kan 每集是平台页，交给 TVBox 内置解析器
  play_parse: true,
  lazy: 'js:input=input.split("?")[0];log(input);',

  // ---------- 推荐（首页）----------
  推荐: $js.toString(() => {
    var cats = [1, 2, 3, 4]; // 电影/电视剧/综艺/动漫
    var seen = {};
    var list = [];
    for (var c = 0; c < cats.length; c++) {
      var res = request(API + '/rank?' + SIGN + '&cat=' + cats[c]);
      var arr = jsonOf(res).data || [];
      for (var i = 0; i < arr.length; i++) {
        var it = arr[i];
        if (!it.url || !it.ent_id) continue;
        if (seen[it.url]) continue;
        seen[it.url] = 1;
        list.push({
          url: (it.cat || cats[c]) + '$' + it.ent_id,
          title: it.title || '',
          pic_url: it.cover || '',
          desc: it.upinfo || (it.comment || '')
        });
        if (list.length >= 48) break;
      }
    }
    setResult(list);
  }),

  // ---------- 一级（分类）----------
  一级: $js.toString(() => {
    var res = request(API + '/rank?' + SIGN + '&cat=' + MY_CATE);
    var arr = jsonOf(res).data || [];
    var list = [];
    for (var i = 0; i < arr.length; i++) {
      var it = arr[i];
      if (!it.url || !it.ent_id) continue;
      list.push({
        url: (it.cat || MY_CATE) + '$' + it.ent_id,
        title: it.title || '',
        pic_url: it.cover || '',
        desc: it.upinfo || (it.comment || '')
      });
    }
    setResult(list);
  }),

  // ---------- 搜索 ----------
  // 关键：api.so.360kan.com 搜索接口对请求头敏感，必须带桌面浏览器的 User-Agent 与
  // Referer: https://so.360kan.com/?kw=<kw>（对齐成功案例 csp_SP360.searchContent 的 b(url,referer)）。
  // 引擎默认只会塞 MOBILE_UA + Referer=本站首页，会被该接口拒成 {total:100,list:[]} 空壳，故此处显式覆盖。
  搜索: $js.toString(() => {
    var kw = encodeURIComponent(KEY).replace(/%20/g, '+');
    var api = 'https://api.so.360kan.com/index?force_v=1&kw=' + kw + '&from=&pageno=' + (MY_PAGE || 1) + '&v_ap=1&tab=all';
    var hd = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
      'Referer': 'https://so.360kan.com/?kw=' + kw
    };
    var rows = jsonOf(request(api, { headers: hd })).data || {};
    rows = rows.longData ? (rows.longData.rows || []) : [];
    var list = [];
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i];
      if (!r.url || !r.en_id) continue;
      var remark = (r.coverInfo && r.coverInfo.txt) ? r.coverInfo.txt : (r.cat_name || '');
      list.push({
        url: (r.cat_id || '') + '$' + r.en_id,
        title: r.titleTxt || r.title || '',
        pic_url: r.cover || '',
        desc: remark
      });
    }
    setResult(list);
  }),

  // ---------- 二级（详情 + 分集源）----------
  // input 由引擎设为完整的 /v1/detail?...&cat=&id= 详情接口 URL
  二级: $js.toString(() => {
    var data = jsonOf(request(input)).data || {};
    var vod_play = {};
    var sites = data.playlink_sites || [];
    for (var si = 0; si < sites.length; si++) {
      var site = sites[si];
      var vodItems = [];
      var total = data.allupinfo ? parseInt(data.allupinfo[site] || '0') : 0;
      if (total > 1) {
        // 分集：按 50 一批拉 allepidetail
        var delta = 50;
        for (var j = 1; j < total; j += delta) {
          var end = Math.min(total, j + delta - 1);
          var url2 = buildUrl(input, { start: j, end: end, site: site });
          var vd = jsonOf(request(url2)).data;
          if (!vd) continue;
          var eps = (vd.allepidetail && vd.allepidetail[site]) ? vd.allepidetail[site] : (vd.defaultepisode || []);
          for (var k = 0; k < eps.length; k++) {
            vodItems.push((eps[k].playlink_num || eps[k].period || '') + '$' + urlDeal(eps[k].url || ''));
          }
        }
      } else {
        // 单集/电影：用 playlinksdetail 的 default_url
        var item = data.playlinksdetail ? data.playlinksdetail[site] : null;
        if (item && item.default_url) {
          vodItems.push((item.sort || '') + '$' + urlDeal(item.default_url));
        }
      }
      if (vodItems.length > 0) vod_play[site] = vodItems.join('#');
    }
    var tabs = Object.keys(vod_play);
    if (tabs.length > 0) {
      // 线路统一改名：平台键（qq/qiyi/youku…）→ 君子兰①②③（前20个带圈数字，之后转普通数字）
      var lineNames = [];
      for (var li = 0; li < tabs.length; li++) {
        lineNames.push('君子兰' + (li < 20 ? String.fromCharCode(9312 + li) : String(li + 1)));
      }
      VOD = {
        vod_id: input,
        vod_name: data.title || '',
        vod_pic: data.cdncover || '',
        vod_content: data.description || '',
        vod_actor: (data.actor || []).join('/'),
        vod_director: (data.director || []).join('/'),
        vod_area: (data.area || []).join('/'),
        vod_year: data.pubdate || '',
        vod_remarks: (data.total ? ('共' + data.total + '集') : '') || (data.upinfo || ''),
        vod_play_from: lineNames.join('$$$'),
        vod_play_url: tabs.map(function (k) { return vod_play[k]; }).join('$$$')
      };
    }
  })
};
