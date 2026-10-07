// BetterEveryday CMS engine — shared by index.html and admin.html
window.CMS = {
  url: 'https://ektybjhehbrqpxtdtdup.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdHliamhlaGJycXB4dGR0ZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNjE0NzUsImV4cCI6MjEwNjkzNzQ3NX0.mUTPk9nQW3ln2mXIdrLQfHAuf_CrfBL94QItgx-6v4A',
  // Page areas: [name, selector]. Used for grouping and for show/hide.
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
    whatsapp: '<path d="M3 21l1.5-5A9 9 0 1112 21a9 9 0 01-4.5-1.200z"/><path d="M9 9c0 3 3 6 6 6l1-2-2-1-1 1c-1-.5-2-1.500-2.500-2.500l1-1-1-2z"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 11v5M8 8v.01M12 16v-5m0 2c0-2 4-2 4 0v3"/>',
    email: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>'
  },
  // Find every editable thing on a page (same result on the live page and in admin)
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
  safeUrl: function (u) {
    u = (u || '').trim(); if (/^javascript:/i.test(u)) return '#';
    return /^(https?:|mailto:|tel:|#|\/)/i.test(u) ? u : 'https://' + u;
  },
  apply: function (map, doc) {
    doc = doc || document; var self = this, c = this.collect(doc), cnt = 0, OLD = 'BetterEveryday';
    if (map.brand) {
      cnt++; doc.title = doc.title.split(OLD).join(map.brand);
      c.texts.forEach(function (t) { if (t.n.nodeValue.indexOf(OLD) > -1) t.n.nodeValue = t.n.nodeValue.split(OLD).join(map.brand); });
    }
    c.texts.forEach(function (t) {
      var v = map[t.k]; if (!v) return; cnt++;
      var m = /^(\s*)[\s\S]*?(\s*)$/.exec(t.n.nodeValue); t.n.nodeValue = m[1] + v + m[2];
    });
    c.links.forEach(function (l) {
      var v = map[l.k]; if (!v) return; cnt++; v = self.safeUrl(v); l.el.setAttribute('href', v);
      if (/^https?:/i.test(v)) { l.el.setAttribute('target', '_blank'); l.el.setAttribute('rel', 'noopener'); }
    });
    c.phs.forEach(function (x) { if (map[x.k]) { cnt++; x.el.setAttribute('placeholder', map[x.k]); } });
    if (map.gumroad) {
      var gu = self.safeUrl(map.gumroad), sels = map.gumroad_all === '1' ? ['.price .btn', 'header.hero .btn', '#product .btn', '.final .btn', 'nav .btn'] : ['.price .btn'];
      sels.forEach(function (s) { doc.querySelectorAll(s).forEach(function (a) { a.setAttribute('href', gu); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }); });
      cnt++;
    }
    if (map.logo) {
      var lg = self.safeUrl(map.logo);
      doc.querySelectorAll('.logo > svg').forEach(function (s) { var i = doc.createElement('img'); i.src = lg; i.alt = ''; i.className = 'logoimg'; s.replaceWith(i); });
      var fav = doc.createElement('link'); fav.rel = 'icon'; fav.href = lg; doc.head.appendChild(fav); cnt++;
    }
    if (map.hero_img) {
      var hh = doc.querySelector('header.hero'), hu = self.safeUrl(map.hero_img).replace(/['"()\s]/g, encodeURIComponent);
      if (hh) {
        var hb = hh.querySelector('svg.bg'); if (hb) hb.style.display = 'none';
        var hd = doc.createElement('div'); hd.className = 'heroimg';
        hd.style.backgroundImage = "linear-gradient(90deg,rgba(16,36,27,.88),rgba(16,36,27,.3) 65%,rgba(16,36,27,.1)),url('" + hu + "')";
        hh.insertBefore(hd, hh.firstChild); cnt++;
      }
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
    var box = doc.querySelector('.soc'), soc = [];
    try { soc = JSON.parse(map.socials || '[]'); } catch (e) {}
    soc = soc.filter(function (s) { return s.url; });
    if (box) {
      box.innerHTML = soc.map(function (s) {
        var u = self.safeUrl(s.url).replace(/"/g, '&quot;');
        return '<a href="' + u + '" target="_blank" rel="noopener" aria-label="' + s.p + '"><svg class="ico" viewBox="0 0 24 24">' + (self.ICONS[s.p] || self.ICONS.web) + '</svg></a>';
      }).join('');
      box.style.display = soc.length ? '' : 'none';
    }
    try { JSON.parse(map.hide || '[]').forEach(function (i) {
      if (self.BLOCKS[i]) doc.querySelectorAll(self.BLOCKS[i][1]).forEach(function (e) { e.style.display = 'none'; });
    }); } catch (e) {}
    try {
      var od = JSON.parse(map.order || 'null'), MOV = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      if (od && od.length === MOV.length && MOV.every(function (i) { return od.indexOf(i) > -1; })) {
        var els = {}; MOV.forEach(function (i) { els[i] = doc.querySelector(self.BLOCKS[i][1]); });
        var foot = doc.querySelector('footer'), k = 0;
        if (foot && MOV.every(function (i) { return els[i]; })) od.forEach(function (i) {
          var e = els[i]; foot.parentNode.insertBefore(e, foot);
          if (e.tagName === 'SECTION' && !e.classList.contains('final') && e.style.display !== 'none') { e.classList.toggle('alt', k % 2 === 1); k++; }
        });
      }
    } catch (e) {}
    return cnt;
  },
  headers: function (token) {
    return { apikey: this.key, Authorization: 'Bearer ' + (token || this.key), 'Content-Type': 'application/json' };
  },
  load: function () {
    return fetch(this.url + '/rest/v1/site_content?select=key,value', { headers: this.headers(), cache: 'no-store' })
      .then(function (r) { return r.json(); })
      .then(function (rows) {
        if (!Array.isArray(rows)) throw new Error((rows && rows.message) || 'Unexpected reply from database'); var m = {}; (rows || []).forEach(function (x) { m[x.key] = x.value; }); return m; });
  }
};
