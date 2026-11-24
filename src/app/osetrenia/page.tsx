import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { TreatmentExplorer } from "@/components/treatments/TreatmentExplorer";
import { CtaBand } from "@/components/ui/CtaBand";

export const metadata = pageMetadata({
  title: "Ošetrenia — estetická medicína Senec",
  description:
    "Prehľad ošetrení LINA ESTETIKA v Senci: botulotoxín, modelácia kyselinou hyalurónovou, pery, Profhilo, polynukleotidy, biorevitalizácia, Sculptra a ošetrenie nadmerného potenia.",
  path: "/osetrenia",
});

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        compact
        crumbs={[{ label: "Domov", href: "/" }, { label: "Ošetrenia" }]}
        eyebrow="Ošetrenia"
        title={
          <>
            Všetky ošetrenia <strong className="font-medium">na jednom mieste.</strong>
          </>
        }
        lead={`Objavte naše ošetrenia tváre, pleti aj tela. Filtrujte podľa kategórie alebo vyhľadajte konkrétne ošetrenie.`}
      />
      <section aria-label="Zoznam ošetrení" className="section-y pt-10 lg:pt-12">
        <div className="container-site">
          <TreatmentExplorer mode="category" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
