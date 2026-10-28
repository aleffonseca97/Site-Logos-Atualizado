"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { Reveal } from "@/components/motion/Reveal";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { useI18n } from "@/i18n/I18nProvider";

type ProjectCard = {
  id: string;
  title: string;
  slug: string;
  coverUrl: string | null;
  category: string | null;
  client?: { name: string } | null;
};

const MOSAIC: Record<number, string[]> = {
  1: ["col-span-12 md:col-span-6"],
  2: ["col-span-7", "col-span-5"],
  3: ["col-span-5 md:col-span-3", "col-span-7 md:col-span-4", "col-span-12 md:col-span-5"],
  4: ["col-span-6 md:col-span-5", "col-span-6 md:col-span-7", "col-span-7 md:col-span-7", "col-span-5 md:col-span-5"],
  5: [
    "col-span-4 md:col-span-2",
    "col-span-8 md:col-span-4",
    "col-span-12 md:col-span-6",
    "col-span-7",
    "col-span-5",
  ],
  6: [
    "col-span-4 md:col-span-2",
    "col-span-8 md:col-span-4",
    "col-span-12 md:col-span-6",
    "col-span-6 md:col-span-4",
    "col-span-6 md:col-span-3",
    "col-span-12 md:col-span-5",
  ],
};

const MOSAIC_CYCLE = [
  "col-span-4 md:col-span-2",
  "col-span-8 md:col-span-4",
  "col-span-12 md:col-span-6",
  "col-span-7",
  "col-span-5",
];

function tileClass(index: number, total: number) {
  const preset = MOSAIC[total];
  if (preset) return preset[index] ?? MOSAIC_CYCLE[index % MOSAIC_CYCLE.length];
  return MOSAIC_CYCLE[index % MOSAIC_CYCLE.length];
}

export function Works({
  projects,
  showMarquee = false,
}: {
  projects: ProjectCard[];
  showMarquee?: boolean;
}) {
  const { t } = useI18n();

  return (
    <section id="lavori" className={showMarquee ? "bg-black" : "section bg-black"}>
      {showMarquee ? <ClientMarquee /> : null}
      <div className={showMarquee ? "section works-below-marquee" : undefined}>
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <h2 className="display display-lg">
              {t.works.title} <Highlight>{t.works.highlight}</Highlight>
            </h2>
            <p className="max-w-[14.5rem] text-[0.8125rem] leading-snug text-white/85 lg:pt-3 lg:text-right">
              {t.works.text}
            </p>
          </div>
        </Reveal>

        {projects.length === 0 ? (
          <div className="mt-12 border border-white/10 p-8 text-white/55">{t.works.empty}</div>
        ) : (
          <div className="mt-10 grid auto-rows-[11.5rem] grid-cols-12 gap-2.5 sm:auto-rows-[15rem] md:mt-14 md:gap-3 lg:auto-rows-[18.5rem]">
            {projects.map((project, index) => {
              const company = project.client?.name || project.title;
              return (
                <Reveal key={project.id} delay={index * 50} className={`h-full min-h-0 ${tileClass(index, projects.length)}`}>
                  <Link
                    href={`/progetti/${project.slug}`}
                    aria-label={company}
                    className="group relative block h-full overflow-hidden bg-[#151515] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cyan)]"
                  >
                    {project.coverUrl ? (
                      <Image
                        src={project.coverUrl}
                        alt=""
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 58vw, 40vw"
                      />
                    ) : (
                      <div className="h-full w-full bg-[#1a1a1a]" />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:bg-gradient-to-t [@media(hover:none)]:from-black/80 [@media(hover:none)]:via-black/20 [@media(hover:none)]:to-transparent [@media(hover:none)]:opacity-100" />
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:items-end [@media(hover:none)]:justify-start [@media(hover:none)]:text-left [@media(hover:none)]:opacity-100">
                      <span className="display text-sm text-white sm:text-xl md:text-2xl">{company}</span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}

        <div className="mt-10 md:mt-12">
          <Button href="/progetti" className="w-full sm:w-auto sm:min-w-[280px]">
            {t.works.all}
          </Button>
        </div>
      </div>
      </div>
    </section>
  );
}
