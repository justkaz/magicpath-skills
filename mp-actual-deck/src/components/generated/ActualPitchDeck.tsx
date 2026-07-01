import { useEffect, useRef, useState } from 'react';
import { RefinementDemo } from './RefinementDemo';
import {
  BRAND_ARCHITECTURE,
  ERA_TIMELINE,
  EXPANSION_CHANNELS,
  GROWTH_MODEL,
  LATENT_REQUESTS,
  MEMORY_COLUMNS,
  MODEL_LAYER,
  ONE_LINERS,
  SCATTERED_INTENT,
  SLIDES,
  SPEED_CONTRAST,
} from './deckData';

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#FF6B35]">{children}</p>
  );
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="deck-heading mt-3 text-4xl font-bold leading-[1.05] text-[#171412] sm:text-5xl">
      {children}
    </h2>
  );
}

export const ActualPitchDeck = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [oneLinerIndex, setOneLinerIndex] = useState(0);

  const last = SLIDES.length - 1;

  function go(delta: number) {
    setIndex((i) => Math.min(last, Math.max(0, i + delta)));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 60) go(delta < 0 ? 1 : -1);
    touchStartX.current = null;
  }

  return (
    <div
      ref={containerRef}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      className="deck-shell relative flex h-screen w-full flex-col overflow-hidden bg-[#FBF7F0] text-[#171412] outline-none"
    >
      {/* Progress bar */}
      <div className="absolute left-0 top-0 z-30 h-1 w-full bg-[#171412]/5">
        <div
          className="h-full bg-[#FF6B35] transition-all duration-300"
          style={{ width: `${((index + 1) / SLIDES.length) * 100}%` }}
        />
      </div>

      {/* Header */}
      <header className="relative z-20 flex items-center justify-between px-8 pt-6">
        <span className="font-mono text-sm font-bold tracking-tight">@Actual</span>
        <div className="hidden items-center gap-1.5 sm:flex">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to ${s.label}`}
              aria-current={index === i}
              className="group relative"
            >
              <span
                className={`block h-1.5 rounded-full transition-all ${
                  index === i ? 'w-6 bg-[#171412]' : 'w-1.5 bg-[#171412]/15 group-hover:bg-[#171412]/40'
                }`}
              />
            </button>
          ))}
        </div>
        <span className="font-mono text-xs text-[#171412]/40">
          {String(index + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
        </span>
      </header>

      {/* Slide content */}
      <main className="relative z-10 flex flex-1 items-center justify-center overflow-y-auto px-8 py-8">
        <div key={SLIDES[index].id} className="deck-slide-in flex w-full max-w-5xl flex-col items-center text-center">
          {/* 0: HOOK */}
          {index === 0 && (
            <>
              <Kicker>Pitch — Actual</Kicker>
              <h1 className="deck-heading mt-4 text-6xl font-bold leading-[1.02] sm:text-7xl">
                The App Layer for
                <br />
                Every Conversation
              </h1>
              <p className="mt-6 max-w-xl text-lg text-[#171412]/60">
                Software still starts in the wrong place. The intent, the context, and the
                people are already in the conversation.
              </p>
              <div className="mt-10 flex flex-col items-center gap-2">
                <div className="rounded-2xl border-2 border-[#171412] bg-white px-8 py-4 font-mono text-2xl">
                  @Actual, make this real.
                </div>
                <p className="text-sm text-[#171412]/40">spoken: &ldquo;atActual&rdquo;</p>
              </div>
            </>
          )}

          {/* 1: PROBLEM */}
          {index === 1 && (
            <>
              <Kicker>The Problem</Kicker>
              <SlideTitle>
                Software begins after the highest-context moment has already passed.
              </SlideTitle>
              <div className="mt-10 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SCATTERED_INTENT.map((item) => (
                  <div
                    key={item.app}
                    className="rounded-2xl border border-[#171412]/10 bg-white p-4 text-left"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#FF6B35]">
                      {item.app}
                    </p>
                    <p className="mt-2 text-sm text-[#171412]/70">&ldquo;{item.quote}&rdquo;</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-lg text-[#171412]/60">
                That context dies in the thread. <span className="font-semibold text-[#171412]">Actual removes the translation layer.</span>
              </p>
            </>
          )}

          {/* 2: INSIGHT */}
          {index === 2 && (
            <>
              <Kicker>The Insight</Kicker>
              <SlideTitle>Conversation is the new command line.</SlideTitle>
              <div className="mt-10 flex w-full max-w-3xl flex-col gap-2">
                {ERA_TIMELINE.map((e) => (
                  <div
                    key={e.era}
                    className={`flex items-center gap-4 rounded-2xl border px-5 py-3 text-left ${
                      e.highlight
                        ? 'border-[#FF6B35] bg-[#FF6B35]/10'
                        : 'border-[#171412]/10 bg-white'
                    }`}
                  >
                    <span className={`w-32 shrink-0 font-semibold ${e.highlight ? 'text-[#B8461F]' : ''}`}>
                      {e.era}
                    </span>
                    <span className="text-[#171412]/30">→</span>
                    <span className="text-sm text-[#171412]/60">{e.mode}</span>
                    {e.highlight && (
                      <span className="ml-auto shrink-0 rounded-full bg-[#FF6B35] px-3 py-1 text-xs font-semibold text-white">
                        Multiplayer
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-lg text-lg text-[#171412]/60">
                The model shouldn&rsquo;t wait inside a separate app. It should{' '}
                <span className="font-semibold text-[#171412]">enter the room.</span>
              </p>
            </>
          )}

          {/* 3: WHY NOW */}
          {index === 3 && (
            <>
              <Kicker>Why Now</Kicker>
              <SlideTitle>The visual cursor moment.</SlideTitle>
              <div className="mt-10 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#171412]/10 bg-white p-6 text-left">
                  <p className="text-xs font-bold uppercase text-[#171412]/40">
                    {SPEED_CONTRAST.before.label}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-[#171412]/60">
                    {SPEED_CONTRAST.before.steps.map((s) => (
                      <li key={s}>→ {s}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-medium text-[#171412]/40">
                    {SPEED_CONTRAST.before.result}
                  </p>
                </div>
                <div className="rounded-2xl border-2 border-[#FF6B35] bg-[#FF6B35]/10 p-6 text-left">
                  <p className="text-xs font-bold uppercase text-[#B8461F]">
                    {SPEED_CONTRAST.now.label}
                  </p>
                  <ul className="mt-3 space-y-1.5 text-sm text-[#171412]/80">
                    {SPEED_CONTRAST.now.steps.map((s) => (
                      <li key={s}>→ {s}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-semibold text-[#B8461F]">
                    {SPEED_CONTRAST.now.result}
                  </p>
                </div>
              </div>
              <p className="mt-8 max-w-lg text-lg text-[#171412]/60">
                The cursor made text creation feel live. <span className="font-semibold text-[#171412]">Actual makes app creation feel live.</span>
              </p>
            </>
          )}

          {/* 4: DEMO */}
          {index === 4 && (
            <>
              <Kicker>The Killer Use Case</Kicker>
              <SlideTitle>&ldquo;Make this real.&rdquo;</SlideTitle>
              <div className="mt-8 w-full">
                <RefinementDemo />
              </div>
            </>
          )}

          {/* 5: WEDGE */}
          {index === 5 && (
            <>
              <Kicker>The Wedge</Kicker>
              <SlideTitle>Start with Slack. Don&rsquo;t become &ldquo;a Slackbot.&rdquo;</SlideTitle>
              <div className="mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
                {LATENT_REQUESTS.map((r) => (
                  <span
                    key={r}
                    className="rounded-full border border-[#171412]/10 bg-white px-4 py-1.5 text-sm text-[#171412]/70"
                  >
                    {r}
                  </span>
                ))}
              </div>
              <p className="mt-8 max-w-lg text-lg text-[#171412]/60">
                The category is not Slackbot. The category is{' '}
                <span className="font-semibold text-[#171412]">the app layer for conversation.</span>
              </p>
            </>
          )}

          {/* 6: DISCORD / EXPANSION */}
          {index === 6 && (
            <>
              <Kicker>Expansion & Distribution</Kicker>
              <SlideTitle>Actual should live wherever groups already talk.</SlideTitle>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {EXPANSION_CHANNELS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[#171412]/10 bg-white px-4 py-1.5 text-sm text-[#171412]/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
                <div className="rounded-2xl border border-[#171412]/10 bg-white px-6 py-3 text-center">
                  <p className="text-xs uppercase text-[#171412]/40">Old model</p>
                  <p className="mt-1 font-medium text-[#171412]/40 line-through">Software you install</p>
                </div>
                <span className="text-xl text-[#FF6B35]">→</span>
                <div className="rounded-2xl border-2 border-[#FF6B35] bg-[#FF6B35]/10 px-6 py-3 text-center">
                  <p className="text-xs uppercase text-[#B8461F]">Actual</p>
                  <p className="mt-1 font-semibold text-[#171412]">Someone you invite</p>
                </div>
              </div>
              <p className="mt-8 max-w-lg text-base text-[#171412]/50">
                Midjourney grew because usage was <span className="font-semibold text-[#171412]">visible</span> — people watched
                others create and copied the behavior. A public Discord can teach Actual the same way.
              </p>
            </>
          )}

          {/* 7: BRAND */}
          {index === 7 && (
            <>
              <Kicker>The Brand</Kicker>
              <SlideTitle>Before Actual: &ldquo;we talked about it.&rdquo;</SlideTitle>
              <p className="mt-2 text-2xl font-semibold text-[#B8461F]">
                After Actual: &ldquo;it became actual.&rdquo;
              </p>

              <div className="mt-8 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                {BRAND_ARCHITECTURE.map((b) => (
                  <div
                    key={b.role}
                    className="rounded-2xl border border-[#171412]/10 bg-white px-5 py-3 text-left"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wide text-[#171412]/40">
                      {b.role}
                    </p>
                    <p className="mt-0.5 font-mono text-base font-semibold">{b.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {ONE_LINERS.map((line, i) => (
                  <button
                    key={line.text}
                    type="button"
                    onClick={() => setOneLinerIndex(i)}
                    aria-pressed={oneLinerIndex === i}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                      oneLinerIndex === i
                        ? 'border-[#FF6B35] bg-[#FF6B35] text-white'
                        : 'border-[#171412]/10 bg-white text-[#171412]/60 hover:border-[#171412]/30'
                    }`}
                  >
                    {line.text}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* 8: MOAT */}
          {index === 8 && (
            <>
              <Kicker>The Moat</Kicker>
              <SlideTitle>Not the first generated app. The conversation memory graph.</SlideTitle>
              <div className="mt-10 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
                {MEMORY_COLUMNS.map((col) => (
                  <div key={col.title} className="rounded-2xl border border-[#171412]/10 bg-white p-6 text-left">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#FF6B35]">
                      {col.title}
                    </p>
                    <ul className="mt-3 space-y-1.5">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-[#171412]/70">
                          <span className="h-1 w-1 rounded-full bg-[#171412]/30" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-8 max-w-lg text-lg text-[#171412]/60">
                A generic model can answer a prompt.{' '}
                <span className="font-semibold text-[#171412]">Actual can understand the room.</span>
              </p>
            </>
          )}

          {/* 9: GROWTH & PLATFORM */}
          {index === 9 && (
            <>
              <Kicker>Growth &amp; Platform</Kicker>
              <SlideTitle>Subsidize social proof. Monetize memory.</SlideTitle>
              <div className="mt-8 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
                <div className="rounded-2xl border border-[#171412]/10 bg-white p-5 text-left">
                  <p className="text-xs font-bold uppercase text-emerald-600">{GROWTH_MODEL.free.label}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-[#171412]/60">
                    {GROWTH_MODEL.free.items.map((i) => (
                      <li key={i}>· {i}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border-2 border-[#171412] bg-white p-5 text-left">
                  <p className="text-xs font-bold uppercase text-[#171412]">{GROWTH_MODEL.paid.label}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-[#171412]/70">
                    {GROWTH_MODEL.paid.items.map((i) => (
                      <li key={i}>· {i}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="rounded-2xl border-2 border-[#FF6B35] bg-[#FF6B35]/10 px-6 py-3 font-semibold text-[#B8461F]">
                  @Actual
                </div>
                <span className="text-[#171412]/20">↓ routes to</span>
                <div className="flex flex-wrap justify-center gap-2">
                  {MODEL_LAYER.map((m) => (
                    <span
                      key={m}
                      className="rounded-full border border-[#171412]/10 bg-white px-3 py-1.5 text-xs text-[#171412]/60"
                    >
                      {m}
                    </span>
                  ))}
                </div>
                <p className="mt-3 max-w-md text-sm text-[#171412]/50">
                  The models provide capability. Actual owns context, collaboration, memory, and
                  distribution.
                </p>
              </div>
            </>
          )}

          {/* 10: CLOSE */}
          {index === 10 && (
            <>
              <Kicker>Final Pitch</Kicker>
              <SlideTitle>The next era is not another app.</SlideTitle>
              <p className="mt-4 max-w-2xl text-lg text-[#171412]/60">
                It is the conversation you are already having. The wedge is instant app creation.
                The moat is cross-conversation memory. The platform is the visual layer above
                every model.
              </p>

              <div className="mt-10 rounded-2xl border-2 border-[#171412] bg-white px-10 py-6 font-mono text-3xl font-bold">
                @Actual, make this real.
              </div>

              <div className="mt-8 flex items-center gap-3 rounded-full bg-[#171412] px-5 py-2 text-white">
                <span className="text-xs uppercase tracking-widest text-white/50">North star</span>
                <span className="text-sm font-medium">Time from shared intent → working software, approaching zero.</span>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Nav arrows */}
      <button
        type="button"
        onClick={() => go(-1)}
        disabled={index === 0}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#171412]/10 bg-white text-lg text-[#171412]/60 shadow-sm transition-opacity hover:bg-[#171412] hover:text-white disabled:opacity-0"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        disabled={index === last}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#171412]/10 bg-white text-lg text-[#171412]/60 shadow-sm transition-opacity hover:bg-[#171412] hover:text-white disabled:opacity-0"
      >
        ›
      </button>

      {/* Footer label */}
      <footer className="relative z-20 flex justify-center pb-5">
        <span className="text-xs uppercase tracking-[0.25em] text-[#171412]/30">
          {SLIDES[index].label}
        </span>
      </footer>
    </div>
  );
};
