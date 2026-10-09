import { ReactNode } from "react";

export function Highlight({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: "blue" | "cyan";
}) {
  return (
    <span className={tone === "cyan" ? "highlight highlight-cyan" : "highlight"}>
      {children}
    </span>
  );
}
