import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksFaq } from "@/tina/__generated__/types";
import { SectionShell, toneField } from "@/components/util/section-shell";
import { Reveal } from "@/components/util/reveal";

export const Faq = ({ data }: { data: PageBlocksFaq }) => {
  const items = data.items || [];
  return (
    <SectionShell tone={data.tone} id="faq" className="scroll-mt-20">
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

      <Reveal className="mx-auto mt-12 max-w-3xl">
        {items.map((item, i) => {
          if (!item) return null;
          return (
            <details
              key={i}
              data-tina-field={tinaField(item)}
              open={i === 0}
              className="group border-t border-current/15 last:border-b"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 marker:content-none [&::-webkit-details-marker]:hidden">
                <span className="font-heading text-xl md:text-2xl" data-tina-field={tinaField(item, "question")}>
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-current/30 text-lg transition-all duration-300 group-open:rotate-45 group-open:border-sunset group-open:bg-sunset group-open:text-cream"
                >
                  +
                </span>
              </summary>
              {item.answer && (
                <p
                  className="max-w-2xl pb-7 text-muted-foreground"
                  data-tina-field={tinaField(item, "answer")}
                >
                  {item.answer}
                </p>
              )}
            </details>
          );
        })}
      </Reveal>
    </SectionShell>
  );
};

export const faqBlockSchema: Template = {
  name: "faq",
  label: "FAQ (questions / réponses)",
  ui: {
    previewSrc: "/blocks/cta.png",
    defaultItem: {
      eyebrow: "Bon à savoir",
      title: "Vos questions, nos réponses",
      tone: "cream",
      items: [
        {
          question: "Où intervenez-vous ?",
          answer:
            "Nous sommes basés sur la Côte d'Azur (Nice) et au Pays Basque (Biarritz), et nous livrons dans les deux régions — Cannes, Monaco, Saint-Jean-de-Luz et au-delà.",
        },
      ],
    },
  },
  fields: [
    toneField,
    { type: "string", name: "eyebrow", label: "Sur-titre" },
    { type: "string", name: "title", label: "Titre de section", required: true },
    {
      type: "object",
      name: "items",
      label: "Questions",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.question || "Question" }),
        defaultItem: {
          question: "Nouvelle question ?",
          answer: "Votre réponse ici.",
        },
      },
      fields: [
        { type: "string", name: "question", label: "Question", required: true },
        { type: "string", name: "answer", label: "Réponse", required: true, ui: { component: "textarea" } },
      ],
    },
  ],
};
