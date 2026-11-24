import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { Contact } from "@/components/home/Contact";
import { Reveal } from "@/components/motion/Reveal";
import { Faq } from "@/components/ui/Faq";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata = pageMetadata({
  title: "Kontakt",
  description: "LINA ESTETIKA, Mierové námestie 11, Senec. Rezervácie online cez Bookio, otvorené pondelok – sobota podľa objednávok.",
  path: "/kontakt",
});

const bookingFaq = [
  { q: "Ako si rezervujem termín?", a: "Kliknite na „Rezervovať termín“. Otvorí sa náš rezervačný systém Bookio, kde si vyberiete kategóriu, konkrétnu službu a voľný termín." },
  { q: "Kedy máte otvorené?", a: "Od pondelka do soboty podľa objednávok. Voľné termíny nájdete priamo v rezervačnom systéme." },
  { q: "Neviem, ktoré ošetrenie je pre mňa vhodné.", a: "To je úplne v poriadku. Vhodnosť a rozsah ošetrenia s vami vždy preberieme pred jeho začatím. S otázkami nám môžete aj zavolať." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Domov", href: "/" }, { label: "Kontakt" }]}
        eyebrow="Kontakt"
        title={
          <>
            Navštívte nás <strong className="font-medium">v Senci.</strong>
          </>
        }
        lead="Nájdete nás na Mierovom námestí 11. Termín si rezervujete online — rýchlo a bez telefonovania."
      />
      <Contact id="kontaktne-udaje" />
      <section aria-labelledby="rezervacia-faq" className="section-y pt-0">
        <div className="container-site grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Rezervácia</Eyebrow>
            <h2 id="rezervacia-faq" className="type-h2 mt-4">
              Ako to <strong className="font-medium">funguje</strong>
            </h2>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <Faq items={bookingFaq} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
