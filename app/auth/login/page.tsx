// app/auth/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50 px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Нэвтрэх
        </h1>

        <input
          type="email"
          placeholder="Имэйл"
          className="w-full border rounded-full px-5 py-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Нууц үг"
          className="w-full border rounded-full px-5 py-3 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-pink-500 text-white py-3 rounded-full hover:bg-pink-600 transition">
          Нэвтрэх
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Бүртгэлгүй юу?{' '}
          <Link href="/auth/signup" className="text-pink-500">
            Бүртгүүлэх
          </Link>
        </p>
      </div>
    </div>
  );
}
