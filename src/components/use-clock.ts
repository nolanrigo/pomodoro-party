import addMinutes from "date-fns/addMinutes";
import differenceInMinutes from "date-fns/differenceInMinutes";
import differenceInSeconds from "date-fns/differenceInSeconds";
import { minutes, seconds } from "../helpers/time";
import { SessionType } from "../models/session";
import { useNow } from "./use-now";

const shortbreakUnit = minutes(5) + seconds(1);
const longbreakUnit = minutes(15) + seconds(1);
const workUnit = minutes(30) + seconds(1);

const cycle = [
  workUnit,
  shortbreakUnit,
  workUnit,
  shortbreakUnit,
  workUnit,
  longbreakUnit,
];
const cycleDuration = cycle.reduce((a, b) => a + b, 0);

const sessionTypeFromUnit = {
  [workUnit]: SessionType.work,
  [shortbreakUnit]: SessionType.shortbreak,
  [longbreakUnit]: SessionType.longbreak,
};

interface UnitMapping {
  from: number;
  to: number;
  type: SessionType;
  nextType: SessionType;
}

const unitsMapping = cycle.reduce<UnitMapping[]>(function (
  acc,
  unit,
  index,
  units,
) {
  const previousTo = acc[acc.length - 1]?.to ?? 0;
  const nextUnit = units[index + 1] ?? units[0];

  acc.push({
    from: previousTo,
    to: previousTo + unit,
    type: sessionTypeFromUnit[unit],
    nextType: sessionTypeFromUnit[nextUnit],
  });

  return acc;
},
[]);

interface Clock {
  minutes: number;
  seconds: number;
  type: SessionType;
  nextType: SessionType;
}

export function useClock(): Clock {
  const now = useNow(1000);

  const absoluteTime = now.getTime();
  const cycleTime = absoluteTime % cycleDuration;
  const baseTime = Math.floor(absoluteTime / cycleDuration) * cycleDuration;

  const unit = unitsMapping.find(function (unit) {
    return cycleTime > unit.from && cycleTime <= unit.to;
  })!;

  const to = new Date(baseTime + unit.to);

  const minutes = differenceInMinutes(to, now);
  const seconds = differenceInSeconds(to, addMinutes(now, minutes));

  return {
    minutes,
    seconds,
    type: unit.type,
    nextType: unit.nextType,
  };
}
