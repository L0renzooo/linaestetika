"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState, type FocusEvent as ReactFocusEvent, type KeyboardEvent } from "react";
import { mainNav, treatmentsNav } from "@/data/navigation";
import { BookingButton } from "@/components/ui/BookingButton";
import { Logo } from "@/components/ui/Logo";
import { MobileMenu } from "./MobileMenu";
import { ArrowIcon, ChevronDownIcon } from "@/components/ui/icons";
import { gsap, motion, useGSAP } from "@/components/motion/gsap";
import { cn } from "@/lib/cn";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaId = useId();
  const mobileId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaWrapRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<number | undefined>(undefined);

  // Close menus on navigation (state adjusted during render, as recommended by React).
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes whichever menu is open and returns focus to its trigger.
  useEffect(() => {
    if (!megaOpen && !mobileOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (megaOpen) {
        setMegaOpen(false);
        triggerRef.current?.focus();
      }
      if (mobileOpen) setMobileOpen(false); // MobileMenu restores focus to the trigger
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen, mobileOpen]);

  // Close the mobile menu when the viewport grows to desktop (scroll lock etc. lives in MobileMenu).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const onMq = () => mq.matches && setMobileOpen(false);
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, [mobileOpen]);

  // Mega-menu open/close animation.
  useGSAP(
    () => {
      const panel = megaRef.current;
      if (!panel) return;
      const reduce = window.matchMedia(motion.noMotion).matches;
      if (megaOpen) {
        gsap.set(megaWrapRef.current, { display: "block" });
        if (reduce) {
          gsap.set(panel, { autoAlpha: 1, y: 0 });
          return;
        }
        gsap.fromTo(panel, { autoAlpha: 0, y: -10, clipPath: "inset(0% 0% 12% 0% round 24px)" }, { autoAlpha: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 0.55, ease: motion.easeExpo });
        gsap.fromTo(panel.querySelectorAll("[data-mega-item]"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.025, delay: 0.08, ease: motion.ease });
      } else {
        gsap.to(panel, {
          autoAlpha: 0,
          y: -6,
          duration: reduce ? 0 : 0.25,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(megaWrapRef.current, { display: "none" });
          },
        });
      }
    },
    { dependencies: [megaOpen] },
  );

  const openSoon = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(true), 90);
  }, []);
  const closeSoon = useCallback(() => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setMegaOpen(false), 180);
  }, []);
  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const onTriggerKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setMegaOpen(true);
      window.setTimeout(() => megaRef.current?.querySelector<HTMLAnchorElement>("a")?.focus(), 30);
    }
  };

  const onMegaBlur = (e: ReactFocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (next && (megaRef.current?.contains(next) || triggerRef.current?.contains(next))) return;
    setMegaOpen(false);
  };

  const treatmentsActive = pathname.startsWith("/osetrenia");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        // No backdrop-filter while the mobile drawer is open: it would become the containing block of the fixed drawer.
        mobileOpen
          ? "border-b border-line bg-white"
          : scrolled || megaOpen
            ? "border-b border-line/80 bg-white/92 backdrop-blur-xl"
            : "border-b border-transparent bg-white",
      )}
    >
      <a
        href="#obsah"
        className="sr-only z-[70] rounded-full bg-ink px-4 py-2 text-sm text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Preskočiť na obsah
      </a>

      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href="/" className="-ml-1 flex shrink-0 items-center rounded-md p-1" aria-label="LINA ESTETIKA — domov">
          <Logo priority className="w-[84px] lg:w-[92px]" />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Hlavná navigácia" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.slice(0, 3).map((item) => (
              <NavLink key={item.href} href={item.href} active={isActive(pathname, item.href)} label={item.label} />
            ))}
            <li onMouseEnter={openSoon} onMouseLeave={closeSoon}>
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={megaOpen}
                aria-controls={megaId}
                onClick={() => setMegaOpen((o) => !o)}
                onKeyDown={onTriggerKey}
                className={cn(
                  "group relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-medium transition-colors",
                  megaOpen ? "bg-peach-100 text-ink" : treatmentsActive ? "text-ink" : "text-ink/70 hover:text-ink",
                )}
              >
                {treatmentsNav.label}
                <ChevronDownIcon className={cn("size-3.5 transition-transform duration-300", megaOpen && "rotate-180")} />
                {treatmentsActive && !megaOpen && <ActiveBar />}
              </button>
            </li>
            {mainNav.slice(3).map((item) => (
              <NavLink key={item.href} href={item.href} active={isActive(pathname, item.href)} label={item.label} />
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <BookingButton size="sm" withIcon={false} className="max-[379px]:px-4 max-[379px]:text-[12px]" />
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "relative grid size-10 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500 lg:hidden",
              mobileOpen ? "border-primary bg-primary text-white" : "border-line text-ink",
            )}
            aria-expanded={mobileOpen}
            aria-controls={mobileId}
            aria-label={mobileOpen ? "Zavrieť menu" : "Otvoriť menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span aria-hidden className="relative block h-3 w-[18px]">
              <span className={cn("absolute left-0 top-0 h-[1.5px] w-full origin-center rounded bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]", mobileOpen && "translate-y-[5.25px] rotate-45")} />
              <span className={cn("absolute top-1/2 right-0 h-[1.5px] w-2/3 -translate-y-1/2 rounded bg-current transition-[opacity,transform] duration-300", mobileOpen && "scale-x-0 opacity-0")} />
              <span className={cn("absolute bottom-0 left-0 h-[1.5px] w-full origin-center rounded bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]", mobileOpen && "-translate-y-[5.25px] -rotate-45")} />
            </span>
          </button>
        </div>
      </div>

      {/* Mega-menu (desktop) */}
      <div ref={megaWrapRef} className="absolute inset-x-0 top-full hidden" onMouseEnter={openSoon} onMouseLeave={closeSoon}>
        <div className="container-site pt-2">
          <div
            ref={megaRef}
            id={megaId}
            onBlur={onMegaBlur}
            className="invisible grid grid-cols-12 gap-6 overflow-hidden rounded-[24px] border border-line bg-white p-3 opacity-0 shadow-[0_40px_80px_-40px_rgb(36_36_36/0.35)]"
          >
            <div className="col-span-3 flex flex-col justify-between rounded-[18px] bg-peach-100 p-6" data-mega-item>
              <div>
                <p className="type-eyebrow text-peach-ink">Ošetrenia</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
                  Prirodzené výsledky a starostlivosť prispôsobená práve vašej pleti.
                </p>
              </div>
              <ul className="mt-6 space-y-1.5">
                <li>
                  <Link href="/osetrenia" className="group/l flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium transition-colors hover:text-primary">
                    Všetky ošetrenia
                    <ArrowIcon className="size-4 transition-transform group-hover/l:translate-x-0.5" />
                  </Link>
                </li>
                <li>
                  <Link href="/cennik" className="group/l flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-medium transition-colors hover:text-primary">
                    Cenník
                    <ArrowIcon className="size-4 transition-transform group-hover/l:translate-x-0.5" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-9 grid grid-cols-3 gap-x-6 gap-y-7 py-5 pr-5">
              {treatmentsNav.groups.map((group) => (
                <div key={group.id} data-mega-item>
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-ink/55 uppercase">{group.label}</p>
                  <ul className="mt-2.5 space-y-0.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          aria-current={pathname === link.href ? "page" : undefined}
                          className="group/m -mx-3 block rounded-xl px-3 py-2 transition-colors hover:bg-peach-soft focus-visible:bg-peach-soft"
                        >
                          <span className="flex items-center gap-2 text-[15px] font-medium text-ink transition-colors group-hover/m:text-primary">
                            {link.label}
                            <ArrowIcon className="size-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/m:translate-x-0 group-hover/m:opacity-100" />
                          </span>
                          <span className="mt-0.5 block text-[13px] leading-snug text-muted">{link.summary}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <MobileMenu id={mobileId} open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} triggerRef={toggleRef} />
    </header>
  );
}

function ActiveBar() {
  return <span aria-hidden className="absolute inset-x-4 bottom-1 h-[1.5px] rounded-full bg-primary" />;
}

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn("group relative inline-flex h-10 items-center px-4 text-sm font-medium transition-colors", active ? "text-ink" : "text-ink/70 hover:text-ink")}
      >
        {label}
        <span
          aria-hidden
          className={cn(
            "absolute inset-x-4 bottom-1 h-[1.5px] origin-left rounded-full bg-primary transition-transform duration-500 ease-[var(--ease-out-expo)]",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </Link>
    </li>
  );
}

