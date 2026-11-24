import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/config/site";
import { brand } from "@/data/images";
import { BookingButton } from "./BookingButton";
import { Eyebrow } from "./Eyebrow";

/** Closing booking band used at the end of subpages. */
export function CtaBand({ title = "Prvý krok je jednoduchý.", text }: { title?: string; text?: string }) {
  return (
    <section aria-label="Rezervácia" className="section-y pt-0">
      <div className="container-site">
        <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-peach-100 px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
          <Image
            src={brand.logoPeach.src}
            alt=""
            width={brand.logoPeach.width}
            height={brand.logoPeach.height}
            aria-hidden
            className="pointer-events-none absolute -right-10 -bottom-10 -z-10 w-[340px] opacity-60 mix-blend-multiply sm:w-[460px]"
          />
          <Eyebrow>Rezervácia</Eyebrow>
          <h2 className="type-h2 mt-4 max-w-[18ch]">{title}</h2>
          <p className="mt-4 max-w-[52ch] text-muted">
            {text ?? "Vyberte si ošetrenie a voľný termín v našom rezervačnom systéme Bookio. Ak máte otázky, zavolajte nám."}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <BookingButton />
            <a href={siteConfig.phone.href} className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-ink/25 underline-offset-4 hover:text-primary hover:decoration-primary">
              {siteConfig.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
