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
