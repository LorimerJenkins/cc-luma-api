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
import { rsvpForFilm } from "./src/fan/rsvpForFilm";
import { isUserRSVPd } from "./src/fan/isUserRSVPd";

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
app.post(getFilmFromHashEndPoint, async (req, res) => {
  try {
    const { filmUID, JWT } = req.body;

    if (!filmUID || typeof filmUID !== "string") {
      return res.status(400).json({
        success: false,
        error: "filmUID is required in request body",
      });
    }
    const response = await getFilmFromHash(filmUID, JWT);

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

    // @ts-ignore, we add a JWT to the film object for ease in this endpoint
    const JWT = film.JWT;

    const response = await createFilm(film, JWT);

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

// Get profile from JWT
const getProfileEndPoint = "/getProfile";
app.post(getProfileEndPoint, async (req, res) => {
  try {
    const { JWT, userUID } = req.body;

    const response = await getProfile(JWT, userUID);

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

// Update profile from JWT
const updateProfileEndPoint = "/updateProfile";
app.post(updateProfileEndPoint, async (req, res) => {
  try {
    const { JWT, updates } = req.body;

    if (!JWT || typeof JWT !== "string") {
      return res.status(400).json({
        success: false,
        error: "JWT is required in request body",
      });
    }

    if (!updates || typeof updates !== "object") {
      return res.status(400).json({
        success: false,
        error: "updates object is required in request body",
      });
    }

    const response = await updateProfile(JWT, updates);

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

//-------------------------------

// RSVP for film
const rsvpForFilmEndPoint = "/rsvpForFilm";
app.post(rsvpForFilmEndPoint, async (req, res) => {
  try {
    const { JWT, filmUID } = req.body;

    if (
      !JWT ||
      typeof JWT !== "string" ||
      !filmUID ||
      typeof filmUID !== "string"
    ) {
      return res.status(400).json({
        success: false,
        error: "JWT + filmUID are required in request body",
      });
    }

    const response = await rsvpForFilm(JWT, filmUID);

    console.log(
      "\x1b[32m",
      `Response from ${rsvpForFilmEndPoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error("\x1b[31m", `Error from ${rsvpForFilmEndPoint}: ${error}`);
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
});

//-------------------------------

// Is a user RSVP'd
const isUserRSVPdEndpoint = "/isUserRSVPd";
app.post(isUserRSVPdEndpoint, async (req, res) => {
  try {
    const { JWT, filmUID } = req.body;

    if (
      !JWT ||
      typeof JWT !== "string" ||
      !filmUID ||
      typeof filmUID !== "string"
    ) {
      return res.status(400).json({
        success: false,
        error: "JWT + filmUID are required in request body",
      });
    }

    const response = await isUserRSVPd(JWT, filmUID);

    console.log(
      "\x1b[32m",
      `Response from ${isUserRSVPdEndpoint}: ${JSON.stringify(response)}`,
    );
    res.json(response);
  } catch (error) {
    console.error("\x1b[31m", `Error from ${isUserRSVPdEndpoint}: ${error}`);
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
