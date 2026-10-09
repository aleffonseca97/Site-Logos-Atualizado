"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/i18n/I18nProvider";

type Settings = {
  email: string;
  whatsapp: string;
  socialInstagram: string;
  socialLinkedin: string;
  socialFacebook: string;
  socialTiktok: string;
  legalName: string;
  legalAddress: string;
  legalVat: string;
  marqueeEnabled: boolean;
  marqueeAutoplay: boolean;
};

export function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState<"" | "saved" | "failed">("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setNotice("");
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        whatsapp: form.get("whatsapp"),
        socialInstagram: form.get("socialInstagram"),
        socialLinkedin: form.get("socialLinkedin"),
        socialFacebook: form.get("socialFacebook"),
        socialTiktok: form.get("socialTiktok"),
        legalName: form.get("legalName"),
        legalAddress: form.get("legalAddress"),
        legalVat: form.get("legalVat"),
        marqueeEnabled: form.get("marqueeEnabled") === "on",
        marqueeAutoplay: form.get("marqueeAutoplay") === "on",
      }),
    });

    setLoading(false);
    if (!response.ok) {
      setNotice("failed");
      return;
    }
    setNotice("saved");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="admin-card max-w-2xl space-y-5">
      <label className="block">
        <span className="admin-label">{t.admin.settings.email}</span>
        <input name="email" type="email" className="admin-input" defaultValue={initial.email} />
      </label>
      <label className="block">
        <span className="admin-label">{t.admin.settings.whatsapp}</span>
        <input name="whatsapp" className="admin-input" defaultValue={initial.whatsapp} />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="admin-label">{t.admin.settings.instagram}</span>
          <input
            name="socialInstagram"
            className="admin-input"
            defaultValue={initial.socialInstagram}
          />
        </label>
        <label className="block">
          <span className="admin-label">{t.admin.settings.linkedin}</span>
          <input
            name="socialLinkedin"
            className="admin-input"
            defaultValue={initial.socialLinkedin}
          />
        </label>
        <label className="block">
          <span className="admin-label">{t.admin.settings.facebook}</span>
          <input
            name="socialFacebook"
            className="admin-input"
            defaultValue={initial.socialFacebook}
          />
        </label>
        <label className="block">
          <span className="admin-label">{t.admin.settings.tiktok}</span>
          <input name="socialTiktok" className="admin-input" defaultValue={initial.socialTiktok} />
        </label>
      </div>

      <label className="block">
        <span className="admin-label">{t.admin.settings.legalName}</span>
        <input name="legalName" className="admin-input" defaultValue={initial.legalName} />
      </label>
      <label className="block">
        <span className="admin-label">{t.admin.settings.address}</span>
        <input name="legalAddress" className="admin-input" defaultValue={initial.legalAddress} />
      </label>
      <label className="block">
        <span className="admin-label">{t.admin.settings.vat}</span>
        <input name="legalVat" className="admin-input" defaultValue={initial.legalVat} />
      </label>

      <div className="flex flex-wrap gap-5 text-sm">
        <label className="flex items-center gap-2">
          <input name="marqueeEnabled" type="checkbox" defaultChecked={initial.marqueeEnabled} />
          {t.admin.settings.marquee}
        </label>
        <label className="flex items-center gap-2">
          <input name="marqueeAutoplay" type="checkbox" defaultChecked={initial.marqueeAutoplay} />
          {t.admin.settings.autoplay}
        </label>
      </div>

      {notice ? (
        <p className="text-sm text-[var(--color-cyan)]">
          {notice === "saved" ? t.admin.settings.saved : t.admin.settings.failed}
        </p>
      ) : null}
      <button type="submit" className="pill-btn pill-btn-blue" disabled={loading}>
        {loading ? t.admin.settings.saving : t.admin.settings.save}
      </button>
    </form>
  );
}
