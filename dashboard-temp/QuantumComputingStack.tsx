// QuantumComputingStack.tsx
// Static SVG infographic: physical qubit modalities, quantum state,
// circuits, entanglement, error correction, gate algebra, decoherence,
// algorithms, scaling, and quantum advantage domains.
//
// Zero runtime dependencies. Server-component safe (no hooks / no 'use client').
// Drop into a Next.js app or any React project and render <QuantumComputingStack />.

import type { CSSProperties } from 'react';

// ============================================================================
// DESIGN TOKENS
// ============================================================================
const T = {
  bg: '#F8EFE6',
  card: '#1E2230',
  cardDeep: '#0E1118',
  coral: '#F97356',
  peach: '#F4A68C',
  peachLight: '#FFB89A',
  white: '#FEFBF5', // tinted off-white: warmth toward the beige background family
  textMuted: '#8C93A5',
  textSubtle: '#8B7F6E',
  textBody: '#5E5548',
  textDark: '#1E2230',
  border: '#2B3040',
  axis: '#4A5066',
  success: '#4ADE80',
} as const;

// Typography scale — every fontSize in this file snaps to one of these.
const FS = { xs: 8, sm: 9, base: 10, md: 11, lg: 13, display: 30 } as const;
// Letter-spacing scale — every letterSpacing snaps here.
const TRK = { tight: 0.5, caption: 1.2, label: 2, eyebrow: 3.5 } as const;
// Stroke-width scale.
const SW = { hairline: 0.5, fine: 0.8, standard: 1.2, emphasis: 1.5, bold: 2 } as const;
// Corner-radius scale.
const R = { chip: 4, pill: 6, card: 14 } as const;

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif";

// ============================================================================
// DEFS — filters, gradients, patterns
// ============================================================================
function Defs() {
  return (
    <defs>
      <filter id="cardShadow" x="-5%" y="-5%" width="110%" height="115%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
        <feOffset dx="0" dy="3" />
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.12" />
        </feComponentTransfer>
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <radialGradient id="blochGrad" cx="35%" cy="30%">
        <stop offset="0%" stopColor="#2C3244" />
        <stop offset="65%" stopColor="#1E2230" />
        <stop offset="100%" stopColor="#0E1118" />
      </radialGradient>
      <linearGradient id="decayGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={T.coral} stopOpacity="0.3" />
        <stop offset="100%" stopColor={T.coral} stopOpacity="0" />
      </linearGradient>
      <pattern id="gridDots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="10" cy="10" r="0.8" fill={T.coral} opacity="0.15" />
      </pattern>
    </defs>
  );
}

// ============================================================================
// SHARED — reusable card wrapper
// ============================================================================
function Card({
  x,
  y,
  width,
  height,
  radius = R.card,
  children,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  children?: React.ReactNode;
}) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={width} height={height} rx={radius} fill={T.card} filter="url(#cardShadow)" />
      <rect
        x="0.5"
        y="0.5"
        width={width - 1}
        height={height - 1}
        rx={radius - 0.5}
        fill="none"
        stroke={T.coral}
        strokeWidth={SW.hairline}
        opacity="0.3"
      />
      {children}
    </g>
  );
}

// ============================================================================
// CORNER MARKS
// ============================================================================
function CornerMarks() {
  return (
    <g stroke={T.textDark} strokeWidth={SW.standard} fill="none" opacity="0.5">
      <path d="M 30 30 L 30 50 M 30 30 L 50 30" />
      <path d="M 1370 30 L 1370 50 M 1370 30 L 1350 30" />
      <path d="M 30 1210 L 30 1190 M 30 1210 L 50 1210" />
      <path d="M 1370 1210 L 1370 1190 M 1370 1210 L 1350 1210" />
    </g>
  );
}

// ============================================================================
// TITLE
// ============================================================================
function TitleBlock() {
  return (
    <g>
      <circle cx="620" cy="38" r="2.5" fill={T.coral} />
      <circle cx="636" cy="38" r="2" fill={T.peach} />
      <circle cx="652" cy="38" r="2.5" fill={T.peachLight} />
      <circle cx="748" cy="38" r="2.5" fill={T.peachLight} />
      <circle cx="764" cy="38" r="2" fill={T.peach} />
      <circle cx="780" cy="38" r="2.5" fill={T.coral} />
      <text x="700" y="42" textAnchor="middle" fill={T.textSubtle} fontSize={FS.base} fontWeight="600" letterSpacing={TRK.eyebrow}>
        TECHNICAL REFERENCE · VOL. VII
      </text>

      <text x="700" y="76" textAnchor="middle" fill={T.textDark} fontSize={FS.display} fontWeight="800" letterSpacing={TRK.label}>
        THE QUANTUM COMPUTING STACK
      </text>

      <line x1="520" y1="88" x2="680" y2="88" stroke={T.textDark} strokeWidth={SW.standard} opacity="0.4" />
      <circle cx="700" cy="88" r="3" fill={T.coral} />
      <line x1="720" y1="88" x2="880" y2="88" stroke={T.textDark} strokeWidth={SW.standard} opacity="0.4" />

      <text x="700" y="108" textAnchor="middle" fill={T.textBody} fontSize={FS.md} letterSpacing={TRK.caption} fontStyle="italic">
        Architecture of fault-tolerant quantum computation: from physical qubits through error-corrected logical operations to quantum advantage
      </text>

      <text x="60" y="76" fill={T.textSubtle} fontSize={FS.sm} letterSpacing={TRK.label} fontWeight="600">DOMAIN</text>
      <text x="60" y="92" fill={T.textDark} fontSize={FS.md} fontWeight="700">QUANTUM INFORMATION</text>
      <text x="60" y="106" fill={T.textBody} fontSize={FS.sm}>Hilbert space 𝓗 = (ℂ²)⊗ⁿ</text>

      <text x="1340" y="76" textAnchor="end" fill={T.textSubtle} fontSize={FS.sm} letterSpacing={TRK.label} fontWeight="600">COMPLEXITY CLASS</text>
      <text x="1340" y="92" textAnchor="end" fill={T.textDark} fontSize={FS.md} fontWeight="700">BQP  ⊇  P</text>
      <text x="1340" y="106" textAnchor="end" fill={T.textBody} fontSize={FS.sm}>bounded-error quantum polynomial</text>
    </g>
  );
}

// ============================================================================
// SECTION HEADER — reusable row label + rule + section-mark italic caption
// ============================================================================
function SectionHeader({ title, aside }: { title: string; aside: string }) {
  // x=10 is the shared inset for the rule's left edge; the title text ends before that.
  // Each caller picks its own rule start (after the title) via the `aside` layout.
  return (
    <>
      <text x="30" y="14" fill={T.textDark} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.label}>
        {title}
      </text>
      <text x="1370" y="14" textAnchor="end" fill={T.textSubtle} fontSize={FS.sm} letterSpacing={TRK.caption} fontStyle="italic">
        {aside}
      </text>
    </>
  );
}

// ============================================================================
// SECTION I — PHYSICAL PLATFORMS
// ============================================================================

type Platform = {
  name: string;
  subtitle: string;
  specs: Array<{ label: string; value: string }>;
  env: string;
  scale: string;
  icon: React.ReactNode;
};

