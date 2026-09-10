var rule = {
  title: "半日",
  host: "http://103.217.190.91:19987/app/bn",
  homeUrl: "/app/systemInit#home",
  url: "/vod/search#cate",
  searchUrl: "/vod/search#search",
  detailUrl: "/vod/detail?id=fyid",
  searchable: 2,
  quickSearch: 0,
  filterable: 0,
  play_parse: true,
  timeout: 15000,
  class_name: "电视剧&电影&动漫&综艺&短剧&少儿&纪录片&直播",
  class_url: "2&1&3&4&22&20&5&23",
  versionName: "3.5.8",
  name: "半日闲",
  package: "com.yf.lelian",
  buildNumber: "2001",
  buildSignature: "A40DA80A59D170CAA950CF15C18C454D47A39B26989D8B640ECD745BA71BF5DC",
  linePrefix: "君子兰",
  a99make: function (C, P, RQ, R) {
    function rndHex() { var s = "", h = "0123456789abcdef"; for (var i = 0; i < 32; i++) s += h.charAt(Math.floor(Math.random() * 16)); return s; }
    function b64(u8) { var B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = ""; for (var i = 0; i < u8.length; i += 3) { var b0 = u8[i], b1 = u8[i + 1], b2 = u8[i + 2]; o += B64[b0 >> 2]; o += B64[((b0 & 3) << 4) | ((b1 === undefined ? 0 : b1) >> 4)]; o += (b1 === undefined) ? "=" : B64[((b1 & 15) << 2) | ((b2 === undefined ? 0 : b2) >> 6)]; o += (b2 === undefined) ? "=" : B64[b2 & 63]; } return o; }
    function waToU8(wa) { var len = wa.sigBytes, w = wa.words, out = new Uint8Array(len); for (var i = 0; i < len; i++) out[i] = (w[i >>> 2] >>> ((3 - (i % 4)) * 8)) & 0xff; return out; }
    function u8ToWa(u8) { var words = []; for (var i = 0; i < u8.length; i += 4) { var w = ((u8[i] || 0) << 24) | ((u8[i + 1] || 0) << 16) | ((u8[i + 2] || 0) << 8) | (u8[i + 3] || 0); words.push(w); } return C.lib.WordArray.create(words, u8.length); }
    function dec(keyWA, b64str) {
      var cwa = C.enc.Base64.parse(b64str);
      var ivWA = C.lib.WordArray.create([cwa.words[0], cwa.words[1], cwa.words[2], cwa.words[3]]);
      var ctWA = C.lib.WordArray.create(cwa.words.slice(4), cwa.sigBytes - 16);
      var pwa = C.AES.decrypt({ ciphertext: ctWA }, keyWA, { iv: ivWA, mode: C.mode.CBC, padding: C.pad.Pkcs7 });
      var u8 = waToU8(pwa); var inf;
      try { inf = P.inflate(u8); } catch (e1) { try { inf = P.inflateRaw(u8); } catch (e2) { inf = u8; } }
      return C.enc.Utf8.stringify(u8ToWa(inf));
    }
    function enc(keyWA, bodyStr) {
      var ivWA = C.enc.Hex.parse(rndHex()); // 自实现随机，避开 CryptoJS.WordArray.random 在缺 crypto 的壳里抛 native 异常
      var ct = C.AES.encrypt(C.enc.Utf8.parse(bodyStr), keyWA, { iv: ivWA, mode: C.mode.CBC, padding: C.pad.Pkcs7 }).ciphertext;
      return C.enc.Base64.stringify(ivWA.concat(ct));
    }
    function sign(b, ts, n, tk) { return C.SHA256(b + ":" + ts + ":" + n + ":" + tk).toString(); }
    function nonce() { return C.enc.Base64.stringify(C.enc.Hex.parse(rndHex())); } // 自实现随机，避开 native 异常
    function post(path, obj) {
      var key = rndHex(); var keyWA = C.enc.Utf8.parse(key);
      var ts = String(Date.now()); var n = nonce(); var tk = R.a99_token || "";
      obj.token = tk; obj.timestamp = ts; obj.nonce = n;
      var be = enc(keyWA, JSON.stringify(obj));
      var headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36",
        "Accept": "application/json", "Content-Type": "application/json", "client_type": "android",
        "uuid": key, "timestamp": ts, "sign": sign(be, ts, n, tk), "nonce": n,
        "version": R.versionName, "api_version": "v1"
      };
      var _r = RQ(R.host + path, { method: "POST", headers: headers, body: be, data: be });
      var resp = _r;
      if (_r && typeof _r === "object") {
        if (typeof _r.content === "string") resp = _r.content;
        else if (typeof _r.body === "string") resp = _r.body;
        else if (typeof _r.data === "string") resp = _r.data;
        else resp = null;
      }
      if (!resp) return null;
      try { return JSON.parse(dec(keyWA, resp)); } catch (e) { return null; }
    }
    function init() {
      if (R.a99_player && R.a99_parses) return;
      var sys = post("/app/systemInit", { v: R.versionName, n: R.name, s: R.buildSignature, pl: "1", apiVersion: "v2", token: "", timestamp: String(Date.now()), nonce: nonce() });
      if (!sys) return;
      R.a99_player = sys.player || {};
      R.a99_parses = sys.parser_api || [];
      var cats = sys.categorys || {}; R.a99_cats = (cats.data) || (Array.isArray(cats) ? cats : []);
      if (R.a99_cats && R.a99_cats.length) {
        var names = [], urls = [];
        for (var i = 0; i < R.a99_cats.length; i++) { names.push(R.a99_cats[i].name || ("c" + i)); urls.push(R.a99_cats[i].id); }
        R.class_name = names.join("&"); R.class_url = urls.join("&");
      }
    }
    function ensureToken() {
      if (R.a99_token) return R.a99_token;
      try {
        var j = post("/app/userInfo", { os: "android", name: "xiaomi", version: "15", sdkInt: 32, device: "xiaomi", brand: "xiaomi", manufacturer: "xiaomi", product: "b0q", hardware: "xiaomi", isPhysicalDevice: true, androidId: "V417IR", bootloader: "unknown", display: "V417IR release-keys", host: "a11-gz01-test", tags: "release-keys", type: "user", finger: "xiaomi/b0q/b0q:15/V619IR/613:user/release-keys", app: { version: R.versionName, name: R.name, package: R.package, buildNumber: R.buildNumber, buildSignature: R.buildSignature, install: Date.now(), update: Date.now() }, did: nonce(), apiVersion: "v2", channel: "", token: "", timestamp: String(Date.now()), nonce: nonce() });
        if (j && j.userInfo) R.a99_token = j.userInfo.user_token || "";
      } catch (e) {}
      return R.a99_token || "";
    }
    function listOf(arr) {
      var list = []; if (!arr) return list;
      for (var i = 0; i < arr.length; i++) { var it = arr[i] || {}; list.push({ url: String(it.id), title: it.name || it.vod_name || "", pic_url: it.pic || it.vod_pic || "", desc: it.remarks || it.vod_remarks || "" }); }
      return list;
    }
    var CIRCLED = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳"];
    function _t(s) { return String(s == null ? "" : s).replace(/^\s+|\s+$/g, ""); }
    function buildDetail(det) {
      var pf = String(det.play_from || "").split("$$$");
      var pu = String(det.play_url || "").split("$$$");
      var isLive = /live\.php/i.test(String(det.play_url || ""));
      var order = [], map = {};
      for (var i = 0; i < pf.length; i++) {
        var code = pf[i] || ("c" + i);
        var rn;
        if (isLive) {
          var pc = (R.a99_player || {})[code] || {};
          rn = pc.name || code;
        } else {
          rn = R.linePrefix + (CIRCLED[i] || String(i + 1));
        }
        while (map[rn]) rn += "②";
        order.push(rn); map[rn] = code;
      }
      var lines = [];
      for (var i2 = 0; i2 < pu.length; i2++) {
        var code2 = pf[i2] || ""; var segs = pu[i2].split("#"); var eps = [];
        for (var j = 0; j < segs.length; j++) {
          var seg = _t(segs[j]); if (!seg) continue;
          var k = seg.indexOf("$");
          var label = k >= 0 ? _t(seg.slice(0, k)) : "";
          var u = k >= 0 ? _t(seg.slice(k + 1)) : seg;
          if (!u) continue;
          if (!label) label = String(j + 1);
          eps.push(label + "$" + u + "@" + code2 + "@" + (det.name || "") + "@" + label);
        }
        lines.push(eps.join("#"));
      }
      return {
        vod_id: String(det.id || ""), vod_name: det.name || "", vod_pic: det.pic || det.vod_pic || "",
        vod_content: det.content || det.vod_content || "",
        vod_play_from: order.join("$$$"), vod_play_url: lines.join("$$$")
      };
    }
    return { post: post, init: init, ensureToken: ensureToken, listOf: listOf, buildDetail: buildDetail, nonce: nonce, CIRCLED: CIRCLED };
  },
  // ===== 首页推荐 =====
  推荐: "js:(function(){ var h=rule.a99make(CryptoJS,pako,request,rule); h.init(); var data=h.post('/vod/search',{kw:'',page:1,limit:21,pid:1,isCategory:1,orderBy:'time'}); var arr=(data&&data.data)||[]; setResult(h.listOf(arr)); })()",
  // ===== 一级分类 =====
  一级: "js:(function(){ var h=rule.a99make(CryptoJS,pako,request,rule); h.init(); var data=h.post('/vod/search',{kw:'',page:MY_PAGE,limit:21,pid:MY_CATE,isCategory:1,orderBy:'time'}); var arr=(data&&data.data)||[]; setResult(h.listOf(arr)); })()",
  // ===== 搜索 =====
  搜索: "js:(function(){ var h=rule.a99make(CryptoJS,pako,request,rule); h.init(); var data=h.post('/vod/search',{kw:KEY,page:MY_PAGE,limit:10}); var arr=(data&&data.data)||[]; setResult(h.listOf(arr)); })()",
  // ===== 二级详情 =====
  二级: "js:(function(){ var h=rule.a99make(CryptoJS,pako,request,rule); h.init(); h.ensureToken(); var id=input.split('id=')[1]; if(id) id=id.split('&')[0]; var d=h.post('/vod/detail',{id:String(id),pl:'1',eps:'1',v:'2.0.0'}); var det=((d&&d.data)||{}); if(det.list) det=det.list[0]; if(Array.isArray(det)) det=det[0]; if(!det){VOD={vod_name:'解析失败',vod_play_from:'',vod_play_url:''};return;} VOD=h.buildDetail(det); })()",
  // ===== 播放解析（drpy2 走 lazy + play_parse:true）=====
  lazy: "js:(function(){ var h=rule.a99make(CryptoJS,pako,request,rule); h.init(); h.ensureToken(); var parts=String(input).split('@'); var epUrl=parts[0]; var code=parts[1]||''; var pconf=(rule.a99_player||{})[code]||{}; var isDirect=(pconf.type===0)||/\\.(m3u8|mp4)(\\?|$)/i.test(epUrl)||/live/i.test(epUrl); if(isDirect){ input={parse:0,url:epUrl,jx:0}; return; } var parseUrl=String(pconf.parseUrl||''); var chosen=null; for(var i=0;i<(rule.a99_parses||[]).length;i++){ var pid=String((rule.a99_parses[i].id)); if(pid===parseUrl||parseUrl.split(',').indexOf(pid)>=0){chosen=rule.a99_parses[i];break;} } if(!chosen&&rule.a99_parses&&rule.a99_parses.length) chosen=rule.a99_parses[0]; if(!chosen){ input={parse:0,url:epUrl,jx:0}; return; } var pr=h.post('/app/vodParser',{id:parseInt(chosen.id),url:epUrl,token:rule.a99_token||'',timestamp:String(Date.now()),nonce:h.nonce()}); var out=(pr&&pr.data)||''; if(typeof out==='object') out=out.url||''; if(typeof out!=='string') out=''; if(out&&out.indexOf('http')===0){ input={parse:0,url:out,jx:0}; } else { input={parse:0,url:epUrl,jx:0}; } })()"
};
