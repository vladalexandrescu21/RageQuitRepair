/* ===================================================================
   Rage Quit Repair — main.js
   ===================================================================
   EDITEAZĂ AICI datele tale. Restul fișierului nu trebuie modificat.
   ------------------------------------------------------------------- */
const CONFIG = {
  // Data lansării GTA 6 (format AAAA-LL-ZZ). Countdown-ul se calculează automat.
  gta6ReleaseDate: '2026-11-19',

  // Datele tale de contact. Lasă gol ('') orice canal pe care nu îl folosești
  // și acesta nu va fi afișat pe site.
  contact: [
    { label: 'WhatsApp',  value: '0750 201 768',           href: 'https://wa.me/40750201768',               icon: '💬' },
    { label: 'Telefon',   value: '0750 201 768',           href: 'tel:+40750201768',                        icon: '📞' },
    { label: 'Instagram', value: '@ragequitrepair',        href: 'https://instagram.com/ragequitrepair',    icon: '📸' },
    { label: 'TikTok',    value: '@ragequitrepair',        href: 'https://tiktok.com/@ragequitrepair',      icon: '🎵' },
    { label: 'OLX',       value: 'Vezi anunțul',           href: '#',                                       icon: '🏷️' },
  ],
};
/* ===================================================================
   De aici în jos: logica site-ului.
   =================================================================== */

(function () {
  'use strict';

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Anul în footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Countdown GTA 6 ---------- */
  (function gta() {
    const el = document.getElementById('gta-countdown');
    if (!el) return;
    const target = new Date(CONFIG.gta6ReleaseDate + 'T00:00:00');
    const now = new Date();
    const msPerDay = 86400000;
    const days = Math.ceil((target - now) / msPerDay);

    if (isNaN(days)) {
      el.textContent = 'GTA 6';
    } else if (days > 1) {
      el.textContent = `GTA 6 se lansează în ${days} zile`;
    } else if (days === 1) {
      el.textContent = 'GTA 6 se lansează mâine';
    } else if (days === 0) {
      el.textContent = 'GTA 6 se lansează azi';
    } else {
      el.textContent = 'GTA 6 e deja aici';
    }
  })();

  /* ---------- Contact dinamic ---------- */
  (function contact() {
    const wrap = document.getElementById('contactLinks');
    if (!wrap) return;
    const items = CONFIG.contact.filter((c) => c.value && c.href);
    wrap.innerHTML = items
      .map(
        (c) => `
      <a class="contact__link" href="${c.href}" ${c.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
        <span class="contact__ico" aria-hidden="true">${c.icon || '•'}</span>
        <span class="contact__meta">
          <span class="contact__label">${c.label}</span>
          <span class="contact__value">${c.value}</span>
        </span>
      </a>`
      )
      .join('');
  })();

  /* ---------- Nav: scroll shadow ---------- */
  const nav = document.getElementById('nav');
  const onScrollNav = () => {
    if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- Nav: meniu mobil ---------- */
  (function mobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMobile');
    if (!toggle || !menu) return;
    const close = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Deschide meniul');
    };
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
    });
    menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  })();

  /* ---------- Hero: slideshow pe scroll ---------- */
  (function heroScroll() {
    const hero = document.getElementById('hero');
    const slides = Array.from(document.querySelectorAll('.hero__slide'));
    if (!hero || !slides.length) return;

    const n = slides.length;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    const render = () => {
      const rect = hero.getBoundingClientRect();
      const scrollable = hero.offsetHeight - window.innerHeight;
      // progres 0 -> 1 pe toată înălțimea secțiunii hero
      const progress = clamp(-rect.top / scrollable, 0, 1);

      slides.forEach((slide, i) => {
        const mid = (i + 0.5) / n;
        const span = 1 / n;
        let opacity = 1 - Math.abs(progress - mid) / (span * 0.72);
        opacity = clamp(opacity, 0, 1);
        // prima rămâne vizibilă la început, ultima la final
        if (i === 0 && progress < mid) opacity = 1;
        if (i === n - 1 && progress > mid) opacity = 1;

        slide.style.opacity = opacity.toFixed(3);
        const shift = (progress - mid) * -42;
        slide.style.transform = `translateY(${shift.toFixed(1)}px)`;
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { render(); ticking = false; });
    };

    render();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', render);
  })();

  /* ---------- Reveal la scroll ---------- */
  (function reveal() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (prefersReduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    items.forEach((el) => io.observe(el));
  })();
})();
