"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { areaTags, categories, treatments, type AreaTag, type CategoryId } from "@/data/treatments";
import { services } from "@/data/services";
import { signatureConcepts } from "@/data/signature";
import { gsap, motion, useGSAP } from "@/components/motion/gsap";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { BookingButton } from "@/components/ui/BookingButton";
import { SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Filter = { kind: "all" } | { kind: "category"; id: CategoryId } | { kind: "area"; id: AreaTag };

const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/**
 * Catalogue explorer used on /osetrenia, /damy and /pani.
 * One data source (treatments + Bookio services); filter by category or area, plus text search.
 */
export function TreatmentExplorer({ mode = "category", withSearch = true }: { mode?: "category" | "area"; withSearch?: boolean }) {
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [query, setQuery] = useState("");
  const grid = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return treatments.filter((t) => {
      if (filter.kind === "category" && t.category !== filter.id) return false;
      if (filter.kind === "area" && !t.areas.includes(filter.id)) return false;
      if (!q) return true;
      const hay = normalize([t.name, t.summary, ...services.filter((s) => s.treatment === t.slug).map((s) => s.name)].join(" "));
      return hay.includes(q);
    });
  }, [filter, query]);

  // Pre-filter from the URL (?kategoria=… or ?oblast=…), e.g. links from homepage cards.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("kategoria");
    const area = params.get("oblast");
    // Reading the URL (an external system) once after hydration keeps the page statically prerendered.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (cat && categories.some((c) => c.id === cat)) setFilter({ kind: "category", id: cat as CategoryId });
    else if (area && areaTags.some((a) => a.id === area)) setFilter({ kind: "area", id: area as AreaTag });
  }, []);

  const q = normalize(query.trim());
  const showNeckPathway = (filter.kind === "area" && filter.id === "dekolt") || (q.length >= 3 && ["krk", "dekolt"].some((w) => w.startsWith(q) || q.includes(w)));
  const neck = signatureConcepts.find((s) => s.id === "krk-dekolt")!;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(motion.allowMotion, () => {
        gsap.fromTo(grid.current?.children ?? [], { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05, ease: motion.ease, clearProps: "transform" });
      });
    },
    { dependencies: [filter, results.length], scope: grid },
  );

  const chips: { key: string; label: string; f: Filter }[] = [
    { key: "all", label: "Všetky", f: { kind: "all" } },
    ...(mode === "category"
      ? categories.map((c) => ({ key: c.id, label: c.label, f: { kind: "category", id: c.id } as Filter }))
      : areaTags.map((a) => ({ key: a.id, label: a.label, f: { kind: "area", id: a.id } as Filter }))),
  ];
  const isOn = (f: Filter) => f.kind === filter.kind && (f.kind === "all" || ("id" in f && "id" in filter && f.id === filter.id));

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label={mode === "category" ? "Filtrovať podľa kategórie" : "Filtrovať podľa oblasti"} className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] py-1 lg:mx-0 lg:flex-wrap lg:px-0">
          {chips.map((c) => {
            const on = isOn(c.f);
            return (
              <button
                key={c.key}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(c.f)}
                className={cn(
                  "h-10 shrink-0 rounded-full px-4 text-[13px] font-medium transition-[background-color,color,box-shadow] duration-300",
                  on ? "bg-primary text-white shadow-[0_8px_20px_-10px_rgb(216_69_87/0.9)]" : "bg-white text-ink/75 ring-1 ring-line hover:bg-peach-soft hover:text-ink",
                )}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        {withSearch && (
          <label className="relative flex w-full items-center lg:w-[300px]">
            <span className="sr-only">Hľadať ošetrenie</span>
            <SearchIcon className="pointer-events-none absolute left-4 size-4 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Hľadať, napr. pery, Profhilo…"
              className="h-11 w-full rounded-full bg-white pr-4 pl-11 text-[14px] ring-1 ring-line transition-shadow outline-none placeholder:text-muted focus:ring-2 focus:ring-primary/50"
            />
          </label>
        )}
      </div>

      <p className="mt-4 text-[13px] text-muted" aria-live="polite">
        {results.length === 1 ? "1 ošetrenie" : results.length >= 2 && results.length <= 4 ? `${results.length} ošetrenia` : `${results.length} ošetrení`}
      </p>

      <div ref={grid} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((t) => (
          <TreatmentCard key={t.slug} treatment={t} />
        ))}
        {showNeckPathway && (
          <article className="relative flex flex-col overflow-hidden rounded-[20px] bg-peach-100 sm:col-span-2 lg:col-span-1">
            <div className="relative aspect-[4/3]">
              <Image src={neck.image.src} alt="" fill sizes="(min-width: 1024px) 400px, 100vw" style={{ objectPosition: neck.image.position }} className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-peach-ink uppercase">LINA Signature</p>
              <h3 className="mt-2 text-[1.1875rem] font-medium">{neck.title}</h3>
              <p className="mt-2 text-small text-ink/75">{neck.description}</p>
              <p className="mt-3 text-[13px] text-ink/70">Starostlivosť o krk a dekolt vždy prispôsobujeme individuálne — vhodný postup navrhneme pri konzultácii.</p>
              <div className="mt-auto pt-5">
                <BookingButton size="sm" />
              </div>
            </div>
          </article>
        )}
      </div>

      {results.length === 0 && !showNeckPathway && (
        <div className="mt-2 rounded-[20px] bg-peach-soft p-8 text-center">
          <p className="font-medium">Nenašli sme žiadne ošetrenie.</p>
          <p className="mt-1 text-small text-muted">Skúste iný výraz alebo zrušte filter.</p>
          <button type="button" onClick={() => { setFilter({ kind: "all" }); setQuery(""); }} className="mt-4 text-sm font-medium text-primary underline underline-offset-4">
            Zobraziť všetky ošetrenia
          </button>
        </div>
      )}
    </div>
  );
}
