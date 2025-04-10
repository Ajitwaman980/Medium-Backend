import { sign } from "hono/jwt";

export const generateToken = async (payload: any) => {
  try {
    const token = await sign(payload, "hsgdfhsavjgfvajvsdcajsgvdjg");
    return token;
  } catch (error) {
    console.error("Token generation failed:", error);
    return null;
  }
};
