# Maison Martin BAM — code complet pour Netlify et Decap CMS

Les blocs ci-dessous correspondent exactement aux fichiers du dossier livré. Copiez-les sans les délimiteurs ``` dans les fichiers portant le nom indiqué.

Conservez les fichiers Markdown déjà présents dans votre dépôt. Le fichier horaires fourni est une initialisation uniquement : ne remplacez pas vos vrais horaires par ces valeurs. Aucun plat ni prix fictif n’est livré.

## Installation

1. Décompressez l’archive et placez son contenu à la racine du dépôt GitHub : index.html, style.css, app.js, build.mjs, package.json, package-lock.json, netlify.toml, admin/, content/ et images/.
2. Gardez vos vrais fichiers content/carte/*.md et content/infos/horaires.md. Conservez les dossiers vides avec leur fichier .gitkeep si vous n’avez pas encore de carte.
3. Dans Netlify, utilisez la branche main, la commande `npm run build` et le dossier publié `dist`. Les réglages sont aussi dans netlify.toml. Le dossier de base doit correspondre à celui contenant package.json.
4. Votre backend git-gateway doit être configuré sur Netlify avec Identity et vos comptes d’administration sur invitation. La présence du config.yml ne suffit pas à établir la connexion. Git Gateway est déprécié chez Netlify : si vous ne l’avez pas déjà configuré et fonctionnel, nous devrons adapter le backend Decap. Aucun secret GitHub ne doit être ajouté au code public.
5. Connectez-vous à /admin/ sur votre site Netlify, créez un plat, publiez et attendez la réussite du déploiement pour vérifier l’affichage.

Le build lit vos fichiers Markdown et fabrique le HTML ainsi que `/content/data.json`. Le navigateur peut ainsi afficher tous les nouveaux plats sans appeler l’API GitHub. Les textes de la carte et les horaires sont aussi présents dans le HTML pour les moteurs de recherche et sans JavaScript. Les prix ne sont pas enregistrés dans LocalStorage.

**Portée :** cette version gère la carte, les horaires, les coordonnées, les alertes et des rubriques supplémentaires. Les autres textes et couleurs restent dans HTML/CSS. Les réglages et données de la base de l’ancien site ChatGPT ne sont pas automatiquement migrés. Les commandes/paiements ne sont pas activés. Aucun déploiement Netlify ni aucune connexion à votre dépôt n’a été effectué ici.

**Confidentialité :** la protection privée ChatGPT ne se transfère pas à Netlify. Si vous souhaitez rester seule à accéder au site, configurez une protection Netlify avant la mise en ligne. La connexion Decap protège l’édition, pas la lecture du site.

**Images :** copiez le dossier `images/` de l’archive, contenant le logo et les illustrations réels. Leurs fichiers binaires ne sont pas remplaçables par un bloc de texte.

## index.html

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Restaurant Sérignan-du-Comtat | Maison Martin BAM</title>
  <meta name="description" content="Maison Martin BAM, restaurant à Sérignan-du-Comtat : cuisine maison, plats à emporter et repas à partager dans le Vaucluse (84). Découvrez la carte et les horaires.">
  <meta name="theme-color" content="#f9e0cf">
  <link rel="stylesheet" href="/style.css">
  <script src="/app.js" defer></script>
</head>
<body>
  <a class="skip" href="#main">Aller au contenu</a>
  <header class="header">
    <a class="wordmark" href="/" aria-label="Maison Martin BAM, accueil">Maison Martin
      <img src="/images/bam-wordmark.svg" alt="BAM" width="100" height="24">
    </a>
    <nav aria-label="Navigation principale">
      <a href="#cuisine">Notre cuisine</a><a href="#carte">La carte</a><a href="/evenement/">Événement</a><a href="#venir">Nous trouver</a>
    </nav>
    <a class="button" href="#carte">Voir la carte ↗</a>
  </header>
  <div id="alerte" role="status"><!-- ALERTE --></div>
  <main id="main">
    <section class="hero">
      <div>
        <p class="eyebrow">MAISON MARTIN · SÉRIGNAN-DU-COMTAT</p>
        <h1>Le restaurant<br>qui <em>s’emporte.</em></h1>
        <p class="intro">Cuisiné chez nous,<br>dégusté où vous voulez.</p>
        <p>Votre restaurant à Sérignan-du-Comtat vous accueille autour d’une cuisine maison : des plats à emporter, à partager ou à savourer sur place.</p>
        <a class="button" href="#carte">Découvrir les plats ↓</a>
      </div>
      <img class="logo" src="/images/logo.png" alt="Maison Martin BAM — Le restaurant qui s’emporte" width="500" height="500">
    </section>
    <div class="ribbon" aria-hidden="true">FAIT MAISON ✳ GOURMAND ✳ CONVIVIAL ✳ BAM !</div>
    <section id="cuisine" class="section">
      <p class="eyebrow">À CHAQUE ENVIE, SON MOMENT</p>
      <h2>Chez BAM,<br>on trouve quoi ?</h2>
      <div class="offers">
        <article><span class="eyebrow">01 / LE MIDI</span><img src="/images/tartine-transparent.png" alt="Illustration d’une tartine" loading="lazy"><h3>Le déjeuner</h3><p>Sandwichs maison, bowls, salades-repas et plats individuels pour votre pause déjeuner.</p></article>
        <article><span class="eyebrow">02 / À PLUSIEURS</span><img src="/images/plat-transparent.png" alt="Illustration d’un plat à partager" loading="lazy"><h3>Plats à emporter</h3><p>Plats mijotés, recettes familiales, légumes cuisinés et accompagnements : la cuisine Maison Martin s’invite à votre table.</p></article>
        <article><span class="eyebrow">03 / LA PAUSE DOUCE</span><img src="/images/cafe-transparent.png" alt="Illustration d’une tasse de café" loading="lazy"><h3>Le goûter</h3><p>Pâtisseries maison et boissons chaudes. Le plaisir de prendre son temps.</p></article>
      </div>
      <p class="vegetal">✳ Du végétal aussi : une cuisine gourmande qui a toute sa place à table.</p>
    </section>
    <section class="story section">
      <p class="eyebrow">LA MÊME MAISON. UNE NOUVELLE FORMULE.</p>
      <h2>On change de formule,<br><em>pas de cuisine.</em></h2>
      <p>Maison Martin conserve son identité et son goût du fait maison. Avec BAM, profitez de notre cuisine à Sérignan-du-Comtat, chez vous… ou ici.</p>
      <p>Vous recherchez un traiteur dans le Vaucluse (84) pour un repas à partager ? Contactez Maison Martin pour échanger sur vos envies et les possibilités du moment.</p>
    </section>
    <section id="carte" class="section">
      <p class="eyebrow">À VOUS DE CHOISIR</p>
      <h2>La carte de la maison.</h2>
      <p>Découvrez nos recettes et leurs prix. Les commandes et le paiement en ligne ne sont pas encore ouverts.</p>
      <div id="filters" class="filters" role="group" aria-label="Filtrer les plats" hidden>
        <button type="button" data-category="Tout" aria-pressed="true">Tout</button>
        <button type="button" data-category="Entrée" aria-pressed="false">Entrées</button>
        <button type="button" data-category="Plat" aria-pressed="false">Plats</button>
        <button type="button" data-category="Dessert" aria-pressed="false">Desserts</button>
        <button type="button" data-category="Vente à emporter" aria-pressed="false">Vente à emporter</button>
      </div>
      <div id="menu" class="menu"><!-- MENU --></div>
      <p id="menu-status" role="status"></p>
    </section>
    <div id="rubriques"><!-- RUBRIQUES --></div>
    <section id="venir" class="visit section">
      <div><p class="eyebrow">À EMPORTER. OU À DÉGUSTER ICI.</p><h2>On se retrouve<br>à la maison ?</h2></div>
      <div id="infos"><!-- INFOS --></div>
    </section>
  </main>
  <footer>
    <a class="wordmark" href="/">Maison Martin<img src="/images/bam-wordmark.svg" alt="BAM" width="100" height="24"></a>
    <p>Cuisiné chez nous, dégusté où vous voulez.</p>
    <a href="https://www.instagram.com/restaurant_maisonmartin/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
    <a href="/admin/">Gérer le site</a>
  </footer>
</body>
</html>
```

