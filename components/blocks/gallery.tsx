import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksGallery } from "@/tina/__generated__/types";
import { Media } from "@/components/util/media";
import { SectionShell, toneField } from "@/components/util/section-shell";
import { Reveal } from "@/components/util/reveal";

export const Gallery = ({ data }: { data: PageBlocksGallery }) => {
  const images = data.images || [];
  return (
    <SectionShell tone={data.tone} width="wide" id="galerie" className="scroll-mt-20">
      <Reveal as="header" className="mx-auto max-w-2xl text-center">
        {data.eyebrow && (
          <p className="eyebrow" data-tina-field={tinaField(data, "eyebrow")}>
            {data.eyebrow}
          </p>
        )}
        {data.title && (
          <h2 className="mt-4 text-4xl md:text-5xl" data-tina-field={tinaField(data, "title")}>
            {data.title}
          </h2>
        )}
        {data.intro && (
          <p
            className="mt-6 text-lg text-muted-foreground"
            data-tina-field={tinaField(data, "intro")}
          >
            {data.intro}
          </p>
        )}
      </Reveal>

      {/* Mosaïque éditoriale (colonnes CSS + ratios alternés pour le rythme) */}
      <div className="mt-14 gap-4 sm:columns-2 lg:columns-3">
        {images.map((img, i) => {
          if (!img) return null;
          const ratios = ["aspect-[4/5]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]"];
          return (
            <Reveal
              as="figure"
              key={i}
              delay={(i % 3) * 80}
              data-tina-field={tinaField(img)}
              className="group mb-4 break-inside-avoid overflow-hidden rounded-sm"
            >
              <Media
                src={img.src}
                alt={img.alt}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={`${ratios[i % ratios.length]} w-full`}
                imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
};

export const galleryBlockSchema: Template = {
  name: "gallery",
  label: "Galerie photos",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      eyebrow: "Galerie",
      title: "Instants Sunset Ride",
      tone: "sand",
    },
  },
  fields: [
    toneField,
    { type: "string", name: "eyebrow", label: "Sur-titre" },
    { type: "string", name: "title", label: "Titre de section", required: true },
    { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
    {
      type: "object",
      name: "images",
      label: "Photos",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.alt || "Photo" }),
        defaultItem: {
          src: "/uploads/galerie-1.webp",
          alt: "Voiture de collection Sunset Ride",
        },
      },
      fields: [
        {
          type: "image",
          name: "src",
          label: "Fichier image",
          required: true,
          description: "Importez ou choisissez une image (public/uploads).",
        },
        {
          type: "string",
          name: "alt",
          label: "Texte alternatif (alt)",
          required: true,
          description: "Décrivez l'image (accessibilité + référencement).",
        },
      ],
    },
  ],
};
