import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type ProductRow = {
  id: number;
  name: string;
  image: string;
  short_description: string;
  long_description: string;
  created_at: string;
};

// GET /api/products  → list all products
export async function GET() {
  try {
    const result = await query<ProductRow>("SELECT * FROM products ORDER BY created_at DESC");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// POST /api/products  → create a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, image, short_description, long_description } = body;

    if (!name || !image || !short_description || !long_description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const result = await query<ProductRow>(
      `
      INSERT INTO products (name, image, short_description, long_description)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [name, image, short_description, long_description],
    );

    const product = result.rows[0];

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 },
    );
  }
}