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
  var m=h2n(em)%n,r=1n,b2=e;
  while(b2>0n){if(b2&1n)r=r*m%n;m=m*m%n;b2>>=1n;}
  var hex=r.toString(16);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=BigInt(v);var o=[];do{var b=Number(v&0x7fn);v>>=7n;if(v>0n)b|=128;o.push(b);}while(v>0n);return o;}
function _pt(f,w){return _pv((BigInt(f)<<3n)|BigInt(w));}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0n,s=0n;for(;;){var x=a[i++];r|=BigInt(x&127)<<s;if(!(x&128))break;s+=7n;}return r;}
  while(i<a.length){var t=rv(),f=Number(t>>3n),w=Number(t&7n);
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
  title: "华谊",
  host: "http://43.240.158.156:8002",
  homeUrl: "",
  searchable: 2,
  quickSearch: 0,
  filterable: 1,
  timeout: 15000,
  play_parse: true,
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
  var m=h2n(em)%n,r=1n,b2=e;
  while(b2>0n){if(b2&1n)r=r*m%n;m=m*m%n;b2>>=1n;}
  var hex=r.toString(16);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=BigInt(v);var o=[];do{var b=Number(v&0x7fn);v>>=7n;if(v>0n)b|=128;o.push(b);}while(v>0n);return o;}
