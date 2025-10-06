import { getDatabase } from "../db/mongoClient";
import { verifyJWT } from "../utils/verifyJWT";

interface ProfileUpdates {
  bio?: string;
  gender?: string;
  number?: string;
  birthday?: string;
  socials?: {
    x?: string;
    youtube?: string;
    linkedin?: string;
    instagram?: string;
    tiktok?: string;
    website?: string;
  };
  interestedIn?: string[];
}

export async function updateProfile(JWT: string, updates: ProfileUpdates) {
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

    // Build the update object, handling nested socials object
    const updateObject: any = {};

    if (updates.bio !== undefined) updateObject.bio = updates.bio;
    if (updates.gender !== undefined) updateObject.gender = updates.gender;
    if (updates.number !== undefined) updateObject.number = updates.number;
    if (updates.birthday !== undefined)
      updateObject.birthday = updates.birthday;
    if (updates.interestedIn !== undefined)
      updateObject.interestedIn = updates.interestedIn;

    // Handle nested socials object
    if (updates.socials) {
      Object.entries(updates.socials).forEach(([key, value]) => {
        if (value !== undefined) {
          updateObject[`socials.${key}`] = value;
        }
      });
    }

    const result = await usersCollection.updateOne(
      { userUID },
      { $set: updateObject },
    );

    if (result.matchedCount === 0) {
      return {
        success: false,
        error: "Profile not found",
      };
    }

    return {
      success: true,
      userUID,
      appliedUpdates: updates,
      modifiedCount: result.modifiedCount,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: "Failed to update profile",
    };
  }
}
