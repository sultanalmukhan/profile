const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parse(value: string): { year: number; month: number } {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) throw new Error(`Expected a "YYYY-MM" month, got "${value}"`);
  return { year: Number(match[1]), month: Number(match[2]) };
}

/** "2023-08" → "Aug 2023". */
export function formatMonth(value: string): string {
  const { year, month } = parse(value);
  return `${MONTHS[month - 1]} ${year}`;
}

/** "Aug 2023 – Sep 2025", or "Sep 2025 – Present" without an end. */
export function formatRange(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'Present'}`;
}

/**
 * Length of a role counting both the first and last month, the way LinkedIn
 * does: Aug 2023 – Sep 2025 is "2 yrs 2 mos". A current role runs to this month.
 */
export function formatDuration(start: string, end?: string, today = new Date()): string {
  const from = parse(start);
  const to = end ? parse(end) : { year: today.getFullYear(), month: today.getMonth() + 1 };
  const months = Math.max(1, (to.year - from.year) * 12 + (to.month - from.month) + 1);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'yr' : 'yrs'}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? 'mo' : 'mos'}`);
  return parts.join(' ');
}
