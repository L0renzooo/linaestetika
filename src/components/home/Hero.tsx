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
import { TextLink } from "@/components/ui/TextLink";
import { ArrowIcon, CheckIcon, PinIcon } from "@/components/ui/icons";

/**
 * Homepage hero — peach wash, editorial portrait rising from the section edge,
 * SpecularButton (React Bits) as the single primary booking CTA.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.allowMotion, () => {
        const tl = gsap.timeline({ defaults: { ease: motion.ease } });
        tl.fromTo("[data-hero-item]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09, clearProps: "transform" }, 0.3)
          .fromTo("[data-hero-media]", { clipPath: "inset(18% 0% 0% 0% round 28px 28px 0px 0px)" }, { clipPath: "inset(0% 0% 0% 0% round 28px 28px 0px 0px)", duration: 1.6, ease: motion.easeExpo }, 0.2)
          .fromTo("[data-hero-img]", { scale: 1.14 }, { scale: 1, duration: 2, ease: motion.easeExpo }, 0.2)
          .fromTo("[data-hero-float]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, clearProps: "transform" }, 0.9);
        // Gentle parallax of the portrait while leaving the hero.
        gsap.to("[data-hero-img]", { yPercent: 6, ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.5 } });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden bg-peach-soft pt-[calc(var(--header-h)+2rem)] lg:pt-[calc(var(--header-h)+1rem)]">
      {/* soft peach orb behind the portrait */}
      <div aria-hidden className="pointer-events-none absolute top-24 right-[-10%] size-[620px] rounded-full bg-peach/35 blur-[90px]" />
      <div className="container-site relative grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-end">
        <div className="pb-4 lg:col-span-6 lg:pb-20">
          <div data-hero-item data-reveal="self">
            <Eyebrow>Estetická medicína · Senec</Eyebrow>
          </div>
          <SplitText as="h1" id="hero-title" trigger="load" delay={0.15} className="type-display mt-5">
            Krása, ktorá zostáva <em className="font-extralight text-primary italic">prirodzená.</em>
          </SplitText>
          <p data-hero-item data-reveal="self" className="mt-6 max-w-[470px] text-lead text-ink/70">
            Moderná estetická starostlivosť s dôrazom na kvalitu pokožky, prirodzené výsledky a individuálny prístup.
          </p>
          <div data-hero-item data-reveal="self" className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <SpecularBookingButton />
            <TextLink href="/osetrenia" icon={<ArrowIcon className="size-4" />}>
              Prezrieť ošetrenia
            </TextLink>
          </div>
          <ul data-hero-item data-reveal="self" className="mt-10 grid max-w-[520px] gap-3 border-t border-peach-line pt-6 text-[13px] text-ink/75 sm:grid-cols-3">
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

        <div className="relative lg:col-span-6">
          <div data-hero-media className="relative mx-auto aspect-[4/5] max-h-[640px] w-full overflow-hidden rounded-t-[28px] bg-peach-100 sm:aspect-[5/5] lg:aspect-[4/5]">
            <Image
              data-hero-img
              src={images.glow.src}
              alt={images.glow.alt}
              fill
              priority
              sizes="(min-width: 1024px) 620px, 100vw"
              style={{ objectPosition: images.glow.position }}
              className="object-cover"
            />
          </div>
          <Link
            href="#signature"
            data-hero-float
            data-reveal="self"
            className="group absolute bottom-6 left-4 flex max-w-[280px] items-center gap-4 rounded-2xl bg-white/92 p-3 pr-5 shadow-[0_24px_48px_-24px_rgb(36_36_36/0.45)] backdrop-blur-md sm:left-6 lg:-left-10"
          >
            <span className="relative size-14 shrink-0 overflow-hidden rounded-xl">
              <Image src={images.eyes.src} alt="" fill sizes="56px" className="object-cover" />
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
      </div>
    </section>
  );
}
