/**
 * Bookio-verified service catalogue — the ONLY source of prices on the website.
 *
 * Source: https://services.bookio.com/linaestetika/widget?lang=sk (public widget)
 * Verified: 2026-11-24 — see docs/bookio-service-audit.md
 *
 * `bookioName` is the exact text shown in Bookio (incl. its typos).
 * `name` is the corrected display name used on the website.
 * Never add a price here that is not visible in Bookio.
 */

export const BOOKIO_VERIFIED_AT = "2026-11-24";
export const BOOKIO_SOURCE = "https://services.bookio.com/linaestetika/widget?lang=sk";

export type BookioCategory =
  | "Bioremodelácia tváre"
  | "Botulotoxín"
  | "Modelácia tváre kyselinou hyalurónovou"
  | "Pery"
  | "Polynukleotidy (lososie spermie)"
  | "Profhilo - Bioremodelácia"
  | "Sculptra - nechirurgický lifting";

export type Service = {
  id: string;
  bookioName: string;
  name: string;
  bookioCategory: BookioCategory;
  /** Treatment page this service belongs to. */
  treatment: TreatmentSlug;
  price: number;
  currency: "EUR";
  /** "od" = Bookio shows a starting price. */
  qualifier?: "od";
  durationMinutes: number;
  /** Short neutral note shown under the name (optional). */
  note?: string;
  /** Exclude from "od X €" starting prices (e.g. corrective services like HA dissolving). */
  notStartingPrice?: true;
  /** Unresolved data question to show/handle carefully. */
  flag?: string;
  verified: true;
  verifiedAt: string;
};

export type TreatmentSlug =
  | "botulotoxin"
  | "nadmerne-potenie"
  | "kyselina-hyaluronova"
  | "pery"
  | "biorevitalizacia"
  | "polynukleotidy"
  | "profhilo"
  | "sculptra";

const v = { currency: "EUR" as const, verified: true as const, verifiedAt: BOOKIO_VERIFIED_AT };

