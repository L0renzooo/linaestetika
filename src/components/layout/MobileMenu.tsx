"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { mainNav, treatmentsNav } from "@/data/navigation";
import { brand } from "@/data/images";
import { siteConfig } from "@/config/site";
import { gsap, motion, useGSAP } from "@/components/motion/gsap";
import { BookingButton } from "@/components/ui/BookingButton";
import { ArrowIcon, ChevronDownIcon } from "@/components/ui/icons";
import { getLenis } from "@/lib/scroll";
import { cn } from "@/lib/cn";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

/**
 * Choreographed mobile navigation (< 1024px).
 *
 * One GSAP timeline is built once and only played / reversed, so rapid taps
 * never stack animations:
 *   1. a peach layer sweeps open from the menu button (clip-path circle)
 *   2. the cream panel follows, slightly delayed (layered depth)
 *   3. nav items rise out of line masks in sequence
 *   4. booking CTA + contact details settle in
 * Closing reverses the same choreography, faster.
 *
 * While open: page content is `inert`, Lenis is stopped, the document can't
 * scroll, Escape closes, focus returns to the trigger.
 */
export function MobileMenu({
  id,
  open,
  onClose,
  pathname,
  triggerRef,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  pathname: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const group = useRef<HTMLDivElement>(null);
  const [groupOpen, setGroupOpen] = useState(false);
  const wasOpen = useRef(false);

  // Collapse the treatments group whenever the menu closes (adjusted during render).
  const [prevOpen, setPrevOpen] = useState(open);
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (!open) setGroupOpen(false);
  }

  // Build the timeline once.
  useGSAP(
    () => {
      const reduce = window.matchMedia(motion.noMotion).matches;
      const t = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });
      t.set(root.current, { autoAlpha: 1 });
      if (reduce) {
        t.set("[data-menu-panel]", { clipPath: "inset(0% 0% 0% 0%)" }).set("[data-menu-peach]", { clipPath: "circle(150% at 92% 0%)" });
      } else {
        t.fromTo("[data-menu-peach]", { clipPath: "circle(0% at 92% 0%)" }, { clipPath: "circle(150% at 92% 0%)", duration: 0.7, ease: "power3.inOut" }, 0)
          .fromTo("[data-menu-panel]", { clipPath: "inset(0% 0% 100% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.65, ease: "power3.inOut" }, 0.12)
          .fromTo("[data-menu-item]", { yPercent: 110 }, { yPercent: 0, duration: 0.7, stagger: 0.045 }, 0.38)
          .fromTo("[data-menu-num]", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.045 }, 0.5)
          .fromTo("[data-menu-rule]", { scaleX: 0 }, { scaleX: 1, duration: 0.8, stagger: 0.045, transformOrigin: "left center" }, 0.42)
          .fromTo("[data-menu-foot]", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06 }, 0.62)
          .fromTo("[data-menu-mark]", { autoAlpha: 0, scale: 0.94 }, { autoAlpha: 1, scale: 1, duration: 1.2 }, 0.5);
      }
      tl.current = t;
      return () => {
        t.kill();
      };
    },
    { scope: root },
  );

  // Play / reverse on state change + side effects (scroll lock, inert, focus).
  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    const lenis = getLenis();
    const main = document.getElementById("obsah");
    const footer = document.querySelector("footer");

    if (open) {
      wasOpen.current = true;
      t.timeScale(1).play();
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      main?.setAttribute("inert", "");
      footer?.setAttribute("inert", "");
      const id = window.setTimeout(() => root.current?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true }), 260);
      return () => window.clearTimeout(id);
    }

    t.timeScale(1.7).reverse();
    lenis?.start();
    document.documentElement.style.overflow = "";
    main?.removeAttribute("inert");
    footer?.removeAttribute("inert");
    if (wasOpen.current) {
      wasOpen.current = false;
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [open, triggerRef]);

  // Treatments accordion.
  useGSAP(
    () => {
      const el = group.current;
      if (!el) return;
      const reduce = window.matchMedia(motion.noMotion).matches;
      gsap.to(el, { height: groupOpen ? "auto" : 0, duration: reduce ? 0 : 0.6, ease: "expo.out" });
      if (groupOpen && !reduce) {
        gsap.fromTo(el.querySelectorAll("[data-sub]"), { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.45, stagger: 0.03, delay: 0.08, ease: motion.ease });
      }
    },
    { dependencies: [groupOpen] },
  );

  const items = [...mainNav.slice(0, 3), { label: "Ošetrenia", href: "__group" }, ...mainNav.slice(3)];

  return (
    <div
      ref={root}
      id={id}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="invisible fixed inset-x-0 top-[var(--header-h)] bottom-0 z-40 opacity-0 lg:hidden"
    >
      <div data-menu-peach aria-hidden className="absolute inset-0 bg-peach" />
      <div data-menu-panel className="absolute inset-0 overflow-hidden bg-peach-soft">
        <Image
          data-menu-mark
          src={brand.logoPeach.src}
          alt=""
          aria-hidden
          width={brand.logoPeach.width}
          height={brand.logoPeach.height}
          className="pointer-events-none absolute -right-16 -bottom-6 w-[320px] opacity-50 mix-blend-multiply"
        />
        <nav aria-label="Mobilná navigácia" data-lenis-prevent className="relative h-full overflow-y-auto overscroll-contain">
          <div className="container-site flex min-h-full flex-col pt-6 pb-8">
            <p className="type-eyebrow text-peach-ink" data-menu-foot>
              Menu
            </p>
            <ul className="mt-3">
              {items.map((item, i) => {
                const num = String(i + 1).padStart(2, "0");
                if (item.href === "__group") {
                  const on = pathname.startsWith("/osetrenia");
                  return (
                    <li key="group" className="relative">
                      <span data-menu-rule aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
                      <div className="overflow-hidden">
                        <button
                          data-menu-item
                          type="button"
                          aria-expanded={groupOpen}
                          aria-controls={`${id}-group`}
                          onClick={() => setGroupOpen((o) => !o)}
                          className={cn("flex min-h-[60px] w-full items-center gap-4 py-2 text-left", on && "text-primary")}
                        >
                          <span data-menu-num className="w-6 text-[11px] font-semibold text-ink/40 tabular-nums">{num}</span>
                          <span className="flex-1 text-[1.625rem] leading-tight font-extralight tracking-[-0.01em]">Ošetrenia</span>
                          <span className={cn("grid size-9 place-items-center rounded-full border border-ink/15 transition-transform duration-500", groupOpen && "rotate-180 border-primary bg-primary text-white")}>
                            <ChevronDownIcon className="size-4" />
                          </span>
                        </button>
                      </div>
                      <div ref={group} id={`${id}-group`} className="h-0 overflow-hidden" inert={!groupOpen}>
                        <div className="mb-4 ml-10 space-y-4 rounded-2xl bg-white/70 p-4 ring-1 ring-peach-line">
                          {treatmentsNav.groups.map((g) => (
                            <div key={g.id} data-sub>
                              <p className="text-[10.5px] font-semibold tracking-[0.14em] text-peach-ink uppercase">{g.label}</p>
                              <ul className="mt-1">
                                {g.links.map((l) => (
                                  <li key={l.href}>
                                    <Link
                                      href={l.href}
                                      onClick={onClose}
                                      aria-current={pathname === l.href ? "page" : undefined}
                                      className={cn("flex min-h-10 items-center text-[15px]", pathname === l.href && "text-primary")}
                                    >
                                      {l.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                          <Link data-sub href="/osetrenia" onClick={onClose} className="flex min-h-10 items-center gap-2 text-[15px] font-medium text-primary">
                            Všetky ošetrenia <ArrowIcon className="size-4" />
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                }
                const on = isActive(pathname, item.href);
                return (
                  <li key={item.href} className="relative">
                    <span data-menu-rule aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-ink/10" />
                    <div className="overflow-hidden">
                      <Link
                        data-menu-item
                        href={item.href}
                        onClick={onClose}
                        aria-current={on ? "page" : undefined}
                        className="group flex min-h-[60px] items-center gap-4 py-2"
                      >
                        <span data-menu-num className={cn("w-6 text-[11px] font-semibold tabular-nums", on ? "text-primary" : "text-ink/40")}>
                          {num}
                        </span>
                        <span className={cn("flex-1 text-[1.625rem] leading-tight tracking-[-0.01em] transition-colors", on ? "font-normal text-primary" : "font-extralight")}>
                          {item.label}
                        </span>
                        <ArrowIcon className="size-4 -translate-x-1 opacity-40 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-auto space-y-4 pt-10">
              <div data-menu-foot>
                <BookingButton className="w-full" />
              </div>
              <div data-menu-foot className="flex items-center justify-between gap-4 text-[13px] text-ink/70">
                <a href={siteConfig.phone.href} className="inline-flex min-h-11 items-center font-medium text-ink">
                  {siteConfig.phone.display}
                </a>
                <span>
                  {siteConfig.address.street}, {siteConfig.address.city}
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
