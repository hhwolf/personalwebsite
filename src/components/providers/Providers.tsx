"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { Cursor } from "@/components/layout/Cursor";
import { Magnetic } from "@/components/layout/Magnetic";
import { ScrollReveals } from "@/components/layout/ScrollReveals";
import { SmoothScroll } from "./SmoothScroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        {children}
        <ScrollReveals />
        <Magnetic />
        <Cursor />
      </SmoothScroll>
    </MotionConfig>
  );
}
