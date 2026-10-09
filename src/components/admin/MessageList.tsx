"use client";

import { AdminTitle } from "./AdminTitle";
import { MarkReadButton } from "./MarkReadButton";
import { useI18n } from "@/i18n/I18nProvider";
import { intlLocale } from "@/i18n/locale";
import { projectTypeLabel } from "@/i18n/project-types";

type Item = {
  id: string;
  name: string;
  email: string;
  projectType: string | null;
  company: string | null;
  createdAt: string;
  read: boolean;
  message: string;
};

export function MessageList({ messages }: { messages: Item[] }) {
  const { t, locale } = useI18n();

  return (
    <>
      <AdminTitle k="messages" className="display text-3xl" />
      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <article key={message.id} className="admin-card">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium">
                  {message.name} · {message.email}
                </p>
                <p className="text-xs text-white/45">
                  {projectTypeLabel(message.projectType, t.projectTypes, t.admin.messages.fallbackType)}
                  {message.company ? ` · ${message.company}` : ""} ·{" "}
                  {new Date(message.createdAt).toLocaleString(intlLocale[locale])}
                </p>
              </div>
              {!message.read ? (
                <MarkReadButton id={message.id} />
              ) : (
                <span className="text-xs text-white/35">{t.admin.messages.read}</span>
              )}
            </div>
            <p className="mt-4 whitespace-pre-line text-sm text-white/75">{message.message}</p>
          </article>
        ))}
        {messages.length === 0 ? <p className="text-white/50">{t.admin.messages.empty}</p> : null}
      </div>
    </>
  );
}
