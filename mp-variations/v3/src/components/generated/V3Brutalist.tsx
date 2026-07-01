import { useMemo, useState } from 'react';
import {
  buildCalendarGrid,
  eventsForDate,
  formatDisplayDate,
  MONTH_LABEL,
  PersonFilter,
  SPANS,
  WEEKDAYS,
  YEAR,
  ownerMatchesFilter,
} from './calendarData';

export const V3Brutalist = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [selected, setSelected] = useState<string | null>('2026-07-08');
  const weeks = useMemo(() => buildCalendarGrid(), []);
  const selectedEvents = selected ? eventsForDate(selected, filter) : [];
  const bigSur = SPANS['big-sur'];

  return (
    <div className="v3-shell mx-auto flex w-full max-w-4xl items-center justify-center px-3 py-8">
      <div className="w-full border-[3px] border-black bg-white shadow-[8px_8px_0_0_#000]">
        <header className="border-b-[3px] border-black bg-[#FFEB3B] px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="v3-mono text-3xl font-black uppercase tracking-tighter sm:text-4xl">
              {MONTH_LABEL} / {YEAR}
            </h1>
            <div className="flex border-[3px] border-black">
              {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`v3-mono border-r-[3px] border-black px-3 py-1.5 text-xs font-bold uppercase last:border-r-0 ${
                    filter === f ? 'bg-black text-[#FFEB3B]' : 'bg-white hover:bg-neutral-100'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-7 border-b-[3px] border-black">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="v3-mono border-r-[3px] border-black py-2 text-center text-xs font-bold uppercase last:border-r-0"
            >
              {d}
            </div>
          ))}
        </div>

        {weeks.map((week, wi) => {
          const weekDates = week.map((c) => c.date);
          const showSpan =
            bigSur &&
            ownerMatchesFilter(bigSur.owner, filter) &&
            weekDates.some((d) => d >= bigSur.start && d <= bigSur.end);

          return (
            <div key={wi} className="relative border-b-[3px] border-black last:border-b-0">
              {showSpan && (
                <div className="absolute inset-x-0 top-0 z-10 mx-1 mt-0.5 border-[2px] border-black bg-[#FF6B6B] px-2 py-0.5 text-center text-[10px] font-bold uppercase">
                  → {bigSur.label} →
                </div>
              )}
              <div className={`grid grid-cols-7 ${showSpan ? 'pt-6' : ''}`}>
                {week.map((cell) => {
                  const events = eventsForDate(cell.date, filter);
                  const active = selected === cell.date;
                  return (
                    <button
                      key={cell.date}
                      type="button"
                      onClick={() => setSelected(cell.date)}
                      aria-pressed={active}
                      className={`v3-mono min-h-[84px] border-r-[3px] border-black p-2 text-left last:border-r-0 sm:min-h-[96px] ${
                        active ? 'bg-black text-white' : 'bg-white hover:bg-[#FFEB3B]/30'
                      } ${cell.inMonth !== 'july' ? 'opacity-35' : ''}`}
                    >
                      <span className="text-lg font-black">{cell.day}</span>
                      {events.slice(0, 1).map((e) => (
                        <p key={e.id} className="mt-1 truncate text-[10px] font-bold uppercase">
                          {e.title}
                        </p>
                      ))}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {selected && (
          <div className="border-t-[3px] border-black bg-black px-5 py-4 text-white">
            <p className="v3-mono text-xs font-bold uppercase text-[#FFEB3B]">Detail</p>
            <p className="v3-mono mt-1 text-sm font-bold">{formatDisplayDate(selected)}</p>
            <ul className="mt-2 space-y-1">
              {selectedEvents.map((e) => (
                <li key={e.id} className="v3-mono text-sm">
                  [{e.owner}] {e.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
