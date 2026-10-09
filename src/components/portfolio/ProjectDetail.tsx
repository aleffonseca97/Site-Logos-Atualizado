"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useI18n, usePageMeta } from "@/i18n/I18nProvider";
import { siteConfig } from "@/lib/config";

type ImageItem = {
  id: string;
  url: string;
  alt: string | null;
};

type RelatedItem = {
  id: string;
  slug: string;
  title: string;
  coverUrl: string | null;
};

type Project = {
  title: string;
  shortDescription: string | null;
  externalUrl: string | null;
  coverUrl: string | null;
  challenge: string | null;
  solution: string | null;
  clientName: string | null;
  category: string | null;
  images: ImageItem[];
};

export function ProjectDetail({
  project,
  services,
  technologies,
  related,
}: {
  project: Project;
  services: string[];
  technologies: string[];
  related: RelatedItem[];
}) {
  const { t } = useI18n();
  usePageMeta(
    `${project.title} · ${siteConfig.name}`,
    project.shortDescription || undefined,
  );

  return (
    <article>
      <header className="section-tight container-wide">
        <p className="text-xs uppercase tracking-[0.18em] text-white/45">
          {[project.clientName, project.category].filter(Boolean).join(" · ")}
        </p>
        <h1 className="display display-lg mt-4 max-w-[16ch]">{project.title}</h1>
        {project.shortDescription ? (
          <p className="mt-6 max-w-2xl text-lg text-white/70">{project.shortDescription}</p>
        ) : null}
        {project.externalUrl ? (
          <div className="mt-8">
            <Button href={project.externalUrl} variant="ghost">
              {t.project.visit}
            </Button>
          </div>
        ) : null}
      </header>

      {project.coverUrl ? (
        <div className="container-wide px-[var(--page-x)]">
          <div className="relative aspect-[16/10] overflow-hidden bg-[#141414]">
            <Image
              src={project.coverUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="section container-wide grid gap-12 lg:grid-cols-2">
        {project.challenge ? (
          <section>
            <h2 className="display display-sm">{t.project.challenge}</h2>
            <p className="mt-4 whitespace-pre-line text-white/70">{project.challenge}</p>
          </section>
        ) : null}
        {project.solution ? (
          <section>
            <h2 className="display display-sm">{t.project.solution}</h2>
            <p className="mt-4 whitespace-pre-line text-white/70">{project.solution}</p>
          </section>
        ) : null}
      </div>

      {(services.length > 0 || technologies.length > 0) && (
        <div className="section-tight container-wide grid gap-10 border-y border-white/10 md:grid-cols-2">
          {services.length > 0 ? (
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-white/45">{t.project.services}</h2>
              <ul className="mt-4 space-y-2 text-white/80">
                {services.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {technologies.length > 0 ? (
            <div>
              <h2 className="text-xs uppercase tracking-[0.18em] text-white/45">
                {t.project.technologies}
              </h2>
              <ul className="mt-4 space-y-2 text-white/80">
                {technologies.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      )}

      {project.images.length > 0 ? (
        <section className="section container-wide">
          <h2 className="display display-sm mb-8">{t.project.gallery}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {project.images.map((image, index) => (
              <div
                key={image.id}
                className={`relative overflow-hidden bg-[#141414] ${
                  index % 3 === 0 ? "md:col-span-2 aspect-[16/9]" : "aspect-[4/5]"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt || project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="section container-wide border-t border-white/10">
          <h2 className="display display-sm mb-8">{t.project.related}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <Link key={item.id} href={`/progetti/${item.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#151515]">
                  {item.coverUrl ? (
                    <Image
                      src={item.coverUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="33vw"
                    />
                  ) : null}
                </div>
                <p className="mt-3 text-sm">{item.title}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
