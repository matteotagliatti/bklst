import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string(),
});

export const BookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(255),
  author: z.string().min(1).max(255),
  img: z.string().url(),
  status: z.enum(["read", "reading", "to-read"]),
  finished: z.string().nullable(),
  favorite: z.boolean(),
});
