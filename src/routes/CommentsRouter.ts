import { Hono } from "hono";
import { getPrisma } from "../util/prismaFuction";
import { AuthmiddleService } from "../middleware/auth";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// 🔸 POST: Comment on a blog
router.post("/blog/:id/comment", AuthmiddleService, async (c) => {
  try {
    const postId = c.req.param("id");
    const { comment } = await c.req.json();

    const prisma = getPrisma(c.env.DATABASE_URL);

    // Get logged in user
    const user = (c as any).get("user");

    // Check post exists
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return c.json({ message: "Post not found" }, 404);
    }

    // Create comment

    const COmment = await prisma.comment.create({
      data: {
        comment,
        authorId: user.id,
        postId,
      },
    });

    return c.json({ message: "Comment added", COmment });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to comment" }, 500);
  }
});

//all comment
router.get("/blog/:id/comments", async (c) => {
  try {
    const postId = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL);

    const comments = await prisma.comment.findMany({
      where: { postId },

      orderBy: { createdAt: "desc" },
    });

    return c.json({ comments });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to get comments" }, 500);
  }
});

// DELETE
router.delete("/comment/:id", AuthmiddleService, async (c) => {
  try {
    const commentId = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL);
    const user = (c as any).get("user");

    // Find comment
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      return c.json({ message: "Comment not found" }, 404);
    }

    if (comment.authorId !== user.id) {
      return c.json({ message: "Not authorized to delete this comment" }, 403);
    }

    await prisma.comment.delete({ where: { id: commentId } });

    return c.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to delete comment" }, 500);
  }
});

export default router;
