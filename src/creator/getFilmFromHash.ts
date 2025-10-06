import { getDatabase } from "../db/mongoClient";

export async function getFilmFromHash(filmUID: string) {
  try {
    const db = await getDatabase();
    const filmsCollection = db.collection("films");

    const film = await filmsCollection.findOne({ filmUID });

    return film;
  } catch (error) {
    console.error("Error fetching film:", error);
    return null;
  }
}
