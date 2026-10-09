import { prisma } from "./db";

export async function getSiteSettings() {
  return prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });
}

export async function getMarqueeClients() {
  return prisma.client.findMany({
    where: {
      isActive: true,
      showInMarquee: true,
      logoUrl: { not: null },
    },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
}

export async function getPublishedProjects(options?: {
  featured?: boolean;
  carousel?: boolean;
  home?: boolean;
  take?: number;
}) {
  return prisma.project.findMany({
    where: {
      status: "published",
      ...(options?.featured ? { isFeatured: true } : {}),
      ...(options?.carousel ? { showInCarousel: true } : {}),
      ...(options?.home ? { showInHome: true } : {}),
    },
    include: {
      client: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    take: options?.take,
  });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findFirst({
    where: { slug, status: "published" },
    include: {
      client: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

export async function getRelatedProjects(projectId: string, clientId?: string | null) {
  return prisma.project.findMany({
    where: {
      status: "published",
      id: { not: projectId },
      ...(clientId ? { clientId } : {}),
    },
    include: { client: true },
    orderBy: [{ sortOrder: "asc" }, { publishedAt: "desc" }],
    take: 3,
  });
}
