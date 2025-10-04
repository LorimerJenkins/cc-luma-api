import { readFile } from "fs/promises";
import { join } from "path";

export async function getFilmFromHash(filmUID: string) {
  const filePath = join(process.cwd(), "src", "creator", "filmData.json");
  const fileContent = await readFile(filePath, "utf-8");
  const filmData = JSON.parse(fileContent);

  const film = filmData.find((film: any) => film.filmUID === filmUID);
  return film;
}