## style.css

```css
:root{--cream:#f9e0cf;--accent:#596925;--pink:#e4a696;--ink:#1d1d1b;--line:#1d1d1b30}
*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:20px}
body{margin:0;background:var(--cream);color:var(--ink);font:16px/1.65 Avenir,"Trebuchet MS",sans-serif}
a{color:inherit}button{font:inherit;cursor:pointer}img{max-width:100%;height:auto}
[hidden]{display:none!important}:focus-visible{outline:3px solid var(--accent);outline-offset:5px}
.skip{position:absolute;top:-100px}.skip:focus{top:8px;left:8px;background:white;padding:10px;z-index:5}
.header,footer{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:24px 6%;flex-wrap:wrap}
.header{border-bottom:1px solid var(--line)}.wordmark{font:italic 25px/1.15 Georgia,serif;text-decoration:none}
.wordmark img{display:block;width:100px;margin-top:6px}nav{display:flex;gap:25px}nav a{text-decoration:none;font-size:14px}
.button{display:inline-flex;padding:13px 23px;background:var(--accent);color:white;text-decoration:none;font-weight:bold;font-size:14px}
.button:hover{background:#46531d}.hero{display:grid;grid-template-columns:1.15fr 1fr;gap:45px;align-items:center;padding:65px 6%}
.hero p:not(.eyebrow){max-width:500px}.logo{width:100%;max-width:440px;border-radius:50%;justify-self:center}
.eyebrow{font-size:11px;letter-spacing:2px;font-weight:bold}h1,h2,h3{line-height:1.08;margin-top:0}
h1{font:900 clamp(52px,6.5vw,94px)/1 "Arial Black",Arial,sans-serif;letter-spacing:-4px;color:var(--accent);margin-bottom:28px}
h2{font:900 clamp(34px,4.5vw,62px)/1.08 "Arial Black",Arial,sans-serif;letter-spacing:-2px;margin-bottom:28px}
h1 em,h2 em{font-family:Georgia,serif;font-weight:normal}.intro{font-size:25px;line-height:1.25}
.ribbon{padding:18px;text-align:center;background:var(--accent);color:var(--cream);font-weight:bold;letter-spacing:3px}
.section{padding:75px 6%}.offers{display:grid;grid-template-columns:repeat(3,1fr);gap:35px;margin-top:40px}
.offers article{border-top:1px solid;padding-top:20px}.offers img{display:block;width:100%;height:185px;object-fit:contain;margin:22px 0}
h3{font-size:23px}.vegetal{border-top:1px solid var(--line);padding-top:28px;margin-top:35px}
.story{background:var(--accent);color:var(--cream);text-align:center}.story p:not(.eyebrow){max-width:800px;margin:20px auto}
.filters{display:flex;flex-wrap:wrap;gap:10px;margin:30px 0}.filters button{padding:9px 17px;border:1px solid var(--ink);border-radius:30px;background:transparent}
.filters button[aria-pressed=true]{background:var(--ink);color:var(--cream)}.menu{display:grid;grid-template-columns:1fr 1fr;gap:0 35px}
.dish{padding:25px 0;border-top:1px solid var(--line);overflow-wrap:anywhere}.dish-head{display:flex;justify-content:space-between;gap:20px}
.dish h3{font-size:21px;margin:0}.price{color:var(--accent);white-space:nowrap}.dish small{display:block;margin:10px 0;color:var(--accent)}
.markdown img{max-height:420px;object-fit:contain}.markdown p:last-child{margin-bottom:0}.markdown pre{overflow:auto}.markdown a{overflow-wrap:anywhere}
.visit{display:grid;grid-template-columns:1fr 1fr;gap:45px;background:var(--pink)}address{font-style:normal;white-space:pre-line}
#infos p{white-space:pre-line}#alerte:not(:empty){padding:16px 6%;background:var(--pink);text-align:center;white-space:pre-line}
.rubrique{border-top:1px solid var(--line);overflow-wrap:anywhere}.rubrique>img{max-height:420px;display:block;margin-top:25px}
footer{border-top:1px solid var(--line);font-size:13px}.empty{grid-column:1/-1}
@media(max-width:760px){.header{gap:18px}.header nav{order:3;width:100%;justify-content:space-between;gap:10px}.header .button{padding:10px 15px}
.hero,.visit,.offers,.menu{grid-template-columns:1fr}.hero,.section{padding:45px 6%}.logo{max-width:330px;margin-top:20px}
h1{letter-spacing:-3px}.ribbon{font-size:12px;letter-spacing:1px}.offers{gap:30px}footer{align-items:flex-start}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}

/* Page Événement */
.header nav a[aria-current=page]{color:var(--accent);font-weight:bold;border-bottom:1px solid}
.event-hero{display:grid;grid-template-columns:1.5fr 1fr;gap:50px;align-items:center}
.event-hero h1{font-size:clamp(42px,5.5vw,78px);letter-spacing:-3px;max-width:950px}
.event-hero>img{width:100%;height:300px;object-fit:contain}.event-intro{font-size:20px;max-width:650px}
.event-menus{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:25px}
.event-menu{display:flex;flex-direction:column;border:1px solid var(--accent);padding:30px 25px;overflow-wrap:anywhere}
.event-menu:nth-child(2){background:var(--accent);color:var(--cream)}.event-menu:nth-child(2) .button{background:var(--cream);color:var(--accent)}
.event-menu h3{font-size:28px;margin-bottom:18px}.event-price{font-size:28px;font-weight:bold;line-height:1.3;margin:0}
.event-price small{font-size:13px;font-weight:normal}.price-note{font-size:13px;min-height:22px;margin-top:5px}
.event-menu dl{margin:8px 0 30px}.event-menu dt{font-size:11px;letter-spacing:2px;text-transform:uppercase;font-weight:bold;margin-top:20px}
.event-menu dd{margin:6px 0 0;white-space:pre-line}.event-menu .button{margin-top:auto;align-self:flex-start}
.event-carte{background:#fff5ed}.event-categories{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:35px}
.event-categories h3{color:var(--accent)}.event-categories h4{font-size:18px;line-height:1.3;margin:0}.event-categories .dish{padding:20px 0}
.event-reservation{display:grid;grid-template-columns:1fr 1.2fr;gap:65px;background:var(--pink)}
.preserve{white-space:pre-line;overflow-wrap:anywhere}.phone-link{font-size:26px;font-weight:bold;text-decoration:none}
.event-phone a{overflow-wrap:anywhere}.form-note{font-size:13px}.reservation-form{padding:30px;background:var(--cream);min-width:0}
.form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}.form-grid label{font-size:13px;font-weight:bold;min-width:0}
.form-grid input,.form-grid select,.form-grid textarea{display:block;width:100%;min-width:0;padding:12px;margin-top:7px;border:1px solid var(--line);border-radius:0;background:#fff5ed;color:var(--ink);font:inherit;font-size:16px}
.form-grid .full{grid-column:1/-1}.form-grid textarea{resize:vertical}.reservation-form button{border:0;cursor:pointer;max-width:100%}
.reservation-form button:disabled{opacity:.6;cursor:wait}#form-status{margin-bottom:0;font-size:14px}.thank-you{max-width:950px;margin:auto}.thank-you>.wordmark{display:inline-block;margin-bottom:50px}
@media(max-width:1000px){.event-reservation{gap:30px;grid-template-columns:1fr}.event-menu{padding:22px 18px}}
@media(max-width:760px){.event-hero,.event-menus,.event-categories{grid-template-columns:1fr}.event-hero{gap:15px}.event-hero>img{height:190px}.form-grid{grid-template-columns:1fr}.reservation-form{padding:22px 18px}.header nav{flex-wrap:wrap}.event-hero h1{letter-spacing:-2px}.event-menus{gap:20px}}
```

