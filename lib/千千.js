var rule = {
  title: "千千影视",
  host: "https://www.qqys01.com",
  homeUrl: "https://www.qqys01.com/",
  url: "https://www.qqys01.com/vodtype/fyclass.html",
  searchUrl: "https://www.qqys01.com/vodsearch.html?wd=**",
  detailUrl: "https://www.qqys01.com/voddetailfyid.html",
  searchable: 1,
  quickSearch: 1,
  filterable: 0,
  timeout: 10000,
  play_parse: true,
  headers: { "User-Agent": "MOBILE_UA" },
  class_name: "电影&连续剧&综艺&动漫",
  class_url: "1&2&3&4",
  filter: false,

  // 推荐 = 首页卡片（卡片提取内联在本字段里，与真机验证过的源结构一致：整文件只有 var rule）
  推荐: $js.toString(() => {
    var out = [];
    var HOST = "https://www.qqys01.com";
    function pickCards(html) {
      var out = [], sd = {}, hp = 'href="' + HOST;
      if (html.indexOf(hp) >= 0) html = html.split(hp).join('href="');
      function nmPush(arr, seen, s) { s = (s || "").replace(/\s+/g, " ").trim(); if (s.length >= 2 && !seen[s]) { seen[s] = 1; arr.push(s); } }
      var parts = html.split('href="/voddetail');
      for (var i = 1; i < parts.length && out.length < 150; i++) {
        var c = parts[i];
        var idm = c.match(/^(\d+)(?:\.html)?/);
        if (!idm || sd[idm[1]]) continue;
        var ea = c.indexOf("</a>");
        var win = c.substring(0, ea > 0 ? Math.min(ea + 400, 2200) : 1400);
        // 片名候选全收：有的站卡里藏着站名/占位图title冒充片名，收齐后按重复率剔（循环后统一挑）
        var names = [], seen2 = {}, nm2, rg;
        rg = / title="([^"]{1,60})"/g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = / alt="([^"]{1,60})"/g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = /<(?:strong|h3)[^>]*>([^<]{1,60})</g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = /class="[^"]*title[^"]*"[^>]*>([^<]{1,60})</g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        nm2 = win.match(/>\s*([^<>]{2,40}?)\s*<\/a>/); if (nm2) nmPush(names, seen2, nm2[1]);
        // 图候选全收：懒加载站src常是占位图（真图在data-original/data-src），占位/logo图不配当海报
        var pics = [], pk;
        rg = /(?:data-original|data-src|data-background|src)="([^"]{1,200})"/g;
        while ((pk = rg.exec(win)) && pics.length < 10) pics.push(pk[1]);
        rg = /background-image:\s*url\(['"]?([^'")]{1,200})/g;
        while ((pk = rg.exec(win)) && pics.length < 10) pics.push(pk[1]);
        var pic = "";
        for (var p2 = 0; p2 < pics.length; p2++) {
          if (/placeholder|logo|nopic|no_?cover|default\.(png|jpg|webp)/i.test(pics[p2])) continue;
          pic = pics[p2]; break;
        }
        if (!pic) pic = pics[0] || "";
        if (pic && pic.indexOf("http") !== 0) pic = HOST + pic;
        // 图床替换：有的站把图挂自家域名但真图在图床，主域取图全是死链（学站时自动发现，找不到不启用）
        if (pic) pic = pic.split("__NOMAP__").join("__NOMAP__");
        var note = (win.match(/pic-text[^>]*>([^<]{1,30})</) || win.match(/module-item-note">([^<]{1,30})</) || win.match(/remarks?[^>]*>([^<]{1,30})</) || win.match(/note[^>]*>([^<]{1,30})</) || win.match(/-bottom[^>]*>\s*<span[^>]*>([^<]{1,30})</) || [])[1] || "";
        sd[idm[1]] = 1;
        out.push({ vod_id: idm[1], vod_name: names[0] || "", vod_pic: pic, vod_remarks: note, _nms: names });
      }
      // 站名冒充片名剔除：六成以上卡里都出现的候选（如占位图title=站名）不配当片名
      if (out.length >= 4) {
        var freq = {}, lim = out.length * 0.6;
        for (var j = 0; j < out.length; j++) {
          var arr = out[j]._nms || [];
          for (var k = 0; k < arr.length; k++) freq[arr[k]] = (freq[arr[k]] || 0) + 1;
        }
        for (var j = 0; j < out.length; j++) {
          var arr = out[j]._nms || [], pick = arr[0] || "";
          for (var k = 0; k < arr.length; k++) {
            if (arr[k] && (freq[arr[k]] || 0) <= lim) { pick = arr[k]; break; }
          }
          out[j].vod_name = pick;
          delete out[j]._nms;
        }
      } else {
        for (var j = 0; j < out.length; j++) { out[j].vod_name = (out[j]._nms || [])[0] || ""; delete out[j]._nms; }
      }
      return out;
    }
    try {
      var u = (typeof input !== "undefined" && input) ? String(input) : "https://www.qqys01.com/";
      out = pickCards(request(u));
    } catch (e) {}
    VODS = out;
  }),

  // 一级 = 分类卡片（fyclass-fypage 由引擎替换好塞进 input）
  一级: $js.toString(() => {
    var out = [];
    var HOST = "https://www.qqys01.com";
    function pickCards(html) {
      var out = [], sd = {}, hp = 'href="' + HOST;
      if (html.indexOf(hp) >= 0) html = html.split(hp).join('href="');
      function nmPush(arr, seen, s) { s = (s || "").replace(/\s+/g, " ").trim(); if (s.length >= 2 && !seen[s]) { seen[s] = 1; arr.push(s); } }
      var parts = html.split('href="/voddetail');
      for (var i = 1; i < parts.length && out.length < 150; i++) {
        var c = parts[i];
        var idm = c.match(/^(\d+)(?:\.html)?/);
        if (!idm || sd[idm[1]]) continue;
        var ea = c.indexOf("</a>");
        var win = c.substring(0, ea > 0 ? Math.min(ea + 400, 2200) : 1400);
        // 片名候选全收：有的站卡里藏着站名/占位图title冒充片名，收齐后按重复率剔（循环后统一挑）
        var names = [], seen2 = {}, nm2, rg;
        rg = / title="([^"]{1,60})"/g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = / alt="([^"]{1,60})"/g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = /<(?:strong|h3)[^>]*>([^<]{1,60})</g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = /class="[^"]*title[^"]*"[^>]*>([^<]{1,60})</g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        nm2 = win.match(/>\s*([^<>]{2,40}?)\s*<\/a>/); if (nm2) nmPush(names, seen2, nm2[1]);
        // 图候选全收：懒加载站src常是占位图（真图在data-original/data-src），占位/logo图不配当海报
        var pics = [], pk;
        rg = /(?:data-original|data-src|data-background|src)="([^"]{1,200})"/g;
        while ((pk = rg.exec(win)) && pics.length < 10) pics.push(pk[1]);
        rg = /background-image:\s*url\(['"]?([^'")]{1,200})/g;
        while ((pk = rg.exec(win)) && pics.length < 10) pics.push(pk[1]);
        var pic = "";
        for (var p2 = 0; p2 < pics.length; p2++) {
          if (/placeholder|logo|nopic|no_?cover|default\.(png|jpg|webp)/i.test(pics[p2])) continue;
          pic = pics[p2]; break;
        }
        if (!pic) pic = pics[0] || "";
        if (pic && pic.indexOf("http") !== 0) pic = HOST + pic;
        // 图床替换：有的站把图挂自家域名但真图在图床，主域取图全是死链（学站时自动发现，找不到不启用）
        if (pic) pic = pic.split("__NOMAP__").join("__NOMAP__");
        var note = (win.match(/pic-text[^>]*>([^<]{1,30})</) || win.match(/module-item-note">([^<]{1,30})</) || win.match(/remarks?[^>]*>([^<]{1,30})</) || win.match(/note[^>]*>([^<]{1,30})</) || win.match(/-bottom[^>]*>\s*<span[^>]*>([^<]{1,30})</) || [])[1] || "";
        sd[idm[1]] = 1;
        out.push({ vod_id: idm[1], vod_name: names[0] || "", vod_pic: pic, vod_remarks: note, _nms: names });
      }
      // 站名冒充片名剔除：六成以上卡里都出现的候选（如占位图title=站名）不配当片名
      if (out.length >= 4) {
        var freq = {}, lim = out.length * 0.6;
        for (var j = 0; j < out.length; j++) {
          var arr = out[j]._nms || [];
          for (var k = 0; k < arr.length; k++) freq[arr[k]] = (freq[arr[k]] || 0) + 1;
        }
        for (var j = 0; j < out.length; j++) {
          var arr = out[j]._nms || [], pick = arr[0] || "";
          for (var k = 0; k < arr.length; k++) {
            if (arr[k] && (freq[arr[k]] || 0) <= lim) { pick = arr[k]; break; }
          }
          out[j].vod_name = pick;
          delete out[j]._nms;
        }
      } else {
        for (var j = 0; j < out.length; j++) { out[j].vod_name = (out[j]._nms || [])[0] || ""; delete out[j]._nms; }
      }
      return out;
    }
    try {
      // 单页分类诚实牌：门牌里没有 fypage（这站没真翻页，qqys01实锤）→ 页2起空手而归，不装翻页
      var _pg0 = (typeof MY_PAGE !== "undefined" && MY_PAGE) ? Number(MY_PAGE) || 1 : 1;
      var _hasFyp = "/vodtype/fyclass.html".indexOf("fypage") >= 0;
      if (!(_pg0 > 1 && !_hasFyp)) {
        var u = "";
        if (typeof input !== "undefined" && input) u = String(input);
        else if (typeof MY_URL !== "undefined" && MY_URL) u = String(MY_URL);
        if (!u && typeof MY_CATE !== "undefined" && MY_CATE) u = HOST + "/vodtype/fyclass.html".replace("fyclass", String(MY_CATE)).replace(/fypage/g, "1");
        // 选了筛选（二级分类）→ 按现场学的筛选路数拼地址：
        // show 路由：/vod/show/id/{分类}/class/类型/area/地区/lang/语言/year/年份/page/页.html
        // /s/ 路由（个别站私有）：/s/page/页/year/年/area/地区.html
        var fl = (typeof MY_FL !== "undefined" && MY_FL) ? MY_FL : {};
        var pg = (typeof MY_PAGE !== "undefined" && MY_PAGE) ? String(MY_PAGE) : "1";
        var FST = "";
        if (FST == "show" && "") {
          var cate = "";
          if (typeof MY_CATE !== "undefined" && MY_CATE) cate = String(MY_CATE);
          if (!cate) { var cm = (u || "").match(/id\/(\d+)/) || (u || "").match(/(\d+)(?:\.html)?/); if (cm) cate = cm[1]; }
          var segs = "";
          if (fl["class"]) segs += "/class/" + encodeURIComponent(String(fl["class"]));
          if (fl.area) segs += "/area/" + encodeURIComponent(String(fl.area));
          if (fl.lang) segs += "/lang/" + encodeURIComponent(String(fl.lang));
          if (fl.year) segs += "/year/" + encodeURIComponent(String(fl.year));
          if (segs && cate) u = HOST + "" + cate + segs + "/page/" + pg + ".html";
        } else if ((fl.area || fl.year) && "") {
          var ps = ["page/" + pg];
          if (fl.year) ps.push("year/" + encodeURIComponent(String(fl.year)));
          if (fl.area) ps.push("area/" + encodeURIComponent(String(fl.area)));
          u = HOST + "".replace("**", ps.join("/"));
        }
        out = pickCards(request(u));
      }
    } catch (e) {}
    VODS = out;
  }),

  // 搜索：suggest 快搜接口为主，网页搜索页兜底（关键词 KEY 优先，取不到从 input 提取）
  搜索: $js.toString(() => {
    var out = [];
    var HOST = "https://www.qqys01.com";
    function pickCards(html) {
      var out = [], sd = {}, hp = 'href="' + HOST;
      if (html.indexOf(hp) >= 0) html = html.split(hp).join('href="');
      function nmPush(arr, seen, s) { s = (s || "").replace(/\s+/g, " ").trim(); if (s.length >= 2 && !seen[s]) { seen[s] = 1; arr.push(s); } }
      var parts = html.split('href="/voddetail');
      for (var i = 1; i < parts.length && out.length < 150; i++) {
        var c = parts[i];
        var idm = c.match(/^(\d+)(?:\.html)?/);
        if (!idm || sd[idm[1]]) continue;
        var ea = c.indexOf("</a>");
        var win = c.substring(0, ea > 0 ? Math.min(ea + 400, 2200) : 1400);
        // 片名候选全收：有的站卡里藏着站名/占位图title冒充片名，收齐后按重复率剔（循环后统一挑）
        var names = [], seen2 = {}, nm2, rg;
        rg = / title="([^"]{1,60})"/g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = / alt="([^"]{1,60})"/g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = /<(?:strong|h3)[^>]*>([^<]{1,60})</g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        rg = /class="[^"]*title[^"]*"[^>]*>([^<]{1,60})</g; while ((nm2 = rg.exec(win))) nmPush(names, seen2, nm2[1]);
        nm2 = win.match(/>\s*([^<>]{2,40}?)\s*<\/a>/); if (nm2) nmPush(names, seen2, nm2[1]);
        // 图候选全收：懒加载站src常是占位图（真图在data-original/data-src），占位/logo图不配当海报
        var pics = [], pk;
        rg = /(?:data-original|data-src|data-background|src)="([^"]{1,200})"/g;
        while ((pk = rg.exec(win)) && pics.length < 10) pics.push(pk[1]);
        rg = /background-image:\s*url\(['"]?([^'")]{1,200})/g;
        while ((pk = rg.exec(win)) && pics.length < 10) pics.push(pk[1]);
        var pic = "";
        for (var p2 = 0; p2 < pics.length; p2++) {
          if (/placeholder|logo|nopic|no_?cover|default\.(png|jpg|webp)/i.test(pics[p2])) continue;
          pic = pics[p2]; break;
        }
        if (!pic) pic = pics[0] || "";
        if (pic && pic.indexOf("http") !== 0) pic = HOST + pic;
        // 图床替换：有的站把图挂自家域名但真图在图床，主域取图全是死链（学站时自动发现，找不到不启用）
        if (pic) pic = pic.split("__NOMAP__").join("__NOMAP__");
        var note = (win.match(/pic-text[^>]*>([^<]{1,30})</) || win.match(/module-item-note">([^<]{1,30})</) || win.match(/remarks?[^>]*>([^<]{1,30})</) || win.match(/note[^>]*>([^<]{1,30})</) || win.match(/-bottom[^>]*>\s*<span[^>]*>([^<]{1,30})</) || [])[1] || "";
        sd[idm[1]] = 1;
        out.push({ vod_id: idm[1], vod_name: names[0] || "", vod_pic: pic, vod_remarks: note, _nms: names });
      }
      // 站名冒充片名剔除：六成以上卡里都出现的候选（如占位图title=站名）不配当片名
      if (out.length >= 4) {
        var freq = {}, lim = out.length * 0.6;
        for (var j = 0; j < out.length; j++) {
          var arr = out[j]._nms || [];
          for (var k = 0; k < arr.length; k++) freq[arr[k]] = (freq[arr[k]] || 0) + 1;
        }
        for (var j = 0; j < out.length; j++) {
          var arr = out[j]._nms || [], pick = arr[0] || "";
          for (var k = 0; k < arr.length; k++) {
            if (arr[k] && (freq[arr[k]] || 0) <= lim) { pick = arr[k]; break; }
          }
          out[j].vod_name = pick;
          delete out[j]._nms;
        }
      } else {
        for (var j = 0; j < out.length; j++) { out[j].vod_name = (out[j]._nms || [])[0] || ""; delete out[j]._nms; }
      }
      return out;
    }
    var kw = "";
    try { if (typeof KEY !== "undefined" && KEY) kw = String(KEY); } catch (eK) {}
    if (!kw && typeof input !== "undefined" && input) {
      var s = String(input);
      var im = s.match(/vodsearch[\=\/\-]([^\/&?#\.]+)/);
      if (im) kw = im[1];
      var im2 = s.match(/[?&](?:wd|keyword|kw|q|key|k|s|searchword)=([^&?#]+)/); if (im2) kw = im2[1];
      if (kw.indexOf("%") >= 0) { try { kw = decodeURIComponent(kw); } catch (eD) {} }
    }
    kw = String(kw || "").replace(/-{2,}[\s\S]*$/, "").replace(/^\s+|\s+$/g, "");
    if (kw) {
      // 路线1：suggest 快搜接口
      var SUG = "";
      if (SUG) {
        try {
          var jo = JSON.parse(request(HOST + "/" + SUG + encodeURIComponent(kw)));
          if (jo && jo.list && jo.list.length > 0) {
            for (var i = 0; i < jo.list.length && out.length < 60; i++) {
              var it = jo.list[i] || {};
              var pc = String(it.pic || "");
              if (pc && pc.indexOf("http") !== 0) pc = HOST + pc;
              out.push({ vod_id: String(it.id), vod_name: String(it.name || ""), vod_pic: pc, vod_remarks: "" });
            }
          }
        } catch (e1) {}
      }
      // 路线2：网页搜索页解析（接口没配或没中再走）；门牌带牌子占位的先去指定页面现取新牌子
      if (out.length === 0 && "/vodsearch.html?wd=**") {
        try {
          var su = "/vodsearch.html?wd=**", TS = {};
          if (TS && TS.param) {
            var tk = "";
            try {
              var hh = request(HOST + (TS.src || "/"));
              var tm3 = hh.match(new RegExp(TS.re));
              if (tm3) tk = tm3[1];
            } catch (eT) {}
            tk = tk || TS.sample || "";
            su = su.split("__TOKEN__").join(encodeURIComponent(tk));
          }
          var u = HOST + su.replace("**", encodeURIComponent(kw)).replace(/fypage/g, String((typeof MY_PAGE !== "undefined" && MY_PAGE) || 1));
          out = pickCards(request(u));
        } catch (e2) {}
      }
    }
    VODS = out;
  }),

  // 二级 = 详情 + 各线路集数（线号分组，线路名保原名）
  二级: $js.toString(() => {
    VOD = VOD || {};
    try {
      var HOST = "https://www.qqys01.com";
      var u = (typeof MY_URL !== "undefined" && MY_URL) ? String(MY_URL) : (typeof input !== "undefined" ? String(input) : "");
      var html = request(u);
      var ttX = html.match(/<title>([^<]{1,120})<\/title>/);
      var t1 = html.match(/<h1[^>]*>([^<]{1,80})<\/h1>/) || html.match(/<h3[^>]*class="[^"]*title[^"]*"[^>]*>\s*([^<]{1,80})</) || html.match(/<title>[^<]*《([^<]{1,60})》/);
      // 防冒充：h1/h3 字样必须出现在网页标题里才算片名（板块标题"播放列表"这类直接弃用）
      if (t1 && ttX && ttX[1].indexOf(t1[1]) < 0) t1 = null;
      if (!t1 && ttX) { // 兜底：<title>片名-高清免费在线观看-站名 → 取首段并剥尾巴
        var seg = ttX[1].split("-")[0].split("_")[0];
        seg = seg.replace(/免费[^ ]*在线观看.*$/, "").replace(/在线观看.*$/, "").replace(/\s*(电影|电视剧|综艺|动漫|短剧|全集|高清|完整版|手机版)\s*$/, "").trim();
        if (seg && seg.length >= 2) t1 = [null, seg];
      }
      VOD.vod_name = t1 ? t1[1] : "";
      VOD.vod_id = u;
      var p1 = html.match(/og:image" content="([^"]{1,200})"/) || html.match(/<img[^>]+(?:data-original|data-src|src)="([^"]+\.(?:jpg|jpeg|png|webp)[^"]*)"/i);
      var pic = p1 ? p1[1] : "";
      if (pic && pic.indexOf("http") !== 0) pic = HOST + pic;
        // 图床替换：有的站把图挂自家域名但真图在图床，主域取图全是死链（学站时自动发现，找不到不启用）
        if (pic) pic = pic.split("__NOMAP__").join("__NOMAP__");
      VOD.vod_pic = pic;
      var c1 = html.match(/module-info-introduction[^>]*>([\s\S]{1,600}?)<\/div>/) || html.match(/class="sketch[^"]*"[^>]*>([\s\S]{1,600}?)<\/div>/);
      VOD.vod_content = c1 ? c1[1].replace(/<[^>]+>/g, "").trim() : "";
      // 线路名：播放区之前的 data-dropdown-value，兜底 tab 标题文本
      var st1 = html.search(/module-play-list-content|id="playlist\d/);
      var head = st1 >= 0 ? html.substring(0, st1) : html;
      var names = [];
      var nmRe = /data-dropdown-value="([^"]{1,30})"/g;
      var nm2;
      while ((nm2 = nmRe.exec(head)) !== null) names.push(nm2[1]);
      if (names.length === 0) {
        var tre = /module-tab-item[^>]*>\s*(?:<span>)?\s*([^<]{1,25}?)\s*(?:<\/span>)?\s*</g;
        while ((nm2 = tre.exec(head)) !== null) {
          var tn = nm2[1];
          if (tn && names.indexOf(tn) < 0 && !/^\d+$/.test(tn)) names.push(tn);
        }
      }
      // 播放区截段（去掉页尾推荐区）
      var seg = html;
      if (st1 >= 0) {
        var rest = html.substring(st1);
        var endm = rest.search(/module-player|module-title|猜你|相关推荐|喜欢|热播|资讯|评论|comment/);
        seg = endm > 0 ? rest.substring(0, endm) : rest;
      }
      // 全局提取集数链接，按线号分组；优先用工具现场学的播放门牌（最贴这个站），
      // 没学出来再走老三样：三段式（{片}-{线}-{集}）、两段式（/watch/{片}/{集}）
      var ln = {}, seen = {}, em, ep3 = 0, ep2 = 0, epX = 0;
      if ("/vodplay/\\d+\\-(\\d+)\\-(\\d+)\\.html") {
        var ereL = new RegExp('href="(/vodplay/\\d+\\-(\\d+)\\-(\\d+)\\.html)"[^>]*>([\\s\\S]{0,600}?)</a>', 'g');
        while ((em = ereL.exec(seg)) !== null) {
          var euX = em[1];
          if (seen[euX]) continue;
          seen[euX] = 1;
          epX++;
          if (euX.indexOf("http") !== 0) euX = HOST + euX;
          var enX = em[4] ? em[4].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : "";
          var _di = enX.indexOf("$"); if (_di > 0) enX = enX.substring(0, _di).trim();  // 集名里掺了直链的站（feifei复制框实锤）：$前头才是集名
          if (!enX) enX = (3 > 0 && em[3]) ? "第" + em[3] + "集" : "第" + epX + "集";
          var Lv = (2 > 0 && em[2]) ? Number(em[2]) : 1;
          if (!ln[Lv]) ln[Lv] = [];
          ln[Lv].push(enX + "$" + euX);
        }
      }
      var epRe = /href="([^"]*-(\d+)-(\d+)(?:\.html)?)"[^>]*>([\s\S]{0,300}?)<\/a>/g;
      var epRe2 = /href="([^"]*\/\d+\/\d+(?:\.html)?)"[^>]*>([\s\S]{0,300}?)<\/a>/g;
      if (epX === 0) while ((em = epRe.exec(seg)) !== null) {
        ep3++;
        var L = Number(em[2]);
        var eu = em[1];
        var key = L + "|" + eu;
        if (seen[key]) continue;
        seen[key] = 1;
        if (eu.indexOf("http") !== 0) eu = HOST + eu;
        var en = em[4].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
        if (!en) en = "第" + em[3] + "集";
        if (!ln[L]) ln[L] = [];
        ln[L].push(en + "$" + eu);
      }
      // 路由式播放链接（/vod/play/{片}/{线}/{集}、/vod/play/{片}/sid/{集} 这类新式站）：
      // 倒数第二段是数字就当线路号（sid 或非数字一律归线路1），最后一段当集。比两段式更专一，先试它
      if (ep3 === 0 && epX === 0) {
        var epRe3 = /href="([^"]*\/play\/[^"]*)"([^>]*)>([\s\S]{0,300}?)<\/a>/g;
        var one3 = [], sn3 = {}, ln3 = {};
        while ((em = epRe3.exec(seg)) !== null) {
          var eu3 = em[1];
          if (sn3[eu3]) continue;
          sn3[eu3] = 1;
          var sg3 = eu3.split("/");
          var tail3 = sg3[sg3.length - 1] || "";
          var mid3 = sg3[sg3.length - 2] || "";
          if (!/^\d+$/.test(tail3)) continue;
          var L3 = (/^\d+$/.test(mid3) && mid3 !== "sid") ? Number(mid3) : 1;
          var en3 = (em[3] || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
          if (!en3 || en3.length > 20 || /^(立即)?播放$|立即播放|^播放$/.test(en3)) en3 = "";
          ep2++;
          (ln3[L3] = ln3[L3] || []).push((en3 || "第" + (ln3[L3] ? ln3[L3].length + 1 : 1) + "集") + "$" + (eu3.indexOf("http") !== 0 ? HOST + eu3 : eu3));
        }
        for (var Lk in ln3) { ln[Lk] = ln3[Lk]; }
      }
      if (ep3 === 0 && ep2 === 0 && epX === 0) {
        var one = [], sn = {};
        while ((em = epRe2.exec(seg)) !== null) {
          var eu2 = em[1];
          if (sn[eu2]) continue;
          sn[eu2] = 1;
          ep2++;
          if (eu2.indexOf("http") !== 0) eu2 = HOST + eu2;
          var en2 = em[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
          if (!en2) en2 = "第" + ep2 + "集";
          one.push(en2 + "$" + eu2);
        }
        if (one.length > 0) { ln[1] = one; }
      }
      var od = Object.keys(ln).sort(function (a, b) { return Number(a) - Number(b); });
      var fr = [], us = [];
      od.forEach(function (L, i2) {
        fr.push(names.length > i2 ? names[i2] : "线路" + (i2 + 1));
        us.push(ln[L].join("#"));
      });
      if (fr.length > 0) {
        VOD.vod_play_from = fr.join("$$$");
        VOD.vod_play_url = us.join("$$$");
      }
    } catch (e) {}
  }),

  // play/lazy：input = 播放页地址，扒 player_aaaa 里的直链
  play: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      if (u && u.indexOf("http") !== 0) u = "https://www.qqys01.com" + u;
      if (u) {
        var html = "";
        try { html = (typeof request === "function") ? request(u) : ""; } catch (e2) { html = ""; }
        var url = "";
        var i = html.indexOf("player_aaaa");
        if (i < 0) i = html.indexOf("player_data");
        if (i >= 0) {
          var j = html.indexOf("{", i);
          if (j >= 0) {
            var depth = 0, k = j, seg = "";
            for (; k < html.length; k++) {
              var ch = html.charAt(k);
              if (ch === "{") { depth++; }
              else if (ch === "}") { depth--; if (depth === 0) { seg = html.substring(j, k + 1); break; } }
            }
            var um = seg.match(/"url"\s*:\s*"([^"]+)"/);
            if (um) url = um[1];
          }
        }
        if (url) url = url.split("\\/").join("/");
        // 脱马甲：百分号编码/base64 逐层剥，直到现出 http 直链（MacCMS encrypt 通用）
        function _b64d(s) {
          var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          s = String(s).replace(/[^A-Za-z0-9+\/=]/g, "");
          var out = "", bits = 0, acc = 0;
          for (var q = 0; q < s.length; q++) {
            var c = s.charAt(q);
            if (c === "=") break;
            var v = B.indexOf(c);
            if (v < 0) continue;
            acc = (acc << 6) | v; bits += 6;
            if (bits >= 8) { bits -= 8; out += String.fromCharCode((acc >> bits) & 0xFF); }
          }
          return out;
        }
        try {
          var prev = "", n8 = 0;
          while (url && url !== prev && n8 < 4 && !/^https?:\/\//i.test(url)) {
            prev = url; n8++;
            if (url.indexOf("%") >= 0) {
              var t8 = url;
              try { t8 = decodeURIComponent(url); } catch (eD1) { t8 = url; }
              if (t8 && t8 !== url) { url = t8; continue; }
            }
            if (/^[A-Za-z0-9+\/=]{12,}$/.test(url)) {
              var b8 = _b64d(url);
              if (b8) url = b8;
            }
          }
        } catch (e8) {}
        // 飞飞系：mac_url* = unescape('集名$直链#集名$直链$$$线路2...')——按播放页的 src/num 取对应那根
        if (!url) {
          var mm9 = html.match(/mac_url[A-Za-z0-9]*\s*=\s*(?:unescape\()?\s*['"]([^'"]{20,})['"]/);
          if (mm9) {
            var dc9 = mm9[1].replace(/%u([0-9A-Fa-f]{4})/g, function (_, w) { return String.fromCharCode(parseInt(w, 16)); }).replace(/%([0-9A-Fa-f]{2})/g, function (_, w) { return String.fromCharCode(parseInt(w, 16)); });
            var sm9 = u.match(/src-(\d+)-num-(\d+)/) || u.match(/-(\d+)-(\d+)\.html\s*$/);
            var li9 = sm9 ? Number(sm9[1]) : 1, no9 = sm9 ? Number(sm9[2]) : 1;
            var sg9 = dc9.indexOf("$$$") >= 0 ? dc9.split("$$$") : dc9.split("$$");
            var ln9 = (sg9[li9 - 1] && sg9[li9 - 1].indexOf("$") >= 0) ? sg9[li9 - 1] : dc9;
            var ep9 = ln9.split("#")[no9 - 1] || "";
            var pm9 = ep9.match(/\$([^$]+)$/);
            if (pm9) url = pm9[1];
          }
        }
        if (!url) {
          var dm2 = html.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
          if (dm2) url = dm2[0];
        }
        if (url && /pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(url)) {
          input = { parse: 0, url: "toast://网盘类链接不支持在线播放", jx: 0 };
          if (typeof setResult === "function") setResult(input);
        } else if (url && /(v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|le\.com|1905\.com)/i.test(url)) {
          // 大厂播放页不能扒——交给 json 里的解析线路接手
          input = { parse: 1, url: url, jx: 1 };
          if (typeof setResult === "function") setResult(input);
        } else if (url && /\.(m3u8|mp4)/i.test(url)) {
          input = { parse: 0, url: url, jx: 0 };
          if (typeof setResult === "function") setResult(input);
        } else if (url) {
          // 未知样式的播放地址也交解析线路，总比卡死强
          input = { parse: 1, url: url, jx: 1 };
          if (typeof setResult === "function") setResult(input);
        } else {
          input = { parse: 0, url: "toast://这集的播放地址没认出来", jx: 0 };
          if (typeof setResult === "function") setResult(input);
        }
      }
    } catch (e) {}
  }),
  lazy: $js.toString(() => {
    try {
      var u = (typeof input === "string") ? input : "";
      var d = u.lastIndexOf("$");
      if (d >= 0) u = u.substring(d + 1);
      if (u && u.indexOf("http") !== 0) u = "https://www.qqys01.com" + u;
      if (u) {
        var html = "";
        try { html = (typeof request === "function") ? request(u) : ""; } catch (e2) { html = ""; }
        var url = "";
        var i = html.indexOf("player_aaaa");
        if (i < 0) i = html.indexOf("player_data");
        if (i >= 0) {
          var j = html.indexOf("{", i);
          if (j >= 0) {
            var depth = 0, k = j, seg = "";
            for (; k < html.length; k++) {
              var ch = html.charAt(k);
              if (ch === "{") { depth++; }
              else if (ch === "}") { depth--; if (depth === 0) { seg = html.substring(j, k + 1); break; } }
            }
            var um = seg.match(/"url"\s*:\s*"([^"]+)"/);
            if (um) url = um[1];
          }
        }
        if (url) url = url.split("\\/").join("/");
        // 脱马甲：百分号编码/base64 逐层剥，直到现出 http 直链（MacCMS encrypt 通用）
        function _b64d(s) {
          var B = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
          s = String(s).replace(/[^A-Za-z0-9+\/=]/g, "");
          var out = "", bits = 0, acc = 0;
          for (var q = 0; q < s.length; q++) {
            var c = s.charAt(q);
            if (c === "=") break;
            var v = B.indexOf(c);
            if (v < 0) continue;
            acc = (acc << 6) | v; bits += 6;
            if (bits >= 8) { bits -= 8; out += String.fromCharCode((acc >> bits) & 0xFF); }
          }
          return out;
        }
        try {
          var prev = "", n8 = 0;
          while (url && url !== prev && n8 < 4 && !/^https?:\/\//i.test(url)) {
            prev = url; n8++;
            if (url.indexOf("%") >= 0) {
              var t8 = url;
              try { t8 = decodeURIComponent(url); } catch (eD1) { t8 = url; }
              if (t8 && t8 !== url) { url = t8; continue; }
            }
            if (/^[A-Za-z0-9+\/=]{12,}$/.test(url)) {
              var b8 = _b64d(url);
              if (b8) url = b8;
            }
          }
        } catch (e8) {}
        // 飞飞系：mac_url* = unescape('集名$直链#集名$直链$$$线路2...')——按播放页的 src/num 取对应那根
        if (!url) {
          var mmA = html.match(/mac_url[A-Za-z0-9]*\s*=\s*(?:unescape\()?\s*['"]([^'"]{20,})['"]/);
          if (mmA) {
            var dcA = mmA[1].replace(/%u([0-9A-Fa-f]{4})/g, function (_, w) { return String.fromCharCode(parseInt(w, 16)); }).replace(/%([0-9A-Fa-f]{2})/g, function (_, w) { return String.fromCharCode(parseInt(w, 16)); });
            var smA = u.match(/src-(\d+)-num-(\d+)/) || u.match(/-(\d+)-(\d+)\.html\s*$/);
            var liA = smA ? Number(smA[1]) : 1, noA = smA ? Number(smA[2]) : 1;
            var sgA = dcA.indexOf("$$$") >= 0 ? dcA.split("$$$") : dcA.split("$$");
            var lnA = (sgA[liA - 1] && sgA[liA - 1].indexOf("$") >= 0) ? sgA[liA - 1] : dcA;
            var epA = lnA.split("#")[noA - 1] || "";
            var pmA = epA.match(/\$([^$]+)$/);
            if (pmA) url = pmA[1];
          }
        }
        if (!url) {
          var dm = html.match(/https?:\/\/[^" <>]+?\.(?:m3u8|mp4)(?:\?[^" <>]*)?/i);
          if (dm) url = dm[0];
        }
        if (url && /pan\.quark\.cn|pan\.baidu\.com|alipan\.com|aliyundrive|115\.com|123pan|cloud\.189\.cn|caiyun\.139\.com|weiyun\.com|xunlei|magnet:\?|ed2k:|quark\.cn/i.test(url)) {
          input = { parse: 0, url: "toast://网盘类链接不支持在线播放", jx: 0 };
          if (typeof setResult === "function") setResult(input);
        } else if (url && /(v\.qq\.com|iqiyi\.com|youku\.com|mgtv\.com|bilibili\.com|sohu\.com|le\.com|1905\.com)/i.test(url)) {
          input = { parse: 1, url: url, jx: 1 };
          if (typeof setResult === "function") setResult(input);
        } else if (url && /\.(m3u8|mp4)/i.test(url)) {
          input = { parse: 0, url: url, jx: 0 };
          if (typeof setResult === "function") setResult(input);
        } else if (url) {
          input = { parse: 1, url: url, jx: 1 };
          if (typeof setResult === "function") setResult(input);
        } else {
          input = { parse: 0, url: "toast://这集的播放地址没认出来", jx: 0 };
          if (typeof setResult === "function") setResult(input);
        }
      }
    } catch (e) {}
  })
};
