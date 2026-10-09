import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(_request: Request, context: Ctx) {
  const admin = await requireAdmin();
  if (!admin) return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });

  const { id } = await context.params;
  await prisma.contactMessage.update({
    where: { id },
    data: { read: true },
  });

  return NextResponse.json({ ok: true });
}
