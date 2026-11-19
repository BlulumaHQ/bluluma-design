import { describe, expect, it } from "vitest";
import { displayTitle, versionLetter } from "./displayTitle";

describe("portfolio version labels", () => {
  it("reads the version letter and strips it from the title", () => {
    expect(versionLetter("Mutt Puddles Dog Wash - A")).toBe("A");
    expect(versionLetter("Gene's Sausage Shop – b")).toBe("B");
    expect(displayTitle("Mutt Puddles Dog Wash - A")).toBe("Mutt Puddles Dog Wash");
  });
  it("ignores numbered or unsuffixed titles", () => {
    expect(versionLetter("Studio 21 Salon - 2")).toBeNull();
    expect(versionLetter("Tsai Orthodontics")).toBeNull();
    expect(versionLetter("Project-A")).toBeNull();
  });
});
