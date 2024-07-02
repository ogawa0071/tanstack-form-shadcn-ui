import { z } from "zod";

export const schema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First Name must be at least 2 characters.",
    })
    .refine(async () => {
      console.log("Validate First Name...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }),
});

export const serverSchema = schema.extend({
  firstName: z
    .string()
    .min(8, {
      message: "Server: First Name must be at least 8 characters.",
    })
    .refine(async () => {
      console.log("Server: Validate First Name...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }),
});
