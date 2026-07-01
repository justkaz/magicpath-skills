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

const dot: Record<EventOwner, string> = {
  JK: 'bg-indigo-500',
  CK: 'bg-rose-500',
  both: 'bg-gradient-to-r from-indigo-500 to-rose-500',
  neutral: 'bg-slate-400',
};

function groupByDate() {
  const map = new Map<string, typeof EVENTS>();
  for (const e of EVENTS) {
    if (!e.date.startsWith('2026-07')) continue;
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date)!.push(e);
  }
  return [...map.entries()].sort(([a], [b]) => (a > b ? 1 : -1));
}

export const M1AgendaList = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [expanded, setExpanded] = useState<string | null>('2026-07-08');
  const groups = useMemo(() => groupByDate(), []);

  return (
    <div className="m1-shell mx-auto flex w-full max-w-md flex-col bg-white">
      <header className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-5 pb-3 pt-5 backdrop-blur">
        <div className="flex items-baseline justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            {MONTH_LABEL} <span className="text-slate-400">{YEAR}</span>
          </h1>
        </div>
        <div className="mt-3 flex gap-2">
          {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-[36px] flex-1 rounded-full text-sm font-semibold transition-colors active:scale-95 ${
                filter === f
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 active:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'Everyone' : f}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 divide-y divide-slate-100 overflow-y-auto pb-6">
        {groups.map(([date, events]) => {
          const visible = events.filter((e) => ownerMatchesFilter(e.owner, filter));
          if (visible.length === 0) return null;
          const isOpen = expanded === date;
          const dayNum = Number(date.slice(-2));

          return (
            <div key={date} className="px-5">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : date)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-3 py-3 text-left active:bg-slate-50"
              >
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <span className="text-sm font-bold leading-none">{dayNum}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {formatDisplayDate(date).split(',')[0]}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {visible.map((e) => e.title).join(' · ')}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  {[...new Set(visible.map((e) => e.owner))].map((o) => (
                    <span key={o} className={`h-2 w-2 rounded-full ${dot[o]}`} />
                  ))}
                </div>
              </button>

              {isOpen && (
                <ul className="space-y-2 pb-3 pl-14">
                  {visible.map((e) => (
                    <li
                      key={e.id}
                      className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm"
                    >
                      <span className={`h-2 w-2 shrink-0 rounded-full ${dot[e.owner]}`} />
                      <span className="font-medium text-slate-800">{e.title}</span>
                      {e.time && <span className="text-slate-400">· {e.time}</span>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
