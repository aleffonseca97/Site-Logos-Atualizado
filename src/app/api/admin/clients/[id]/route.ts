import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { deleteUploadByUrl } from "@/lib/storage";

const schema = z.object({
  name: z.string().trim().min(1).optional(),
  website: z.string().trim().url().optional().or(z.literal("")).nullable(),
  logoUrl: z.string().optional().nullable(),
  logoDarkUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  showInMarquee: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  notes: z.string().optional().nullable(),
});

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const { id } = await context.params;
  const client = await prisma.client.findUnique({
    where: { id },
    include: { projects: true, images: true },
  });
  if (!client) return NextResponse.json({ error: "Non trovato" }, { status: 404 });
  return NextResponse.json(client);
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

  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  if (
    parsed.data.logoUrl !== undefined &&
    existing.logoUrl &&
    parsed.data.logoUrl !== existing.logoUrl
  ) {
    await deleteUploadByUrl(existing.logoUrl);
  }

  const client = await prisma.client.update({
    where: { id },
    data: {
      ...parsed.data,
      website: parsed.data.website === "" ? null : parsed.data.website,
    },
  });

  return NextResponse.json(client);
}

export async function DELETE(_request: Request, context: Ctx) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const { id } = await context.params;
  const existing = await prisma.client.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Non trovato" }, { status: 404 });

  await deleteUploadByUrl(existing.logoUrl);
  await deleteUploadByUrl(existing.logoDarkUrl);
  await prisma.client.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
