import { useState } from 'react';
import { T } from '../theme';

function formatTime(ns: number): string {
  if (ns < 1000) return `${ns.toFixed(0)} ns`;
  if (ns < 1e6) return `${(ns / 1e3).toFixed(1)} μs`;
  if (ns < 1e9) return `${(ns / 1e6).toFixed(1)} ms`;
  if (ns < 6e10) return `${(ns / 1e9).toFixed(1)} s`;
  if (ns < 3.6e12) return `${(ns / 6e10).toFixed(1)} min`;
  if (ns < 8.64e13) return `${(ns / 3.6e12).toFixed(1)} hr`;
  if (ns < 3.156e16) return `${(ns / 8.64e13).toFixed(1)} days`;
  if (ns < 3.156e19) return `${(ns / 3.156e16).toFixed(1)} years`;
  if (ns < 3.156e22) return `${(ns / 3.156e19).toFixed(0)}K years`;
  if (ns < 3.156e25) return `${(ns / 3.156e22).toFixed(0)}M years`;
  return `${(ns / 3.156e25).toFixed(0)}B years`;
}

export function SpeedupCurve() {
  const [mode, setMode] = useState<'search' | 'factor'>('search');
  const [logN, setLogN] = useState(mode === 'search' ? 10 : 8);

  const N = Math.pow(10, logN);

  let classical: number;
  let quantum: number;
  let classicalLabel: string;
  let quantumLabel: string;

  if (mode === 'search') {
    classical = N / 2;
    quantum = Math.sqrt(N);
    classicalLabel = 'N/2 (linear scan)';
    quantumLabel = '√N (Grover)';
  } else {
    const bits = Math.ceil(logN * 3.32);
    classical = Math.exp(1.9 * Math.pow(bits, 1 / 3) * Math.pow(Math.log(bits), 2 / 3));
    quantum = Math.pow(bits, 3);
    classicalLabel = 'Sub-exponential (NFS)';
    quantumLabel = 'b³ (Shor)';
  }

  const speedup = classical / Math.max(quantum, 1);

  return (
    <div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        {(['search', 'factor'] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setLogN(m === 'search' ? 10 : 8);
            }}
            style={{
              padding: '8px 18px',
              borderRadius: 6,
              border: `1px solid ${mode === m ? T.coral : T.border}`,
              background: mode === m ? T.coral : 'transparent',
              color: mode === m ? T.off : T.textMuted,
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {m === 'search' ? 'Search' : 'Factoring'}
          </button>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>
          {mode === 'search' ? `Database size: 10^${logN} = ${N.toExponential(1)} entries` : `Number size: ${logN} decimal digits`}
        </div>
        <input
          type="range"
          min={mode === 'search' ? 2 : 3}
          max={mode === 'search' ? 20 : 30}
          value={logN}
          onChange={(e) => setLogN(Number(e.target.value))}
          style={{ width: '100%', maxWidth: 400, accentColor: T.coral }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
        <div style={{ padding: '14px 16px', background: T.cardDeep, borderRadius: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: T.textMuted, fontWeight: 700, marginBottom: 4 }}>
            CLASSICAL
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.textMuted, marginBottom: 2 }}>
            {formatTime(classical)}
          </div>
          <div style={{ fontSize: 10, color: T.textMuted }}>{classicalLabel}</div>
        </div>
        <div style={{ padding: '14px 16px', background: T.cardDeep, borderRadius: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: T.textMuted, fontWeight: 700, marginBottom: 4 }}>
            QUANTUM
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: T.coral, marginBottom: 2 }}>
            {formatTime(quantum)}
          </div>
          <div style={{ fontSize: 10, color: T.textMuted }}>{quantumLabel}</div>
        </div>
        <div style={{ padding: '14px 16px', background: T.cardDeep, borderRadius: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: T.textMuted, fontWeight: 700, marginBottom: 4 }}>
            SPEEDUP
          </div>
          <div style={{ fontSize: 16, fontWeight: 800, color: speedup > 10 ? T.ok : T.off, marginBottom: 2 }}>
            {speedup >= 1e6 ? `${(speedup).toExponential(1)}x` : speedup >= 10 ? `${Math.round(speedup).toLocaleString()}x` : `${speedup.toFixed(1)}x`}
          </div>
          <div style={{ fontSize: 10, color: T.textMuted }}>faster</div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.5 }}>
        {mode === 'search'
          ? `Grover's algorithm searches ${N.toExponential(1)} items in about ${Math.ceil(Math.sqrt(N)).toLocaleString()} steps instead of ${Math.ceil(N / 2).toLocaleString()}.`
          : `Shor's algorithm factors a ${logN}-digit number in polynomial time, while the best classical algorithm takes sub-exponential time.`}
        {speedup > 1e9 && ' At this scale, the quantum advantage is astronomical.'}
      </div>
    </div>
  );
}
