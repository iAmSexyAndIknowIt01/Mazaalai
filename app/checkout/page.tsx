// app/checkout/page.tsx
'use client';

import { useCart } from '@/store/cart';

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.totalPrice());

  return (
    <div className="min-h-screen bg-pink-50 px-5 py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-10 shadow-xl">
        <h1 className="text-3xl font-semibold mb-10">
          Захиалга баталгаажуулах
        </h1>

        {items.map((item) => (
          <div
            key={`${item.id}-${item.color}`}
            className="flex justify-between border-b py-4"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Өнгө: {item.color} × {item.qty}
              </p>
            </div>
            <p className="font-semibold">
              {item.price * item.qty}₮
            </p>
          </div>
        ))}

        <div className="flex justify-between text-xl font-bold mt-8">
          <span>Нийт</span>
          <span>{total}₮</span>
        </div>

        <button className="w-full mt-10 bg-pink-500 text-white py-4 rounded-full hover:bg-pink-600 transition">
          Төлбөр төлөх
        </button>
      </div>
    </div>
  );
}
