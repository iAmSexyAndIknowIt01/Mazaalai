// app/shop/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';


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

      {/* PRODUCT */}
      <main className="max-w-7xl mx-auto px-5 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className="relative">
          <div className="absolute inset-0 bg-pink-300/40 blur-3xl rounded-full" />
          <Image
            src="/products/mazaalai-alert.jpg"
            alt="Mazaalai Alert"
            width={600}
            height={600}
            className="relative rounded-3xl shadow-xl"
          />
        </div>

        {/* INFO */}
        <div>
          <p className="text-pink-500 text-sm font-medium mb-4">
            ХУВИЙН АЮУЛГҮЙ БАЙДАЛ
          </p>

          <h1 className="text-4xl font-bold mb-6">
            Mazaalai Alert
          </h1>

          <p className="text-gray-600 mb-8">
            Авсаархан, татахад идэвхждэг, чанга дуу болон гэрлээр анхааруулдаг
            хувийн хамгаалалтын төхөөрөмж.
          </p>

          <ul className="space-y-3 mb-8 text-sm text-gray-700">
            <li>• Дуу + гэрэл</li>
            <li>• Эмэгтэй, хүүхдэд тохиромжтой</li>
            <li>• Цүнх, түлхүүрт зүүх боломжтой</li>
            <li>• Цэнэг шаардахгүй</li>
          </ul>

          <div className="flex items-center gap-6 mb-10">
            <span className="text-4xl font-bold">59,000₮</span>
            <span className="text-sm text-gray-500">Нэг удаагийн төлбөр</span>
          </div>

          <button className="w-full sm:w-auto bg-pink-500 text-white px-10 py-4 rounded-full hover:bg-pink-600 transition">
            Сагсанд нэмэх
          </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-gray-500">
        © 2025 Mazaalai Alert
      </footer>
    </div>
  );
}
