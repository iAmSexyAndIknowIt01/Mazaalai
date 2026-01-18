import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local");
}

const client = new MongoClient(process.env.MONGODB_URI!, {
  tls: true,
  tlsAllowInvalidCertificates: true, // <-- энэ нэмэгдсэн
});
const clientPromise = client.connect();

export default clientPromise;
