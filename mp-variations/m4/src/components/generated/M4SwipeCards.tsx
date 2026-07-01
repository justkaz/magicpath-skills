import { useMemo, useState } from 'react';
import {
  EVENTS,
  formatDisplayDate,
  MONTH_LABEL,
  PersonFilter,
  YEAR,
  ownerMatchesFilter,
  type EventOwner,
} from './calendarData';

const bg: Record<EventOwner, string> = {
  JK: 'from-indigo-500 to-indigo-600',
  CK: 'from-rose-500 to-rose-600',
  both: 'from-violet-500 to-fuchsia-600',
  neutral: 'from-slate-500 to-slate-600',
};

function daysWithEvents() {
  const map = new Map<string, typeof EVENTS>();
  for (const e of EVENTS) {
    if (!e.date.startsWith('2026-07')) continue;
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date)!.push(e);
  }
  return [...map.entries()].sort(([a], [b]) => (a > b ? 1 : -1));
}

export const M4SwipeCards = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const allDays = useMemo(() => daysWithEvents(), []);
  const days = useMemo(
    () => allDays.filter(([, evs]) => evs.some((e) => ownerMatchesFilter(e.owner, filter))),
    [allDays, filter],
  );
  const [index, setIndex] = useState(() =>
    Math.max(0, allDays.findIndex(([d]) => d === '2026-07-08')),
  );
  const safeIndex = Math.min(index, Math.max(0, days.length - 1));
  const [date, events] = days[safeIndex] ?? ['', []];
  const visible = events.filter((e) => ownerMatchesFilter(e.owner, filter));
  const primaryOwner = visible[0]?.owner ?? 'neutral';

  function go(delta: number) {
    setIndex((i) => Math.min(days.length - 1, Math.max(0, Math.min(i, days.length - 1) + delta)));
  }

  return (
    <div className="m4-shell mx-auto flex w-full max-w-md flex-col bg-slate-950 text-white">
      <header className="px-5 pt-6">
        <div className="flex items-baseline justify-between">
          <h1 className="text-xl font-bold">
            {MONTH_LABEL} {YEAR}
          </h1>
          <span className="text-xs text-slate-400">
            {safeIndex + 1} / {days.length}
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setIndex(0);
              }}
              aria-pressed={filter === f}
              className={`min-h-[34px] rounded-full px-4 text-xs font-semibold transition-colors active:scale-95 ${
                filter === f ? 'bg-white text-slate-950' : 'bg-white/10 text-white'
              }`}
            >
              {f === 'all' ? 'Everyone' : f}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 items-center justify-center px-6 py-8">
        {date ? (
          <div
            key={date}
            className={`m4-card w-full max-w-xs rounded-3xl bg-gradient-to-br ${bg[primaryOwner]} p-6 shadow-2xl`}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-white/70">
              {formatDisplayDate(date)}
            </p>
            <ul className="mt-4 space-y-3">
              {visible.map((e) => (
                <li key={e.id} className="rounded-2xl bg-white/15 p-3 backdrop-blur-sm">
                  <p className="text-base font-semibold">{e.title}</p>
                  {e.time && <p className="text-sm text-white/70">{e.time}</p>}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-sm text-slate-400">No days match this filter.</p>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 px-6 pb-8">
        <button
          type="button"
          onClick={() => go(-1)}
          disabled={safeIndex === 0}
          aria-label="Previous day"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg disabled:opacity-30 active:scale-90"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {days.slice(Math.max(0, safeIndex - 2), safeIndex + 3).map(([d]) => (
            <span
              key={d}
              className={`h-1.5 w-1.5 rounded-full ${d === date ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          disabled={safeIndex >= days.length - 1}
          aria-label="Next day"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg disabled:opacity-30 active:scale-90"
        >
          ›
        </button>
      </div>
    </div>
  );
};
