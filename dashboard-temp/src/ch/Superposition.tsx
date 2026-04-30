import { useState, useCallback } from 'react';
import { Chapter, Prose, Analogy, Stage } from '../Chapter';
import { Checkpoint } from '../Checkpoint';
import { T, EASE } from '../theme';
import { Interference } from '../interactives/Interference';

export default function ChapterSuperposition() {
  return (
    <Chapter
      id="superposition"
      number="02"
      kicker="Superposition"
      title="Being many things at once."
      lede="A qubit is not secretly 0 or 1. It is genuinely both, with a tilt you control. Measurement ends the suspense."
    >
      <Prose>
        <p>
          Imagine a dial that lets you tilt a coin before spinning it. Tilt it far left and it
          almost always lands heads. Tilt it far right and it almost always lands tails. Leave it in
          the middle and it is a true 50/50.
        </p>
        <p style={{ marginTop: 20 }}>
          That is superposition. The qubit is in a combination of 0 and 1. The "tilt" is the
          amplitudes, numbers that describe how much of each possibility is in the mix. When you
          measure, the qubit picks one outcome, with a probability set by those amplitudes.
        </p>
      </Prose>

      <Stage label="TILT THE PROBABILITY">
        <ProbabilityTilter />
      </Stage>

      <Analogy title="THE EVERYDAY VERSION">
        Superposition is a loaded coin. You choose the bias before the flip. The bias is real, but
        the outcome is still random. Measuring is slapping your hand down.
      </Analogy>

      <Stage label="INTERFERENCE · MACH-ZEHNDER INTERFEROMETER">
        <Interference />
      </Stage>

      <Prose>
        <p>
          Here is the twist that makes quantum computing powerful: these amplitudes can add together
          or cancel out, just like waves. This is called interference. A quantum algorithm is
          designed so that wrong answers cancel and right answers add up. That is how a quantum
          computer finds needles in haystacks.
        </p>
      </Prose>

      <Checkpoint
        prompt="If a qubit is tilted 70% toward |0⟩ and you measure it 100 times, roughly how many times will you see 0?"
        options={[
          { label: 'Exactly 70', why: 'Close, but quantum mechanics is probabilistic. You would get around 70, not exactly 70.' },
          { label: 'About 70', correct: true, why: 'Right. The 70% tilt means each measurement has a 70% chance of giving 0. Over 100 tries, you will see approximately 70, give or take a few.' },
          { label: '50 (it is always 50/50)', why: 'Only if the tilt is in the exact middle. The whole point of superposition is that you can bias the probabilities.' },
        ]}
      />
    </Chapter>
  );
}

function ProbabilityTilter() {
  const [tilt, setTilt] = useState(50);
  const [results, setResults] = useState<(0 | 1)[]>([]);
  const [lastSingle, setLastSingle] = useState<0 | 1 | null>(null);

  const prob0 = tilt / 100;

  const measureOnce = useCallback(() => {
    const r: 0 | 1 = Math.random() < prob0 ? 0 : 1;
    setLastSingle(r);
    setResults([]);
  }, [prob0]);

  const measure100 = useCallback(() => {
    const batch: (0 | 1)[] = [];
    for (let i = 0; i < 100; i++) {
      batch.push(Math.random() < prob0 ? 0 : 1);
    }
    setResults(batch);
    setLastSingle(null);
  }, [prob0]);

  const count0 = results.filter((r) => r === 0).length;
  const count1 = results.length - count0;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 8 }}>
          Tilt: {tilt}% toward |0⟩, {100 - tilt}% toward |1⟩
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={tilt}
          onChange={(e) => {
            setTilt(Number(e.target.value));
            setResults([]);
            setLastSingle(null);
          }}
          style={{ width: '100%', maxWidth: 400, accentColor: T.coral }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 400, fontSize: 12, color: T.textMuted }}>
          <span>|0⟩ certain</span>
          <span>50/50</span>
          <span>|1⟩ certain</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        <button
          onClick={measureOnce}
          style={{
            padding: '10px 20px',
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
          Measure once
        </button>
        <button
          onClick={measure100}
          style={{
            padding: '10px 20px',
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
          Measure ×100
        </button>
      </div>

      {lastSingle !== null && (
        <div
          style={{
            padding: '20px 24px',
            background: T.cardDeep,
            borderRadius: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span style={{ fontSize: 32, fontWeight: 800, color: lastSingle === 0 ? T.coral : T.peach }}>
            |{lastSingle}⟩
          </span>
          <span style={{ color: T.textMuted, fontSize: 14 }}>
            Collapsed to {lastSingle}. Run it again for a different result.
          </span>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ padding: '20px 24px', background: T.cardDeep, borderRadius: 10 }}>
          <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
            <StatCard label="|0⟩" count={count0} total={100} color={T.coral} />
            <StatCard label="|1⟩" count={count1} total={100} color={T.peach} />
          </div>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {results.map((r, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: r === 0 ? T.coral : T.peach,
                  transition: `background 150ms ${EASE}`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  return (
    <div>
      <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{count}</div>
      <div style={{ fontSize: 12, color: T.textMuted }}>{((count / total) * 100).toFixed(0)}%</div>
    </div>
  );
}
