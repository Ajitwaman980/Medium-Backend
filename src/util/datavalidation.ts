import { z } from "zod";

export const userschema_validation = z.object({
  // name email and password
  name: z.string().min(4, { message: "Name is required" }),
  email: z.string().email({ message: "email is reuired" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});
