import { getDatabase } from "../db/mongoClient";
import { verifyJWT } from "../utils/verifyJWT";

export async function getProfile(JWT: string, userUID?: string) {
  // If JWT is provided, use it to get the userUID
  if (JWT) {
    const checkJWT = await verifyJWT(JWT);

    if (!checkJWT) {
      return "Invalid JWT";
    }

    // @ts-ignore
    const { sub } = checkJWT;

    userUID = `userUID-${sub}`;
  }

  // If no userUID at this point, return error
  if (!userUID) {
    return {
      success: false,
      error: "No userUID provided",
    };
  }

  try {
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    const profile = await usersCollection.findOne({ userUID });

    if (!profile) {
      return {
        success: false,
        error: "Profile not found",
      };
    }

    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {
      success: false,
      error: "Failed to fetch profile",
    };
  }
}
