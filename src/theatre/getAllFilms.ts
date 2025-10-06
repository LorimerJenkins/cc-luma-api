import { getDatabase } from "../db/mongoClient";

export async function getAllFilms() {
  try {
    const db = await getDatabase();
    const filmsCollection = db.collection("films");

    const films = await filmsCollection.find({}).toArray();

    return films;
  } catch (error) {
    console.error("Error fetching all films:", error);
    return [];
  }
}
