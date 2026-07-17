import mongoose from "mongoose";

function getMongoUri(): string {
  return process.env.MONGODB_URI?.trim() || "";
}

interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const g = globalThis as unknown as { _mongooseCache?: GlobalMongoose };

let cache = g._mongooseCache;
if (!cache) {
  cache = { conn: null, promise: null };
  g._mongooseCache = cache;
}

async function connectDB(): Promise<typeof mongoose> {
  const uri = getMongoUri();
  if (!uri) {
    throw new Error("Variable d'environnement MONGODB_URI manquante.");
  }
  if (cache!.conn) return cache!.conn;
  if (!cache!.promise) {
    cache!.promise = mongoose.connect(uri);
  }
  cache!.conn = await cache!.promise;
  return cache!.conn;
}

export default connectDB;
