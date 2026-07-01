import { useEffect, useRef, useState } from 'react';
import { ConversationDemo } from './ConversationDemo';
import {
  CHANNELS,
  HERO_DEMOS,
  MODEL_LAYER,
  NAME_EXAMPLES,
  POSITIONING_OPTIONS,
  PROACTIVE_SCENARIOS,
  SECTIONS,
  SHIFT_ERAS,
} from './pitchData';

export const ActualPitch = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [positioningId, setPositioningId] = useState(POSITIONING_OPTIONS[0].id);
  const [scenarioId, setScenarioId] = useState(PROACTIVE_SCENARIOS[0].id);
  const [nameIndex, setNameIndex] = useState(0);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const scenario = PROACTIVE_SCENARIOS.find((s) => s.id === scenarioId)!;

  useEffect(() => {
    const cycle = setInterval(() => {
      setNameIndex((i) => (i + 1) % NAME_EXAMPLES.length);
    }, 2600);
    return () => clearInterval(cycle);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function registerRef(id: string) {
    return (el: HTMLElement | null) => {
      sectionRefs.current[id] = el;
    };
  }

  function scrollTo(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="actual-shell relative w-full bg-[#07070B] text-white">
      {/* Side scrollspy nav */}
      <nav
        aria-label="Section navigation"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex"
      >
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => scrollTo(s.id)}
            aria-label={`Go to ${s.label}`}
            aria-current={activeSection === s.id}
            className="group relative flex items-center justify-end"
          >
            <span
              className={`mr-3 whitespace-nowrap rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/70 opacity-0 transition-opacity group-hover:opacity-100 ${
                activeSection === s.id ? 'opacity-100' : ''
              }`}
            >
              {s.label}
            </span>
            <span
              className={`h-2 w-2 rounded-full transition-all ${
                activeSection === s.id
                  ? 'scale-125 bg-gradient-to-br from-violet-400 to-fuchsia-400'
                  : 'bg-white/25 group-hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={registerRef('hero')}
        className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-20"
      >
        <div className="actual-glow pointer-events-none absolute inset-0" />
        <div className="actual-grid pointer-events-none absolute inset-0 opacity-40" />

        <div className="relative z-10 mb-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60">
          An extension of MagicPath
        </div>

        <h1 className="actual-wordmark relative z-10 text-6xl font-bold tracking-tight sm:text-8xl">
          @Actual
        </h1>

        <p className="relative z-10 mt-6 max-w-2xl text-center text-xl text-white/70 sm:text-2xl">
          Every conversation can become the app.
        </p>
        <p className="relative z-10 mt-3 max-w-xl text-center text-sm text-white/40">
          The application layer for human conversation.
        </p>

        <div className="relative z-10 mt-12 flex w-full justify-center">
          <ConversationDemo examples={HERO_DEMOS} />
        </div>

        <button
          type="button"
          onClick={() => scrollTo('thesis')}
          className="relative z-10 mt-14 flex flex-col items-center gap-1 text-white/40 transition-colors hover:text-white/80"
        >
          <span className="text-[11px] uppercase tracking-widest">Scroll</span>
          <span className="animate-bounce text-lg">↓</span>
        </button>
      </section>

      {/* THESIS */}
      <section
        id="thesis"
        ref={registerRef('thesis')}
        className="flex min-h-[70vh] w-full items-center justify-center px-6 py-24"
      >
        <div className="max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
            Core Thesis
          </p>
          <p className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl">
            Computers used to require{' '}
            <span className="text-white/40 line-through">apps before conversations</span>.
          </p>
          <p className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            AI allows <span className="actual-underline">conversations to create apps</span>.
          </p>
          <p className="mx-auto mt-10 max-w-xl text-lg text-white/60">
            Not <span className="italic text-white/40">&ldquo;there&rsquo;s an app for that.&rdquo;</span>
          </p>
          <p className="mt-2 text-2xl font-medium text-white">
            Every conversation can become the app.
          </p>
        </div>
      </section>

      {/* THE SHIFT */}
      <section
        id="shift"
        ref={registerRef('shift')}
        className="flex min-h-screen w-full flex-col items-center justify-center border-t border-white/5 bg-white/[0.02] px-6 py-24"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
          The Shift
        </p>
        <h2 className="mt-4 max-w-2xl text-center text-3xl font-semibold sm:text-4xl">
          We&rsquo;ve gone through several interfaces.
        </h2>

        <div className="mt-14 flex w-full max-w-4xl flex-col gap-3">
          {SHIFT_ERAS.map((item, i) => (
            <div
              key={item.era}
              className={`flex items-center gap-6 rounded-2xl border px-6 py-4 transition-colors ${
                item.highlight
                  ? 'border-fuchsia-400/40 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15'
                  : 'border-white/10 bg-white/[0.02]'
              }`}
            >
              <span className="w-8 shrink-0 text-sm text-white/30">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`w-32 shrink-0 text-lg font-semibold ${
                  item.highlight ? 'text-white' : 'text-white/80'
                }`}
              >
                {item.era}
              </span>
              <span className="hidden text-white/20 sm:block">→</span>
              <span className={`flex-1 ${item.highlight ? 'text-fuchsia-200' : 'text-white/50'}`}>
                {item.result}
              </span>
              {item.highlight && (
                <span className="shrink-0 rounded-full bg-fuchsia-400/20 px-3 py-1 text-xs font-semibold text-fuchsia-200">
                  You are here
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-center text-white/50">
          Actual isn&rsquo;t another chatbot. It sits <span className="text-white">inside</span>{' '}
          conversations that are already happening.
        </p>
      </section>

      {/* SPEED INSIGHT */}
      <section
        id="insight"
        ref={registerRef('insight')}
        className="flex min-h-[80vh] w-full flex-col items-center justify-center px-6 py-24"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
          The Real Insight
        </p>
        <h2 className="mt-4 max-w-2xl text-center text-3xl font-semibold sm:text-4xl">
          It isn&rsquo;t AI. It&rsquo;s <span className="actual-underline">speed</span>.
        </h2>

        <div className="mt-14 grid w-full max-w-3xl gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Before</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white/60">
              <span className="rounded-full bg-white/10 px-3 py-1">You ask</span>
              <span className="text-white/20">→</span>
              <span className="rounded-full bg-white/10 px-3 py-1">You wait</span>
              <span className="text-white/20">→</span>
              <span className="rounded-full bg-white/10 px-3 py-1">You switch context</span>
            </div>
            <p className="mt-4 text-sm text-white/40">Feels like a search engine.</p>
          </div>
          <div className="rounded-2xl border border-fuchsia-400/30 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-fuchsia-300">Now</p>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-white">
              <span className="rounded-full bg-white/15 px-3 py-1">You ask</span>
              <span className="text-fuchsia-300">→</span>
              <span className="rounded-full bg-white/15 px-3 py-1">It responds instantly</span>
            </div>
            <p className="mt-4 text-sm text-fuchsia-200">
              Feels like another participant in the conversation.
            </p>
          </div>
        </div>

        <p className="mt-10 max-w-xl text-center text-lg text-white/70">
          The conversation becomes <span className="text-white">the operating system</span>.
        </p>
      </section>

      {/* POSITIONING */}
      <section
        id="positioning"
        ref={registerRef('positioning')}
        className="flex min-h-[75vh] w-full flex-col items-center justify-center border-t border-white/5 bg-white/[0.02] px-6 py-24"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
          Positioning
        </p>
        <h2 className="mt-4 max-w-2xl text-center text-3xl font-semibold sm:text-4xl">
          Not &ldquo;AI that builds apps.&rdquo;
        </h2>

        <div className="mt-10 flex w-full max-w-2xl flex-col gap-3">
          {POSITIONING_OPTIONS.map((opt) => {
            const isActive = positioningId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPositioningId(opt.id)}
                aria-pressed={isActive}
                className={`rounded-2xl border px-6 py-4 text-left text-lg font-medium transition-all ${
                  isActive
                    ? 'border-fuchsia-400/50 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white'
                    : 'border-white/10 bg-transparent text-white/50 hover:border-white/20 hover:text-white/80'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* MESSAGING EVERYWHERE */}
      <section
        id="messaging"
        ref={registerRef('messaging')}
        className="flex min-h-[80vh] w-full flex-col items-center justify-center px-6 py-24"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
          Why Messaging Matters
        </p>
        <h2 className="mt-4 max-w-2xl text-center text-3xl font-semibold sm:text-4xl">
          Slack is only one distribution point.
        </h2>

        <div className="mt-10 flex max-w-2xl flex-wrap justify-center gap-3">
          {CHANNELS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/70"
            >
              {c}
            </span>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-4 text-center">
            <p className="text-xs uppercase tracking-wide text-white/30">Old model</p>
            <p className="mt-1 font-mono text-lg text-white/40 line-through">Open Actual</p>
          </div>
          <span className="text-2xl text-fuchsia-400">→</span>
          <div className="rounded-2xl border border-fuchsia-400/40 bg-gradient-to-r from-violet-500/15 to-fuchsia-500/15 px-6 py-4 text-center">
            <p className="text-xs uppercase tracking-wide text-fuchsia-200">The interface</p>
            <p className="mt-1 font-mono text-lg text-white">@Actual</p>
          </div>
        </div>

        <p className="mt-14 max-w-lg text-center text-white/50">
          Midjourney succeeded because everyone watched everyone else using it.{' '}
          <span className="text-white">Actual could have the same property</span> &mdash; the
          product teaches itself.
        </p>
      </section>

      {/* PRODUCT PRINCIPLE */}
      <section
        id="principle"
        ref={registerRef('principle')}
        className="flex min-h-screen w-full flex-col items-center justify-center border-t border-white/5 bg-white/[0.02] px-6 py-24"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
          Product Principle
        </p>
        <h2 className="mt-4 max-w-2xl text-center text-3xl font-semibold sm:text-4xl">
          It shouldn&rsquo;t wait for instructions.
        </h2>
        <p className="mt-2 text-lg text-white/50">It should participate.</p>

        <div className="mt-10 flex gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          {PROACTIVE_SCENARIOS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setScenarioId(s.id)}
              aria-pressed={scenarioId === s.id}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                scenarioId === s.id ? 'bg-white text-[#07070B]' : 'text-white/60 hover:text-white'
              }`}
            >
              {s.trigger}
            </button>
          ))}
        </div>

        <div
          key={scenario.id}
          className="demo-fade-in mt-8 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 text-[10px] font-bold text-white">
              @A
            </div>
            <p className="text-sm text-white/80">{scenario.message}</p>
          </div>
          <ul className="mt-4 space-y-2 pl-11">
            {scenario.items.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 max-w-md text-center text-sm text-white/40">
          No installation. No IDE. No prompting knowledge &mdash; that&rsquo;s why conversational
          software can spread beyond developers.
        </p>
      </section>

      {/* LONG-TERM VISION */}
      <section
        id="vision"
        ref={registerRef('vision')}
        className="flex min-h-[85vh] w-full flex-col items-center justify-center px-6 py-24"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
          Long-Term Vision
        </p>
        <h2 className="mt-4 max-w-2xl text-center text-3xl font-semibold sm:text-4xl">
          The universal application layer.
        </h2>

        <div className="mt-14 flex w-full max-w-md flex-col items-center gap-3">
          <div className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-center text-sm text-white/50">
            Conversations everywhere
          </div>
          <span className="text-white/20">↓</span>
          <div className="w-full rounded-2xl border border-fuchsia-400/40 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 px-6 py-4 text-center text-lg font-semibold text-white">
            @Actual
          </div>
          <span className="text-white/20">↓</span>
          <div className="grid w-full grid-cols-2 gap-2">
            {MODEL_LAYER.map((m) => (
              <div
                key={m}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-sm text-white/50"
              >
                {m}
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 max-w-lg text-center text-white/60">
          Users shouldn&rsquo;t care which model produced the answer. Actual becomes an{' '}
          <span className="text-white">aggregator</span>, not another foundation model.
        </p>
      </section>

      {/* WHY THE NAME */}
      <section
        id="name"
        ref={registerRef('name')}
        className="flex min-h-[70vh] w-full flex-col items-center justify-center border-t border-white/5 bg-white/[0.02] px-6 py-24"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-400">
          Why &ldquo;Actual&rdquo;
        </p>
        <h2 className="mt-4 max-w-2xl text-center text-3xl font-semibold sm:text-4xl">
          It behaves like another participant.
        </h2>

        <div className="mt-10 flex h-16 w-full max-w-sm items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <p key={nameIndex} className="demo-fade-in font-mono text-xl text-white">
            {NAME_EXAMPLES[nameIndex]}
          </p>
        </div>

        <p className="mt-8 max-w-md text-center text-sm text-white/40">
          On phones, &ldquo;Actual&rdquo; also sorts near the top of contact lists &mdash; it can
          feel like a built-in contact people reach for instinctively.
        </p>
      </section>

      {/* CLOSE */}
      <section
        id="close"
        ref={registerRef('close')}
        className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        <div className="actual-glow pointer-events-none absolute inset-0" />
        <p className="relative z-10 max-w-3xl text-center text-3xl font-semibold leading-tight sm:text-5xl">
          The next generation of software won&rsquo;t be opened&mdash;
          <span className="actual-underline">it will emerge from conversation</span>.
        </p>
        <p className="relative z-10 mt-8 max-w-2xl text-center text-lg text-white/60">
          Actual is the platform that makes that happen.
        </p>

        <div className="relative z-10 mt-14 flex flex-col items-center gap-4">
          <div className="rounded-full border border-fuchsia-400/40 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 px-8 py-3 font-mono text-xl text-white">
            @Actual
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
            An extension of MagicPath
          </p>
        </div>
      </section>
    </div>
  );
};
