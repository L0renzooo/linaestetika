import { images, type SiteImage } from "./images";
import { services, startingPrice, type Service, type TreatmentSlug } from "./services";

/* ------------------------------------------------------------------
   Treatment pages — editorial content built on top of the
   Bookio-verified services in ./services.ts.
   Copy is deliberately conservative and should be approved by the
   client / responsible physician before launch.
------------------------------------------------------------------- */

export type CategoryId = "vrasky" | "modelacia" | "regeneracia" | "biostimulacia" | "telo";

export const categories: { id: CategoryId; label: string; description: string }[] = [
  { id: "vrasky", label: "Mimické vrásky", description: "Zjemnenie vrások vznikajúcich pri mimike." },
  { id: "modelacia", label: "Modelácia a objem", description: "Jemné doplnenie objemu a kontúr kyselinou hyalurónovou." },
  { id: "regeneracia", label: "Kvalita a regenerácia pleti", description: "Hydratácia, jas a podpora kvality pokožky." },
  { id: "biostimulacia", label: "Biostimulácia", description: "Postupná podpora vlastného kolagénu." },
  { id: "telo", label: "Telo a ruky", description: "Ošetrenia mimo oblasti tváre." },
];

export type AreaTag = "tvar" | "oci" | "pery" | "dekolt" | "telo" | "ruky";

export const areaTags: { id: AreaTag; label: string }[] = [
  { id: "tvar", label: "Tvár" },
  { id: "oci", label: "Očné okolie" },
  { id: "pery", label: "Pery" },
  { id: "dekolt", label: "Krk a dekolt" },
  { id: "telo", label: "Telo" },
  { id: "ruky", label: "Ruky" },
];

export type Faq = { q: string; a: string };

export type Treatment = {
  slug: TreatmentSlug;
  name: string;
  category: CategoryId;
  areas: AreaTag[];
  audience: ("women" | "men")[];
  image: SiteImage;
  /** One-line summary for cards and menus. */
  summary: string;
  /** Hero lead paragraph. */
  lead: string;
  /** "O ošetrení" paragraphs. */
  about: string[];
  /** "Pre koho môže byť vhodné" — cautious, non-diagnostic statements. */
  suitableFor: string[];
  /** Which special module the page shows. */
  module: "variants" | "face-map" | "body-areas" | "quality";
  /** Face-map zones to show (module "face-map"). */
  zones?: ZoneId[];
  /** Body areas — client-provided, not Bookio (module "body-areas"). */
  bodyAreas?: { label: string; note: string }[];
  /** What the treatment is / is not (module "quality"). */
  focus?: { is: string[]; isNot: string[] };
  faq: Faq[];
  related: TreatmentSlug[];
  signature?: string;
  /** Extra pricing note shown under the price table. */
  priceNote?: string;
};

const both: ("women" | "men")[] = ["women", "men"];

const generalSafetyFaq: Faq = {
  q: "Je ošetrenie vhodné pre každého?",
  a: "Vhodnosť každého ošetrenia posudzujeme individuálne ešte pred jeho začatím. Informujte nás prosím o svojom zdravotnom stave, užívaných liekoch, alergiách a o prípadnom tehotenstve či dojčení.",
};

