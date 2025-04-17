import { Hono } from "hono";

// routes
import userRoutes from "./routes/userRoutes";
import blogRouter from "./routes/blogRouter";
import CommentsRouter from "./routes/CommentsRouter";
import notification from "./routes/userNotifcationRoutes";
import SummaryGeneratorRoutes from "./routes/Summary_GeneratorRoutes";
// hono

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    GEMINI_API_KEY: string;
  };
  // Variables: {
  //   userId: string;
  // };
}>();

// routes
app.get("/", (c) => c.text("welcome to medium project "));
app.route("/api/v1/user", userRoutes);
app.route("/api/v1/blog", blogRouter);
app.route("/api/v1/comment", CommentsRouter);
app.route("/api/v1/notification", notification);
app.route("/api/v1/summary", SummaryGeneratorRoutes);

export default app;
