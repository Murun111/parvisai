// Page transitions — fade out before navigation, fade in on arrival
window.addEventListener('pageshow', () => {
  document.body.classList.remove('page-leaving');
  window.scrollTo(0, 0);
});

document.querySelectorAll<HTMLAnchorElement>('a.transition-link').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (href === window.location.pathname) return;
    if (link.target === '_blank') return;
    e.preventDefault();
    document.body.classList.add('page-leaving');
    window.setTimeout(() => {
      window.location.href = href;
    }, 120);
  });
});
