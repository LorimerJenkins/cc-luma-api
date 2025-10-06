import { readFile } from "fs/promises";
import { join } from "path";
import { verifyJWT } from "../utils/verifyJWT";

export async function getProfile(JWT: string, userUID: string) {
  if (JWT) {
    const checkJWT = await verifyJWT(JWT);

    if (!checkJWT) {
      return "Invalid JWT";
    }

    // @ts-ignore
    const { sub } = checkJWT;

    userUID = `userUID-${sub}`;
  }

  const filePath = join(process.cwd(), "src", "data", "userData.json");
  const fileContent = await readFile(filePath, "utf-8");
  const profileData = JSON.parse(fileContent);

  const profile = profileData.find(
    (profile: any) => profile.userUID === userUID,
  );
  return profile;
}
