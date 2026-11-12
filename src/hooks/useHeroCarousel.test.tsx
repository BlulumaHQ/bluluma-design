import { act, cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useHeroCarousel } from './useHeroCarousel';
let reduced = false;
beforeEach(() => { vi.useFakeTimers(); reduced = false; vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() }))); });
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
describe('homepage carousel timing', () => {
  it('advances every seven seconds and wraps after four slides', () => {
    const { result } = renderHook(() => useHeroCarousel());
    act(() => vi.advanceTimersByTime(6900)); expect(result.current.index).toBe(0);
    act(() => vi.advanceTimersByTime(100)); expect(result.current.index).toBe(1);
    act(() => vi.advanceTimersByTime(21000)); expect(result.current.index).toBe(0);
  });
  it('pauses on hover and resumes the remaining time', () => {
    const { result } = renderHook(() => useHeroCarousel());
    act(() => vi.advanceTimersByTime(3000)); act(() => result.current.setHovered(true));
    act(() => vi.advanceTimersByTime(14000)); expect(result.current.index).toBe(0); expect(result.current.elapsed).toBe(3000);
    act(() => result.current.setHovered(false)); act(() => vi.advanceTimersByTime(4000)); expect(result.current.index).toBe(1);
  });
  it('pauses while focus is inside the carousel', () => {
    const { result } = renderHook(() => useHeroCarousel());
    act(() => result.current.setFocused(true)); act(() => vi.advanceTimersByTime(14000)); expect(result.current.index).toBe(0);
  });
  it('does not auto-advance with reduced motion but still allows navigation', () => {
    reduced = true; const { result } = renderHook(() => useHeroCarousel());
    act(() => vi.advanceTimersByTime(14000)); expect(result.current.index).toBe(0);
    act(() => result.current.goTo(2)); expect(result.current.index).toBe(2);
  });
  it('manual navigation resets the seven-second period', () => {
    const { result } = renderHook(() => useHeroCarousel());
    act(() => vi.advanceTimersByTime(6000)); act(() => result.current.goTo(3)); expect(result.current.elapsed).toBe(0);
    act(() => vi.advanceTimersByTime(7000)); expect(result.current.index).toBe(0);
  });
});