## app.js

```javascript
let category = 'Tout';
const filters = document.getElementById('filters');
const menu = document.getElementById('menu');
const status = document.getElementById('menu-status');

function filterMenu() {
  const dishes = [...menu.querySelectorAll('.dish')];
  filters.hidden = dishes.length === 0;
  let count = 0;
  for (const dish of dishes) {
    dish.hidden = category !== 'Tout' && dish.dataset.category !== category;
    if (!dish.hidden) count++;
  }
  filters.querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.category === category));
  });
  status.textContent = dishes.length && !count ? 'Aucun plat dans cette catégorie pour le moment.' : '';
}
filters.addEventListener('click', event => {
  const button = event.target.closest('button[data-category]');
  if (!button) return;
  category = button.dataset.category;
  filterMenu();
});
filterMenu();

// Ce JSON est produit par build.mjs à partir des fichiers Markdown de Decap.
// Le HTML initial contient déjà la carte et les horaires pour le référencement.
fetch('/content/data.json', { cache: 'no-store' })
  .then(response => {
    if (!response.ok) throw new Error('Contenu indisponible');
    return response.json();
  })
  .then(data => {
    for (const key of ['menu', 'infos', 'rubriques', 'alerte']) {
      if (typeof data[key] !== 'string') throw new Error('Contenu invalide');
    }
    // HTML généré par le build : métadonnées échappées et Markdown sans HTML brut.
    for (const key of ['menu', 'infos', 'rubriques', 'alerte']) {
      document.getElementById(key).innerHTML = data[key];
    }
    filterMenu();
  })
  .catch(() => {
    status.textContent = 'Actualisation indisponible. La version déjà chargée reste affichée.';
  });

// Les invitations et récupérations de compte Identity peuvent arriver sur l’accueil.
if (/(?:^#|&)(invite_token|recovery_token|confirmation_token)=/.test(location.hash)) {
  location.replace('/admin/' + location.hash);
}
```

