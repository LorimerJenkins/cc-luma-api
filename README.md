# A Luma type booking system for Youtube creators to be shown in Cinemas | API documentation

## Base URL

**Production:**

```
https://cc-luma-api-5a085f15e5dc.herokuapp.com
```

**Local Development:**

```
http://localhost:{portNumber}
```

---

## Theatre Endpoints

### Get Theatre Corporation Info

Retrieves information about a specific theatre corporation.

**Endpoint:** `GET /getTheatreCorporationInfo`

**Query Parameters:**

| Parameter               | Type   | Required | Description                                   |
| ----------------------- | ------ | -------- | --------------------------------------------- |
| `theatreCorporationUID` | string | Yes      | Unique identifier for the theatre corporation |

**Example Request:**

```bash
curl -X GET "https://cc-luma-api-5a085f15e5dc.herokuapp.com/getTheatreCorporationInfo?theatreCorporationUID=theatreCorporationUID-123"
```

**Example Response:**

```json
{
  "theatreCorporation": "Cineworld",
  "theatreCorporationUID": "theatreCorporationUID-123",
  "bankingInfo": {
    "bankName": "Chase",
    "bankAddress": "1 Cherry Tree Lane, CB3 901, Austin, United States",
    "accountName": "Cineworld Ltd",
    "accountNumber": "41119203",
    "sortCode": "30-10-10"
  },
  "theatres": [
    {
      "location": "Stevenage",
      "theatreUID": "theatreUID-1",
      "screens": [
        {
          "screenNumber": 1,
          "maxSeats": 50,
          "minSeatsToBook": 20
        },
        {
          "screenNumber": 2,
          "maxSeats": 40,
          "minSeatsToBook": 10
        }
      ]
    },
    {
      "location": "Letchworth",
      "theatreUid": "theatreUID-2",
      "screens": [
        {
          "screenNumber": 1,
          "maxSeats": 1000,
          "minSeatsToBook": 250
        },
        {
          "screenNumber": 2,
          "maxSeats": 300,
          "minSeatsToBook": 30
        }
      ]
    }
  ]
}
```

### Get All Films

Retrieves a list of all films.

**Endpoint:** `GET /getAllFilms`

**Query Parameters:**

None

**Example Request:**

```bash
curl -X GET "https://cc-luma-api-5a085f15e5dc.herokuapp.com/getAllFilms"
```

**Example Response:**

```json
[
  {
    "film": "Peep Show",
    "filmUID": "filmUID-123",
    "creatorUID": "creatorUID-123",
    "targetCities": ["Austin", "New York"],
    "date": "5/12/2025",
    "time": "morning",
    "runTimeMins": "60",
    "genre": "comedy",
    "trailer": "https://www.youtube.com/watch?v=uonrtGIick4",
    "coverImage": "https://m.media-amazon.com/images/S/pv-target-images/65b427765a01ad9eccbc59fa3c61d8082620d3d91dc620c33512c2434d8d2664.jpg",
    "description": "Peep Show is a British sitcom starring David Mitchell and Robert Webb as two contrasting flatmates, the awkward and frugal Mark, and the irresponsible and hedonistic Jeremy. The show is known for its unique point-of-view perspective, allowing viewers to experience events from Mark's or Jeremy's perspective through their internal monologues. The comedy stems from the characters' contrasting personalities, Mark's chronic social anxiety and inner turmoil, and Jeremy's often delusional and self-serving pursuits.",
    "cast": ["David Mitchell", "Robert Webb", "Olivia Colman"],
    "otherImages": [
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p274645_b_v13_af.jpg"
    ]
  }
]
```

---

## Creator Endpoints

### Get Film From Hash

Retrieves film information using a film UID.

**Endpoint:** `GET /getFilmFromHash`

**Query Parameters:**

| Parameter | Type   | Required | Description                    |
| --------- | ------ | -------- | ------------------------------ |
| `filmUID` | string | Yes      | Unique identifier for the film |

**Example Request:**

```bash
curl -X GET "https://cc-luma-api-5a085f15e5dc.herokuapp.com/getFilmFromHash?filmUID=filmUID-123"
```

**Example Response:**

```json
{
  "film": "Peep Show",
  "filmUID": "filmUID-123",
  "creatorUID": "creatorUID-123",
  "targetCities": ["Austin", "New York"],
  "date": "5/12/2025",
  "time": "morning",
  "runTimeMins": "60",
  "genre": "comedy",
  "trailer": "https://www.youtube.com/watch?v=uonrtGIick4",
  "coverImage": "https://m.media-amazon.com/images/S/pv-target-images/65b427765a01ad9eccbc59fa3c61d8082620d3d91dc620c33512c2434d8d2664.jpg",
  "description": "Peep Show is a British sitcom starring David Mitchell and Robert Webb as two contrasting flatmates, the awkward and frugal Mark, and the irresponsible and hedonistic Jeremy. The show is known for its unique point-of-view perspective, allowing viewers to experience events from Mark's or Jeremy's perspective through their internal monologues. The comedy stems from the characters' contrasting personalities, Mark's chronic social anxiety and inner turmoil, and Jeremy's often delusional and self-serving pursuits.",
  "cast": ["David Mitchell", "Robert Webb", "Olivia Colman"],
  "otherImages": [
    "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p274645_b_v13_af.jpg"
  ]
}
```

