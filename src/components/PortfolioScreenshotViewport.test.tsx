import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import PortfolioScreenshotViewport from "./PortfolioScreenshotViewport";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("portfolio preview hint state", () => {
  it("remembers a card's first actual scroll across mouse re-entry", () => {
    const { container } = render(<PortfolioScreenshotViewport src="/homepage.jpg" alt="Homepage" />);
    const viewport = container.querySelector(".portfolio-screenshot-screen");
    if (!viewport) throw new Error("Preview missing");
    fireEvent.scroll(viewport, { target: { scrollTop: 0 } });
    expect(screen.queryByText("↕ Scroll")).not.toBeNull();
    fireEvent.scroll(viewport, { target: { scrollTop: 20 } });
    fireEvent.mouseLeave(viewport);
    fireEvent.mouseEnter(viewport);
    expect(screen.queryByText("↕ Scroll")).toBeNull();
  });

  it("keeps the scroll history separate for each preview", () => {
    const { container } = render(<><PortfolioScreenshotViewport alt="First" /><PortfolioScreenshotViewport alt="Second" /></>);
    const viewport = container.querySelector(".portfolio-screenshot-screen");
    if (!viewport) throw new Error("Preview missing");
    fireEvent.scroll(viewport, { target: { scrollTop: 10 } });
    expect(screen.queryAllByText("↕ Scroll")).toHaveLength(1);
  });

  it("also remembers the phone preview's first scroll", () => {
    const { container } = render(<PortfolioScreenshotViewport alt="Mobile" variant="phone" />);
    const viewport = container.querySelector(".portfolio-screenshot-screen");
    if (!viewport) throw new Error("Preview missing");
    fireEvent.scroll(viewport, { target: { scrollTop: 100 } });
    fireEvent.scroll(viewport, { target: { scrollTop: 0 } });
    expect(screen.queryByText("↕ Scroll")).toBeNull();
  });
});

describe("opt-in homepage scrolling", () => {
  const animation = (desktop = true, reduced = false) => {
    let callback: FrameRequestCallback | undefined;
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: query.includes("reduced-motion") ? reduced : desktop }));
    const request = vi.fn((next: FrameRequestCallback) => { callback = next; return 1; });
    const cancel = vi.fn(() => { callback = undefined; });
    vi.stubGlobal("requestAnimationFrame", request);
    vi.stubGlobal("cancelAnimationFrame", cancel);
    return { request, cancel, step: (time: number) => callback?.(time) };
  };
  const preview = (autoScrollOnHover = true) => {
    const { container } = render(<PortfolioScreenshotViewport alt="Homepage" autoScrollOnHover={autoScrollOnHover} />);
    const viewport = container.querySelector(".portfolio-screenshot-screen");
    const outer = container.querySelector(".portfolio-screenshot");
    if (!(viewport instanceof HTMLElement) || !outer) throw new Error("Preview missing");
    Object.defineProperty(viewport, "scrollHeight", { value: 2000 });
    Object.defineProperty(viewport, "clientHeight", { value: 400 });
    return { viewport, outer };
  };
  it("scrolls at 120px per second only when opted in", () => {
    const clock = animation();
    const { viewport, outer } = preview();
    fireEvent.mouseEnter(outer);
    for (let time = 0; time <= 1000; time += 100) clock.step(time);
    expect(viewport.scrollTop).toBeCloseTo(120);
  });
  it("does not auto-scroll ordinary portfolio previews", () => {
    const clock = animation();
    const { outer } = preview(false);
    fireEvent.mouseEnter(outer);
    expect(clock.request).not.toHaveBeenCalled();
  });
  it.each([[false, false], [true, true]])("disables animation for touch or reduced motion (%s, %s)", (desktop, reduced) => {
    const clock = animation(desktop, reduced);
    const { outer } = preview();
    fireEvent.mouseEnter(outer);
    expect(clock.request).not.toHaveBeenCalled();
  });
  it("stops for manual wheel scrolling and leaves the user in control on exit", () => {
    const clock = animation();
    const { viewport, outer } = preview();
    fireEvent.mouseEnter(outer);
    clock.step(0); clock.step(100);
    fireEvent.wheel(viewport);
    const top = viewport.scrollTop;
    clock.step(200);
    fireEvent.mouseLeave(outer);
    expect(viewport.scrollTop).toBe(top);
    expect(clock.cancel).toHaveBeenCalled();
    expect(clock.request).toHaveBeenCalledTimes(3);
  });
  it("smoothly returns to the top on exit", () => {
    const clock = animation();
    const { viewport, outer } = preview();
    viewport.scrollTop = 240;
    fireEvent.mouseLeave(outer);
    clock.step(performance.now() + 650);
    expect(viewport.scrollTop).toBe(0);
  });
});