"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload } from "./FileUpload";
import { useI18n } from "@/i18n/I18nProvider";
import { translateError } from "@/i18n/translate-error";

type ClientData = {
  id?: string;
  name: string;
  website?: string | null;
  logoUrl?: string | null;
  isActive: boolean;
  showInMarquee: boolean;
  isFeatured: boolean;
  sortOrder: number;
  notes?: string | null;
};

export function ClientForm({ initial }: { initial?: ClientData }) {
  const router = useRouter();
  const { t } = useI18n();
  const [logoUrl, setLogoUrl] = useState<string | null>(initial?.logoUrl || null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      website: String(form.get("website") || "") || null,
      logoUrl,
      isActive: form.get("isActive") === "on",
      showInMarquee: form.get("showInMarquee") === "on",
      isFeatured: form.get("isFeatured") === "on",
      sortOrder: Number(form.get("sortOrder") || 0),
      notes: String(form.get("notes") || "") || null,
    };

    const response = await fetch(
      initial?.id ? `/api/admin/clients/${initial.id}` : "/api/admin/clients",
      {
        method: initial?.id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    setLoading(false);
    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "save_failed");
      return;
    }

    router.push("/admin/clients");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="admin-card max-w-2xl space-y-5">
      <label className="block">
        <span className="admin-label">{t.admin.clients.name}</span>
        <input name="name" required className="admin-input" defaultValue={initial?.name} />
      </label>
      <label className="block">
        <span className="admin-label">{t.admin.clients.website}</span>
        <input
          name="website"
          type="url"
          className="admin-input"
          placeholder="https://"
          defaultValue={initial?.website || ""}
        />
      </label>
      <FileUpload label={t.admin.clients.logo} value={logoUrl} prefix="client" onChange={setLogoUrl} />
      <label className="block">
        <span className="admin-label">{t.admin.clients.sortOrder}</span>
        <input
          name="sortOrder"
          type="number"
          className="admin-input"
          defaultValue={initial?.sortOrder ?? 0}
        />
      </label>
      <label className="block">
        <span className="admin-label">{t.admin.clients.notes}</span>
        <textarea name="notes" className="admin-textarea" defaultValue={initial?.notes || ""} />
      </label>

      <div className="flex flex-wrap gap-5 text-sm">
        <label className="flex items-center gap-2">
          <input name="isActive" type="checkbox" defaultChecked={initial?.isActive ?? true} />
          {t.admin.clients.isActive}
        </label>
        <label className="flex items-center gap-2">
          <input
            name="showInMarquee"
            type="checkbox"
            defaultChecked={initial?.showInMarquee ?? false}
          />
          {t.admin.clients.showMarquee}
        </label>
        <label className="flex items-center gap-2">
          <input name="isFeatured" type="checkbox" defaultChecked={initial?.isFeatured ?? false} />
          {t.admin.clients.featured}
        </label>
      </div>

      {error ? <p className="text-sm text-red-400">{translateError(error, t.errors)}</p> : null}
      <button type="submit" className="pill-btn pill-btn-blue" disabled={loading}>
        {loading ? t.admin.clients.saving : t.admin.clients.save}
      </button>
    </form>
  );
}
