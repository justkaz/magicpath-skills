import { useEffect, useState } from 'react';
import type { DemoExample } from './pitchData';

export function ConversationDemo({ examples }: { examples: DemoExample[] }) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [paused, setPaused] = useState(false);
  const current = examples[index];

  useEffect(() => {
    setRevealed(false);
    const revealTimer = setTimeout(() => setRevealed(true), 500);
    return () => clearTimeout(revealTimer);
  }, [index]);

  useEffect(() => {
    if (paused) return;
    const advance = setInterval(() => {
      setIndex((i) => (i + 1) % examples.length);
    }, 4200);
    return () => clearInterval(advance);
  }, [paused, examples.length]);

  function go(delta: number) {
    setPaused(true);
    setIndex((i) => (i + delta + examples.length) % examples.length);
  }

  return (
    <div
      className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-sm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-2 border-b border-white/10 pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <p className="text-xs font-medium text-white/50">#team-chat</p>
      </div>

      <div className="min-h-[220px] py-4">
        <div key={current.id + '-prompt'} className="demo-fade-in flex justify-end">
          <div className="max-w-[85%] rounded-2xl rounded-tr-sm bg-indigo-500 px-4 py-2.5 text-sm text-white">
            {current.prompt}
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 text-[10px] font-bold text-white">
            @A
          </div>

          {revealed ? (
            <div className="demo-fade-in w-full max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-300">
                {current.appLabel}
              </p>
              <ul className="mt-2 space-y-1.5">
                {current.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="h-1 w-1 rounded-full bg-white/40" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40"
                  style={{ animationDelay: `${i * 120}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-3">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous example"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white active:scale-90"
        >
          ‹
        </button>
        <div className="flex gap-1.5">
          {examples.map((ex, i) => (
            <button
              key={ex.id}
              type="button"
              aria-label={`Show ${ex.appLabel}`}
              onClick={() => {
                setPaused(true);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next example"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white active:scale-90"
        >
          ›
        </button>
      </div>
    </div>
  );
}
