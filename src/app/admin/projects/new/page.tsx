import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTitle } from "@/components/admin/AdminTitle";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  return (
    <AdminShell>
      <AdminTitle k="newProject" />
      <ProjectForm clients={clients} />
    </AdminShell>
  );
}
