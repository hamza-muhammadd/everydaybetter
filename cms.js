// CMS engine: shared by index.html and admin.html. One database, many sites.
window.CMS = {
  url: 'https://ektybjhehbrqpxtdtdup.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdHliamhlaGJycXB4dGR0ZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNjE0NzUsImV4cCI6MjEwNjkzNzQ3NX0.mUTPk9nQW3ln2mXIdrLQfHAuf_CrfBL94QItgx-6v4A',
  site: 'default',
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
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
  },
  esc: function (s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
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
  apply: function (map, doc) {
    doc = doc || document;
    var self = this, E = this.esc, c = this.collect(doc), cnt = 0, OLD = 'BetterEveryday';
    var A = { hero: doc.querySelector('header.hero'), buy: doc.getElementById('buy'), final: doc.querySelector('.final') };
    var els = {}; this.MOV.forEach(function (i) { els[i] = doc.querySelector(self.BLOCKS[i][1]); });
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
      var fav = doc.createElement('link'); fav.rel = 'icon'; fav.href = lg; doc.head.appendChild(fav); cnt++;
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
    if (map.title) doc.title = map.title;
    if (map.accent) doc.documentElement.style.setProperty('--green', map.accent);
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
    // reorder movable sections
    var od = self.list(map.order), MOV = self.MOV;
    if (od.length === MOV.length && MOV.every(function (i) { return od.indexOf(i) > -1; })) {
      var foot = doc.querySelector('footer'), k = 0;
      if (foot && MOV.every(function (i) { return els[i]; })) od.forEach(function (i) {
        var e = els[i]; foot.parentNode.insertBefore(e, foot);
        if (e.tagName === 'SECTION' && !e.classList.contains('final') && e.style.display !== 'none') { e.classList.toggle('alt', k % 2 === 1); k++; }
      });
    }
    // pricing plans (replace the default price card)
    var plans = self.list(map.plans).filter(function (p) { return p.name || p.price; });
    if (plans.length && A.buy) {
      var w = doc.createElement('div'); w.className = 'plans plans-' + Math.min(plans.length, 3);
      w.innerHTML = plans.map(function (p) {
        var f = (p.features || '').split(/\n+/).map(function (s) { return s.trim(); }).filter(Boolean), u = p.url ? self.safeUrl(p.url) : '#';
        return '<div class="plan' + (p.hl === '1' ? ' hl' : '') + '">' + (p.badge ? '<span class="pbadge">' + E(p.badge) + '</span>' : '') +
          '<h3>' + E(p.name) + '</h3><div class="pp"><b>' + E(p.price) + '</b>' + (p.period ? '<i>' + E(p.period) + '</i>' : '') + '</div>' +
          (p.desc ? '<p class="pd">' + E(p.desc) + '</p>' : '') + '<ul>' + f.map(function (x) { return '<li>' + E(x) + '</li>'; }).join('') + '</ul>' +
          '<a class="btn" href="' + E(u) + '"' + (p.url ? ' target="_blank" rel="noopener"' : '') + '>' + E(p.btn || 'Get started') + '</a></div>';
      }).join('');
      var old = A.buy.querySelector('.price'), wr = A.buy.querySelector('.wrap');
      if (old) old.replaceWith(w); else if (wr) wr.appendChild(w); cnt++;
    }
    // other payment methods
    var pm = self.list(map.pay).filter(function (m) { return m.name; });
    if (pm.length && A.buy && A.buy.querySelector('.wrap')) {
      var pb = doc.createElement('div'); pb.className = 'paybox';
      pb.innerHTML = '<h3>' + E(map.pay_title || 'Other ways to pay') + '</h3>' + (map.pay_note ? '<p>' + E(map.pay_note) + '</p>' : '') +
        '<div class="pm">' + pm.map(function (m) {
          return '<div class="pmc"><b>' + E(m.name) + '</b>' + (m.details ? '<span>' + E(m.details) + '</span>' : '') + '<div class="pa">' +
            (m.details ? '<button type="button" class="cp" data-copy="' + E(m.details) + '">' + E(map.copy_label || 'Copy') + '</button>' : '') +
            (m.url ? '<a class="pl" href="' + E(self.safeUrl(m.url)) + '" target="_blank" rel="noopener">' + E(map.pay_btn || 'Pay now') + '</a>' : '') + '</div></div>';
        }).join('') + '</div>';
      A.buy.querySelector('.wrap').appendChild(pb); cnt++;
    }
    // custom sections
    var cur = {};
    self.list(map.extra).filter(function (x) { return x.title || x.items; }).forEach(function (x) {
      var s = doc.createElement('section'); s.className = 'ex';
      var items = (x.items || '').split(/\n+/).map(function (t) { return t.trim(); }).filter(Boolean).map(function (t) { var i = t.indexOf('|'); return i < 0 ? [t, ''] : [t.slice(0, i).trim(), t.slice(i + 1).trim()]; });
      var body = '';
      if (x.type === 'faq') body = '<div class="faqs">' + items.map(function (i) { return '<details class="faq"><summary>' + E(i[0]) + '</summary><p>' + E(i[1]) + '</p></details>'; }).join('') + '</div>';
      else if (x.type === 'cards') body = '<div class="grid g3">' + items.map(function (i) { return '<div class="card"><h3>' + E(i[0]) + '</h3><p>' + E(i[1]) + '</p></div>'; }).join('') + '</div>';
      var btn = x.btn ? '<p style="margin-top:30px"><a class="btn" href="' + E(self.safeUrl(x.url || '#')) + '"' + (/^https?:/i.test(x.url || '') ? ' target="_blank" rel="noopener"' : '') + '>' + E(x.btn) + '</a></p>' : '';
      s.innerHTML = '<div class="wrap' + (x.type === 'faq' ? '' : ' center') + '">' + (x.title ? '<h2>' + E(x.title) + '</h2>' : '') + (x.sub ? '<p class="lead">' + E(x.sub) + '</p>' : '') + body + btn + '</div>';
      if (x.where === 'hero' && A.hero) { var at = cur.hero || A.hero; at.parentNode.insertBefore(s, at.nextSibling); cur.hero = s; }
      else if (x.where === 'buy' && A.buy) A.buy.parentNode.insertBefore(s, A.buy);
      else if (A.final) A.final.parentNode.insertBefore(s, A.final);
      else return;
      cnt++;
    });
    var wd = (map.wa || '').replace(/\D/g, '');
    if (wd) {
      var wa = doc.createElement('a'); wa.className = 'wafab'; wa.target = '_blank'; wa.rel = 'noopener'; wa.setAttribute('aria-label', 'WhatsApp');
      wa.href = 'https://wa.me/' + wd + (map.wa_msg ? '?text=' + encodeURIComponent(map.wa_msg) : '');
      wa.innerHTML = '<svg class="ico" viewBox="0 0 24 24">' + self.ICONS.whatsapp + '</svg>'; doc.body.appendChild(wa); cnt++;
    }
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
