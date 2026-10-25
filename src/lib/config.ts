export const siteConfig = {
  name: "Logos Agency",
  tagline: "Agência de Desenvolvimento",
  description:
    "A Logos Agency projeta e desenvolve soluções digitais sob medida: web design, e-commerce, software, CRM e plataformas SaaS.",
  locale: "pt_BR",
  email: process.env.CONTACT_EMAIL || "logosdev.agency@gmail.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "393283634905",
  instagram: "https://www.instagram.com/logosagency.dev/",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const navItems = [
  { href: "/", key: "home" },
  { href: "/#servizi", key: "services" },
  { href: "/progetti", key: "projects" },
  { href: "/#chi-siamo", key: "about" },
  { href: "/#contatti", key: "contact" },
] as const;

export type NavKey = (typeof navItems)[number]["key"];

export const services = [
  { id: "web-design", number: "01", image: "/services/web-design.png" },
  { id: "ecommerce", number: "02", image: "/services/ecommerce.jpg" },
  { id: "software", number: "03", image: "/services/software.png" },
  { id: "crm", number: "04", image: "/services/crm.jpg" },
  { id: "saas", number: "05", image: "/services/saas.jpg" },
  { id: "api", number: "06", image: "/services/api.png" },
] as const;

export type ServiceId = (typeof services)[number]["id"];

export const projectTypeIds = [
  "web-design",
  "ecommerce",
  "software",
  "crm",
  "saas",
  "integrations",
  "other",
] as const;

export type ProjectTypeId = (typeof projectTypeIds)[number];
