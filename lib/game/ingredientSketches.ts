/**
 * Technical Vector Ingredient Sketches & IBM Qiskit Color Tokens
 * Renders precision 2D sketches of Carrot, Potato, Lettuce, Tomato,
 * Pepper, Paprika, and Bread for the Quantum Kitchen pegboard.
 */

export interface IngredientDef {
  id: string;
  name: string;
  label: string;
  icon: string;
  naturalColor: string;
  glitchColor: string;
  culinaryRole: 'base' | 'fresh' | 'acid' | 'starch' | 'spice' | 'sweet';
  phaseSpecialty: string;
  sketchSvg: string;
}

export const INGREDIENTS: Record<string, IngredientDef> = {
  carrot: {
    id: 'carrot',
    name: 'Quantum Carrot',
    label: 'Carrot',
    icon: '🥕',
    naturalColor: '#ff832b', // Carbon Orange 40
    glitchColor: '#5c2b0e',
    culinaryRole: 'sweet',
    phaseSpecialty: 'Phase Acceleration (Sweetness)',
    sketchSvg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><path d="M4 12L12 4M3 13C2 12 11 3 13 3C13 5 4 14 3 13Z" stroke="#ff832b" stroke-width="1.5" fill="#ff832b" fill-opacity="0.25"/><path d="M11 5L13 2M10 3L13 2" stroke="#24a148" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  },
  potato: {
    id: 'potato',
    name: 'Cosmic Potato',
    label: 'Potato',
    icon: '🥔',
    naturalColor: '#8a3ffc', // Qiskit Purple 60
    glitchColor: '#391d68',
    culinaryRole: 'starch',
    phaseSpecialty: 'Heavy Superposition Density',
    sketchSvg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><ellipse cx="8" cy="8" rx="6" ry="4.5" transform="rotate(-15 8 8)" stroke="#8a3ffc" stroke-width="1.5" fill="#8a3ffc" fill-opacity="0.25"/><circle cx="6" cy="7" r="0.6" fill="#be95ff"/><circle cx="10" cy="9" r="0.6" fill="#be95ff"/></svg>`,
  },
  lettuce: {
    id: 'lettuce',
    name: 'Auroral Lettuce',
    label: 'Lettuce',
    icon: '🥬',
    naturalColor: '#009d9a', // Quantum Gate Teal 50
    glitchColor: '#003e3d',
    culinaryRole: 'fresh',
    phaseSpecialty: 'Coherence Buffer (Freshness)',
    sketchSvg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><path d="M8 13C4 13 3 10 3 7C3 4 5 3 8 3C11 3 13 4 13 7C13 10 12 13 8 13Z" stroke="#009d9a" stroke-width="1.5" fill="#009d9a" fill-opacity="0.25"/><path d="M8 13V5M6 8C7 7.5 9 7.5 10 8" stroke="#08bdba" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  },
  tomato: {
    id: 'tomato',
    name: 'Solar Tomato',
    label: 'Tomato',
    icon: '🍅',
    naturalColor: '#ee5396', // Qiskit Magenta 50
    glitchColor: '#4f142c',
    culinaryRole: 'acid',
    phaseSpecialty: 'Acidity & Commutation (Sourness)',
    sketchSvg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><circle cx="8" cy="9" r="5" stroke="#ee5396" stroke-width="1.5" fill="#ee5396" fill-opacity="0.25"/><path d="M8 4V2M6 3.5L10 2.5" stroke="#24a148" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  },
  pepper: {
    id: 'pepper',
    name: 'Flux Bell Pepper',
    label: 'Pepper',
    icon: '🫑',
    naturalColor: '#24a148', // Carbon Green 50
    glitchColor: '#0e3b1a',
    culinaryRole: 'fresh',
    phaseSpecialty: 'Crisp Snap & Harmonic Zing',
    sketchSvg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="4" y="5" width="8" height="7" rx="3" stroke="#24a148" stroke-width="1.5" fill="#24a148" fill-opacity="0.25"/><path d="M8 5V3" stroke="#42be65" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  },
  paprika: {
    id: 'paprika',
    name: 'Tachyon Paprika',
    label: 'Paprika',
    icon: '🌶️',
    naturalColor: '#da1e28', // Carbon Red 60
    glitchColor: '#4d0b0f',
    culinaryRole: 'spice',
    phaseSpecialty: 'Twist Multiplier (Spiciness)',
    sketchSvg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><path d="M5 4C9 4 12 7 11 12C9 13 7 10 5 4Z" stroke="#da1e28" stroke-width="1.5" fill="#da1e28" fill-opacity="0.25"/><path d="M5 4L3 3" stroke="#24a148" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  },
  bread: {
    id: 'bread',
    name: 'Warm Quantum Bread',
    label: 'Bread',
    icon: '🍞',
    naturalColor: '#f1c21b', // Carbon Gold / Yellow 30
    glitchColor: '#473605',
    culinaryRole: 'base',
    phaseSpecialty: 'Foundation Carrier Strand',
    sketchSvg: `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full"><rect x="3" y="5" width="10" height="7" rx="3" stroke="#f1c21b" stroke-width="1.5" fill="#f1c21b" fill-opacity="0.25"/><path d="M5 7V9M8 7V9M11 7V9" stroke="#fdd663" stroke-width="1.2" stroke-linecap="round"/></svg>`,
  },
};

