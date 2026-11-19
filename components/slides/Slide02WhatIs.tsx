"use client";

import { motion } from "framer-motion";
import { Database, Layers, MonitorSmartphone, Server } from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import Reveal from "@/components/ui/Reveal";
import type { SlideProps } from "@/lib/types";

type Track = "frontend" | "backend" | "fullstack";
type Layer = "frontend" | "backend" | "database";

interface TrackInfo {
  id: Track;
  title: string;
  blurb: string;
  icon: ComponentType<{ className?: string }>;
  lights: Layer[];
}

const TRACKS: TrackInfo[] = [
  { id: "frontend", title: "Frontend Development", blurb: "What users see and interact with.", icon: MonitorSmartphone, lights: ["frontend"] },
  { id: "backend", title: "Backend Development", blurb: "The logic and processing behind applications.", icon: Server, lights: ["backend", "database"] },
  { id: "fullstack", title: "Full Stack Development", blurb: "Working with both frontend and backend.", icon: Layers, lights: ["frontend", "backend", "database"] },
];

function Connector({ on }: { on: boolean }) {
  return (
    <div className="relative mx-auto h-[5.5vh] w-px bg-white/15">
      {on &&
        [0, 1].map((i) => (
          <motion.span
            key={i}
            className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-neon shadow-[0_0_12px_#22d3ee]"
            animate={{ top: i === 0 ? ["0%", "100%"] : ["100%", "0%"], opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
          />
        ))}
    </div>
  );
}

interface LayerBoxProps {
  on: boolean;
  label: string;
  tag: string;
  icon: ComponentType<{ className?: string }>;
  children: React.ReactNode;
}

function LayerBox({ on, label, tag, icon: Icon, children }: LayerBoxProps) {
  return (
    <motion.div
      className="glass rounded-2xl p-[1.6vh]"
      animate={{
        opacity: on ? 1 : 0.35,
        scale: on ? 1 : 0.97,
        borderColor: on ? "rgba(34,211,238,0.7)" : "rgba(255,255,255,0.12)",
        boxShadow: on ? "0 0 40px rgba(34,211,238,0.25)" : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.45 }}
    >
      <div className="mb-[1vh] flex items-center justify-between">
        <span className="flex items-center gap-2 text-[clamp(0.9rem,1.2vw,1.3rem)] font-bold">
          <Icon className="h-5 w-5 text-neon" /> {label}
        </span>
        <span className="font-mono text-[0.7rem] uppercase tracking-widest text-slate-400">{tag}</span>
      </div>
      {children}
    </motion.div>
  );
}

export default function Slide02WhatIs(_props: SlideProps) {
  const [active, setActive] = useState<Track>("frontend");
  const [auto, setAuto] = useState(true);

  // Gently cycle through the three tracks until the presenter clicks one.
  useEffect(() => {
    if (!auto) return;
    const order: Track[] = ["frontend", "backend", "fullstack"];
    const t = setInterval(() => {
      setActive((cur) => order[(order.indexOf(cur) + 1) % order.length]);
    }, 3800);
    return () => clearInterval(t);
  }, [auto]);

  const lit = TRACKS.find((t) => t.id === active)?.lights ?? [];
  const on = (l: Layer) => lit.includes(l);

  return (
    <SlideShell accent="blue">
      <div className="grid h-full grid-cols-1 items-center gap-[3vw] lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col gap-[3vh]">
          <SlideHeader
            kicker="Foundations"
            title={
              <>
                What is <span className="text-gradient">web development</span>?
              </>
            }
            subtitle="Creating websites and web applications that people use through the internet."
          />
          <div className="flex flex-col gap-[1.6vh]">
            {TRACKS.map((t, i) => {
              const Icon = t.icon;
              const selected = t.id === active;
              return (
                <Reveal key={t.id} delay={0.25 + i * 0.1} x={-20} y={0}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuto(false);
                      setActive(t.id);
                    }}
                    className={`glass flex w-full items-center gap-4 rounded-2xl p-[1.8vh] text-left transition ${
                      selected ? "!border-neon/70 shadow-[0_0_34px_rgba(34,211,238,0.22)]" : "opacity-75 hover:opacity-100"
                    }`}
                  >
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-gradient-to-br from-electric to-neon" : "bg-white/10"}`}>
                      <Icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block text-[clamp(1.05rem,1.6vw,1.7rem)] font-bold">{t.title}</span>
                      <span className="block text-[clamp(0.85rem,1.15vw,1.2rem)] text-slate-300">{t.blurb}</span>
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal delay={0.3} className="mx-auto w-full max-w-[560px]">
          <LayerBox on={on("frontend")} label="Frontend" tag="Browser" icon={MonitorSmartphone}>
            <div className="flex flex-col gap-1.5 rounded-lg bg-navy-950/60 p-2">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-red-400/80" />
                <span className="h-2 w-2 rounded-full bg-yellow-400/80" />
                <span className="h-2 w-2 rounded-full bg-green-400/80" />
              </div>
              <div className="h-2 w-2/3 rounded bg-white/20" />
              <div className="flex gap-2">
                <div className="h-7 flex-1 rounded bg-electric/40" />
                <div className="h-7 w-20 rounded bg-neon/50" />
              </div>
            </div>
          </LayerBox>
          <Connector on={on("frontend") && on("backend")} />
          <LayerBox on={on("backend")} label="Backend" tag="Server + API" icon={Server}>
            <pre className="rounded-lg bg-navy-950/60 p-2 font-mono text-[clamp(0.7rem,0.95vw,1rem)] leading-relaxed text-slate-300">
{`POST /api/login
→ check password
→ create session
← 200 OK`}
            </pre>
          </LayerBox>
          <Connector on={on("backend") && on("database")} />
          <LayerBox on={on("database")} label="Database" tag="Storage" icon={Database}>
            <div className="grid grid-cols-3 gap-1.5 font-mono text-[clamp(0.65rem,0.85vw,0.9rem)] text-slate-300">
              {["id", "name", "email", "1", "Ayesha", "a@mail.pk", "2", "Hamza", "h@mail.pk"].map((c, i) => (
                <span key={i} className={`rounded px-2 py-1 ${i < 3 ? "bg-neon/20 text-neon" : "bg-white/5"}`}>
                  {c}
                </span>
              ))}
            </div>
          </LayerBox>
        </Reveal>
      </div>
    </SlideShell>
  );
}
