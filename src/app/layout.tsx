import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Archivo, Archivo_Narrow } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/config";
import { dictionaries } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";
import { I18nProvider } from "@/i18n/I18nProvider";
import { htmlLang, LOCALE_COOKIE, ogLocale } from "@/i18n/locale";

const display = Archivo_Narrow({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const copy = dictionaries[locale];

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: copy.meta.siteTitle,
      template: `%s · ${siteConfig.name}`,
    },
    description: copy.meta.description,
    openGraph: {
      title: siteConfig.name,
      description: copy.meta.description,
      locale: ogLocale[locale],
      type: "website",
      url: siteConfig.url,
      siteName: siteConfig.name,
      images: [{ url: "/brand/logo-icon.jpg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: copy.meta.description,
      images: ["/brand/logo-icon.jpg"],
    },
    icons: {
      icon: "/brand/logo-icon.jpg",
      apple: "/brand/logo-icon.jpg",
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const store = await cookies();
  const locale = await getLocale();

  return (
    <html
      lang={htmlLang[locale]}
      className={`${display.variable} ${body.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-black text-white">
        <I18nProvider initialLocale={locale} hasCookie={store.has(LOCALE_COOKIE)}>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
