"use client";

import { motion } from "framer-motion";
import { Maximize2, Play } from "lucide-react";

interface WelcomeProps {
  onStart: (fullscreen: boolean) => void;
}

const ORBS = [
  { size: 520, x: "8%", y: "12%", color: "rgba(47,107,255,0.35)", dur: 14 },
  { size: 420, x: "72%", y: "60%", color: "rgba(34,211,238,0.28)", dur: 17 },
  { size: 300, x: "55%", y: "6%", color: "rgba(139,92,246,0.22)", dur: 12 },
];

/** Welcome screen shown before the presentation starts. */
export default function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-navy-950">
      <div aria-hidden className="grid-bg absolute inset-0" />
      {ORBS.map((o, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="absolute rounded-full blur-3xl"
          style={{ width: o.size, height: o.size, left: o.x, top: o.y, background: o.color }}
          animate={{ x: [0, 40, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      <div className="relative z-10 flex max-w-[1100px] flex-col items-center px-6 text-center">
        <motion.span
          className="chip"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          IT Consultation Seminar · We Tech House · Lahore
        </motion.span>

        <motion.h1
          className="mt-[3vh] text-[clamp(2.4rem,6.4vw,6.5rem)] font-black leading-[0.98] tracking-tight"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-gradient">WEB DEVELOPMENT</span>
          <br />
          <span className="text-white">FROM ZERO TO THE FUTURE</span>
        </motion.h1>

        <motion.p
          className="mt-[3vh] text-[clamp(1rem,1.6vw,1.7rem)] text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Presented by <span className="font-semibold text-white">Sir Zaid Rauf</span> · Web Developer
        </motion.p>

        <motion.div
          className="mt-[6vh] flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <button type="button" className="btn-primary text-[clamp(0.95rem,1.3vw,1.3rem)]" onClick={() => onStart(true)}>
            <Play className="h-5 w-5 fill-current" />
            START PRESENTATION
          </button>
          <button
            type="button"
            onClick={() => onStart(false)}
            className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <Maximize2 className="h-4 w-4" />
            Start without fullscreen
          </button>
        </motion.div>

        <motion.p
          className="mt-[7vh] text-xs tracking-wide text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          ← → or Space to navigate · F fullscreen · O overview · M menu · N notes
        </motion.p>
      </div>
    </div>
  );
}
