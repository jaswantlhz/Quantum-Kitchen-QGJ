import {
  BraidCrossing,
  FusionResult,
  FlavorProfile,
  BlochCoordinates,
  UnitaryMatrix2x2,
  ApplianceType,
} from './braidTypes';

/**
 * QuantumBraidEngine:
 * Generalized N-Strand Fibonacci Anyon Braid Simulator with
 * appliance station transformations, line merging, and Umami multipliers.
 */
export class QuantumBraidEngine {
  public quantumState: [number, number]; // [State_0, State_1]
  public tau: number;                     // Golden ratio conjugate (sqrt(5) - 1) / 2
  public crossings: BraidCrossing[];
  public accumulatedPhase: number;
  public strandCount: number;             // Arbitrary N strands (2, 3, 4, 5, 6, 7+)
  public activeAppliances: Record<number, ApplianceType>; // lane -> ApplianceType

  constructor(strandCount: number = 3, initialState: [number, number] = [1.0, 0.0]) {
    this.quantumState = [...initialState];
    this.tau = (Math.sqrt(5.0) - 1.0) / 2.0; // ~0.6180339887
    this.crossings = [];
    this.accumulatedPhase = 0;
    this.strandCount = Math.max(2, strandCount);
    this.activeAppliances = {};
  }

  /**
   * Resets engine back to ground state |0>
   */
  public reset(strandCount?: number, initialState: [number, number] = [1.0, 0.0]): void {
    this.quantumState = [...initialState];
    this.crossings = [];
    this.accumulatedPhase = 0;
    if (strandCount !== undefined) {
      this.strandCount = Math.max(2, strandCount);
    }
  }

  public setAppliance(lane: number, appliance: ApplianceType) {
    this.activeAppliances[lane] = appliance;
  }

  /**
   * Apply generalized braid crossing for arbitrary lane in 1 .. N-1
   */
  public applyBraidCrossing(
    laneIndex: number,
    isOver: boolean,
    strandA: number = 0,
    strandB: number = 1,
    applianceOverride?: ApplianceType,
    isMerged: boolean = false
  ): BraidCrossing {
    const newState: [number, number] = [0.0, 0.0];
    const appliance = applianceOverride || this.activeAppliances[laneIndex] || 'none';

    // Odd lanes (1, 3, 5...) act primarily as R-Matrix phase rotations
    // Even lanes (2, 4, 6...) act primarily as F-Matrix basis superpositions
    const isPhaseLane = laneIndex % 2 === 1;

    let phaseMultiplier = 1.0;
    let superpositionBoost = 1.0;

    // Appliance station physics transformations
    if (appliance === 'chop') {
      phaseMultiplier = 1.5; // Chopping board accelerates phase rotation
    } else if (appliance === 'blend') {
      superpositionBoost = 1.4; // Blender maximizes state superposition
    }

    if (isPhaseLane) {
      const phase = (isOver ? 1.0 : -1.0) * phaseMultiplier;
      this.accumulatedPhase += phase;

      newState[0] = this.quantumState[0] * Math.cos(phase) - this.quantumState[1] * Math.sin(phase);
      newState[1] = this.quantumState[0] * Math.sin(phase) + this.quantumState[1] * Math.cos(phase);
    } else {
      const s = Math.sqrt(this.tau) * superpositionBoost;

      if (isOver) {
        newState[0] = (this.tau * this.quantumState[0]) + (s * this.quantumState[1]);
        newState[1] = (s * this.quantumState[0]) - (this.tau * this.quantumState[1]);
      } else {
        newState[0] = (this.tau * this.quantumState[0]) - (s * this.quantumState[1]);
        newState[1] = (s * this.quantumState[0]) + (this.tau * this.quantumState[1]);
      }
    }

    // Line merger bonus: merging locks state closer to super-particle channel
    if (isMerged) {
      newState[0] = Math.abs(newState[0]) * 1.15;
    }

    // Normalize vector to maintain quantum probability conservation (|alpha|^2 + |beta|^2 = 1.0)
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
      appliance,
      isMerged,
      timestamp: Date.now(),
    };

