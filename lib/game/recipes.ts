import { INGREDIENTS } from './ingredientSketches';

export interface Recipe {
  id: string;
  name: string;
  customer: string;
  dialogue: string;
  description: string;
  orderCode: string;
  strandCount: number;      // 2, 3, 4, 5+ strands!
  ingredients: string[];    // Keys matching INGREDIENTS in ingredientSketches.ts
  strandColors: string[];   // Hex codes for the starting particles
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
  mealCategory: 'Salad' | 'Sandwich' | 'Soup' | 'Dessert' | 'Appetizer';
}

export const COSMIC_RECIPES: Recipe[] = [
  {
    id: 'recipe-bruschetta',
    name: 'Quantum Bruschetta',
    customer: 'Nova (Station Courier)',
    dialogue: '"Just a quick 2-strand bite before my hyperdrive jump! Toast bread and tomato together with a sharp phase twist."',
    description: 'Crispy warm quantum bread topped with diced solar tomatoes and an olive-oil aura.',
    orderCode: '#SNACK-02',
    strandCount: 2,
    ingredients: ['bread', 'tomato'],
    strandColors: [INGREDIENTS.bread.naturalColor, INGREDIENTS.tomato.naturalColor],
    strandNames: ['Warm Bread (Lane 1)', 'Solar Tomato (Lane 2)'],
    targetFlavor: { sweetness: 60, sourness: 55, spiciness: 15, umami: 65 },
    minCoherence: 60,
    hintBraid: 'Single twist Over: σ₁',
    rewardCredits: 120,
    dishIcon: '🥖',
    mealCategory: 'Appetizer',
  },
  {
    id: 'recipe-souffle',
    name: 'Cosmic Soufflé',
    customer: 'Dr. Lyra Vega (Astro-Physicist)',
    dialogue: '"I have a symposium in an hour on Tau Anyons. Prepare a fluffy Soufflé with high golden-ratio coherence and delicate Sweetness!"',
    description: 'A light, levitating dessert held in stable equilibrium by pure Fibonacci anyon braiding.',
    orderCode: '#TAU-01',
    strandCount: 3,
    ingredients: ['carrot', 'potato', 'lettuce'],
    strandColors: [INGREDIENTS.carrot.naturalColor, INGREDIENTS.potato.naturalColor, INGREDIENTS.lettuce.naturalColor],
    strandNames: ['Quantum Carrot', 'Cosmic Potato', 'Auroral Lettuce'],
    targetFlavor: { sweetness: 75, sourness: 25, spiciness: 30, umami: 70 },
    minCoherence: 70,
    hintBraid: 'Lane 1 Over, Lane 2 Under, Lane 1 Over (σ₁ · σ₂⁻¹ · σ₁)',
    rewardCredits: 180,
    dishIcon: '🧁',
    mealCategory: 'Dessert',
  },
  {
    id: 'recipe-sandwich',
    name: 'Nebula Club Sandwich',
    customer: 'Captain Vance (Star Hauler)',
    dialogue: '"Heavy appetite today! Stack 4 layers: bread, lettuce, tomato, and peppers. Merge them at the mixer into a single plated meal!"',
    description: 'A towering 4-strand sandwich with crisp garden greens and glowing golden crusts.',
    orderCode: '#CLUB-04',
    strandCount: 4,
    ingredients: ['bread', 'lettuce', 'tomato', 'pepper'],
    strandColors: [
      INGREDIENTS.bread.naturalColor,
      INGREDIENTS.lettuce.naturalColor,
      INGREDIENTS.tomato.naturalColor,
      INGREDIENTS.pepper.naturalColor,
    ],
    strandNames: ['Warm Bread', 'Auroral Lettuce', 'Solar Tomato', 'Flux Pepper'],
    targetFlavor: { sweetness: 50, sourness: 60, spiciness: 45, umami: 85 },
    minCoherence: 65,
    hintBraid: 'Weave across 3 lanes (σ₁ · σ₂ · σ₃) then toggle Merge!',
    rewardCredits: 260,
    dishIcon: '🥪',
    mealCategory: 'Sandwich',
  },
  {
    id: 'recipe-soup',
    name: 'Singularity Ramen Soup',
    customer: 'Admiral Thorne (Deep Fleet)',
    dialogue: '"We need a rich, intense broth to fuel our warp drive. Boil potatoes, carrots, and paprika into deep savory Umami!"',
    description: 'Topological noodles submerged in a dense gravitational broth simmered in a quantum boiling pot.',
    orderCode: '#WARP-99',
    strandCount: 4,
    ingredients: ['potato', 'carrot', 'paprika', 'lettuce'],
    strandColors: [
      INGREDIENTS.potato.naturalColor,
      INGREDIENTS.carrot.naturalColor,
      INGREDIENTS.paprika.naturalColor,
      INGREDIENTS.lettuce.naturalColor,
    ],
    strandNames: ['Cosmic Potato', 'Quantum Carrot', 'Tachyon Paprika', 'Auroral Lettuce'],
    targetFlavor: { sweetness: 35, sourness: 40, spiciness: 75, umami: 95 },
    minCoherence: 75,
    hintBraid: 'Alternating boil weave: σ₁ · σ₂ · σ₃ · σ₂⁻¹',
    rewardCredits: 320,
    dishIcon: '🥣',
    mealCategory: 'Soup',
  },
  {
    id: 'recipe-salad',
    name: 'Solar Garden Salad',
    customer: 'Botanist Clover (Bio-Dome 7)',
    dialogue: '"Keep it pure and fresh! Chop lettuce, tomatoes, peppers, and carrots with high coherence and crisp acidity."',
    description: 'A vibrant bowl of tossed quantum greens seasoned with cosmic herb vinaigrette.',
    orderCode: '#GARDEN-05',
    strandCount: 5,
    ingredients: ['lettuce', 'tomato', 'pepper', 'carrot', 'paprika'],
    strandColors: [
      INGREDIENTS.lettuce.naturalColor,
      INGREDIENTS.tomato.naturalColor,
      INGREDIENTS.pepper.naturalColor,
      INGREDIENTS.carrot.naturalColor,
      INGREDIENTS.paprika.naturalColor,
    ],
    strandNames: ['Lettuce', 'Tomato', 'Pepper', 'Carrot', 'Paprika'],
    targetFlavor: { sweetness: 65, sourness: 75, spiciness: 40, umami: 60 },
    minCoherence: 70,
    hintBraid: 'Multi-lane chopping across lanes 1-4 for maximum freshness!',
    rewardCredits: 350,
    dishIcon: '🥗',
    mealCategory: 'Salad',
  },
];
