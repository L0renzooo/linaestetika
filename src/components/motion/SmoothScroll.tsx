"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";
import { getLenis, scrollToTarget, setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling driven by GSAP's ticker (single RAF loop) and
 * synced with ScrollTrigger. Disabled for reduced-motion users; touch
 * devices keep native scrolling (syncTouch: false).
 *
 * Also handles:
 * - same-page anchor links (offset for the fixed header)
 * - route changes (reset scroll / jump to hash, refresh ScrollTrigger)
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      if (lenis || reduce.matches) return;
      lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        anchors: false,
        // Let nested scroll areas (menus, lists) scroll natively.
        prevent: (node) => node.closest?.("[data-lenis-prevent]") !== null,
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      tick = null;
      lenis?.destroy();
      lenis = null;
      setLenis(null);
      gsap.ticker.lagSmoothing(500, 33);
    };

    const onPreferenceChange = () => (reduce.matches ? stop() : start());

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>("a[href*='#']");
      if (!link || link.target === "_blank") return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const id = decodeURIComponent(url.hash.slice(1));
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      scrollToTarget(target);
      history.pushState(null, "", `#${id}`);
    };

    start();
    reduce.addEventListener("change", onPreferenceChange);
    document.addEventListener("click", onClick);

    return () => {
      reduce.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("click", onClick);
      stop();
    };
  }, []);

  // Route change: reset scroll (or go to hash) and re-measure triggers.
  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    const lenis = getLenis();
    if (!hash) lenis?.scrollTo(0, { immediate: true, force: true });
    const id = window.setTimeout(() => {
      ScrollTrigger.refresh();
      if (hash) {
        const target = document.getElementById(hash);
        if (target) scrollToTarget(target, { focus: false });
      }
    }, 120);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
