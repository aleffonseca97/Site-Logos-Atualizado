import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  name: z.string().trim().min(1),
  website: z.string().trim().url().optional().or(z.literal("")).nullable(),
  logoUrl: z.string().optional().nullable(),
  logoDarkUrl: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
  showInMarquee: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().int().optional(),
  notes: z.string().optional().nullable(),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const clients = await prisma.client.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(clients);
}

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
  }

  const client = await prisma.client.create({
    data: {
      name: parsed.data.name,
      website: parsed.data.website || null,
      logoUrl: parsed.data.logoUrl || null,
      logoDarkUrl: parsed.data.logoDarkUrl || null,
      isActive: parsed.data.isActive ?? true,
      showInMarquee: parsed.data.showInMarquee ?? false,
      isFeatured: parsed.data.isFeatured ?? false,
      sortOrder: parsed.data.sortOrder ?? 0,
      notes: parsed.data.notes || null,
    },
  });

  return NextResponse.json(client, { status: 201 });
}
