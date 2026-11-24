import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { BOOKIO_VERIFIED_AT, services, type BookioCategory } from "@/data/services";
import { getTreatment, treatmentHref } from "@/data/treatments";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { BookingButton } from "@/components/ui/BookingButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { PriceList } from "@/components/ui/PriceList";
import { ArrowIcon } from "@/components/ui/icons";

export const metadata = pageMetadata({
  title: "Cenník",
  description: "Aktuálny cenník LINA ESTETIKA v Senci podľa rezervačného systému Bookio — botulotoxín, kyselina hyalurónová, pery, Profhilo, polynukleotidy, biorevitalizácia a Sculptra.",
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
        lead="Všetky ceny pochádzajú z nášho rezervačného systému Bookio. Pri rezervácii si vyberiete konkrétnu službu a termín."
      >
        <BookingButton />
      </PageHero>

      <section aria-label="Cenník podľa kategórií" className="section-y pt-10 lg:pt-12">
        <div className="container-site grid gap-x-12 gap-y-8 lg:grid-cols-12">
          {/* Category navigation */}
          <nav aria-label="Kategórie cenníka" className="lg:col-span-3">
            <div className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
              {groups.map((g) => (
                <a key={g.anchor} href={`#${g.anchor}`} className="shrink-0 rounded-full bg-peach-soft px-4 py-2 text-[13px] font-medium text-ink/80 transition-colors hover:bg-peach-100 hover:text-ink lg:rounded-xl lg:bg-transparent lg:py-2.5 lg:text-[14px]">
                  {g.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="space-y-6 lg:col-span-9">
            {groups.map((g) => {
              const items = services.filter((s) => s.bookioCategory === g.category);
              const slugs = [...new Set(items.map((s) => s.treatment))];
              return (
                <Reveal key={g.anchor} as="section" id={g.anchor} aria-labelledby={`${g.anchor}-h`} className="scroll-mt-[calc(var(--header-h)+1rem)] rounded-[24px] bg-white p-5 ring-1 ring-line sm:p-8">
                  <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
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
                </Reveal>
              );
            })}

            <Reveal className="rounded-[24px] bg-peach-100 p-6 text-[14px] leading-relaxed text-ink/80 sm:p-8">
              <p>
                <strong className="font-medium text-ink">Ceny overené v Bookio dňa {checked}.</strong> Údaj „od“ znamená
                začiatočnú cenu — konečnú cenu vám potvrdíme pred ošetrením. Dĺžka uvádza dĺžku rezervovaného termínu.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand title="Vyberte si službu a termín." />
    </>
  );
}
