import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().min(1, "name cannot be empty").trim().toLowerCase(),
    email: z.email().trim().toLowerCase(),
    password: z.string().min(6, "password must be atleast 6 characters long"),
  })
  .strict();

export const loginUserSchema = z
  .object({
    email: z.email().min(1, "email cannot be empty").trim().toLowerCase(),
    password: z.string().min(1, "password cannot be empty"),
  })
  .strict();

export type RegisterInput = z.infer<typeof registerUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
