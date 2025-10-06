import jwt from "jsonwebtoken";

export async function verifyJWT(JWT: string) {
  // TODO: you need to check the sig of the JWT and exp
  // try {
  //   const decoded = jwt.verify(token, secret);
  //   console.log(decoded);
  // } catch (error) {
  //   console.error("Invalid token:", error.message);
  // }

  const decoded = jwt.decode(JWT);

  return decoded;
}
