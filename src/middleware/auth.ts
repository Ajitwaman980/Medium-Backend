import { verify } from "hono/jwt";
import { Context, MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";

// authication middleware

export const AuthmiddleService: MiddlewareHandler = async (
  c: Context,
  next: Function
) => {
  try {
    //   console.log("middleware worked");
    const token = getCookie(c, "token");
    if (!token) {
      return c.json({
        message: "No token user not logged in",
      });
    }
    // jwt verification
    const user = await verify(token, "hsgdfhsavjgfvajvsdcajsgvdjg");
    //   console.log(user);
    if (!user) {
      return c.json({ message: "Invalid token" }, 401);
    }
    c.set("user", user);
    return await next();
  } catch (error) {
    console.log(error);
    return c.json({
      message: "Invalid token",
      error,
    });
  }
};
