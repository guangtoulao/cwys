var vm = new Vue({
  el: '#app',
  data: {
    currentView: 'home',
    activeTab: 'shenghuo',
    searchText: '',
    currentSearchEngine: 'baidu',
    showEngineMenu: false,
    showSug: false,
    suggestions: [],
    customCategories: [],
    customLists: {},
    showCategoryMgr: false,
    newCategoryName: '',
    newCategoryIcon: 'folder',
    editingCategoryId: null,
    searchEngines: [
      {key:'baidu',name:'百度',url:'https://www.baidu.com/s?wd='},
      {key:'google',name:'Google',url:'https://www.google.com/search?q='},
      {key:'bing',name:'必应',url:'https://www.bing.com/search?q='}
    ],
    listShengHuo: JSON.parse(JSON.stringify(defaultListShengHuo)),
    listBanGong: JSON.parse(JSON.stringify(defaultListBanGong)),
    apiList: JSON.parse(JSON.stringify(defaultApiList)),
    apiColors: ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FFEAA7','#DDA0DD','#98D8C8','#F7DC6F','#BB8FCE','#F8B500','#7FDBDA','#E8A0BF','#A8E6CF','#FFD93D','#6C5CE7','#00CEC9','#FD79A8','#E17055','#00B894','#FDCB6E'],
    noteText: '',
    todoList: [],
    newTodo: '',
    countdownTitle: '元旦',
    countdownDate: '2027-01-01',
    calYear: new Date().getFullYear(),
    calMonth: new Date().getMonth(),
    currentBgUrl: '',
    currentBgIdx: 0,
    currentBgType: 'image',
    bgLoaded: false,
    customBgUrl: '',
    maskOpacity: 25,
    blurVal: 0,
    bgCategory: 'image',
    bgSubCategory: null,
    bgRandomMode: false,
    bgCategoryList: JSON.parse(JSON.stringify(defaultBgCategoryList)),
    bgLibrary: JSON.parse(JSON.stringify(defaultBgLibrary)),
    openInNewTab: true,
    iconShape: 'rounded',
    iconOpacity: 100,
    iconSize: 56,
    iconGap: 22,
    iconRowGap: 16,
    iconBgColor: '#ffffff',
    winW: window.innerWidth || 1200,
    showSettings: false,
    settingsTab: 'general',
    sidebarExpanded: false,
    showSiteMgr: false,
    mgrTab: 'site',
    mgrShowIcons: true,
    showEditForm: false,
    editTab: 'shenghuo',
    editForm: {name:'', url:'', imgSrc:'', iconUrl:'', iconId:'', bgColor:'', idx:-1},
    /* 自定义图标表单（完整添加功能） */
    customForm: {name:'', url:'', text:'', color:'#ffffff', mode:'text', imgSrc:'', iconId:'', iconUrl:''},
    customIconMode: '',
    showCustomIconPicker: false,
    showCustomSolidIcon: false,
    customIconSearchKey: '',
    customIconSearchResults: [],
    customColors: ['#C41E3A','#E8590C','#F59F00','#94D82D','#2F9E44','#0CA678','#1098AD','#1971C2','#6741D9','#9C36B5','#862E9C','#F06595'],
    /* 组件管理列表 */
    widgetList: [
      {key:'note', name:'便签', icon:''},
      {key:'todo', name:'待办', icon:''},
      {key:'countdown', name:'倒计时', icon:''},
      {key:'calendar', name:'日历', icon:''},
      {key:'weather', name:'天气', icon:''},
      {key:'hot', name:'热搜', icon:''},
      {key:'fish', name:'木鱼', icon:''}
    ],
    showIconPicker: false,
    editIconMode: '',
    iconSearchKey: '',
    iconSearchHost: '',
    iconSearchResults: [],
    siteIconMap: {
      '抖音': 'douyin.com', '淘宝': 'taobao.com', '京东': 'jd.com', '拼多多': 'pinduoduo.com',
      '微信': 'weixin.qq.com', '支付宝': 'alipay.com', '百度': 'baidu.com', '哔哩哔哩': 'bilibili.com',
      'b站': 'bilibili.com', '微博': 'weibo.com', '知乎': 'zhihu.com', '小红书': 'xiaohongshu.com',
      '快手': 'kuaishou.com', '美团': 'meituan.com', '饿了么': 'ele.me', '滴滴': 'didiglobal.com',
      '腾讯': 'qq.com', '网易': '163.com', '新浪': 'sina.com.cn', '搜狐': 'sohu.com',
      '优酷': 'youku.com', '爱奇艺': 'iqiyi.com', '腾讯视频': 'v.qq.com', '芒果tv': 'mgtv.com',
      'qq音乐': 'y.qq.com', '网易云音乐': 'music.163.com', '酷狗': 'kugou.com', '酷我': 'kuwo.cn',
      'qq邮箱': 'mail.qq.com', '163邮箱': 'mail.163.com', 'gmail': 'gmail.com',
      'github': 'github.com', '谷歌': 'google.com', '必应': 'bing.com', '搜狗': 'sogou.com',
      '携程': 'ctrip.com', '飞猪': 'fliggy.com', '去哪儿': 'qunar.com', '同程': 'ly.com',
      '58同城': '58.com', '安居客': 'anjuke.com', '链家': 'lianjia.com', '贝壳': 'ke.com',
      '闲鱼': 'goofish.com', '转转': 'zhuanzhuan.com', '得物': 'dewu.com',
      '唯品会': 'vip.com', '苏宁易购': 'suning.com', '国美': 'gome.com.cn',
      '大众点评': 'dianping.com', '高德': 'amap.com', '百度地图': 'map.baidu.com',
      '飞书': 'feishu.cn', '钉钉': 'dingtalk.com', '企业微信': 'work.weixin.qq.com',
      'wps': 'wps.cn', '金山': 'kingsoft.com', '腾讯文档': 'docs.qq.com',
      '语雀': 'yuque.com', '石墨': 'shimo.im', '印象笔记': 'yinxiang.com',
      '有道': 'youdao.com', '百度翻译': 'fanyi.baidu.com', '腾讯翻译': 'fanyi.qq.com',
      '知网': 'cnki.net', '万方': 'wanfangdata.com.cn', '维普': 'cqvip.com',
      '豆瓣': 'douban.com', '猫途鹰': 'tripadvisor.com', '马蜂窝': 'mafengwo.cn',
      '去哪儿': 'qunar.com', '飞猪': 'fliggy.com', '途牛': 'tuniu.com',
      '汽车之家': 'autohome.com.cn', '懂车帝': 'dongchedi.com', '易车': 'yiche.com',
      '太平洋汽车': 'pcauto.com.cn', '瓜子': 'guazi.com', '优信': 'xin.com',
      '平安': 'pingan.com', '中国人寿': 'china-life.com', '中国人保': 'picc.com.cn',
      '支付宝': 'alipay.com', '云闪付': 'yunshanfu.com', '京东金融': 'jr.jd.com',
      '天天基金': 'fund.eastmoney.com', '雪球': 'xueqiu.com', '东方财富': 'eastmoney.com',
      '同花顺': '10jqka.com.cn', '大智慧': 'gw.com.cn', '富途': 'futunn.com',
      '老虎': 'itiger.com', '雪球': 'xueqiu.com',
      'steam': 'store.steampowered.com', 'epic': 'epicgames.com', 'gog': 'gog.com',
      'origin': 'ea.com', 'uplay': 'ubisoft.com', '战网': 'battle.net',
      '斗鱼': 'douyu.com', '虎牙': 'huya.com', '企鹅电竞': 'egame.qq.com',
      '4399': '4399.com', '7k7k': '7k7k.com', 'taptap': 'taptap.cn',
      'nga': 'nga.cn', '贴吧': 'tieba.baidu.com', '虎扑': 'hupu.com',
      '什么值得买': 'smzdm.com', '中关村': 'zol.com.cn', '太平洋': 'pconline.com.cn',
      'it之家': 'ithome.com', '36氪': '36kr.com', '虎嗅': 'huxiu.com',
      '澎湃新闻': 'thepaper.cn', '界面': 'jiemian.com', '钛媒体': 'tmtpost.com',
      '观察者': 'guancha.cn', '环球时报': 'huanqiu.com', '参考消息': 'cankaoxiaoxi.com',
      '新华社': 'xinhuanet.com', '央视': 'cctv.com', '人民网': 'people.com.cn',
      '新华网': 'xinhuanet.com', '光明网': 'gmw.cn', '中国日报': 'chinadaily.com.cn',
      '环球时报': 'huanqiu.com', '环球网': 'huanqiu.com',
      '华尔街见闻': 'wallstreetcn.com', '财新': 'caixin.com', '第一财经': 'yicai.com',
      '凤凰': 'ifeng.com', '网易新闻': 'news.163.com', '腾讯新闻': 'news.qq.com',
      '今日头条': 'toutiao.com', '百家号': 'baijiahao.baidu.com', '企鹅号': 'om.qq.com',
      '大鱼号': 'mp.dayu.com', '新浪看点': 'k.sina.com.cn', '新浪看点': 'k.sina.com.cn',
    },
    solidIconColor: '#5D6FFB',
    solidIconText: '',
    showSolidIcon: false,
    dockItems: [],
    widgetVisible: {note:false, todo:false, countdown:true, calendar:true, weather:true, hot:true, fish:true},
    widgetOrder: ['weather','calendar','countdown','hot','fish','note','todo'],
    widgetDragIdx: null,
    dragType: null,
    widgetOrderOverride: {},
    iconOrderOverride: {},
    unifiedDragIdx: -1,
    unifiedOrders: {},
    unifiedOrdersVersion: 0,
    widgetNames: {note:'笔记',todo:'待办事项',countdown:'倒计时',calendar:'日历',weather:'天气',hot:'热搜榜',fish:'木鱼'},
    widgetEmoji: {note:'',todo:'',countdown:'',calendar:'',weather:'🌤',hot:'',fish:''},
    currentTime: '',
    currentDateFull: '',
    currentDateShort: '',
    currentLunar: '',
    dailyBlessing: '',
    weatherIcon: '☀️',
    weatherTemp: '--',
    weatherDesc: '晴',
    weatherCity: '北京',
    weatherBgColor: 'rgba(255,200,50,.15)',
    weatherHumidity: '',
    weatherMinTemp: '',
    weatherMaxTemp: '',
    weatherAQI: '优/20',
    weatherIconImg: 'data:image/webp;base64,UklGRvYEAABXRUJQVlA4WAoAAAAQAAAAbwAAbwAAQUxQSLIBAAAB16Cwbds2le5dKSIiVEkkTGM6Z99zvkIiAZZkW3EbwDhYnp1I5N27/53KYXjv+TcV0f8JCP+Pj1+3+1pJsn6/rl/JuXxd2b3ekluxfHPwWnxahBNr8SdXTq7Zl3ijwmt0JFWqrMmNLFQq2YlCxcWFQtXFgUzl2VwSbZKMxUr1W7R1o8GrqUyT2VK1sRkqNLrYqVYkWik0W6z82PnWFvPtVYWms6p8E9q/KMrfdHFVE2/0MipJlX7K+lgO0w5C82h4u5U05SB0eLtMSJVuooXc0qhYaRUDSKCBchx0o0mwHW/A/jIk0ToATiwjfmyBe7SB2AEgKanvQM3oAEliN3Xte6hqBUgS1HjpEgPgHtQqsSNTO0gSACfjD5C8dJw1YUeAKkHs9rXjpYkANeJNe27bFIFmlzZRZPjZRq/xBiTA6h6wAwgQBEUdlAEkQBL8W52DbfIJftvqJ9janp/g2bZ8gqUt4wMc2sLm3xY6z/6deqJ4t6WecPbuHPpX37YwMIlnkkaEk2fHMPbk1ymMPopPcgrjU/VoTWHqpXojlzA7naon9RKDxsPyXMWe1OeSw3+kAVZQOCAeAwAAEBkAnQEqcABwAD5RJI1EI6KhFt1VSDgFBLOWwAVZcOq8F3q413H97zhX9mx1OGweAN8A9AD+S+Td+9/cz7LPxn+P/9D3A/4z/Pf+F/b/YA9UH6k+wB+qpdWsVR9yWq9zykvMcF/EfQrbsKZVgWUHrsrmR9zHaFX2ztBJEOoRUUA5xTokZBv/2x+nECxK8lsli7ZdDHfQ+qyj3/I0VG+0R1KidnQXBNjzYHGnFphY3Tjk2fMwKxZiUNok3Muhn516cjf/DjaVfCH9jgpbd7pP+sAA/v02aAADbOXMT9xeBa0EwUC/Y/uQCxfJPAtBZIAHkKKrReZe4fmfRC5Tvqj09G8Ne1ANHPSoybqhragq96AlxE8eIJXlOANR2rNJ9DKwaSINsVneLtrpyV5jp98Q1HZntpYMRNU1f8Gvq/N1RNo0bU/pr/R/OBAHDd/vjfCjbt9Y8C0FkgAeQor8w//9/Ql8iyEg/Ydm5tue8n1JK47g4ERBQO7XJFCLWezU2NRoIUqzoBtiMc3lSSHEy8x3zoSYLSQhRvbZpHZvLMZnWwLwOMddvCpnN/9eyOWYLh+FS3J7sguouNi8EXvkrxZ1a40C76pyH6Xc//pAxvM67xzY4fQ4WN4k7yIbWReqo+65y7qRHZD/XRd0q7OXT/1B8nAim5xTDWILDx9GvrTnRFL/GRJGuucaCKYnKWBFc3Ho2ZKFP5fgmXBvtlVwJcnfckV//sUBeGy7KbfmrS2cnsw0ZpmUVxDE99Y88G7N0qXWhPP+gkMaZjZ8pv91ha3YSDHxVoYdYenPFwu5gzO/iTkmWGLq5VKhiwkVFJwyZNt0emnNyrw/fYjbk2mFRGke36tnDxWu63Cv6PTFx9b+Eq5BOq0+DI5bP2MPZ6YvIjh648i7LQ8y897QyLoJ9rcyQjl4zIdgCDhpg8sJZDeaOQ9keKAxJtONSN9t3o1f1kpLWVVIigWV31h+kbw6B5lVWE03FuipuIo990nwDQEh1oAtjPuO2HWfR7ITD8BIuybvscDBak+eTp/3A2qrvZeVr2E4V4tRwpK+GEMAAAAA',
    hotList: JSON.parse(JSON.stringify(defaultHotList)),
    fishCount: 0,
    fishImgSrc: 'img/muyu.png',
    fishSoundEnabled: true,
    fishTapping: false,
    fishFloating: false,
    fishFloatX: 0,
    fishFloatY: 0,
    toastMsg: '',
    toastKey: 0,
    dragIdx: -1,
    folderItemDragIdx: -1,
    /* 文件夹功能 */
    folderView: null,
    showFolderDialog: false,
    folderDialogMode: 'create',
    folderName: '',
    editingFolderIdx: -1,
    searchSiteMatches: [],
    searchHotSuggs: [],
    scrollFlipEnabled: true,
    scrollFlipSensitivity: 50,
    catFlipAccum: 0,
    _lastCatFlipTime: 0,
    _catAccumTimer: null,
    timeInt: null,
    /* ===== 跨设备同步（Cloudflare Worker，全自动共享） ===== */
    cloudToken: 'cwys-shared',
    cloudSyncStatus: 'idle',
    cloudSyncTime: localStorage.getItem('cwys_cloud_sync_time') || '',
    cloudAutoSync: true,
    _syncTimer: null,
    _cloudSyncReady: false,
    /* ===== 登录系统 ===== */
    isLoggedIn: !!localStorage.getItem('cwys_session_token'),
    sessionToken: localStorage.getItem('cwys_session_token') || '',
    showLoginModal: false,
    loginPassword: '',
    loginError: '',
    loginLoading: false
  },

  watch: {
    activeTab: function() { this.folderView = null; },
    currentView: function() { this.folderView = null; }
  },

  computed: {
    searchEngineName: function() {
      var self = this;
      var e = this.searchEngines.find(function(s) { return s.key === self.currentSearchEngine; });
      return e ? e.name : '百度';
    },
    allCategories: function() {
      var builtIn = [{id:'shenghuo',name:'生活',iconId:'home'},{id:'bangong',name:'办公',iconId:'briefcase'}];
      var custom = this.customCategories.map(function(c) {
        return {id: c.id, name: c.name, iconId: c.iconId || c.icon || 'folder'};
      });
      return builtIn.concat(custom);
    },
    activeCategoryList: function() {
      if (this.activeTab === 'shenghuo') return this.listShengHuo;
      if (this.activeTab === 'bangong') return this.listBanGong;
      return this.customLists[this.activeTab] || [];
    },
    hasVisibleWidgets: function() {
      var self = this;
      return Object.keys(this.widgetVisible).some(function(k) { return self.widgetVisible[k]; });
    },
    /* ===== 统一卡片列表（组件+图标合并） ===== */
    unifiedCards: function() {
      this.unifiedOrdersVersion; /* 访问版本号，确保拖拽后重新计算 */
      var cards = [];
      var self = this;
      /* 构建可用项映射 */
      var available = {};
      /* 添加组件（所有板块都显示） */
      this.widgetOrder.forEach(function(name) {
        if (self.widgetVisible[name]) {
          available['w:' + name] = { type: 'widget', name: name, key: 'w:' + name, size: 2 };
        }
      });
      /* 添加图标（使用 name|url 作为内容键，重复时附加序号） */
      var iconKeyCount = {};
      this.activeCategoryList.forEach(function(item, idx) {
        var baseKey = 'i:' + (item.name || '') + '|' + (item.url || '');
        var key = baseKey;
        var cnt = iconKeyCount[baseKey] || 0;
        if (cnt > 0) key = baseKey + '#' + cnt;
        iconKeyCount[baseKey] = cnt + 1;
        available[key] = {
          type: item.type === 'folder' ? 'folder' : 'icon',
          idx: idx,
          key: key,
          size: item.type === 'folder' ? 2 : 1
        };
      });
      /* 按保存的顺序排列 */
      var savedOrder = this.unifiedOrders[this.activeTab] || [];
      var used = {};
      savedOrder.forEach(function(key) {
        if (available[key] && !used[key]) {
          cards.push(available[key]);
          used[key] = true;
        }
      });
      /* 添加未在保存顺序中的新项 */
      Object.keys(available).forEach(function(key) {
        if (!used[key]) cards.push(available[key]);
      });
      return cards;
    },
    /* ===== 卡片位置计算 ===== */
    cardLayout: function() {
      var cellW = this.iconSize + 44;
      var cellH = this.iconSize + 34;
      var gapX = this.iconGap;
      var gapY = this.iconRowGap;
      var maxW = 900;
      /* 手机端侧边栏在底部，不减92px左边距；桌面端才减 */
      var isMobile = this.winW <= 768;
      var sidebarOffset = isMobile ? 0 : 92;
      var padding = isMobile ? 24 : 80;
      var availW = Math.max(cellW + gapX, this.winW - sidebarOffset - padding);
      var containerW = Math.min(maxW, availW);
      var colStep = cellW + gapX;
      var rowStep = cellH + gapY;
      var cols = Math.max(1, Math.floor((containerW + gapX) / colStep));
      var cards = this.unifiedCards;
      /* 始终分离排列：组件先排列，图标从新行开始 */
      var widgetIdxs = [];
      var iconIdxs = [];
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].type === 'widget') widgetIdxs.push(i);
        else iconIdxs.push(i);
      }
      var occupied = {};
      var positions = new Array(cards.length);
      var maxRow = 0;
      /* === 排列组件（按拖拽顺序，bin-packing） === */
      for (var wi = 0; wi < widgetIdxs.length; wi++) {
        var idx = widgetIdxs[wi];
        var card = cards[idx];
        var w = card.size, h = card.size;
        var found = false;
        for (var r = 0; r <= maxRow + 2 && !found; r++) {
          for (var c = 0; c <= cols - w && !found; c++) {
            var ok = true;
            for (var dc = 0; dc < w && ok; dc++) {
              for (var dr = 0; dr < h && ok; dr++) {
                if (occupied[(c + dc) + ',' + (r + dr)]) ok = false;
              }
            }
            if (ok) {
              positions[idx] = { x: c * colStep, y: r * rowStep, w: w, h: h };
              for (var dc2 = 0; dc2 < w; dc2++) {
                for (var dr2 = 0; dr2 < h; dr2++) {
                  occupied[(c + dc2) + ',' + (r + dr2)] = true;
                }
              }
              maxRow = Math.max(maxRow, r + h - 1);
              found = true;
            }
          }
        }
        if (!found) {
          positions[idx] = { x: 0, y: (maxRow + 1) * rowStep, w: w, h: h };
          maxRow = maxRow + h;
        }
      }
      /* === 排列图标（从新行开始，按拖拽顺序） === */
      var iconStartRow = widgetIdxs.length > 0 ? maxRow + 1 : 0;
      var iconOccupied = {};
      var iconMaxRelRow = 0;
      for (var ii = 0; ii < iconIdxs.length; ii++) {
        var idx = iconIdxs[ii];
        var card = cards[idx];
        var w = card.size, h = card.size;
        var found = false;
        for (var r = 0; r <= iconMaxRelRow + 2 && !found; r++) {
          for (var c = 0; c <= cols - w && !found; c++) {
            var ok = true;
            for (var dc = 0; dc < w && ok; dc++) {
              for (var dr = 0; dr < h && ok; dr++) {
                if (iconOccupied[(c + dc) + ',' + (r + dr)]) ok = false;
              }
            }
            if (ok) {
              positions[idx] = { x: c * colStep, y: (r + iconStartRow) * rowStep, w: w, h: h };
              for (var dc2 = 0; dc2 < w; dc2++) {
                for (var dr2 = 0; dr2 < h; dr2++) {
                  iconOccupied[(c + dc2) + ',' + (r + dr2)] = true;
                }
              }
              iconMaxRelRow = Math.max(iconMaxRelRow, r + h - 1);
              found = true;
            }
          }
        }
        if (!found) {
          positions[idx] = { x: 0, y: (iconMaxRelRow + 1 + iconStartRow) * rowStep, w: w, h: h };
          iconMaxRelRow = iconMaxRelRow + h;
        }
      }
      maxRow = Math.max(maxRow, iconStartRow + iconMaxRelRow);
      /* 为"添加图标"按钮预留末尾位置 */
      var addIdx = cards.length;
      var addPlaced = false;
      for (var r2 = 0; r2 <= iconMaxRelRow + 2 && !addPlaced; r2++) {
        for (var c2 = 0; c2 <= cols - 1 && !addPlaced; c2++) {
          if (!iconOccupied[c2 + ',' + (r2)]) {
            positions[addIdx] = { x: c2 * colStep, y: (r2 + iconStartRow) * rowStep, w: 1, h: 1 };
            iconOccupied[c2 + ',' + r2] = true;
            maxRow = Math.max(maxRow, iconStartRow + r2);
            addPlaced = true;
          }
        }
      }
      if (!addPlaced) {
        positions[addIdx] = { x: 0, y: (iconMaxRelRow + 1 + iconStartRow) * rowStep, w: 1, h: 1 };
        maxRow = Math.max(maxRow, iconStartRow + iconMaxRelRow + 1);
      }
      /* 居中偏移 */
      var actualW = cols * colStep - gapX;
      var offsetX = Math.max(0, (containerW - actualW) / 2);
      if (offsetX > 0) {
        positions.forEach(function(p) { if (p) p.x += offsetX; });
      }
      return { positions: positions, height: Math.max((maxRow + 1) * rowStep - gapY, rowStep), containerW: containerW };
    },
    gridHeight: function() {
      var h = this.cardLayout.height;
      /* 文件夹展开时，增加高度以容纳展开内容 */
      if (this.folderView !== null) {
        var folder = this.activeCategoryList[this.folderView];
        if (folder && folder.type === 'folder') {
          var children = folder.children || [];
          var childCount = children.length;
          /* 估算展开内容高度：header(50) + padding(52) + 每行高度(iconSize+50) */
          var cols = Math.max(1, Math.floor(820 / (this.iconSize + 46)));
          var rows = Math.max(1, Math.ceil((childCount + 1) / cols));
          var expandH = 50 + 52 + rows * (this.iconSize + 50);
          h = Math.max(h, expandH + 100);
        }
      }
      return h;
    },
    addIconStyle: function() {
      var pos = this.cardLayout.positions[this.unifiedCards.length];
      if (!pos) return { display: 'none' };
      var cellW = this.iconSize + 24;
      var cellH = this.iconSize + 34;
      return {
        transform: 'translate(' + pos.x + 'px,' + pos.y + 'px)',
        width: cellW + 'px',
        height: cellH + 'px'
      };
    },
    folderContentList: function() {
      if (this.folderView === null) return [];
      var item = this.activeCategoryList[this.folderView];
      if (!item || item.type !== 'folder') return [];
      return item.children || [];
    },
    iconList: function() {
      return [
        {id:'home',name:'主页'},{id:'briefcase',name:'办公'},{id:'film',name:'影视'},
        {id:'star',name:'收藏'},{id:'heart',name:'喜欢'},{id:'music',name:'音乐'},
        {id:'camera',name:'相机'},{id:'globe',name:'全球'},{id:'book',name:'书籍'},
        {id:'coffee',name:'咖啡'},{id:'shopping-bag',name:'购物'},{id:'grid',name:'网格'},
        {id:'smile',name:'微笑'},{id:'zap',name:'闪电'},{id:'image',name:'图片'},
        {id:'map-pin',name:'位置'},{id:'pen-tool',name:'工具'},{id:'search',name:'搜索'},
        {id:'folder',name:'文件夹'},{id:'gamepad',name:'游戏'},{id:'airplane',name:'飞机'},
        {id:'car',name:'汽车'},{id:'monitor',name:'电脑'},{id:'dollar',name:'金钱'},
        {id:'cloud',name:'云'},{id:'bell',name:'通知'},{id:'phone',name:'电话'},
        {id:'mail',name:'邮件'},{id:'sun',name:'太阳'},{id:'tv',name:'电视'},
        {id:'code',name:'代码'},{id:'watch',name:'手表'},{id:'umbrella',name:'雨伞'},
        {id:'video',name:'视频'},{id:'calendar',name:'日历'},{id:'clock',name:'时钟'},
        {id:'award',name:'奖章'},{id:'bar-chart',name:'图表'},{id:'box',name:'盒子'},
        {id:'cpu',name:'芯片'},{id:'disc',name:'唱片'},{id:'eye',name:'眼睛'},
        {id:'file',name:'文件'},{id:'flag',name:'旗帜'},{id:'headphones',name:'耳机'},
        {id:'inbox',name:'收件箱'},{id:'layers',name:'图层'},{id:'link',name:'链接'},
        {id:'list',name:'列表'},{id:'lock',name:'锁'},{id:'map',name:'地图'},
        {id:'mic',name:'麦克风'},{id:'moon',name:'月亮'},{id:'paperclip',name:'回形针'},
        {id:'pie-chart',name:'饼图'},{id:'play',name:'播放'},{id:'printer',name:'打印'},
        {id:'save',name:'保存'},{id:'share',name:'分享'},{id:'shield',name:'盾牌'},
        {id:'shopping-cart',name:'购物车'},{id:'speaker',name:'扬声器'},{id:'tag',name:'标签'},
        {id:'target',name:'目标'},{id:'terminal',name:'终端'},{id:'thumbs-up',name:'赞'},
        {id:'tool',name:'工具'},{id:'trash',name:'删除'},{id:'trending-up',name:'上升'},
        {id:'truck',name:'卡车'},{id:'upload',name:'上传'},{id:'user',name:'用户'},
        {id:'users',name:'用户组'},{id:'volume',name:'音量'},{id:'wifi',name:'WiFi'}
      ];
    },
    catIconList: function() {
      return [
        {id:'folder',name:'文件夹'},{id:'book',name:'书籍'},{id:'gamepad',name:'游戏'},
        {id:'music',name:'音乐'},{id:'film',name:'影视'},{id:'coffee',name:'咖啡'},
        {id:'shopping-bag',name:'购物'},{id:'monitor',name:'电脑'},{id:'tool',name:'工具'},
        {id:'pen-tool',name:'画笔'},{id:'home',name:'主页'},{id:'airplane',name:'飞机'},
        {id:'dollar',name:'金钱'},{id:'hospital',name:'医院'},{id:'car',name:'汽车'},
        {id:'clipboard',name:'报纸'}
      ];
    },
    /* 滚动切换用的完整板块列表（含影视接口） */
    flipSections: function() {
      var list = [];
      var cats = this.allCategories;
      for (var i = 0; i < cats.length; i++) {
        list.push({id:cats[i].id, name:cats[i].name, icon:cats[i].icon, isApi:false});
      }
      list.push({id:'__api__',name:'影视接口',icon:'📋',isApi:true});
      return list;
    },
    /* 当前板块在 flipSections 中的索引 */
    catFlipIndex: function() {
      var sections = this.flipSections;
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].isApi && this.currentView === 'api') return i;
        if (!sections[i].isApi && this.currentView === 'home' && sections[i].id === this.activeTab) return i;
      }
      return 0;
    },
    /* 当前壁纸分类下的图片列表 */
    currentCategoryBgs: function() {
      if (!this.bgSubCategory) return [];
      var catId = this.bgSubCategory;
      var result = [];
      this.bgLibrary.forEach(function(bg, i) {
        if (bg.type === 'image' && bg.cat === catId) {
          result.push({idx: i, name: bg.name, url: bg.url});
        }
      });
      return result;
    },
    /* 当前壁纸分类名称 */
    currentBgCategoryName: function() {
      if (!this.bgSubCategory) return '';
      var cat = this.bgCategoryList.find(function(c) { return c.id === this.bgSubCategory; }.bind(this));
      return cat ? cat.name : '';
    },
    editCategoryList: function() {
      if (this.editTab === 'shenghuo') return this.listShengHuo;
      if (this.editTab === 'bangong') return this.listBanGong;
      return this.customLists[this.editTab] || [];
    },
    countdownDays: function() {
      if (!this.countdownDate) return 0;
      var d = new Date(this.countdownDate) - new Date();
      return Math.max(0, Math.ceil(d / 86400000));
    },
    calDays: function() {
      var y = this.calYear, m = this.calMonth;
      var first = new Date(y, m, 1).getDay();
      var daysInMonth = new Date(y, m + 1, 0).getDate();
      var prevDays = new Date(y, m, 0).getDate();
      var arr = [];
      for (var i = first - 1; i >= 0; i--) {
        arr.push({num: prevDays - i, key: 'p' + i, curMonth: false, isToday: false});
      }
      var today = new Date();
      for (var i = 1; i <= daysInMonth; i++) {
        arr.push({num: i, key: 'c' + i, curMonth: true, isToday: i === today.getDate() && m === today.getMonth() && y === today.getFullYear()});
      }
      var next = 42 - arr.length;
      for (var i = 1; i <= next; i++) {
        arr.push({num: i, key: 'n' + i, curMonth: false, isToday: false});
      }
      return arr;
    }
  },

  methods: {
    /* ===== 工具方法 ===== */
    showToast: function(msg) { var self=this; this.toastMsg = msg; this.toastKey++; clearTimeout(this._toastTimer); this._toastTimer=setTimeout(function(){self.toastMsg=''},2000) },
    globalClick: function() { this.showEngineMenu = false; this.showSug = false; },
    getFaviconUrl: function(url) {
      try {
        var u = new URL(url);
        var host = u.hostname;
        return 'https://' + host + '/favicon.ico';
      } catch (e) { return ''; }
    },
    getFaviconSources: function(host) {
      return [
        'https://' + host + '/favicon.ico',
        'https://www.' + host + '/favicon.ico',
        'https://favicon.im/' + host + '?defaulticon=lightpng&size=128',
        'https://www.google.com/s2/favicons?domain=' + host + '&sz=128',
        'https://icons.duckduckgo.com/ip3/' + host + '.ico',
      ];
    },
    addFavicons: function(list) {
      var self = this;
      list.forEach(function(item) {
        /* 有自定义图片或阿里图标的，不需要自动获取favicon */
        if (!item.imgSrc && !item.iconId && !item.faviconUrl) {
          self.$set(item, 'faviconUrl', self.getFaviconUrl(item.url));
        }
        if (!item.iconErr) item.iconErr = false;
      });
    },
    onIconErr: function(item) {
      /* 第一次失败：尝试favicon.cc备用源 */
      if (!item._faviconTried) {
        item._faviconTried = true;
        try {
          var u = new URL(item.url);
          this.$set(item, 'faviconUrl', 'https://favicon.cc/' + u.hostname);
          this.$set(item, 'iconErr', false);
        } catch(e) { this.$set(item,'iconErr',true); }
      } else {
        /* 第二次也失败：标记错误，降级显示字母图标 */
        this.$set(item, 'iconErr', true);
      }
    },
    getIconColor: function(idx) {
      var colors = ['linear-gradient(135deg,#667eea 0%,#764ba2 100%)','linear-gradient(135deg,#f093fb 0%,#f5576c 100%)','linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)','linear-gradient(135deg,#43e97b 0%,#38f9d7 100%)','linear-gradient(135deg,#fa709a 0%,#fee140 100%)','linear-gradient(135deg,#30cfd0 0%,#330867 100%)','linear-gradient(135deg,#a8edea 0%,#fed6e3 100%)','linear-gradient(135deg,#ff9a9e 0%,#fecfef 100%)','linear-gradient(135deg,#ffecd2 0%,#fcb69f 100%)','linear-gradient(135deg,#667eea 0%,#764ba2 100%)','linear-gradient(135deg,#f093fb 0%,#f5576c 100%)','linear-gradient(135deg,#4facfe 0%,#00f2fe 100%)'];
      return colors[idx % colors.length];
    },

    /* ===== 视图切换 ===== */
    switchView: function(view) { this.currentView = view; },

    /* ===== 搜索 ===== */
    doSearch: function() {
      if (!this.searchText.trim()) return;
      var self = this;
      var eng = this.searchEngines.find(function(s) { return s.key === self.currentSearchEngine; });
      this.showSug = false;
      var text = this.searchText.trim();
      if (/^(https?:\/\/|www\.)/.test(text)) {
        var url = text.indexOf('://') === -1 ? 'https://' + text : text;
        this.openUrl(url);
        return;
      }
      window.open(eng.url + encodeURIComponent(text), '_blank');
    },
    onSearchInput: function() {
      var self = this;
      var kw = self.searchText.trim().toLowerCase();
      if (kw.length === 0) {
        this.searchSiteMatches = [];
        this.searchHotSuggs = [];
        return;
      }
      /* 搜索所有分类下的网站图标 */
      var siteMatches = [];
      var seen = {};
      var allLists = [self.listShengHuo, self.listBanGong];
      for (var key in self.customLists) {
        allLists.push(self.customLists[key]);
      }
      for (var c = 0; c < allLists.length; c++) {
        var list = allLists[c];
        for (var i = 0; i < list.length; i++) {
          var name = list[i].name || '';
          var url = list[i].url || '';
          if (seen[name]) continue;
          if (name.toLowerCase().indexOf(kw) !== -1 || url.toLowerCase().indexOf(kw) !== -1) {
            seen[name] = true;
            siteMatches.push(list[i]);
            if (siteMatches.length >= 8) break;
          }
        }
        if (siteMatches.length >= 8) break;
      }
      self.searchSiteMatches = siteMatches;
      /* 热搜关键词 */
      self.searchHotSuggs = defaultHotList.slice(0, 6).filter(function(h) {
        return h.text.toLowerCase().indexOf(kw) !== -1;
      });
    },

    /* ===== 打开网址 ===== */
    openUrl: function(url) {
      if (!url) return;
      if (this.openInNewTab) window.open(url, '_blank');
      else window.location.href = url;
    },

    /* ===== 时钟 ===== */
    updateTime: function() {
      var d = new Date();
      var h = String(d.getHours()).padStart(2, '0');
      var m = String(d.getMinutes()).padStart(2, '0');
      this.currentTime = h + ':' + m;
      var days = ['日', '一', '二', '三', '四', '五', '六'];
      this.currentDateFull = d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 星期' + days[d.getDay()];
      this.currentDateShort = (d.getMonth() + 1) + '/' + d.getDate();
      this.currentLunar = this.getLunar(d);
      this.dailyBlessing = '今日大吉';
    },
    getLunar: function(d) {
      var months = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
      return months[d.getMonth()] + '月' + d.getDate() + '日';
    },

    /* ===== 笔记/待办 ===== */
    saveNote: function() { localStorage.setItem('wetab_note', this.noteText); this.scheduleCloudSync(); },
    tapFish: function(e) {
      this.fishCount++;
      localStorage.setItem('wetab_fish', this.fishCount);
      this.fishTapping = true;
      var self = this;
      setTimeout(function() { self.fishTapping = false; }, 120);
      /* 飘字 */
      var rect = e.currentTarget.getBoundingClientRect();
      this.fishFloatX = e.clientX - rect.left - 20;
      this.fishFloatY = e.clientY - rect.top - 20;
      this.fishFloating = true;
      setTimeout(function() { self.fishFloating = false; }, 800);
      /* 声音 - 内联base64 mp3 + Web Audio兜底 */
      if (this.fishSoundEnabled) {
        var self2 = this;
        var mp3Ok = false;
        try {
          if (!this._fishAudio) {
            this._fishAudio = new Audio('data:audio/mpeg;base64,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');
            this._fishAudio.volume = 0.8;
          }
          this._fishAudio.currentTime = 0;
          this._fishAudio.play().then(function() { mp3Ok = true; }).catch(function(){});
        } catch(e) {}
        /* Web Audio 兜底 */
        if (!mp3Ok) {
          setTimeout(function() {
            if (mp3Ok) return;
            try {
              if (!self2._fishAudioCtx) {
                self2._fishAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
              }
              var ctx = self2._fishAudioCtx;
              if (ctx.state === 'suspended') ctx.resume();
              var t = ctx.currentTime;
              var master = ctx.createGain();
              master.gain.setValueAtTime(0.8, t);
              master.connect(ctx.destination);
              var bufLen = Math.floor(ctx.sampleRate * 0.015);
              var noiseBuf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
              var noiseData = noiseBuf.getChannelData(0);
              for (var i = 0; i < bufLen; i++) {
                noiseData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.15));
              }
              var noiseSrc = ctx.createBufferSource();
              noiseSrc.buffer = noiseBuf;
              var noiseGain = ctx.createGain();
              noiseGain.gain.setValueAtTime(0.25, t);
              noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.015);
              var noiseFilter = ctx.createBiquadFilter();
              noiseFilter.type = 'bandpass';
              noiseFilter.frequency.value = 800;
              noiseFilter.Q.value = 1.5;
              noiseSrc.connect(noiseFilter);
              noiseFilter.connect(noiseGain);
              noiseGain.connect(master);
              noiseSrc.start(t);
              var osc = ctx.createOscillator();
              var oscGain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(160, t);
              osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
              oscGain.gain.setValueAtTime(0.6, t);
              oscGain.gain.setValueAtTime(0.6, t + 0.005);
              oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
              osc.connect(oscGain);
              oscGain.connect(master);
              osc.start(t);
              osc.stop(t + 0.15);
              var osc2 = ctx.createOscillator();
              var osc2Gain = ctx.createGain();
              osc2.type = 'sine';
              osc2.frequency.setValueAtTime(520, t);
              osc2.frequency.exponentialRampToValueAtTime(200, t + 0.06);
              osc2Gain.gain.setValueAtTime(0.12, t);
              osc2Gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
              osc2.connect(osc2Gain);
              osc2Gain.connect(master);
              osc2.start(t);
              osc2.stop(t + 0.06);
            } catch(err) {}
          }, 50);
        }
      }
    },
    addTodo: function() {
      if (!this.newTodo.trim()) return;
      this.todoList.push({text: this.newTodo.trim(), done: false});
      this.newTodo = '';
      this.saveTodo();
    },
    toggleTodo: function(idx) {
      this.todoList[idx].done = !this.todoList[idx].done;
      this.saveTodo();
    },
    saveTodo: function() { localStorage.setItem('wetab_todo', JSON.stringify(this.todoList)); this.scheduleCloudSync(); },

    /* ===== 日历 ===== */
    calPrev: function() {
      if (this.calMonth === 0) { this.calMonth = 11; this.calYear--; }
      else { this.calMonth--; }
    },
    calNext: function() {
      if (this.calMonth === 11) { this.calMonth = 0; this.calYear++; }
      else { this.calMonth++; }
    },

    /* ===== 背景 ===== */
    enterBgCategory: function(catId) {
      this.bgSubCategory = catId;
      this.bgRandomMode = false;
    },
    toggleBgRandom: function() {
      if (this.bgRandomMode) {
        /* 随机模式开启，从当前分类随机选一张 */
        var bgs = this.currentCategoryBgs;
        if (bgs.length > 0) {
          var pick = bgs[Math.floor(Math.random() * bgs.length)];
          this.selectBg(pick.idx);
        }
      }
    },
    preloadBg: function(url) {
      var self = this;
      var img = new Image();
      img.onload = function() { self.bgLoaded = true; };
      img.onerror = function() { self.bgLoaded = true; };
      img.src = url;
    },
    selectBg: function(idx) {
      this.bgLoaded = false;
      this.currentBgIdx = idx;
      var bg = this.bgLibrary[idx];
      this.bgCategory = bg.type;
      if (bg.type === 'video') {
        this.currentBgType = 'video';
        this.currentBgUrl = bg.url;
        var self = this;
        setTimeout(function(){ if(!self.bgLoaded) self.bgLoaded = true; }, 5000);
      } else if (bg.type === 'css') {
        this.currentBgType = 'css';
        this.currentBgUrl = '';
        this.bgLoaded = true;
      } else {
        this.currentBgType = 'image';
        this.currentBgUrl = bg.url;
        this.preloadBg(bg.url);
      }
      this.saveSettings();
    },
    applyCustomBg: function() {
      if (!this.customBgUrl.trim()) return;
      this.bgLoaded = false;
      this.currentBgUrl = this.customBgUrl.trim();
      this.currentBgIdx = -1;
      this.currentBgType = 'image';
      this.bgCategory = 'custom';
      this.preloadBg(this.currentBgUrl);
      this.saveSettings();
    },
    /* ===== 设置 ===== */
    saveSettings: function() {
      var s = {
        bgUrl: this.currentBgUrl, bgIdx: this.currentBgIdx, bgType: this.currentBgType,
        mask: this.maskOpacity, blur: this.blurVal,
        iconShape: this.iconShape, iconOpacity: this.iconOpacity, iconSize: this.iconSize, iconGap: this.iconGap, iconRowGap: this.iconRowGap, iconBgColor: this.iconBgColor, openInNewTab: this.openInNewTab,
        scrollFlipEnabled: this.scrollFlipEnabled, scrollFlipSensitivity: this.scrollFlipSensitivity
      };
      localStorage.setItem('wetab_settings', JSON.stringify(s));
      this.scheduleCloudSync();
    },
    loadSettings: function() {
      var s = localStorage.getItem('wetab_settings');
      if (s) {
        try {
          var j = JSON.parse(s);
          if (j.bgIdx !== undefined && j.bgIdx >= 0 && j.bgIdx < this.bgLibrary.length) {
            var bg = this.bgLibrary[j.bgIdx];
            this.currentBgIdx = j.bgIdx;
            this.bgCategory = bg.type;
            if (bg.type === 'video') {
              this.currentBgType = 'video'; this.currentBgUrl = bg.url;
            } else if (bg.type === 'css') {
              this.currentBgType = 'css'; this.currentBgUrl = ''; this.bgLoaded = true;
            } else {
              this.currentBgUrl = bg.url; this.currentBgType = 'image';
            }
          } else if (j.bgUrl && j.bgUrl.indexOf('mixkit') === -1) {
            this.currentBgUrl = j.bgUrl;
            this.currentBgType = j.bgUrl.match(/\.mp4|\.webm|\.mov/i) ? 'video' : 'image';
            this.bgCategory = 'custom';
          }
          if (j.mask !== undefined) this.maskOpacity = j.mask;
          if (j.blur !== undefined) this.blurVal = j.blur;
          if (j.iconShape) this.iconShape = j.iconShape;
          if (j.iconOpacity) this.iconOpacity = j.iconOpacity;
          if (j.iconSize) this.iconSize = j.iconSize;
          if (j.iconGap !== undefined) this.iconGap = j.iconGap;
          if (j.iconRowGap !== undefined) this.iconRowGap = j.iconRowGap;
          if (j.iconBgColor) this.iconBgColor = j.iconBgColor;
          if (j.openInNewTab !== undefined) this.openInNewTab = j.openInNewTab;
          if (j.scrollFlipEnabled !== undefined) this.scrollFlipEnabled = j.scrollFlipEnabled;
          if (j.scrollFlipSensitivity !== undefined) this.scrollFlipSensitivity = j.scrollFlipSensitivity;
        } catch (e) {}
      }
      /* 首次打开或壁纸未初始化时，自动选中第一张静态壁纸 */
       if (!this.currentBgUrl || this.bgLibrary[this.currentBgIdx] && this.bgLibrary[this.currentBgIdx].type === 'css') {
         this.selectBg(0);
       } else if (this.currentBgType === 'image' && this.currentBgUrl) {
         /* 如果预加载脚本已标记缓存命中，直接显示，避免闪烁 */
         if (window.__bgReady) { this.bgLoaded = true; }
         else { this.preloadBg(this.currentBgUrl); }
       }
    },

    /* ===== 跨设备云同步 ===== */
    /* 收集所有本地数据 */
    collectAllData: function() {
      var keys = [
        'wetab_settings','wetab_note','wetab_todo','wetab_countdown','wetab_widgets',
        'wetab_widget_order','wetab_widget_order_override','wetab_icon_order_override',
        'wetab_dock','wetab_fish','wetab_data_version',
        'listShengHuo','listBanGong','wetab_custom_categories','wetab_custom_lists'
      ];
      /* 收集自定义分类的排序数据 */
      if (this.customCategories) {
        this.customCategories.forEach(function(cat) {
          keys.push('wetab_unified_order_' + cat.id);
        });
      }
      keys.push('wetab_unified_order_shenghuo');
      keys.push('wetab_unified_order_bangong');
      var data = {};
      keys.forEach(function(k) {
        var v = localStorage.getItem(k);
        if (v !== null) data[k] = v;
      });
      return { version: 1, timestamp: Date.now(), data: data };
    },
    /* 恢复所有本地数据 */
    restoreAllData: function(payload) {
      if (!payload || !payload.data) return false;
      try {
        var d = payload.data;
        for (var k in d) {
          localStorage.setItem(k, d[k]);
        }
        return true;
      } catch(e) { return false; }
    },
    /* 导出数据到文件 */
    exportData: function() {
      var payload = this.collectAllData();
      var blob = new Blob([JSON.stringify(payload, null, 2)], {type: 'application/json'});
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'cwys-backup-' + new Date().toISOString().slice(0,10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('已导出备份文件');
    },
    /* 从文件导入数据 */
    importData: function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var self = this;
      var r = new FileReader();
      r.onload = function(ev) {
        try {
          var payload = JSON.parse(ev.target.result);
          if (!payload.data) { self.showToast('文件格式不正确'); return; }
          self.restoreAllData(payload);
          self.showToast('导入成功，即将刷新...');
          setTimeout(function() { location.reload(); }, 1200);
        } catch(err) {
          self.showToast('导入失败：' + err.message);
        }
      };
      r.readAsText(file);
      e.target.value = '';
    },
    /* 保存云同步设置 */
    saveCloudSettings: function() {},
    /* 延迟自动同步（防抖 5 秒，静默不弹toast，初始化后10秒才允许） */
    scheduleCloudSync: function() {
      if (!this.cloudAutoSync) return;
      if (!this._cloudSyncReady) return;
      var self = this;
      if (this._syncTimer) clearTimeout(this._syncTimer);
      this._syncTimer = setTimeout(function() {
        self.cloudSyncPush(true);
      }, 5000);
    },
    /* 推送数据到 Cloudflare Worker，silent=true 时不弹toast */
    cloudSyncPush: function(silent) {
      var self = this;
      /* 未登录时不同步（只读模式不推送数据） */
      if (!this.isLoggedIn) { this.cloudSyncStatus = 'idle'; return; }
      this.cloudSyncStatus = 'syncing';
      var payload = this.collectAllData();
      var headers = { 'Content-Type': 'application/json' };
      if (this.sessionToken) headers['X-Session-Token'] = this.sessionToken;
      fetch('https://sync.cwys.qzz.io/api/sync', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ token: this.cloudToken, data: payload })
      })
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d.ok) {
          self.cloudSyncStatus = 'synced';
          self.cloudSyncTime = new Date().toLocaleString('zh-CN');
          localStorage.setItem('cwys_cloud_sync_time', self.cloudSyncTime);
          localStorage.setItem('cwys_last_push_ts', String(payload.timestamp));
          if (!silent) self.showToast('已同步到云端');
        } else {
          self.cloudSyncStatus = 'error';
          if (d.needLogin) {
            self.isLoggedIn = false;
            self.sessionToken = '';
            localStorage.removeItem('cwys_session_token');
            if (!silent) self.showToast('登录已过期，请重新登录');
          } else {
            if (!silent) self.showToast('同步失败: ' + (d.error || '未知错误'));
          }
        }
      })
      .catch(function(err) {
        self.cloudSyncStatus = 'error';
      });
    },
    /* 从 Cloudflare Worker 拉取数据 */
    cloudSyncPull: function() {
      var self = this;
      this.cloudSyncStatus = 'syncing';
      fetch('https://sync.cwys.qzz.io/api/sync?token=' + this.cloudToken, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
      .then(function(r) {
        if (r.status === 404) { throw new Error('云端暂无数据，请先点击「立即同步」'); }
        return r.json();
      })
      .then(function(d) {
        if (d.ok && d.data && d.data.data) {
          self.restoreAllData(d.data);
          self.cloudSyncStatus = 'synced';
          self.cloudSyncTime = new Date().toLocaleString('zh-CN');
          localStorage.setItem('cwys_cloud_sync_time', self.cloudSyncTime);
          localStorage.setItem('cwys_last_push_ts', String(d.data.timestamp || 0));
          self.showToast('已从云端恢复，即将刷新...');
          setTimeout(function() { location.reload(); }, 1200);
        } else {
          self.cloudSyncStatus = 'error';
          self.showToast('云端数据格式异常');
        }
      })
      .catch(function(err) {
        self.cloudSyncStatus = 'error';
        self.showToast('拉取失败: ' + err.message);
      });
    },
    /* 静默拉取（页面加载时自动调用，云端更新才恢复） */
    cloudSyncPullSilent: function() {
      var self = this;
      fetch('https://sync.cwys.qzz.io/api/sync?token=' + this.cloudToken, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      })
      .then(function(r) {
        if (r.status === 404) return null;
        return r.json();
      })
      .then(function(d) {
        if (d && d.ok && d.data && d.data.data) {
          try {
            var localTs = parseInt(localStorage.getItem('cwys_last_push_ts') || '0');
            var cloudTs = d.data.timestamp || 0;
            if (cloudTs > localTs) {
              self.restoreAllData(d.data);
              self.cloudSyncTime = new Date().toLocaleString('zh-CN');
              localStorage.setItem('cwys_cloud_sync_time', self.cloudSyncTime);
              localStorage.setItem('cwys_last_push_ts', String(cloudTs));
              self.showToast('检测到云端有更新，已自动同步');
              setTimeout(function() { location.reload(); }, 1500);
            }
          } catch(e) {}
        }
      })
      .catch(function(err) {});
    },

    /* ===== 分类管理 ===== */
    openCategoryMgr: function() { this.showCategoryMgr = true; this.newCategoryName = ''; this.newCategoryIcon = 'folder'; this.editingCategoryId = null; },
    addCategory: function() {
      if (!this.newCategoryName.trim()) { this.showToast('请输入分类名称'); return; }
      if (this.editingCategoryId) {
        /* 编辑模式 */
        var cat = this.customCategories.find(function(c) { return c.id === this.editingCategoryId; }.bind(this));
        if (cat) { cat.name = this.newCategoryName.trim(); cat.iconId = this.newCategoryIcon; }
        this.showToast('分类已更新');
      } else {
        /* 新增模式 */
        var id = 'custom_' + Date.now();
        this.customCategories.push({id: id, name: this.newCategoryName.trim(), iconId: this.newCategoryIcon});
        this.$set(this.customLists, id, []);
        this.showToast('分类已添加');
      }
      this.editingCategoryId = null;
      this.showCategoryMgr = false;
      this.saveSites();
    },
    deleteCategory: function(catId) {
      this.customCategories = this.customCategories.filter(function(c) { return c.id !== catId; });
      delete this.customLists[catId];
      if (this.activeTab === catId) this.activeTab = 'shenghuo';
      if (this.editTab === catId) this.editTab = 'shenghuo';
      this.saveSites();
      this.showToast('分类已删除');
    },
    editCategory: function(catId) {
      var cat = this.customCategories.find(function(c) { return c.id === catId; });
      if (!cat) return;
      this.editingCategoryId = catId;
      this.newCategoryName = cat.name;
      this.newCategoryIcon = cat.iconId || cat.icon || 'folder';
      this.showCategoryMgr = true;
    },

    /* ===== Dock ===== */
    addToDock: function(item) {
      var exists = this.dockItems.find(function(d) { return d.url === item.url; });
      if (exists) { this.showToast('已在Dock中'); return; }
      if (this.dockItems.length >= 8) this.dockItems.shift();
      var copy = JSON.parse(JSON.stringify(item));
      this.$set(copy, 'faviconUrl', this.getFaviconUrl(item.url));
      this.$set(copy, 'iconErr', false);
      this.dockItems.push(copy);
      this.saveDock();
      this.showToast('已添加到Dock');
    },
    removeFromDock: function(idx) {
      this.dockItems.splice(idx, 1);
      this.saveDock();
      this.showToast('已从Dock移除');
    },
    saveDock: function() { localStorage.setItem('wetab_dock', JSON.stringify(this.dockItems)); },

    /* ===== 重置为默认 ===== */
    resetToDefault: function() {
      if (!confirm('确定要恢复默认设置吗？所有自定义图标、分类和设置都会被重置。')) return;
      this.listShengHuo = JSON.parse(JSON.stringify(defaultListShengHuo));
      this.listBanGong = JSON.parse(JSON.stringify(defaultListBanGong));
      this.customCategories = [];
      this.customLists = {};
      this.dockItems = [];
      this.noteText = '';
      this.todoList = [];
      this.countdownTarget = '';
      this.countdownLabel = '';
      this.maskOpacity = 25;
      this.blurVal = 0;
      this.iconShape = 'rounded';
      this.iconOpacity = 100;
      this.iconSize = 56;
      this.iconGap = 22;
      this.iconRowGap = 16;
      this.iconBgColor = '#ffffff';
      this.openInNewTab = true;
      this.scrollFlipEnabled = true;
      this.scrollFlipSensitivity = 50;
      this.currentBgIdx = 2;
      this.currentBgUrl = '';
      this.currentBgType = 'css';
      this.bgLoaded = true;
      this.widgetVisible = {note:false, todo:false, countdown:true, calendar:true, weather:true, hot:true, fish:true};
      this.widgetOrder = ['weather','calendar','countdown','hot','fish','note','todo'];
      localStorage.setItem('wetab_data_version', DATA_VERSION);
      this.saveSites();
      this.saveSettings();
      this.saveDock();
      localStorage.setItem('wetab_note', '');
      localStorage.setItem('wetab_todo', JSON.stringify([]));
      localStorage.setItem('wetab_countdown', JSON.stringify({target:'', label:''}));
      localStorage.setItem('wetab_widgets', JSON.stringify(this.widgetVisible));
      this.showToast('已恢复默认设置');
      location.reload();
    },

    /* ===== 网址管理 ===== */
    openSiteMgr: function() {
      this.currentView = 'home';
      this.showSiteMgr = true;
      this.mgrTab = 'custom';
      this.editTab = this.activeTab;
      this.mgrShowIcons = true;
      this.showEditForm = false;
      this.resetCustomForm();
    },
    closeSiteMgr: function() { this.saveSites(); this.showSiteMgr = false; this.mgrShowIcons = false; },
    switchMgrTab: function(tab) {
      this.mgrTab = tab;
      if (tab === 'custom') {
        this.editTab = this.activeTab;
        this.resetCustomForm();
      }
    },
    resetCustomForm: function() {
      this.customForm = {name:'', url:'', text:'', color:'#ffffff', mode:'text', imgSrc:'', iconId:'', iconUrl:'', editIdx:-1};
      this.customIconMode = '';
      this.showCustomIconPicker = false;
      this.showCustomSolidIcon = false;
      this.customIconSearchKey = '';
      this.customIconSearchResults = [];
    },
    handleCustomIconUpload: function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var self = this;
      var r = new FileReader();
      r.onload = function(ev) {
        var img = new Image();
        img.onload = function() {
          var max = 128;
          var w = img.width, h = img.height;
          if (w > h) { if (w > max) { h = h * max / w; w = max; } }
          else { if (h > max) { w = w * max / h; h = max; } }
          var canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          var dataUrl = canvas.toDataURL('image/png');
          if (dataUrl.length > 100000) dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          self.customForm.imgSrc = dataUrl;
          self.customForm.iconId = '';
          self.customIconMode = 'upload';
          self.$forceUpdate();
        };
        img.src = ev.target.result;
      };
      r.readAsDataURL(file);
      e.target.value = '';
    },
    saveCustomForm: function(keepOpen) {
      var f = this.customForm;
      if (!f.name.trim()) { this.showToast('请填写名称'); return; }
      if (!f.url.trim()) { this.showToast('请填写网址'); return; }
      /* 构建图标：根据模式处理 */
      var imgSrc = '';
      var bgColor = f.color || '';
      var iconId = '';
      /* 图标库模式：使用iconId */
      if (this.customIconMode === 'library' && f.iconId) {
        iconId = f.iconId;
        imgSrc = '';
        bgColor = f.color || '';
      }
      /* 自动获取模式：使用faviconUrl */
      else if (this.customIconMode === 'auto' && f.imgSrc) {
        imgSrc = f.imgSrc;
        bgColor = (f.color && f.color !== 'transparent') ? f.color : 'transparent';
      }
      /* 本地上传模式：使用上传的图片 */
      else if (this.customIconMode === 'upload' && f.imgSrc) {
        imgSrc = f.imgSrc;
        bgColor = (f.color && f.color !== 'transparent') ? f.color : 'transparent';
      }
      /* 纯色图标模式：生成纯色SVG */
      else if (this.customIconMode === 'solid') {
        var solidText = f.text || f.name.charAt(0) || 'A';
        var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" rx="28" fill="'+f.color+'"/><text x="64" y="64" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="48" font-weight="600" font-family="sans-serif">'+solidText+'</text></svg>';
        imgSrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
        bgColor = 'transparent';
      }
      /* 文字图标模式：生成文字SVG */
      else if (this.customIconMode === 'text' || !this.customIconMode) {
        var displayText = f.text || f.name.charAt(0) || 'A';
        var svg2 = '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128"><rect width="128" height="128" rx="28" fill="'+f.color+'"/><text x="64" y="64" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="48" font-weight="600" font-family="sans-serif">'+displayText+'</text></svg>';
        imgSrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg2)));
        bgColor = 'transparent';
      }
      /* 图标URL模式 */
      else if (f.iconUrl && !f.imgSrc && !f.iconId) {
        imgSrc = f.iconUrl;
        bgColor = (f.color && f.color !== 'transparent') ? f.color : 'transparent';
      }
      var site = {name: f.name.trim(), url: f.url.trim(), iconId: iconId, imgSrc: imgSrc, bgColor: bgColor};
      this.$set(site, 'faviconUrl', this.getFaviconUrl(site.url));
      this.$set(site, 'iconErr', false);
      var isEdit = typeof f.editIdx === 'number' && f.editIdx >= 0;
      /* 文件夹视图下：新图标直接添加到文件夹 */
      if (!isEdit && this.folderView !== null) {
        var folder = this.activeCategoryList[this.folderView];
        if (folder && folder.type === 'folder') {
          if (!folder.children) this.$set(folder, 'children', []);
          folder.children.push(site);
          this.saveSites();
          if (keepOpen) { this.resetCustomForm(); this.showToast('已添加到文件夹，可继续添加'); }
          else { this.showToast('已添加到文件夹'); this.showSiteMgr = false; }
          return;
        }
      }
      var list = this.editCategoryList;
      if (isEdit) {
        this.$set(list, f.editIdx, site);
      } else {
        list.push(site);
      }
      this.saveSites();
      if (keepOpen) {
        this.resetCustomForm();
        this.showToast(isEdit ? '已更新，可继续添加' : '已保存，可继续添加');
      } else {
        this.showToast(isEdit ? '已更新' : '已保存');
        this.showSiteMgr = false;
      }
    },
    /* ===== 自定义图标辅助方法 ===== */
    onCustomNameInput: function() {
      var name = this.customForm.name.trim();
      if (!name) return;
      if (!this.customForm.url && SITE_NAME_MAP[name]) {
        this.customForm.url = SITE_NAME_MAP[name];
        /* 自动获取favicon */
        this.autoFetchCustomIcon();
      }
    },
    autoFetchCustomIcon: function() {
      if (!this.customForm.url.trim()) { this.showToast('请先输入网址URL'); return; }
      var url = this.customForm.url.trim();
      try {
        var u = new URL(url);
        var host = u.hostname;
        var sources = this.getFaviconSources(host);
        this.customForm.imgSrc = sources[0];
        this.customForm.iconUrl = sources[0];
        this.customForm.iconId = '';
        this.customIconMode = 'auto';
        this.showCustomSolidIcon = false;
        this.showCustomIconPicker = false;
        this.$forceUpdate();
        this.showToast('已自动获取图标');
      } catch (e) { this.showToast('URL格式不正确'); }
    },
    toggleCustomIconPicker: function() {
      this.showCustomIconPicker = !this.showCustomIconPicker;
      this.customIconMode = 'library';
      this.showCustomSolidIcon = false;
      if (this.showCustomIconPicker) {
        this.customIconSearchKey = '';
        this.customIconSearchResults = [];
      }
    },
    searchCustomIconfont: function() {
      var key = this.customIconSearchKey.trim().toLowerCase();
      if (!key) { this.customIconSearchResults = []; return; }
      var all = document.querySelectorAll('symbol');
      var ids = [];
      for (var i = 0; i < all.length; i++) {
        var id = all[i].id;
        if (!id) continue;
        if (BUILTIN_ICON_IDS.has(id)) continue;
        if (id.toLowerCase().indexOf(key) !== -1) ids.push(id);
      }
      this.customIconSearchResults = ids;
    },
    applyCustomIconfontInput: function() {
      var input = this.customIconSearchKey.trim();
      if (!input) return;
      if (this.customIconSearchResults.length === 1) {
        this.pickCustomIconfont(this.customIconSearchResults[0]);
        return;
      }
      if (input.indexOf('icon-') === 0) {
        var exists = document.querySelector('symbol[id="' + input + '"], svg.symbol#' + input + ', #' + input);
        if (exists) {
          this.pickCustomIconfont(input);
        } else {
          this.showToast('未找到图标：' + input);
        }
      } else if (this.customIconSearchResults.length > 0) {
        this.showToast('找到多个结果，请点击选择');
      } else {
        this.showToast('未找到匹配的图标');
      }
    },
    pickCustomIconfont: function(iconId) {
      this.customForm.iconId = iconId;
      this.customForm.imgSrc = '';
      this.customForm.iconUrl = '';
      this.showCustomIconPicker = false;
      this.$forceUpdate();
    },
    addSiteInMgr: function() {
      this.showEditForm = true;
      this.showSolidIcon = false;
      this.solidIconText = '';
      this.editForm = {name:'', url:'', imgSrc:'', iconUrl:'', iconId:'', bgColor:'', idx:-1};
    },
    editSiteInMgr: function(idx) {
      var item = this.editCategoryList[idx];
      /* 切换到自定义图标标签页，加载数据到 customForm */
      this.mgrTab = 'custom';
      var mode = 'text';
      if (item.iconId) mode = 'library';
      else if (item.imgSrc && item.imgSrc.indexOf('data:image/svg+xml') === 0) {
        /* SVG文字/纯色图标 */
        mode = item.imgSrc.indexOf('fill=\"') !== -1 ? 'solid' : 'text';
      }
      else if (item.imgSrc && (item.imgSrc.indexOf('http') === 0 || item.imgSrc.indexOf('data:image/png') === 0 || item.imgSrc.indexOf('data:image/jpeg') === 0)) {
        mode = item.imgSrc.indexOf('favicon') !== -1 || item.imgSrc.indexOf('http') === 0 ? 'auto' : 'upload';
      }
      this.customIconMode = mode;
      this.showCustomIconPicker = false;
      this.showCustomSolidIcon = false;
      this.customIconSearchKey = '';
      this.customIconSearchResults = [];
      this.customForm = {
        name: item.name || '',
        url: item.url || '',
        text: '',
        color: item.bgColor && item.bgColor !== 'transparent' ? item.bgColor : '#ffffff',
        mode: mode,
        imgSrc: item.imgSrc || '',
        iconId: item.iconId || '',
        iconUrl: item.imgSrc || '',
        editIdx: idx
      };
    },
    editSiteFromCtx: function(idx) {
      this.openSiteMgr();
      this.editTab = this.activeTab;
      var self = this;
      this.$nextTick(function() { self.editSiteInMgr(idx); });
    },
    deleteSiteFromCtx: function(idx) {
      this.activeCategoryList.splice(idx, 1);
      this.saveSites();
      this.showToast('已删除');
    },
    deleteFromMgr: function(idx) {
      this.editCategoryList.splice(idx, 1);
      this.saveSites();
      this.showToast('已删除');
    },
    saveEditForm: function() {
      if (!this.editForm.name.trim() || !this.editForm.url.trim()) { this.showToast('请填写名称和URL'); return; }
      // 有图标ID时，imgSrc必须为空（图标ID优先）
      var iconId = this.editForm.iconId || '';
      var imgSrc = '';
      if (!iconId) {
        // 没有图标ID时，使用URL或imgSrc
        imgSrc = this.editForm.imgSrc || this.editForm.iconUrl || '';
      }
      var site = {name: this.editForm.name.trim(), url: this.editForm.url.trim(), iconId: iconId, imgSrc: imgSrc, bgColor: this.editForm.bgColor || ''};
      this.$set(site, 'faviconUrl', this.getFaviconUrl(site.url));
      this.$set(site, 'iconErr', false);
      var list = this.editCategoryList;
      if (this.editForm.idx >= 0) {
        this.$set(list, this.editForm.idx, site);
      } else {
        list.push(site);
      }
      this.saveSites();
      this.showEditForm = false;
      this.showIconPicker = false;
      this.showSolidIcon = false;
      this.showToast('已保存');
    },
    saveSites: function() {
      try {
        localStorage.setItem('listShengHuo', JSON.stringify(this.listShengHuo));
        localStorage.setItem('listBanGong', JSON.stringify(this.listBanGong));
        localStorage.setItem('wetab_custom_categories', JSON.stringify(this.customCategories));
        localStorage.setItem('wetab_custom_lists', JSON.stringify(this.customLists));
        this.scheduleCloudSync();
      } catch(e) {
        this.showToast('保存失败：数据过大，请使用更小的图标');
      }
    },

    /* ===== 图标上传 ===== */
    handleIconUpload: function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var self = this;
      // 先用FileReader读取，然后用canvas压缩
      var r = new FileReader();
      r.onload = function(ev) {
        var img = new Image();
        img.onload = function() {
          // 压缩到最大128x128，保持比例
          var max = 128;
          var w = img.width, h = img.height;
          if (w > h) { if (w > max) { h = h * max / w; w = max; } }
          else { if (h > max) { w = w * max / h; h = max; } }
          var canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          // 尝试PNG，如果太大则用JPEG
          var dataUrl = canvas.toDataURL('image/png');
          if (dataUrl.length > 100000) {
            dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          }
          self.editForm.imgSrc = dataUrl;
          self.editForm.iconId = '';
          self.$forceUpdate();
        };
        img.src = ev.target.result;
      };
      r.readAsDataURL(file);
      e.target.value = '';
    },
    applyIconUrl: function() {
      if (this.editForm.iconUrl && this.editForm.iconUrl.trim()) {
        this.editForm.imgSrc = this.editForm.iconUrl.trim();
        this.editForm.iconId = '';
        this.$forceUpdate();
      }
    },
    applySolidIcon: function() {
      var text = this.solidIconText.trim() || 'Aa';
      var color = this.solidIconColor;
      var r = Math.round(parseInt(color.slice(1,3),16));
      var g = Math.round(parseInt(color.slice(3,5),16));
      var b = Math.round(parseInt(color.slice(5,7),16));
      // 生成渐变色（基于主色，稍微变亮）
      var r2 = Math.min(255, r + 40);
      var g2 = Math.min(255, g + 40);
      var b2 = Math.min(255, b + 40);
      var gradId = 'g' + Date.now();
      var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">' +
        '<defs><linearGradient id="'+gradId+'" x1="0%" y1="0%" x2="100%" y2="100%">' +
        '<stop offset="0%" style="stop-color:rgb('+r2+','+g2+','+b2+')"/>' +
        '<stop offset="100%" style="stop-color:rgb('+r+','+g+','+b+')"/>' +
        '</linearGradient></defs>' +
        '<rect width="120" height="120" rx="24" fill="url(#'+gradId+')"/>' +
        '<text x="60" y="60" text-anchor="middle" dominant-baseline="central" fill="white" font-size="52" font-weight="700" font-family="system-ui,-apple-system,sans-serif" style="text-shadow:0 2px 4px rgba(0,0,0,.2)">'+text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</text></svg>';
      this.editForm.imgSrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
      this.editForm.iconId = '';
      this.editForm.iconUrl = '';
      this.showSolidIcon = false;
      this.$forceUpdate();
    },
    searchIconfont: function() {
      var key = this.iconSearchKey.trim().toLowerCase();
      if (!key) { this.iconSearchResults = []; return; }
      var all = document.querySelectorAll('symbol');
      var ids = [];
      for (var i = 0; i < all.length; i++) {
        var id = all[i].id;
        if (!id) continue;
        if (BUILTIN_ICON_IDS.has(id)) continue;
        if (id.toLowerCase().indexOf(key) !== -1) ids.push(id);
      }
      this.iconSearchResults = ids;
    },
    searchIcons: function() {
      var key = this.iconSearchKey.trim().toLowerCase();
      if (!key) { this.iconSearchResults = this.iconList; return; }
      var all = this.iconList;
      var results = [];
      for (var i = 0; i < all.length; i++) {
        if (all[i].id.indexOf(key) !== -1 || all[i].name.indexOf(key) !== -1) {
          results.push(all[i]);
        }
      }
      this.iconSearchResults = results;
    },
    pickIconfont: function(iconId) {
      this.editForm.iconId = iconId;
      this.editForm.imgSrc = '';
      this.editForm.iconUrl = '';
      this.showIconPicker = false;
      this.$forceUpdate();
    },
    toggleIconPicker: function() {
      this.showIconPicker = !this.showIconPicker;
      this.editIconMode = 'library';
      this.showSolidIcon = false;
      if (this.showIconPicker) {
        this.iconSearchKey = '';
        this.iconSearchResults = [];
      }
    },
    applyIconfontInput: function() {
      var input = this.iconSearchKey.trim();
      if (!input) return;
      // 如果搜索结果只有一个，直接使用第一个
      if (this.iconSearchResults.length === 1) {
        this.pickIconfont(this.iconSearchResults[0]);
        return;
      }
      // 检查输入是否是一个完整的图标ID（以icon-开头）
      if (input.indexOf('icon-') === 0) {
        // 验证该图标是否存在于页面中（搜索symbol元素）
        var exists = document.querySelector('symbol[id="' + input + '"], svg.symbol#' + input + ', #' + input);
        if (exists) {
          this.pickIconfont(input);
        } else {
          this.showToast('未找到图标：' + input);
        }
      } else if (this.iconSearchResults.length > 0) {
        // 有搜索结果但不唯一，提示用户
        this.showToast('找到多个结果，请点击选择或输入完整ID');
      } else {
        this.showToast('未找到匹配的图标');
      }
    },
    onNameInput: function() {
      var name = this.editForm.name.trim();
      if (!name) return;
      // 自动匹配网址
      if (!this.editForm.url && SITE_NAME_MAP[name]) {
        this.editForm.url = SITE_NAME_MAP[name];
      }
      // 如果还没有图标，自动获取 favicon
      if (!this.editForm.imgSrc && !this.editForm.iconId && this.editForm.url) {
        try {
          var u = new URL(this.editForm.url);
          var sources = this.getFaviconSources(u.hostname);
          this.editForm.imgSrc = sources[0];
          this.editForm.iconUrl = sources[0];
          this.$forceUpdate();
        } catch (e) {}
      }
    },
    autoFetchIcon: function() {
      if (!this.editForm.url.trim()) { this.showToast('请先输入网址URL'); return; }
      var url = this.editForm.url.trim();
      try {
        var u = new URL(url);
        var host = u.hostname;
        var sources = this.getFaviconSources(host);
        /* 尝试第一个源，如果加载失败会自动切换 */
        this.editForm.imgSrc = sources[0];
        this.editForm.iconUrl = sources[0];
        this.editForm.iconId = '';
        this.$forceUpdate();
        this.showToast('已自动获取图标（如显示失败请尝试其他源）');
      } catch (e) { this.showToast('URL格式不正确'); }
    },

    /* ===== 右键菜单动作 ===== */
    ctxAddSite: function() {
      this.currentView = 'home';
      this.showSiteMgr = true;
      this.mgrTab = 'custom';
      this.editTab = this.activeTab;
      this.mgrShowIcons = true;
      this.showEditForm = false;
      this.resetCustomForm();
    },

    /* ===== 文件夹功能 ===== */
    createFolderDialog: function() {
      this.folderDialogMode = 'create';
      this.folderName = '';
      this.editingFolderIdx = -1;
      this.showFolderDialog = true;
      var self = this;
      this.$nextTick(function() {
        if (self.$refs.folderNameInput) self.$refs.folderNameInput.focus();
      });
    },
    saveFolderName: function() {
      var name = this.folderName.trim();
      if (!name) { this.showToast('请输入文件夹名称'); return; }
      if (this.folderDialogMode === 'create') {
        var folder = {type:'folder', name:name, iconId:'icon-folder', children:[], bgColor:''};
        this.activeCategoryList.push(folder);
        this.showToast('文件夹已创建');
      } else {
        if (this.editingFolderIdx >= 0 && this.activeCategoryList[this.editingFolderIdx]) {
          this.$set(this.activeCategoryList[this.editingFolderIdx], 'name', name);
          this.showToast('已重命名');
        }
      }
      this.saveSites();
      this.showFolderDialog = false;
      this.folderName = '';
      this.editingFolderIdx = -1;
    },
    /* 返回文件夹预览用子图标列表（最多4个，2×2网格） */
    folderPreviewList: function(folder) {
      if (!folder || !folder.children || !folder.children.length) return [];
      return folder.children.slice(0, 9);
    },
    openFolder: function(idx) {
      var item = this.activeCategoryList[idx];
      if (item && item.type === 'folder') this.folderView = idx;
    },
    closeFolder: function() { this.folderView = null; },
    renameFolder: function(idx) {
      this.folderDialogMode = 'rename';
      this.editingFolderIdx = idx;
      var item = this.activeCategoryList[idx];
      this.folderName = item ? item.name : '';
      this.showFolderDialog = true;
      var self = this;
      this.$nextTick(function() {
        if (self.$refs.folderNameInput) self.$refs.folderNameInput.focus();
      });
    },
    deleteFolder: function(idx) {
      this.activeCategoryList.splice(idx, 1);
      if (this.folderView === idx) this.folderView = null;
      else if (this.folderView !== null && this.folderView > idx) this.folderView--;
      this.saveSites();
      this.showToast('文件夹已删除');
    },
    removeFromFolder: function(childIdx) {
      if (this.folderView === null) return;
      var folder = this.activeCategoryList[this.folderView];
      if (!folder || folder.type !== 'folder') return;
      var item = folder.children.splice(childIdx, 1)[0];
      this.activeCategoryList.push(item);
      this.saveSites();
      this.showToast('已移出文件夹');
    },
    openFolderItem: function(childIdx) {
      if (this._wasFolderItemDrag) { this._wasFolderItemDrag = false; return; }
      if (this.folderView === null) return;
      var folder = this.activeCategoryList[this.folderView];
      if (!folder || folder.type !== 'folder') return;
      var item = folder.children[childIdx];
      if (item) this.openUrl(item.url);
    },
    /* 文件夹内右键菜单 */
    folderItemCtx: function(e, childIdx) {
      e.preventDefault();
      var self = this;
      createCtxMenu(e.clientX, e.clientY, [
        {label: '打开', action: function() { self.openFolderItem(childIdx); }},
        {label: '移出文件夹', action: function() { self.removeFromFolder(childIdx); }}
      ]);
    },
    ctxRandomBg: function() {
      var self = this;
      /* 从bgLibrary中筛选所有静态图片，随机选一张 */
      var imageBgs = this.bgLibrary.filter(function(bg) { return bg.type === 'image'; });
      if (imageBgs.length === 0) {
        this.showToast('没有可用的静态壁纸');
        return;
      }
      var bg = imageBgs[Math.floor(Math.random() * imageBgs.length)];
      var url = bg.url;
      this.showToast('正在加载随机壁纸...');
      var img = new Image();
      img.onload = function() {
        self.currentBgType = 'image';
        self.bgLoaded = false;
        self.currentBgUrl = url;
        self.currentBgIdx = -1;
        self.$nextTick(function() { self.bgLoaded = true; });
        self.saveSettings();
      };
      img.onerror = function() {
        /* 加载失败时再随机尝试另一张，最多3次 */
        if (!self._randomRetry) self._randomRetry = 0;
        self._randomRetry++;
        if (self._randomRetry < 3) {
          var retryBg = imageBgs[Math.floor(Math.random() * imageBgs.length)];
          img.src = retryBg.url;
        } else {
          self._randomRetry = 0;
          self.showToast('壁纸加载失败，请重试');
        }
      };
      img.src = url;
    },
    ctxDownloadBg: function() {
      var a = document.createElement('a');
      a.href = this.currentBgUrl;
      a.download = 'wallpaper_' + Date.now() + '.jpg';
      a.target = '_blank';
      a.click();
      this.showToast('正在下载壁纸');
    },
    ctxEditHome: function() {
      this.currentView = 'home';
      this.showSiteMgr = true;
      this.mgrTab = 'site';
      this.editTab = this.activeTab;
      this.showEditForm = false;
    },
    ctxSearchIcon: function() {
      this.currentView = 'iconSearch';
      this.iconSearchKey = '';
      this.iconSearchHost = '';
      this.iconSearchResults = [];
      var self = this;
      this.$nextTick(function() {
        var input = self.$refs.iconSearchInput;
        if (input) input.focus();
        /* 默认显示所有网站 */
        self.searchSiteIcons();
      });
    },
    searchSiteIcons: function() {
      var key = this.iconSearchKey.trim().toLowerCase();
      if (!key) { this.iconSearchHost = ''; this.iconSearchResults = []; return; }
      var allSites = [];
      var seen = {};
      var lists = [this.listShengHuo, this.listBanGong];
      for (var k in this.customLists) { lists.push(this.customLists[k]); }
      for (var i = 0; i < lists.length; i++) {
        var list = lists[i];
        for (var j = 0; j < list.length; j++) {
          var site = list[j];
          if (!seen[site.url]) {
            seen[site.url] = true;
            allSites.push(site);
          }
        }
      }
      var results = [];
      for (var s = 0; s < allSites.length; s++) {
        var site = allSites[s];
        if (site.name.toLowerCase().indexOf(key) !== -1 || site.url.toLowerCase().indexOf(key) !== -1) {
          results.push(site);
        }
      }
      this.iconSearchResults = results;
    },
    selectSiteIcon: function(src) {
      if (this.showSiteMgr && this.editForm) {
        this.editForm.imgSrc = src;
        this.editForm.iconUrl = src;
        this.editForm.iconId = '';
      }
      this.switchView('home');
      this.showToast('已选择图标');
    },


    /* ===== 滚动切换板块 ===== */
    onCatFlipWheel: function(e) {
      if (!this.scrollFlipEnabled || this.showSettings) return;
      var sections = this.flipSections;
      if (sections.length <= 1) return;
      /* 检查鼠标是否在主内容区域内 */
      var wrapper = this.currentView === 'api' ? this.$refs.apiViewWrapper : this.$refs.mainWrap;
      if (!wrapper) return;
      var rect = wrapper.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      /* 判断页面滚动位置 */
      var scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var scrollH = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      var clientH = document.documentElement.clientHeight || window.innerHeight || 0;
      var atBottom = scrollTop + clientH >= scrollH - 5;
      var atTop = scrollTop <= 5;
      var self = this;
      var now = Date.now();
      var delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 40;
      if (e.deltaMode === 2) delta *= 800;
      /* 向下滚动：没到底部时让内容正常滚动，到底了才切换 */
      if (delta > 0 && !atBottom) return;
      /* 向上滚动：没到顶部时让内容正常滚动，到顶了才切换 */
      if (delta < 0 && !atTop) return;
      /* 灵敏度越低，冷却越长（50~950ms） */
      var cooldown = Math.max(50, 950 - self.scrollFlipSensitivity * 7);
      /* 灵敏度越低，需要的累积滚动量越大（5~205） */
      var threshold = Math.max(5, 205 - self.scrollFlipSensitivity * 1.5);
      self.catFlipAccum += delta;
      if (self._catAccumTimer) clearTimeout(self._catAccumTimer);
      /* 灵敏度越低，累积窗口越长 */
      var accumTimer = Math.max(200, 700 - self.scrollFlipSensitivity * 4);
      self._catAccumTimer = setTimeout(function() { self.catFlipAccum = 0; }, accumTimer);
      if (self._lastCatFlipTime && now - self._lastCatFlipTime < cooldown) {
        e.preventDefault();
        return;
      }
      if (Math.abs(self.catFlipAccum) >= threshold) {
        var idx = self.catFlipIndex;
        if (self.catFlipAccum > 0 && idx < sections.length - 1) {
          e.preventDefault();
          var next = sections[idx + 1];
          if (next.isApi) { self.currentView = 'api'; }
          else { self.currentView = 'home'; self.activeTab = next.id; }
          self._lastCatFlipTime = now;
          window.scrollTo(0, 0);
        } else if (self.catFlipAccum < 0 && idx > 0) {
          e.preventDefault();
          var prev = sections[idx - 1];
          if (prev.isApi) { self.currentView = 'api'; }
          else { self.currentView = 'home'; self.activeTab = prev.id; }
          self._lastCatFlipTime = now;
          window.scrollTo(0, 0);
        }
        self.catFlipAccum = 0;
      }
    },

    /* ===== 拖拽排序 ===== */
    onFolderClick: function(idx) {
      if (this._wasDrag) { this._wasDrag = false; return; }
      this.openFolder(idx);
    },
    onSiteClick: function(idx) {
      if (this._wasDrag) { this._wasDrag = false; return; }
      var item = this.activeCategoryList[idx];
      if (item) this.openUrl(item.url);
    },
    /* ===== 统一网格排序辅助方法 ===== */
    iconKey: function(item) {
      return (item.name || '') + '|' + (item.url || '');
    },
    widgetGridOrder: function(name) {
      if (this.widgetOrderOverride[name] !== undefined) return this.widgetOrderOverride[name];
      return this.widgetOrder.indexOf(name) * 10;
    },
    iconGridOrder: function(item, idx) {
      var key = this.iconKey(item);
      if (this.iconOrderOverride[key] !== undefined) return this.iconOrderOverride[key];
      return 1000 + idx * 2;
    },
    saveGridOrder: function() {
      localStorage.setItem('wetab_widget_order_override', JSON.stringify(this.widgetOrderOverride));
      localStorage.setItem('wetab_icon_order_override', JSON.stringify(this.iconOrderOverride));
    },
    /* ===== 统一卡片系统：360 AItab 风格 ===== */
    cardStyle: function(idx) {
      var layout = this.cardLayout;
      var pos = layout.positions[idx];
      if (!pos) return { display: 'none' };
      var cellW = this.iconSize + 24;
      var cellH = this.iconSize + 34;
      var gapX = this.iconGap;
      var gapY = this.iconRowGap;
      var width = pos.w * cellW + (pos.w - 1) * gapX;
      var height = pos.h * cellH + (pos.h - 1) * gapY;

      /* 文件夹展开状态：从左边缘开始，宽度等于网格宽度，提高层级 */
      var card = this.unifiedCards[idx];
      if (card && card.type === 'folder' && this.folderView === card.idx) {
        var folderW = layout.containerW || 900;
        return {
          transform: 'translate(0px,' + pos.y + 'px)',
          width: folderW + 'px',
          zIndex: 50
        };
      }

      return {
        transform: 'translate(' + pos.x + 'px,' + pos.y + 'px)',
        width: width + 'px',
        height: height + 'px'
      };
    },
    saveUnifiedOrder: function() {
      var order = this.unifiedCards.filter(function(c) { return c.type !== 'add'; }).map(function(c) { return c.key; });
      this.$set(this.unifiedOrders, this.activeTab, order);
      this.unifiedOrdersVersion++;
      try {
        localStorage.setItem('wetab_unified_order_' + this.activeTab, JSON.stringify(order));
        this.scheduleCloudSync();
      } catch(e) {}
    },
    onUnifiedDragStart: function(e, idx) {
      this.unifiedDragIdx = idx;
      this._wasDrag = true;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(idx));
    },
    onUnifiedDragEnd: function() {
      this.unifiedDragIdx = -1;
      var self = this;
      setTimeout(function() { self._wasDrag = false; }, 50);
      document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });
    },
    onUnifiedDragOver: function(e, idx) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      /* 只在当前目标卡片上显示 drag-over，先清除其他的 */
      var current = e.currentTarget;
      document.querySelectorAll('.card-abs.drag-over').forEach(function(el) {
        if (el !== current) el.classList.remove('drag-over');
      });
      current.classList.add('drag-over');
    },
    onUnifiedDragLeave: function(e) {
      /* 离开卡片时移除 drag-over（仅当鼠标真正离开卡片区域） */
      var card = e.currentTarget;
      var rect = card.getBoundingClientRect();
      var x = e.clientX, y = e.clientY;
      if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
        card.classList.remove('drag-over');
      }
    },
    onUnifiedDrop: function(e, idx) {
      e.preventDefault();
      document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });
      if (this.unifiedDragIdx < 0 || this.unifiedDragIdx === idx) {
        this.unifiedDragIdx = -1;
        return;
      }
      var cards = this.unifiedCards;
      var draggedCard = cards[this.unifiedDragIdx];
      var targetCard = cards[idx];
      if (!draggedCard || !targetCard) { this.unifiedDragIdx = -1; return; }
      /* 拖到文件夹上：将图标移入文件夹 */
      if (targetCard.type === 'folder' && draggedCard.type !== 'widget' && draggedCard.type !== 'folder') {
        var list = this.activeCategoryList;
        var folder = list[targetCard.idx];
        var icon = list[draggedCard.idx];
        if (folder && icon && folder.type === 'folder') {
          if (!folder.children) this.$set(folder, 'children', []);
          list.splice(draggedCard.idx, 1);
          folder.children.push(icon);
          this.saveSites();
          this.showToast('已移入文件夹');
          this.unifiedDragIdx = -1;
          return;
        }
      }
      /* 交换位置：重建统一顺序 */
      var order = cards.map(function(c) { return c.key; });
      var movedKey = order.splice(this.unifiedDragIdx, 1)[0];
      order.splice(idx, 0, movedKey);
      this.$set(this.unifiedOrders, this.activeTab, order);
      this.unifiedOrdersVersion++; /* 强制 unifiedCards 重新计算 */
      try {
        localStorage.setItem('wetab_unified_order_' + this.activeTab, JSON.stringify(order));
        this.scheduleCloudSync();
      } catch(err) {}
      this.unifiedDragIdx = -1;
    },
    onDragStart: function(e, idx) {
      this.dragIdx = idx;
      this.dragType = 'icon';
      this._wasDrag = true;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(idx));
    },
    onDragEnd: function() {
      this.dragIdx = -1;
      var self = this;
      setTimeout(function() { self._wasDrag = false; }, 50);
      document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });
    },
    onDragOver: function(e, idx) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      var card = e.target.closest('.site-card, .widget');
      if (card) card.classList.add('drag-over');
    },
    onDrop: function(e, idx) {
      e.preventDefault();
      document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });

      if (this.dragIdx < 0) return;
      var list = this.activeCategoryList;
      var target = list[idx];
      /* 拖到文件夹上：将图标移入文件夹（但不能把文件夹拖进文件夹） */
      if (target && target.type === 'folder' && this.dragIdx !== idx) {
        var draggedItem = list[this.dragIdx];
        if (draggedItem && draggedItem.type === 'folder') {
          /* 文件夹互换位置 */
          var tmpF = list[this.dragIdx];
          list.splice(this.dragIdx, 1);
          list.splice(idx, 0, tmpF);
          this.dragIdx = -1;
          this.saveSites();
          return;
        }
        var dragIdx = this.dragIdx;
        var dragged = list.splice(dragIdx, 1)[0];
        if (!target.children) this.$set(target, 'children', []);
        target.children.push(dragged);
        this.dragIdx = -1;
        this.saveSites();
        this.showToast('已移入文件夹');
        return;
      }
      /* 普通排序（修正位置偏移） */
      if (this.dragIdx === idx) { this.dragIdx = -1; return; }
      var draggedItem = list[this.dragIdx];
      list.splice(this.dragIdx, 1);
      var newIdx = this.dragIdx < idx ? idx - 1 : idx;
      list.splice(newIdx, 0, draggedItem);
      this.dragIdx = -1;
      this.saveSites();
    },

    /* ===== 文件夹内图标拖拽排序 ===== */
    onFolderItemDragStart: function(e, ci) {
      this.folderItemDragIdx = ci;
      this._wasFolderItemDrag = true;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(ci));
    },
    onFolderItemDragEnd: function() {
      this.folderItemDragIdx = -1;
      var self = this;
      setTimeout(function() { self._wasFolderItemDrag = false; }, 50);
      document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });
    },
    onFolderItemDragOver: function(e, ci) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      var card = e.target.closest('.folder-item-card');
      if (card) card.classList.add('drag-over');
    },
    onFolderItemDrop: function(e, ci) {
      e.preventDefault();
      document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });
      if (this.folderItemDragIdx < 0 || this.folderView === null) return;
      var folder = this.activeCategoryList[this.folderView];
      if (!folder || folder.type !== 'folder' || !folder.children) { this.folderItemDragIdx = -1; return; }
      var children = folder.children;
      if (this.folderItemDragIdx === ci) { this.folderItemDragIdx = -1; return; }
      var draggedItem = children[this.folderItemDragIdx];
      children.splice(this.folderItemDragIdx, 1);
      var newIdx = this.folderItemDragIdx < ci ? ci - 1 : ci;
      children.splice(newIdx, 0, draggedItem);
      this.folderItemDragIdx = -1;
      this.saveSites();
    },

    /* ===== 组件拖拽排序 ===== */
    onWidgetDragStart: function(e, name) {
      this.widgetDragIdx = name;
      this.dragType = 'widget';
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', name);
    },
    onWidgetDragEnd: function() {
      this.widgetDragIdx = null;
      var self = this;
      document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });
    },
    onWidgetDragOver: function(e, name) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      var card = e.target.closest('.widget, .site-card');
      if (card) card.classList.add('drag-over');
    },
    onWidgetDrop: function(e, name) {
      e.preventDefault();
      document.querySelectorAll('.drag-over').forEach(function(el) { el.classList.remove('drag-over'); });

      if (!this.widgetDragIdx || this.widgetDragIdx === name) { this.widgetDragIdx = null; return; }
      /* 组件间拖拽：重新排序 */
      var order = this.widgetOrder;
      var fromIdx = order.indexOf(this.widgetDragIdx);
      var toIdx = order.indexOf(name);
      if (fromIdx < 0 || toIdx < 0) { this.widgetDragIdx = null; return; }
      order.splice(fromIdx, 1);
      order.splice(toIdx, 0, this.widgetDragIdx);
      this.widgetDragIdx = null;
      localStorage.setItem('wetab_widget_order', JSON.stringify(order));
    },

    /* ===== 复制 ===== */
    copyText: function(text) {
      var self = this;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() { self.showToast('已复制到剪贴板'); }).catch(function() { self.fallbackCopy(text); });
      } else {
        this.fallbackCopy(text);
      }
    },
    setRandomColor: function(e,item){
      var color = randomColorArr[Math.floor(Math.random()*randomColorArr.length)];
      e.currentTarget.style.setProperty('--randColor',color);
    },
    fallbackCopy: function(text) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      this.showToast('已复制');
    },

    /* ===== 导出/导入 / 云端同步 已移除 ===== */

    /* ===== 天气 ===== */
    loadWeather: function() {
      var self = this;
      /* 先尝试 apihz（全中文），3秒超时快速回退 */
      var c1 = new (window.AbortController || function(){})();
      var t1 = setTimeout(function() { c1.abort(); }, 3000);
      fetch('https://cn.apihz.cn/api/tianqi/tqybip.php?id=88888888&key=88888888&day=1', {signal: c1.signal})
      .then(function(r) { clearTimeout(t1); if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function(d) {
        if (d.code !== 200) throw new Error('api error');
        self.weatherCity = d.shi || '本地';
        if (d.nowinfo) {
          self.weatherTemp = Math.round(d.nowinfo.temperature);
          self.weatherDesc = d.weather1 || '';
          self.weatherHumidity = d.nowinfo.humidity;
        }
        self.weatherMaxTemp = d.wd1 || '';
        self.weatherMinTemp = d.wd2 || '';
        self.fetchAQI(d.shi || '北京');
      })
      .catch(function() { self.loadWeatherFallback(); });
    },
    loadWeatherFallback: function() {
      var self = this;
      /* 并行请求 ip.sb（城市名）和 wttr.in（天气数据） */
      var ipDone = false, wttrDone = false;
      var ipCity = '', wttrData = null;
      function tryFinish() {
        if (ipDone && wttrDone) {
          /* 填充数据 */
          var cur = wttrData && wttrData.current_condition && wttrData.current_condition[0];
          if (!cur) {
            self.weatherTemp = '--'; self.weatherDesc = '加载失败'; return;
          }
          self.weatherTemp = parseInt(cur.temp_C) || '--';
          self.weatherHumidity = cur.humidity || '';
          var today = wttrData.weather && wttrData.weather[0];
          if (today) {
            self.weatherMaxTemp = today.maxtempC || '';
            self.weatherMinTemp = today.mintempC || '';
          }
          /* 天气描述翻译 */
          var en = (cur.weatherDesc && cur.weatherDesc[0] && cur.weatherDesc[0].value) || '';
          var map = {
            'Sunny':'晴','Clear':'晴','Partly cloudy':'多云','Partly Cloudy':'多云',
            'Cloudy':'多云','Overcast':'阴','Mist':'雾','Fog':'雾','Freezing fog':'雾',
            'Patchy rain possible':'小雨','Patchy light drizzle':'毛毛雨',
            'Light drizzle':'毛毛雨','Patchy light rain':'小雨','Light rain':'小雨',
            'Moderate rain at times':'中雨','Moderate rain':'中雨',
            'Heavy rain at times':'大雨','Heavy rain':'大雨',
            'Light rain shower':'阵雨','Moderate or heavy rain shower':'阵雨',
            'Torrential rain shower':'暴雨','Patchy sleet possible':'雨夹雪',
            'Light sleet':'雨夹雪','Moderate or heavy sleet':'雨夹雪',
            'Patchy snow possible':'小雪','Patchy light snow':'小雪',
            'Light snow':'小雪','Moderate snow':'中雪','Heavy snow':'大雪',
            'Blizzard':'暴雪','Patchy freezing drizzle possible':'冻雨',
            'Freezing drizzle':'冻雨','Light freezing rain':'冻雨',
            'Moderate or heavy rain with thunder':'雷阵雨',
            'Patchy light rain with thunder':'雷阵雨',
            'Thundery outbreaks possible':'雷阵雨'
          };
          self.weatherDesc = map[en] || en;
          /* 城市名翻译 */
          var cn = self.translateCityName(ipCity);
          self.weatherCity = cn;
          self.weatherAQI = '';
        }
      }
      /* ip.sb 定位 */
      var ci = new (window.AbortController || function(){})();
      var ti = setTimeout(function() { ci.abort(); }, 5000);
      fetch('https://api.ip.sb/geoip', {signal: ci.signal})
      .then(function(r) { clearTimeout(ti); return r.json(); })
      .then(function(d) { ipCity = d.city || ''; ipDone = true; tryFinish(); })
      .catch(function() { ipCity = ''; ipDone = true; tryFinish(); });
      /* wttr.in 天气 */
      var cw = new (window.AbortController || function(){})();
      var tw = setTimeout(function() { cw.abort(); }, 8000);
      fetch('https://wttr.in/?format=j1', {signal: cw.signal})
      .then(function(r) { clearTimeout(tw); return r.json(); })
      .then(function(d) { wttrData = d; wttrDone = true; tryFinish(); })
      .catch(function() { wttrDone = true; tryFinish(); });
    },
    translateCityName: function(en) {
      var map = {
        'Beijing':'北京','Shanghai':'上海','Guangzhou':'广州','Shenzhen':'深圳',
        'Hangzhou':'杭州','Chengdu':'成都','Wuhan':'武汉','Nanjing':'南京',
        'Chongqing':'重庆','Tianjin':'天津','Suzhou':'苏州','Xian':'西安',
        'Changsha':'长沙','Shenyang':'沈阳','Qingdao':'青岛','Zhengzhou':'郑州',
        'Dalian':'大连','Dongguan':'东莞','Kunming':'昆明','Ningbo':'宁波',
        'Xiamen':'厦门','Fuzhou':'福州','Hefei':'合肥','Wuxi':'无锡',
        'Nanning':'南宁','Harbin':'哈尔滨','Jinan':'济南','Changchun':'长春',
        'Shijiazhuang':'石家庄','Lanzhou':'兰州','Nanchang':'南昌','Guiyang':'贵阳',
        'Taiyuan':'太原','Hohhot':'呼和浩特','Urumqi':'乌鲁木齐','Lhasa':'拉萨',
        'Haikou':'海口','Sanya':'三亚','Yinchuan':'银川','Xining':'西宁',
        'Zhuhai':'珠海','Foshan':'佛山','Zhongshan':'中山','Wenzhou':'温州',
        'Quanzhou':'泉州','Nantong':'南通','Changzhou':'常州','Xuzhou':'徐州',
        'Jiaxing':'嘉兴','Shaoxing':'绍兴','Taizhou':'台州','Jinhua':'金华',
        'Luoyang':'洛阳','Weifang':'潍坊','Baoding':'保定','Tangshan':'唐山',
        'Huizhou':'惠州','Jiangmen':'江门','Zhanjiang':'湛江','Zhaoqing':'肇庆',
        'Meizhou':'梅州','Shantou':'汕头','Huzhou':'湖州','Yangzhou':'扬州',
        'Yantai':'烟台','Weihai':'威海','Linyi':'临沂','Zibo':'淄博'
      };
      return map[en] || en || '本地';
    },
    fetchAQI: function(city) {
      var self = this;
      fetch('https://api.waqi.info/feed/' + encodeURIComponent(city) + '/?token=demo')
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (d.status === 'ok' && d.data) {
          var aqi = d.data.aqi;
          var level = '优';
          if (aqi > 50) level = '良';
          if (aqi > 100) level = '轻度污染';
          if (aqi > 150) level = '中度污染';
          if (aqi > 200) level = '重度污染';
          self.weatherAQI = level + '/' + aqi;
        } else {
          self.weatherAQI = '优/20';
        }
      })
      .catch(function() {
        self.weatherAQI = '优/20';
      });
    },

    /* ===== 登录系统 ===== */
    doLogin: function() {
      if (!this.loginPassword.trim()) {
        this.loginError = '请输入密码';
        return;
      }
      this.loginLoading = true;
      this.loginError = '';
      var self = this;
      fetch('https://sync.cwys.qzz.io/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: this.loginPassword })
      })
      .then(function(r) { return r.json(); })
      .then(function(d) {
        self.loginLoading = false;
        if (d.ok && d.token) {
          self.sessionToken = d.token;
          self.isLoggedIn = true;
          localStorage.setItem('cwys_session_token', d.token);
          self.showLoginModal = false;
          self.loginPassword = '';
          self.showToast('登录成功');
        } else {
          self.loginError = d.error || '登录失败';
        }
      })
      .catch(function() {
        self.loginLoading = false;
        self.loginError = '网络错误，请重试';
      });
    },
    doLogout: function() {
      var self = this;
      var token = this.sessionToken;
      this.sessionToken = '';
      this.isLoggedIn = false;
      localStorage.removeItem('cwys_session_token');
      this.showToast('已退出登录');
      if (token) {
        fetch('https://sync.cwys.qzz.io/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: token })
        }).catch(function() {});
      }
    },
    checkSession: function() {
      var self = this;
      var token = this.sessionToken;
      if (!token) return;
      fetch('https://sync.cwys.qzz.io/api/auth/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token })
      })
      .then(function(r) { return r.json(); })
      .then(function(d) {
        if (!d.valid) {
          self.isLoggedIn = false;
          self.sessionToken = '';
          localStorage.removeItem('cwys_session_token');
        }
      })
      .catch(function() {});
    },
    openLoginModal: function() {
      this.showLoginModal = true;
      this.loginPassword = '';
      this.loginError = '';
      var self = this;
      this.$nextTick(function() {
        var input = self.$refs.loginPasswordInput;
        if (input) input.focus();
      });
    }
  },

  mounted: function() {
    var self = this;

    /* 页面加载后检查登录状态 */
    setTimeout(function() { self.checkSession(); }, 300);

    /* 页面加载后立即拉取云端数据（静默，500ms后执行） */
    setTimeout(function() {
      self.cloudSyncPullSilent();
    }, 500);

    /* 5秒后开启自动同步，避免初始化时触发循环 */
    setTimeout(function() {
      self._cloudSyncReady = true;
    }, 5000);

    /* 窗口大小变化时重新计算布局 */
    window.addEventListener('resize', function() {
      self.winW = window.innerWidth || 1200;
    });

    /* 加载设置 */
     this.loadSettings();



    /* 版本号检查：代码更新后自动刷新默认数据 */
    var savedVer = localStorage.getItem('wetab_data_version');
    if (savedVer !== DATA_VERSION) {
      /* 版本不一致：用新的默认数据覆盖 */
      this.listShengHuo = JSON.parse(JSON.stringify(defaultListShengHuo));
      this.listBanGong = JSON.parse(JSON.stringify(defaultListBanGong));
      this.saveSites();
      /* 重置组件显示和顺序为新的默认值 */
      this.widgetVisible = {note:false, todo:false, countdown:true, calendar:true, weather:true, hot:true, fish:true};
      this.widgetOrder = ['weather','calendar','countdown','hot','fish','note','todo'];
      localStorage.setItem('wetab_widgets', JSON.stringify(this.widgetVisible));
      localStorage.setItem('wetab_widget_order', JSON.stringify(this.widgetOrder));
      /* 清除旧的统一排序，让新布局生效 */
      localStorage.removeItem('wetab_unified_order_shenghuo');
      localStorage.removeItem('wetab_unified_order_bangong');
      this.unifiedOrders = {};
      localStorage.setItem('wetab_data_version', DATA_VERSION);
    } else {
      /* 加载本地存储 */
      var sh = localStorage.getItem('listShengHuo');
      if (sh) { try { this.listShengHuo = JSON.parse(sh); } catch (e) {} }
      var bg = localStorage.getItem('listBanGong');
      if (bg) { try { this.listBanGong = JSON.parse(bg); } catch (e) {} }
    }
    var nt = localStorage.getItem('wetab_note');
    if (nt) this.noteText = nt;
    var td = localStorage.getItem('wetab_todo');
    if (td) { try { this.todoList = JSON.parse(td); } catch (e) {} }
    var dk = localStorage.getItem('wetab_dock');
    if (dk) { try { this.dockItems = JSON.parse(dk); } catch (e) {} }
    var wv = localStorage.getItem('wetab_widgets');
    if (wv) { try { var saved = JSON.parse(wv); for (var k in this.widgetVisible) { if (saved[k] !== undefined) this.widgetVisible[k] = saved[k]; } } catch (e) {} }
    var wo = localStorage.getItem('wetab_widget_order');
    if (wo) { try { var woArr = JSON.parse(wo); if (Array.isArray(woArr) && woArr.length === this.widgetOrder.length) this.widgetOrder = woArr; } catch (e) {} }
    var woo = localStorage.getItem('wetab_widget_order_override');
    if (woo) { try { this.widgetOrderOverride = JSON.parse(woo); } catch (e) {} }
    var ioo = localStorage.getItem('wetab_icon_order_override');
    if (ioo) { try { this.iconOrderOverride = JSON.parse(ioo); } catch (e) {} }
    var fc = localStorage.getItem('wetab_fish');
    if (fc) { try { this.fishCount = parseInt(fc,10)||0; } catch (e) {} }
    var cc = localStorage.getItem('wetab_custom_categories');
    if (cc) { try { this.customCategories = JSON.parse(cc); } catch (e) {} }
    var cl = localStorage.getItem('wetab_custom_lists');
    if (cl) { try { this.customLists = JSON.parse(cl); } catch (e) {} }
    /* 加载统一卡片顺序（使用 $set 确保响应式） */
    var self2 = this;
    ['shenghuo','bangong'].forEach(function(catId) {
      var uo = localStorage.getItem('wetab_unified_order_' + catId);
      if (uo) { try { self2.$set(self2.unifiedOrders, catId, JSON.parse(uo)); } catch (e) {} }
    });
    if (this.customCategories) {
      this.customCategories.forEach(function(cat) {
        var uo = localStorage.getItem('wetab_unified_order_' + cat.id);
        if (uo) { try { self2.$set(self2.unifiedOrders, cat.id, JSON.parse(uo)); } catch (e) {} }
      });
    }

    /* 给API分配随机颜色 */
    var shuffled = this.apiColors.slice().sort(function() { return Math.random() - 0.5; });
    this.apiList.forEach(function(item, i) {
      item.lineColor = shuffled[i % shuffled.length];
    });

    /* 启动背景 */
    if (this.currentBgType === 'image' && this.currentBgUrl) {
      this.preloadBg(this.currentBgUrl);
    } else if (this.currentBgType === 'video' && this.currentBgUrl) {
      var self = this;
      setTimeout(function(){ if(!self.bgLoaded) self.bgLoaded = true; }, 5000);
    } else if (this.currentBgType === 'random') {
      var bg = this.bgLibrary[this.currentBgIdx];
      if (bg) {
        var n = Math.floor(Math.random() * bg.count) + 1;
        this.currentBgUrl = bg.baseUrl + n + bg.ext;
        this.currentBgType = 'image';
        this.preloadBg(this.currentBgUrl);
      }
    }
    /* video类型由浏览器自动加载 */

    /* 延迟加载 favicon（不阻塞首屏） */
    setTimeout(function() {
      self.addFavicons(self.listShengHuo);
      self.addFavicons(self.listBanGong);
      for (var key in self.customLists) { self.addFavicons(self.customLists[key]); }
    }, 300);

    /* 默认 Dock */
    if (this.dockItems.length === 0) {
      this.dockItems = [
        {name:'微信', url:'https://weixin.qq.com/', imgSrc:''},
        {name:'淘宝', url:'https://taobao.com', imgSrc:''},
        {name:'京东', url:'https://jd.com', imgSrc:''},
        {name:'哔哩哔哩', url:'https://bilibili.com', imgSrc:''},
        {name:'抖音', url:'https://Douyin.com', imgSrc:''}
      ];
      this.addFavicons(this.dockItems);
    }

    /* 时钟更新 */
    this.updateTime();
    this.timeInt = setInterval(function() { self.updateTime(); }, 1000);

    /* 天气加载 */
    this.loadWeather();
    setInterval(function() { self.loadWeather(); }, 600000);

    /* 全局滚轮切换分类监听 */
    window.addEventListener('wheel', function(e) { self.onCatFlipWheel(e); }, {passive: false});

    /* ===== 原生右键菜单 ===== */
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.native-ctx-menu')) { removeCtxMenu(); }
    }, true);

    function handleCtx(e) {
      removeCtxMenu();

      /* 弹窗/设置面板内不拦截 */
      if (e.target.closest('.modal') || e.target.closest('.settings-panel')) return;
      /* 搜索框内不拦截 */
      if (e.target.closest('.search-box') || e.target.closest('.eng-menu') || e.target.closest('.search-suggestions')) return;
      /* 登录弹窗内不拦截 */
      if (e.target.closest('.login-overlay')) return;

      var loggedIn = self.isLoggedIn;

      /* 网址图标右键 */
      var card = e.target.closest('.site-card');
      if (card) {
        e.preventDefault();
        var idx = parseInt(card.dataset.idx);
        var item = self.activeCategoryList[idx];
        if (!item) return;
        /* 文件夹右键 */
        if (item.type === 'folder') {
          if (loggedIn) {
            createCtxMenu(e.clientX, e.clientY, [
              {label: '打开文件夹', action: function() { self.openFolder(idx); }},
              {label: '重命名', action: function() { self.renameFolder(idx); }},
              {divider: true},
              {label: '删除文件夹', danger: true, action: function() { self.deleteFolder(idx); }}
            ]);
          } else {
            createCtxMenu(e.clientX, e.clientY, [
              {label: '打开文件夹', action: function() { self.openFolder(idx); }}
            ]);
          }
          return;
        }
        /* 普通图标右键 */
        if (loggedIn) {
          createCtxMenu(e.clientX, e.clientY, [
            {label: '打开网站', action: function() { self.openUrl(item.url); }},
            {label: '复制链接', action: function() { self.copyText(item.url); }},
            {label: '添加到Dock', action: function() { self.addToDock(item); }},
            {divider: true},
            {label: '编辑', action: function() { self.editSiteFromCtx(idx); }},
            {label: '删除', danger: true, action: function() { self.deleteSiteFromCtx(idx); }},
            {divider: true},
            {label: '新建文件夹', action: function() { self.createFolderDialog(); }}
          ]);
        } else {
          createCtxMenu(e.clientX, e.clientY, [
            {label: '打开网站', action: function() { self.openUrl(item.url); }},
            {label: '复制链接', action: function() { self.copyText(item.url); }}
          ]);
        }
        return;
      }

      /* Dock 图标右键 */
      var dockEl = e.target.closest('.dock-item');
      if (dockEl) {
        e.preventDefault();
        var dIdx = parseInt(dockEl.dataset.idx);
        if (loggedIn) {
          createCtxMenu(e.clientX, e.clientY, [
            {label: '从Dock移除', danger: true, action: function() { self.removeFromDock(dIdx); }}
          ]);
        }
        return;
      }

      /* Dock 背景右键：阻止默认，不显示菜单 */
      if (e.target.closest('.dock')) {
        e.preventDefault();
        return;
      }

      /* 分类图标右键 */
      var catBtn = e.target.closest('.sb-cat');
      if (catBtn) {
        var catId = catBtn.dataset.catId;
        e.preventDefault();
        if (loggedIn) {
          createCtxMenu(e.clientX, e.clientY, [
            {label: '编辑', action: function() { self.editCategory(catId); }},
            {label: '删除', danger: true, action: function() { self.deleteCategory(catId); }}
          ]);
        }
        return;
      }

      /* 影视接口按钮右键 */
      var filmBtn = e.target.closest('[data-film-btn]');
      if (filmBtn) {
        e.preventDefault();
        if (loggedIn) {
          createCtxMenu(e.clientX, e.clientY, [
            {label: '编辑', action: function() { self.editCategory(catId); }},
            {label: '删除', danger: true, action: function() { self.deleteCategory(catId); }}
          ]);
        }
        return;
      }

      /* 空白区域右键（首页视图，排除侧边栏/小组件/Dock） */
      if (self.currentView === 'home'
          && !e.target.closest('.sidebar')
          && !e.target.closest('.widget')
          && !e.target.closest('.api-item')) {
        e.preventDefault();
        if (loggedIn) {
          createCtxMenu(e.clientX, e.clientY, [
            {label: '添加图标', action: function() { self.ctxAddSite(); }},
            {label: '新建文件夹', action: function() { self.createFolderDialog(); }},
            {label: '添加组件', action: function() { createWidgetPicker(); }},
            {divider: true},
            {label: '随机壁纸', action: function() { self.ctxRandomBg(); }},
            {label: '下载壁纸', action: function() { self.ctxDownloadBg(); }},
            {divider: true},
            {label: '编辑主页', action: function() { self.ctxEditHome(); }},
            {label: '搜索图标', action: function() { self.ctxSearchIcon(); }}
          ]);
        } else {
          createCtxMenu(e.clientX, e.clientY, [
            {label: '随机壁纸', action: function() { self.ctxRandomBg(); }},
            {label: '下载壁纸', action: function() { self.ctxDownloadBg(); }}
          ]);
        }
        return;
      }

      /* 侧边栏区域：阻止默认浏览器菜单，不显示自定义菜单 */
      if (e.target.closest('.sidebar')) {
        e.preventDefault();
        return;
      }
    }

    /* 同时用 addEventListener + capture 和 oncontextmenu 双重注册，兼容所有浏览器 */
    document.addEventListener('contextmenu', handleCtx, true);
    document.addEventListener('contextmenu', handleCtx, false);
  }
});
