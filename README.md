📝 Medium Clone Backend API
This is the backend of a Medium-like blogging platform.
Built with Hono, Prisma, and PostgreSQL.

🚀 Tech Used
Hono – Lightweight web framework
Prisma – ORM for database
PostgreSQL – Database
JWT – User authentication
Zod – Input validation

📦 API Routes
🔐 Auth Routes
Method	Route	Description
POST	/api/v1/auth/signup	Register new user
POST	/api/v1/auth/login	Login existing user
GET	/api/v1/auth/logout	Logout user (clear JWT)
👤 User
Method	Route	Description
GET	/api/v1/user/profile	Get logged-in user info (Protected)
📝 Blog Routes
Method	Route	Description
GET	/api/v1/blog/all	Get all blogs
GET	/api/v1/blog/:id	Get blog by ID
POST	/api/v1/blog/new	Create a new blog (Auth)
PUT	/api/v1/blog/edit/:id	Edit a blog (Owner + Auth)
DELETE	/api/v1/blog/del/:id	Delete blog (Owner + Auth)
💬 Comment Routes
Method	Route	Description
POST	/api/v1/blog/:id/comment	Add comment (Auth)
GET	/api/v1/blog/:id/comments	Get comments for a blog
DELETE	/api/v1/comment/:id	Delete comment (Owner/Auth)


```
npm install
npm run dev
```

```
npm run deploy
```
