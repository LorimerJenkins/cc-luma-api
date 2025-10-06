import { getDatabase } from "../db/mongoClient";
import { verifyJWT } from "../utils/verifyJWT";

export async function rsvpForFilm(JWT: string, filmUID: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return {
      success: false,
      error: "Invalid JWT",
    };
  }

  // @ts-ignore
  const { sub, email, name, picture } = checkJWT;

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

    // Check if already RSVP'd
    if (user.interestedIn && user.interestedIn.includes(filmUID)) {
      return {
        success: true,
        message: "Already RSVP'd for this film",
        userUID,
        filmUID,
      };
    }

    // Add filmUID to interestedIn array
    const result = await usersCollection.updateOne(
      { userUID },
      { $addToSet: { interestedIn: filmUID } }, // $addToSet prevents duplicates
    );

    if (result.modifiedCount === 0) {
      return {
        success: false,
        error: "Failed to RSVP",
      };
    }

    return {
      success: true,
      message: "Successfully RSVP'd for film",
      userUID,
      filmUID,
    };
  } catch (error) {
    console.error("Error RSVPing for film:", error);
    return {
      success: false,
      error: "Failed to RSVP for film",
    };
  }
}
