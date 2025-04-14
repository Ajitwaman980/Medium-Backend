// userNotifcation.ts
import { notification } from "../util/notification";
import { Hono } from "hono";
import { getPrisma } from "../util/prismaFuction";
import { AuthmiddleService } from "../middleware/auth";
const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// new  notification
// router.post("/new/notify", async (c) => {
//   try {
//     const { message } = await c.req.json();
//     const newNotification = await notification(c, message);
//     return c.json({ message: "Notification add", newNotification });
//   } catch (error) {
//     console.error(error);
//     return c.json({ message: "Failed to get notifications" }, 500);
//   }
// });

// get all notification
router.get("/all/notify", AuthmiddleService, async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const allNotification = await prisma.notification.findMany({
      orderBy: { createdAt: "desc" },
    });
    return c.json({ message: "All notifications", allNotification });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to get notifications" }, 500);
  }
});

// delete notification
router.delete("/delete/notify/:id", AuthmiddleService, async (c) => {
  try {
    const id = c.req.param("id");
    const prisma = getPrisma(c.env.DATABASE_URL);
    const deleteNotification = await prisma.notification.delete({
      where: { id },
    });
    return c.json({ message: "Notification deleted", deleteNotification });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to delete notification" }, 500);
  }
});
// delete all notification
router.delete("/delete/all/notify", AuthmiddleService, async (c) => {
  try {
    const prisma = getPrisma(c.env.DATABASE_URL);
    const deleteAllNotification = await prisma.notification.deleteMany({});
    return c.json({ message: "All notifications deleted" });
  } catch (error) {
    console.error(error);
    return c.json({ message: "Failed to delete all notifications" }, 500);
  }
});

export default router;
