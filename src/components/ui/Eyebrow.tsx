import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label with a brand-coloured marker. Text stays ink for contrast. */
export function Eyebrow({ children, className, tone = "ink" }: { children: ReactNode; className?: string; tone?: "ink" | "light" }) {
  return (
    <p className={cn("type-eyebrow flex items-center gap-2.5", tone === "light" ? "text-white" : "text-ink", className)}>
      <span aria-hidden className={cn("h-px w-6", tone === "light" ? "bg-peach" : "bg-primary")} />
      {children}
    </p>
  );
}
