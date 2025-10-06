import { verifyJWT } from "../utils/verifyJWT";

export async function createProfile(JWT: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return "Invalid JWT";
  }

  // @ts-ignore
  const { sub, email, name, picture } = checkJWT;

  const userUID = `userUID-${sub}`;

  // TODO: populate a blank user object (update profile will add specifics) and then add to the DB

  return true;
}
