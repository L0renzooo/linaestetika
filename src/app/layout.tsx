import type { Metadata, Viewport } from "next";
import "lenis/dist/lenis.css";
import "./globals.css";
import { avantGarde } from "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const title = "LINA ESTETIKA — Estetická medicína Senec";

export const metadata: Metadata = {
  ...(siteConfig.url ? { metadataBase: new URL(siteConfig.url) } : {}),
  title: { default: title, template: "%s | LINA ESTETIKA" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "estetická medicína Senec",
    "estetická medicína",
    "Profhilo Senec",
    "skinbooster",
    "polynukleotidy",
    "Sculptra",
    "botulotoxín",
    "hydratácia pleti",
    "kvalita pokožky",
    "LINA ESTETIKA",
  ],
  openGraph: {
    type: "website",
    locale: "sk_SK",
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: siteConfig.name,
  description: siteConfig.description,
  ...(siteConfig.url ? { url: siteConfig.url } : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressCountry: siteConfig.address.countryCode,
  },
  telephone: siteConfig.phone.display,
  areaServed: ["Senec", "Bratislavský kraj"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sk" className={avantGarde.variable} suppressHydrationWarning>
      <head>
        {/* Marks JS availability before first paint so reveal animations never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        <Header />
        <main id="obsah" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
