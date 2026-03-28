import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type ProjectRow = {
  id: number;
  name: string;
  image: string[];
  description: string;
  location: string;
  created_at: string;
};

// GET /api/projects
export async function GET() {
  try {
    const result = await query<ProjectRow>(
      "SELECT * FROM projects ORDER BY created_at DESC"
    );

    const rows = result.rows.map((r) => ({
      ...r,
      image: Array.isArray(r.image) ? r.image : [],
    }));

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      image, // string | string[]
      description,
      location,
    } = body as {
      name?: string;
      image: string | string[];
      description?: string;
      location?: string;
    };

    const imageArray: string[] = Array.isArray(image)
      ? image
      : image
        ? [image]
        : [];

    const nameStr = typeof name === "string" ? name.trim() : "";
    const descStr =
      typeof description === "string" ? description.trim() : "";
    const locStr = typeof location === "string" ? location.trim() : "";

    if (imageArray.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      );
    }

    const result = await query<ProjectRow>(
      `
      INSERT INTO projects
        (name, image, description, location)
      VALUES
        ($1, $2::text[], $3, $4)
      RETURNING *
      `,
      [nameStr, imageArray, descStr, locStr]
    );

    const row = result.rows[0];

    const normalized: ProjectRow = {
      ...row,
      image: Array.isArray(row.image) ? row.image : [],
    };

    return NextResponse.json(normalized, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}