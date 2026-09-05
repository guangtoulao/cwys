var rule = {
  title: "樱花影视",
  host: "https://www.jiyoushangmeng.com",
  homeUrl: "https://www.jiyoushangmeng.com/",
  url: "https://www.jiyoushangmeng.com/yhsyshow/fyclass-{{fl.area}}-{{fl.by}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}.html",
  searchUrl: "https://www.jiyoushangmeng.com/yhsysearch/**----------fypage---.html",
  searchable: 2,
  quickSearch: 0,
  filterable: 1,
  headers: {"User-Agent":"Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36","Referer":"https://www.jiyoushangmeng.com"},
  timeout: 10000,
  play_parse: true,
  class_name: "电影&电视剧&综艺&动漫&短剧",
  class_url: "1&2&3&4&5",
  // 推荐/一级/搜索：选择器串 或 API 接口函数（工具按配置生成）
  推荐: "body .myui-vodlist__box;a&&title;.myui-vodlist__thumb&&data-original;pic-text&&Text;a&&href",
  一级: "body .myui-vodlist__box;a&&title;.myui-vodlist__thumb&&data-original;pic-text&&Text;a&&href",
  搜索: "body .myui-vodlist__media li;a&&title;.myui-vodlist__thumb&&data-original;pic-text&&Text;a&&href",
  // 二级：命中模板「undefined」，使用模板内置 二级 对象
  二级: $js.toString(() => {
  var HOST = "https://www.jiyoushangmeng.com";
  var detailHtml = (typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) ? input : (function(){ try { return request(MY_URL); } catch(e) { return ""; } })();
  VOD = VOD || {};
  try { VOD.vod_name = pdfh(detailHtml, "h1&&Text").replace(/\n|\t/g, "").trim(); } catch(e){}
  try { if (".module-info-item&&Text") {
    var _d0 = pdfh(detailHtml, ".module-info-item&&Text").replace(/\n|\t/g, "").trim(); VOD.vod_remarks = _d0;
    var _ds = ".module-info-item&&Text".split(";");
    if(_ds.length>1) VOD.vod_year = pdfh(detailHtml, _ds[1]).replace(/\n|\t/g,"").trim();
    if(_ds.length>2) VOD.vod_area = pdfh(detailHtml, _ds[2]).replace(/\n|\t/g,"").trim();
    if(_ds.length>3) VOD.vod_actor = pdfh(detailHtml, _ds[3]).replace(/\n|\t/g,"").trim();
    if(_ds.length>4) VOD.vod_director = pdfh(detailHtml, _ds[4]).replace(/\n|\t/g,"").trim();
  } } catch(e){}
  try { if (".content&&Text") VOD.vod_content = pdfh(detailHtml, ".content&&Text").replace(/\n|\t/g, "").trim(); } catch(e){}
  try { if (".lazyload&&data-original") VOD.vod_pic = pd(detailHtml, ".lazyload&&data-original", MY_URL); } catch(e){}
  var tabsSel = ".nav-tabs li";
  var tabText = "body&&Text";
  var names = []; var seen = {}; var tabAnchors = [];
  var tabEls = []; try { tabEls = pdfa(detailHtml, tabsSel); } catch(e) { tabEls = []; };
  for (var i=0;i<tabEls.length;i++){
    var nm = ""; try { nm = pdfh(tabEls[i], tabText).trim(); } catch(e){}
    if(!nm) nm = "线路空";
    nm = nm.replace(/\s+/g,"").replace(/\d{2,}$/,"");
    var th = ""; try { th = (pdfh(tabEls[i], "a&&href") || "").trim(); } catch(e) {}
    var isAnch = "playlist" && th.indexOf("#playlist") === 0;
    if(/同类型|同主演|同年份|相关推荐|猜你|喜欢|热搜|排行榜|热播榜|精彩推介/.test(nm) && !isAnch) continue;
    if(seen[nm]){ seen[nm]++; nm = nm + seen[nm]; } else { seen[nm]=1; }
    names.push(nm);
    tabAnchors.push(isAnch ? th : "");
  }
  var listText = "a&&Text";
  var listUrl = "a&&href";
  var listPrefix = "";
  var listFilter = "";
  var listFilterRe = null;
  if (listFilter) { try { listFilterRe = new RegExp(listFilter, "i"); } catch(e) {} }
  var urls = [];
var froms = [];
for (var i=0;i<names.length;i++){
  var p1 = tabAnchors[i] ? (tabAnchors[i] + " li") : "[id^=\"playlist\"]:eq(#id) li".replace(/#idv/g, names[i]).replace(/#id/g, String(i));
  var items = []; try { items = pdfa(detailHtml, p1); } catch(e) { items = []; }
  var arr = []; var dup = {};
  for (var j=0;j<items.length;j++){
    var nm2 = ""; try { nm2 = pdfh(items[j], listText).trim(); } catch(e){}
    if(!nm2) nm2 = "第"+(j+1)+"集";
    var u = ""; try { u = pd(items[j], listUrl, MY_URL); } catch(e){ u=""; }
    if(!u) continue;
    if(listFilterRe && listFilterRe.test(nm2)) continue;
    if(listPrefix) u = listPrefix + u;
    if(dup[u]) continue; dup[u]=1;
    arr.push(nm2 + "$" + u);
  }
  if (arr.length > 0) {
    froms.push("君子兰" + (froms.length < 20 ? String.fromCharCode(9312 + froms.length) : String(froms.length + 1)));
    urls.push(arr.join("#"));
  }
}
VOD.vod_play_from = froms.join("$$$") || "播放";
  VOD.vod_play_url = urls.join("$$$");
  setResult(VOD);
}),
  // 筛选器：TVBox 标准 filter（按分类ID 键，引擎 home() 原样返回给 TVBox 渲染筛选行）
  filter: {"1":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"%E5%8F%A4%E8%A3%85"},{"n":"战争","v":"%E6%88%98%E4%BA%89"},{"n":"青春偶像","v":"%E9%9D%92%E6%98%A5%E5%81%B6%E5%83%8F"},{"n":"喜剧","v":"%E5%96%9C%E5%89%A7"},{"n":"家庭","v":"%E5%AE%B6%E5%BA%AD"},{"n":"犯罪","v":"%E7%8A%AF%E7%BD%AA"},{"n":"动作","v":"%E5%8A%A8%E4%BD%9C"},{"n":"奇幻","v":"%E5%A5%87%E5%B9%BB"},{"n":"剧情","v":"%E5%89%A7%E6%83%85"},{"n":"历史","v":"%E5%8E%86%E5%8F%B2"},{"n":"经典","v":"%E7%BB%8F%E5%85%B8"},{"n":"乡村","v":"%E4%B9%A1%E6%9D%91"},{"n":"情景","v":"%E6%83%85%E6%99%AF"},{"n":"商战","v":"%E5%95%86%E6%88%98"},{"n":"网剧","v":"%E7%BD%91%E5%89%A7"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"%E5%86%85%E5%9C%B0"},{"n":"韩国","v":"%E9%9F%A9%E5%9B%BD"},{"n":"香港","v":"%E9%A6%99%E6%B8%AF"},{"n":"台湾","v":"%E5%8F%B0%E6%B9%BE"},{"n":"日本","v":"%E6%97%A5%E6%9C%AC"},{"n":"美国","v":"%E7%BE%8E%E5%9B%BD"},{"n":"泰国","v":"%E6%B3%B0%E5%9B%BD"},{"n":"英国","v":"%E8%8B%B1%E5%9B%BD"},{"n":"新加坡","v":"%E6%96%B0%E5%8A%A0%E5%9D%A1"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"%E5%9B%BD%E8%AF%AD"},{"n":"英语","v":"%E8%8B%B1%E8%AF%AD"},{"n":"粤语","v":"%E7%B2%A4%E8%AF%AD"},{"n":"闽南语","v":"%E9%97%BD%E5%8D%97%E8%AF%AD"},{"n":"韩语","v":"%E9%9F%A9%E8%AF%AD"},{"n":"日语","v":"%E6%97%A5%E8%AF%AD"},{"n":"其它","v":"%E5%85%B6%E5%AE%83"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],"2":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"%E5%8F%A4%E8%A3%85"},{"n":"战争","v":"%E6%88%98%E4%BA%89"},{"n":"青春偶像","v":"%E9%9D%92%E6%98%A5%E5%81%B6%E5%83%8F"},{"n":"喜剧","v":"%E5%96%9C%E5%89%A7"},{"n":"家庭","v":"%E5%AE%B6%E5%BA%AD"},{"n":"犯罪","v":"%E7%8A%AF%E7%BD%AA"},{"n":"动作","v":"%E5%8A%A8%E4%BD%9C"},{"n":"奇幻","v":"%E5%A5%87%E5%B9%BB"},{"n":"剧情","v":"%E5%89%A7%E6%83%85"},{"n":"历史","v":"%E5%8E%86%E5%8F%B2"},{"n":"经典","v":"%E7%BB%8F%E5%85%B8"},{"n":"乡村","v":"%E4%B9%A1%E6%9D%91"},{"n":"情景","v":"%E6%83%85%E6%99%AF"},{"n":"商战","v":"%E5%95%86%E6%88%98"},{"n":"网剧","v":"%E7%BD%91%E5%89%A7"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"%E5%86%85%E5%9C%B0"},{"n":"韩国","v":"%E9%9F%A9%E5%9B%BD"},{"n":"香港","v":"%E9%A6%99%E6%B8%AF"},{"n":"台湾","v":"%E5%8F%B0%E6%B9%BE"},{"n":"日本","v":"%E6%97%A5%E6%9C%AC"},{"n":"美国","v":"%E7%BE%8E%E5%9B%BD"},{"n":"泰国","v":"%E6%B3%B0%E5%9B%BD"},{"n":"英国","v":"%E8%8B%B1%E5%9B%BD"},{"n":"新加坡","v":"%E6%96%B0%E5%8A%A0%E5%9D%A1"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"%E5%9B%BD%E8%AF%AD"},{"n":"英语","v":"%E8%8B%B1%E8%AF%AD"},{"n":"粤语","v":"%E7%B2%A4%E8%AF%AD"},{"n":"闽南语","v":"%E9%97%BD%E5%8D%97%E8%AF%AD"},{"n":"韩语","v":"%E9%9F%A9%E8%AF%AD"},{"n":"日语","v":"%E6%97%A5%E8%AF%AD"},{"n":"其它","v":"%E5%85%B6%E5%AE%83"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],"3":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"%E5%8F%A4%E8%A3%85"},{"n":"战争","v":"%E6%88%98%E4%BA%89"},{"n":"青春偶像","v":"%E9%9D%92%E6%98%A5%E5%81%B6%E5%83%8F"},{"n":"喜剧","v":"%E5%96%9C%E5%89%A7"},{"n":"家庭","v":"%E5%AE%B6%E5%BA%AD"},{"n":"犯罪","v":"%E7%8A%AF%E7%BD%AA"},{"n":"动作","v":"%E5%8A%A8%E4%BD%9C"},{"n":"奇幻","v":"%E5%A5%87%E5%B9%BB"},{"n":"剧情","v":"%E5%89%A7%E6%83%85"},{"n":"历史","v":"%E5%8E%86%E5%8F%B2"},{"n":"经典","v":"%E7%BB%8F%E5%85%B8"},{"n":"乡村","v":"%E4%B9%A1%E6%9D%91"},{"n":"情景","v":"%E6%83%85%E6%99%AF"},{"n":"商战","v":"%E5%95%86%E6%88%98"},{"n":"网剧","v":"%E7%BD%91%E5%89%A7"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"%E5%86%85%E5%9C%B0"},{"n":"韩国","v":"%E9%9F%A9%E5%9B%BD"},{"n":"香港","v":"%E9%A6%99%E6%B8%AF"},{"n":"台湾","v":"%E5%8F%B0%E6%B9%BE"},{"n":"日本","v":"%E6%97%A5%E6%9C%AC"},{"n":"美国","v":"%E7%BE%8E%E5%9B%BD"},{"n":"泰国","v":"%E6%B3%B0%E5%9B%BD"},{"n":"英国","v":"%E8%8B%B1%E5%9B%BD"},{"n":"新加坡","v":"%E6%96%B0%E5%8A%A0%E5%9D%A1"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"%E5%9B%BD%E8%AF%AD"},{"n":"英语","v":"%E8%8B%B1%E8%AF%AD"},{"n":"粤语","v":"%E7%B2%A4%E8%AF%AD"},{"n":"闽南语","v":"%E9%97%BD%E5%8D%97%E8%AF%AD"},{"n":"韩语","v":"%E9%9F%A9%E8%AF%AD"},{"n":"日语","v":"%E6%97%A5%E8%AF%AD"},{"n":"其它","v":"%E5%85%B6%E5%AE%83"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],"4":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"%E5%8F%A4%E8%A3%85"},{"n":"战争","v":"%E6%88%98%E4%BA%89"},{"n":"青春偶像","v":"%E9%9D%92%E6%98%A5%E5%81%B6%E5%83%8F"},{"n":"喜剧","v":"%E5%96%9C%E5%89%A7"},{"n":"家庭","v":"%E5%AE%B6%E5%BA%AD"},{"n":"犯罪","v":"%E7%8A%AF%E7%BD%AA"},{"n":"动作","v":"%E5%8A%A8%E4%BD%9C"},{"n":"奇幻","v":"%E5%A5%87%E5%B9%BB"},{"n":"剧情","v":"%E5%89%A7%E6%83%85"},{"n":"历史","v":"%E5%8E%86%E5%8F%B2"},{"n":"经典","v":"%E7%BB%8F%E5%85%B8"},{"n":"乡村","v":"%E4%B9%A1%E6%9D%91"},{"n":"情景","v":"%E6%83%85%E6%99%AF"},{"n":"商战","v":"%E5%95%86%E6%88%98"},{"n":"网剧","v":"%E7%BD%91%E5%89%A7"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"%E5%86%85%E5%9C%B0"},{"n":"韩国","v":"%E9%9F%A9%E5%9B%BD"},{"n":"香港","v":"%E9%A6%99%E6%B8%AF"},{"n":"台湾","v":"%E5%8F%B0%E6%B9%BE"},{"n":"日本","v":"%E6%97%A5%E6%9C%AC"},{"n":"美国","v":"%E7%BE%8E%E5%9B%BD"},{"n":"泰国","v":"%E6%B3%B0%E5%9B%BD"},{"n":"英国","v":"%E8%8B%B1%E5%9B%BD"},{"n":"新加坡","v":"%E6%96%B0%E5%8A%A0%E5%9D%A1"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"%E5%9B%BD%E8%AF%AD"},{"n":"英语","v":"%E8%8B%B1%E8%AF%AD"},{"n":"粤语","v":"%E7%B2%A4%E8%AF%AD"},{"n":"闽南语","v":"%E9%97%BD%E5%8D%97%E8%AF%AD"},{"n":"韩语","v":"%E9%9F%A9%E8%AF%AD"},{"n":"日语","v":"%E6%97%A5%E8%AF%AD"},{"n":"其它","v":"%E5%85%B6%E5%AE%83"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}],"5":[{"key":"class","name":"剧情","value":[{"n":"全部","v":""},{"n":"古装","v":"%E5%8F%A4%E8%A3%85"},{"n":"战争","v":"%E6%88%98%E4%BA%89"},{"n":"青春偶像","v":"%E9%9D%92%E6%98%A5%E5%81%B6%E5%83%8F"},{"n":"喜剧","v":"%E5%96%9C%E5%89%A7"},{"n":"家庭","v":"%E5%AE%B6%E5%BA%AD"},{"n":"犯罪","v":"%E7%8A%AF%E7%BD%AA"},{"n":"动作","v":"%E5%8A%A8%E4%BD%9C"},{"n":"奇幻","v":"%E5%A5%87%E5%B9%BB"},{"n":"剧情","v":"%E5%89%A7%E6%83%85"},{"n":"历史","v":"%E5%8E%86%E5%8F%B2"},{"n":"经典","v":"%E7%BB%8F%E5%85%B8"},{"n":"乡村","v":"%E4%B9%A1%E6%9D%91"},{"n":"情景","v":"%E6%83%85%E6%99%AF"},{"n":"商战","v":"%E5%95%86%E6%88%98"},{"n":"网剧","v":"%E7%BD%91%E5%89%A7"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"area","name":"地区","value":[{"n":"全部","v":""},{"n":"内地","v":"%E5%86%85%E5%9C%B0"},{"n":"韩国","v":"%E9%9F%A9%E5%9B%BD"},{"n":"香港","v":"%E9%A6%99%E6%B8%AF"},{"n":"台湾","v":"%E5%8F%B0%E6%B9%BE"},{"n":"日本","v":"%E6%97%A5%E6%9C%AC"},{"n":"美国","v":"%E7%BE%8E%E5%9B%BD"},{"n":"泰国","v":"%E6%B3%B0%E5%9B%BD"},{"n":"英国","v":"%E8%8B%B1%E5%9B%BD"},{"n":"新加坡","v":"%E6%96%B0%E5%8A%A0%E5%9D%A1"},{"n":"其他","v":"%E5%85%B6%E4%BB%96"}]},{"key":"year","name":"年份","value":[{"n":"全部","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"},{"n":"2009","v":"2009"},{"n":"2008","v":"2008"},{"n":"2006","v":"2006"},{"n":"2005","v":"2005"},{"n":"2004","v":"2004"}]},{"key":"lang","name":"语言","value":[{"n":"全部","v":""},{"n":"国语","v":"%E5%9B%BD%E8%AF%AD"},{"n":"英语","v":"%E8%8B%B1%E8%AF%AD"},{"n":"粤语","v":"%E7%B2%A4%E8%AF%AD"},{"n":"闽南语","v":"%E9%97%BD%E5%8D%97%E8%AF%AD"},{"n":"韩语","v":"%E9%9F%A9%E8%AF%AD"},{"n":"日语","v":"%E6%97%A5%E8%AF%AD"},{"n":"其它","v":"%E5%85%B6%E5%AE%83"}]},{"key":"letter","name":"字母","value":[{"n":"全部","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"全部","v":""},{"n":"时间","v":"time"},{"n":"人气","v":"hits"},{"n":"评分","v":"score"}]}]},
  // 筛选默认值：各分类下各筛选项的默认取值（空=全部），配合 url 里的 {{fl.键名}} 使用
  filter_def: {"1":{"class":"","area":"","year":"","lang":"","letter":"","by":""},"2":{"class":"","area":"","year":"","lang":"","letter":"","by":""},"3":{"class":"","area":"","year":"","lang":"","letter":"","by":""},"4":{"class":"","area":"","year":"","lang":"","letter":"","by":""},"5":{"class":"","area":"","year":"","lang":"","letter":"","by":""}},
  // 引擎只在 filter_url 非空时才对 url 做 jinja2 渲染（渲染 {{fl.xxx}}）；"&" 无副作用
  filter_url: "&",
  play: $js.toString(() => {
  var u = (typeof input === "string") ? input.split(String.fromCharCode(36)).pop() : "";
  if (u) {
  var playHtml = "";
  try { playHtml = (typeof request === "function") ? request(u) : ""; } catch(e) { playHtml = ""; }
  if (!playHtml && typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) playHtml = input;
  playHtml = playHtml.split(String.fromCharCode(92) + String.fromCharCode(47)).join(String.fromCharCode(47));
  var m3u8 = "";
  var sm = playHtml.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
  if (sm) m3u8 = sm[0];
  if (!m3u8) {
    var ms = playHtml.match(/"url"\s*:\s*"([^"]+)"/g) || [];
    var cand = "";
    for (var j = 0; j < ms.length; j++) {
      var ju = ms[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join(String.fromCharCode(47));
      if (/\.(?:m3u8|mp4)(?:\?|$)/i.test(ju)) { m3u8 = ju; break; }
      if (/^https?:\/\//i.test(ju) && !cand) cand = ju;
    }
    if (!m3u8 && cand) {
      var p2 = "";
      try { p2 = request(cand); } catch(e) { p2 = ""; }
      p2 = String(p2 || "").split(String.fromCharCode(92)).join(String.fromCharCode(47));
      var m2 = p2.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
      if (m2) m3u8 = m2[0];
    }
  }
  if (!m3u8) {
    var pm = playHtml.match(/"第0?\d+集\$https?:\/\/[^"]*"/g);
    if (pm && pm.length) { for (var k = 0; k < pm.length; k++) { var mm = pm[k].match(/\$https?:\/\/[^"]*\.(?:m3u8|mp4)/); if (mm) { m3u8 = mm[0].replace(/^\$/, ""); break; } } }
  }
  if (m3u8) input = { parse: 0, url: m3u8, jx: 0 };
  if (typeof setResult === "function") setResult(input);
  }
}),
  lazy: $js.toString(() => {
  var u = (typeof input === "string") ? input.split(String.fromCharCode(36)).pop() : "";
  if (u) {
  var playHtml = "";
  try { playHtml = (typeof request === "function") ? request(u) : ""; } catch(e) { playHtml = ""; }
  if (!playHtml && typeof input === "string" && input.indexOf(String.fromCharCode(60)) > -1) playHtml = input;
  playHtml = playHtml.split(String.fromCharCode(92) + String.fromCharCode(47)).join(String.fromCharCode(47));
  var m3u8 = "";
  var sm = playHtml.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
  if (sm) m3u8 = sm[0];
  if (!m3u8) {
    var ms = playHtml.match(/"url"\s*:\s*"([^"]+)"/g) || [];
    var cand = "";
    for (var j = 0; j < ms.length; j++) {
      var ju = ms[j].match(/:\s*"([^"]+)"/)[1].split(String.fromCharCode(92)).join(String.fromCharCode(47));
      if (/\.(?:m3u8|mp4)(?:\?|$)/i.test(ju)) { m3u8 = ju; break; }
      if (/^https?:\/\//i.test(ju) && !cand) cand = ju;
    }
    if (!m3u8 && cand) {
      var p2 = "";
      try { p2 = request(cand); } catch(e) { p2 = ""; }
      p2 = String(p2 || "").split(String.fromCharCode(92)).join(String.fromCharCode(47));
      var m2 = p2.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
      if (m2) m3u8 = m2[0];
    }
  }
  if (!m3u8) {
    var pm = playHtml.match(/"第0?\d+集\$https?:\/\/[^"]*"/g);
    if (pm && pm.length) { for (var k = 0; k < pm.length; k++) { var mm = pm[k].match(/\$https?:\/\/[^"]*\.(?:m3u8|mp4)/); if (mm) { m3u8 = mm[0].replace(/^\$/, ""); break; } } }
  }
  if (m3u8) input = { parse: 0, url: m3u8, jx: 0 };
  if (typeof setResult === "function") setResult(input);
  }
})
};