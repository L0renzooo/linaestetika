import Image from "next/image";
import Link from "next/link";
import { categories, treatmentHref, treatmentPrice, type Treatment } from "@/data/treatments";
import { ArrowIcon } from "./icons";
import { cn } from "@/lib/cn";

/** Image-led treatment card used on catalogue, Dámy/Páni and related sections. */
export function TreatmentCard({ treatment, className, sizes }: { treatment: Treatment; className?: string; sizes?: string }) {
  const price = treatmentPrice(treatment.slug);
  const category = categories.find((c) => c.id === treatment.category)?.label;
  return (
    <article className={cn("group relative flex flex-col overflow-hidden rounded-[20px] bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_30px_60px_-36px_rgb(36_36_36/0.45)]", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-peach-100">
        <Image
          src={treatment.image.src}
          alt=""
          fill
          sizes={sizes ?? "(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"}
          style={{ objectPosition: treatment.image.position }}
          className="object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        {price && (
          <span className="absolute top-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-[13px] font-medium tabular-nums backdrop-blur-md">
            {price}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-peach-ink uppercase">{category}</p>
        <h3 className="mt-2 text-[1.1875rem] leading-snug font-medium tracking-[-0.01em]">
          <Link href={treatmentHref(treatment.slug)} className="after:absolute after:inset-0 after:content-['']">
            {treatment.name}
          </Link>
        </h3>
        <p className="mt-2 text-small text-muted">{treatment.summary}</p>
        <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-medium text-ink transition-colors group-hover:text-primary">
          Detail ošetrenia
          <ArrowIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
