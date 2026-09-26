import { Recipe } from '@/lib/game/recipes';
import { BraidCrossing, FlavorProfile, FusionResult } from './braidTypes';
import { QuantumBraidEngine } from './anyonEngine';

export interface GhostCrossingHint {
  lane: number;
  isOver: boolean;
  flavorGain: string;
  boostPercent: number;
  predictedFidelity: number;
}

export type AdviceCategory =
  | 'optimal-move'
  | 'identity-cancel'
  | 'thermal-warning'
  | 'pantry-upgrade'
  | 'fusion-ready'
  | 'umami-combo'
  | 'strand-neglect'
  | 'cooking'
  | 'post-fusion'
  | 'general-tip';

export type BloubExpressionId =
  | 'attentif'
  | 'confus'
  | 'curieux'
  | 'excite'
  | 'mefiant'
  | 'neutre'
  | 'surpris'
  | 'timide';

export interface BloubAdvice {
  text: string;
  category: AdviceCategory;
  badgeLabel: string;
  badgeVariant: 'default' | 'outline' | 'secondary' | 'destructive';
  expression: BloubExpressionId;
  ghostMove?: GhostCrossingHint | null;
  canQuickBuy?: boolean;
  priority: number; // Higher number = higher priority
}

/**
 * 1-Step Lookahead Simulator:
 * Clones current engine state, tests every possible next crossing (lane, isOver),
 * and finds the move that minimizes flavor distance to the target recipe.
 */
export function findOptimalNextMove(
  crossings: BraidCrossing[],
  recipe: Recipe,
  numStrands: number
): GhostCrossingHint | null {
  if (numStrands < 2) return null;

  // Simulate current baseline
  const baseEngine = new QuantumBraidEngine(numStrands);
  for (const c of crossings) {
    baseEngine.applyBraidCrossing(c.lane, c.isOver, c.strandA, c.strandB, c.appliance, c.isMerged);
  }
  const currentFlavors = baseEngine.getFlavorProfile();
  const currentDist = calcFlavorDistance(currentFlavors, recipe.targetFlavor);
  const currentFidelity = Math.max(0, 100 - currentDist);

  let bestMove: GhostCrossingHint | null = null;
  let minDistance = currentDist;
  let bestFlavorKey = 'Flavor Harmony';

  // Test every lane (1 .. numStrands - 1) with both Over (true) and Under (false)
  for (let lane = 1; lane < numStrands; lane++) {
    for (const isOver of [true, false]) {
      const simEngine = new QuantumBraidEngine(numStrands);
      for (const c of crossings) {
        simEngine.applyBraidCrossing(c.lane, c.isOver, c.strandA, c.strandB, c.appliance, c.isMerged);
      }
      simEngine.applyBraidCrossing(lane, isOver);

      const simFlavors = simEngine.getFlavorProfile();
      const simDist = calcFlavorDistance(simFlavors, recipe.targetFlavor);
      const simFidelity = Math.max(0, 100 - simDist);

      // Find which flavor received the biggest improvement
      const diffSweet = Math.abs(currentFlavors.sweetness - recipe.targetFlavor.sweetness) -
                        Math.abs(simFlavors.sweetness - recipe.targetFlavor.sweetness);
      const diffSour = Math.abs(currentFlavors.sourness - recipe.targetFlavor.sourness) -
                       Math.abs(simFlavors.sourness - recipe.targetFlavor.sourness);
      const diffSpice = Math.abs(currentFlavors.spiciness - recipe.targetFlavor.spiciness) -
                        Math.abs(simFlavors.spiciness - recipe.targetFlavor.spiciness);
      const diffUmami = Math.abs(currentFlavors.umami - recipe.targetFlavor.umami) -
                        Math.abs(simFlavors.umami - recipe.targetFlavor.umami);

      const maxDiff = Math.max(diffSweet, diffSour, diffSpice, diffUmami);
      let topGainKey = 'Flavor Balance';
      if (maxDiff === diffSweet && diffSweet > 0) topGainKey = 'Sweetness';
      else if (maxDiff === diffSour && diffSour > 0) topGainKey = 'Sourness';
      else if (maxDiff === diffSpice && diffSpice > 0) topGainKey = 'Spiciness';
      else if (maxDiff === diffUmami && diffUmami > 0) topGainKey = 'Umami';

      if (simDist < minDistance) {
        minDistance = simDist;
        bestFlavorKey = topGainKey;
        const delta = Math.round(simFidelity - currentFidelity);
        bestMove = {
          lane,
          isOver,
          flavorGain: bestFlavorKey,
          boostPercent: Math.max(1, delta),
          predictedFidelity: Math.round(simFidelity),
        };
      }
    }
  }

  return bestMove;
}

