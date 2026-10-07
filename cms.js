// Shared by index.html and admin.html
window.CMS = {
  url: 'https://ektybjhehbrqpxtdtdup.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrdHliamhlaGJycXB4dGR0ZHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEzNjE0NzUsImV4cCI6MjEwNjkzNzQ3NX0.mUTPk9nQW3ln2mXIdrLQfHAuf_CrfBL94QItgx-6v4A',
  // [key, label, CSS selector on index.html, type: text | long | link, group]
  fields: [
    ['gumroad_url', 'Gumroad product link (pricing button)', '.price .btn', 'link', 'Buy'],
    ['price', 'Price (big number)', '.price .n', 'text', 'Buy'],
    ['price_title', 'Pricing card title', '.price h3', 'text', 'Buy'],
    ['price_btn', 'Pricing button text', '.price .btn', 'text', 'Buy'],
    ['price_note', 'Small text under pricing button', '.price .small', 'text', 'Buy'],
    ['hero_title', 'Hero headline', '.hero h1', 'text', 'Hero'],
    ['hero_sub', 'Hero subheading', '.hero .sub', 'long', 'Hero'],
    ['hero_support', 'Hero supporting text', '.hero .sup', 'long', 'Hero'],
    ['hero_cta', 'Hero button text', '.hero .btn', 'text', 'Hero'],
    ['hero_note', 'Hero small text', '.hero .small', 'text', 'Hero'],
    ['problem_title', 'Problem headline', '#problem h2', 'text', 'Sections'],
    ['problem_text', 'Problem paragraph', '#problem .lead', 'long', 'Sections'],
    ['problem_strong', 'Problem highlight line', '#problem .strong', 'text', 'Sections'],
    ['philosophy_text', 'Philosophy paragraph', 'section.alt .lead', 'long', 'Sections'],
    ['product_title', 'Product title', '#product h2', 'text', 'Sections'],
    ['product_tag', 'Product subtitle', '#product .tag', 'text', 'Sections'],
    ['product_desc', 'Product description', '#product .feat .lead', 'long', 'Sections'],
    ['product_btn', 'Product section button text', '#product .btn', 'text', 'Sections'],
    ['journey_text', 'Creator journey paragraph', '#journey .quote', 'long', 'Sections'],
    ['final_title', 'Final CTA headline', '.final h2', 'text', 'Sections'],
    ['final_sub', 'Final CTA subheading', '.final p', 'text', 'Sections']
  ],
  // Put saved values into a document
  apply: function (map, doc) {
    doc = doc || document;
    this.fields.forEach(function (f) {
      var v = map[f[0]];
      if (!v) return;
      var el = doc.querySelector(f[2]);
      if (!el) return;
      if (f[3] === 'link') { el.setAttribute('href', v); el.setAttribute('target', '_blank'); el.setAttribute('rel', 'noopener'); }
      else el.textContent = v;
    });
  },
  headers: function (token) {
    return { apikey: this.key, Authorization: 'Bearer ' + (token || this.key), 'Content-Type': 'application/json' };
  },
  load: function () {
    return fetch(this.url + '/rest/v1/site_content?select=key,value', { headers: this.headers() })
      .then(function (r) { return r.json(); })
      .then(function (rows) { var m = {}; (rows || []).forEach(function (x) { m[x.key] = x.value; }); return m; });
  }
};
