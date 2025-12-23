// src/lib/dbConnect.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbname = process.env.DBNAME;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const collections = {
  SERVICES: "services",
  USERS: "users",
  CART: "cart",
};

export const dbConnect = (cname) => {
  return client.db(dbname).collection(cname);
};