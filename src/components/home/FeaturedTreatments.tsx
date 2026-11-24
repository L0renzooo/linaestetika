import Image from "next/image";
import Link from "next/link";
import { images, type SiteImage } from "@/data/images";
import { services } from "@/data/services";
import { categories, treatmentHref, treatments, type CategoryId } from "@/data/treatments";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TextLink } from "@/components/ui/TextLink";
import { ArrowIcon } from "@/components/ui/icons";

const featured: { id: CategoryId; image: SiteImage }[] = [
  { id: "vrasky", image: images.eyes },
  { id: "modelacia", image: images.lips },
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

        <Reveal mode="items" className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4">
          {featured.map(({ id, image }) => {
            const cat = categories.find((c) => c.id === id)!;
            const { items, min } = categoryFrom(id);
            return (
              <article key={id} data-reveal-item className="group relative isolate flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-[22px] bg-ink text-white sm:aspect-[4/5] lg:aspect-[3/4.4]">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                  style={{ objectPosition: image.position }}
                  className="-z-10 object-cover transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                />
                <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[12.5px] font-medium text-ink tabular-nums">od {min} €</span>
                <div className="p-5 lg:p-6">
                  <h3 className="text-[1.3rem] leading-tight font-medium">
                    <Link href={`/osetrenia?kategoria=${id}`} className="after:absolute after:inset-0 after:content-['']">
                      {cat.label}
                    </Link>
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-snug text-white/80">{items.map((t) => t.name).join(" · ")}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[13px] font-medium text-peach">
                    Zobraziť <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            );
          })}
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
