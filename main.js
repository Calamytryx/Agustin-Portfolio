/* =========================================================
   RENDERER
   Reads PORTFOLIO from data.js and fills in the DOM.
   You shouldn't need to touch this file to edit content —
   change data.js instead.

  ICON LIBRARY
  Icons are sourced online from Iconify names like simple-icons:github
  and lucide:mail. To add one: paste an Iconify name into data.js. To
  remove one: delete the field — nothing breaks.
   ========================================================= */

(async function () {
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, opts = {}) {
    const node = document.createElement(tag);
    if (opts.class) node.className = opts.class;
    if (opts.text) node.textContent = opts.text;
    return node;
  }

  function safeJsonParse(text) {
    try {
      return JSON.parse(text);
    } catch {
      return null;
    }
  }

  function readCachedJson(key) {
    try {
      return safeJsonParse(localStorage.getItem(key) || 'null');
    } catch {
      return null;
    }
  }

  function writeCachedJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(value));
  }

  async function loadProjectsSnapshot() {
    try {
      const res = await fetch('projects.json', { cache: 'no-store' });
      if (!res.ok) return null;
      const snapshot = await res.json();
      return Array.isArray(snapshot.repos) && snapshot.repos.length ? snapshot.repos : null;
    } catch {
      return null;
    }
  }

  // ---- Icon library loader ------------------------------------------------
  const iconCache = new Map(); // slug -> svg markup string, or null if missing

  function iconUrl(slug) {
    const [setName, iconName] = slug.split(':', 2);
    return `https://api.iconify.design/${encodeURIComponent(setName)}/${encodeURIComponent(iconName)}.svg`;
  }

  async function fetchIcon(slug) {
    if (!slug) return null;
    if (iconCache.has(slug)) return iconCache.get(slug);
    try {
      const res = await fetch(iconUrl(slug));
      if (!res.ok) throw new Error('not found');
      const svg = await res.text();
      iconCache.set(slug, svg);
      return svg;
    } catch {
      iconCache.set(slug, null); // remove it and forget it — no console spam
      return null;
    }
  }

  // Collect every icon slug referenced anywhere in data.js and fetch them
  // all up front, so rendering below can stay synchronous.
  function collectIconSlugs() {
    const slugs = new Set();
    (PORTFOLIO.links || []).forEach(l => l.icon && slugs.add(l.icon));
    (PORTFOLIO.contactLinks || []).forEach(l => l.icon && slugs.add(l.icon));
    (PORTFOLIO.projects || []).forEach(p => (p.icons || []).forEach(i => slugs.add(i)));
    (PORTFOLIO.skills || []).forEach(g =>
      (g.items || []).forEach(i => { if (typeof i === 'object' && i.icon) slugs.add(i.icon); })
    );
    return [...slugs];
  }

  await Promise.all(collectIconSlugs().map(fetchIcon));

  // Returns a <span class="icon"> populated from cache, or null if the
  // icon is missing/unset — callers should just skip appending it.
  function iconEl(slug) {
    const svg = iconCache.get(slug);
    if (!svg) return null;
    const span = el('span', { class: 'icon' });
    span.innerHTML = svg;
    span.setAttribute('aria-hidden', 'true');
    return span;
  }

  // ---- Hero -----------------------------------------------------------------
  $('hero-name').textContent = PORTFOLIO.name;
  $('hero-role').textContent = PORTFOLIO.role;
  $('hero-sub').textContent = PORTFOLIO.subline;
  document.title = `${PORTFOLIO.name} — ${PORTFOLIO.role}`;

  const heroPhoto = $('hero-photo');
  if (heroPhoto && Array.isArray(PORTFOLIO.heroImages) && PORTFOLIO.heroImages.length) {
    const chosen = PORTFOLIO.heroImages[Math.floor(Math.random() * PORTFOLIO.heroImages.length)];
    heroPhoto.src = encodeURI(chosen.src);
    heroPhoto.alt = chosen.alt || PORTFOLIO.name;
  }

  const heroLinks = $('hero-links');
  PORTFOLIO.links.filter(l => l.href).forEach(l => {
    const a = el('a');
    const icon = iconEl(l.icon);
    if (icon) a.appendChild(icon);
    a.appendChild(document.createTextNode(l.label));
    a.href = l.href;
    if (l.download) a.download = l.download;
    if (l.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
    heroLinks.appendChild(a);
  });

  // ---- Terminal typing effect -------------------------------------------------
  const termOut = $('terminal-output');
  const lines = PORTFOLIO.terminalLines;

  function renderStatic() {
    termOut.innerHTML = lines
      .map(l => `<span class="prompt">${l.prompt}</span>\n${l.output}`)
      .join('\n\n') + '<span class="cursor"></span>';
  }

  if (reduceMotion) {
    renderStatic();
  } else {
    let li = 0, ci = 0, buffer = '';
    const speed = 18;

    function render() {
      const styled = buffer
        .split('\n')
        .map(row => row.startsWith('$') ? `<span class="prompt">${row}</span>` : row)
        .join('\n');
      termOut.innerHTML = styled + '<span class="cursor"></span>';
    }

    function typeStep() {
      if (li >= lines.length) { render(); return; }
      const line = lines[li];
      const prefix = li === 0 ? '' : '\n\n';
      const promptFull = prefix + line.prompt;

      if (ci < promptFull.length) {
        buffer += promptFull[ci];
        ci++;
        render();
        setTimeout(typeStep, speed);
      } else {
        buffer += '\n' + line.output;
        render();
        li++; ci = 0;
        setTimeout(typeStep, 220);
      }
    }

    typeStep();
  }

  // ---- Experience ------------------------------------------------------------
  const expList = $('experience-list');
  PORTFOLIO.experience.forEach(job => {
    const item = el('div', { class: 'timeline-item' });
    item.appendChild(el('div', { class: 'timeline-date', text: job.date }));
    const body = el('div');
    body.appendChild(el('div', { class: 'timeline-title', text: job.title }));
    body.appendChild(el('div', { class: 'timeline-org', text: job.org }));
    if (job.bullets && job.bullets.length) {
      const ul = el('ul');
      job.bullets.forEach(b => ul.appendChild(el('li', { text: b })));
      const wrap = el('div', { class: 'timeline-body' });
      wrap.appendChild(ul);
      body.appendChild(wrap);
    }
    item.appendChild(body);
    expList.appendChild(item);
  });

  // ---- Projects --------------------------------------------------------------
  const projList = $('projects-list');

  function renderProjectCard(project) {
    const card = el('div', { class: 'project-card' });

    const icons = (project.icons || []).map(iconEl).filter(Boolean);
    if (icons.length) {
      const row = el('div', { class: 'project-icons' });
      icons.forEach(i => row.appendChild(i));
      card.appendChild(row);
    }

    if (project.meta) {
      card.appendChild(el('p', { class: 'project-meta', text: project.meta }));
    }

    if (project.tags) {
      card.appendChild(el('p', { class: 'project-tags', text: project.tags }));
    }

    card.appendChild(el('h3', { text: project.title }));
    card.appendChild(el('p', { class: 'project-desc', text: project.desc }));
    if (project.href) {
      const a = el('a', { class: 'project-link', text: project.linkLabel || 'View ↗' });
      a.href = project.href; a.target = '_blank'; a.rel = 'noopener';
      card.appendChild(a);
    }

    projList.appendChild(card);
  }

  async function loadGithubProjects(config) {
    const cacheKey = config.cacheKey || `github-projects:${config.username}`;
    const cached = readCachedJson(cacheKey);
    const fallback = cached && Array.isArray(cached.repos) ? cached.repos : null;
    const snapshot = await loadProjectsSnapshot();
    if (snapshot) return snapshot;

    const url = new URL(`https://api.github.com/users/${encodeURIComponent(config.username)}/repos`);
    url.searchParams.set('type', 'owner');
    url.searchParams.set('sort', 'updated');
    url.searchParams.set('direction', 'desc');
    url.searchParams.set('per_page', String(config.perPage || 12));

    try {
      const res = await fetch(url.toString(), {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const repos = await res.json();
      const filtered = repos
        .filter(repo => config.includeForks || !repo.fork)
        .filter(repo => config.includeArchived || !repo.archived)
        .filter(repo => !(config.exclude || []).includes(repo.name));
      const payload = {
        fetchedAt: new Date().toISOString(),
        repos: filtered,
      };
      writeCachedJson(cacheKey, payload);
      return payload.repos;
    } catch {
      return fallback;
    }
  }

  const githubProjectsConfig = PORTFOLIO.githubProjects;
  const githubRepos = githubProjectsConfig ? await loadGithubProjects(githubProjectsConfig) : null;

  if (githubRepos && githubRepos.length) {
    githubRepos.forEach(repo => {
      renderProjectCard({
        title: repo.name,
        desc: repo.description || 'GitHub repository.',
        href: repo.homepage || repo.html_url,
        tags: [repo.language, repo.topics && repo.topics.length ? repo.topics.slice(0, 3).join(' · ') : null].filter(Boolean).join(' · '),
        meta: `★ ${repo.stargazers_count} · Updated ${formatDate(repo.updated_at)}`,
        linkLabel: repo.homepage ? 'Website ↗' : 'Repo ↗',
      });
    });
  } else {
    PORTFOLIO.projects.forEach(renderProjectCard);
  }

  // ---- Skills -----------------------------------------------------------------
  const skillsList = $('skills-list');
  PORTFOLIO.skills.forEach(group => {
    const wrap = el('div');
    wrap.appendChild(el('span', { class: 'skills-group-label', text: group.group }));
    const row = el('div', { class: 'chip-row' });
    group.items.forEach(item => {
      const isObj = typeof item === 'object';
      const chip = el('span', { class: 'chip' });
      const icon = isObj ? iconEl(item.icon) : null;
      if (icon) chip.appendChild(icon);
      chip.appendChild(document.createTextNode(isObj ? item.name : item));
      row.appendChild(chip);
    });
    wrap.appendChild(row);
    skillsList.appendChild(wrap);
  });

  // ---- Education --------------------------------------------------------------
  const eduList = $('education-list');
  PORTFOLIO.education.forEach(ed => {
    const item = el('div', { class: 'timeline-item' });
    item.appendChild(el('div', { class: 'timeline-date', text: ed.date }));
    const body = el('div');
    body.appendChild(el('div', { class: 'timeline-title', text: ed.title }));
    body.appendChild(el('div', { class: 'timeline-org', text: ed.org }));
    item.appendChild(body);
    eduList.appendChild(item);
  });

  const certsList = $('certs-list');
  PORTFOLIO.certifications.forEach(c => {
    const li = el('li');
    li.appendChild(el('span', { text: c.name }));
    li.appendChild(el('span', { text: c.date }));
    certsList.appendChild(li);
  });

  const achList = $('achievements-list');
  PORTFOLIO.achievements.forEach(a => achList.appendChild(el('li', { text: a })));

  // ---- Contact ------------------------------------------------------------------
  $('contact-lede').textContent = PORTFOLIO.contactLede;
  const contactLinks = $('contact-links');
  PORTFOLIO.contactLinks.forEach(l => {
    const a = el('a');
    const icon = iconEl(l.icon);
    if (icon) a.appendChild(icon);
    a.appendChild(document.createTextNode(l.label));
    a.href = l.href;
    if (l.href.startsWith('http')) { a.target = '_blank'; a.rel = 'noopener'; }
    contactLinks.appendChild(a);
  });

  // ---- Footer ---------------------------------------------------------------------
  $('footer-year').textContent = '· ' + new Date().getFullYear();
})();
