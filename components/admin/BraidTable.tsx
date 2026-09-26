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
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by dish, braid word (e.g. σ₁), or notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-900/80 py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none backdrop-blur-md"
          />
        </div>
        <Badge variant="outline" className="font-mono text-xs">
          {filtered.length} Recorded
        </Badge>
      </div>

      {/* Telemetry Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Dish / Origin</TableHead>
            <TableHead>Braid Word</TableHead>
            <TableHead>Crossings</TableHead>
            <TableHead>State [α, β]</TableHead>
            <TableHead>Success P(τ)</TableHead>
            <TableHead>Action</TableHead>
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
                    isSelected ? 'bg-cyan-950/40 border-l-2 border-l-cyan-400' : 'hover:bg-slate-900/50'
                  }`}
                >
                  <TableCell className="font-mono text-[11px] text-slate-400">
                    {dateStr}
                  </TableCell>
                  <TableCell className="font-semibold text-white">
                    {b.dishName}
                  </TableCell>
                  <TableCell className="font-mono text-cyan-300 font-bold">
                    {b.braidWord}
                  </TableCell>
                  <TableCell className="font-mono text-slate-400">
                    {b.crossings.length}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-300">
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
                      className="h-7 text-[11px] px-2.5"
                    >
                      Inspect
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
