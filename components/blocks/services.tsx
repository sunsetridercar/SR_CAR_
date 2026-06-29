import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksServices } from "@/tina/__generated__/types";
import { Media } from "@/components/util/media";
import { CtaLink } from "@/components/util/cta-link";
import { SectionShell, toneField } from "@/components/util/section-shell";
import { Reveal } from "@/components/util/reveal";
import { imageField, linkField } from "@/tina/fields/shared";

export const Services = ({ data, lang }: { data: PageBlocksServices; lang: string }) => {
  const items = data.items || [];
  return (
    <SectionShell tone={data.tone} id="prestations" className="scroll-mt-20">
      <Reveal as="header" className="max-w-2xl">
        {data.eyebrow && (
          <p className="eyebrow" data-tina-field={tinaField(data, "eyebrow")}>
            {data.eyebrow}
          </p>
        )}
        {data.title && (
          <h2
            className="mt-4 text-4xl md:text-5xl"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h2>
        )}
        <div className="hairline mt-7 w-24" />
        {data.intro && (
          <p
            className="mt-6 text-lg text-muted-foreground"
            data-tina-field={tinaField(data, "intro")}
          >
            {data.intro}
          </p>
        )}
      </Reveal>

      <div className="mt-16 flex flex-col gap-16 md:gap-24">
        {items.map((item, i) => {
          if (!item) return null;
          const reversed = i % 2 === 1;
          return (
            <Reveal
              as="article"
              key={i}
              data-tina-field={tinaField(item)}
              className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
            >
              <div
                className={`relative ${reversed ? "md:order-2" : ""}`}
                data-tina-field={tinaField(item, "image")}
              >
                <Media
                  src={item.image?.src}
                  alt={item.image?.alt}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="aspect-[4/3] w-full rounded-sm shadow-[0_24px_60px_-30px_rgba(33,28,24,0.5)]"
                />
                <span className="eyebrow absolute -top-3 left-4 bg-sunset px-3 py-1 text-cream">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={reversed ? "md:order-1" : ""}>
                {item.title && (
                  <h3
                    className="text-2xl md:text-3xl"
                    data-tina-field={tinaField(item, "title")}
                  >
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p
                    className="mt-4 text-muted-foreground"
                    data-tina-field={tinaField(item, "description")}
                  >
                    {item.description}
                  </p>
                )}
                {item.cta?.label && (
                  <div className="mt-6" data-tina-field={tinaField(item.cta)}>
                    <CtaLink
                      href={item.cta.href}
                      label={item.cta.label}
                      variant={item.cta.variant || "link"}
                      lang={lang}
                    />
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
};

export const servicesBlockSchema: Template = {
  name: "services",
  label: "Prestations (liste éditoriale)",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      eyebrow: "Nos prestations",
      title: "Une voiture d'exception pour chaque occasion",
      tone: "cream",
      items: [
        {
          title: "Mariages",
          description:
            "Arrivez en grand pour le plus beau jour. Décoration florale, chauffeur en tenue et itinéraire sur-mesure.",
          image: { src: "/uploads/mariage-cobra.jpeg", alt: "Voiture de collection décorée pour un mariage" },
          cta: { label: "En savoir plus", href: "/#contact", variant: "link" },
        },
      ],
    },
  },
  fields: [
    toneField,
    { type: "string", name: "eyebrow", label: "Sur-titre" },
    { type: "string", name: "title", label: "Titre de section", required: true },
    { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
    {
      type: "object",
      name: "items",
      label: "Prestations",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "Prestation" }),
        defaultItem: {
          title: "Nouvelle prestation",
          description: "Décrivez cette prestation.",
          image: { src: "/uploads/galerie-1.webp", alt: "Voiture de collection Sunset Ride" },
          cta: { label: "En savoir plus", href: "/#contact", variant: "link" },
        },
      },
      fields: [
        imageField("image", "Photo"),
        { type: "string", name: "title", label: "Titre", required: true },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        linkField("cta", "Lien (optionnel)"),
      ],
    },
  ],
};
