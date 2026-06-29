"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaTiktok, FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { tinaField } from "tinacms/dist/react";
import { useLayout } from "../layout-context";
import { tr } from "@/lib/i18n";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

const LABELS: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",
};

export const Footer = () => {
  const { globalSettings, lang } = useLayout();
  const header = globalSettings?.header;
  const footer = globalSettings?.footer;
  const settings = globalSettings?.settings;
  const t = tr(lang);
  const year = new Date().getFullYear();

  return (
    <footer className="dark border-t border-cream/10 bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Marque */}
        <div>
          <Link href={`/${lang}`} className="flex items-center gap-3" aria-label={header?.siteName || "Home"}>
            {header?.logo?.src && (
              <Image
                src={header.logo.src}
                alt={header.logo.alt || header?.siteName || "Logo"}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <span className="font-heading text-2xl">{header?.siteName}</span>
          </Link>
          {footer?.tagline && (
            <p
              className="mt-5 max-w-sm text-cream/70"
              data-tina-field={tinaField(footer, "tagline")}
            >
              {footer.tagline}
            </p>
          )}
        </div>

        {/* Coordonnées */}
        <div>
          <p className="eyebrow !text-gold">{t.contact}</p>
          <ul className="mt-4 space-y-2 text-cream/80">
            {settings?.phone && (
              <li data-tina-field={tinaField(settings, "phone")}>
                <a className="hover:text-sunset" href={`tel:${settings.phone.replace(/\s/g, "")}`}>
                  {settings.phone}
                </a>
              </li>
            )}
            {settings?.email && (
              <li data-tina-field={tinaField(settings, "email")}>
                <a className="hover:text-sunset" href={`mailto:${settings.email}`}>
                  {settings.email}
                </a>
              </li>
            )}
            {settings?.areas && (
              <li data-tina-field={tinaField(settings, "areas")}>{settings.areas}</li>
            )}
          </ul>
        </div>

        {/* Réseaux */}
        <div>
          <p className="eyebrow !text-gold">{t.follow}</p>
          <div className="mt-4 flex gap-4">
            {footer?.social?.map((link, i) => {
              if (!link?.url) return null;
              const Icon = ICONS[link.platform || ""] || FaInstagram;
              return (
                <Link
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={LABELS[link.platform || ""] || "Réseau social"}
                  data-tina-field={tinaField(link)}
                  className="grid size-10 place-items-center rounded-full border border-cream/20 transition-colors hover:border-sunset hover:text-sunset"
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-sm text-cream/60 sm:flex-row sm:px-6">
          <span>
            © {year} {footer?.legalNote || header?.siteName}
          </span>
          <span className="font-accent text-xs uppercase tracking-[0.18em]">
            {t.region}
          </span>
        </div>
      </div>
    </footer>
  );
};
