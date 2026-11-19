"use client";

import { motion } from "framer-motion";
import { Brain, Briefcase, Code2, Laptop, Layers, Rocket, Server, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import type { SlideProps } from "@/lib/types";

interface Path {
  id: string;
  title: string;
  line: string;
  icon: LucideIcon;
  color: string;
}

const PATHS: Path[] = [
  { id: "fe", title: "Frontend Developer", line: "Builds interfaces people use", icon: Laptop, color: "#22d3ee" },
  { id: "be", title: "Backend Developer", line: "Builds servers, APIs and data logic", icon: Server, color: "#60a5fa" },
  { id: "fs", title: "Full Stack Developer", line: "Works across the whole product", icon: Layers, color: "#34d399" },
  { id: "se", title: "Software Engineer", line: "Designs larger, long-lived systems", icon: Code2, color: "#a78bfa" },
  { id: "fl", title: "Freelance Developer", line: "Works with clients on your own terms", icon: Briefcase, color: "#fbbf24" },
  { id: "sf", title: "SaaS Founder", line: "Builds a product people subscribe to", icon: Rocket, color: "#fb923c" },
  { id: "ai", title: "AI Application Developer", line: "Builds products powered by AI", icon: Brain, color: "#f472b6" },
];

interface Route {
  title: string;
  text: string;
  color: string;
}

const ROUTES: Route[] = [
  { title: "Remote jobs", text: "Work for companies anywhere, if your skills and communication are strong.", color: "#22d3ee" },
  { title: "Freelancing", text: "Find clients, deliver projects and build a reputation one job at a time.", color: "#fbbf24" },
  { title: "Startups", text: "Join small teams where you learn fast and own real responsibility.", color: "#a78bfa" },
  { title: "Entrepreneurship", text: "Turn your own idea into a product, with risk and reward both yours.", color: "#fb923c" },
];

export default function Slide12Careers(_props: SlideProps) {
  const [route, setRoute] = useState(0);

  return (
    <SlideShell accent="blue">
      <div className="flex h-full flex-col justify-between gap-[2vh]">
        <SlideHeader
          kicker="Career opportunities"
          title={
            <>
              Where can <span className="text-gradient">web development</span> take you?
            </>
          }
        />

        <div className="grid grid-cols-2 gap-[1vw] md:grid-cols-4">
          {PATHS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                className={`glass flex flex-col gap-2 rounded-2xl p-[1.6vh] ${i === PATHS.length - 1 ? "md:col-span-1" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: `${p.color}26` }}>
                  <Icon className="h-6 w-6" style={{ color: p.color }} />
                </span>
                <h3 className="text-[clamp(0.95rem,1.35vw,1.5rem)] font-bold leading-tight">{p.title}</h3>
                <p className="text-[clamp(0.75rem,0.95vw,1.05rem)] text-slate-400">{p.line}</p>
              </motion.div>
            );
          })}

          <motion.div
            className="glass flex flex-col justify-center gap-2 rounded-2xl border-dashed p-[1.6vh] text-slate-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Wifi className="h-6 w-6 text-neon" />
            <p className="text-[clamp(0.75rem,1vw,1.1rem)] leading-snug">
              Many of these paths can be done remotely or on your own schedule.
            </p>
          </motion.div>
        </div>

        <div className="glass rounded-2xl p-[2vh]">
          <div className="mb-3 flex flex-wrap gap-2">
            {ROUTES.map((r, i) => (
              <button
                key={r.title}
                type="button"
                onClick={() => setRoute(i)}
                className="rounded-full border px-4 py-1.5 text-[clamp(0.8rem,1.1vw,1.2rem)] font-semibold transition"
                style={{
                  borderColor: i === route ? r.color : "rgba(255,255,255,0.15)",
                  background: i === route ? `${r.color}26` : "transparent",
                  color: i === route ? r.color : "#cbd5e1",
                }}
              >
                {r.title}
              </button>
            ))}
          </div>
          <motion.p
            key={route}
            className="text-[clamp(0.95rem,1.4vw,1.55rem)] leading-snug"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {ROUTES[route].text}
          </motion.p>
        </div>

        <p className="text-center text-[clamp(0.75rem,1vw,1.1rem)] text-slate-400">
          Results depend on your skills, projects, consistency and the market. There are no guarantees, only the work you put in.
        </p>
      </div>
    </SlideShell>
  );
}
