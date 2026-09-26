'use client';

import React, { useState } from 'react';
import { Info, HelpCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface InfoDialogProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
  iconType?: 'info' | 'help';
  buttonClassName?: string;
  tooltip?: string;
}

export function InfoDialog({
  title,
  description,
  children,
  iconType = 'info',
  buttonClassName = 'text-cyan-400 hover:text-cyan-300',
  tooltip = 'Click for info',
}: InfoDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        title={tooltip}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className={`inline-flex items-center justify-center h-5 w-5 rounded-full border border-cyan-500/40 bg-cyan-950/40 hover:bg-cyan-900/60 transition-all hover:scale-110 active:scale-95 cursor-pointer ${buttonClassName}`}
      >
        {iconType === 'info' ? (
          <Info className="h-3 w-3" />
        ) : (
          <HelpCircle className="h-3 w-3" />
        )}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md border-cyan-500/40 bg-slate-950/95 text-slate-100 p-6 shadow-2xl backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base font-bold text-cyan-300">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-950 border border-cyan-500/50 text-cyan-400 text-xs">
                i
              </span>
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-xs text-slate-400 mt-1 leading-relaxed">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>

          {children && <div className="mt-3 text-xs space-y-2 text-slate-300">{children}</div>}
        </DialogContent>
      </Dialog>
    </>
  );
}
