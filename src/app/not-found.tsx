import Link from "next/link";
import { buttonClass } from "@/components/ui/buttonStyles";

export default function NotFound() {
  return (
    <section className="bg-peach-soft pt-[calc(var(--header-h)+4rem)] pb-24">
      <div className="container-site max-w-[720px] text-center">
        <p className="type-eyebrow text-peach-ink">Chyba 404</p>
        <h1 className="type-h2 mt-4">Táto stránka neexistuje.</h1>
        <p className="mt-4 text-muted">Odkaz mohol byť zmenený alebo odstránený. Skúste začať od úvodu alebo prezrite naše ošetrenia.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className={buttonClass("primary")}>
            Na úvod
          </Link>
          <Link href="/osetrenia" className={buttonClass("outline")}>
            Ošetrenia
          </Link>
        </div>
      </div>
    </section>
  );
}
