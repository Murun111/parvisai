import { useState, useCallback } from 'react';
import { Chapter, Prose, Analogy, Stage } from '../Chapter';
import { Checkpoint } from '../Checkpoint';
import { T, EASE } from '../theme';
import { BellTest } from '../interactives/BellTest';

export default function ChapterEntanglement() {
  return (
    <Chapter
      id="entanglement"
      number="03"
      kicker="Entanglement"
      title="A secret no cable carries."
      lede="Two qubits can be linked so tightly that measuring one instantly tells you about the other, no matter how far apart they are. No signal travels. The correlation was baked in from the start."
    >
      <Prose>
        <p>
          Imagine you and a friend each take a sealed envelope from the same deck. You fly to Tokyo.
          Your friend stays in New York. You open your envelope and find a red card. Instantly you
          know your friend has the blue card. No phone call needed.
        </p>
        <p style={{ marginTop: 20 }}>
          That sounds like ordinary correlation: the cards were sorted before you left. But quantum
          entanglement is stranger. The "colour" of each card does not exist until you open the
          envelope. Both are genuinely undecided until the moment one is observed, and then both
          snap to opposite values at once.
        </p>
      </Prose>

      <Stage label="ENTANGLED COINS">
        <PairedCoins />
      </Stage>

      <Analogy title="THE EVERYDAY VERSION">
        A pair of gloves. You grab one from a dark room and fly across the world. When you open
        your bag and see the left glove, you instantly know the other one is right. No message
        needed. The pairing was there from the start.
      </Analogy>

      <Stage label="BELL TEST · PROVING IT IS NOT A TRICK">
        <BellTest />
      </Stage>

      <Prose>
        <p>
          Einstein called this "spooky action at a distance" because he thought there must be a
          hidden plan, like the pre-sorted cards. But experiments (Bell tests) have proven him
          wrong: the correlations are too strong to be explained by any hidden plan. Quantum
          mechanics really is that strange.
        </p>
      </Prose>

      <Checkpoint
        prompt="Two entangled qubits are separated by 1,000 km. You measure qubit A and get 0. What do you know about qubit B?"
        options={[
          { label: 'Nothing, the distance is too far', why: 'Distance does not matter for entanglement. The correlation holds regardless of separation.' },
          { label: 'It will definitely be 1 (for an opposite-type bond)', correct: true, why: 'Correct. With an opposite-type entangled pair, if A is 0, B is guaranteed to be 1. This happens instantly, regardless of distance.' },
          { label: 'It has a 50/50 chance of either', why: 'Before measurement, each qubit individually is 50/50. But once you measure one, the other is determined by the entanglement bond.' },
        ]}
      />
    </Chapter>
  );
}

function PairedCoins() {
  const [bondType, setBondType] = useState<'opposite' | 'same'>('opposite');
  const [spinning, setSpinning] = useState(true);
  const [resultA, setResultA] = useState<0 | 1 | null>(null);
  const [resultB, setResultB] = useState<0 | 1 | null>(null);
  const [history, setHistory] = useState<{ a: 0 | 1; b: 0 | 1 }[]>([]);

  const measure = useCallback(() => {
    const a: 0 | 1 = Math.random() < 0.5 ? 0 : 1;
    const b: 0 | 1 = bondType === 'opposite' ? (a === 0 ? 1 : 0) : a;
    setResultA(a);
    setResultB(b);
    setSpinning(false);
    setHistory((prev) => [{ a, b }, ...prev].slice(0, 12));
  }, [bondType]);

  const reset = () => {
    setSpinning(true);
    setResultA(null);
    setResultB(null);
  };

  return (
    <div>
      <div style={{ marginBottom: 20, display: 'flex', gap: 10 }}>
        <div style={{ fontSize: 12, color: T.textMuted, marginRight: 8, lineHeight: '32px' }}>Bond type:</div>
        {(['opposite', 'same'] as const).map((type) => (
          <button
            key={type}
            onClick={() => { setBondType(type); reset(); }}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: `1px solid ${bondType === type ? T.coral : T.border}`,
              background: bondType === type ? T.coral : 'transparent',
              color: bondType === type ? T.off : T.textMuted,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {type === 'opposite' ? 'Opposite' : 'Same'}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 24, alignItems: 'center', marginBottom: 28 }}>
        <CoinCard label="TOKYO" sublabel="Qubit A" spinning={spinning} result={resultA} color={T.coral} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 20, color: spinning ? T.textMuted : T.ok }}>
            {spinning ? '~' : '⚡'}
          </div>
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: T.textMuted, fontWeight: 700 }}>
            {spinning ? 'ENTANGLED' : 'CORRELATED'}
          </div>
        </div>
        <CoinCard label="NEW YORK" sublabel="Qubit B" spinning={spinning} result={resultB} color={T.peach} />
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        {spinning ? (
          <button
            onClick={measure}
            style={{
              padding: '10px 22px',
              borderRadius: 8,
              border: 'none',
              background: T.coral,
              color: T.off,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Measure qubit A
          </button>
        ) : (
          <button
            onClick={reset}
            style={{
              padding: '10px 22px',
              borderRadius: 8,
              border: `1px solid ${T.border}`,
              background: 'transparent',
              color: T.peach,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Reset pair
          </button>
        )}
      </div>

      {history.length > 0 && (
        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, color: T.textMuted, fontWeight: 700, marginBottom: 8 }}>
            HISTORY
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: T.cardDeep,
                  fontSize: 13,
                  color: T.textMuted,
                  fontFamily: 'monospace',
                }}
              >
                A={h.a} B={h.b}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CoinCard({
  label,
  sublabel,
  spinning,
  result,
  color,
}: {
  label: string;
  sublabel: string;
  spinning: boolean;
  result: 0 | 1 | null;
  color: string;
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 10, letterSpacing: 2, color: T.textMuted, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 12 }}>{sublabel}</div>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: `2px solid ${T.border}`,
          background: spinning ? T.card : color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          transition: `background 300ms ${EASE}`,
        }}
      >
        {spinning ? (
          <span style={{ fontSize: 18, color: T.textMuted, animation: 'coinSpin 1.2s linear infinite' }}>?</span>
        ) : (
          <span style={{ fontSize: 28, fontWeight: 800, color: T.off }}>{result}</span>
        )}
      </div>
      <style>{`@keyframes coinSpin { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }`}</style>
    </div>
  );
}
