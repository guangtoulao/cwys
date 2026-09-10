#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# ============================================================
# TVBox Python 爬虫 · 半日 (App99 / 半日闲)
# 协议：AES-CBC(uuid 32字节密钥) + sha256 签名 + zlib 响应
# 接口：POST <host>/app/systemInit  /vod/search  /vod/detail  /app/vodParser
# 已实测：首页 / 8 分类（含直播）/ 搜索 / 详情 / 播放 全链路通过
# 线路名：见下方 LINE_PREFIX，改成你想要的即可（默认 半日①②③...）
# ============================================================
import sys
import json, os, re, time, zlib, base64, hashlib, uuid as _uuid
import urllib.request, urllib.parse

try:
    from base.spider import Spider as _BaseSpider
except Exception:
    _BaseSpider = object

# ============ 默认配置（可被 api.json 的 ext 覆盖）============
DEFAULT_HOST        = "http://103.217.190.91:19987/app/bn"
DEFAULT_VERSION     = "3.5.8"
DEFAULT_NAME        = "半日闲"
DEFAULT_PACKAGE     = "com.yf.lelian"
DEFAULT_BUILD_NO    = "2001"
DEFAULT_BUILD_SIG   = "A40DA80A59D170CAA950CF15C18C454D47A39B26989D8B640ECD745BA71BF5DC"
UA = ("Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/151.0.0.0 Mobile Safari/537.36")
HEAD = {"User-Agent": UA}

# ============ 线路名自定义（想换名字改这里）============
# 方式一（默认）：前缀 + 带圈数字
LINE_PREFIX   = "半日"           # ← 改成你想要的线路名前缀
LINE_NUMBERED = True            # True=前缀+序号；False=用下面映射表
CIRCLED = "①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳"
# 方式二：按站方源名映射（LINE_NUMBERED=False 时生效）
LINE_NAMES = {}

# ============ 加密后端（三级降级）============
_BACKEND = None
try:
    from Crypto.Cipher import AES as _PAES
    _BACKEND = "pycryptodome"
except Exception:
    try:
        from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
        _BACKEND = "cryptography"
    except Exception:
        _BACKEND = "pure"

