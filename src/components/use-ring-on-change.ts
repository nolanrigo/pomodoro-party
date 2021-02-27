import { DependencyList, useEffect, useState } from "react";
import audioSrc from "../audios/ring-bell.mp3";

const sound = new Audio(audioSrc);
sound.volume = 0.6;

export function useRingOnChange(deps: DependencyList): void {
  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(function () {
    if (dirty) {
      sound.play();
    } else {
      setDirty(true);
    }
  }, deps);
}
