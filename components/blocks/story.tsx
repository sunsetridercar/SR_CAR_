import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksStory } from "@/tina/__generated__/types";
import { Media } from "@/components/util/media";
import { SectionShell, toneField } from "@/components/util/section-shell";
import { Reveal } from "@/components/util/reveal";
import { imageField } from "@/tina/fields/shared";

export const Story = ({ data }: { data: PageBlocksStory }) => {
  const paragraphs = (data.body || "").split(/\n\s*\n/).filter(Boolean);
  const points = data.points || [];
  return (
    <SectionShell tone={data.tone} id="histoire" className="scroll-mt-20">
      <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
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
          {data.body && (
            <div className="mt-6 space-y-4 text-lg text-muted-foreground" data-tina-field={tinaField(data, "body")}>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {data.signature && (
            <p className="mt-8 font-heading text-lg italic" data-tina-field={tinaField(data, "signature")}>
              {data.signature}
            </p>
          )}
        </Reveal>

        <Reveal className="relative" delay={140} data-tina-field={tinaField(data, "image")}>
          <Media
            src={data.image?.src}
            alt={data.image?.alt}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="aspect-[4/5] w-full rounded-md shadow-[0_30px_70px_-35px_rgba(33,28,24,0.55)]"
          />
        </Reveal>
      </div>

      {points.length > 0 && (
        <div className="mt-16 grid gap-10 border-t border-current/15 pt-12 sm:grid-cols-3">
          {points.map((point, i) => {
            if (!point) return null;
            return (
              <Reveal key={i} delay={i * 90} data-tina-field={tinaField(point)}>
                <span className="font-heading text-2xl text-sunset">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {point.title && (
                  <h3 className="mt-3 text-xl" data-tina-field={tinaField(point, "title")}>
                    {point.title}
                  </h3>
                )}
                {point.text && (
                  <p className="mt-2 text-muted-foreground" data-tina-field={tinaField(point, "text")}>
                    {point.text}
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>
      )}
    </SectionShell>
  );
};

export const storyBlockSchema: Template = {
  name: "story",
  label: "Histoire / À propos",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      eyebrow: "L'histoire",
      title: "Née d'une simple Camaro, et d'un refus du compromis",
      tone: "cream",
      body: "Sunset Ride a vu le jour en 2022, lorsque Paul, passionné de voitures anciennes, a restauré une Chevrolet Camaro SS de 1967.\n\nAujourd'hui, aux côtés de son associée Ambre, Paul dirige Sunset Ride depuis Nice et Biarritz avec une obsession du détail.",
      signature: "Paul & Ambre — Fondateurs, Sunset Ride",
      image: { src: "/uploads/carlton-cannes.webp", alt: "Les fondateurs de Sunset Ride devant leurs voitures de collection" },
    },
  },
  fields: [
    toneField,
    { type: "string", name: "eyebrow", label: "Sur-titre" },
    { type: "string", name: "title", label: "Titre", required: true },
    {
      type: "string",
      name: "body",
      label: "Texte",
      description: "Séparez les paragraphes par une ligne vide.",
      ui: { component: "textarea" },
    },
    { type: "string", name: "signature", label: "Signature" },
    imageField("image", "Photo (portrait)"),
    {
      type: "object",
      name: "points",
      label: "Points clés (numérotés)",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.title || "Point" }),
        defaultItem: { title: "Nouveau point", text: "Décrivez ce point." },
      },
      fields: [
        { type: "string", name: "title", label: "Titre", required: true },
        { type: "string", name: "text", label: "Texte", ui: { component: "textarea" } },
      ],
    },
  ],
};
