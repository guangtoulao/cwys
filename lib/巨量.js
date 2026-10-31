var rule = {
  "title": "巨量资源",
  "host": "https://api.juliang.live",
  "homeUrl": "https://api.juliang.live/api/provide/vod/?ac=detail&pg=1",
  "url": "https://api.juliang.live/api/provide/vod/?ac=detail&t=fyclass&pg=fypage",
  "detailUrl": "https://api.juliang.live/api/provide/vod/?ac=detail&ids=fyid",
  "searchUrl": "https://api.juliang.live/api/provide/vod/?ac=detail&wd=**&pg=fypage",
  "searchable": 2,
  "quickSearch": 1,
  "filterable": 0,
  "play_parse": 1,
  "headers": {
    "User-Agent": "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
  },
  "class_name": "电影&电视剧&动漫&综艺&短剧&体育赛事&AI制作",
  "class_url": "1&2&3&4&5&6&7",
  "推荐": "js:\n// vod_id 是18位雪花数字, 超出JS安全整数(2^53), JSON.parse会静默丢精度 -> 先补引号转字符串\nfunction JL(u) { var r = request(u); r = r.replace(/(\"vod_id\":)(\\d{9,})/g, '$1\"$2\"'); return JSON.parse(r); }\nvar d = [];\nvar j = JL('https://api.juliang.live/api/provide/vod/?ac=detail&pg=1');\n(j.list || []).forEach(function (v) {\n    d.push({ vod_id: String(v.vod_id), vod_name: v.vod_name || '', vod_pic: v.vod_pic || '', vod_remarks: v.vod_remarks || '' });\n});\nVODS = d;",
  "一级": "js:\n// vod_id 是18位雪花数字, 超出JS安全整数(2^53), JSON.parse会静默丢精度 -> 先补引号转字符串\nfunction JL(u) { var r = request(u); r = r.replace(/(\"vod_id\":)(\\d{9,})/g, '$1\"$2\"'); return JSON.parse(r); }\nvar d = [];\nvar j = JL(MY_URL);\n(j.list || []).forEach(function (v) {\n    d.push({ vod_id: String(v.vod_id), vod_name: v.vod_name || '', vod_pic: v.vod_pic || '', vod_remarks: v.vod_remarks || '' });\n});\nVODS = d;",
  "二级": "js:\n// vod_id 是18位雪花数字, 超出JS安全整数(2^53), JSON.parse会静默丢精度 -> 先补引号转字符串\nfunction JL(u) { var r = request(u); r = r.replace(/(\"vod_id\":)(\\d{9,})/g, '$1\"$2\"'); return JSON.parse(r); }\nvar j = JL(input);\nvar v = (j.list || [])[0] || {};\nvar LINE = { jlm3u8: '🍒巨量|智能线路', jlplayer: '🍒巨量|极速线路' };\nvar froms = (v.vod_play_from || '').split('$$$');\nvar urls = (v.vod_play_url || '').split('$$$');\nvar tabs = [], lists = [];\nfroms.forEach(function (f, i) {\n    var fn = f.trim();\n    tabs.push(LINE[fn] || ('🍒巨量|线路' + (i + 1)));\n    var eps = [];\n    (urls[i] || '').split('#').forEach(function (e, k) {\n        if (!e) { return; }\n        var p = e.split('$');\n        var name = p.length > 1 ? p.slice(0, p.length - 1).join('$') : ('第' + (k + 1) + '集');\n        if (!name || name === '播放') { name = '正片'; }\n        eps.push(name + '$' + p[p.length - 1]);\n    });\n    lists.push(eps);\n});\nVOD = {\n    vod_id: String(v.vod_id || input),\n    vod_name: v.vod_name || '',\n    vod_pic: v.vod_pic || '',\n    type_name: v.type_name || '',\n    vod_year: v.vod_year || '',\n    vod_area: v.vod_area || '',\n    vod_remarks: v.vod_remarks || '',\n    vod_actor: v.vod_actor || '',\n    vod_director: v.vod_director || '',\n    vod_content: (v.vod_content || '').replace(/<[^>]*>/g, '').trim(),\n    vod_play_from: tabs.join('$$$'),\n    vod_play_url: lists.map(function (l) { return l.join('#'); }).join('$$$')\n};",
  "搜索": "js:\n// vod_id 是18位雪花数字, 超出JS安全整数(2^53), JSON.parse会静默丢精度 -> 先补引号转字符串\nfunction JL(u) { var r = request(u); r = r.replace(/(\"vod_id\":)(\\d{9,})/g, '$1\"$2\"'); return JSON.parse(r); }\nvar wd = typeof KEY !== 'undefined' ? encodeURIComponent(KEY) : '';\nvar pg = typeof MY_PAGE !== 'undefined' ? MY_PAGE : 1;\nvar d = [];\nvar j = JL('https://api.juliang.live/api/provide/vod/?ac=detail&wd=' + wd + '&pg=' + pg);\n(j.list || []).forEach(function (v) {\n    d.push({ vod_id: String(v.vod_id), vod_name: v.vod_name || '', vod_pic: v.vod_pic || '', vod_remarks: v.vod_remarks || '' });\n});\nVODS = d;",
  "lazy": "js:\n// vod_id 是18位雪花数字, 超出JS安全整数(2^53), JSON.parse会静默丢精度 -> 先补引号转字符串\nfunction JL(u) { var r = request(u); r = r.replace(/(\"vod_id\":)(\\d{9,})/g, '$1\"$2\"'); return JSON.parse(r); }\nvar u = input;\nif (u.indexOf('.m3u8') < 0) {\n    try {\n        var h = request(u);\n        var m = h.match(/\"url\"\\s*:\\s*\"([^\"]+?\\.m3u8[^\"]*)\"/);\n        if (m) { u = m[1].replace(/\\\\\\//g, '/'); }\n    } catch (e) {}\n}\ninput = {\n    parse: 0,\n    url: u,\n    header: { 'User-Agent': 'Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36' },\n    flag: typeof flag !== 'undefined' ? flag : ''\n};"
};
