import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PortfolioScreenshotViewport from "./PortfolioScreenshotViewport";

afterEach(cleanup);

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