import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().min(1, "Name cannot be empty"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters long"),
  })
  .strict();

export const loginUserSchema = z
  .object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password cannot be empty"),
  })
  .strict();

export type RegisterUserFormData = z.infer<typeof registerUserSchema>;
export type LoginUserFormData = z.infer<typeof loginUserSchema>;
