import Link from "next/link";
import { images, type SiteImage } from "@/data/images";
import { services } from "@/data/services";
import { categories, treatmentHref, treatments, type CategoryId } from "@/data/treatments";
import { Reveal } from "@/components/motion/Reveal";
import { ExpandingCards } from "./ExpandingCards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { ArrowIcon } from "@/components/ui/icons";

const featured: { id: CategoryId; image: SiteImage }[] = [
  { id: "vrasky", image: images.eyes },
  { id: "modelacia", image: images.lipsSoft },
  { id: "regeneracia", image: images.skinWarm },
  { id: "biostimulacia", image: images.profile },
];

function categoryFrom(id: CategoryId) {
  const slugs = treatments.filter((t) => t.category === id).map((t) => t.slug);
  const prices = services.filter((s) => slugs.includes(s.treatment) && !s.notStartingPrice).map((s) => s.price);
  return { items: treatments.filter((t) => t.category === id), min: Math.min(...prices) };
}

/** Tall editorial category cards with verified starting prices. */
export function FeaturedTreatments() {
  const telo = treatments.filter((t) => t.category === "telo");
  return (
    <section aria-labelledby="featured-title" className="section-y bg-peach-soft">
      <div className="container-site">
        <SectionHeader
          eyebrow="Naše ošetrenia"
          id="featured-title"
          title={
            <>
              Starostlivosť <strong className="font-medium">podľa vašich potrieb.</strong>
            </>
          }
          lead="Ošetrenia tváre zamerané na prirodzený vzhľad, kvalitu pleti a jemné kontúry. Konkrétny postup odporučíme vždy individuálne."
          action={<TextLink href="/osetrenia" icon={<ArrowIcon className="size-4" />}>Všetky ošetrenia</TextLink>}
        />

        <Reveal className="mt-10 lg:mt-12">
          <ExpandingCards
            cards={featured.map(({ id, image }) => {
              const cat = categories.find((c) => c.id === id)!;
              const { items, min } = categoryFrom(id);
              return {
                id,
                label: `${items.length} ${items.length === 1 ? "ošetrenie" : "ošetrenia"}`,
                title: cat.label,
                subtitle: items.map((t) => t.name).join(" · "),
                price: `od ${min} €`,
                href: `/osetrenia?kategoria=${id}`,
                image,
              };
            })}
          />
        </Reveal>

        <Reveal className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl bg-white px-5 py-4 text-[14px] ring-1 ring-peach-line">
          <span className="font-medium">Telo a ruky:</span>
          {telo.map((t) => (
            <Link key={t.slug} href={treatmentHref(t.slug)} className="text-ink/80 underline decoration-peach underline-offset-4 hover:text-primary">
              {t.name}
            </Link>
          ))}
          <Link href="/osetrenia/profhilo#cennik" className="text-ink/80 underline decoration-peach underline-offset-4 hover:text-primary">
            Profhilo — ošetrenie rúk
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
