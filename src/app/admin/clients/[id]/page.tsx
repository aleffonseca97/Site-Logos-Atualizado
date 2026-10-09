import { notFound } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTitle } from "@/components/admin/AdminTitle";
import { ClientForm } from "@/components/admin/ClientForm";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditClientPage({ params }: Props) {
  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) notFound();

  return (
    <AdminShell>
      <AdminTitle k="editClient" />
      <ClientForm initial={client} />
    </AdminShell>
  );
}
