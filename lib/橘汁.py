# -*- coding: utf-8 -*-
# 站点：ylys  host：https://www.ylys.tv
# 列表选择器(自动识别)：容器=a.module-poster-item  标题=&&title  封面=img&&data-original  链接=&&href
import re, sys, json
from urllib.parse import quote
sys.path.append('..')
from base.spider import Spider
from pyquery import PyQuery as pq

class Spider(Spider):
    def getName(self):
        return "ylys"

    def init(self, extend=""):
        self.host = "https://www.ylys.tv"
        self.skip_re = re.compile(r"/(mingxing|actor|star|yanyuan|user|member|tag|search|login|register|celebrity|people|author|topic|news|zixun|help|live)(/|$)")  # [A] 噪声路径过滤
        self.detail_re = re.compile(r"^/voddetail/")  # [A] 详情链接特征(自动识别)

    def isVideoFormat(self, url):
        return bool(url) and (url.endswith(".m3u8") or url.endswith(".mp4") or ".m3u8" in url)

    def manualVideoCheck(self):
        return False

    def destroy(self):
        pass

    def getheaders(self):
        return {
            "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/SKQ1.220303.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36",
            "Referer": self.host + "/",
        }

    # ---------- 分类（[A]自动；不对改 classes_config） ----------
    classes_config = [
    {"type_id": "1", "type_name": "电影"},
    {"type_id": "2", "type_name": "剧集"},
    {"type_id": "3", "type_name": "综艺"},
    {"type_id": "4", "type_name": "动漫"},
    ]

    # ---------- 列表字段解析（[A]自动；[M]取不到时改下面4个小函数） ----------
    # 列表项可能是 <a>(link-self) 或 <div> 内含 <a>（首页/分类常是 <a>，搜索结果常是 <div> 包裹 <a>）；
    # _card_of 统一返回承载「链接/封面/标题」的那个 <a>，使同一套解析函数兼容两种结构。
    def _card_of(self, it):
        if it.attr("href"): return it
        a = it.find("a").eq(0)
        return a if a.length else it
    def _title(self, it):
        a = self._card_of(it)
        t = (a.attr("title") or "").strip()
        if not t:
            sub = it.find(".module-card-item-title, .module-poster-item-title, .title, .name, h2, h3").eq(0)
            t = (sub.text() or it.text() or "").strip()
        return t
    def _pic(self, it):
        a = self._card_of(it)
        img = a.find("img").eq(0)
        src = ""
        if img.length:
            src = img.attr("data-original") or img.attr("data-src") or img.attr("src") or ""
        if not src:
            st = (it.attr("style") or a.attr("style") or "")
            m = re.search(r"url\(([^)]+)\)", st)
            if m: src = m.group(1)
        return src.strip()
    def _link(self, it):
        return (self._card_of(it).attr("href") or "").strip()
    def _remark(self, it):
        return ('').strip()
    def _bg_pic(self, el):
        src = el.attr("data-original") or el.attr("data-src")
        if src: return src
        style = el.attr("style") or ""
        m = re.search(r"url\(([^)]+)\)", style)
        return m.group(1).strip() if m else ""

    def _parse_list(self, html, container):
        doc = pq(html)
        out = []
        for it in doc(container).items():
            title = self._title(it)
            pic = self._pic(it)
            rid = self._link(it)
            if not rid:
                continue
            if self.skip_re.search(rid):
                continue
            if self.detail_re and not self.detail_re.search(rid if rid.startswith("/") else "/" + rid):
                continue
            if pic and pic.startswith("/"):
                pic = self.host + pic
            out.append({
                "vod_id": rid,
                "vod_name": title,
                "vod_pic": pic,
                "vod_remarks": self._remark(it)
            })
        return out

    def homeContent(self, filter):
        html = self.fetch(self.host + "/", headers=self.getheaders()).text
        return {"class": self.classes_config, "list": self._parse_list(html, "a.module-poster-item")}

    def homeVideoContent(self):
        html = self.fetch(self.host + "/", headers=self.getheaders()).text
        return {"list": self._parse_list(html, "a.module-poster-item")}

    def categoryContent(self, tid, pg, filter, extend):
        page = int(pg) if str(pg).isdigit() else 1
        tpl = "https://www.ylys.tv/vodtype/{cateId}-{catePg}/"
        url = tpl.format(cateId=tid, catePg=page)  # [M] 按真实分类URL模板改
        html = self.fetch(url, headers=self.getheaders()).text
        vlist = self._parse_list(html, "a.module-poster-item")
        return {"list": vlist, "page": page, "pagecount": 99, "limit": 20, "total": 9999}

    def searchContent(self, key, quick, pg="1"):
        tpl = "https://www.ylys.tv/vodsearch/-------------/?wd={wd}"
        url = tpl.format(wd=quote(key), page=pg)  # [M] 按真实搜索URL改
        html = self.fetch(url, headers=self.getheaders()).text
        return {"list": self._parse_list(html, ".module-card-item"), "page": pg}

    def detailContent(self, ids):
        vod_id = ids[0]
        url = self.host + (vod_id if vod_id.startswith("/") else "/" + vod_id)
        html = self.fetch(url, headers=self.getheaders()).text
        # [M] 下面按真实详情页改：片名/封面/选集
        doc = pq(html)
        name_m = re.search(r"<h1[^>]*>(.*?)</h1>", html, re.S)
        vod_name = re.sub(r"<.*?>", "", name_m.group(1)).strip() if name_m else (doc("h1").text() or "未知")
        pic_m = re.search(r'data-original="([^"]+)"', html) or re.search(r'<img[^>]+src="([^"]+)"', html)
        vod_pic = pic_m.group(1) if pic_m else ""
        if vod_pic.startswith("/"): vod_pic = self.host + vod_pic
        froms, urls = [], []
        # [A] MacCMS/自研模板：线路 tab(.module-tab-item[data-dropdown-value]) + 选集面板(.module-play-list)
        mTabs = doc(".module-tab-item[data-dropdown-value]")
        mBlocks = doc(".module-play-list")
        if mBlocks:
            for bi in range(len(mBlocks)):
                blk = mBlocks.eq(bi)
                raw_name = (mTabs.eq(bi).attr("data-dropdown-value") or mTabs.eq(bi).text() or "").strip() or ("线路" + str(bi + 1))
                name = self.LINE_RENAME.get(raw_name, raw_name)  # [A] 线路名重映射（工具「py 线路名替换」注入）
                eps = []
                for a in blk("a.module-play-list-link").items():
                    t = (a.text() or a.attr("title") or "").strip() or ("第" + str(len(eps) + 1) + "集")
                    h = a.attr("href") or ""
                    if not h: continue
                    if h.startswith("/"): h = self.host + h
                    eps.append(t + "$" + h)
                if eps:
                    froms.append(name); urls.append("#".join(eps))
        if not froms:
            # [M] STUI/苹果CMS 等：con_playlist_ / stui-content__playlist
            blocks = doc('[id^="con_playlist_"], .stui-content__playlist')
            for blk in blocks.items():
                eps = []
                for a in blk("a").items():
                    t = a.text().strip() or ("第" + str(len(eps) + 1) + "集")
                    h = a.attr("href") or ""
                    if not h: continue
                    if h.startswith("/"): h = self.host + h
                    eps.append(t + "$" + h)
                if eps:
                    _n = "线路" + str(len(froms) + 1)
                    froms.append(self.LINE_RENAME.get(_n, _n)); urls.append("#".join(eps))  # [M] 也走重映射
        if not froms:
            froms, urls = ["默认线路"], [""]
        return {"list": [{"vod_id": vod_id, "vod_name": vod_name, "vod_pic": vod_pic,
            "vod_play_from": "$$$".join(froms), "vod_play_url": "$$$".join(urls)}]}

    def playerContent(self, flag, id, vipFlags):
        # [M] 按真实播放页改：取 m3u8
        if id.startswith("/"): id = self.host + id
        html = self.fetch(id, headers=self.getheaders()).text
        html = html.replace("\\/", "/")
        m3u8_m = re.search(r'https?://[^"\'<>\s]+?\.m3u8', html)
        if m3u8_m:
            return {"parse": 0, "url": m3u8_m.group(0), "header": self.getheaders()}
        jm = re.search(r'"url"\s*:\s*"([^"]+)"', html)
        if jm:
            u = jm.group(1).replace("\\/", "/")
            if ".m3u8" in u or ".mp4" in u:
                return {"parse": 0, "url": u, "header": self.getheaders()}
        return {"parse": 1, "url": id, "header": self.getheaders()}