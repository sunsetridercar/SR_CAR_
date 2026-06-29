import React from "react";
import { cn } from "@/lib/utils";
import { Media } from "@/components/util/media";

export type Tone = "cream" | "sand" | "ink";

const toneClass: Record<Tone, string> = {
  cream: "bg-background text-foreground",
  sand: "bg-sand text-ink",
  // `dark` bascule les tokens sémantiques (boutons, bordures) en version sombre
  ink: "dark bg-ink text-cream",
};

interface Props extends React.HTMLAttributes<HTMLElement> {
  // Tina type les champs `options` en `string` : on accepte string et on borne.
  tone?: string | null;
  /** Largeur du contenu : « wide » pour les galeries plein cadre */
  width?: "default" | "wide";
  innerClassName?: string;
  /** Image de fond optionnelle (recouverte d'un voile pour la lisibilité) */
  bgImage?: { src?: string | null; alt?: string | null } | null;
  /** Classe du voile au-dessus de l'image de fond */
  overlayClassName?: string;
}

export function SectionShell({
  tone,
  width = "default",
  className,
  innerClassName,
  bgImage,
  overlayClassName,
  children,
  ...props
}: Props) {
  const toneCls = toneClass[(tone as Tone) || "cream"] ?? toneClass.cream;
  const hasBg = Boolean(bgImage?.src);
  return (
    <section
      className={cn(
        toneCls,
        hasBg && "relative isolate overflow-hidden",
        "px-5 sm:px-6",
        className
      )}
      {...props}
    >
      {hasBg && (
        <>
          <Media
            src={bgImage!.src}
            alt={bgImage!.alt}
            sizes="100vw"
            className="absolute inset-0 -z-10 h-full w-full"
          />
          <div
            aria-hidden
            className={cn("absolute inset-0 -z-10", overlayClassName || "bg-ink/85")}
          />
        </>
      )}
      <div
        className={cn(
          "mx-auto py-20 md:py-28",
          width === "wide" ? "max-w-[88rem]" : "max-w-6xl",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

/** Champ Tina partagé : tonalité de fond (variantes on-brand uniquement) */
export const toneField = {
  type: "string" as const,
  name: "tone",
  label: "Fond de la section",
  description: "Choisissez une ambiance dans la charte (pas de couleur libre).",
  options: [
    { label: "Crème (clair)", value: "cream" },
    { label: "Sable", value: "sand" },
    { label: "Encre (sombre)", value: "ink" },
  ],
};
