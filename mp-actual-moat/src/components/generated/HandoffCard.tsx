import { useState } from 'react';
import { CONTEXT_PACKET_FIELDS, HANDOFF_OPTIONS } from './moatData';

export function HandoffCard() {
  const [selected, setSelected] = useState<string | null>(null);
  const option = HANDOFF_OPTIONS.find((o) => o.id === selected);

  return (
    <div className="grid w-full gap-5 md:grid-cols-[1fr_1.1fr]">
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
          Context packet
        </p>
        <ul className="mt-3 space-y-1.5">
          {CONTEXT_PACKET_FIELDS.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-white/60">
              <span className="h-1 w-1 rounded-full bg-cyan-400/60" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-cyan-300">
          Hand it off
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {HANDOFF_OPTIONS.map((o) => (
            <button
              key={o.id}
              type="button"
              onClick={() => setSelected(o.id)}
              aria-pressed={selected === o.id}
              className={`rounded-xl border px-3 py-2 text-left text-xs font-medium transition-colors ${
                selected === o.id
                  ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200'
                  : 'border-white/10 bg-transparent text-white/60 hover:border-white/25 hover:text-white/90'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex min-h-[52px] items-center rounded-xl bg-black/30 px-4 py-3">
          {option ? (
            <p className="net-fade-in text-sm text-white/70">
              <span className="font-mono font-semibold text-cyan-300">{option.label}</span>{' '}
              &rarr; {option.destination}, full context preserved.
            </p>
          ) : (
            <p className="text-sm text-white/30">Select a destination to preview the handoff.</p>
          )}
        </div>
      </div>
    </div>
  );
}
