import { verifyJWT } from "../utils/verifyJWT";

export async function updateProfile(JWT: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return "Invalid JWT";
  }

  // @ts-ignore
  const { sub: userUID, email, name, picture } = checkJWT;

  return true;
}
