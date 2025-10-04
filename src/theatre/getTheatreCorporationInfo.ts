import { readFile } from "fs/promises";
import { join } from "path";

export async function getTheatreCorporationInfo(theatreCorporationUid: string) {
  const filePath = join(process.cwd(), "src", "theatre", "theatreData.json");
  const fileContent = await readFile(filePath, "utf-8");
  const theatreData = JSON.parse(fileContent);

  const corporation = theatreData.find(
    (corp: any) => corp.theatreCorporationUid === theatreCorporationUid,
  );
  return corporation;
}
