// app/page.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { JSX } from 'react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Home(): JSX.Element {
  return (
    <div className="bg-pink-50 text-gray-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">
            Mazaalai<span className="text-pink-500">Alert</span>
          </h1>
          <Link href ="/shop">
            <button className="bg-pink-500 text-white px-5 py-2 rounded-full text-sm shadow hover:bg-pink-600 transition">
              Захиалах
            </button>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-pink-200/40 via-white to-white" />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-7xl mx-auto px-5 py-28 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center"
        >
          <div>
            <p className="text-pink-500 text-sm font-medium mb-4">
              ХУВИЙН АЮУЛГҮЙ БАЙДАЛ
            </p>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold leading-tight mb-6">
              Хайртай хүмүүсээ
              <span className="text-pink-500"> чимээгүйхэн </span>
              хамгаална
            </h2>
            <p className="text-gray-600 max-w-xl mb-10">
              Цүнх, түлхүүр, хувцсанд зүүж хэрэглэдэг авсаархан төхөөрөмж.
              Татах төдийд чанга дуу, гэрлээр анхааруулна.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <button className="bg-pink-500 text-white px-8 py-4 rounded-full shadow hover:bg-pink-600 transition w-full sm:w-auto">
                  Одоо авах
                </button>
              </Link>
              <button className="border border-gray-300 px-8 py-4 rounded-full text-gray-700 hover:bg-gray-100 transition w-full sm:w-auto">
                Дэлгэрэнгүй
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-pink-300/40 blur-3xl rounded-full" />
            <Image
              src="/hero-device.jpg"
              alt="Mazaalai Alert"
              width={500}
              height={500}
              className="relative mx-auto rounded-3xl shadow-xl"
            />
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-semibold text-center mb-20"
          >
            Яагаад <span className="text-pink-500">Mazaalai Alert</span> вэ?
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ['Авсаархан', 'Цүнх, түлхүүрт зүүж хэрэглэнэ'],
              ['Татахаас л идэвхжинэ', 'Нэг хөдөлгөөн – шууд дохио'],
              ['Дуу + гэрэл', 'Анхаарал татна'],
              ['Эмэгтэй, хүүхдэд', 'Хэрэглэхэд маш хялбар'],
            ].map(([title, desc], i) => (
              <motion.div
                key={title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-pink-50 border border-pink-100 p-6 hover:shadow-lg transition"
              >
                <h4 className="font-medium mb-3">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="py-28 bg-pink-50">
        <div className="max-w-7xl mx-auto px-5">

          <motion.h3
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl font-semibold text-center mb-14"
          >
            Үүнийг <span className="text-pink-500">хэрхэн ашиглах</span> вэ?
          </motion.h3>

          {/* MOBILE SLIDER */}
          <div className="md:hidden overflow-x-auto">
            <div className="flex gap-6 w-max pb-4">
              {[
                ['01', 'Төхөөрөмжийг бэлдэх', '/how-1.jpg'],
                ['02', 'Цүнх, түлхүүрт зүүх', '/how-2.jpg'],
                ['03', 'Аюул мэдрэгдвэл татах', '/how-3.jpg'],
                ['04', 'Чанга дуу + гэрэл асна', '/how-4.jpg'],
                ['05', 'Ойр орчны анхаарал татна', '/how-5.jpg'],
                ['06', 'Тусламж хурдан ирнэ', '/how-6.jpg'],
              ].map(([step, title, img]) => (
                <div
                  key={step}
                  className="min-w-70 bg-white rounded-3xl overflow-hidden shadow"
                >
                  <div className="relative h-52">
                    <Image src={img} alt={title} fill className="object-cover" />
                    <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                      {step}
                    </span>
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="font-medium">{title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP GRID */}
          <div className="hidden md:grid grid-cols-3 gap-10">
            {[
              ['01', 'Төхөөрөмжийг бэлдэх', '/how-1.jpg'],
              ['02', 'Цүнх, түлхүүрт зүүх', '/how-2.jpg'],
              ['03', 'Аюул мэдрэгдвэл татах', '/how-3.jpg'],
              ['04', 'Чанга дуу + гэрэл асна', '/how-4.jpg'],
              ['05', 'Ойр орчны анхаарал татна', '/how-5.jpg'],
              ['06', 'Тусламж хурдан ирнэ', '/how-6.jpg'],
            ].map(([step, title, img], i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <div className="relative h-56">
                  <Image src={img} alt={title} fill className="object-cover" />
                  <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full">
                    {step}
                  </span>
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-medium">{title}</h4>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* BUY SECTION */}
      <section className="py-32 bg-pink-100">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center px-5"
        >
          <h3 className="text-3xl font-semibold mb-6">
            Таны аюулгүй байдалд
            <span className="text-pink-500"> нэг л алхам</span>
          </h3>
          <p className="text-gray-600 mb-10">
            Энгийн, найдвартай, өдөр бүр хэрэглэнэ
          </p>

          <div className="bg-white rounded-3xl p-10 shadow-xl">
            <p className="text-4xl font-bold mb-2">59,000₮</p>
            <p className="text-sm text-gray-500 mb-8">
              Нэг удаагийн төлбөр
            </p>
            <Link href="/shop">
              <button className="w-full bg-pink-500 text-white py-4 rounded-full hover:bg-pink-600 transition">
                Одоо захиалах
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 text-center text-sm text-gray-500 bg-pink-50">
        © 2025 Mazaalai Alert
      </footer>
    </div>
  );
}
