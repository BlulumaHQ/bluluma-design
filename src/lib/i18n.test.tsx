import { cleanup, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { LangProvider, useLang } from "./i18n";

afterEach(() => { cleanup(); localStorage.removeItem("bluluma_lang"); });
describe("homepage investment range", () => {
  it.each(["en", "zh"])("sets the investment range to $1,499 – $3,500+ in %s", (lang) => {
    localStorage.setItem("bluluma_lang", lang);
    const { result } = renderHook(() => useLang(), { wrapper: LangProvider });
    expect(result.current.t("home.pricing.range")).toBe("$1,499 – $3,500+");
  });
});