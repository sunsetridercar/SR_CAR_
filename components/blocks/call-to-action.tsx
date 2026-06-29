import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksCta } from "@/tina/__generated__/types";
import { Media } from "@/components/util/media";
import { CtaLink } from "@/components/util/cta-link";
import { Reveal } from "@/components/util/reveal";
import { imageField, linkField } from "@/tina/fields/shared";

export const CallToAction = ({ data, lang }: { data: PageBlocksCta; lang: string }) => {
  const hasImage = !!data.backgroundImage?.src;
  return (
    <section className="dark relative isolate overflow-hidden bg-ink text-cream">
      {hasImage && (
        <>
          <Media
            src={data.backgroundImage?.src}
            alt={data.backgroundImage?.alt}
            sizes="100vw"
            className="absolute inset-0 -z-10 h-full w-full"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink/70" />
        </>
      )}
      <Reveal className="mx-auto max-w-3xl px-5 py-24 text-center sm:px-6 md:py-32">
        {data.eyebrow && (
          <p className="eyebrow text-gold" data-tina-field={tinaField(data, "eyebrow")}>
            {data.eyebrow}
          </p>
        )}
        {data.title && (
          <h2
            className="mt-5 text-4xl md:text-6xl"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h2>
        )}
        {data.text && (
          <p
            className="mx-auto mt-6 max-w-xl text-lg text-cream/80"
            data-tina-field={tinaField(data, "text")}
          >
            {data.text}
          </p>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {data.primaryCta?.label && (
            <span data-tina-field={tinaField(data.primaryCta)}>
              <CtaLink href={data.primaryCta.href} label={data.primaryCta.label} variant={data.primaryCta.variant || "primary"} lang={lang} />
            </span>
          )}
          {data.secondaryCta?.label && (
            <span data-tina-field={tinaField(data.secondaryCta)}>
              <CtaLink href={data.secondaryCta.href} label={data.secondaryCta.label} variant={data.secondaryCta.variant || "outline"} lang={lang} />
            </span>
          )}
        </div>
      </Reveal>
    </section>
  );
};

export const ctaBlockSchema: Template = {
  name: "cta",
  label: "Appel à l'action (CTA)",
  ui: {
    previewSrc: "/blocks/cta.png",
    defaultItem: {
      eyebrow: "Parlons de votre projet",
      title: "Réservez votre voiture de collection",
      text: "Disponibilité, devis et conseils : notre équipe vous répond sous 24h.",
      primaryCta: { label: "Demander un devis", href: "/#contact", variant: "primary" },
      secondaryCta: { label: "+33 6 00 00 00 00", href: "tel:+33600000000", variant: "outline" },
    },
  },
  fields: [
    { type: "string", name: "eyebrow", label: "Sur-titre" },
    { type: "string", name: "title", label: "Titre", required: true },
    { type: "string", name: "text", label: "Texte", ui: { component: "textarea" } },
    imageField("backgroundImage", "Image de fond (optionnelle)", { required: false }),
    linkField("primaryCta", "Bouton principal"),
    linkField("secondaryCta", "Bouton secondaire"),
  ],
};
