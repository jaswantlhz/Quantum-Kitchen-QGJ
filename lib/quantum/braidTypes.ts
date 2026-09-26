export interface QuantumState {
  vector: [number, number]; // [State_0, State_1] or [alpha, beta]
  phase: number;             // Accumulated phase in radians
  history: BraidCrossing[];  // History of braid actions
}

export type ApplianceType =
  | 'none'
  | 'chop'      // Chopping board: boosts phase rotation frequency (R-matrix)
  | 'blend'     // Blender: maximum superposition mixing (F-matrix)
  | 'pan'       // Frying pan: sears and caramelizes, spicy boost
  | 'wash'      // Washing: cleans decoherence glitches
  | 'deep_fry'  // Deep frying: golden-ratio crunch & locks odds
  | 'boil';     // Boiling pot: extracts savory broths & base umami

export interface BraidCrossing {
  id: string;
  lane: number;          // 1, 2, ..., N-1
  isOver: boolean;       // true = sigma_i, false = sigma_i^-1
  strandA: number;       // Strand index on left before crossing
  strandB: number;       // Strand index on right before crossing
  depth: number;         // Step index / y-position
  appliance?: ApplianceType;
  isMerged?: boolean;    // If true, merges the two strands into a composite line
  timestamp: number;
}

export interface FusionResult {
  successEnergy: number;      // P(State 0) e.g., 0.0 - 1.0 (Super-particle channel)
  decoherenceGlitch: number;  // P(State 1) e.g., 0.0 - 1.0 (Identity/burnt channel)
  dishOutcome: 'perfect' | 'good' | 'glitch';
  dishName: string;
  dishDescription: string;
  flavorProfile: FlavorProfile;
  umamiMultiplier: number;
  platedScore: number;
  grade: 'S+' | 'A' | 'B' | 'C';
  compositeMeal?: string;     // e.g. "Cosmic Club Sandwich", "Solar Vegetable Soup"
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
  strandCount?: number;
  crossings: BraidCrossing[];
  stateVector: [number, number];
  probabilities: {
    successEnergy: number;
    decoherenceGlitch: number;
  };
  blochAngles: BlochCoordinates;
  flavorProfile: FlavorProfile;
  umamiMultiplier?: number;
  platedScore?: number;
  grade?: 'S+' | 'A' | 'B' | 'C';
  notes?: string;
  tags?: string[];
}
