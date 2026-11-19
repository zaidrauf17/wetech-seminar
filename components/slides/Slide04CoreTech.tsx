"use client";

import { Paintbrush, RotateCcw, Wand2, Zap, Blocks } from "lucide-react";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import Reveal from "@/components/ui/Reveal";
import type { SlideProps } from "@/lib/types";

type Lang = "html" | "css" | "js";

interface Tweak {
  label: string;
  from: string;
  to: string;
}

interface LangInfo {
  id: Lang;
  name: string;
  role: string;
  analogy: string;
  icon: ComponentType<{ className?: string }>;
  tweak: Tweak;
}

const LANGS: LangInfo[] = [
  { id: "html", name: "HTML", role: "Structure", analogy: "The walls and rooms", icon: Blocks, tweak: { label: "Change the heading", from: "Hello, Lahore! 👋", to: "Welcome to We Tech House! 🚀" } },
  { id: "css", name: "CSS", role: "Design & Styling", analogy: "The paint and furniture", icon: Paintbrush, tweak: { label: "Change the colours", from: "#2f6bff,#22d3ee", to: "#ec4899,#f59e0b" } },
  { id: "js", name: "JavaScript", role: "Logic & Interactivity", analogy: "The electricity", icon: Zap, tweak: { label: "Count by 5", from: "count++", to: "count += 5" } },
];

const DEFAULTS: Record<Lang, string> = {
  html: `<div class="card">
  <h1>Hello, Lahore! 👋</h1>
  <p>I am built with HTML, CSS and JavaScript.</p>
  <button id="btn">Clicked 0 times</button>
</div>`,
  css: `body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  background: #0b1230;
  color: white;
}
.card {
  padding: 28px 32px;
  border-radius: 20px;
  text-align: center;
  background: linear-gradient(135deg,#2f6bff,#22d3ee);
  box-shadow: 0 20px 60px rgba(34,211,238,.35);
}
button {
  margin-top: 12px;
  padding: 10px 20px;
  border: 0;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
}`,
  js: `const btn = document.getElementById("btn");
let count = 0;

btn.addEventListener("click", () => {
  count++;
  btn.textContent = "Clicked " + count + " times";
});`,
};

function buildDoc(code: Record<Lang, string>): string {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${code.css}</style></head><body>${code.html}<script>try{${code.js}}catch(e){document.body.insertAdjacentHTML("beforeend","<pre style='color:#f87171;font-size:12px'>"+e.message+"</pre>")}<\/script></body></html>`;
}

export default function Slide04CoreTech(_props: SlideProps) {
  const [tab, setTab] = useState<Lang>("html");
  const [code, setCode] = useState<Record<Lang, string>>(DEFAULTS);
  const [doc, setDoc] = useState(() => buildDoc(DEFAULTS));

  // Debounce so half-typed code does not flash errors in the preview.
  useEffect(() => {
    const t = setTimeout(() => setDoc(buildDoc(code)), 350);
    return () => clearTimeout(t);
  }, [code]);

  const current = LANGS.find((l) => l.id === tab) as LangInfo;

  const applyTweak = () => {
    const { from, to } = current.tweak;
    setCode((c) => {
      const src = c[tab];
      return { ...c, [tab]: src.includes(from) ? src.replace(from, to) : src.replace(to, from) };
    });
  };

  return (
    <SlideShell accent="blue">
      <div className="flex h-full flex-col gap-[2.4vh]">
        <SlideHeader
          kicker="Foundations"
          title={
            <>
              The <span className="text-gradient">three core</span> technologies
            </>
          }
        />

        <div className="grid grid-cols-3 gap-[1.2vw]">
          {LANGS.map((l, i) => {
            const Icon = l.icon;
            const selected = l.id === tab;
            return (
              <Reveal key={l.id} delay={0.2 + i * 0.08}>
                <button
                  type="button"
                  onClick={() => setTab(l.id)}
                  className={`glass flex w-full items-center gap-3 rounded-2xl px-[1.2vw] py-[1.4vh] text-left transition ${
                    selected ? "!border-neon/70 shadow-[0_0_30px_rgba(34,211,238,0.25)]" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${selected ? "bg-gradient-to-br from-electric to-neon" : "bg-white/10"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[clamp(1rem,1.5vw,1.6rem)] font-bold">
                      {l.name} <span className="font-medium text-neon">· {l.role}</span>
                    </span>
                    <span className="block text-[clamp(0.75rem,1vw,1.1rem)] text-slate-400">{l.analogy}</span>
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-[1.6vw] lg:grid-cols-2">
          <Reveal delay={0.4} className="flex min-h-0 flex-col">
            <div className="glass flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
                <span className="font-mono text-sm text-neon">
                  {tab === "html" ? "index.html" : tab === "css" ? "style.css" : "script.js"}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={applyTweak}
                    className="inline-flex items-center gap-1.5 rounded-full bg-neon/15 px-3 py-1 text-xs font-semibold text-neon transition hover:bg-neon/25"
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    {current.tweak.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCode(DEFAULTS)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold transition hover:bg-white/20"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>
              </div>
              <textarea
                aria-label={`${current.name} code editor`}
                value={code[tab]}
                onChange={(e) => setCode((c) => ({ ...c, [tab]: e.target.value }))}
                spellCheck={false}
                className="thin-scroll min-h-0 flex-1 resize-none bg-navy-950/70 p-4 font-mono text-[clamp(0.75rem,1.05vw,1.15rem)] leading-relaxed text-sky-100 outline-none"
              />
            </div>
          </Reveal>

          <Reveal delay={0.5} className="flex min-h-0 flex-col">
            <div className="glass flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                <span className="ml-2 text-xs uppercase tracking-widest text-slate-400">Live result</span>
                <span className="ml-auto text-[0.7rem] text-slate-500">After clicking inside, click outside to use ← → again</span>
              </div>
              <iframe title="Live preview" sandbox="allow-scripts" srcDoc={doc} className="min-h-0 flex-1 border-0 bg-navy-900" />
            </div>
          </Reveal>
        </div>
      </div>
    </SlideShell>
  );
}
