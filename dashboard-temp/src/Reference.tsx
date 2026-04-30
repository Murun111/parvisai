import QuantumComputingStack from '../QuantumComputingStack';
import { T } from './theme';

export function Reference() {
  return (
    <section id="reference" style={{ padding: '120px 0 80px', background: T.bg }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 48px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
          <span style={{ fontSize: 13, letterSpacing: 3, color: T.coral, fontWeight: 700 }}>REFERENCE</span>
          <span style={{ fontSize: 13, letterSpacing: 2, color: T.textSubtle, fontWeight: 600, textTransform: 'uppercase' }}>
            The dense version
          </span>
        </div>
        <h2
          style={{
            fontSize: 'clamp(28px, 3.6vw, 44px)',
            lineHeight: 1.08,
            letterSpacing: -0.8,
            margin: '0 0 20px',
            color: T.textDark,
            fontWeight: 800,
            maxWidth: 780,
          }}
        >
          The whole stack, on one sheet.
        </h2>
        <p
          style={{
            fontSize: 'clamp(15px, 1.4vw, 19px)',
            lineHeight: 1.55,
            color: T.textBody,
            maxWidth: 680,
            margin: 0,
          }}
        >
          Once the ideas feel familiar, the real terminology stops being scary. Here is the full technical picture in a
          single poster: hardware platforms, state space, circuits, entanglement, error correction, gates, noise,
          algorithms, and the scaling roadmap. Print-ready.
        </p>
      </div>
      <div style={{ maxWidth: 1460, margin: '0 auto', padding: '0 24px' }}>
        <QuantumComputingStack />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        padding: '48px 48px 72px',
        maxWidth: 1180,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <div style={{ height: 1, background: T.rule, margin: '0 auto 28px', maxWidth: 200 }} />
      <div style={{ fontSize: 13, color: T.textSubtle, letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase' }}>
        Made to make hard things feel possible.
      </div>
    </footer>
  );
}
