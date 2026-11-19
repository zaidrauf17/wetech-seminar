"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Database, Globe, LayoutTemplate, Pause, Play, RotateCcw, Send, Server, User } from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import Reveal from "@/components/ui/Reveal";
import type { SlideProps } from "@/lib/types";

interface Step {
  label: string;
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
}

const STEPS: Step[] = [
  { label: "User", icon: User, title: "1. You type a URL", text: "You enter www.example.com and press Enter. The journey begins." },
  { label: "Browser", icon: Globe, title: "2. The browser prepares a request", text: "Chrome, Edge or Safari works out which site you want and needs to find where it lives." },
  { label: "DNS", icon: BookOpen, title: "3. DNS finds the address", text: "DNS is the internet's phonebook. It turns example.com into a server address such as 93.184.216.34." },
  { label: "Server", icon: Server, title: "4. The server receives the request", text: "The web server runs your backend code, checks permissions and decides what to send back." },
  { label: "Database", icon: Database, title: "5. The database provides the data", text: "Products, users, messages: the server asks the database for exactly what this page needs." },
  { label: "Response", icon: Send, title: "6. The response travels back", text: "The server packages HTML, CSS, JavaScript and JSON data and sends it back in milliseconds." },
  { label: "Website", icon: LayoutTemplate, title: "7. The browser shows the website", text: "The browser reads the files, builds the page and you see the website. All of this took under a second." },
];

const REQUEST = `fetch("/api/products")
  .then((res) => res.json())
  .then(showProducts);`;

const RESPONSE = `{
  "products": [
    { "id": 1, "name": "Laptop", "price": 95000 },
    { "id": 2, "name": "Headphones", "price": 7500 }
  ]
}`;

export default function Slide03HowItWorks(_props: SlideProps) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      if (step >= STEPS.length - 1) setPlaying(false);
      else setStep((s) => s + 1);
    }, 2300);
    return () => clearTimeout(t);
  }, [playing, step]);

  const atEnd = step === STEPS.length - 1 && !playing;
  const apiActive = step >= 3 && step <= 5;
  const pct = (step / (STEPS.length - 1)) * 100;

  const onPlayPause = () => {
    if (atEnd) {
      setStep(0);
      setPlaying(true);
    } else setPlaying((p) => !p);
  };

  return (
    <SlideShell accent="cyan">
      <div className="flex h-full flex-col justify-between gap-[2vh]">
        <SlideHeader
          kicker="Foundations"
          title={
            <>
              What happens when you <span className="text-gradient">press Enter</span>?
            </>
          }
        />

        {/* Journey track */}
        <div className="relative px-[1vw]">
          <div className="absolute left-[4%] right-[4%] top-[2.2rem] h-[3px] rounded bg-white/10" />
          <motion.div
            className="absolute left-[4%] top-[2.2rem] h-[3px] rounded bg-gradient-to-r from-electric to-neon shadow-[0_0_14px_#22d3ee]"
            animate={{ width: `${pct * 0.92}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
          <div className="relative flex justify-between">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const done = i <= step;
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => {
                    setPlaying(false);
                    setStep(i);
                  }}
                  className="group flex w-[12%] flex-col items-center gap-2"
                >
                  <motion.span
                    className="flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-2xl border"
                    animate={{
                      backgroundColor: done ? "rgba(34,211,238,0.18)" : "rgba(255,255,255,0.04)",
                      borderColor: i === step ? "rgba(34,211,238,1)" : done ? "rgba(34,211,238,0.45)" : "rgba(255,255,255,0.14)",
                      scale: i === step ? 1.12 : 1,
                      boxShadow: i === step ? "0 0 36px rgba(34,211,238,0.55)" : "0 0 0 rgba(0,0,0,0)",
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon className={`h-8 w-8 ${done ? "text-neon" : "text-slate-400"}`} />
                  </motion.span>
                  <span className={`text-[clamp(0.75rem,1.05vw,1.15rem)] font-semibold ${i === step ? "text-white" : "text-slate-400"}`}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Caption + API panel */}
        <div className="grid grid-cols-1 gap-[2vw] lg:grid-cols-[1fr_1.1fr]">
          <div className="glass flex min-h-[20vh] flex-col justify-between rounded-2xl p-[2.4vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-[clamp(1.1rem,1.8vw,2rem)] font-bold text-neon">{STEPS[step].title}</h3>
                <p className="mt-2 text-[clamp(0.95rem,1.35vw,1.5rem)] leading-snug text-slate-200">{STEPS[step].text}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={onPlayPause}
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium transition hover:bg-white/20"
              >
                {atEnd ? <RotateCcw className="h-4 w-4" /> : playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {atEnd ? "Replay" : playing ? "Pause" : "Play"}
              </button>
              <span className="text-xs text-slate-400">Click any icon to jump to that step</span>
            </div>
          </div>

          <motion.div
            className="glass rounded-2xl p-[2.4vh]"
            animate={{ borderColor: apiActive ? "rgba(34,211,238,0.7)" : "rgba(255,255,255,0.12)" }}
          >
            <p className="mb-2 flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
              <span className={`h-2 w-2 rounded-full ${apiActive ? "animate-glow bg-neon" : "bg-slate-600"}`} />
              Frontend ⇄ Backend via an API
            </p>
            <div className="grid grid-cols-2 gap-3">
              <pre className="overflow-hidden rounded-lg bg-navy-950/70 p-3 font-mono text-[clamp(0.65rem,0.9vw,0.95rem)] leading-relaxed text-sky-200">
                {REQUEST}
              </pre>
              <pre className="overflow-hidden rounded-lg bg-navy-950/70 p-3 font-mono text-[clamp(0.65rem,0.9vw,0.95rem)] leading-relaxed text-emerald-200">
                {RESPONSE}
              </pre>
            </div>
            <Reveal delay={0.4}>
              <p className="mt-2 text-[clamp(0.8rem,1.05vw,1.15rem)] text-slate-300">
                An API is the messenger: the frontend asks, the backend answers with data.
              </p>
            </Reveal>
          </motion.div>
        </div>
      </div>
    </SlideShell>
  );
}
