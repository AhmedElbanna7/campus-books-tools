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

## 🚀 طريقة التشغيل (Getting Started)

### 1. Clone المشروع

```bash
git clone <repo-url>
cd campus-books-tools
```

### 2. تشغيل الـ Backend

```bash
cd backend
npm install
cp .env.example .env   # ثم عبّي القيم (شوف تحت)
npm run dev
```

السيرفر هيشتغل على: `http://localhost:5000`

### 3. تشغيل الـ Frontend (React)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

الـ App هيشتغل على: `http://localhost:5173`

### 4. فتح صفحات الـ UI

مجرد فتح ملفات الـ `.html` جوه فولدر `/ui` مباشرة في المتصفح، أو تشغيل Live Server extension في VS Code.

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/campus-books
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:3000
```

> ⚠️ ملف `.env` متسيبوش فيه بيانات حقيقية على GitHub — لازم يكون موجود في `.gitignore`. سيبوا بس `.env.example` بالأسماء فاضية كـ مرجع.

---

## 🌱 Git Workflow (إزاي تسلّم التاسك بتاعك)

### الـ Branches الرئيسية

```
main            👈 النسخة النهائية الشغالة (محدش يعمل push مباشر عليها)
├── ui-dev
├── frontend-dev
└── backend-dev
```

### خطوات تسليم أي تاسك

1. **حدّث فرع فريقك أول حاجة:**

   ```bash
   git checkout ui-dev        # أو frontend-dev / backend-dev حسب فريقك
   git pull origin ui-dev
   ```

2. **اعمل branch فرعي للتاسك بتاعتك:**

   ```bash
   git checkout -b ui-dev/login-page
   ```

   نظام التسمية: `<team>-dev/<feature-name>` مثال:
   - `frontend-dev/auth-flow`
   - `backend-dev/listings-api`
   - `ui-dev/browse-page`

3. **اشتغل، اعمل commit بشكل واضح:**

   ```bash
   git add .
   git commit -m "feat(ui): add login page markup"
   ```

4. **ادفع الفرع بتاعك وافتح Pull Request:**

   ```bash
   git push origin ui-dev/login-page
   ```

   وبعدين افتح PR من `ui-dev/login-page` → `ui-dev` (مش لـ `main` مباشرة).

5. **زميل في نفس فريقك يراجع الـ PR ويعمل Merge.**

6. **لما الفريق كله يخلص Feature كاملة ومتأكدين إنها شغالة**، قائد الفريق يفتح PR من `ui-dev` (أو فرع فريقه) → `main`.

### قواعد مهمة

- ❌ ممنوع push مباشر على `main`
- ✅ Push يومي (حتى لو الشغل مش خلصان) — أهم من الـ commit المثالي
- ✅ اسم الـ commit يوصف اللي اتعمل بوضوح: `feat`, `fix`, `style`, `docs`
- ✅ لو فيه Conflict، اتكلم مع اللي عمل الـ commit التاني قبل ما تحله بنفسك

---

## 📄 API Contract

كل تفاصيل الـ Endpoints (الأسماء، الـ Request/Response) موجودة في:

- `docs/postman-collection.json` (يتفتح في Postman)
- `docs/API-Contract.md`

**لازم أي تعديل في شكل أي Endpoint يتحط في الجروب ويتوافق عليه الفريقين (Frontend + Backend) قبل ما يتنفذ.**

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

## 📅 Timeline مختصر

| المرحلة                              | التاريخ       |
| ------------------------------------ | ------------- |
| Setup + API Contract                 | 3–4 سبتمبر    |
| Core Features (Auth + CRUD)          | 5–7 سبتمبر    |
| Advanced Features (Search/Favorites) | 8–10 سبتمبر   |
| Admin + Security                     | 11–12 سبتمبر  |
| Integration الكامل                   | 13 سبتمبر     |
| Testing + Deploy                     | 14 سبتمبر     |
| **Submission**                       | **15 سبتمبر** |
