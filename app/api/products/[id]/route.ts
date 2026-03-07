import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type ProductRow = {
  id: number;
  name: string;
  image: string[];
  short_description: string;
  long_description: string;
  created_at: string;
  main_category: string | null;
  sub_type: string | null;
  filters: string[] | null;
};

// PATCH /api/products/:id
export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    const body = await req.json();
    const {
      name,
      image,
      short_description,
      long_description,
      main_category,
      sub_type,
      filters,
    } = body as {
      name: string;
      image: string | string[];
      short_description: string;
      long_description: string;
      main_category?: string | null;
      sub_type?: string | null;
      filters?: string[] | null;
    };

    const imageArray: string[] = Array.isArray(image)
      ? image
      : image
      ? [image]
      : [];

    const filtersArray: string[] = Array.isArray(filters) ? filters : [];

    const result = await query<ProductRow>(
      `
      UPDATE products
      SET name = $1,
          image = $2::text[],
          short_description = $3,
          long_description = $4,
          main_category = $5,
          sub_type = $6,
          filters = $7::jsonb
      WHERE id = $8
      RETURNING *
      `,
      [
        name,
        imageArray,
        short_description,
        long_description,
        main_category ?? null,
        sub_type ?? null,
        JSON.stringify(filtersArray),
        id,
      ],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 },
      );
    }

    const row = result.rows[0];

    const normalized: ProductRow = {
      ...row,
      filters: (row.filters ?? []) as string[],
    };

    return NextResponse.json(normalized);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// DELETE unchanged
export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const { id: idStr } = await params;
    const id = Number(idStr);

    if (Number.isNaN(id)) {
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });
    }

    await query("DELETE FROM products WHERE id = $1", [id]);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}