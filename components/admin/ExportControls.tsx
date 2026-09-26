'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { FileJson, FileSpreadsheet, FileCode } from 'lucide-react';

interface ExportControlsProps {
  selectedBraidId?: string | null;
}

export function ExportControls({ selectedBraidId }: ExportControlsProps) {
  const downloadDataset = (format: 'json' | 'csv') => {
    window.open(`/api/braids/export?format=${format}`, '_blank');
  };

  const downloadSvgDiagram = () => {
    const svgElem = document.getElementById('scientist-braid-svg');
    if (!svgElem) {
      alert('No SVG diagram currently visible to export.');
      return;
    }
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgElem);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `braid_diagram_${selectedBraidId || 'export'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadDataset('json')}
        className="h-8 border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/40 text-xs"
      >
        <FileJson className="mr-1.5 h-3.5 w-3.5 text-cyan-400" />
        Download JSON Telemetry
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadDataset('csv')}
        className="h-8 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 text-xs"
      >
        <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
        Download CSV Dataset
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={downloadSvgDiagram}
        className="h-8 border-purple-500/40 text-purple-300 hover:bg-purple-950/40 text-xs"
      >
        <FileCode className="mr-1.5 h-3.5 w-3.5 text-purple-400" />
        Download SVG Knot Diagram
      </Button>
    </div>
  );
}
