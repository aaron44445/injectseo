"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BorderBeamCardProps {
  children: ReactNode;
  className?: string;
  duration?: number;
}

export function BorderBeamCard({ children, className }: BorderBeamCardProps) {
  return (
    <div className={cn("relative rounded-lg", className)}>
      <div className="rounded-lg bg-white/95 border border-slate-200/60 h-full shadow-[0_4px_20px_rgba(37,99,235,0.06)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.1)] hover:border-blue-200/80 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}
