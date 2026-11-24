import localFont from "next/font/local";

/**
 * ITC Avant Garde Gothic Pro — supplied by the client in /public/fonts.
 * Each file is mapped to its real weight/style; obliques use the true oblique cuts.
 */
export const avantGarde = localFont({
  src: [
    { path: "../../public/fonts/ITC Avant Garde Gothic Pro-XLt.otf", weight: "200", style: "normal" },
    { path: "../../public/fonts/ITC Avant Garde Gothic Pro-XLight Oblique.otf", weight: "200", style: "italic" },
    { path: "../../public/fonts/ITC Avant Garde Gothic Pro-Book.otf", weight: "400", style: "normal" },
    { path: "../../public/fonts/ITC Avant Garde Gothic Pro-Book Oblique.otf", weight: "400", style: "italic" },
    { path: "../../public/fonts/ITC Avant Garde Gothic Pro-Medium.otf", weight: "500", style: "normal" },
    { path: "../../public/fonts/ITC Avant Garde Gothic Pro-Demi.otf", weight: "600", style: "normal" },
    { path: "../../public/fonts/ITC Avant Garde Gothic Pro-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-avant",
  display: "swap",
  preload: true,
  fallback: ["Futura", "Century Gothic", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});
