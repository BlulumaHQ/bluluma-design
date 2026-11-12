import { useEffect, useState, useCallback } from 'react';
export const HERO_SLIDE_DURATION = 7000;
export function useHeroCarousel(count = 4) {
  const [state, setState] = useState({ index: 0, elapsed: 0 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const [reduced, setReduced] = useState(() => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  const paused = hovered || focused || stopped || reduced;
  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setState(s => s.elapsed + 100 >= HERO_SLIDE_DURATION ? { index: (s.index + 1) % count, elapsed: 0 } : { ...s, elapsed: s.elapsed + 100 }), 100);
    return () => window.clearInterval(timer);
  }, [paused, count]);
  const goTo = useCallback((index: number) => setState({ index: ((index % count) + count) % count, elapsed: 0 }), [count]);
  return { ...state, paused, reduced, stopped, setStopped, setHovered, setFocused, goTo };
}
