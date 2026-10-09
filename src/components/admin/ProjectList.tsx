"use client";

import Link from "next/link";
import { AdminTitle } from "./AdminTitle";
import { useI18n } from "@/i18n/I18nProvider";

type Item = {
  id: string;
  title: string;
  status: string;
  clientName: string | null;
  showInHome: boolean;
  showInCarousel: boolean;
};

export function ProjectList({ projects }: { projects: Item[] }) {
  const { t } = useI18n();

  function statusLabel(status: string) {
    if (status === "draft") return t.admin.projects.draft;
    if (status === "published") return t.admin.projects.published;
    return status;
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <AdminTitle k="projects" className="display text-3xl" />
        <Link href="/admin/projects/new" className="pill-btn pill-btn-blue !text-sm">
          {t.admin.projects.new}
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="admin-card flex flex-wrap items-center justify-between gap-4"
          >
            <div>
              <p className="font-medium">{project.title}</p>
              <p className="text-xs text-white/45">
                {[
                  statusLabel(project.status),
                  project.clientName,
                  project.showInHome ? t.admin.projects.home : null,
                  project.showInCarousel ? t.admin.projects.carousel : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <Link
              href={`/admin/projects/${project.id}`}
              className="text-sm text-white/70 hover:text-white"
            >
              {t.admin.projects.editLink}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