# ---------- 纯 Python AES (仅当无库时) ----------
if _BACKEND == "pure":
    _SBOX = None
    def _init_sbox():
        global _SBOX, _INV_SBOX, _MUL2, _MUL3, _MUL9, _MUL11, _MUL13, _MUL14
        if _SBOX is not None: return
        p = q = 1
        sb = [0]*256
        while True:
            p = (p ^ ((p << 1) & 0xFF) ^ (0x1B if p & 0x80 else 0))
            q ^= q << 1; q ^= q << 2; q ^= q << 4
            q &= 0xFF
            if q & 0x80: q ^= 0x09
            x = q ^ ((q << 1) | (q >> 7)) ^ ((q << 2) | (q >> 6)) ^ ((q << 3) | (q >> 5)) ^ ((q << 4) | (q >> 4))
            sb[p] = x & 0xFF ^ 0x63
            if p == 1: break
        sb[0] = 0x63
        _SBOX = sb
        _INV_SBOX = [0]*256
        for i in range(256): _INV_SBOX[sb[i]] = i
        def xt(a):
            a <<= 1
            return (a ^ 0x1B) & 0xFF if a & 0x100 else a
        _MUL2 = [xt(i) for i in range(256)]
        _MUL3 = [_MUL2[i] ^ i for i in range(256)]
        _MUL9 = [0]*256; _MUL11 = [0]*256; _MUL13 = [0]*256; _MUL14 = [0]*256
        for i in range(256):
            m2 = _MUL2[i]; m4 = _MUL2[m2]; m8 = _MUL2[m4]
            _MUL9[i] = m8 ^ i; _MUL11[i] = m8 ^ m2 ^ i
            _MUL13[i] = m8 ^ m4 ^ i; _MUL14[i] = m8 ^ m4 ^ m2

    def _xtime(a):
        a <<= 1
        return (a ^ 0x1B) & 0xFF if a & 0x100 else a
    _RCON = [0x01,0x02,0x04,0x08,0x10,0x20,0x40,0x80,0x1B,0x36,0x6C,0xD8,0xAB,0x4D]
    def _aes256_key_expand(key):
        _init_sbox()
        w = [list(key[i*4:i*4+4]) for i in range(8)]
        for i in range(8, 60):
            t = list(w[i-1])
            if i % 8 == 0:
                t = t[1:] + t[:1]
                t = [_SBOX[b] for b in t]
                t[0] ^= _RCON[i//8-1]
            elif i % 8 == 4:
                t = [_SBOX[b] for b in t]
            w.append([w[i-8][j] ^ t[j] for j in range(4)])
        return w
    def _aes_encrypt_block(w, block):
        s = [[block[r + 4*c] for c in range(4)] for r in range(4)]
        def add_round_key(rnd):
            for c in range(4):
                for r in range(4): s[r][c] ^= w[rnd*4 + c][r]
        def sub_shift():
            for r in range(4):
                row = [_SBOX[s[r][(c + r) % 4]] for c in range(4)]
                for c in range(4): s[r][c] = row[c]
        def mix():
            for c in range(4):
                a = [s[r][c] for r in range(4)]
                s[0][c] = _MUL2[a[0]] ^ _MUL3[a[1]] ^ a[2] ^ a[3]
                s[1][c] = a[0] ^ _MUL2[a[1]] ^ _MUL3[a[2]] ^ a[3]
                s[2][c] = a[0] ^ a[1] ^ _MUL2[a[2]] ^ _MUL3[a[3]]
                s[3][c] = _MUL3[a[0]] ^ a[1] ^ a[2] ^ _MUL2[a[3]]
        nr = len(w)//4 - 1
        add_round_key(0)
        for rnd in range(1, nr):
            sub_shift(); mix(); add_round_key(rnd)
        sub_shift(); add_round_key(nr)
        out = bytearray(16)
        for c in range(4):
            for r in range(4): out[r + 4*c] = s[r][c]
        return bytes(out)
    def _aes_ecb_encrypt(w, data):
        return b"".join(_aes_encrypt_block(w, data[i:i+16]) for i in range(0, len(data), 16))
    def _cbc_encrypt(key, iv, data):
        w = _aes256_key_expand(key)
        data = data + bytes([16 - len(data) % 16]) * (16 - len(data) % 16)
        out = bytearray(); prev = iv
        for i in range(0, len(data), 16):
            blk = bytes(a ^ b for a, b in zip(data[i:i+16], prev))
            prev = _aes_ecb_encrypt(w, blk)
            out += prev
        return bytes(out)
    def _aes_ecb_decrypt(w, data):
        s = [[data[r + 4*c] for c in range(4)] for r in range(4)]
        nr = len(w)//4 - 1
        inv_sbox = _INV_SBOX
        def inv_shift():
            for r in range(4):
                row = [s[r][(c - r) % 4] for c in range(4)]
                for c in range(4): s[r][c] = row[c]
        def add_rk(rnd):
            for c in range(4):
                for r in range(4): s[r][c] ^= w[rnd*4 + c][r]
        def inv_sub():
            for r in range(4):
                for c in range(4): s[r][c] = inv_sbox[s[r][c]]
        def inv_mix():
            for c in range(4):
                a = [s[r][c] for r in range(4)]
                s[0][c] = _MUL14[a[0]] ^ _MUL11[a[1]] ^ _MUL13[a[2]] ^ _MUL9[a[3]]
                s[1][c] = _MUL9[a[0]] ^ _MUL14[a[1]] ^ _MUL11[a[2]] ^ _MUL13[a[3]]
                s[2][c] = _MUL13[a[0]] ^ _MUL9[a[1]] ^ _MUL14[a[2]] ^ _MUL11[a[3]]
                s[3][c] = _MUL11[a[0]] ^ _MUL13[a[1]] ^ _MUL9[a[2]] ^ _MUL14[a[3]]
        add_rk(nr)
        for rnd in range(nr-1, 0, -1):
            inv_shift(); inv_sub(); add_rk(rnd); inv_mix()
        inv_shift(); inv_sub(); add_rk(0)
        out = bytearray(16)
        for c in range(4):
            for r in range(4): out[r + 4*c] = s[r][c]
        return bytes(out)
    def _cbc_decrypt(key, iv, data):
        _init_sbox()
        w = _aes256_key_expand(key)
        out = bytearray(); prev = iv
        for i in range(0, len(data), 16):
            blk = data[i:i+16]
            out += bytes(a ^ b for a, b in zip(_aes_ecb_decrypt(w, blk), prev))
            prev = blk
        return bytes(out)

# ---------- 统一加密接口 ----------
def aes_cbc_encrypt(key, iv, data):
    if _BACKEND == "pycryptodome":
        return _PAES.new(key, _PAES.MODE_CBC, iv).encrypt(
            data + bytes([16 - len(data) % 16]) * (16 - len(data) % 16))
    if _BACKEND == "cryptography":
        enc = Cipher(algorithms.AES(key), modes.CBC(iv)).encryptor()
        pad = 16 - len(data) % 16
        return enc.update(data + bytes([pad])*pad) + enc.finalize()
    return _cbc_encrypt(key, iv, data)

def aes_cbc_decrypt(key, iv, data):
    if _BACKEND == "pycryptodome":
        return _PAES.new(key, _PAES.MODE_CBC, iv).decrypt(data)
    if _BACKEND == "cryptography":
        dec = Cipher(algorithms.AES(key), modes.CBC(iv)).decryptor()
        return dec.update(data) + dec.finalize()
    return _cbc_decrypt(key, iv, data)

def pkcs7_unpad(d):
    return d[:-d[-1]] if d and 1 <= d[-1] <= 16 else d

def _inflate(raw):
    try:
        return zlib.decompress(raw)
    except Exception:
        try:
            return zlib.decompressobj(-15).decompress(raw)
        except Exception:
            return raw

# ============================================================
# 协议客户端
# ============================================================
class App99Client:
    def __init__(self, host, version, name, package, build_no, build_sig):
        self.host = host.rstrip("/")
        self.v = version
        self.n = name
        self.pkg = package
        self.build_no = build_no
        self.build_sig = build_sig
        self.uuid = str(_uuid.uuid4())
        self.key = self.uuid.replace("-", "").encode()   # 32 字节 AES-256
        self.token = ""
        self.player = {}      # code -> 配置 {type, parseUrl, source_name ...}
        self.parses = []      # 解析接口列表
        self.categories = []  # 分类
        self.line_order = []   # 线路显示名顺序（与 play_from 对应）
        self.line_map = {}     # 显示名 -> 原 code
        self.code_to_name = {} # 原 code -> 显示名
        self._ready = False

    # ---------- 加解密 ----------
    def _enc(self, body):
        iv = os.urandom(16)
        ct = aes_cbc_encrypt(self.key, iv, body.encode("utf-8"))
        return base64.b64encode(iv + ct).decode()

    def _dec(self, b64text):
        raw = base64.b64decode(b64text)
        pt = pkcs7_unpad(aes_cbc_decrypt(self.key, raw[:16], raw[16:]))
        return _inflate(pt).decode("utf-8", "replace")

    def _sign(self, body_enc, ts, nonce, token):
        return hashlib.sha256(
            ("%s:%s:%s:%s" % (body_enc, ts, nonce, token)).encode("utf-8")).hexdigest()

    def _post(self, path, obj, token=None):
        token = self.token if token is None else token
        body = json.dumps(obj, separators=(",", ":"), ensure_ascii=False)
        nonce = base64.b64encode(os.urandom(16)).decode()
        ts = str(int(time.time() * 1000))
        be = self._enc(body)
        headers = {
            "User-Agent": UA,
            "Accept": "application/json",
            "Content-Type": "application/json",
            "client_type": "android",
            "uuid": self.uuid,
            "timestamp": ts,
            "sign": self._sign(be, ts, nonce, token),
            "nonce": nonce,
            "version": self.v,
            "api_version": "v1",
        }
        req = urllib.request.Request(self.host + path, data=be.encode(),
                                    headers=headers, method="POST")
        ctx = None
        try:
            import ssl
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
        except Exception:
            ctx = None
        with urllib.request.urlopen(req, timeout=15, context=ctx) as r:
            return self._dec(r.read().decode("utf-8", "replace"))

    # ---------- 握手 ----------
    def ensure(self):
        if self._ready:
            return True
        try:
            if not self._systemInit():
                return False
            self._userInfo()
            self._build_lines()
            self._ready = True
            return True
        except Exception as e:
            self._ready = False
            return False

    def _systemInit(self):
        ts = str(int(time.time() * 1000))
        nonce = base64.b64encode(os.urandom(16)).decode()
        obj = {"v": self.v, "n": self.n, "s": self.build_sig, "pl": "1",
               "apiVersion": "v2", "token": "", "timestamp": ts, "nonce": nonce}
        txt = self._post("/app/systemInit", obj, token="")
        j = json.loads(txt)
        self.player = j.get("player") or {}
        self.parses = j.get("parser_api") or []
        cats = j.get("categorys") or {}
        self.categories = cats.get("data") or [] if isinstance(cats, dict) else (cats or [])
        return j.get("code", -1) == 0

    def _userInfo(self):
        ts_ms = int(time.time() * 1000)
        obj = {
            "os": "android", "name": "xiaomi", "version": "15", "sdkInt": 32,
            "device": "xiaomi", "brand": "xiaomi", "manufacturer": "xiaomi",
            "product": "b0q", "hardware": "xiaomi", "isPhysicalDevice": True,
            "androidId": "V417IR", "bootloader": "unknown",
            "display": "V417IR release-keys", "host": "a11-gz01-test",
            "tags": "release-keys", "type": "user",
            "finger": "xiaomi/b0q/b0q:15/V619IR/613:user/release-keys",
            "app": {"version": self.v, "name": self.n, "package": self.pkg,
                    "buildNumber": self.build_no, "buildSignature": self.build_sig,
                    "install": ts_ms, "update": ts_ms},
            "did": str(_uuid.uuid4()), "apiVersion": "v2", "channel": "",
            "token": "", "timestamp": str(ts_ms),
            "nonce": base64.b64encode(os.urandom(16)).decode(),
        }
        try:
            j = json.loads(self._post("/app/userInfo", obj, token=""))
            ui = j.get("userInfo") or {}
            self.token = ui.get("user_token") or ""
        except Exception:
            pass
        return True

    def _build_lines(self):
        # 按 player 配置生成线路显示名（前缀+带圈数字 或 源名映射）
        codes = list(self.player.keys())
        self.line_order = []
        self.line_map = {}      # 显示名 -> 原 code
        self.code_to_name = {}  # 原 code -> 显示名
        for i, code in enumerate(codes):
            if LINE_NUMBERED:
                rn = LINE_PREFIX + (CIRCLED[i] if i < len(CIRCLED) else str(i + 1))
            else:
                rn = LINE_NAMES.get(code, code)
            # 去重
            if rn in self.line_map:
                rn = rn + "②"
            self.line_order.append(rn)
            self.line_map[rn] = code
            self.code_to_name[code] = rn
        return

    # ---------- 业务请求 ----------
    def home_list(self):
        ts = str(int(time.time() * 1000))
        nonce = base64.b64encode(os.urandom(16)).decode()
        obj = {"kw": "", "page": 1, "limit": 21, "pid": 1, "isCategory": 1,
               "orderBy": "time", "token": self.token, "timestamp": ts, "nonce": nonce}
        return self._list(json.loads(self._post("/vod/search", obj)))

    def category_list(self, pid, page, order="time", year=""):
        ts = str(int(time.time() * 1000))
        nonce = base64.b64encode(os.urandom(16)).decode()
        obj = {"kw": "", "page": int(page), "limit": 21, "pid": int(pid),
               "isCategory": 1, "orderBy": order, "token": self.token,
               "timestamp": ts, "nonce": nonce}
        if year:
            obj["year"] = year
        return self._list(json.loads(self._post("/vod/search", obj)), page)

    def search_list(self, key, page):
        ts = str(int(time.time() * 1000))
        nonce = base64.b64encode(os.urandom(16)).decode()
        obj = {"kw": key, "page": int(page), "limit": 21,
               "orderBy": "vod_hits_month", "sort": "desc",
               "token": self.token, "timestamp": ts, "nonce": nonce}
        return self._list(json.loads(self._post("/vod/search", obj)), page)

    def _list(self, j, page=1):
        data = j.get("data") or []
        items = []
        for it in data:
            items.append({
                "vod_id": str(it.get("id", "")),
                "vod_name": it.get("name") or it.get("vod_name") or "",
                "vod_pic": it.get("pic") or it.get("vod_pic") or "",
                "vod_remark": it.get("remarks") or it.get("vod_remark") or "",
            })
        total = j.get("page_count") or 0
        pagecount = total if total else (page + 1 if len(items) >= 10 else page)
        return {"list": items, "page": page, "pagecount": pagecount,
                "limit": max(len(items), 12), "total": len(items)}

    def detail(self, vid):
        ts = str(int(time.time() * 1000))
        nonce = base64.b64encode(os.urandom(16)).decode()
        obj = {"id": str(vid), "eps": "1", "v": "2.0.0", "pl": "1",
               "token": self.token, "timestamp": ts, "nonce": nonce}
        j = json.loads(self._post("/vod/detail", obj))
        data = j.get("data") or {}
        det = data.get("list")[0] if isinstance(data.get("list"), list) else data
        if isinstance(det, list): det = det[0]
        vod = {
            "vod_id": str(vid),
            "vod_name": det.get("name") or "",
            "vod_pic": det.get("pic") or "",
            "vod_actor": det.get("actor") or "",
            "vod_director": det.get("director") or "",
            "vod_area": det.get("area") or "",
            "vod_year": det.get("year") or "",
            "vod_content": det.get("content") or "",
            "vod_remarks": det.get("remarks") or "",
            "type_name": det.get("class") or "",
        }
        pf = str(det.get("play_from") or "").split("$$$")
        pu = str(det.get("play_url") or "").split("$$$")
        vodname = vod["vod_name"]
        flags, urls = [], []
        for i, line in enumerate(pu):
            code = pf[i] if i < len(pf) else ""
            rn = self.code_to_name.get(code, code)  # 显示名；若 unknown 用原 code
            if not rn:
                rn = code
            entries = []
            for ep in line.split("#"):
                m = re.match(r"^\s*(\D*?)(\d*)\$(.+)$", ep)
                if not m:
                    # 兜底：整段当 url
                    entries.append("%s$%s@%s@%s@1" % ("1", ep, code, vodname))
                    continue
                epnum = m.group(2) or "1"
                url = m.group(3)
                # <epnum>$<url>@<code>@<name>@<epnum>
                entries.append("%s$%s@%s@%s@%s" % (epnum, url, code, vodname, epnum))
            if entries:
                flags.append(rn)
                urls.append("#".join(entries))
        if flags:
            vod["vod_play_from"] = "$$$".join(flags)
            vod["vod_play_url"] = "$$$".join(urls)
        return {"list": [vod]}

    def parse(self, id_field):
        """id_field = <url>@<code>@<name>@<epnum> 来自 play_url"""
        parts = id_field.split("@")
        if len(parts) < 2:
            if id_field.startswith("http"):
                is_m3u8 = ".m3u8" in id_field
                return {"parse": 0 if is_m3u8 else 1, "url": id_field, "header": HEAD}
            return {"parse": 0, "url": "", "header": HEAD}
        url = parts[0]
        code = parts[1]
        pconf = self.player.get(code, {})
        ptype = pconf.get("type", 0)
        if ptype == 0:
            # 直链线路（直播等）：原样返回，交给播放器
            return {"parse": 0, "url": url, "header": HEAD}
        parse_ids = [int(x) for x in str(pconf.get("parseUrl", "")).split(",") if x.strip().isdigit()]
        if not parse_ids:
            return {"parse": 0, "url": url, "header": HEAD}
        for pid in parse_ids:
            try:
                ts = str(int(time.time() * 1000))
                nonce = base64.b64encode(os.urandom(16)).decode()
                body = {"id": int(pid), "url": url, "token": self.token,
                        "timestamp": ts, "nonce": nonce}
                r = self._post("/app/vodParser", body)
                jr = json.loads(r)
                data = jr.get("data", "")
                if isinstance(data, str) and data.startswith("http"):
                    return {"parse": 0, "url": data, "header": HEAD}
            except Exception:
                continue
        return {"parse": 0, "url": "", "header": HEAD}


# ============================================================
# TVBox 爬虫接口
# ============================================================
_CLIENT = None

def _get(extend=""):
    global _CLIENT
    if _CLIENT is None:
        # 优先用 ext 覆盖默认配置
        cfg = {}
        if extend:
            try:
                cfg = json.loads(extend)
            except Exception:
                cfg = {}
        host = cfg.get("host", DEFAULT_HOST)
        _CLIENT = App99Client(
            host,
            cfg.get("versionName", DEFAULT_VERSION),
            cfg.get("name", DEFAULT_NAME),
            cfg.get("package", DEFAULT_PACKAGE),
            cfg.get("buildNumber", DEFAULT_BUILD_NO),
            cfg.get("buildSignature", DEFAULT_BUILD_SIG),
        )
    if not _CLIENT.ensure():
        # 重试一次（换 uuid）
        _CLIENT = App99Client(
            _CLIENT.host, _CLIENT.v, _CLIENT.n, _CLIENT.pkg,
            _CLIENT.build_no, _CLIENT.build_sig)
        _CLIENT.ensure()
    return _CLIENT


class Spider(_BaseSpider):
    def getName(self):
        return "半日"

    def init(self, extend=""):
        _get(extend)

    def isVideoFormat(self, url):
        return False

    def manualVideoCheck(self):
        return False

    # ---------- 首页 ----------
    def homeContent(self, filter):
        c = _get()
        classes = [{"type_id": str(x.get("id")), "type_name": x.get("name")}
                   for x in c.categories]
        # 备注：直播分类已随 API 一并返回（含 id=23 直播）
        result = {"class": classes, "list": [], "filters": {}}
        years = [{"n": "全部", "v": ""}] + [{"n": str(y), "v": str(y)} for y in range(2026, 2009, -1)] + [{"n": "更早", "v": "2009"}]
        sorts = [
            {"n": "最热", "v": "vod_hits_month"},
            {"n": "最新", "v": "time"},
            {"n": "评分", "v": "vod_score"},
        ]
        for cat in classes:
            result["filters"][cat["type_id"]] = [
                {"key": "year", "name": "年份", "init": "", "value": years},
                {"key": "sort", "name": "排序", "init": "vod_hits_month", "value": sorts},
            ]
        try:
            r = c.home_list()
            result["list"] = r.get("list", [])
        except Exception:
            pass
        return result

    def homeVideoContent(self):
        c = _get()
        try:
            return {"list": c.home_list().get("list", [])}
        except Exception:
            return {}

    # ---------- 分类 ----------
    def categoryContent(self, tid, pg, filter, extend):
        c = _get()
        try:
            page = int(pg) if pg else 1
        except (ValueError, TypeError):
            page = 1
        order = "time"
        year = ""
        if isinstance(extend, str) and extend:
            try:
                ext = json.loads(extend)
            except Exception:
                ext = {}
        elif isinstance(extend, dict):
            ext = extend
        else:
            ext = {}
        order = ext.get("sort", "time") or "time"
        year = ext.get("year", "") or ""
        try:
            return c.category_list(tid, page, order, year)
        except Exception:
            return {"list": [], "page": page, "pagecount": page, "limit": 0, "total": 0}

    # ---------- 详情 ----------
    def detailContent(self, ids):
        c = _get()
        vid = str(ids[0]) if ids else ""
        if not vid:
            return {}
        try:
            return c.detail(vid)
        except Exception:
            return {}

    # ---------- 搜索 ----------
    def searchContent(self, key, quick, pg="1"):
        c = _get()
        key = str(key or "").strip()
        if not key:
            return {"list": [], "page": 1, "pagecount": 1, "limit": 0, "total": 0}
        try:
            page = int(pg) if pg else 1
        except (ValueError, TypeError):
            page = 1
        try:
            return c.search_list(key, page)
        except Exception:
            return {"list": [], "page": page, "pagecount": page, "limit": 0, "total": 0}

    # ---------- 播放 ----------
    def playerContent(self, flag, id, vipFlags):
        c = _get()
        try:
            return c.parse(id)
        except Exception:
            return {"parse": 0, "url": "", "header": HEAD}

    def localProxy(self, param):
        return {"list": [], "parse": 0, "url": ""}

    def liveContent(self, url):
        return {"list": []}
