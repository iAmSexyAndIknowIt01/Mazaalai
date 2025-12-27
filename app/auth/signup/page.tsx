'use client'; // Хэрэв хуудсанд useState, useEffect, useRouter байгаа бол

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // signup логик
    router.push('/shop');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Бүртгүүлэх</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />
        <input
          type="password"
          placeholder="Нууц үг"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition"
        >
          Бүртгүүлэх
        </button>
      </div>
    </div>
  );
}
