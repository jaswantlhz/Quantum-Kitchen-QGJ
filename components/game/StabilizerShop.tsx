'use client';

import React from 'react';
import { KitchenUpgrade } from '@/lib/game/upgrades';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Check } from 'lucide-react';

interface StabilizerShopProps {
  upgrades: KitchenUpgrade[];
  credits: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

export function StabilizerShop({ upgrades, credits, onBuyUpgrade }: StabilizerShopProps) {
  return (
    <Card className="border-cyan-500/20 bg-slate-950/80">
      <CardHeader className="p-4 border-b border-slate-800/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-cyan-400" />
            <div>
              <CardTitle className="text-sm font-bold text-white">Quantum Pantry & Stabilizers</CardTitle>
              <CardDescription className="text-[11px]">
                Invest kitchen credits to stabilize odds and prevent decoherence glitches.
              </CardDescription>
            </div>
          </div>
          <Badge variant="amber" className="font-mono text-xs">
            🪙 {credits} Credits
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3">
        {upgrades.map((u) => {
          const isMaxed = u.level >= u.maxLevel;
          const canAfford = credits >= u.cost && !isMaxed;

          return (
            <div
              key={u.id}
              className="flex items-center justify-between rounded-xl border border-slate-800/80 bg-slate-900/50 p-3 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{u.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-100">{u.name}</span>
                    <Badge variant="outline" className="text-[9px] py-0 px-1.5 text-cyan-300 border-cyan-800">
                      Tier {u.level}/{u.maxLevel}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-400 max-w-[240px] leading-tight mt-0.5">
                    {u.description}
                  </p>
                  <span className="inline-block font-mono text-[10px] text-emerald-400 mt-1 font-semibold">
                    {u.effectLabel}
                  </span>
                </div>
              </div>

              <div>
                <Button
                  size="sm"
                  variant={isMaxed ? 'outline' : canAfford ? 'default' : 'ghost'}
                  disabled={!canAfford || isMaxed}
                  onClick={() => onBuyUpgrade(u.id)}
                  className="h-8 text-xs font-bold"
                >
                  {isMaxed ? (
                    <span className="flex items-center text-emerald-400">
                      <Check className="mr-1 h-3 w-3" /> Max
                    </span>
                  ) : (
                    `🪙 ${u.cost}`
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
