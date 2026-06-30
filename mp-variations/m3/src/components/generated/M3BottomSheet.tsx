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
  JK: 'bg-indigo-500',
  CK: 'bg-rose-500',
  both: 'bg-violet-500',
  neutral: 'bg-slate-400',
};

export const M3BottomSheet = () => {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [sheetDate, setSheetDate] = useState<string | null>(null);
  const weeks = useMemo(() => buildCalendarGrid(), []);
  const sheetEvents = sheetDate ? eventsForDate(sheetDate, filter) : [];
  const open = sheetDate !== null;

  return (
    <div className="m3-shell relative mx-auto flex w-full max-w-md flex-col overflow-hidden bg-white">
      <header className="px-5 pt-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {MONTH_LABEL} <span className="text-slate-300">{YEAR}</span>
        </h1>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {(['all', 'JK', 'CK'] as PersonFilter[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`min-h-[38px] rounded-xl text-sm font-semibold transition-colors active:scale-95 ${
                filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </header>

      <div className="mt-5 grid grid-cols-7 px-5">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-center text-[10px] font-semibold text-slate-400">
            {d.charAt(0)}
          </div>
        ))}
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-5 pb-6">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((cell) => {
              const events = eventsForDate(cell.date, filter);
              return (
                <button
                  key={cell.date}
                  type="button"
                  onClick={() => setSheetDate(cell.date)}
                  aria-label={`${cell.day}, ${events.length} events`}
                  className={`flex aspect-square min-h-[40px] flex-col items-center justify-center gap-0.5 rounded-xl transition-colors active:scale-90 active:bg-slate-100 ${
                    cell.inMonth !== 'july' ? 'opacity-35' : ''
                  }`}
                >
                  <span className="text-xs font-semibold text-slate-700">{cell.day}</span>
                  {events.length > 0 && (
                    <div className="flex gap-0.5">
                      {[...new Set(events.map((e) => e.owner))].slice(0, 3).map((o) => (
                        <span key={o} className={`h-1 w-1 rounded-full ${dot[o]}`} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div
        role="presentation"
        onClick={() => setSheetDate(null)}
        className={`absolute inset-0 bg-black/30 transition-opacity ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`absolute inset-x-0 bottom-0 rounded-t-3xl bg-white px-5 pb-8 pt-3 shadow-[0_-12px_32px_-8px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-200" />
        {sheetDate && (
          <>
            <p className="text-sm font-semibold text-slate-900">{formatDisplayDate(sheetDate)}</p>
            {sheetEvents.length ? (
              <ul className="mt-3 space-y-2">
                {sheetEvents.map((e) => (
                  <li key={e.id} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                    <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${dot[e.owner]}`} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">{e.title}</p>
                      {e.time && <p className="text-xs text-slate-400">{e.time}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-slate-400">No events.</p>
            )}
            <button
              type="button"
              onClick={() => setSheetDate(null)}
              className="mt-5 min-h-[44px] w-full rounded-2xl bg-slate-900 text-sm font-semibold text-white active:scale-95"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};
