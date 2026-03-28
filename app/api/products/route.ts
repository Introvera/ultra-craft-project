
import { NextResponse } from "next/server";
import { query } from "@/lib/db";

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

// GET /api/products
export async function GET() {
  try {
    const result = await query<ProductRow>(
      "SELECT * FROM products ORDER BY created_at DESC",
    );

    const rows = result.rows.map((r: ProductRow) => ({
      ...r,
      filters: (r.filters ?? []) as string[],
    }));

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    if (error instanceof Error) {
      console.error("Stack:", error.stack);
    }
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST /api/products
export async function POST(req: Request) {
  try {
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
      name?: string;
      image: string | string[];
      short_description?: string;
      long_description?: string;
      main_category?: string | null;
      sub_type?: string | null;
      filters?: string[] | null;
    };

    const imageArray: string[] = Array.isArray(image)
      ? image
      : image
        ? [image]
        : [];

    const nameStr = typeof name === "string" ? name.trim() : "";
    const shortStr =
      typeof short_description === "string" ? short_description.trim() : "";
    const longStr =
      typeof long_description === "string" ? long_description.trim() : "";

    if (imageArray.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 },
      );
    }

    const filtersArray: string[] = Array.isArray(filters) ? filters : [];

    const result = await query<ProductRow>(
      `
      INSERT INTO products 
        (name, image, short_description, long_description, main_category, sub_type, filters)
      VALUES 
        ($1, $2::text[], $3, $4, $5, $6, $7::jsonb)
      RETURNING *
      `,
      [
        nameStr,
        imageArray,
        shortStr,
        longStr,
        main_category ?? null,
        sub_type ?? null,
        JSON.stringify(filtersArray),
      ],
    );

    const row = result.rows[0];

    const normalized: ProductRow = {
      ...row,
      filters: (row.filters ?? []) as string[],
    };

    return NextResponse.json(normalized, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}