const PLATFORMS: Platform[] = [
  {
    name: 'SUPERCONDUCTING',
    subtitle: 'Transmon · Josephson junction',
    specs: [
      { label: 'T₂ coherence', value: '100–300 μs' },
      { label: '2Q gate fidelity', value: '99.6 %' },
      { label: 'gate duration', value: '10–40 ns' },
    ],
    env: '15 mK · dilution fridge',
    scale: '1121 q (IBM) · Google · Rigetti',
    icon: (
      <g stroke={T.coral} fill="none" strokeWidth={SW.standard}>
        <rect x="0" y="0" width="42" height="28" rx="2" />
        <circle cx="14" cy="14" r="7" fill="none" stroke={T.peachLight} />
        <rect x="11" y="6" width="6" height="3" fill={T.coral} stroke="none" />
        <rect x="11" y="19" width="6" height="3" fill={T.coral} stroke="none" />
        <line x1="28" y1="10" x2="38" y2="10" stroke={T.peach} />
        <line x1="28" y1="18" x2="38" y2="18" stroke={T.peach} />
      </g>
    ),
  },
  {
    name: 'TRAPPED ION',
    subtitle: 'Yb⁺ · Ca⁺ · Paul trap',
    specs: [
      { label: 'T₂ coherence', value: '10 s – 1 h' },
      { label: '2Q gate fidelity', value: '99.9 %' },
      { label: 'gate duration', value: '10–100 μs' },
    ],
    env: 'UHV · laser cooled μK',
    scale: '56 q (Quantinuum) · IonQ',
    icon: (
      <g>
        <path d="M 0 18 Q 21 -2 42 18" fill="none" stroke={T.peach} strokeWidth={SW.standard} opacity="0.6" />
        <path d="M 0 18 Q 21 38 42 18" fill="none" stroke={T.peach} strokeWidth={SW.standard} opacity="0.6" />
        <g fill={T.peachLight} stroke={T.coral} strokeWidth={SW.fine}>
          <circle cx="6" cy="18" r="3" />
          <circle cx="15" cy="18" r="3" />
          <circle cx="24" cy="18" r="3" />
          <circle cx="33" cy="18" r="3" />
          <circle cx="42" cy="18" r="3" />
        </g>
        <line x1="-2" y1="6" x2="44" y2="6" stroke={T.coral} strokeWidth={SW.fine} strokeDasharray="2,2" opacity="0.8" />
      </g>
    ),
  },
  {
    name: 'NEUTRAL ATOM',
    subtitle: 'Rydberg · optical tweezers',
    specs: [
      { label: 'T₂ coherence', value: '1–10 s' },
      { label: '2Q gate fidelity', value: '99.5 %' },
      { label: 'gate duration', value: '~100 ns' },
    ],
    env: 'UHV · room-T tweezers',
    scale: '256+ q (QuEra) · Pasqal · Atom',
    icon: (
      <g>
        <g stroke={T.peach} strokeWidth={SW.hairline} opacity="0.5">
          <line x1="0" y1="0" x2="42" y2="0" />
          <line x1="0" y1="14" x2="42" y2="14" />
          <line x1="0" y1="28" x2="42" y2="28" />
          <line x1="0" y1="0" x2="0" y2="28" />
          <line x1="14" y1="0" x2="14" y2="28" />
          <line x1="28" y1="0" x2="28" y2="28" />
          <line x1="42" y1="0" x2="42" y2="28" />
        </g>
        <g fill={T.coral}>
          <circle cx="0" cy="0" r="2.2" />
          <circle cx="14" cy="0" r="2.2" />
          <circle cx="28" cy="0" r="2.2" />
          <circle cx="42" cy="0" r="2.2" />
          <circle cx="0" cy="14" r="2.2" />
          <circle cx="14" cy="14" r="3" fill={T.peachLight} />
          <circle cx="28" cy="14" r="2.2" />
          <circle cx="42" cy="14" r="2.2" />
          <circle cx="0" cy="28" r="2.2" />
          <circle cx="14" cy="28" r="2.2" />
          <circle cx="28" cy="28" r="3" fill={T.peachLight} />
          <circle cx="42" cy="28" r="2.2" />
        </g>
      </g>
    ),
  },
  {
    name: 'PHOTONIC',
    subtitle: 'Dual-rail · fusion-based · CV',
    specs: [
      { label: 'photon lifetime', value: 'fiber loss' },
      { label: 'fusion fidelity', value: '~99 %' },
      { label: 'clock rate', value: 'GHz (MBQC)' },
    ],
    env: 'room-T · cryo detectors',
    scale: 'modular · PsiQuantum · Xanadu',
    icon: (
      <g fill="none" strokeLinecap="round">
        <line x1="0" y1="8" x2="18" y2="8" stroke={T.coral} strokeWidth={SW.emphasis} />
        <line x1="0" y1="22" x2="18" y2="22" stroke={T.coral} strokeWidth={SW.emphasis} />
        <rect x="18" y="4" width="10" height="22" fill={T.peach} opacity="0.35" stroke={T.peach} strokeWidth={SW.fine} />
        <line x1="28" y1="8" x2="42" y2="22" stroke={T.coral} strokeWidth={SW.emphasis} />
        <line x1="28" y1="22" x2="42" y2="8" stroke={T.coral} strokeWidth={SW.emphasis} />
        <circle cx="4" cy="8" r="2" fill={T.peachLight} stroke="none" />
        <circle cx="4" cy="22" r="2" fill={T.peachLight} stroke="none" />
      </g>
    ),
  },
  {
    name: 'TOPOLOGICAL',
    subtitle: 'Majorana zero modes · anyons',
    specs: [
      { label: 'error protection', value: 'topological' },
      { label: 'braid fidelity', value: '(theoretical)' },
      { label: 'substrate', value: 'InAs/Al nanowire' },
    ],
    env: '< 100 mK · high magnetic field',
    scale: '0 demonstrated · Microsoft',
    icon: (
      <g fill="none" stroke={T.coral} strokeWidth={SW.emphasis}>
        <path d="M 0 4 Q 10 14 20 4 Q 30 -6 40 4" />
        <path d="M 0 14 Q 10 4 20 14 Q 30 24 40 14" />
        <path d="M 0 24 Q 10 14 20 24 Q 30 34 40 24" opacity="0.5" />
        <circle cx="0" cy="4" r="2.5" fill={T.peachLight} stroke="none" />
        <circle cx="0" cy="14" r="2.5" fill={T.peachLight} stroke="none" />
        <circle cx="40" cy="4" r="2.5" fill={T.peachLight} stroke="none" />
        <circle cx="40" cy="14" r="2.5" fill={T.peachLight} stroke="none" />
      </g>
    ),
  },
];

function PlatformCard({ platform, x }: { platform: Platform; x: number }) {
  return (
    <Card x={x} y={26} width={260} height={170}>
      <rect x="14" y="14" width="42" height="4" rx="2" fill={T.coral} />
      <text x="14" y="36" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        {platform.name}
      </text>
      <text x="14" y="48" fill={T.peach} fontSize={FS.sm} letterSpacing={TRK.tight}>
        {platform.subtitle}
      </text>
      <g transform="translate(14,62)">{platform.icon}</g>
      <g fontSize={FS.sm} transform="translate(70,66)">
        {platform.specs.map((s, i) => (
          <g key={s.label} transform={`translate(0,${i * 14})`}>
            <text fill={T.textMuted} letterSpacing={TRK.tight}>{s.label}</text>
            <text x="108" fill={T.coral} fontWeight="700">{s.value}</text>
          </g>
        ))}
      </g>
      <line x1="14" y1="104" x2="246" y2="104" stroke={T.border} strokeWidth={SW.fine} />
      <text x="14" y="120" fill={T.textMuted} fontSize={FS.xs} letterSpacing={TRK.tight}>OPERATING ENV</text>
      <text x="14" y="134" fill={T.white} fontSize={FS.base} fontWeight="600">{platform.env}</text>
      <text x="14" y="150" fill={T.textMuted} fontSize={FS.xs} letterSpacing={TRK.tight}>SCALE · VENDORS</text>
      <text x="14" y="162" fill={T.peachLight} fontSize={FS.sm} fontWeight="600">{platform.scale}</text>
    </Card>
  );
}

function PhysicalPlatforms() {
  return (
    <g transform="translate(0,130)">
      <SectionHeader title="I. PHYSICAL QUBIT MODALITIES" aside="§ hardware layer" />
      <line x1="295" y1="10" x2="1370" y2="10" stroke={T.textDark} strokeWidth={SW.hairline} opacity="0.35" />
      {PLATFORMS.map((p, i) => (
        <PlatformCard key={p.name} platform={p} x={30 + i * 270} />
      ))}
    </g>
  );
}

