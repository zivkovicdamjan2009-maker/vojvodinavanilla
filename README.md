# Wedding Centar Vanilla — sajt

Statičan sajt: čist HTML5 + CSS + vanilla JavaScript, bez build koraka.

## Fajlovi
- `index.html` — Wedding Centar Vanilla (početna)
- `hotel.html` — Hotel Vojvodina (ista navigacija, isti stilovi i skript)
- `style.css` — stilovi (boje i fontovi su CSS varijable u `:root`)
- `script.js` — preloader, sticky header, parallax, smooth scroll, galerija/lightbox, slider utisaka
- `slike/` — fotografije Wedding Centra
- `slike/hotel/` — fotografije hotela (eksterijer, sobe, kupatila, doručak, recepcija)
- `.nojekyll` — da GitHub Pages servira fajlove bez Jekyll obrade

## Objavljivanje na GitHub Pages
1. Napravi repozitorijum na GitHubu (npr. `vanilla-sajt`).
2. Ubaci sadržaj ovog foldera u root repozitorijuma (`index.html` mora biti u rootu).
3. Settings → Pages → Source: `Deploy from a branch`, Branch: `main`, folder `/ (root)` → Save.
4. Sajt je za par minuta na `https://<korisnik>.github.io/<repo>/`.

Za sopstveni domen: Settings → Pages → Custom domain, i kod domen registra postavi
`A` zapise na `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
(ili `CNAME` na `<korisnik>.github.io` za `www`).

## Stranice i navigacija
Obe strane dele `style.css` i `script.js` — isti header, preloader, reveal animacije, parallax,
galerija sa lightboxom i smooth scroll. Navigacija prelazi u hamburger meni ispod 1150px.
`index.html` u navigaciji ima `Hotel` (→ `hotel.html`), a `hotel.html` ima `Wedding Centar`
(→ `index.html`), pa su obe strane povezane u oba smera.

## Šta klijent menja
- **Fotografije** — sve slike su placeholderi sa `placehold.co`. Ubaci prave slike u folder
  `slike/` i zameni `src`/`srcset`. Preporuka: WebP + JPG fallback, širina 1600–1920px za hero,
  1000–1200px za kartice i galeriju.
- **Hero video** — u `index.html` je komentar iznad `<section class="hero">` sa gotovim `<video>`
  snippetom. Video max 3MB, obavezno `poster` slika.
- **Google mapa** — trenutno embed po adresi. Za tačan pin: Google Maps → Share → Embed a map →
  kopiraj `src` u `<iframe class="map">`.
- **Telefon i WhatsApp** — sajt nema formu; sve vodi na poziv. Broj se menja na 4 mesta u
  `index.html`: header (`tel:`), mobilni meni, kontakt sekcija (veliki broj + dugmad
  `tel:` i `https://wa.me/…`) i JSON-LD `telephone`.
- **Social linkovi** — Instagram i Facebook `href` u footeru.

## SEO
Naslovi, `alt` atributi, Open Graph/Twitter meta i JSON-LD (`EventVenue` + `LocalBusiness`)
su postavljeni. Pre objave zameni `og:image`, `canonical` URL i proveri geo koordinate.
