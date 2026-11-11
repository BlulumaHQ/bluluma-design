# Architecture

- Keep portfolio listings and details on the existing central CMS `portfolio_feed` reader; presentation changes must not alter its filtering or ordering.
- Share screenshot scrolling and per-preview hint state through `PortfolioScreenshotViewport`; card previews defer touch scrolling to the page, while phone previews remain scrollable.
- Healthcare uses a reusable industry header and scoped theme; its hero assets and category sample reuse the public portfolio feed, sampling a copy so other pages retain CMS ordering.