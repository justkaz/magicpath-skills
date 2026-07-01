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

const accent: Record<EventOwner, string> = {
  JK: 'text-[#2C5282]',
  CK: 'text-[#9B2C2C]',
  both: 'text-[#553C9A]',
  neutral: 'text-[#718096]',
};

export const V4Editorial = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const weeks = useMemo(() => buildCalendarGrid(), []);
  const selectedEvents = selected ? eventsForDate(selected, filter) : [];

  return (
    <div className="v4-shell mx-auto flex w-full max-w-5xl items-center justify-center px-4 py-10">
      <div className="w-full bg-[#FDFCFA] px-6 py-8 sm:px-10">
        <header className="border-b border-[#D4CFC7] pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="v4-serif text-sm italic text-[#8B8680]">Family Calendar</p>
              <h1 className="v4-display text-6xl leading-none text-[#1A1814] sm:text-7xl">
                {MONTH_LABEL}
              </h1>
              <p className="mt-1 text-lg tracking-wide text-[#8B8680]">{YEAR}</p>
            </div>
            <nav className="flex gap-6 text-sm">
              {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={filter === f}
                  className={`border-b-2 pb-0.5 transition-colors ${
                    filter === f
                      ? 'border-[#1A1814] text-[#1A1814]'
                      : 'border-transparent text-[#B8B3AB] hover:text-[#1A1814]'
                  }`}
                >
                  {f === 'all' ? 'All events' : f}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_220px]">
          <section>
            <div className="mb-3 grid grid-cols-7 gap-px bg-[#D4CFC7]">
              {WEEKDAYS.map((d) => (
                <div
                  key={d}
                  className="bg-[#FDFCFA] py-2 text-center text-[11px] uppercase tracking-[0.2em] text-[#8B8680]"
                >
                  {d}
                </div>
              ))}
            </div>

            {weeks.map((week, wi) => (
              <div key={wi} className="mb-px grid grid-cols-7 gap-px bg-[#D4CFC7]">
                {week.map((cell) => {
                  const events = eventsForDate(cell.date, filter);
                  const active = selected === cell.date;
                  return (
                    <button
                      key={cell.date}
                      type="button"
                      onClick={() => setSelected(cell.date)}
                      aria-pressed={active}
                      className={`min-h-[88px] bg-[#FDFCFA] p-2 text-left transition-colors sm:min-h-[100px] ${
                        active ? 'ring-1 ring-inset ring-[#1A1814]' : 'hover:bg-[#F5F3EF]'
                      } ${cell.inMonth !== 'july' ? 'opacity-45' : ''}`}
                    >
                      <span className="v4-serif text-lg text-[#1A1814]">{cell.day}</span>
                      <div className="mt-2 space-y-1">
                        {events.slice(0, 2).map((e) => (
                          <p
                            key={e.id}
                            className={`truncate text-[10px] leading-snug ${accent[e.owner]}`}
                          >
                            {e.title}
                          </p>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </section>

          <aside className="border-t border-[#D4CFC7] pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#B8B3AB]">Notes</p>
            {selected ? (
              <div className="mt-3">
                <p className="v4-serif text-xl italic text-[#1A1814]">
                  {formatDisplayDate(selected)}
                </p>
                <ul className="mt-4 space-y-3">
                  {selectedEvents.map((e) => (
                    <li key={e.id} className="border-l-2 border-[#D4CFC7] pl-3">
                      <p className={`text-sm font-medium ${accent[e.owner]}`}>{e.title}</p>
                      {e.time && (
                        <p className="text-xs text-[#B8B3AB]">{e.time}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-3 text-sm italic text-[#B8B3AB]">Select a day to read details.</p>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};
