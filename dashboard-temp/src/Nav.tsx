import { useEffect, useState } from 'react';
import { T, EASE } from './theme';

const ITEMS: { id: string; number: string; label: string }[] = [
  { id: 'hero', number: '·', label: 'Start' },
  { id: 'bit', number: '01', label: 'Bits' },
  { id: 'superposition', number: '02', label: 'Superposition' },
  { id: 'entanglement', number: '03', label: 'Entanglement' },
  { id: 'gates', number: '04', label: 'Gates' },
  { id: 'algorithms', number: '05', label: 'Algorithms' },
  { id: 'reference', number: '·', label: 'Reference' },
];

export function Nav() {
  const [active, setActive] = useState<string | null>('hero');
  const [tooNarrow, setTooNarrow] = useState(false);
  const [rootVisible, setRootVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );
    ITEMS.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Hide nav when the dashboard root scrolls out of view (into parvis-ai header/footer)
  useEffect(() => {
    const root = document.getElementById('quantum-root');
    if (!root) return;
    const obs = new IntersectionObserver(
      ([entry]) => { setRootVisible(entry.isIntersecting); },
      { threshold: 0 },
    );
    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Show only when there's enough left gutter for the nav not to overlap centred content.
    const check = () => setTooNarrow(window.innerWidth < 1440);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Hide on reference (the poster fills the width) and on narrow viewports.
  const hidden = !rootVisible || active === null || active === 'reference' || tooNarrow;

  return (
    <nav
      style={{
        position: 'fixed',
        left: 24,
        top: '50%',
        transform: `translateY(-50%) translateX(${hidden ? '-110%' : '0'})`,
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 2,
        paddingRight: 16,
        borderRight: `1px solid ${T.rule}`,
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
        transition: `opacity 240ms ${EASE}, transform 320ms ${EASE}`,
      }}
      aria-label="Chapter navigation"
      aria-hidden={hidden ? 'true' : undefined}
    >
      {ITEMS.map((it) => (
        <NavRow
          key={it.id}
          number={it.number}
          label={it.label}
          active={active === it.id}
          onClick={() => go(it.id)}
        />
      ))}
    </nav>
  );
}

function NavRow({
  number,
  label,
  active,
  onClick,
}: {
  number: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={`${number} ${label}`}
      aria-current={active ? 'true' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '4px 6px',
        color: active ? T.textDark : T.textSubtle,
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        letterSpacing: 0.4,
        fontFamily: 'inherit',
        transition: `color 180ms ${EASE}`,
        whiteSpace: 'nowrap',
        textAlign: 'left',
      }}
    >
      <span
        style={{
          width: active ? 14 : 6,
          height: 2,
          background: active ? T.coral : T.textSubtle,
          transition: `width 200ms ${EASE}, background 200ms ${EASE}`,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          color: active ? T.coral : T.textSubtle,
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: 1,
          minWidth: 16,
        }}
      >
        {number}
      </span>
      <span>{label}</span>
    </button>
  );
}
