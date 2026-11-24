"use client";

import { useRef } from "react";
import { gsap, motion, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";

export type Step = { title: string; text: string; meta?: string };

/**
 * Scroll-linked process timeline: sticky intro on the left, a progress line
 * that fills while scrolling, and nodes that light up as each step is reached.
 */
export function ProcessTimeline({ steps, title = "Ako prebieha ošetrenie", lead }: { steps: Step[]; title?: string; lead?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.allowMotion, () => {
        gsap.fromTo("[data-progress]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-steps]", start: "top 70%", end: "bottom 60%", scrub: 0.4 } });
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 68%",
            onEnter: () => step.setAttribute("data-on", ""),
            onLeaveBack: () => step.removeAttribute("data-on"),
          });
          gsap.from(step.querySelector("[data-step-card]"), { autoAlpha: 0, y: 18, duration: 0.8, ease: motion.ease, scrollTrigger: { trigger: step, start: "top 85%", once: true } });
        });
      });
      mm.add(motion.noMotion, () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((s) => s.setAttribute("data-on", ""));
        gsap.set("[data-progress]", { scaleY: 1 });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
          <Eyebrow>Postup</Eyebrow>
          <h2 className="type-h2 mt-4">{title}</h2>
          {lead && <p className="mt-4 max-w-[420px] text-muted">{lead}</p>}
        </div>
      </div>
      <ol data-steps className="relative lg:col-span-7">
        <span aria-hidden className="absolute top-2 bottom-2 left-[19px] w-px bg-line" />
        <span aria-hidden data-progress className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-primary" />
        {steps.map((s, i) => (
          <li key={s.title} data-step className="group relative flex gap-4 pb-6 last:pb-0 sm:gap-6">
            <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-line bg-white text-[13px] font-semibold tabular-nums transition-[background-color,border-color,color] duration-500 group-data-[on]:border-primary group-data-[on]:bg-primary group-data-[on]:text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div data-step-card className="min-w-0 flex-1 rounded-[20px] border border-line bg-white p-5 transition-shadow duration-500 group-data-[on]:shadow-[0_20px_40px_-30px_rgb(36_36_36/0.45)] sm:p-6">
              <h3 className="text-[17px] font-medium">{s.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
              {s.meta && <p className="mt-3 inline-flex max-w-full rounded-full bg-peach-100 px-3 py-1 text-[12px] leading-snug font-medium text-peach-ink">{s.meta}</p>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
