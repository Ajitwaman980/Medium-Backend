import { Hono } from "hono";
import { generateToken } from "../util/generateToken";
import { userschema_validation } from "../util/datavalidation";
import { getPrisma } from "../util/prismaFuction";
import { deleteCookie, setCookie } from "hono/cookie";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { AuthmiddleService } from "../middleware/auth";

const router = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

// GET	/api/v1/user/profile	Get current logged-in user

// User Signup Route
router.post("/signup", async (c) => {
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

// login
router.post("/login", async (c) => {
  try {
    const { email, password } = await c.req.json();
    const prisma = getPrisma(c.env.DATABASE_URL);
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return c.json({ messge: "User not found. Please sign up." }, 404);
    }

    const passwordmatch = bcrypt.compare(user.password, password);
    if (!passwordmatch) {
      return c.json(
        {
          message: "Invalid password",
        },
        401
      );
    }
    const token = await generateToken({ id: user.id });
    if (!token) {
      return c.json({ message: "token required " }, 500);
    }
    // Set token in cookie
    setCookie(c, "token", token);
    return c.json({
      message: "Logged in successfully",
      userId: user.id,
      token,
    });
  } catch (error) {
    return c.json({ message: "something went wrong when user login" });
  }
});

// logout

router.get("/logout", AuthmiddleService, (c) => {
  try {
    deleteCookie(c, "token");
    return c.json({ message: "Logged out successfully" });
  } catch (error) {
    return c.json({ mesaage: "user logout issue " });
  }
});

export default router;
