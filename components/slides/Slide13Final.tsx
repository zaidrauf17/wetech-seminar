"use client";

import { motion } from "framer-motion";
import { BookOpen, Flame, Hammer, Puzzle, RefreshCw, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import Reveal from "@/components/ui/Reveal";
import type { SlideProps } from "@/lib/types";

interface Action {
  label: string;
  icon: LucideIcon;
  color: string;
}

const ACTIONS: Action[] = [
  { label: "Start learning", icon: BookOpen, color: "#22d3ee" },
  { label: "Build real projects", icon: Hammer, color: "#60a5fa" },
  { label: "Practice consistently", icon: Flame, color: "#fb923c" },
  { label: "Learn problem-solving", icon: Puzzle, color: "#a78bfa" },
  { label: "Stay updated", icon: RefreshCw, color: "#34d399" },
  { label: "Use AI as an advantage", icon: Sparkles, color: "#f472b6" },
];

const QUOTE = "Don’t just use technology. Learn to build it.";

/** Embers rising behind the finale. Deterministic positions, transform/opacity only. */
const EMBERS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  size: 3 + ((i * 5) % 6),
  duration: 9 + ((i * 7) % 9),
  delay: (i * 0.9) % 8,
  color: i % 3 === 0 ? "#22d3ee" : i % 3 === 1 ? "#60a5fa" : "#ffffff",
}));

export default function Slide13Final(_props: SlideProps) {
  return (
    <SlideShell accent="cyan">
      {/* Horizon glow: the "sunrise" of the future */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[45%]"
        style={{
          background:
            "radial-gradient(70% 100% at 50% 100%, rgba(34,211,238,0.28), rgba(47,107,255,0.14) 45%, transparent 75%)",
        }}
      />
      {EMBERS.map((e, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute bottom-0 z-0 rounded-full"
          style={{ left: e.left, width: e.size, height: e.size, background: e.color, boxShadow: `0 0 12px ${e.color}` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-105vh", opacity: [0, 0.8, 0] }}
          transition={{ duration: e.duration, repeat: Infinity, delay: e.delay, ease: "linear" }}
        />
      ))}

      <div className="relative z-10 flex h-full flex-col justify-between gap-[2vh]">
        <div className="flex flex-col items-center gap-[2vh] text-center">
          <Reveal>
            <span className="chip">The final message</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2.1rem,5.8vw,6.4rem)] font-black uppercase leading-[0.98] tracking-tight">
              The future belongs
              <br />
              to <span className="text-gradient">builders.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="max-w-[30ch] text-[clamp(1.1rem,2.1vw,2.3rem)] font-medium italic leading-snug text-slate-200">
              “{QUOTE}”
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-[1vw] md:grid-cols-3 xl:grid-cols-6">
          {ACTIONS.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                className="glass flex flex-col items-center gap-[1vh] rounded-2xl px-3 py-[1.8vh] text-center"
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.55, delay: 0.6 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  className="flex h-[clamp(2.4rem,5vh,3.6rem)] w-[clamp(2.4rem,5vh,3.6rem)] items-center justify-center rounded-xl"
                  style={{ background: `${a.color}26`, boxShadow: `0 0 22px ${a.color}33` }}
                >
                  <Icon className="h-1/2 w-1/2" style={{ color: a.color }} />
                </span>
                <span className="text-[clamp(0.8rem,1.15vw,1.3rem)] font-semibold leading-tight">{a.label}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex flex-wrap items-center justify-between gap-[2vw] border-t border-white/10 pt-[2vh]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-[clamp(2.2rem,5.2vw,5.6rem)] font-black leading-none tracking-tight">
            <span className="text-gradient">THANK YOU!</span>
          </h3>
          <div className="glass flex items-center gap-4 rounded-2xl px-5 py-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-electric to-neon text-lg font-black">
              ZR
            </div>
            <div>
              <p className="text-[clamp(1rem,1.4vw,1.5rem)] font-semibold">Presented by Sir Zaid Rauf</p>
              <p className="text-[clamp(0.8rem,1vw,1.1rem)] text-slate-400">Web Developer | We Tech House</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SlideShell>
  );
}
