import { useMemo, useState } from 'react';
import { MARKET_MAP, PRIORITY_ORDER, type Priority } from './gtmData';

const PRIORITY_STYLE: Record<Priority, string> = {
  'Very high': 'bg-emerald-100 text-emerald-700',
  High: 'bg-blue-100 text-blue-700',
  'Medium-high': 'bg-teal-100 text-teal-700',
  Medium: 'bg-amber-100 text-amber-700',
  'Medium-long-term': 'bg-amber-100 text-amber-700',
  'Later / cautious': 'bg-orange-100 text-orange-700',
  'Lower priority': 'bg-slate-200 text-slate-600',
};

export function MarketMapTable() {
  const [activeFilter, setActiveFilter] = useState<Priority | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const rows = useMemo(
    () => MARKET_MAP.filter((r) => activeFilter === 'all' || r.priority === activeFilter),
    [activeFilter],
  );

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          aria-pressed={activeFilter === 'all'}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
            activeFilter === 'all'
              ? 'border-slate-900 bg-slate-900 text-white'
              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
          }`}
        >
          All segments
        </button>
        {PRIORITY_ORDER.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setActiveFilter(p)}
            aria-pressed={activeFilter === p}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeFilter === p
                ? 'border-slate-900 bg-slate-900 text-white'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[1.6fr_1fr_2.2fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Segment</span>
          <span>Priority</span>
          <span className="hidden sm:block">First use case</span>
        </div>
        <div className="divide-y divide-slate-100">
          {rows.map((row) => {
            const isOpen = expanded === row.segment;
            return (
              <div key={row.segment}>
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : row.segment)}
                  aria-expanded={isOpen}
                  className="grid w-full grid-cols-[1.6fr_1fr_2.2fr] items-center gap-4 px-5 py-3.5 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="text-sm font-medium text-slate-900">{row.segment}</span>
                  <span
                    className={`w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${PRIORITY_STYLE[row.priority]}`}
                  >
                    {row.priority}
                  </span>
                  <span className="hidden truncate text-sm text-slate-500 sm:block">
                    {row.useCase}
                  </span>
                </button>
                {isOpen && (
                  <div className="gtm-fade-in grid grid-cols-1 gap-3 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        Why it matters
                      </p>
                      <p className="mt-1 text-sm text-slate-600">{row.why}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                        GTM motion
                      </p>
                      <p className="mt-1 text-sm text-slate-600">{row.motion}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
