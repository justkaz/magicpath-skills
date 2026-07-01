import { useMemo, useState } from 'react';
import {
  buildCalendarGrid,
  eventsForDate,
  formatDisplayDate,
  MONTH_LABEL,
  ownerMatchesFilter,
  PersonFilter,
  SPANS,
  WEEKDAYS,
  YEAR,
  type CalendarEvent,
  type EventOwner,
} from './calendarData';

const ownerStyles: Record<
  EventOwner,
  { chip: string; text: string; dot: string; label: string }
> = {
  JK: {
    chip: 'bg-indigo-100/90 text-indigo-900 border-indigo-200 hover:bg-indigo-200/90',
    text: 'text-indigo-700',
    dot: 'bg-indigo-500',
    label: 'JK',
  },
  CK: {
    chip: 'bg-rose-100/90 text-rose-900 border-rose-200 hover:bg-rose-200/90',
    text: 'text-rose-700',
    dot: 'bg-rose-500',
    label: 'CK',
  },
  both: {
    chip: 'bg-gradient-to-r from-indigo-100 to-rose-100 text-slate-900 border-violet-200 hover:from-indigo-200 hover:to-rose-200',
    text: 'text-violet-800',
    dot: 'bg-gradient-to-r from-indigo-500 to-rose-500',
    label: 'JK / CK',
  },
  neutral: {
    chip: 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200',
    text: 'text-slate-700',
    dot: 'bg-slate-500',
    label: 'Shared',
  },
};

