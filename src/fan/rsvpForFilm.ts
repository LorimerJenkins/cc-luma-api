import { verifyJWT } from "../utils/verifyJWT";

export async function rsvpForFilm(JWT: string, filmUID: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return "Invalid JWT";
  }

  // @ts-ignore
  const { sub, email, name, picture } = checkJWT;

  const userUID = `userUID-${sub}`;

  // we then now need to search for the users object in userData.json and update the interestedIn array with the filmUID

  return true;
}
