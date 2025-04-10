import { Hono } from "hono";
import { generateToken } from "../util/generateToken";
import { userschema_validation } from "../util/datavalidation";
import { getPrisma } from "../util/prismaFuction";
import { setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import { z } from "zod";
const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// User Signup Route
router.post("/user/signup", async (c) => {
  try {
    // body
    const { email, name, password } = await c.req.json();

    // validation
    const bodyValidation = userschema_validation.safeParse({
      email,
      name,
      password,
    });

    if (!bodyValidation.success) {
      return c.json(
        {
          message: "validation failed",
          errors: bodyValidation.error.errors,
        },
        400
      );
    }
    // getting the env url
    const prisma = getPrisma(c.env.DATABASE_URL);
    // check alreday present or not
    const alredyPresent = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log("alredyPresent", alredyPresent);
    if (alredyPresent) {
      return c.json({ message: "user alredy register" }, 302);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // token
    const token = await generateToken({ id: newUser.id });

    if (!token) {
      return c.json({ message: "Token generation failed" }, 500);
    }

    // Set token in cookie
    setCookie(c, "token", token);

    return c.json({
      message: "User signed up successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    return c.json(
      {
        message: "An error occurred while creating the user",
        error,
      },
      500
    );
  }
});

export default router;
