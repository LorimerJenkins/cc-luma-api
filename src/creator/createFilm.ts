import { createUID } from "../utils/createUID";
import { verifyJWT } from "../utils/verifyJWT";
import { getDatabase } from "../db/mongoClient";

export interface Film {
  film: string;
  targetCities: string[];
  date: string;
  time: string;
  runTimeMins: string;
  genre: string;
  trailer: string;
  coverImage: string;
  description: string;
  cast: string[];
  otherImages: string[];
}

export async function createFilm(film: Film, JWT: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return "Invalid JWT";
  }

  // @ts-ignore
  const { sub, name } = checkJWT;

  const creatorUID = `creatorUID-${sub}`;
  const filmUID = createUID("filmUID");

  const filmWithUIDs = {
    ...film,
    filmUID,
    creatorUID,
    creatorName: name,
  };

  // @ts-ignore, remove JWT property
  delete filmWithUIDs.JWT;

  // Upload to MongoDB
  try {
    const db = await getDatabase();
    const filmsCollection = db.collection("films");

    const result = await filmsCollection.insertOne(filmWithUIDs);

    return {
      success: true,
      filmUID,
      insertedId: result.insertedId,
    };
  } catch (error) {
    console.error("Error inserting film:", error);
    return {
      success: false,
      error: "Failed to create film",
    };
  }
}
