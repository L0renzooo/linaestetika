"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { images } from "@/data/images";
import { getService, formatPrice } from "@/data/services";
import { getTreatment, offMapServiceGroups, treatmentHref, zones, type ZoneId } from "@/data/treatments";
import { gsap, motion, useGSAP } from "@/components/motion/gsap";
import { PriceList } from "@/components/ui/PriceList";
import { ArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/**
 * Interactive treatment-area map (original LINA design).
 * Pins exist ONLY for zones that match named Bookio services.
 * Services without a fixed facial zone (botulotoxín 1–3 oblasti, ruky,
 * potenie) are listed beside the map instead of being placed on it.
 *
 * Accessible: pins and the text list are both buttons (radio-like group),
 * arrow keys move between zones, the detail panel is announced politely.
 */
export function FaceMap({ zoneIds, showOffMap = false, linkTreatments = true }: { zoneIds?: ZoneId[]; showOffMap?: boolean; linkTreatments?: boolean }) {
  const list = zoneIds ? zones.filter((z) => zoneIds.includes(z.id)) : zones;
  const [active, setActive] = useState<ZoneId>(list[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const zone = list.find((z) => z.id === active)!;
  const zoneServices = zone.serviceIds.map(getService);
  const slugs = [...new Set(zoneServices.map((s) => s.treatment))];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.allowMotion, () => {
        gsap.fromTo(panelRef.current?.querySelectorAll("[data-panel-item]") ?? [], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: motion.ease });
      });
    },
    { dependencies: [active] },
  );

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = list[(index + dir + list.length) % list.length];
    setActive(next.id);
    listRefs.current[next.id]?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      {/* Photo with pins */}
      <div className="relative lg:col-span-6">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[24px] bg-peach-100 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <Image
            src={images.portraitWoman.src}
            alt="Ilustračný portrét s vyznačenými oblasťami ošetrení"
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            style={{ objectPosition: "50% 30%" }}
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/15 via-transparent to-transparent" />
          {list.map((z, i) => {
            const isActive = z.id === active;
            return (
              <button
                key={z.id}
                type="button"
                tabIndex={-1}
                aria-hidden
                onClick={() => setActive(z.id)}
                onMouseEnter={() => window.matchMedia("(hover: hover)").matches && setActive(z.id)}
                style={{ left: `${z.x}%`, top: `${z.y}%` }}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 p-2"
              >
                <span className="relative grid size-8 place-items-center">
                  {isActive && <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 [animation-duration:1.8s]" />}
                  <span
                    className={cn(
                      "relative grid size-8 place-items-center rounded-full text-[12px] font-semibold tabular-nums shadow-[0_6px_16px_-6px_rgb(36_36_36/0.5)] ring-2 transition-[background-color,color,transform] duration-300",
                      isActive ? "scale-110 bg-primary text-white ring-white" : "bg-white/90 text-ink ring-white/60 group-hover:scale-110 group-hover:bg-peach-100",
                    )}
                  >
                    {i + 1}
                  </span>
                </span>
                <span
                  className={cn(
                    "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-white px-3 py-1 text-[12px] font-medium whitespace-nowrap shadow-sm transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    z.x > 60 ? "right-full mr-1" : "left-full ml-1",
                  )}
                >
                  {z.label}
                </span>
              </button>
            );
          })}
          <p className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-[11px] text-ink/70 backdrop-blur">Individuálny prístup</p>
        </div>
      </div>

      {/* Zone list + detail panel */}
      <div className="flex flex-col gap-5 lg:col-span-6">
        <div role="group" aria-label="Oblasti ošetrenia" className="grid gap-2 sm:grid-cols-2">
          {list.map((z, i) => {
            const isActive = z.id === active;
            const min = Math.min(...z.serviceIds.map((id) => getService(id).price));
            return (
              <button
                key={z.id}
                ref={(el) => {
                  listRefs.current[z.id] = el;
                }}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(z.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-[background-color,border-color,box-shadow] duration-300",
                  isActive ? "border-primary/30 bg-peach-100 shadow-[0_10px_30px_-20px_rgb(216_69_87/0.8)]" : "border-line bg-white hover:border-peach-200 hover:bg-peach-soft",
                )}
              >
                <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-[12px] font-semibold tabular-nums transition-colors", isActive ? "bg-primary text-white" : "bg-peach-100 text-ink")}>
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] leading-snug font-medium">{z.label}</span>
                  <span className="block text-[12.5px] text-muted">od {min} €</span>
                </span>
              </button>
            );
          })}
        </div>

        <div ref={panelRef} aria-live="polite" className="rounded-[24px] bg-peach-soft p-6 ring-1 ring-peach-line sm:p-7">
          <p data-panel-item className="type-eyebrow text-peach-ink">
            {String(list.findIndex((z) => z.id === active) + 1).padStart(2, "0")} — {zone.label}
          </p>
          <p data-panel-item className="mt-2 text-[15px] text-ink/80">
            {zone.description}
          </p>
          <div data-panel-item className="mt-3">
            <PriceList items={zoneServices} compact />
          </div>
          {linkTreatments && (
            <div data-panel-item className="mt-4 flex flex-wrap gap-2">
              {slugs.map((slug) => (
                <Link key={slug} href={treatmentHref(slug)} className="group inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-medium ring-1 ring-peach-line transition-colors hover:text-primary">
                  {getTreatment(slug)?.name}
                  <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {showOffMap && (
          <div className="rounded-[24px] border border-line p-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-ink/55 uppercase">Ďalšie ošetrenia tváre a tela</p>
            <ul className="mt-3 divide-y divide-line">
              {offMapServiceGroups.map((g) => {
                const min = Math.min(...g.serviceIds.map((id) => getService(id).price));
                const single = g.serviceIds.length === 1 ? getService(g.serviceIds[0]) : null;
                return (
                  <li key={g.label}>
                    <Link href={treatmentHref(g.slug)} className="group flex items-center justify-between gap-4 py-3 text-[15px]">
                      <span className="font-medium transition-colors group-hover:text-primary">{g.label}</span>
                      <span className="flex items-center gap-3 text-[14px] text-muted tabular-nums">
                        {single ? formatPrice(single) : `od ${min} €`}
                        <ArrowIcon className="size-4 text-ink transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
