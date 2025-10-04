import { readFile } from "fs/promises";
import { join } from "path";

export async function getProfile(auth0UID: string) {
  const filePath = join(process.cwd(), "src", "fan", "userData.json");
  const fileContent = await readFile(filePath, "utf-8");
  const profileData = JSON.parse(fileContent);

  const profile = profileData.find(
    (profile: any) => profile.auth0UID === auth0UID,
  );
  return profile;
}
