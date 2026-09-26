'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  Flame,
  ChefHat,
  Atom,
  Zap,
  CheckCircle2,
  GitCommit,
} from 'lucide-react';

interface HowToPlayModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerButton?: boolean;
}

export function HowToPlayModal({
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  triggerButton = true,
}: HowToPlayModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'basics' | 'braiding' | 'stations' | 'fusion'>('basics');

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setOpen = (val: boolean) => {
    if (isControlled && controlledOnOpenChange) {
      controlledOnOpenChange(val);
    } else {
      setInternalOpen(val);
    }
  };

  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Check user preference and auto-show on first visit unless disabled
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    try {
      const neverShow = localStorage.getItem('qkj_dont_show_again') === 'true';
      const seen = localStorage.getItem('qkj_how_to_play_seen') === 'true';
      if (!neverShow && !seen) {
        localStorage.setItem('qkj_how_to_play_seen', 'true');
        timer = setTimeout(() => {
          setInternalOpen(true);
        }, 200);
      }
      if (neverShow) {
        const animId = requestAnimationFrame(() => setDontShowAgain(true));
        return () => cancelAnimationFrame(animId);
      }
    } catch {
      // Ignore localStorage exceptions in private browsing
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {triggerButton && (
        <Button
          size="sm"
          variant="outline"
          onClick={() => setOpen(true)}
          className="h-8 px-2.5 border-[#393939] text-[#be95ff] hover:text-white hover:bg-[#8a3ffc]/20 text-xs font-semibold cursor-pointer"
        >
          <BookOpen className="mr-1.5 h-3.5 w-3.5 text-[#8a3ffc]" />
          How to Play
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl bg-[#1c1c1c] border-[#393939] text-[#f4f4f4] p-0 overflow-hidden shadow-2xl">
          {/* Header Banner */}
          <div className="bg-[#121212] border-b border-[#333333] p-5">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[#8a3ffc] border-[#8a3ffc]/40 text-[10px] tracking-wider uppercase font-mono">
                  Cosmic Field Manual
                </Badge>
                <span className="text-[11px] font-mono text-slate-400">v2.4 Topological</span>
              </div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white mt-1">
                <ChefHat className="h-5 w-5 text-[#8a3ffc]" />
                How to Play: Quantum Kitchen
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs mt-1">
                Weave non-Abelian anyon strands into cosmic culinary dishes. Follow the 4-step pipeline:
              </DialogDescription>
            </DialogHeader>

            {/* Navigation Tabs */}
            <div className="grid grid-cols-4 gap-1.5 mt-4 bg-[#1c1c1c] p-1 rounded-lg border border-[#333333]">
              {(
                [
                  { id: 'basics', label: '1. The Basics', icon: Atom },
                  { id: 'braiding', label: '2. Horizontal Weave', icon: GitCommit },
                  { id: 'stations', label: '3. Stations & Mixer', icon: Zap },
                  { id: 'fusion', label: '4. Fusion & Plating', icon: Flame },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#8a3ffc] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white hover:bg-[#262626]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.id}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-5 max-h-[60vh] overflow-y-auto space-y-4 text-xs leading-relaxed">
            {activeTab === 'basics' && (
              <div className="space-y-3 animate-in fade-in-50 duration-200">
                <div className="p-3.5 rounded-lg border border-[#333333] bg-[#161616]">
                  <h4 className="font-bold text-sm text-[#009d9a] flex items-center gap-1.5 mb-1.5">
                    <Atom className="h-4 w-4" /> Non-Abelian Anyon Ingredients
                  </h4>
                  <p className="text-slate-300">
                    In ordinary cooking, ingredients sit in bowls. In the Cosmic Kitchen, your ingredients
                    (carrots, potatoes, lettuce, tomatoes, peppers, paprika, bread) are <b>Fibonacci anyons (τ)</b>.
                    Their quantum flavor information is not stored inside the particle, but encoded topologically
                    in the <b>spacetime braids</b> that link them together!
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg border border-[#333333] bg-[#262626]">
                    <span className="font-bold text-white flex items-center gap-1.5 mb-1">
                      <Sparkles className="h-3.5 w-3.5 text-[#f1c21b]" /> Order Tickets
                    </span>
                    <p className="text-slate-400">
                      Each order ticket defines a customer&apos;s desired flavor: Sweetness, Spiciness, Umami,
                      and Tartness. Your goal is to weave the strands to match these targets.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-[#333333] bg-[#262626]">
                    <span className="font-bold text-white flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#24a148]" /> Arbitrary Strands
                    </span>
                    <p className="text-slate-400">
                      Recipes support 2, 3, 4, 5, or more strands. More strands open up deeper braid groups (B_N)
                      and higher dimensional quantum Hilbert spaces!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'braiding' && (
              <div className="space-y-3 animate-in fade-in-50 duration-200">
                <div className="p-3.5 rounded-lg border border-[#333333] bg-[#161616]">
                  <h4 className="font-bold text-sm text-[#be95ff] flex items-center gap-1.5 mb-1.5">
                    <GitCommit className="h-4 w-4" /> Left-to-Right Horizontal Braiding
                  </h4>
                  <p className="text-slate-300">
                    Just like an <b>IBM Quantum Composer circuit</b>, strands advance horizontally from left
                    (ingredient dispensers) to right (fusion chamber). Time and braiding operations flow along the horizontal axis.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg border border-[#8a3ffc]/30 bg-[#262626]">
                    <span className="font-bold text-white font-mono text-xs block mb-1">
                      Over Crossing: σᵢ
                    </span>
                    <p className="text-slate-400">
                      Swaps wire rail <i>i</i> with rail <i>i+1</i>, passing the lower strand <b>over</b> the upper strand.
                      Applies the topological R-matrix phase rotation.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg border border-[#009d9a]/30 bg-[#262626]">
                    <span className="font-bold text-white font-mono text-xs block mb-1">
                      Under Crossing: σᵢ⁻¹
                    </span>
                    <p className="text-slate-400">
                      Swaps wire rail <i>i</i> with rail <i>i+1</i>, passing the lower strand <b>under</b> the upper strand.
                      Applies inverse phase rotation.
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-lg border border-[#da1e28]/30 bg-[#262626]">
                  <h5 className="font-bold text-[#ee5396] mb-1">⚠️ Non-Abelian Logic: Order Matters!</h5>
                  <p className="text-slate-300 font-mono text-[11px]">
                    σ₁ followed by σ₂ ≠ σ₂ followed by σ₁
                  </p>
                  <p className="text-slate-400 mt-1">
                    Swapping strand 1 over 2, then 2 over 3 produces a completely different quantum state and
                    flavor profile than doing it in reverse order.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'stations' && (
              <div className="space-y-3 animate-in fade-in-50 duration-200">
                <div className="p-3.5 rounded-lg border border-[#333333] bg-[#161616]">
                  <h4 className="font-bold text-sm text-[#009d9a] flex items-center gap-1.5 mb-1.5">
                    <Zap className="h-4 w-4" /> Kitchen Stations & The Mixer Merge
                  </h4>
                  <p className="text-slate-300">
                    Select a kitchen station before executing a braid crossing to modify the physical and
                    quantum properties of the strand:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333]">
                    <b className="text-white">🔪 Chop Board:</b> Accelerates quantum phase rotation and boosts Sweetness.
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333]">
                    <b className="text-white">🌪️ Blender:</b> Maximizes quantum superposition through the Fibonacci F-matrix.
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333]">
                    <b className="text-white">🍳 Sear Pan:</b> Applies thermal excitation to ramp up Spiciness.
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333]">
                    <b className="text-white">💧 Wash Station:</b> Cleanses decoherence glitches and stabilizes the strands.
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333] sm:col-span-2">
                    <b className="text-white">🍲 Boil Pot:</b> Simmers long-range topological entanglement for deep Umami broths.
                  </div>
                </div>

                {/* Mixer Merge */}
                <div className="p-3 rounded-lg border border-[#f1c21b]/40 bg-[#f1c21b]/5">
                  <h5 className="font-bold text-[#f1c21b] flex items-center gap-1.5 mb-1">
                    <Zap className="h-3.5 w-3.5" /> Mixer Merge Mode
                  </h5>
                  <p className="text-slate-300">
                    Click <b>Mixer Merge</b> before adding a crossing. The two strands will merge at that crossing
                    point into a single composite flavor strand, uniting both ingredient flavors!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'fusion' && (
              <div className="space-y-3 animate-in fade-in-50 duration-200">
                <div className="p-3.5 rounded-lg border border-[#333333] bg-[#161616]">
                  <h4 className="font-bold text-sm text-[#f1c21b] flex items-center gap-1.5 mb-1.5">
                    <Flame className="h-4 w-4" /> Fusion Measurement & Plated Scoring
                  </h4>
                  <p className="text-slate-300">
                    When you are satisfied with your weave, press <b>Serve & Cook</b>. The strands collide in the
                    Anyon Fusion Reactor according to the Fibonacci fusion rule:
                  </p>
                  <div className="mt-2 text-center p-2 rounded bg-[#262626] font-mono text-sm text-[#009d9a] font-bold">
                    τ ⊗ τ = 1 (Vacuum Ash) ⊕ τ (Super-Particle Dish)
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg border border-[#333333] bg-[#262626]">
                    <span className="font-bold text-white flex items-center gap-1.5 mb-1">
                      <Flame className="h-3.5 w-3.5 text-[#f1c21b]" /> The Umami Ladder
                    </span>
                    <ul className="text-slate-400 space-y-1 font-mono text-[10px]">
                      <li>• 3 moves: 1.2x Umami Multiplier</li>
                      <li>• 5 moves: 1.5x Umami Multiplier</li>
                      <li>• 7 moves: 2.0x Umami Multiplier</li>
                      <li>• 9+ moves: 3.14x (Pi) Multiplier!</li>
                    </ul>
                  </div>
                  <div className="p-3 rounded-lg border border-[#333333] bg-[#262626]">
                    <span className="font-bold text-white flex items-center gap-1.5 mb-1">
                      🪙 Cosmic Credits & Shop
                    </span>
                    <p className="text-slate-400">
                      Serve Flawless dishes to earn cosmic credits. Visit the pantry below to buy Cryo-Stabilizers
                      and Noise Filters to eliminate decoherence glitches!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions with Don't Show Again Checkbox */}
          <DialogFooter className="bg-[#f8fafc] dark:bg-[#121212] border-t border-slate-200 dark:border-[#333333] p-4 flex flex-col sm:flex-row justify-between items-center gap-3 w-full">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="dont-show-again-checkbox"
                checked={dontShowAgain}
                onChange={(e) => {
                  const val = e.target.checked;
                  setDontShowAgain(val);
                  if (val) {
                    localStorage.setItem('qkj_dont_show_again', 'true');
                  } else {
                    localStorage.removeItem('qkj_dont_show_again');
                  }
                }}
                className="h-4 w-4 rounded border-slate-400 dark:border-slate-600 accent-[#8a3ffc] cursor-pointer"
              />
              <label htmlFor="dont-show-again-checkbox" className="text-xs text-slate-700 dark:text-slate-300 select-none cursor-pointer">
                Don&apos;t show this guide on startup
              </label>
            </div>

            <div className="flex items-center gap-2">
              {activeTab !== 'fusion' ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const tabs = ['basics', 'braiding', 'stations', 'fusion'] as const;
                    const nextIdx = (tabs.indexOf(activeTab) + 1) % tabs.length;
                    setActiveTab(tabs[nextIdx]);
                  }}
                  className="h-8 text-xs border-slate-300 dark:border-[#525252] text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white"
                >
                  Next Step <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              ) : null}
              <Button
                size="sm"
                variant="default"
                onClick={() => setOpen(false)}
                className="h-8 text-xs font-bold bg-[#8a3ffc] hover:bg-[#7b2bfb] text-white"
              >
                Got It, Let&apos;s Cook!
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
