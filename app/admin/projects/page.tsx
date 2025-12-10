import { query } from "@/lib/db";
import ProjectsTableClient from "./ProjectsTableClient";

type ProjectRow = {
  id: number;
  name: string;
  image: string[] | null;
  description: string;
  location: string;
  created_at: Date;
};

export default async function AdminProjectsPage() {
  const result = await query<ProjectRow>(
    `
    SELECT
      id,
      name,
      image,
      description,
      location,
      created_at
    FROM projects
    ORDER BY created_at DESC
    `
  );

  const projects = result.rows.map((p) => ({
    ...p,
    created_at: p.created_at.toISOString(),
    image: (p.image ?? []) as string[],
  }));

  return (
    <div className="h-screen p-8">
      <ProjectsTableClient initialProjects={projects} />
    </div>
  );
}
