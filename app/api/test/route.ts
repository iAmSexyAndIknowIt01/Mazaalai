import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // URI-д заасан default database
    const collections = await db.collections();

    return NextResponse.json({
      status: "ok",
      collections: collections.map(c => c.collectionName),
    });
  } catch (err) {
    console.error("GET COLLECTIONS ERROR:", err);
    return NextResponse.json(
      { status: "error", message: (err as Error).message },
      { status: 500 }
    );
  }
}
