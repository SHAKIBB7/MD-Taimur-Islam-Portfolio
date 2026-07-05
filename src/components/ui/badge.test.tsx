import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>WordPress</Badge>);
    expect(screen.getByText("WordPress")).toBeInTheDocument();
  });

  it("applies the accent variant class", () => {
    render(<Badge variant="accent">Web</Badge>);
    expect(screen.getByText("Web").className).toContain("text-accent");
  });
});
