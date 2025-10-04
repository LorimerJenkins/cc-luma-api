import { portNumber } from "./index";

// local
const server = `http://localhost:${portNumber}`;
// prod
// const server = 'https://cc-luma-api-5a085f15e5dc.herokuapp.com/'

//--------------------------------------------------------------------------------------------------------------- theatre

// Get theatre corporation info
const endPoint = "getTheatreCorporationInfo";
const theatreCorporationUid = "CW";

const response = await fetch(
  `${server}/${endPoint}?theatreCorporationUid=${theatreCorporationUid}`,
);

const data = await response.json();
console.log(data);

//--------------------------------------------------------------------------------------------------------------- creator

//--------------------------------------------------------------------------------------------------------------- fan
