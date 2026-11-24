import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { formatDuration } from "@/data/services";
import { categories, getTreatment, treatmentPrice, treatmentServices, treatments, type Treatment } from "@/data/treatments";
import { signatureConcepts } from "@/data/signature";
import { pageMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/layout/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { BookingButton } from "@/components/ui/BookingButton";
import { CtaBand } from "@/components/ui/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Faq } from "@/components/ui/Faq";
import { PriceList } from "@/components/ui/PriceList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { buttonClass } from "@/components/ui/buttonStyles";
import { ArrowIcon, CheckIcon, CloseIcon } from "@/components/ui/icons";
import { FaceMap } from "@/components/treatments/FaceMap";
import { ProcessTimeline } from "@/components/treatments/ProcessTimeline";
import { VariantSelector } from "@/components/treatments/VariantSelector";

export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  const price = treatmentPrice(t.slug);
  return pageMetadata({
    title: `${t.name} Senec`,
    description: `${t.summary} ${price ? `Cena ${price}. ` : ""}LINA ESTETIKA, Mierové námestie 11, Senec.`,
    path: `/osetrenia/${t.slug}`,
  });
}

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();

  const items = treatmentServices(t.slug);
  const price = treatmentPrice(t.slug);
  const category = categories.find((c) => c.id === t.category)!;
  const durations = [...new Set(items.map((s) => s.durationMinutes))].sort((a, b) => a - b);
  const durationLabel = durations.length > 1 ? `${formatDuration(durations[0])} – ${formatDuration(durations[durations.length - 1])}` : formatDuration(durations[0]);
  const signature = t.signature ? signatureConcepts.find((s) => s.id === t.signature) : undefined;
  const related = t.related.map((s) => getTreatment(s)).filter((x): x is Treatment => Boolean(x));

  const steps = [
    { title: "Konzultácia", text: "Pred ošetrením sa porozprávame o vašich predstavách, zdravotnom stave a o tom, či je ošetrenie pre vás vhodné." },
    { title: "Ošetrenie", text: "Ošetrenie prebieha v pokojnom prostredí a s dôrazom na váš komfort.", meta: `Dĺžka termínu v Bookio: ${durationLabel}` },
    { title: "Po ošetrení", text: "Dostanete odporúčania, ako sa o ošetrenú oblasť starať. Ak bude potrebné, dohodneme ďalší postup." },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Domov", href: "/" }, { label: "Ošetrenia", href: "/osetrenia" }, { label: t.name }]}
        eyebrow={category.label}
        title={t.name}
        lead={t.lead}
        image={t.image}
      >
        <div className="flex flex-wrap items-center gap-3">
          {price && (
            <span className="inline-flex h-12 items-center rounded-full bg-white px-5 text-[15px] font-medium tabular-nums ring-1 ring-peach-line">
              {price}
            </span>
          )}
          <BookingButton />
          <a href="#cennik" className="inline-flex min-h-11 items-center px-2 text-sm font-medium underline decoration-ink/25 underline-offset-4 hover:text-primary">
            Cenník ošetrenia
          </a>
        </div>
      </PageHero>

      {/* About + suitability */}
      <section aria-labelledby="o-osetreni" className="section-y">
        <div className="container-site grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>O ošetrení</Eyebrow>
            <h2 id="o-osetreni" className="type-h2 mt-4">
              Čo môžete <strong className="font-medium">očakávať</strong>
            </h2>
            <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-ink/80">
              {t.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <div className="rounded-[24px] bg-peach-100 p-6 sm:p-8">
              <h3 className="type-h3">Pre koho môže byť vhodné</h3>
              <ul className="mt-5 space-y-3">
                {t.suitableFor.map((s) => (
                  <li key={s} className="flex gap-3 text-[15px] leading-relaxed">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-white">
                      <CheckIcon className="size-3.5" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[13px] leading-relaxed text-peach-ink">
                Vhodnosť ošetrenia vždy posudzujeme individuálne pri konzultácii.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Treatment-specific module */}
      {t.module === "variants" && (
        <section aria-labelledby="varianty" className="section-y bg-peach-soft">
          <div className="container-site">
            <SectionHeader eyebrow="Varianty" id="varianty" title={<>Vyberte si <strong className="font-medium">rozsah ošetrenia</strong></>} lead="Varianty zodpovedajú službám v našom rezervačnom systéme. Vhodný rozsah s vami preberieme pri konzultácii." />
            <div className="mt-10">
              <VariantSelector items={items} title={t.name} />
            </div>
          </div>
        </section>
      )}

      {t.module === "face-map" && (
        <section aria-labelledby="oblasti" className="section-y bg-peach-soft">
          <div className="container-site">
            <SectionHeader eyebrow="Oblasti" id="oblasti" title={<>Kde môžeme <strong className="font-medium">pomôcť</strong></>} lead="Kliknite na oblasť a zobrazte si súvisiace služby a ceny." />
            <div className="mt-10">
              <FaceMap zoneIds={t.zones} linkTreatments={false} />
            </div>
          </div>
        </section>
      )}

      {t.module === "body-areas" && t.bodyAreas && (
        <section aria-labelledby="oblasti" className="section-y bg-peach-soft">
          <div className="container-site">
            <SectionHeader eyebrow="Oblasti" id="oblasti" title={<>Oblasti <strong className="font-medium">ošetrenia</strong></>} lead="Oblasť a rozsah ošetrenia vždy určujeme individuálne pri konzultácii." />
            <Reveal mode="items" className="mt-10 grid gap-4 sm:grid-cols-3">
              {t.bodyAreas.map((a, i) => (
                <div key={a.label} data-reveal-item className="rounded-[22px] bg-white p-6 ring-1 ring-peach-line">
                  <span className="grid size-10 place-items-center rounded-full bg-peach-100 text-[13px] font-semibold text-peach-ink">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 type-h3">{a.label}</h3>
                  <p className="mt-1 text-small text-muted">{a.note}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {t.module === "quality" && t.focus && (
        <section aria-labelledby="zameranie" className="section-y bg-peach-soft">
          <div className="container-site">
            <SectionHeader eyebrow="Zameranie" id="zameranie" title={<>Čo ošetrenie <strong className="font-medium">je — a čo nie</strong></>} />
            <Reveal mode="items" className="mt-10 grid gap-4 md:grid-cols-2">
              <div data-reveal-item className="rounded-[24px] bg-white p-7 ring-1 ring-peach-line sm:p-9">
                <p className="type-eyebrow text-peach-ink">Zameriava sa na</p>
                <ul className="mt-5 space-y-3">
                  {t.focus.is.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-[16px]">
                      <span className="grid size-7 place-items-center rounded-full bg-primary text-white"><CheckIcon className="size-4" /></span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-reveal-item className="rounded-[24px] bg-peach-100 p-7 sm:p-9">
                <p className="type-eyebrow text-peach-ink">Nie je určené na</p>
                <ul className="mt-5 space-y-3">
                  {t.focus.isNot.map((s) => (
                    <li key={s} className="flex items-center gap-3 text-[16px] text-ink/80">
                      <span className="grid size-7 place-items-center rounded-full bg-white text-ink/60"><CloseIcon className="size-3.5" /></span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Process */}
      <section aria-label="Postup ošetrenia" className="section-y">
        <div className="container-site">
          <ProcessTimeline steps={steps} lead="Typický priebeh návštevy. Presný postup vždy prispôsobujeme vám." />
        </div>
      </section>

      {/* Pricing */}
      <section id="cennik" aria-labelledby="cennik-title" className="section-y scroll-mt-[var(--header-h)] bg-peach-soft">
        <div className="container-site grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Cenník</Eyebrow>
            <h2 id="cennik-title" className="type-h2 mt-4">
              {t.name} <strong className="font-medium">— cenník</strong>
            </h2>
            <p className="mt-4 max-w-[420px] text-muted">Ceny podľa rezervačného systému Bookio. Pri rezervácii si vyberte konkrétnu službu.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <BookingButton />
              <Link href="/cennik" className={buttonClass("outline", "md")}>
                Celý cenník
              </Link>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7">
            <div className="rounded-[24px] bg-white px-5 ring-1 ring-peach-line sm:px-8">
              <PriceList items={items} />
            </div>
            {t.priceNote && <p className="mt-3 px-1 text-[13px] text-peach-ink">{t.priceNote}</p>}
          </Reveal>
        </div>
      </section>

      {/* Signature pathway */}
      {signature && (
        <section aria-label="LINA Signature" className="section-y pb-0">
          <div className="container-site">
            <Reveal className="grid overflow-hidden rounded-[28px] bg-ink text-white md:grid-cols-2">
              <div className="relative min-h-[260px]">
                <Image src={signature.image.src} alt={signature.image.alt} fill sizes="(min-width: 768px) 640px, 100vw" style={{ objectPosition: signature.image.position }} className="object-cover" />
              </div>
              <div className="p-8 sm:p-12">
                <p className="type-eyebrow text-peach">LINA Signature · {signature.number}</p>
                <h2 className="mt-4 text-[1.75rem] leading-tight font-extralight">{signature.title}</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/80">{signature.description}</p>
                <p className="mt-4 text-[13px] text-white/60">Individuálny prístup, nie pevne daný protokol. Postup navrhneme po konzultácii.</p>
                <Link href="/#signature" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-peach hover:text-white">
                  Viac o LINA Signature <ArrowIcon className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="section-y">
        <div className="container-site grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Časté otázky</Eyebrow>
            <h2 id="faq-title" className="type-h2 mt-4">
              Dobré <strong className="font-medium">vedieť</strong>
            </h2>
            <p className="mt-4 max-w-[340px] text-muted">Odpovede majú všeobecný charakter. Konkrétne otázky vám radi zodpovieme pri konzultácii.</p>
          </Reveal>
          <Reveal className="lg:col-span-8">
            <Faq items={t.faq} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="suvisiace" className="section-y pt-0">
          <div className="container-site">
            <SectionHeader eyebrow="Súvisiace ošetrenia" id="suvisiace" title={<>Mohlo by vás <strong className="font-medium">zaujímať</strong></>} />
            <Reveal mode="items" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <div key={r.slug} data-reveal-item>
                  <TreatmentCard treatment={r} />
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand title="Rezervujte si termín online." />
    </>
  );
}

