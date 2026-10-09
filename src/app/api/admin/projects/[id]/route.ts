import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteUploadByUrl } from "@/lib/storage";
import { slugify, toJsonArray } from "@/lib/slug";

const schema = z.object({
  title: z.string().trim().min(1).optional(),
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

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const { id } = await context.params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: { client: true, images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!project) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(request: Request, context: Ctx) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const { id } = await context.params;
  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
  }

  const existing = await prisma.project.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!existing) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  let slug = existing.slug;
  if (parsed.data.slug || parsed.data.title) {
    const candidate = slugify(parsed.data.slug || parsed.data.title || existing.title);
    if (candidate && candidate !== existing.slug) {
      const clash = await prisma.project.findFirst({
        where: { slug: candidate, id: { not: id } },
      });
      slug = clash ? `${candidate}-${Date.now().toString().slice(-4)}` : candidate;
    }
  }

  if (
    parsed.data.coverUrl !== undefined &&
    existing.coverUrl &&
    parsed.data.coverUrl !== existing.coverUrl
  ) {
    await deleteUploadByUrl(existing.coverUrl);
  }

  if (parsed.data.gallery) {
    for (const image of existing.images) {
      if (!parsed.data.gallery.some((item) => item.url === image.url)) {
        await deleteUploadByUrl(image.url);
      }
    }
    await prisma.mediaAsset.deleteMany({ where: { projectId: id } });
    await prisma.mediaAsset.createMany({
      data: parsed.data.gallery.map((image, index) => ({
        projectId: id,
        url: image.url,
        alt: image.alt || null,
        sortOrder: image.sortOrder ?? index,
      })),
    });
  }

  const nextStatus = parsed.data.status ?? existing.status;
  const project = await prisma.project.update({
    where: { id },
    data: {
      title: parsed.data.title,
      slug,
      clientId: parsed.data.clientId === undefined ? undefined : parsed.data.clientId || null,
      category: parsed.data.category,
      shortDescription: parsed.data.shortDescription,
      challenge: parsed.data.challenge,
      solution: parsed.data.solution,
      services:
        parsed.data.services !== undefined ? toJsonArray(parsed.data.services) : undefined,
      technologies:
        parsed.data.technologies !== undefined
          ? toJsonArray(parsed.data.technologies)
          : undefined,
      externalUrl: parsed.data.externalUrl,
      coverUrl: parsed.data.coverUrl,
      status: nextStatus,
      isFeatured: parsed.data.isFeatured,
      showInHome: parsed.data.showInHome,
      showInCarousel: parsed.data.showInCarousel,
      sortOrder: parsed.data.sortOrder,
      publishedAt:
        nextStatus === "published"
          ? existing.publishedAt || new Date()
          : nextStatus === "draft"
            ? null
            : undefined,
    },
    include: { client: true, images: { orderBy: { sortOrder: "asc" } } },
  });

  return NextResponse.json(project);
}

export async function DELETE(_request: Request, context: Ctx) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const { id } = await context.params;
  const existing = await prisma.project.findUnique({
    where: { id },
    include: { images: true },
  });
  if (!existing) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  await deleteUploadByUrl(existing.coverUrl);
  for (const image of existing.images) {
    await deleteUploadByUrl(image.url);
  }
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
