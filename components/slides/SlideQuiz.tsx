"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Eye, RotateCcw, Trophy, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import SlideShell from "@/components/ui/SlideShell";
import type { SlideProps } from "@/lib/types";

interface Question {
  topic: string;
  prompt: string;
  options: string[];
  /** Index into `options` of the correct answer. */
  answer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    topic: "Core technologies",
    prompt: "Which language gives every web page its structure?",
    options: ["CSS", "HTML", "JavaScript", "SQL"],
    answer: 1,
    explanation:
      "HTML is the skeleton: headings, paragraphs, buttons and images. CSS styles it and JavaScript brings it to life.",
  },
  {
    topic: "How a website works",
    prompt: "When you type a website name, what turns it into a server address?",
    options: ["A browser extension", "A database", "DNS", "Git"],
    answer: 2,
    explanation:
      "DNS is the internet's phonebook. It translates a name like example.com into the IP address of the server that hosts it.",
  },
  {
    topic: "AI and developers",
    prompt: "What is the smartest way for a developer to use AI?",
    options: [
      "As a tool I guide, check and learn from",
      "Paste its code without reading it",
      "Avoid it completely",
      "Let it make the security decisions",
    ],
    answer: 0,
    explanation:
      "AI makes you faster, but you are still responsible for the result. Understanding the code, the architecture and the security is what keeps you valuable.",
  },
];

type Outcome = "right" | "wrong" | "shown";

const LETTERS = ["A", "B", "C", "D"] as const;
const GREEN = "#34d399";
const RED = "#fb7185";
const CYAN = "#22d3ee";

const OUTCOME_COLOR: Record<Outcome, string> = { right: GREEN, wrong: RED, shown: "#94a3b8" };

