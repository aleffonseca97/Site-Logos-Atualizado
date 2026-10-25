"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useI18n, usePageMeta } from "@/i18n/I18nProvider";

const DESKTOP_VIDEO = "/media/logos_agency_desktop.mp4";
const MOBILE_VIDEO = "/media/logos_agency_mobile.mp4";
const DESKTOP_POSTER = "/media/logos_agency_desktop.jpg";
const MOBILE_POSTER = "/media/logos_agency_mobile.jpg";

export function Hero() {
  const { t } = useI18n();
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    let activeSrc = "";

    const play = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.loop = true;
      video.playsInline = true;
      const attempt = video.play();
      if (attempt) attempt.catch(() => {});
    };

    const sync = () => {
      const desktop = desktopQuery.matches;
      const nextSrc = desktop ? DESKTOP_VIDEO : MOBILE_VIDEO;
      video.poster = desktop ? DESKTOP_POSTER : MOBILE_POSTER;
      if (activeSrc !== nextSrc) {
        activeSrc = nextSrc;
        video.preload = "auto";
        video.src = nextSrc;
      }
      play();
    };

    const onEnded = () => {
      video.currentTime = 0;
      play();
    };

    video.addEventListener("ended", onEnded);
    desktopQuery.addEventListener("change", sync);
    sync();
    return () => {
      video.removeEventListener("ended", onEnded);
      desktopQuery.removeEventListener("change", sync);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-black pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <picture>
          <source media="(min-width: 768px)" srcSet={DESKTOP_POSTER} />
          <img src={MOBILE_POSTER} alt="" className="hero-vinheta-media" />
        </picture>
        <video
          ref={videoRef}
          className="hero-vinheta-media hero-vinheta-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
        <div className="hero-vinheta-shade" />
      </div>

      <div
        className="pointer-events-none absolute -right-10 top-28 z-[1] hidden h-56 w-56 opacity-40 md:block"
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

      <div className="container-wide relative z-10 px-[var(--page-x)]">
        <h1 className="display display-hero mx-auto text-center text-white">
          <span className={`hero-line hero-title-line ${ready ? "is-in" : ""}`} style={{ transitionDelay: "0ms" }}>
            {t.hero.line1}
          </span>
          <span
            className={`hero-line hero-title-line ${ready ? "is-in" : ""}`}
            style={{ transitionDelay: "120ms" }}
          >
            {t.hero.line2}
          </span>
        </h1>

        <p
          className={`hero-line mx-auto mt-8 max-w-xl text-center text-base text-white/75 md:text-lg ${ready ? "is-in" : ""}`}
          style={{ transitionDelay: "300ms" }}
        >
          {t.hero.text}
        </p>

        <div
          className={`hero-line hero-actions mt-10 ${ready ? "is-in" : ""}`}
          style={{
            transitionDelay: "400ms",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
          }}
        >
          <Button href="/progetti" variant="ghost">
            {t.hero.projects}
          </Button>
        </div>
      </div>
    </section>
  );
}