### Create Film

Creates a new film entry.

**Endpoint:** `POST /createFilm`

**Request Body:**

| Field          | Type     | Required | Description                                   |
| -------------- | -------- | -------- | --------------------------------------------- |
| `JWT`          | string   | Yes      | JSON Web Token for authentication             |
| `film`         | string   | Yes      | Film title                                    |
| `targetCities` | string[] | Yes      | Array of target cities (non-empty)            |
| `date`         | string   | Yes      | Screening date                                |
| `time`         | string   | Yes      | Screening time                                |
| `runTimeMins`  | string   | Yes      | Film runtime in minutes                       |
| `genre`        | string   | Yes      | Film genre                                    |
| `trailer`      | string   | Yes      | URL to trailer                                |
| `coverImage`   | string   | Yes      | URL to cover image                            |
| `description`  | string   | Yes      | Film description                              |
| `cast`         | string[] | Yes      | Array of cast members (non-empty)             |
| `otherImages`  | string[] | Yes      | Array of additional image URLs (can be empty) |

**Example Request:**

```bash
curl -X POST "https://cc-luma-api-5a085f15e5dc.herokuapp.com/createFilm" \
  -H "Content-Type: application/json" \
  -d '{
    "JWT": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZjBmMGYxNGU5Y2FmYTlhYjUxODAxNTBhZTcxNGM5ZmQxYjVjMjYiLCJ0eXAiOiJKV1QifQ...",
    "film": "Peep Show",
    "targetCities": ["Austin", "New York"],
    "date": "5/12/2025",
    "time": "morning",
    "runTimeMins": "60",
    "genre": "comedy",
    "trailer": "https://www.youtube.com/watch?v=uonrtGIick4",
    "coverImage": "https://m.media-amazon.com/images/S/pv-target-images/65b427765a01ad9eccbc59fa3c61d8082620d3d91dc620c33512c2434d8d2664.jpg",
    "description": "Peep Show is a British sitcom starring David Mitchell and Robert Webb as two contrasting flatmates, the awkward and frugal Mark, and the irresponsible and hedonistic Jeremy. The show is known for its unique point-of-view perspective, allowing viewers to experience events from Mark'\''s or Jeremy'\''s perspective through their internal monologues. The comedy stems from the characters'\'' contrasting personalities, Mark'\''s chronic social anxiety and inner turmoil, and Jeremy'\''s often delusional and self-serving pursuits.",
    "cast": ["David Mitchell", "Robert Webb", "Olivia Colman"],
    "otherImages": [
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p274645_b_v13_af.jpg"
    ]
  }'
```

**Example Response (Success):**

```json
true
```

**Example Response (Failure):**

```json
false
```

**Example Response (Validation Error):**

```json
{
  "success": false,
  "error": "Missing required field: film"
}
```

---

## Fan Endpoints

### Get Profile

Retrieves user profile information.

**Endpoint:** `POST /getProfile`

**Request Body:**

| Parameter | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `JWT`     | string | Yes      | JSON Web Token for authentication |

**Example Request:**

```bash
curl -X POST "https://cc-luma-api-5a085f15e5dc.herokuapp.com/getProfile" \
  -H "Content-Type: application/json" \
  -d '{
    "JWT": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZjBmMGYxNGU5Y2FmYTlhYjUxODAxNTBhZTcxNGM5ZmQxYjVjMjYiLCJ0eXAiOiJKV1QifQ..."
  }'
```

**Example Response:**

```json
{
  "name": "Tate Berenbaum",
  "userUID": "userUID-104884995888692415380",
  "profilePic": "https://lh3.googleusercontent.com/a/ACg8ocIqtu9NB-7T77WAqFRZZanFb1Yf_GrFCxepHnshfJocCUb4Yw3S=s96-c",
  "bio": "My name is Tate and I hate Ice Cream.",
  "email": "tateflyer1@gmail.com",
  "gender": "male",
  "number": "07283092723",
  "birthday": "30/07/2003",
  "socials": {
    "x": "https://x.com/Lorimer_Jenkins",
    "youtube": "https://www.youtube.com/@lorimerjenkins6265",
    "linkedin": "https://www.linkedin.com/in/lorimerjenkins/",
    "instagram": "https://www.instagram.com/lorimer_jenkins/",
    "tiktok": "https://www.tiktok.com/@dannyboy83dannyboy",
    "website": "https://lorimerjenkins.com"
  },
  "interestedIn": ["filmUID-123"],
  "creatorAccount": {
    "creatorUID": "creatorUID-104884995888692415380",
    "createdFilmUID": ["filmUID-123"]
  }
}
```

### Create Profile

Creates a new user profile.

**Endpoint:** `POST /createProfile`

**Request Body:**

| Parameter | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `JWT`     | string | Yes      | JSON Web Token for authentication |

**Example Request:**

