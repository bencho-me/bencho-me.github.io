/* Builds the pages from content.js. You don't need to edit this file. */
(function(){
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const page = document.body.dataset.page;          // home | project | post
  const onHome = page === 'home';
  const home = onHome ? '' : './';

  const KIND = { personal:'Personal project', team:'Team project', research:'Research' };
  const LAYOUT = {
    personal: [['objective','Objective'], ['requirements','Design requirements'], ['overview','Overview'], ['results','Results']],
    team:     [['objective','Objective'], ['role','My role'], ['overview','Overview'], ['results','Results']],
    research: [['role','My role'], ['objective','Objective'], ['overview','Overview of my contribution'], ['results','Results']],
  };

  const ICON = {
    in:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="1.5" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M4.6 6.6v4.8M4.6 4.4v.1M7.4 11.4V6.6m0 2.2c0-1.3.9-2.3 2-2.3s1.9.8 1.9 2.2v2.7" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="square"/></svg>',
    mail:'<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="1.5" y="3.5" width="13" height="9" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M1.8 4l6.2 5 6.2-5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
    doc:'<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 1.5h6l3 3v10h-9z M9.5 1.5v3h3 M5.5 8h5 M5.5 10.5h5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>',
  };

  /* ── helpers ── */
  function fig(src, label, cls, eager){
    return src
      ? `<div class="fig ${cls||''}"><img src="${esc(src)}" alt="${esc(label)}"${eager ? '' : ' loading="lazy"'}></div>`
      : `<div class="fig empty ${cls||''}"><span class="tag mono">${esc(label)}</span></div>`;
  }
  const fmtDate = d => {
    const t = new Date(d + 'T00:00:00');
    return isNaN(t) ? esc(d) : t.toLocaleDateString('en-US', {year:'numeric', month:'short', day:'numeric'});
  };
  function inline(s){
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|[\w./#?=-]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }
  /* turns the simple writing rules in content.js into page content */
  function rich(text){
    const out = []; let para = [], list = [];
    const flushPara = () => { if (para.length){ out.push(`<p>${para.map(inline).join('<br>')}</p>`); para = []; } };
    const flushList = () => { if (list.length){ out.push(`<ul>${list.map(l => `<li>${inline(l)}</li>`).join('')}</ul>`); list = []; } };
    const flush = () => { flushPara(); flushList(); };
    String(text || '').split('\n').forEach(raw => {
      const line = raw.trim();
      const img = line.match(/^\[image:\s*([^|\]]+?)\s*(?:\|\s*(left|right|full)\s*)?(?:\|\s*([^\]]*?)\s*)?\]$/i);
      const gal = line.match(/^\[gallery:\s*([^|\]]+?)\s*(?:\|\s*([^\]]*?)\s*)?\]$/i);
      if (gal){
        flush();
        const srcs = gal[1].split(',').map(x => x.trim()).filter(Boolean);
        out.push(`<figure class="gallery g${Math.min(srcs.length,3)}"><div class="gal">${srcs.map((x,n) => fig(x, (gal[2]||'Figure') + ' ' + (n+1), '', true)).join('')}</div>${gal[2] ? `<figcaption>${inline(gal[2])}</figcaption>` : ''}</figure>`);
        return;
      }
      const vid = line.match(/^\[video:\s*([^|\]]+?)\s*(?:\|\s*(left|right|full)\s*)?(?:\|\s*([^\]]*?)\s*)?\]$/i);
      if (vid){
        flush();
        const src = vid[1].trim(), side = (vid[2] || 'right').toLowerCase();
        const poster = src.replace(/\.(mp4|mov|webm)$/i, '.jpg');
        out.push(`<figure class="${side} video"><div class="fig"><video src="${esc(src)}" poster="${esc(poster)}" controls playsinline preload="metadata"></video></div>${vid[3] ? `<figcaption>${inline(vid[3])}</figcaption>` : ''}</figure>`);
        return;
      }
      if (!line){ flush(); }
      else if (img){
        flush();
        const side = (img[2] || 'right').toLowerCase();
        out.push(`<figure class="${side}">${fig(img[1].trim(), img[3] || 'Figure', '', true)}${img[3] ? `<figcaption>${inline(img[3])}</figcaption>` : ''}</figure>`);
      }
      else if (line.startsWith('## ')){ flush(); out.push(`<h3>${inline(line.slice(3))}</h3>`); }
      else if (/^[-•]\s+/.test(line)){ flushPara(); list.push(line.replace(/^[-•]\s+/, '')); }
      else { flushList(); para.push(line); }
    });
    flush();
    return out.join('');
  }
  const projUrl = p => `project.html?id=${encodeURIComponent(p.id)}`;
  const postUrl = p => `post.html?id=${encodeURIComponent(p.id)}`;
  const linkedinBtn = (cls) => SITE.linkedin
    ? `<a class="btn ${cls||''}" href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">${ICON.in}<span>LinkedIn</span></a>`
    : `<span class="btn off ${cls||''}" title="Add your LinkedIn URL in content.js">${ICON.in}<span>LinkedIn</span></span>`;
  const emailBtn = (cls) => `<button class="btn ${cls||''}" type="button" data-mail aria-haspopup="true">${ICON.mail}<span>Email</span></button>`;

  /* ── header & footer (shared) ── */
  $('#siteHeader').innerHTML = `
    <div class="wrap">
      <a class="brand" href="${home || '#top'}">Ben Cho <span>/ Mechanical Eng.</span></a>
      <nav aria-label="Main"><ul>
        <li><a href="${home}#portfolio">Portfolio</a></li>
        <li><a href="${home}#blog">Blog</a></li>
        <li><a href="${home}#about">About</a></li>
      </ul></nav>
      <div class="connect">
        ${linkedinBtn('sm')}${emailBtn('sm')}
        <div class="mailpop" id="mailpop" hidden role="dialog" aria-label="Email address">
          <span class="mono">Email me at</span>
          <span class="addr" id="mailAddr">${esc(SITE.email)}</span>
          <div class="row">
            <button class="btn sm solid" type="button" id="mailCopy">Copy address</button>
            <a class="btn sm" href="mailto:${esc(SITE.email)}">Open mail app</a>
          </div>
        </div>
      </div>
    </div>`;
  $('#siteFooter').innerHTML = `
    <div class="wrap">
      <span class="mono">© ${new Date().getFullYear()} ${esc(SITE.name)}</span>
      <a class="mono" href="#top">Back to top ↑</a>
    </div>`;

  /* email popover (works from every Email button on the page) */
  const pop = $('#mailpop');
  async function copyMail(btn){
    try { await navigator.clipboard.writeText(SITE.email); btn.textContent = 'Copied'; }
    catch(_) { const r = document.createRange(); r.selectNodeContents($('#mailAddr')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = 'Selected'; }
    setTimeout(() => btn.textContent = 'Copy address', 1600);
  }
  document.addEventListener('click', e => {
    const m = e.target.closest('[data-mail]');
    if (m){ e.preventDefault(); pop.hidden = !pop.hidden; return; }
    if (e.target.closest('#mailCopy')) return copyMail(e.target.closest('#mailCopy'));
    if (!e.target.closest('#mailpop')) pop.hidden = true;
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') pop.hidden = true; });


  /* ── project order (same everywhere): 2 majors, then newest end date first ── */
  const majors = PROJECTS.filter(p => p.major).slice(0, 2);
  /* non-major projects: newest end date first; no end date / upcoming = newest */
  const MON = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
  const endOf = p => {
    if (/upcoming|in progress/i.test(p.status || '')) return Infinity;
    const parts = String(p.date || '').split(/[–-]/);
    const end = (parts.length > 1 ? parts[parts.length - 1] : parts[0]).trim();
    if (!end || /present|now/i.test(end)) return Infinity;
    const y = end.match(/\d{4}/); if (!y) return -Infinity;
    const m = end.toLowerCase().match(/[a-z]{3}/);
    return +y[0] * 12 + (m && m[0] in MON ? MON[m[0]] : 11);
  };
  const rest = PROJECTS.filter(p => !majors.includes(p)).sort((a, b) => endOf(b) - endOf(a));
  const ORDERED = [...majors, ...rest];
  const SORTED_POSTS = [...POSTS].sort((a,b) => (b.date||'').localeCompare(a.date||''));

  /* "You may also like": two before and one after in display order (wraps around) */
  function alsoLike(list, i, url, imgOf, kindOf){
    const n = list.length; if (n < 2) return '';
    const picks = [];
    for (const d of [-2, -1, 1]){ const q = list[((i + d) % n + n) % n]; if (q !== list[i] && !picks.includes(q)) picks.push(q); }
    return `<section class="also" aria-labelledby="alsoTitle">
      <h2 id="alsoTitle">You May Also Like</h2>
      <div class="also-grid">${picks.map(q => `
        <a class="also-card" href="${url(q)}">
          ${fig(imgOf(q), 'Image')}
          <span class="mono">${esc(kindOf(q))}</span>
          <b>${esc(q.title)}</b>
        </a>`).join('')}</div>
    </section>`;
  }

  /* ── HOME ── */
  if (page === 'home'){
    $('#introActions').innerHTML = `${linkedinBtn()}${emailBtn()}${SITE.resume ? `<a class="btn" href="${esc(SITE.resume)}" target="_blank" rel="noopener">${ICON.doc}<span>Résumé</span></a>` : ''}`;

    const card = (p, major) => `
      <a class="card ${major ? 'major' : ''}" href="${projUrl(p)}">
        ${(() => { const f = fig(p.card || p.cover, KIND[p.type] || 'Project'); const h = p.highlight;
            return h && h[0] ? f.replace(/<\/div>$/, `<span class="hl"><b>${esc(h[0])}</b>${h[1] ? `<span>${esc(h[1])}</span>` : ''}</span></div>`) : f; })()}
        <div class="meta"><span class="mono">${esc(KIND[p.type] || '')}<span class="ctx"> · ${esc(p.context)}</span></span><span class="mono">${esc((p.date||'').match(/\d{4}/g)?.pop() || '')}</span></div>
        <h3>${esc(p.title)}${p.status ? `<span class="status">${esc(p.status)}</span>` : ''}</h3>
        <p>${esc(p.summary)}</p>
      </a>`;
    $('#projects').innerHTML = majors.map(p => card(p, true)).join('') + (rest.length ? '<div class="divider" aria-hidden="true"></div>' : '') + rest.map(p => card(p, false)).join('');

    const posts = [...POSTS].sort((a,b) => (b.date||'').localeCompare(a.date||''));
    $('#posts').innerHTML = posts.length ? posts.map(p => `
      <li class="post"><a href="${postUrl(p)}">
        <span class="mono">${fmtDate(p.date)}<br>${esc(p.tag)}</span>
        <span><h3>${esc(p.title)}${p.draft ? '<span class="draft">Draft</span>' : ''}</h3><p>${esc(p.excerpt)}</p></span>
        ${fig(p.cover, 'Image')}
      </a></li>`).join('') : `<li class="post" style="padding:22px 4px;color:var(--ink-2)">First post coming soon.</li>`;

    const portrait = $('#portrait');
    portrait.outerHTML = fig(SITE.portrait, 'Portrait · add photo', 'portrait');
    const em = $('#aboutEmail'); em.textContent = SITE.email; em.href = 'mailto:' + SITE.email;
    $('#aboutLinks').innerHTML = linkedinBtn() + emailBtn();

    const links = [...document.querySelectorAll('.top nav a')];
    if ('IntersectionObserver' in window){
      const io = new IntersectionObserver(es => es.forEach(en => {
        if (en.isIntersecting) links.forEach(l => l.classList.toggle('on', l.getAttribute('href') === '#' + en.target.id));
      }), {rootMargin:'-45% 0px -50% 0px'});
      ['portfolio','blog','about'].forEach(id => io.observe(document.getElementById(id)));
    }
  }

  /* ── PROJECT PAGE ── */
  if (page === 'project'){
    const id = new URLSearchParams(location.search).get('id');
    const i = PROJECTS.findIndex(p => p.id === id);
    const main = $('#main');
    if (i < 0){
      main.innerHTML = `<div class="wrap page-head"><a class="back mono" href="./#portfolio">← All projects</a><h1>Project not found</h1><p class="lede">This link may be out of date. See all projects on the portfolio page.</p></div>`;
      return;
    }
    const p = PROJECTS[i];
    document.title = `${p.title} · Ben Cho`;
    const specs = [];
    if (p.type === 'research'){
      if (p.lab) specs.push(['Lab / institution', p.lab]);
      if (p.timeline || p.date) specs.push(['Timeline', p.timeline || p.date]);
    } else {
      if (p.context) specs.push([p.type === 'team' ? 'Team / course' : 'Context', p.context]);
      if (p.date) specs.push(['Date', p.date]);
    }
    if (p.status) specs.push(['Status', p.status]);
    if ((p.tools||[]).length) specs.push(['Tools & methods', p.tools.join(' · ')]);

    const imgs = [p.cover, ...(p.topImages||[])].filter(Boolean);
    const heroImgs = imgs.length ? imgs : [''];
    const secs = (LAYOUT[p.type] || LAYOUT.team).filter(([k]) => String(p[k]||'').trim());

    main.innerHTML = `
      <div class="wrap page-head">
        <a class="back mono" href="./#portfolio">← All projects</a>
        <div><span class="kind">${esc(KIND[p.type] || 'Project')}</span></div>
        <h1>${esc(p.title)}</h1>
        <p class="lede">${esc(p.summary)}</p>
        ${specs.length ? `<dl class="specs">${specs.map(s => `<div><dt>${esc(s[0])}</dt><dd>${esc(s[1])}</dd></div>`).join('')}</dl>` : ''}
      </div>
      <div class="wrap">
        <div class="hero-figs" id="heroFigs">${heroImgs.map((s, n) => fig(s, n === 0 && !s ? 'Main photo · add image' : `${p.title} photo ${n+1}`)).join('')}</div>
        <div class="p-body">
          ${secs.map(([k, label], n) => `
            <section class="p-sec">
              <h2><span class="mono">${String(n+1).padStart(2,'0')}</span>${esc(label)}</h2>
              <div class="rich">${rich(p[k])}</div>
            </section>`).join('')}
        </div>
        ${alsoLike(ORDERED, ORDERED.indexOf(p), projUrl, q => q.card || q.cover, q => KIND[q.type] || 'Project')}
      </div>`;
    /* size each top photo to its real shape so a row has equal heights and no empty bands */
    document.querySelectorAll('#heroFigs .fig img').forEach(img => {
      const apply = () => {
        const r = img.naturalWidth / img.naturalHeight; if (!r) return;
        const f = img.parentElement;
        f.style.aspectRatio = r; f.style.flexGrow = r;
        if (heroImgs.length === 1) f.style.maxWidth = `calc(72vh * ${r})`;
      };
      img.complete ? apply() : img.addEventListener('load', apply);
    });
  }

  /* ── BLOG POST PAGE ── */
  if (page === 'post'){
    const id = new URLSearchParams(location.search).get('id');
    const sorted = SORTED_POSTS;
    const i = sorted.findIndex(p => p.id === id);
    const main = $('#main');
    if (i < 0){
      main.innerHTML = `<div class="wrap page-head"><a class="back mono" href="./#blog">← All posts</a><h1>Post not found</h1><p class="lede">This link may be out of date. See all posts on the blog.</p></div>`;
      return;
    }
    const p = sorted[i];
    document.title = `${p.title} · Ben Cho`;
    main.innerHTML = `
      <div class="wrap page-head">
        <a class="back mono" href="./#blog">← All posts</a>
        <div class="mono">${fmtDate(p.date)} · ${esc(p.tag)}${p.draft ? '<span class="draft">Draft</span>' : ''}</div>
        <h1 class="serif">${esc(p.title)}</h1>
        ${p.excerpt ? `<p class="lede">${esc(p.excerpt)}</p>` : ''}
      </div>
      <div class="wrap">
        ${p.cover ? `<div class="post-cover">${fig(p.cover, p.title)}</div>` : ''}
        <article class="post-body"><div class="rich">${rich(p.body)}</div></article>
        ${alsoLike(sorted, i, postUrl, q => q.cover, q => `${fmtDate(q.date)} · ${q.tag || 'Blog'}`)}
      </div>`;
  }
})();
