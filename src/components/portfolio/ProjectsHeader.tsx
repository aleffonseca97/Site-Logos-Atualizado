"use client";

import { Highlight } from "@/components/ui/Highlight";
import { useI18n, usePageMeta } from "@/i18n/I18nProvider";
import { siteConfig } from "@/lib/config";

export function ProjectsHeader() {
  const { t } = useI18n();
  usePageMeta(`${t.meta.projectsTitle} · ${siteConfig.name}`, t.meta.projectsDescription);

  return (
    <>
      <h1 className="display display-lg">
        {t.projectsPage.title} <Highlight>{t.projectsPage.highlight}</Highlight>
      </h1>
      <p className="mt-5 max-w-xl text-white/70">{t.projectsPage.text}</p>
    </>
  );
}
