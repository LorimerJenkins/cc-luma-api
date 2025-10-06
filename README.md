# A Luma type booking system for Youtube creators to be shown in Cinemas | API documentation

## Base URL

```
https://cc-luma-api-5a085f15e5dc.herokuapp.com
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
| `film`         | string   | Yes      | Film title                                    |
| `filmUID`      | string   | Yes      | Unique identifier for the film                |
| `creatorUID`   | string   | Yes      | Unique identifier for the creator             |
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
    "description": "Peep Show is a British sitcom starring David Mitchell and Robert Webb as two contrasting flatmates, the awkward and frugal Mark, and the irresponsible and hedonistic Jeremy. The show is known for its unique point-of-view perspective, allowing viewers to experience events from Mark'\''s or Jeremy'\''s perspective through their internal monologues. The comedy stems from the characters'\'' contrasting personalities, Mark'\''s chronic social anxiety and inner turmoil, and Jeremy'\''s often delusional and self-serving pursuits.",
    "cast": ["David Mitchell", "Robert Webb", "Olivia Colman"],
    "otherImages": [
      "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p274645_b_v13_af.jpg"
    ]
  }'
```

**Example Response (Success):**

```json
{
  "success": true,
  "filmUID": "filmUID-123"
}
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

**Endpoint:** `GET /getProfile`

**Query Parameters:**

| Parameter  | Type   | Required | Description                      |
| ---------- | ------ | -------- | -------------------------------- |
| `auth0UID` | string | Yes      | Auth0 unique identifier for user |

**Example Request:**

```bash
curl -X GET "https://cc-luma-api-5a085f15e5dc.herokuapp.com/getProfile?auth0UID=auth0|68e18d70c44ac97f332acf1a"
```

**Example Response:**

```json
{
  "name": "Lorimer Jenkins",
  "auth0UID": "auth0|68e18d70c44ac97f332acf1a",
  "profilePic": "https://media.licdn.com/dms/image/v2/D4E03AQGhZqy0KdT2QA/profile-displayphoto-shrink_200_200/B4EZPbcT9mGYAc-/0/1734553452939?e=2147483647&v=beta&t=TSseAIS7xYMVPDi_FNSMdUxlNMiJMp6sYlz3ZhZjXsg",
  "bio": "Ma name jeff.",
  "email": "lorimer@theranos.com",
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
    "creatorEnabledAccount": true,
    "creatorUID": "creatorUID-123",
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
    "JWT": "your_jwt_token_here"
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

| Parameter | Type   | Required | Description                       |
| --------- | ------ | -------- | --------------------------------- |
| `JWT`     | string | Yes      | JSON Web Token for authentication |

**Example Request:**

```bash
curl -X POST "https://cc-luma-api-5a085f15e5dc.herokuapp.com/updateProfile" \
  -H "Content-Type: application/json" \
  -d '{
    "JWT": "your_jwt_token_here"
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
