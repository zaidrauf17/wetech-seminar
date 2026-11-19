"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import type { SlideProps } from "@/lib/types";

type EraId = "w1" | "w2" | "w3" | "modern";

interface Era {
  id: EraId;
  name: string;
  years: string;
  tagline: string;
  mode: string;
  points: string[];
  color: string;
}

const ERAS: Era[] = [
  { id: "w1", name: "Web 1.0", years: "1990s – early 2000s", tagline: "Static websites", mode: "Read", points: ["Pages written by hand in HTML", "You could only read, not interact", "Example: early company brochures"], color: "#94a3b8" },
  { id: "w2", name: "Web 2.0", years: "mid 2000s – 2010s", tagline: "Interactive & social", mode: "Read + Write", points: ["Users create the content", "Social media, video, online shopping", "Dynamic pages powered by databases"], color: "#38bdf8" },
  { id: "w3", name: "Web 3.0", years: "emerging", tagline: "Decentralization", mode: "Read + Write + Own", points: ["Blockchain and digital ownership", "Less reliance on a single company", "Still evolving and debated"], color: "#a78bfa" },
  { id: "modern", name: "Modern Web", years: "today", tagline: "AI-powered & real-time", mode: "Read + Write + Think", points: ["Apps that personalise and predict", "Live updates, chat and collaboration", "AI built into everyday products"], color: "#22d3ee" },
];

function Visual({ id, color }: { id: EraId; color: string }) {
  if (id === "w1") {
    return (
      <div className="flex h-full flex-col gap-1.5 rounded-lg bg-white/90 p-2.5">
        <div className="h-2 w-3/4 rounded-sm bg-slate-700" />
        {[90, 100, 70, 95, 60].map((w, i) => (
          <div key={i} className="h-1 rounded-sm bg-slate-400" style={{ width: `${w}%` }} />
        ))}
        <div className="mt-auto h-1.5 w-1/3 rounded-sm bg-blue-700" />
      </div>
    );
  }
  if (id === "w2") {
    return (
      <div className="flex h-full flex-col gap-1.5 rounded-lg bg-navy-950/70 p-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`flex items-center gap-1.5 ${i === 1 ? "flex-row-reverse" : ""}`}>
            <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: color }} />
            <span className="h-3 rounded-full bg-white/20" style={{ width: `${55 + i * 12}%` }} />
          </div>
        ))}
        <div className="mt-auto flex gap-1.5 text-[0.6rem]">
          <span className="rounded bg-white/10 px-1.5">♥ 2.4k</span>
          <span className="rounded bg-white/10 px-1.5">Share</span>
        </div>
      </div>
    );
  }
  if (id === "w3") {
    const pts: Array<[number, number]> = [[18, 22], [72, 16], [48, 52], [20, 80], [80, 76]];
    return (
      <svg viewBox="0 0 100 100" className="h-full w-full rounded-lg bg-navy-950/70" aria-hidden>
        {pts.map(([x, y], i) =>
          pts.slice(i + 1).map(([x2, y2], j) => (
            <line key={`${i}-${j}`} x1={x} y1={y} x2={x2} y2={y2} stroke={color} strokeOpacity="0.45" strokeWidth="0.8" />
          )),
        )}
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="5" fill={color} />
        ))}
      </svg>
    );
  }
  return (
    <div className="flex h-full flex-col gap-1.5 rounded-lg bg-navy-950/70 p-2.5">
      <div className="ml-auto h-3.5 w-2/3 rounded-full bg-white/20" />
      <div className="flex items-start gap-1.5">
        <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-electric to-neon" />
        <div className="flex flex-1 flex-col gap-1">
          <motion.span className="h-2.5 rounded-full bg-neon/50" animate={{ width: ["20%", "85%", "20%"] }} transition={{ duration: 3, repeat: Infinity }} />
          <span className="h-2.5 w-2/3 rounded-full bg-white/15" />
        </div>
      </div>
      <div className="mt-auto text-[0.6rem] text-neon">● live · personalised</div>
    </div>
  );
}

export default function Slide05Evolution(_props: SlideProps) {
  const [selected, setSelected] = useState<EraId>("modern");

  return (
    <SlideShell accent="violet">
      <div className="flex h-full flex-col justify-between gap-[2vh]">
        <SlideHeader
          kicker="Foundations"
          title={
            <>
              The <span className="text-gradient">evolution</span> of the web
            </>
          }
          subtitle="Each generation changed what the internet lets people do."
        />

        <div className="relative">
          <div className="absolute left-0 right-0 top-[2.6rem] h-[3px] rounded bg-white/10" />
          <motion.div
            className="absolute left-0 top-[2.6rem] h-[3px] rounded bg-gradient-to-r from-slate-400 via-violet-400 to-neon shadow-[0_0_16px_#22d3ee]"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, delay: 0.3, ease: "easeInOut" }}
          />
          <div className="relative grid grid-cols-2 gap-[1.2vw] lg:grid-cols-4">
            {ERAS.map((era, i) => {
              const on = era.id === selected;
              return (
                <motion.button
                  key={era.id}
                  type="button"
                  onClick={() => setSelected(era.id)}
                  className="flex flex-col items-stretch gap-3 text-left"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + i * 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-5 w-5 rounded-full border-4 border-navy-950"
                      style={{ background: era.color, boxShadow: on ? `0 0 22px ${era.color}` : "none" }}
                    />
                    <span className="font-mono text-xs uppercase tracking-widest text-slate-400">{era.years}</span>
                  </span>
                  <span
                    className="glass flex flex-col gap-[1.2vh] rounded-2xl p-[1.6vh] transition"
                    style={{
                      borderColor: on ? era.color : undefined,
                      boxShadow: on ? `0 0 36px ${era.color}40` : undefined,
                      opacity: on ? 1 : 0.7,
                    }}
                  >
                    <span className="h-[12vh] min-h-[84px]">
                      <Visual id={era.id} color={era.color} />
                    </span>
                    <span className="text-[clamp(1.1rem,1.7vw,1.9rem)] font-extrabold" style={{ color: era.color }}>
                      {era.name}
                    </span>
                    <span className="text-[clamp(0.9rem,1.2vw,1.3rem)] font-semibold">{era.tagline}</span>
                    <span className="w-fit rounded-full bg-white/10 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider">
                      {era.mode}
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={selected}
          className="glass rounded-2xl p-[2vh]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {(() => {
            const era = ERAS.find((e) => e.id === selected) as Era;
            return (
              <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                <span className="text-[clamp(1.1rem,1.6vw,1.8rem)] font-bold" style={{ color: era.color }}>
                  {era.name}: {era.tagline}
                </span>
                {era.points.map((p) => (
                  <span key={p} className="flex items-center gap-2 text-[clamp(0.85rem,1.15vw,1.25rem)] text-slate-200">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: era.color }} />
                    {p}
                  </span>
                ))}
              </div>
            );
          })()}
        </motion.div>
      </div>
    </SlideShell>
  );
}
