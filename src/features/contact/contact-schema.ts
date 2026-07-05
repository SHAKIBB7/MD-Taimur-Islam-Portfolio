import { z } from "zod";

/** Shared validation for the contact form (client + server). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  subject: z.string().trim().min(3, "Please add a subject").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
