import addMinutes from "date-fns/addMinutes";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
import React from "react";
import { Helmet } from "react-helmet";
import { useNow } from "./use-now";

interface CountdownProps {
  to: Date;
}

export function Countdown({ to }: CountdownProps) {
  const now = useNow(500);
  const minutes = differenceInMinutes(to, now);
  const seconds = differenceInSeconds(to, addMinutes(now, minutes));

  const duration = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div>
      <Helmet>
        <title>[{duration}]</title>
      </Helmet>
      {duration}
    </div>
  );
}
