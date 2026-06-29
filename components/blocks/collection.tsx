import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksCollection } from "@/tina/__generated__/types";
import { Media } from "@/components/util/media";
import { SectionShell, toneField } from "@/components/util/section-shell";
import { Reveal } from "@/components/util/reveal";
import { imageField } from "@/tina/fields/shared";

export const Collection = ({ data }: { data: PageBlocksCollection }) => {
  const items = data.items || [];
  return (
    <SectionShell tone={data.tone ?? "ink"} width="wide" id="collection" className="scroll-mt-20">
      <Reveal as="header" className="max-w-2xl">
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
          <p className="mt-6 text-lg opacity-75" data-tina-field={tinaField(data, "intro")}>
            {data.intro}
          </p>
        )}
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => {
          if (!item) return null;
          return (
            <Reveal
              as="article"
              key={i}
              delay={(i % 3) * 90}
              data-tina-field={tinaField(item)}
              className="overflow-hidden rounded-md border border-current/10 bg-current/[0.04]"
            >
              <div className="relative" data-tina-field={tinaField(item, "image")}>
                <Media
                  src={item.image?.src}
                  alt={item.image?.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="aspect-[4/3] w-full"
                />
                {item.year && (
                  <span
                    className="eyebrow !text-cream absolute right-4 top-4 rounded-full bg-ink/75 px-3 py-1 backdrop-blur"
                    data-tina-field={tinaField(item, "year")}
                  >
                    {item.year}
                  </span>
                )}
              </div>
              <div className="p-6">
                {item.name && (
                  <h3 className="text-2xl" data-tina-field={tinaField(item, "name")}>
                    {item.name}
                  </h3>
                )}
                {item.description && (
                  <p className="mt-2 opacity-70" data-tina-field={tinaField(item, "description")}>
                    {item.description}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
};

export const collectionBlockSchema: Template = {
  name: "collection",
  label: "Collection (flotte de voitures)",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      eyebrow: "La collection",
      title: "Un garage de légendes restaurées",
      tone: "ink",
      intro:
        "Chaque voiture est choisie à la main, fidèle à la mécanique d'origine et impeccablement entretenue.",
      items: [
        {
          name: "Ford Mustang Cabriolet",
          year: "1967",
          description: "Le cabriolet américain par excellence — chrome et ciel ouvert.",
          image: { src: "/uploads/galerie-1.webp", alt: "Ford Mustang cabriolet de collection" },
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
      label: "Voitures",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.name || "Voiture" }),
        defaultItem: {
          name: "Nouvelle voiture",
          year: "1970",
          description: "Décrivez ce modèle en une phrase.",
          image: { src: "/uploads/galerie-2.webp", alt: "Voiture de collection Sunset Ride" },
        },
      },
      fields: [
        imageField("image", "Photo"),
        { type: "string", name: "name", label: "Modèle", required: true },
        { type: "string", name: "year", label: "Année / badge", description: "Ex. : 1967 ou « Vintage »." },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
      ],
    },
  ],
};
