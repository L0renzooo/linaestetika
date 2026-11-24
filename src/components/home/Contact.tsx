import type { ReactNode } from "react";
import { fullAddress, mapsDirectionsUrl, siteConfig } from "@/config/site";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { BookingButton } from "@/components/ui/BookingButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";
import { buttonClass } from "@/components/ui/buttonStyles";
import { ArrowUpRightIcon, CalendarIcon, ClockIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";

/** Contact + booking block — used on the homepage and /kontakt. */
export function Contact({ headingLevel = "h2", id = "kontakt" }: { headingLevel?: "h1" | "h2"; id?: string }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-y">
      <div className="container-site">
        <Reveal className="grid overflow-hidden rounded-[28px] bg-peach-soft ring-1 ring-peach-line lg:grid-cols-12">
          <div className="p-6 sm:p-10 lg:col-span-7 lg:p-14">
            <Eyebrow>Kontakt</Eyebrow>
            <SplitText as={headingLevel} id={`${id}-title`} className="type-h2 mt-4">
              Tešíme sa <em className="font-extralight text-primary italic">na vás.</em>
            </SplitText>

            <dl className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8">
              <Item icon={<PinIcon className="size-5" />} label="Adresa">
                {siteConfig.name}
                <br />
                {siteConfig.address.street}
                <br />
                {siteConfig.address.city}, {siteConfig.address.country}
              </Item>
              <Item icon={<ClockIcon className="size-5" />} label="Otváracie hodiny">
                {siteConfig.openingHours[0].days}
                <br />
                <span className="text-muted">{siteConfig.openingHours[0].hours}</span>
              </Item>
              <Item icon={<PhoneIcon className="size-5" />} label="Telefón">
                <a href={siteConfig.phone.href} className="underline decoration-ink/20 underline-offset-4 hover:text-primary hover:decoration-primary">
                  {siteConfig.phone.display}
                </a>
              </Item>
              <Item icon={<CalendarIcon className="size-5" />} label="Rezervácie">
                Online cez rezervačný systém Bookio — vyberte si ošetrenie aj termín.
              </Item>
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <BookingButton />
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("outline", "md")}>
                Navigovať
                <span className="sr-only"> na adresu {fullAddress} v Mapách Google (otvorí sa v novom okne)</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            </div>
          </div>

          <div className="relative flex min-h-[260px] flex-col items-center justify-center gap-6 bg-primary p-10 text-center text-white lg:col-span-5 lg:min-h-0">
            <Logo variant="peach" className="w-[180px] sm:w-[220px]" />
            <p className="max-w-[26ch] text-[15px] leading-relaxed text-white/90">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.city}
            </p>
            <span aria-hidden className="absolute inset-4 rounded-[20px] border border-white/15" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Item({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3.5">
      <span className="mt-0.5 shrink-0 text-primary">{icon}</span>
      <div>
        <dt className="text-[11px] font-semibold tracking-[0.14em] text-ink/60 uppercase">{label}</dt>
        <dd className="mt-1.5 text-[15px] leading-relaxed">{children}</dd>
      </div>
    </div>
  );
}
