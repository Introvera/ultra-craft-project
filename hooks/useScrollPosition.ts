"use client";
import { useEffect, useState } from "react";

// Your existing hook (unchanged)
export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => setScrollPosition(window.pageYOffset);
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
}

// New smooth-scroll helper
export function scrollToY(targetY: number, duration = 500) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  let startTime: number | null = null;

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    // easeInOutQuad easing
    const ease = progress < 0.5
      ? 2 * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) requestAnimationFrame(animation);
  }

  requestAnimationFrame(animation);
}

// Convenience wrappers
export const smoothScrollToTop = (duration?: number) => scrollToY(0, duration);
export const smoothScrollToBottom = (duration?: number) =>
  scrollToY(document.body.scrollHeight, duration);
export const smoothScrollToElement = (selector: string, duration = 500) => {
  const el = document.querySelector(selector);
  if (el) {
    const offsetTop = el.getBoundingClientRect().top + window.pageYOffset;
    scrollToY(offsetTop - 80, duration); // optional header offset
  }
};