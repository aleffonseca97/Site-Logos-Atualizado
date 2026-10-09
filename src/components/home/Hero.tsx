"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { useI18n, usePageMeta } from "@/i18n/I18nProvider";

export function Hero() {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);
  usePageMeta(t.meta.siteTitle, t.meta.description);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setReady(true);
      return;
    }
    const id = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-28 md:pb-24 md:pt-36">
      <div
        className="pointer-events-none absolute -right-10 top-28 hidden h-56 w-56 opacity-40 md:block"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <linearGradient id="lGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D9FF" />
              <stop offset="55%" stopColor="#0057FF" />
              <stop offset="100%" stopColor="#0040FF" />
            </linearGradient>
          </defs>
          <path
            d="M48 28h42v98h62v42H48V28Z"
            fill="url(#lGrad)"
            opacity="0.55"
            transform="skewX(-12)"
          />
        </svg>
      </div>

      <div className="container-wide px-[var(--page-x)]">
        <h1 className="display display-xl max-w-[18ch]">
          <span className={`hero-line ${ready ? "is-in" : ""}`} style={{ transitionDelay: "0ms" }}>
            {t.hero.line1}
          </span>
          <span
            className={`hero-line mt-2 block ${ready ? "is-in" : ""}`}
            style={{ transitionDelay: "100ms" }}
          >
            <Highlight>{t.hero.line2}</Highlight>
          </span>
          <span
            className={`hero-line mt-2 block ${ready ? "is-in" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            {t.hero.line3}
          </span>
        </h1>

        <p
          className={`hero-line mt-8 max-w-xl text-base text-white/75 md:text-lg ${ready ? "is-in" : ""}`}
          style={{ transitionDelay: "300ms" }}
        >
          {t.hero.text}
        </p>

        <div
          className={`hero-line mt-10 flex flex-col gap-3 sm:flex-row sm:items-center ${ready ? "is-in" : ""}`}
          style={{ transitionDelay: "400ms" }}
        >
          <Button href="/#servizi">{t.hero.services}</Button>
          <Button href="/progetti" variant="ghost">
            {t.hero.projects}
          </Button>
        </div>
      </div>
    </section>
  );
}
