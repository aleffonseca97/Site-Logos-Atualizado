"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type ClientItem = {
  id: string;
  name: string;
  website: string | null;
  logoUrl: string | null;
};

export function ClientMarquee({
  clients,
  autoplay = true,
}: {
  clients: ClientItem[];
  autoplay?: boolean;
}) {
  const { t } = useI18n();
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  if (!clients.length) return null;

  const shouldAnimate = autoplay && !reduce && clients.length >= 4;
  const loop = shouldAnimate ? [...clients, ...clients] : clients;

  return (
    <section className="border-y border-white/10 bg-black py-8 md:py-10" aria-label={t.marquee.label}>
      <div className={`marquee ${shouldAnimate ? "" : "marquee-static"}`}>
        <ul
          className="marquee-track list-none px-[var(--page-x)]"
          aria-hidden={shouldAnimate ? true : undefined}
        >
          {loop.map((client, index) => {
            const content = (
              <>
                {client.logoUrl ? (
                  <Image
                    src={client.logoUrl}
                    alt=""
                    width={160}
                    height={48}
                    className="h-8 w-auto object-contain opacity-80 md:h-10"
                  />
                ) : (
                  <span className="text-sm uppercase tracking-[0.18em] text-white/55">
                    {client.name}
                  </span>
                )}
                <span className="sr-only">{client.name}</span>
              </>
            );

            return (
              <li key={`${client.id}-${index}`} className="shrink-0">
                {client.website ? (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                    tabIndex={shouldAnimate && index >= clients.length ? -1 : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="inline-flex items-center">{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        {shouldAnimate ? (
          <ul className="sr-only">
            {clients.map((client) => (
              <li key={client.id}>
                {client.website ? (
                  <a href={client.website} target="_blank" rel="noopener noreferrer">
                    {client.name}
                  </a>
                ) : (
                  client.name
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
