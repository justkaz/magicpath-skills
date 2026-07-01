import { useState } from 'react';
import { REFINEMENT_STEPS } from './deckData';

export function RefinementDemo() {
  const [step, setStep] = useState(0);
  const current = REFINEMENT_STEPS[step];
  const seen = REFINEMENT_STEPS.slice(0, step + 1);

  return (
    <div className="grid w-full max-w-4xl gap-5 md:grid-cols-[1.1fr_1fr]">
      {/* Conversation thread */}
      <div className="rounded-3xl border border-[#171412]/10 bg-white p-5">
        <div className="mb-3 flex items-center gap-2 border-b border-[#171412]/10 pb-3">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-semibold text-[#171412]/50">#launch-planning</p>
        </div>

        <div className="max-h-[280px] space-y-3 overflow-y-auto pr-1">
          {seen.map((s, i) => (
            <div key={s.id} className="deck-fade-in flex justify-end">
              <div className="max-w-[90%] rounded-2xl rounded-tr-sm bg-[#171412] px-3.5 py-2 text-sm text-white">
                {i === 0 ? s.command : <span className="font-medium">{s.command}</span>}
              </div>
            </div>
          ))}

          <div className="flex items-start gap-2">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B35] text-[9px] font-bold text-white">
              @A
            </div>
            <div className="rounded-2xl rounded-tl-sm border border-[#171412]/10 bg-[#FBF7F0] px-3.5 py-2 text-sm text-[#171412]/80">
              {step === 0
                ? 'I can turn this into a launch page, announcement email, LinkedIn post, and checklist. Want all four?'
                : `Updated. Here's ${current.preview.title.toLowerCase()}.`}
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 border-t border-[#171412]/10 pt-4">
          {REFINEMENT_STEPS.map((s, i) => {
            if (i === 0) return null;
            const isDone = i <= step;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setStep(i)}
                disabled={isDone}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isDone
                    ? 'border-[#171412]/10 bg-[#171412]/5 text-[#171412]/30'
                    : 'border-[#FF6B35]/40 bg-[#FF6B35]/10 text-[#B8461F] hover:bg-[#FF6B35]/20 active:scale-95'
                }`}
              >
                {s.command}
              </button>
            );
          })}
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="ml-auto rounded-full px-3 py-1.5 text-xs font-medium text-[#171412]/40 hover:text-[#171412]"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Live preview */}
      <div
        key={current.id}
        className="deck-fade-in flex flex-col rounded-3xl border-2 border-[#171412] bg-white p-5"
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#FF6B35]">
          Live preview
        </p>
        <p className="mt-1 text-lg font-bold text-[#171412]">{current.preview.title}</p>
        <span className="mt-1 inline-block w-fit rounded-full bg-[#171412]/5 px-2.5 py-0.5 text-[11px] font-medium text-[#171412]/60">
          {current.preview.tag}
        </span>
        <ul className="mt-4 space-y-2">
          {current.preview.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm text-[#171412]/75">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#FF6B35]" />
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-auto pt-4 text-[11px] text-[#171412]/35">
          No prompt engineering. No blank canvas. Just the thread.
        </p>
      </div>
    </div>
  );
}
