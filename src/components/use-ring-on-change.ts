import { DependencyList, useEffect, useState } from "react";
import audioSrc from "../audios/ring-bell.mp3";
import { useMe } from "./me";

const sound = new Audio(audioSrc);
sound.volume = 0.6;

export function useRingOnChange(deps: DependencyList): void {
  const me = useMe();
  const [dirty, setDirty] = useState<boolean>(false);

  useEffect(function () {
    if (dirty) {
      if (me && !me.soundMuted) {
        sound.play();
      }
    } else {
      setDirty(true);
    }
  }, deps);
}
