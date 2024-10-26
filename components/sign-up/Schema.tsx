import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(15, { message: "Username must be with maximum 15 characters." }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
