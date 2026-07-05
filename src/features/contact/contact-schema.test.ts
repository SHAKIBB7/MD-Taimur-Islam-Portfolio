import { describe, expect, it } from "vitest";
import { contactSchema } from "./contact-schema";

const valid = {
  name: "Jane Doe",
  email: "jane@example.com",
  subject: "Project inquiry",
  message: "I'd like to discuss a potential collaboration with you.",
};

describe("contactSchema", () => {
  it("accepts valid input", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects invalid email", () => {
    expect(contactSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(
      false,
    );
  });

  it("rejects too-short message", () => {
    expect(contactSchema.safeParse({ ...valid, message: "hi" }).success).toBe(false);
  });

  it("trims whitespace", () => {
    const result = contactSchema.parse({ ...valid, name: "  Jane Doe  " });
    expect(result.name).toBe("Jane Doe");
  });

  it("caps message length to prevent abuse", () => {
    expect(contactSchema.safeParse({ ...valid, message: "x".repeat(5001) }).success).toBe(
      false,
    );
  });
});
