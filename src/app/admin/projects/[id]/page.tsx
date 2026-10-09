import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTitle } from "@/components/admin/AdminTitle";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const [project, clients] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: { images: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ]);

  if (!project) notFound();

  return (
    <AdminShell>
      <AdminTitle k="editProject" />
      <ProjectForm initial={project} clients={clients} />
    </AdminShell>
  );
}
