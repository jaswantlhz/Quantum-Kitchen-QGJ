export interface QuantumState {
  vector: [number, number]; // [State_0, State_1] or [alpha, beta]
  phase: number;             // Accumulated phase in radians
  history: BraidCrossing[];  // History of braid actions
}

export interface BraidCrossing {
  id: string;
  lane: number;      // 1 or 2 (between strands 1-2, or 2-3)
  isOver: boolean;   // true = over (sigma_i), false = under (sigma_i^-1)
  strandA: number;   // Strand index on left before crossing
  strandB: number;   // Strand index on right before crossing
  depth: number;     // Step index / y-position
  timestamp: number;
}

export interface FusionResult {
  successEnergy: number;      // P(State 0) e.g., 0.0 - 1.0 (Super-particle channel)
  decoherenceGlitch: number;  // P(State 1) e.g., 0.0 - 1.0 (Identity/burnt channel)
  dishOutcome: 'perfect' | 'good' | 'glitch';
  dishName: string;
  dishDescription: string;
  flavorProfile: FlavorProfile;
}

export interface FlavorProfile {
  sweetness: number;  // 0 - 100%
  sourness: number;   // 0 - 100%
  spiciness: number;  // 0 - 100%
  umami: number;      // 0 - 100%
  coherence: number;  // 0 - 100%
}

export interface UnitaryMatrix2x2 {
  m00: { re: number; im: number };
  m01: { re: number; im: number };
  m10: { re: number; im: number };
  m11: { re: number; im: number };
}

export interface BlochCoordinates {
  theta: number; // Polar angle in [0, pi]
  phi: number;   // Azimuthal angle in [0, 2pi)
  x: number;     // sin(theta) * cos(phi)
  y: number;     // sin(theta) * sin(phi)
  z: number;     // cos(theta)
}

export interface BraidRecord {
  id: string;
  createdAt: string;
  recipeId: string;
  dishName: string;
  braidWord: string;
  crossings: BraidCrossing[];
  stateVector: [number, number];
  probabilities: {
    successEnergy: number;
    decoherenceGlitch: number;
  };
  blochAngles: BlochCoordinates;
  flavorProfile: FlavorProfile;
  notes?: string;
  tags?: string[];
}
