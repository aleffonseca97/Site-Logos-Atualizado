"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/i18n/I18nProvider";

type Props = {
  variant?: "horizontal" | "icon";
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "horizontal", className = "", priority }: Props) {
  const { t } = useI18n();

  if (variant === "icon") {
    return (
      <Link href="/" className={`inline-flex ${className}`} aria-label="Logos Agency">
        <Image
          src="/brand/logo-icon.jpg"
          alt="Logos Agency"
          width={44}
          height={44}
          className="rounded-[10px]"
          priority={priority}
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`} aria-label="Logos Agency">
      <img
        src="/brand/logo-horizontal.svg"
        alt={t.meta.logoAlt}
        width={648}
        height={228}
        className="h-9 w-auto md:h-11"
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </Link>
  );
}
