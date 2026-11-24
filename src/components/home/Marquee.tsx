import Link from "next/link";
import { treatmentHref, treatments } from "@/data/treatments";

/** Slow ticker of the real treatment names (pauses on hover/focus, static for reduced motion). */
export function Marquee() {
  const items = treatments.map((t) => ({ label: t.name, href: treatmentHref(t.slug) }));
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((it) => (
        <li key={it.href + hidden} className="flex items-center">
          <Link href={it.href} tabIndex={hidden ? -1 : undefined} className="px-6 text-[15px] font-extralight whitespace-nowrap text-ink/80 transition-colors hover:text-primary sm:text-[17px]">
            {it.label}
          </Link>
          <span aria-hidden className="size-1.5 rounded-full bg-peach" />
        </li>
      ))}
    </ul>
  );
  return (
    <nav aria-label="Prehľad ošetrení" className="marquee overflow-hidden border-y border-line bg-white py-4">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </nav>
  );
}
