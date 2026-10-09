import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTitle } from "@/components/admin/AdminTitle";
import { ClientForm } from "@/components/admin/ClientForm";

export default function NewClientPage() {
  return (
    <AdminShell>
      <AdminTitle k="newClient" />
      <ClientForm />
    </AdminShell>
  );
}
