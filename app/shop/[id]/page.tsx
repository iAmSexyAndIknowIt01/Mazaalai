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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

          {/* PRICE + ACTIONS */}
          <div className="border-t pt-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-lg font-bold">
                {product.price.toLocaleString()}₮
              </span>
              <span className="text-sm text-gray-500">
                Stock: {product.stock}
              </span>
            </div>

            <div className="flex gap-3">
              {/* BUY */}
              <button
                disabled={product.stock === 0}
                className="
                  flex-1 bg-pink-500 text-white
                  py-3 rounded-full
                  hover:bg-pink-600 transition
                  disabled:opacity-40
                "
              >
                Худалдан авах
              </button>

              {/* ADD TO CART (hover + animation) */}
              <button
                disabled={product.stock === 0}
                className="
                  group flex items-center gap-2
                  px-5 py-3 rounded-full
                  border border-pink-300
                  text-pink-500
                  transition-all duration-200
                  hover:bg-pink-500 hover:text-white
                  hover:shadow-md
                  active:scale-95
                  disabled:opacity-40
                  disabled:hover:bg-transparent
                  whitespace-nowrap
                "
              >
                <span
                  className="
                    text-lg
                    transition-transform duration-200
                    group-hover:scale-110
                  "
                >
                  🛒
                </span>

                <span className="text-sm font-medium">
                  Сагслах
                </span>
              </button>
            </div>

            {product.stock === 0 && (
              <p className="text-xs text-red-500">
                Бараа дууссан байна
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
