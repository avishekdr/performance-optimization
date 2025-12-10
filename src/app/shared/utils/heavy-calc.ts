export function heavyCalc(n: number): number {
  // Simulate a heavy compute
  let s = 0;
  for (let i = 1; i <= n; i++) {
    s += Math.sqrt(i);
  }
  return s;
}
