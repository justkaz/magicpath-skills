import { useEffect, useMemo, useRef, useState } from 'react';
import { EVENTS, formatDisplayDate, MONTH_LABEL, PersonFilter, YEAR, ownerMatchesFilter, type EventOwner } from './calendarData';
const dot: Record<EventOwner, string> = {
  JK: 'bg-indigo-500',
  CK: 'bg-rose-500',
  both: 'bg-violet-500',
  neutral: 'bg-slate-400'
};
const ring: Record<EventOwner, string> = {
  JK: 'ring-indigo-200',
  CK: 'ring-rose-200',
  both: 'ring-violet-200',
  neutral: 'ring-slate-200'
};
function groupByDate() {
  const map = new Map<string, typeof EVENTS>();
  for (const e of EVENTS) {
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date)!.push(e);
  }
  return [...map.entries()].sort(([a], [b]) => a > b ? 1 : -1);
}
function getTodayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
export const M5Timeline = () => {
  const groups = useMemo(() => groupByDate(), []);
  const todayKey = useMemo(() => getTodayKey(), []);
  const hasToday = useMemo(() => groups.some(([date]) => date === todayKey), [groups, todayKey]);
  const [filter, setFilter] = useState<PersonFilter>('all');
  const [active, setActive] = useState<string | null>(hasToday ? todayKey : null);
  const todayRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    todayRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }, []);
  return <div className="m5-shell mx-auto flex w-full max-w-md flex-col bg-white">
      <header className="sticky top-0 z-10 bg-white/95 px-5 pb-4 pt-6 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            {MONTH_LABEL} <span className="text-slate-300">{YEAR}</span>
          </h1>
          {hasToday && <button type="button" onClick={() => {
          setActive(todayKey);
          todayRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }} className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 active:scale-95">
            
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Today
            </button>}
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {(['all', 'JK', 'CK'] as PersonFilter[]).map(f => <button key={f} type="button" onClick={() => {
          setFilter(f);
          setActive(hasToday ? todayKey : null);
        }} aria-pressed={filter === f} className={`min-h-[34px] shrink-0 rounded-full px-4 text-xs font-semibold transition-colors active:scale-95 ${filter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'}`}>
            
              {f === 'all' ? 'Everyone' : f}
            </button>)}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-8">
        <div className="relative ml-3 border-l-2 border-slate-100 pl-6">
          {groups.map(([date, events]) => {
          const visible = events.filter(e => ownerMatchesFilter(e.owner, filter));
          if (visible.length === 0) return null;
          const isActive = active === date;
          const isToday = date === todayKey;
          const dayNum = Number(date.slice(-2));
          return <div key={date} ref={isToday ? todayRef : undefined} className="relative pb-6">
                
                {isToday && <span className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center">
                    <span className="absolute h-6 w-6 animate-ping rounded-full bg-amber-300/70" />
                  </span>}
                <span className={`absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ${isToday ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-white' : 'ring-4 ring-white'} ${visible.length ? dot[visible[0].owner] : 'bg-slate-300'}`}>
                  
                  {dayNum}
                </span>

                <button type="button" onClick={() => setActive(isActive ? null : date)} aria-expanded={isActive} className="flex w-full items-center gap-2 text-left">
                  
                  <p className="text-sm font-semibold text-slate-900">
                    {formatDisplayDate(date).split(',')[0]}
                  </p>
                  {isToday && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                      Today
                    </span>}
                </button>

                <div className="mt-2 space-y-2">
                  {visible.slice(0, isActive ? undefined : 2).map(e => <div key={e.id} className={`rounded-2xl bg-slate-50 p-3 ring-1 ${ring[e.owner]}`}>
                    
                      <p className="text-sm font-medium text-slate-800">{e.title}</p>
                      {e.time && <p className="text-xs text-slate-400">{e.time}</p>}
                    </div>)}
                  {!isActive && visible.length > 2 && <button type="button" onClick={() => setActive(date)} className="text-xs font-semibold text-slate-400 active:text-slate-600">
                    
                      +{visible.length - 2} more
                    </button>}
                </div>
              </div>;
        })}
        </div>
      </div>
    </div>;
};