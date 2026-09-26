import { BraidCrossing, FusionResult, FlavorProfile, BlochCoordinates, UnitaryMatrix2x2 } from './braidTypes';

/**
 * QuantumBraidEngine:
 * Full implementation of the Fibonacci Anyon Braid Simulator from message.py
 * with extensions for multi-strand knot theory, SU(2) unitary matrices,
 * Bloch sphere geometry, and non-Abelian flavor profile synthesis.
 */
export class QuantumBraidEngine {
  public quantumState: [number, number]; // [State_0, State_1]
  public tau: number;                     // Golden ratio conjugate (sqrt(5) - 1) / 2
  public crossings: BraidCrossing[];
  public accumulatedPhase: number;

  constructor(initialState: [number, number] = [1.0, 0.0]) {
    this.quantumState = [...initialState];
    this.tau = (Math.sqrt(5.0) - 1.0) / 2.0; // ~0.6180339887
    this.crossings = [];
    this.accumulatedPhase = 0;
  }

  /**
   * Resets engine back to ground state |0>
   */
  public reset(initialState: [number, number] = [1.0, 0.0]): void {
    this.quantumState = [...initialState];
    this.crossings = [];
    this.accumulatedPhase = 0;
  }

  /**
   * Apply braid crossing exactly following message.py
   * @param laneIndex 1 or 2 (between adjacent anyon strands)
   * @param isOver true = sigma_i (over), false = sigma_i^-1 (under)
   */
  public applyBraidCrossing(
    laneIndex: number,
    isOver: boolean,
    strandA: number = 0,
    strandB: number = 1
  ): BraidCrossing {
    const newState: [number, number] = [0.0, 0.0];

    if (laneIndex === 1) {
      // Crossing 1 introduces a quantum phase shift (R-Matrix rotation)
      const phase = isOver ? 1.0 : -1.0;
      this.accumulatedPhase += phase;

      // Mathematically rotates the quantum phase
      newState[0] = this.quantumState[0] * Math.cos(phase) - this.quantumState[1] * Math.sin(phase);
      newState[1] = this.quantumState[0] * Math.sin(phase) + this.quantumState[1] * Math.cos(phase);
    } else {
      // Lane 2: Basis change (F-Matrix transformation)
      // Mixes states together, creating true quantum superposition
      const s = Math.sqrt(this.tau);

      if (isOver) {
        newState[0] = (this.tau * this.quantumState[0]) + (s * this.quantumState[1]);
        newState[1] = (s * this.quantumState[0]) - (this.tau * this.quantumState[1]);
      } else {
        newState[0] = (this.tau * this.quantumState[0]) - (s * this.quantumState[1]);
        newState[1] = (s * this.quantumState[0]) + (this.tau * this.quantumState[1]);
      }
    }

    // Normalize the vector to maintain quantum probability conservation (|alpha|^2 + |beta|^2 = 1.0)
    const magnitude = Math.sqrt(newState[0] ** 2 + newState[1] ** 2);
    if (magnitude > 0) {
      this.quantumState[0] = newState[0] / magnitude;
      this.quantumState[1] = newState[1] / magnitude;
    }

    const crossing: BraidCrossing = {
      id: `cross-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      lane: laneIndex,
      isOver,
      strandA,
      strandB,
      depth: this.crossings.length,
      timestamp: Date.now(),
    };

    this.crossings.push(crossing);
    return crossing;
  }

  /**
   * Generates formal knot theory braid word e.g. "σ₁ · σ₂⁻¹ · σ₁"
   */
  public getBraidWord(): string {
    if (this.crossings.length === 0) return 'e (Identity)';
    return this.crossings
      .map((c) => {
        const sub = c.lane === 1 ? '₁' : c.lane === 2 ? '₂' : '₃';
        return c.isOver ? `σ${sub}` : `σ${sub}⁻¹`;
      })
      .join(' · ');
  }

  /**
   * Measure final quantum probabilities (as in message.py)
   */
  public measureFinalState(stabilizerBonus: number = 0): {
    successEnergy: number;
    decoherenceGlitch: number;
  } {
    let prob0 = this.quantumState[0] ** 2;
    let prob1 = this.quantumState[1] ** 2;

    // Apply stabilizer power (compresses glitch rate toward target state)
    if (stabilizerBonus > 0) {
      prob0 = Math.min(1.0, prob0 + (1 - prob0) * stabilizerBonus);
      prob1 = Math.max(0.0, 1.0 - prob0);
    }

    return {
      successEnergy: prob0,
      decoherenceGlitch: prob1,
    };
  }

  /**
   * Computes Bloch Sphere coordinates (theta, phi, x, y, z)
   */
  public getBlochCoordinates(): BlochCoordinates {
    const alpha = this.quantumState[0];
    const beta = this.quantumState[1];

    // |psi> = cos(theta/2)|0> + e^(i phi) sin(theta/2)|1>
    // For real amplitudes, phi is 0 or pi
    const theta = 2 * Math.acos(Math.max(-1, Math.min(1, Math.abs(alpha))));
    const phi = beta < 0 ? Math.PI : (this.accumulatedPhase % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);

    const x = Math.sin(theta) * Math.cos(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(theta);

    return { theta, phi, x, y, z };
  }

  /**
   * Compute culinary flavor profile from non-Abelian braid sequence
   */
  public getFlavorProfile(): FlavorProfile {
    const totalMoves = this.crossings.length;
    if (totalMoves === 0) {
      return { sweetness: 10, sourness: 10, spiciness: 0, umami: 0, coherence: 10 };
    }

    let lane1Count = 0;
    let lane2Count = 0;
    let alternationScore = 0;

    for (let i = 0; i < totalMoves; i++) {
      if (this.crossings[i].lane === 1) lane1Count++;
      if (this.crossings[i].lane === 2) lane2Count++;
      if (i > 0 && this.crossings[i].lane !== this.crossings[i - 1].lane) {
        alternationScore++;
      }
    }

    const { successEnergy } = this.measureFinalState();

    // Sweetness: phase accumulation & forward R-rotations
    const sweetness = Math.min(100, Math.round((Math.sin(this.accumulatedPhase * 0.7) * 0.5 + 0.5) * 80 + 20));

    // Sourness: rapid alternation of basis transforms
    const sourness = Math.min(100, Math.round((alternationScore / Math.max(1, totalMoves)) * 90 + 10));

    // Spiciness: repeated twists on same lane
    const consecutiveTwists = Math.max(lane1Count, lane2Count);
    const spiciness = Math.min(100, Math.round((consecutiveTwists / Math.max(1, totalMoves)) * 100));

    // Umami: superposition balance (|alpha| approx |beta|)
    const superpositionBalance = 1 - Math.abs(this.quantumState[0] - this.quantumState[1]);
    const umami = Math.min(100, Math.round(superpositionBalance * 85 + 15));

    // Coherence: final success energy
    const coherence = Math.round(successEnergy * 100);

    return { sweetness, sourness, spiciness, umami, coherence };
  }

  /**
   * Computes effective 2x2 Unitary matrix representation of the braid word
   */
  public getUnitaryMatrix(): UnitaryMatrix2x2 {
    let u00 = 1, u01 = 0, u10 = 0, u11 = 1;

    for (const c of this.crossings) {
      if (c.lane === 1) {
        const p = c.isOver ? 1.0 : -1.0;
        const cosP = Math.cos(p);
        const sinP = Math.sin(p);
        const nu00 = u00 * cosP - u10 * sinP;
        const nu01 = u01 * cosP - u11 * sinP;
        const nu10 = u00 * sinP + u10 * cosP;
        const nu11 = u01 * sinP + u11 * cosP;
        u00 = nu00; u01 = nu01; u10 = nu10; u11 = nu11;
      } else {
        const s = Math.sqrt(this.tau);
        const sign = c.isOver ? 1 : -1;
        const nu00 = this.tau * u00 + sign * s * u10;
        const nu01 = this.tau * u01 + sign * s * u11;
        const nu10 = sign * s * u00 - this.tau * u10;
        const nu11 = sign * s * u01 - this.tau * u11;
        u00 = nu00; u01 = nu01; u10 = nu10; u11 = nu11;
      }
    }

    return {
      m00: { re: Number(u00.toFixed(4)), im: 0 },
      m01: { re: Number(u01.toFixed(4)), im: 0 },
      m10: { re: Number(u10.toFixed(4)), im: 0 },
      m11: { re: Number(u11.toFixed(4)), im: 0 },
    };
  }

  /**
   * Final fusion evaluation
   */
  public evaluateFusion(stabilizerLevel: number = 0): FusionResult {
    const { successEnergy, decoherenceGlitch } = this.measureFinalState(stabilizerLevel * 0.15);
    const flavors = this.getFlavorProfile();

    let dishOutcome: 'perfect' | 'good' | 'glitch' = 'glitch';
    let dishName = 'Burnt Quantum Ash';
    let dishDescription = 'Decoherence glitch! The strands canceled into the trivial Identity particle.';

    if (successEnergy >= 0.75) {
      dishOutcome = 'perfect';
      dishName = 'Cosmic Soufflé';
      dishDescription = 'Flawlessly braided non-Abelian topology with rich golden-ratio superposition!';
    } else if (successEnergy >= 0.4) {
      dishOutcome = 'good';
      dishName = 'Sparkly Plasma Soda';
      dishDescription = 'Lively quantum carbonation with subtle phase fluctuations.';
    }

    return {
      successEnergy,
      decoherenceGlitch,
      dishOutcome,
      dishName,
      dishDescription,
      flavorProfile: flavors,
    };
  }
}
