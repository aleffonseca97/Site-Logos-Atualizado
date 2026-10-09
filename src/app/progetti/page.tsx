import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { ProjectsHeader } from "@/components/portfolio/ProjectsHeader";
import { getPublishedProjects, getSiteSettings } from "@/lib/queries";
import { dictionaries } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const t = dictionaries[await getLocale()];
  return {
    title: t.meta.projectsTitle,
    description: t.meta.projectsDescription,
  };
}

export default async function ProjectsPage() {
  const [settings, projects] = await Promise.all([
    getSiteSettings(),
    getPublishedProjects(),
  ]);

  return (
    <>
      <Header whatsapp={settings.whatsapp} />
      <main className="pt-28">
        <section className="section container-wide">
          <ProjectsHeader />
          <div className="mt-12">
            <PortfolioGrid projects={projects} />
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
