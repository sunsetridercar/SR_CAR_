import React from "react";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { heading, body, accent } from "./fonts";

import "@/styles.css";
import { TailwindIndicator } from "@/components/ui/breakpoint-indicator";

export const metadata: Metadata = {
  metadataBase: new URL("https://sunset-ride.com"),
  title: {
    default: "Sunset Ride — Location de voitures de collection · Côte d'Azur & Pays Basque",
    template: "%s · Sunset Ride",
  },
  description:
    "Location de voitures de collection sur la Côte d'Azur et au Pays Basque pour vos mariages, événements et shootings. Une flotte de légende, un accompagnement sur-mesure.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Sunset Ride",
    title: "Sunset Ride — Location de voitures de collection",
    description:
      "Voitures de collection pour mariages, événements et shootings — Côte d'Azur & Pays Basque.",
    images: ["/uploads/hero-couple-cobra.webp"],
  },
  icons: {
    icon: "/favicon-32.png",
    apple: "/uploads/logo-sunset-ride.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={cn(heading.variable, body.variable, accent.variable)}
    >
      <body className="min-h-screen bg-background font-body antialiased">
        {children}
        <TailwindIndicator />
      </body>
    </html>
  );
}
