"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
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
      </SmoothScroll>
    </MotionConfig>
  );
}
