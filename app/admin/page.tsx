"use client";

import { FolderKanban, Package } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminHomePage() {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [totalProjects, setTotalProjects] = useState<number>(0);

  // Fetch counts from API
  useEffect(() => {
    async function fetchCounts() {
      try {
        const productsRes = await fetch("/api/products");
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setTotalProducts(productsData.length);
        }

        const projectsRes = await fetch("/api/projects");
        if (projectsRes.ok) {
          const projectsData = await projectsRes.json();
          setTotalProjects(projectsData.length);
        }
      } catch (err) {
        console.error("Failed to fetch counts:", err);
      }
    }

    fetchCounts();

    // Optional: poll every 10s for real-time updates
    const interval = setInterval(fetchCounts, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ece9e6] to-[#ffffff] p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here is the summary of your admin panel.
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow border">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-700 font-semibold">Total Products</h3>
              <Package className="text-blue-500" />
            </div>
            <p className="text-3xl font-bold mt-3">{totalProducts}</p>
          </div>

          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow border">
            <div className="flex justify-between items-center">
              <h3 className="text-gray-700 font-semibold">Total Projects</h3>
              <FolderKanban className="text-green-500" />
            </div>
            <p className="text-3xl font-bold mt-3">{totalProjects}</p>
          </div>
        </div>

        {/* Main Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Products Card */}
          <a
            href="/admin/products"
            className="group bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow hover:shadow-xl transition border hover:border-blue-400"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-200 transition">
                <Package size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage Products
                </h2>
                <p className="text-gray-600 mt-1">
                  Add, update, and organize product listings.
                </p>
              </div>
            </div>
          </a>

          {/* Projects Card */}
          <a
            href="/admin/projects"
            className="group bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow hover:shadow-xl transition border hover:border-green-400"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-200 transition">
                <FolderKanban size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Manage Projects
                </h2>
                <p className="text-gray-600 mt-1">
                  Review, update, and publish projects.
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
