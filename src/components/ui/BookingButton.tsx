import { siteConfig } from "@/config/site";
import { buttonClass, type ButtonSize, type ButtonVariant } from "./buttonStyles";
import { ArrowUpRightIcon } from "./icons";

type BookingButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  withIcon?: boolean;
  label?: string;
};

/**
 * The ONLY booking action on the site — always the official LINA ESTETIKA
 * Bookio widget (siteConfig.bookingUrl), opened in a new tab.
 */
export function BookingButton({ variant = "primary", size = "md", className, withIcon = true, label }: BookingButtonProps) {
  return (
    <a href={siteConfig.bookingUrl} target="_blank" rel="noopener" className={buttonClass(variant, size, className)}>
      {label ?? siteConfig.bookingLabel}
      <span className="sr-only"> (rezervačný systém Bookio, otvorí sa v novom okne)</span>
      {withIcon && (
        <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      )}
    </a>
  );
}
