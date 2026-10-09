"use client";

import Link from "next/link";
import { AdminTitle } from "./AdminTitle";
import { useI18n } from "@/i18n/I18nProvider";

export function DashboardView({
  clients,
  projects,
  published,
  messages,
}: {
  clients: number;
  projects: number;
  published: number;
  messages: number;
}) {
  const { t } = useI18n();
  const cards = [
    { id: "clients", label: t.admin.dashboard.clients, value: clients, href: "/admin/clients" },
    { id: "projects", label: t.admin.dashboard.projects, value: projects, href: "/admin/projects" },
    { id: "published", label: t.admin.dashboard.published, value: published, href: "/admin/projects" },
    { id: "messages", label: t.admin.dashboard.newMessages, value: messages, href: "/admin/messages" },
  ];

  return (
    <>
      <AdminTitle k="dashboard" className="display text-3xl" />
      <p className="mt-2 text-white/55">{t.admin.dashboard.intro}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.id} href={card.href} className="admin-card transition hover:border-white/25">
            <p className="text-xs uppercase tracking-[0.14em] text-white/45">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/clients" className="pill-btn pill-btn-white !text-sm">
          {t.admin.dashboard.newClient}
        </Link>
        <Link href="/admin/projects/new" className="pill-btn pill-btn-blue !text-sm">
          {t.admin.dashboard.newProject}
        </Link>
      </div>
    </>
  );
}