export const treatments: Treatment[] = [
  {
    slug: "botulotoxin",
    name: "Botulotoxín",
    category: "vrasky",
    areas: ["tvar"],
    audience: both,
    image: images.eyes,
    summary: "Zjemnenie mimických vrások s ohľadom na prirodzený výraz tváre.",
    lead: "Botulotoxín dočasne uvoľňuje vybrané mimické svaly. Vrásky, ktoré vznikajú opakovaným pohybom, sa tak môžu zjemniť a tvár pôsobí oddýchnutejšie — bez toho, aby stratila svoj výraz.",
    about: [
      "Ošetrenie je zamerané na vrásky, ktoré sa prehlbujú pri mimike. Cieľom nie je „zamrznutá“ tvár, ale jemnejší a sviežejší vzhľad, ktorý stále pôsobí ako vy.",
      "Cena závisí od počtu ošetrených oblastí. Ktoré partie sa do jednej oblasti započítavajú a aký rozsah je pre vás vhodný, vám vysvetlíme pri konzultácii ešte pred ošetrením.",
    ],
    suitableFor: [
      "Vrásky vznikajúce pri mimike sú výraznejšie, než by ste si želali.",
      "Chcete zjemniť ich vzhľad a zachovať prirodzený výraz.",
      "Uprednostňujete decentný, postupný prístup.",
    ],
    module: "variants",
    faq: [
      {
        q: "Bude moja tvár po ošetrení pôsobiť strnulo?",
        a: "Naším cieľom je zjemniť vrásky a zachovať prirodzenú mimiku. Rozsah a dávkovanie preto volíme individuálne a s dôrazom na prirodzený výsledok.",
      },
      {
        q: "Čo znamená „1 oblasť“ v cenníku?",
        a: "Cena botulotoxínu závisí od počtu ošetrených oblastí. Čo konkrétne oblasť zahŕňa, vám vysvetlíme pri konzultácii — vždy ešte predtým, ako sa rozhodnete.",
      },
      {
        q: "Kedy sa účinok prejaví?",
        a: "Účinok sa neprejaví okamžite, ale postupne. Čo môžete očakávať vo vašom prípade, s vami preberieme pri konzultácii.",
      },
      {
        q: "Ako dlho účinok pretrváva?",
        a: "Účinok botulotoxínu je dočasný a jeho trvanie je individuálne. Ak budete chcieť ošetrenie zopakovať, dohodneme vhodný termín.",
      },
      generalSafetyFaq,
    ],
    related: ["kyselina-hyaluronova", "profhilo", "nadmerne-potenie"],
  },
  {
    slug: "nadmerne-potenie",
    name: "Ošetrenie nadmerného potenia",
    category: "telo",
    areas: ["telo", "ruky"],
    audience: both,
    image: images.body,
    summary: "Botulotoxín pri nadmernom potení, ktoré vás obmedzuje v bežnom živote.",
    lead: "Nadmerné potenie dokáže byť nepríjemné v práci, pri športe aj v spoločnosti. Botulotoxín môže dočasne obmedziť činnosť potných žliaz v ošetrenej oblasti.",
    about: [
      "Ošetrenie je určené pre tých, ktorých potenie výrazne obmedzuje v každodennom živote. Pred ošetrením s vami preberieme vaše ťažkosti a posúdime, či je pre vás vhodné.",
      "Ošetrenú oblasť a postup vždy určujeme individuálne. Účinok je dočasný.",
    ],
    suitableFor: [
      "Potenie vás obmedzuje v práci, pri športe alebo v spoločnosti.",
      "Hľadáte riešenie pre konkrétnu oblasť tela.",
      "Chcete sa poradiť o vhodnosti ošetrenia.",
    ],
    module: "body-areas",
    bodyAreas: [
      { label: "Podpazušie", note: "podľa konzultácie" },
      { label: "Dlane", note: "podľa konzultácie" },
      { label: "Chodidlá", note: "podľa konzultácie" },
    ],
    faq: [
      {
        q: "Je účinok trvalý?",
        a: "Nie. Účinok botulotoxínu je dočasný a jeho trvanie je individuálne.",
      },
      {
        q: "Ktorú oblasť je možné ošetriť?",
        a: "Najčastejšie ide o podpazušie, dlane alebo chodidlá. Vhodnú oblasť a rozsah ošetrenia vždy určíme pri konzultácii.",
      },
      generalSafetyFaq,
    ],
    related: ["botulotoxin", "profhilo"],
  },
  {
    slug: "kyselina-hyaluronova",
    name: "Modelácia kyselinou hyalurónovou",
    category: "modelacia",
    areas: ["tvar", "oci", "pery"],
    audience: both,
    image: images.portraitWoman,
    summary: "Jemné doplnenie objemu, kontúr a hydratácie vybraných partií tváre.",
    lead: "Kyselina hyalurónová je látka prirodzene prítomná v pokožke. Vo forme gélu ju používame na jemné doplnenie objemu, zvýraznenie kontúr alebo hydratáciu — tak, aby výsledok ladil s vašimi črtami.",
    about: [
      "Každá tvár má iné proporcie. Preto pred ošetrením spoločne preberieme, čo vás trápi, a navrhneme partie aj množstvo, ktoré budú pôsobiť prirodzene.",
      "Súčasťou ponuky je aj rozpustenie kyseliny hyalurónovej — napríklad ak je potrebné upraviť predchádzajúcu výplň.",
    ],
    suitableFor: [
      "Chcete jemne doplniť objem alebo zvýrazniť kontúry tváre.",
      "Želáte si hydratovať pery a ich okolie bez zväčšenia objemu.",
      "Potrebujete upraviť alebo rozpustiť predchádzajúcu výplň.",
    ],
    module: "face-map",
    zones: ["ocne-okolie", "lica", "nazolabialne", "pery", "brada"],
    faq: [
      {
        q: "Bude výsledok pôsobiť prirodzene?",
        a: "To je náš hlavný cieľ. Množstvo a techniku volíme podľa vašich čŕt a uprednostňujeme decentný výsledok.",
      },
      {
        q: "Dá sa výplň upraviť alebo odstrániť?",
        a: "Výplne z kyseliny hyalurónovej je možné v prípade potreby rozpustiť. Táto služba je súčasťou nášho cenníka.",
      },
      {
        q: "Ako dlho výsledok vydrží?",
        a: "Kyselina hyalurónová sa v tele postupne odbúrava, preto je výsledok dočasný. Jeho trvanie je individuálne a závisí aj od ošetrenej partie.",
      },
      {
        q: "Bolí ošetrenie?",
        a: "Vnímanie je veľmi individuálne. Ako bude ošetrenie prebiehať a ako ho urobiť čo najpríjemnejším, vám vysvetlíme ešte pred jeho začatím.",
      },
      generalSafetyFaq,
    ],
    related: ["pery", "botulotoxin", "profhilo"],
    priceNote:
      "Služba „Výplň nazolabiálnych vrások“ je v Bookio momentálne uvedená dvakrát s rozdielnou cenou. Aktuálnu cenu vám potvrdíme pri rezervácii.",
  },
  {
    slug: "pery",
    name: "Modelácia pier",
    category: "modelacia",
    areas: ["pery"],
    audience: both,
    image: images.lips,
    summary: "Prirodzený tvar, symetria a hydratácia pier kyselinou hyalurónovou.",
    lead: "Jemná modelácia pier kyselinou hyalurónovou s dôrazom na prirodzený tvar, symetriu a hydratáciu. Množstvo volíme tak, aby pery ladili s proporciami vašej tváre.",
    about: [
      "Pery sú jednou z najvýraznejších častí tváre. Preto pri ich modelácii postupujeme citlivo — cieľom je harmonický výsledok, nie prehnaný objem.",
      "Ak si neželáte zväčšenie, ponúkame aj hydratáciu pier a ústneho okolia bez zväčšenia objemu.",
    ],
    suitableFor: [
      "Chcete jemne zvýrazniť tvar alebo kontúru pier.",
      "Želáte si vyrovnať drobnú asymetriu.",
      "Vaše pery pôsobia suché a chcete im dodať sviežosť.",
    ],
    module: "variants",
    faq: [
      {
        q: "Aký je rozdiel medzi 0,5 ml a 1 ml?",
        a: "Ide o množstvo použitého gélu. Vhodné množstvo odporučíme podľa tvaru vašich pier a vašich predstáv.",
      },
      {
        q: "Môžem pery len hydratovať bez zväčšenia?",
        a: "Áno. V ponuke je hydratácia pier a ústneho okolia bez zväčšenia objemu pier.",
      },
      {
        q: "Ako dlho výsledok vydrží?",
        a: "Výsledok je dočasný, pretože kyselina hyalurónová sa v tele postupne odbúrava. Trvanie je individuálne.",
      },
      generalSafetyFaq,
    ],
    related: ["kyselina-hyaluronova", "biorevitalizacia"],
    signature: "stavnate-pery",
  },
  {
    slug: "biorevitalizacia",
    name: "Biorevitalizácia pleti",
    category: "regeneracia",
    areas: ["tvar", "oci"],
    audience: both,
    image: images.glow,
    summary: "Hĺbková hydratácia a podpora kvality pleti tváre a očného okolia.",
    lead: "Biorevitalizácia je ošetrenie zamerané na hĺbkovú hydratáciu a podporu kvality pleti. Hodí sa pre pleť, ktorá pôsobí unavene, suchšie alebo stratila svoj jas.",
    about: [
      "Cieľom nie je meniť tvar tváre ani dopĺňať objem, ale podporiť hydratáciu, sviežosť a celkový vzhľad pokožky.",
      "Ošetrenie ponúkame pre celú tvár aj pre jemnú oblasť očného okolia. Počet a frekvenciu ošetrení odporučíme podľa stavu vašej pleti.",
    ],
    suitableFor: [
      "Pleť pôsobí unavene, suchšie alebo bez jasu.",
      "Chcete podporiť kvalitu pleti bez zmeny črt.",
      "Hľadáte jemnú starostlivosť o očné okolie.",
    ],
    module: "quality",
    focus: {
      is: ["Hĺbková hydratácia pleti", "Podpora jasu a sviežosti", "Starostlivosť o celú tvár alebo očné okolie"],
      isNot: ["Doplnenie objemu", "Zmena tvaru tváre či čŕt"],
    },
    faq: [
      {
        q: "Zmení ošetrenie moje črty?",
        a: "Nie. Biorevitalizácia nie je určená na tvarovanie ani doplnenie objemu — zameriava sa na hydratáciu a kvalitu pleti.",
      },
      {
        q: "Koľko ošetrení potrebujem?",
        a: "Počet a odstup ošetrení odporučíme individuálne podľa stavu vašej pleti a vašich cieľov.",
      },
      generalSafetyFaq,
    ],
    related: ["polynukleotidy", "profhilo", "sculptra"],
    signature: "rozziareny-pohlad",
  },
  {
    slug: "polynukleotidy",
    name: "Polynukleotidy",
    category: "regeneracia",
    areas: ["tvar", "oci"],
    audience: both,
    image: images.freckles,
    summary: "Regeneračné ošetrenie na podporu kvality pleti tváre a očného okolia.",
    lead: "Polynukleotidy patria medzi regeneračné ošetrenia estetickej medicíny. Používame ich na podporu kvality pleti celej tváre aj citlivého očného okolia.",
    about: [
      "Polynukleotidy sú získavané z lososej DNA. Ošetrenie sa zameriava na celkovú kvalitu pokožky — nie na zmenu tvaru alebo objemu.",
      "Či je ošetrenie pre vás vhodné a v akom režime ho absolvovať, preberieme pri konzultácii.",
    ],
    suitableFor: [
      "Chcete podporiť kvalitu a vzhľad pleti.",
      "Hľadáte ošetrenie jemnej pokožky očného okolia.",
      "Uprednostňujete regeneračný prístup pred zmenou objemu.",
    ],
    module: "quality",
    focus: {
      is: ["Regeneračná starostlivosť o pleť", "Vhodné aj pre jemné očné okolie", "Zameranie na kvalitu pokožky"],
      isNot: ["Výplň na doplnenie objemu", "Tvarovanie kontúr tváre"],
    },
    faq: [
      {
        q: "V čom sa polynukleotidy líšia od výplní?",
        a: "Výplne dopĺňajú objem alebo tvarujú kontúry. Polynukleotidy sa zameriavajú na kvalitu pleti a nie sú určené na zmenu tvaru.",
      },
      {
        q: "Koľko ošetrení potrebujem?",
        a: "Odporúčaný počet ošetrení je individuálny. Navrhneme ho po zhodnotení stavu vašej pleti.",
      },
      generalSafetyFaq,
    ],
    related: ["biorevitalizacia", "profhilo", "sculptra"],
    signature: "rozziareny-pohlad",
  },
  {
    slug: "profhilo",
    name: "Profhilo",
    category: "regeneracia",
    areas: ["tvar", "ruky"],
    audience: both,
    image: images.skinWarm,
    summary: "Ošetrenie s kyselinou hyalurónovou zamerané na kvalitu a pružnosť pleti.",
    lead: "Profhilo je injekčné ošetrenie s kyselinou hyalurónovou zamerané na kvalitu pleti — jej hydratáciu, pružnosť a celkový vzhľad. Na rozdiel od výplní nie je určené na tvarovanie objemu.",
    about: [
      "V ponuke máme Profhilo, Profhilo Structura a ošetrenie rúk. Ktorý variant je pre vás vhodný, odporučíme pri konzultácii podľa stavu pokožky a vašich cieľov.",
      "Profhilo je vhodnou voľbou, ak chcete pleť osviežiť bez zmeny vašich čŕt.",
    ],
    suitableFor: [
      "Pleť stráca pružnosť a pôsobí menej sviežo.",
      "Chcete podporiť kvalitu pleti bez zmeny tvaru tváre.",
      "Hľadáte starostlivosť aj o pokožku rúk.",
    ],
    module: "variants",
    faq: [
      {
        q: "Je Profhilo výplň?",
        a: "Nie v klasickom zmysle. Profhilo obsahuje kyselinu hyalurónovú, no nie je určené na dopĺňanie objemu, ale na podporu kvality pleti.",
      },
      {
        q: "Aký je rozdiel medzi Profhilo a Profhilo Structura?",
        a: "Ide o dva rozdielne produkty z rovnakej rady. Ktorý z nich je vo vašom prípade vhodnejší, vysvetlíme pri konzultácii.",
      },
      {
        q: "Koľko ošetrení potrebujem?",
        a: "Počet a odstup ošetrení odporučíme individuálne.",
      },
      generalSafetyFaq,
    ],
    related: ["biorevitalizacia", "polynukleotidy", "sculptra"],
  },
  {
    slug: "sculptra",
    name: "Sculptra",
    category: "biostimulacia",
    areas: ["tvar"],
    audience: both,
    image: images.profile,
    summary: "Biostimulačné ošetrenie s postupnou podporou vlastného kolagénu.",
    lead: "Sculptra je biostimulačné ošetrenie, ktoré podporuje vlastnú tvorbu kolagénu v pokožke. Výsledok sa preto neprejaví okamžite, ale postupne — pleť môže pôsobiť pevnejšie a kontúry tváre definovanejšie.",
    about: [
      "Sculptra pracuje s časom: namiesto okamžitej zmeny podporuje prirodzené procesy pokožky. Je preto vhodná pre tých, ktorí uprednostňujú postupný a nenápadný výsledok.",
      "Vhodný plán ošetrení vrátane počtu sedení navrhneme individuálne po konzultácii.",
    ],
    suitableFor: [
      "Pleť postupne stráca pevnosť a kontúry sú menej výrazné.",
      "Uprednostňujete postupný výsledok pred okamžitou zmenou.",
      "Chcete dlhodobo podporiť kvalitu pokožky.",
    ],
    module: "quality",
    focus: {
      is: ["Podpora tvorby vlastného kolagénu", "Postupný, nenápadný výsledok", "Individuálny plán sedení"],
      isNot: ["Okamžitá zmena", "Klasická výplň kyselinou hyalurónovou"],
    },
    faq: [
      {
        q: "Kedy uvidím výsledok?",
        a: "Sculptra pôsobí postupne, pretože podporuje tvorbu vlastného kolagénu. Výsledok sa preto nezobrazí ihneď po ošetrení.",
      },
      {
        q: "Koľko ošetrení je potrebných?",
        a: "Počet sedení je individuálny. Plán ošetrení navrhneme po konzultácii.",
      },
      generalSafetyFaq,
    ],
    related: ["profhilo", "polynukleotidy", "biorevitalizacia"],
  },
];