function Firework({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {[0, 45, 90, 135].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 12 12)`}>
          <line x1="12" y1="4" x2="12" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="16" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}

function Rocket({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 2c0 4-2 6-4 8 1 0 2 .5 3 1.5C13 9 15 7 18 5c-2 3-4 5-6.5 6.5C12.5 12.5 13 13.5 13 15c2-2 4-4 8-4-4 4-6 6-8 7 0 2-1 3-1 3s-1-1-1-3c-1-2-3-4-7-7 4 0 6 2 8 4-.5-1.5-1-2.5-1.5-3.5C6 8 4 6 4 2c4 0 6 2 8 4 0-2 0-4 0-4z"
        fill="currentColor"
      />
    </svg>
  );
}

function EventChip({
  event,
  compact = false,
}: {
  event: CalendarEvent;
  compact?: boolean;
}) {
  const style = ownerStyles[event.owner];
  const prefix =
    event.owner === 'JK' || event.owner === 'CK' ? `${event.owner} · ` : '';

  return (
    <div
      className={`rounded-md border px-1.5 py-0.5 text-[10px] leading-tight font-medium transition-colors sm:text-[11px] ${style.chip} ${
        compact ? 'truncate' : ''
      }`}
      title={`${prefix}${event.title}${event.time ? ` (${event.time})` : ''}`}
    >
      <span className={style.text}>{prefix}</span>
      {event.title}
      {event.time ? <span className="opacity-80"> · {event.time}</span> : null}
    </div>
  );
}

function SpanBar({
  spanId,
  weekDates,
  filter,
}: {
  spanId: string;
  weekDates: string[];
  filter: PersonFilter;
}) {
  const span = SPANS[spanId];
  if (!span || !ownerMatchesFilter(span.owner, filter)) return null;

  const startIdx = weekDates.indexOf(span.start);
  const endIdx = weekDates.indexOf(span.end);
  if (startIdx === -1 && endIdx === -1) return null;

  const visibleStart = startIdx === -1 ? 0 : startIdx;
  const visibleEnd = endIdx === -1 ? 6 : endIdx;
  const left = (visibleStart / 7) * 100;
  const width = ((visibleEnd - visibleStart + 1) / 7) * 100;
  const style = ownerStyles[span.owner];

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-1">
      <div
        className={`relative h-5 rounded-full border text-[10px] font-semibold shadow-sm sm:text-[11px] ${style.chip}`}
        style={{ marginLeft: `${left}%`, width: `${width}%` }}
      >
        <div className="flex h-full items-center justify-center gap-1 px-2">
          <span aria-hidden="true">→</span>
          <span className="truncate">{span.label}</span>
          <span aria-hidden="true">→</span>
        </div>
      </div>
    </div>
  );
}

export function JulyCalendarWidget() {
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-07-08');
  const weeks = useMemo(() => buildCalendarGrid(), []);

  const selectedEvents = selectedDate ? eventsForDate(selectedDate, filter) : [];
  const selectedLabel = selectedDate ? formatDisplayDate(selectedDate) : '';

  const filters: { id: PersonFilter; label: string; hint: string }[] = [
    { id: 'all', label: 'Everyone', hint: 'All events' },
    { id: 'JK', label: 'JK', hint: 'Blue schedule' },
    { id: 'CK', label: 'CK', hint: 'Red schedule' },
  ];

  return (
    <div className="calendar-shell mx-auto w-full max-w-5xl px-3 py-6 sm:px-6">
      <div className="calendar-card overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-2xl shadow-blue-900/10 backdrop-blur-md">
        <header className="relative overflow-hidden border-b border-slate-200/70 bg-gradient-to-br from-sky-50 via-white to-rose-50 px-4 py-5 sm:px-6 sm:py-6">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <Firework className="absolute left-[8%] top-3 h-8 w-8 text-amber-400" />
            <Firework className="absolute right-[12%] top-5 h-6 w-6 text-blue-400" />
            <Rocket className="absolute right-[22%] top-2 h-7 w-7 rotate-12 text-rose-400" />
            <div className="stars absolute inset-0" />
          </div>

          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Summer Schedule
              </p>
              <h1 className="calendar-title mt-1 text-5xl leading-none text-slate-900 sm:text-6xl">
                {MONTH_LABEL}
              </h1>
              <p className="mt-1 text-lg font-medium text-slate-600">{YEAR}</p>
              <p className="mt-2 max-w-md text-sm text-slate-500">
                Handwritten family calendar — JK in blue, CK in red, with the Big Sur trip spanning July 8–11.
              </p>
            </div>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter events by person"
            >
              {filters.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    aria-pressed={active}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${
                      active
                        ? item.id === 'JK'
                          ? 'border-indigo-300 bg-indigo-600 text-white shadow-lg shadow-indigo-300/40'
                          : item.id === 'CK'
                            ? 'border-rose-300 bg-rose-600 text-white shadow-lg shadow-rose-300/40'
                            : 'border-slate-300 bg-slate-900 text-white shadow-lg'
                        : 'border-slate-200 bg-white/80 text-slate-700 hover:bg-white'
                    }`}
                  >
                    {item.label}
                    <span className="ml-1 hidden text-xs font-normal opacity-80 sm:inline">
                      · {item.hint}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="p-3 sm:p-4">
            <div className="mb-2 grid grid-cols-7 gap-1 sm:gap-2">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {weeks.map((week, weekIndex) => {
                const weekDates = week.map((d) => d.date);
                const spanIds = [
                  ...new Set(
                    weekDates.flatMap((date) => {
                      const match = Object.entries(SPANS).find(
                        ([, span]) => date >= span.start && date <= span.end,
                      );
                      return match ? [match[0]] : [];
                    }),
                  ),
                ];

                return (
                  <div key={weekIndex} className="relative">
                    {spanIds.map((spanId) => (
                      <SpanBar
                        key={spanId}
                        spanId={spanId}
                        weekDates={weekDates}
                        filter={filter}
                      />
                    ))}

                    <div
                      className={`grid grid-cols-7 gap-1 sm:gap-2 ${
                        spanIds.length ? 'pt-6' : ''
                      }`}
                    >
                      {week.map((cell) => {
                        const dayEvents = eventsForDate(cell.date, filter);
                        const isSelected = selectedDate === cell.date;
                        const isOutsideJuly = cell.inMonth !== 'july';

                        return (
                          <button
                            key={cell.date}
                            type="button"
                            onClick={() => setSelectedDate(cell.date)}
                            aria-pressed={isSelected}
                            aria-label={`${formatDisplayDate(cell.date)}, ${dayEvents.length} events`}
                            className={`calendar-day group min-h-[92px] rounded-2xl border p-1.5 text-left transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:min-h-[108px] sm:p-2 ${
                              isSelected
                                ? 'border-indigo-300 bg-indigo-50/80 shadow-md ring-2 ring-indigo-200'
                                : 'border-slate-200/80 bg-white/70 hover:border-slate-300 hover:bg-white hover:shadow-sm'
                            } ${isOutsideJuly ? 'opacity-70' : ''}`}
                          >
                            <div className="mb-1 flex items-center justify-between">
                              <span
                                className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold sm:h-7 sm:w-7 sm:text-sm ${
                                  cell.inMonth === 'july'
                                    ? 'bg-slate-900 text-white'
                                    : 'bg-slate-200 text-slate-600'
                                }`}
                              >
                                {cell.day}
                              </span>
                              {dayEvents.length > 0 ? (
                                <span className="flex gap-0.5">
                                  {[...new Set(dayEvents.map((e) => e.owner))].map((owner) => (
                                    <span
                                      key={owner}
                                      className={`h-1.5 w-1.5 rounded-full ${ownerStyles[owner].dot}`}
                                    />
                                  ))}
                                </span>
                              ) : null}
                            </div>

                            <div className="space-y-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <EventChip key={event.id} event={event} compact />
                              ))}
                              {dayEvents.length > 2 ? (
                                <p className="text-[10px] font-medium text-slate-500">
                                  +{dayEvents.length - 2} more
                                </p>
                              ) : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <aside className="border-t border-slate-200/80 bg-slate-50/80 p-4 lg:border-l lg:border-t-0">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Day Details
            </h2>
            {selectedDate ? (
              <div className="mt-3 space-y-3">
                <div>
                  <p className="text-lg font-semibold text-slate-900">{selectedLabel}</p>
                  <p className="text-sm text-slate-500">
                    {selectedEvents.length}{' '}
                    {selectedEvents.length === 1 ? 'event' : 'events'} shown
                  </p>
                </div>

                {selectedEvents.length ? (
                  <ul className="space-y-2">
                    {selectedEvents.map((event) => (
                      <li
                        key={event.id}
                        className="rounded-2xl border border-white bg-white p-3 shadow-sm"
                      >
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${ownerStyles[event.owner].dot}`}
                          />
                          <div>
                            <p className="font-semibold text-slate-900">
                              {event.owner !== 'neutral' ? `${event.owner} · ` : ''}
                              {event.title}
                            </p>
                            {event.time ? (
                              <p className="text-sm text-slate-600">{event.time}</p>
                            ) : null}
                            {event.spanLabel ? (
                              <p className="mt-1 text-xs font-medium text-rose-600">
                                Part of {event.spanLabel}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-4 text-sm text-slate-500">
                    No events for this day with the current filter.
                  </p>
                )}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-500">Select a day to see details.</p>
            )}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Legend</p>
              <div className="mt-2 space-y-2 text-sm">
                {(['JK', 'CK', 'both', 'neutral'] as EventOwner[]).map((owner) => (
                  <div key={owner} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${ownerStyles[owner].dot}`} />
                    <span className="text-slate-700">{ownerStyles[owner].label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
