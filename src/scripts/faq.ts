// FAQ accordion — single-open pattern
document.querySelectorAll<HTMLElement>('.faq-item').forEach((item) => {
  const q = item.querySelector<HTMLButtonElement>('.faq-question');
  if (!q) return;
  q.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((o) => o.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});
