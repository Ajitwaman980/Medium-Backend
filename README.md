# 📝 Medium Clone Backend

This is the backend for a Medium-like blogging platform built using **Hono**, **Prisma**, **PostgreSQL**, and **JWT** authentication.

---

## 🚀 Tech Stack

- **Hono** – Lightweight web framework
- **Prisma** – Type-safe ORM for the database
- **PostgreSQL** – Relational Database
- **JWT** – For authentication
- **Zod** – Schema validation

---

## 📦 Installation

```bash
npm install
npm run dev
```

To deploy:

```bash
npm run deploy
```

---

## 📚 API Routes

### 🔐 Auth Routes

| Method | Route                  | Description              |
|--------|------------------------|--------------------------|
| POST   | `/api/v1/auth/signup`  | Register new user        |
| POST   | `/api/v1/auth/login`   | Login existing user      |
| GET    | `/api/v1/auth/logout`  | Logout user (clear JWT)  |

---

### 👤 User

| Method | Route                  | Description                        |
|--------|------------------------|------------------------------------|
| GET    | `/api/v1/user/profile` | Get logged-in user info *(Protected)* |

---

### 📝 Blog Routes

| Method | Route                    | Description                    |
|--------|--------------------------|--------------------------------|
| GET    | `/api/v1/blog/all`       | Get all blogs                  |
| GET    | `/api/v1/blog/:id`       | Get blog by ID                 |
| POST   | `/api/v1/blog/new`       | Create a new blog *(Auth)*     |
| PUT    | `/api/v1/blog/edit/:id`  | Edit a blog *(Owner + Auth)*   |
| DELETE | `/api/v1/blog/del/:id`   | Delete blog *(Owner + Auth)*   |

---

### 💬 Comment Routes

| Method | Route                          | Description                        |
|--------|--------------------------------|------------------------------------|
| POST   | `/api/v1/blog/:id/comment`     | Add comment *(Auth)*               |
| GET    | `/api/v1/blog/:id/comments`    | Get comments for a blog            |
| DELETE | `/api/v1/comment/:id`          | Delete comment *(Owner + Auth)*    |

---

## ✅ Features

- User authentication with JWT
- Secure routes with middleware
- Blog post CRUD operations
- Comment system on blog posts
- User profile management

---

## 👨‍💻 Developer

**Ajit Waman**  
Backend Developer | Node.js | Prisma | PostgreSQL | Hono

For collaboration or feedback: ajitwaman43@gmail.com




```
npm install
npm run dev
```

```
npm run deploy
```
