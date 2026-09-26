export interface KitchenUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  effectLabel: string;
  icon: string;
}

export const INITIAL_UPGRADES: KitchenUpgrade[] = [
  {
    id: 'cryo-stabilizer',
    name: 'Cryo-Phase Stabilizer',
    description: 'Dampens thermal fluctuations, boosting final quantum success energy probability by +10% per tier.',
    cost: 120,
    level: 0,
    maxLevel: 3,
    effectLabel: '+10% Success Energy',
    icon: '❄️',
  },
  {
    id: 'flux-pin',
    name: 'Topological Flux Pin',
    description: 'Pins anyon strands securely during fusion, reducing decoherence glitches by 15% per tier.',
    cost: 160,
    level: 0,
    maxLevel: 3,
    effectLabel: '-15% Decoherence Glitch',
    icon: '🧲',
  },
  {
    id: 'harmonic-whisk',
    name: 'Harmonic Whisk',
    description: 'Whips golden-ratio superpositions into smooth, velvety Umami and Sweetness profiles.',
    cost: 200,
    level: 0,
    maxLevel: 2,
    effectLabel: '+20% Flavor Harmony',
    icon: '✨',
  },
  {
    id: 'holo-guide',
    name: 'Holographic Knot Guide',
    description: 'Projects visual trajectory hints directly onto the pegboard lanes for precise braiding.',
    cost: 250,
    level: 0,
    maxLevel: 1,
    effectLabel: 'Enables Visual Braid Projection',
    icon: '👁️',
  },
];
