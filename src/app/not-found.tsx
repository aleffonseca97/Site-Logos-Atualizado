import { NotFoundView } from "@/components/layout/NotFoundView";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function NotFound() {
  const settings = await getSiteSettings();
  return <NotFoundView settings={settings} />;
}
