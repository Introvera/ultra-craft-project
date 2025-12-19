// import { NextResponse } from "next/server";
// import { v2 as cloudinary } from "cloudinary";

// // Use Node runtime (Cloudinary needs Buffer etc.)
// export const runtime = "nodejs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
//   api_key: process.env.CLOUDINARY_API_KEY!,
//   api_secret: process.env.CLOUDINARY_API_SECRET!,
// });

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json({ error: "No file provided" }, { status: 400 });
//     }

//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const uploadResult = await new Promise<any>((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             folder: "ultracraft-products",
//           },
//           (error, result) => {
//             if (error || !result) return reject(error);
//             resolve(result);
//           },
//         )
//         .end(buffer);
//     });

//     return NextResponse.json({ url: uploadResult.secure_url });
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return NextResponse.json(
//       { error: "Failed to upload image" },
//       { status: 500 },
//     );
//   }
// }



import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

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

  return msg;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // ✅ 8MB limit (fail fast)
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `Image must be smaller than ${MAX_MB}MB` },
        { status: 413 }
      );
    }

    // ✅ basic type check (optional but useful)
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 415 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "ultracraft-products",
            resource_type: "image",
            unique_filename: true,
            overwrite: false,
          },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          }
        )
        .end(buffer);
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