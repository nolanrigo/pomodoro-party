import c from "classnames";
import React from "react";
import { colorFromSessionType } from "../helpers/color-from-session-type";
import { SessionType } from "../models/session";
import { useClock } from "./use-clock";
import { useRingOnChange } from "./use-ring-on-change";

interface ClockProps {}

export function Clock(_: ClockProps) {
  const { minutes, seconds, type, nextType } = useClock();
  useRingOnChange([minutes === 0 && seconds === 0]);

  const duration = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <>
      <div
        className={c(
          colorFromSessionType(type),
          "relative p-10 my-2 font-medium shadow-sm rounded-xl text-gray-50 overflow-hidden",
        )}
      >
        <div className="text-3xl font-light">
          <CurrentTypeLabel type={type} />
        </div>
        <div className="mt-6 text-6xl font-medium leading-none tracking-normal sm:text-9xl">
          {duration}
        </div>

        <div
          className={c(
            colorFromSessionType(nextType),
            "absolute bottom-0 right-0 rotate-45 w-24 h-24 transform -mr-12 -mb-12",
          )}
        />
      </div>
    </>
  );
}

interface CurrentTypeLabelProps {
  type: SessionType;
}

function CurrentTypeLabel({ type }: CurrentTypeLabelProps) {
  switch (type) {
    case SessionType.work: {
      return <>are working during</>;
    }
    case SessionType.shortbreak: {
      return <>are taking a short break</>;
    }
    case SessionType.longbreak: {
      return <>are taking a long break</>;
    }
  }
}