/**
 * Draws a clean procedural vector sketch of the ingredient on canvas.
 * Zero neon glow, crisp 1px borders, high contrast.
 */
export function drawIngredientSketch(
  ctx: CanvasRenderingContext2D,
  ingredientKey: string,
  centerX: number,
  centerY: number,
  radius: number = 13,
  isGlitching: boolean = false
) {
  const ing = INGREDIENTS[ingredientKey] || INGREDIENTS.carrot;
  const mainColor = isGlitching ? ing.glitchColor : ing.naturalColor;

  ctx.save();
  ctx.translate(centerX, centerY);

  // Clean, zero-glow technical badge
  ctx.shadowBlur = 0;

  // Background Badge: Carbon 90 dark or Carbon 10 light
  ctx.fillStyle = isGlitching ? '#261616' : '#262626';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Crisp precision boundary
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Technical Linework & Fill
  ctx.fillStyle = mainColor;
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 1.2;

  switch (ing.id) {
    case 'carrot':
      // Triangular root
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.lineTo(4, -4);
      ctx.lineTo(-4, -4);
      ctx.closePath();
      ctx.fill();
      // Green tip
      ctx.strokeStyle = '#24a148';
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(0, -6);
      ctx.stroke();
      break;

    case 'potato':
      // Smooth oblong
      ctx.beginPath();
      ctx.ellipse(0, 0, 5.5, 4, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      // Clean dots
      ctx.fillStyle = '#be95ff';
      ctx.fillRect(-2, -1, 1, 1);
      ctx.fillRect(1, 1, 1, 1);
      break;

    case 'lettuce':
      // Technical frills
      ctx.beginPath();
      ctx.arc(0, 1, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#08bdba';
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI);
      ctx.stroke();
      break;

    case 'tomato':
      // Round body
      ctx.beginPath();
      ctx.arc(0, 1, 4.5, 0, Math.PI * 2);
      ctx.fill();
      // Green stem
      ctx.strokeStyle = '#24a148';
      ctx.beginPath();
      ctx.moveTo(0, -3.5);
      ctx.lineTo(0, -5.5);
      ctx.stroke();
      break;

    case 'pepper':
      // Bell pepper lobes
      ctx.beginPath();
      ctx.roundRect(-4.5, -2.5, 9, 7, 2.5);
      ctx.fill();
      ctx.strokeStyle = '#42be65';
      ctx.beginPath();
      ctx.moveTo(0, -2.5);
      ctx.lineTo(0, -5);
      ctx.stroke();
      break;

    case 'paprika':
      // Curved chili
      ctx.beginPath();
      ctx.moveTo(-3.5, -4);
      ctx.quadraticCurveTo(4, -0.5, 1.5, 5.5);
      ctx.quadraticCurveTo(-0.5, 1.5, -3.5, -4);
      ctx.fill();
      break;

    case 'bread':
      // Loaf silhouette
      ctx.beginPath();
      ctx.roundRect(-5, -3, 10, 6.5, [3, 3, 1, 1]);
      ctx.fill();
      ctx.strokeStyle = '#fdd663';
      ctx.beginPath();
      ctx.moveTo(-2.5, -1.5);
      ctx.lineTo(-2.5, 1.5);
      ctx.moveTo(2.5, -1.5);
      ctx.lineTo(2.5, 1.5);
      ctx.stroke();
      break;

    default:
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();
  }

  ctx.restore();
}
