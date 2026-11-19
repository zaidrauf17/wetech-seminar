"use client";

import { motion } from "framer-motion";
import { Cloud, Database, FileCode2, GitBranch, KeyRound, Pause, Play, Rocket, Server, Sparkles, Atom, Triangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import type { SlideProps } from "@/lib/types";

interface Step {
  title: string;
  short: string;
  icon: LucideIcon;
  learn: string;
  build: string;
}

const STEPS: Step[] = [
  { title: "HTML and CSS", short: "HTML & CSS", icon: FileCode2, learn: "Page structure, Flexbox, Grid and responsive design.", build: "A personal portfolio page." },
  { title: "JavaScript", short: "JavaScript", icon: Sparkles, learn: "Variables, functions, the DOM, events and async code.", build: "A to-do list or a quiz game." },
  { title: "Git and GitHub", short: "Git & GitHub", icon: GitBranch, learn: "Commits, branches, pull requests and collaboration.", build: "Publish every project you make on GitHub." },
  { title: "React.js", short: "React.js", icon: Atom, learn: "Components, props, state and hooks.", build: "A weather app or a notes app." },
  { title: "Next.js", short: "Next.js", icon: Triangle, learn: "Routing, server components and data fetching.", build: "A multi-page blog with real routes." },
  { title: "Node.js and Express", short: "Node & Express", icon: Server, learn: "Servers, routes, middleware and REST design.", build: "A REST API for your notes app." },
  { title: "Databases (MongoDB / PostgreSQL)", short: "Databases", icon: Database, learn: "CRUD, data modelling, relations and queries.", build: "Store users and posts permanently." },
  { title: "APIs and Authentication", short: "APIs & Auth", icon: KeyRound, learn: "REST, sessions or JWT, secure password handling.", build: "A sign-up and login system." },
  { title: "Deployment and Cloud", short: "Deploy & Cloud", icon: Cloud, learn: "Environment variables, domains, Vercel and cloud basics.", build: "Put your full-stack app live for anyone to visit." },
  { title: "AI Integration and Real Projects", short: "AI & Real Projects", icon: Rocket, learn: "Calling AI APIs, prompt design, and shipping to real users.", build: "An AI-powered app that solves a real person's problem." },
];

function Row({ items, offset, current, onSelect }: { items: Step[]; offset: number; current: number; onSelect: (i: number) => void }) {
  return (
    <div className="relative">
      <div className="absolute left-[10%] right-[10%] top-[2.1rem] h-[3px] rounded bg-white/10" />
      <div className="relative grid grid-cols-5">
        {items.map((s, k) => {
          const i = offset + k;
          const Icon = s.icon;
          const done = i <= current;
          const active = i === current;
          return (
            <button key={s.title} type="button" onClick={() => onSelect(i)} className="flex flex-col items-center gap-2">
              <motion.span
                className="relative flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-full border-2"
                animate={{
                  backgroundColor: done ? "rgba(34,211,238,0.2)" : "rgba(8,14,38,0.9)",
                  borderColor: done ? "rgba(34,211,238,1)" : "rgba(255,255,255,0.18)",
                  scale: active ? 1.16 : 1,
                  boxShadow: active ? "0 0 40px rgba(34,211,238,0.7)" : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.4 }}
              >
                <Icon className={`h-7 w-7 ${done ? "text-neon" : "text-slate-500"}`} />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-navy-950 font-mono text-[0.7rem] font-bold ring-1 ring-white/25">
                  {i + 1}
                </span>
              </motion.span>
              <span className={`text-center text-[clamp(0.72rem,1vw,1.1rem)] font-semibold leading-tight ${active ? "text-white" : "text-slate-400"}`}>
                {s.short}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Slide11Roadmap(_props: SlideProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (current >= STEPS.length - 1) setPlaying(false);
      else setCurrent((c) => c + 1);
    }, 2000);
    return () => clearTimeout(t);
  }, [playing, current]);

  const step = STEPS[current];
  const pct = ((current + 1) / STEPS.length) * 100;

  return (
    <SlideShell accent="cyan">
      <div className="flex h-full flex-col justify-between gap-[2vh]">
        <div className="flex items-end justify-between gap-6">
          <SlideHeader
            kicker="Your roadmap"
            title={
              <>
                How to become a web developer in <span className="text-gradient">2026</span>
              </>
            }
          />
          <button
            type="button"
            onClick={() => {
              if (!playing && current >= STEPS.length - 1) setCurrent(0);
              setPlaying((p) => !p);
            }}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {playing ? "Pause" : "Walk the journey"}
          </button>
        </div>

        <div className="flex flex-col gap-[3vh]">
          <Row items={STEPS.slice(0, 5)} offset={0} current={current} onSelect={(i) => { setPlaying(false); setCurrent(i); }} />
          <Row items={STEPS.slice(5)} offset={5} current={current} onSelect={(i) => { setPlaying(false); setCurrent(i); }} />
        </div>

        <motion.div
          key={current}
          className="glass grid grid-cols-1 gap-[1.6vw] rounded-2xl p-[2.2vh] md:grid-cols-[1.1fr_1fr_1fr]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neon">Step {current + 1} of {STEPS.length}</p>
            <h3 className="text-[clamp(1.2rem,2vw,2.2rem)] font-extrabold leading-tight">{step.title}</h3>
          </div>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">Learn</p>
            <p className="text-[clamp(0.85rem,1.15vw,1.3rem)] text-slate-100">{step.learn}</p>
          </div>
          <div>
            <p className="text-[0.7rem] font-bold uppercase tracking-widest text-slate-400">Build</p>
            <p className="text-[clamp(0.85rem,1.15vw,1.3rem)] text-slate-100">{step.build}</p>
          </div>
        </motion.div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-electric to-neon"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>
    </SlideShell>
  );
}
