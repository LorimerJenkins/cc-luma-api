import { portNumber } from "./index";

// local
const server = `http://localhost:${portNumber}`;
// prod
// const server = 'https://cc-luma-api-5a085f15e5dc.herokuapp.com/'

//--------------------------------------------------------------------------------------------------------------- theatre

// // Get theatre corporation info
// const endPoint = "getTheatreCorporationInfo";
// const theatreCorporationUID = "theatreCorporationUID-123";

// const response = await fetch(
//   `${server}/${endPoint}?theatreCorporationUID=${theatreCorporationUID}`,
// );

// const data = await response.json();
// console.log(data);

//-------------------------------

// // Get all films
// const endPoint = "getAllFilms";

// const response = await fetch(`${server}/${endPoint}`);

// const data = await response.json();
// console.log(data);

//--------------------------------------------------------------------------------------------------------------- creator

// // Get film from hash
// const endPoint = "getFilmFromHash";
// const filmUID = "filmUID-123";

// const response = await fetch(`${server}/${endPoint}?filmUID=${filmUID}`);

// const data = await response.json();
// console.log(data);

//-------------------------------

// // Create film
// const endPoint = "createFilm";
// const film = {
//   film: "Peep Show",
//   filmUID: "filmUID-123",
//   creatorUID: "creatorUID-123",
//   targetCities: ["Austin", "New York"],
//   date: "5/12/2025",
//   time: "morning",
//   runTimeMins: "60",
//   genre: "comedy",
//   trailer: "https://www.youtube.com/watch?v=uonrtGIick4",
//   coverImage:
//     "https://m.media-amazon.com/images/S/pv-target-images/65b427765a01ad9eccbc59fa3c61d8082620d3d91dc620c33512c2434d8d2664.jpg",
//   description:
//     "Peep Show is a British sitcom starring David Mitchell and Robert Webb as two contrasting flatmates, the awkward and frugal Mark, and the irresponsible and hedonistic Jeremy. The show is known for its unique point-of-view perspective, allowing viewers to experience events from Mark's or Jeremy's perspective through their internal monologues. The comedy stems from the characters' contrasting personalities, Mark's chronic social anxiety and inner turmoil, and Jeremy's often delusional and self-serving pursuits.",
//   cast: ["David Mitchell", "Robert Webb", "Olivia Colman"],
//   otherImages: [
//     "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p274645_b_v13_af.jpg",
//   ],
// };

// const response = await fetch(`${server}/${endPoint}`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(film),
// });

// const data = await response.json();
// console.log(data);

//--------------------------------------------------------------------------------------------------------------- fan

// // Get profile
// const endPoint = "getProfile";
// const auth0UID = "auth0|68e18d70c44ac97f332acf1a";

// const response = await fetch(`${server}/${endPoint}?auth0UID=${auth0UID}`);

// const data = await response.json();
// console.log(data);

//-------------------------------

// // Update profile
// const endPoint = "updateProfile";
// const JWT = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZjBmMGYxNGU5Y2FmYTlhYjUxODAxNTBhZTcxNGM5ZmQxYjVjMjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MTc5MDkyMjUzNTctNjE3dTkzdGIza2x2ZmZsdTE2YTh1MDBmdTdqY3VxbHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MTc5MDkyMjUzNTctNjE3dTkzdGIza2x2ZmZsdTE2YTh1MDBmdTdqY3VxbHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ4ODQ5OTU4ODg2OTI0MTUzODAiLCJlbWFpbCI6InRhdGVmbHllcjFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTc1OTY5MTYwNSwibmFtZSI6IlRhdGUgQmVyZW5iYXVtIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lxdHU5TkItN1Q3N1dBcUZSWlphbkZiMVlmX0dyRkN4ZXBIbnNoZkpvY0NVYjRZdzNTPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlRhdGUiLCJmYW1pbHlfbmFtZSI6IkJlcmVuYmF1bSIsImlhdCI6MTc1OTY5MTkwNSwiZXhwIjoxNzU5Njk1NTA1LCJqdGkiOiIxOTE0NjRmYTUzNDY5OTYxMzM2ZDkzN2Y1ZmEwZTdmOGJlNGE0Nzc2In0.DyYEZlNHk8YydUbX3EHRU0Qb06xmiMpbTgwC0foUNjEimYF-FWkJbpOapjHv-qr28KCfAvZtBTzSIEmc6lM2MEPjvRgCgFukf7LQZ24J52YSJ64u3rp69RsBF6jMfRDUYTBVpLUxZ0K5kY6Yjy3aGbPK6pr6OF13amJbgZIP0_3EaojbPJfe00PB5NenKWuGnelrO9BCbhyTaDvh6wyp_HTEVvjneCSXRHrSXBdF7s2E7SkwRpaV6EsW1DsBXCJL8eAjEntLeFnL4DUrfApWTsyD7ip1imP0R7eEOYSGDYyYTmgbmvEW0LKp36GTjDPFPEoQjc8GwFO_G9pkdGO1ag";

// const response = await fetch(`${server}/${endPoint}`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ JWT }),
// });

// const data = await response.json();
// console.log(data);

//-------------------------------

// // Create profile
// const endPoint = "createProfile";
// const JWT = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZjBmMGYxNGU5Y2FmYTlhYjUxODAxNTBhZTcxNGM5ZmQxYjVjMjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0MTc5MDkyMjUzNTctNjE3dTkzdGIza2x2ZmZsdTE2YTh1MDBmdTdqY3VxbHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0MTc5MDkyMjUzNTctNjE3dTkzdGIza2x2ZmZsdTE2YTh1MDBmdTdqY3VxbHIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQ4ODQ5OTU4ODg2OTI0MTUzODAiLCJlbWFpbCI6InRhdGVmbHllcjFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTc1OTY5MTYwNSwibmFtZSI6IlRhdGUgQmVyZW5iYXVtIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0lxdHU5TkItN1Q3N1dBcUZSWlphbkZiMVlmX0dyRkN4ZXBIbnNoZkpvY0NVYjRZdzNTPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlRhdGUiLCJmYW1pbHlfbmFtZSI6IkJlcmVuYmF1bSIsImlhdCI6MTc1OTY5MTkwNSwiZXhwIjoxNzU5Njk1NTA1LCJqdGkiOiIxOTE0NjRmYTUzNDY5OTYxMzM2ZDkzN2Y1ZmEwZTdmOGJlNGE0Nzc2In0.DyYEZlNHk8YydUbX3EHRU0Qb06xmiMpbTgwC0foUNjEimYF-FWkJbpOapjHv-qr28KCfAvZtBTzSIEmc6lM2MEPjvRgCgFukf7LQZ24J52YSJ64u3rp69RsBF6jMfRDUYTBVpLUxZ0K5kY6Yjy3aGbPK6pr6OF13amJbgZIP0_3EaojbPJfe00PB5NenKWuGnelrO9BCbhyTaDvh6wyp_HTEVvjneCSXRHrSXBdF7s2E7SkwRpaV6EsW1DsBXCJL8eAjEntLeFnL4DUrfApWTsyD7ip1imP0R7eEOYSGDYyYTmgbmvEW0LKp36GTjDPFPEoQjc8GwFO_G9pkdGO1ag";

// const response = await fetch(`${server}/${endPoint}`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({ JWT }),
// });

// const data = await response.json();
// console.log(data);
