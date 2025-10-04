import { readFile } from "fs/promises";
import { join } from "path";

export async function getAllFilms() {
  const filePath = join(process.cwd(), "src", "data", "filmData.json");
  const fileContent = await readFile(filePath, "utf-8");
  const filmData = JSON.parse(fileContent);

  return filmData;
}
