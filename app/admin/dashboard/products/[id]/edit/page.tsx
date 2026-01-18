"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

type Product = {
  _id: string;
  type: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  images?: string[];
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  const [form, setForm] = useState({
    type: "device",
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  /* =========================
     Fetch product
     ========================= */
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(
        `/api/admin/products/${productId}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        alert("Failed to load product");
        return;
      }

      const p: Product = await res.json();

      setForm({
        type: p.type ?? "device",
        name: p.name ?? "",
        price: String(p.price ?? ""),
        stock: String(p.stock ?? ""),
        description: p.description ?? "",
      });

      setExistingImages(p.images ?? []);
      setInitialLoading(false);
    };

    fetchProduct();
  }, [productId]);

  /* =========================
     Image handler
     ========================= */
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setNewImages(Array.from(e.target.files).slice(0, 4));
  };

  /* =========================
     Submit update
     ========================= */
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

        /* =========================
            FormData build
            ========================= */
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("type", form.type);
        formData.append("price", String(Number(form.price)));
        formData.append("stock", String(Number(form.stock)));
        formData.append("description", form.description);

        // хуучин зургууд (устгаагүй байгаа)
        existingImages.forEach((img) => {
            formData.append("existingImages", img);
        });

        // шинээр нэмсэн зургууд
        newImages.forEach((file) => {
            formData.append("images", file);
        });

        const res = await fetch(
            `/api/admin/products/${productId}`,
            {
            method: "PUT",
            body: formData, // ❗ Content-Type бүү тавь
            }
        );

        const data = await res.json();

        if (!res.ok) {
            alert(data.error || "Failed to update product");
            setLoading(false);
            return;
        }

        router.push("/admin/dashboard/products");
    };


  if (initialLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div
      className="
        max-w-6xl mx-auto p-6 space-y-6
        bg-slate-50 rounded-2xl text-black
      "
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">
            Edit Product
          </h1>
          <p className="text-sm">
            Update product information
          </p>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          className="
            rounded-lg px-6 py-2 text-sm text-white
            bg-(--brand-primary)
            hover:bg-(--brand-secondary)
            disabled:opacity-40
          "
        >
          {loading ? "Saving..." : "Update"}
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="space-y-6">
          {/* Basic Info */}
          <section className="rounded-xl border bg-white p-6">
            <h2 className="font-medium mb-4">
              Basic Info
            </h2>

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
              Product Images
            </h2>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onImageChange}
            />

            <div className="grid grid-cols-4 gap-3 mt-4">
              {existingImages.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  className="aspect-square object-cover rounded-lg border"
                />
              ))}

              {newImages.map((img, i) => (
                <img
                  key={`new-${i}`}
                  src={URL.createObjectURL(img)}
                  className="aspect-square object-cover rounded-lg border"
                />
              ))}
            </div>
          </section>

          {/* Description */}
          <section className="rounded-xl border bg-white p-6">
            <textarea
              className="
                w-full rounded-lg border px-3 py-2
                min-h-30
              "
              placeholder="Product description..."
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </section>
        </div>

        {/* RIGHT – Preview */}
        <div className="rounded-xl border bg-white p-6 h-fit">
          <p className="text-sm mb-3">Preview</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[...existingImages, ...newImages.map((f) =>
                URL.createObjectURL(f)
              )].slice(0, 4).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="aspect-square object-cover rounded-lg border"
                />
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                {form.name}
              </h3>
              <p className="text-sm mt-1">
                {form.description}
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t">
              <span className="font-bold">
                ¥{form.price}
              </span>
              <span className="text-xs">
                Stock: {form.stock}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
