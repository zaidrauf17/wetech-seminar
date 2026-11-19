"use client";

import { motion } from "framer-motion";
import { Bot, Cloud, Cpu, Gauge, Globe, Lock, Mic, Orbit, Pause, Play, Radio, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import type { SlideProps } from "@/lib/types";

type Status = "inuse" | "emerging" | "future";

interface Trend {
  name: string;
  line: string;
  icon: LucideIcon;
  status: Status;
  /** Year we expect it to be mainstream (an informed prediction, not a promise). */
  year: number;
}

const STATUS: Record<Status, { label: string; color: string }> = {
  inuse: { label: "In use today", color: "#34d399" },
  emerging: { label: "Emerging now", color: "#22d3ee" },
  future: { label: "Future possibility", color: "#a78bfa" },
};

const TRENDS: Trend[] = [
  { name: "Serverless & cloud-native", line: "Scale without managing servers", icon: Cloud, status: "inuse", year: 2026 },
  { name: "WebAssembly", line: "Near-native speed in the browser", icon: Cpu, status: "inuse", year: 2026 },
  { name: "Edge computing", line: "Code that runs close to the user", icon: Globe, status: "inuse", year: 2026 },
  { name: "Real-time applications", line: "Live chat, tracking, collaboration", icon: Radio, status: "inuse", year: 2026 },
  { name: "Cybersecurity & privacy", line: "Passkeys, zero trust, privacy-first", icon: Lock, status: "inuse", year: 2026 },
  { name: "AI-native web apps", line: "Designed around AI from day one", icon: Sparkles, status: "emerging", year: 2027 },
  { name: "Voice-driven interfaces", line: "Talk to websites, not just tap", icon: Mic, status: "emerging", year: 2028 },
  { name: "Autonomous AI agents", line: "Software that plans and acts for you", icon: Bot, status: "emerging", year: 2029 },
  { name: "WebGPU & browser computing", line: "GPU power for graphics and AI", icon: Gauge, status: "emerging", year: 2030 },
  { name: "Spatial & immersive web", line: "3D, AR and VR through the browser", icon: Orbit, status: "future", year: 2033 },
];

const YEARS = Array.from({ length: 10 }, (_, i) => 2026 + i);

export default function Slide09Future(_props: SlideProps) {
  const [year, setYear] = useState(2026);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (year >= 2035) setPlaying(false);
      else setYear((y) => y + 1);
    }, year === 2026 ? 1600 : 1100);
    return () => clearTimeout(t);
  }, [playing, year]);

  const litCount = TRENDS.filter((t) => t.year <= year).length;

  return (
    <SlideShell accent="violet">
      <div className="flex h-full flex-col justify-between gap-[2vh]">
        <div className="flex items-end justify-between gap-6">
          <SlideHeader
            kicker="2026 – 2035"
            title={
              <>
                The <span className="text-gradient">future</span> of web development
              </>
            }
          />
          <div className="hidden shrink-0 text-right md:block">
            <p className="font-mono text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-none text-gradient-blue">{year}</p>
            <p className="text-sm text-slate-400">
              {litCount} of {TRENDS.length} mainstream
            </p>
          </div>
        </div>

        {/* Year selector */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={playing ? "Pause timeline" : "Play timeline"}
            onClick={() => {
              if (!playing && year >= 2035) setYear(2026);
              setPlaying((p) => !p);
            }}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <div className="relative flex flex-1 justify-between">
            <div className="absolute left-0 right-0 top-[1.05rem] h-[3px] rounded bg-white/10" />
            <motion.div
              className="absolute left-0 top-[1.05rem] h-[3px] rounded bg-gradient-to-r from-emerald-400 via-neon to-violet-400 shadow-[0_0_14px_#22d3ee]"
              animate={{ width: `${((year - 2026) / 9) * 100}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            {YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  setPlaying(false);
                  setYear(y);
                }}
                className="relative flex flex-col items-center gap-1.5"
              >
                <span
                  className={`h-[1.4rem] w-[1.4rem] rounded-full border-4 border-navy-950 transition ${
                    y <= year ? "bg-neon shadow-[0_0_16px_#22d3ee]" : "bg-slate-600"
                  }`}
                />
                <span className={`font-mono text-[clamp(0.65rem,0.9vw,1rem)] ${y === year ? "font-bold text-white" : "text-slate-500"}`}>{y}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Trends */}
        <div className="grid flex-1 grid-cols-2 gap-[0.9vw] md:grid-cols-5">
          {TRENDS.map((t) => {
            const Icon = t.icon;
            const lit = t.year <= year;
            const s = STATUS[t.status];
            return (
              <motion.div
                key={t.name}
                className="glass flex flex-col justify-between gap-2 rounded-2xl p-[1.4vh]"
                animate={{
                  opacity: lit ? 1 : 0.28,
                  scale: lit ? 1 : 0.96,
                  borderColor: lit ? `${s.color}99` : "rgba(255,255,255,0.1)",
                  boxShadow: lit ? `0 0 28px ${s.color}30` : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6" style={{ color: s.color }} />
                  <span className="font-mono text-[0.7rem] text-slate-400">~{t.year}</span>
                </div>
                <div>
                  <h3 className="text-[clamp(0.85rem,1.2vw,1.35rem)] font-bold leading-tight">{t.name}</h3>
                  <p className="mt-1 text-[clamp(0.7rem,0.9vw,1rem)] leading-snug text-slate-400">{t.line}</p>
                </div>
                <span
                  className="w-fit rounded-full px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider"
                  style={{ background: `${s.color}26`, color: s.color }}
                >
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-500">
          Years show when each trend may become mainstream. They are informed predictions, not guarantees.
        </p>
      </div>
    </SlideShell>
  );
}
