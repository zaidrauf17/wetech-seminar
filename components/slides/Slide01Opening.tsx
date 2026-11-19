"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import Reveal from "@/components/ui/Reveal";
import type { SlideProps } from "@/lib/types";

interface Token {
  label: string;
  left: string;
  top: string;
  delay: number;
  color: string;
}

const TOKENS: Token[] = [
  { label: "</>", left: "6%", top: "16%", delay: 0, color: "#22d3ee" },
  { label: "HTML", left: "44%", top: "8%", delay: 0.8, color: "#fb923c" },
  { label: "{ CSS }", left: "30%", top: "78%", delay: 1.4, color: "#60a5fa" },
  { label: "JS", left: "90%", top: "14%", delay: 0.4, color: "#facc15" },
  { label: "React", left: "84%", top: "80%", delay: 1.1, color: "#38bdf8" },
  { label: "AI", left: "56%", top: "88%", delay: 1.8, color: "#a78bfa" },
  { label: "=> {}", left: "14%", top: "52%", delay: 2.2, color: "#34d399" },
];

// Nodes placed on the globe (viewBox 400x400, centre 200,200, radius 160).
const NODES: Array<[number, number]> = [
  [200, 40], [320, 90], [356, 200], [300, 320], [200, 360], [90, 310], [48, 190], [100, 80], [210, 150], [150, 250], [270, 240],
];
const LINKS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], [8, 0], [8, 2], [8, 6], [9, 5], [9, 8], [10, 3], [10, 8], [10, 2], [9, 6],
];

function Globe() {
  return (
    <div className="relative aspect-square w-[min(44vw,70vh)]">
      <div className="absolute inset-[-12%] rounded-full bg-electric/25 blur-[90px]" aria-hidden />
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="g-fill" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2f6bff" stopOpacity="0.02" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="160" fill="url(#g-fill)" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.5" />
          {[40, 100].map((rx) => (
            <ellipse key={rx} cx="200" cy="200" rx={rx} ry="160" fill="none" stroke="#2f6bff" strokeOpacity="0.45" />
          ))}
          {[0, 60, 120].map((deg) => (
            <ellipse key={deg} cx="200" cy="200" rx="160" ry="56" fill="none" stroke="#22d3ee" strokeOpacity="0.25" transform={`rotate(${deg} 200 200)`} />
          ))}
          {LINKS.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              stroke="#8fd8ff"
              strokeOpacity="0.5"
              strokeWidth="1"
              strokeDasharray="4 6"
              className="animate-dash"
            />
          ))}
          {NODES.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="5"
              fill="#ffffff"
              animate={{ opacity: [0.4, 1, 0.4], r: [4, 7, 4] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

export default function Slide01Opening(_props: SlideProps) {
  return (
    <SlideShell accent="cyan">
      {TOKENS.map((t) => (
        <motion.span
          key={t.label}
          aria-hidden
          className="pointer-events-none absolute z-0 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[clamp(0.8rem,1.3vw,1.4rem)] font-semibold backdrop-blur-sm"
          style={{ left: t.left, top: t.top, color: t.color, boxShadow: `0 0 24px ${t.color}33` }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.85, scale: 1, y: [0, -18, 0] }}
          transition={{
            opacity: { delay: t.delay * 0.4, duration: 0.8 },
            scale: { delay: t.delay * 0.4, duration: 0.8 },
            y: { duration: 6 + t.delay, repeat: Infinity, ease: "easeInOut", delay: t.delay },
          }}
        >
          {t.label}
        </motion.span>
      ))}

      <div className="relative z-10 flex h-full items-center justify-between gap-[3vw]">
        <div className="flex max-w-[52vw] flex-col gap-[3vh]">
          <Reveal>
            <span className="chip">
              <Sparkles className="h-3.5 w-3.5" /> IT Consultation Seminar
            </span>
          </Reveal>
          <Reveal delay={0.12}>
            <h1 className="text-[clamp(2.4rem,5.6vw,6rem)] font-black leading-[0.98] tracking-tight">
              <span className="text-gradient">WEB DEVELOPMENT:</span>
              <br />
              FROM ZERO
              <br />
              TO THE FUTURE
            </h1>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="max-w-[34ch] text-[clamp(1.05rem,1.8vw,1.9rem)] leading-snug text-slate-300">
              Building the Digital World, One Line of Code at a Time.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="glass flex w-fit items-center gap-4 rounded-2xl px-5 py-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric to-neon text-lg font-black">
                ZR
              </div>
              <div>
                <p className="text-[clamp(1rem,1.4vw,1.5rem)] font-semibold">Presented by Sir Zaid Rauf</p>
                <p className="text-[clamp(0.8rem,1vw,1.1rem)] text-slate-400">Web Developer | We Tech House</p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="hidden shrink-0 md:block">
          <Globe />
        </Reveal>
      </div>
    </SlideShell>
  );
}
