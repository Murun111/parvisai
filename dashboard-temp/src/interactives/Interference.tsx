import { useState } from 'react';
import { T } from '../theme';

export function Interference() {
  const [phase, setPhase] = useState(0);

  const phaseRad = (phase * Math.PI) / 180;
  const probD1 = Math.cos(phaseRad / 2) ** 2;
  const probD2 = Math.sin(phaseRad / 2) ** 2;

  return (
    <div>
      <div style={{ fontSize: 13, color: T.textMuted, marginBottom: 6 }}>
        A single photon enters a beam splitter, picks up a phase shift, then recombines.
        Interference determines which detector clicks.
      </div>

      <svg viewBox="0 0 520 200" width="100%" style={{ maxWidth: 520, display: 'block', margin: '20px 0' }}>
        <rect x={10} y={90} width={40} height={20} rx={4} fill={T.coral} />
        <text x={30} y={104} textAnchor="middle" fontSize={9} fill={T.off} fontWeight={700}>
          PHOTON
        </text>

        <line x1={50} y1={100} x2={120} y2={100} stroke={T.peach} strokeWidth={1.5} />

        <rect x={120} y={80} width={30} height={40} rx={4} fill={T.border} stroke={T.textMuted} strokeWidth={0.8} />
        <text x={135} y={104} textAnchor="middle" fontSize={7} fill={T.textMuted}>
          BS1
        </text>

        <line x1={150} y1={85} x2={310} y2={85} stroke={T.peachLight} strokeWidth={1.2} strokeDasharray="4 3" />
        <line x1={150} y1={115} x2={310} y2={115} stroke={T.peachLight} strokeWidth={1.2} strokeDasharray="4 3" />

        <rect x={215} y={108} width={40} height={16} rx={4} fill="rgba(249,115,86,0.2)" stroke={T.coral} strokeWidth={0.8} />
        <text x={235} y={120} textAnchor="middle" fontSize={7} fill={T.coral} fontWeight={700}>
          φ={phase}°
        </text>

        <rect x={310} y={80} width={30} height={40} rx={4} fill={T.border} stroke={T.textMuted} strokeWidth={0.8} />
        <text x={325} y={104} textAnchor="middle" fontSize={7} fill={T.textMuted}>
          BS2
        </text>

        <line x1={340} y1={85} x2={400} y2={85} stroke={T.peachLight} strokeWidth={1.2} />
        <line x1={340} y1={115} x2={400} y2={115} stroke={T.peachLight} strokeWidth={1.2} />

        <rect x={405} y={70} width={50} height={30} rx={6} fill={probD1 > 0.5 ? T.ok : T.cardDeep} stroke={T.ok} strokeWidth={1} />
        <text x={430} y={88} textAnchor="middle" fontSize={9} fill={probD1 > 0.5 ? T.cardDeep : T.ok} fontWeight={700}>
          D1
        </text>
        <text x={430} y={64} textAnchor="middle" fontSize={11} fill={T.off} fontWeight={800}>
          {(probD1 * 100).toFixed(0)}%
        </text>

        <rect x={405} y={105} width={50} height={30} rx={6} fill={probD2 > 0.5 ? T.coral : T.cardDeep} stroke={T.coral} strokeWidth={1} />
        <text x={430} y={123} textAnchor="middle" fontSize={9} fill={probD2 > 0.5 ? T.off : T.coral} fontWeight={700}>
          D2
        </text>
        <text x={430} y={148} textAnchor="middle" fontSize={11} fill={T.off} fontWeight={800}>
          {(probD2 * 100).toFixed(0)}%
        </text>
      </svg>

      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 12, color: T.textMuted, marginBottom: 6 }}>
          Phase shift: {phase}°
        </div>
        <input
          type="range"
          min={0}
          max={360}
          value={phase}
          onChange={(e) => setPhase(Number(e.target.value))}
          style={{ width: '100%', maxWidth: 400, accentColor: T.coral }}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {[0, 90, 180, 270].map((p) => (
          <button
            key={p}
            onClick={() => setPhase(p)}
            style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: `1px solid ${phase === p ? T.coral : T.border}`,
              background: phase === p ? T.coral : 'transparent',
              color: phase === p ? T.off : T.textMuted,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            {p}°
          </button>
        ))}
      </div>

      <div style={{ marginTop: 16, fontSize: 14, color: T.textMuted, lineHeight: 1.5 }}>
        {phase === 0 && 'At 0° phase, constructive interference sends 100% of photons to D1. The paths reinforce perfectly.'}
        {phase === 180 && 'At 180°, destructive interference cancels the D1 path. 100% go to D2.'}
        {phase === 90 && 'At 90°, the interference is partial. Photons split 50/50 between detectors.'}
        {phase === 270 && 'At 270°, same as 90° but with the opposite phase relationship. Still 50/50.'}
        {phase !== 0 && phase !== 90 && phase !== 180 && phase !== 270 && `Partial interference: D1 gets ${(probD1 * 100).toFixed(0)}%, D2 gets ${(probD2 * 100).toFixed(0)}%.`}
      </div>
    </div>
  );
}
