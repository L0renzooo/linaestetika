import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { results } from "@/data/results";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBand } from "@/components/ui/CtaBand";
import { buttonClass } from "@/components/ui/buttonStyles";
import { CheckIcon } from "@/components/ui/icons";

export const metadata = pageMetadata({
  title: "Výsledky",
  description: "Ako pristupujeme k zverejňovaniu výsledkov ošetrení v LINA ESTETIKA — len so súhlasom klientov, bez retuše a bez rozpoznateľných tvárí.",
  path: "/vysledky",
});

const rules = [
  "Zverejňujeme len fotografie so súhlasom klienta.",
  "Fotografie neretušujeme a výsledky neupravujeme.",
  "Porovnania „pred a po“ vždy zobrazujú rovnakú osobu v rovnakých podmienkach.",
  "Chránime súkromie — tváre na fotografiách nie sú rozpoznateľné.",
];

/**
 * Results gallery. `results` is empty until the client provides approved,
 * privacy-safe before/after pairs — no placeholder or stock "results" are shown.
 */
export default function ResultsPage() {
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Domov", href: "/" }, { label: "Výsledky" }]}
        eyebrow="Výsledky"
        title={
          <>
            Výsledky, <strong className="font-medium">ktorým môžete veriť.</strong>
          </>
        }
        lead="Fotografie výsledkov zverejňujeme výhradne so súhlasom klientov a s ohľadom na ich súkromie."
      />
      <section aria-labelledby="pravidla" className="section-y">
        <div className="container-site grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="pravidla" className="type-h2">
              Naše <strong className="font-medium">pravidlá</strong>
            </h2>
            <p className="mt-4 max-w-[420px] text-muted">
              Každý výsledok je individuálny. Preto nechceme ukazovať nič, čo by mohlo vytvárať nereálne očakávania.
            </p>
            <Link href="/osetrenia" className={buttonClass("outline", "md", "mt-7")}>
              Prezrieť ošetrenia
            </Link>
          </Reveal>
          <Reveal as="ul" mode="items" className="grid gap-3 sm:grid-cols-2 lg:col-span-7">
            {rules.map((r) => (
              <li key={r} data-reveal-item className="flex gap-3 rounded-[20px] bg-peach-soft p-5 text-[15px] leading-relaxed ring-1 ring-peach-line">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-white">
                  <CheckIcon className="size-3.5" />
                </span>
                {r}
              </li>
            ))}
          </Reveal>
        </div>
        {results.length > 0 && <div className="container-site mt-12">{/* Gallery renders here once approved results exist. */}</div>}
      </section>
      <CtaBand />
    </>
  );
}
