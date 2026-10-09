import { AdminShell } from "@/components/admin/AdminShell";
import { DashboardView } from "@/components/admin/DashboardView";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [clients, projects, published, messages] = await Promise.all([
    prisma.client.count(),
    prisma.project.count(),
    prisma.project.count({ where: { status: "published" } }),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  return (
    <AdminShell>
      <DashboardView
        clients={clients}
        projects={projects}
        published={published}
        messages={messages}
      />
    </AdminShell>
  );
}