/* ------------------------------------------------------------------
   Face map — only zones that correspond to named Bookio services.
   Botulotoxín "1–3 oblasti" are intentionally NOT placed on the map.
------------------------------------------------------------------- */

export type ZoneId = "cela-tvar" | "ocne-okolie" | "lica" | "nazolabialne" | "pery" | "brada";

export type Zone = {
  id: ZoneId;
  label: string;
  description: string;
  /** Pin position in % of the face-map frame (calibrated for images.portraitWoman). */
  x: number;
  y: number;
  serviceIds: string[];
};

export const zones: Zone[] = [
  {
    id: "cela-tvar",
    label: "Celá tvár",
    description: "Kvalita, hydratácia a pružnosť pleti celej tváre.",
    x: 70,
    y: 37,
    serviceIds: ["biorevitalizacia-cela-tvar", "pn-cela-tvar", "profhilo-2ml", "profhilo-structura", "sculptra"],
  },
  {
    id: "ocne-okolie",
    label: "Očné okolie",
    description: "Jemná pokožka okolo očí — regenerácia, hydratácia aj modelácia.",
    x: 31,
    y: 50,
    serviceIds: ["biorevitalizacia-ocne-okolie", "pn-ocne-okolie", "ha-ocne-okolie"],
  },
  {
    id: "lica",
    label: "Líca",
    description: "Jemné doplnenie objemu a kontúr líc.",
    x: 66,
    y: 60,
    serviceIds: ["ha-lica"],
  },
  {
    id: "nazolabialne",
    label: "Nazolabiálne vrásky",
    description: "Zjemnenie rýh medzi nosom a kútikmi úst.",
    x: 40,
    y: 64,
    serviceIds: ["ha-nazolabialne-od-170", "ha-nazolabialne-160"],
  },
  {
    id: "pery",
    label: "Pery a ústne okolie",
    description: "Modelácia pier alebo hydratácia bez zväčšenia objemu.",
    x: 50,
    y: 69,
    serviceIds: ["pery-05", "pery-1", "ha-hydratacia-pier"],
  },
  {
    id: "brada",
    label: "Brada",
    description: "Modelácia kontúry brady alebo ošetrenie botulotoxínom.",
    x: 50,
    y: 77,
    serviceIds: ["ha-brada", "botox-brada"],
  },
];

