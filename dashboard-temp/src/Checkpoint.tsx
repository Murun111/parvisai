import { useState } from 'react';
import { T, EASE } from './theme';

export type CheckpointProps = {
  prompt: string;
  options: { label: string; correct?: boolean; why: string }[];
};

export function Checkpoint({ prompt, options }: CheckpointProps) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div
      style={{
        marginTop: 56,
        padding: '28px 32px',
        border: `1px solid ${T.rule}`,
        borderRadius: 14,
        background: T.bgSoft,
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: 2,
          color: T.textSubtle,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        CHECKPOINT
      </div>
      <p style={{ margin: '0 0 18px', fontSize: 19, color: T.textDark, lineHeight: 1.45, fontWeight: 500 }}>{prompt}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {options.map((opt, i) => {
          const isPicked = picked === i;
          const showColor = isPicked;
          const correct = opt.correct === true;
          return (
            <button
              key={opt.label}
              onClick={() => setPicked(i)}
              style={{
                textAlign: 'left',
                padding: '14px 18px',
                borderRadius: 10,
                border: `1px solid ${showColor ? (correct ? T.ok : T.coral) : T.rule}`,
                background: showColor ? (correct ? 'rgba(74,222,128,0.08)' : 'rgba(249,115,86,0.08)') : T.off,
                color: T.textDark,
                fontSize: 16,
                lineHeight: 1.4,
                cursor: 'pointer',
                transition: `all 180ms ${EASE}`,
                fontFamily: 'inherit',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: showColor ? (correct ? T.ok : T.coral) : T.rule,
                    color: showColor ? T.off : T.textSubtle,
                    fontSize: 12,
                    fontWeight: 700,
                    marginTop: 1,
                  }}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span style={{ flex: 1 }}>{opt.label}</span>
              </div>
              {isPicked && (
                <div style={{ marginTop: 10, paddingLeft: 34, fontSize: 14, color: T.textBody, lineHeight: 1.5 }}>
                  {opt.why}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
