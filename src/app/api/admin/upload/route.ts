import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/storage";

export async function POST(request: Request) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const file = form.get("file");
    const prefix = String(form.get("prefix") || "asset");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file_missing" }, { status: 400 });
    }

    const saved = await saveUpload(file, prefix);
    return NextResponse.json(saved);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "upload_failed" },
      { status: 400 },
    );
  }
}
