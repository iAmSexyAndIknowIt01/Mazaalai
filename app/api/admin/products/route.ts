import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import path from "path";
import fs from "fs/promises";

/* =========================
   GET: Product list
   ========================= */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const products = await db
      .collection("products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const formatted = products.map((p) => ({
      ...p,
      _id: p._id.toString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/* =========================
   POST: Create product (WITH IMAGES)
   ========================= */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const type = (formData.get("type") as string) || "device";
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock") || 0);
    const description = (formData.get("description") as string) || "";

    const files = formData.getAll("images") as File[];

    /* -------- validation -------- */
    if (!name || price <= 0) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 }
      );
    }

    /* -------- save images -------- */
    const imagePaths: string[] = [];

    if (files.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      for (const file of files) {
        if (!file || !file.name) continue;

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);

        await fs.writeFile(filepath, buffer);
        imagePaths.push(`/uploads/${filename}`);
      }
    }

    /* -------- insert -------- */
    const client = await clientPromise;
    const db = client.db();

    const product = {
      name,
      type,
      price,
      stock,
      description,
      images: imagePaths, // ✅ ЭНД БОДИТОЙ УТГА ОРНО
      status: "active",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("products")
      .insertOne(product);

    return NextResponse.json(
      {
        _id: result.insertedId.toString(),
        ...product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
