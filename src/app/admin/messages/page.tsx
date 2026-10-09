import { AdminShell } from "@/components/admin/AdminShell";
import { MessageList } from "@/components/admin/MessageList";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminShell>
      <MessageList
        messages={messages.map((message) => ({
          id: message.id,
          name: message.name,
          email: message.email,
          projectType: message.projectType,
          company: message.company,
          createdAt: message.createdAt.toISOString(),
          read: message.read,
          message: message.message,
        }))}
      />
    </AdminShell>
  );
}
