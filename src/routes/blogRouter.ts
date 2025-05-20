import { Hono, MiddlewareHandler } from "hono";
import { getPrisma } from "../util/prismaFuction";
import { cache } from "hono/cache";
import { AuthmiddleService } from "../middleware/auth";
import { isowner } from "../middleware/isowner";
import { BlogValidation } from "../util/datavalidation";
import { notification } from "../util/notification";

// make the instance of node cache

// const NodeCache = new nodecache();

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// middleware for cache data
const cacheOptions = {
  cacheName: "mycache",
  ttl: 60,
  staleWhileRevalidate: 120,
};
// all blog
router.get("/all", cache(cacheOptions), async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    // gettiing all data from database
    // const cachedResponse = await c.get("mycache");
    const allBlogs = await prisma.post.findMany();
    if (!allBlogs) {
      return c.json({ success: false, message: "no blog present " });
    }
    // NodeCache.set("mykey", allBlogs);

    return c.json({ success: true, blogs: allBlogs });
  } catch (error) {
    console.error(error);
    return c.json({ success: false, message: "Failed to fetch blogs" }, 500);
  }
});

// view by id
router.get("/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL);
    const showById = await prisma.post.findUnique({
      where: { id },
    });
    if (!showById) {
      return c.json({ message: "the post not availabe " });
    }
    return c.json({ message: `Blog with id: ${id}`, showById });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Error fetching blog by ID" }, 500);
  }
});
// --------------------------------------------------------------------------------------------------
// create the new blog
router.post("/new", AuthmiddleService, async (c) => {
  try {
    const { title, content } = await c.req.json();

    const prisma = getPrisma(c.env.DATABASE_URL);
    const bodyValidation = BlogValidation.safeParse({
      title,
      content,
    });
    // data validation
    if (!bodyValidation.success) {
      return c.json(
        {
          message: "validation failed",
          errors: bodyValidation.error.errors,
        },
        400
      );
    }

    // getting user id
    const user = (c as any).get("user");
    const userId = user.id;
    // new blog

    // reudce the latency
    const [newBlog, newNotification] = await Promise.all([
      prisma.post.create({
        data: {
          title,
          content,
          authorId: userId,
          published: true,
        },
      }),
      notification(c, `New blog created with title ${title}`),
    ]);

    // const newBlog = await prisma.post.create({
    //   data: {
    //     title,
    //     content,
    //     authorId: userId,
    //     published: true,
    //   },
    // });
    // // notification
    // const newNotification = await notification(
    //   c,
    //   `New blog created with title ${newBlog.title}`
    // );

    // return
    return c.json(
      {
        message: newBlog,
      },
      200
    );
  } catch (error) {
    console.log(error);
    return c.json({
      message: "new blog not created ",
    });
  }
});

// put edit
router.put("/edit/:id", AuthmiddleService, isowner, async (c) => {
  try {
    // get id using param
    const id = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL);
    const body = await c.req.json();
    //  blog exists
    const blog = await prisma.post.findUnique({
      where: { id },
    });
    if (!blog) {
      return c.json({ message: "blog not found try again" }, 404);
    }
    //
    const updatedBlog = await prisma.post.update({
      where: { id },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ message: "Blog updated", blog: updatedBlog });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Something went wrong while updating blog" }, 500);
  }
});

// delete
router.delete("/del/:id", AuthmiddleService, isowner, async (c) => {
  try {
    // getting id
    const id = c.req.param("id");
    // database url
    const prisma = getPrisma(c.env.DATABASE_URL);
    // check present or not
    const checkpresent = await prisma.post.findUnique({
      where: { id },
    });
    if (!checkpresent) {
      return c.json({
        message: "the blog not present ",
      });
    }
    await prisma.post.delete({
      where: { id },
    });
    return c.json({ message: "post deleted successfully" });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Error deleting note", error }, 500);
  }
});

export default router;
