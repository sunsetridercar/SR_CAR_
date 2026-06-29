export type Lang = "en" | "fr";
export const LOCALES: Lang[] = ["en", "fr"];
export const DEFAULT_LANG: Lang = "en";

/**
 * Préfixe les liens internes par la langue courante.
 * Inchangés : liens externes (http), tel:, mailto:, et ancres pures (#section).
 */
export function localizeHref(
  href: string | null | undefined,
  lang: string
): string {
  if (!href) return "#";
  if (!href.startsWith("/")) return href; // externe, tel:, mailto:, #ancre
  if (
    href === `/${lang}` ||
    href.startsWith(`/${lang}/`) ||
    href.startsWith(`/${lang}#`)
  ) {
    return href; // déjà localisé
  }
  if (href === "/") return `/${lang}`;
  return `/${lang}${href}`;
}

type Dict = {
  phone: string;
  email: string;
  areas: string;
  contact: string;
  follow: string;
  followInsta: string;
  region: string;
  rights: string;
  switchLabel: string;
  switchTo: Lang;
  form: {
    name: string;
    phone: string;
    email: string;
    project: string;
    submit: string;
    sent: string;
  };
};

const DICT: Record<Lang, Dict> = {
  en: {
    phone: "Phone",
    email: "Email",
    areas: "Service area",
    contact: "Contact",
    follow: "Follow us",
    followInsta: "Follow on Instagram",
    region: "French Riviera · Basque Country",
    rights: "All rights reserved",
    switchLabel: "FR",
    switchTo: "fr",
    form: {
      name: "Name",
      phone: "Phone",
      email: "Email",
      project: "Your project",
      submit: "Send my request",
      sent: "Thank you! Your email app will open with your message pre-filled.",
    },
  },
  fr: {
    phone: "Téléphone",
    email: "E-mail",
    areas: "Zones d'intervention",
    contact: "Contact",
    follow: "Suivez-nous",
    followInsta: "Suivez-nous sur Instagram",
    region: "Côte d'Azur · Pays Basque",
    rights: "Tous droits réservés",
    switchLabel: "EN",
    switchTo: "en",
    form: {
      name: "Nom",
      phone: "Téléphone",
      email: "E-mail",
      project: "Votre projet",
      submit: "Envoyer ma demande",
      sent: "Merci ! Votre logiciel de messagerie s'ouvre avec votre demande pré-remplie.",
    },
  },
};

export function tr(lang: string): Dict {
  return DICT[(lang as Lang)] ?? DICT.en;
}
