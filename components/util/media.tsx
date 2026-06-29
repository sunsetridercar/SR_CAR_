import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MediaProps {
  src?: string | null;
  alt?: string | null;
  /** Classes du conteneur (ratio, arrondi, ombre…) */
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Image responsive (next/image en mode `fill`).
 * Le conteneur porte le ratio / l'arrondi ; l'image couvre la zone.
 */
export function Media({
  src,
  alt,
  className,
  imgClassName,
  sizes = "100vw",
  priority = false,
}: MediaProps) {
  if (!src) {
    return (
      <div
        className={cn("relative overflow-hidden bg-sand", className)}
        aria-hidden
      />
    );
  }
  return (
    <div className={cn("relative overflow-hidden bg-sand", className)}>
      <Image
        src={src}
        alt={alt || ""}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
