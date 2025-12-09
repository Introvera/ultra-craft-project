"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.error || "Invalid username or password");
        return;
      }

      // Login success → cookie set by API → redirect
      router.push("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Try again.");
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    if (error) setError("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (error) setError("");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `url('/aboutus-page/abtuspage.png')`,
      }}
    >
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Admin Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-white text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <div>
            <label className="text-white text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/50"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          {error && (
            <p className="text-red-300 text-center text-sm font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-white/20 text-white font-semibold backdrop-blur-md hover:bg-white/30 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}