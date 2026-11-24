import { treatmentsByCategory, treatmentHref } from "./treatments";

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Domov", href: "/" },
  { label: "Dámy", href: "/damy" },
  { label: "Páni", href: "/pani" },
  // "Ošetrenia" is rendered separately as the mega-menu trigger
  { label: "Cenník", href: "/cennik" },
  { label: "Kontakt", href: "/kontakt" },
];

export const treatmentsNav = {
  label: "Ošetrenia",
  href: "/osetrenia",
  groups: treatmentsByCategory().map((c) => ({
    id: c.id,
    label: c.label,
    links: c.items.map((t) => ({ label: t.name, href: treatmentHref(t.slug), summary: t.summary })),
  })),
};

export const footerNav: NavItem[] = [
  { label: "Ošetrenia", href: "/osetrenia" },
  { label: "Cenník", href: "/cennik" },
  { label: "Dámy", href: "/damy" },
  { label: "Páni", href: "/pani" },
  { label: "Výsledky", href: "/vysledky" },
  { label: "Kontakt", href: "/kontakt" },
];
