"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { SiteImage } from "@/data/images";
import { ArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export type ExpandingCard = {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  price: string;
  href: string;
  image: SiteImage;
};

/**
 * Treatment categories as horizontally expanding cards.
 *
 * Desktop (≥1024px, fine pointer or keyboard): the hovered/focused card grows
 * (flex-grow transition), the others contract; image crop adapts via
 * object-cover, details fade in on the active card only.
 * Touch / smaller screens: a scroll-snap carousel; the most visible card
 * becomes active (IntersectionObserver), with position dots.
 */
export function ExpandingCards({ cards }: { cards: ExpandingCard[] }) {
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Mobile / tablet: active card follows the scroll position.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 63.99rem)");
    let observer: IntersectionObserver | null = null;
    const setup = () => {
      observer?.disconnect();
      if (!mq.matches || !rail.current) return;
      observer = new IntersectionObserver(
        (entries) => {
          const best = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (best) setActive(Number((best.target as HTMLElement).dataset.index));
        },
        { root: rail.current, threshold: [0.55, 0.75, 0.95] },
      );
      itemRefs.current.forEach((el) => el && observer!.observe(el));
    };
    setup();
    mq.addEventListener("change", setup);
    return () => {
      observer?.disconnect();
      mq.removeEventListener("change", setup);
    };
  }, []);

  const activateFromPointer = (i: number) => {
    if (window.matchMedia("(hover: hover) and (min-width: 64rem)").matches) setActive(i);
  };

  const scrollTo = (i: number) => {
    const el = itemRefs.current[i];
    if (!el || !rail.current) return;
    rail.current.scrollTo({ left: el.offsetLeft - rail.current.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div>
      <ul
        ref={rail}
        className={cn(
          "no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-1",
          "lg:mx-0 lg:h-[540px] lg:snap-none lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0",
        )}
      >
        {cards.map((card, i) => {
          const on = i === active;
          return (
            <li
              key={card.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-index={i}
              onMouseEnter={() => activateFromPointer(i)}
              onFocusCapture={() => setActive(i)}
              className={cn(
                "relative flex-none basis-[80%] snap-start sm:basis-[46%]",
                "lg:min-w-0 lg:basis-0 lg:transition-[flex-grow] lg:duration-[800ms] lg:ease-[cubic-bezier(0.65,0,0.35,1)]",
                on ? "lg:grow-[2.25]" : "lg:grow",
              )}
            >
              <article className="group relative isolate flex aspect-[4/5] h-full flex-col justify-end overflow-hidden rounded-[22px] bg-ink text-white sm:aspect-[3/4] lg:aspect-auto">
                <Image
                  src={card.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 640px, (min-width: 640px) 46vw, 80vw"
                  style={{ objectPosition: card.image.position }}
                  className={cn(
                    "-z-10 object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)]",
                    on ? "scale-100" : "scale-[1.06]",
                  )}
                />
                <div
                  aria-hidden
                  className={cn(
                    "absolute inset-0 -z-10 bg-gradient-to-t transition-opacity duration-700",
                    "from-ink/85 via-ink/25 to-transparent",
                    on ? "opacity-100" : "opacity-90",
                  )}
                />
                {/* inset hairline frame */}
                <span aria-hidden className="pointer-events-none absolute inset-3 rounded-[16px] border border-white/20" />

                <span className="absolute top-5 left-5 rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-medium text-ink tabular-nums">{card.price}</span>

                <div className="relative p-6 lg:p-7">
                  <span className={cn("inline-flex rounded-full px-3 py-1 text-[10.5px] font-semibold tracking-[0.14em] uppercase transition-colors duration-500", on ? "bg-primary text-white" : "bg-white/15 text-white/90 backdrop-blur")}>
                    {card.label}
                  </span>
                  <h3 className="mt-3 text-[1.35rem] leading-[1.15] font-medium tracking-[-0.01em] lg:text-[1.6rem]">
                    <Link href={card.href} className="outline-none after:absolute after:inset-0 after:z-10 after:rounded-[22px] after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-white">
                      {card.title}
                    </Link>
                  </h3>
                  <div className={cn("grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)]", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0")}>
                    <div className="overflow-hidden">
                      <p className="max-w-[34ch] pt-2 text-[13.5px] leading-snug text-white/80 lg:w-[340px]">{card.subtitle}</p>
                    </div>
                  </div>
                  <span
                    aria-hidden
                    className={cn(
                      "mt-5 inline-flex h-10 items-center gap-2 rounded-full border px-5 text-[13px] font-medium transition-[background-color,color,border-color] duration-500",
                      on ? "border-white bg-white text-ink" : "border-white/50 text-white",
                    )}
                  >
                    Zobraziť <ArrowIcon className="size-4" />
                  </span>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      {/* Carousel position (mobile / tablet) */}
      <div className="mt-5 flex justify-center gap-2 lg:hidden" role="group" aria-label="Posun kariet">
        {cards.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-label={`Zobraziť kartu ${i + 1}: ${c.title}`}
            aria-current={i === active ? "true" : undefined}
            onClick={() => scrollTo(i)}
            className="grid size-8 place-items-center"
          >
            <span className={cn("block h-1.5 rounded-full transition-all duration-500", i === active ? "w-6 bg-primary" : "w-1.5 bg-ink/20")} />
          </button>
        ))}
      </div>
    </div>
  );
}
