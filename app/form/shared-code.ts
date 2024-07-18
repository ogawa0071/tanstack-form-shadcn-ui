import { z } from "zod";

export const schema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Client: Username must be at least 2 characters.",
    })
    .refine(async () => {
      console.log("Client: Validate Username...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }),
  age: z.coerce.number().int().nonnegative(),
  picture: z.custom<File>(),
  mobile: z.coerce.boolean().refine((value) => value === true),
  dob: z.coerce.date(),
  email: z.enum(["m@example.com", "m@google.com", "m@support.com"]),
  type: z.enum(["all", "mentions", "none"]),
  bio: z.string().optional(),
  hidden: z.string(),
});

export const serverSchema = schema.extend({
  username: z
    .string()
    .min(8, {
      message: "Server: Username must be at least 8 characters.",
    })
    .refine(async () => {
      console.log("Server: Validate Username...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return true;
    }),
});
