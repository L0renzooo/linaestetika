import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { images } from "@/data/images";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { TreatmentExplorer } from "@/components/treatments/TreatmentExplorer";
import { BookingButton } from "@/components/ui/BookingButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CheckIcon } from "@/components/ui/icons";

export const metadata = pageMetadata({
  title: "Estetická medicína pre pánov",
  description:
    "Estetická medicína pre mužov v Senci — zjemnenie mimických vrások, kvalita pleti, ošetrenie nadmerného potenia. Diskrétne, s dôrazom na prirodzený výsledok.",
  path: "/pani",
});

const principles = [
  "Prirodzený výsledok, ktorý nemení váš výraz",
  "Diskrétny a vecný prístup",
  "Rovnaké ošetrenia ako pre dámy — vždy prispôsobené vašim črtám",
];

export default function MenPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Domov", href: "/" }, { label: "Páni" }]}
        eyebrow="Páni"
        title={
          <>
            Svieži vzhľad <strong className="font-medium">bez okázalosti.</strong>
          </>
        }
        lead="Čoraz viac mužov rieši unavený vzhľad, vrásky alebo nadmerné potenie. Pristupujeme k tomu vecne, diskrétne a s dôrazom na to, aby ste po ošetrení vyzerali stále ako vy."
        image={images.manProfile}
      >
        <BookingButton />
      </PageHero>

      <section aria-label="Náš prístup k pánom" className="section-y">
        <div className="container-site grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-peach-100 lg:col-span-5 lg:aspect-[4/5]">
            <Image src={images.manBeard.src} alt={images.manBeard.alt} fill sizes="(min-width: 1024px) 520px, 100vw" style={{ objectPosition: images.manBeard.position }} className="object-cover" />
          </Reveal>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Prístup</Eyebrow>
            <h2 className="type-h2 mt-4">
              Ošetrenia nie sú <strong className="font-medium">len pre ženy.</strong>
            </h2>
            <p className="mt-5 max-w-[520px] text-muted">
              Mužská pleť a mimika majú svoje špecifiká. Rozsah aj techniku preto volíme individuálne — tak, aby výsledok pôsobil prirodzene a neprezrádzal sa.
            </p>
            <ul className="mt-7 space-y-3">
              {principles.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px]">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-peach-100 text-primary">
                    <CheckIcon className="size-4" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pani-osetrenia" className="section-y bg-peach-soft">
        <div className="container-site">
          <SectionHeader
            eyebrow="Ošetrenia"
            id="pani-osetrenia"
            title={
              <>
                Vyberte <strong className="font-medium">oblasť</strong>
              </>
            }
            lead="Všetky ošetrenia sú dostupné pre dámy aj pánov. Vhodný postup vždy preberieme pri konzultácii."
          />
          <div className="mt-10">
            <TreatmentExplorer mode="area" withSearch={false} />
          </div>
        </div>
      </section>

      <CtaBand title="Stačí si vybrať termín." />
    </>
  );
}