/** Services without a fixed place on the face — listed beside the map. */
export const offMapServiceGroups: { label: string; serviceIds: string[]; slug: TreatmentSlug }[] = [
  { label: "Mimické vrásky — podľa počtu oblastí", serviceIds: ["botox-male-oblasti", "botox-1-oblast", "botox-2-oblasti", "botox-3-oblasti"], slug: "botulotoxin" },
  { label: "Ruky", serviceIds: ["profhilo-ruky"], slug: "profhilo" },
  { label: "Nadmerné potenie", serviceIds: ["potenie"], slug: "nadmerne-potenie" },
];

/* ------------------------------------------------------------------ */

export function getTreatment(slug: string) {
  return treatments.find((t) => t.slug === slug);
}

export function treatmentServices(slug: TreatmentSlug): Service[] {
  return services.filter((s) => s.treatment === slug);
}

export function treatmentPrice(slug: TreatmentSlug) {
  return startingPrice(slug);
}

export function treatmentsByCategory() {
  return categories.map((c) => ({ ...c, items: treatments.filter((t) => t.category === c.id) }));
}

export function treatmentHref(slug: TreatmentSlug) {
  return `/osetrenia/${slug}`;
}

export const zoneById = (id: ZoneId) => zones.find((z) => z.id === id)!;
