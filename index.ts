// sever imports
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotEnv from "dotenv";
dotEnv.config();

// endpoint imports
import { getTheatreCorporationInfo } from "./src/theatre/getTheatreCorporationInfo";
import { getFilmFromHash } from "./src/creator/getFilmFromHash";
import { getProfile } from "./src/fan/getProfile";
import { updateProfile } from "./src/fan/updateProfile";
import { getAllFilms } from "./src/theatre/getAllFilms";
import { createProfile } from "./src/fan/createProfile";
import { createFilm } from "./src/creator/createFilm";
import { validateFilm } from "./src/creator/validateFilmParams";
import { type Film } from "./src/creator/createFilm";

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

//--------------------------------------------------------------------------------------------------------------- theatre

// Get theatre corporation info
const getTheatreCorporationInfoEndPoint = "/getTheatreCorporationInfo";
app.get(getTheatreCorporationInfoEndPoint, async (req, res) => {
  try {
    const { theatreCorporationUID } = req.query;

    if (!theatreCorporationUID || typeof theatreCorporationUID !== "string") {
      return res.status(400).json({
        success: false,
        error: "theatreCorporationUID query parameter is required",
      });
    }

    const response = await getTheatreCorporationInfo(theatreCorporationUID);

    console.log(
      "\x1b[32m",
      `Response from ${getTheatreCorporationInfoEndPoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error(
      "\x1b[31m",
      `Error from ${getTheatreCorporationInfoEndPoint}: ${error}`,
    );
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

//-------------------------------

// Get all films
const getAllFilmsEndpoint = "/getAllFilms";
app.get(getAllFilmsEndpoint, async (req, res) => {
  try {
    const response = await getAllFilms();

    console.log(
      "\x1b[32m",
      `Response from ${getAllFilmsEndpoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error("\x1b[31m", `Error from ${getAllFilmsEndpoint}: ${error}`);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

//--------------------------------------------------------------------------------------------------------------- creator

// Get film from hash
const getFilmFromHashEndPoint = "/getFilmFromHash";
app.get(getFilmFromHashEndPoint, async (req, res) => {
  try {
    const { filmUID } = req.query;

    if (!filmUID || typeof filmUID !== "string") {
      return res.status(400).json({
        success: false,
        error: "filmUID query parameter is required",
      });
    }

    const response = await getFilmFromHash(filmUID);

    console.log(
      "\x1b[32m",
      `Response from ${getFilmFromHashEndPoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error(
      "\x1b[31m",
      `Error from ${getFilmFromHashEndPoint}: ${error}`,
    );
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

//-------------------------------

// Create film
const createFilmEndPoint = "/createFilm";
app.post(createFilmEndPoint, async (req, res) => {
  try {
    const film = req.body as Film;

    if (!film) {
      return res.status(400).json({
        success: false,
        error: "film data is required in request body",
      });
    }

    const validation = validateFilm(film);
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        error: validation.error,
      });
    }

    const response = await createFilm(film);

    console.log(
      "\x1b[32m",
      `Response from ${createFilmEndPoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error("\x1b[31m", `Error from ${createFilmEndPoint}: ${error}`);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

//--------------------------------------------------------------------------------------------------------------- fan

// Get profile from auth0ID
const getProfileEndPoint = "/getProfile";
app.get(getProfileEndPoint, async (req, res) => {
  try {
    const { auth0UID } = req.query;

    if (!auth0UID || typeof auth0UID !== "string") {
      return res.status(400).json({
        success: false,
        error: "auth0UID query parameter is required",
      });
    }

    const response = await getProfile(auth0UID);

    console.log(
      "\x1b[32m",
      `Response from ${getProfileEndPoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error("\x1b[31m", `Error from ${getProfileEndPoint}: ${error}`);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

//-------------------------------

// Update profile from auth0ID
const updateProfileEndPoint = "/updateProfile";
app.post(updateProfileEndPoint, async (req, res) => {
  try {
    const { JWT } = req.body;

    if (!JWT || typeof JWT !== "string") {
      return res.status(400).json({
        success: false,
        error: "JWT is required in request body",
      });
    }

    const response = await updateProfile(JWT);

    console.log(
      "\x1b[32m",
      `Response from ${updateProfileEndPoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error("\x1b[31m", `Error from ${updateProfileEndPoint}: ${error}`);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

//-------------------------------

// Create profile from JWT
const createProfileEndPoint = "/createProfile";
app.post(createProfileEndPoint, async (req, res) => {
  try {
    const { JWT } = req.body;

    if (!JWT || typeof JWT !== "string") {
      return res.status(400).json({
        success: false,
        error: "JWT is required in request body",
      });
    }

    const response = await createProfile(JWT);

    console.log(
      "\x1b[32m",
      `Response from ${createProfileEndPoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error("\x1b[31m", `Error from ${createProfileEndPoint}: ${error}`);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

//--------------------------------------------------------------------------------------------------------------- start up server

export const portNumber = process.env.PORT;
app.listen(portNumber, () => {
  console.log();
  console.log("\x1b[32m", `========================================`);
  console.log("\x1b[32m", `Server **LIVE** listening on port ${portNumber}`);
  console.log("\x1b[32m", `========================================\n`);
});

export default app;
