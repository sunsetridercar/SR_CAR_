import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksTestimonials } from "@/tina/__generated__/types";
import { SectionShell, toneField } from "@/components/util/section-shell";
import { Reveal } from "@/components/util/reveal";
import { imageField } from "@/tina/fields/shared";

export const Testimonials = ({ data }: { data: PageBlocksTestimonials }) => {
  const items = data.items || [];
  return (
    <SectionShell
      tone={data.tone ?? "ink"}
      id="temoignages"
      className="scroll-mt-20"
      bgImage={data.backgroundImage}
      overlayClassName="bg-gradient-to-b from-ink/90 via-ink/80 to-ink/90"
      {...(data.backgroundImage?.src
        ? { "data-tina-field": tinaField(data, "backgroundImage") }
        : {})}
    >
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
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
        {items.map((item, i) => {
          if (!item) return null;
          return (
            <Reveal as="figure" key={i} delay={(i % 2) * 120} data-tina-field={tinaField(item)} className="flex flex-col">
              <span aria-hidden className="font-heading text-6xl leading-none text-sunset">
                &ldquo;
              </span>
              {item.quote && (
                <blockquote
                  className="-mt-4 font-heading text-xl italic leading-relaxed md:text-2xl"
                  data-tina-field={tinaField(item, "quote")}
                >
                  {item.quote}
                </blockquote>
              )}
              <figcaption className="mt-6">
                {item.author && (
                  <span
                    className="eyebrow !text-current"
                    data-tina-field={tinaField(item, "author")}
                  >
                    {item.author}
                  </span>
                )}
                {item.role && (
                  <span
                    className="mt-1 block text-sm opacity-70"
                    data-tina-field={tinaField(item, "role")}
                  >
                    {item.role}
                  </span>
                )}
              </figcaption>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
};

export const testimonialBlockSchema: Template = {
  name: "testimonials",
  label: "Témoignages",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      eyebrow: "Ils nous ont fait confiance",
      title: "Des souvenirs qui durent",
      tone: "ink",
      items: [
        {
          quote:
            "Une expérience inoubliable pour notre mariage. La voiture était sublime et le service impeccable.",
          author: "Camille & Antoine",
          role: "Mariage à Saint-Jean-de-Luz",
        },
      ],
    },
  },
  fields: [
    toneField,
    imageField("backgroundImage", "Image de fond (optionnelle)", { required: false }),
    { type: "string", name: "eyebrow", label: "Sur-titre" },
    { type: "string", name: "title", label: "Titre de section", required: true },
    {
      type: "object",
      name: "items",
      label: "Témoignages",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.author || "Témoignage" }),
        defaultItem: {
          quote: "Partagez ici un avis client.",
          author: "Prénom Nom",
          role: "Occasion / lieu",
        },
      },
      fields: [
        { type: "string", name: "quote", label: "Citation", required: true, ui: { component: "textarea" } },
        { type: "string", name: "author", label: "Auteur", required: true },
        { type: "string", name: "role", label: "Contexte (lieu, occasion)" },
      ],
    },
  ],
};
