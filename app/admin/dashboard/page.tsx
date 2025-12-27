'use client';
import { useState } from "react";
import { products as initialProducts, ProductVariant } from "../../../data/products";

export default function AdminDashboard() {
  const [products, setProducts] = useState<ProductVariant[]>(initialProducts);

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-pink-50 p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-5 rounded-2xl shadow">
            <h2 className="font-bold text-xl mb-2">{p.name}</h2>
            <p className="text-gray-600 mb-4">{p.description}</p>
            <button
              onClick={() => handleDelete(p.id)}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Устгах
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
