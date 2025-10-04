// sever imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotEnv from "dotenv";
dotEnv.config();

// endpoint imports
import { getTheatreCorporationInfo } from "./src/theatre/getTheatreCorporationInfo";

const app: express.Application = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Home (ping)
app.get("/", (req: express.Request, res: express.Response) => {
  console.log("\x1b[32m", `Ping`);
  res.json({ response: true });
});

// Get theatre corporation info
const endPoint1 = "/getTheatreCorporationInfo";
app.get(endPoint1, async (req, res) => {
  try {
    const { theatreCorporationUid } = req.query;

    if (!theatreCorporationUid || typeof theatreCorporationUid !== "string") {
      return res.status(400).json({
        success: false,
        error: "theatreCorporationUid query parameter is required",
      });
    }

    const response = await getTheatreCorporationInfo(theatreCorporationUid);

    console.log(
      "\x1b[32m",
      `Response from ${endPoint1}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error("\x1b[31m", `Error from ${endPoint1}: ${error}`);
    res.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

// Start up server
export const portNumber = 3001;
app.listen(portNumber, () => {
  console.log();
  console.log("\x1b[32m", `========================================`);
  console.log("\x1b[32m", `Server **LIVE** listening on port ${portNumber}`);
  console.log("\x1b[32m", `========================================\n`);
});

export default app;
