"use client";

import { useLayoutEffect, useRef } from "react";

/** Reveal each off-screen element once; keep its existing layout and rotation. */
export function useViewportReveal(page: string) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 800px)');
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry, index) => {
        const target = entry.target as HTMLElement;
        target.style.setProperty('--reveal-delay', target.dataset.reveal === 'mobile' ? '330ms' : `${index % 3 * 100}ms`);
        target.dataset.revealState = 'visible';
        observer.unobserve(target);
      });
    }, { threshold: 0.08 });

    const observe = () => {
      observer.disconnect();
      targets.forEach((target) => {
        if (motion.matches || (target.dataset.reveal === 'mobile' && !mobile.matches)) {
          delete target.dataset.revealState;
        } else if (target.dataset.revealState !== 'visible') {
          target.dataset.revealState = 'pending';
          observer.observe(target);
        }
      });
    };
    observe();
    motion.addEventListener('change', observe);
    mobile.addEventListener('change', observe);
    return () => {
      observer.disconnect();
      motion.removeEventListener('change', observe);
      mobile.removeEventListener('change', observe);
      targets.forEach((target) => {
        delete target.dataset.revealState;
        target.style.removeProperty('--reveal-delay');
      });
    };
  }, [page]);

  return ref;
}
