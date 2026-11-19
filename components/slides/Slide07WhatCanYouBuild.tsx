"use client";

import { motion } from "framer-motion";
import { BarChart3, Bot, CalendarCheck, GraduationCap, MessagesSquare, ShoppingCart, Smartphone, Layers } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SlideShell from "@/components/ui/SlideShell";
import SlideHeader from "@/components/ui/SlideHeader";
import type { SlideProps } from "@/lib/types";

interface App {
  id: string;
  name: string;
  line: string;
  icon: LucideIcon;
  color: string;
}

const APPS: App[] = [
  { id: "shop", name: "E-commerce websites", line: "Catalogues, carts, payments", icon: ShoppingCart, color: "#22d3ee" },
  { id: "social", name: "Social media platforms", line: "Feeds, profiles, messaging", icon: MessagesSquare, color: "#60a5fa" },
  { id: "ai", name: "AI-powered applications", line: "Assistants and smart tools", icon: Bot, color: "#a78bfa" },
  { id: "saas", name: "SaaS products", line: "Software people subscribe to", icon: Layers, color: "#34d399" },
  { id: "lms", name: "Learning management systems", line: "Courses, quizzes, progress", icon: GraduationCap, color: "#fbbf24" },
  { id: "dash", name: "Dashboards", line: "Live data made visible", icon: BarChart3, color: "#38bdf8" },
  { id: "mobile", name: "Mobile-friendly web apps", line: "One codebase, every screen", icon: Smartphone, color: "#f472b6" },
  { id: "book", name: "Booking & management", line: "Appointments, rooms, orders", icon: CalendarCheck, color: "#fb923c" },
];

function Preview({ id, color }: { id: string; color: string }) {
  const box = "h-full w-full rounded-lg bg-navy-950/70 p-2";
  switch (id) {
    case "shop":
      return (
        <div className={`${box} grid grid-cols-3 gap-1.5`}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-1 rounded bg-white/5 p-1">
              <div className="flex-1 rounded-sm" style={{ background: `${color}55` }} />
              <div className="h-1.5 w-2/3 rounded-sm bg-white/30" />
              <div className="h-2 w-1/2 rounded-sm" style={{ background: color }} />
            </div>
          ))}
        </div>
      );
    case "social":
      return (
        <div className={`${box} flex flex-col gap-1.5`}>
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-full" style={{ background: color }} />
              <div className="flex flex-1 flex-col gap-1">
                <span className="h-1.5 w-1/3 rounded bg-white/40" />
                <span className="h-1.5 w-5/6 rounded bg-white/15" />
              </div>
              <span className="text-[0.6rem]" style={{ color }}>♥</span>
            </div>
          ))}
        </div>
      );
    case "ai":
      return (
        <div className={`${box} flex flex-col gap-1.5`}>
          <span className="ml-auto h-3 w-1/2 rounded-full bg-white/20" />
          <motion.span
            className="h-3 rounded-full"
            style={{ background: `${color}88` }}
            animate={{ width: ["25%", "75%", "25%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <span className="h-3 w-2/3 rounded-full bg-white/10" />
        </div>
      );
    case "saas":
      return (
        <div className={`${box} flex gap-1.5`}>
          <div className="w-1/5 rounded bg-white/10" />
          <div className="flex flex-1 items-end gap-1">
            {[40, 65, 50, 85, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: color }} />
            ))}
          </div>
        </div>
      );
    case "lms":
      return (
        <div className={`${box} flex flex-col justify-center gap-2`}>
          {[80, 55, 30].map((w, i) => (
            <div key={i} className="h-2 rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${w}%`, background: color }} />
            </div>
          ))}
        </div>
      );
    case "dash":
      return (
        <svg viewBox="0 0 100 50" className={box} preserveAspectRatio="none" aria-hidden>
          <polyline points="0,40 18,30 36,34 54,16 72,22 100,6" fill="none" stroke={color} strokeWidth="2" />
          <polyline points="0,46 25,40 50,42 75,34 100,30" fill="none" stroke="#ffffff55" strokeWidth="1" />
        </svg>
      );
    case "mobile":
      return (
        <div className={`${box} flex items-center justify-center`}>
          <div className="flex h-full w-[34%] flex-col gap-1 rounded-lg border-2 p-1" style={{ borderColor: color }}>
            <span className="h-1.5 rounded bg-white/30" />
            <span className="flex-1 rounded" style={{ background: `${color}40` }} />
            <span className="h-2 rounded" style={{ background: color }} />
          </div>
        </div>
      );
    default:
      return (
        <div className={`${box} grid grid-cols-7 gap-1`}>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="rounded-sm" style={{ background: i === 9 ? color : "rgba(255,255,255,0.1)" }} />
          ))}
        </div>
      );
  }
}

export default function Slide07WhatCanYouBuild(_props: SlideProps) {
  return (
    <SlideShell accent="cyan">
      <div className="flex h-full flex-col justify-between gap-[2vh]">
        <SlideHeader
          kicker="Possibilities"
          title={
            <>
              What can you <span className="text-gradient">build</span>?
            </>
          }
          subtitle="Web development is not limited to simple websites. It runs shops, schools, clinics and startups."
        />

        <div className="grid flex-1 grid-cols-2 gap-[1.2vw] py-[1vh] md:grid-cols-4">
          {APPS.map((app, i) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.id}
                className="glass group flex flex-col gap-[1.2vh] rounded-2xl p-[1.4vh] transition-colors hover:border-white/30"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="min-h-[70px] flex-1">
                  <Preview id={app.id} color={app.color} />
                </div>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 shrink-0" style={{ color: app.color }} />
                  <h3 className="text-[clamp(0.85rem,1.2vw,1.35rem)] font-bold leading-tight">{app.name}</h3>
                </div>
                <p className="text-[clamp(0.75rem,0.95vw,1.05rem)] text-slate-400">{app.line}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SlideShell>
  );
}
