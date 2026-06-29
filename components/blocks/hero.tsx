import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksHero } from "@/tina/__generated__/types";
import { Media } from "@/components/util/media";
import { CtaLink } from "@/components/util/cta-link";
import { HeroVideo } from "@/components/util/hero-video";
import { imageField, linkField } from "@/tina/fields/shared";

export const Hero = ({ data, lang }: { data: PageBlocksHero; lang: string }) => {
  return (
    <section className="dark relative isolate flex min-h-dvh items-end overflow-hidden bg-ink text-cream">
      {/* Image plein cadre (poster + repli, sert au LCP) */}
      <Media
        src={data.image?.src}
        alt={data.image?.alt}
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
        imgClassName="object-cover"
      />
      {/* Vidéo(s) de fond optionnelle(s) : séquence + fondu enchaîné si deux vidéos */}
      <HeroVideo src1={data.videoSrc} src2={data.videoSrc2} poster={data.image?.src} />
      {/* Dégradé pour la lisibilité du texte */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/10"
      />

      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-6 md:pb-24">
        <div className="max-w-3xl animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
          {data.eyebrow && (
            <p className="eyebrow text-gold" data-tina-field={tinaField(data, "eyebrow")}>
              {data.eyebrow}
            </p>
          )}
          {data.headline && (
            <h1
              className="mt-6 text-5xl font-medium leading-[1.04] sm:text-6xl md:text-7xl"
              data-tina-field={tinaField(data, "headline")}
            >
              {data.headline}
            </h1>
          )}
          {data.subheadline && (
            <p
              className="mt-6 max-w-xl text-lg text-cream/85 md:text-xl"
              data-tina-field={tinaField(data, "subheadline")}
            >
              {data.subheadline}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {data.primaryCta?.label && (
              <span data-tina-field={tinaField(data.primaryCta)}>
                <CtaLink
                  href={data.primaryCta.href}
                  label={data.primaryCta.label}
                  variant={data.primaryCta.variant || "primary"}
                  lang={lang}
                />
              </span>
            )}
            {data.secondaryCta?.label && (
              <span data-tina-field={tinaField(data.secondaryCta)}>
                <CtaLink
                  href={data.secondaryCta.href}
                  label={data.secondaryCta.label}
                  variant={data.secondaryCta.variant || "outline"}
                  lang={lang}
                />
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero (bannière d'accueil)",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      eyebrow: "Côte d'Azur · Pays Basque",
      headline: "Des voitures de légende pour vos plus beaux moments",
      subheadline:
        "Location de voitures de collection pour mariages, événements et shootings, avec un accompagnement sur-mesure.",
      primaryCta: { label: "Demander un devis", href: "/#contact", variant: "primary" },
      secondaryCta: { label: "Voir la flotte", href: "/#prestations", variant: "outline" },
    },
  },
  fields: [
    {
      type: "string",
      name: "eyebrow",
      label: "Sur-titre",
      description: "Court texte au-dessus du titre (ex. la zone géographique).",
    },
    {
      type: "string",
      name: "headline",
      label: "Titre principal",
      required: true,
      description: "Le grand titre d'accroche.",
    },
    {
      type: "string",
      name: "subheadline",
      label: "Sous-titre",
      ui: { component: "textarea" },
    },
    imageField("image", "Image de fond"),
    {
      type: "string",
      name: "videoSrc",
      label: "Vidéo de fond 1 (optionnelle)",
      description:
        "Chemin d'un fichier .mp4 dans public/uploads (ex. /uploads/hero-speed-cote-dazur.mp4). Laissez vide pour n'afficher que l'image. Vidéo muette ; l'image sert d'aperçu (poster).",
    },
    {
      type: "string",
      name: "videoSrc2",
      label: "Vidéo de fond 2 (optionnelle)",
      description:
        "Si renseignée, la 2e vidéo s'enchaîne après la 1re avec un fondu (la dernière seconde de la 1re est coupée), puis la séquence reboucle.",
    },
    linkField("primaryCta", "Bouton principal"),
    linkField("secondaryCta", "Bouton secondaire"),
  ],
};
