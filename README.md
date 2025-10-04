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
| `theatreCorporationUid` | string | Yes      | Unique identifier for the theatre corporation |

**Example Request:**

```bash
curl -X GET "https://cc-luma-api-5a085f15e5dc.herokuapp.com/getTheatreCorporationInfo?theatreCorporationUid=CW"
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

### Update Profile

Updates user profile information.

**Endpoint:** `GET /updateProfile`

**Query Parameters:**

| Parameter  | Type   | Required | Description                      |
| ---------- | ------ | -------- | -------------------------------- |
| `auth0UID` | string | Yes      | Auth0 unique identifier for user |

**Example Request:**

```bash
curl -X GET "https://cc-luma-api-5a085f15e5dc.herokuapp.com/updateProfile?auth0UID=auth0|68e18d70c44ac97f332acf1a"
```

---
