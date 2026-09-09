// ===== 加密API站（华谊 • AppDrama 家族）drpy2 版 · 由 TVBox 加站助手生成 =====
// 引擎：./lib/drpy2.min.js · 响应用 toBase64 走 base64 规避二进制编码问题
var _MEDIA=/(.*)\.(mp4|m3u8|flv|mkv|avi|ts|mov|mpd|m4a|wmv)(\?.*)?$/i;

var _E={"appName":"华谊","publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp9Ek4wIlQAtwFnuBRlsFiow2tr+4UOciGeNKbY7nL74etUqUb6fvpOSOHhFEfaWlfwUpOB17x3JEL3No19nfjCeVYrYPjlJcgoqUWH/tfIfFAQWvtxBIBlKazkhw8d3ChysWmeWRikKqkBsVRY4oqNPuj4sjm6Zult0U4I4prRQIDAQAB","dataKey":"NDBYSZR1DMRRZ05NSUCWEJNIYWLBPT0=","dataIv":"OC1A06E197EF10CF3F6058CA7A803B5E","pkg":"com.muyue.tool","host":"http://43.240.158.156:8002","site":"./lib/az5.txt","version":"1.0.0.4","decrypt":"1"};
var _PK2="ed5fdsgucxumegqa";
function _s2b(s){var a=[],i;for(i=0;i<s.length;i++)a.push(s.charCodeAt(i)&255);return a;}
function _b2s(a){var o="",CH=4096,i;for(i=0;i<a.length;i+=CH)o+=String.fromCharCode.apply(null,a.slice(i,i+CH));return o;}
function _utf8(b){var o="",i=0;while(i<b.length){var c=b[i];if(c<128){o+=String.fromCharCode(c);i++;}else if(c<224){o+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));i+=2;}else if(c<240){o+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=3;}else{var p=((c&7)<<18)|((b[i+1]&63)<<12)|((b[i+2]&63)<<6)|(b[i+3]&63);p-=65536;o+=String.fromCharCode(55296+(p>>10),56320+(p&1023));i+=4;}}return o;}
function _b64dec(s){s=String(s).replace(/[^A-Za-z0-9+\/=]/g,"");var a=[],v=0,b=-8,i;for(i=0;i<s.length;i++){var idx="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(s.charAt(i));if(idx<0)continue;v=(v<<6)|idx;b+=6;if(b>=0){a.push((v>>b)&255);b-=8;}}return a;}
function _b64enc(a){var C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o="",i;for(i=0;i<a.length;i+=3){var b0=a[i],b1=a[i+1],b2=a[i+2];o+=C.charAt(b0>>2);o+=C.charAt(((b0&3)<<4)|((b1===undefined?0:b1)>>4));o+=(b1===undefined)?"=":C.charAt(((b1&15)<<2)|((b2===undefined?0:b2)>>6));o+=(b2===undefined)?"=":C.charAt(b2&63);}return o;}
var _B0=BigInt(0),_B1=BigInt(1),_B3=BigInt(3),_B7=BigInt(7),_B127=BigInt(127);
function _aes(mode,key,iv,msg,enc){var k=CryptoJS.enc.Utf8.parse(key);var opt=(mode==="CBC")?{iv:CryptoJS.enc.Utf8.parse(iv||key),mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7}:{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7};
  var r=CryptoJS.AES.encrypt(msg,k,opt);return enc==="hex"?r.ciphertext.toString(CryptoJS.enc.Hex):r.ciphertext.toString(CryptoJS.enc.Base64);}
function _aesDec(key,b64){var r=CryptoJS.AES.decrypt(b64,CryptoJS.enc.Utf8.parse(key),{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});return r.toString(CryptoJS.enc.Utf8);}
function _rsa(pubB64,msg){var der=_b64dec(pubB64),i=0;function len(){var b=der[i++];if(b&128){var n=b&127,L=0,k;for(k=0;k<n;k++)L=L*256+der[i++];return L;}return b;}function chk(t){if(der[i++]!==t)throw new Error("公钥格式不对");}
  chk(48);len();chk(48);var l1=len();i+=l1;chk(3);len();i+=1;chk(48);len();chk(2);var ln=len(),nb=der.slice(i,i+ln);i+=ln;chk(2);var el=len(),eb=der.slice(i,i+el);
  if(nb[0]===0)nb=nb.slice(1);
  function h2n(a){var s="";for(var j=0;j<a.length;j++)s+=("0"+a[j].toString(16)).slice(-2);return BigInt("0x"+s);}
  var n=h2n(nb),e=h2n(eb),k=nb.length,psLen=k-msg.length-3;if(psLen<8)throw new Error("RSA消息过长");
  var em=[0,2],c;for(c=0;c<psLen;c++){var b=0;do{b=1+Math.floor(Math.random()*255);}while(b===0);em.push(b);}
  em.push(0);for(c=0;c<msg.length;c++)em.push(msg.charCodeAt(c)&255);
  var m=h2n(em)%n,r=_B1,b2=e;
  while(b2>_B0){if(b2&_B1)r=r*m%n;m=m*m%n;b2>>=_B1;}
  var hex=r.toString(16);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=BigInt(v);var o=[];do{var b=Number(v&_B127);v>>=_B7;if(v>_B0)b|=128;o.push(b);}while(v>_B0);return o;}
function _pt(f,w){return _pv((BigInt(f)<<_B3)|BigInt(w));}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=_B0,s=_B0;for(;;){var x=a[i++];r|=BigInt(x&127)<<s;if(!(x&128))break;s+=_B7;}return r;}
  while(i<a.length){var t=rv(),f=Number(t>>_B3),w=Number(t&_B7);
    if(w===0)o.push({f:f,w:0,v:rv()});else if(w===2){var Ln=Number(rv());o.push({f:f,w:2,v:a.slice(i,i+Ln)});i+=Ln;}else break;}
  return o;}
