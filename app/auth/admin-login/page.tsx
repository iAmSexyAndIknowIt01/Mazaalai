// Simplified example: hardcoded admin
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      alert("Нууц үг буруу!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <div className="bg-white p-10 rounded-3xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition"
        >
          Нэвтрэх
        </button>
      </div>
    </div>
  );
}
