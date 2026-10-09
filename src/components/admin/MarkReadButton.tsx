"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";

export function MarkReadButton({ id }: { id: string }) {
  const router = useRouter();
  const { t } = useI18n();

  async function mark() {
    await fetch(`/api/admin/messages/${id}`, { method: "PUT" });
    router.refresh();
  }

  return (
    <button type="button" onClick={mark} className="text-sm text-[var(--color-cyan)]">
      {t.admin.messages.markRead}
    </button>
  );
}
