"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

const DESKTOP_INTRO = "/brand/intro%20logos.mp4";
const MOBILE_INTRO = "/brand/intro%20logos_mobile.mp4";
const EXIT_MS = 700;
const FAILSAFE_MS = 8000;

export function SiteIntro() {
  const pathname = usePathname();
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"play" | "exit" | "done">("play");
  const isAdmin = pathname.startsWith("/admin");

  const finish = useCallback(() => {
    setPhase((current) => (current === "play" ? "exit" : current));
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    const timer = window.setTimeout(() => setPhase("done"), EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (isAdmin || phase !== "play") return;

    const content = document.getElementById("site-content");
    if (!content) return;

    content.setAttribute("inert", "");
    content.setAttribute("aria-hidden", "true");

    return () => {
      content.removeAttribute("inert");
      content.removeAttribute("aria-hidden");
    };
  }, [isAdmin, phase]);

  useEffect(() => {
    if (isAdmin || phase !== "play") return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const start = async () => {
      video.muted = true;
      try {
        await video.play();
      } catch {
        if (!cancelled) finish();
      }
    };

    void start();
    const failsafe = window.setTimeout(() => finish(), FAILSAFE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, [finish, isAdmin, phase]);

  if (isAdmin || phase === "done") return null;

  return (
    <div
      className={`site-intro fixed inset-0 z-[200] bg-black ${
        phase === "exit" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        transition: "opacity var(--duration-slow) var(--ease-out-expo)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label={t.intro.label}
    >
      <style>{`
        html:has(.site-intro),
        html:has(.site-intro) body {
          overflow: hidden !important;
          overscroll-behavior: none;
        }
      `}</style>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={finish}
        onError={finish}
      >
        <source src={DESKTOP_INTRO} type="video/mp4" media="(min-width: 768px)" />
        <source src={MOBILE_INTRO} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={finish}
        className="absolute top-6 right-[var(--page-x)] text-xs font-medium tracking-[0.18em] text-white/70 uppercase transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-cyan)]"
      >
        {t.intro.skip}
      </button>
    </div>
  );
}
