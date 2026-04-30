import { useState, useCallback } from 'react';
import { Chapter, Prose, Analogy, Stage } from '../Chapter';
import { Checkpoint } from '../Checkpoint';
import { T, EASE } from '../theme';
import { CNOTBuilder } from '../interactives/CNOTBuilder';

export default function ChapterGates() {
  return (
    <Chapter
      id="gates"
      number="04"
      kicker="Gates"
      title="Gates are rotations."
      lede="A classical gate flips a bit. A quantum gate rotates the qubit's state on a sphere. Every quantum computation is a choreographed sequence of rotations."
    >
      <Prose>
        <p>
          Think of a globe. The North Pole is |0⟩ and the South Pole is |1⟩. Every point on the
          surface represents a possible qubit state. Quantum gates are rotations of this globe.
        </p>
        <p style={{ marginTop: 20 }}>
          The X gate spins the globe 180 degrees around the equator: it swaps North and South, so
          it turns |0⟩ into |1⟩ and vice versa, like a classical NOT gate. The Z gate spins around
          the vertical axis: it leaves |0⟩ alone but flips the phase of |1⟩. The H (Hadamard) gate
          rotates to the equator: it puts a |0⟩ qubit into an equal superposition.
        </p>
      </Prose>

      <Stage label="BLOCH SPHERE · ROTATE A QUBIT">
        <BlochGlobe />
      </Stage>

      <Analogy title="THE EVERYDAY VERSION">
        A potter's wheel. The clay is your qubit's state. Each gate is a specific way of turning
        the wheel: a quarter turn, a half turn, a tilt. The sequence of turns shapes the final
        result, just like a sequence of gates shapes a quantum computation.
      </Analogy>

      <Stage label="TWO-QUBIT GATES · BUILD ENTANGLEMENT">
        <CNOTBuilder />
      </Stage>

      <Prose>
        <p>
          The real power comes when you combine single-qubit rotations with two-qubit gates like
          CNOT (controlled-NOT). CNOT flips the second qubit only if the first qubit is |1⟩. This
          conditional logic, combined with superposition, is what creates entanglement and makes
          quantum algorithms possible.
        </p>
      </Prose>

      <Checkpoint
        prompt="Starting from |0⟩, you apply the H gate. What state is the qubit in?"
        options={[
          { label: '|1⟩', why: 'That would be the X gate (a full flip). H goes to the equator, not the South Pole.' },
          { label: 'An equal superposition of |0⟩ and |1⟩', correct: true, why: 'Correct. H rotates from the North Pole to the equator of the Bloch sphere, creating a 50/50 superposition.' },
          { label: 'It stays at |0⟩', why: 'H definitely changes the state. It rotates to the equator.' },
        ]}
      />
    </Chapter>
  );
}

function BlochGlobe() {
  const [state, setState] = useState<{ theta: number; phi: number }>({ theta: 0, phi: 0 });
  const [gateLog, setGateLog] = useState<string[]>([]);

  const applyGate = useCallback((gate: string) => {
    setState((prev) => {
      switch (gate) {
        case 'X':
          return { theta: Math.PI - prev.theta, phi: prev.phi + Math.PI };
        case 'Z':
          return { theta: prev.theta, phi: prev.phi + Math.PI };
        case 'H':
          if (prev.theta < 0.01) return { theta: Math.PI / 2, phi: 0 };
          if (Math.abs(prev.theta - Math.PI) < 0.01) return { theta: Math.PI / 2, phi: Math.PI };
          return { theta: 0, phi: 0 };
        default:
          return prev;
      }
    });
    setGateLog((prev) => [...prev, gate].slice(-8));
  }, []);

  const resetState = () => {
    setState({ theta: 0, phi: 0 });
    setGateLog([]);
  };

  const cx = 150;
  const cy = 150;
  const r = 100;

  const normTheta = ((state.theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  const normPhi = ((state.phi % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

  const stateX = r * Math.sin(normTheta) * Math.cos(normPhi);
  const stateY = -r * Math.cos(normTheta);
  const stateZ = r * Math.sin(normTheta) * Math.sin(normPhi);

  const projX = cx + stateX * 0.86 + stateZ * 0.5;
  const projY = cy + stateY * 0.86 + stateZ * 0.2;

  const getDescription = () => {
    if (normTheta < 0.01) return '|0⟩ (North Pole)';
    if (Math.abs(normTheta - Math.PI) < 0.01) return '|1⟩ (South Pole)';
    if (Math.abs(normTheta - Math.PI / 2) < 0.01) {
      if (normPhi < 0.01 || Math.abs(normPhi - 2 * Math.PI) < 0.01) return '|+⟩ (equal mixture)';
      if (Math.abs(normPhi - Math.PI) < 0.01) return '|-⟩ (equal mixture, opposite phase)';
    }
    const prob0 = Math.cos(normTheta / 2) ** 2;
    return `${(prob0 * 100).toFixed(0)}% |0⟩, ${((1 - prob0) * 100).toFixed(0)}% |1⟩`;
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <svg width={300} height={300} viewBox="0 0 300 300" style={{ flexShrink: 0 }}>
          <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.35} fill="none" stroke={T.border} strokeWidth={0.8} strokeDasharray="4 3" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={T.border} strokeWidth={1} />
          <line x1={cx} y1={cy - r - 10} x2={cx} y2={cy + r + 10} stroke={T.border} strokeWidth={0.5} strokeDasharray="3 3" />

          <text x={cx + 6} y={cy - r - 14} fill={T.textMuted} fontSize={12} fontWeight={600}>|0⟩</text>
          <text x={cx + 6} y={cy + r + 22} fill={T.textMuted} fontSize={12} fontWeight={600}>|1⟩</text>

          <line x1={cx} y1={cy} x2={projX} y2={projY} stroke={T.coral} strokeWidth={2.5} strokeLinecap="round" />
          <circle cx={projX} cy={projY} r={6} fill={T.coral} />
          <circle cx={cx} cy={cy} r={3} fill={T.textMuted} />
        </svg>

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: T.peach, fontWeight: 700, marginBottom: 12 }}>
            CURRENT STATE
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.off, marginBottom: 20 }}>
            {getDescription()}
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
            {['H', 'X', 'Z'].map((gate) => (
              <button
                key={gate}
                onClick={() => applyGate(gate)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 8,
                  border: `1px solid ${T.border}`,
                  background: T.cardDeep,
                  color: T.off,
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                  transition: `transform 120ms ${EASE}`,
                }}
              >
                {gate}
              </button>
            ))}
            <button
              onClick={resetState}
              style={{
                padding: '10px 16px',
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
                GATE SEQUENCE
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
                      color: T.peach,
                    }}
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
