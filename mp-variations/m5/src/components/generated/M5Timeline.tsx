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
  both: 'bg-violet-500',
  neutral: 'bg-slate-400',
};

const ring: Record<EventOwner, string> = {
  JK: 'ring-indigo-200',
  CK: 'ring-rose-200',
  both: 'ring-violet-200',
  neutral: 'ring-slate-200',
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

export const M5Timeline = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [active, setActive] = useState<string | null>('2026-07-08');
  const groups = useMemo(() => groupByDate(), []);

  return (
    <div className="m5-shell mx-auto flex w-full max-w-md flex-col bg-white">
      <header className="sticky top-0 z-10 bg-white/95 px-5 pb-4 pt-6 backdrop-blur">
        <h1 className="text-2xl font-bold text-slate-900">
          {MONTH_LABEL} <span className="text-slate-300">{YEAR}</span>
        </h1>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setActive(null);
              }}
              aria-pressed={filter === f}
              className={`min-h-[34px] shrink-0 rounded-full px-4 text-xs font-semibold transition-colors active:scale-95 ${
                filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {f === 'all' ? 'Everyone' : f}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="relative ml-3 border-l-2 border-slate-100 pl-6">
          {groups.map(([date, events]) => {
            const visible = events.filter((e) => ownerMatchesFilter(e.owner, filter));
            if (visible.length === 0) return null;
            const isActive = active === date;
            const dayNum = Number(date.slice(-2));

            return (
              <div key={date} className="relative pb-6">
                <span
                  className={`absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ring-4 ring-white ${
                    visible.length ? dot[visible[0].owner] : 'bg-slate-300'
                  }`}
                >
                  {dayNum}
                </span>

                <button
                  type="button"
                  onClick={() => setActive(isActive ? null : date)}
                  aria-expanded={isActive}
                  className="w-full text-left"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {formatDisplayDate(date).split(',')[0]}
                  </p>
                </button>

                <div className="mt-2 space-y-2">
                  {visible.slice(0, isActive ? undefined : 2).map((e) => (
                    <div
                      key={e.id}
                      className={`rounded-2xl bg-slate-50 p-3 ring-1 ${ring[e.owner]}`}
                    >
                      <p className="text-sm font-medium text-slate-800">{e.title}</p>
                      {e.time && <p className="text-xs text-slate-400">{e.time}</p>}
                    </div>
                  ))}
                  {!isActive && visible.length > 2 && (
                    <button
                      type="button"
                      onClick={() => setActive(date)}
                      className="text-xs font-semibold text-slate-400 active:text-slate-600"
                    >
                      +{visible.length - 2} more
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
