import { useMemo, useState } from 'react';
import {
  buildCalendarGrid,
  eventsForDate,
  formatDisplayDate,
  MONTH_LABEL,
  PersonFilter,
  YEAR,
  type EventOwner,
} from './calendarData';

const chip: Record<EventOwner, string> = {
  JK: 'bg-indigo-50 text-indigo-700',
  CK: 'bg-rose-50 text-rose-700',
  both: 'bg-violet-50 text-violet-700',
  neutral: 'bg-slate-100 text-slate-600',
};

const dot: Record<EventOwner, string> = {
  JK: 'bg-indigo-500',
  CK: 'bg-rose-500',
  both: 'bg-violet-500',
  neutral: 'bg-slate-400',
};

export const M2WeekStrip = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [selected, setSelected] = useState('2026-07-08');
  const weeks = useMemo(() => buildCalendarGrid(), []);
  const allDays = useMemo(() => weeks.flat(), [weeks]);
  const weekIndex = Math.max(
    0,
    weeks.findIndex((w) => w.some((d) => d.date === selected)),
  );
  const [activeWeek, setActiveWeek] = useState(weekIndex);
  const currentWeek = weeks[activeWeek] ?? weeks[0];
  const selectedEvents = eventsForDate(selected, filter);

  return (
    <div className="m2-shell mx-auto flex w-full max-w-md flex-col bg-[#FAFAFA]">
      <header className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {MONTH_LABEL} {YEAR}
        </h1>
        <div className="mt-3 flex gap-2">
          {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-[34px] rounded-full px-4 text-xs font-semibold transition-colors active:scale-95 ${
                filter === f ? 'bg-slate-900 text-white' : 'bg-white text-slate-500 shadow-sm'
              }`}
            >
              {f === 'all' ? 'Everyone' : f}
            </button>
          ))}
        </div>
      </header>

      <div className="mt-5 flex items-center gap-1 px-5">
        <button
          type="button"
          aria-label="Previous week"
          onClick={() => setActiveWeek((w) => Math.max(0, w - 1))}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm active:scale-90"
        >
          ‹
        </button>

        <div className="grid flex-1 grid-cols-7 gap-1">
          {currentWeek.map((cell) => {
            const events = eventsForDate(cell.date, filter);
            const isSel = selected === cell.date;
            return (
              <button
                key={cell.date}
                type="button"
                onClick={() => setSelected(cell.date)}
                aria-pressed={isSel}
                className={`flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl py-2 transition-colors active:scale-95 ${
                  isSel ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 shadow-sm'
                } ${cell.inMonth !== 'july' ? 'opacity-40' : ''}`}
              >
                <span className="text-sm font-bold">{cell.day}</span>
                {events.length > 0 && (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isSel ? 'bg-white' : dot[events[0].owner]}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next week"
          onClick={() => setActiveWeek((w) => Math.min(weeks.length - 1, w + 1))}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm active:scale-90"
        >
          ›
        </button>
      </div>

      <div className="mt-6 flex-1 rounded-t-3xl bg-white px-5 pt-5 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {formatDisplayDate(selected)}
        </p>

        {selectedEvents.length ? (
          <ul className="mt-3 space-y-2 pb-6">
            {selectedEvents.map((e) => (
              <li key={e.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${chip[e.owner]}`}>
                  {e.owner === 'both' ? '★' : e.owner === 'neutral' ? '•' : e.owner}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{e.title}</p>
                  {e.time && <p className="text-xs text-slate-400">{e.time}</p>}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 pb-6 text-sm text-slate-400">No events scheduled.</p>
        )}
      </div>
    </div>
  );
};
