import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

// Free counting service (no account). If it is ever unreachable the counter simply stays hidden.
const API = 'https://abacus.jasoncameron.dev';
// Local testing counts into its own namespace, so it never inflates the live numbers
const NAMESPACE = import.meta.env.PROD ? 'ignitebysis.com' : 'ignitebysis.com-dev';
const STORAGE_KEY = 'ignite-visit-day';

interface Counts {
  total: number;
  today: number;
}

let request: Promise<Counts> | null = null;

// Each browser is counted once per day (India time); later visits that day only read the numbers
function loadCounts(): Promise<Counts> {
  const day = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
  let counted = false;
  try {
    counted = localStorage.getItem(STORAGE_KEY) === day;
  } catch {
    // Storage blocked (private mode): count the visit
  }
  const isBot = /bot|crawl|spider/i.test(navigator.userAgent);
  const action = counted || isBot ? 'get' : 'hit';

  const read = (key: string) =>
    fetch(`${API}/${action}/${NAMESPACE}/${key}`)
      .then((res) => (res.ok ? res.json() : { value: 0 }))
      .then((data: { value: number }) => data.value);

  return Promise.all([read('total'), read(`day-${day}`)]).then(([total, today]) => {
    if (action === 'hit') {
      try {
        localStorage.setItem(STORAGE_KEY, day);
      } catch {
        // Ignore: the visit is still counted
      }
    }
    return { total, today };
  });
}

// Total visits and today's visits, shown in the footer
export default function VisitCounter() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    request ??= loadCounts();
    request.then(setCounts).catch(() => {});
  }, []);

  if (!counts) return null;

  return (
    <p className="flex items-center gap-2 font-mono text-[11px] tracking-wider text-[#8fb9aa]/90">
      <Eye className="w-3.5 h-3.5 text-[#f6a44e]" aria-hidden="true" />
      {counts.total.toLocaleString('en-IN')} {counts.total === 1 ? 'visit' : 'visits'} ·{counts.today.toLocaleString('en-IN')} today
    </p>
  );
}
