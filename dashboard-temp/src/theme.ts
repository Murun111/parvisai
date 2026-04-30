export const T = {
  bg: '#F8EFE6',
  bgSoft: '#FBF4EB',
  card: '#1E2230',
  cardDeep: '#0E1118',
  coral: '#F97356',
  peach: '#F4A68C',
  peachLight: '#FFB89A',
  off: '#FEFBF5',
  textMuted: '#8C93A5',
  textSubtle: '#8B7F6E',
  textBody: '#5E5548',
  textDark: '#1E2230',
  border: '#2B3040',
  rule: '#E6D9C6',
  ok: '#4ADE80',
  warn: '#E8A53A',
} as const;

export const FONT =
  "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif";

export const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

export const CHAPTERS = [
  { id: 'bit', number: '01', title: 'Bits, switches, coins' },
  { id: 'superposition', number: '02', title: 'Being many things at once' },
  { id: 'entanglement', number: '03', title: 'A secret no cable carries' },
  { id: 'gates', number: '04', title: 'Gates are rotations' },
  { id: 'algorithms', number: '05', title: 'Where quantum wins' },
] as const;
