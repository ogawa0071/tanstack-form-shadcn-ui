import { z } from "zod";

export const schema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 2 characters.",
  }),
});

export const serverSchema = schema.extend({
  firstName: z.string().min(8, {
    message: "First Name must be at least 8 characters.",
  }),
});
