import { getDatabase } from "../db/mongoClient";
import { verifyJWT } from "../utils/verifyJWT";

export async function cancelUserRSVP(JWT: string, filmUID: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return {
      success: false,
      error: "Invalid JWT",
    };
  }

  // @ts-ignore
  const { sub } = checkJWT;

  const userUID = `userUID-${sub}`;

  try {
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // Check if user exists
    const user = await usersCollection.findOne({ userUID });

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    // Check if user is actually RSVP'd for this film
    if (!user.interestedIn || !user.interestedIn.includes(filmUID)) {
      return {
        success: false,
        error: "User is not RSVP'd for this film",
      };
    }

    // Remove filmUID from interestedIn array
    const result = await usersCollection.updateOne(
      { userUID },
      { $pull: { interestedIn: filmUID as any } }, // $pull removes the item from array
    );

    if (result.modifiedCount === 0) {
      return {
        success: false,
        error: "Failed to cancel RSVP",
      };
    }

    return {
      success: true,
      message: "Successfully cancelled RSVP for film",
      userUID,
      filmUID,
    };
  } catch (error) {
    console.error("Error cancelling RSVP:", error);
    return {
      success: false,
      error: "Failed to cancel RSVP for film",
    };
  }
}
