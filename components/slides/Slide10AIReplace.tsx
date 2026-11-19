"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, Brain, HeartHandshake, Lightbulb, Puzzle, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import SlideShell from "@/components/ui/SlideShell";
import Reveal from "@/components/ui/Reveal";
import type { SlideProps } from "@/lib/types";

interface Row {
  skill: string;
  ai: number;
  human: number;
}

// Illustrative comparison to start a discussion, not measured data.
const ROWS: Row[] = [
  { skill: "Typing code quickly", ai: 95, human: 45 },
  { skill: "Remembering syntax", ai: 90, human: 50 },
  { skill: "Understanding real user needs", ai: 35, human: 92 },
  { skill: "Judgement, trade-offs and security", ai: 45, human: 90 },
  { skill: "Creativity and original ideas", ai: 50, human: 88 },
];

interface Point {
  title: string;
  text: string;
  icon: LucideIcon;
}

const POINTS: Point[] = [
  { title: "AI is a tool, not a replacement for thinking", text: "It drafts and suggests. You decide, check and take responsibility.", icon: Brain },
  { title: "Developers must learn to work with AI", text: "Those who use AI well will outpace those who ignore it.", icon: Bot },
  { title: "Problem-solving beats memorising syntax", text: "Syntax can be looked up. Clear thinking cannot.", icon: Puzzle },
  { title: "Creativity and user understanding matter", text: "Software exists for people, and people need to be understood.", icon: HeartHandshake },
];

function Bar({ label, value, color, delay, reverse = false }: { label: string; value: number; color: string; delay: number; reverse?: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${reverse ? "flex-row-reverse" : ""}`}>
      <span className="w-14 shrink-0 text-[0.7rem] font-semibold uppercase tracking-wider text-slate-400">{label}</span>
      <div className={`flex h-2.5 flex-1 overflow-hidden rounded-full bg-white/10 ${reverse ? "justify-end" : ""}`}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 14px ${color}` }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export default function Slide10AIReplace(_props: SlideProps) {
  const [revealed, setRevealed] = useState(false);

  return (
    <SlideShell accent="violet">
      <div className="grid h-full grid-cols-1 items-center gap-[3vw] lg:grid-cols-[1fr_1.1fr]">
        {/* Question / answer */}
        <div className="flex flex-col gap-[3vh]">
          <Reveal>
            <span className="chip">
              <Lightbulb className="h-3.5 w-3.5" /> The big question
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2.2rem,5vw,5.2rem)] font-black leading-[1.02] tracking-tight">
              Will <span className="text-gradient">AI</span> replace web developers?
            </h2>
          </Reveal>

          <div className="min-h-[24vh]">
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.button
                  key="reveal"
                  type="button"
                  onClick={() => setRevealed(true)}
                  className="btn-primary text-[clamp(0.9rem,1.2vw,1.2rem)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Lightbulb className="h-5 w-5" />
                  REVEAL THE ANSWER
                </motion.button>
              ) : (
                <motion.div
                  key="answer"
                  className="glass rounded-2xl border-neon/50 p-[2.4vh]"
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[clamp(1.05rem,1.7vw,1.9rem)] font-semibold leading-snug">
                    AI will change <span className="text-neon">how</span> developers work, but people who understand technology, solve problems and adapt to new tools will remain valuable.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI vs Human */}
          <Reveal delay={0.3}>
            <div className="glass rounded-2xl p-[2vh]">
              <div className="mb-3 flex items-center justify-between text-[clamp(0.8rem,1vw,1.1rem)] font-bold">
                <span className="flex items-center gap-2 text-violet-300">
                  <Bot className="h-4 w-4" /> AI
                </span>
                <span className="text-[0.7rem] font-normal uppercase tracking-widest text-slate-500">Illustrative comparison</span>
                <span className="flex items-center gap-2 text-neon">
                  <User className="h-4 w-4" /> Human developer
                </span>
              </div>
              <div className="flex flex-col gap-[1.4vh]">
                {ROWS.map((r, i) => (
                  <div key={r.skill}>
                    <p className="mb-1 text-center text-[clamp(0.75rem,0.95vw,1.05rem)] text-slate-300">{r.skill}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <Bar label="AI" value={r.ai} color="#a78bfa" delay={0.5 + i * 0.12} reverse />
                      <Bar label="You" value={r.human} color="#22d3ee" delay={0.5 + i * 0.12} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Four takeaways */}
        <div className="grid grid-cols-1 gap-[1.6vh] sm:grid-cols-2">
          {POINTS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={0.4 + i * 0.12}>
                <div className="glass flex h-full flex-col gap-3 rounded-2xl p-[2.2vh]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-neon">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-[clamp(1rem,1.5vw,1.65rem)] font-bold leading-tight">{p.title}</h3>
                  <p className="text-[clamp(0.8rem,1.05vw,1.15rem)] leading-snug text-slate-300">{p.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}
