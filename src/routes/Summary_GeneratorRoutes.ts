// Summary Generator
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Hono } from "hono";
import { getPrisma } from "../util/prismaFuction";
import { symmaryGenerator } from "../util/Summary_Generator";
import { AuthmiddleService } from "../middleware/auth";
const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    GEMINI_API_KEY: string;
  };
}>();

// router summary generator
router.get("/:id", AuthmiddleService, async (c) => {
  // console.log("summary generator route and api key", c.env.GEMINI_API_KEY);
  try {
    const postid = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL);
    const post = await prisma.post.findUnique({ where: { id: postid } });
    if (!post) {
      return c.json({ message: "Post not found" }, 404);
    }
    c;
    const { content } = post;
    const summary = await symmaryGenerator(content, c.env.GEMINI_API_KEY);
    // console.log("summary", summary);
    if (!summary) {
      return c.json({ message: "Failed to generate summary" }, 500);
    }
    return c.json({ message: "Summary generated successfully", summary });
  } catch (error) {
    // console.error(error);
    return c.json({ message: "Failed to generate summary" }, 500);
  }
});

export default router;
