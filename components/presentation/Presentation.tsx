"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { slides } from "@/lib/slides";
import { useFullscreen, useIdle } from "@/lib/hooks";
import Controls from "./Controls";
import { NavMenu, NotesPanel, Overview } from "./Overlays";
import Welcome from "./Welcome";

const TOTAL = slides.length;

// Transform + opacity only: cheap to animate on a projector laptop.
const variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 90, scale: 0.985 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -90, scale: 1.01 }),
};

function isEditable(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT" || el.isContentEditable;
}

export default function Presentation() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const { isFullscreen, enter, exit, toggle } = useFullscreen();
  const idle = useIdle(3000);

  const goTo = useCallback((i: number) => {
    setIndex((prev) => {
      const next = Math.min(Math.max(i, 0), TOTAL - 1);
      if (next !== prev) setDirection(next > prev ? 1 : -1);
      return next;
    });
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const start = useCallback(
    (fullscreen: boolean) => {
      setIndex(0);
      setDirection(1);
      setStarted(true);
      if (fullscreen) void enter();
    },
    [enter],
  );

  const exitPresentation = useCallback(() => {
    void exit();
    setOverviewOpen(false);
    setMenuOpen(false);
    setNotesOpen(false);
    setStarted(false);
  }, [exit]);

  const selectFromOverlay = useCallback(
    (i: number) => {
      goTo(i);
      setOverviewOpen(false);
      setMenuOpen(false);
    },
    [goTo],
  );

  useEffect(() => {
    if (!started) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditable(e.target)) {
        if (e.key === "Escape") (e.target as HTMLElement).blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          next();
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          prev();
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(TOTAL - 1);
          break;
        case "f":
        case "F":
          void toggle();
          break;
        case "o":
        case "O":
          setMenuOpen(false);
          setOverviewOpen((v) => !v);
          break;
        case "m":
        case "M":
          setOverviewOpen(false);
          setMenuOpen((v) => !v);
          break;
        case "n":
        case "N":
          setNotesOpen((v) => !v);
          break;
        case "Escape":
          setOverviewOpen(false);
          setMenuOpen(false);
          setNotesOpen(false);
          break;
        default:
      }
    };

    // Stops a focused button from also "clicking" when Space is released.
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === " " && !isEditable(e.target)) e.preventDefault();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [started, next, prev, goTo, toggle]);

  if (!started) return <Welcome onStart={start} />;

  const current = slides[index];
  const Slide = current.component;
  const overlayOpen = overviewOpen || menuOpen;

  return (
    <main className={`relative h-dvh w-full overflow-hidden bg-navy-950 ${idle && !overlayOpen ? "cursor-hidden" : ""}`}>
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        <motion.div
          key={current.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Slide index={index} />
        </motion.div>
      </AnimatePresence>

      <Controls
        index={index}
        total={TOTAL}
        hidden={idle && !overlayOpen}
        isFullscreen={isFullscreen}
        notesOpen={notesOpen}
        onPrev={prev}
        onNext={next}
        onToggleFullscreen={() => void toggle()}
        onOverview={() => {
          setMenuOpen(false);
          setOverviewOpen(true);
        }}
        onMenu={() => {
          setOverviewOpen(false);
          setMenuOpen(true);
        }}
        onNotes={() => setNotesOpen((v) => !v)}
        onExit={exitPresentation}
      />

      <Overview
        open={overviewOpen}
        slides={slides}
        current={index}
        onSelect={selectFromOverlay}
        onClose={() => setOverviewOpen(false)}
      />
      <NavMenu
        open={menuOpen}
        slides={slides}
        current={index}
        onSelect={selectFromOverlay}
        onClose={() => setMenuOpen(false)}
      />
      <NotesPanel
        open={notesOpen}
        slide={current}
        index={index}
        total={TOTAL}
        onClose={() => setNotesOpen(false)}
      />
    </main>
  );
}
