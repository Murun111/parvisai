// Animated stat counter — fires once when scrolled into view
const nums = document.querySelectorAll<HTMLElement>('.result-number');
let counted = false;

function animate() {
  if (counted || !nums.length) return;
  counted = true;
  nums.forEach((el) => {
    const text = el.textContent?.trim() ?? '';
    const match = text.match(/^([\d,.]+)/);
    if (!match) return;
    const target = parseFloat(match[1].replace(/,/g, ''));
    const suffix = text.replace(match[1], '');
    const duration = 1200;
    const start = performance.now();
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * ease);
      el.textContent = (target >= 1000 ? current.toLocaleString() : current.toString()) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

if (nums.length) {
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animate();
          obs.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );
  nums.forEach((el) => obs.observe(el));
}
