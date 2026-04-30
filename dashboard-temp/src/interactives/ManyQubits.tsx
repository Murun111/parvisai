import { useState, useCallback } from 'react';
import { T, EASE } from '../theme';

export function ManyQubits() {
  const [tilt, setTilt] = useState(50);
  const [grid, setGrid] = useState<(0 | 1 | null)[]>(Array(100).fill(null));
  const [measured, setMeasured] = useState(false);

  const prob0 = tilt / 100;

  const measureAll = useCallback(() => {
    const results = Array.from({ length: 100 }, () =>
      Math.random() < prob0 ? 0 as const : 1 as const,
    );
    setGrid([]);
    setTimeout(() => {
      setGrid(results);
      setMeasured(true);
    }, 50);
  }, [prob0]);

  const reset = () => {
    setGrid(Array(100).fill(null));
    setMeasured(false);
  };

  const count0 = grid.filter((v) => v === 0).length;
  const count1 = grid.filter((v) => v === 1).length;

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 8 }}>
          Tilt all 100 qubits: {tilt}% toward |0⟩
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={tilt}
          onChange={(e) => {
            setTilt(Number(e.target.value));
            reset();
          }}
          style={{ width: '100%', maxWidth: 360, accentColor: T.coral }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(10, 1fr)',
          gap: 4,
          maxWidth: 360,
          marginBottom: 20,
        }}
      >
        {grid.map((v, i) => (
          <div
            key={i}
            style={{
              aspectRatio: '1',
              borderRadius: 4,
              background:
                v === null
                  ? T.card
                  : v === 0
                    ? T.peachLight
                    : T.coral,
              border: `1px solid ${T.border}`,
              transition: `background 300ms ${EASE} ${i * 8}ms`,
            }}
          />
        ))}
      </div>

      {measured && (
        <div style={{ fontSize: 14, color: T.textMuted, marginBottom: 16 }}>
          |0⟩: {count0} &nbsp; |1⟩: {count1} &nbsp; (expected ~{tilt}:{100 - tilt})
        </div>
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={measureAll}
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
          Measure all 100
        </button>
        {measured && (
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
