import { createUID } from "../utils/createUID";
import { verifyJWT } from "../utils/verifyJWT";

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
  const { sub } = checkJWT;

  const creatorUID = `creatorUID-${sub}`;

  const filmUID = createUID("filmUID");

  const filmWithUIDs = {
    ...film,
    filmUID,
    creatorUID,
  };

  // @ts-ignore, remove JWT property
  delete filmWithUIDs.JWT;

  // then you need to upload the filmWithUIDs to mongo

  return true;
}
