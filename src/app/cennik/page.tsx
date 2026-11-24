import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { BOOKIO_VERIFIED_AT, services, type BookioCategory } from "@/data/services";
import { getTreatment, treatmentHref } from "@/data/treatments";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { BookingButton } from "@/components/ui/BookingButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { PriceList } from "@/components/ui/PriceList";
import { ArrowIcon, ArrowUpRightIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Cenník",
  description: "Aktuálny cenník LINA ESTETIKA v Senci — botulotoxín, kyselina hyalurónová, pery, Profhilo, polynukleotidy, biorevitalizácia a Sculptra.",
  path: "/cennik",
});

/** Display names for Bookio categories (Bookio's own names are kept in services.ts). */
const groups: { category: BookioCategory; label: string; anchor: string }[] = [
  { category: "Botulotoxín", label: "Botulotoxín", anchor: "botulotoxin" },
  { category: "Modelácia tváre kyselinou hyalurónovou", label: "Modelácia tváre kyselinou hyalurónovou", anchor: "kyselina-hyaluronova" },
  { category: "Pery", label: "Pery", anchor: "pery" },
  { category: "Profhilo - Bioremodelácia", label: "Profhilo", anchor: "profhilo" },
  { category: "Polynukleotidy (lososie spermie)", label: "Polynukleotidy", anchor: "polynukleotidy" },
  { category: "Bioremodelácia tváre", label: "Biorevitalizácia pleti", anchor: "biorevitalizacia" },
  { category: "Sculptra - nechirurgický lifting", label: "Sculptra", anchor: "sculptra" },
];

export default function PricingPage() {
  const checked = new Date(BOOKIO_VERIFIED_AT).toLocaleDateString("sk-SK", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Domov", href: "/" }, { label: "Cenník" }]}
        eyebrow="Cenník"
        title={
          <>
            Cenník <strong className="font-medium">ošetrení</strong>
          </>
        }
        lead="Prehľad cien všetkých našich ošetrení. Pri online rezervácii si jednoducho vyberiete konkrétnu službu a termín."
      >
        <BookingButton />
      </PageHero>

      <section aria-label="Cenník podľa kategórií" className="section-y pt-10 lg:pt-12">
        <div className="container-site grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-12 lg:gap-y-8">
          {/* Category navigation */}
          <nav aria-label="Kategórie cenníka" className="min-w-0 lg:col-span-3">
            <div className="no-scrollbar -mx-[var(--gutter)] flex snap-x gap-2 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] py-1 lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
              {groups.map((g) => (
                <a key={g.anchor} href={`#${g.anchor}`} className="flex min-h-10 shrink-0 snap-start items-center rounded-full bg-peach-soft px-4 py-2 text-[13px] font-medium text-ink/80 transition-colors hover:bg-peach-100 hover:text-ink lg:rounded-xl lg:bg-transparent lg:py-2.5 lg:text-[14px]">
                  {g.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="min-w-0 space-y-4 sm:space-y-6 lg:col-span-9">
            {groups.map((g) => {
              const items = services.filter((s) => s.bookioCategory === g.category);
              const slugs = [...new Set(items.map((s) => s.treatment))];
              return (
                <Reveal key={g.anchor} as="section" id={g.anchor} aria-labelledby={`${g.anchor}-h`} className="scroll-mt-[calc(var(--header-h)+1rem)] rounded-[22px] bg-white px-4 pt-5 pb-2 ring-1 ring-line sm:p-8">
                  <div className="flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
                    <h2 id={`${g.anchor}-h`} className="type-h3">
                      {g.label}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {slugs.map((slug) => (
                        <Link key={slug} href={treatmentHref(slug)} className="group inline-flex items-center gap-1.5 rounded-full bg-peach-soft px-3 py-1.5 text-[12.5px] font-medium transition-colors hover:bg-peach-100 hover:text-primary">
                          {getTreatment(slug)?.name}
                          <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                  <PriceList items={items} />
                  <a href={siteConfig.bookingUrl} target="_blank" rel="noopener" className="group mb-2 inline-flex min-h-11 items-center gap-2 text-[13px] font-medium text-primary sm:mb-0">
                    Rezervovať termín<span className="sr-only"> (otvorí sa v novom okne)</span>
                    <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Reveal>
              );
            })}

            <Reveal className="rounded-[24px] bg-peach-100 p-6 text-[14px] leading-relaxed text-ink/80 sm:p-8">
              <p>
                <strong className="font-medium text-ink">Cenník platný k {checked}.</strong> Údaj „od“ znamená
                začiatočnú cenu — konečnú cenu vám potvrdíme pred ošetrením. Uvedený čas zodpovedá dĺžke rezervovaného termínu.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title="Vyberte si službu a termín." />
    </>
  );
}
