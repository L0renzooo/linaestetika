"use client";

import { siteConfig } from "@/config/site";
import SpecularButton from "@/components/reactbits/SpecularButton";
import { ArrowUpRightIcon } from "./icons";

/**
 * Hero-only primary CTA built on React Bits' SpecularButton.
 * A soft peach/white specular rim follows the pointer; the button itself
 * stays solid brand coral with white text. Used once per page (one WebGL context).
 */
export function SpecularBookingButton({ className }: { className?: string }) {
  return (
    <SpecularButton
      href={siteConfig.bookingUrl}
      target="_blank"
      rel="noopener"
      size="md"
      radius={999}
      tint="#d84557"
      tintOpacity={1}
      textColor="#ffffff"
      lineColor="#ffe4d4"
      baseColor="#e9727f"
      idleIntensity={0.45}
      intensity={1}
      thickness={1.4}
      glow={0.6}
      proximity={180}
      className={`h-12 !px-6 !text-sm hover:brightness-[0.97] ${className ?? ""}`}
    >
      {siteConfig.bookingLabel}
      <span className="sr-only"> (rezervačný systém Bookio, otvorí sa v novom okne)</span>
      <ArrowUpRightIcon className="size-4" />
    </SpecularButton>
  );
}
