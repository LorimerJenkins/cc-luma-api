import { getDatabase } from "./mongoClient";

export async function getSimpleClusterInfo() {
  try {
    const db = await getDatabase();

    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((col) => col.name);

    // Get document counts for each collection
    const collectionStats = await Promise.all(
      collectionNames.map(async (name) => ({
        name,
        count: await db.collection(name).countDocuments(),
      })),
    );

    return {
      database: db.databaseName,
      collections: collectionStats,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error getting cluster info:", error);
    throw error;
  }
}

console.log(await getSimpleClusterInfo());
