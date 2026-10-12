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
