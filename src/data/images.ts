/**
 * Temporary editorial photography.
 *
 * All photos come from Unsplash under the Unsplash License
 * (https://unsplash.com/license — free commercial use, no attribution required).
 * They are ILLUSTRATIVE only: these people are models, not LINA ESTETIKA clients,
 * staff or treatment results. Replace with the client's own photography when available.
 */
export type SiteImage = {
  src: string;
  alt: string;
  /** Unsplash photo page — keep for licensing records. */
  source: string;
  /** CSS object-position for art direction. */
  position?: string;
};

const unsplash = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const images = {
  portraitWoman: {
    src: unsplash("photo-1713207524097-596f3c17afc3"),
    alt: "Portrét ženy s prirodzenou pleťou a pehami na broskyňovom pozadí",
    source: "https://unsplash.com/photos/woman-with-auburn-hair-and-freckles-FODRyogbNU0",
    position: "50% 42%",
  },
  neck: {
    src: unsplash("photo-1561228987-8e7379dde477"),
    alt: "Detail krku a dekoltu so zlatým prsteňom na ruke",
    source: "https://unsplash.com/photos/person-with-gold-ring-on-neck-5KY5LP_zc44",
    position: "50% 55%",
  },
  body: {
    src: unsplash("photo-1679057729092-237f8d329fe3"),
    alt: "Profil ženy s rukou pri tvári a odhaleným ramenom",
    source: "https://unsplash.com/photos/a-close-up-of-a-woman-with-her-hand-on-her-face-afCb20VQqL8",
    position: "50% 45%",
  },
  hands: {
    src: unsplash("photo-1623381981461-c4f24cd4d4f5"),
    alt: "Jemný detail ruky v mäkkom dennom svetle",
    source: "https://unsplash.com/photos/a-close-up-of-a-hand-HHbv5XIj2QA",
    position: "50% 50%",
  },
  portraitMan: {
    src: unsplash("photo-1607613992484-4df4d97b48fe"),
    alt: "Portrét muža s rukou pri tvári",
    source: "https://unsplash.com/photos/topless-man-covering-his-face-with-his-hand-8ft43psAJN8",
    position: "45% 30%",
  },
  eyes: {
    src: unsplash("photo-1516220362602-dba5272034e7"),
    alt: "Detail oka a pokožky v očnom okolí",
    source: "https://unsplash.com/photos/close-up-photo-of-persons-eye-fvInY-Gh7sc",
    position: "50% 50%",
  },
  lips: {
    src: unsplash("photo-1776267034532-99b1f14cda08"),
    alt: "Detail prirodzených pier v teplom svetle",
    source: "https://unsplash.com/photos/young-woman-with-flower-crown-touches-her-lips-with-grass-7mDssWTpBuA",
    position: "50% 60%",
  },
  decollete: {
    src: unsplash("photo-1622014401796-6b22d5ed7d21"),
    alt: "Detail krku, kľúčnej kosti a dekoltu",
    source: "https://unsplash.com/photos/woman-in-black-tank-top-Sfs21Re13BU",
    position: "50% 50%",
  },
  profile: {
    src: unsplash("photo-1643932919088-53349a7c3385"),
    alt: "Profil ženy s prirodzenou pleťou na svetlom pozadí",
    source: "https://unsplash.com/photos/a-woman-with-a-ponytail-is-posing-for-a-picture-k8AWNNCry-0",
    position: "50% 35%",
  },
  glow: {
    src: unsplash("photo-1637851497145-0faa2e456081"),
    alt: "Žena so zatvorenými očami a žiarivou pleťou s pehami",
    source: "https://unsplash.com/photos/a-woman-with-freckles-on-her-face-and-neck-4p6XsMzkTsE",
    position: "50% 35%",
  },
  skinWarm: {
    src: unsplash("photo-1555820585-c5ae44394b79"),
    alt: "Pokojný portrét ženy so zatvorenými očami v teplom svetle",
    source: "https://unsplash.com/photos/woman-portrait-with-closed-eyes-through-glass-KVIlNRoGwxk",
    position: "50% 50%",
  },
  freckles: {
    src: unsplash("photo-1730288951113-9cc087c14b83"),
    alt: "Detail tváre s prirodzenými pehami a zelenými očami",
    source: "https://unsplash.com/photos/person-with-green-eyes-and-freckles-NXEi84bhtq0",
    position: "50% 40%",
  },
  manProfile: {
    src: unsplash("photo-1516914943479-89db7d9ae7f2"),
    alt: "Muž v bielom tričku zachytený z profilu na svetlom pozadí",
    source: "https://unsplash.com/photos/man-wearing-white-top-mXu1SpzHq6w",
    position: "50% 30%",
  },
  manBeard: {
    src: unsplash("photo-1790575546767-f591bf40f6c7"),
    alt: "Usmievavý muž s bradou na svetlom pozadí",
    source: "https://unsplash.com/photos/man-with-beard-in-denim-jacket-xjM2oawHXDw",
    position: "50% 30%",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;

export const brand = {
  logoRed: { src: "/images/brand/lina-logo-red.png", width: 2160, height: 917 },
  logoPeach: { src: "/images/brand/lina-logo-peach.png", width: 2160, height: 917 },
};
