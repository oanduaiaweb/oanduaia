/** Today in Estonia, so the band changes at midnight Tallinn time, not the visitor's. */
function tallinnMonthDay(now: Date): [number, number] {
  const [, m, d] = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Tallinn' }).format(now).split('-').map(Number)
  return [m, d]
}

/**
 * The Sauna House winter band runs 1 December to 31 March (Mikk, 7 Nov: no discount, just
 * promote it), the months the other two houses are closed. `?talv=1` shows it outside the
 * season, so it can be looked at before it starts.
 */
export function winterSaunaOn(now = new Date(), search = ''): boolean {
  if (/[?&]talv=1\b/.test(search)) return true
  const [m] = tallinnMonthDay(now)
  return m === 12 || m <= 3
}
