import { query } from "@/lib/db";
import ProductsTableClient from "./ProductsTableClient";

export const dynamic = "force-dynamic";

type ProductRow = {
  id: number;
  name: string;
  image: string[] | null;
  short_description: string;
  long_description: string;
  created_at: Date;
  main_category: string | null;
  sub_type: string | null;
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
      main_category,
      sub_type,
      filters
    FROM products
    ORDER BY created_at DESC
    `,
  );

  const products = result.rows.map((p: ProductRow) => ({
    ...p,
    created_at: p.created_at.toISOString(),
    filters: (p.filters ?? []) as string[],
    image: (p.image ?? []) as string[],
  }));

  return (
    <div className="h-screen p-8">

      <ProductsTableClient initialProducts={products} />
    </div>
  );
}