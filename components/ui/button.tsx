import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-cyan-500 text-black font-semibold hover:bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)] border border-cyan-300",
        cyber:
          "bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold hover:from-pink-500 hover:to-purple-500 shadow-[0_0_20px_rgba(236,72,153,0.4)] border border-pink-400/40",
        neonGreen:
          "bg-emerald-500 text-black font-bold hover:bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] border border-emerald-300",
        outline:
          "border border-cyan-500/40 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-900/40 hover:border-cyan-400 hover:text-white backdrop-blur-sm",
        ghost:
          "text-slate-300 hover:text-white hover:bg-slate-800/60",
        destructive:
          "bg-rose-600 text-white hover:bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-xl px-6 text-base font-bold tracking-wide",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
