"use client";

import * as React from "react";
import { tr } from "@/lib/i18n";

interface Props {
  /** Adresse e-mail de destination (éditable dans le CMS) */
  email?: string | null;
  note?: string | null;
  lang?: string;
}

const inputBase =
  "w-full border border-current/25 bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-sunset";
const labelBase = "eyebrow !text-current mb-2 block";

/**
 * Formulaire de contact accessible. Sans backend : il compose un e-mail
 * pré-rempli vers l'adresse configurée (mailto). Robuste pour une preview
 * et facile à remplacer plus tard par un service (Formspree, Resend…).
 */
export function ContactForm({ email, note, lang }: Props) {
  const [sent, setSent] = React.useState(false);
  const t = tr(lang || "en").form;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const from = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const message = String(data.get("message") || "");

    const subject = encodeURIComponent(`${t.project} — ${name}`);
    const body = encodeURIComponent(
      `${t.name}: ${name}\n${t.email}: ${from}\n${t.phone}: ${phone}\n\n${message}`
    );
    window.location.href = `mailto:${email || ""}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelBase}>
            {t.name}
          </label>
          <input id="cf-name" name="name" required autoComplete="name" className={inputBase} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={labelBase}>
            {t.phone}
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={inputBase} />
        </div>
      </div>
      <div>
        <label htmlFor="cf-email" className={labelBase}>
          {t.email}
        </label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={inputBase} />
      </div>
      <div>
        <label htmlFor="cf-message" className={labelBase}>
          {t.project}
        </label>
        <textarea id="cf-message" name="message" rows={5} required className={inputBase} />
      </div>

      <button
        type="submit"
        className="font-accent mt-2 inline-flex items-center justify-center self-start rounded-xs bg-sunset px-7 py-3.5 text-xs uppercase tracking-[0.18em] text-cream transition-colors hover:bg-sunset-deep"
      >
        {t.submit}
      </button>

      <p className="min-h-5 text-sm opacity-70" role="status" aria-live="polite">
        {sent ? t.sent : note || ""}
      </p>
    </form>
  );
}
