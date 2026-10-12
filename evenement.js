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
