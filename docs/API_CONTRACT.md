# API Contract — Campus Books & Tools Share

**Base URL:** `http://localhost:3000`
**Content-Type:** `application/json` unless otherwise noted (image upload endpoints use `multipart/form-data`)
**Authentication:** Bearer JWT in the `Authorization` header

```
Authorization: Bearer <token>
```

The token is obtained from `POST /login` and expires after **7 days**.

### Common Error Response Shape
```json
{
  "success": false,
  "message": "Error description"
}
```
> Note: some legacy endpoints return `{ "status": <code>, "message": "..." }` instead of `success/message`. This is indicated per-endpoint below.

---

## 1. Authentication & Users

### 1.1 Register
`POST /register`
**Auth:** Public

**Body**
```json
{
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "password": "secret123",
  "faculty": "Engineering",
  "phone": "01012345678"
}
```

**Success — 201**
```json
{
  "_id": "65f...",
  "name": "Ahmed Ali",
  "email": "ahmed@example.com",
  "faculty": "Engineering",
  "phone": "01012345678",
  "role": "user",
  "isBlocked": false,
  "createdAt": "...",
  "updatedAt": "..."
}
```
**Errors:** `500` internal server error (e.g. duplicate email)

---

### 1.2 Login
`POST /login`
**Auth:** Public

**Body**
```json
{ "email": "ahmed@example.com", "password": "secret123" }
```

**Success — 200**
```json
{
  "message": "Login successful",
  "token": "<jwt token>",
  "user": {
    "_id": "65f...",
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "role": "user",
    "isBlocked": false
  }
}
```
**Errors:**
- `401` — Invalid email or password
- `403` — Account is blocked
- `500` — Internal server error

---

### 1.3 Get Current User
`GET /me`
**Auth:** Required (any logged-in user)

**Success — 200** → returns the authenticated user object (password excluded)

---

### 1.4 Get All Users
`GET /users`
**Auth:** Required — **Admin only**

**Success — 200** → array of user objects (password excluded)
**Errors:** `404` if no users found, `403` if not admin

---

### 1.5 Get User By Id
`GET /users/:id`
**Auth:** Required (any logged-in user)

**Success — 200** → single user object (password excluded)
**Errors:** `404` — user not found

---

### 1.6 Update User
`PUT /updateUser/:id`
**Auth:** Required

**Body** (any subset of user fields, e.g.)
```json
{ "name": "New Name", "phone": "01099999999", "faculty": "Science" }
```

**Success — 201** → updated user object (password excluded)
**Errors:** `404` — user not found

---

### 1.7 Delete User
`DELETE /deleteUser/:id`
**Auth:** Required — **Admin only**

**Success — 200**
```json
{ "message": "User deleted successfully" }
```
**Errors:** `404` — user not found

---

## 2. Listings

### 2.1 Search / Browse Listings
`GET /search`
**Auth:** Public

**Query Params** (all optional)
| Param | Type | Example |
|---|---|---|
| `name` | string | `laptop` |
| `itemType` | `Book` \| `Tool` \| `Device` | `Book` |
| `category` | string | `Physics` |
| `operation` | `Sale` \| `Borrow` \| `Both` | `Sale` |

Only listings with `status: "Available"` and whose owner is not blocked are returned.

**Success — 200** → array of listing objects

---

### 2.2 Get Listing By Id
`GET /listings/:id`
**Auth:** Public