## admin/index.html

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Gestion du site — Maison Martin BAM</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

## admin/config.yml

```yaml
backend:
  name: git-gateway
  branch: main

locale: fr
media_folder: images
public_folder: /images

collections:
  - name: carte
    label: La Carte du Restaurant
    folder: content/carte
    create: true
    extension: md
    format: frontmatter
    slug: "{{slug}}"
    fields:
      - {label: Nom du Plat, name: title, widget: string}
      - {label: "Prix (en €)", name: price, widget: number, value_type: float, min: 0}
      - {label: Description ou Ingrédients, name: body, widget: markdown}
      - label: Catégorie
        name: categorie
        widget: select
        options: [Entrée, Plat, Dessert, Vente à emporter]

  - name: infos
    label: Informations pratiques
    files:
      - file: content/infos/horaires.md
        label: Horaires & Infos
        name: horaires
        fields:
          - {label: Téléphone du Restaurant, name: telephone, widget: string}
          - {label: Adresse complète, name: adresse, widget: string}
          - {label: Horaires du Midi, name: midi, widget: string}
          - {label: Horaires du Soir, name: soir, widget: string}
          - {label: Message d’alerte, name: alerte, widget: text, required: false}

  - name: rubriques
    label: Rubriques supplémentaires
    folder: content/rubriques
    create: true
    extension: md
    format: frontmatter
    slug: "{{slug}}"
    fields:
      - {label: Titre, name: title, widget: string}
      - {label: Texte, name: body, widget: markdown}
      - {label: Image, name: image, widget: image, required: false}
      - {label: Ordre, name: ordre, widget: number, value_type: int, default: 1}
      - {label: Afficher, name: visible, widget: boolean, default: true}

  - name: evenement
    label: Page Événement
    files:
      - file: content/evenement.md
        label: Menus, carte et réservation
        name: evenement
        fields:
          - {label: Titre de la page, name: title, widget: string}
          - {label: Présentation, name: introduction, widget: text}
          - {label: Téléphone pour les événements, name: telephone, widget: string, required: false, hint: "Si vide, utilise le téléphone des Informations pratiques."}
          - {label: E-mail de contact affiché, name: email, widget: string, required: false, hint: "Les notifications des formulaires se règlent séparément dans Netlify."}
          - {label: Informations de réservation, name: reservation, widget: text}
          - label: Les trois menus
            name: menus
            widget: list
            min: 3
            max: 3
            summary: "{{fields.title}}"
            fields:
              - {label: Nom du menu, name: title, widget: string}
              - {label: "Prix par personne (€)", name: price, widget: number, value_type: float, min: 0, required: false}
              - {label: Précision du tarif, name: precision, widget: string, required: false, hint: "Ex. hors boissons"}
              - {label: Entrées, name: entrees, widget: text}
              - {label: Plats, name: plats, widget: text}
              - {label: Desserts, name: desserts, widget: text}
          - label: À la carte pour les événements
            name: carte
            widget: list
            required: false
            summary: "{{fields.title}} — {{fields.categorie}}"
            fields:
              - {label: Nom du plat, name: title, widget: string}
              - {label: "Prix (€)", name: price, widget: number, value_type: float, min: 0}
              - {label: Description, name: description, widget: text, required: false}
              - {label: Catégorie, name: categorie, widget: select, options: [Entrée, Plat, Dessert]}
```

