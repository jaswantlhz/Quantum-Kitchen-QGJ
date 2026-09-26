'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BraidRecord } from '@/lib/quantum/braidTypes';
import { BraidTable } from '@/components/admin/BraidTable';
import { QuantumInspector } from '@/components/admin/QuantumInspector';
import { BraidDiagramSvg } from '@/components/admin/BraidDiagramSvg';
import { BraidSandbox } from '@/components/admin/BraidSandbox';
import { ExportControls } from '@/components/admin/ExportControls';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Atom,
  FlaskConical,
  RefreshCw,
  ChefHat,
  Database,
} from 'lucide-react';

export default function AdminPage() {
  const [braids, setBraids] = useState<BraidRecord[]>([]);
  const [selectedBraid, setSelectedBraid] = useState<BraidRecord | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBraids = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/braids');
      const data = await res.json();
      if (data.success && data.data) {
        setBraids(data.data);
        setSelectedBraid((prev) => prev ?? (data.data.length > 0 ? data.data[0] : null));
      }
    } catch (err) {
      console.warn('Failed to load braids:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/braids');
        const data = await res.json();
        if (!ignore && data.success && data.data) {
          setBraids(data.data);
          setSelectedBraid((prev) => prev ?? (data.data.length > 0 ? data.data[0] : null));
        }
      } catch (err) {
        console.warn('Failed to load braids:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleBraidSaved = (newRecord: BraidRecord) => {
    setBraids((prev) => [newRecord, ...prev]);
    setSelectedBraid(newRecord);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8 transition-colors duration-200">
      {/* Top Header Bar */}
      <header className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#333333] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#262626] border border-[#393939] text-[#8a3ffc]">
              <Atom className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#f4f4f4] flex items-center gap-2">
                Quantum Scientist Portal
                <Badge variant="default" className="text-[10px] tracking-widest font-mono">
                  B₃ ANYON OBSERVATORY
                </Badge>
              </h1>
              <p className="text-xs text-slate-400">
                Topological Braiding Telemetry, Unitary Evolution Analysis & Research Datasets
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Button
            variant="outline"
            size="sm"
            onClick={fetchBraids}
            disabled={loading}
            className="h-8 border-[#393939] text-xs"
          >
            <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>

          <Link href="/">
            <Button size="sm" variant="default" className="h-8 text-xs font-bold">
              <ChefHat className="mr-1.5 h-3.5 w-3.5" /> Return to Kitchen
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl mt-6">
        <Tabs defaultValue="telemetry">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <TabsList>
              <TabsTrigger value="telemetry">
                <Database className="mr-1.5 h-3.5 w-3.5" /> Braid Telemetry Hub
              </TabsTrigger>
              <TabsTrigger value="sandbox">
                <FlaskConical className="mr-1.5 h-3.5 w-3.5" /> Theoretical Sandbox
              </TabsTrigger>
            </TabsList>

            <ExportControls selectedBraidId={selectedBraid?.id} />
          </div>

          {/* TAB 1: Telemetry Hub */}
          <TabsContent value="telemetry" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Braid Telemetry Table */}
              <div className="lg:col-span-7 space-y-4">
                <Card className="border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#1c1c1c] p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">
                      Archived Braid Experiments
                    </span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                      Total records: <strong className="text-[#8a3ffc]">{braids.length}</strong>
                    </span>
                  </div>
                  <BraidTable
                    braids={braids}
                    selectedBraidId={selectedBraid?.id || null}
                    onSelectBraid={(b) => setSelectedBraid(b)}
                  />
                </Card>
              </div>

              {/* Right Column: Deep Quantum Inspector & SVG Knot Projection */}
              <div className="lg:col-span-5 space-y-4">
                {selectedBraid && (
                  <Card className="border border-slate-200 dark:border-[#333333] bg-white dark:bg-[#1c1c1c] p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-[#6929c4] dark:text-[#be95ff] uppercase tracking-wider">
                        Topological 2D Knot Projection
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        SVG Vector Engine
                      </span>
                    </div>
                    <div className="flex justify-start p-2 rounded-lg bg-[#f8fafc] dark:bg-[#161616] border border-slate-200 dark:border-[#333333] overflow-x-auto">
                      <BraidDiagramSvg
                        crossings={selectedBraid.crossings}
                        strandCount={selectedBraid.strandCount}
                        width={Math.max(380, 100 + selectedBraid.crossings.length * 45)}
                        height={190}
                      />
                    </div>
                  </Card>
                )}

                <QuantumInspector braid={selectedBraid} />
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: Theoretical Sandbox */}
          <TabsContent value="sandbox">
            <BraidSandbox onBraidSaved={handleBraidSaved} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
