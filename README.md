# 📚 Campus Books & Tools Share

A campus marketplace web application that lets university students **sell, buy, borrow, or give away for free** books, tools, and devices to each other. Students can post listings with images, browse and search what other students are offering, save favorites, contact item owners directly, and manage their own posted items. An admin dashboard is included for platform moderation (managing users and listings).

---

## 🚀 Main Features

**For Students (Users)**
- 🔐 Register & login with secure JWT-based authentication
- 🏠 Browse all available listings on the home page
- 🔎 Search & filter listings by name, item type (Book / Tool / Device), category, and operation (Sale / Borrow / Both)
- ➕ Create a listing with up to 5 images (upload to Cloudinary), price or mark as free
- ✏️ Edit or delete your own listings (add/remove images, change status, etc.)
- 📄 View full listing details
- 📞 Reveal the owner's contact info (name, email, phone) for a listing
- ❤️ Add/remove listings to a personal Favorites list, filterable by category
- 📋 View "My Listings" (with filter by status: Available / Borrowed / Sold)

**For Admins**
- 📊 Dashboard with platform statistics (total users, blocked users, total/available/borrowed/sold listings)
- 👥 Manage users: view all, block/unblock, promote/demote to admin, delete
- 🗂️ Manage listings: view all, delete any listing (with automatic Cloudinary image cleanup)
- 🚫 Blocked users' listings are automatically hidden from search/browse/details for regular users

**General**
- 🖼️ Image upload & storage via Cloudinary with automatic cleanup on delete/update
- 🛡️ Role-based route protection (User / Admin) on both frontend and backend
- 🎨 Custom, consistent design system (green & gold palette) across all pages

---

## 🛠️ Technologies Used

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Token (jsonwebtoken) | Authentication |
| bcryptjs | Password hashing |
| Multer | Handling multipart image uploads |
| Cloudinary | Image storage & CDN |
| cors | Cross-origin requests handling |
| validator | Email validation |
| lodash | Safe regex escaping for search |
| dotenv | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite | Build tool & dev server |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP client / API calls |
| lucide-react | Icon set |
| oxlint | Linting |

### Other
- **UI/UX mockups**: standalone HTML/CSS/JS pages (home, login, add-item, details, favorites, admin dashboard) used as the design reference for the React implementation.

---

## 📦 Installation Steps

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB](https://www.mongodb.com/) database (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file inside `backend/` (see [Required Environment Variables](#-required-environment-variables) below).

### 3. Frontend setup
```bash
cd ../frontend
npm install
```
Create a `.env` file inside `frontend/` (see below).

---

## 🔑 Required Environment Variables

### `backend/.env`
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### `frontend/.env`
```env
VITE_API_URL=Api_url
```

> ⚠️ **Security note:** Never commit real `.env` values to version control. Add `.env` to `.gitignore` and rotate any credentials that may have been exposed.

---

## ▶️ How to Run Backend and Frontend

### Run the Backend
```bash
cd backend
npm run dev     # development (nodemon, auto-restart)
# or
npm start       # production
```
The API will run at `http://localhost:3000` by default.

### Run the Frontend
```bash
cd frontend
npm run dev
```
The app will run at `http://localhost:5173` by default (Vite's default port). Make sure this matches the `allowedOrigins` CORS setting in `backend/index.js`.

### Build the Frontend for Production
```bash
cd frontend
npm run build
npm run preview   # preview the production build locally
```

---

## 📡 API Overview / Documentation

- Full endpoint-by-endpoint reference: [`API_CONTRACT.md`](./docs/API_CONTRACT.md)
- Entity-Relationship Diagram: [`ERD.md`](./docs/ERD.md)
- Api-Documentation: [`API_Documentation.md`](./docs/API_Documentation.md)

**Base URL:** `http://localhost:3000`

Main resource groups:
- `POST /login`, `POST /register`, `GET /me`, `/users` — Authentication & Users
- `/listings`, `/search`, `/listingDetails`, `/listingsByOwner` — Listings
- `/favorites`, `/addfavorites`, `/deletefavorites` — Favorites
- `/admin/*` — Admin-only operations (stats, users, listings management)

---

## 👥 Team Members and Contributions

| Name | Role | Contribution |
|---|---|---|
| Ahmed Abdel Fattah Mohammed | Backend Developer | 1- Setup Express + MongoDB connection + folder structure  2- Search & filter API (category, type,operation)  3-Favorites API (add/remove/get) |
| Moaz Waled | Backend Developer | 1- Database schemas: User, Listing, Favorite   2- Register/Login API + JWT   3- Auth/Authorization middleware (User/Admin roles)   4- Admin APIs (stats, delete listings, block/unblock users) |
| Ahmed Ashraf | Backend Developer | 1- Create/Update/Delete Listing API (with image upload)  2- Listing details API + owner info, |
| Ahmed Samir | Frontend Developer | 1- Auth Context/state (user + token management)   2- Protected routes (block unauthorized access)  3-Listing Details page + Contact Owner button |
| Pola Ayman | Frontend Developer | 1- Login/Register components  2- Create/Edit Listing page (form + image upload)  3- Admin Dashboard (stats, manage users & listings) |
| Ahmed Maher Farmawi | Frontend Developer | 1- Setup React project (Vite),routing,folder structure  2- Browse page: fetch listings from API + filters  3- My Listings + Favorites (add/remove) |
| Adham Mohamed | UI/UX Designer | 1- Admin Dashboard, |
| Youssef Maher  | UI/UX Designer | 1- Design System  2- Login/Register page  3- Home/Browse page  4-Listing Details page |
| Karim Elsenosy | UI/UX Designer | 1- My Listings & Favorites page |

> ✏️ Please replace the placeholders above with your actual team members and their contributions.

---

## 🌐 Demo Links

| Type | Link |
|---|---|
| Live Frontend | https://campus-books-tools.vercel.app/ |
| Live Backend / API | https://campus-books-tools-b77u.vercel.app/ |

---

## 📁 Project Structure
```
project/
├── backend/            # Express + MongoDB REST API
│   ├── config/         # DB & Cloudinary configuration
│   ├── controller/     # Route handlers / business logic
│   ├── middleware/     # Auth & file upload middleware
│   ├── models/         # Mongoose schemas (User, Listing, Favourite)
│   ├── router/         # Express routers
│   └── utils/          # Cloudinary helpers
├── frontend/           # React + Vite SPA
│   └── src/
│       ├── components/ # Reusable UI components (by feature)
│       ├── pages/      # Route-level pages
│       └── context/    # Auth context
└── ui/                 # Static HTML/CSS/JS design mockups & design system rules
```
