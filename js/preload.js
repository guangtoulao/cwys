/* 尽早预加载壁纸（在 Vue 初始化之前，让浏览器尽早开始下载） */
(function(){
  try {
    var s = localStorage.getItem('wetab_settings');
    if (s) {
      var j = JSON.parse(s);
      if (j.bgUrl && j.bgUrl.indexOf('.mp4') === -1 && j.bgUrl.indexOf('.webm') === -1) {
        var lk = document.createElement('link');
        lk.rel = 'preload';
        lk.as = 'image';
        lk.href = j.bgUrl;
        document.head.appendChild(lk);
      }
    }
  } catch(e) {}
})();

/* 尽早预加载壁纸图片，利用浏览器缓存 */
(function(){
  try {
    var s = localStorage.getItem('wetab_settings');
    if (s) {
      var j = JSON.parse(s);
      if (j.bgUrl && j.bgUrl.indexOf('.mp4') === -1 && j.bgUrl.indexOf('.webm') === -1) {
        var img = new Image();
        img.src = j.bgUrl;
        if (img.complete) window.__bgReady = true;
        else img.onload = function() { window.__bgReady = true; };
      }
    }
  } catch(e) {}
})();
