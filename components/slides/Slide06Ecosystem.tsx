"use client";

import { motion } from "framer-motion";
import { Cloud, Database, Hammer, Monitor, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import type { SlideProps } from "@/lib/types";

type GroupId = "frontend" | "backend" | "database" | "tools" | "cloud";

interface Group {
  id: GroupId;
  name: string;
  icon: LucideIcon;
  color: string;
  blurb: string;
  items: string[];
  /** Polar position around the centre, in degrees (0 = right, clockwise). */
  angle: number;
}

const GROUPS: Group[] = [
  { id: "frontend", name: "Frontend", icon: Monitor, color: "#22d3ee", blurb: "Builds what users see", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"], angle: -90 },
  { id: "backend", name: "Backend", icon: Server, color: "#60a5fa", blurb: "Runs the logic", items: ["Node.js", "Express.js", "APIs", "Authentication"], angle: -18 },
  { id: "database", name: "Database", icon: Database, color: "#a78bfa", blurb: "Stores the data", items: ["MongoDB", "PostgreSQL", "Firebase", "Supabase"], angle: 54 },
  { id: "cloud", name: "Cloud & Deploy", icon: Cloud, color: "#34d399", blurb: "Puts it online", items: ["AWS", "Vercel", "Netlify"], angle: 126 },
  { id: "tools", name: "Tools", icon: Hammer, color: "#fbbf24", blurb: "Makes developers faster", items: ["Git & GitHub", "VS Code", "Postman", "Figma"], angle: 198 },
];

// SVG geometry (viewBox 600x600, centre 300,300)
const C = 300;
const R = 205;

function pos(angleDeg: number, radius: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [C + radius * Math.cos(a), C + radius * Math.sin(a)];
}

export default function Slide06Ecosystem(_props: SlideProps) {
  const [selected, setSelected] = useState<GroupId>("frontend");
  const group = GROUPS.find((g) => g.id === selected) as Group;

  return (
    <SlideShell accent="blue">
      <div className="grid h-full grid-cols-1 items-center gap-[2vw] lg:grid-cols-[1fr_1.05fr]">
        <div className="flex flex-col gap-[3vh]">
          <SlideHeader
            kicker="Ecosystem"
            title={
              <>
                The modern <span className="text-gradient">developer ecosystem</span>
              </>
            }
            subtitle="Tap a group to explore the tools inside it."
          />

          <motion.div
            key={group.id}
            className="glass rounded-3xl p-[2.4vh]"
            style={{ borderColor: `${group.color}99`, boxShadow: `0 0 40px ${group.color}26` }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-[1.6vh] flex items-center gap-3">
              <group.icon className="h-7 w-7" style={{ color: group.color }} />
              <div>
                <h3 className="text-[clamp(1.2rem,2vw,2.2rem)] font-extrabold" style={{ color: group.color }}>
                  {group.name}
                </h3>
                <p className="text-[clamp(0.85rem,1.15vw,1.25rem)] text-slate-300">{group.blurb}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item, i) => (
                <motion.span
                  key={item}
                  className="rounded-full border px-4 py-1.5 text-[clamp(0.9rem,1.25vw,1.4rem)] font-semibold"
                  style={{ borderColor: `${group.color}80`, background: `${group.color}1f` }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 * i, duration: 0.3 }}
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Ecosystem map */}
        <div className="relative mx-auto aspect-square w-[min(46vw,78vh)]">
          <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden>
            <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 8" />
            {GROUPS.map((g) => {
              const [x, y] = pos(g.angle, R);
              const on = g.id === selected;
              return (
                <line
                  key={g.id}
                  x1={C}
                  y1={C}
                  x2={x}
                  y2={y}
                  stroke={g.color}
                  strokeOpacity={on ? 0.9 : 0.3}
                  strokeWidth={on ? 2.5 : 1.2}
                  strokeDasharray="5 7"
                  className="animate-dash"
                />
              );
            })}
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-electric to-neon text-center text-[clamp(0.7rem,1.1vw,1.2rem)] font-black leading-tight shadow-[0_0_60px_rgba(34,211,238,0.5)]"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            YOUR
            <br />
            APP
          </motion.div>

          {GROUPS.map((g, i) => {
            const [x, y] = pos(g.angle, R);
            const on = g.id === selected;
            const Icon = g.icon;
            return (
              <motion.button
                key={g.id}
                type="button"
                onClick={() => setSelected(g.id)}
                className="absolute flex w-[22%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
                style={{ left: `${(x / 600) * 100}%`, top: `${(y / 600) * 100}%` }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: on ? 1.12 : 1 }}
                transition={{ delay: 0.2 + i * 0.12, type: "spring", stiffness: 220, damping: 18 }}
              >
                <span
                  className="flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border-2 backdrop-blur"
                  style={{
                    borderColor: g.color,
                    background: `${g.color}${on ? "40" : "1a"}`,
                    boxShadow: on ? `0 0 34px ${g.color}99` : "none",
                  }}
                >
                  <Icon className="h-8 w-8" style={{ color: g.color }} />
                </span>
                <span className="text-center text-[clamp(0.7rem,1vw,1.1rem)] font-bold leading-tight">{g.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}
