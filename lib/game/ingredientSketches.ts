/**
 * Procedural Vector Ingredient Sketches & Color Tokens
 * Renders stylized 2D sketches of Carrot, Potato, Lettuce, Tomato,
 * Pepper, Paprika, and Bread for the Quantum Kitchen pegboard.
 */

export interface IngredientDef {
  id: string;
  name: string;
  icon: string;
  naturalColor: string;
  glowColor: string;
  glitchColor: string;
  culinaryRole: 'base' | 'fresh' | 'acid' | 'starch' | 'spice' | 'sweet';
  phaseSpecialty: string;
}

export const INGREDIENTS: Record<string, IngredientDef> = {
  carrot: {
    id: 'carrot',
    name: 'Quantum Carrot',
    icon: '🥕',
    naturalColor: '#ff6b35',
    glowColor: '#ff9e00',
    glitchColor: '#5c3d2e',
    culinaryRole: 'sweet',
    phaseSpecialty: 'Phase Acceleration (Sweetness)',
  },
  potato: {
    id: 'potato',
    name: 'Cosmic Potato',
    icon: '🥔',
    naturalColor: '#e0a96d',
    glowColor: '#ffe49e',
    glitchColor: '#4a3e3d',
    culinaryRole: 'starch',
    phaseSpecialty: 'Heavy Superposition Density',
  },
  lettuce: {
    id: 'lettuce',
    name: 'Auroral Lettuce',
    icon: '🥬',
    naturalColor: '#2ec4b6',
    glowColor: '#57cc99',
    glitchColor: '#1b4332',
    culinaryRole: 'fresh',
    phaseSpecialty: 'Coherence Buffer (Freshness)',
  },
  tomato: {
    id: 'tomato',
    name: 'Solar Tomato',
    icon: '🍅',
    naturalColor: '#e63946',
    glowColor: '#ff4d6d',
    glitchColor: '#3d1318',
    culinaryRole: 'acid',
    phaseSpecialty: 'Acidity & Commutation (Sourness)',
  },
  pepper: {
    id: 'pepper',
    name: 'Flux Bell Pepper',
    icon: '🫑',
    naturalColor: '#70e000',
    glowColor: '#9ef01a',
    glitchColor: '#2b3a16',
    culinaryRole: 'fresh',
    phaseSpecialty: 'Crisp Snap & Harmonic Zing',
  },
  paprika: {
    id: 'paprika',
    name: 'Tachyon Paprika',
    icon: '🌶️',
    naturalColor: '#d00000',
    glowColor: '#ff0054',
    glitchColor: '#2e0000',
    culinaryRole: 'spice',
    phaseSpecialty: 'Twist Multiplier (Spiciness)',
  },
  bread: {
    id: 'bread',
    name: 'Warm Quantum Bread',
    icon: '🍞',
    naturalColor: '#f3c053',
    glowColor: '#ffd166',
    glitchColor: '#382d1c',
    culinaryRole: 'base',
    phaseSpecialty: 'Foundation Carrier Strand',
  },
};

/**
 * Draws a clean procedural vector sketch of the ingredient on canvas
 */
export function drawIngredientSketch(
  ctx: CanvasRenderingContext2D,
  ingredientKey: string,
  centerX: number,
  centerY: number,
  radius: number = 14,
  isGlitching: boolean = false
) {
  const ing = INGREDIENTS[ingredientKey] || INGREDIENTS.carrot;
  const mainColor = isGlitching ? ing.glitchColor : ing.naturalColor;
  const glow = isGlitching ? '#ef4444' : ing.glowColor;

  ctx.save();
  ctx.translate(centerX, centerY);

  // Outer Aura
  ctx.shadowBlur = 12;
  ctx.shadowColor = glow;

  // Background Badge
  ctx.fillStyle = isGlitching ? 'rgba(50, 20, 20, 0.9)' : 'rgba(15, 23, 42, 0.85)';
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();

  // Border ring
  ctx.strokeStyle = mainColor;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Draw procedural ingredient shape
  ctx.fillStyle = mainColor;
  ctx.strokeStyle = glow;
  ctx.lineWidth = 1.5;

  switch (ing.id) {
    case 'carrot':
      // Triangular carrot root
      ctx.beginPath();
      ctx.moveTo(0, 7);
      ctx.lineTo(-5, -4);
      ctx.lineTo(5, -4);
      ctx.closePath();
      ctx.fill();
      // Green sprout
      ctx.strokeStyle = '#4ade80';
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.lineTo(-2, -8);
      ctx.moveTo(0, -4);
      ctx.lineTo(2, -8);
      ctx.stroke();
      break;

    case 'potato':
      // Organic rounded tuber
      ctx.beginPath();
      ctx.ellipse(0, 1, 6, 4.5, Math.PI / 8, 0, Math.PI * 2);
      ctx.fill();
      // Speckles
      ctx.fillStyle = glow;
      ctx.fillRect(-2, -1, 1, 1);
      ctx.fillRect(2, 2, 1, 1);
      break;

    case 'lettuce':
      // Wavy leafy ruffle
      ctx.beginPath();
      ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#a7f3d0';
      ctx.beginPath();
      ctx.arc(-2, -1, 3, 0, Math.PI);
      ctx.arc(2, 1, 3, 0, Math.PI);
      ctx.stroke();
      break;

    case 'tomato':
      // Smooth round fruit + green calyx
      ctx.beginPath();
      ctx.arc(0, 1.5, 5.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#4ade80';
      ctx.beginPath();
      ctx.arc(0, -4, 2, 0, Math.PI * 2);
      ctx.fill();
      break;

    case 'pepper':
      // Bell pepper lobes
      ctx.beginPath();
      ctx.roundRect(-5, -3, 10, 8, 3);
      ctx.fill();
      ctx.strokeStyle = '#bef264';
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(0, -7);
      ctx.stroke();
      break;

    case 'paprika':
      // Curved chili
      ctx.beginPath();
      ctx.moveTo(-4, -5);
      ctx.quadraticCurveTo(5, -1, 2, 7);
      ctx.quadraticCurveTo(-1, 2, -4, -5);
      ctx.fill();
      break;

    case 'bread':
      // Loaf silhouette
      ctx.beginPath();
      ctx.roundRect(-6, -4, 12, 8, [4, 4, 1, 1]);
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.beginPath();
      ctx.moveTo(-3, -2);
      ctx.lineTo(-3, 2);
      ctx.moveTo(3, -2);
      ctx.lineTo(3, 2);
      ctx.stroke();
      break;

    default:
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
  }

  ctx.restore();
}
