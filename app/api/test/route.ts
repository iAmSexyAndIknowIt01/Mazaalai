import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();

  const collections = await db.collections();

  return NextResponse.json({
    status: "ok",
    collections: collections.map(c => c.collectionName),
  });
}