// ============================================================================
// SECTION II — BLOCH SPHERE
// ============================================================================
// Pure state |ψ⟩ shown at θ ≈ 40° from +z, φ ≈ 50° — vector tip lies on the
// sphere surface (radius 108). Endpoint: (108·sin40°·cos50°·…) — simplified
// in the 2D projection to (69, -83) with |v| ≈ 108.
function BlochSphere() {
  return (
    <Card x={30} y={26} width={440} height={370}>
      <text x="20" y="28" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        BLOCH SPHERE · SINGLE QUBIT STATE
      </text>
      <text x="20" y="44" fill={T.textMuted} fontSize={FS.sm}>
        |ψ⟩ ∈ ℂ² · pure-state geometric representation
      </text>

      <g transform="translate(20,60)">
        <rect x="0" y="0" width="400" height="28" rx={R.pill} fill={T.cardDeep} />
        <text x="12" y="19" fontSize={FS.lg}>
          <tspan fill={T.coral} fontWeight="600">|ψ⟩ = </tspan>
          <tspan fill={T.white}>cos(θ/2)|0⟩ + e</tspan>
          <tspan fill={T.white} fontSize={FS.sm} dy="-5">iφ</tspan>
          <tspan fill={T.white} fontSize={FS.lg} dy="5"> sin(θ/2)|1⟩</tspan>
        </text>
        <text x="280" y="19" fill={T.textMuted} fontSize={FS.base}>θ ∈ [0,π] · φ ∈ [0,2π)</text>
      </g>

      <g transform="translate(160,220)">
        <circle cx="0" cy="0" r="108" fill="url(#blochGrad)" opacity="0.7" />
        <circle cx="0" cy="0" r="108" fill="none" stroke={T.coral} strokeWidth={SW.standard} />
        <ellipse cx="0" cy="0" rx="108" ry="30" fill="none" stroke={T.peach} strokeWidth={SW.standard} opacity="0.8" />
        <path d="M -108 0 A 108 30 0 0 1 108 0" fill="none" stroke={T.peach} strokeWidth={SW.fine} opacity="0.4" strokeDasharray="2,2" />
        <ellipse cx="0" cy="0" rx="30" ry="108" fill="none" stroke={T.peach} strokeWidth={SW.fine} opacity="0.5" />
        <ellipse cx="0" cy="0" rx="65" ry="108" fill="none" stroke={T.peach} strokeWidth={SW.hairline} opacity="0.3" />

        <line x1="0" y1="-118" x2="0" y2="118" stroke={T.textMuted} strokeWidth={SW.fine} strokeDasharray="3,2" />
        <line x1="-120" y1="0" x2="120" y2="0" stroke={T.textMuted} strokeWidth={SW.fine} strokeDasharray="3,2" />
        <line x1="-85" y1="23" x2="85" y2="-23" stroke={T.textMuted} strokeWidth={SW.fine} strokeDasharray="3,2" />

        {/* State vector — tip on sphere surface: sqrt(69² + 83²) ≈ 108 */}
        <line x1="0" y1="0" x2="69" y2="-83" stroke={T.peachLight} strokeWidth={SW.bold} strokeLinecap="round" />
        <polygon points="69,-83 62,-76 74,-74" fill={T.peachLight} />
        <path d="M 0 -40 A 40 40 0 0 1 26 -31" fill="none" stroke={T.coral} strokeWidth={SW.standard} />
        <text x="18" y="-44" fill={T.coral} fontSize={FS.base} fontStyle="italic">θ</text>
        <path d="M 30 0 A 30 8 0 0 0 22 6" fill="none" stroke={T.coral} strokeWidth={SW.standard} />
        <text x="36" y="10" fill={T.coral} fontSize={FS.base} fontStyle="italic">φ</text>

        <text x="0" y="-126" textAnchor="middle" fill={T.white} fontSize={FS.lg} fontWeight="700">|0⟩</text>
        <text x="0" y="140" textAnchor="middle" fill={T.white} fontSize={FS.lg} fontWeight="700">|1⟩</text>
        <text x="128" y="4" fill={T.peachLight} fontSize={FS.md} fontWeight="700">|+⟩</text>
        <text x="-140" y="4" fill={T.peachLight} fontSize={FS.md} fontWeight="700">|−⟩</text>
        <text x="88" y="-26" fill={T.peachLight} fontSize={FS.md} fontWeight="700">|+i⟩</text>
        <text x="-110" y="30" fill={T.peachLight} fontSize={FS.md} fontWeight="700">|−i⟩</text>

        <circle cx="0" cy="-108" r="3" fill={T.white} />
        <circle cx="0" cy="108" r="3" fill={T.white} />

        <text x="120" y="-6" fill={T.textMuted} fontSize={FS.sm} fontWeight="600">x</text>
        <text x="6" y="-120" fill={T.textMuted} fontSize={FS.sm} fontWeight="600">z</text>
        <text x="-92" y="-26" fill={T.textMuted} fontSize={FS.sm} fontWeight="600">y</text>
        <text x="76" y="-86" fill={T.white} fontSize={FS.md} fontWeight="700">|ψ⟩</text>
      </g>

      <g transform="translate(20,340)">
        <text fill={T.textMuted} fontSize={FS.sm} letterSpacing={TRK.caption}>ROTATIONS</text>
        <text x="90" y="0" fontSize={FS.base}>
          <tspan fill={T.coral} fontWeight="700">R</tspan>
          <tspan fill={T.coral} fontSize={FS.xs} dy="3">x</tspan>
          <tspan fill={T.white} dy="-3">(θ) = e</tspan>
          <tspan fill={T.white} fontSize={FS.xs} dy="-4">−iθX/2</tspan>
          <tspan fill={T.textMuted} fontSize={FS.base} dy="4"> · R</tspan>
          <tspan fill={T.textMuted} fontSize={FS.xs} dy="3">y</tspan>
          <tspan fill={T.textMuted} fontSize={FS.base} dy="-3"> · R</tspan>
          <tspan fill={T.textMuted} fontSize={FS.xs} dy="3">z</tspan>
        </text>
        <text x="260" y="0" fill={T.peach} fontWeight="600" fontSize={FS.sm}>SU(2) generators</text>
      </g>
    </Card>
  );
}

// ============================================================================
// SECTION II — QUANTUM CIRCUIT
// ============================================================================
function Meter({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="0" y="0" width="20" height="20" rx="3" fill={T.cardDeep} stroke={T.coral} strokeWidth={SW.standard} />
      <path d="M 4 16 A 6 6 0 0 1 16 16" fill="none" stroke={T.coral} strokeWidth={SW.standard} />
      <line x1="10" y1="16" x2="15" y2="6" stroke={T.coral} strokeWidth={SW.standard} />
    </g>
  );
}

function SingleGate({ x, y, label, fill }: { x: number; y: number; label: string; fill: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x="0" y="0" width="20" height="20" rx="3" fill={fill} />
      <text x="10" y="14" textAnchor="middle" fill={T.card} fontSize={FS.md} fontWeight="800">{label}</text>
    </g>
  );
}

function CNOT({ x, yCtrl, yTgt, color = T.peachLight }: { x: number; yCtrl: number; yTgt: number; color?: string }) {
  return (
    <g>
      <line x1={x} y1={yCtrl} x2={x} y2={yTgt} stroke={color} strokeWidth={SW.emphasis} />
      <circle cx={x} cy={yCtrl} r="3.5" fill={color} />
      <circle cx={x} cy={yTgt} r="7" fill={T.card} stroke={color} strokeWidth={SW.emphasis} />
      <line x1={x - 7} y1={yTgt} x2={x + 7} y2={yTgt} stroke={color} strokeWidth={SW.standard} />
      <line x1={x} y1={yTgt - 7} x2={x} y2={yTgt + 7} stroke={color} strokeWidth={SW.standard} />
    </g>
  );
}