## content/infos/horaires.md

```markdown
---
telephone: ""
adresse: "3 place du Général-de-Loye, 84830 Sérignan-du-Comtat"
midi: "Horaires à venir."
soir: "Horaires à venir."
alerte: ""
---
```

## package.json

```json
{
  "name": "maison-martin-bam",
  "private": true,
  "type": "module",
  "scripts": { "build": "node build.mjs" },
  "engines": { "node": ">=22" },
  "dependencies": {
    "gray-matter": "4.0.3",
    "markdown-it": "14.1.0"
  }
}
```

## build.mjs

```javascript
import { readFile, writeFile, readdir, mkdir, cp, rm } from 'node:fs/promises';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { buildEvent } from './build-event.mjs';

const markdown = new MarkdownIt({ html: false, breaks: true });
const categories = ['Entrée', 'Plat', 'Dessert', 'Vente à emporter'];
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[c]);
const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
const read = async path => matter(await readFile(path, 'utf8'));

async function entries(folder) {
  await mkdir(folder, { recursive: true });
  const names = (await readdir(folder)).filter(name => name.endsWith('.md')).sort();
  return Promise.all(names.map(async name => ({ name, ...await read(`${folder}/${name}`) })));
}

const dishes = await entries('content/carte');
const menu = dishes.map(({ data, content, name }) => {
  if (typeof data.title !== 'string' || !data.title.trim() ||
      typeof data.price !== 'number' || !Number.isFinite(data.price) || data.price < 0 ||
      !categories.includes(data.categorie)) {
    throw new Error(`Plat invalide : content/carte/${name}. Vérifiez titre, prix et catégorie.`);
  }
  return `<article class="dish" data-category="${escape(data.categorie)}">
    <div class="dish-head"><h3>${escape(data.title)}</h3>
    <strong class="price">${euros.format(data.price)}</strong></div>
    <small>${escape(data.categorie)}</small>
    <div class="markdown">${markdown.render(content)}</div></article>`;
}).join('\n') || '<p class="empty">La carte se prépare. Les plats et leurs prix seront bientôt disponibles.</p>';

const { data: info } = await read('content/infos/horaires.md');
for (const key of ['telephone', 'adresse', 'midi', 'soir']) {
  if (typeof info[key] !== 'string') throw new Error(`Informations pratiques : champ ${key} invalide.`);
}
if (info.alerte !== undefined && typeof info.alerte !== 'string') throw new Error('Message d’alerte invalide.');
const phone = info.telephone.replace(/[^\d+]/g, '');
const infos = `<h3>Maison Martin · BAM</h3><address>${escape(info.adresse)}</address>
  ${/^\+?\d{6,15}$/.test(phone) ? `<p><a href="tel:${phone}">${escape(info.telephone)}</a></p>` : ''}
  <p><strong>Le midi</strong><br>${escape(info.midi)}</p>
  <p><strong>Le soir</strong><br>${escape(info.soir)}</p>
  <a class="button" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(info.adresse)}" target="_blank" rel="noopener noreferrer">Itinéraire ↗</a>`;

const rubriques = (await entries('content/rubriques'))
  .filter(({ data }) => data.visible !== false)
  .sort((a, b) => (Number(a.data.ordre) || 0) - (Number(b.data.ordre) || 0))
  .map(({ data, content, name }) => {
    if (typeof data.title !== 'string' || !data.title.trim()) throw new Error(`Titre de rubrique invalide : ${name}`);
    const image = typeof data.image === 'string' && /^\/images\/[\w./%-]+\.(png|jpe?g|webp|gif|svg)$/i.test(data.image)
      ? `<img src="${escape(data.image)}" alt="${escape(data.title)}" loading="lazy">` : '';
    return `<section class="section rubrique"><h2>${escape(data.title)}</h2><div class="markdown">${markdown.render(content)}</div>${image}</section>`;
  }).join('\n');

const alerte = escape(info.alerte || '');
let html = await readFile('index.html', 'utf8');
for (const [name, value] of Object.entries({ MENU: menu, INFOS: infos, RUBRIQUES: rubriques, ALERTE: alerte })) {
  const marker = `<!-- ${name} -->`;
  if (!html.includes(marker)) throw new Error(`Repère HTML manquant : ${marker}`);
  html = html.replace(marker, () => value);
}
// Seul ce dossier généré est remplacé. Les fichiers source restent intacts.
await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const name of ['admin', 'images', 'content', 'style.css', 'app.js']) {
  await cp(name, `dist/${name}`, { recursive: true });
}
await writeFile('dist/index.html', html);
await writeFile('dist/content/data.json', JSON.stringify({ menu, infos, rubriques, alerte }));
await buildEvent(info);
console.log(`Site généré : ${dishes.length} plat(s). Sortie : dist/`);
```

## netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "22"

[[headers]]
  for = "/content/data.json"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"

[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Robots-Tag = "noindex, nofollow"
```

