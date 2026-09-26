import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-cyan-500/40 bg-cyan-950/60 text-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.3)]",
        secondary:
          "border-purple-500/40 bg-purple-950/60 text-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.3)]",
        magenta:
          "border-pink-500/40 bg-pink-950/60 text-pink-300 shadow-[0_0_8px_rgba(236,72,153,0.3)]",
        emerald:
          "border-emerald-500/40 bg-emerald-950/60 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.3)]",
        amber:
          "border-amber-500/40 bg-amber-950/60 text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.3)]",
        destructive:
          "border-rose-500/40 bg-rose-950/60 text-rose-300 shadow-[0_0_8px_rgba(244,63,94,0.3)]",
        outline: "text-slate-300 border-slate-700 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
