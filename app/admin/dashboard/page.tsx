// app/admin/dashboard/page.tsx
'use client';

import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-semibold mb-8">
        Админ самбар
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          📦 Бүтээгдэхүүн удирдах
        </Link>

        <div className="bg-white p-6 rounded-xl shadow">
          🧾 Захиалгууд
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          👤 Хэрэглэгчид
        </div>
      </div>
    </div>
  );
}
