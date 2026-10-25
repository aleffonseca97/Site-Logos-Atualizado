"use client";

import Image from "next/image";
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

  if (!clients.length) return null;

  const shouldAnimate = autoplay;
  const repeats = shouldAnimate ? Math.max(2, Math.ceil(10 / clients.length)) : 1;
  const sequence = Array.from({ length: repeats }, () => clients).flat();
  const loop = shouldAnimate ? [...sequence, ...sequence] : clients;

  return (
    <section className="border-y border-white/10 bg-black py-7 md:py-8" aria-label={t.marquee.label}>
      <div className={`marquee ${shouldAnimate ? "" : "marquee-static"}`}>
        <ul
          className="marquee-track list-none"
          style={shouldAnimate ? { animationDuration: `${Math.max(sequence.length * 5, 32)}s` } : undefined}
          aria-hidden={shouldAnimate ? true : undefined}
        >
          {loop.map((client, index) => {
            const content = (
              <>
                {client.logoUrl ? (
                  <Image
                    src={client.logoUrl}
                    alt=""
                    width={240}
                    height={80}
                    className="h-14 w-auto max-w-[15rem] object-contain opacity-90 md:h-20 md:max-w-[18rem]"
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
