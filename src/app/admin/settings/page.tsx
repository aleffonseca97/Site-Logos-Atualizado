import { AdminShell } from "@/components/admin/AdminShell";
import { AdminTitle } from "@/components/admin/AdminTitle";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell>
      <AdminTitle k="settings" />
      <SettingsForm initial={settings} />
    </AdminShell>
  );
}
