import type { ComponentType } from "react";

/** Props every slide receives from the presentation engine. */
export interface SlideProps {
  /** Index of this slide (0-based). Useful for analytics-free debugging. */
  index: number;
}

export interface SlideDef {
  id: string;
  /** Short title shown in the overview and navigation menu. */
  title: string;
  /** Grouping label shown in the navigation menu. */
  section: "Intro" | "Foundations" | "Ecosystem" | "AI & Future" | "Career" | "Finale";
  /** Private speaker notes shown in the notes panel (toggle with N). */
  notes: string[];
  component: ComponentType<SlideProps>;
}
