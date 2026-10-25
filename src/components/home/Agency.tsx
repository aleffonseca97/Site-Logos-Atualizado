"use client";

import Image from "next/image";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/I18nProvider";

const portraits = [
  {
    src: "/studio/equipe-estudio.jpg",
    altKey: "photo1Alt",
    className: "mt-8 sm:mt-10 lg:mt-14",
  },
  {
    src: "/studio/equipe-mesa.jpg",
    altKey: "photo2Alt",
    className: "",
  },
] as const;

export function Agency() {
  const { t } = useI18n();

  return (
    <section id="chi-siamo" className="bg-white text-black">
      <div className="section container-wide">
        <Reveal>
          <h2 className="display display-lg max-w-[18ch]">
            {t.agency.title} <Highlight>{t.agency.highlight}</Highlight>
          </h2>
        </Reveal>

        <div className="mt-8 grid items-start gap-10 lg:mt-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-x-16 xl:gap-x-24">
          <div className="relative z-10 min-w-0">
            <Reveal delay={100}>
              <p className="max-w-xl text-base leading-relaxed text-black/70 md:text-lg">
                {t.agency.p1}
              </p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-black/60">
                {t.agency.p2}
              </p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="grid max-w-[40rem] grid-cols-2 items-start gap-3 sm:gap-4 lg:max-w-none">
              {portraits.map((photo) => (
                <figure key={photo.src} className={`min-w-0 ${photo.className}`}>
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#f2f2f2]">
                    <Image
                      src={photo.src}
                      alt={t.agency[photo.altKey]}
                      fill
                      quality={100}
                      sizes="(max-width: 1023px) min(46vw, 320px), 320px"
                      className="object-cover object-[center_18%]"
                    />
                  </div>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