export const services: Service[] = [
  // Bioremodelácia tváre
  { ...v, id: "biorevitalizacia-ocne-okolie", bookioName: "Biorevitalizácia očného okolia (20min.)", name: "Biorevitalizácia očného okolia", bookioCategory: "Bioremodelácia tváre", treatment: "biorevitalizacia", price: 160, qualifier: "od", durationMinutes: 20 },
  { ...v, id: "biorevitalizacia-cela-tvar", bookioName: "Hĺbková biorevitálizácia celej tváre 2,5ml (30min.)", name: "Hĺbková biorevitalizácia celej tváre 2,5 ml", bookioCategory: "Bioremodelácia tváre", treatment: "biorevitalizacia", price: 180, durationMinutes: 30 },

  // Botulotoxín
  { ...v, id: "botox-1-oblast", bookioName: "Botulotoxín 1 oblasť (10min.)", name: "Botulotoxín — 1 oblasť", bookioCategory: "Botulotoxín", treatment: "botulotoxin", price: 90, durationMinutes: 10 },
  { ...v, id: "botox-2-oblasti", bookioName: "Botulotoxín 2 oblasti (20min.)", name: "Botulotoxín — 2 oblasti", bookioCategory: "Botulotoxín", treatment: "botulotoxin", price: 150, durationMinutes: 20 },
  { ...v, id: "botox-3-oblasti", bookioName: "Botulotoxín 3 oblasti (20min.)", name: "Botulotoxín — 3 oblasti", bookioCategory: "Botulotoxín", treatment: "botulotoxin", price: 200, durationMinutes: 20 },
  { ...v, id: "botox-male-oblasti", bookioName: "Botulotoxín malé oblasti (10min.)", name: "Botulotoxín — malé oblasti", bookioCategory: "Botulotoxín", treatment: "botulotoxin", price: 45, durationMinutes: 10 },
  { ...v, id: "botox-brada", bookioName: "Botulotoxín ošetrenie brady (10min.)", name: "Botulotoxín — ošetrenie brady", bookioCategory: "Botulotoxín", treatment: "botulotoxin", price: 160, durationMinutes: 10 },
  { ...v, id: "potenie", bookioName: "Ošetrenie nadmerného potenia (30min.)", name: "Ošetrenie nadmerného potenia", bookioCategory: "Botulotoxín", treatment: "nadmerne-potenie", price: 280, durationMinutes: 30 },

  // Modelácia tváre kyselinou hyalurónovou
  { ...v, id: "ha-hydratacia-pier", bookioName: "Hydratácia pier a ústeho okolia bez zväčšenia objemu pier (20min.)", name: "Hydratácia pier a ústneho okolia bez zväčšenia objemu", bookioCategory: "Modelácia tváre kyselinou hyalurónovou", treatment: "kyselina-hyaluronova", price: 130, durationMinutes: 20 },
  { ...v, id: "ha-brada", bookioName: "Modelácia brady kyselinou hyalurónovou (20min.)", name: "Modelácia brady", bookioCategory: "Modelácia tváre kyselinou hyalurónovou", treatment: "kyselina-hyaluronova", price: 140, durationMinutes: 20 },
  { ...v, id: "ha-lica", bookioName: "Modelácia líc kyselinou hyalurónovou (30min.)", name: "Modelácia líc", bookioCategory: "Modelácia tváre kyselinou hyalurónovou", treatment: "kyselina-hyaluronova", price: 189, durationMinutes: 30 },
  { ...v, id: "ha-ocne-okolie", bookioName: "Modelácia očného okolia kyselinou hyalurónovou (20min.)", name: "Modelácia očného okolia", bookioCategory: "Modelácia tváre kyselinou hyalurónovou", treatment: "kyselina-hyaluronova", price: 220, durationMinutes: 20 },
  { ...v, id: "ha-rozpustenie", bookioName: "Rozpustenie kyseliny hyalurónovej (20min.)", name: "Rozpustenie kyseliny hyalurónovej", bookioCategory: "Modelácia tváre kyselinou hyalurónovou", treatment: "kyselina-hyaluronova", price: 65, durationMinutes: 20, notStartingPrice: true },
  { ...v, id: "ha-nazolabialne-od-170", bookioName: "Výplň nazolabiálnych vrások kyselinou hyalurónovou (20min.)", name: "Výplň nazolabiálnych vrások", bookioCategory: "Modelácia tváre kyselinou hyalurónovou", treatment: "kyselina-hyaluronova", price: 170, qualifier: "od", durationMinutes: 20, flag: "Bookio uvádza túto službu dvakrát (od 170 € a 160 €) — čaká na potvrdenie." },
  { ...v, id: "ha-nazolabialne-160", bookioName: "Výplň nazolabiálnych vrások kyselinou hyalurónovou (20min.)", name: "Výplň nazolabiálnych vrások", bookioCategory: "Modelácia tváre kyselinou hyalurónovou", treatment: "kyselina-hyaluronova", price: 160, durationMinutes: 20, flag: "Bookio uvádza túto službu dvakrát (od 170 € a 160 €) — čaká na potvrdenie." },

  // Pery
  { ...v, id: "pery-05", bookioName: "Modelácia pier kyselinou hyalurónovou 0,5ml (30min.)", name: "Modelácia pier 0,5 ml", bookioCategory: "Pery", treatment: "pery", price: 89, durationMinutes: 30 },
  { ...v, id: "pery-1", bookioName: "Modelácia pier kyselinou hyalurónovou 1 ml (30min.)", name: "Modelácia pier 1 ml", bookioCategory: "Pery", treatment: "pery", price: 150, durationMinutes: 30 },

  // Polynukleotidy
  { ...v, id: "pn-cela-tvar", bookioName: "Polynukleotidy - celá tvár 2ml (30min.)", name: "Polynukleotidy — celá tvár 2 ml", bookioCategory: "Polynukleotidy (lososie spermie)", treatment: "polynukleotidy", price: 180, durationMinutes: 30 },
  { ...v, id: "pn-ocne-okolie", bookioName: "Polynukleotidy - očné okolie (20min.)", name: "Polynukleotidy — očné okolie", bookioCategory: "Polynukleotidy (lososie spermie)", treatment: "polynukleotidy", price: 180, durationMinutes: 20 },

  // Profhilo
  { ...v, id: "profhilo-2ml", bookioName: "Profhilo 2 ml (20min.)", name: "Profhilo 2 ml", bookioCategory: "Profhilo - Bioremodelácia", treatment: "profhilo", price: 220, durationMinutes: 20 },
  { ...v, id: "profhilo-structura", bookioName: "Profhilo Structura 2ml (20min.)", name: "Profhilo Structura 2 ml", bookioCategory: "Profhilo - Bioremodelácia", treatment: "profhilo", price: 280, durationMinutes: 20 },
  { ...v, id: "profhilo-ruky", bookioName: "Profhilo - ošetrenie rúk (30min.)", name: "Profhilo — ošetrenie rúk", bookioCategory: "Profhilo - Bioremodelácia", treatment: "profhilo", price: 190, durationMinutes: 30 },

  // Sculptra
  { ...v, id: "sculptra", bookioName: "Sculptra (1h)", name: "Sculptra", bookioCategory: "Sculptra - nechirurgický lifting", treatment: "sculptra", price: 550, durationMinutes: 60 },
];

/* ------------------------------------------------------------------ */

const fmt = new Intl.NumberFormat("sk-SK", { maximumFractionDigits: 0 });

export function formatPrice(service: Pick<Service, "price" | "qualifier">) {
  return `${service.qualifier ? "od " : ""}${fmt.format(service.price)} €`;
}

export function formatDuration(minutes: number) {
  if (minutes >= 60 && minutes % 60 === 0) return `${minutes / 60} h`;
  return `${minutes} min`;
}

export function getService(id: string) {
  const s = services.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown service id: ${id}`);
  return s;
}

export function servicesFor(slug: TreatmentSlug) {
  return services.filter((s) => s.treatment === slug);
}

/** Lowest price across a treatment's services → "od X €" label. */
export function startingPrice(slug: TreatmentSlug) {
  const all = servicesFor(slug);
  if (!all.length) return null;
  const list = all.filter((s) => !s.notStartingPrice);
  const min = Math.min(...list.map((s) => s.price));
  const single = list.length === 1 && !list[0].qualifier;
  return single ? `${fmt.format(min)} €` : `od ${fmt.format(min)} €`;
}
