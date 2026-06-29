"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { tinaField } from "tinacms/dist/react";
import { useLayout } from "../layout-context";
import { CtaLink } from "@/components/util/cta-link";
import { cn } from "@/lib/utils";
import { localizeHref, tr } from "@/lib/i18n";

function LangSwitcher({ lang, className }: { lang: string; className?: string }) {
  const pathname = usePathname() || `/${lang}`;
  const other = tr(lang).switchTo;
  const parts = pathname.split("/");
  if (parts[1] === "en" || parts[1] === "fr") parts[1] = other;
  const altPath = parts.join("/") || `/${other}`;

  return (
    <div
      className={cn(
        "font-accent flex items-center gap-2 text-xs uppercase tracking-[0.18em]",
        className
      )}
    >
      <span className="font-medium">{lang.toUpperCase()}</span>
      <span className="opacity-40">/</span>
      <Link
        href={altPath}
        className="opacity-60 transition-opacity hover:text-sunset hover:opacity-100"
      >
        {other.toUpperCase()}
      </Link>
    </div>
  );
}

export const Header = () => {
  const { globalSettings, lang } = useLayout();
  const header = globalSettings?.header;
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!header) return null;
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        solid
          ? "bg-cream/95 text-ink shadow-[0_1px_0_rgba(33,28,24,0.08)] backdrop-blur"
          : "bg-gradient-to-b from-ink/45 to-transparent text-cream"
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-6">
        <Link
          href={`/${lang}`}
          aria-label={header.siteName || "Home"}
          className="flex items-center gap-3"
          data-tina-field={header.logo ? tinaField(header.logo) : undefined}
        >
          {header.logo?.src && (
            <Image
              src={header.logo.src}
              alt={header.logo.alt || header.siteName || "Logo"}
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
              priority
            />
          )}
          <span
            className="font-heading text-xl tracking-tight"
            data-tina-field={tinaField(header, "siteName")}
          >
            {header.siteName}
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-8 lg:flex">
          {header.nav?.map((item, i) =>
            item ? (
              <Link
                key={i}
                href={localizeHref(item.href, lang)}
                data-tina-field={tinaField(item)}
                className="font-accent text-xs uppercase tracking-[0.18em] opacity-90 transition-opacity hover:text-sunset hover:opacity-100"
              >
                {item.label}
              </Link>
            ) : null
          )}
          <LangSwitcher lang={lang} />
          {header.cta?.label && (
            <span data-tina-field={tinaField(header.cta)}>
              <CtaLink
                href={header.cta.href}
                label={header.cta.label}
                variant={header.cta.variant || "primary"}
                lang={lang}
              />
            </span>
          )}
        </nav>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-ink/10 bg-cream text-ink lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-6 sm:px-6">
            {header.nav?.map((item, i) =>
              item ? (
                <Link
                  key={i}
                  href={localizeHref(item.href, lang)}
                  onClick={() => setOpen(false)}
                  className="font-accent text-sm uppercase tracking-[0.18em] hover:text-sunset"
                >
                  {item.label}
                </Link>
              ) : null
            )}
            <LangSwitcher lang={lang} className="text-sm" />
            {header.cta?.label && (
              <CtaLink
                href={header.cta.href}
                label={header.cta.label}
                variant={header.cta.variant || "primary"}
                className="self-start"
                lang={lang}
              />
            )}
          </nav>
        </div>
      )}
    </header>
  );
};