```bash
curl -X POST "https://cc-luma-api-5a085f15e5dc.herokuapp.com/createProfile" \
  -H "Content-Type: application/json" \
  -d '{
    "JWT": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZjBmMGYxNGU5Y2FmYTlhYjUxODAxNTBhZTcxNGM5ZmQxYjVjMjYiLCJ0eXAiOiJKV1QifQ..."
  }'
```

**Example Response (Success):**

```json
true
```

**Example Response (Failure):**

```json
false
```

**Example Response (Invalid Authentication):**

```json
"Invalid JWT"
```

### Update Profile

Updates user profile information.

**Endpoint:** `POST /updateProfile`

**Request Body:**

| Parameter                   | Type     | Required | Description                              |
| --------------------------- | -------- | -------- | ---------------------------------------- |
| `JWT`                       | string   | Yes      | JSON Web Token for authentication        |
| `updates`                   | object   | Yes      | Object containing fields to update       |
| `updates.bio`               | string   | No       | User biography                           |
| `updates.gender`            | string   | No       | User gender                              |
| `updates.number`            | string   | No       | User phone number                        |
| `updates.birthday`          | string   | No       | User birthday (format: DD/MM/YYYY)       |
| `updates.socials`           | object   | No       | Social media links object                |
| `updates.socials.x`         | string   | No       | X (Twitter) profile URL                  |
| `updates.socials.youtube`   | string   | No       | YouTube channel URL                      |
| `updates.socials.linkedin`  | string   | No       | LinkedIn profile URL                     |
| `updates.socials.instagram` | string   | No       | Instagram profile URL                    |
| `updates.socials.tiktok`    | string   | No       | TikTok profile URL                       |
| `updates.socials.website`   | string   | No       | Personal website URL                     |
| `updates.interestedIn`      | string[] | No       | Array of film UIDs user is interested in |

**Example Request:**

```bash
curl -X POST "https://cc-luma-api-5a085f15e5dc.herokuapp.com/updateProfile" \
  -H "Content-Type: application/json" \
  -d '{
    "JWT": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZjBmMGYxNGU5Y2FmYTlhYjUxODAxNTBhZTcxNGM5ZmQxYjVjMjYiLCJ0eXAiOiJKV1QifQ...",
    "updates": {
      "bio": "I actually love ice cream now!",
      "gender": "male",
      "number": "07283092723",
      "birthday": "30/07/2003",
      "socials": {
        "x": "https://x.com/Lorimer_Jenkins",
        "youtube": "https://www.youtube.com/@lorimerjenkins6265",
        "linkedin": "https://www.linkedin.com/in/lorimerjenkins/"
      },
      "interestedIn": ["filmUID-123", "filmUID-456"]
    }
  }'
```

**Example Response (Success):**

```json
{
  "success": true,
  "userUID": "userUID-104884995886924153380",
  "appliedUpdates": {
    "bio": "I actually love ice cream now!",
    "gender": "male",
    "number": "07283092723",
    "birthday": "30/07/2003",
    "socials": {
      "x": "https://x.com/Lorimer_Jenkins",
      "youtube": "https://www.youtube.com/@lorimerjenkins6265",
      "linkedin": "https://www.linkedin.com/in/lorimerjenkins/"
    },
    "interestedIn": ["filmUID-123", "filmUID-456"]
  }
}
```

**Example Response (Invalid Authentication):**

```json
{
  "success": false,
  "error": "Invalid JWT"
}
```

**Example Response (Missing Updates):**

```json
{
  "success": false,
  "error": "updates object is required in request body"
}
```

### RSVP for Film

Allows a user to RSVP for a film.

**Endpoint:** `POST /rsvpForFilm`

**Request Body:**

| Parameter | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `JWT`     | string | Yes      | JSON Web Token for authentication |
| `filmUID` | string | Yes      | Unique identifier for the film    |

**Example Request:**

```bash
curl -X POST "https://cc-luma-api-5a085f15e5dc.herokuapp.com/rsvpForFilm" \
  -H "Content-Type: application/json" \
  -d '{
    "JWT": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZjBmMGYxNGU5Y2FmYTlhYjUxODAxNTBhZTcxNGM5ZmQxYjVjMjYiLCJ0eXAiOiJKV1QifQ...",
    "filmUID": "filmUID-123"
  }'
```

**Example Response (Success):**

```json
true
```

**Example Response (Failure):**

```json
false
```

**Example Response (Invalid Authentication):**

```json
"Invalid JWT"
```

---

## Error Responses

All endpoints may return the following error responses:

**400 Bad Request:**

```json
{
  "success": false,
  "error": "Description of what went wrong"
}
```

**500 Internal Server Error:**

```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Authentication

Most endpoints require JWT authentication. The JWT token should be obtained through Google OAuth2 authentication and included in the request body for POST endpoints or as a query parameter for GET endpoints that require authentication.

**JWT Structure:**

The JWT contains the following claims:

- `iss`: Issuer (https://accounts.google.com)
- `sub`: User's unique Google ID
- `email`: User's email address
- `name`: User's full name
- `picture`: URL to user's profile picture
- `given_name`: User's first name
- `family_name`: User's last name
- `email_verified`: Boolean indicating if email is verified
