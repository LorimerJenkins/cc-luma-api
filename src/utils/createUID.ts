import { randomBytes } from "crypto";

export function createUID(
  typeOfUID: "creatorUID" | "userUID" | "filmUID",
): string {
  // Combine timestamp + random bytes for uniqueness
  const timestamp = Date.now().toString(36); // Base36 for compactness
  const randomPart = randomBytes(16).toString("hex"); // 128 bits of randomness
  const UID = `${timestamp}-${randomPart}`;

  if (typeOfUID === "creatorUID") {
    return `creatorUID-${UID}`;
  } else if (typeOfUID === "userUID") {
    return `userUID-${UID}`;
  } else if (typeOfUID === "filmUID") {
    return `filmUID-${UID}`;
  } else {
    throw new Error("Invalid UID param");
  }
}
