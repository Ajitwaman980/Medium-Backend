import { Hono } from "hono";

import userRoutes from "./routes/userRoutes";
// hono

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  // Variables: {
  //   userId: string;
  // };
}>();

// routes
app.route("/api/v1", userRoutes);

// app.get("/", (c) => {
//   return c.text("medium project backend");
// });
// app.get("/all", async (c) => {
//   try {
//     return c.json("all blogs");
//   } catch (err) {
//     console.error(err);
//     return c.json("Internal Server Error");
//   }
// });
// // user
// app.post("/api/v1/user/signup", async (c) => {
//   try {
//     // getting data from body

//     const prisma = getPrisma(c.env.DATABASE_URL);
//     // const newUser=await prisma.user.cr
//   } catch (error) {
//     return c.json({
//       message: "An error occurred while creating the user",
//       error,
//     });
//   }
//   return c.json("new user singUp");
// });
// // user
// app.post("/api/v1/user/signin", async (c) => {
//   return c.json("new user singUp");
// });
// // new blog
// app.post("/api/v1/blog", async (c) => {
//   return c.json("new user singUp");
// });
// // blog edit
// app.put("/api/v1/blog", async (c) => {
//   return c.json("new user singUp");
// });
// // blog get by id
// app.put("/api/v1/blog/:id", async (c) => {
//   return c.json("new user singUp");
// });
// app.post("/api/v1/blog/bulk", async (c) => {
//   return c.json("new user singUp");
// });

// // login
// app.post("/login", async (c) => {
//   return c.json("user login");
// });
export default app;
