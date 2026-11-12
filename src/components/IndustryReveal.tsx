import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function IndustryReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useScrollReveal({ delay });
  return <div ref={ref} className={`hc-reveal ${className}`}>{children}</div>;
}