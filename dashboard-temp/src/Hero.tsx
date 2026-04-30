import { T, EASE } from './theme';

export function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 48px 80px',
        maxWidth: 1180,
        margin: '0 auto',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <span style={{ width: 40, height: 2, background: T.coral, display: 'inline-block' }} />
        <span style={{ fontSize: 12, letterSpacing: 4, color: T.textSubtle, fontWeight: 700 }}>
          A GUIDED TOUR · NO MATH REQUIRED
        </span>
      </div>
      <h1
        style={{
          fontSize: 'clamp(44px, 7.5vw, 88px)',
          lineHeight: 1.04,
          letterSpacing: -2,
          margin: '0 0 32px',
          color: T.textDark,
          fontWeight: 800,
          maxWidth: 980,
        }}
      >
        Quantum computing, through things you already know.
      </h1>
      <p
        style={{
          fontSize: 'clamp(17px, 1.8vw, 24px)',
          lineHeight: 1.5,
          color: T.textBody,
          maxWidth: 720,
          margin: '0 0 56px',
        }}
      >
        Five short chapters. Each one uses an everyday object (a light switch, a spinning coin, a pair of gloves, a
        potter's wheel, a hallway of doors) to make one idea at the heart of quantum computing click.
      </p>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <a
          href="#bit"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('bit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '16px 28px',
            borderRadius: 999,
            background: T.coral,
            color: T.off,
            fontWeight: 700,
            fontSize: 16,
            textDecoration: 'none',
            transition: `transform 180ms ${EASE}`,
          }}
        >
          Begin with chapter one
          <span aria-hidden style={{ fontSize: 18 }}>→</span>
        </a>
        <a
          href="#reference"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('reference')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
          style={{
            color: T.textSubtle,
            fontSize: 15,
            fontWeight: 600,
            textDecoration: 'none',
            borderBottom: `1px solid ${T.rule}`,
            padding: '2px 0',
          }}
        >
          or jump to the reference poster
        </a>
      </div>

      <div style={{ marginTop: 96, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
        {[
          { n: '01', t: 'Bits, switches, coins' },
          { n: '02', t: 'Being many things at once' },
          { n: '03', t: 'A secret no cable carries' },
          { n: '04', t: 'Gates are rotations' },
          { n: '05', t: 'Where quantum wins' },
        ].map((c) => (
          <div key={c.n} style={{ borderTop: `2px solid ${T.textDark}`, paddingTop: 14 }}>
            <div style={{ fontSize: 12, color: T.coral, fontWeight: 800, letterSpacing: 2, marginBottom: 6 }}>
              {c.n}
            </div>
            <div style={{ fontSize: 15, color: T.textDark, fontWeight: 600, lineHeight: 1.35 }}>{c.t}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
