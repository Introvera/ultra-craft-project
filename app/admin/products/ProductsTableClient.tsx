// components/admin/ProductsTableClient.tsx
"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import ProductsTableImpl from "@/components/admin/ProductsTable"; // only for typing

// Infer props from your existing ProductsTable component
type ProductsTableProps = ComponentProps<typeof ProductsTableImpl>;

// Dynamically load ProductsTable with SSR disabled
const ProductsTable = dynamic(
  () => import("@/components/admin/ProductsTable"),
  {
    ssr: false,
  }
);

export default function ProductsTableClient(props: ProductsTableProps) {
  return <ProductsTable {...props} />;
}