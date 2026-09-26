'use client';

import React from 'react';
import { KitchenUpgrade } from '@/lib/game/upgrades';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { InfoDialog } from '@/components/ui/info-dialog';
import { ShoppingBag, Check } from 'lucide-react';

interface StabilizerShopProps {
  upgrades: KitchenUpgrade[];
  credits: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

export function StabilizerShop({ upgrades, credits, onBuyUpgrade }: StabilizerShopProps) {
  return (
    <Card className="border-[#333333] bg-[#1c1c1c] shadow-sm">
      <CardHeader className="p-3.5 border-b border-[#333333] pb-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-[#8a3ffc]" />
            <CardTitle className="text-sm font-bold text-[#f4f4f4]">Quantum Pantry</CardTitle>
            <InfoDialog
              title="Quantum Pantry Upgrades"
              description="Stabilizers dampen ambient thermal decoherence and lock quantum odds towards the desired Super-Particle fusion channel."
              tooltip="Pantry Guide"
            />
          </div>
          <Badge variant="amber" className="font-mono text-xs font-bold">
            🪙 {credits} CR
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {upgrades.map((u) => {
            const isMaxed = u.level >= u.maxLevel;
            const canAfford = credits >= u.cost && !isMaxed;

            return (
              <div
                key={u.id}
                className="flex items-center justify-between rounded-lg border border-[#393939] bg-[#262626] p-2.5 hover:border-[#525252] transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span className="text-xl shrink-0">{u.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#f4f4f4] truncate">{u.name}</span>
                      <InfoDialog
                        title={u.name}
                        description={u.description}
                        tooltip="Equipment Details"
                      >
                        <div className="rounded bg-[#161616] border border-[#393939] p-2 text-xs text-[#24a148] font-mono">
                          Active Effect: {u.effectLabel}
                        </div>
                      </InfoDialog>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                      <span className="text-[10px] text-[#24a148] font-mono font-medium truncate">
                        {u.effectLabel}
                      </span>
                      <span className="text-[9px] text-slate-400 font-mono shrink-0">
                        (Tier {u.level}/{u.maxLevel})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <Button
                    size="sm"
                    variant={isMaxed ? 'outline' : canAfford ? 'default' : 'ghost'}
                    disabled={!canAfford || isMaxed}
                    onClick={() => onBuyUpgrade(u.id)}
                    className="h-7 px-3 text-xs font-bold"
                  >
                    {isMaxed ? (
                      <span className="flex items-center text-emerald-400 text-[11px]">
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
        </div>
      </CardContent>
    </Card>
  );
}
