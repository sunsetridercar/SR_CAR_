import { Bodoni_Moda, EB_Garamond, Jost } from "next/font/google";

// Direction artistique : Luxe / Classique
// Titres = Bodoni Moda (didone haute-contraste) · Corps = EB Garamond
// Accent / eyebrow / nav = Jost (léger, lettres espacées)
// Auto-hébergées via next/font (RGPD-clean, aucune requête externe).

export const heading = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const body = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const accent = Jost({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
  weight: ["300", "400", "500"],
});
