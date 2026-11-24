"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, motion, SplitText as GSAPSplitText, useGSAP } from "./gsap";

/**
 * Line-by-line masked text reveal.
 * Adapted from the React Bits "SplitText" component (reactbits.dev) and
 * reduced to a single, restrained line-mask reveal using GSAP SplitText.
 * Re-splits automatically on resize / font load (autoSplit).
 */
type SplitTextProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "load" animates immediately (hero), "scroll" waits for the viewport. */
  trigger?: "load" | "scroll";
  id?: string;
};

export function SplitText({ as: Tag = "div", children, className, delay = 0, trigger = "scroll", id }: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(motion.allowMotion, () => {
        let played = false;
        const split = GSAPSplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            // After the first play, a re-split (resize/font load) should not replay the intro.
            if (played) return;
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.15,
              ease: motion.easeExpo,
              stagger: 0.09,
              delay,
              onStart: () => {
                played = true;
              },
              scrollTrigger: trigger === "scroll" ? { trigger: el, start: motion.start, once: true } : undefined,
            });
          },
        });
        return () => split.revert();
      });

      mm.add(motion.noMotion, () => {
        gsap.set(el, { visibility: "visible" });
      });
    },
    { scope: ref, dependencies: [] },
  );

  return (
    <Tag ref={ref} className={className} data-split="" id={id}>
      {children}
    </Tag>
  );
}
