import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// const prisma = new PrismaClient({
//   datasourceUrl: env.DATABASE_URL,
// }).$extends(withAccelerate());

// get prisma function we used the connection pools
export const getPrisma = (DATABASE_URL: string) => {
  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  }).$extends(withAccelerate());
  return prisma;
};
