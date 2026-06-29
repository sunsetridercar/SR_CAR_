import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import type { PageBlocksContact } from "@/tina/__generated__/types";
import { SectionShell, toneField } from "@/components/util/section-shell";
import { Reveal } from "@/components/util/reveal";
import { ContactForm } from "@/components/util/contact-form";
import { tr } from "@/lib/i18n";

export const Contact = ({ data, lang }: { data: PageBlocksContact; lang: string }) => {
  const t = tr(lang);
  return (
    <SectionShell tone={data.tone} className="scroll-mt-24" id="contact">
      <div className="grid gap-14 md:grid-cols-2 md:gap-20">
        {/* Colonne info */}
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
          {data.intro && (
            <p className="mt-6 text-lg text-muted-foreground" data-tina-field={tinaField(data, "intro")}>
              {data.intro}
            </p>
          )}

          <dl className="mt-10 space-y-6">
            {data.phone && (
              <div data-tina-field={tinaField(data, "phone")}>
                <dt className="eyebrow">{t.phone}</dt>
                <dd className="mt-1 text-xl">
                  <a className="hover:text-sunset" href={`tel:${data.phone.replace(/\s/g, "")}`}>
                    {data.phone}
                  </a>
                </dd>
              </div>
            )}
            {data.email && (
              <div data-tina-field={tinaField(data, "email")}>
                <dt className="eyebrow">{t.email}</dt>
                <dd className="mt-1 text-xl">
                  <a className="hover:text-sunset" href={`mailto:${data.email}`}>
                    {data.email}
                  </a>
                </dd>
              </div>
            )}
            {data.address && (
              <div data-tina-field={tinaField(data, "address")}>
                <dt className="eyebrow">{t.areas}</dt>
                <dd className="mt-1 text-xl">{data.address}</dd>
              </div>
            )}
          </dl>
        </Reveal>

        {/* Colonne formulaire */}
        {data.showForm && (
          <Reveal delay={140}>
            <ContactForm email={data.email} note={data.formNote} lang={lang} />
          </Reveal>
        )}
      </div>
    </SectionShell>
  );
};

export const contactBlockSchema: Template = {
  name: "contact",
  label: "Contact",
  ui: {
    previewSrc: "/blocks/cta.png",
    defaultItem: {
      eyebrow: "Contact",
      title: "Réservez votre voiture de collection",
      intro:
        "Dites-nous tout de votre projet : nous vous répondons sous 24h avec disponibilités et devis.",
      email: "contact@sunset-ride.com",
      phone: "+33 6 00 00 00 00",
      address: "Côte d'Azur & Pays Basque",
      showForm: true,
      formNote: "Réponse sous 24h. Vos informations restent confidentielles.",
      tone: "cream",
    },
  },
  fields: [
    toneField,
    { type: "string", name: "eyebrow", label: "Sur-titre" },
    { type: "string", name: "title", label: "Titre", required: true },
    { type: "string", name: "intro", label: "Introduction", ui: { component: "textarea" } },
    { type: "string", name: "phone", label: "Téléphone", description: "Affiché en lien cliquable (tel:)." },
    { type: "string", name: "email", label: "E-mail", description: "Destinataire du formulaire et lien mailto." },
    { type: "string", name: "address", label: "Zones d'intervention / adresse" },
    { type: "boolean", name: "showForm", label: "Afficher le formulaire de contact" },
    { type: "string", name: "formNote", label: "Note sous le formulaire" },
  ],
};
