'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      alert("Нууц үг буруу!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-80">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-4 py-2 rounded mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition"
        >
          Нэвтрэх
        </button>
      </div>
    </div>
  );
}