function QuantumCircuit() {
  return (
    <Card x={490} y={26} width={420} height={370}>
      <text x="20" y="28" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        QUANTUM CIRCUIT · UNIVERSAL GATE SET
      </text>
      <text x="20" y="44" fill={T.textMuted} fontSize={FS.sm}>
        5-qubit example · Clifford+T generates SU(2ⁿ)
      </text>

      <g transform="translate(20,70)">
        <g stroke={T.axis} strokeWidth={SW.standard}>
          {[12, 46, 80, 114, 148].map((y) => (
            <line key={y} x1="34" y1={y} x2="380" y2={y} />
          ))}
        </g>
        <g fill={T.peach} fontSize={FS.base} fontWeight="600">
          <text x="0" y="16">|q₀⟩</text>
          <text x="0" y="50">|q₁⟩</text>
          <text x="0" y="84">|q₂⟩</text>
          <text x="0" y="118">|q₃⟩</text>
          <text x="0" y="152">|q₄⟩</text>
        </g>

        <g stroke={T.border} strokeWidth={SW.hairline} strokeDasharray="2,3">
          {[60, 100, 140, 180, 220, 260, 300, 340].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="158" />
          ))}
        </g>

        <SingleGate x={50} y={2} label="H" fill={T.coral} />
        <SingleGate x={50} y={36} label="H" fill={T.coral} />
        <SingleGate x={50} y={70} label="H" fill={T.coral} />
        <CNOT x={90} yCtrl={12} yTgt={46} />
        <SingleGate x={130} y={70} label="T" fill={T.peach} />
        <SingleGate x={130} y={104} label="X" fill={T.peachLight} />
        <CNOT x={170} yCtrl={46} yTgt={80} />
        <SingleGate x={210} y={2} label="S" fill={T.peach} />
        <SingleGate x={210} y={138} label="Z" fill={T.peachLight} />

        {/* Toffoli — controls on q₀, q₁; target on q₃ */}
        <g>
          <line x1="250" y1="12" x2="250" y2="114" stroke={T.coral} strokeWidth={SW.emphasis} />
          <circle cx="250" cy="12" r="3.5" fill={T.coral} />
          <circle cx="250" cy="46" r="3.5" fill={T.coral} />
          <circle cx="250" cy="114" r="7" fill={T.card} stroke={T.coral} strokeWidth={SW.emphasis} />
          <line x1="243" y1="114" x2="257" y2="114" stroke={T.coral} strokeWidth={SW.standard} />
          <line x1="250" y1="107" x2="250" y2="121" stroke={T.coral} strokeWidth={SW.standard} />
        </g>

        <CNOT x={290} yCtrl={80} yTgt={114} />

        {/* SWAP */}
        <g stroke={T.peach} strokeWidth={SW.emphasis}>
          <line x1="330" y1="114" x2="330" y2="148" />
          <line x1="325" y1="109" x2="335" y2="119" />
          <line x1="325" y1="119" x2="335" y2="109" />
          <line x1="325" y1="143" x2="335" y2="153" />
          <line x1="325" y1="153" x2="335" y2="143" />
        </g>

        {[2, 36, 70, 104, 138].map((y) => (
          <Meter key={y} x={360} y={y} />
        ))}

        <text x="190" y="178" textAnchor="middle" fill={T.textMuted} fontSize={FS.sm} letterSpacing={TRK.label}>
          t ────▸  time (circuit depth)
        </text>
      </g>

      <g transform="translate(20,260)">
        <text fill={T.textMuted} fontSize={FS.sm} letterSpacing={TRK.caption}>UNIVERSAL GATE SETS</text>
        <g transform="translate(0,14)" fontSize={FS.sm}>
          <rect x="0" y="0" width="12" height="12" rx="2" fill={T.coral} />
          <text x="18" y="10" fill={T.white}>{'Clifford: {H, S, CNOT}'}</text>
          <rect x="140" y="0" width="12" height="12" rx="2" fill={T.peach} />
          <text x="158" y="10" fill={T.white}>+ T  ⇒  approx. universal</text>
        </g>
        <g transform="translate(0,32)" fontSize={FS.sm}>
          <rect x="0" y="0" width="12" height="12" rx="2" fill={T.peachLight} />
          <text x="18" y="10" fill={T.white}>{'Pauli: {X, Y, Z}'}</text>
          <text x="140" y="10" fill={T.peach}>Solovay-Kitaev: O(logᶜ(1/ε))</text>
        </g>
      </g>

      <g transform="translate(20,330)">
        <rect x="0" y="0" width="380" height="28" rx={R.pill} fill={T.cardDeep} />
        <text x="12" y="11" fill={T.textMuted} fontSize={FS.xs} letterSpacing={TRK.caption}>CIRCUIT METRICS</text>
        <text x="12" y="22" fill={T.coral} fontSize={FS.base} fontWeight="700">depth: 8</text>
        <text x="80" y="22" fill={T.coral} fontSize={FS.base} fontWeight="700">width: 5</text>
        <text x="148" y="22" fill={T.coral} fontSize={FS.base} fontWeight="700">1Q: 7</text>
        <text x="200" y="22" fill={T.coral} fontSize={FS.base} fontWeight="700">2Q: 3</text>
        <text x="248" y="22" fill={T.coral} fontSize={FS.base} fontWeight="700">3Q: 1</text>
        <text x="296" y="22" fill={T.peach} fontSize={FS.base} fontWeight="700">T-count: 1</text>
      </g>
    </Card>
  );
}

