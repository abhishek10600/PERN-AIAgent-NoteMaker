import { z } from "zod";

export const sendMessageSchema = z
  .object({
    message: z.string().min(1, "message cannot be empty").trim(),
  })
  .strict();

export type MessageInput = z.infer<typeof sendMessageSchema>;
