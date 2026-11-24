/**
 * Editorial photography — stored locally in /public/images/editorial (downloaded 2026-11-24).
 *
 * All photos come from Unsplash under the Unsplash License
 * (https://unsplash.com/license — free commercial use, no attribution required).
 * They are ILLUSTRATIVE only: these people are models, not LINA ESTETIKA clients,
 * staff or treatment results. Replace with the client's own photography when available.
 *
 * Art direction: warm, bright, soft daylight; natural skin; minimal backgrounds.
 */
export type SiteImage = {
  src: string;
  alt: string;
  /** Unsplash photo page — keep for licensing records. */
  source: string;
  /** CSS object-position for art direction. */
  position?: string;
};

const local = (file: string) => `/images/editorial/${file}.jpg`;

export const images = {
  /** Supplied by the client as `3029.jpg` (2000×1333). Licence/source to be confirmed by the client. */
  heroBlonde: {
    src: local("hero-3029"),
    alt: "Portrét usmievavej blondínky s modrými očami a prirodzenou pleťou",
    source: "client-supplied: 3029.jpg",
    position: "52% 35%",
  },
  portraitWoman: {
    src: local("portrait-freckles-peach"),
    alt: "Portrét ženy s prirodzenou pleťou a pehami na broskyňovom pozadí",
    source: "https://unsplash.com/photos/woman-with-auburn-hair-and-freckles-FODRyogbNU0",
    position: "50% 42%",
  },
  neck: {
    src: local("neck-hand"),
    alt: "Detail krku a dekoltu s jemne položenou rukou",
    source: "https://unsplash.com/photos/person-with-gold-ring-on-neck-5KY5LP_zc44",
    position: "50% 60%",
  },
  body: {
    src: local("shoulder-profile"),
    alt: "Profil ženy s rukou pri tvári a odhaleným ramenom",
    source: "https://unsplash.com/photos/a-close-up-of-a-woman-with-her-hand-on-her-face-afCb20VQqL8",
    position: "50% 45%",
  },
  eyes: {
    src: local("eye-closeup"),
    alt: "Detail oka s prirodzenými mihalnicami a pokožkou očného okolia",
    source: "https://unsplash.com/photos/a-close-up-of-a-persons-eye-with-long-lashes-SdStLjkoWXM",
    position: "72% 50%",
  },
  lips: {
    src: local("lips-natural"),
    alt: "Detail prirodzene plných pier na svetlom pozadí",
    source: "https://unsplash.com/photos/a-close-up-of-a-woman-with-long-brown-hair-HpfrqJA1RW8",
    position: "40% 45%",
  },
  lipsSoft: {
    src: local("lips-soft"),
    alt: "Detail pier a nosa v mäkkom svetle",
    source: "https://unsplash.com/photos/a-close-up-of-a-womans-lips-and-nose-iVGmPVoi8Rk",
    position: "50% 55%",
  },
  profile: {
    src: local("profile-ponytail"),
    alt: "Profil ženy s prirodzenou pleťou na svetlom pozadí",
    source: "https://unsplash.com/photos/a-woman-with-a-ponytail-is-posing-for-a-picture-k8AWNNCry-0",
    position: "50% 35%",
  },
  glow: {
    src: local("glow-freckles"),
    alt: "Žena so zatvorenými očami a žiarivou pleťou s pehami",
    source: "https://unsplash.com/photos/a-woman-with-freckles-on-her-face-and-neck-4p6XsMzkTsE",
    position: "50% 35%",
  },
  skinWarm: {
    src: local("eye-blonde-warm"),
    alt: "Detail tváre a očného okolia v teplom zlatistom svetle",
    source: "https://unsplash.com/photos/close-up-of-a-young-womans-eye-and-her-eye-F8IbLlYi51E",
    position: "40% 45%",
  },
  freckles: {
    src: local("freckles-green-eyes"),
    alt: "Detail tváre s prirodzenými pehami a zelenými očami",
    source: "https://unsplash.com/photos/person-with-green-eyes-and-freckles-NXEi84bhtq0",
    position: "50% 40%",
  },
  manProfile: {
    src: local("man-profile"),
    alt: "Muž v bielom tričku zachytený z profilu na svetlom pozadí",
    source: "https://unsplash.com/photos/man-wearing-white-top-mXu1SpzHq6w",
    position: "50% 30%",
  },
  manBeard: {
    src: local("man-beard"),
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
