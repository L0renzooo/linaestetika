"use client";

import { useId, useRef, useState } from "react";
import type { Faq as FaqItem } from "@/data/treatments";
import { gsap, motion, useGSAP } from "@/components/motion/gsap";
import { PlusIcon } from "./icons";
import { cn } from "@/lib/cn";

/** Accessible accordion. Height is animated with GSAP; content stays in the DOM for SEO. */
export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <FaqRow key={item.q} item={item} id={`${baseId}-${i}`} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
      ))}
    </div>
  );
}

function FaqRow({ item, id, open, onToggle }: { item: FaqItem; id: string; open: boolean; onToggle: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useGSAP(
    () => {
      const el = panel.current;
      if (!el) return;
      if (first.current) {
        first.current = false;
        gsap.set(el, { height: open ? "auto" : 0 });
        return;
      }
      const reduce = window.matchMedia(motion.noMotion).matches;
      gsap.to(el, { height: open ? "auto" : 0, duration: reduce ? 0 : 0.55, ease: motion.easeExpo });
      if (open && !reduce) gsap.fromTo(el.firstElementChild, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.08 });
    },
    { dependencies: [open] },
  );

  return (
    <div>
      <h3>
        <button
          type="button"
          id={`${id}-btn`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[16px] font-medium transition-colors hover:text-primary"
        >
          {item.q}
          <span
            className={cn(
              "grid size-9 shrink-0 place-items-center rounded-full border transition-[background-color,border-color,color,transform] duration-500",
              open ? "rotate-45 border-primary bg-primary text-white" : "border-line text-ink group-hover:border-primary/40",
            )}
          >
            <PlusIcon className="size-4" />
          </span>
        </button>
      </h3>
      <div ref={panel} id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} className="overflow-hidden" style={{ height: open ? "auto" : 0 }} hidden={false}>
        <p className="max-w-[68ch] pr-14 pb-6 text-[15px] leading-relaxed text-muted">{item.a}</p>
      </div>
    </div>
  );
}
