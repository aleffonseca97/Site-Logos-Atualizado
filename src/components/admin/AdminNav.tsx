"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";

const links = [
  { href: "/admin", key: "dashboard" },
  { href: "/admin/clients", key: "clients" },
  { href: "/admin/projects", key: "projects" },
  { href: "/admin/messages", key: "messages" },
  { href: "/admin/settings", key: "settings" },
] as const;

export function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const { t } = useI18n();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  return (
    <header className="border-b border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/admin" className="display text-lg">
            {t.admin.brand}
          </Link>
          <nav className="flex flex-wrap gap-3 text-sm text-white/70">
            {links.map((link) => {
              const active =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={active ? "text-white" : "hover:text-white"}
                >
                  {t.admin.nav[link.key]}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <LanguageSwitcher align="left" />
          <span className="text-white/45">{email}</span>
          <Link href="/" className="text-white/70 hover:text-white">
            {t.admin.site}
          </Link>
          <button type="button" onClick={logout} className="text-white/70 hover:text-white">
            {t.admin.logout}
          </button>
        </div>
      </div>
    </header>
  );
}
