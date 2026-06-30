import { useMemo, useState } from 'react';
import {
  buildCalendarGrid,
  eventsForDate,
  formatDisplayDate,
  MONTH_LABEL,
  PersonFilter,
  WEEKDAYS,
  YEAR,
  type EventOwner,
} from './calendarData';

const dot: Record<EventOwner, string> = {
  JK: 'bg-neutral-900',
  CK: 'bg-neutral-400',
  both: 'bg-neutral-600',
  neutral: 'bg-neutral-300',
};

export const V1MinimalMono = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [selected, setSelected] = useState<string | null>('2026-07-08');
  const weeks = useMemo(() => buildCalendarGrid(), []);
  const selectedEvents = selected ? eventsForDate(selected, filter) : [];

  return (
    <div className="v1-shell mx-auto flex w-full max-w-4xl flex-col items-center justify-center px-4 py-10">
      <div className="w-full border border-neutral-900 bg-white">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-neutral-900 px-6 py-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-neutral-500">
              Schedule
            </p>
            <h1 className="text-4xl font-light tracking-tight text-neutral-900 sm:text-5xl">
              {MONTH_LABEL} <span className="text-neutral-400">{YEAR}</span>
            </h1>
          </div>
          <div className="flex gap-0 border border-neutral-900">
            {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-colors ${
                  filter === f
                    ? 'bg-neutral-900 text-white'
                    : 'bg-white text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-7 border-b border-neutral-900">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="border-r border-neutral-900 px-2 py-2 text-center text-[10px] font-medium uppercase tracking-widest last:border-r-0"
            >
              {d}
            </div>
          ))}
        </div>

        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-neutral-900 last:border-b-0">
            {week.map((cell) => {
              const events = eventsForDate(cell.date, filter);
              const active = selected === cell.date;
              return (
                <button
                  key={cell.date}
                  type="button"
                  onClick={() => setSelected(cell.date)}
                  aria-pressed={active}
                  className={`min-h-[88px] border-r border-neutral-900 p-2 text-left last:border-r-0 sm:min-h-[100px] ${
                    active ? 'bg-neutral-900 text-white' : 'bg-white hover:bg-neutral-50'
                  } ${cell.inMonth !== 'july' ? 'opacity-40' : ''}`}
                >
                  <span className="text-sm font-light">{cell.day}</span>
                  <div className="mt-2 space-y-1">
                    {events.slice(0, 2).map((e) => (
                      <p key={e.id} className="truncate text-[10px] leading-tight">
                        {e.title}
                      </p>
                    ))}
                    {events.length > 2 && (
                      <p className="text-[10px] opacity-60">+{events.length - 2}</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        ))}

        {selected && (
          <footer className="border-t border-neutral-900 px-6 py-4">
            <p className="text-[10px] uppercase tracking-widest text-neutral-500">Selected</p>
            <p className="mt-1 text-sm font-medium">{formatDisplayDate(selected)}</p>
            <ul className="mt-3 space-y-1">
              {selectedEvents.map((e) => (
                <li key={e.id} className="flex items-center gap-2 text-sm">
                  <span className={`h-1.5 w-1.5 rounded-full ${dot[e.owner]}`} />
                  {e.title}
                  {e.time && <span className="text-neutral-500">· {e.time}</span>}
                </li>
              ))}
            </ul>
          </footer>
        )}
      </div>
    </div>
  );
};