// ============================================================================
// SECTION II — ENTANGLEMENT
// ============================================================================
function Entanglement() {
  const bellStates = [
    { label: '|Φ⁺⟩', body: '= (|00⟩+|11⟩)/√2', x: 0, y: 0 },
    { label: '|Φ⁻⟩', body: '= (|00⟩−|11⟩)/√2', x: 205, y: 0 },
    { label: '|Ψ⁺⟩', body: '= (|01⟩+|10⟩)/√2', x: 0, y: 34 },
    { label: '|Ψ⁻⟩', body: '= (|01⟩−|10⟩)/√2', x: 205, y: 34 },
  ];

  return (
    <Card x={930} y={26} width={440} height={370}>
      <text x="20" y="28" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        ENTANGLEMENT · BELL · GHZ STATES
      </text>
      <text x="20" y="44" fill={T.textMuted} fontSize={FS.sm}>
        Non-separable correlations · CHSH violation ≤ 2√2
      </text>

      <g transform="translate(20,60)">
        <text fill={T.peach} fontSize={FS.sm} letterSpacing={TRK.caption}>PREPARATION: |Φ⁺⟩</text>
        <g transform="translate(0,14)">
          <line x1="24" y1="10" x2="140" y2="10" stroke={T.axis} strokeWidth={SW.standard} />
          <line x1="24" y1="36" x2="140" y2="36" stroke={T.axis} strokeWidth={SW.standard} />
          <text x="0" y="14" fill={T.peach} fontSize={FS.sm} fontWeight="600">|0⟩</text>
          <text x="0" y="40" fill={T.peach} fontSize={FS.sm} fontWeight="600">|0⟩</text>
          <rect x="40" y="2" width="18" height="16" rx="2" fill={T.coral} />
          <text x="49" y="14" textAnchor="middle" fill={T.card} fontSize={FS.base} fontWeight="800">H</text>
          <line x1="90" y1="10" x2="90" y2="36" stroke={T.peachLight} strokeWidth={SW.emphasis} />
          <circle cx="90" cy="10" r="3" fill={T.peachLight} />
          <circle cx="90" cy="36" r="6" fill={T.card} stroke={T.peachLight} strokeWidth={SW.emphasis} />
          <line x1="85" y1="36" x2="95" y2="36" stroke={T.peachLight} strokeWidth={SW.standard} />
          <line x1="90" y1="31" x2="90" y2="41" stroke={T.peachLight} strokeWidth={SW.standard} />
          <text x="148" y="24" fill={T.peachLight} fontSize={FS.md} fontWeight="700">|Φ⁺⟩</text>
        </g>
      </g>

      <g transform="translate(20,120)">
        <text fill={T.textMuted} fontSize={FS.sm} letterSpacing={TRK.caption}>FOUR MAXIMALLY ENTANGLED BELL STATES</text>
        <g transform="translate(0,16)" fontSize={FS.base}>
          {bellStates.map((s) => (
            <g key={s.label} transform={`translate(${s.x},${s.y})`}>
              <rect x="0" y="0" width="195" height="28" rx={R.pill} fill={T.cardDeep} />
              <text x="8" y="18" fill={T.coral} fontWeight="700">{s.label}</text>
              <text x="40" y="18" fill={T.white}>{s.body}</text>
            </g>
          ))}
        </g>
      </g>

      <g transform="translate(20,220)">
        <text fill={T.textMuted} fontSize={FS.sm} letterSpacing={TRK.caption}>MULTIPARTITE ENTANGLEMENT</text>
        <g transform="translate(0,16)" fontSize={FS.base}>
          <rect x="0" y="0" width="195" height="36" rx={R.pill} fill={T.cardDeep} />
          <text x="8" y="14" fill={T.peach} fontSize={FS.sm} fontWeight="700" letterSpacing={TRK.caption}>GHZ (n=3)</text>
          <text x="8" y="30" fill={T.white}>(|000⟩+|111⟩)/√2</text>
          <rect x="205" y="0" width="195" height="36" rx={R.pill} fill={T.cardDeep} />
          <text x="213" y="14" fill={T.peach} fontSize={FS.sm} fontWeight="700" letterSpacing={TRK.caption}>W (n=3)</text>
          <text x="213" y="30" fill={T.white}>(|100⟩+|010⟩+|001⟩)/√3</text>
        </g>

        <g transform="translate(0,68)">
          <g transform="translate(70,20)">
            <circle cx="0" cy="-18" r="7" fill={T.coral} />
            <circle cx="-18" cy="14" r="7" fill={T.coral} />
            <circle cx="18" cy="14" r="7" fill={T.coral} />
            <g stroke={T.peach} strokeWidth={SW.emphasis}>
              <line x1="0" y1="-18" x2="-18" y2="14" />
              <line x1="0" y1="-18" x2="18" y2="14" />
              <line x1="-18" y1="14" x2="18" y2="14" />
            </g>
            <text x="0" y="-36" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs} letterSpacing={TRK.caption}>GRAPH</text>
          </g>
          <g transform="translate(300,20)">
            <circle cx="0" cy="-18" r="7" fill={T.coral} />
            <circle cx="-18" cy="14" r="7" fill={T.coral} />
            <circle cx="18" cy="14" r="7" fill={T.coral} />
            <g stroke={T.peachLight} strokeWidth={SW.standard} strokeDasharray="2,2">
              <line x1="0" y1="-18" x2="-18" y2="14" />
              <line x1="0" y1="-18" x2="18" y2="14" />
            </g>
            <text x="0" y="-36" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs} letterSpacing={TRK.caption}>CHAIN</text>
          </g>

          <g transform="translate(155,5)">
            <rect x="0" y="-14" width="100" height="40" rx={R.pill} fill={T.cardDeep} />
            <text x="50" y="-2" textAnchor="middle" fill={T.peach} fontSize={FS.xs} letterSpacing={TRK.caption}>CHSH INEQ.</text>
            <text x="50" y="10" textAnchor="middle" fill={T.white} fontSize={FS.base}>|S| ≤ 2</text>
            <text x="50" y="22" textAnchor="middle" fill={T.coral} fontSize={FS.base} fontWeight="700">Q: 2√2 ≈ 2.828</text>
          </g>
        </g>
      </g>

      <g transform="translate(20,340)">
        <text fill={T.textMuted} fontSize={FS.sm} letterSpacing={TRK.caption}>ENTANGLEMENT MEASURE</text>
        <text x="160" fill={T.white} fontSize={FS.base}>{'C(ρ) = max{0, λ₁ − λ₂ − λ₃ − λ₄}'}</text>
      </g>
    </Card>
  );
}

function QuantumStateRow() {
  return (
    <g transform="translate(0,340)">
      <SectionHeader title="II. QUANTUM STATE · CIRCUITS · ENTANGLEMENT" aside="§ gate model · Dirac formalism" />
      <line x1="428" y1="10" x2="1370" y2="10" stroke={T.textDark} strokeWidth={SW.hairline} opacity="0.35" />
      <BlochSphere />
      <QuantumCircuit />
      <Entanglement />
    </g>
  );
}

// ============================================================================
// SECTION III — SURFACE CODE
// ============================================================================
function SurfaceCode() {
  const gridSize = 5;
  const cell = 40;
  const vertices: Array<[number, number]> = [];
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      vertices.push([c * cell, r * cell]);
    }
  }

  return (
    <Card x={30} y={26} width={500} height={240}>
      <text x="20" y="28" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        SURFACE CODE · [[d², 1, d]]
      </text>
      <text x="20" y="44" fill={T.textMuted} fontSize={FS.sm}>
        Topological stabilizer code · threshold p_th ≈ 1% · distance d = 5 shown
      </text>

      <g transform="translate(30,68)">
        <g stroke={T.border} strokeWidth={SW.hairline}>
          {[0, 40, 80, 120, 160].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="160" y2={y} />
          ))}
          {[0, 40, 80, 120, 160].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="160" />
          ))}
        </g>
        <g fill={T.coral} opacity="0.18">
          <rect x="0" y="0" width="40" height="40" />
          <rect x="80" y="0" width="40" height="40" />
          <rect x="40" y="40" width="40" height="40" />
          <rect x="120" y="40" width="40" height="40" />
          <rect x="0" y="80" width="40" height="40" />
          <rect x="80" y="80" width="40" height="40" />
          <rect x="40" y="120" width="40" height="40" />
          <rect x="120" y="120" width="40" height="40" />
        </g>
        <g fill={T.peachLight} opacity="0.15">
          <rect x="40" y="0" width="40" height="40" />
          <rect x="120" y="0" width="40" height="40" />
          <rect x="0" y="40" width="40" height="40" />
          <rect x="80" y="40" width="40" height="40" />
          <rect x="40" y="80" width="40" height="40" />
          <rect x="120" y="80" width="40" height="40" />
          <rect x="0" y="120" width="40" height="40" />
          <rect x="80" y="120" width="40" height="40" />
        </g>
        <g fill={T.coral}>
          {vertices.map(([x, y]) => (
            <circle key={`d${x}-${y}`} cx={x} cy={y} r="3.5" />
          ))}
        </g>
        <g fill={T.peachLight}>
          {[
            [20, 20], [100, 20], [60, 60], [140, 60],
            [20, 100], [100, 100], [60, 140], [140, 140],
          ].map(([x, y]) => (
            <circle key={`xs${x}-${y}`} cx={x} cy={y} r="2.8" />
          ))}
        </g>
        <g fill="none" stroke={T.peachLight} strokeWidth={SW.standard}>
          {[
            [60, 20], [140, 20], [20, 60], [100, 60],
            [60, 100], [140, 100], [20, 140], [100, 140],
          ].map(([x, y]) => (
            <circle key={`zs${x}-${y}`} cx={x} cy={y} r="2.8" />
          ))}
        </g>
        <g>
          <circle cx="40" cy="80" r="6" fill="none" stroke={T.success} strokeWidth={SW.emphasis} />
          <circle cx="80" cy="80" r="6" fill="none" stroke={T.success} strokeWidth={SW.emphasis} />
          <text x="40" y="96" textAnchor="middle" fill={T.success} fontSize={FS.xs} fontWeight="700">X</text>
          <text x="80" y="96" textAnchor="middle" fill={T.success} fontSize={FS.xs} fontWeight="700">X</text>
        </g>
      </g>

      <g transform="translate(210,68)">
        <text fill={T.peach} fontSize={FS.sm} fontWeight="700" letterSpacing={TRK.caption}>STABILIZER GENERATORS</text>
        <g transform="translate(0,14)" fontSize={FS.base}>
          <rect x="0" y="0" width="270" height="24" rx={R.chip} fill={T.cardDeep} />
          <text x="8" y="16">
            <tspan fill={T.coral} fontWeight="700">X-plaquette: </tspan>
            <tspan fill={T.white}>S</tspan>
            <tspan fill={T.white} fontSize={FS.xs} dy="3">p</tspan>
            <tspan fill={T.white} fontSize={FS.base} dy="-3"> = ⊗ Xᵢ  (4-body)</tspan>
          </text>
          <rect x="0" y="30" width="270" height="24" rx={R.chip} fill={T.cardDeep} />
          <text x="8" y="46">
            <tspan fill={T.peachLight} fontWeight="700">Z-plaquette: </tspan>
            <tspan fill={T.white}>S</tspan>
            <tspan fill={T.white} fontSize={FS.xs} dy="3">p</tspan>
            <tspan fill={T.white} fontSize={FS.base} dy="-3"> = ⊗ Zᵢ  (4-body)</tspan>
          </text>
        </g>

        <text y="88" fill={T.peach} fontSize={FS.sm} fontWeight="700" letterSpacing={TRK.caption}>LOGICAL OPS · LxL LATTICE</text>
        <g transform="translate(0,100)" fontSize={FS.sm}>
          <rect x="0" y="0" width="270" height="20" rx={R.chip} fill={T.cardDeep} />
          <text x="8" y="14" fill={T.white}>X̄ = X₁X₂…X_d (row)  ·  Z̄ = Z₁Z₂…Z_d (column)</text>
        </g>

        <text y="140" fill={T.peach} fontSize={FS.sm} fontWeight="700" letterSpacing={TRK.caption}>SUPPRESSION LAW</text>
        <g transform="translate(0,152)">
          <rect x="0" y="0" width="270" height="22" rx={R.chip} fill={T.cardDeep} />
          <text x="8" y="15">
            <tspan fill={T.white} fontSize={FS.base}>p_L  ∝  (p / p_th)</tspan>
            <tspan fill={T.white} fontSize={FS.xs} dy="-4">(d+1)/2</tspan>
          </text>
        </g>
      </g>

      <g transform="translate(20,220)">
        <rect x="0" y="-8" width="460" height="18" rx={R.chip} fill={T.cardDeep} />
        <text x="10" y="4" fill={T.textMuted} fontSize={FS.xs} letterSpacing={TRK.caption}>PARAMS</text>
        <text x="55" y="4" fill={T.coral} fontSize={FS.sm} fontWeight="700">d=5 ⇒ 25 data + 24 syndrome</text>
        <text x="230" y="4" fill={T.coral} fontSize={FS.sm} fontWeight="700">corrects ⌊(d−1)/2⌋ = 2 errors</text>
        <text x="420" y="4" fill={T.peachLight} fontSize={FS.sm} fontWeight="700">k = 1</text>
      </g>
    </Card>
  );
}

