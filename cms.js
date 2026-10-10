// CMS engine: shared by index.html and admin.html. One database, many sites.
window.CMS = {
  url: 'https://ektybjhehbrqpxtdtdup.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdHliamhlaGJycXB4dGR0ZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNjE0NzUsImV4cCI6MjEwNjkzNzQ3NX0.mUTPk9nQW3ln2mXIdrLQfHAuf_CrfBL94QItgx-6v4A',
  site: 'default', _t: [],
  RAT: { '1': '1/1', '43': '4/3', '169': '16/9', '34': '3/4', '219': '21/9', '32': '3/2' },
  HEIGHTS: { s: '360px', m: '540px', l: '700px', f: '100vh' },
  PAD: { s: [48, 32], l: [132, 84], x: [170, 110] },
  FONTS: ['DM Sans', 'Inter', 'Poppins', 'Montserrat', 'Playfair Display', 'Cormorant Garamond', 'Lora', 'Merriweather', 'Hind Siliguri', 'Noto Serif Bengali', 'Tiro Bangla', 'Amiri'],
  MOV: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  BLOCKS: [
    ['Top menu', 'nav'], ['Hero', 'header.hero'], ['Problem', 'section:nth-of-type(1)'],
    ['Philosophy', 'section:nth-of-type(2)'], ['Featured product', 'section:nth-of-type(3)'],
    ['What you get', 'section:nth-of-type(4)'], ['Transformation', 'section:nth-of-type(5)'],
    ['Creator journey', 'section:nth-of-type(6)'], ['Who it is for', 'section:nth-of-type(7)'],
    ['Pricing', 'section:nth-of-type(8)'], ['Final call to action', 'section:nth-of-type(9)'],
    ['Benefit strip', '.ben'], ['Footer', 'footer'],
    ['Footer subscribe box', '.sub'], ['Footer social icons', '.soc']
  ],
  PLATFORMS: [['youtube', 'YouTube'], ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['facebook', 'Facebook'],
    ['x', 'X (Twitter)'], ['telegram', 'Telegram'], ['whatsapp', 'WhatsApp'], ['linkedin', 'LinkedIn'],
    ['email', 'Email'], ['web', 'Website']],
  ICONS: {
    youtube: '<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".6"/>',
    tiktok: '<path d="M14 3v11a4 4 0 11-4-4M14 3c0 3 2 5 5 5"/>',
    facebook: '<path d="M14 21v-8h3l.5-3H14V8c0-1 .5-2 2-2h1.5V3.2C17 3.1 16 3 15 3c-2.5 0-4 1.5-4 4v3H8v3h3v8z"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>',
    telegram: '<path d="M21 4L3 11l6 2.5L11 20l3-4 5 4z"/>',
    whatsapp: '<path d="M3 21l1.5-5A9 9 0 1112 21a9 9 0 01-4.5-1.2z"/><path d="M9 9c0 3 3 6 6 6l1-2-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5m0 2c0-2 4-2 4 0v3"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    pin: '<path d="M12 21s7-6 7-11a7 7 0 10-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  },
  esc: function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  obj: function (s) { try { var v = JSON.parse(s || '{}'); return v && typeof v === 'object' && !Array.isArray(v) ? v : {}; } catch (e) { return {}; } },
  col: function (v) { return /^#[0-9a-f]{6}$/i.test(v || '') ? v : ''; },
  num: function (v, d, min, max) { v = parseFloat(v); if (isNaN(v)) v = d; return Math.min(max, Math.max(min, v)); },
  isDark: function (h) { var n = parseInt(h.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255)) < 140; },
  list: function (s) { try { var v = JSON.parse(s || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; } },
  safeUrl: function (u) {
    u = (u || '').trim(); if (/^javascript:/i.test(u)) return '#';
    return /^(https?:|mailto:|tel:|#|\/)/i.test(u) ? u : 'https://' + u;
  },
  // Every editable text, link and placeholder (same keys on live page and in admin)
  collect: function (doc) {
    var B = this.BLOCKS, texts = [], links = [], phs = [];
    function sec(el) { for (var i = B.length - 1; i >= 0; i--) if (el.closest(B[i][1])) return i; return -1; }
    var w = doc.createTreeWalker(doc.body, 4), n, i = 0;
    while ((n = w.nextNode())) {
      var p = n.parentNode; if (p.closest('script,style,svg')) continue;
      var core = n.nodeValue.trim().replace(/\s+/g, ' ');
      if (!core || /^[→✓·—\s]+$/.test(core)) continue;
      texts.push({ k: 't' + (i++), n: n, def: core, sec: sec(p), tag: p.tagName, cls: p.className || '' });
    }
    var j = 0; doc.querySelectorAll('a[href]').forEach(function (a) {
      if (a.closest('.soc')) return;
      links.push({ k: 'l' + (j++), el: a, def: a.getAttribute('href'), label: a.textContent.trim().replace(/\s+/g, ' ') || 'Logo', sec: sec(a) });
    });
    var q = 0; doc.querySelectorAll('input[placeholder]').forEach(function (e) {
      phs.push({ k: 'p' + (q++), el: e, def: e.getAttribute('placeholder'), sec: sec(e) });
    });
    return { texts: texts, links: links, phs: phs };
  },
  layoutOf: function (map, B) {
    var MOV = this.MOV, toks = MOV.map(function (i) { return 'L' + i; }).concat(B.map(function (b) { return 'B' + b.id; }));
    var lay = this.list(map.layout).filter(function (t) { return toks.indexOf(t) > -1; });
    if (!lay.length) { var o = this.list(map.order); if (o.length === MOV.length && MOV.every(function (i) { return o.indexOf(i) > -1; })) lay = o.map(function (i) { return 'L' + i; }); }
    toks.forEach(function (t) { if (lay.indexOf(t) < 0) lay.push(t); });
    return lay;
  },
  btn: function (t, u, c) {
    if (!t) return ''; u = this.safeUrl(u || '#');
    return '<a class="btn' + (c ? ' ' + c : '') + '" href="' + this.esc(u) + '"' + (/^https?:/i.test(u) ? ' target="_blank" rel="noopener"' : '') + '>' + this.esc(t) + '</a>';
  },
  pic: function (src, o) {
    o = o || {}; var r = this.RAT[o.ratio], st = '';
    if (r) st += 'aspect-ratio:' + r + ';';
    st += 'border-radius:' + this.num(o.rad, 14, 0, 60) + 'px;';
    return '<figure class="pic' + (o.shadow === '1' ? ' sh' : '') + (r ? ' hr' : '') + '" style="' + st + '"><img src="' + this.esc(this.safeUrl(src)) + '" alt="' + this.esc(o.alt || '') + '" loading="lazy" style="object-fit:' + (o.fit === 'contain' ? 'contain' : 'cover') + '"></figure>';
  },
  plan: function (p) {
    var E = this.esc, f = (p.features || '').split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean);
    return '<div class="plan' + (p.hl === '1' ? ' hl' : '') + '">' + (p.badge ? '<span class="pbadge">' + E(p.badge) + '</span>' : '') +
      '<h3>' + E(p.name) + '</h3><div class="pp"><b>' + E(p.price) + '</b>' + (p.period ? '<i>' + E(p.period) + '</i>' : '') + '</div>' +
      (p.desc ? '<p class="pd">' + E(p.desc) + '</p>' : '') + '<ul>' + f.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>' +
      this.btn(p.btn || 'Get started', p.url) + '</div>';
  },
  payBox: function (pm, title, note, copy, pay) {
    var E = this.esc, self = this;
    return '<div class="paybox"><h3>' + E(title || 'Other ways to pay') + '</h3>' + (note ? '<p>' + E(note) + '</p>' : '') + '<div class="pm">' + pm.map(function (m) {
      return '<div class="pmc"><b>' + E(m.name) + '</b>' + (m.details ? '<span>' + E(m.details) + '</span>' : '') + '<div class="pa">' +
        (m.details ? '<button type="button" class="cp" data-copy="' + E(m.details) + '">' + E(copy || 'Copy') + '</button>' : '') +
        (m.url ? '<a class="pl" href="' + E(self.safeUrl(m.url)) + '" target="_blank" rel="noopener">' + E(pay || 'Pay now') + '</a>' : '') + '</div></div>';
    }).join('') + '</div></div>';
  },
  styleSec: function (el, st) {
    var s = el.style, C = this; st = st || {};
    var bg = C.col(st.bg), fg = C.col(st.fg), ac = C.col(st.acc);
    if (bg) { s.background = bg; el.setAttribute('data-bg', '1'); el.classList.remove('alt'); if (C.isDark(bg)) el.classList.add('dk'); }
    if (fg) { s.setProperty('--ink', fg); s.color = fg; s.setProperty('--mute', 'color-mix(in srgb,' + fg + ' 70%,transparent)'); }
    if (ac) s.setProperty('--green', ac);
    var p = C.PAD[st.pad]; if (p) { s.setProperty('--py', p[0] + 'px'); s.setProperty('--pym', p[1] + 'px'); }
    if (st.anim) el.setAttribute('data-anim', st.anim);
    if (st.speed) s.setProperty('--ad', C.num(st.speed, 750, 100, 3000) + 'ms');
    if (st.delay) el.setAttribute('data-delay', C.num(st.delay, 0, 0, 3000));
  },
  build: function (b, doc) {
    var R = this.R[b.type]; if (!R) return null;
    var h = R.call(this, b); if (h == null) return null;
    var s = doc.createElement('section'); s.id = 's-' + b.id;
    s.className = 'bk bk-' + b.type + (b.type === 'slider' ? ' sl' : '') + (b.type === 'cta' ? ' cta' : '');
    s.innerHTML = h;
    if (b.type === 'slider') {
      s.setAttribute('data-fx', b.fx === 'fade' || b.fx === 'zoom' ? b.fx : 'slide'); s.setAttribute('data-auto', this.num(b.auto, 5, 0, 30));
      s.style.setProperty('--slh', this.HEIGHTS[b.h] || this.HEIGHTS.m);
    }
    this.styleSec(s, b); if (b.hide === '1') s.style.display = 'none';
    return s;
  },
  theme: function (map, doc) {
    var T = this.obj(map.theme), C = this, r = doc.documentElement, s = r.style;
    var a = C.col(T.accent) || C.col(map.accent), bg = C.col(T.bg), ink = C.col(T.ink), alt = C.col(T.alt), dk = C.col(T.dark);
    if (a) s.setProperty('--green', a);
    if (bg) {
      var d = C.isDark(bg); ink = ink || (d ? '#ece9e1' : '#232826');
      s.setProperty('--bg', bg); s.setProperty('--card', d ? 'rgba(255,255,255,.07)' : '#ffffff'); s.setProperty('--line', d ? 'rgba(255,255,255,.16)' : 'rgba(0,0,0,.1)');
      s.setProperty('--alt', alt || (d ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.035)')); r.setAttribute('data-theme', d ? 'dark' : 'light');
    } else if (alt) s.setProperty('--alt', alt);
    if (ink) { s.setProperty('--ink', ink); s.setProperty('--mute', 'color-mix(in srgb,' + ink + ' 66%,transparent)'); }
    if (dk) s.setProperty('--dark', dk);
    if (T.btn === 'outline' || T.btn === 'soft') r.setAttribute('data-btn', T.btn);
    var rb = { sq: '4px', rd: '10px', pill: '999px' }[T.shape]; if (rb) s.setProperty('--rb', rb);
    if (T.rc !== undefined && T.rc !== '') { s.setProperty('--rc', C.num(T.rc, 14, 0, 40) + 'px'); r.setAttribute('data-r', '1'); }
    if (T.anim) r.setAttribute('data-anim', T.anim);
    if (map.logoh) s.setProperty('--logoh', C.num(map.logoh, 40, 16, 160) + 'px');
    var hf = C.FONTS.indexOf(T.hf) > -1 ? T.hf : '', bf = C.FONTS.indexOf(T.bf) > -1 ? T.bf : '', css = '';
    [hf, bf].forEach(function (f, i) {
      if (!f || (i && f === hf)) return;
      var l = doc.createElement('link'); l.rel = 'stylesheet'; l.setAttribute('data-cms', '1');
      l.href = 'https://fonts.googleapis.com/css2?family=' + f.replace(/ /g, '+') + (/Tiro/.test(f) ? '' : ':wght@400;700') + '&display=swap'; doc.head.appendChild(l);
    });
    if (bf) css += 'html body,html body *{font-family:"' + bf + '",system-ui,sans-serif!important}';
    if (hf) css += 'html body :is(h1,h2,h3,.serif,.pp b,.n,.strong,.loop,.chain,.btn,.cp,.pl,.pbadge,summary,.sl-t,.t,.sn,.mn){font-family:"' + hf + '",system-ui,sans-serif!important}';
    if (css) { var st = doc.createElement('style'); st.setAttribute('data-cms', '1'); st.textContent = css; doc.head.appendChild(st); }
  },
  initSliders: function (doc) {
    var self = this;
    [].forEach.call(doc.querySelectorAll('.sl'), function (sec) {
      var S = [].slice.call(sec.querySelectorAll('.sl-slide')), D = [].slice.call(sec.querySelectorAll('.sl-d button')), fx = sec.getAttribute('data-fx'), cur = 0, auto = +sec.getAttribute('data-auto') || 0, timer;
      if (S.length < 2) return;
      function show(n, dir) {
        n = (n + S.length) % S.length; if (n === cur) return; var a = S[cur], b = S[n];
        if (fx === 'slide') { b.style.transition = 'none'; b.style.transform = 'translateX(' + (dir < 0 ? -100 : 100) + '%)'; void b.offsetWidth; b.style.transition = ''; b.style.transform = 'translateX(0)'; a.style.transform = 'translateX(' + (dir < 0 ? 100 : -100) + '%)'; }
        a.classList.remove('on'); b.classList.add('on'); if (D[cur]) D[cur].classList.remove('on'); if (D[n]) D[n].classList.add('on'); cur = n;
      }
      function stop() { clearInterval(timer); }
      function play() { stop(); if (auto > 0 && !(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) { timer = setInterval(function () { show(cur + 1, 1); }, auto * 1000); self._t.push(timer); } }
      var p = sec.querySelector('.sl-p'), n = sec.querySelector('.sl-n');
      if (p) p.addEventListener('click', function () { show(cur - 1, -1); play(); });
      if (n) n.addEventListener('click', function () { show(cur + 1, 1); play(); });
      D.forEach(function (d, i) { d.addEventListener('click', function () { show(i, i < cur ? -1 : 1); play(); }); });
      var x0 = null;
      sec.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; stop(); }, { passive: true });
      sec.addEventListener('touchend', function (e) { if (x0 !== null) { var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); } x0 = null; play(); });
      sec.addEventListener('mouseenter', stop); sec.addEventListener('mouseleave', play); play();
    });
  },
  apply: function (map, doc) {
    doc = doc || document;
    var self = this, E = this.esc, c = this.collect(doc), cnt = 0, OLD = 'BetterEveryday', MOV = this.MOV;
    this._t.forEach(clearInterval); this._t = [];
    var A = { hero: doc.querySelector('header.hero'), buy: doc.getElementById('buy'), final: doc.querySelector('.final'), foot: doc.querySelector('footer') };
    var els = {}; MOV.forEach(function (i) { els[i] = doc.querySelector(self.BLOCKS[i][1]); if (els[i] && !els[i].id) els[i].id = 'sec-' + i; });
    function btnLink(a, u) { a.setAttribute('href', u); if (/^https?:/i.test(u)) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); } }
    if (map.brand) {
      cnt++; doc.title = doc.title.split(OLD).join(map.brand);
      c.texts.forEach(function (t) { if (t.n.nodeValue.indexOf(OLD) > -1) t.n.nodeValue = t.n.nodeValue.split(OLD).join(map.brand); });
    }
    c.texts.forEach(function (t) {
      var v = map[t.k]; if (!v) return; cnt++;
      var m = /^(\s*)[\s\S]*?(\s*)$/.exec(t.n.nodeValue); t.n.nodeValue = m[1] + v + m[2];
    });
    c.links.forEach(function (l) { var v = map[l.k]; if (!v) return; cnt++; btnLink(l.el, self.safeUrl(v)); });
    c.phs.forEach(function (x) { if (map[x.k]) { cnt++; x.el.setAttribute('placeholder', map[x.k]); } });
    if (map.gumroad) {
      var gu = self.safeUrl(map.gumroad), sels = map.gumroad_all === '1' ? ['.price .btn', 'header.hero .btn', '#product .btn', '.final .btn', 'nav .btn'] : ['.price .btn'];
      sels.forEach(function (s) { doc.querySelectorAll(s).forEach(function (a) { btnLink(a, gu); }); }); cnt++;
    }
    if (map.logo) {
      var lg = self.safeUrl(map.logo);
      doc.querySelectorAll('.logo > svg').forEach(function (s) { var i = doc.createElement('img'); i.src = lg; i.alt = ''; i.className = 'logoimg'; s.replaceWith(i); });
      var fav = doc.createElement('link'); fav.rel = 'icon'; fav.href = lg; fav.setAttribute('data-cms', '1'); doc.head.appendChild(fav); cnt++;
    }
    if (map.hero_img && A.hero) {
      var hu = self.safeUrl(map.hero_img).replace(/['"()\s]/g, encodeURIComponent), hb = A.hero.querySelector('svg.bg');
      if (hb) hb.style.display = 'none';
      var hd = doc.createElement('div'); hd.className = 'heroimg';
      hd.style.backgroundImage = "linear-gradient(90deg,rgba(16,36,27,.88),rgba(16,36,27,.3) 65%,rgba(16,36,27,.1)),url('" + hu + "')";
      A.hero.insertBefore(hd, A.hero.firstChild); cnt++;
    }
    if (map.cover_img) {
      var bk = doc.querySelector('.book');
      if (bk) {
        [].forEach.call(bk.children, function (x) { x.style.display = 'none'; });
        var bi = doc.createElement('img'); bi.src = self.safeUrl(map.cover_img); bi.alt = ''; bi.className = 'bookimg'; bk.appendChild(bi); cnt++;
      }
    }
    this.theme(map, doc);
    if (map.title) doc.title = map.title;
    if (map.desc) {
      var mt = doc.querySelector('meta[name=description]');
      if (!mt) { mt = doc.createElement('meta'); mt.name = 'description'; doc.head.appendChild(mt); }
      mt.content = map.desc;
    }
    var box = doc.querySelector('.soc'), soc = self.list(map.socials).filter(function (s) { return s.url; });
    if (box) {
      box.innerHTML = soc.map(function (s) {
        return '<a href="' + E(self.safeUrl(s.url)) + '" target="_blank" rel="noopener" aria-label="' + E(s.p) + '"><svg class="ico" viewBox="0 0 24 24">' + (self.ICONS[s.p] || self.ICONS.web) + '</svg></a>';
      }).join('');
      box.style.display = soc.length ? '' : 'none';
    }
    self.list(map.hide).forEach(function (i) {
      if (self.BLOCKS[i]) doc.querySelectorAll(self.BLOCKS[i][1]).forEach(function (e) { e.style.display = 'none'; });
    });
    // legacy pricing plans + payment methods
    var plans = self.list(map.plans).filter(function (p) { return p.name || p.price; });
    if (plans.length && A.buy) {
      var w = doc.createElement('div'); w.className = 'plans plans-' + Math.min(plans.length, 3); w.innerHTML = plans.map(function (p) { return self.plan(p); }).join('');
      var old = A.buy.querySelector('.price'), wr = A.buy.querySelector('.wrap');
      if (old) old.replaceWith(w); else if (wr) wr.appendChild(w); cnt++;
    }
    var pm = self.list(map.pay).filter(function (m) { return m.name; });
    if (pm.length && A.buy && A.buy.querySelector('.wrap')) {
      var pw = doc.createElement('div'); pw.innerHTML = self.payBox(pm, map.pay_title, map.pay_note, map.copy_label, map.pay_btn);
      A.buy.querySelector('.wrap').appendChild(pw.firstChild); cnt++;
    }
    // page builder: sections in your order
    var B = self.list(map.blocks).filter(function (b) { return b && b.id && b.type; }), ss = self.obj(map.sstyle), lay = self.layoutOf(map, B), nodes = {};
    MOV.forEach(function (i) { nodes['L' + i] = els[i]; });
    B.forEach(function (b) { var e = self.build(b, doc); if (e) { nodes['B' + b.id] = e; cnt++; } });
    lay.forEach(function (t) { if (t.charAt(0) === 'L' && nodes[t]) self.styleSec(nodes[t], ss[t]); });
    var custom = B.length || self.list(map.layout).length || self.list(map.order).length, k = 0;
    if (A.foot && MOV.every(function (i) { return els[i]; })) lay.forEach(function (t) {
      var e = nodes[t]; if (!e) return; A.foot.parentNode.insertBefore(e, A.foot);
      if (custom && e.tagName === 'SECTION' && !/\b(final|cta|sl)\b/.test(e.className) && e.style.display !== 'none' && !e.hasAttribute('data-bg')) { e.classList.toggle('alt', k % 2 === 1); k++; }
    });
    // header: menu from sections, contact link, header button
    var ul = doc.querySelector('nav ul'), mi = [];
    lay.forEach(function (t) { var b = t.charAt(0) === 'B' && B.filter(function (x) { return 'B' + x.id === t; })[0]; if (b && b.menu === '1' && b.hide !== '1') mi.push({ label: b.mlabel || b.name || b.title || 'Section', to: 's-' + b.id }); });
    if (mi.length && ul) {
      self.list(map.menux).forEach(function (x) { if (x.label) mi.push({ label: x.label, url: x.url }); });
      ul.innerHTML = mi.map(function (x) { return '<li><a class="l" href="' + E(x.to ? '#' + x.to : self.safeUrl(x.url || '#')) + '">' + E(x.label) + '</a></li>'; }).join(''); cnt++;
    } else if (ul) {
      var ct = B.filter(function (b) { return b.type === 'contact' && b.hide !== '1'; })[0];
      if (ct) { var fl = ul.querySelector('a[href="#footer"]'); if (fl) fl.setAttribute('href', '#s-' + ct.id); }
    }
    if (map.ctahide === '1') { var cb = doc.querySelector('nav > .wrap > .btn'); if (cb) cb.style.display = 'none'; }
    var wd = (map.wa || '').replace(/\D/g, '');
    if (wd) {
      var wa = doc.createElement('a'); wa.className = 'wafab'; wa.target = '_blank'; wa.rel = 'noopener'; wa.setAttribute('aria-label', 'WhatsApp');
      wa.href = 'https://wa.me/' + wd + (map.wa_msg ? '?text=' + encodeURIComponent(map.wa_msg) : '');
      wa.innerHTML = '<svg class="ico" viewBox="0 0 24 24">' + self.ICONS.whatsapp + '</svg>'; doc.body.appendChild(wa); cnt++;
    }
    this.initSliders(doc);
    return cnt;
  },
  headers: function (token) { return { apikey: this.key, Authorization: 'Bearer ' + (token || this.key), 'Content-Type': 'application/json' }; },
  get: function (path, token) {
    return fetch(this.url + '/rest/v1/' + path, { headers: this.headers(token), cache: 'no-store' }).then(function (r) { return r.json(); });
  },
  load: function (site, token) {
    return this.get('site_content?select=key,value&site=eq.' + encodeURIComponent(site), token).then(function (rows) {
      if (!Array.isArray(rows)) throw new Error((rows && rows.message) || 'Unexpected reply from database');
      var m = {}; rows.forEach(function (x) { m[x.key] = x.value; }); return m;
    });
  },
  // Which site is this page? Match the domain, or ?site=name, or the first site.
  pick: function (list) {
    var host = location.hostname.replace(/^www\./, '').toLowerCase(), p = new URLSearchParams(location.search).get('site');
    if (p && list.some(function (s) { return s.slug === p; })) return p;
    var m = list.filter(function (s) { return (s.domains || '').split(/[\s,]+/).some(function (d) { return d && d.replace(/^www\./, '').toLowerCase() === host; }); })[0];
    return m ? m.slug : (list[0] ? list[0].slug : 'default');
  },
  loadLive: function () {
    var self = this;
    return this.get('sites?select=slug,domains&order=created_at').then(function (l) {
      self.site = self.pick(Array.isArray(l) ? l : []); return self.load(self.site);
    });
  }
};

// Section renderers (one per section type)
CMS.R = (function (C) {
  var E = C.esc, lines = function (s) { return (s || '').split(/\n+/).map(function (t) { return t.trim(); }).filter(Boolean); };
  var W = function (h, c) { return '<div class="wrap' + (c ? ' center' : '') + '">' + h + '</div>'; };
  var head = function (b) { return (b.title ? '<h2>' + E(b.title) + '</h2>' : '') + (b.sub ? '<p class="lead">' + E(b.sub) + '</p>' : ''); };
  var bp = function (b, two) { var h = C.btn(b.btn, b.url) + (two ? C.btn(b.btn2, b.url2, 'gh') : ''); return h ? '<p class="bp">' + h + '</p>' : ''; };
  var it = function (b, k) { return b[k || 'items'] || []; };
  var ci = function (ic, lab, h) { return '<div class="ci"><svg class="ico" viewBox="0 0 24 24">' + C.ICONS[ic] + '</svg><div><b>' + E(lab) + '</b>' + h + '</div></div>'; };
  function vid(u) {
    u = (u || '').trim(); var m;
    if ((m = /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/))([\w-]{6,})/.exec(u))) return 'https://www.youtube-nocookie.com/embed/' + m[1];
    if ((m = /vimeo\.com\/(?:video\/)?(\d+)/.exec(u))) return 'https://player.vimeo.com/video/' + m[1];
    return '';
  }
  return {
    slider: function (b) {
      var s = it(b); if (!s.length) return null; var ov = C.num(b.ov, 40, 0, 90) / 100, n = s.length;
      var sl = s.map(function (x, i) {
        var bg = x.img ? "background-image:url('" + E(C.safeUrl(x.img)).replace(/'/g, '%27') + "')" : 'background-image:linear-gradient(135deg,var(--green),var(--dark,#14291f))', tg = i ? 'h2' : 'h1';
        return '<div class="sl-slide' + (i ? '' : ' on') + '"><div class="sl-bg" style="' + bg + '"></div><div class="sl-ov" style="opacity:' + ov + '"></div><div class="wrap sl-c al-' + (['center', 'right'].indexOf(x.al) > -1 ? x.al : 'left') + '">' +
          (x.kicker ? '<span class="sl-k">' + E(x.kicker) + '</span>' : '') + (x.title ? '<' + tg + ' class="sl-t">' + E(x.title) + '</' + tg + '>' : '') + (x.text ? '<p>' + E(x.text) + '</p>' : '') +
          ((x.btn || x.btn2) ? '<div class="sl-b">' + C.btn(x.btn, x.url) + C.btn(x.btn2, x.url2, 'gh') + '</div>' : '') + '</div></div>';
      }).join('');
      return '<div class="sl-track">' + sl + '</div>' + (b.arrows !== '' && n > 1 ? '<button class="sl-p" type="button" aria-label="Previous">‹</button><button class="sl-n" type="button" aria-label="Next">›</button>' : '') +
        (b.dots !== '' && n > 1 ? '<div class="sl-d">' + s.map(function (_, i) { return '<button type="button" aria-label="Slide ' + (i + 1) + '"' + (i ? '' : ' class="on"') + '></button>'; }).join('') + '</div>' : '');
    },
    text: function (b) { return W(head(b) + bp(b), b.al !== 'left'); },
    split: function (b) {
      var p = b.img ? C.pic(b.img, b) : '', ls = lines(b.list);
      var t = '<div class="sp-t">' + head(b) + (ls.length ? '<ul class="tick">' + ls.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>' : '') + bp(b) + '</div>';
      return W('<div class="split' + (b.side === 'right' ? ' rev' : '') + (p ? '' : ' nopic') + '">' + (p ? '<div class="sp-i">' + p + '</div>' : '') + t + '</div>');
    },
    image: function (b) {
      if (!b.img) return null; var sz = { s: '360px', m: '640px', l: '920px', f: '100%' }[b.size] || '920px', p = C.pic(b.img, b); if (b.url) p = '<a href="' + E(C.safeUrl(b.url)) + '">' + p + '</a>';
      return W((b.title ? '<h2 class="ih">' + E(b.title) + '</h2>' : '') + '<div class="imgw" style="max-width:' + sz + '">' + p + (b.cap ? '<p class="cap">' + E(b.cap) + '</p>' : '') + '</div>', true);
    },
    gallery: function (b) {
      var g = it(b).filter(function (x) { return x.img; });
      return W(head(b) + '<div class="gal c' + (['2', '3', '4'].indexOf(b.cols) > -1 ? b.cols : 3) + '">' + g.map(function (x) { return '<div class="gi">' + C.pic(x.img, { ratio: b.ratio || '43', rad: b.rad, fit: 'cover', alt: x.cap }) + (x.cap ? '<p class="cap">' + E(x.cap) + '</p>' : '') + '</div>'; }).join('') + '</div>', true);
    },
    cards: function (b) {
      return W(head(b) + '<div class="grid cds c' + (['2', '3', '4'].indexOf(b.cols) > -1 ? b.cols : 3) + '">' + it(b).map(function (x) {
        return '<div class="card">' + (x.img ? C.pic(x.img, { ratio: b.ratio || '169', fit: b.fit, rad: 0, alt: x.t }) : '') + '<div class="cb"><h3>' + E(x.t) + '</h3>' + (x.x ? '<p>' + E(x.x) + '</p>' : '') + C.btn(x.btn, x.url, 'sm') + '</div></div>';
      }).join('') + '</div>', true);
    },
    steps: function (b) {
      return W(head(b) + '<div class="steps">' + it(b).map(function (x, i) { return '<div class="st"><span class="sn">' + (i + 1) + '</span><h3>' + E(x.t) + '</h3>' + (x.x ? '<p>' + E(x.x) + '</p>' : '') + '</div>'; }).join('') + '</div>', true);
    },
    course: function (b) {
      return W(head(b) + (b.meta ? '<p class="pill">' + E(b.meta) + '</p>' : '') + '<div class="crs">' + it(b).map(function (m, i) {
        var ls = lines(m.lessons);
        return '<details class="mod"' + (i === 0 ? ' open' : '') + '><summary><span class="mn">' + (i + 1) + '</span><b>' + E(m.t) + '</b>' + (m.d ? '<i>' + E(m.d) + '</i>' : '') + '</summary>' +
          (ls.length ? '<ul>' + ls.map(function (l) { var f = /\|\s*free\s*$/i.test(l); return '<li><span>' + E(l.replace(/\|\s*free\s*$/i, '').trim()) + '</span>' + (f ? '<em>Free preview</em>' : '') + '</li>'; }).join('') + '</ul>' : '') + '</details>';
      }).join('') + '</div>', true);
    },
    testimonials: function (b) {
      var t = it(b).filter(function (x) { return x.q; });
      return W(head(b) + '<div class="tms ' + (b.view === 'slider' ? 'tsl' : 'tgr') + '">' + t.map(function (x) {
        return '<figure class="tm"><blockquote>' + E(x.q) + '</blockquote><figcaption>' + (x.img ? '<img class="av" src="' + E(C.safeUrl(x.img)) + '" alt="" loading="lazy">' : '<span class="av ini">' + E((x.name || '?').charAt(0)) + '</span>') +
          '<span><b>' + E(x.name) + '</b>' + (x.role ? '<i>' + E(x.role) + '</i>' : '') + '</span></figcaption></figure>';
      }).join('') + '</div>', true);
    },
    pricing: function (b) {
      var pl = it(b).filter(function (p) { return p.name || p.price; }), pm = it(b, 'items2').filter(function (m) { return m.name; });
      return W(head(b) + (pl.length ? '<div class="plans plans-' + Math.min(pl.length, 3) + '">' + pl.map(function (p) { return C.plan(p); }).join('') + '</div>' : '') + (pm.length ? C.payBox(pm, b.paytitle, b.paynote, b.copy, b.paybtn) : ''), true);
    },
    faq: function (b) {
      return W(head(b) + '<div class="faqs">' + it(b).filter(function (x) { return x.q; }).map(function (x) { return '<details class="faq"><summary>' + E(x.q) + '</summary><p>' + E(x.a) + '</p></details>'; }).join('') + '</div>', true);
    },
    contact: function (b) {
      var lb = (b.labs || '').split(',').map(function (s) { return s.trim(); }), r = [];
      if (b.phone) r.push(ci('phone', lb[0] || 'Phone', '<a href="tel:' + E(b.phone.replace(/[^\d+]/g, '')) + '">' + E(b.phone) + '</a>'));
      if (b.email) r.push(ci('email', lb[1] || 'Email', '<a href="mailto:' + E(b.email) + '">' + E(b.email) + '</a>'));
      if (b.wa) r.push(ci('whatsapp', lb[2] || 'WhatsApp', '<a href="https://wa.me/' + E(b.wa.replace(/\D/g, '')) + '" target="_blank" rel="noopener">' + E(b.wa) + '</a>'));
      if (b.addr) r.push(ci('pin', lb[3] || 'Address', '<span>' + E(b.addr) + '</span>'));
      if (b.hours) r.push(ci('clock', lb[4] || 'Hours', '<span>' + E(b.hours) + '</span>'));
      var form = b.form !== '', map = b.map ? '<p class="bp" style="justify-content:flex-start">' + C.btn(b.mapbtn || 'Open map', b.map, 'gh sm') + '</p>' : '';
      return W(head(b) + '<div class="ct-grid' + (form ? '' : ' one') + '"><div class="ct-i">' + r.join('') + map + '</div>' + (form ?
        '<div class="ct-f"><form data-msg><input name="name" required placeholder="' + E(b.pname || 'Your name') + '" aria-label="Name"><input name="email" type="email" placeholder="' + E(b.pemail || 'Email') + '" aria-label="Email"><input name="phone" placeholder="' + E(b.pphone || 'Phone (optional)') + '" aria-label="Phone">' +
        '<textarea name="message" required placeholder="' + E(b.pmsg || 'How can we help?') + '" aria-label="Message"></textarea><input class="hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true"><button class="btn" type="submit">' + E(b.fbtn || 'Send message') + '</button></form>' +
        '<p class="subok" hidden>' + E(b.okmsg || 'Thank you. We will reply soon.') + '</p><p class="suberr" hidden>Something went wrong. Please try again.</p></div>' : '') + '</div>', true);
    },
    subscribe: function (b) {
      return W(head(b) + '<div class="bsub"><form class="sbf" data-sub><input type="email" name="email" required placeholder="' + E(b.ph || 'Your email address') + '" aria-label="Email"><button class="btn" type="submit">' + E(b.btn || 'Subscribe') + '</button></form>' +
        '<p class="subok" hidden>' + E(b.okmsg || 'Thank you. You are subscribed.') + '</p><p class="suberr" hidden>Something went wrong. Please try again.</p></div>', true);
    },
    video: function (b) {
      var u = vid(b.url); if (!u) return null;
      return W(head(b) + '<div class="vid" style="aspect-ratio:' + (C.RAT[b.ratio] || '16/9') + '"><iframe src="' + E(u) + '" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen title="' + E(b.title || 'Video') + '"></iframe></div>', true);
    },
    cta: function (b) { return W(head(b) + bp(b, true), true); }
  };
})(CMS);
