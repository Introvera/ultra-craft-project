import { query } from "@/lib/db";
import ProductsTableClient from "./ProductsTableClient";

type ProductRow = {
  id: number;
  name: string;
  image: string;
  short_description: string;
  long_description: string;
  created_at: Date;
  categories: string[] | null;
  filters: string[] | null;
};

export default async function AdminProductsPage() {
  const result = await query<ProductRow>(
    `
    SELECT
      id,
      name,
      image,
      short_description,
      long_description,
      created_at,
      categories,
      filters
    FROM products
    ORDER BY created_at DESC
    `,
  );

  const products = result.rows.map((p) => ({
    ...p,
    created_at: p.created_at.toISOString(),
    // ensure arrays, never null
    categories: (p.categories ?? []) as string[],
    filters: (p.filters ?? []) as string[],
  }));

  return (
    <div className="h-screen p-8">
      <h1 className="text-2xl font-semibold mb-4 text-default-foreground">
        Products
      </h1>
      <ProductsTableClient initialProducts={products} />
    </div>
  );
}