# Architecture

- Keep portfolio listings and details on the existing central CMS `portfolio_feed` reader; presentation changes must not alter its filtering or ordering.
- Share screenshot scrolling and per-preview hint state through `PortfolioScreenshotViewport`; card previews defer touch scrolling to the page, while phone previews remain scrollable.
- Healthcare uses a reusable industry header and scoped theme; its hero assets and category sample reuse the public portfolio feed, sampling a copy so other pages retain CMS ordering.
- Homepage project curation lives in a pure selector that samples feed copies; preview auto-scrolling is opt-in so other portfolio surfaces retain their behavior.