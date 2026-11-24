import { formatDuration, formatPrice, type Service } from "@/data/services";
import { cn } from "@/lib/cn";

/** Verified Bookio price rows. Prices are never typed by hand — always from services.ts. */
export function PriceList({ items, className, showDuration = true, compact = false }: { items: Service[]; className?: string; showDuration?: boolean; compact?: boolean }) {
  return (
    <ul className={cn("divide-y divide-line", className)}>
      {items.map((s) => (
        <li key={s.id} className={cn("flex items-baseline gap-4", compact ? "py-3" : "py-4")}>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] leading-snug font-medium break-words hyphens-auto">{s.name}</span>
            {(showDuration || s.flag) && (
              <span className="mt-0.5 block text-[13px] text-muted">
                {showDuration && <>Termín {formatDuration(s.durationMinutes)}</>}
                {s.flag && <span className="ml-0 block text-[12px] text-peach-ink sm:ml-0">* {s.flag}</span>}
              </span>
            )}
          </span>
          <span aria-hidden className="hidden h-px flex-1 translate-y-[-4px] border-b border-dotted border-ink/20 sm:block" />
          <span className="shrink-0 text-[15px] font-medium whitespace-nowrap tabular-nums">{formatPrice(s)}</span>
        </li>
      ))}
    </ul>
  );
}
