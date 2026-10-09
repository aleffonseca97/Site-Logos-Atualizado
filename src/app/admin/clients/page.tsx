import { AdminShell } from "@/components/admin/AdminShell";
import { ClientList } from "@/components/admin/ClientList";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <AdminShell>
      <ClientList
        clients={clients.map((client) => ({
          id: client.id,
          name: client.name,
          logoUrl: client.logoUrl,
          isActive: client.isActive,
          showInMarquee: client.showInMarquee,
          sortOrder: client.sortOrder,
        }))}
      />
    </AdminShell>
  );
}
