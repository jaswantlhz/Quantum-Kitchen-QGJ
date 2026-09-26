import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#8a3ffc] text-white font-medium hover:bg-[#7b2cbf] border border-transparent shadow-sm",
        cyber:
          "bg-[#8a3ffc] text-white font-semibold hover:bg-[#6929c4] border border-[#a56eff]/40 shadow-sm",
        qiskit:
          "bg-[#8a3ffc] text-white font-medium hover:bg-[#7b2cbf] border border-transparent shadow-sm",
        teal:
          "bg-[#009d9a] text-white font-medium hover:bg-[#007d79] border border-transparent shadow-sm",
        neonGreen:
          "bg-[#24a148] text-white font-medium hover:bg-[#198038] border border-transparent",
        outline:
          "border border-[#525252] bg-transparent text-[#f4f4f4] hover:bg-[#262626] hover:text-white",
        secondary:
          "bg-[#262626] text-[#f4f4f4] hover:bg-[#393939] border border-[#393939]",
        ghost:
          "text-slate-300 hover:text-white hover:bg-[#262626]",
        destructive:
          "bg-[#da1e28] text-white hover:bg-[#ba1b23] border border-transparent",
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
