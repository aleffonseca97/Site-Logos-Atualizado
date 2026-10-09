import { randomUUID } from "crypto";
import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

export function publicUploadUrl(filename: string) {
  return `/uploads/${filename}`;
}

export async function saveUpload(file: File, prefix = "asset") {
  if (!ALLOWED.has(file.type)) {
    throw new Error("unsupported_format");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("file_too_large");
  }

  await ensureUploadDir();

  const ext =
    file.type === "image/svg+xml"
      ? "svg"
      : file.type.split("/")[1]?.replace("jpeg", "jpg") || "bin";
  const filename = `${prefix}-${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return {
    filename,
    url: publicUploadUrl(filename),
    size: file.size,
    type: file.type,
  };
}

export async function deleteUploadByUrl(url?: string | null) {
  if (!url || !url.startsWith("/uploads/")) return;
  const filename = url.replace("/uploads/", "");
  if (filename.includes("..") || filename.includes("/") || filename.includes("\\")) {
    return;
  }
  try {
    await unlink(path.join(UPLOAD_DIR, filename));
  } catch {
    // file may already be missing
  }
}
