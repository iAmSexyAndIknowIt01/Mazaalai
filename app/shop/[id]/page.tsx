// app/shop/[id]/page.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { products } from '@/data/products';

export default function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="min-h-screen bg-pink-50 px-5 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* IMAGE */}
        <Image
          src={selectedColor.image}
          alt={product.name}
          width={600}
          height={600}
          className="rounded-3xl shadow-xl"
        />

        {/* INFO */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* COLOR SELECT */}
          <div className="flex gap-3 mb-8">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor.name === c.name
                    ? 'border-pink-500'
                    : 'border-gray-300'
                }`}
                style={{ backgroundColor: c.name.toLowerCase() }}
              />
            ))}
          </div>

          <p className="text-3xl font-bold mb-8">
            {product.price.toLocaleString()}₮
          </p>

          <button className="bg-pink-500 text-white px-10 py-4 rounded-full hover:bg-pink-600 transition">
            Сагсанд нэмэх
          </button>
        </div>
      </div>
    </div>
  );
}
