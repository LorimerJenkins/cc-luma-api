import { getDatabase } from "../db/mongoClient";
import { verifyJWT } from "../utils/verifyJWT";

export async function getFilmFromHash(filmUID: string, JWT?: string) {
  try {
    let userUID: string | undefined;
    let userSignedUp = false;

    // Only verify JWT if provided
    if (JWT) {
      const checkJWT = await verifyJWT(JWT);

      if (!checkJWT) {
        return "Invalid JWT";
      }

      // @ts-ignore
      const { sub } = checkJWT;
      userUID = `userUID-${sub}`;
    }

    const db = await getDatabase();
    const filmsCollection = db.collection("films");
    const usersCollection = db.collection("users");

    const film = await filmsCollection.findOne({ filmUID });

    if (!film) {
      return null;
    }

    // Find all users who are interested in this film
    const interestedUsers = await usersCollection
      .find({ interestedIn: filmUID })
      .toArray();

    // Check if the current user is signed up for this film (only if JWT was provided)
    if (userUID) {
      const currentUser = await usersCollection.findOne({ userUID });
      userSignedUp = currentUser?.interestedIn?.includes(filmUID) || false;
    }

    let usersInterested;

    if (userSignedUp) {
      // Return all user UIDs if user is signed up
      usersInterested = interestedUsers.map((user) => user.userUID);
    } else {
      // Return 3 random user UIDs if user is not signed up or JWT not provided
      const shuffled = interestedUsers.sort(() => 0.5 - Math.random());
      usersInterested = shuffled.slice(0, 3).map((user) => user.userUID);
    }

    return {
      ...film,
      usersInterested,
    };
  } catch (error) {
    console.error("Error fetching film:", error);
    return null;
  }
}
