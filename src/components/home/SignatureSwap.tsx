"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import CardSwap, { Card, type CardSwapHandle } from "@/components/reactbits/CardSwap";
import { signatureConcepts } from "@/data/signature";
import { getTreatment, treatmentHref } from "@/data/treatments";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";

/**
 * LINA SIGNATURE — editorial pathways presented with React Bits' CardSwap.
 * The text list on the left is the accessible source of truth and stays in
 * sync with the card deck (autoplay pauses on hover; arrows/drag also work).
 */
export function SignatureSwap() {
  const [active, setActive] = useState(0);
  const deck = useRef<CardSwapHandle>(null);
  const n = signatureConcepts.length;

  const goTo = (target: number) => {
    const steps = (target - active + n) % n;
    for (let i = 0; i < steps; i++) deck.current?.next();
  };

  return (
    <section id="signature" aria-labelledby="signature-title" className="section-y scroll-mt-[var(--header-h)]">
      <div className="container-site grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>LINA Signature</Eyebrow>
          </Reveal>
          <SplitText as="h2" id="signature-title" className="type-h2 mt-4">
            Individuálna starostlivosť <em className="font-extralight text-primary italic">šitá na mieru</em>
          </SplitText>
          <Reveal>
            <p className="mt-5 max-w-[460px] text-muted">
              Každá pokožka má svoje potreby. Preto ku každému ošetreniu pristupujeme individuálne — s dôrazom na prirodzenosť, rovnováhu a výsledok, ktorý rešpektuje vaše črty.
            </p>
          </Reveal>

          <Reveal as="ol" mode="items" className="mt-8 space-y-2">
            {signatureConcepts.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.id} data-reveal-item>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => goTo(i)}
                    className={cn(
                      "w-full rounded-2xl p-4 text-left transition-[background-color,box-shadow] duration-500 sm:p-5",
                      on ? "bg-peach-100 shadow-[0_16px_40px_-28px_rgb(216_69_87/0.8)]" : "hover:bg-peach-soft",
                    )}
                  >
                    <span className="flex items-baseline gap-3">
                      <span className={cn("text-[12px] font-semibold tabular-nums transition-colors", on ? "text-primary" : "text-ink/45")}>{c.number}</span>
                      <span className="text-[17px] font-medium">{c.title}</span>
                    </span>
                    <span className={cn("grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)]", on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                      <span className="overflow-hidden">
                        <span className="block pt-2 pl-7 text-[14.5px] leading-relaxed text-ink/75">{c.description}</span>
                      </span>
                    </span>
                  </button>
                  {on && (
                    <div className="flex flex-wrap gap-2 pt-2 pl-11">
                      {c.related.length ? (
                        c.related.map((slug) => (
                          <Link key={slug} href={treatmentHref(slug)} className="rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium ring-1 ring-peach-line transition-colors hover:text-primary">
                            {getTreatment(slug)?.name}
                          </Link>
                        ))
                      ) : (
                        <span className="text-[12.5px] text-muted">Postup navrhneme individuálne po konzultácii.</span>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </Reveal>
        </div>

        <Reveal className="relative h-[420px] sm:h-[500px] lg:col-span-7 lg:h-[560px]">
          <div aria-hidden className="absolute inset-[8%] rounded-full bg-peach/30 blur-[70px]" />
          <CardSwap
            ref={deck}
            ariaLabel="LINA Signature — karty"
            width={400}
            height={480}
            cardDistance={56}
            verticalDistance={58}
            depth={90}
            skewAmount={4}
            visibleCards={3}
            delay={5200}
            cardRadius={22}
            theme="light"
            dim={0.25}
            onChange={(i) => setActive(i)}
          >
            {signatureConcepts.map((c) => (
              <Card key={c.id}>
                <Image src={c.image.src} alt={c.image.alt} fill sizes="400px" style={{ objectPosition: c.image.position }} className="pointer-events-none object-cover" draggable={false} />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <p className="type-eyebrow text-peach">{c.number}</p>
                  <p className="mt-1 text-2xl font-medium">{c.title}</p>
                </div>
              </Card>
            ))}
          </CardSwap>
        </Reveal>
      </div>
    </section>
  );
}
