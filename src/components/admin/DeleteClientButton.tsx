"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";
import { fill } from "@/i18n/locale";

export function DeleteClientButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const { t } = useI18n();

  async function onDelete() {
    if (!confirm(fill(t.admin.clients.confirmDelete, { name }))) return;
    const response = await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
    if (response.ok) router.refresh();
  }

  return (
    <button type="button" onClick={onDelete} className="text-red-400 hover:text-red-300">
      {t.admin.clients.delete}
    </button>
  );
}
