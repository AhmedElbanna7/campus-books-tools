# Campus Books & Tools Share Platform — API Documentation

**Base URL:** `http://localhost:PORT` (development) — set `VITE_API_URL` in the frontend to match.

All endpoints return JSON. Endpoints marked 🔒 require a valid JWT. Endpoints marked 👑 require the requester's `role` to be `admin`.

## Authentication

Protected routes expect:

```
Authorization: Bearer <token>
```

The token is returned by `POST /login` and must be stored (e.g. `localStorage`) and attached to every subsequent request.

| Response status | Meaning |
|---|---|
| `401` | Missing/invalid/expired token, or wrong credentials |
| `403` | Valid token, but blocked account or insufficient role |
| `404` | Token valid, but the user it points to no longer exists |

---

## 1. Users & Auth

### `POST /register`
Create a new account.

**Body**
```json
{
  "name": "Sara Ahmed",
  "email": "sara@university.edu.eg",
  "password": "atleast6chars",
  "faculty": "Engineering",
  "phone": "01012345678"
}
```
`phone` must match `01[0-2,5]XXXXXXXX`. `role` and `isBlocked` are set by the schema default (`user`, `false`) — do not send them.

**Response `201`**
```json
{ "_id": "...", "name": "...", "email": "...", "faculty": "...", "phone": "...", "role": "user", "isBlocked": false, "createdAt": "...", "updatedAt": "..." }
```
Password is stripped from the response.

---

### `POST /login`
**Body**
```json
{ "email": "sara@university.edu.eg", "password": "atleast6chars" }
```

