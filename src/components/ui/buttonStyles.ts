import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "light";
export type ButtonSize = "sm" | "md";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[0.01em] whitespace-nowrap transition-[background-color,color,border-color,transform,box-shadow] duration-300 ease-out active:scale-[0.98] disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover shadow-[0_1px_0_rgb(0_0_0/0.04)] hover:shadow-[0_8px_24px_-10px_rgb(216_69_87/0.6)]",
  outline: "border border-ink/15 text-ink hover:border-ink/40 bg-white",
  light: "bg-white text-ink hover:bg-peach-soft",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-5 text-[13px]",
  md: "h-12 px-6 text-sm",
};

export function buttonClass(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}
