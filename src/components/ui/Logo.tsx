import Image from "next/image";
import { brand } from "@/data/images";
import { cn } from "@/lib/cn";

export function Logo({ className, variant = "red", priority = false }: { className?: string; variant?: "red" | "peach"; priority?: boolean }) {
  const logo = variant === "red" ? brand.logoRed : brand.logoPeach;
  return (
    <Image
      src={logo.src}
      width={logo.width}
      height={logo.height}
      alt="LINA ESTETIKA"
      priority={priority}
      sizes="160px"
      className={cn("h-auto", className)}
    />
  );
}
