"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n, usePageMeta } from "@/i18n/I18nProvider";
import { translateError } from "@/i18n/translate-error";
import { siteConfig } from "@/lib/config";

export default function AdminLoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  usePageMeta(`${t.admin.login.title} · ${siteConfig.name}`);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });

    setLoading(false);
    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error || "login_failed");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d0d0d] p-8">
        <div className="mb-8 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-icon.jpg" alt="" width={40} height={40} className="rounded-lg" />
            <div>
              <p className="display text-xl">{t.admin.login.title}</p>
              <p className="text-sm text-white/50">Logos Agency</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="admin-label">{t.admin.login.email}</span>
            <input name="email" type="email" required className="admin-input" autoComplete="username" />
          </label>
          <label className="block">
            <span className="admin-label">{t.admin.login.password}</span>
            <input
              name="password"
              type="password"
              required
              className="admin-input"
              autoComplete="current-password"
            />
          </label>
          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {translateError(error, t.errors)}
            </p>
          ) : null}
          <button type="submit" className="pill-btn pill-btn-blue w-full" disabled={loading}>
            {loading ? t.admin.login.loading : t.admin.login.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
