"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface Props {
  src1?: string | null;
  src2?: string | null;
  /** Image affichée avant lecture (poster) */
  poster?: string | null;
  /** Secondes coupées à la fin de la vidéo 1 (le fondu démarre avant la fin) */
  trimEnd?: number;
  /** Durée du fondu enchaîné en ms */
  fade?: number;
}

/**
 * Fond vidéo du Hero.
 * - Deux vidéos → lecture en séquence (1 puis 2) en boucle, avec fondu enchaîné.
 *   On coupe `trimEnd` seconde(s) à la fin de la vidéo 1 (le fondu démarre avant
 *   sa fin), puis on enchaîne sur la vidéo 2, et on reboucle.
 * - Une seule vidéo → boucle simple.
 * Vidéos muettes (autoplay autorisé), l'image sert de poster / repli.
 */
export function HeroVideo({ src1, src2, poster, trimEnd = 1, fade = 800 }: Props) {
  const v1 = React.useRef<HTMLVideoElement>(null);
  const v2 = React.useRef<HTMLVideoElement>(null);
  const [active, setActive] = React.useState<1 | 2>(1);
  const hasTwo = Boolean(src1 && src2);

  React.useEffect(() => {
    if (!hasTwo) return;
    const a = v1.current;
    const b = v2.current;
    if (!a || !b) return;

    let locked = false;
    a.currentTime = 0;
    a.play().catch(() => {});

    const onTime1 = () => {
      if (locked || !a.duration) return;
      if (a.currentTime >= a.duration - trimEnd) {
        locked = true;
        b.currentTime = 0;
        b.play().catch(() => {});
        setActive(2);
        window.setTimeout(() => a.pause(), fade);
      }
    };
    const onEnd2 = () => {
      a.currentTime = 0;
      a.play().catch(() => {});
      setActive(1);
      window.setTimeout(() => {
        b.pause();
        locked = false;
      }, fade);
    };

    a.addEventListener("timeupdate", onTime1);
    b.addEventListener("ended", onEnd2);
    return () => {
      a.removeEventListener("timeupdate", onTime1);
      b.removeEventListener("ended", onEnd2);
    };
  }, [hasTwo, trimEnd, fade]);

  // Une seule vidéo : boucle simple
  if (!hasTwo) {
    const only = src1 || src2;
    if (!only) return null;
    return (
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster || undefined}
        aria-hidden
      >
        <source src={only} type="video/mp4" />
      </video>
    );
  }

  const common =
    "absolute inset-0 -z-10 h-full w-full object-cover transition-opacity ease-in-out";
  return (
    <>
      <video
        ref={v1}
        style={{ transitionDuration: `${fade}ms` }}
        className={cn(common, active === 1 ? "opacity-100" : "opacity-0")}
        autoPlay
        muted
        playsInline
        preload="auto"
        poster={poster || undefined}
        aria-hidden
      >
        <source src={src1!} type="video/mp4" />
      </video>
      <video
        ref={v2}
        style={{ transitionDuration: `${fade}ms` }}
        className={cn(common, active === 2 ? "opacity-100" : "opacity-0")}
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={src2!} type="video/mp4" />
      </video>
    </>
  );
}
