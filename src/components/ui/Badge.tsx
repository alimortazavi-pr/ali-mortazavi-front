import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-white/10 text-gray-300",
  success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  danger: "bg-red-500/15 text-red-400 border-red-500/20",
  info: "bg-violet-500/15 text-violet-400 border-violet-500/20",
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-transparent",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export default Badge;