**Response `200`**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOi...",
  "user": {
    "_id": "...", "name": "...", "email": "...", "role": "user", "isBlocked": false
  }
}
```

| Failure | Status | Message |
|---|---|---|
| Wrong email/password | 401 | "Invalid email or password" |
| Account blocked | 403 | "Your account has been blocked." |

---

### `GET /me` 🔒
Returns the currently authenticated user (password excluded). Used to verify a stored token is still valid.

**Response `200`** — the raw user document (no wrapper).

---

### `GET /users` 🔒 👑
List all users (password excluded).

**Response `200`** — array of user objects, or `404` if the collection is empty.

---

### `GET /users/:id` 🔒
Get a single user's public profile by ID. Any authenticated user can call this (no ownership check).

**Response `200`** — user object, or `404`.

---

### `DELETE /deleteUser/:id` 🔒 👑
Admin-only hard delete of a user document. **Does not** clean up that user's listings, favorites, or Cloudinary images — for a full cleanup, use `DELETE /admin/users/:id` instead (see Admin section). Having both endpoints live is redundant; consider removing this one before submission to avoid an inconsistent deletion path.

**Response `200`**: `{ "message": "User deleted successfully" }`

---

## 2. Listings

### `GET /search`
Public. Search/filter available listings.

**Query params (all optional, combine with AND)**
| Param | Type | Notes |
|---|---|---|
| `name` | string | Matches against `title` (case-insensitive, regex-escaped) |
| `itemType` | `Book` \| `Tool` \| `Device` | |
| `category` | string | |
| `operation` | `Sale` \| `Borrow` \| `Both` | |

Always filters `status: "Available"` and excludes listings owned by blocked users.

**Response `200`** — array of listing documents.

---

### `POST /listings` 🔒
Create a listing. `multipart/form-data`, images field name **`images`** (up to 5 files, JPG/PNG/WEBP, 5MB each).

**Form fields**
| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | min 3 chars |
| `description` | ✅ | min 10 chars |
| `itemType` | ✅ | `Book` \| `Tool` \| `Device` |
| `category` | ✅ | |
| `condition` | ✅ | `New` \| `Like-New` \| `Used` \| `Worn` |
| `operation` | ✅ | `Sale` \| `Borrow` \| `Both` |
| `isFree` | optional | `"true"`/`"false"` string |
| `price` | required if not free | number ≥ 0 |
| `images` | ✅ | 1–5 files |

`owner` is taken from the JWT — never send it. `status` is always set to `"Available"` on creation.

**Response `201`**
```json
{ "success": true, "message": "Listing created successfully", "listing": { ... } }
```
`400` on validation failure with `{ success: false, message: "..." }`.

---

### `PUT /updatelistings/:id` 🔒
Update a listing. Owner or admin only. `multipart/form-data`, same `images` field for new files.

**Extra field:** `existingImages` — a JSON-stringified array of the Cloudinary URLs to keep; any current image URL *not* in this list is deleted from Cloudinary and removed from the listing.

**Response `200`**: `{ success: true, message: "...", listing: {...} }`
**`403`** if not owner/admin. **`404`** if not found.

---

### `DELETE /deletelistings/:id` 🔒
Owner or admin only. Deletes all Cloudinary images, all `favorite` records pointing at this listing, then the listing itself.

**Response `200`**: `{ success: true, message: "Listing deleted successfully" }`

---

### `GET /listings/:id`
Public. Raw listing document (owner not populated beyond `isBlocked` check). Returns `404` if the listing doesn't exist or its owner is blocked.

**Response `200`** — the listing document directly (no wrapper).

---

### `GET /listingDetails/:id`
Public. Same as above but populates `owner` with `name`, `email`, `isBlocked`, and wraps the response.

**Response `200`**
```json
{ "success": true, "listing": { "...": "...", "owner": { "_id": "...", "name": "...", "email": "..." } } }
```
`400` for a malformed ObjectId, `404` if missing/owner blocked.

---

### `GET /listingsDetails/:id/contact` 🔒
Returns the owner's contact info. Requires login (prevents scraping contact details anonymously).

**Response `200`**: `{ "name": "...", "email": "...", "phone": "..." }`

---

### `GET /listingsByOwner` 🔒
The caller's own listings. `owner` is derived from the JWT (`req.user._id`), never from a query param — safe against ID spoofing.

**Query params:** `status` (optional) — `Available` \| `Borrowed` \| `Sold`.

**Response `200`** — array of listing documents.

---

## 3. Favorites

### `GET /favorites` 🔒
The caller's saved listings (already resolved — each array item is the **listing itself**, not the favorite wrapper record).

**Query params:** `category` (optional, filters client-side after fetch).

**Response `200`** — array of listing documents.

⚠️ Currently broken when at least one user is blocked — see the bug fix at the top of this document.

---

### `POST /addfavorites/:listing_Id` 🔒
**Response `201`**: `{ success: true, message: "Favorite added successfully", favorite: {...} }`
Duplicate favorites are rejected at the DB level (unique index on `user` + `listing`) and currently surface as a generic `500` — consider catching the duplicate-key error (code `11000`) and returning `409` instead.

---

### `DELETE /deletefavorites/:listing_Id` 🔒
**Response `200`**: `{ success: true, message: "Favorite deleted successfully", favorite: {...} }`

---

## 4. Admin — mounted under `/admin` 🔒 👑

All routes below require `protect` **and** `roleAuth` (`role === "admin"`). Full path = `/admin` + the path shown.

### `GET /admin/stats`
```json
{ "Users": 42, "Blocked": 2, "Listings": 130, "Available": 90, "Borrowed": 25, "Sold": 15 }
```

### `GET /admin/users`
Array of all users (password excluded).

### `GET /admin/listings`
Array of all listings, `owner` populated with `name` and `email`.

### `PATCH /admin/users/:id/block`
### `PATCH /admin/users/:id/unblock`
Both return `{ message: "...", user: {...} }`.

### `PATCH /admin/userrole/:id`
Toggles the target user's role between `admin` and `user`. An admin cannot change their own role (returns `400`).

**Response `200`**: `{ message: "user role changed to admin", role: "admin" }`

### `DELETE /admin/users/:id`
Full cleanup delete: removes the user's Cloudinary images, their listings, any favorite pointing at those listings **or** made by that user, then the user document. Admin cannot delete themself (`400`).

### `DELETE /admin/listings/:id`
Removes the listing's Cloudinary images and any favorites pointing at it, then the listing.

---

## Error Response Shape

Most endpoints follow one of these two shapes — check which one a given endpoint uses before assuming a field name:

```json
{ "success": false, "message": "..." }
```
```json
{ "status": 404, "message": "..." }
```

## Quick Reference Table

| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/register` | — | Create account |
| POST | `/login` | — | Get JWT |
| GET | `/me` | 🔒 | Current user |
| GET | `/users` | 🔒👑 | List users |
| GET | `/users/:id` | 🔒 | Get one user |
| DELETE | `/deleteUser/:id` | 🔒👑 | Delete user (no cleanup — prefer admin route) |
| GET | `/search` | — | Browse/search listings |
| POST | `/listings` | 🔒 | Create listing |
| PUT | `/updatelistings/:id` | 🔒 | Update own listing |
| DELETE | `/deletelistings/:id` | 🔒 | Delete own listing |
| GET | `/listings/:id` | — | Raw listing |
| GET | `/listingDetails/:id` | — | Listing + owner info |
| GET | `/listingsDetails/:id/contact` | 🔒 | Owner contact info |
| GET | `/listingsByOwner` | 🔒 | My listings |
| GET | `/favorites` | 🔒 | My favorites |
| POST | `/addfavorites/:listing_Id` | 🔒 | Add favorite |
| DELETE | `/deletefavorites/:listing_Id` | 🔒 | Remove favorite |
| GET | `/admin/stats` | 🔒👑 | Dashboard stats |
| GET | `/admin/users` | 🔒👑 | All users |
| GET | `/admin/listings` | 🔒👑 | All listings |
| PATCH | `/admin/users/:id/block` | 🔒👑 | Block user |
| PATCH | `/admin/users/:id/unblock` | 🔒👑 | Unblock user |
| PATCH | `/admin/userrole/:id` | 🔒👑 | Toggle admin/user |
| DELETE | `/admin/users/:id` | 🔒👑 | Delete user (full cleanup) |
| DELETE | `/admin/listings/:id` | 🔒👑 | Delete listing (admin) |
