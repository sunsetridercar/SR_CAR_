import type { TinaField } from "tinacms";

/**
 * Image avec texte alternatif OBLIGATOIRE.
 * Le champ `image` de Tina ne stocke qu'un chemin ; on l'enveloppe dans un
 * objet { src, alt } pour forcer l'accessibilité (alt requis partout).
 */
export const imageField = (
  name = "image",
  label = "Image",
  { required = true }: { required?: boolean } = {}
): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    {
      type: "image",
      name: "src",
      label: "Fichier image",
      required,
      description: "Importez ou choisissez une image (dossier public/uploads).",
    },
    {
      type: "string",
      name: "alt",
      label: "Texte alternatif (alt)",
      required,
      description: required
        ? "Décrivez l'image en quelques mots (accessibilité + référencement)."
        : "Obligatoire si vous ajoutez une image (accessibilité + référencement).",
    },
  ],
});

/**
 * Lien d'appel à l'action réutilisable : libellé, destination, style guidé.
 */
export const linkField = (
  name = "cta",
  label = "Bouton / lien"
): TinaField => ({
  type: "object",
  name,
  label,
  fields: [
    {
      type: "string",
      name: "label",
      label: "Texte du bouton",
      description: "Ex. : « Demander un devis ».",
    },
    {
      type: "string",
      name: "href",
      label: "Destination",
      description:
        "Lien interne (ex. /contact), externe (https://…), tel: ou mailto:.",
    },
    {
      type: "string",
      name: "variant",
      label: "Style",
      options: [
        { label: "Plein (sunset)", value: "primary" },
        { label: "Contour", value: "outline" },
        { label: "Lien souligné", value: "link" },
      ],
    },
  ],
});
