import Link from "next/link";
import type { ReactNode, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Understated text link with an animated underline. Internal paths use next/link. */
export function TextLink({
  children,
  className,
  icon,
  href = "#",
  ...rest
}: { children: ReactNode; icon?: ReactNode; href?: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const classes = cn(
    "group/link inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-primary",
    className,
  );
  const inner = (
    <>
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:scale-x-0"
        />
      </span>
      {icon}
    </>
  );
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {inner}
    </a>
  );
}
