import type { ReactNode } from "react";

/** Presentation-only browser chrome; screenshot dimensions and scrolling stay with the child. */
export default function SiteBrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="site-browser-frame">
      <div className="site-browser-bar" aria-hidden="true"><i /><i /><i /></div>
      {children}
    </div>
  );
}