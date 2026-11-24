import { images, type SiteImage } from "./images";
import type { TreatmentSlug } from "./services";

/**
 * LINA SIGNATURE — editorial treatment pathways (not Bookio services).
 * They have no own price; they point to related verified treatments.
 */
export type SignatureConcept = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: SiteImage;
  related: TreatmentSlug[];
};

export const signatureConcepts: SignatureConcept[] = [
  {
    id: "rozziareny-pohlad",
    number: "01",
    title: "Rozžiarený pohľad",
    description:
      "Jemná starostlivosť o očné okolie zameraná na regeneráciu pokožky, zlepšenie jej kvality a sviežejší, oddýchnutejší vzhľad.",
    image: images.eyes,
    related: ["biorevitalizacia", "polynukleotidy", "kyselina-hyaluronova"],
  },
  {
    id: "stavnate-pery",
    number: "02",
    title: "Šťavnaté pery",
    description:
      "Starostlivosť zameraná na hydratáciu, prirodzené kontúry pier a sviežosť ich okolia s dôrazom na harmonický vzhľad.",
    image: images.lips,
    related: ["pery", "kyselina-hyaluronova"],
  },
  {
    id: "krk-dekolt",
    number: "03",
    title: "Sviežosť krku a dekoltu",
    description:
      "Individuálna starostlivosť zameraná na regeneráciu, pružnosť a zlepšenie vzhľadu pokožky krku a dekoltu.",
    image: images.neck,
    related: [],
  },
];