export default function SlideQuiz(_props: SlideProps) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);

  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];
  const isLast = step === QUESTIONS.length - 1;

  const choose = useCallback(
    (i: number) => {
      if (revealed || done) return;
      setPicked(i);
      setRevealed(true);
      setOutcomes((o) => [...o, i === QUESTIONS[step].answer ? "right" : "wrong"]);
    },
    [revealed, done, step],
  );

  const reveal = useCallback(() => {
    if (revealed || done) return;
    setRevealed(true);
    setOutcomes((o) => [...o, "shown"]);
  }, [revealed, done]);

  const advance = useCallback(() => {
    setStep((s) => s + 1);
    setPicked(null);
    setRevealed(false);
  }, []);

  const restart = useCallback(() => {
    setStep(0);
    setPicked(null);
    setRevealed(false);
    setOutcomes([]);
  }, []);

  // Keys 1-4 pick an option, so the presenter can answer without reaching for the mouse.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key >= "1" && e.key <= "4") choose(Number(e.key) - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose]);

  const correctCount = outcomes.filter((o) => o === "right").length;
  const votedCount = outcomes.filter((o) => o !== "shown").length;

  return (
    <SlideShell accent="violet">
      <div className="flex h-full flex-col gap-[2.4vh]">
        {/* Top row: label + progress */}
        <div className="flex items-center justify-between gap-4">
          <span className="chip">Live quiz · raise your hands</span>
          <div className="flex items-center gap-2" aria-label="Quiz progress">
            {QUESTIONS.map((_, i) => {
              const outcome = outcomes[i];
              const isCurrent = i === step && !done;
              return (
                <span
                  key={i}
                  className="h-2.5 w-[clamp(2rem,4vw,4.5rem)] rounded-full transition-all"
                  style={{
                    background: outcome ? OUTCOME_COLOR[outcome] : isCurrent ? CYAN : "rgba(255,255,255,0.14)",
                    boxShadow: isCurrent ? `0 0 14px ${CYAN}` : undefined,
                  }}
                />
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="results"
              className="flex flex-1 flex-col items-center justify-center gap-[3vh] text-center"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="flex h-[clamp(4.5rem,10vh,8rem)] w-[clamp(4.5rem,10vh,8rem)] items-center justify-center rounded-full bg-gradient-to-br from-electric to-neon shadow-[0_0_80px_rgba(34,211,238,0.5)]">
                <Trophy className="h-1/2 w-1/2" />
              </span>
              <h2 className="text-[clamp(2.2rem,5vw,5.2rem)] font-black leading-none tracking-tight">
                <span className="text-gradient">Quiz complete!</span>
              </h2>
              <p className="max-w-[40ch] text-[clamp(1.05rem,1.8vw,2rem)] text-slate-300">
                {votedCount > 0
                  ? `The audience got ${correctCount} of ${QUESTIONS.length} right. Builders learn by trying, and by being wrong a few times.`
                  : "Every answer is revealed. Builders learn by trying, and by being wrong a few times."}
              </p>
              <div className="flex items-center gap-3">
                {outcomes.map((o, i) => (
                  <span
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-navy-950"
                    style={{ background: OUTCOME_COLOR[o] }}
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-[clamp(0.9rem,1.2vw,1.2rem)] font-semibold text-slate-200 transition hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4" /> Play again
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`q-${step}`}
              className="flex min-h-0 flex-1 flex-col justify-between gap-[2.4vh]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-[1.2vh]">
                <p className="font-mono text-[clamp(0.8rem,1.1vw,1.2rem)] uppercase tracking-[0.2em] text-neon">
                  Question {step + 1} of {QUESTIONS.length} · {q.topic}
                </p>
                <h2 className="max-w-[26ch] text-[clamp(1.8rem,3.9vw,4.2rem)] font-extrabold leading-[1.08] tracking-tight">
                  {q.prompt}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-[1.6vh] md:grid-cols-2 md:gap-[1.2vw]">
                {q.options.map((opt, i) => {
                  const isAnswer = i === q.answer;
                  const isPicked = i === picked;
                  const showRight = revealed && isAnswer;
                  const showWrong = revealed && isPicked && !isAnswer;
                  const dim = revealed && !isAnswer && !isPicked;
                  const color = showRight ? GREEN : showWrong ? RED : CYAN;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={revealed}
                      onClick={() => choose(i)}
                      className="glass group flex items-center gap-[1.2vw] rounded-2xl p-[2vh] text-left transition duration-300 enabled:hover:-translate-y-0.5 enabled:hover:border-neon/60 disabled:cursor-default"
                      style={{
                        opacity: dim ? 0.38 : 1,
                        borderColor: showRight || showWrong ? color : undefined,
                        background: showRight
                          ? "rgba(52,211,153,0.14)"
                          : showWrong
                            ? "rgba(251,113,133,0.14)"
                            : undefined,
                        boxShadow: showRight || showWrong ? `0 0 38px ${color}40` : undefined,
                      }}
                    >
                      <span
                        className="flex h-[clamp(2.4rem,4.4vh,3.6rem)] w-[clamp(2.4rem,4.4vh,3.6rem)] shrink-0 items-center justify-center rounded-xl font-mono text-[clamp(1rem,1.5vw,1.6rem)] font-bold"
                        style={{ background: `${color}26`, color }}
                      >
                        {showRight ? <Check className="h-1/2 w-1/2" /> : showWrong ? <X className="h-1/2 w-1/2" /> : LETTERS[i]}
                      </span>
                      <span className="text-[clamp(1.05rem,1.7vw,1.9rem)] font-semibold leading-snug">{opt}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex min-h-[clamp(5.5rem,13vh,9rem)] items-center justify-between gap-[2vw]">
                {revealed ? (
                  <>
                    <motion.p
                      key="why"
                      className="max-w-[62ch] text-[clamp(0.95rem,1.4vw,1.55rem)] leading-snug text-slate-200"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="font-bold" style={{ color: picked === null ? CYAN : picked === q.answer ? GREEN : RED }}>
                        {picked === null ? "The answer: " : picked === q.answer ? "Correct! " : "Not quite. "}
                      </span>
                      {q.explanation}
                    </motion.p>
                    <button
                      type="button"
                      onClick={advance}
                      className="btn-primary shrink-0 !px-7 !py-3 text-[clamp(0.85rem,1.1vw,1.15rem)]"
                    >
                      {isLast ? "SEE RESULTS" : "NEXT QUESTION"}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-[clamp(0.85rem,1.15vw,1.2rem)] text-slate-400">
                      Tap the option the audience votes for, or press <span className="font-mono text-slate-200">1</span>–
                      <span className="font-mono text-slate-200">4</span>.
                    </p>
                    <button
                      type="button"
                      onClick={reveal}
                      className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-2.5 text-[clamp(0.85rem,1.1vw,1.15rem)] font-semibold text-slate-200 transition hover:bg-white/10"
                    >
                      <Eye className="h-4 w-4" /> Reveal answer
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideShell>
  );
}
