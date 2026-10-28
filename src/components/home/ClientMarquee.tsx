"use client";

import { useI18n } from "@/i18n/I18nProvider";

const CLIENT_LOGOS = [
  {
    name: "Luti Relógios",
    src: "/clients/luti-relogios.jpg",
    width: 1024,
    height: 1024,
  },
  {
    name: "Ruslan Parfums",
    src: "/clients/ruslan-parfums.jpg",
    width: 1024,
    height: 841,
  },
  {
    name: "Logos Finance",
    src: "/clients/logos-finance.jpg",
    width: 1024,
    height: 387,
  },
  {
    name: "MOA",
    src: "/clients/moa.jpg",
    width: 1024,
    height: 1024,
  },
] as const;

export function ClientMarquee() {
  const { t } = useI18n();
  const sequence = Array.from({ length: 4 }, () => CLIENT_LOGOS).flat();
  const loop = [...sequence, ...sequence];

  return (
    <section className="client-marquee" aria-label={t.marquee.label}>
      <div className="marquee">
        <ul className="marquee-track list-none" aria-hidden>
          {loop.map((logo, index) => (
            <li key={`${logo.src}-${index}`} className="marquee-logo-slot">
              <img
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                draggable={false}
                className="marquee-logo"
              />
            </li>
          ))}
        </ul>
        <ul className="sr-only">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.src}>{logo.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
