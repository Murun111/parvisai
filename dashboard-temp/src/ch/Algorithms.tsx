import { useState, useCallback, useRef, useEffect } from 'react';
import { Chapter, Prose, Analogy, Stage } from '../Chapter';
import { Checkpoint } from '../Checkpoint';
import { T, EASE } from '../theme';
import { SpeedupCurve } from '../interactives/SpeedupCurve';

export default function ChapterAlgorithms() {
  return (
    <Chapter
      id="algorithms"
      number="05"
      kicker="Algorithms"
      title="Where quantum wins."
      lede="Quantum computers are not faster at everything. They are dramatically faster at specific problems where interference and entanglement can be exploited. The key is knowing which problems."
    >
      <Prose>
        <p>
          Imagine a hallway with 16 doors. Behind one door is a prize. A classical computer opens
          doors one by one. On average, it checks 8 doors before finding the prize.
        </p>
        <p style={{ marginTop: 20 }}>
          A quantum computer uses a trick called Grover's algorithm. It puts all doors into
          superposition, then uses interference to amplify the probability of the correct door and
          suppress the wrong ones. It finds the prize after roughly 4 checks instead of 8. That is
          a square-root speedup, and for large numbers of doors, it is enormous.
        </p>
      </Prose>

      <Stage label="GROVER'S SEARCH · FIND THE PRIZE">
        <GroverRace />
      </Stage>

      <Analogy title="THE EVERYDAY VERSION">
        A hallway of doors. Classical: you try each handle, one by one. Quantum: you shout down
        the hallway and listen for the echo. The echo is louder behind the right door. That is
        interference doing the work.
      </Analogy>

      <Stage label="THE SPEEDUP CURVE">
        <SpeedupCurve />
      </Stage>

      <Prose>
        <p>
          Not every problem gets a quantum speedup. Quantum algorithms excel at search (Grover),
          factoring large numbers (Shor), simulating molecules, and optimization. For everyday
          tasks like browsing the web or editing a document, a classical computer is already
          optimal.
        </p>
      </Prose>

      <Checkpoint
        prompt="A database has 1,000,000 entries. How many entries does Grover's algorithm need to check?"
        options={[
          { label: '1,000,000 (all of them)', why: 'That is the worst case for a classical search, not a quantum one.' },
          { label: 'About 500,000 (half)', why: 'That is the average for a classical search. Grover does much better.' },
          { label: 'About 1,000', correct: true, why: 'Correct. Grover needs roughly the square root of N, which is about 1,000 for a million entries. That is a 1000x speedup over the classical average.' },
        ]}
      />
    </Chapter>
  );
}

const NUM_DOORS = 16;

function GroverRace() {
  const [winner] = useState(() => Math.floor(Math.random() * NUM_DOORS));
  const [classicalIndex, setClassicalIndex] = useState(-1);
  const [quantumHighlight, setQuantumHighlight] = useState<number[]>([]);
  const [classicalFound, setClassicalFound] = useState(false);
  const [quantumFound, setQuantumFound] = useState(false);
  const [classicalSteps, setClassicalSteps] = useState(0);
  const [quantumSteps, setQuantumSteps] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const run = useCallback(() => {
    setRunning(true);
    setClassicalIndex(-1);
    setQuantumHighlight([]);
    setClassicalFound(false);
    setQuantumFound(false);
    setClassicalSteps(0);
    setQuantumSteps(0);

    let cIdx = -1;
    let cDone = false;
    let qStep = 0;
    const qTotalSteps = Math.ceil(Math.sqrt(NUM_DOORS));
    let qDone = false;

    timerRef.current = setInterval(() => {
      if (!cDone) {
        cIdx++;
        setClassicalIndex(cIdx);
        setClassicalSteps(cIdx + 1);
        if (cIdx === winner) {
          cDone = true;
          setClassicalFound(true);
        }
      }

      if (!qDone) {
        qStep++;
        setQuantumSteps(qStep);
        if (qStep < qTotalSteps) {
          const candidates = Array.from({ length: NUM_DOORS }, (_, i) => i)
            .filter((i) => i !== winner)
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.max(1, NUM_DOORS - qStep * 3));
          setQuantumHighlight([winner, ...candidates]);
        } else {
          setQuantumHighlight([winner]);
          qDone = true;
          setQuantumFound(true);
        }
      }

      if (cDone && qDone) {
        clearInterval(timerRef.current);
        setRunning(false);
      }
    }, 400);
  }, [winner]);

  const reset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRunning(false);
    setClassicalIndex(-1);
    setQuantumHighlight([]);
    setClassicalFound(false);
    setQuantumFound(false);
    setClassicalSteps(0);
    setQuantumSteps(0);
  };

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, color: T.peach, fontWeight: 700, marginBottom: 12 }}>
            CLASSICAL SEARCH
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {Array.from({ length: NUM_DOORS }, (_, i) => {
              const checked = i <= classicalIndex;
              const isWinner = i === winner && classicalFound;
              return (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: 6,
                    border: `1px solid ${T.border}`,
                    background: isWinner ? T.ok : checked ? T.cardDeep : T.card,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 700,
                    color: isWinner ? T.cardDeep : checked ? T.textMuted : T.border,
                    transition: `all 200ms ${EASE}`,
                  }}
                >
                  {isWinner ? '★' : checked ? '✗' : i + 1}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: T.textMuted }}>
            Steps: {classicalSteps} {classicalFound && '(found)'}
          </div>
        </div>

        <div>
          <div style={{ fontSize: 11, letterSpacing: 2, color: T.peach, fontWeight: 700, marginBottom: 12 }}>
            QUANTUM SEARCH (GROVER)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
            {Array.from({ length: NUM_DOORS }, (_, i) => {
              const highlighted = quantumHighlight.includes(i);
              const isWinner = i === winner && quantumFound;
              return (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    borderRadius: 6,
                    border: `1px solid ${isWinner ? T.ok : highlighted ? T.coral : T.border}`,
                    background: isWinner ? T.ok : highlighted ? 'rgba(249,115,86,0.15)' : T.card,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 700,
                    color: isWinner ? T.cardDeep : highlighted ? T.coral : T.border,
                    transition: `all 200ms ${EASE}`,
                  }}
                >
                  {isWinner ? '★' : i + 1}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 8, fontSize: 13, color: T.textMuted }}>
            Steps: {quantumSteps} {quantumFound && '(found)'}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        {!running && (
          <button
            onClick={run}
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
            {classicalSteps > 0 ? 'Run again' : 'Start race'}
          </button>
        )}
        {classicalSteps > 0 && !running && (
          <button
            onClick={reset}
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
        )}
      </div>
    </div>
  );
}
