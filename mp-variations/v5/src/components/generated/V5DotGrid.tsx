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

const dotColor: Record<EventOwner, string> = {
  JK: 'bg-[#6366F1]',
  CK: 'bg-[#F43F5E]',
  both: 'bg-gradient-to-r from-[#6366F1] to-[#F43F5E]',
  neutral: 'bg-[#A8A29E]',
};

export const V5DotGrid = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [selected, setSelected] = useState<string | null>('2026-07-08');
  const [hovered, setHovered] = useState<string | null>(null);
  const weeks = useMemo(() => buildCalendarGrid(), []);
  const focusDate = hovered || selected;
  const focusEvents = focusDate ? eventsForDate(focusDate, filter) : [];

  return (
    <div className="v5-shell mx-auto flex w-full max-w-3xl flex-col items-center justify-center px-4 py-10">
      <div className="w-full">
        <header className="mb-8 flex items-baseline justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-800">
              {MONTH_LABEL}
            </h1>
            <p className="text-sm text-neutral-400">{YEAR}</p>
          </div>
          <div className="flex items-center gap-3">
            {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`h-2 w-2 rounded-full transition-transform ${
                  filter === f ? 'scale-150 bg-neutral-800' : 'bg-neutral-300 hover:bg-neutral-500'
                }`}
                title={f === 'all' ? 'All' : f}
              />
            ))}
          </div>
        </header>

        <div className="mb-1 grid grid-cols-7">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1 text-center text-[10px] text-neutral-400">
              {d.charAt(0)}
            </div>
          ))}
        </div>

        <div className="space-y-1">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-1">
              {week.map((cell) => {
                const events = eventsForDate(cell.date, filter);
                const active = selected === cell.date;
                const owners = [...new Set(events.map((e) => e.owner))];

                return (
                  <button
                    key={cell.date}
                    type="button"
                    onClick={() => setSelected(cell.date)}
                    onMouseEnter={() => setHovered(cell.date)}
                    onMouseLeave={() => setHovered(null)}
                    aria-pressed={active}
                    aria-label={`${cell.day}, ${events.length} events`}
                    className={`group flex aspect-square flex-col items-center justify-center rounded-full transition-all ${
                      active
                        ? 'bg-neutral-900 text-white'
                        : 'hover:bg-neutral-100'
                    } ${cell.inMonth !== 'july' ? 'opacity-30' : ''}`}
                  >
                    <span className={`text-xs ${active ? 'text-white' : 'text-neutral-600'}`}>
                      {cell.day}
                    </span>
                    {owners.length > 0 && (
                      <div className="mt-1 flex gap-0.5">
                        {owners.slice(0, 3).map((o) => (
                          <span
                            key={o}
                            className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-white/80' : dotColor[o]}`}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 border-t border-neutral-200 pt-6 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#6366F1]" /> JK
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#F43F5E]" /> CK
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-neutral-400" /> Shared
          </span>
        </div>

        {focusDate && (
          <div className="mt-4 rounded-xl bg-neutral-50 px-4 py-3">
            <p className="text-xs text-neutral-400">{formatDisplayDate(focusDate)}</p>
            {focusEvents.length > 0 ? (
              <ul className="mt-2 space-y-1">
                {focusEvents.map((e) => (
                  <li key={e.id} className="flex items-center gap-2 text-sm text-neutral-700">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${dotColor[e.owner]}`} />
                    {e.title}
                    {e.time && <span className="text-neutral-400">· {e.time}</span>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm text-neutral-400">No events</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
