"use client";

import type { ReactNode } from "react";

interface SlideShellProps {
  children: ReactNode;
  /** Accent used for the background glow. */
  accent?: "blue" | "cyan" | "violet";
  /** Show the faint tech grid behind the slide. */
  grid?: boolean;
  className?: string;
}

const GLOWS: Record<NonNullable<SlideShellProps["accent"]>, [string, string]> = {
  blue: ["rgba(47,107,255,0.28)", "rgba(34,211,238,0.16)"],
  cyan: ["rgba(34,211,238,0.24)", "rgba(47,107,255,0.18)"],
  violet: ["rgba(139,92,246,0.24)", "rgba(47,107,255,0.2)"],
};

/**
 * Every slide is wrapped in this shell: 100vh, deep-navy base,
 * soft aurora glows and an optional grid. Content sits above in a padded flex column.
 */
export default function SlideShell({
  children,
  accent = "blue",
  grid = true,
  className = "",
}: SlideShellProps) {
  const [a, b] = GLOWS[accent];
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-navy-950">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 55% at 15% 10%, ${a}, transparent 70%),
                       radial-gradient(55% 50% at 90% 95%, ${b}, transparent 70%)`,
        }}
      />
      {grid && <div aria-hidden className="grid-bg pointer-events-none absolute inset-0" />}
      <div
        className={`relative z-10 flex h-full w-full flex-col px-[5vw] pb-[7vh] pt-[6vh] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
