import { readFile } from "fs/promises";
import { join } from "path";

export async function getTheatreCorporationInfo(theatreCorporationUID: string) {
  const filePath = join(process.cwd(), "src", "data", "theatreData.json");
  const fileContent = await readFile(filePath, "utf-8");
  const theatreData = JSON.parse(fileContent);

  const corporation = theatreData.find(
    (corp: any) => corp.theatreCorporationUID === theatreCorporationUID,
  );
  return corporation;
}
