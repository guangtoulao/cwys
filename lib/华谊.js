// ===== 加密API站规则（AppDrama 家族）· 由 TVBox 加站助手生成 =====
// 算法模板已真机验证；密钥来自站点 ext 配置。请勿手改 _E 内的密钥。
import { Crypto as _CR } from "assets://js/lib/cat.js";
var _E={"appName":"华谊","publicKey":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp9Ek4wIlQAtwFnuBRlsFiow2tr+4UOciGeNKbY7nL74etUqUb6fvpOSOHhFEfaWlfwUpOB17x3JEL3No19nfjCeVYrYPjlJcgoqUWH/tfIfFAQWvtxBIBlKazkhw8d3ChysWmeWRikKqkBsVRY4oqNPuj4sjm6Zult0U4I4prRQIDAQAB","dataKey":"NDBYSZR1DMRRZ05NSUCWEJNIYWLBPT0=","dataIv":"OC1A06E197EF10CF3F6058CA7A803B5E","pkg":"com.muyue.tool","host":"http://43.240.158.156:8002","site":"./lib/az5.txt","version":"1.0.0.4","decrypt":"1"};
var _PK2="ed5fdsgucxumegqa";
var _B64C="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
function _b64enc(a){var o="",i;for(i=0;i<a.length;i+=3){var b0=a[i],b1=a[i+1],b2=a[i+2];o+=_B64C.charAt(b0>>2);o+=_B64C.charAt(((b0&3)<<4)|((b1===undefined?0:b1)>>4));o+=(b1===undefined)?"=":_B64C.charAt(((b1&15)<<2)|((b2===undefined?0:b2)>>6));o+=(b2===undefined)?"=":_B64C.charAt(b2&63);}return o;}
function _b64dec(s){s=String(s).replace(/[^A-Za-z0-9+\/=]/g,"");var a=[],v=0,b=-8,i;for(i=0;i<s.length;i++){var idx=_B64C.indexOf(s.charAt(i));if(idx<0)continue;v=(v<<6)|idx;b+=6;if(b>=0){a.push((v>>b)&255);b-=8;}}return a;}
function _s2b(s){var a=[],i;for(i=0;i<s.length;i++)a.push(s.charCodeAt(i)&255);return a;}
function _b2s(a){var o="",CH=4096,i;for(i=0;i<a.length;i+=CH)o+=String.fromCharCode.apply(null,a.slice(i,i+CH));return o;}
function _utf8(b){var o="",i=0;while(i<b.length){var c=b[i];if(c<128){o+=String.fromCharCode(c);i++;}else if(c<224){o+=String.fromCharCode(((c&31)<<6)|(b[i+1]&63));i+=2;}else if(c<240){o+=String.fromCharCode(((c&15)<<12)|((b[i+1]&63)<<6)|(b[i+2]&63));i+=3;}else{var p=((c&7)<<18)|((b[i+1]&63)<<12)|((b[i+2]&63)<<6)|(b[i+3]&63);p-=65536;o+=String.fromCharCode(55296+(p>>10),56320+(p&1023));i+=4;}}return o;}
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
function _aes(mode,key,iv,msg,enc){var k=_CR.enc.Utf8.parse(key);var opt=(mode==="CBC")?{iv:_CR.enc.Utf8.parse(iv||key),mode:_CR.mode.CBC,padding:_CR.pad.Pkcs7}:{mode:_CR.mode.ECB,padding:_CR.pad.Pkcs7};
  var r=_CR.AES.encrypt(msg,k,opt);return enc==="hex"?r.ciphertext.toString(_CR.enc.Hex):r.ciphertext.toString(_CR.enc.Base64);}
function _aesDec(key,b64){var r=_CR.AES.decrypt(b64,_CR.enc.Utf8.parse(key),{mode:_CR.mode.ECB,padding:_CR.pad.Pkcs7});return r.toString(_CR.enc.Utf8);}
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
function _post(path,body,hd){var r=req(_E.host+path,{method:"POST",headers:hd,data:body,body:body});return (r&&r.content)?r.content:"";}
function _get(path,hd){var r=req(_E.host+path,{method:"GET",headers:hd});return (r&&r.content)?r.content:"";}
function _dramaList(content){var out=[];try{var top=_pf(_s2b(content));var d=_pbGet(top,3);if(!d)return out;
  var its=_pf(d.v);for(var i=0;i<its.length;i++){if(its[i].f!==1||its[i].w!==2)continue;
    var m={},fs=_pf(its[i].v),j;for(j=0;j<fs.length;j++){m[fs[j].f]=(fs[j].w===2)?fs[j].v:Number(fs[j].v);}
    var pic="";try{var cv=_pf(m[2]);var pn=_pbGet(cv,1)||_pbGet(cv,2);if(pn)pic=_utf8(pn.v);}catch(e){}
    out.push({vod_id:String(typeof m[3]==="number"?m[3]:_utf8(m[3]||[])),vod_name:_utf8(m[5]||[]),vod_pic:pic,vod_remarks:_utf8(m[13]||[])});}
  }catch(e){}return out;}
function home(){var out={class:[],filters:{}};try{
  var t=_get("/api/v3/drama/getCategory?orderBy=type_id",_hd(true));var j=JSON.parse(t||"{}");var arr=j.data||[];
  arr.forEach(function(o){if(o.name==="公告")return;
    out.class.push({type_id:String(o.id),type_name:o.name});
    try{var cv=JSON.parse(o.converUrl||"{}"),fs=[];
      [{k:"class",n:"类型"},{k:"lang",n:"语言"},{k:"area",n:"地区"},{k:"year",n:"年份"},{k:"extend_sort",n:"排序"}].forEach(function(x){var v=cv[x.k];if(!v)return;
        var val=v.split("|").map(function(y){return {n:y,v:y};});fs.push({key:x.k,name:x.n,init:"",value:val});});
      if(fs.length)out.filters[String(o.id)]=fs;}catch(e){}});
  }catch(e){}return JSON.stringify(out);}
function homeVod(){var list=[];try{
  var t=_get("/api/ex/v3/security/tag/list",_hd(true));var j=JSON.parse(t||"{}");var data=j.data;
  if(typeof data==="string"&&_E.decrypt){data=_aesDec(_E.dataIv,_aesDec(_E.dataKey,data));}
  if(typeof data==="string")data=JSON.parse(data||"[]");
  (Array.isArray(data)?data:[]).forEach(function(sec){var secs=(sec.sections&&sec.sections.length)?sec.sections:[sec];
    secs.forEach(function(ss){(ss.vodList||[]).forEach(function(v){
    list.push({vod_id:String(v.id),vod_name:v.name,vod_pic:(v.coverImage&&v.coverImage.path)||"",vod_remarks:v.remarks||""});});});});
  }catch(e){}return JSON.stringify({page:1,pagecount:1,list:list});}
function category(fid,pg,ext){ext=ext||{};try{
  var params={pagesize:"21",typeId1:String(fid),page:String(pg||"1"),vodOrderBy:ext.extend_sort||"最新",vodArea:ext.area||"",vodLang:ext.lang||"",vodClass:ext.class||"",vodYear:ext.year||""};
  var c=_post("/api/proto/v5/drama/category",_body(params),_hd(false));
  return JSON.stringify({page:parseInt(pg||"1"),pagecount:parseInt(pg||"1")+1,list:_dramaList(c)});}catch(e){return JSON.stringify({page:1,pagecount:1,list:[]});}}
function search(wd,quick,pg){try{
  var c=_post("/api/proto/v5/drama/search",_body({searchKeys:String(wd||""),page:String(pg||"1"),pagesize:"21"}),_hd(false));
  return JSON.stringify({page:parseInt(pg||"1"),pagecount:parseInt(pg||"1")+1,list:_dramaList(c)});}catch(e){return JSON.stringify({page:1,pagecount:1,list:[]});}}
var _MEDIA=/(.*)\.(mp4|m3u8|flv|mkv|avi|ts|mov|mpd|m4a|wmv)(\?.*)?$/i;
function detail(ids){try{var id=String(ids&&ids[0]||"");
  var c=_post("/api/proto/v5/drama/getDetail",_body({id:id}),_hd(false));
  var top=_pf(_s2b(c)),d=_pbGet(top,3);if(!d)return JSON.stringify({list:[]});
  var m={},fs=_pf(d.v),i;for(i=0;i<fs.length;i++)m[fs[i].f]=(fs[i].w===2)?fs[i].v:Number(fs[i].v);
  var vod={vod_id:id,vod_name:_utf8(m[9]||[]),vod_pic:"",vod_area:_utf8(m[1]||[]),vod_year:String(typeof m[18]==="number"?m[18]:_utf8(m[18]||[])),vod_remarks:_utf8(m[26]||[]),vod_actor:_utf8(m[25]||[]),vod_content:_utf8(m[7]||[]).replace(/<[^>]+>/g,""),vod_play_from:"",vod_play_url:""};
  try{var cv=_pf(m[2]);var pn=_pbGet(cv,1)||_pbGet(cv,2);if(pn)vod.vod_pic=_utf8(pn.v);}catch(e){}
  var lines={},order=[];var vids=[];
  for(i=0;i<fs.length;i++){if(fs[i].f===29&&fs[i].w===2)vids.push(fs[i].v);}
  vids.forEach(function(vb){var vm={},vf=_pf(vb),j;for(j=0;j<vf.length;j++)vm[vf[j].f]=(vf[j].w===2)?_utf8(vf[j].v):Number(vf[j].v);
    var line=vm[11]||vm[9]||"橘汁";var path=vm[4]||"";var title=vm[3]||("第"+vm[2]+"集");
    if(!lines[line]){lines[line]=[];order.push(line);}
    if(_MEDIA.test(path)&&!/^Ksvideo-|^KZNB-|^vwnet-|^FYNB-|^fym3u8-|^pylg-/.test(path)){lines[line].push(title+"$"+path);}
    else{lines[line].push(title+"$"+_b64enc(_s2b(JSON.stringify({vodPlayFrom:vm[9]||"",playUrl:path}))));}});
  vod.vod_play_from=order.join("$$$");
  vod.vod_play_url=order.map(function(k){return lines[k].join("#");}).join("$$$");
  return JSON.stringify({list:[vod]});}catch(e){return JSON.stringify({list:[]});}}
function play(flag,id){try{
  if(_MEDIA.test(id))return JSON.stringify({parse:0,url:id,header:{"User-Agent":"okhttp/3.12.1"}});
  var o=JSON.parse(_utf8(_b64dec(id)));
  var c=_post("/api/proto/v5/videoUsableUrl",_body({vodPlayFrom:o.vodPlayFrom||"",playUrl:o.playUrl||""}),_hd(false));
  var top=_pf(_s2b(c)),d=_pbGet(top,3);var url="";
  if(d){var u=_pbGet(_pf(d.v),1);if(u)url=_utf8(u.v);}
  return JSON.stringify({parse:0,url:url,header:{"User-Agent":"okhttp/3.12.1"}});}catch(e){return JSON.stringify({parse:0,url:"",header:{}});}}
function __jsEvalReturn(){return {init:function(){return ""},home:home,homeVod:homeVod,category:category,search:search,detail:detail,play:play};}
export { __jsEvalReturn };