import { useEffect, useRef, useState } from 'react';
import { Citation } from './Citation';
import { HandoffCard } from './HandoffCard';
import { NetworkDiagram } from './NetworkDiagram';
import {
  ADOPTION_LADDER,
  GTM_MESSAGES,
  INTENT_SOURCES,
  MEMORY_GRAPH,
  OPINIONATED_LINES,
  PRODUCT_IMPLICATIONS,
  REFERENCES,
  RYAN_PERSONA,
  SECTIONS,
  SILO_AGENTS,
  WHY_AGGREGATORS_WIN,
} from './moatData';

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">{children}</p>
  );
}

export const ActualAggregatorMoat = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeLevel, setActiveLevel] = useState(1);
  const [activeReason, setActiveReason] = useState(WHY_AGGREGATORS_WIN[0].id);
  const [activeMemory, setActiveMemory] = useState(MEMORY_GRAPH[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
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

  const reason = WHY_AGGREGATORS_WIN.find((r) => r.id === activeReason)!;
  const memory = MEMORY_GRAPH.find((m) => m.id === activeMemory)!;
  const level = ADOPTION_LADDER.find((l) => l.level === activeLevel)!;

  return (
    <div className="moat-shell relative w-full bg-[#0A0E1A] text-white">
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
            aria-current={activeSection === s.id}
            className="group flex items-center justify-end"
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
                activeSection === s.id ? 'scale-125 bg-cyan-400' : 'bg-white/25 group-hover:bg-white/50'
              }`}
            />
          </button>
        ))}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        ref={registerRef('hero')}
        className="moat-grid relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-20"
      >
        <Kicker>The Aggregator Advantage</Kicker>
        <h1 className="mt-4 max-w-3xl text-center text-4xl font-bold leading-tight sm:text-5xl">
          Actual shouldn&rsquo;t try to beat Codex, Cursor, or Claude Code.
        </h1>
        <p className="mt-2 max-w-2xl text-center text-2xl font-semibold text-cyan-300">
          It should become the front door to them.
        </p>

        <div className="mt-12 w-full max-w-3xl">
          <NetworkDiagram />
        </div>

        <p className="mt-10 max-w-lg text-center text-sm text-white/40">
          The problem was never whether agents exist. It&rsquo;s who has the context, which agent
          should do what, and how the system remembers what happened last time.
        </p>
      </section>

      {/* SILOS */}
      <section
        id="silos"
        ref={registerRef('silos')}
        className="w-full border-t border-white/5 bg-white/[0.02] px-6 py-20"
      >
        <div className="mx-auto max-w-4xl">
          <Kicker>The Core Argument</Kicker>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Agents are powerful, but trapped in silos.
          </h2>
          <p className="mt-3 max-w-2xl text-white/50">
            Each agent has a partial view — of the codebase, the terminal, the repo. The
            deepest context does not naturally live inside any one of them. It lives across
            conversation.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SILO_AGENTS.map((a) => (
              <div key={a.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="font-mono text-sm font-semibold text-cyan-300">
                  {a.name}
                  {a.citation && <Citation id={a.citation} />}
                </p>
                <p className="mt-0.5 text-xs uppercase tracking-wide text-white/30">
                  knows {a.knows}
                </p>
                <p className="mt-2 text-sm text-white/60">{a.detail}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-white/40">
            Where intent actually starts
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {INTENT_SOURCES.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-sm text-white/60">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* POSITION */}
      <section
        id="position"
        ref={registerRef('position')}
        className="flex min-h-[70vh] w-full flex-col items-center justify-center px-6 py-20"
      >
        <Kicker>The Strategic Position</Kicker>
        <h2 className="mt-3 max-w-2xl text-center text-3xl font-bold sm:text-4xl">
          Not versus. Plus.
        </h2>

        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-center text-sm text-white/40 line-through">
            Actual vs. Codex · MagicPath vs. Cursor
          </div>
          <span className="text-cyan-400">↓</span>
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-cyan-400/50 bg-cyan-400/10 px-6 py-4 text-center font-mono text-lg font-bold">
            <span>Actual</span>
            <span className="text-cyan-300">+</span>
            <span>MagicPath</span>
            <span className="text-cyan-300">+</span>
            <span>Codex</span>
            <span className="text-cyan-300">+</span>
            <span>Cursor</span>
            <span className="text-cyan-300">+</span>
            <span>Claude Code</span>
          </div>
        </div>

        <p className="mt-8 max-w-xl text-center text-white/60">
          Actual understands what the group is trying to do. MagicPath makes it visual and
          collaborative. Codex, Cursor, and Claude Code go deeper when the task becomes
          engineering-heavy.
        </p>
      </section>

      {/* ADOPTION LADDER */}
      <section
        id="ladder"
        ref={registerRef('ladder')}
        className="w-full border-t border-white/5 bg-white/[0.02] px-6 py-20"
      >
        <div className="mx-auto max-w-3xl">
          <Kicker>The Gateway Drug</Kicker>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">The agent adoption ladder.</h2>
          <p className="mt-3 text-white/50">
            Actual introduces the mainstream user to agents without forcing them to become
            technical. Conversation → Actual → MagicPath → coding agent → working product → back
            to MagicPath.
          </p>

          <div className="mt-8 flex flex-col gap-2">
            {ADOPTION_LADDER.map((l) => {
              const isActive = activeLevel === l.level;
              return (
                <button
                  key={l.level}
                  type="button"
                  onClick={() => setActiveLevel(l.level)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-4 rounded-2xl border px-5 py-3.5 text-left transition-all ${
                    isActive
                      ? 'border-cyan-400/50 bg-cyan-400/10'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold ${
                      isActive ? 'bg-cyan-400 text-[#0A0E1A]' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {l.level}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-semibold ${isActive ? 'text-cyan-200' : 'text-white/80'}`}>
                      {l.title}
                    </span>
                    <span className="block truncate text-sm text-white/40">{l.subtitle}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div key={level.level} className="net-fade-in mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <p className="text-sm text-white/70">{level.detail}</p>
          </div>
        </div>
      </section>

      {/* WHY AGGREGATORS WIN */}
      <section
        id="why"
        ref={registerRef('why')}
        className="flex min-h-[80vh] w-full flex-col items-center justify-center px-6 py-20"
      >
        <Kicker>Why Aggregators Win</Kicker>
        <h2 className="mt-3 max-w-2xl text-center text-3xl font-bold sm:text-4xl">
          Five structural advantages.
        </h2>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {WHY_AGGREGATORS_WIN.map((r, i) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveReason(r.id)}
              aria-pressed={activeReason === r.id}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeReason === r.id
                  ? 'border-cyan-400 bg-cyan-400 text-[#0A0E1A]'
                  : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25'
              }`}
            >
              {i + 1}. {r.title}
            </button>
          ))}
        </div>

        <div key={reason.id} className="net-fade-in mt-8 max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-lg font-semibold text-cyan-200">{reason.title}</p>
          <p className="mt-2 text-white/60">{reason.body}</p>
        </div>
      </section>

      {/* MEMORY AS THE MOAT */}
      <section
        id="memory"
        ref={registerRef('memory')}
        className="w-full border-t border-white/5 bg-white/[0.02] px-6 py-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <Kicker>Memory as the Moat</Kicker>
          <p className="mt-4 text-3xl font-bold sm:text-5xl">
            The model is not the moat.
          </p>
          <p className="mt-1 text-3xl font-bold text-cyan-300 sm:text-5xl">Memory is the moat.</p>
          <p className="mx-auto mt-4 max-w-xl text-white/50">
            Models get cheaper. Capabilities diffuse. But the memory a system builds about a
            user, team, brand, product, and decision history becomes harder to replicate.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="flex flex-wrap justify-center gap-2">
            {MEMORY_GRAPH.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setActiveMemory(m.id)}
                aria-pressed={activeMemory === m.id}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  activeMemory === m.id
                    ? 'border-cyan-400 bg-cyan-400 text-[#0A0E1A]'
                    : 'border-white/10 bg-white/[0.03] text-white/60 hover:border-white/25'
                }`}
              >
                {m.title}
              </button>
            ))}
          </div>

          <div key={memory.id} className="net-fade-in mt-6 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-6">
            <ul className="grid gap-2 sm:grid-cols-2">
              {memory.remembers.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-white/70">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                  {r}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-white/10 pt-3 text-sm font-medium text-cyan-200">
              {memory.note}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-widest text-white/30">
            Opinionated software says things like
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {OPINIONATED_LINES.map((l) => (
              <span
                key={l}
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-sm text-white/70"
              >
                &ldquo;{l}&rdquo;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT IMPLICATIONS */}
      <section
        id="implications"
        ref={registerRef('implications')}
        className="w-full px-6 py-20"
      >
        <div className="mx-auto max-w-4xl">
          <Kicker>Making It Real</Kicker>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Five product capabilities.</h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {PRODUCT_IMPLICATIONS.map((p) => (
              <div key={p.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-semibold text-cyan-200">{p.title}</p>
                <p className="mt-1.5 text-sm text-white/60">{p.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm font-semibold uppercase tracking-wide text-white/40">
            Try the handoff
          </p>
          <div className="mt-4">
            <HandoffCard />
          </div>
        </div>
      </section>

      {/* GTM SHIFT */}
      <section
        id="gtm"
        ref={registerRef('gtm')}
        className="w-full border-t border-white/5 bg-white/[0.02] px-6 py-20"
      >
        <div className="mx-auto max-w-3xl">
          <Kicker>How This Changes GTM</Kicker>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Not &ldquo;instead of.&rdquo; <span className="text-cyan-300">&ldquo;More value from.&rdquo;</span>
          </h2>
          <p className="mt-3 text-white/50">
            You are not saying &ldquo;use us instead of Cursor.&rdquo; You are saying &ldquo;use Actual to get
            more value out of Cursor, Codex, and Claude Code.&rdquo;
          </p>

          <div className="mt-8 space-y-2">
            {GTM_MESSAGES.map((g) => (
              <div key={g.audience} className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                  {g.audience}
                </p>
                <p className="mt-1.5 text-white/70">&ldquo;{g.message}&rdquo;</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-cyan-300">
              New persona · {RYAN_PERSONA.name}
            </p>
            <p className="mt-1 text-sm text-white/40">
              {RYAN_PERSONA.title} — {RYAN_PERSONA.company}
            </p>
            <p className="mt-3 text-sm text-white/70">{RYAN_PERSONA.pain}</p>
            <p className="mt-3 text-sm font-medium text-cyan-200">
              Promise: {RYAN_PERSONA.promise}
            </p>
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section
        id="close"
        ref={registerRef('close')}
        className="moat-grid relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-20"
      >
        <Kicker>The Best Final Narrative</Kicker>
        <p className="mt-6 max-w-3xl text-center text-2xl font-semibold leading-relaxed sm:text-3xl">
          The last era was about choosing the right app.
        </p>
        <p className="mt-2 max-w-3xl text-center text-2xl font-semibold leading-relaxed text-cyan-300 sm:text-3xl">
          This era is about giving the right agent the right context.
        </p>
        <p className="mt-6 text-center text-lg text-white/60">
          Actual is where that context lives.
        </p>

        <div className="mt-12 flex flex-col items-center gap-2">
          <div className="rounded-full border-2 border-cyan-400/50 bg-cyan-400/10 px-8 py-3 font-mono text-xl">
            @Actual, make this real.
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
            The memory layer for the agent economy
          </p>
        </div>

        <div className="mt-16 flex max-w-2xl flex-wrap justify-center gap-3">
          {REFERENCES.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/50 no-underline hover:border-cyan-400/40 hover:text-cyan-200"
            >
              [{r.id}] {r.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
