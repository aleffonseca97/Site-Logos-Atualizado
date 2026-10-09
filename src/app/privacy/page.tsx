import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PrivacyContent } from "@/components/privacy/PrivacyContent";
import { getSiteSettings } from "@/lib/queries";
import { siteConfig } from "@/lib/config";
import { dictionaries } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const t = dictionaries[await getLocale()];
  return {
    title: t.meta.privacyTitle,
  };
}

export default async function PrivacyPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <Header whatsapp={settings.whatsapp} />
      <main className="pt-28">
        <PrivacyContent email={settings.email || siteConfig.email} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
