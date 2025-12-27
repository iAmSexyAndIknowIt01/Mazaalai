// app/admin/products/page.tsx
'use client';

import { useState } from 'react';

export default function AdminProducts() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-semibold mb-10">
        Бүтээгдэхүүн удирдах
      </h1>

      <div className="bg-white rounded-xl p-8 shadow max-w-xl">
        <input
          placeholder="Бүтээгдэхүүний нэр"
          className="w-full border rounded-full px-5 py-3 mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Үнэ"
          type="number"
          className="w-full border rounded-full px-5 py-3 mb-6"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-full">
          Нэмэх
        </button>
      </div>
    </div>
  );
}
