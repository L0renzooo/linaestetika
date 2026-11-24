"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { images } from "@/data/images";
import { siteConfig } from "@/config/site";
import { gsap, motion, useGSAP } from "@/components/motion/gsap";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SpecularBookingButton } from "@/components/ui/SpecularBookingButton";
import { buttonClass } from "@/components/ui/buttonStyles";
import { ArrowIcon, CheckIcon, PinIcon } from "@/components/ui/icons";

/**
 * Homepage hero.
 * The editorial portrait is not a card: a CSS mask melts it into the warm
 * peach section background (bottom on mobile, left + bottom on desktop),
 * so the face stays crisp while the edges dissolve.
 * Mobile: portrait first, headline overlaps the faded lower part.
 * Desktop: copy left, portrait right.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.allowMotion, () => {
        // Portrait is never hidden (it is the LCP element) — it only settles in scale/position.
        const tl = gsap.timeline({ defaults: { ease: motion.ease } });
        tl.fromTo("[data-hero-img]", { scale: 1.08, yPercent: 2 }, { scale: 1, yPercent: 0, duration: 1.6, ease: motion.easeExpo }, 0)
          .fromTo("[data-hero-item]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.07, clearProps: "transform" }, 0.35)
          .fromTo("[data-hero-float]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9, clearProps: "transform" }, 0.8);
        gsap.to("[data-hero-img]", { yPercent: 5, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.5 } });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden bg-peach-soft pt-[var(--header-h)]">
      {/* warm ambient light */}
      <div aria-hidden className="pointer-events-none absolute -top-24 right-[-20%] size-[560px] rounded-full bg-peach/40 blur-[100px] lg:right-[-8%] lg:size-[720px]" />

      {/* Portrait layer — intentionally outside the 1300px container: on desktop it runs to the right viewport edge. */}
      <div className="relative lg:absolute lg:top-[var(--header-h)] lg:right-0 lg:bottom-0 lg:left-[32%]">
        <div className="hero-mask relative h-[min(50svh,430px)] min-h-[340px] overflow-hidden sm:h-[min(56svh,520px)] lg:h-full lg:min-h-0">
          <Image
            data-hero-img
            src={images.heroBlonde.src}
            alt={images.heroBlonde.alt}
            fill
            priority
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-cover object-[52%_35%] will-change-transform lg:object-[20%_35%]"
          />
          {/* desktop: very light settle at the bottom edge (no top / right fade) */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[18%] bg-gradient-to-t from-peach-soft/55 to-transparent lg:block" />
        </div>

        <Link
          href="#signature"
          data-hero-float
          data-reveal="self"
          className="group absolute bottom-[14%] left-[22%] hidden max-w-[280px] items-center gap-4 rounded-2xl bg-white/92 p-3 pr-5 shadow-[0_24px_48px_-24px_rgb(36_36_36/0.45)] backdrop-blur-md lg:flex"
        >
          <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
            <Image src={images.eyes.src} alt="" fill sizes="56px" style={{ objectPosition: images.eyes.position }} className="object-cover" />
          </span>
          <span>
            <span className="block text-[11px] font-semibold tracking-[0.14em] text-peach-ink uppercase">LINA Signature</span>
            <span className="mt-0.5 flex items-center gap-1.5 text-[15px] font-medium">
              Rozžiarený pohľad
              <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </span>
        </Link>
      </div>

      <div className="container-site relative grid lg:min-h-[min(calc(100svh-var(--header-h)),760px)] lg:grid-cols-12 lg:items-center">
        {/* Copy */}
        <div className="relative z-10 -mt-16 pb-10 sm:-mt-20 sm:pb-12 lg:col-span-5 lg:mt-0 lg:py-20">
          <div data-hero-item data-reveal="self">
            <Eyebrow>Estetická medicína · Senec</Eyebrow>
          </div>
          <SplitText as="h1" id="hero-title" trigger="load" delay={0.2} className="type-display mt-4 lg:mt-5">
            Krása, ktorá zostáva <em className="font-extralight text-primary italic">prirodzená.</em>
          </SplitText>
          <p data-hero-item data-reveal="self" className="mt-4 max-w-[440px] text-lead text-ink/70 lg:mt-6">
            Moderná estetická starostlivosť s dôrazom na kvalitu pokožky, prirodzené výsledky a individuálny prístup.
          </p>
          <div data-hero-item data-reveal="self" className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-8">
            <SpecularBookingButton className="w-full justify-center sm:w-auto" />
            <Link href="/osetrenia" className={buttonClass("outline", "md", "w-full bg-transparent sm:w-auto")}>
              Prezrieť ošetrenia <ArrowIcon className="size-4" />
            </Link>
          </div>
          <ul data-hero-item data-reveal="self" className="mt-8 grid gap-3 border-t border-peach-line pt-6 text-[13px] text-ink/75 sm:grid-cols-3 lg:mt-10">
            <li className="flex items-center gap-2">
              <CheckIcon className="size-4 text-primary" /> Individuálny prístup
            </li>
            <li className="flex items-center gap-2">
              <CheckIcon className="size-4 text-primary" /> Pre dámy aj pánov
            </li>
            <li className="flex items-center gap-2">
              <PinIcon className="size-4 text-primary" /> {siteConfig.address.street}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
