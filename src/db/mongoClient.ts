// import { MongoClient, Db } from "mongodb";

// let cachedClient: MongoClient | null = null;
// let cachedDb: Db | null = null;

// export async function connectToDatabase() {
//   if (!process.env.MONGODB_URI) {
//     throw new Error("Please specify MONGODB_URI in the .env file");
//   }

//   // Return cached connection if available
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb };
//   }

//   const client = new MongoClient(process.env.MONGODB_URI);
//   await client.connect();
//   const db = client.db("cc-luma-db");

//   cachedClient = client;
//   cachedDb = db;

//   return { client, db };
// }

// export async function getDatabase(): Promise<Db> {
//   const { db } = await connectToDatabase();
//   return db;
// }