// ============================================================================
// SECTION III — GATE MATRICES
// ============================================================================
function GateMatrices() {
  return (
    <Card x={550} y={26} width={400} height={240}>
      <text x="20" y="28" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        GATE ALGEBRA · SU(2) · SU(4)
      </text>
      <text x="20" y="44" fill={T.textMuted} fontSize={FS.sm}>
        {'Pauli algebra: {σᵢ, σⱼ} = 2δᵢⱼI · [σᵢ, σⱼ] = 2iεᵢⱼₖσₖ'}
      </text>

      <g transform="translate(20,60)" fontSize={FS.sm}>
        <g>
          <rect x="0" y="0" width="80" height="62" rx={R.pill} fill={T.cardDeep} />
          <text x="40" y="14" textAnchor="middle" fill={T.coral} fontSize={FS.md} fontWeight="700">X</text>
          <text x="40" y="26" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs}>bit flip</text>
          <g transform="translate(10,32)" fill={T.white} fontSize={FS.base}>
            <text x="0" y="9">[ 0  1 ]</text>
            <text x="0" y="24">[ 1  0 ]</text>
          </g>
        </g>
        <g transform="translate(90,0)">
          <rect x="0" y="0" width="80" height="62" rx={R.pill} fill={T.cardDeep} />
          <text x="40" y="14" textAnchor="middle" fill={T.coral} fontSize={FS.md} fontWeight="700">Y</text>
          <text x="40" y="26" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs}>bit, phase</text>
          <g transform="translate(10,32)" fill={T.white} fontSize={FS.base}>
            <text x="0" y="9">[ 0 −i ]</text>
            <text x="0" y="24">[ i  0 ]</text>
          </g>
        </g>
        <g transform="translate(180,0)">
          <rect x="0" y="0" width="80" height="62" rx={R.pill} fill={T.cardDeep} />
          <text x="40" y="14" textAnchor="middle" fill={T.coral} fontSize={FS.md} fontWeight="700">Z</text>
          <text x="40" y="26" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs}>phase flip</text>
          <g transform="translate(10,32)" fill={T.white} fontSize={FS.base}>
            <text x="0" y="9">[ 1  0 ]</text>
            <text x="0" y="24">[ 0 −1 ]</text>
          </g>
        </g>
        <g transform="translate(270,0)">
          <rect x="0" y="0" width="90" height="62" rx={R.pill} fill={T.cardDeep} />
          <text x="45" y="14" textAnchor="middle" fill={T.peach} fontSize={FS.md} fontWeight="700">H</text>
          <text x="45" y="26" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs}>Hadamard</text>
          <text x="8" y="40" fill={T.white} fontSize={FS.base}>1/√2 [ 1   1]</text>
          <text x="32" y="54" fill={T.white} fontSize={FS.base}>[ 1 −1]</text>
        </g>
      </g>

      <g transform="translate(20,134)" fontSize={FS.sm}>
        <g>
          <rect x="0" y="0" width="80" height="62" rx={R.pill} fill={T.cardDeep} />
          <text x="40" y="14" textAnchor="middle" fill={T.peachLight} fontSize={FS.md} fontWeight="700">S = √Z</text>
          <text x="40" y="26" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs}>π/2 phase</text>
          <g transform="translate(10,32)" fill={T.white} fontSize={FS.base}>
            <text x="0" y="9">[ 1  0 ]</text>
            <text x="0" y="24">[ 0  i ]</text>
          </g>
        </g>
        <g transform="translate(90,0)">
          <rect x="0" y="0" width="80" height="62" rx={R.pill} fill={T.cardDeep} />
          <text x="40" y="14" textAnchor="middle" fill={T.peachLight} fontSize={FS.md} fontWeight="700">T = ⁴√Z</text>
          <text x="40" y="26" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs}>π/4 phase</text>
          <g transform="translate(6,32)" fill={T.white} fontSize={FS.sm}>
            <text x="0" y="9">[ 1   0 ]</text>
            <text x="0" y="24">[ 0  e^iπ/4 ]</text>
          </g>
        </g>
        <g transform="translate(180,0)">
          <rect x="0" y="0" width="180" height="62" rx={R.pill} fill={T.cardDeep} />
          <text x="90" y="14" textAnchor="middle" fill={T.coral} fontSize={FS.md} fontWeight="700">CNOT ∈ SU(4)</text>
          <text x="90" y="24" textAnchor="middle" fill={T.textMuted} fontSize={FS.xs}>2-qubit entangler</text>
          <g transform="translate(40,30)" fill={T.white} fontSize={FS.sm}>
            <text x="0" y="8">[ 1 0 0 0 ]</text>
            <text x="0" y="19">[ 0 1 0 0 ]</text>
            <text x="0" y="30">[ 0 0 0 1 ]</text>
          </g>
        </g>
      </g>

      <g transform="translate(20,210)">
        <rect x="0" y="-8" width="360" height="20" rx={R.chip} fill={T.cardDeep} />
        <g fill={T.peach} fontSize={FS.sm} fontWeight="700">
          <text x="10" y="6">HXH = Z</text>
          <text x="74" y="6">HZH = X</text>
          <text x="138" y="6">T² = S</text>
          <text x="190" y="6">S² = Z</text>
          <text x="240" y="6">XYZ = iI</text>
        </g>
      </g>
    </Card>
  );
}

