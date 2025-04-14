// notification  function

//

import Hono, { Context } from "hono";
import { getPrisma } from "./prismaFuction";
export const notification = async (c: Context, message: string) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  //   save notifation in database
  const newnotify = await prisma.notification.create({
    data: {
      notifymes: message,
    },
  });
  return newnotify;
};