function _pbGet(fs,f){for(var i=0;i<fs.length;i++)if(fs[i].f===f)return fs[i];return undefined;}
function _bs(b){var s="",i;for(i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return s;}
var _RCS="1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function _rs(n){var s="",i;for(i=0;i<n-1;i++)s+=_RCS.charAt(Math.floor(Math.random()*_RCS.length));return s+"=";}
function _dev(){var u="",i;for(i=0;i<32;i++)u+="0123456789ABCDEF".charAt(Math.floor(Math.random()*16));
  return {country:"CN",vName:_E.version||"1.0.0.4",cpuId:"MT6893Z%2FCZA",young:0,facturer:"REDMI",pkg:_E.pkg||"com.muyue.tool",uuid:u,resolution:"1080x2272",mac:"02%3A00%3A00%3A00%3A00%3A00",abid:"397",model:"25102RKBEC",plat:"android",udid:u,dpi:"440",net:"1",lang:"zh",brand:"REDMI",density:"2.75",appName:_E.appName||"APP",cpu:"arm64-v8a",chid:"10000",carrier:"%E8%81%94%E9%80%9A",_vOsCode:28,vOs:"9",v:1,tenantId:"",vApp:(_E.version||"1.0.0.4").replace(/\./g,""),device:0,androidID:u.toLowerCase().slice(0,16)};}
function _hd(jsonMode){var d=_dev(),ts=Date.now(),rnd=_rs(16);
  d.sig=_rsa(_E.publicKey,ts+rnd+d.vApp);var b=_aes("ECB",_E.dataIv,"",ts+rnd,"b64");
  d.random_str=rnd;d.timestamp=ts;d.sig2=b.slice(0,8);d.sig3=b.slice(8);
  var pd=_aes("CBC",_PK2,_PK2,JSON.stringify(d),"hex");
  return {"User-Agent":"okhttp/3.12.1",Accept:jsonMode?"application/json":"application/x-protobuf","Content-Type":jsonMode?"application/json; charset=utf-8":"application/x-protobuf",publicParams:JSON.stringify({paramsData:pd})};}
function _body(params){var ts=Date.now(),rnd=_rs(8),fake=_rs(20),kv="",k;
  for(k in params){if(params.hasOwnProperty(k)&&params[k]!==""&&params[k]!=null)kv+=(kv?"&":"")+k+"="+params[k];}
  var b64=rnd+_aes("ECB",_E.dataKey,"",kv+ts,"b64");
  return _b2s(_pstr(1,b64.slice(0,20)).concat(_pstr(2,b64.slice(20)),_pstr(3,fake),_pint(4,ts),_pstr(5,rnd)));}
// protobuf 接口：toBase64 响应 → atob → bytes → 解析
function _postPb(path,params){var r=request(_E.host+path,{method:"POST",headers:_hd(false),body:_body(params),toBase64:true});
  var b64=String(r||"").replace(/\s+/g,"");var bin;
  try{bin=atob(b64);}catch(e){return [];}
  return _pf(_s2b(bin));}
function _dramaList(top){var out=[];try{var d=_pbGet(top,3);if(!d)return out;
  var its=_pf(d.v);for(var i=0;i<its.length;i++){if(its[i].f!==1||its[i].w!==2)continue;
    var m={},fs=_pf(its[i].v),j;for(j=0;j<fs.length;j++){m[fs[j].f]=(fs[j].w===2)?fs[j].v:Number(fs[j].v);}
    var pic="";try{var cv=_pf(m[2]);var pn=_pbGet(cv,1)||_pbGet(cv,2);if(pn)pic=_utf8(pn.v);}catch(e){}
    out.push({vod_id:String(typeof m[3]==="number"?m[3]:_utf8(m[3]||[])),vod_name:_utf8(m[5]||[]),vod_pic:pic,vod_remarks:_utf8(m[13]||[])});}
  }catch(e){}return out;}
function _jsonGet(path){var r=request(_E.host+path,{method:"GET",headers:_hd(true)});
  try{return JSON.parse(r||"{}");}catch(e){return {};}}


var rule = {
  title: "华谊调试",
  host: "http://43.240.158.156:8002",
  homeUrl: "",
  searchable: 0,
  quickSearch: 0,
  filterable: 0,
  timeout: 15000,
  play_parse: false,
  class_name: "剧集&电影&动漫&综艺&短剧&直播&漫剧",
  class_url: "20&21&22&23&24&25&26",
  推荐: $js.toString(() => {
var _E={"appName":"华谊","publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp9Ek4wIlQAtwFnuBRlsFiow2tr+4UOciGeNKbY7nL74etUqUb6fvpOSOHhFEfaWlfwUpOB17x3JEL3No19nfjCeVYrYPjlJcgoqUWH/tfIfFAQWvtxBIBlKazkhw8d3ChysWmeWRikKqkBsVRY4oqNPuj4sjm6Zult0U4I4prRQIDAQAB","dataKey":"NDBYSZR1DMRRZ05NSUCWEJNIYWLBPT0=","dataIv":"OC1A06E197EF10CF3F6058CA7A803B5E","pkg":"com.muyue.tool","host":"http://43.240.158.156:8002","site":"./lib/az5.txt","version":"1.0.0.4","decrypt":"1"};
var _PK2="ed5fdsgucxumegqa";
function _s2b(s){var a=[],i;for(i=0;i<s.length;i++)a.push(s.charCodeAt(i)&255);return a;}
function _b2s(a){var o="",CH=4096,i;for(i=0;i<a.length;i+=CH)o+=String.fromCharCode.apply(null,a.slice(i,i+CH));return o;}
function _utf8(b){var o="",i=0;while(i<b.length){var c=b[i];if(c<128){o+=String.fromCharCode(c);i++;}else if(c<224){o+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));i+=2;}else if(c<240){o+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=3;}else{var p=((c&7)<<18)|((b[i+1]&63)<<12)|((b[i+2]&63)<<6)|(b[i+3]&63);p-=65536;o+=String.fromCharCode(55296+(p>>10),56320+(p&1023));i+=4;}}return o;}
function _b64dec(s){s=String(s).replace(/[^A-Za-z0-9+\/=]/g,"");var a=[],v=0,b=-8,i;for(i=0;i<s.length;i++){var idx="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(s.charAt(i));if(idx<0)continue;v=(v<<6)|idx;b+=6;if(b>=0){a.push((v>>b)&255);b-=8;}}return a;}
function _b64enc(a){var C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o="",i;for(i=0;i<a.length;i+=3){var b0=a[i],b1=a[i+1],b2=a[i+2];o+=C.charAt(b0>>2);o+=C.charAt(((b0&3)<<4)|((b1===undefined?0:b1)>>4));o+=(b1===undefined)?"=":C.charAt(((b1&15)<<2)|((b2===undefined?0:b2)>>6));o+=(b2===undefined)?"=":C.charAt(b2&63);}return o;}
var _B0=BigInt(0),_B1=BigInt(1),_B3=BigInt(3),_B7=BigInt(7),_B127=BigInt(127);
function _aes(mode,key,iv,msg,enc){var k=CryptoJS.enc.Utf8.parse(key);var opt=(mode==="CBC")?{iv:CryptoJS.enc.Utf8.parse(iv||key),mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7}:{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7};
  var r=CryptoJS.AES.encrypt(msg,k,opt);return enc==="hex"?r.ciphertext.toString(CryptoJS.enc.Hex):r.ciphertext.toString(CryptoJS.enc.Base64);}
function _aesDec(key,b64){var r=CryptoJS.AES.decrypt(b64,CryptoJS.enc.Utf8.parse(key),{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7});return r.toString(CryptoJS.enc.Utf8);}
function _rsa(pubB64,msg){var der=_b64dec(pubB64),i=0;function len(){var b=der[i++];if(b&128){var n=b&127,L=0,k;for(k=0;k<n;k++)L=L*256+der[i++];return L;}return b;}function chk(t){if(der[i++]!==t)throw new Error("公钥格式不对");}
  chk(48);len();chk(48);var l1=len();i+=l1;chk(3);len();i+=1;chk(48);len();chk(2);var ln=len(),nb=der.slice(i,i+ln);i+=ln;chk(2);var el=len(),eb=der.slice(i,i+el);
  if(nb[0]===0)nb=nb.slice(1);
  function h2n(a){var s="";for(var j=0;j<a.length;j++)s+=("0"+a[j].toString(16)).slice(-2);return BigInt("0x"+s);}
  var n=h2n(nb),e=h2n(eb),k=nb.length,psLen=k-msg.length-3;if(psLen<8)throw new Error("RSA消息过长");
  var em=[0,2],c;for(c=0;c<psLen;c++){var b=0;do{b=1+Math.floor(Math.random()*255);}while(b===0);em.push(b);}
  em.push(0);for(c=0;c<msg.length;c++)em.push(msg.charCodeAt(c)&255);
  var m=h2n(em)%n,r=_B1,b2=e;
  while(b2>_B0){if(b2&_B1)r=r*m%n;m=m*m%n;b2>>=_B1;}
  var hex=r.toString(16);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=BigInt(v);var o=[];do{var b=Number(v&_B127);v>>=_B7;if(v>_B0)b|=128;o.push(b);}while(v>_B0);return o;}
function _pt(f,w){return _pv((BigInt(f)<<_B3)|BigInt(w));}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=_B0,s=_B0;for(;;){var x=a[i++];r|=BigInt(x&127)<<s;if(!(x&128))break;s+=_B7;}return r;}
  while(i<a.length){var t=rv(),f=Number(t>>_B3),w=Number(t&_B7);
    if(w===0)o.push({f:f,w:0,v:rv()});else if(w===2){var Ln=Number(rv());o.push({f:f,w:2,v:a.slice(i,i+Ln)});i+=Ln;}else break;}
  return o;}
function _pbGet(fs,f){for(var i=0;i<fs.length;i++)if(fs[i].f===f)return fs[i];return undefined;}
function _bs(b){var s="",i;for(i=0;i<b.length;i++)s+=String.fromCharCode(b[i]);return s;}
var _RCS="1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function _rs(n){var s="",i;for(i=0;i<n-1;i++)s+=_RCS.charAt(Math.floor(Math.random()*_RCS.length));return s+"=";}
function _dev(){var u="",i;for(i=0;i<32;i++)u+="0123456789ABCDEF".charAt(Math.floor(Math.random()*16));
  return {country:"CN",vName:_E.version||"1.0.0.4",cpuId:"MT6893Z%2FCZA",young:0,facturer:"REDMI",pkg:_E.pkg||"com.muyue.tool",uuid:u,resolution:"1080x2272",mac:"02%3A00%3A00%3A00%3A00%3A00",abid:"397",model:"25102RKBEC",plat:"android",udid:u,dpi:"440",net:"1",lang:"zh",brand:"REDMI",density:"2.75",appName:_E.appName||"APP",cpu:"arm64-v8a",chid:"10000",carrier:"%E8%81%94%E9%80%9A",_vOsCode:28,vOs:"9",v:1,tenantId:"",vApp:(_E.version||"1.0.0.4").replace(/\./g,""),device:0,androidID:u.toLowerCase().slice(0,16)};}
function _hd(jsonMode){var d=_dev(),ts=Date.now(),rnd=_rs(16);
  d.sig=_rsa(_E.publicKey,ts+rnd+d.vApp);var b=_aes("ECB",_E.dataIv,"",ts+rnd,"b64");
  d.random_str=rnd;d.timestamp=ts;d.sig2=b.slice(0,8);d.sig3=b.slice(8);
  var pd=_aes("CBC",_PK2,_PK2,JSON.stringify(d),"hex");
  return {"User-Agent":"okhttp/3.12.1",Accept:jsonMode?"application/json":"application/x-protobuf","Content-Type":jsonMode?"application/json; charset=utf-8":"application/x-protobuf",publicParams:JSON.stringify({paramsData:pd})};}
function _body(params){var ts=Date.now(),rnd=_rs(8),fake=_rs(20),kv="",k;
  for(k in params){if(params.hasOwnProperty(k)&&params[k]!==""&&params[k]!=null)kv+=(kv?"&":"")+k+"="+params[k];}
  var b64=rnd+_aes("ECB",_E.dataKey,"",kv+ts,"b64");
  return _b2s(_pstr(1,b64.slice(0,20)).concat(_pstr(2,b64.slice(20)),_pstr(3,fake),_pint(4,ts),_pstr(5,rnd)));}
// protobuf 接口：toBase64 响应 → atob → bytes → 解析
function _postPb(path,params){var r=request(_E.host+path,{method:"POST",headers:_hd(false),body:_body(params),toBase64:true});
  var b64=String(r||"").replace(/\s+/g,"");var bin;
  try{bin=atob(b64);}catch(e){return [];}
  return _pf(_s2b(bin));}
function _dramaList(top){var out=[];try{var d=_pbGet(top,3);if(!d)return out;
  var its=_pf(d.v);for(var i=0;i<its.length;i++){if(its[i].f!==1||its[i].w!==2)continue;
    var m={},fs=_pf(its[i].v),j;for(j=0;j<fs.length;j++){m[fs[j].f]=(fs[j].w===2)?fs[j].v:Number(fs[j].v);}
    var pic="";try{var cv=_pf(m[2]);var pn=_pbGet(cv,1)||_pbGet(cv,2);if(pn)pic=_utf8(pn.v);}catch(e){}
    out.push({vod_id:String(typeof m[3]==="number"?m[3]:_utf8(m[3]||[])),vod_name:_utf8(m[5]||[]),vod_pic:pic,vod_remarks:_utf8(m[13]||[])});}
  }catch(e){}return out;}
function _jsonGet(path){var r=request(_E.host+path,{method:"GET",headers:_hd(true)});
  try{return JSON.parse(r||"{}");}catch(e){return {};}}


var out=[];
function T(name,fn){try{out.push({vod_id:"p",vod_name:name+" ✓ "+fn()});}catch(e){out.push({vod_id:"p",vod_name:name+" ✗ "+e.message});}}
T("P1 BigInt",function(){if(typeof BigInt!=="function")throw new Error("无BigInt函数");var x=eval("1n");return "字面量1n=OK";});
T("P2 atob",function(){if(typeof atob!=="function")throw new Error("无atob");return atob("QQ==")==="A"?"OK":"结果异常";});
T("P3 CryptoJS",function(){if(typeof CryptoJS==="undefined")throw new Error("未定义");return typeof CryptoJS.AES;});
T("P4 RSA签名",function(){var s=_rsa(_E.publicKey,String(Date.now())+"abcdefg=");return "sig长度="+s.length;});
T("P5 联网JSON",function(){var r=request(_E.host+"/api/ex/v3/security/tag/list",{method:"GET",headers:_hd(true)});var s=String(r||"");return "长度="+s.length+" 开头="+s.slice(0,40);});
T("P6 二进制toBase64",function(){var r=request(_E.host+"/api/proto/v5/drama/search",{method:"POST",headers:_hd(false),body:_body({searchKeys:"交锋",page:"1",pagesize:"21"}),toBase64:true});var s=String(r||"").replace(/\s+/g,"");return "b64长度="+s.length+" 开头="+s.slice(0,16);});
T("P7 搜索解析",function(){var l=_dramaList(_postPb("/api/proto/v5/drama/search",{searchKeys:"交锋",page:"1",pagesize:"21"}));return "结果="+l.length+"条";});
T("P8 推荐解析",function(){var j=_jsonGet("/api/ex/v3/security/tag/list");var d=j.data;if(typeof d==="string"&&_E.decrypt){d=_aesDec(_E.dataIv,_aesDec(_E.dataKey,d));}if(typeof d==="string"){d=JSON.parse(d||"[]");}var n=0;(Array.isArray(d)?d:[]).forEach(function(sec){var ss2=(sec.sections&&sec.sections.length)?sec.sections:[sec];ss2.forEach(function(s3){n+=(s3.vodList||[]).length;});});return "code="+j.code+" 推荐="+n+"条";});
setResult(out);

}),
};
