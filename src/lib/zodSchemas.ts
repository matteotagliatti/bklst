import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string(),
});
