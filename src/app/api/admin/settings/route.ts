import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const schema = z.object({
  email: z.string().email().optional(),
  whatsapp: z.string().optional(),
  socialInstagram: z.string().optional(),
  socialLinkedin: z.string().optional(),
  socialFacebook: z.string().optional(),
  socialTiktok: z.string().optional(),
  legalName: z.string().optional(),
  legalAddress: z.string().optional(),
  legalVat: z.string().optional(),
  marqueeEnabled: z.boolean().optional(),
  marqueeAutoplay: z.boolean().optional(),
});

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: { id: "default" },
  });
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Dati non validi" }, { status: 400 });
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: parsed.data,
    create: { id: "default", ...parsed.data },
  });

  return NextResponse.json(settings);
}
