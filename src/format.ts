/** The few formatters the components need; the apps keep their own fuller set. */
export function fmtInt(n: number): string { return n.toLocaleString("en-US"); }
export function cap(s: string): string { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
