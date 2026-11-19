"use client";

import { useCallback, useEffect, useState } from "react";

/** Fullscreen helpers built on the standard Fullscreen API. Fails silently if the browser blocks it. */
export function useFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onChange);
    onChange();
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  const enter = useCallback(async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    } catch {
      /* The browser refused (no user gesture, embedded frame, etc.). Presenting still works. */
    }
  }, []);

  const exit = useCallback(async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) await exit();
    else await enter();
  }, [enter, exit]);

  return { isFullscreen, enter, exit, toggle };
}

/** True once there has been no pointer/keyboard activity for `ms` milliseconds. */
export function useIdle(ms: number) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reset = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), ms);
    };
    reset();
    const events = ["mousemove", "mousedown", "touchstart", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, reset));
    };
  }, [ms]);

  return idle;
}