    this.crossings.push(crossing);
    return crossing;
  }

  /**
   * Generates formal knot theory braid word e.g. "σ₁ · σ₂⁻¹ · σ₃"
   */
  public getBraidWord(): string {
    if (this.crossings.length === 0) return 'e (Identity)';
    const subscriptDigits = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
    return this.crossings
      .map((c) => {
        const sub = String(c.lane)
          .split('')
          .map((d) => subscriptDigits[Number(d)] || d)
          .join('');
        const mergeMark = c.isMerged ? '⚡' : '';
        return c.isOver ? `σ${sub}${mergeMark}` : `σ${sub}⁻¹${mergeMark}`;
      })
      .join(' · ');
  }

  /**
   * Calculates the progressive Umami Multiplier Ladder
   * 1.0x -> 1.2x (3 moves) -> 1.5x (5 moves) -> 2.0x (7 moves) -> 3.14x (Pi transcendence)
   */
  public getUmamiMultiplier(): number {
    const moves = this.crossings.length;
    if (moves >= 9) return 3.14;
    if (moves >= 7) return 2.0;
    if (moves >= 5) return 1.5;
    if (moves >= 3) return 1.2;
    return 1.0;
  }

  /**
   * Measure final quantum probabilities with stabilizer & washing station bonuses
   */
  public measureFinalState(stabilizerBonus: number = 0): {
    successEnergy: number;
    decoherenceGlitch: number;
  } {
    let prob0 = this.quantumState[0] ** 2;
    let prob1 = this.quantumState[1] ** 2;

    // Check if any washing station was used (cleans glitches by 20%)
    const hasWash = this.crossings.some((c) => c.appliance === 'wash');
    const totalBonus = stabilizerBonus + (hasWash ? 0.2 : 0);

    if (totalBonus > 0) {
      prob0 = Math.min(1.0, prob0 + (1 - prob0) * totalBonus);
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

    let alternationScore = 0;
    let panCount = 0;
    let boilCount = 0;

    for (let i = 0; i < totalMoves; i++) {
      const c = this.crossings[i];
      if (c.appliance === 'pan') panCount++;
      if (c.appliance === 'boil') boilCount++;
      if (i > 0 && c.lane !== this.crossings[i - 1].lane) {
        alternationScore++;
      }
    }

    const { successEnergy } = this.measureFinalState();

    // Sweetness: forward phase accumulation
    const sweetness = Math.min(100, Math.round((Math.sin(this.accumulatedPhase * 0.7) * 0.5 + 0.5) * 80 + 20));

    // Sourness: rapid alternation of basis transforms
    const sourness = Math.min(100, Math.round((alternationScore / Math.max(1, totalMoves)) * 85 + 15));

    // Spiciness: single lane twists + frying pan searing
    const spiciness = Math.min(100, Math.round((panCount * 25) + (Math.abs(this.accumulatedPhase) * 12)));

    // Umami: superposition balance (|alpha| approx |beta|) + boiling pot simmer
    const superpositionBalance = 1 - Math.abs(this.quantumState[0] - this.quantumState[1]);
    const umamiBase = superpositionBalance * 75 + 25 + (boilCount * 20);
    const umami = Math.min(100, Math.round(umamiBase));

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
      if (c.lane % 2 === 1) {
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
   * Final culinary fusion evaluation with Umami multiplier & plated scoring algorithm
   */
  public evaluateFusion(
    stabilizerLevel: number = 0,
    targetFlavors?: { sweetness: number; sourness: number; spiciness: number; umami: number },
    recipeContext?: { name: string; mealCategory?: string; description?: string }
  ): FusionResult {
    const { successEnergy, decoherenceGlitch } = this.measureFinalState(stabilizerLevel * 0.15);
    const flavors = this.getFlavorProfile();
    const umamiMultiplier = this.getUmamiMultiplier();

    // Calculate flavor match score (0 - 100)
    let flavorMatch = 80;
    if (targetFlavors) {
      const diffSweet = Math.abs(flavors.sweetness - targetFlavors.sweetness);
      const diffSour = Math.abs(flavors.sourness - targetFlavors.sourness);
      const diffSpice = Math.abs(flavors.spiciness - targetFlavors.spiciness);
      const diffUmami = Math.abs(flavors.umami - targetFlavors.umami);
      const avgDiff = (diffSweet + diffSour + diffSpice + diffUmami) / 4;
      flavorMatch = Math.max(0, 100 - avgDiff);
    }

    // Algorithmic Plated Score Formula
    const baseScore = flavors.coherence * 0.5 + flavorMatch * 0.3 + 20; // 20 base freshness
    const platedScore = Math.round(baseScore * umamiMultiplier);

    let grade: 'S+' | 'A' | 'B' | 'C' = 'C';
    if (platedScore >= 240) grade = 'S+';
    else if (platedScore >= 170) grade = 'A';
    else if (platedScore >= 110) grade = 'B';

    const rName = recipeContext?.name || 'Quantum Dish';
    const rCat = recipeContext?.mealCategory || 'Entrée';
    const rDesc = recipeContext?.description || 'A delicious, perfectly balanced culinary creation.';

    let dishOutcome: 'perfect' | 'good' | 'glitch' = 'glitch';
    let dishName = `Burnt ${rName}`;
    let dishDescription = 'The dish overcooked slightly. Adjust your braid crossings to balance the flavors!';
    let compositeMeal = 'Overcooked';

    if (successEnergy >= 0.7) {
      dishOutcome = 'perfect';
      dishName = rName;
      compositeMeal = rCat;
      dishDescription = `Cooked to golden perfection! ${rDesc}`;
    } else if (successEnergy >= 0.35) {
      dishOutcome = 'good';
      dishName = rName;
      compositeMeal = rCat;
      dishDescription = `Well plated with pleasant flavors and rich aroma.`;
    }

    return {
      successEnergy,
      decoherenceGlitch,
      dishOutcome,
      dishName,
      dishDescription,
      flavorProfile: flavors,
      umamiMultiplier,
      platedScore,
      grade,
      compositeMeal,
    };
  }
}
