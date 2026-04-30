import { useState } from 'react';
import { Chapter, Prose, Analogy, Stage } from '../Chapter';
import { Checkpoint } from '../Checkpoint';
import { T, EASE } from '../theme';
import { ManyQubits } from '../interactives/ManyQubits';

export default function ChapterBit() {
  return (
    <Chapter
      id="bit"
      number="01"
      kicker="Classical vs quantum"
      title="Bits, switches, coins."
      lede="A classical bit is a light switch: on or off. A quantum bit is a spinning coin: it hasn't landed yet. That single difference changes everything."
    >
      <Prose>
        <p>
          Every computer you have ever used thinks in bits. A bit is the simplest possible piece of
          information: yes or no, 1 or 0, on or off. Think of a light switch on a wall. It is either
          up or down. There is no in-between.
        </p>
      </Prose>

      <Stage label="TRY IT">
        <SwitchVsCoin />
      </Stage>

      <Analogy title="THE EVERYDAY VERSION">
        A classical bit is a light switch. A qubit is a spinning coin. The switch is always in one
        position. The coin is genuinely in-between until you slap your hand on the table.
      </Analogy>

      <Prose>
        <p>
          A qubit works differently. Before you measure it, it is not 0 and not 1. It is something
          in between, a combination of both possibilities at once. Physicists call this
          superposition. We will explore it more in the next chapter, but for now, think of a coin
          spinning on a tabletop: it is neither heads nor tails until it lands.
        </p>
        <p style={{ marginTop: 20 }}>
          The moment you look (measure), the qubit "collapses" to a definite value, just like the
          coin landing. And once it has landed, the in-between state is gone.
        </p>
      </Prose>

      <Stage label="SCALE IT UP · 100 QUBITS">
        <ManyQubits />
      </Stage>

      <Checkpoint
        prompt="You flip a coin and slap it on the table. Before you lift your hand, is the coin heads or tails?"
        options={[
          { label: 'Heads', why: 'Not yet. You have not looked. That is exactly how a qubit works before measurement.' },
          { label: 'It is both at once, until you look', correct: true, why: 'Exactly. The outcome does not exist until you observe it. That is superposition.' },
          { label: 'Tails', why: 'Not yet. The coin has not been revealed. A qubit is the same way.' },
        ]}
      />
    </Chapter>
  );
}

function SwitchVsCoin() {
  const [switchOn, setSwitchOn] = useState(false);
  const [spinning, setSpinning] = useState(true);
  const [result, setResult] = useState<'H' | 'T' | null>(null);

  const measure = () => {
    setSpinning(false);
    setResult(Math.random() < 0.5 ? 'H' : 'T');
  };

  const reset = () => {
    setSpinning(true);
    setResult(null);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
      {/* Classical bit */}
      <div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: T.peach, fontWeight: 700, marginBottom: 16 }}>
          CLASSICAL BIT
        </div>
        <button
          onClick={() => setSwitchOn(!switchOn)}
          style={{
            width: 120,
            height: 180,
            borderRadius: 14,
            border: `2px solid ${T.border}`,
            background: switchOn ? T.coral : T.cardDeep,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: `background 200ms ${EASE}`,
            fontFamily: 'inherit',
          }}
        >
          <span style={{ fontSize: 48, color: T.off, fontWeight: 800 }}>{switchOn ? '1' : '0'}</span>
        </button>
        <div style={{ marginTop: 12, fontSize: 14, color: T.textMuted }}>
          Click to toggle. Always exactly 0 or 1.
        </div>
      </div>

      {/* Quantum bit */}
      <div>
        <div style={{ fontSize: 11, letterSpacing: 2, color: T.peach, fontWeight: 700, marginBottom: 16 }}>
          QUBIT
        </div>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            border: `2px solid ${T.border}`,
            background: spinning ? T.card : result === 'H' ? T.coral : T.peach,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: `background 300ms ${EASE}`,
            position: 'relative',
          }}
        >
          {spinning ? (
            <span
              style={{
                fontSize: 14,
                color: T.peach,
                fontWeight: 700,
                letterSpacing: 1,
                animation: 'coinSpin 1.2s linear infinite',
              }}
            >
              ?
            </span>
          ) : (
            <span style={{ fontSize: 36, color: T.off, fontWeight: 800 }}>{result}</span>
          )}
        </div>
        <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
          {spinning ? (
            <button
              onClick={measure}
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
              Measure
            </button>
          ) : (
            <button
              onClick={reset}
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                border: `1px solid ${T.border}`,
                background: 'transparent',
                color: T.peach,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              Reset
            </button>
          )}
        </div>
        <div style={{ marginTop: 8, fontSize: 14, color: T.textMuted }}>
          {spinning ? 'Spinning. Neither 0 nor 1 yet.' : `Landed on ${result === 'H' ? 'heads (0)' : 'tails (1)'}.`}
        </div>
      </div>

      <style>{`
        @keyframes coinSpin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
      `}</style>
    </div>
  );
}
