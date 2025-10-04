import { portNumber } from "./index";

const localServer = `http://localhost:${portNumber}`;

//--------------------------------------------------------------------------------------------------------------- theatre

// Get theatre corporation info
const endPoint = "getTheatreCorporationInfo";
const theatreCorporationUid = "CW";

const response = await fetch(
  `${localServer}/${endPoint}?theatreCorporationUid=${theatreCorporationUid}`,
);

const data = await response.json();
console.log(data);

//--------------------------------------------------------------------------------------------------------------- creator

//--------------------------------------------------------------------------------------------------------------- fan
