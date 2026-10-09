import Link from "next/link";
import { ReactNode } from "react";

type Variant = "white" | "blue" | "ghost";

const variantClass: Record<Variant, string> = {
  white: "pill-btn-white",
  blue: "pill-btn-blue",
  ghost: "pill-btn-ghost",
};

function Arrow({ tone }: { tone: "dark" | "light" }) {
  return (
    <span className={`btn-arrow ${tone === "dark" ? "btn-arrow-dark" : "btn-arrow-light"}`} aria-hidden>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h8M7 2.5 10.5 6 7 9.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

type Props = {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
};

export function Button({
  href,
  children,
  variant = "white",
  className = "",
  arrow = true,
  type = "button",
  disabled,
  onClick,
  fullWidth,
}: Props) {
  const classes = `pill-btn ${variantClass[variant]} ${fullWidth ? "w-full" : ""} ${className}`;
  const arrowTone = variant === "white" ? "dark" : "light";
  const content = (
    <>
      <span>{children}</span>
      {arrow ? <Arrow tone={arrowTone} /> : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
