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

const pill: Record<EventOwner, string> = {
  JK: 'bg-[#E8E4F4] text-[#4A4580]',
  CK: 'bg-[#FCE8E6] text-[#8B4A4A]',
  both: 'bg-[#F0EBE3] text-[#5C5348]',
  neutral: 'bg-[#EDEAE4] text-[#6B6560]',
};

export const V2SoftPastel = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [selected, setSelected] = useState<string | null>(null);
  const weeks = useMemo(() => buildCalendarGrid(), []);
  const selectedEvents = selected ? eventsForDate(selected, filter) : [];

  return (
    <div className="v2-shell mx-auto flex w-full max-w-4xl items-center justify-center px-4 py-10">
      <div className="w-full rounded-[2rem] bg-[#FAF7F2] p-6 shadow-sm sm:p-8">
        <header className="mb-6 text-center">
          <p className="text-xs font-medium text-[#B8A99A]">{YEAR}</p>
          <h1 className="v2-title text-5xl text-[#3D3832] sm:text-6xl">{MONTH_LABEL}</h1>
          <div className="mt-4 inline-flex gap-2 rounded-full bg-white/70 p-1">
            {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  filter === f
                    ? 'bg-[#3D3832] text-[#FAF7F2] shadow-sm'
                    : 'text-[#8B8278] hover:text-[#3D3832]'
                }`}
              >
                {f === 'all' ? 'Everyone' : f}
              </button>
            ))}
          </div>
        </header>

        <div className="mb-2 grid grid-cols-7 gap-2">
          {WEEKDAYS.map((d) => (
            <div key={d} className="text-center text-[11px] font-medium text-[#B8A99A]">
              {d}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-2">
              {week.map((cell) => {
                const events = eventsForDate(cell.date, filter);
                const active = selected === cell.date;
                return (
                  <button
                    key={cell.date}
                    type="button"
                    onClick={() => setSelected(cell.date)}
                    aria-pressed={active}
                    className={`min-h-[80px] rounded-2xl p-2 text-left transition-all sm:min-h-[92px] ${
                      active
                        ? 'bg-white shadow-md ring-2 ring-[#E8E4F4]'
                        : 'bg-white/50 hover:bg-white hover:shadow-sm'
                    } ${cell.inMonth !== 'july' ? 'opacity-50' : ''}`}
                  >
                    <span className="text-sm font-medium text-[#3D3832]">{cell.day}</span>
                    <div className="mt-1.5 space-y-1">
                      {events.slice(0, 2).map((e) => (
                        <span
                          key={e.id}
                          className={`block truncate rounded-lg px-1.5 py-0.5 text-[9px] font-medium ${pill[e.owner]}`}
                        >
                          {e.title}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {selected && (
          <div className="mt-6 rounded-2xl bg-white/80 p-4">
            <p className="text-sm font-medium text-[#3D3832]">{formatDisplayDate(selected)}</p>
            <ul className="mt-2 space-y-1.5">
              {selectedEvents.map((e) => (
                <li key={e.id} className={`rounded-xl px-3 py-2 text-sm ${pill[e.owner]}`}>
                  {e.title}
                  {e.time && <span className="opacity-70"> · {e.time}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
