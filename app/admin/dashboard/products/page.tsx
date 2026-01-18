async function getProducts() {
  const res = await fetch("http://localhost:3000/api/admin/products", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6 text-black">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <a
          href="/admin/dashboard/products/new"
          className="
            rounded-lg px-4 py-2 text-sm text-white
            bg-(--brand-primary)
          "
        >
          + Add Product
        </a>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-white overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Stock</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Updated</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="p-6 text-center text-gray-500"
                >
                  No products
                </td>
              </tr>
            )}

            {products.map((p: any) => (
              <tr
                key={p._id}
                className="border-b hover:bg-slate-50"
              >
                <td className="p-3 font-medium">
                  {p.name}
                </td>

                <td className="p-3">
                  {p.type ?? "-"}
                </td>

                <td className="p-3 text-right">
                  ¥{p.price?.toLocaleString()}
                </td>

                <td className="p-3 text-right">
                  {p.stock ?? 0}
                </td>

                <td className="p-3">
                  {p.status ?? "active"}
                </td>

                <td className="p-3 text-xs text-gray-600">
                  {p.createdAt
                    ? formatDate(p.createdAt)
                    : "-"}
                </td>

                <td className="p-3 text-xs text-gray-600">
                  {p.updatedAt
                    ? formatDate(p.updatedAt)
                    : "-"}
                </td>

                {/* ✅ Actions */}
                <td className="p-3 text-right">
                  <a
                    href={`/admin/dashboard/products/${p._id}/edit`}
                    className="
                      text-sm text-blue-600
                      hover:underline
                    "
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
