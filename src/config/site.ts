/**
 * Central site configuration.
 *
 * bookingUrl — the official LINA ESTETIKA Bookio widget. Every
 * "Rezervovať termín" action on the site reads this single value.
 */
export const siteConfig = {
  name: "LINA ESTETIKA",
  url: "", // production domain, e.g. "https://www.linaestetika.sk" — fill in before launch (enables canonical URLs + sitemap)
  bookingUrl: "https://services.bookio.com/linaestetika/widget?lang=sk",
  bookingLabel: "Rezervovať termín",
  description:
    "Estetická medicína v Senci. Botulotoxín, kyselina hyalurónová, Profhilo, polynukleotidy, Sculptra a biorevitalizácia pleti — s individuálnym prístupom a dôrazom na prirodzený výsledok.",
  address: {
    street: "Mierové námestie 11",
    city: "Senec",
    country: "Slovensko",
    countryCode: "SK",
  },
  openingHours: [{ days: "Pondelok – Sobota", hours: "podľa objednávok" }],
  /** Published in the official Bookio widget header (verified 2026-11-24). Client to confirm for website use. */
  phone: { display: "0952 782 425", href: "tel:+421952782425" },
  email: "", // not available yet
} as const;

export const fullAddress = `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}`;

export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.city}, Slovakia`,
)}`;

export const isBookingConfigured = siteConfig.bookingUrl.trim().length > 0;
