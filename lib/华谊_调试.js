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
// ---- 纯JS大数（16位limb小端，不依赖BigInt，兼容老引擎）----
function _bn(h){var o=[],i=h.length;while(i>0){o.push(parseInt(h.slice(Math.max(0,i-4),i),16));i-=4;}return o;}
function _bnh(a){var s="",i;for(i=a.length-1;i>=0;i--)s+=("000"+a[i].toString(16)).slice(-4);s=s.replace(/^0+/,"");return s||"0";}
function _bcmp(a,b){if(a.length!==b.length)return a.length<b.length?-1:1;var i;for(i=a.length-1;i>=0;i--)if(a[i]!==b[i])return a[i]<b[i]?-1:1;return 0;}
function _bmul(a,b){var o=new Array(a.length+b.length),i,j;for(i=0;i<o.length;i++)o[i]=0;
  for(i=0;i<a.length;i++){var c=0,ai=a[i];
    for(j=0;j<b.length;j++){var t=o[i+j]+ai*b[j]+c;o[i+j]=t&65535;c=Math.floor(t/65536);}
    var k=i+b.length;while(c>0){var t2=o[k]+c;o[k]=t2&65535;c=Math.floor(t2/65536);k++;}}
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bsmall(a,s){var o=new Array(a.length+1),c=0,i;for(i=0;i<a.length;i++){var t=a[i]*s+c;o[i]=t&65535;c=Math.floor(t/65536);}o[i]=c;
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bcmpAt(a,off,b,hi){var i,av,bv;for(i=hi;i>=off;i--){av=a[i]||0;bv=b[i-off]||0;if(av!==bv)return av<bv?-1:1;}return 0;}
function _bsubAt(a,off,b){var c=0,i;for(i=0;i<b.length;i++){var t=(a[off+i]||0)-b[i]+c;a[off+i]=t&65535;c=t>>16;}
  if(c)a[off+b.length]=(a[off+b.length]||0)+c;}
function _bmod(a,n){a=a.slice();while(a.length>1&&a[a.length-1]===0)a.pop();
  if(_bcmp(a,n)<0)return a;
  var sh=0,top=n[n.length-1];while(top<32768){top*=2;sh++;}
  var nn=_bsmall(n,1<<sh),aa=_bsmall(a,1<<sh),m=nn.length,j;
  aa.push(0);
  for(j=aa.length-1;j>=m;j--){
    var qh=Math.floor((aa[j]*65536+(aa[j-1]||0))/nn[m-1]);if(qh>65535)qh=65535;
    var off=j-m,t=_bsmall(nn,qh);
    while(_bcmpAt(aa,off,t,j)<0){qh--;t=_bsmall(nn,qh);}
    _bsubAt(aa,off,t);}
  var rem=aa.slice(0,m+1),carry=0,i2,mask=(1<<sh)-1;
  for(i2=rem.length-1;i2>=0;i2--){var nc=rem[i2]&mask;rem[i2]=(rem[i2]>>sh)+(carry<<(16-sh));carry=nc;}
  while(rem.length>1&&rem[rem.length-1]===0)rem.pop();return rem;}
function _bmodpow(b,e,n){b=_bmod(b,n);var r=[1],i,j;
  for(i=e.length-1;i>=0;i--)for(j=15;j>=0;j--){r=_bmod(_bmul(r,r),n);if((e[i]>>j)&1)r=_bmod(_bmul(r,b),n);}
  return r;}
function _rsa(pubB64,msg){var der=_b64dec(pubB64),i=0;function len(){var b=der[i++];if(b&128){var n=b&127,L=0,k;for(k=0;k<n;k++)L=L*256+der[i++];return L;}return b;}function chk(t){if(der[i++]!==t)throw new Error("公钥格式不对");}
  chk(48);len();chk(48);var l1=len();i+=l1;chk(3);len();i+=1;chk(48);len();chk(2);var ln=len(),ns="",k2;for(k2=0;k2<ln;k2++){var bb=der[i++];if(k2===0&&bb===0)continue;ns+=("0"+bb.toString(16)).slice(-2);}
  chk(2);var el=len(),es="";for(k2=0;k2<el;k2++){es+=("0"+der[i++].toString(16)).slice(-2);}
  var k=Math.ceil(ns.length/2),psLen=k-msg.length-3;if(psLen<8)throw new Error("RSA消息过长");
  var hx="0002",c;for(c=0;c<psLen;c++){var rb=0;do{rb=1+Math.floor(Math.random()*255);}while(rb===0);hx+=("0"+rb.toString(16)).slice(-2);}
  hx+="00";for(c=0;c<msg.length;c++)hx+=("0"+(msg.charCodeAt(c)&255).toString(16)).slice(-2);
  var r=_bmodpow(_bn(hx),_bn(es),_bn(ns));
  var hex=_bnh(r);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=Number(v);var o=[];do{var b=v%128;v=Math.floor(v/128);if(v>0)b+=128;o.push(b);}while(v>0);return o;}
function _pt(f,w){return _pv(f*8+w);}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0,s=1;for(;;){var x=a[i++];r+=(x&127)*s;if(!(x&128))break;s*=128;}return r;}
  while(i<a.length){var t=rv(),f=Math.floor(t/8),w=t%8;
    if(w===0)o.push({f:f,w:0,v:rv()});else if(w===2){var Ln=rv();o.push({f:f,w:2,v:a.slice(i,i+Ln)});i+=Ln;}else break;}
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
// ---- 纯JS大数（16位limb小端，不依赖BigInt，兼容老引擎）----
function _bn(h){var o=[],i=h.length;while(i>0){o.push(parseInt(h.slice(Math.max(0,i-4),i),16));i-=4;}return o;}
function _bnh(a){var s="",i;for(i=a.length-1;i>=0;i--)s+=("000"+a[i].toString(16)).slice(-4);s=s.replace(/^0+/,"");return s||"0";}
function _bcmp(a,b){if(a.length!==b.length)return a.length<b.length?-1:1;var i;for(i=a.length-1;i>=0;i--)if(a[i]!==b[i])return a[i]<b[i]?-1:1;return 0;}
function _bmul(a,b){var o=new Array(a.length+b.length),i,j;for(i=0;i<o.length;i++)o[i]=0;
  for(i=0;i<a.length;i++){var c=0,ai=a[i];
    for(j=0;j<b.length;j++){var t=o[i+j]+ai*b[j]+c;o[i+j]=t&65535;c=Math.floor(t/65536);}
    var k=i+b.length;while(c>0){var t2=o[k]+c;o[k]=t2&65535;c=Math.floor(t2/65536);k++;}}
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bsmall(a,s){var o=new Array(a.length+1),c=0,i;for(i=0;i<a.length;i++){var t=a[i]*s+c;o[i]=t&65535;c=Math.floor(t/65536);}o[i]=c;
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bcmpAt(a,off,b,hi){var i,av,bv;for(i=hi;i>=off;i--){av=a[i]||0;bv=b[i-off]||0;if(av!==bv)return av<bv?-1:1;}return 0;}
function _bsubAt(a,off,b){var c=0,i;for(i=0;i<b.length;i++){var t=(a[off+i]||0)-b[i]+c;a[off+i]=t&65535;c=t>>16;}
  if(c)a[off+b.length]=(a[off+b.length]||0)+c;}
function _bmod(a,n){a=a.slice();while(a.length>1&&a[a.length-1]===0)a.pop();
  if(_bcmp(a,n)<0)return a;
  var sh=0,top=n[n.length-1];while(top<32768){top*=2;sh++;}
  var nn=_bsmall(n,1<<sh),aa=_bsmall(a,1<<sh),m=nn.length,j;
  aa.push(0);
  for(j=aa.length-1;j>=m;j--){
    var qh=Math.floor((aa[j]*65536+(aa[j-1]||0))/nn[m-1]);if(qh>65535)qh=65535;
    var off=j-m,t=_bsmall(nn,qh);
    while(_bcmpAt(aa,off,t,j)<0){qh--;t=_bsmall(nn,qh);}
    _bsubAt(aa,off,t);}
  var rem=aa.slice(0,m+1),carry=0,i2,mask=(1<<sh)-1;
  for(i2=rem.length-1;i2>=0;i2--){var nc=rem[i2]&mask;rem[i2]=(rem[i2]>>sh)+(carry<<(16-sh));carry=nc;}
  while(rem.length>1&&rem[rem.length-1]===0)rem.pop();return rem;}
function _bmodpow(b,e,n){b=_bmod(b,n);var r=[1],i,j;
  for(i=e.length-1;i>=0;i--)for(j=15;j>=0;j--){r=_bmod(_bmul(r,r),n);if((e[i]>>j)&1)r=_bmod(_bmul(r,b),n);}
  return r;}
function _rsa(pubB64,msg){var der=_b64dec(pubB64),i=0;function len(){var b=der[i++];if(b&128){var n=b&127,L=0,k;for(k=0;k<n;k++)L=L*256+der[i++];return L;}return b;}function chk(t){if(der[i++]!==t)throw new Error("公钥格式不对");}
  chk(48);len();chk(48);var l1=len();i+=l1;chk(3);len();i+=1;chk(48);len();chk(2);var ln=len(),ns="",k2;for(k2=0;k2<ln;k2++){var bb=der[i++];if(k2===0&&bb===0)continue;ns+=("0"+bb.toString(16)).slice(-2);}
  chk(2);var el=len(),es="";for(k2=0;k2<el;k2++){es+=("0"+der[i++].toString(16)).slice(-2);}
  var k=Math.ceil(ns.length/2),psLen=k-msg.length-3;if(psLen<8)throw new Error("RSA消息过长");
  var hx="0002",c;for(c=0;c<psLen;c++){var rb=0;do{rb=1+Math.floor(Math.random()*255);}while(rb===0);hx+=("0"+rb.toString(16)).slice(-2);}
  hx+="00";for(c=0;c<msg.length;c++)hx+=("0"+(msg.charCodeAt(c)&255).toString(16)).slice(-2);
  var r=_bmodpow(_bn(hx),_bn(es),_bn(ns));
  var hex=_bnh(r);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=Number(v);var o=[];do{var b=v%128;v=Math.floor(v/128);if(v>0)b+=128;o.push(b);}while(v>0);return o;}
function _pt(f,w){return _pv(f*8+w);}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0,s=1;for(;;){var x=a[i++];r+=(x&127)*s;if(!(x&128))break;s*=128;}return r;}
  while(i<a.length){var t=rv(),f=Math.floor(t/8),w=t%8;
    if(w===0)o.push({f:f,w:0,v:rv()});else if(w===2){var Ln=rv();o.push({f:f,w:2,v:a.slice(i,i+Ln)});i+=Ln;}else break;}
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

var list=[];
try{
var j=_jsonGet("/api/ex/v3/security/tag/list");var data=j.data;
if(typeof data==="string"&&_E.decrypt){data=_aesDec(_E.dataIv,_aesDec(_E.dataKey,data));}
if(typeof data==="string"){try{data=JSON.parse(data||"[]");}catch(e2){data=[];}}
(Array.isArray(data)?data:[]).forEach(function(sec){var secs=(sec.sections&&sec.sections.length)?sec.sections:[sec];
  secs.forEach(function(ss){(ss.vodList||[]).forEach(function(v){
    list.push({vod_id:String(v.id),vod_name:v.name,vod_pic:(v.coverImage&&v.coverImage.path)||"",vod_remarks:v.remarks||""});});});});
}catch(e){list=[{vod_id:"err",vod_name:"ERR推荐:"+e.message}];}
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
// ---- 纯JS大数（16位limb小端，不依赖BigInt，兼容老引擎）----
function _bn(h){var o=[],i=h.length;while(i>0){o.push(parseInt(h.slice(Math.max(0,i-4),i),16));i-=4;}return o;}
function _bnh(a){var s="",i;for(i=a.length-1;i>=0;i--)s+=("000"+a[i].toString(16)).slice(-4);s=s.replace(/^0+/,"");return s||"0";}
function _bcmp(a,b){if(a.length!==b.length)return a.length<b.length?-1:1;var i;for(i=a.length-1;i>=0;i--)if(a[i]!==b[i])return a[i]<b[i]?-1:1;return 0;}
function _bmul(a,b){var o=new Array(a.length+b.length),i,j;for(i=0;i<o.length;i++)o[i]=0;
  for(i=0;i<a.length;i++){var c=0,ai=a[i];
    for(j=0;j<b.length;j++){var t=o[i+j]+ai*b[j]+c;o[i+j]=t&65535;c=Math.floor(t/65536);}
    var k=i+b.length;while(c>0){var t2=o[k]+c;o[k]=t2&65535;c=Math.floor(t2/65536);k++;}}
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bsmall(a,s){var o=new Array(a.length+1),c=0,i;for(i=0;i<a.length;i++){var t=a[i]*s+c;o[i]=t&65535;c=Math.floor(t/65536);}o[i]=c;
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bcmpAt(a,off,b,hi){var i,av,bv;for(i=hi;i>=off;i--){av=a[i]||0;bv=b[i-off]||0;if(av!==bv)return av<bv?-1:1;}return 0;}
function _bsubAt(a,off,b){var c=0,i;for(i=0;i<b.length;i++){var t=(a[off+i]||0)-b[i]+c;a[off+i]=t&65535;c=t>>16;}
  if(c)a[off+b.length]=(a[off+b.length]||0)+c;}
function _bmod(a,n){a=a.slice();while(a.length>1&&a[a.length-1]===0)a.pop();
  if(_bcmp(a,n)<0)return a;
  var sh=0,top=n[n.length-1];while(top<32768){top*=2;sh++;}
  var nn=_bsmall(n,1<<sh),aa=_bsmall(a,1<<sh),m=nn.length,j;
  aa.push(0);
  for(j=aa.length-1;j>=m;j--){
    var qh=Math.floor((aa[j]*65536+(aa[j-1]||0))/nn[m-1]);if(qh>65535)qh=65535;
    var off=j-m,t=_bsmall(nn,qh);
    while(_bcmpAt(aa,off,t,j)<0){qh--;t=_bsmall(nn,qh);}
    _bsubAt(aa,off,t);}
  var rem=aa.slice(0,m+1),carry=0,i2,mask=(1<<sh)-1;
  for(i2=rem.length-1;i2>=0;i2--){var nc=rem[i2]&mask;rem[i2]=(rem[i2]>>sh)+(carry<<(16-sh));carry=nc;}
  while(rem.length>1&&rem[rem.length-1]===0)rem.pop();return rem;}
function _bmodpow(b,e,n){b=_bmod(b,n);var r=[1],i,j;
  for(i=e.length-1;i>=0;i--)for(j=15;j>=0;j--){r=_bmod(_bmul(r,r),n);if((e[i]>>j)&1)r=_bmod(_bmul(r,b),n);}
  return r;}
function _rsa(pubB64,msg){var der=_b64dec(pubB64),i=0;function len(){var b=der[i++];if(b&128){var n=b&127,L=0,k;for(k=0;k<n;k++)L=L*256+der[i++];return L;}return b;}function chk(t){if(der[i++]!==t)throw new Error("公钥格式不对");}
  chk(48);len();chk(48);var l1=len();i+=l1;chk(3);len();i+=1;chk(48);len();chk(2);var ln=len(),ns="",k2;for(k2=0;k2<ln;k2++){var bb=der[i++];if(k2===0&&bb===0)continue;ns+=("0"+bb.toString(16)).slice(-2);}
  chk(2);var el=len(),es="";for(k2=0;k2<el;k2++){es+=("0"+der[i++].toString(16)).slice(-2);}
  var k=Math.ceil(ns.length/2),psLen=k-msg.length-3;if(psLen<8)throw new Error("RSA消息过长");
  var hx="0002",c;for(c=0;c<psLen;c++){var rb=0;do{rb=1+Math.floor(Math.random()*255);}while(rb===0);hx+=("0"+rb.toString(16)).slice(-2);}
  hx+="00";for(c=0;c<msg.length;c++)hx+=("0"+(msg.charCodeAt(c)&255).toString(16)).slice(-2);
  var r=_bmodpow(_bn(hx),_bn(es),_bn(ns));
  var hex=_bnh(r);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=Number(v);var o=[];do{var b=v%128;v=Math.floor(v/128);if(v>0)b+=128;o.push(b);}while(v>0);return o;}
function _pt(f,w){return _pv(f*8+w);}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0,s=1;for(;;){var x=a[i++];r+=(x&127)*s;if(!(x&128))break;s*=128;}return r;}
  while(i<a.length){var t=rv(),f=Math.floor(t/8),w=t%8;
    if(w===0)o.push({f:f,w:0,v:rv()});else if(w===2){var Ln=rv();o.push({f:f,w:2,v:a.slice(i,i+Ln)});i+=Ln;}else break;}
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

try{
var fid=String(MY_CATE||input||'').split(';')[0];var pg=parseInt(MY_PAGE||1);
var ext={};try{ext=(typeof MY_FL==="object"&&MY_FL)?MY_FL:(typeof MY_FL==="string"&&MY_FL?JSON.parse(MY_FL):{});}catch(e0){ext={};}
var params={pagesize:"21",typeId1:fid,page:String(pg),vodOrderBy:ext.extend_sort||"最新",vodArea:ext.area||"",vodLang:ext.lang||"",vodClass:ext.class||"",vodYear:ext.year||""};
setResult(_dramaList(_postPb("/api/proto/v5/drama/category",params)));
}catch(e){setResult([{vod_id:"err",vod_name:"ERR一级:"+e.message}]);}

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
// ---- 纯JS大数（16位limb小端，不依赖BigInt，兼容老引擎）----
function _bn(h){var o=[],i=h.length;while(i>0){o.push(parseInt(h.slice(Math.max(0,i-4),i),16));i-=4;}return o;}
function _bnh(a){var s="",i;for(i=a.length-1;i>=0;i--)s+=("000"+a[i].toString(16)).slice(-4);s=s.replace(/^0+/,"");return s||"0";}
function _bcmp(a,b){if(a.length!==b.length)return a.length<b.length?-1:1;var i;for(i=a.length-1;i>=0;i--)if(a[i]!==b[i])return a[i]<b[i]?-1:1;return 0;}
function _bmul(a,b){var o=new Array(a.length+b.length),i,j;for(i=0;i<o.length;i++)o[i]=0;
  for(i=0;i<a.length;i++){var c=0,ai=a[i];
    for(j=0;j<b.length;j++){var t=o[i+j]+ai*b[j]+c;o[i+j]=t&65535;c=Math.floor(t/65536);}
    var k=i+b.length;while(c>0){var t2=o[k]+c;o[k]=t2&65535;c=Math.floor(t2/65536);k++;}}
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bsmall(a,s){var o=new Array(a.length+1),c=0,i;for(i=0;i<a.length;i++){var t=a[i]*s+c;o[i]=t&65535;c=Math.floor(t/65536);}o[i]=c;
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bcmpAt(a,off,b,hi){var i,av,bv;for(i=hi;i>=off;i--){av=a[i]||0;bv=b[i-off]||0;if(av!==bv)return av<bv?-1:1;}return 0;}
function _bsubAt(a,off,b){var c=0,i;for(i=0;i<b.length;i++){var t=(a[off+i]||0)-b[i]+c;a[off+i]=t&65535;c=t>>16;}
  if(c)a[off+b.length]=(a[off+b.length]||0)+c;}
function _bmod(a,n){a=a.slice();while(a.length>1&&a[a.length-1]===0)a.pop();
  if(_bcmp(a,n)<0)return a;
  var sh=0,top=n[n.length-1];while(top<32768){top*=2;sh++;}
  var nn=_bsmall(n,1<<sh),aa=_bsmall(a,1<<sh),m=nn.length,j;
  aa.push(0);
  for(j=aa.length-1;j>=m;j--){
    var qh=Math.floor((aa[j]*65536+(aa[j-1]||0))/nn[m-1]);if(qh>65535)qh=65535;
    var off=j-m,t=_bsmall(nn,qh);
    while(_bcmpAt(aa,off,t,j)<0){qh--;t=_bsmall(nn,qh);}
    _bsubAt(aa,off,t);}
  var rem=aa.slice(0,m+1),carry=0,i2,mask=(1<<sh)-1;
  for(i2=rem.length-1;i2>=0;i2--){var nc=rem[i2]&mask;rem[i2]=(rem[i2]>>sh)+(carry<<(16-sh));carry=nc;}
  while(rem.length>1&&rem[rem.length-1]===0)rem.pop();return rem;}
function _bmodpow(b,e,n){b=_bmod(b,n);var r=[1],i,j;
  for(i=e.length-1;i>=0;i--)for(j=15;j>=0;j--){r=_bmod(_bmul(r,r),n);if((e[i]>>j)&1)r=_bmod(_bmul(r,b),n);}
  return r;}
function _rsa(pubB64,msg){var der=_b64dec(pubB64),i=0;function len(){var b=der[i++];if(b&128){var n=b&127,L=0,k;for(k=0;k<n;k++)L=L*256+der[i++];return L;}return b;}function chk(t){if(der[i++]!==t)throw new Error("公钥格式不对");}
  chk(48);len();chk(48);var l1=len();i+=l1;chk(3);len();i+=1;chk(48);len();chk(2);var ln=len(),ns="",k2;for(k2=0;k2<ln;k2++){var bb=der[i++];if(k2===0&&bb===0)continue;ns+=("0"+bb.toString(16)).slice(-2);}
  chk(2);var el=len(),es="";for(k2=0;k2<el;k2++){es+=("0"+der[i++].toString(16)).slice(-2);}
  var k=Math.ceil(ns.length/2),psLen=k-msg.length-3;if(psLen<8)throw new Error("RSA消息过长");
  var hx="0002",c;for(c=0;c<psLen;c++){var rb=0;do{rb=1+Math.floor(Math.random()*255);}while(rb===0);hx+=("0"+rb.toString(16)).slice(-2);}
  hx+="00";for(c=0;c<msg.length;c++)hx+=("0"+(msg.charCodeAt(c)&255).toString(16)).slice(-2);
  var r=_bmodpow(_bn(hx),_bn(es),_bn(ns));
  var hex=_bnh(r);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=Number(v);var o=[];do{var b=v%128;v=Math.floor(v/128);if(v>0)b+=128;o.push(b);}while(v>0);return o;}
function _pt(f,w){return _pv(f*8+w);}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0,s=1;for(;;){var x=a[i++];r+=(x&127)*s;if(!(x&128))break;s*=128;}return r;}
  while(i<a.length){var t=rv(),f=Math.floor(t/8),w=t%8;
    if(w===0)o.push({f:f,w:0,v:rv()});else if(w===2){var Ln=rv();o.push({f:f,w:2,v:a.slice(i,i+Ln)});i+=Ln;}else break;}
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
var id=String(input);
try{
var top=_postPb("/api/proto/v5/drama/getDetail",{id:id});
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
}catch(e){VOD=VOD||{};VOD.vod_name="ERR详情:"+e.message;VOD.vod_id=id;setResult([VOD]);}

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
// ---- 纯JS大数（16位limb小端，不依赖BigInt，兼容老引擎）----
function _bn(h){var o=[],i=h.length;while(i>0){o.push(parseInt(h.slice(Math.max(0,i-4),i),16));i-=4;}return o;}
function _bnh(a){var s="",i;for(i=a.length-1;i>=0;i--)s+=("000"+a[i].toString(16)).slice(-4);s=s.replace(/^0+/,"");return s||"0";}
function _bcmp(a,b){if(a.length!==b.length)return a.length<b.length?-1:1;var i;for(i=a.length-1;i>=0;i--)if(a[i]!==b[i])return a[i]<b[i]?-1:1;return 0;}
function _bmul(a,b){var o=new Array(a.length+b.length),i,j;for(i=0;i<o.length;i++)o[i]=0;
  for(i=0;i<a.length;i++){var c=0,ai=a[i];
    for(j=0;j<b.length;j++){var t=o[i+j]+ai*b[j]+c;o[i+j]=t&65535;c=Math.floor(t/65536);}
    var k=i+b.length;while(c>0){var t2=o[k]+c;o[k]=t2&65535;c=Math.floor(t2/65536);k++;}}
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bsmall(a,s){var o=new Array(a.length+1),c=0,i;for(i=0;i<a.length;i++){var t=a[i]*s+c;o[i]=t&65535;c=Math.floor(t/65536);}o[i]=c;
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bcmpAt(a,off,b,hi){var i,av,bv;for(i=hi;i>=off;i--){av=a[i]||0;bv=b[i-off]||0;if(av!==bv)return av<bv?-1:1;}return 0;}
function _bsubAt(a,off,b){var c=0,i;for(i=0;i<b.length;i++){var t=(a[off+i]||0)-b[i]+c;a[off+i]=t&65535;c=t>>16;}
  if(c)a[off+b.length]=(a[off+b.length]||0)+c;}
function _bmod(a,n){a=a.slice();while(a.length>1&&a[a.length-1]===0)a.pop();
  if(_bcmp(a,n)<0)return a;
  var sh=0,top=n[n.length-1];while(top<32768){top*=2;sh++;}
  var nn=_bsmall(n,1<<sh),aa=_bsmall(a,1<<sh),m=nn.length,j;
  aa.push(0);
  for(j=aa.length-1;j>=m;j--){
    var qh=Math.floor((aa[j]*65536+(aa[j-1]||0))/nn[m-1]);if(qh>65535)qh=65535;
    var off=j-m,t=_bsmall(nn,qh);
    while(_bcmpAt(aa,off,t,j)<0){qh--;t=_bsmall(nn,qh);}
    _bsubAt(aa,off,t);}
  var rem=aa.slice(0,m+1),carry=0,i2,mask=(1<<sh)-1;
  for(i2=rem.length-1;i2>=0;i2--){var nc=rem[i2]&mask;rem[i2]=(rem[i2]>>sh)+(carry<<(16-sh));carry=nc;}
  while(rem.length>1&&rem[rem.length-1]===0)rem.pop();return rem;}
function _bmodpow(b,e,n){b=_bmod(b,n);var r=[1],i,j;
  for(i=e.length-1;i>=0;i--)for(j=15;j>=0;j--){r=_bmod(_bmul(r,r),n);if((e[i]>>j)&1)r=_bmod(_bmul(r,b),n);}
  return r;}
function _rsa(pubB64,msg){var der=_b64dec(pubB64),i=0;function len(){var b=der[i++];if(b&128){var n=b&127,L=0,k;for(k=0;k<n;k++)L=L*256+der[i++];return L;}return b;}function chk(t){if(der[i++]!==t)throw new Error("公钥格式不对");}
  chk(48);len();chk(48);var l1=len();i+=l1;chk(3);len();i+=1;chk(48);len();chk(2);var ln=len(),ns="",k2;for(k2=0;k2<ln;k2++){var bb=der[i++];if(k2===0&&bb===0)continue;ns+=("0"+bb.toString(16)).slice(-2);}
  chk(2);var el=len(),es="";for(k2=0;k2<el;k2++){es+=("0"+der[i++].toString(16)).slice(-2);}
  var k=Math.ceil(ns.length/2),psLen=k-msg.length-3;if(psLen<8)throw new Error("RSA消息过长");
  var hx="0002",c;for(c=0;c<psLen;c++){var rb=0;do{rb=1+Math.floor(Math.random()*255);}while(rb===0);hx+=("0"+rb.toString(16)).slice(-2);}
  hx+="00";for(c=0;c<msg.length;c++)hx+=("0"+(msg.charCodeAt(c)&255).toString(16)).slice(-2);
  var r=_bmodpow(_bn(hx),_bn(es),_bn(ns));
  var hex=_bnh(r);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=Number(v);var o=[];do{var b=v%128;v=Math.floor(v/128);if(v>0)b+=128;o.push(b);}while(v>0);return o;}
function _pt(f,w){return _pv(f*8+w);}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0,s=1;for(;;){var x=a[i++];r+=(x&127)*s;if(!(x&128))break;s*=128;}return r;}
  while(i<a.length){var t=rv(),f=Math.floor(t/8),w=t%8;
    if(w===0)o.push({f:f,w:0,v:rv()});else if(w===2){var Ln=rv();o.push({f:f,w:2,v:a.slice(i,i+Ln)});i+=Ln;}else break;}
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

try{
var wd=(typeof input!=="undefined")?input:"";var pg=parseInt(MY_PAGE||1);
var params={searchKeys:String(wd||""),page:String(pg),pagesize:"21"};
setResult(_dramaList(_postPb("/api/proto/v5/drama/search",params)));
}catch(e){setResult([{vod_id:"err",vod_name:"ERR搜索:"+e.message}]);}

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
// ---- 纯JS大数（16位limb小端，不依赖BigInt，兼容老引擎）----
function _bn(h){var o=[],i=h.length;while(i>0){o.push(parseInt(h.slice(Math.max(0,i-4),i),16));i-=4;}return o;}
function _bnh(a){var s="",i;for(i=a.length-1;i>=0;i--)s+=("000"+a[i].toString(16)).slice(-4);s=s.replace(/^0+/,"");return s||"0";}
function _bcmp(a,b){if(a.length!==b.length)return a.length<b.length?-1:1;var i;for(i=a.length-1;i>=0;i--)if(a[i]!==b[i])return a[i]<b[i]?-1:1;return 0;}
function _bmul(a,b){var o=new Array(a.length+b.length),i,j;for(i=0;i<o.length;i++)o[i]=0;
  for(i=0;i<a.length;i++){var c=0,ai=a[i];
    for(j=0;j<b.length;j++){var t=o[i+j]+ai*b[j]+c;o[i+j]=t&65535;c=Math.floor(t/65536);}
    var k=i+b.length;while(c>0){var t2=o[k]+c;o[k]=t2&65535;c=Math.floor(t2/65536);k++;}}
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bsmall(a,s){var o=new Array(a.length+1),c=0,i;for(i=0;i<a.length;i++){var t=a[i]*s+c;o[i]=t&65535;c=Math.floor(t/65536);}o[i]=c;
  while(o.length>1&&o[o.length-1]===0)o.pop();return o;}
function _bcmpAt(a,off,b,hi){var i,av,bv;for(i=hi;i>=off;i--){av=a[i]||0;bv=b[i-off]||0;if(av!==bv)return av<bv?-1:1;}return 0;}
function _bsubAt(a,off,b){var c=0,i;for(i=0;i<b.length;i++){var t=(a[off+i]||0)-b[i]+c;a[off+i]=t&65535;c=t>>16;}
  if(c)a[off+b.length]=(a[off+b.length]||0)+c;}
function _bmod(a,n){a=a.slice();while(a.length>1&&a[a.length-1]===0)a.pop();
  if(_bcmp(a,n)<0)return a;
  var sh=0,top=n[n.length-1];while(top<32768){top*=2;sh++;}
  var nn=_bsmall(n,1<<sh),aa=_bsmall(a,1<<sh),m=nn.length,j;
  aa.push(0);
  for(j=aa.length-1;j>=m;j--){
    var qh=Math.floor((aa[j]*65536+(aa[j-1]||0))/nn[m-1]);if(qh>65535)qh=65535;
    var off=j-m,t=_bsmall(nn,qh);
    while(_bcmpAt(aa,off,t,j)<0){qh--;t=_bsmall(nn,qh);}
    _bsubAt(aa,off,t);}
  var rem=aa.slice(0,m+1),carry=0,i2,mask=(1<<sh)-1;
  for(i2=rem.length-1;i2>=0;i2--){var nc=rem[i2]&mask;rem[i2]=(rem[i2]>>sh)+(carry<<(16-sh));carry=nc;}
  while(rem.length>1&&rem[rem.length-1]===0)rem.pop();return rem;}
function _bmodpow(b,e,n){b=_bmod(b,n);var r=[1],i,j;
  for(i=e.length-1;i>=0;i--)for(j=15;j>=0;j--){r=_bmod(_bmul(r,r),n);if((e[i]>>j)&1)r=_bmod(_bmul(r,b),n);}
  return r;}
function _rsa(pubB64,msg){var der=_b64dec(pubB64),i=0;function len(){var b=der[i++];if(b&128){var n=b&127,L=0,k;for(k=0;k<n;k++)L=L*256+der[i++];return L;}return b;}function chk(t){if(der[i++]!==t)throw new Error("公钥格式不对");}
  chk(48);len();chk(48);var l1=len();i+=l1;chk(3);len();i+=1;chk(48);len();chk(2);var ln=len(),ns="",k2;for(k2=0;k2<ln;k2++){var bb=der[i++];if(k2===0&&bb===0)continue;ns+=("0"+bb.toString(16)).slice(-2);}
  chk(2);var el=len(),es="";for(k2=0;k2<el;k2++){es+=("0"+der[i++].toString(16)).slice(-2);}
  var k=Math.ceil(ns.length/2),psLen=k-msg.length-3;if(psLen<8)throw new Error("RSA消息过长");
  var hx="0002",c;for(c=0;c<psLen;c++){var rb=0;do{rb=1+Math.floor(Math.random()*255);}while(rb===0);hx+=("0"+rb.toString(16)).slice(-2);}
  hx+="00";for(c=0;c<msg.length;c++)hx+=("0"+(msg.charCodeAt(c)&255).toString(16)).slice(-2);
  var r=_bmodpow(_bn(hx),_bn(es),_bn(ns));
  var hex=_bnh(r);while(hex.length<k*2)hex="0"+hex;
  var out=[];for(c=0;c<k;c++)out.push(parseInt(hex.substr(c*2,2),16));return _b64enc(out);}
function _pv(v){v=Number(v);var o=[];do{var b=v%128;v=Math.floor(v/128);if(v>0)b+=128;o.push(b);}while(v>0);return o;}
function _pt(f,w){return _pv(f*8+w);}
function _pstr(f,s){var b=[],i;for(i=0;i<s.length;i++)b.push(s.charCodeAt(i)&255);return _pt(f,2).concat(_pv(b.length),b);}
function _pint(f,v){return _pt(f,0).concat(_pv(v));}
function _pf(a){var o=[],i=0;function rv(){var r=0,s=1;for(;;){var x=a[i++];r+=(x&127)*s;if(!(x&128))break;s*=128;}return r;}
  while(i<a.length){var t=rv(),f=Math.floor(t/8),w=t%8;
    if(w===0)o.push({f:f,w:0,v:rv()});else if(w===2){var Ln=rv();o.push({f:f,w:2,v:a.slice(i,i+Ln)});i+=Ln;}else break;}
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
