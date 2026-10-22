document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const links = document.getElementById('nav-links');
const setMenu = (open) => {
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  links.classList.toggle('open', open);
  document.querySelector('.site-header').classList.toggle('menu-open', open);
};
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
links.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Light / dark theme
const themeBtn = document.querySelector('.theme-toggle');
const syncThemeLabel = () => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  themeBtn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
};
syncThemeLabel();
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
  syncThemeLabel();
});

// Header background once scrolled
const header = document.querySelector('.site-header');
const progress = document.querySelector('.progress');
const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.setProperty('--progress', max > 0 ? Math.min(window.scrollY / max, 1) : 0);
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal on scroll (content stays visible without JS or with reduced motion)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

// Highlight the nav link for the section in view
const navLinks = [...links.querySelectorAll('a[href^="#"]')];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));
}

// Project filters
const filterBtns = document.querySelectorAll('.filter');
const projectItems = document.querySelectorAll('#projects [data-category]');
const emptyMsg = document.querySelector('.filter-empty');
filterBtns.forEach((btn) => btn.addEventListener('click', () => {
  const f = btn.dataset.filter;
  filterBtns.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
  let shown = 0;
  projectItems.forEach((item) => {
    const match = f === 'all' || item.dataset.category === f;
    item.hidden = !match;
    if (match) { shown++; item.classList.add('visible'); }
  });
  emptyMsg.hidden = shown > 0;
}));
