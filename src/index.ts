import { Hono } from "hono";

import userRoutes from "./routes/userRoutes";
import blogRouter from "./routes/blogRouter";
import CommentsRouter from "./routes/CommentsRouter";
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
app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/comment", CommentsRouter);
export default app;