// ============================================================================
// SECTION III — DECOHERENCE
// ============================================================================
function Decoherence() {
  return (
    <Card x={970} y={26} width={400} height={240}>
      <text x="20" y="28" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        DECOHERENCE · NOISE CHANNELS
      </text>
      <text x="20" y="44" fill={T.textMuted} fontSize={FS.sm}>
        {'Lindblad master eq. · ρ̇ = −i[H,ρ] + Σₖ(LₖρLₖ† − ½{Lₖ†Lₖ, ρ})'}
      </text>

      <g transform="translate(30,64)">
        <line x1="0" y1="100" x2="340" y2="100" stroke={T.axis} strokeWidth={SW.fine} />
        <line x1="0" y1="0" x2="0" y2="100" stroke={T.axis} strokeWidth={SW.fine} />
        <text x="-6" y="4" textAnchor="end" fill={T.textMuted} fontSize={FS.xs}>1.0</text>
        <text x="-6" y="54" textAnchor="end" fill={T.textMuted} fontSize={FS.xs}>0.5</text>
        <text x="-6" y="104" textAnchor="end" fill={T.textMuted} fontSize={FS.xs}>0</text>
        <text x="340" y="114" textAnchor="end" fill={T.textMuted} fontSize={FS.xs} letterSpacing={TRK.caption}>time →</text>

        <g stroke={T.border} strokeWidth={SW.hairline} strokeDasharray="2,3">
          <line x1="0" y1="50" x2="340" y2="50" />
          <line x1="85" y1="0" x2="85" y2="100" />
          <line x1="170" y1="0" x2="170" y2="100" />
          <line x1="255" y1="0" x2="255" y2="100" />
        </g>

        <path d="M 0 4 Q 85 30 170 50 Q 255 68 340 82" fill="none" stroke={T.coral} strokeWidth={SW.bold} strokeLinecap="round" />
        <path d="M 0 4 Q 60 40 120 60 Q 200 80 340 95" fill="none" stroke={T.peachLight} strokeWidth={SW.bold} strokeLinecap="round" />
        <path d="M 0 4 Q 40 50 80 76 Q 160 92 340 98" fill="none" stroke={T.peach} strokeWidth={SW.emphasis} strokeDasharray="3,2" strokeLinecap="round" />

        <path d="M 0 4 Q 85 30 170 50 Q 255 68 340 82 L 340 100 L 0 100 Z" fill="url(#decayGrad)" opacity="0.4" />

        <circle cx="170" cy="50" r="3" fill={T.coral} />
        <text x="170" y="40" textAnchor="middle" fill={T.coral} fontSize={FS.xs} fontWeight="700">T₁</text>
        <circle cx="85" cy="50" r="3" fill={T.peachLight} />
        <text x="85" y="40" textAnchor="middle" fill={T.peachLight} fontSize={FS.xs} fontWeight="700">T₂</text>
      </g>

      <g transform="translate(30,180)" fontSize={FS.sm}>
        <circle cx="0" cy="-3" r="3" fill={T.coral} />
        <text x="8" y="0" fill={T.white}>T₁: energy relaxation · amplitude damping</text>
        <circle cx="0" cy="11" r="3" fill={T.peachLight} />
        <text x="8" y="14" fill={T.white}>T₂: dephasing (phase damping)</text>
        <circle cx="0" cy="25" r="3" fill={T.peach} />
        <text x="8" y="28" fill={T.white}>T₂*: inhomogeneous · includes low-freq noise</text>
      </g>

      <g transform="translate(200,180)">
        <text fill={T.peach} fontSize={FS.xs} fontWeight="700" letterSpacing={TRK.caption}>DEPOLARIZING CHANNEL</text>
        <text y="12" fill={T.white} fontSize={FS.sm}>ε(ρ) = (1−p)ρ + p/3(XρX+YρY+ZρZ)</text>
        <text y="26" fill={T.peach} fontSize={FS.xs} fontWeight="700" letterSpacing={TRK.caption}>RELATION</text>
        <text y="38" fill={T.white} fontSize={FS.sm}>1/T₂ = 1/(2T₁) + 1/T_φ</text>
      </g>
    </Card>
  );
}

function ErrorCorrectionRow() {
  return (
    <g transform="translate(0,740)">
      <SectionHeader title="III. ERROR CORRECTION · GATE ALGEBRA · NOISE CHANNELS" aside="§ stabilizer formalism · Kraus operators" />
      <line x1="550" y1="10" x2="1370" y2="10" stroke={T.textDark} strokeWidth={SW.hairline} opacity="0.35" />
      <SurfaceCode />
      <GateMatrices />
      <Decoherence />
    </g>
  );
}

// ============================================================================
// SECTION IV — ALGORITHMS / TIMELINE / APPLICATIONS
// ============================================================================
const ALGORITHMS = [
  { name: 'Shor', classical: 'exp((log N)^⅓)', quantum: 'O((log N)³)', domain: 'integer factoring', color: T.coral },
  { name: 'Grover', classical: 'O(N)', quantum: 'O(√N)', domain: 'unstructured search', color: T.coral },
  { name: 'QFT', classical: 'O(N log N)', quantum: 'O((log N)²)', domain: 'phase estimation', color: T.coral },
  { name: 'HHL', classical: 'O(N√κ)', quantum: 'O(log N · κ²)', domain: 'linear systems', color: T.coral },
  { name: 'VQE', classical: 'exp(N)', quantum: 'poly(N) · NISQ', domain: 'chem eigenvalues', color: T.peach },
  { name: 'QAOA', classical: 'heuristic', quantum: 'O(p·poly(n))', domain: 'combinatorial opt.', color: T.peach },
];

function AlgorithmTaxonomy() {
  return (
    <Card x={30} y={26} width={460} height={150}>
      <text x="16" y="24" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        QUANTUM ALGORITHM TAXONOMY
      </text>
      <g fontSize={FS.sm} transform="translate(16,36)">
        <text x="0" y="10" fill={T.textMuted} letterSpacing={TRK.caption} fontWeight="700">ALGORITHM</text>
        <text x="138" y="10" fill={T.textMuted} letterSpacing={TRK.caption} fontWeight="700">CLASSICAL</text>
        <text x="228" y="10" fill={T.textMuted} letterSpacing={TRK.caption} fontWeight="700">QUANTUM</text>
        <text x="320" y="10" fill={T.textMuted} letterSpacing={TRK.caption} fontWeight="700">DOMAIN</text>
        <line x1="0" y1="14" x2="430" y2="14" stroke={T.border} strokeWidth={SW.fine} />
        {ALGORITHMS.map((a, i) => (
          <g key={a.name} transform={`translate(0,${28 + i * 14})`}>
            <text x="0" fill={a.color} fontWeight="700">{a.name}</text>
            <text x="138" fill={T.white}>{a.classical}</text>
            <text x="228" fill={a.color} fontWeight="700">{a.quantum}</text>
            <text x="320" fill={T.peachLight}>{a.domain}</text>
          </g>
        ))}
      </g>
    </Card>
  );
}

