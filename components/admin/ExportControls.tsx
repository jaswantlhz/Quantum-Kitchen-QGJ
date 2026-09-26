'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileJson, FileSpreadsheet, FileCode, Terminal, Check } from 'lucide-react';

interface ExportControlsProps {
  selectedBraidId?: string | null;
}

export function ExportControls({ selectedBraidId }: ExportControlsProps) {
  const [copiedQiskit, setCopiedQiskit] = useState(false);

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

  const copyQiskitScript = () => {
    const qiskitCode = `"""
IBM Qiskit Topological Anyon Circuit Emulation
Exported from Quantum Kitchen: Cosmic Threads
"""
import numpy as np
from qiskit import QuantumCircuit, transpile
from qiskit.quantum_info import Statevector

# Golden Ratio Fibonacci Anyon Basis Angle
phi = (1 + np.sqrt(5)) / 2
theta_f = 2 * np.arccos(1 / phi)

# Initialize 2-qubit Topological Register
qc = QuantumCircuit(2, 2)

# Braid operator decomposition on anyon state
qc.ry(theta_f, 0)
qc.rz(3 * np.pi / 5, 1)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

print(qc.draw(output='text'))
`;
    navigator.clipboard.writeText(qiskitCode);
    setCopiedQiskit(true);
    setTimeout(() => setCopiedQiskit(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadDataset('json')}
        className="h-8 border-slate-300 dark:border-[#393939] text-[#007d79] dark:text-[#009d9a] hover:bg-slate-100 dark:hover:bg-[#262626] text-xs font-semibold"
      >
        <FileJson className="mr-1.5 h-3.5 w-3.5" />
        JSON Telemetry
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => downloadDataset('csv')}
        className="h-8 border-slate-300 dark:border-[#393939] text-[#198038] dark:text-[#24a148] hover:bg-slate-100 dark:hover:bg-[#262626] text-xs font-semibold"
      >
        <FileSpreadsheet className="mr-1.5 h-3.5 w-3.5" />
        CSV Dataset
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={downloadSvgDiagram}
        className="h-8 border-slate-300 dark:border-[#393939] text-[#6929c4] dark:text-[#be95ff] hover:bg-slate-100 dark:hover:bg-[#262626] text-xs font-semibold"
      >
        <FileCode className="mr-1.5 h-3.5 w-3.5" />
        SVG Knot
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={copyQiskitScript}
        className="h-8 border-slate-300 dark:border-[#393939] text-[#8a3ffc] hover:bg-slate-100 dark:hover:bg-[#262626] text-xs font-semibold"
      >
        {copiedQiskit ? (
          <>
            <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" /> Copied!
          </>
        ) : (
          <>
            <Terminal className="mr-1.5 h-3.5 w-3.5" /> Copy Qiskit Code
          </>
        )}
      </Button>
    </div>
  );
}
