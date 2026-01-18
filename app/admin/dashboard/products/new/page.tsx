"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);

  const [form, setForm] = useState({
    type: "device",
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files).slice(0, 4));
  };

  /* =============================
     ✅ UPDATED SUBMIT LOGIC
     ============================= */
  const submit = async () => {
    if (!form.name.trim()) {
      alert("Product name is required");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      alert("Price must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      const fd = new FormData();

      fd.append("type", form.type);
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("stock", form.stock || "0");
      fd.append("description", form.description || "");

      images.forEach((img) => {
        fd.append("images", img); // ⬅️ ЧУХАЛ
      });

      const res = await fetch("/api/admin/products", {
        method: "POST",
        body: fd, // ❗ headers БАЙХГҮЙ
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create product");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard/products");
    } catch (e) {
      console.error(e);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6 bg-slate-50 rounded-2xl text-black">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Create Product</h1>
          <p className="text-sm">Add product to Mazaalai Alert shop</p>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="rounded-lg px-6 py-2 text-sm text-white
            bg-[var(--brand-primary)]
            hover:bg-[var(--brand-secondary)]
            disabled:opacity-40"
        >
          {loading ? "Saving..." : "Publish"}
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Basic Info */}
          <section className="rounded-xl border bg-white p-6">
            <h2 className="font-medium mb-4">Basic Info</h2>

            <div className="space-y-4">
              <select
                className="w-full rounded-lg border px-3 py-2"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value })
                }
              >
                <option value="device">Device</option>
                <option value="plan">Plan</option>
                <option value="accessory">Accessory</option>
              </select>

              <input
                className="w-full rounded-lg border px-3 py-2"
                placeholder="Product name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-xl border bg-white p-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Price (JPY)"
                className="rounded-lg border px-3 py-2"
                value={form.price}
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Stock"
                className="rounded-lg border px-3 py-2"
                value={form.stock}
                onChange={(e) =>
                  setForm({ ...form, stock: e.target.value })
                }
              />
            </div>
          </section>

          {/* Images */}
          <section className="rounded-xl border bg-white p-6">
            <h2 className="font-medium mb-3">
              Product Images (max 4)
            </h2>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageChange}
            />

            <div className="grid grid-cols-4 gap-3 mt-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg border bg-gray-50 overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(img)}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Description */}
          <section className="rounded-xl border bg-white p-6">
            <textarea
              className="w-full rounded-lg border px-3 py-2 min-h-[120px]"
              placeholder="Product description..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </section>
        </div>

        {/* RIGHT – Preview */}
        <div className="rounded-xl border bg-white p-6 h-fit">
          <p className="text-sm mb-3">Preview</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {images.length > 0 ? (
                images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    className="aspect-square object-cover rounded-lg border"
                  />
                ))
              ) : (
                <div className="col-span-2 text-sm">
                  Image preview
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                {form.name || "Product name"}
              </h3>
              <p className="text-sm mt-1">
                {form.description || "Product description"}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-bold">
                ¥{form.price || 0}
              </span>
              <span className="text-xs">
                Stock: {form.stock || 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
