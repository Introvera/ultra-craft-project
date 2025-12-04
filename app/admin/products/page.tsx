import { query } from "@/lib/db";
import ProductsTableClient from "./ProductsTableClient";

type ProductRow = {
  id: number;
  name: string;
  image: string;
  short_description: string;
  long_description: string;
  created_at: Date;
};

export default async function AdminProductsPage() {
  const result = await query<ProductRow>(
    "SELECT id, name, image, short_description, long_description, created_at FROM products ORDER BY created_at DESC",
  );

  // We just pass rows directly (snake_case) to the client component
  const products = result.rows.map((p) => ({
    ...p,
    created_at: p.created_at.toISOString(),
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