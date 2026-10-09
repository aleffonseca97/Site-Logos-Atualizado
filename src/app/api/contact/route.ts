import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(2, "name_required"),
  email: z.string().trim().email("email_invalid"),
  company: z.string().trim().optional().nullable(),
  projectType: z.string().trim().min(1, "project_type_required"),
  message: z.string().trim().min(10, "message_short"),
  consent: z.boolean().refine((value) => value === true, {
    message: "consent_required",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "invalid_data" },
        { status: 400 },
      );
    }

    await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        projectType: parsed.data.projectType,
        message: parsed.data.message,
        consent: true,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "save_message_failed" }, { status: 500 });
  }
}
