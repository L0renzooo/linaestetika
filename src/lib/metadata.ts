import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Per-route Slovak metadata. Canonical URLs are emitted only once a production domain is configured. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    ...(siteConfig.url ? { alternates: { canonical: path } } : {}),
    openGraph: { type: "website", locale: "sk_SK", siteName: siteConfig.name, title: `${title} | ${siteConfig.name}`, description },
  };
}
