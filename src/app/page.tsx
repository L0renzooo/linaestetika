import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedTreatments } from "@/components/home/FeaturedTreatments";
import { SignatureSwap } from "@/components/home/SignatureSwap";
import { Approach } from "@/components/home/Approach";
import { PricingPreview } from "@/components/home/PricingPreview";
import { Contact } from "@/components/home/Contact";
import { FaceMap } from "@/components/treatments/FaceMap";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * Homepage. Results and reviews are intentionally omitted until approved
 * before/after pairs and verified Bookio/Google reviews exist.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      <section id="mapa" aria-labelledby="mapa-title" className="section-y">
        <div className="container-site">
          <SectionHeader
            eyebrow="Mapa ošetrení"
            id="mapa-title"
            title={
              <>
                Vyberte oblasť, <strong className="font-medium">ktorá vás zaujíma.</strong>
              </>
            }
            lead="Vyberte oblasť, ktorej chcete venovať pozornosť, a objavte možnosti individuálneho ošetrenia."
          />
          <div className="mt-10 lg:mt-12">
            <FaceMap showOffMap />
          </div>
        </div>
      </section>

      <FeaturedTreatments />
      <SignatureSwap />
      <Approach />
      <PricingPreview />
      <Contact />
    </>
  );
}
