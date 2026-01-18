import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to environment variables");
}

const client = new MongoClient(process.env.MONGODB_URI!, {
  tls: true,
  // SRV URI-д directConnection бүү ашигла
});
const clientPromise = client.connect();

export default clientPromise;
