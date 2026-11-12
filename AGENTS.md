# Architecture

- Keep portfolio listings and details on the existing central CMS `portfolio_feed` reader; presentation changes must not alter its filtering or ordering.
- Share screenshot scrolling and per-preview hint state through `PortfolioScreenshotViewport`; card previews defer touch scrolling to the page, while phone previews remain scrollable.
- Industry pages share IndustryHeader, IndustryHeroCollage, IndustryWork, and the industry-theme/legacy healthcare-theme palette; category selectors sample feed copies and counts use the full matching pool so CMS ordering remains unchanged.
- Homepage project curation lives in a pure selector that samples feed copies; preview auto-scrolling is opt-in so other portfolio surfaces retain their behavior.