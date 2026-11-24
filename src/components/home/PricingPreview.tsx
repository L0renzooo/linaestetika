import Link from "next/link";
import { getService } from "@/data/services";
import { BOOKIO_VERIFIED_AT } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PriceList } from "@/components/ui/PriceList";
import { buttonClass } from "@/components/ui/buttonStyles";
import { ArrowIcon } from "@/components/ui/icons";

/** Six representative Bookio services — prices come only from services.ts. */
const previewIds = ["botox-1-oblast", "pery-05", "ha-hydratacia-pier", "pn-cela-tvar", "profhilo-2ml", "sculptra"];

export function PricingPreview() {
  const items = previewIds.map(getService);
  const checked = new Date(BOOKIO_VERIFIED_AT).toLocaleDateString("sk-SK", { day: "numeric", month: "numeric", year: "numeric" });
  return (
    <section aria-labelledby="cennik-preview-title" className="section-y">
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              className="lg:block"
              eyebrow="Cenník"
              id="cennik-preview-title"
              title={
                <>
                  Transparentné ceny <strong className="font-medium">už pred návštevou.</strong>
                </>
              }
            />
            <Reveal>
              <p className="mt-5 max-w-[420px] text-muted">
                Ceny vychádzajú priamo z nášho rezervačného systému Bookio. Výber ošetrenia aj rozsah s vami vždy preberieme pred jeho začatím.
              </p>
              <Link href="/cennik" className={buttonClass("outline", "md", "mt-7")}>
                Zobraziť celý cenník <ArrowIcon className="size-4" />
              </Link>
            </Reveal>
          </div>
          <Reveal className="rounded-[24px] bg-peach-100 p-5 sm:p-8 lg:col-span-7">
            <div className="rounded-[18px] bg-white px-5 sm:px-7">
              <PriceList items={items} />
            </div>
            <p className="mt-4 px-1 text-[12.5px] text-peach-ink">Ceny overené v Bookio dňa {checked}.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
