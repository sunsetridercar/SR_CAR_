"use client";

import * as React from "react";

type RevealProps = React.HTMLAttributes<HTMLElement> & {
  /** Élément rendu (div par défaut) */
  as?: keyof React.JSX.IntrinsicElements;
  /** Retard d'apparition en ms (pour les cascades) */
  delay?: number;
};

/**
 * Apparition élégante au scroll : l'élément monte en fondu (avec un léger flou
 * qui se dissipe) lorsqu'il entre dans le viewport. Une seule fois.
 * Le style est défini en CSS (`[data-reveal]`) et désactivé si l'utilisateur
 * préfère réduire les animations.
 */
export function Reveal({
  as = "div",
  delay = 0,
  className,
  style,
  children,
  ...props
}: RevealProps) {
  const ref = React.useRef<any>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as any;
  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={className}
      style={{ ...style, ["--reveal-delay" as any]: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
