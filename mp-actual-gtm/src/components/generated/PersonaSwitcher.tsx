import { useState } from 'react';
import { PERSONAS } from './gtmData';

export function PersonaSwitcher() {
  const [activeId, setActiveId] = useState(PERSONAS[0].id);
  const active = PERSONAS.find((p) => p.id === activeId)!;

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActiveId(p.id)}
            aria-pressed={activeId === p.id}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              activeId === p.id
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
            }`}
          >
            {p.name}
            {p.isSecondary && (
              <span className="ml-1.5 text-[10px] font-normal opacity-70">(gatekeeper)</span>
            )}
          </button>
        ))}
      </div>

      <div key={active.id} className="gtm-fade-in rounded-3xl border border-slate-200 bg-white p-6 text-left sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <p className="text-2xl font-bold text-slate-900">{active.name}</p>
            <p className="text-sm font-medium text-indigo-600">{active.title}</p>
          </div>
          <p className="text-sm text-slate-400">{active.company}</p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Pain</p>
            <p className="mt-1.5 text-sm text-slate-600">{active.pain}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Why they buy
            </p>
            <p className="mt-1.5 text-sm text-slate-600">{active.buys}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-indigo-50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-400">
            The &ldquo;aha&rdquo; moment
          </p>
          <p className="mt-1.5 text-sm text-indigo-900">{active.aha}</p>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4">
          <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
            Messaging
          </p>
          <p className="mt-1.5 text-base font-medium text-slate-800">
            &ldquo;{active.messaging}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
