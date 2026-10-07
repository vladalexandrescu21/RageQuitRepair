# Poze & clipuri

Pune aici materialele vizuale ale site-ului.

Sugestii de nume (ca să le legi ușor în `index.html`):

- `showcase-before.jpg` / `showcase-after.jpg` — reparația prezentată în secțiunea „Reparații rezolvate”
- `soldering-1.jpg`, `soldering-2.jpg` — poze din procesul de lipire
- `board-clean.jpg` — placă curățată

Când adaugi o poză în showcase, în `index.html` înlocuiești blocul:

```html
<div class="case__placeholder">Foto „înainte”</div>
```

cu:

```html
<img src="assets/images/showcase-before.jpg" alt="Controller înainte de reparație" />
```

Pentru performanță pe telefon, ține pozele sub ~400 KB (JPG/WebP).
