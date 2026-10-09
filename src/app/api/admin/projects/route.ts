import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { slugify, toJsonArray } from "@/lib/slug";

const schema = z.object({
  title: z.string().trim().min(1),
  slug: z.string().trim().optional(),
  clientId: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  shortDescription: z.string().optional().nullable(),
  challenge: z.string().optional().nullable(),
  solution: z.string().optional().nullable(),
  services: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
  externalUrl: z.string().optional().nullable(),
  coverUrl: z.string().optional().nullable(),
  status: z.enum(["draft", "published"]).optional(),
  isFeatured: z.boolean().optional(),
  showInHome: z.boolean().optional(),
  showInCarousel: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  gallery: z
    .array(
      z.object({
        url: z.string(),
        alt: z.string().optional().nullable(),
        sortOrder: z.number().int().optional(),
      }),
    )
    .optional(),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const projects = await prisma.project.findMany({
    include: { client: true, images: { orderBy: { sortOrder: "asc" } } },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
  }

  const baseSlug = slugify(parsed.data.slug || parsed.data.title) || `progetto-${Date.now()}`;
  let slug = baseSlug;
  let attempt = 1;
  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${attempt++}`;
  }

  const status = parsed.data.status ?? "draft";
  const project = await prisma.project.create({
    data: {
      title: parsed.data.title,
      slug,
      clientId: parsed.data.clientId || null,
      category: parsed.data.category || null,
      shortDescription: parsed.data.shortDescription || null,
      challenge: parsed.data.challenge || null,
      solution: parsed.data.solution || null,
      services: toJsonArray(parsed.data.services || []),
      technologies: toJsonArray(parsed.data.technologies || []),
      externalUrl: parsed.data.externalUrl || null,
      coverUrl: parsed.data.coverUrl || null,
      status,
      isFeatured: parsed.data.isFeatured ?? false,
      showInHome: parsed.data.showInHome ?? true,
      showInCarousel: parsed.data.showInCarousel ?? false,
      sortOrder: parsed.data.sortOrder ?? 0,
      publishedAt: status === "published" ? new Date() : null,
      images: parsed.data.gallery?.length
        ? {
            create: parsed.data.gallery.map((image, index) => ({
              url: image.url,
              alt: image.alt || null,
              sortOrder: image.sortOrder ?? index,
            })),
          }
        : undefined,
    },
    include: { client: true, images: true },
  });

  return NextResponse.json(project, { status: 201 });
}
