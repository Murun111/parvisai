// Theme toggle — preserves localStorage key 'parvis-theme'
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function apply(theme: 'light' | 'dark') {
  root.setAttribute('data-theme', theme);
}

systemDark.addEventListener('change', (e) => {
  if (!localStorage.getItem('parvis-theme')) apply(e.matches ? 'dark' : 'light');
});

toggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  apply(next);
  localStorage.setItem('parvis-theme', next);
});
