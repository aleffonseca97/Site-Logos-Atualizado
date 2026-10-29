"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Flag, LanguageSwitcher } from "./LanguageSwitcher";
import { navItems } from "@/lib/config";
import { useI18n } from "@/i18n/I18nProvider";
import { languageOptions } from "@/i18n/locale";

type Props = {
  whatsapp?: string;
};

export function Header({ whatsapp }: Props) {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const waHref = whatsapp
    ? `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`
    : null;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open ? "bg-black/95 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between gap-4 px-[var(--page-x)] py-4">
          <Logo priority />

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label={t.nav.main}>
            {navItems
              .filter((link) => link.key !== "contact")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link text-sm tracking-wide text-white/80 transition-colors hover:text-white"
                >
                  {t.nav[link.key]}
                </Link>
              ))}
            <LanguageSwitcher />
            <Link href="/#contatti" className="pill-btn pill-btn-white !min-h-11 !px-5 !text-sm">
              {t.header.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <LanguageSwitcher />
            {waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="grid h-11 w-11 place-items-center rounded-full bg-[#1f6b3a]"
                aria-label={t.header.whatsapp}
              >
                <WhatsAppIcon />
              </a>
            ) : null}
            <button
              type="button"
              className="grid h-11 w-11 place-items-center"
              aria-label={open ? t.header.closeMenu : t.header.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{t.header.menu}</span>
              <div className="flex w-6 flex-col gap-1.5">
                <span
                  className={`h-[1.5px] w-full bg-white transition-transform ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span className={`h-[1.5px] w-full bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                <span
                  className={`h-[1.5px] w-full bg-white transition-transform ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav lg:hidden ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-[var(--page-x)] pb-10 pt-28">
          <nav className="flex flex-col gap-5" aria-label={t.nav.mobile}>
            {navItems.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="display display-md text-white"
                onClick={() => setOpen(false)}
              >
                {t.nav[link.key]}
              </Link>
            ))}
          </nav>
          <div className="mt-8" role="group" aria-label={t.language.label}>
            <div className="flex flex-col gap-2">
              {languageOptions.map((option) => (
                <button
                  key={option.locale}
                  type="button"
                  className={`lang-btn flex items-center gap-3 rounded-full border px-4 py-3 text-left text-sm ${
                    locale === option.locale
                      ? "border-white bg-white text-black"
                      : "border-white/20 text-white/80"
                  }`}
                  aria-pressed={locale === option.locale}
                  onClick={() => setLocale(option.locale)}
                >
                  <Flag code={option.flag} />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-auto space-y-4">
            <Link
              href="/#contatti"
              className="pill-btn pill-btn-white w-full"
              onClick={() => setOpen(false)}
            >
              {t.header.consult}
            </Link>
            {waHref ? (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn pill-btn-ghost w-full"
              >
                {t.header.whatsapp}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        fill="white"
        d="M20.5 3.5A11 11 0 0 0 3.2 17.6L2 22l4.5-1.2A11 11 0 1 0 20.5 3.5Zm-8.6 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-2.7.7.7-2.6-.2-.3a9.1 9.1 0 1 1 7.1 3.7Zm5-6.8c-.3-.1-1.6-.8-1.8-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.3-.4c.1-.2 0-.3 0-.5l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 2.6 1.1 2.6.7 3.1.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.3Z"
      />
    </svg>
  );
}
