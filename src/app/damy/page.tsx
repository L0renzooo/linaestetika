import { pageMetadata } from "@/lib/metadata";
import { images } from "@/data/images";
import { PageHero } from "@/components/layout/PageHero";
import { SignatureSwap } from "@/components/home/SignatureSwap";
import { TreatmentExplorer } from "@/components/treatments/TreatmentExplorer";
import { BookingButton } from "@/components/ui/BookingButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata = pageMetadata({
  title: "Estetická medicína pre dámy",
  description:
    "Ošetrenia pre dámy v Senci — kvalita pleti, hydratácia, pery, očné okolie a jemná modelácia tváre. Individuálny prístup a ceny podľa rezervačného systému Bookio.",
  path: "/damy",
});

export default function WomenPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Domov", href: "/" }, { label: "Dámy" }]}
        eyebrow="Dámy"
        title={
          <>
            Starostlivosť, ktorá <em className="font-extralight text-primary italic">rešpektuje vás.</em>
          </>
        }
        lead="Svieža pleť, jemné kontúry a prirodzený výraz. Ku každej klientke pristupujeme individuálne — s dôrazom na to, čo chcete zvýrazniť aj zachovať."
        image={images.freckles}
      >
        <BookingButton />
      </PageHero>

      <section aria-labelledby="damy-osetrenia" className="section-y">
        <div className="container-site">
          <SectionHeader
            eyebrow="Podľa oblasti"
            id="damy-osetrenia"
            title={
              <>
                Čo by ste chceli <strong className="font-medium">zlepšiť?</strong>
              </>
            }
            lead="Vyberte oblasť — tvár, očné okolie, pery, krk a dekolt, telo alebo ruky."
          />
          <div className="mt-10">
            <TreatmentExplorer mode="area" withSearch={false} />
          </div>
        </div>
      </section>

      <div className="bg-peach-soft">
        <SignatureSwap />
      </div>

      <CtaBand />
    </>
  );
}
