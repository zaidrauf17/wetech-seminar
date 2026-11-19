"use client";

import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SlideHeaderProps {
  kicker: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}

/** Consistent header block: small uppercase kicker, large title, optional one-line subtitle. */
export default function SlideHeader({ kicker, title, subtitle, align = "left" }: SlideHeaderProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <div className={`flex flex-col gap-[1.2vh] ${alignment}`}>
      <Reveal>
        <span className="chip">{kicker}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="text-[clamp(1.9rem,4.2vw,4.4rem)] font-extrabold leading-[1.05] tracking-tight">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.16}>
          <p className="max-w-[60ch] text-[clamp(1rem,1.5vw,1.6rem)] leading-snug text-slate-300">
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
