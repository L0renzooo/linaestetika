"use client";

import { useRef, useState } from "react";
import AnimatedList from "@/components/reactbits/AnimatedList";
import { formatDuration, formatPrice, type Service } from "@/data/services";
import { gsap, motion, useGSAP } from "@/components/motion/gsap";
import { BookingButton } from "@/components/ui/BookingButton";
import { cn } from "@/lib/cn";

/**
 * Variant selector built on React Bits' AnimatedList (listbox with keyboard
 * navigation). Selecting a Bookio variant updates the detail panel.
 */
export function VariantSelector({ items, title }: { items: Service[]; title: string }) {
  const [index, setIndex] = useState(0);
  const panel = useRef<HTMLDivElement>(null);
  const selected = items[index];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.allowMotion, () => {
        gsap.fromTo(panel.current?.querySelectorAll("[data-panel-item]") ?? [], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: motion.ease });
      });
    },
    { dependencies: [index] },
  );

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <AnimatedList
          ariaLabel={`Varianty: ${title}`}
          items={items.map((s) => ({ id: s.id, title: s.name, description: `Termín ${formatDuration(s.durationMinutes)}`, meta: formatPrice(s) }))}
          initialSelectedIndex={0}
          onItemSelect={(_, i) => setIndex(i)}
          selectOnHover={false}
          theme="light"
          frame={false}
          accentColor="#d84557"
          radius={16}
          gap={8}
          width="100%"
          maxHeight="none"
          showGradients={false}
          displayScrollbar={false}
          animation="slide"
          animateOnce
          renderItem={(item, i, isSelected) => {
            const s = items[i];
            return (
              <span className="flex w-full items-center gap-4 py-1">
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-full text-[12px] font-semibold tabular-nums transition-colors", isSelected ? "bg-primary text-white" : "bg-peach-100 text-ink")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] leading-snug font-medium">{s.name}</span>
                  <span className="block text-[13px] text-muted">Termín {formatDuration(s.durationMinutes)}</span>
                </span>
                <span className="shrink-0 text-[15px] font-medium tabular-nums">{formatPrice(s)}</span>
              </span>
            );
          }}
        />
        <p className="mt-3 text-[13px] text-muted">Vyberte variant šípkami alebo kliknutím a zobrazte si jeho detail.</p>
      </div>

      <div ref={panel} aria-live="polite" className="flex flex-col rounded-[24px] bg-peach-100 p-6 sm:p-8 lg:col-span-5">
        <p data-panel-item className="type-eyebrow text-peach-ink">
          Vybraný variant
        </p>
        <h3 data-panel-item className="type-h3 mt-3">
          {selected.name}
        </h3>
        <dl data-panel-item className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-[12px] text-muted">Cena</dt>
            <dd className="mt-1 text-xl font-medium tabular-nums">{formatPrice(selected)}</dd>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <dt className="text-[12px] text-muted">Dĺžka termínu</dt>
            <dd className="mt-1 text-xl font-medium tabular-nums">{formatDuration(selected.durationMinutes)}</dd>
          </div>
        </dl>
        <p data-panel-item className="mt-5 text-[14px] leading-relaxed text-ink/75">
          Presný rozsah ošetrenia vždy prekonzultujeme pred jeho začatím, aby výsledok pôsobil prirodzene a harmonicky.
        </p>
        <div data-panel-item className="mt-auto pt-6">
          <BookingButton />
        </div>
      </div>
    </div>
  );
}
