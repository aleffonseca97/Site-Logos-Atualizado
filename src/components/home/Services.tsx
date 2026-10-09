"use client";

import { useState } from "react";
import Image from "next/image";
import { services, type ServiceId } from "@/lib/config";
import { Reveal } from "@/components/motion/Reveal";
import { Highlight } from "@/components/ui/Highlight";
import { useI18n } from "@/i18n/I18nProvider";

export function Services() {
  const { t } = useI18n();
  const [active, setActive] = useState<ServiceId>(services[0].id);
  const current = services.find((item) => item.id === active) ?? services[0];
  const copy = t.services[current.id];

  return (
    <section id="servizi" className="section bg-black">
      <div className="container-wide">
        <Reveal>
          <h2 className="display display-lg max-w-[16ch]">
            {t.servicesSection.title} <Highlight tone="cyan">{t.servicesSection.highlight}</Highlight>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {services.map((service) => {
              const isActive = service.id === active;
              return (
                <li key={service.id}>
                  <button
                    type="button"
                    className={`service-item flex w-full items-baseline gap-5 py-5 text-left transition-colors ${
                      isActive ? "text-white" : "text-white/45 hover:text-white/75"
                    }`}
                    onClick={() => setActive(service.id)}
                    aria-pressed={isActive}
                  >
                    <span className="w-10 shrink-0 font-mono text-xs tracking-wider text-[var(--color-cyan)]">
                      {service.number}
                    </span>
                    <span className="display display-sm normal-case tracking-normal">
                      {t.services[service.id].title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <Reveal delay={120}>
            <div className="sticky top-28 rounded-[1.5rem] bg-[var(--color-black-soft)] p-8 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">{current.number}</p>
              <h3 className="display display-sm mt-4">{copy.title}</h3>
              <p className="mt-5 text-base leading-relaxed text-white/70">{copy.description}</p>
              <div className="image-mask relative mt-10 aspect-[4/3] overflow-hidden rounded-2xl bg-[#111]">
                <Image
                  key={current.id}
                  src={current.image}
                  alt={copy.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
