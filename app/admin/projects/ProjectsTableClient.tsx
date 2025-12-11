// components/admin/ProductsTableClient.tsx
"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import ProjectsTableImpl from "@/components/admin/ProjectsTable"; // only for typing

// Infer props from your existing ProductsTable component
type ProjectsTableProps = ComponentProps<typeof ProjectsTableImpl>;

// Dynamically load ProductsTable with SSR disabled
const ProjectsTable = dynamic(
  () => import("@/components/admin/ProjectsTable"),
  {
    ssr: false,
  }
);

export default function ProjectsTableClient(props: ProjectsTableProps) {
  return <ProjectsTable {...props} />;
}