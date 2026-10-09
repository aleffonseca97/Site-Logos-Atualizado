import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "./AdminNav";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="admin-shell min-h-screen">
      <AdminNav email={admin.email} />
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