function calcFlavorDistance(
  current: FlavorProfile,
  target: { sweetness: number; sourness: number; spiciness: number; umami: number }
): number {
  const ds = Math.abs(current.sweetness - target.sweetness);
  const dso = Math.abs(current.sourness - target.sourness);
  const dsp = Math.abs(current.spiciness - target.spiciness);
  const du = Math.abs(current.umami - target.umami);
  return (ds + dso + dsp + du) / 4;
}

/**
 * Main Advisor Arbiter:
 * Evaluates live game state to produce high-priority, contextual, actionable advice.
 */
export function generateBloubAdvice({
  recipe,
  currentFlavors,
  successEnergy,
  crossings,
  decoherenceGlitch,
  isCooking,
  lastFusionResult,
  stabilizerLevel,
  credits = 0,
}: {
  recipe: Recipe;
  currentFlavors: FlavorProfile;
  successEnergy: number;
  crossings: BraidCrossing[];
  decoherenceGlitch: number;
  isCooking: boolean;
  lastFusionResult: FusionResult | null;
  stabilizerLevel: number;
  credits?: number;
}): BloubAdvice {
  const numStrands = recipe.strandCount || 3;

  // 1. Cooking in progress
  if (isCooking) {
    return {
      text: 'Hold tight! Braided anyons are fusing in the topological reactor...',
      category: 'cooking',
      badgeLabel: 'Fusing',
      badgeVariant: 'secondary',
      expression: 'curieux',
      priority: 100,
    };
  }

  // 2. Post-Fusion Evaluation
  if (lastFusionResult) {
    if (lastFusionResult.dishOutcome === 'perfect') {
      return {
        text: `Perfection! 3-Star ${recipe.name}! ${(lastFusionResult.umamiMultiplier || 1).toFixed(1)}x Umami bonus earned! Ready for the next ticket?`,
        category: 'post-fusion',
        badgeLabel: '3-Star Perfect',
        badgeVariant: 'default',
        expression: 'excite',
        priority: 95,
      };
    }
    if (lastFusionResult.dishOutcome === 'glitch') {
      return {
        text: 'Decoherence collapsed the wave function! Upgrade Cryo-Stabilizers in the Pantry or weave with fewer strands to prevent thermal burn.',
        category: 'post-fusion',
        badgeLabel: 'Decoherence Burn',
        badgeVariant: 'destructive',
        expression: 'surpris',
        priority: 95,
      };
    }
  }

  // 3. Identity Cancellation Warning (e.g., s1 over then s1 under cancels out)
  if (crossings.length >= 2) {
    const last = crossings[crossings.length - 1];
    const secondLast = crossings[crossings.length - 2];
    if (last.lane === secondLast.lane && last.isOver !== secondLast.isOver) {
      return {
        text: `Braid identity alert: An Over-weave followed by an Under-weave on Strand ${last.lane} & ${last.lane + 1} cancels out (σ · σ⁻¹ = 1)!`,
        category: 'identity-cancel',
        badgeLabel: 'Identity Cancel (σ · σ⁻¹ = 1)',
        badgeVariant: 'destructive',
        expression: 'confus',
        priority: 90,
      };
    }
  }

  // 4. Critical Thermal Noise & Upgrade Advice
  if (decoherenceGlitch > 0.28 && stabilizerLevel < 3) {
    const jitterPct = Math.round(decoherenceGlitch * 100);
    const canAfford = credits >= 50;
    return {
      text: `Thermal jitter is at ${jitterPct}%! ${
        canAfford
          ? `You have ${credits} credits—grab a Cryo-Stabilizer in the Pantry to safeguard flavor harmony.`
          : 'Stabilize your braid or fusion will collapse into identity ash!'
      }`,
      category: canAfford ? 'pantry-upgrade' : 'thermal-warning',
      badgeLabel: `Thermal Noise: ${jitterPct}%`,
      badgeVariant: 'destructive',
      expression: 'surpris',
      canQuickBuy: canAfford,
      priority: 85,
    };
  }

  // 5. Lookahead Optimal Next Move (1-Step Solver)
  const optimalMove = findOptimalNextMove(crossings, recipe, numStrands);
  const fidelityPercent = Math.round(successEnergy * 100);

  if (optimalMove && optimalMove.boostPercent >= 2 && fidelityPercent < 88) {
    const direction = optimalMove.isOver ? 'Over' : 'Under';
    const sA = optimalMove.lane;
    const sB = optimalMove.lane + 1;
    return {
      text: `Try weaving Strand ${sA} ${direction} Strand ${sB} to boost ${optimalMove.flavorGain} (+${optimalMove.boostPercent}%) and reach ${optimalMove.predictedFidelity}% harmony!`,
      category: 'optimal-move',
      badgeLabel: `+${optimalMove.boostPercent}% ${optimalMove.flavorGain}`,
      badgeVariant: 'default',
      expression: 'attentif',
      ghostMove: optimalMove,
      priority: 80,
    };
  }

  // 6. High-fidelity ready to cook
  if (fidelityPercent >= 85) {
    return {
      text: `Superb! Flavor harmony is at ${fidelityPercent}%. Send it straight into the Mixing Reactor to plate a 3-star dish!`,
      category: 'fusion-ready',
      badgeLabel: '3-Star Ready',
      badgeVariant: 'default',
      expression: 'excite',
      priority: 75,
    };
  }

  // 7. Multi-Strand Neglect Check (for 4+ strands)
  if (numStrands >= 4 && crossings.length >= 3) {
    const usedLanes = new Set(crossings.map((c) => c.lane));
    for (let lane = 1; lane < numStrands; lane++) {
      if (!usedLanes.has(lane)) {
        return {
          text: `Strand ${lane} & ${lane + 1} have not been braided yet. Weaving outer strands unlocks higher Hilbert space depth!`,
          category: 'strand-neglect',
          badgeLabel: `Untapped Strand ${lane}`,
          badgeVariant: 'secondary',
          expression: 'mefiant',
          priority: 70,
        };
      }
    }
  }

  // 8. Umami Multiplier Ladder
  if (crossings.length >= 3) {
    const umamiBonus = (1 + Math.floor(crossings.length / 3) * 0.2).toFixed(1);
    return {
      text: `Umami Multiplier active (${umamiBonus}x)! Every 3 crossings enhances the credit payout!`,
      category: 'umami-combo',
      badgeLabel: `Umami ${umamiBonus}x`,
      badgeVariant: 'secondary',
      expression: 'attentif',
      priority: 60,
    };
  }

  // 9. Initial / Default
  if (crossings.length === 0) {
    return {
      text: `Welcome Chef! Drag or click Strand 1 or 2 on the loom to braid ${recipe.name} flavor gates!`,
      category: 'general-tip',
      badgeLabel: 'Sous-Chef',
      badgeVariant: 'outline',
      expression: 'timide',
      priority: 50,
    };
  }

  return {
    text: 'Watching your braid... Weave strands together to align with target recipe notes!',
    category: 'general-tip',
    badgeLabel: 'Sous-Chef',
    badgeVariant: 'outline',
    expression: 'neutre',
    priority: 10,
  };
}
