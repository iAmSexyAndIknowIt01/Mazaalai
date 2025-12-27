// app/shop/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/data/products';

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-pink-50 text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
          <Link href="/" className="text-lg font-semibold">
            Mazaalai<span className="text-pink-500">Alert</span>
          </Link>
        </div>
      </header>

      {/* PRODUCT LIST */}
      <main className="max-w-7xl mx-auto px-5 py-20">
        <h1 className="text-3xl font-semibold mb-12 text-center">
          Манай <span className="text-pink-500">бүтээгдэхүүнүүд</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition flex flex-col"
            >
              <div className="relative h-60 mb-6">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <h2 className="text-xl font-semibold mb-2">
                {product.name}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {product.description}
              </p>

              {/* COLORS */}
              <div className="flex gap-2 mb-4">
                {product.colors.map((c) => (
                  <span
                    key={c.name}
                    className="w-5 h-5 rounded-full border"
                    title={c.name}
                    style={{ backgroundColor: c.name.toLowerCase() }}
                  />
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold">
                  {product.price.toLocaleString()}₮
                </span>

                <Link href={`/shop/${product.id}`}>
                  <button className="bg-pink-500 text-white px-5 py-2 rounded-full text-sm hover:bg-pink-600 transition">
                    Дэлгэрэнгүй
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © 2025 Mazaalai Alert
      </footer>
    </div>
  );
}
