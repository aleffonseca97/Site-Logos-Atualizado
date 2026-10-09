"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

type ProjectCard = {
  id: string;
  title: string;
  slug: string;
  coverUrl: string | null;
  category: string | null;
  shortDescription: string | null;
  client?: { name: string } | null;
};

export function PortfolioGrid({ projects }: { projects: ProjectCard[] }) {
  const { t } = useI18n();

  if (!projects.length) {
    return (
      <div className="border border-white/10 p-10 text-white/55">{t.projectsPage.empty}</div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.id} href={`/progetti/${project.slug}`} className="group block">
          <div className="image-mask relative aspect-[4/5] overflow-hidden bg-[#151515]">
            {project.coverUrl ? (
              <Image
                src={project.coverUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            ) : null}
          </div>
          <div className="mt-4">
            <h2 className="text-lg font-medium">{project.title}</h2>
            <p className="mt-1 text-xs uppercase tracking-[0.14em] text-white/45">
              {[project.client?.name, project.category].filter(Boolean).join(" · ")}
            </p>
            {project.shortDescription ? (
              <p className="mt-3 text-sm text-white/60 line-clamp-3">{project.shortDescription}</p>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
}
