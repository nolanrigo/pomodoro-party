import { useEffect, useState } from "react";

export function useNow(interval: number): Date {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(function () {
    const id = window.setInterval(function () {
      setNow(new Date());
    }, interval);

    return function () {
      window.clearInterval(id);
    };
  }, []);

  return now;
}
