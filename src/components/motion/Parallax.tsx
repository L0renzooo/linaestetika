"use client";

import { useRef, type ReactNode } from "react";
import { gsap, motion, useGSAP } from "./gsap";
import { cn } from "@/lib/cn";

/**
 * Restrained image parallax + soft reveal. The inner layer is slightly
 * oversized and drifts a few percent while the frame passes the viewport.
 * Disabled on small screens and for reduced-motion users.
 */
export function Parallax({ children, className, amount = 6 }: { children: ReactNode; className?: string; amount?: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${motion.allowMotion} and (min-width: 768px)`, () => {
        gsap.fromTo(
          inner.current,
          { yPercent: -amount, scale: 1.12 },
          {
            yPercent: amount,
            scale: 1.12,
            ease: "none",
            scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
      });
      mm.add(motion.allowMotion, () => {
        gsap.from(frame.current, {
          clipPath: "inset(10% 6% 10% 6% round 20px)",
          duration: 1.4,
          ease: motion.easeExpo,
          scrollTrigger: { trigger: frame.current, start: "top 88%", once: true },
          clearProps: "clipPath",
        });
      });
    },
    { scope: frame },
  );

  return (
    <div ref={frame} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute inset-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
