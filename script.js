(() => {
  'use strict';
  const config = window.PORTFOLIO_CONFIG || { projects: [], contactEmail: 'yourname@example.com' };
  const projects = Array.isArray(config.projects) ? config.projects : [];
  const grid = document.querySelector('#project-grid');
  const dialog = document.querySelector('#project-dialog');
  const dialogMedia = document.querySelector('#dialog-media');
  const cursor = document.querySelector('.cursor');
  const canHover = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelector('#year').textContent = new Date().getFullYear();
  document.querySelector('#project-count').textContent = String(projects.length).padStart(2, '0');
  const contactCta = document.querySelector('#contact-cta');
  if (config.contactEmail && config.contactEmail !== 'yourname@example.com') {
    contactCta.href = 'mailto:' + config.contactEmail;
  } else {
    contactCta.removeAttribute('href');
    contactCta.title = 'Set your email in projects.js before publishing';
    contactCta.style.cursor = 'default';
  }

  function textEl(tag, className, value) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = value;
    return el;
  }
  function buildVisual(project) {
    const visual = document.createElement('div');
    visual.className = 'project-visual art--' + (Number(project.art) || 1);
    const art = document.createElement('div');
    art.className = 'art-inner';
    const main = document.createElement('div');
    main.className = 'art-main';
    main.appendChild(textEl('span', '', String(project.title).split(/\s+/).slice(0,2).join(' ')));
    art.append(main, textEl('span', 'art-watermark', 'ONESTESIA® / ' + project.id), textEl('span', 'art-mark', '✳'));
    visual.appendChild(art);
    if (project.image) {
      const img = document.createElement('img');
      img.src = project.image;
      img.alt = 'Artwork for ' + project.title;
      img.loading = 'lazy';
      visual.appendChild(img);
    }
    return visual;
  }
  function renderProjects(filter) {
    grid.replaceChildren();
    const results = projects.filter(p => filter === 'all' || p.category === filter);
    if (!results.length) {
      grid.appendChild(textEl('p','empty-message','No projects in this category yet.'));
      return;
    }
    for (const project of results) {
      const article = document.createElement('article'); article.className = 'project-card reveal';
      const button = document.createElement('button');
      button.type = 'button'; button.className = 'project-trigger';
      button.setAttribute('aria-label', 'Open ' + project.title + ' project');
      button.appendChild(buildVisual(project));
      const info = document.createElement('div'); info.className = 'project-info';
      const infoText = document.createElement('div');
      infoText.append(textEl('h3', '', project.title), textEl('p', '', project.subtitle));
      info.append(infoText, textEl('span', 'project-no', project.id + ' / ' + project.year));
      button.appendChild(info);
      button.addEventListener('click', () => openProject(project));
      if (canHover) {
        button.addEventListener('pointerenter', () => cursor.classList.add('active'));
        button.addEventListener('pointerleave', () => cursor.classList.remove('active'));
      }
      article.appendChild(button); grid.appendChild(article);
    }
    observeReveals();
  }
  document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
      button.classList.add('active'); button.setAttribute('aria-pressed', 'true');
      renderProjects(button.dataset.filter);
    });
  });
  function openProject(project) {
    dialogMedia.replaceChildren();
    if (project.video) {
      const video = document.createElement('video');
      video.src = project.video; video.controls = true; video.playsInline = true; video.preload = 'metadata';
      if (project.image) video.poster = project.image;
      dialogMedia.appendChild(video);
    } else if (project.image) {
      const img = document.createElement('img'); img.src = project.image; img.alt = project.title;
      dialogMedia.appendChild(img);
    } else {
      dialogMedia.appendChild(buildVisual(project));
    }
    document.querySelector('#dialog-kicker').textContent = project.category.toUpperCase() + ' / ' + project.year + ' / ' + project.id;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-desc').textContent = project.description;
    const tags = document.querySelector('#dialog-tags');tags.replaceChildren();
    (project.tags || []).forEach(tag => tags.appendChild(textEl('span', '', tag)));
    const link = document.querySelector('#dialog-link');
    link.hidden = !project.link; if (project.link) link.href = project.link;
    dialog.showModal();document.body.classList.add('is-dialog-open');cursor.classList.remove('active');
  }
  function closeProject() { dialog.close(); }
  document.querySelector('.dialog-close').addEventListener('click', closeProject);
  dialog.addEventListener('click', (event) => { if (event.target === dialog) closeProject(); });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('is-dialog-open');
    const video = dialogMedia.querySelector('video'); if (video) video.pause();
  });
  let revealObserver;
  function observeReveals() {
    const elements = document.querySelectorAll('.reveal:not(.visible)');
    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('visible')); return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {if (entry.isIntersecting) {entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}});
      },{threshold:.1,rootMargin:'0px 0px 55px 0px'});
    }
    elements.forEach(el => revealObserver.observe(el));
  }
  if (canHover) {
    document.addEventListener('pointermove', event => {
      cursor.style.left = event.clientX + 'px'; cursor.style.top = event.clientY + 'px';
    }, {passive:true});
  }
  renderProjects('all');observeReveals();

  const canvas = document.querySelector('#signal-canvas');
  if (!canvas || reduceMotion) return;
  const ctx = canvas.getContext('2d'); if (!ctx) return;
  const container = canvas.parentElement;
  let w=0,h=0,frame=0,active=true;
  const pointer={x:.5,y:.5};
  function resize(){
    const rect=canvas.getBoundingClientRect(); w=rect.width;h=rect.height;
    const scale=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(w*scale);canvas.height=Math.round(h*scale);
    ctx.setTransform(scale,0,0,scale,0,0);
  }
  resize();window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('pointermove', e=>{
    const r=container.getBoundingClientRect();pointer.x=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));pointer.y=Math.max(0,Math.min(1,(e.clientY-r.top)/r.height));
  },{passive:true});
  document.addEventListener('visibilitychange',()=>{active=!document.hidden; if(active)requestAnimationFrame(draw)});
  function draw(t){
    if(!active)return;
    if(t-frame<30){requestAnimationFrame(draw);return;}frame=t;
    ctx.clearRect(0,0,w,h);
    const x=w*.5+(pointer.x-.5)*32, y=h*.49+(pointer.y-.5)*27;
    for(let j=0;j<19;j++){
      const p=j/18;const rot=t*.00009*(j%2?1:-1)+j*.16;
      ctx.beginPath();ctx.ellipse(x,y,w*(.25+p*.24),h*(.09+p*.23),rot,0,Math.PI*2);
      ctx.strokeStyle='rgba(207,255,109,'+(.06+(1-p)*.12)+')';ctx.lineWidth=.7;ctx.stroke();
    }
    for(let i=0;i<95;i++){
      const a=i*2.39996+t*.00005,rad=Math.sqrt(i/95)*w*.43;
      const px=x+Math.cos(a)*rad,py=y+Math.sin(a)*rad*.85;
      ctx.fillStyle='rgba(222,255,139,'+(.12+.5*(i%6===0))+')';ctx.fillRect(px,py,1.25,1.25);
    }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
})();