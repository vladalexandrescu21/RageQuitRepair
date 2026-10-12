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

  /* ---------- Hero: punchline rotativ ---------- */
  (function heroRotator() {
    const el = document.getElementById('heroRotator');
    const dotsWrap = document.getElementById('heroDots');
    if (!el) return;

    // Fraza GTA 6 cu numărul de zile calculat dinamic
    const gtaPhrase = (() => {
      const target = new Date(CONFIG.gta6ReleaseDate + 'T00:00:00');
      const days = Math.ceil((target - new Date()) / 86400000);
      if (isNaN(days)) return 'GTA 6 bate la ușă';
      if (days === 1) return 'GTA 6 se lansează mâine';
      if (days === 0) return 'GTA 6 se lansează azi';
      if (days < 0) return 'GTA 6 e deja aici';
      // „de zile” se folosește când ultimele 2 cifre sunt 0 sau 20–99 (ex: 38 de zile, dar 15 zile)
      const lastTwo = days % 100;
      const unit = (lastTwo === 0 || lastTwo >= 20) ? 'de zile' : 'zile';
      return `GTA 6 se lansează în ${days} ${unit}`;
    })();

    // Mesajele care se rotesc (HTML controlat de noi — fără input de la user)
    const messages = [
      `<span class="g">${gtaPhrase}</span> — și drift-ul nu o să te lase să te bucuri de Vice City.`,
      `Abia ai început <span class="g">Witcher 3 Remastered</span>… și deja l-ai amețit pe Geralt?`,
      `Îl reparăm <span class="g">definitiv</span>: module TMR, fără drift, pentru totdeauna.`,
    ];

    const DURATION = 3800;   // cât stă fiecare mesaj (ms)
    let i = 0;
    let timer = null;

    // Construim indicatorul (dots)
    const dots = [];
    if (dotsWrap) {
      messages.forEach((_, idx) => {
        const b = document.createElement('button');
        b.className = 'hero__dot' + (idx === 0 ? ' is-active' : '');
        b.type = 'button';
        b.setAttribute('aria-label', `Mesajul ${idx + 1}`);
        b.addEventListener('click', () => show(idx, true));
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    const setActiveDot = (idx) => {
      dots.forEach((d, k) => d.classList.toggle('is-active', k === idx));
    };

    const render = (idx) => {
      el.innerHTML = messages[idx];
      el.classList.remove('is-out');
      setActiveDot(idx);
    };

    // Afișează un mesaj cu fade; `manual` = declanșat de click pe dot
    const show = (idx, manual) => {
      if (idx === i && !manual) return;
      i = idx;
      el.classList.add('is-out');            // fade out
      window.setTimeout(() => render(i), prefersReduced ? 150 : 450);
      if (manual) schedule();                // resetează timer-ul după click
    };

    const next = () => show((i + 1) % messages.length, false);

    const schedule = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(next, DURATION);
    };

    // Pauză când tab-ul nu e vizibil (economie + sincron corect)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (timer) clearInterval(timer); }
      else schedule();
    });

    render(0);
    schedule();
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
