import { query } from "@/lib/db";

export default async function AdminLoginPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <a className="text-2xl font-semibold text-red-800" href="admin/products">
        Admin Products Page
      </a>
      <a className="text-2xl font-semibold text-green-800" href="admin/projects">
        Admin Projects Page
      </a>
    </div>
  );
}