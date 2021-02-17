import React, { MouseEventHandler, ReactNode } from "react";
import { createPortal } from "react-dom";

const el = document.createElement("div");
document.body.append(el);

interface WormHoleProps {
  children: ReactNode;
}

export function WormHole({ children }: WormHoleProps) {
  return createPortal(children, el);
}

export interface BackgroundProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function Background({ children, onClick }: BackgroundProps) {
  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full min-h-full px-4 pt-4 pb-20 sm:p-0">
      <div
        className="absolute inset-0 w-full h-full bg-gray-500 opacity-75"
        onClick={onClick}
      />
      {children}
    </div>
  );
}
