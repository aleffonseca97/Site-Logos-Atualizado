"use client";

import { useI18n, usePageMeta } from "@/i18n/I18nProvider";
import { siteConfig } from "@/lib/config";

type Key =
  | "dashboard"
  | "clients"
  | "newClient"
  | "editClient"
  | "projects"
  | "newProject"
  | "editProject"
  | "messages"
  | "settings";

export function AdminTitle({
  k,
  className = "display mb-6 text-3xl",
}: {
  k: Key;
  className?: string;
}) {
  const { t } = useI18n();
  const labels: Record<Key, string> = {
    dashboard: t.admin.dashboard.title,
    clients: t.admin.clients.title,
    newClient: t.admin.clients.new,
    editClient: t.admin.clients.edit,
    projects: t.admin.projects.title,
    newProject: t.admin.projects.new,
    editProject: t.admin.projects.edit,
    messages: t.admin.messages.title,
    settings: t.admin.settings.title,
  };
  const title = labels[k];
  usePageMeta(`${title} · ${siteConfig.name}`);

  return <h1 className={className}>{title}</h1>;
}
