import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { Services } from "@/components/home/Services";
import { Works } from "@/components/home/Works";
import { Agency } from "@/components/home/Agency";
import { Contact } from "@/components/home/Contact";
import {
  getMarqueeClients,
  getPublishedProjects,
  getSiteSettings,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, clients, homeProjects] = await Promise.all([
    getSiteSettings(),
    getMarqueeClients(),
    getPublishedProjects({ home: true, take: 6 }),
  ]);

  return (
    <>
      <Header whatsapp={settings.whatsapp} />
      <main>
        <Hero />
        {settings.marqueeEnabled ? (
          <ClientMarquee clients={clients} autoplay={settings.marqueeAutoplay} />
        ) : null}
        <Services />
        <Works projects={homeProjects} />
        <Agency />
        <Contact />
      </main>
      <Footer settings={settings} />
    </>
  );
}
