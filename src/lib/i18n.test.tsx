import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LangProvider, useLang } from "./i18n";
import { PACKAGE_MONTHLY, PACKAGE_SETUP } from "./packagePricing";

afterEach(() => { cleanup(); window.history.pushState({}, "", "/"); });
describe("homepage package pricing", () => {
  it.each(["en", "zh"])("shows the shared package price in %s", (lang) => {
    window.history.pushState({}, "", lang === "zh" ? "/zh" : "/");
    const { result } = renderHook(() => useLang(), { wrapper: LangProvider });
    expect(result.current.t("home.pricing.range")).toBe(PACKAGE_SETUP);
    expect(result.current.t("home.pricing.monthly")).toContain(PACKAGE_MONTHLY);
  });
});
