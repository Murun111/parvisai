const menu = document.getElementById('mobile-menu');
const links = document.getElementById('nav-links');

menu?.addEventListener('click', () => {
  const open = links?.classList.toggle('mobile-open');
  menu.setAttribute('aria-expanded', open ? 'true' : 'false');
});