function _pt(f,w){return _pv((BigInt(f)<<3n)|BigInt(w));}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0n,s=0n;for(;;){var x=a[i++];r|=BigInt(x&127)<<s;if(!(x&128))break;s+=7n;}return r;}
  while(i<a.length){var t=rv(),f=Number(t>>3n),w=Number(t&7n);
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

var j=_jsonGet("/api/ex/v3/security/tag/list");var data=j.data;
if(typeof data==="string"&&_E.decrypt){data=_aesDec(_E.dataIv,_aesDec(_E.dataKey,data));}
if(typeof data==="string"){try{data=JSON.parse(data||"[]");}catch(e){data=[];}}
var list=[];
(Array.isArray(data)?data:[]).forEach(function(sec){var secs=(sec.sections&&sec.sections.length)?sec.sections:[sec];
  secs.forEach(function(ss){(ss.vodList||[]).forEach(function(v){
    list.push({vod_id:String(v.id),vod_name:v.name,vod_pic:(v.coverImage&&v.coverImage.path)||"",vod_remarks:v.remarks||""});});});});
setResult(list);

}),
  一级: $js.toString(() => {

var _E={"appName":"华谊","publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp9Ek4wIlQAtwFnuBRlsFiow2tr+4UOciGeNKbY7nL74etUqUb6fvpOSOHhFEfaWlfwUpOB17x3JEL3No19nfjCeVYrYPjlJcgoqUWH/tfIfFAQWvtxBIBlKazkhw8d3ChysWmeWRikKqkBsVRY4oqNPuj4sjm6Zult0U4I4prRQIDAQAB","dataKey":"NDBYSZR1DMRRZ05NSUCWEJNIYWLBPT0=","dataIv":"OC1A06E197EF10CF3F6058CA7A803B5E","pkg":"com.muyue.tool","host":"http://43.240.158.156:8002","site":"./lib/az5.txt","version":"1.0.0.4","decrypt":"1"};
var _PK2="ed5fdsgucxumegqa";
function _s2b(s){var a=[],i;for(i=0;i<s.length;i++)a.push(s.charCodeAt(i)&255);return a;}
function _b2s(a){var o="",CH=4096,i;for(i=0;i<a.length;i+=CH)o+=String.fromCharCode.apply(null,a.slice(i,i+CH));return o;}
function _utf8(b){var o="",i=0;while(i<b.length){var c=b[i];if(c<128){o+=String.fromCharCode(c);i++;}else if(c<224){o+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));i+=2;}else if(c<240){o+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=3;}else{var p=((c&7)<<18)|((b[i+1]&63)<<12)|((b[i+2]&63)<<6)|(b[i+3]&63);p-=65536;o+=String.fromCharCode(55296+(p>>10),56320+(p&1023));i+=4;}}return o;}
function _b64dec(s){s=String(s).replace(/[^A-Za-z0-9+\/=]/g,"");var a=[],v=0,b=-8,i;for(i=0;i<s.length;i++){var idx="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(s.charAt(i));if(idx<0)continue;v=(v<<6)|idx;b+=6;if(b>=0){a.push((v>>b)&255);b-=8;}}return a;}
function _b64enc(a){var C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o="",i;for(i=0;i<a.length;i+=3){var b0=a[i],b1=a[i+1],b2=a[i+2];o+=C.charAt(b0>>2);o+=C.charAt(((b0&3)<<4)|((b1===undefined?0:b1)>>4));o+=(b1===undefined)?"=":C.charAt(((b1&15)<<2)|((b2===undefined?0:b2)>>6));o+=(b2===undefined)?"=":C.charAt(b2&63);}return o;}
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
  var m=h2n(em)%n,r=1n,b2=e;
  while(b2>0n){if(b2&1n)r=r*m%n;m=m*m%n;b2>>=1n;}
  var hex=r.toString(16);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=BigInt(v);var o=[];do{var b=Number(v&0x7fn);v>>=7n;if(v>0n)b|=128;o.push(b);}while(v>0n);return o;}
function _pt(f,w){return _pv((BigInt(f)<<3n)|BigInt(w));}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0n,s=0n;for(;;){var x=a[i++];r|=BigInt(x&127)<<s;if(!(x&128))break;s+=7n;}return r;}
  while(i<a.length){var t=rv(),f=Number(t>>3n),w=Number(t&7n);
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

var fid=String(MY_CATE||input||'').split(';')[0];var pg=parseInt(MY_PAGE||1);
var ext={};try{ext=(typeof MY_FL==="object"&&MY_FL)?MY_FL:(typeof MY_FL==="string"&&MY_FL?JSON.parse(MY_FL):{});}catch(e){ext={};}
var params={pagesize:"21",typeId1:fid,page:String(pg),vodOrderBy:ext.extend_sort||"最新",vodArea:ext.area||"",vodLang:ext.lang||"",vodClass:ext.class||"",vodYear:ext.year||""};
setResult(_dramaList(_postPb("/api/proto/v5/drama/category",params)));

}),
  二级: $js.toString(() => {

var _E={"appName":"华谊","publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp9Ek4wIlQAtwFnuBRlsFiow2tr+4UOciGeNKbY7nL74etUqUb6fvpOSOHhFEfaWlfwUpOB17x3JEL3No19nfjCeVYrYPjlJcgoqUWH/tfIfFAQWvtxBIBlKazkhw8d3ChysWmeWRikKqkBsVRY4oqNPuj4sjm6Zult0U4I4prRQIDAQAB","dataKey":"NDBYSZR1DMRRZ05NSUCWEJNIYWLBPT0=","dataIv":"OC1A06E197EF10CF3F6058CA7A803B5E","pkg":"com.muyue.tool","host":"http://43.240.158.156:8002","site":"./lib/az5.txt","version":"1.0.0.4","decrypt":"1"};
var _PK2="ed5fdsgucxumegqa";
function _s2b(s){var a=[],i;for(i=0;i<s.length;i++)a.push(s.charCodeAt(i)&255);return a;}
function _b2s(a){var o="",CH=4096,i;for(i=0;i<a.length;i+=CH)o+=String.fromCharCode.apply(null,a.slice(i,i+CH));return o;}
function _utf8(b){var o="",i=0;while(i<b.length){var c=b[i];if(c<128){o+=String.fromCharCode(c);i++;}else if(c<224){o+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));i+=2;}else if(c<240){o+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=3;}else{var p=((c&7)<<18)|((b[i+1]&63)<<12)|((b[i+2]&63)<<6)|(b[i+3]&63);p-=65536;o+=String.fromCharCode(55296+(p>>10),56320+(p&1023));i+=4;}}return o;}
function _b64dec(s){s=String(s).replace(/[^A-Za-z0-9+\/=]/g,"");var a=[],v=0,b=-8,i;for(i=0;i<s.length;i++){var idx="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(s.charAt(i));if(idx<0)continue;v=(v<<6)|idx;b+=6;if(b>=0){a.push((v>>b)&255);b-=8;}}return a;}
function _b64enc(a){var C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o="",i;for(i=0;i<a.length;i+=3){var b0=a[i],b1=a[i+1],b2=a[i+2];o+=C.charAt(b0>>2);o+=C.charAt(((b0&3)<<4)|((b1===undefined?0:b1)>>4));o+=(b1===undefined)?"=":C.charAt(((b1&15)<<2)|((b2===undefined?0:b2)>>6));o+=(b2===undefined)?"=":C.charAt(b2&63);}return o;}
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
  var m=h2n(em)%n,r=1n,b2=e;
  while(b2>0n){if(b2&1n)r=r*m%n;m=m*m%n;b2>>=1n;}
  var hex=r.toString(16);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=BigInt(v);var o=[];do{var b=Number(v&0x7fn);v>>=7n;if(v>0n)b|=128;o.push(b);}while(v>0n);return o;}
function _pt(f,w){return _pv((BigInt(f)<<3n)|BigInt(w));}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0n,s=0n;for(;;){var x=a[i++];r|=BigInt(x&127)<<s;if(!(x&128))break;s+=7n;}return r;}
  while(i<a.length){var t=rv(),f=Number(t>>3n),w=Number(t&7n);
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

var _MEDIA=/(.*)\.(mp4|m3u8|flv|mkv|avi|ts|mov|mpd|m4a|wmv)(\?.*)?$/i;
var id=String(input);var top=_postPb("/api/proto/v5/drama/getDetail",{id:id});
var d=_pbGet(top,3);VOD=VOD||{};if(!d){VOD.vod_name="详情失败";setResult([VOD]);}else{
var m={},fs=_pf(d.v),i;for(i=0;i<fs.length;i++)m[fs[i].f]=(fs[i].w===2)?fs[i].v:Number(fs[i].v);
VOD.vod_id=id;VOD.vod_name=_utf8(m[9]||[]);VOD.vod_area=_utf8(m[1]||[]);VOD.vod_year=String(typeof m[18]==="number"?m[18]:_utf8(m[18]||[]));
VOD.vod_remarks=_utf8(m[26]||[]);VOD.vod_actor=_utf8(m[25]||[]);VOD.vod_content=_utf8(m[7]||[]).replace(/<[^>]+>/g,"");
try{var cv=_pf(m[2]);var pn=_pbGet(cv,1)||_pbGet(cv,2);VOD.vod_pic=pn?_utf8(pn.v):"";}catch(e){VOD.vod_pic="";}
var lines={},order=[];var vids=[];
for(i=0;i<fs.length;i++){if(fs[i].f===29&&fs[i].w===2)vids.push(fs[i].v);}
vids.forEach(function(vb){var vm={},vf=_pf(vb),j;for(j=0;j<vf.length;j++)vm[vf[j].f]=(vf[j].w===2)?_utf8(vf[j].v):Number(vf[j].v);
  var line=vm[11]||vm[9]||"橘汁";var path=vm[4]||"";var title=vm[3]||("第"+vm[2]+"集");
  if(!lines[line]){lines[line]=[];order.push(line);}
  if(_MEDIA.test(path)&&!/^Ksvideo-|^KZNB-|^vwnet-|^FYNB-|^fym3u8-|^pylg-/.test(path)){lines[line].push(title+"$"+path);}
  else{lines[line].push(title+"$"+_b64enc(_s2b(JSON.stringify({vodPlayFrom:vm[9]||"",playUrl:path}))));}});
VOD.vod_play_from=order.join("$$$");
VOD.vod_play_url=order.map(function(k){return lines[k].join("#");}).join("$$$");
setResult([VOD]);}

}),
  搜索: $js.toString(() => {

var _E={"appName":"华谊","publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp9Ek4wIlQAtwFnuBRlsFiow2tr+4UOciGeNKbY7nL74etUqUb6fvpOSOHhFEfaWlfwUpOB17x3JEL3No19nfjCeVYrYPjlJcgoqUWH/tfIfFAQWvtxBIBlKazkhw8d3ChysWmeWRikKqkBsVRY4oqNPuj4sjm6Zult0U4I4prRQIDAQAB","dataKey":"NDBYSZR1DMRRZ05NSUCWEJNIYWLBPT0=","dataIv":"OC1A06E197EF10CF3F6058CA7A803B5E","pkg":"com.muyue.tool","host":"http://43.240.158.156:8002","site":"./lib/az5.txt","version":"1.0.0.4","decrypt":"1"};
var _PK2="ed5fdsgucxumegqa";
function _s2b(s){var a=[],i;for(i=0;i<s.length;i++)a.push(s.charCodeAt(i)&255);return a;}
function _b2s(a){var o="",CH=4096,i;for(i=0;i<a.length;i+=CH)o+=String.fromCharCode.apply(null,a.slice(i,i+CH));return o;}
function _utf8(b){var o="",i=0;while(i<b.length){var c=b[i];if(c<128){o+=String.fromCharCode(c);i++;}else if(c<224){o+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));i+=2;}else if(c<240){o+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=3;}else{var p=((c&7)<<18)|((b[i+1]&63)<<12)|((b[i+2]&63)<<6)|(b[i+3]&63);p-=65536;o+=String.fromCharCode(55296+(p>>10),56320+(p&1023));i+=4;}}return o;}
function _b64dec(s){s=String(s).replace(/[^A-Za-z0-9+\/=]/g,"");var a=[],v=0,b=-8,i;for(i=0;i<s.length;i++){var idx="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(s.charAt(i));if(idx<0)continue;v=(v<<6)|idx;b+=6;if(b>=0){a.push((v>>b)&255);b-=8;}}return a;}
function _b64enc(a){var C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o="",i;for(i=0;i<a.length;i+=3){var b0=a[i],b1=a[i+1],b2=a[i+2];o+=C.charAt(b0>>2);o+=C.charAt(((b0&3)<<4)|((b1===undefined?0:b1)>>4));o+=(b1===undefined)?"=":C.charAt(((b1&15)<<2)|((b2===undefined?0:b2)>>6));o+=(b2===undefined)?"=":C.charAt(b2&63);}return o;}
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
  var m=h2n(em)%n,r=1n,b2=e;
  while(b2>0n){if(b2&1n)r=r*m%n;m=m*m%n;b2>>=1n;}
  var hex=r.toString(16);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=BigInt(v);var o=[];do{var b=Number(v&0x7fn);v>>=7n;if(v>0n)b|=128;o.push(b);}while(v>0n);return o;}
function _pt(f,w){return _pv((BigInt(f)<<3n)|BigInt(w));}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0n,s=0n;for(;;){var x=a[i++];r|=BigInt(x&127)<<s;if(!(x&128))break;s+=7n;}return r;}
  while(i<a.length){var t=rv(),f=Number(t>>3n),w=Number(t&7n);
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

var wd=(typeof input!=="undefined")?input:"";var pg=parseInt(MY_PAGE||1);
var params={searchKeys:String(wd||""),page:String(pg),pagesize:"21"};
setResult(_dramaList(_postPb("/api/proto/v5/drama/search",params)));

}),
  lazy: $js.toString(() => {

var _E={"appName":"华谊","publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp9Ek4wIlQAtwFnuBRlsFiow2tr+4UOciGeNKbY7nL74etUqUb6fvpOSOHhFEfaWlfwUpOB17x3JEL3No19nfjCeVYrYPjlJcgoqUWH/tfIfFAQWvtxBIBlKazkhw8d3ChysWmeWRikKqkBsVRY4oqNPuj4sjm6Zult0U4I4prRQIDAQAB","dataKey":"NDBYSZR1DMRRZ05NSUCWEJNIYWLBPT0=","dataIv":"OC1A06E197EF10CF3F6058CA7A803B5E","pkg":"com.muyue.tool","host":"http://43.240.158.156:8002","site":"./lib/az5.txt","version":"1.0.0.4","decrypt":"1"};
var _PK2="ed5fdsgucxumegqa";
function _s2b(s){var a=[],i;for(i=0;i<s.length;i++)a.push(s.charCodeAt(i)&255);return a;}
function _b2s(a){var o="",CH=4096,i;for(i=0;i<a.length;i+=CH)o+=String.fromCharCode.apply(null,a.slice(i,i+CH));return o;}
function _utf8(b){var o="",i=0;while(i<b.length){var c=b[i];if(c<128){o+=String.fromCharCode(c);i++;}else if(c<224){o+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));i+=2;}else if(c<240){o+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=3;}else{var p=((c&7)<<18)|((b[i+1]&63)<<12)|((b[i+2]&63)<<6)|(b[i+3]&63);p-=65536;o+=String.fromCharCode(55296+(p>>10),56320+(p&1023));i+=4;}}return o;}
function _b64dec(s){s=String(s).replace(/[^A-Za-z0-9+\/=]/g,"");var a=[],v=0,b=-8,i;for(i=0;i<s.length;i++){var idx="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(s.charAt(i));if(idx<0)continue;v=(v<<6)|idx;b+=6;if(b>=0){a.push((v>>b)&255);b-=8;}}return a;}
function _b64enc(a){var C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",o="",i;for(i=0;i<a.length;i+=3){var b0=a[i],b1=a[i+1],b2=a[i+2];o+=C.charAt(b0>>2);o+=C.charAt(((b0&3)<<4)|((b1===undefined?0:b1)>>4));o+=(b1===undefined)?"=":C.charAt(((b1&15)<<2)|((b2===undefined?0:b2)>>6));o+=(b2===undefined)?"=":C.charAt(b2&63);}return o;}
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
  var m=h2n(em)%n,r=1n,b2=e;
  while(b2>0n){if(b2&1n)r=r*m%n;m=m*m%n;b2>>=1n;}
  var hex=r.toString(16);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=BigInt(v);var o=[];do{var b=Number(v&0x7fn);v>>=7n;if(v>0n)b|=128;o.push(b);}while(v>0n);return o;}
function _pt(f,w){return _pv((BigInt(f)<<3n)|BigInt(w));}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0n,s=0n;for(;;){var x=a[i++];r|=BigInt(x&127)<<s;if(!(x&128))break;s+=7n;}return r;}
  while(i<a.length){var t=rv(),f=Number(t>>3n),w=Number(t&7n);
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

var flag=input.split('$')[0]||'';var id=input.split('$').slice(1).join('$');
var _MEDIA=/(.*)\.(mp4|m3u8|flv|mkv|avi|ts|mov|mpd|m4a|wmv)(\?.*)?$/i;
if(_MEDIA.test(id)){input=JSON.stringify({parse:0,url:id,header:{"User-Agent":"okhttp/3.12.1"}});}
else{var o=JSON.parse(_utf8(_b64dec(id)));
  var top=_postPb("/api/proto/v5/videoUsableUrl",{vodPlayFrom:o.vodPlayFrom||"",playUrl:o.playUrl||""});
  var d=_pbGet(top,3);var url="";
  if(d){var u=_pbGet(_pf(d.v),1);if(u)url=_utf8(u.v);}
  input=JSON.stringify({parse:0,url:url,header:{"User-Agent":"okhttp/3.12.1"}});}

}),
};
