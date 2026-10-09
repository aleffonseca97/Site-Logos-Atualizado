"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { services, siteConfig } from "@/lib/config";
import { useI18n } from "@/i18n/I18nProvider";

type Settings = {
  email: string;
  whatsapp: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialFacebook: string;
  socialTiktok: string;
  legalName: string;
  legalAddress: string;
  legalVat: string;
};

type Channel = {
  key: string;
  href: string;
  label: string;
  caption?: string;
  external?: boolean;
  icon: ReactNode;
};

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-14 w-14 items-center justify-center rounded-[0.85rem] border-[1.5px] border-white text-white transition-colors duration-200 group-hover:bg-white group-hover:text-black">
      {children}
    </span>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 3.2A8.7 8.7 0 0 0 4.7 16.55L3.4 20.6l4.16-1.27A8.7 8.7 0 1 0 12.04 3.2Zm5.02 12.32c-.21.6-1.23 1.14-1.7 1.16-.44.02-.86.2-2.9-.62-2.44-.98-3.98-3.5-4.1-3.66-.12-.17-.98-1.3-.98-2.48 0-1.18.62-1.76.84-2 .22-.24.48-.3.64-.3h.46c.15 0 .34-.05.53.4.21.48.7 1.66.76 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.25.31-.36.42-.12.12-.24.24-.1.47.14.24.62 1.02 1.33 1.65.91.81 1.68 1.06 1.92 1.18.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.15 1.18Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 7.5 12 13l7.5-5.5" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer({ settings }: { settings: Settings }) {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  const email = settings.email || siteConfig.email;
  const instagram = settings.socialInstagram || siteConfig.instagram;

  const channels: Channel[] = [
    {
      key: "instagram",
      href: instagram,
      label: "Instagram",
      caption: "Logosagency.dev",
      external: true,
      icon: <InstagramIcon />,
    },
    {
      key: "whatsapp-alef",
      href: "https://wa.me/393283634905",
      label: "WhatsApp Alef Fonseca, +39 328 363 4905",
      caption: "Alef Fonseca",
      external: true,
      icon: <WhatsAppIcon />,
    },
    {
      key: "whatsapp-henrique",
      href: "https://wa.me/5511988283311",
      label: "WhatsApp Henrique Augusto, +55 11 98828-3311",
      caption: "Henrique Augusto",
      external: true,
      icon: <WhatsAppIcon />,
    },
    {
      key: "email",
      href: `mailto:${email}`,
      label: email,
      caption: t.contact.email,
      icon: <MailIcon />,
    },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="section container-wide">
        <div className="mb-12 flex flex-col gap-4">
          <a
            href={`mailto:${email}`}
            className="display display-sm tracking-wide text-white transition-opacity hover:opacity-70"
          >
            {email}
          </a>
        </div>

        <div className="mb-14">
          <Logo />
        </div>

        <ul className="mb-14 flex flex-wrap items-start gap-x-6 gap-y-6 sm:gap-x-10">
          {channels.map((channel) => (
            <li key={channel.key}>
              <a
                href={channel.href}
                aria-label={channel.label}
                {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex w-36 flex-col items-center gap-3 text-center"
              >
                <IconFrame>{channel.icon}</IconFrame>
                <span className="text-[0.68rem] uppercase leading-snug tracking-[0.12em] text-white/60 transition-colors group-hover:text-white">
                  {channel.caption}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="grid gap-10 border-t border-white/10 pt-10 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/45">{t.footer.services}</p>
            <ul className="space-y-2 text-sm text-white/80">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href="/#servizi" className="hover:text-white">
                    {t.services[service.id].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.18em] text-white/45">{t.footer.navigation}</p>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/#chi-siamo" className="hover:text-white">
                  {t.footer.about}
                </Link>
              </li>
              <li>
                <Link href="/progetti" className="hover:text-white">
                  {t.footer.portfolio}
                </Link>
              </li>
              <li>
                <Link href="/#contatti" className="hover:text-white">
                  {t.footer.contact}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  {t.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm text-white/65">
            {settings.legalName ? <p className="font-semibold text-white">{settings.legalName}</p> : null}
            {settings.legalAddress ? <p className="mt-2">{settings.legalAddress}</p> : null}
            {settings.legalVat ? (
              <p className="mt-2 text-[var(--color-blue)]">
                {t.footer.vat} {settings.legalVat}
              </p>
            ) : null}
            {!settings.legalName && !settings.legalAddress && !settings.legalVat ? (
              <p>{t.footer.legalFallback}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {t.footer.rights}
          </p>
          <p className="tracking-[0.16em] uppercase">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
