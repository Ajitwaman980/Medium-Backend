import { MiddlewareHandler } from "hono";
import { getPrisma } from "../util/prismaFuction";

// owner
export const isowner: MiddlewareHandler = async (c, next) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const postid = c.req.param("id");
    const userid = (c as any).get("user");
    if (!userid) {
      return c.json({ message: "Unauthorized user" }, 401);
    }
    const post = await prisma.post.findUnique({
      where: { id: postid },
    });
    if (!post) {
      return c.json({ message: "Post not found" }, 404);
    }
    if (post.authorId !== userid.id) {
      return c.json({ message: "You are not the owner of this post" }, 403);
    }

    await next();
  } catch (error) {
    console.log(error);
    return c.json({ message: "isowner middleware failed" });
  }
};
