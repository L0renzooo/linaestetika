"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import type { SiteImage } from "@/data/images";
import { gsap, motion, useGSAP } from "@/components/motion/gsap";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

export type Crumb = { label: string; href?: string };

/**
 * Compact subpage hero on a peach wash. Optional image on the right.
 * Shared by catalogue, pricing, Dámy/Páni, contact, results and detail pages.
 */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  image,
  children,
  aside,
  compact = false,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  image?: SiteImage;
  children?: ReactNode;
  aside?: ReactNode;
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.allowMotion, () => {
        gsap.fromTo("[data-hero-item]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, delay: 0.2, ease: motion.ease, clearProps: "transform" });
        gsap.fromTo("[data-hero-media]", { clipPath: "inset(8% 8% 8% 8% round 24px)", scale: 1.02 }, { clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1, duration: 1.5, delay: 0.15, ease: motion.easeExpo, clearProps: "clipPath,transform" });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="bg-peach-soft pt-[calc(var(--header-h)+1.25rem)] pb-12 lg:pt-[calc(var(--header-h)+2rem)] lg:pb-16">
      <div className={cn("container-site grid gap-x-12 gap-y-10", Boolean(image || aside) && "lg:grid-cols-12 lg:items-center")}>
        <div className={cn(Boolean(image || aside) && "lg:col-span-6")}>
          <nav aria-label="Omrvinková navigácia" data-hero-item data-reveal="self">
            <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {c.href ? (
                    <Link href={c.href} className="transition-colors hover:text-primary">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-ink">
                      {c.label}
                    </span>
                  )}
                  {i < crumbs.length - 1 && <span aria-hidden>/</span>}
                </li>
              ))}
            </ol>
          </nav>
          {eyebrow && (
            <div data-hero-item data-reveal="self" className="mt-7">
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
          )}
          <SplitText as="h1" trigger="load" delay={0.1} className={cn(compact ? "type-h2 lg:text-[2.75rem]" : "type-display", "mt-4 max-w-[20ch]")}>
            {title}
          </SplitText>
          {lead && (
            <div data-hero-item data-reveal="self" className="mt-5 max-w-[560px] text-lead text-ink/70">
              {lead}
            </div>
          )}
          {children && (
            <div data-hero-item data-reveal="self" className="mt-7">
              {children}
            </div>
          )}
        </div>
        {image && (
          <div className="lg:col-span-6">
            <div data-hero-media className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-peach-100 lg:aspect-[5/4]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 640px, 100vw"
                style={{ objectPosition: image.position }}
                className="object-cover"
              />
            </div>
          </div>
        )}
        {!image && aside && <div className="lg:col-span-6" data-hero-item data-reveal="self">{aside}</div>}
      </div>
    </section>
  );
}
