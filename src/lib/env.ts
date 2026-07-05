import { z } from "zod";

/**
 * Environment validation — fail fast with a clear message instead of
 * cryptic runtime errors deep in the stack.
 */
const envSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
});

export const isDatabaseConfigured = Boolean(env.DATABASE_URL);
