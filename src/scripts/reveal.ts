// Staggered scroll reveal for elements opting in via [data-reveal]
const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
targets.forEach((el) => el.classList.add('fade-in'));

if (targets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const groups: Record<string, HTMLElement[]> = {};
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        const parent = target.parentElement;
        const key = parent ? parent.className || parent.tagName : 'root';
        if (!groups[key]) groups[key] = [];
        groups[key].push(target);
        observer.unobserve(target);
      });
      Object.values(groups).forEach((els) => {
        els.forEach((el, i) => {
          window.setTimeout(() => el.classList.add('visible'), i * 80);
        });
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -40px 0px' }
  );
  targets.forEach((el) => observer.observe(el));
}
