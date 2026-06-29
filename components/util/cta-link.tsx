import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { localizeHref, DEFAULT_LANG } from "@/lib/i18n";

export type CtaVariant = "primary" | "outline" | "link";

const base =
  "inline-flex items-center justify-center gap-2 font-accent uppercase tracking-[0.18em] text-xs transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-3";

const variants: Record<CtaVariant, string> = {
  primary:
    "bg-sunset text-cream px-7 py-3.5 hover:bg-sunset-deep rounded-xs",
  outline:
    "border border-current/40 px-7 py-3.5 hover:border-sunset hover:text-sunset rounded-xs",
  link: "pb-1 border-b border-current/40 hover:text-sunset hover:border-sunset",
};

export interface CtaLinkProps {
  href?: string | null;
  label?: string | null;
  // Tina type les champs `options` en `string` : on accepte string et on borne.
  variant?: string | null;
  className?: string;
  /** Langue courante (préfixe les liens internes) */
  lang?: string;
}

/**
 * Lien d'appel à l'action. Détecte automatiquement les liens externes,
 * tel: et mailto: ; les liens internes (préfixés par la langue) passent par next/link.
 */
export function CtaLink({ href, label, variant, className, lang }: CtaLinkProps) {
  if (!label) return null;
  const target = localizeHref(href, lang || DEFAULT_LANG);
  const isInternal = target.startsWith("/") || target.startsWith("#");
  const variantCls = variants[(variant as CtaVariant) || "primary"] ?? variants.primary;
  const classes = cn(base, variantCls, className);

  if (isInternal) {
    return (
      <Link href={target} className={classes}>
        {label}
      </Link>
    );
  }
  const external = target.startsWith("http");
  return (
    <a
      href={target}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {label}
    </a>
  );
}
