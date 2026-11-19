"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListTree,
  LogOut,
  Maximize,
  Minimize,
  StickyNote,
} from "lucide-react";
import type { ReactNode } from "react";

interface ControlsProps {
  index: number;
  total: number;
  /** When true the dock fades out so it never covers the visuals. */
  hidden: boolean;
  isFullscreen: boolean;
  notesOpen: boolean;
  onPrev: () => void;
  onNext: () => void;
  onToggleFullscreen: () => void;
  onOverview: () => void;
  onMenu: () => void;
  onNotes: () => void;
  onExit: () => void;
}

interface DockButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: ReactNode;
}

function DockButton({ label, onClick, disabled, active, children }: DockButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-10 w-10 items-center justify-center rounded-full text-slate-200 transition hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 ${
        active ? "bg-neon/25 text-neon" : ""
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Presenter chrome: thin progress bar (top), exit button (top-right),
 * slide counter (bottom-left) and a control dock (bottom-center) that hides when idle.
 */
export default function Controls(props: ControlsProps) {
  const { index, total, hidden, isFullscreen, notesOpen } = props;
  const pct = ((index + 1) / total) * 100;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <>
      <div className="pointer-events-none fixed left-0 right-0 top-0 z-50 h-[3px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-electric via-neon to-white"
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <button
        type="button"
        onClick={props.onExit}
        className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-white/15 bg-navy-900/70 px-3 py-1.5 text-xs font-medium text-slate-300 opacity-60 backdrop-blur transition hover:opacity-100"
      >
        <LogOut className="h-3.5 w-3.5" />
        Exit
      </button>

      <div className="pointer-events-none fixed bottom-4 left-5 z-50 font-mono text-sm tracking-widest text-slate-400">
        <span className="text-white">{pad(index + 1)}</span> / {pad(total)}
      </div>

      <motion.div
        className="glass-strong fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full px-2 py-1.5"
        animate={{ opacity: hidden ? 0 : 1, y: hidden ? 12 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: hidden ? "none" : "auto" }}
      >
        <DockButton label="Previous slide (←)" onClick={props.onPrev} disabled={index === 0}>
          <ChevronLeft className="h-5 w-5" />
        </DockButton>
        <DockButton label="Next slide (→ or Space)" onClick={props.onNext} disabled={index === total - 1}>
          <ChevronRight className="h-5 w-5" />
        </DockButton>
        <span className="mx-1 h-5 w-px bg-white/15" />
        <DockButton label="Navigation menu (M)" onClick={props.onMenu}>
          <ListTree className="h-5 w-5" />
        </DockButton>
        <DockButton label="Slide overview (O)" onClick={props.onOverview}>
          <LayoutGrid className="h-5 w-5" />
        </DockButton>
        <DockButton label="Presenter notes (N)" onClick={props.onNotes} active={notesOpen}>
          <StickyNote className="h-5 w-5" />
        </DockButton>
        <DockButton label="Toggle fullscreen (F)" onClick={props.onToggleFullscreen}>
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
        </DockButton>
      </motion.div>
    </>
  );
}
