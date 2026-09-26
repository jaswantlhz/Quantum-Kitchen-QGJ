'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Atom,
  Palette,
  Volume2,
  Code2,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export function CreditsModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 gap-1.5 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
          title="View Project Credits & Attributions"
        >
          <Heart className="h-3.5 w-3.5 text-[#ee5396]" />
          <span>Credits</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl border-[#393939] bg-[#161616] text-[#f4f4f4] max-h-[85vh] overflow-y-auto">
        <DialogHeader className="border-b border-[#333333] pb-3">
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-[#8a3ffc] text-white text-[10px] font-mono">
              Attributions & Foundations
            </Badge>
          </div>
          <DialogTitle className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mt-1">
            ⚛️ Quantum Kitchen: Cosmic Threads
          </DialogTitle>
          <p className="text-xs text-slate-400">
            An open-source topological quantum computation simulator and educational game.
          </p>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Section 1: Quantum Physics Foundations */}
          <div className="rounded-xl border border-[#333333] bg-[#1c1c1c] p-3.5 space-y-2">
            <h4 className="font-bold text-sm text-[#009d9a] flex items-center gap-1.5">
              <Atom className="h-4 w-4" /> 1. Topological Quantum Physics Foundations
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333]">
                <b className="text-white block mb-0.5">Alexei Kitaev & Michael Freedman</b>
                <p className="text-slate-400 text-[11px]">
                  Pioneering theories of topological quantum computation, non-Abelian anyon statistics, and hardware-level fault tolerance.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333]">
                <b className="text-white block mb-0.5">Emil Artin & Vaughan Jones</b>
                <p className="text-slate-400 text-[11px]">
                  Mathematical foundations of the Braid Group B_N, knot invariants, and non-commutative unitary representations.
                </p>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-[#262626] border border-[#393939] text-[#24a148] font-mono text-[11px]">
              Fibonacci Fusion Rule: τ ⊗ τ = 1 ⊕ τ (Golden Ratio τ = (√5 - 1) / 2 ≈ 0.618034)
            </div>
          </div>

          {/* Section 2: Visual & Mascot Art */}
          <div className="rounded-xl border border-[#333333] bg-[#1c1c1c] p-3.5 space-y-2">
            <h4 className="font-bold text-sm text-[#be95ff] flex items-center gap-1.5">
              <Palette className="h-4 w-4" /> 2. Design System & Mascot Character
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333]">
                <b className="text-white block mb-0.5">IBM Qiskit & Carbon Design System</b>
                <p className="text-slate-400 text-[11px]">
                  Color palette, technical typography, layout grids, and matte surface styling specs.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#262626] border border-[#333333]">
                <b className="text-white block mb-0.5">Jeremy Prêt / Bloub</b>
                <p className="text-slate-400 text-[11px]">
                  Original Bloub mascot avatar design and character animation artwork.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Procedural Audio Synthesis */}
          <div className="rounded-xl border border-[#333333] bg-[#1c1c1c] p-3.5 space-y-1.5">
            <h4 className="font-bold text-sm text-[#f1c21b] flex items-center gap-1.5">
              <Volume2 className="h-4 w-4" /> 3. Procedural Audio Synthesis
            </h4>
            <p className="text-slate-300">
              Zero static audio files. 100% of cosmic plucks, chirps, reactor hums, and victory jingles are generated in real-time through the browser&apos;s <b>Web Audio API</b> using custom oscillator envelopes and biquad filters.
            </p>
          </div>

          {/* Section 4: Open Source Technologies */}
          <div className="rounded-xl border border-[#333333] bg-[#1c1c1c] p-3.5 space-y-2">
            <h4 className="font-bold text-sm text-[#4589ff] flex items-center gap-1.5">
              <Code2 className="h-4 w-4" /> 4. Core Technology Stack
            </h4>
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              <span className="px-2 py-1 rounded bg-[#262626] border border-[#393939] text-slate-300">Next.js 15+ App Router</span>
              <span className="px-2 py-1 rounded bg-[#262626] border border-[#393939] text-slate-300">React 19</span>
              <span className="px-2 py-1 rounded bg-[#262626] border border-[#393939] text-slate-300">TypeScript 5.0</span>
              <span className="px-2 py-1 rounded bg-[#262626] border border-[#393939] text-slate-300">HTML5 Canvas (High-DPI)</span>
              <span className="px-2 py-1 rounded bg-[#262626] border border-[#393939] text-slate-300">Tailwind CSS</span>
              <span className="px-2 py-1 rounded bg-[#262626] border border-[#393939] text-slate-300">Lucide Icons</span>
              <span className="px-2 py-1 rounded bg-[#262626] border border-[#393939] text-slate-300">MongoDB / Mongoose</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[#333333] pt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-[#8a3ffc]" />
            Released under the <b>MIT License</b>
          </span>
          <Button
            size="sm"
            onClick={() => setOpen(false)}
            className="h-7 text-xs bg-[#8a3ffc] hover:bg-[#6929c4] text-white cursor-pointer"
          >
            Close Credits
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