**Success — 200** → listing object (populated with owner's `isBlocked` flag internally; hidden if owner is blocked)
**Errors:** `404` — listing not found

---

### 2.3 Get Listing Details
`GET /listingDetails/:id`
**Auth:** Public

**Success — 200**
```json
{
  "success": true,
  "listing": {
    "_id": "...",
    "title": "...",
    "description": "...",
    "itemType": "Book",
    "category": "Physics",
    "condition": "Used",
    "isFree": false,
    "price": 150,
    "images": ["https://res.cloudinary.com/..."],
    "operation": "Sale",
    "status": "Available",
    "owner": { "_id": "...", "name": "Ahmed Ali", "email": "ahmed@example.com" },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```
**Errors:** `400` invalid id, `404` listing not found / owner blocked

---

### 2.4 Get Owner Contact Info
`GET /listingsDetails/:id/contact`
**Auth:** Required

**Success — 200**
```json
{ "name": "Ahmed Ali", "email": "ahmed@example.com", "phone": "01012345678" }
```
**Errors:** `404` — listing not found / owner blocked

---

### 2.5 Get My Listings
`GET /listingsByOwner`
**Auth:** Required

**Query Params** (optional): `status` = `Available` \| `Borrowed` \| `Sold`

**Success — 200** → array of the current user's listings

---

### 2.6 Create Listing
`POST /listings`
**Auth:** Required
**Content-Type:** `multipart/form-data`

**Form Fields**
| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | min 3 chars |
| `description` | string | ✅ | min 10 chars |
| `itemType` (or `type`) | string | ✅ | `Book` \| `Tool` \| `Device` |
| `category` | string | ✅ | |
| `condition` | string | ✅ | `New` \| `Like-New` \| `Used` \| `Worn` |
| `operation` | string | ✅ | `Sale` \| `Borrow` \| `Both` |
| `isFree` | boolean (string) | ❌ | `"true"` / `"false"` |
| `price` | number | required if not free | ≥ 0 |
| `images` | file[] | ❌ | up to 5 files, JPG/PNG/WEBP, 5MB each |

**Success — 201**
```json
{ "success": true, "message": "Listing created successfully", "listing": { ... } }
```
**Errors:** `400` — validation error / invalid price / invalid image type

---

### 2.7 Update Listing
`PUT /updatelistings/:id`
**Auth:** Required — owner or admin only
**Content-Type:** `multipart/form-data`

**Form Fields** (all optional, only send what changes)
- `title`, `description`, `category`, `condition`, `status`, `operation`, `itemType`/`type`, `isFree`, `price`
- `existingImages` — JSON stringified array of image URLs to keep (removed ones are deleted from Cloudinary)
- `images` — new file(s) to append (up to 5 total)

**Success — 200**
```json
{ "success": true, "message": "Listing updated successfully", "listing": { ... } }
```
**Errors:** `403` — not the owner/admin, `404` — not found, `400` — invalid field value

---

### 2.8 Delete Listing
`DELETE /deletelistings/:id`
**Auth:** Required — owner or admin only

**Success — 200**
```json
{ "success": true, "message": "Listing deleted successfully" }
```
**Errors:** `403` — not the owner/admin, `404` — not found

> Deleting a listing also removes its images from Cloudinary and any Favorites referencing it.

---

## 3. Favorites

### 3.1 Get My Favorites
`GET /favorites`
**Auth:** Required

**Query Params** (optional): `category` — filter results by listing category

**Success — 200** → array of listing objects the user has favorited

---

### 3.2 Add Favorite
`POST /addfavorites/:listing_Id`
**Auth:** Required

**Success — 201**
```json
{ "success": true, "message": "Favorite added successfully", "favorite": { "_id": "...", "user": "...", "listing": "..." } }
```
**Errors:** `500` — e.g. duplicate favorite (unique index on `user + listing`)

---

### 3.3 Remove Favorite
`DELETE /deletefavorites/:listing_Id`
**Auth:** Required

**Success — 200**
```json
{ "success": true, "message": "Favorite deleted successfully", "favorite": { ... } }
```

---

## 4. Admin (all routes require Auth + Admin role)

**Base path:** `/admin`

### 4.1 Get Platform Stats
`GET /admin/stats`

**Success — 200**
```json
{
  "Users": 120,
  "Blocked": 3,
  "Listings": 340,
  "Available": 280,
  "Borrowed": 40,
  "Sold": 20
}
```

### 4.2 Get All Users
`GET /admin/users` → array of users (password excluded)

### 4.3 Get All Listings
`GET /admin/listings` → array of listings (owner populated with `name`, `email`)

### 4.4 Block User
`PATCH /admin/users/:id/block`
**Success — 200** → `{ "message": "user blocked.", "user": { ... } }`

### 4.5 Unblock User
`PATCH /admin/users/:id/unblock`
**Success — 200** → `{ "message": "user unblocked.", "user": { ... } }`

### 4.6 Toggle User Role (user ↔ admin)
`PATCH /admin/userrole/:id`
**Success — 200** → `{ "message": "user role changed to admin", "role": "admin" }`
**Errors:** `400` — cannot change your own role

### 4.7 Delete User
`DELETE /admin/users/:id`
**Success — 200** → `{ "message": "user deleted." }`
**Errors:** `400` — cannot delete your own account
> Cascades: deletes the user's listings (+ their Cloudinary images) and related favorites.

### 4.8 Delete Listing
`DELETE /admin/listings/:id`
**Success — 200** → `{ "message": "Listing deleted successfully" }`
> Cascades: deletes Cloudinary images and related favorites.

---

## Status & Enum Reference

| Field | Allowed Values |
|---|---|
| `itemType` | `Book`, `Tool`, `Device` |
| `condition` | `New`, `Like-New`, `Used`, `Worn` |
| `operation` | `Sale`, `Borrow`, `Both` |
| `status` (listing) | `Available`, `Borrowed`, `Sold` |
| `role` (user) | `user`, `admin` |
