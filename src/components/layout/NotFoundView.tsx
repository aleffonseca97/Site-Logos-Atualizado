"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useI18n, usePageMeta } from "@/i18n/I18nProvider";
import { siteConfig } from "@/lib/config";

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
};

export function NotFoundView({ settings }: { settings: Settings }) {
  const { t } = useI18n();
  usePageMeta(`${t.meta.notFoundTitle} · ${siteConfig.name}`);

  return (
    <>
      <Header whatsapp={settings.whatsapp} />
      <main className="pt-28">
        <section className="section container-wide">
          <h1 className="display display-lg max-w-[12ch]">{t.notFound.title}</h1>
          <p className="mt-6 max-w-xl text-white/70">{t.notFound.text}</p>
          <div className="mt-10">
            <Button href="/">{t.notFound.back}</Button>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
