import Link from "next/link";
import { fullAddress, mapsDirectionsUrl, siteConfig } from "@/config/site";
import { footerNav } from "@/data/navigation";
import { treatmentHref, treatments } from "@/data/treatments";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white">
      <div className="container-site grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <Logo className="w-[96px]" />
          <p className="mt-5 max-w-[34ch] text-small text-muted">
            Estetická medicína v Senci. Individuálna starostlivosť s dôrazom na prirodzený vzhľad.
          </p>
          <a
            href={siteConfig.bookingUrl}
            target="_blank"
            rel="noopener"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-primary px-5 text-[13px] font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {siteConfig.bookingLabel}
            <span className="sr-only"> (Bookio, otvorí sa v novom okne)</span>
          </a>
        </div>

        <nav aria-label="Ošetrenia v pätičke" className="lg:col-span-3">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-ink/60 uppercase">Ošetrenia</p>
          <ul className="mt-3 space-y-0.5">
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link href={treatmentHref(t.slug)} className="inline-flex min-h-9 items-center text-[15px] transition-colors hover:text-primary">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Stránky v pätičke" className="lg:col-span-2">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-ink/60 uppercase">Stránka</p>
          <ul className="mt-3 space-y-0.5">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-9 items-center text-[15px] transition-colors hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-ink/60 uppercase">Navštívte nás</p>
          <address className="mt-3 text-[15px] leading-relaxed not-italic">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.city}, {siteConfig.address.country}
            <br />
            <a href={siteConfig.phone.href} className="hover:text-primary">
              {siteConfig.phone.display}
            </a>
          </address>
          <a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex min-h-9 items-center text-[15px] font-medium underline decoration-ink/25 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
          >
            Zobraziť na mape
            <span className="sr-only"> — {fullAddress} (otvorí sa v novom okne)</span>
          </a>
          <p className="mt-3 text-[15px] text-muted">
            {siteConfig.openingHours[0].days}: {siteConfig.openingHours[0].hours}
          </p>
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-line py-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {siteConfig.name}. Všetky práva vyhradené.
        </p>
        <p>Všeobecné podmienky</p>
      </div>
    </footer>
  );
}
