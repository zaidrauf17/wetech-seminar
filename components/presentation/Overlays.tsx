"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { SlideDef } from "@/lib/types";

interface NavProps {
  open: boolean;
  slides: SlideDef[];
  current: number;
  onSelect: (i: number) => void;
  onClose: () => void;
}

const pad = (n: number) => String(n + 1).padStart(2, "0");

/** Full-screen grid of every slide. Click one to jump to it. */
export function Overview({ open, slides, current, onSelect, onClose }: NavProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-navy-950/92 p-[4vw] backdrop-blur-xl thin-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between pb-6">
            <h3 className="text-2xl font-bold">Slide overview</h3>
            <button
              type="button"
              aria-label="Close overview"
              onClick={onClose}
              className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelect(i)}
                className={`glass group flex aspect-video flex-col justify-between rounded-2xl p-4 text-left transition hover:-translate-y-1 hover:border-neon/60 ${
                  i === current ? "!border-neon shadow-[0_0_30px_rgba(34,211,238,0.35)]" : ""
                }`}
              >
                <span className="font-mono text-sm text-neon">{pad(i)}</span>
                <span>
                  <span className="block text-[0.7rem] uppercase tracking-widest text-slate-400">{s.section}</span>
                  <span className="block text-lg font-semibold leading-tight">{s.title}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Slide-in list drawer grouped by section: the optional presenter navigation menu. */
export function NavMenu({ open, slides, current, onSelect, onClose }: NavProps) {
  const sections = Array.from(new Set(slides.map((s) => s.section)));
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[55] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="glass-strong thin-scroll fixed bottom-0 left-0 top-0 z-[60] w-[min(380px,90vw)] overflow-y-auto p-6"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold">Jump to slide</h3>
              <button type="button" aria-label="Close menu" onClick={onClose} className="rounded-full p-1.5 hover:bg-white/10">
                <X className="h-5 w-5" />
              </button>
            </div>
            {sections.map((section) => (
              <div key={section} className="mb-5">
                <p className="mb-2 text-[0.7rem] uppercase tracking-[0.2em] text-slate-500">{section}</p>
                <ul className="flex flex-col gap-1">
                  {slides.map((s, i) =>
                    s.section === section ? (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => onSelect(i)}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/10 ${
                            i === current ? "bg-neon/15 text-neon" : "text-slate-200"
                          }`}
                        >
                          <span className="font-mono text-xs opacity-70">{pad(i)}</span>
                          {s.title}
                        </button>
                      </li>
                    ) : null,
                  )}
                </ul>
              </div>
            ))}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

interface NotesProps {
  open: boolean;
  slide: SlideDef;
  index: number;
  total: number;
  onClose: () => void;
}

/** Speaker notes drawer. Off by default; toggle with N. */
export function NotesPanel({ open, slide, index, total, onClose }: NotesProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          className="glass-strong thin-scroll fixed bottom-20 right-4 top-14 z-[58] w-[min(420px,92vw)] overflow-y-auto rounded-3xl p-6"
          initial={{ x: "110%" }}
          animate={{ x: 0 }}
          exit={{ x: "110%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
        >
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs text-neon">
                SLIDE {index + 1} / {total}
              </p>
              <h3 className="text-lg font-bold leading-tight">{slide.title}</h3>
            </div>
            <button type="button" aria-label="Close notes" onClick={onClose} className="rounded-full p-1.5 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-3 text-[0.95rem] leading-relaxed text-slate-200">
            {slide.notes.map((n, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                {n}
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-white/10 pt-3 text-xs text-slate-500">
            Notes are visible on screen. Keep them closed if your display is mirrored to the projector.
          </p>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
