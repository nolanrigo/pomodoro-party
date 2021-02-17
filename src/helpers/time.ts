export function seconds(nb: number): number {
  return 1000 * nb;
}

export function minutes(nb: number): number {
  return 60 * seconds(nb);
}

export function hours(nb: number): number {
  return 60 * minutes(nb);
}
