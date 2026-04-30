import type { ReactNode } from 'react';
import { T } from './theme';

export function Chapter({
  id,
  number,
  kicker,
  title,
  lede,
  children,
}: {
  id: string;
  number: string;
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      style={{
        padding: '120px 48px',
        maxWidth: 1180,
        margin: '0 auto',
        scrollMarginTop: 40,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 10 }}>
        <span style={{ fontSize: 13, letterSpacing: 3, color: T.coral, fontWeight: 700 }}>{number}</span>
        <span style={{ fontSize: 13, letterSpacing: 2, color: T.textSubtle, fontWeight: 600, textTransform: 'uppercase' }}>
          {kicker}
        </span>
      </div>
      <h2
        style={{
          fontSize: 'clamp(32px, 4.4vw, 52px)',
          lineHeight: 1.08,
          letterSpacing: -1,
          margin: '0 0 28px',
          color: T.textDark,
          fontWeight: 800,
          maxWidth: 820,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 'clamp(17px, 1.65vw, 22px)',
          lineHeight: 1.55,
          color: T.textBody,
          maxWidth: 680,
          margin: '0 0 56px',
          fontWeight: 400,
        }}
      >
        {lede}
      </p>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        fontSize: 18,
        lineHeight: 1.7,
        color: T.textBody,
        maxWidth: 680,
      }}
    >
      {children}
    </div>
  );
}

export function Analogy({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside
      style={{
        margin: '40px 0',
        padding: '24px 28px',
        borderLeft: `3px solid ${T.coral}`,
        background: 'transparent',
        maxWidth: 640,
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: 2, color: T.coral, fontWeight: 700, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 18, lineHeight: 1.6, color: T.textDark, fontStyle: 'italic', fontWeight: 500 }}>
        {children}
      </div>
    </aside>
  );
}

export function Stage({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div
      style={{
        background: T.card,
        borderRadius: 18,
        padding: '40px 44px',
        margin: '48px 0',
        color: T.off,
        position: 'relative',
        boxShadow: '0 2px 20px rgba(30, 34, 48, 0.08)',
      }}
    >
      {label && (
        <div style={{ fontSize: 10, letterSpacing: 2.5, color: T.peach, fontWeight: 700, marginBottom: 20 }}>
          {label}
        </div>
      )}
      {children}
    </div>
  );
}
