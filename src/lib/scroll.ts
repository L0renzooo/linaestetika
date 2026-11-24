import type Lenis from "lenis";

/**
 * Shared scroll helper. When Lenis is active (motion allowed) it is used for
 * programmatic scrolling so the motion stays consistent; otherwise we fall back
 * to native scrolling, which respects reduced-motion preferences.
 */
let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

function headerOffset() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  return Number.parseFloat(value) || 80;
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ScrollOptions = { extraOffset?: number; focus?: boolean };

export function scrollToTarget(target: string | HTMLElement, { extraOffset = 0, focus = true }: ScrollOptions = {}) {
  const el = typeof target === "string" ? document.getElementById(target) : target;
  if (!el) return;

  const offset = -(headerOffset() + extraOffset);

  if (lenisInstance) {
    lenisInstance.scrollTo(el, {
      offset,
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }

  if (focus) {
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
}
