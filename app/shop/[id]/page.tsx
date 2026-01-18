import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  images?: string[];
  type: string;
};

async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/${id}`,
    { cache: 'no-store' }
  );

  if (!res.ok) return null;
  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ Promise
}) {
  const { id } = await params; // ✅ заавал await

  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-pink-50 text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-5 py-4">
          <Link href="/shop" className="text-sm text-pink-500">
            ← Буцах
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12">

        {/* IMAGES */}
        <div className="space-y-4">
          {(product.images?.length
            ? product.images
            : ['/placeholder.png']
          ).map((src, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-3xl overflow-hidden bg-white"
            >
              <Image
                src={src}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase text-pink-500">
              {product.type}
            </span>
            <h1 className="text-3xl font-semibold mt-2">
              {product.name}
            </h1>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description || 'Тайлбар оруулаагүй байна'}
          </p>

          <div className="border-t pt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-lg font-bold">
                {product.price.toLocaleString()}₮
              </span>
              <span className="text-sm text-gray-500">
                Stock: {product.stock}
              </span>
            </div>

            <button
              className="
                w-full bg-pink-500 text-white
                py-3 rounded-full
                hover:bg-pink-600 transition
              "
            >
              Худалдан авах
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
