'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
};

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/admin/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

        {loading && (
          <p className="text-center text-gray-500">Ачааллаж байна...</p>
        )}

        {!loading && products.length === 0 && (
          <p className="text-center text-gray-500">
            Бүтээгдэхүүн олдсонгүй
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-3xl p-6 shadow hover:shadow-lg transition flex flex-col"
            >
              <div className="relative h-60 mb-6 bg-pink-100 rounded-2xl">
                <Image
                  src={product.images?.[0] || '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <h2 className="text-xl font-semibold mb-2">
                {product.name}
              </h2>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {product.description}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-lg font-bold">
                  {product.price.toLocaleString()}₮
                </span>

                <Link href={`/shop/${product._id}`}>
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
