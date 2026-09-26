import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-[#8a3ffc]/50 bg-[#8a3ffc]/15 text-[#be95ff] dark:text-[#be95ff]",
        secondary:
          "border-[#525252] bg-[#262626] text-[#c6c6c6]",
        magenta:
          "border-[#ee5396]/50 bg-[#ee5396]/15 text-[#ee5396]",
        teal:
          "border-[#009d9a]/50 bg-[#009d9a]/15 text-[#009d9a]",
        emerald:
          "border-[#24a148]/50 bg-[#24a148]/15 text-[#42be65]",
        amber:
          "border-[#f1c21b]/50 bg-[#f1c21b]/15 text-[#f1c21b]",
        destructive:
          "border-[#da1e28]/50 bg-[#da1e28]/15 text-[#fa4d56]",
        outline: "text-slate-300 border-[#525252] bg-transparent",
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
