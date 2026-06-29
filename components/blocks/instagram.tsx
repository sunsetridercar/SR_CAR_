import * as React from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa6";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksInstagram } from "@/tina/__generated__/types";
import { Media } from "@/components/util/media";
import { SectionShell, toneField } from "@/components/util/section-shell";
import { Reveal } from "@/components/util/reveal";
import { tr } from "@/lib/i18n";

export const Instagram = ({ data, lang }: { data: PageBlocksInstagram; lang: string }) => {
  const images = data.images || [];
  const url = data.profileUrl || "#";
  const followInsta = tr(lang).followInsta;
  return (
    <SectionShell tone={data.tone ?? "ink"} width="wide">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          {data.handle && (
            <p className="eyebrow flex items-center gap-2" data-tina-field={tinaField(data, "handle")}>
              <FaInstagram className="size-4" aria-hidden /> {data.handle}
            </p>
          )}
          {data.title && (
            <h2 className="mt-3 text-4xl md:text-5xl" data-tina-field={tinaField(data, "title")}>
              {data.title}
            </h2>
          )}
        </div>
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          data-tina-field={tinaField(data, "profileUrl")}
          className="font-accent inline-flex items-center gap-2 self-start rounded-full border border-current/30 px-6 py-3 text-xs uppercase tracking-[0.18em] transition-colors hover:border-sunset hover:text-sunset"
        >
          <FaInstagram className="size-4" aria-hidden /> {followInsta}
        </Link>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {images.map((img, i) => {
          if (!img) return null;
          return (
            <Reveal key={i} delay={(i % 4) * 70} as="div">
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-tina-field={tinaField(img)}
                className="group block overflow-hidden rounded-md"
                aria-label="Voir sur Instagram"
              >
                <Media
                  src={img.src}
                  alt={img.alt}
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="aspect-square w-full"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </Link>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
};

export const instagramBlockSchema: Template = {
  name: "instagram",
  label: "Instagram (galerie sociale)",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      handle: "@_sunsetride",
      title: "Suivez l'aventure",
      tone: "ink",
      profileUrl: "https://www.instagram.com/_sunsetride/",
      images: [
        { src: "/uploads/galerie-1.webp", alt: "Voiture de collection Sunset Ride sur la Côte d'Azur" },
      ],
    },
  },
  fields: [
    toneField,
    { type: "string", name: "handle", label: "Identifiant Instagram (@...)" },
    { type: "string", name: "title", label: "Titre de section", required: true },
    { type: "string", name: "profileUrl", label: "Lien du profil Instagram" },
    {
      type: "object",
      name: "images",
      label: "Photos",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.alt || "Photo" }),
        defaultItem: { src: "/uploads/galerie-2.webp", alt: "Voiture de collection Sunset Ride" },
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
