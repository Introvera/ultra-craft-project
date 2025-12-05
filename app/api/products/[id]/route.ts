// import { NextResponse } from "next/server";
// import { query } from "@/lib/db";

// type RouteContext = {
//   // 👇 params is now a Promise
//   params: Promise<{ id: string }>;
// };

// type ProductRow = {
//   id: number;
//   name: string;
//   image: string;
//   short_description: string;
//   long_description: string;
//   created_at: string;
// };

// // PATCH /api/products/:id  → update
// export async function PATCH(req: Request, { params }: RouteContext) {
//   try {
//     // 👇 unwrap the Promise
//     const { id: idStr } = await params;
//     const id = Number(idStr);

//     if (Number.isNaN(id)) {
//       return NextResponse.json({ error: "Invalid id" }, { status: 400 });
//     }

//     const body = await req.json();
//     const { name, image, short_description, long_description } = body;

//     const result = await query<ProductRow>(
//       `
//       UPDATE products
//       SET name = $1,
//           image = $2,
//           short_description = $3,
//           long_description = $4
//       WHERE id = $5
//       RETURNING *
//       `,
//       [name, image, short_description, long_description, id],
//     );

//     if (result.rows.length === 0) {
//       return NextResponse.json(
//         { error: "Product not found" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(result.rows[0]);
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return NextResponse.json(
//       { error: "Failed to update product" },
//       { status: 500 },
//     );
//   }
// }

// // DELETE /api/products/:id  → delete
// export async function DELETE(_req: Request, { params }: RouteContext) {
//   try {
//     // 👇 unwrap the Promise
//     const { id: idStr } = await params;
//     const id = Number(idStr);

//     if (Number.isNaN(id)) {
//       return NextResponse.json({ error: "Invalid id" }, { status: 400 });
//     }

//     await query("DELETE FROM products WHERE id = $1", [id]);
//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     return NextResponse.json(
//       { error: "Failed to delete product" },
//       { status: 500 },
//     );
//   }
// }


import { NextResponse } from "next/server";
import { query } from "@/lib/db";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type ProductRow = {
  id: number;
  name: string;
  image: string;
  short_description: string;
  long_description: string;
  created_at: string;
  categories: string[] | null;
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
      categories,
      filters,
    } = body;

    const categoriesArray: string[] = Array.isArray(categories)
      ? (categories as string[])
      : [];

    const filtersArray: string[] = Array.isArray(filters)
      ? (filters as string[])
      : [];

    const categoriesJson = JSON.stringify(categoriesArray);
    const filtersJson = JSON.stringify(filtersArray);

    const result = await query<ProductRow>(
      `
      UPDATE products
      SET name = $1,
          image = $2,
          short_description = $3,
          long_description = $4,
          categories = $5::jsonb,
          filters = $6::jsonb
      WHERE id = $7
      RETURNING *
      `,
      [
        name,
        image,
        short_description,
        long_description,
        categoriesJson,
        filtersJson,
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
      categories: (row.categories ?? []) as string[],
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