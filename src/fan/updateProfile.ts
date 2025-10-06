// updateProfile.ts
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
  const { sub, email, name, picture } = checkJWT;

  const userUID = `userUID-${sub}`;

  // Console log the changes
  console.log("\x1b[36m", "=== Profile Update Request ===");
  console.log("\x1b[33m", `UserUID: ${userUID}`);
  console.log("\x1b[33m", `Email: ${email}`);
  console.log("\x1b[33m", `Name: ${name}`);
  console.log("\x1b[35m", "Updates to apply:");
  console.log(JSON.stringify(updates, null, 2));
  console.log("\x1b[36m", "==============================");

  // TODO: Actually update the database here

  return {
    success: true,
    userUID,
    appliedUpdates: updates,
  };
}
