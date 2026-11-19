import { describe, expect, it } from "vitest";
import { isConceptProject } from "./portfolioConcept";

describe("isConceptProject", () => {
  it.each([
    [null, false],
    ["", false],
    ["https://ttop-vancouver-a.sony-lin.workers.dev", true],
    ["https://mutt-puddles.netlify.app/", true],
    ["https://one-park-home.bluluma.com", true],
    ["https://tsaiorthodontics.ca", false],
    ["erickimrealty.com", false],
  ])("%s → %s", (url, expected) => expect(isConceptProject(url)).toBe(expected));
});
