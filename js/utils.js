/* ===== 原生DOM右键菜单工具函数 ===== */
function removeCtxMenu() {
  var el = document.querySelector('.native-ctx-menu');
  if (el) el.remove();
}
function removeWidgetPicker() {
  document.querySelectorAll('.widget-picker,.widget-picker-overlay').forEach(function(el) { el.remove(); });
}
function createWidgetPicker() {
  removeWidgetPicker();
  var app = document.querySelector('#app').__vue__;
  var wv = app.widgetVisible;
  var widgets = [
    {key:'note', icon:'', name:'笔记'},
    {key:'todo', icon:'', name:'待办事项'},
    {key:'countdown', icon:'', name:'倒计时'},
    {key:'calendar', icon:'', name:'日历'},
    {key:'weather', icon:'', name:'天气'},
    {key:'hot', icon:'', name:'热搜榜'},
    {key:'fish', icon:'', name:'电子木鱼'}
  ];
  var overlay = document.createElement('div');
  overlay.className = 'widget-picker-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.4);z-index:1000';
  overlay.onclick = function(e) { if (e.target === overlay) removeWidgetPicker(); };
  document.body.appendChild(overlay);

  var panel = document.createElement('div');
  panel.className = 'widget-picker';
  panel.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(24,24,42,.96);backdrop-filter:blur(24px);border-radius:20px;padding:24px;z-index:1001;border:1px solid rgba(255,255,255,.08);min-width:280px';
  var title = document.createElement('div');
  title.style.cssText = 'font-size:16px;color:#fff;margin-bottom:16px;font-weight:600';
  title.textContent = '管理小组件';
  panel.appendChild(title);

  widgets.forEach(function(w) {
    var label = document.createElement('label');
    label.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 8px;border-radius:10px;cursor:pointer;transition:background .15s;font-size:14px;color:rgba(255,255,255,.85)';
    label.onmouseover = function() { this.style.background = 'rgba(255,255,255,.08)'; };
    label.onmouseout = function() { this.style.background = 'transparent'; };
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.dataset.wkey = w.key;
    cb.checked = !!wv[w.key];
    cb.style.cssText = 'width:18px;height:18px;cursor:pointer;accent-color:#5D6FFB';
    var span = document.createElement('span');
    span.textContent = w.icon + ' ' + w.name;
    label.appendChild(cb);
    label.appendChild(span);
    panel.appendChild(label);
  });

  var btnWrap = document.createElement('div');
  btnWrap.style.cssText = 'margin-top:16px;text-align:right';
  var closeBtn = document.createElement('button');
  closeBtn.style.cssText = 'padding:8px 24px;border-radius:12px;border:none;background:rgba(93,111,251,.85);color:#fff;cursor:pointer;font-size:13px';
  closeBtn.textContent = '完成';
  closeBtn.onclick = function() {
    var checks = panel.querySelectorAll('input[type=checkbox]');
    checks.forEach(function(c) { app.$set(app.widgetVisible, c.dataset.wkey, c.checked); });
    localStorage.setItem('wetab_widgets', JSON.stringify(app.widgetVisible));
    removeWidgetPicker();
  };
  btnWrap.appendChild(closeBtn);
  panel.appendChild(btnWrap);
  document.body.appendChild(panel);
}

function createCtxMenu(x, y, items) {
  removeCtxMenu();
  var menu = document.createElement('div');
  menu.className = 'native-ctx-menu';
  menu.style.left = x + 'px';
  menu.style.top = y + 'px';
  items.forEach(function(item) {
    if (item.divider) {
      var d = document.createElement('div');
      d.className = 'ctx-divider';
      menu.appendChild(d);
    } else {
      var d = document.createElement('div');
      d.className = 'ctx-item' + (item.danger ? ' danger' : '');
      d.textContent = item.label;
      (function(action) {
        d.onclick = function(ev) {
          ev.stopPropagation();
          removeCtxMenu();
          if (action) action();
        };
      })(item.action);
      menu.appendChild(d);
    }
  });
  document.body.appendChild(menu);
  var rect = menu.getBoundingClientRect();
  if (rect.right > window.innerWidth - 10) {
    menu.style.left = (window.innerWidth - rect.width - 10) + 'px';
  }
  if (rect.bottom > window.innerHeight - 10) {
    menu.style.top = (window.innerHeight - rect.height - 10) + 'px';
  }
}
