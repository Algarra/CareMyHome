"use server";
import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) throw new Error("Add Mongo URI to .env.local");

// @ts-expect-error
let mongoCache = global.mongo;

if (!mongoCache) {
  // @ts-expect-error
  mongoCache = global.mongo = { conn: null, promise: null };
}

export const ConnectToDatabase = async (): Promise<{
  processes: Db;
  business: Db;
}> => {
  if (mongoCache.conn) return mongoCache.conn;

  if (!mongoCache.promise) {
    mongoCache.promise = MongoClient.connect(uri).then((client) => ({
      client,
      processes: client.db("processes"),
      business: client.db("business"),
    }));
  }

  mongoCache.conn = await mongoCache.promise;

  return mongoCache.conn;
};
