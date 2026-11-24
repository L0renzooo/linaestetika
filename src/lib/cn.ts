/** Tiny className joiner (no dependency needed for this project size). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
