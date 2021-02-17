import { useWindowWidth } from "@react-hook/window-size";
import c from "classnames";
import React, { ReactNode } from "react";

export interface AdaptativeGridProps {
  children: ReactNode;
  itemWidth: number;
  className?: string;
  length?: number;
}

export function AdaptativeGrid({
  children,
  itemWidth,
  className,
}: AdaptativeGridProps) {
  const width = useWindowWidth({ wait: 100, leading: true });
  const nb = Math.floor(width / itemWidth);

  return (
    <div
      className={c("grid gap-4", className)}
      style={{
        gridTemplateColumns: `repeat(${nb}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
