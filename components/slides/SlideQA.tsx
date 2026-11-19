"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, MessageCircle, MessagesSquare } from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import SlideShell from "@/components/ui/SlideShell";
import Reveal from "@/components/ui/Reveal";
import type { SlideProps } from "@/lib/types";

/** Conversation starters, in case the room is shy. */
const STARTERS = [
  "Where should a complete beginner start?",
  "Do I need a university degree to become a web developer?",
  "How do I get my first freelance client?",
  "How long does it take to become job-ready?",
  "Which should I learn first: React or Next.js?",
];

const MAX_AUDIENCE = 4;

const BUBBLES = [
  { left: "4%", top: "10%", size: 34, delay: 0, color: "#22d3ee" },
  { left: "78%", top: "4%", size: 26, delay: 1.2, color: "#a78bfa" },
  { left: "88%", top: "58%", size: 30, delay: 0.6, color: "#60a5fa" },
  { left: "-2%", top: "72%", size: 24, delay: 1.8, color: "#34d399" },
];

function QuestionOrb() {
  return (
    <div className="relative aspect-square w-[min(34vw,56vh)]">
      <div aria-hidden className="absolute inset-[-14%] rounded-full bg-electric/25 blur-[90px]" />
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute inset-0 rounded-full border border-neon/40"
          initial={{ opacity: 0.6, scale: 0.6 }}
          animate={{ opacity: 0, scale: 1.25 }}
          transition={{ duration: 4.5, repeat: Infinity, delay: i * 1.5, ease: "easeOut" }}
        />
      ))}
      <div className="glass absolute inset-[10%] flex items-center justify-center rounded-full">
        <span className="text-gradient select-none text-[min(20vw,32vh)] font-black leading-none">?</span>
      </div>
      {BUBBLES.map((b, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-sm"
          style={{ left: b.left, top: b.top, width: b.size * 1.9, height: b.size * 1.9, color: b.color, boxShadow: `0 0 26px ${b.color}33` }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        >
          <MessageCircle style={{ width: b.size, height: b.size }} />
        </motion.span>
      ))}
    </div>
  );
}

export default function SlideQA(_props: SlideProps) {
  const [audience, setAudience] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setAudience((prev) => [text, ...prev.filter((q) => q !== text)].slice(0, MAX_AUDIENCE));
    setActive(text);
    setDraft("");
  };

  return (
    <SlideShell accent="cyan">
      <div className="flex h-full items-center justify-between gap-[4vw]">
        <Reveal delay={0.1} className="hidden shrink-0 lg:block">
          <QuestionOrb />
        </Reveal>

        <div className="flex min-w-0 flex-1 flex-col gap-[2.4vh]">
          <Reveal>
            <span className="chip">
              <MessagesSquare className="h-3.5 w-3.5" /> Q &amp; A
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-[clamp(2.4rem,5.4vw,5.8rem)] font-black leading-[1] tracking-tight">
              Ask me <span className="text-gradient">anything.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-[48ch] text-[clamp(1rem,1.5vw,1.6rem)] leading-snug text-slate-300">
              Web development, careers, freelancing or AI. There are no silly questions, only things nobody has built an answer to yet.
            </p>
          </Reveal>

          {/* Spotlight: shows the question currently being answered */}
          <Reveal delay={0.24}>
            <div className="glass relative flex min-h-[clamp(7rem,18vh,12rem)] flex-col justify-center rounded-3xl px-[2vw] py-[2.4vh]">
              <span className="mb-2 inline-flex items-center gap-2 font-mono text-[clamp(0.7rem,0.9vw,0.95rem)] uppercase tracking-[0.2em] text-neon">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
                </span>
                {active ? "Now answering" : "Waiting for the first question"}
              </span>
              <AnimatePresence mode="wait">
                <motion.p
                  key={active ?? "empty"}
                  className={`text-[clamp(1.3rem,2.5vw,2.7rem)] font-bold leading-tight ${active ? "text-white" : "text-slate-500"}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {active ?? "Pick a starter below, or type what the audience asks."}
                </motion.p>
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <form onSubmit={submit} className="flex flex-col gap-1.5">
              <div className="glass flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 focus-within:!border-neon/70">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type an audience question and press Enter…"
                  aria-label="Audience question"
                  maxLength={140}
                  className="min-w-0 flex-1 bg-transparent text-[clamp(0.95rem,1.3vw,1.4rem)] text-white outline-none placeholder:text-slate-500"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label="Show question"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric to-neon transition enabled:hover:scale-105 disabled:opacity-30"
                >
                  <CornerDownLeft className="h-5 w-5" />
                </button>
              </div>
              <p className="pl-5 text-[clamp(0.7rem,0.85vw,0.9rem)] text-slate-500">
                While typing, arrow keys stay in the text box. Press Esc to hand them back to the slides.
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.4}>
            <ul className="flex flex-wrap gap-2">
              {audience.map((q) => (
                <li key={`a-${q}`}>
                  <button
                    type="button"
                    onClick={() => setActive(q)}
                    className={`rounded-full border px-4 py-1.5 text-left text-[clamp(0.75rem,1vw,1.1rem)] transition hover:border-neon ${
                      active === q ? "border-neon bg-neon/20 text-white" : "border-neon/40 bg-neon/10 text-neon"
                    }`}
                  >
                    {q}
                  </button>
                </li>
              ))}
              {STARTERS.map((q) => (
                <li key={q}>
                  <button
                    type="button"
                    onClick={() => setActive(q)}
                    className={`rounded-full border px-4 py-1.5 text-left text-[clamp(0.75rem,1vw,1.1rem)] transition hover:border-white/40 ${
                      active === q ? "border-white/60 bg-white/15 text-white" : "border-white/15 bg-white/[0.04] text-slate-300"
                    }`}
                  >
                    {q}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  );
}
