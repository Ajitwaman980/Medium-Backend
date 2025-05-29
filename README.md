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

| Method | Route                 | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | `/api/v1/auth/signup` | Register new user       |
| POST   | `/api/v1/auth/login`  | Login existing user     |
| GET    | `/api/v1/auth/logout` | Logout user (clear JWT) |

---

### 👤 User

| Method | Route                  | Description                           |
| ------ | ---------------------- | ------------------------------------- |
| GET    | `/api/v1/user/profile` | Get logged-in user info _(Protected)_ |

---

### 📝 Blog Routes

| Method | Route                   | Description                  |
| ------ | ----------------------- | ---------------------------- |
| GET    | `/api/v1/blog/all`      | Get all blogs                |
| GET    | `/api/v1/blog/:id`      | Get blog by ID               |
| POST   | `/api/v1/blog/new`      | Create a new blog _(Auth)_   |
| PUT    | `/api/v1/blog/edit/:id` | Edit a blog _(Owner + Auth)_ |
| DELETE | `/api/v1/blog/del/:id`  | Delete blog _(Owner + Auth)_ |

---

### 💬 Comment Routes

| Method | Route                       | Description                     |
| ------ | --------------------------- | ------------------------------- |
| POST   | `/api/v1/blog/:id/comment`  | Add comment _(Auth)_            |
| GET    | `/api/v1/blog/:id/comments` | Get comments for a blog         |
| DELETE | `/api/v1/comment/:id`       | Delete comment _(Owner + Auth)_ |

---

### 💬 summary generator Routes

| Method | Route                 | Description       |
| ------ | --------------------- | ----------------- |
| GET    | `/api/v1/summary/:id` | summary generator |



### 🔔 Notification Routes

| Method | Route                                | Description                        |
|--------|--------------------------------------|------------------------------------|
| GET    | `/api/v1/notify/all/notify`          | Get all notifications _(Auth)_     |
| DELETE | `/api/v1/notify/delete/:id`          | Delete notification by ID _(Auth)_ |
| DELETE | `/api/v1/notify/delete/all/notify`   | Delete all notifications _(Auth)_  |


## ✅ Features

- User authentication with JWT
- Secure routes with middleware
- Blog post CRUD operations
- Comment system on blog posts
- User profile management

---

![Screenshot (375)](https://github.com/user-attachments/assets/3d8fce6b-7ac3-49be-a435-084ff3762bb5)
![Screenshot (372)](https://github.com/user-attachments/assets/82674e89-852b-4327-94f0-25ff40b18f5c)



## 👨‍💻 Developer

**Ajit Waman**  
Backend Developer | Node.js | Prisma | PostgreSQL | Hono
