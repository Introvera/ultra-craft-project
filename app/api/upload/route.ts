import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

/** Trim and strip accidental wrapping quotes from .env values */
function envTrim(key: string): string | undefined {
  const raw = process.env[key];
  if (raw == null || raw === "") return undefined;
  let v = raw.trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  return v.trim();
}

function configureCloudinary() {
  const cloud_name = envTrim("CLOUDINARY_CLOUD_NAME");
  const api_key = envTrim("CLOUDINARY_API_KEY");
  const api_secret = envTrim("CLOUDINARY_API_SECRET");
  if (!cloud_name || !api_key || !api_secret) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
  }
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  });
}

const MAX_MB = 8;
const MAX_BYTES = MAX_MB * 1024 * 1024;

function getSafeErrorMessage(err: any) {
  // Cloudinary errors usually have .message
  const msg = err?.message || "Failed to upload image";

  // Optional: nicer messages for common cases
  if (/File size too large|too large/i.test(msg)) {
    return `Image must be smaller than ${MAX_MB}MB`;
  }
  if (/Invalid image/i.test(msg)) {
    return "Invalid image file. Please upload a valid image.";
  }
  if (/timeout|timed out/i.test(msg)) {
    return "Upload timed out. Please try again.";
  }
  if (/Invalid Signature/i.test(msg)) {
    return "Image upload failed: Cloudinary rejected the request (invalid API credentials). Check CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env — no extra characters after the value.";
  }

  return msg;
}

export async function POST(req: Request) {
  try {
    configureCloudinary();

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 8MB limit (fail fast)
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `Image must be smaller than ${MAX_MB}MB` },
        { status: 413 }
      );
    }

    // basic type check (optional but useful)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 415 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "ultracraft-products",
          resource_type: "image",
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error("Upload returned no result"));
          resolve(result);
        },
      );
      stream.on("error", reject);
      stream.end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error: any) {
    console.error("Error uploading image:", error);

    return NextResponse.json(
      { error: getSafeErrorMessage(error) },
      { status: error?.http_code || 500 }
    );
  }
}