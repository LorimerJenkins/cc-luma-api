import { portNumber } from "./index";

// local
const server = `http://localhost:${portNumber}`;
// prod
// const server = 'https://cc-luma-api-5a085f15e5dc.herokuapp.com/'

//--------------------------------------------------------------------------------------------------------------- theatre

// Get theatre corporation info
const endPoint = "getTheatreCorporationInfo";
const theatreCorporationUID = "theatreCorporationUID-123";

const response = await fetch(
  `${server}/${endPoint}?theatreCorporationUID=${theatreCorporationUID}`,
);

const data = await response.json();
console.log(data);

//--------------------------------------------------------------------------------------------------------------- creator

// // Get film from hash
// const endPoint = "getFilmFromHash";
// const filmUID = "filmUID-123";

// const response = await fetch(`${server}/${endPoint}?filmUID=${filmUID}`);

// const data = await response.json();
// console.log(data);

//--------------------------------------------------------------------------------------------------------------- fan

// // Get profile
// const endPoint = "getProfile";
// const auth0UID = "auth0|68e18d70c44ac97f332acf1a";

// const response = await fetch(`${server}/${endPoint}?auth0UID=${auth0UID}`);

// const data = await response.json();
// console.log(data);
