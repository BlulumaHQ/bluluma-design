import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LangProvider, useLang } from "./i18n";

afterEach(() => { cleanup(); window.history.pushState({}, "", "/"); });
describe("homepage investment range", () => {
  it.each(["en", "zh"])("sets the investment range to $1,499 – $3,500+ in %s", (lang) => {
    window.history.pushState({}, "", lang === "zh" ? "/zh" : "/");
    const { result } = renderHook(() => useLang(), { wrapper: LangProvider });
    expect(result.current.t("home.pricing.range")).toBe("$1,499 – $3,500+");
  });
});