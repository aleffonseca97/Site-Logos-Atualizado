import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetail } from "@/components/portfolio/ProjectDetail";
import {
  getProjectBySlug,
  getRelatedProjects,
  getSiteSettings,
} from "@/lib/queries";
import { parseJsonArray } from "@/lib/slug";
import { dictionaries } from "@/i18n/dictionaries";
import { getLocale } from "@/i18n/get-locale";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const t = dictionaries[await getLocale()];
  if (!project) return { title: t.project.fallbackTitle };
  return {
    title: project.title,
    description: project.shortDescription || undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const [settings, project] = await Promise.all([
    getSiteSettings(),
    getProjectBySlug(slug),
  ]);

  if (!project) notFound();

  const related = await getRelatedProjects(project.id, project.clientId);

  return (
    <>
      <Header whatsapp={settings.whatsapp} />
      <main className="pt-28">
        <ProjectDetail
          project={{
            title: project.title,
            shortDescription: project.shortDescription,
            externalUrl: project.externalUrl,
            coverUrl: project.coverUrl,
            challenge: project.challenge,
            solution: project.solution,
            clientName: project.client?.name || null,
            category: project.category,
            images: project.images.map((image) => ({
              id: image.id,
              url: image.url,
              alt: image.alt,
            })),
          }}
          services={parseJsonArray(project.services)}
          technologies={parseJsonArray(project.technologies)}
          related={related.map((item) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            coverUrl: item.coverUrl,
          }))}
        />
      </main>
      <Footer settings={settings} />
    </>
  );
}
