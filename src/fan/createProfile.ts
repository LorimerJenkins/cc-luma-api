import { getDatabase } from "../db/mongoClient";
import { verifyJWT } from "../utils/verifyJWT";

export async function createProfile(JWT: string) {
  const checkJWT = await verifyJWT(JWT);

  if (!checkJWT) {
    return "Invalid JWT";
  }

  // @ts-ignore
  const { sub, email, name, picture } = checkJWT;

  const userUID = `userUID-${sub}`;

  try {
    const db = await getDatabase();
    const usersCollection = db.collection("users");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ userUID });

    if (existingUser) {
      return {
        success: true,
        message: "User already exists",
        userUID,
      };
    }

    // Create blank user object with basic info from JWT
    const newUser = {
      name,
      userUID,
      profilePic: picture || "",
      bio: "",
      email,
      gender: "",
      number: "",
      birthday: "",
      socials: {
        x: "",
        youtube: "",
        linkedin: "",
        instagram: "",
        tiktok: "",
        website: "",
      },
      interestedIn: [],
      creatorAccount: {
        creatorUID: `creatorUID-${sub}`,
        createdFilmUID: [],
      },
    };

    const result = await usersCollection.insertOne(newUser);

    return {
      success: true,
      userUID,
      insertedId: result.insertedId,
    };
  } catch (error) {
    console.error("Error creating profile:", error);
    return {
      success: false,
      error: "Failed to create profile",
    };
  }
}
