import type { ProjectTypeId } from "@/lib/config";

const legacy: Record<string, ProjectTypeId> = {
  "web-design": "web-design",
  ecommerce: "ecommerce",
  software: "software",
  crm: "crm",
  saas: "saas",
  integrations: "integrations",
  other: "other",
  "Web Design / Landing": "web-design",
  "E-commerce": "ecommerce",
  "Software / Web App": "software",
  "CRM / Automazioni": "crm",
  "CRM / Automações": "crm",
  "CRM / Automation": "crm",
  SaaS: "saas",
  Integrazioni: "integrations",
  Integrações: "integrations",
  Integrations: "integrations",
  Altro: "other",
  Outro: "other",
  Other: "other",
};

export function projectTypeLabel(
  value: string | null | undefined,
  labels: Record<ProjectTypeId, string>,
  fallback: string,
) {
  if (!value) return fallback;
  const id = legacy[value];
  return id ? labels[id] : value;
}
