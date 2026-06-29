import type { Collection } from "tinacms";
import { imageField, linkField } from "@/tina/fields/shared";

const Global: Collection = {
  label: "Réglages du site (par langue)",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    // Un fichier par langue (en.json, fr.json) — pas un document unique.
    allowedActions: { create: false, delete: false },
  },
  fields: [
    {
      type: "object",
      label: "En-tête (header)",
      name: "header",
      fields: [
        imageField("logo", "Logo"),
        {
          type: "string",
          name: "siteName",
          label: "Nom du site",
          description: "Affiché à côté du logo et utilisé pour l'accessibilité.",
          required: true,
        },
        {
          type: "object",
          name: "nav",
          label: "Liens de navigation",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.label || "Lien" }),
            defaultItem: { label: "Nouveau lien", href: "/#prestations" },
          },
          fields: [
            { type: "string", name: "label", label: "Libellé", required: true },
            {
              type: "string",
              name: "href",
              label: "Destination",
              required: true,
              description: "Lien interne (ex. /#contact) ou ancre de section.",
            },
          ],
        },
        linkField("cta", "Bouton de l'en-tête"),
      ],
    },
    {
      type: "object",
      label: "Pied de page (footer)",
      name: "footer",
      fields: [
        {
          type: "string",
          name: "tagline",
          label: "Phrase d'accroche",
          ui: { component: "textarea" },
        },
        {
          type: "object",
          name: "social",
          label: "Réseaux sociaux",
          list: true,
          ui: {
            itemProps: (item) => ({ label: item?.platform || "Réseau" }),
            defaultItem: { platform: "instagram", url: "https://instagram.com/" },
          },
          fields: [
            {
              type: "string",
              name: "platform",
              label: "Plateforme",
              options: [
                { label: "Instagram", value: "instagram" },
                { label: "TikTok", value: "tiktok" },
                { label: "Facebook", value: "facebook" },
                { label: "LinkedIn", value: "linkedin" },
                { label: "YouTube", value: "youtube" },
              ],
            },
            { type: "string", name: "url", label: "Lien", required: true },
          ],
        },
        {
          type: "string",
          name: "legalNote",
          label: "Mention légale / copyright",
          description: "L'année est ajoutée automatiquement.",
        },
      ],
    },
    {
      type: "object",
      label: "Coordonnées & SEO",
      name: "settings",
      fields: [
        { type: "string", name: "email", label: "E-mail de contact" },
        { type: "string", name: "phone", label: "Téléphone" },
        { type: "string", name: "areas", label: "Zones d'intervention" },
      ],
    },
  ],
};

export default Global;
