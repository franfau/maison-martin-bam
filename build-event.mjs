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
