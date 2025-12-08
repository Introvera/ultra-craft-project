// import { NextResponse } from "next/server";
// import { query } from "@/lib/db";

// type ProductRow = {
//   id: number;
//   name: string;
//   image: string;
//   short_description: string;
//   long_description: string;
//   created_at: string;
//   categories: string[] | null;
//   filters: string[] | null;
// };

// // GET /api/products
// export async function GET() {
//   try {
//     const result = await query<ProductRow>(
//       "SELECT * FROM products ORDER BY created_at DESC",
//     );

//     const rows = result.rows.map((r) => ({
//       ...r,
//       categories: (r.categories ?? []) as string[],
//       filters: (r.filters ?? []) as string[],
//     }));

//     return NextResponse.json(rows);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch products" },
//       { status: 500 },
//     );
//   }
// }

// // POST /api/products
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const {
//       name,
//       image,
//       short_description,
//       long_description,
//       categories,
//       filters,
//     } = body;

//     if (!name || !image || !short_description || !long_description) {
//       return NextResponse.json(
//         { error: "All required fields must be provided" },
//         { status: 400 },
//       );
//     }

//     const categoriesArray: string[] = Array.isArray(categories)
//       ? (categories as string[])
//       : [];

//     const filtersArray: string[] = Array.isArray(filters)
//       ? (filters as string[])
//       : [];

//     // convert to JSON text for jsonb columns
//     const categoriesJson = JSON.stringify(categoriesArray);
//     const filtersJson = JSON.stringify(filtersArray);

//     const result = await query<ProductRow>(
//       `
//       INSERT INTO products 
//         (name, image, short_description, long_description, categories, filters)
//       VALUES 
//         ($1, $2, $3, $4, $5::jsonb, $6::jsonb)
//       RETURNING *
//       `,
//       [
//         name,
//         image,
//         short_description,
//         long_description,
//         categoriesJson,
//         filtersJson,
//       ],
//     );

//     const row = result.rows[0];

//     const normalized: ProductRow = {
//       ...row,
//       categories: (row.categories ?? []) as string[],
//       filters: (row.filters ?? []) as string[],
//     };

//     return NextResponse.json(normalized, { status: 201 });
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return NextResponse.json(
//       { error: "Failed to create product" },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type ProductRow = {
  id: number;
  name: string;
  image: string[];                 // ⬅️ now an array
  short_description: string;
  long_description: string;
  created_at: string;
  categories: string[] | null;
  filters: string[] | null;
};

// GET /api/products
export async function GET() {
  try {
    const result = await query<ProductRow>(
      "SELECT * FROM products ORDER BY created_at DESC",
    );

    const rows = result.rows.map((r: { categories: any; filters: any; }) => ({
      ...r,
      // image is already string[] from PG
      categories: (r.categories ?? []) as string[],
      filters: (r.filters ?? []) as string[],
    }));

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching products:", error);
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
      image, // can be string | string[]
      short_description,
      long_description,
      categories,
      filters,
    } = body as {
      name: string;
      image: string | string[];
      short_description: string;
      long_description: string;
      categories?: string[] | null;
      filters?: string[] | null;
    };

    const imageArray: string[] = Array.isArray(image)
      ? image
      : image
      ? [image]
      : [];

    if (
      !name ||
      imageArray.length === 0 ||
      !short_description ||
      !long_description
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided" },
        { status: 400 },
      );
    }

    const categoriesArray: string[] = Array.isArray(categories)
      ? categories
      : [];

    const filtersArray: string[] = Array.isArray(filters)
      ? filters
      : [];

    const categoriesJson = JSON.stringify(categoriesArray);
    const filtersJson = JSON.stringify(filtersArray);

    const result = await query<ProductRow>(
      `
      INSERT INTO products 
        (name, image, short_description, long_description, categories, filters)
      VALUES 
        ($1, $2::text[], $3, $4, $5::jsonb, $6::jsonb)
      RETURNING *
      `,
      [
        name,
        imageArray,
        short_description,
        long_description,
        categoriesJson,
        filtersJson,
      ],
    );

    const row = result.rows[0];

    const normalized: ProductRow = {
      ...row,
      categories: (row.categories ?? []) as string[],
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