## .gitignore

```text
node_modules/
dist/
.DS_Store
```

## Modifier les contenus

Dans Decap : « La Carte du Restaurant » pour les plats, « Informations pratiques » pour les horaires, et « Rubriques supplémentaires » pour ajouter des sections après la carte. Le champ Ordre trie les rubriques ajoutées ; Afficher permet de les masquer. Les champs existants title, price, body, categorie, telephone, adresse, midi, soir et alerte sont conservés.

Les photos peuvent être insérées via le champ Markdown ou dans l’image facultative des rubriques. La carte n’a pas de champ photo distinct dans votre configuration initiale.

## Validation effectuée

Compilation réussie. Tests réussis : lecture YAML, carte vide, création/suppression, prix décimaux, descriptions Markdown sans HTML brut, refus des prix invalides, horaires, alertes multilignes, rubriques affichées/masquées et présence de la carte dans le HTML. Affichage mobile vérifié dans le navigateur. Authentification Decap, commits GitHub et déploiement Netlify restent à tester avec vos comptes.

## Documentation

- [Installer Decap](https://decapcms.org/docs/install-decap-cms/)
- [Configuration Decap](https://decapcms.org/docs/configuration-options/)
- [Statut et configuration de Git Gateway](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/)

## evenement.html

```html
<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Événement — Menus et réservation | Maison Martin BAM</title>
  <meta name="description" content="Préparez votre événement avec Maison Martin BAM à Sérignan-du-Comtat : trois menus, entrées, plats et desserts à la carte. Demandez votre réservation.">
  <meta name="theme-color" content="#596925">
  <link rel="stylesheet" href="/style.css">
  <script src="/evenement.js" defer></script>
</head>
<body>
  <a class="skip" href="#main">Aller au contenu</a>
  <header class="header">
    <a class="wordmark" href="/" aria-label="Maison Martin BAM, accueil">Maison Martin<img src="/images/bam-wordmark.svg" alt="BAM" width="100" height="24"></a>
    <nav aria-label="Navigation principale"><a href="/">Accueil</a><a href="/#carte">La carte</a><a href="/evenement/" aria-current="page">Événement</a></nav>
    <a class="button" href="#reservation">Nous contacter ↗</a>
  </header>
  <main id="main">
    <section class="event-hero section">
      <div><p class="eyebrow">LES BONNES OCCASIONS DE SE RETROUVER</p><h1><!-- TITRE --></h1><p class="intro event-intro"><!-- INTRO --></p><a class="button" href="#menus">Découvrir les menus ↓</a></div>
      <img src="/images/plat-transparent.png" alt="Un plat à partager" width="500" height="300">
    </section>
    <div class="ribbon" aria-hidden="true">À PARTAGER ✳ À CÉLÉBRER ✳ À SAVOURER</div>
    <section id="menus" class="section">
      <p class="eyebrow">TROIS FAÇONS DE SE RÉGALER</p><h2>Nos menus événement.</h2>
      <div class="event-menus"><!-- MENUS --></div>
    </section>
    <section id="carte-evenement" class="section event-carte">
      <p class="eyebrow">SELON VOS ENVIES</p><h2>Ou à la carte.</h2>
      <div class="event-categories"><!-- CARTE --></div>
    </section>
    <section id="reservation" class="section event-reservation">
      <div class="reservation-copy"><p class="eyebrow">PARLONS DE VOTRE ÉVÉNEMENT</p><h2>On organise<br>ça ensemble ?</h2><p class="preserve"><!-- RESERVATION --></p><div class="event-phone"><!-- TELEPHONE --></div><p class="form-note">L’envoi du formulaire est une demande de réservation. Elle sera confirmée personnellement par le restaurant.</p></div>
      <form name="reservation-evenement" method="POST" action="/merci-evenement/" data-netlify="true" netlify-honeypot="bot-field" class="reservation-form">
        <input type="hidden" name="form-name" value="reservation-evenement">
        <p hidden><label>Ne pas remplir ce champ<input name="bot-field" tabindex="-1" autocomplete="off"></label></p>
        <p class="form-note">Les champs marqués * sont obligatoires.</p>
        <div class="form-grid">
          <label>Votre nom *<input name="nom" autocomplete="name" required maxlength="120"></label>
          <label>Votre e-mail *<input type="email" name="email" autocomplete="email" required maxlength="254"></label>
          <label>Votre téléphone *<input type="tel" name="telephone" autocomplete="tel" required maxlength="40"></label>
          <label>Nombre de personnes *<input type="number" name="convives" min="1" step="1" required></label>
          <label>Date souhaitée *<input type="date" name="date" id="date-evenement" required></label>
          <label>Heure souhaitée<input type="time" name="heure"></label>
          <label class="full">Votre préférence<select name="formule" id="formule"><option value="a-definir">À définir ensemble</option><!-- OPTIONS --><option value="a-la-carte">À la carte</option></select></label>
          <label class="full">Votre message *<textarea name="message" rows="5" required maxlength="5000" placeholder="L’occasion, le lieu envisagé, vos envies…"></textarea></label>
        </div>
        <p class="form-note">Vos coordonnées et votre message sont transmis à Maison Martin via Netlify pour traiter votre demande. Évitez d’indiquer des informations sensibles dans ce formulaire.</p>
        <button class="button" type="submit">Envoyer ma demande ↗</button>
        <p id="form-status" role="status" aria-live="polite"></p>
      </form>
    </section>
  </main>
  <footer><a class="wordmark" href="/">Maison Martin<img src="/images/bam-wordmark.svg" alt="BAM" width="100" height="24"></a><a href="/">Retour à l’accueil</a><a href="/admin/">Gérer le site</a></footer>
</body>
</html>
```

## evenement.js

```javascript
const form = document.querySelector('.reservation-form');
const date = document.getElementById('date-evenement');
const choice = document.getElementById('formule');
const status = document.getElementById('form-status');
function updateMinimumDate() {
  const now = new Date();
  date.min = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
}
updateMinimumDate();
date.addEventListener('focus', updateMinimumDate);
document.querySelectorAll('[data-menu-choice]').forEach(link => {
  link.addEventListener('click', () => { choice.value = link.dataset.menuChoice; });
});
form.addEventListener('submit', async event => {
  event.preventDefault();
  // L’aperçu local ne peut pas recevoir de réservations.
  if (['localhost', '127.0.0.1'].includes(location.hostname)) {
    status.textContent = 'Aperçu local : aucun message envoyé. L’envoi sera disponible après activation du formulaire sur Netlify.';
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  const body = new URLSearchParams(new FormData(form));
  button.disabled = true;
  status.textContent = 'Envoi en cours…';
  try {
    const response = await fetch(form.action, {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString()
    });
    if (!response.ok) throw new Error('Envoi refusé');
    location.assign('/merci-evenement/');
  } catch {
    status.textContent = 'L’envoi n’a pas pu être confirmé. Vos informations restent dans le formulaire. Réessayez ou contactez-nous par téléphone.';
    button.disabled = false;
  }
});
```

## merci-evenement.html

```html
<!doctype html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>Votre demande — Maison Martin BAM</title><link rel="stylesheet" href="/style.css"></head>
<body><main class="section thank-you"><a class="wordmark" href="/">Maison Martin<img src="/images/bam-wordmark.svg" alt="BAM" width="100" height="24"></a><p class="eyebrow">MERCI POUR VOTRE MESSAGE</p><h1>À très bientôt<br>chez nous.</h1><p>Votre demande a été transmise. Le restaurant vous recontactera pour préciser votre événement et confirmer les disponibilités.</p><p><strong>Votre réservation ne sera définitive qu’après confirmation de Maison Martin.</strong></p><a class="button" href="/evenement/">Revenir aux événements</a></main></body>
</html>
```

## build-event.mjs

```javascript
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import matter from 'gray-matter';

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const euros = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
function text(value, label, optional = false) {
  if (optional && (value === undefined || value === null)) return '';
  if (typeof value !== 'string' || (!optional && !value.trim())) throw new Error(`Événement : ${label} doit contenir du texte.`);
  return esc(value);
}
function price(value, optional = false) {
  if (optional && (value === undefined || value === null || value === '')) return 'Tarif à venir';
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) throw new Error('Événement : prix invalide.');
  return euros.format(value);
}
export async function buildEvent(info) {
  const { data } = matter(await readFile('content/evenement.md', 'utf8'));
  if (!Array.isArray(data.menus) || data.menus.length !== 3) throw new Error('Événement : il faut exactement trois menus.');
  const menus = data.menus.map((menu, i) => {
    return `<article class="event-menu"><p class="eyebrow">FORMULE ${String(i + 1).padStart(2, '0')}</p>
      <h3>${text(menu.title, 'nom du menu')}</h3><p class="event-price">${price(menu.price, true)}${typeof menu.price === 'number' ? '<small> / personne</small>' : ''}</p>
      <p class="price-note">${text(menu.precision, 'précision du tarif', true)}</p>
      <dl><dt>Entrée</dt><dd>${text(menu.entrees, 'entrées')}</dd><dt>Plat</dt><dd>${text(menu.plats, 'plats')}</dd><dt>Dessert</dt><dd>${text(menu.desserts, 'desserts')}</dd></dl>
      <a class="button" href="#reservation" data-menu-choice="menu-${i + 1}">Choisir ce menu ↗</a></article>`;
  }).join('\n');
  const dishes = data.carte ?? [];
  if (!Array.isArray(dishes)) throw new Error('Événement : carte invalide.');
  const groups = [['Entrée', 'Les entrées'], ['Plat', 'Les plats'], ['Dessert', 'Les desserts']];
  const rendered = dishes.map(dish => {
    if (!groups.some(([category]) => category === dish.categorie)) throw new Error('Événement : catégorie invalide.');
    return { category: dish.categorie, html: `<article class="dish"><div class="dish-head"><h4>${text(dish.title, 'nom du plat')}</h4><strong class="price">${price(dish.price)}</strong></div><p class="preserve">${text(dish.description, 'description', true)}</p></article>` };
  });
  const carte = groups.map(([category, title]) => `<div><h3>${title}</h3>${rendered.filter(dish => dish.category === category).map(dish => dish.html).join('') || '<p>Nos propositions seront annoncées prochainement.</p>'}</div>`).join('\n');
  const phoneText = (data.telephone || info.telephone || '').trim();
  const phone = phoneText.replace(/[^\d+]/g, '');
  if (phoneText && !/^\+?\d{6,15}$/.test(phone)) throw new Error('Événement : numéro de téléphone invalide.');
  const email = (data.email || '').trim();
  if (email && !/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(email)) throw new Error('Événement : adresse e-mail invalide.');
  const contact = (phone ? `<p>Vous préférez en parler ?<br><a class="phone-link" href="tel:${phone}">${esc(phoneText)}</a></p>` : '<p>Le numéro de téléphone sera communiqué prochainement.</p>') + (email ? `<p><a href="mailto:${esc(email)}">${esc(email)}</a></p>` : '');
  const options = data.menus.map((menu, i) => `<option value="menu-${i + 1}">${text(menu.title, 'nom du menu')}</option>`).join('');
  const values = {
    TITRE: text(data.title, 'titre'), INTRO: text(data.introduction, 'présentation'),
    RESERVATION: text(data.reservation, 'informations de réservation'),
    MENUS: menus, CARTE: carte, TELEPHONE: contact, OPTIONS: options
  };
  let html = await readFile('evenement.html', 'utf8');
  for (const [key, value] of Object.entries(values)) {
    const marker = `<!-- ${key} -->`;
    if (!html.includes(marker)) throw new Error(`Repère manquant : ${marker}`);
    html = html.replace(marker, () => value);
  }
  await mkdir('dist/evenement', { recursive: true });
  await mkdir('dist/merci-evenement', { recursive: true });
  await writeFile('dist/evenement/index.html', html);
  await writeFile('dist/merci-evenement/index.html', await readFile('merci-evenement.html'));
  await writeFile('dist/evenement.js', await readFile('evenement.js'));
}
```

## content/evenement.md

```markdown
---
title: "Vos événements, à la façon Maison Martin."
introduction: "Un repas à partager, une occasion à célébrer. Découvrez nos trois menus et nos propositions à la carte, puis échangeons sur votre événement."
telephone: "04 86 38 99 98"
email: "maisonmartin2020@gmail.com"
reservation: "Indiquez la date souhaitée et le nombre de personnes. Nous vous recontacterons pour préciser votre demande et confirmer les disponibilités."
menus:
  - title: "Menu 1"
    price: null
    precision: ""
    entrees: "Les entrées seront annoncées prochainement."
    plats: "Les plats seront annoncés prochainement."
    desserts: "Les desserts seront annoncés prochainement."
  - title: "Menu 2"
    price: null
    precision: ""
    entrees: "Les entrées seront annoncées prochainement."
    plats: "Les plats seront annoncés prochainement."
    desserts: "Les desserts seront annoncés prochainement."
  - title: "Menu 3"
    price: null
    precision: ""
    entrees: "Les entrées seront annoncées prochainement."
    plats: "Les plats seront annoncés prochainement."
    desserts: "Les desserts seront annoncés prochainement."
carte: []
---
```

## Mise en service du formulaire Événement


La page est accessible à `/evenement/` et depuis la navigation de l’accueil. Dans Decap, ouvrir « Page Événement → Menus, carte et réservation ». Vous pouvez modifier le titre, la présentation, le téléphone, l’e-mail affiché, les instructions de réservation, les trois menus (noms, prix par personne, précisions et entrées/plats/desserts) et les plats à la carte. Les plats à la carte des événements sont indépendants de ceux de la carte habituelle. Les modifications sont publiées après le déploiement Netlify.

Le prix d’un menu peut rester vide : le site affiche « Tarif à venir ». Les exemples livrés n’inventent ni recettes ni tarifs.

Le formulaire `reservation-evenement` contient les coordonnées, la date, l’heure, le nombre de personnes, la formule et le message. Un champ anti-robot invisible est inclus. Le formulaire n’encaisse rien et ne confirme aucune disponibilité : la réservation doit être confirmée par le restaurant. Les détails des demandes sont conservés par Netlify Forms, pas dans le dépôt GitHub public.

### Activer les demandes et les e-mails

1. Dans le projet Netlify, aller dans Forms et activer « Enable form detection » avant de redéployer.
2. Après le déploiement, vérifier que le formulaire `reservation-evenement` est détecté.
3. Ajouter une notification e-mail de nouvelle soumission pour ce formulaire, destination `maisonmartin2020@gmail.com`, dans les notifications de formulaire Netlify. Le champ E-mail de contact de Decap change le lien affiché, pas le destinataire des notifications.
4. Envoyer une demande de test depuis le site déployé, vérifier qu’elle apparaît dans Netlify Forms et que l’e-mail est reçu (vérifier aussi les indésirables). Puis retirer la demande de test du tableau Netlify.
5. Vérifier les quotas et conditions Forms de votre offre Netlify avant l’ouverture au public.

Le code est prêt, mais aucune détection de formulaire, notification ni livraison d’e-mail n’a été activée ou vérifiée sur votre compte. L’aperçu local affiche un message de démonstration sans envoyer de demande.

Documentation : https://docs.netlify.com/manage/forms/setup/ et https://docs.netlify.com/manage/forms/notifications/
