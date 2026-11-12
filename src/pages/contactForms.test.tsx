import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LangProvider } from "@/lib/i18n";
import Contact from "./Contact";
import Start from "./Start";

vi.mock("@/hooks/useScrollReveal", () => ({ useScrollReveal: () => ({ current: null }) }));
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe.each([{ name: "Contact", Page: Contact }, { name: "Proposal", Page: Start }])("$name form safeguards", ({ Page, name }) => {
  it("keeps required fields and rejects invalid email addresses", () => {
    const { container } = render(<MemoryRouter><LangProvider><Page /></LangProvider></MemoryRouter>);
    const form = container.querySelector("form");
    const email = container.querySelector<HTMLInputElement>('input[name="email"]');
    expect(form?.checkValidity()).toBe(false);
    if (!email) throw new Error("Missing email field");
    fireEvent.change(email, { target: { value: "not-an-email" } });
    expect(email.validity.typeMismatch).toBe(true);
    expect(container.querySelector('input[name="name"]')?.hasAttribute("required")).toBe(true);
    expect(container.querySelector(name === "Contact" ? '[name="message"]' : '[name="details"]')?.hasAttribute("required")).toBe(true);
  });

  it("preserves timestamp and empty honeypot in the existing submission", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("", { status: 502 }));
    const { container } = render(<MemoryRouter><LangProvider><Page /></LangProvider></MemoryRouter>);
    const form = container.querySelector("form");
    if (!form) throw new Error("Missing form");
    fireEvent.submit(form);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/.netlify/functions/contact");
    expect(options?.method).toBe("POST");
    const data = options?.body;
    if (!(data instanceof FormData)) throw new Error("Missing form payload");
    expect(Number(data.get("_t"))).toBeGreaterThan(0);
    expect(data.get("website_hp")).toBe("");
    expect(data.get("source")).toBe(name === "Contact" ? "bluluma contact form" : "bluluma start project");
    await waitFor(() => expect(form.querySelector('button[type="submit"]')).not.toBeDisabled());
  });
});