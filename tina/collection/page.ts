import type { Collection } from "tinacms";
import { heroBlockSchema } from "@/components/blocks/hero";
import { servicesBlockSchema } from "@/components/blocks/services";
import { galleryBlockSchema } from "@/components/blocks/gallery";
import { testimonialBlockSchema } from "@/components/blocks/testimonial";
import { ctaBlockSchema } from "@/components/blocks/call-to-action";
import { contactBlockSchema } from "@/components/blocks/contact";
import { collectionBlockSchema } from "@/components/blocks/collection";
import { storyBlockSchema } from "@/components/blocks/story";
import { faqBlockSchema } from "@/components/blocks/faq";
import { instagramBlockSchema } from "@/components/blocks/instagram";
import { imageField } from "@/tina/fields/shared";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      // Les fichiers sont rangés par langue : en/home, fr/prestations/mariages…
      const [lang, ...rest] = document._sys.breadcrumbs;
      const path = rest.join("/");
      if (!path || path === "home") return `/${lang}`;
      return `/${lang}/${path}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Titre de la page (admin / onglet)",
      required: true,
      description:
        "Utilisé pour le titre de l'onglet du navigateur et l'organisation interne.",
      isTitle: true,
    },
    {
      type: "object",
      name: "seo",
      label: "Référencement (SEO)",
      description: "Titre et description affichés dans Google et les réseaux sociaux.",
      fields: [
        { type: "string", name: "title", label: "Titre SEO" },
        {
          type: "string",
          name: "description",
          label: "Méta-description",
          ui: { component: "textarea" },
        },
        imageField("ogImage", "Image de partage (Open Graph)", { required: false }),
      ],
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections de la page",
      description: "Composez la page en empilant des sections.",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema as any,
        servicesBlockSchema as any,
        collectionBlockSchema as any,
        storyBlockSchema as any,
        galleryBlockSchema as any,
        testimonialBlockSchema as any,
        faqBlockSchema as any,
        instagramBlockSchema as any,
        ctaBlockSchema as any,
        contactBlockSchema as any,
      ],
    },
  ],
};

export default Page;
