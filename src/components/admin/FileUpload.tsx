"use client";

import Image from "next/image";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { translateError } from "@/i18n/translate-error";

type Props = {
  label: string;
  value?: string | null;
  prefix?: string;
  onChange: (url: string | null) => void;
};

export function FileUpload({ label, value, prefix = "asset", onChange }: Props) {
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file?: File | null) {
    if (!file) return;
    setLoading(true);
    setError("");
    const body = new FormData();
    body.append("file", file);
    body.append("prefix", prefix);

    try {
      const response = await fetch("/api/admin/upload", { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "upload_failed");
      onChange(payload.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "upload_failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <span className="admin-label">{label}</span>
      <div className="flex flex-wrap items-center gap-4">
        {value ? (
          <div className="relative h-20 w-28 overflow-hidden rounded-lg border border-white/10 bg-black">
            <Image src={value} alt="" fill className="object-contain p-2" />
          </div>
        ) : null}
        <label className="pill-btn pill-btn-ghost !min-h-10 cursor-pointer !px-4 !text-sm">
          {loading ? t.admin.upload.loading : value ? t.admin.upload.replace : t.admin.upload.upload}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
            disabled={loading}
            onChange={(event) => onFile(event.target.files?.[0])}
          />
        </label>
        {value ? (
          <button
            type="button"
            className="text-sm text-white/50 hover:text-white"
            onClick={() => onChange(null)}
          >
            {t.admin.upload.remove}
          </button>
        ) : null}
      </div>
      {error ? <p className="mt-2 text-sm text-red-400">{translateError(error, t.errors)}</p> : null}
    </div>
  );
}
