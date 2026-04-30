import { useState } from 'react';
import { T } from '../theme';

export function BellTest() {
  const [angle, setAngle] = useState(45);

  const angleRad = (angle * Math.PI) / 180;
  const quantumCorr = Math.cos(angleRad / 2) ** 2;
  const classicalBound = 1 - angle / 180;

  const chartW = 460;
  const chartH = 200;
  const padL = 40;
  const padR = 10;
  const padT = 10;
  const padB = 30;
  const plotW = chartW - padL - padR;
  const plotH = chartH - padT - padB;

  const quantumPath = Array.from({ length: 181 }, (_, i) => {
    const x = padL + (i / 180) * plotW;
    const y = padT + plotH - Math.cos((i * Math.PI) / 360) ** 2 * plotH;
    return `${i === 0 ? 'M' : 'L'}${x},${y}`;
  }).join(' ');

  const classicalPath = `M${padL},${padT} L${padL + plotW},${padT + plotH}`;

  const markerX = padL + (angle / 180) * plotW;
  const markerQY = padT + plotH - quantumCorr * plotH;
  const markerCY = padT + plotH - classicalBound * plotH;

  return (
    <div>
      <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 16, lineHeight: 1.5 }}>
        Bell's theorem proves quantum correlations are stronger than any classical explanation
        allows. The quantum curve exceeds the classical limit at most angles.
      </div>

      <svg viewBox={`0 0 ${chartW} ${chartH}`} width="100%" style={{ maxWidth: chartW, display: 'block', marginBottom: 16 }}>
        <rect x={padL} y={padT} width={plotW} height={plotH} fill={T.cardDeep} rx={4} />

        {[0, 0.25, 0.5, 0.75, 1].map((v) => (
          <g key={v}>
            <line
              x1={padL}
              y1={padT + plotH - v * plotH}
              x2={padL + plotW}
              y2={padT + plotH - v * plotH}
              stroke={T.border}
              strokeWidth={0.5}
              strokeDasharray="3 3"
            />
            <text
              x={padL - 6}
              y={padT + plotH - v * plotH + 4}
              textAnchor="end"
              fontSize={9}
              fill={T.textMuted}
            >
              {(v * 100).toFixed(0)}%
            </text>
          </g>
        ))}

        <text x={padL + plotW / 2} y={chartH - 4} textAnchor="middle" fontSize={10} fill={T.textMuted}>
          Angle difference (degrees)
        </text>
        {[0, 45, 90, 135, 180].map((v) => (
          <text
            key={v}
            x={padL + (v / 180) * plotW}
            y={padT + plotH + 16}
            textAnchor="middle"
            fontSize={9}
            fill={T.textMuted}
          >
            {v}°
          </text>
        ))}

        <path d={classicalPath} fill="none" stroke={T.textMuted} strokeWidth={1.5} strokeDasharray="6 4" />
        <path d={quantumPath} fill="none" stroke={T.coral} strokeWidth={2} />

        <line x1={markerX} y1={padT} x2={markerX} y2={padT + plotH} stroke={T.off} strokeWidth={0.5} opacity={0.3} />
        <circle cx={markerX} cy={markerQY} r={5} fill={T.coral} />
        <circle cx={markerX} cy={markerCY} r={4} fill="none" stroke={T.textMuted} strokeWidth={1.5} />

        <text x={padL + 8} y={padT + 18} fontSize={10} fill={T.coral} fontWeight={700}>
          Quantum
        </text>
        <text x={padL + plotW - 8} y={padT + 18} textAnchor="end" fontSize={10} fill={T.textMuted} fontWeight={600}>
          Classical limit
        </text>
      </svg>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>
          Angle difference: {angle}°
        </div>
        <input
          type="range"
          min={0}
          max={180}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          style={{ width: '100%', maxWidth: 400, accentColor: T.coral }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 420 }}>
        <div style={{ padding: '12px 14px', background: T.cardDeep, borderRadius: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: T.textMuted, fontWeight: 700, marginBottom: 4 }}>
            QUANTUM
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.coral }}>
            {(quantumCorr * 100).toFixed(1)}%
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: T.cardDeep, borderRadius: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: T.textMuted, fontWeight: 700, marginBottom: 4 }}>
            CLASSICAL
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.textMuted }}>
            {(classicalBound * 100).toFixed(1)}%
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: T.cardDeep, borderRadius: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: T.textMuted, fontWeight: 700, marginBottom: 4 }}>
            ADVANTAGE
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: quantumCorr > classicalBound ? T.ok : T.textMuted }}>
            {quantumCorr > classicalBound ? `+${((quantumCorr - classicalBound) * 100).toFixed(1)}` : '0'}%
          </div>
        </div>
      </div>
    </div>
  );
}
