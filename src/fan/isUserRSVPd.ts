import { getDatabase } from "../db/mongoClient";
import { verifyJWT } from "../utils/verifyJWT";

export async function isUserRSVPd(JWT: string, filmUID: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return "Invalid JWT";
  }

  // @ts-ignore
  const { sub } = checkJWT;

  const userUID = `userUID-${sub}`;

  try {
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // Find the user and check if filmUID is in their interestedIn array
    const user = await usersCollection.findOne({ userUID });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    const isRSVPd = user.interestedIn?.includes(filmUID) || false;

    return {
      isUserRSVPd: isRSVPd,
      userUID,
      filmUID,
    };
  } catch (error) {
    console.error("Error checking RSVP status:", error);
    return {
      success: false,
      error: "Failed to check RSVP status",
    };
  }
}
