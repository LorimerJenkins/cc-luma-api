import { verifyJWT } from "../utils/verifyJWT";

export async function createProfile(JWT: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return "Invalid JWT";
  }

  return true;
}
