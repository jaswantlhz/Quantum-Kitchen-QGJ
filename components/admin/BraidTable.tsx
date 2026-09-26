'use client';

import React, { useState } from 'react';
import { BraidRecord } from '@/lib/quantum/braidTypes';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface BraidTableProps {
  braids: BraidRecord[];
  selectedBraidId: string | null;
  onSelectBraid: (braid: BraidRecord) => void;
}

export function BraidTable({
  braids,
  selectedBraidId,
  onSelectBraid,
}: BraidTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = braids.filter((b) => {
    const term = searchTerm.toLowerCase();
    return (
      b.dishName.toLowerCase().includes(term) ||
      b.braidWord.toLowerCase().includes(term) ||
      (b.notes || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by dish, braid word (e.g. σ₁), or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-[#393939] bg-white dark:bg-[#161616] py-2 pl-9 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-[#8a3ffc] focus:outline-none"
          />
        </div>
        <Badge variant="outline" className="font-mono text-xs">
          {filtered.length} Recorded
        </Badge>
      </div>

      {/* Telemetry Table */}
      <div className="rounded-xl border border-slate-200 dark:border-[#393939] overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-100/70 dark:bg-[#262626]">
            <TableRow>
              <TableHead className="text-slate-700 dark:text-slate-300">Time</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Dish / Origin</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Braid Word</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Crossings</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">State [α, β]</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Success P(τ)</TableHead>
              <TableHead className="text-slate-700 dark:text-slate-300">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center text-slate-500 py-8">
                  No braid telemetry matching query. Create braids in the game or sandbox!
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((b) => {
                const isSelected = b.id === selectedBraidId;
                const dateStr = new Date(b.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                });
                const successPct = Math.round(b.probabilities.successEnergy * 100);

                return (
                  <TableRow
                    key={b.id}
                    onClick={() => onSelectBraid(b)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#8a3ffc]/15 border-l-2 border-l-[#8a3ffc]'
                        : 'hover:bg-slate-100/60 dark:hover:bg-[#262626]/50'
                    }`}
                  >
                    <TableCell className="font-mono text-[11px] text-slate-500">
                      {dateStr}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-900 dark:text-white">
                      {b.dishName}
                    </TableCell>
                    <TableCell className="font-mono text-[#6929c4] dark:text-[#be95ff] font-bold">
                      {b.braidWord || 'Identity (e)'}
                    </TableCell>
                    <TableCell className="font-mono text-slate-500">
                      {b.crossings.length}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-700 dark:text-slate-300">
                      [{b.stateVector[0].toFixed(2)}, {b.stateVector[1].toFixed(2)}]
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={successPct >= 70 ? 'default' : successPct >= 40 ? 'magenta' : 'destructive'}
                        className="font-mono text-[10px]"
                      >
                        {successPct}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant={isSelected ? 'default' : 'outline'}
                        className="h-6 text-[10px] px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectBraid(b);
                        }}
                      >
                        {isSelected ? 'Selected' : 'Inspect'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
