"use client";

import { motion } from "framer-motion";
import { Bot, Bug, Code2, MessageCircle, Plug, Send, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import Reveal from "@/components/ui/Reveal";
import type { SlideProps } from "@/lib/types";

interface Capability {
  name: string;
  icon: LucideIcon;
}

const CAPABILITIES: Capability[] = [
  { name: "AI coding assistants", icon: Code2 },
  { name: "Code generation", icon: Wand2 },
  { name: "Debugging", icon: Bug },
  { name: "AI-powered chatbots", icon: MessageCircle },
  { name: "AI agents", icon: Bot },
  { name: "Generative AI apps", icon: Sparkles },
  { name: "AI APIs & integrations", icon: Plug },
];

interface Prompt {
  label: string;
  reply: string;
}

const PROMPTS: Prompt[] = [
  {
    label: "Plan my first month of web development",
    reply:
      "Week 1: HTML and CSS. Build a personal page.\nWeek 2: JavaScript basics. Make the page interactive.\nWeek 3: Git and GitHub. Publish your first project.\nWeek 4: Build a small app and ask for feedback.",
  },
  {
    label: "Why is my button not working?",
    reply:
      "Likely cause: your script runs before the button exists on the page.\nFix: move the script below the button, or wait for DOMContentLoaded.\nThen test it yourself. Never trust a fix you have not run.",
  },
  {
    label: "Suggest a portfolio project",
    reply:
      "Build a class-timetable app: students sign in, see today's classes and get reminders.\nIt covers authentication, a database and an API, which is exactly what employers like to see.",
  },
];

function ChatDemo() {
  const [promptIdx, setPromptIdx] = useState<number | null>(null);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (promptIdx === null) return;
    const full = PROMPTS[promptIdx].reply;
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      i += 2;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 22);
    return () => clearInterval(t);
  }, [promptIdx]);

  return (
    <div className="glass-strong flex h-full min-h-0 flex-col overflow-hidden rounded-3xl">
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-neon">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="text-[clamp(0.95rem,1.3vw,1.4rem)] font-bold leading-none">DevBuddy AI</p>
          <p className="text-[0.7rem] uppercase tracking-widest text-slate-400">Concept demo · simulated replies</p>
        </div>
      </div>

      <div className="thin-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-5">
        {promptIdx === null ? (
          <p className="m-auto max-w-[30ch] text-center text-[clamp(0.85rem,1.1vw,1.2rem)] text-slate-400">
            Pick a question below to see how an AI-powered app could respond.
          </p>
        ) : (
          <>
            <motion.div
              key={`q-${promptIdx}`}
              className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-electric/80 px-4 py-2 text-[clamp(0.85rem,1.1vw,1.2rem)]"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {PROMPTS[promptIdx].label}
            </motion.div>
            <div className="max-w-[92%] whitespace-pre-line rounded-2xl rounded-bl-sm bg-white/10 px-4 py-3 text-[clamp(0.8rem,1.05vw,1.15rem)] leading-relaxed text-slate-100">
              {typed || <span className="animate-glow text-neon">Thinking…</span>}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/10 p-3">
        {PROMPTS.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() => setPromptIdx(i)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[clamp(0.7rem,0.9vw,1rem)] transition ${
              promptIdx === i ? "border-neon bg-neon/20 text-neon" : "border-white/15 bg-white/5 hover:bg-white/10"
            }`}
          >
            <Send className="h-3 w-3" />
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Slide08AI(_props: SlideProps) {
  return (
    <SlideShell accent="violet">
      <div className="grid h-full grid-cols-1 gap-[2.4vw] lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col justify-between gap-[2vh]">
          <SlideHeader
            kicker="AI & the Future"
            title={
              <>
                The power of <span className="text-gradient">AI</span> in web development
              </>
            }
            subtitle="AI is changing how software gets written, tested and shipped."
          />

          <div className="grid grid-cols-2 gap-[0.9vw]">
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.name} delay={0.2 + i * 0.07} y={16} className={i === CAPABILITIES.length - 1 ? "col-span-2" : ""}>
                  <div className="glass flex items-center gap-3 rounded-xl px-[1vw] py-[1.2vh]">
                    <Icon className="h-5 w-5 shrink-0 text-neon" />
                    <span className="text-[clamp(0.85rem,1.2vw,1.35rem)] font-semibold">{c.name}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.8}>
            <div className="flex items-start gap-4 rounded-2xl border border-amber-300/40 bg-amber-300/10 p-[1.8vh]">
              <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-amber-300" />
              <p className="text-[clamp(0.9rem,1.25vw,1.4rem)] leading-snug">
                <span className="font-bold text-amber-200">The key point: </span>
                AI helps you write code faster, but understanding programming, problem-solving, architecture and security is still essential.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="h-full min-h-0">
          <ChatDemo />
        </Reveal>
      </div>
    </SlideShell>
  );
}
