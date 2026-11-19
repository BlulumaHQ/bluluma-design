import { describe, expect, it } from "vitest";
import { PACKAGES } from "./packagePricing";

describe("industry package pricing", () => {
  it("keeps the approved Nov 2026 prices", () => {
    expect([PACKAGES.healthcare.setup, PACKAGES.healthcare.monthly]).toEqual(["$1,688", "$149"]);
    expect([PACKAGES.realtor.setup, PACKAGES.realtor.monthly]).toEqual(["$1,288", "$68"]);
    expect([PACKAGES.presale.setup, PACKAGES.presale.monthly]).toEqual(["$6,888", "$399"]);
    expect(PACKAGES.presale.setupPrefix?.en).toBe("From");
  });
});

import { heroTranslations } from "./heroTranslations";
import { routeMetaFor } from "./seoRoutes";

describe("Nov 2026 copy and SEO", () => {
  it("has Chinese for every new hero string", () => {
    for (const [key, v] of Object.entries(heroTranslations)) expect(v.zh, key).toBeTruthy();
  });
  it("keeps landing-page meta descriptions in sync with prices", () => {
    expect(routeMetaFor("/healthcare")?.en.description).toContain(PACKAGES.healthcare.setup);
    expect(routeMetaFor("/real-estate")?.en.description).toContain(PACKAGES.realtor.setup);
    expect(routeMetaFor("/presale")?.en.description).toContain(PACKAGES.presale.setup);
    expect(routeMetaFor("/pricing")?.en.description).not.toContain("$1,500");
  });
});
