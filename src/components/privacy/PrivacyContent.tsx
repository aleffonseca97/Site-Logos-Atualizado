"use client";

import { useI18n, usePageMeta } from "@/i18n/I18nProvider";
import { fill } from "@/i18n/locale";
import { siteConfig } from "@/lib/config";

export function PrivacyContent({ email }: { email: string }) {
  const { t } = useI18n();
  usePageMeta(`${t.meta.privacyTitle} · ${siteConfig.name}`);

  return (
    <section className="section container max-w-3xl">
      <h1 className="display display-md">{t.privacy.title}</h1>
      <div className="mt-8 space-y-5 text-white/70">
        <p>{fill(t.privacy.p1, { name: siteConfig.name })}</p>
        <p>{t.privacy.p2}</p>
        <p>
          {t.privacy.p3Before}{" "}
          <a className="text-white underline" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
        <p>{t.privacy.p4}</p>
      </div>
    </section>
  );
}