function ScalingRoadmap() {
  return (
    <Card x={510} y={26} width={460} height={150}>
      <text x="16" y="24" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        SCALING ROADMAP · PHYSICAL QUBITS
      </text>

      <g transform="translate(30,46)">
        <line x1="0" y1="80" x2="420" y2="80" stroke={T.axis} strokeWidth={SW.fine} />
        <line x1="0" y1="0" x2="0" y2="80" stroke={T.axis} strokeWidth={SW.fine} />
        <text x="-4" y="82" textAnchor="end" fill={T.textMuted} fontSize={FS.xs}>10</text>
        <text x="-4" y="62" textAnchor="end" fill={T.textMuted} fontSize={FS.xs}>10²</text>
        <text x="-4" y="42" textAnchor="end" fill={T.textMuted} fontSize={FS.xs}>10³</text>
        <text x="-4" y="22" textAnchor="end" fill={T.textMuted} fontSize={FS.xs}>10⁴</text>
        <text x="-4" y="4" textAnchor="end" fill={T.textMuted} fontSize={FS.xs}>10⁵</text>
        <g fontSize={FS.xs} fill={T.textMuted} textAnchor="middle">
          <text x="0" y="92">2019</text>
          <text x="70" y="92">&apos;21</text>
          <text x="140" y="92">&apos;23</text>
          <text x="210" y="92">&apos;25</text>
          <text x="280" y="92">&apos;27</text>
          <text x="350" y="92">&apos;29</text>
          <text x="420" y="92">&apos;31</text>
        </g>
        <g stroke={T.border} strokeWidth={SW.hairline} strokeDasharray="2,2">
          <line x1="0" y1="20" x2="420" y2="20" />
          <line x1="0" y1="40" x2="420" y2="40" />
          <line x1="0" y1="60" x2="420" y2="60" />
        </g>

        <path d="M 0 72 L 35 66 L 70 58 L 105 50 L 140 44 L 175 36 L 210 28" fill="none" stroke={T.coral} strokeWidth={SW.bold} strokeLinecap="round" />
        <path d="M 210 28 L 245 18 L 280 10 L 315 4" fill="none" stroke={T.coral} strokeWidth={SW.bold} strokeLinecap="round" strokeDasharray="3,2" />
        <path d="M 140 78 L 175 74 L 210 66 L 245 54 L 280 42 L 315 30 L 350 20 L 385 12 L 420 6" fill="none" stroke={T.peachLight} strokeWidth={SW.bold} strokeLinecap="round" strokeDasharray="3,2" />

        <g>
          <circle cx="0" cy="72" r="3" fill={T.coral} />
          <circle cx="70" cy="58" r="3" fill={T.coral} />
          <circle cx="140" cy="44" r="3" fill={T.coral} />
          <circle cx="210" cy="28" r="3.5" fill={T.peachLight} stroke={T.coral} strokeWidth={SW.standard} />
        </g>

        <rect x="0" y="0" width="210" height="80" fill={T.coral} opacity="0.05" />
        <rect x="210" y="0" width="210" height="80" fill={T.peach} opacity="0.08" />
        <text x="105" y="12" textAnchor="middle" fill={T.coral} fontSize={FS.xs} fontWeight="700" letterSpacing={TRK.label} opacity="0.85">NISQ ERA</text>
        <text x="315" y="12" textAnchor="middle" fill={T.peachLight} fontSize={FS.xs} fontWeight="700" letterSpacing={TRK.label} opacity="0.85">FAULT-TOLERANT</text>
      </g>

      <g transform="translate(16,138)" fontSize={FS.xs}>
        <line x1="0" y1="-2" x2="14" y2="-2" stroke={T.coral} strokeWidth={SW.bold} />
        <text x="18" y="2" fill={T.white}>physical qubits</text>
        <line x1="100" y1="-2" x2="114" y2="-2" stroke={T.peachLight} strokeWidth={SW.bold} strokeDasharray="3,2" />
        <text x="118" y="2" fill={T.white}>logical qubits (projected)</text>
        <text x="280" y="2" fill={T.peach} fontWeight="700">~1M physical for useful FTQC</text>
      </g>
    </Card>
  );
}

function Applications() {
  const nodes = [
    { cx: 0, cy: -52, fill: T.peachLight },
    { cx: 54, cy: -28, fill: T.peach },
    { cx: 54, cy: 28, fill: T.peachLight },
    { cx: 0, cy: 52, fill: T.peach },
    { cx: -54, cy: 28, fill: T.peachLight },
    { cx: -54, cy: -28, fill: T.peach },
  ];

  const labels = [
    { swatch: T.peachLight, title: 'Cryptography', sub: 'RSA/ECC break · PQC urgency' },
    { swatch: T.peach, title: 'Chemistry / Materials', sub: 'FeMoco · catalysis · batteries' },
    { swatch: T.peachLight, title: 'Optimization', sub: 'logistics · portfolio · MaxCut' },
    { swatch: T.peach, title: 'Quantum ML · Simulation', sub: 'kernel methods · many-body' },
  ];

  return (
    <Card x={990} y={26} width={380} height={150}>
      <text x="16" y="24" fill={T.white} fontSize={FS.md} fontWeight="700" letterSpacing={TRK.caption}>
        QUANTUM ADVANTAGE · DOMAINS
      </text>

      <g transform="translate(90,88)">
        <circle cx="0" cy="0" r="22" fill={T.coral} />
        <text x="0" y="-2" textAnchor="middle" fill={T.card} fontSize={FS.xs} fontWeight="700" letterSpacing={TRK.tight}>QUANTUM</text>
        <text x="0" y="8" textAnchor="middle" fill={T.card} fontSize={FS.xs} fontWeight="700" letterSpacing={TRK.tight}>ADVANTAGE</text>

        <g stroke={T.coral} strokeWidth={SW.standard} opacity="0.6">
          <line x1="0" y1="-22" x2="0" y2="-46" />
          <line x1="22" y1="-11" x2="48" y2="-24" />
          <line x1="22" y1="11" x2="48" y2="24" />
          <line x1="0" y1="22" x2="0" y2="46" />
          <line x1="-22" y1="11" x2="-48" y2="24" />
          <line x1="-22" y1="-11" x2="-48" y2="-24" />
        </g>
        <g>
          {nodes.map((n, i) => (
            <circle key={i} cx={n.cx} cy={n.cy} r="8" fill={n.fill} />
          ))}
        </g>
      </g>

      <g transform="translate(184,46)" fontSize={FS.sm}>
        {labels.map((l, i) => (
          <g key={l.title} transform={`translate(0,${i * 24})`}>
            <rect x="0" y="0" width="8" height="8" rx="1.5" fill={l.swatch} />
            <text x="14" y="8" fill={T.white} fontWeight="700">{l.title}</text>
            <text x="14" y="19" fill={T.textMuted} fontSize={FS.xs}>{l.sub}</text>
          </g>
        ))}
      </g>
    </Card>
  );
}

function AlgorithmsRow() {
  return (
    <g transform="translate(0,1030)">
      <SectionHeader title="IV. ALGORITHMS · SCALING · QUANTUM ADVANTAGE" aside="§ complexity · roadmap · use cases" />
      <line x1="490" y1="10" x2="1370" y2="10" stroke={T.textDark} strokeWidth={SW.hairline} opacity="0.35" />
      <AlgorithmTaxonomy />
      <ScalingRoadmap />
      <Applications />
    </g>
  );
}

// ============================================================================
// FOOTER
// ============================================================================
// Small-caps rendering preserves the intentional "DiVincenzo" casing even
// though the line reads as uppercase at a glance.
function Footer() {
  return (
    <g transform="translate(700,1218)">
      <circle cx="-120" cy="-4" r="2" fill={T.peach} />
      <circle cx="-100" cy="-4" r="2.5" fill={T.coral} />
      <circle cx="120" cy="-4" r="2" fill={T.peach} />
      <circle cx="100" cy="-4" r="2.5" fill={T.coral} />
      <text
        y="0"
        textAnchor="middle"
        fill={T.textSubtle}
        fontSize={FS.sm}
        letterSpacing={TRK.eyebrow}
        fontVariant="small-caps"
      >
        DiVincenzo criteria · no-cloning · unitarity · reversibility · measurement collapse
      </text>
    </g>
  );
}

// ============================================================================
// MAIN EXPORT
// ============================================================================
export interface QuantumComputingStackProps {
  className?: string;
  style?: CSSProperties;
}

export default function QuantumComputingStack({ className, style }: QuantumComputingStackProps) {
  return (
    <svg
      viewBox="0 0 1400 1240"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ fontFamily: FONT, display: 'block', width: '100%', height: 'auto', ...style }}
      role="img"
      aria-labelledby="qcs-title qcs-desc"
    >
      <title id="qcs-title">The Quantum Computing Stack</title>
      <desc id="qcs-desc">
        A four-section technical reference infographic. Section I surveys five physical qubit
        modalities: superconducting, trapped ion, neutral atom, photonic, and topological. Section
        II illustrates the single-qubit state on the Bloch sphere, a five-qubit universal circuit,
        and entanglement via the four Bell states, GHZ, and W. Section III covers the distance-5
        surface code, single- and two-qubit gate matrices, and decoherence channels with T1 and T2
        decay curves. Section IV lists quantum algorithms with their classical and quantum
        complexity, a scaling roadmap from the NISQ era to fault tolerance, and the domains where
        quantum advantage is expected.
      </desc>
      <Defs />
      <rect width="1400" height="1240" fill={T.bg} />
      <rect width="1400" height="1240" fill="url(#gridDots)" />
      <CornerMarks />
      <TitleBlock />
      <PhysicalPlatforms />
      <QuantumStateRow />
      <ErrorCorrectionRow />
      <AlgorithmsRow />
      <Footer />
    </svg>
  );
}
