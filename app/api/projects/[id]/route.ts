import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type ProjectRow = {
  id: number;
  name: string;
  image: string[]; // text[] in Postgres
  description: string;
  location: string;
  created_at: string;
};

// PATCH /api/projects/:id
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const { name, image, description, location } = body as {
      name: string;
      image: string | string[];
      description: string;
      location: string;
    };

    const imageArray: string[] = Array.isArray(image)
      ? image
      : image
      ? [image]
      : [];

    const result = await query<ProjectRow>(
      `
      UPDATE projects
      SET name = $1,
          image = $2::text[],
          description = $3,
          location = $4
      WHERE id = $5
      RETURNING *
      `,
      [name, imageArray, description, location, id],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 },
      );
    }

    const row = result.rows[0];

    const normalized: ProjectRow = {
      ...row,
      image: (row.image ?? []) as string[],
    };

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
}

// DELETE /api/projects/:id
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await query("DELETE FROM projects WHERE id = $1", [id]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 },
    );
  }
}