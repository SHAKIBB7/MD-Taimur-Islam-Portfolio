import { describe, expect, it } from "vitest";
import { cn, formatDateRange, formatMonthYear } from "./utils";

describe("cn", () => {
  it("joins truthy classes and drops falsy values", () => {
    expect(cn("a", false, undefined, "b", null)).toBe("a b");
  });
});

describe("formatMonthYear", () => {
  it("formats an ISO date", () => {
    expect(formatMonthYear("2024-01-01")).toBe("Jan 2024");
  });
  it("returns Present when no date", () => {
    expect(formatMonthYear(undefined)).toBe("Present");
  });
});

describe("formatDateRange", () => {
  it("formats a closed range", () => {
    expect(formatDateRange("2023-09-10", "2024-02-29")).toBe("Sep 2023 – Feb 2024");
  });
  it("formats an open range as Present", () => {
    expect(formatDateRange("2024-01-01")).toBe("Jan 2024 – Present");
  });
  it("returns empty string without a start date", () => {
    expect(formatDateRange(undefined)).toBe("");
  });
});
