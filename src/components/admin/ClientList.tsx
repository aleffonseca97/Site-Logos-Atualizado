"use client";

import Link from "next/link";
import Image from "next/image";
import { AdminTitle } from "./AdminTitle";
import { DeleteClientButton } from "./DeleteClientButton";
import { useI18n } from "@/i18n/I18nProvider";
import { fill } from "@/i18n/locale";

type Item = {
  id: string;
  name: string;
  logoUrl: string | null;
  isActive: boolean;
  showInMarquee: boolean;
  sortOrder: number;
};

export function ClientList({ clients }: { clients: Item[] }) {
  const { t } = useI18n();

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <AdminTitle k="clients" className="display text-3xl" />
        <Link href="/admin/clients/new" className="pill-btn pill-btn-blue !text-sm">
          {t.admin.clients.new}
        </Link>
      </div>

      <div className="mt-8 space-y-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="admin-card flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-20 overflow-hidden rounded bg-black">
                {client.logoUrl ? (
                  <Image src={client.logoUrl} alt="" fill className="object-contain p-1" />
                ) : null}
              </div>
              <div>
                <p className="font-medium">{client.name}</p>
                <p className="text-xs text-white/45">
                  {[
                    client.isActive ? t.admin.clients.active : t.admin.clients.inactive,
                    client.showInMarquee ? t.admin.clients.marquee : null,
                    fill(t.admin.clients.order, { n: client.sortOrder }),
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/clients/${client.id}`} className="text-white/70 hover:text-white">
                {t.admin.clients.editLink}
              </Link>
              <DeleteClientButton id={client.id} name={client.name} />
            </div>
          </div>
        ))}
        {clients.length === 0 ? <p className="text-white/50">{t.admin.clients.empty}</p> : null}
      </div>
    </>
  );
}
