import { AdminShell } from "@/components/admin/AdminShell";
import { ProjectList } from "@/components/admin/ProjectList";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    include: { client: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <AdminShell>
      <ProjectList
        projects={projects.map((project) => ({
          id: project.id,
          title: project.title,
          status: project.status,
          clientName: project.client?.name || null,
          showInHome: project.showInHome,
          showInCarousel: project.showInCarousel,
        }))}
      />
    </AdminShell>
  );
}
