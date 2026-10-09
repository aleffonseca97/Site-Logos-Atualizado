"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { languageOptions } from "@/i18n/locale";

export function LanguageSwitcher({ align = "right" }: { align?: "left" | "right" }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = languageOptions.find((option) => option.locale === locale) ?? languageOptions[0];

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="lang-btn inline-flex max-w-[11.5rem] items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2 text-sm text-white/90 backdrop-blur-sm transition-colors hover:border-white/50 hover:text-white sm:max-w-none"
        aria-label={t.language.label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Flag code={current.flag} />
        <span className="truncate">{current.label}</span>
        <Chevron open={open} />
      </button>
      {open ? (
        <ul
          role="listbox"
          aria-label={t.language.label}
          className={`absolute top-[calc(100%+0.45rem)] z-50 min-w-[12.5rem] overflow-hidden rounded-2xl border border-white/15 bg-black/95 p-1 shadow-lg backdrop-blur-md ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {languageOptions.map((option) => {
            const selected = option.locale === locale;
            return (
              <li key={option.locale} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  className={`lang-btn flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm whitespace-nowrap ${
                    selected ? "bg-white text-black" : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                  onClick={() => {
                    setLocale(option.locale);
                    setOpen(false);
                  }}
                >
                  <Flag code={option.flag} />
                  <span>{option.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function Flag({ code }: { code: "br" | "it" | "gb" }) {
  if (code === "it") {
    return (
      <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden className="shrink-0 rounded-[2px]">
        <rect width="6" height="12" fill="#009246" />
        <rect x="6" width="6" height="12" fill="#fff" />
        <rect x="12" width="6" height="12" fill="#CE2B37" />
      </svg>
    );
  }

  if (code === "gb") {
    return (
      <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden className="shrink-0 rounded-[2px]">
        <rect width="18" height="12" fill="#012169" />
        <path d="M0 0 18 12M18 0 0 12" stroke="#fff" strokeWidth="2.4" />
        <path d="M0 0 18 12M18 0 0 12" stroke="#C8102E" strokeWidth="1.2" />
        <path d="M9 0v12M0 6h18" stroke="#fff" strokeWidth="4" />
        <path d="M9 0v12M0 6h18" stroke="#C8102E" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden className="shrink-0 rounded-[2px]">
      <rect width="18" height="12" fill="#009B3A" />
      <polygon points="9,1.2 16.6,6 9,10.8 1.4,6" fill="#FEDD00" />
      <circle cx="9" cy="6" r="2.15" fill="#002776" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
