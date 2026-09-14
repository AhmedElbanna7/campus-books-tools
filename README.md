# 📚 Campus Books & Tools Share Platform

منصة لتبادل وإعارة الكتب والأدوات الدراسية بين طلاب الجامعة — بدل ما الكتب والأدوات تفضل مستخدمة مرة واحدة وترمي، الطلاب يقدروا يعرضوها لباقي زمايلهم (بيع/إعارة/مجانًا).

**Stack:** MERN (MongoDB, Express, React, Node.js)
**Deadline:** 15 سبتمبر 2026

---

## 📁 هيكل المشروع (Repo Structure)

```
campus-books-tools/
├── ui/              # فريق UI — Static HTML/CSS/JS templates (design source)
├── frontend/        # فريق Frontend — React App
├── backend/         # فريق Backend — Node.js + Express API
├── docs/            # API Contract, ERD, Postman Collection
└── README.md
```

---

## 👥 الفرق

| Team        | المسؤولية                                         | الفولدر     |
| ----------- | ------------------------------------------------- | ----------- |
| 🎨 UI       | Design System + صفحات HTML/CSS جاهزة كـ Templates | `/ui`       |
| ⚛️ Frontend | React App كامل + الاتصال بالـ API                 | `/frontend` |
| 🖥️ Backend  | REST API + Database + Auth + Security             | `/backend`  |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=Your_Port
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/campus-books
SECRET_KEY=your_jwt_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=Api_url
```

## 🌱 Git Workflow (إزاي تسلّم التاسك بتاعك)

### الـ Branches الرئيسية

```
main            👈 النسخة النهائية الشغالة (محدش يعمل push مباشر عليها)
├── ui-dev
├── frontend-dev
└── backend-dev
```
---

## 📄 API Contract

كل تفاصيل الـ Endpoints (الأسماء، الـ Request/Response) موجودة في:

- `docs/postman-collection.json` (يتفتح في Postman)
- `docs/API-Contract.md`


---

## ✅ الـ 7 Features الأساسية

1. Authentication (Register/Login/Logout + JWT + Roles)
2. Create & Manage Listings (Add/Edit/Delete + صور + السعر/الحالة)
3. Browse, Search & Filter
4. Listing Details & Contact Owner
5. My Listings & Favorites
6. Admin Dashboard
7. Security & Validation

---
