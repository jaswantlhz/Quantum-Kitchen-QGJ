export interface Recipe {
  id: string;
  name: string;
  customer: string;
  dialogue: string;
  description: string;
  orderCode: string;
  strandColors: string[]; // Hex codes for the starting particles
  strandNames: string[];
  targetFlavor: {
    sweetness: number;
    sourness: number;
    spiciness: number;
    umami: number;
  };
  minCoherence: number;
  hintBraid: string;
  rewardCredits: number;
  dishIcon: string;
}

export const COSMIC_RECIPES: Recipe[] = [
  {
    id: 'recipe-souffle',
    name: 'Cosmic Soufflé',
    customer: 'Dr. Lyra Vega (Astro-Physicist)',
    dialogue: '"I have a symposium in an hour on Tau Anyons. Prepare a fluffy Soufflé with high golden-ratio coherence and a delicate Sweetness!"',
    description: 'A light, levitating dessert held in stable equilibrium by pure Fibonacci anyon braiding.',
    orderCode: '#TAU-01',
    strandColors: ['#00f0ff', '#ff007f', '#ffe600'], // Cyan, Magenta, Gold
    strandNames: ['Tau-Alpha (Cyan)', 'Tau-Beta (Magenta)', 'Tau-Gamma (Gold)'],
    targetFlavor: { sweetness: 75, sourness: 25, spiciness: 30, umami: 70 },
    minCoherence: 70,
    hintBraid: 'Lane 1 Over, Lane 2 Under, Lane 1 Over (σ₁ · σ₂⁻¹ · σ₁)',
    rewardCredits: 150,
    dishIcon: '🧁',
  },
  {
    id: 'recipe-tiramisu',
    name: 'Tachyon Tiramisu',
    customer: 'Chronos (Time Weaver)',
    dialogue: '"Non-Abelian order is paramount! Braid Lane 2 before Lane 1 to maximize the quantum phase shift for an Umami kick."',
    description: 'Espresso-soaked quantum ladyfingers dusted with super-luminal cacao particles.',
    orderCode: '#CHRONO-88',
    strandColors: ['#ff007f', '#a855f7', '#06d6a0'], // Magenta, Violet, Emerald
    strandNames: ['Chrono-Ruby', 'Void-Amethyst', 'Flux-Emerald'],
    targetFlavor: { sweetness: 50, sourness: 70, spiciness: 20, umami: 85 },
    minCoherence: 60,
    hintBraid: 'Lane 2 Over, Lane 1 Over, Lane 2 Under (σ₂ · σ₁ · σ₂⁻¹)',
    rewardCredits: 220,
    dishIcon: '🍰',
  },
  {
    id: 'recipe-plasma-soda',
    name: 'Sparkly Plasma Soda',
    customer: 'Gizmo (Cyber-Scrapper)',
    dialogue: '"Make it fizz, chef! Lots of rapid twists in Lane 1 to whip up quantum carbonation and a spicy kick!"',
    description: 'A fizzy, effervescent potion glowing with neon photons that pop like miniature supernovas.',
    orderCode: '#FIZZ-77',
    strandColors: ['#00f0ff', '#ffe600', '#f43f5e'], // Cyan, Gold, Rose
    strandNames: ['Ion-Blue', 'Solar-Amber', 'Laser-Rose'],
    targetFlavor: { sweetness: 80, sourness: 50, spiciness: 85, umami: 30 },
    minCoherence: 50,
    hintBraid: 'Double twist Lane 1 Over, then weave Lane 2 (σ₁ · σ₁ · σ₂)',
    rewardCredits: 180,
    dishIcon: '🥤',
  },
  {
    id: 'recipe-singularity-ramen',
    name: 'Singularity Ramen',
    customer: 'Admiral Thorne (Deep Fleet)',
    dialogue: '"We need a rich, intense broth to fuel our warp drive. Weave a symmetric 4-crossing knot to synthesize deep Umami!"',
    description: 'Topological noodles submerged in a dense gravitational broth seasoned with black hole salt.',
    orderCode: '#WARP-99',
    strandColors: ['#38bdf8', '#fbbf24', '#c084fc'], // Sky, Amber, Purple
    strandNames: ['Graviton-Sky', 'Quark-Amber', 'Neutrino-Purple'],
    targetFlavor: { sweetness: 35, sourness: 40, spiciness: 70, umami: 95 },
    minCoherence: 75,
    hintBraid: 'Alternating weave: σ₁ · σ₂ · σ₁⁻¹ · σ₂⁻¹',
    rewardCredits: 300,
    dishIcon: '🍜',
  },
];
