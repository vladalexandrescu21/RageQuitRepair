# Rage Quit Repair

Site de prezentare pentru serviciul de reparații controllere & console PS5 — înlocuire joystick-uri uzate (stick drift) cu module **TMR (Hall effect)**.

Site **static** (HTML + CSS + JavaScript, fără build step). Se deschide direct în browser și se poate găzdui gratuit pe GitHub Pages.

## Structură

```
RQR/
├─ index.html          # pagina
├─ css/styles.css      # stiluri (dark theme, mobile-first)
├─ js/main.js          # logică (slideshow hero, countdown GTA 6, contact)
└─ assets/
   ├─ favicon.svg      # iconița site-ului (gamepad)
   ├─ gamepad.svg      # icon gamepad (currentColor)
   └─ images/          # pune aici pozele/clipurile (vezi images/README.md)
```

## Ce editezi tu

Aproape tot ce ține de datele tale se află la începutul fișierului [`js/main.js`](js/main.js), în obiectul `CONFIG`:

- **`gta6ReleaseDate`** — data lansării GTA 6. Numărul de zile din hero se calculează automat.
- **`contact`** — canalele tale (WhatsApp, telefon, Instagram, TikTok, OLX). Lasă gol ce nu folosești.

Conținutul textual (servicii, FAQ, proces) este direct în `index.html`.

### Secțiunea „Reparații rezolvate”

În `index.html`, la `#showcase`, completează titlul/descrierea reparației și înlocuiește cele două `case__placeholder` cu pozele „înainte/după”.

### Mentenanță PS5

Este marcată „În curând” (card dezactivat în `#servicii`). Când e gata, scoți clasa `card--soon` și badge-ul.

## Rulare locală

```bash
# din folderul RQR
python -m http.server 8000
# apoi deschide http://localhost:8000
```

Sau pur și simplu deschide `index.html` în browser.

## Publicare pe GitHub Pages

1. `git add . && git commit -m "..." && git push`
2. Pe GitHub: Settings → Pages → Source: `main` / root.
