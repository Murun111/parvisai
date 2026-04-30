import { useState, useCallback } from 'react';
import { T, EASE } from '../theme';

type State = [number, number, number, number];

const LABELS = ['|00⟩', '|01⟩', '|10⟩', '|11⟩'];

function applyGate(state: State, gate: string): State {
  const [a00, a01, a10, a11] = state;
  const s2 = 1 / Math.sqrt(2);
  switch (gate) {
    case 'H0':
      return [
        s2 * (a00 + a10),
        s2 * (a01 + a11),
        s2 * (a00 - a10),
        s2 * (a01 - a11),
      ];
    case 'H1':
      return [
        s2 * (a00 + a01),
        s2 * (a00 - a01),
        s2 * (a10 + a11),
        s2 * (a10 - a11),
      ];
    case 'X0':
      return [a10, a11, a00, a01];
    case 'X1':
      return [a01, a00, a11, a10];
    case 'CNOT':
      return [a00, a01, a11, a10];
    default:
      return state;
  }
}

function isEntangled(state: State): boolean {
  const [a00, a01, a10, a11] = state;
  const det = Math.abs(a00 * a11 - a01 * a10);
  return det > 0.01;
}

export function CNOTBuilder() {
  const [state, setState] = useState<State>([1, 0, 0, 0]);
  const [gateLog, setGateLog] = useState<string[]>([]);

  const apply = useCallback((gate: string) => {
    setState((prev) => applyGate(prev, gate));
    setGateLog((prev) => [...prev, gate].slice(-10));
  }, []);

  const reset = () => {
    setState([1, 0, 0, 0]);
    setGateLog([]);
  };

  const bellPair = () => {
    setState([1, 0, 0, 0]);
    setGateLog([]);
    setTimeout(() => {
      setState((s) => applyGate(s, 'H0'));
      setGateLog(['H0']);
      setTimeout(() => {
        setState((s) => applyGate(s, 'CNOT'));
        setGateLog(['H0', 'CNOT']);
      }, 400);
    }, 200);
  };

  const entangled = isEntangled(state);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, color: T.peach, fontWeight: 700, marginBottom: 14 }}>
          PROBABILITIES
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {state.map((amp, i) => {
            const prob = amp * amp;
            return (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    height: 100,
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{
                      width: '70%',
                      height: `${prob * 100}%`,
                      background: prob > 0.01 ? T.coral : T.border,
                      borderRadius: '4px 4px 0 0',
                      transition: `height 300ms ${EASE}`,
                      minHeight: prob > 0.01 ? 4 : 0,
                    }}
                  />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.off }}>{LABELS[i]}</div>
                <div style={{ fontSize: 12, color: T.textMuted }}>{(prob * 100).toFixed(0)}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {entangled && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 14px',
            borderRadius: 6,
            background: 'rgba(74,222,128,0.12)',
            border: `1px solid ${T.ok}`,
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: 12, color: T.ok, fontWeight: 700, letterSpacing: 1 }}>ENTANGLED</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        {['H0', 'H1', 'X0', 'X1', 'CNOT'].map((gate) => (
          <button
            key={gate}
            onClick={() => apply(gate)}
            style={{
              padding: '8px 16px',
              borderRadius: 6,
              border: `1px solid ${gate === 'CNOT' ? T.coral : T.border}`,
              background: gate === 'CNOT' ? 'rgba(249,115,86,0.12)' : T.cardDeep,
              color: gate === 'CNOT' ? T.coral : T.off,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'monospace',
            }}
          >
            {gate}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
        <button
          onClick={bellPair}
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            border: 'none',
            background: T.coral,
            color: T.off,
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Build a Bell pair
        </button>
        <button
          onClick={reset}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: `1px solid ${T.border}`,
            background: 'transparent',
            color: T.textMuted,
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Reset
        </button>
      </div>

      {gateLog.length > 0 && (
        <div>
          <div style={{ fontSize: 10, letterSpacing: 2, color: T.textMuted, fontWeight: 700, marginBottom: 6 }}>
            CIRCUIT
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {gateLog.map((g, i) => (
              <span
                key={i}
                style={{
                  padding: '3px 8px',
                  borderRadius: 4,
                  background: T.cardDeep,
                  fontSize: 13,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  color: g === 'CNOT' ? T.coral : T.peach,
                }}
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
