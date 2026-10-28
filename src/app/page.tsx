import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Works } from "@/components/home/Works";
import { Agency } from "@/components/home/Agency";
import { Contact } from "@/components/home/Contact";
import { getPublishedProjects, getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, homeProjects] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects({ home: true, take: 6 }),
  ]);

  return (
    <>
      <Header whatsapp={settings.whatsapp} />
      <main>
        <Hero />
        <Services />
        <Works projects={homeProjects} showMarquee={settings.marqueeEnabled} />
        <Agency />
        <Contact />
      </main>
      <Footer settings={settings} />
    </>
  );
}
