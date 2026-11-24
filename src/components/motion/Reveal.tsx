"use client";

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, motion, useGSAP } from "./gsap";

/**
 * Scroll-triggered fade/slide reveal.
 * Adapted from the React Bits "AnimatedContent" component (reactbits.dev):
 * same idea, trimmed to a calm vertical reveal with optional stagger.
 *
 * - mode "self": the wrapper itself is revealed.
 * - mode "items": every descendant marked `data-reveal-item` is revealed in sequence.
 */
type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  mode?: "self" | "items";
  y?: number;
  delay?: number;
  stagger?: number;
  start?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function Reveal<T extends ElementType = "div">({
  as,
  children,
  mode = "self",
  y = motion.revealY,
  delay = 0,
  stagger = motion.stagger,
  start = motion.start,
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = mode === "items" ? gsap.utils.toArray<HTMLElement>("[data-reveal-item]", el) : [el];
      if (!targets.length) return;
      const mm = gsap.matchMedia();

      mm.add(motion.allowMotion, () => {
        gsap.fromTo(
          targets,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: motion.duration,
            ease: motion.ease,
            delay,
            stagger,
            // Inline styles are removed afterwards so state classes (e.g. dimmed cards) keep working.
            clearProps: "opacity,visibility,transform",
            onStart: () => el.setAttribute("data-revealed", ""),
            scrollTrigger: { trigger: el, start, once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} data-reveal={mode} {...rest}>
      {children}
    </Tag>
  );
}
