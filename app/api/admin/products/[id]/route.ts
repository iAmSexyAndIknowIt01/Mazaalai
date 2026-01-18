import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

/* =========================
   GET: Single product (JSON)
   ========================= */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...product,
      _id: product._id.toString(),
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

/* =========================
   PUT: Update product (FormData + Images)
   ========================= */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    /* ---------- FormData ---------- */
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const description = formData.get("description") as string;

    const existingImages = formData.getAll("existingImages") as string[];
    const files = formData.getAll("images") as File[];

    if (!name || price <= 0) {
      return NextResponse.json(
        { error: "Invalid data" },
        { status: 400 }
      );
    }

    /* ---------- Save new images ---------- */
    const newImagePaths: string[] = [];

    if (files.length > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      for (const file of files) {
        if (!file || !file.name) continue;

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = `${Date.now()}-${file.name}`;

        await fs.writeFile(
          path.join(uploadDir, filename),
          buffer
        );

        newImagePaths.push(`/uploads/${filename}`);
      }
    }

    const images = [...existingImages, ...newImagePaths];

    /* ---------- Update DB ---------- */
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name,
          type,
          price,
          stock,
          description,
          images,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE PRODUCT ERROR:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
