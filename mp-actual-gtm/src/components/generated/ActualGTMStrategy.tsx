import { useEffect, useRef, useState } from 'react';
import { Citation } from './Citation';
import { MarketMapTable } from './MarketMapTable';
import { PersonaSwitcher } from './PersonaSwitcher';
import {
  ANTI_POSITIONING,
  AVOID_PERSONA,
  GTM_PHASES,
  ICP_PROFILE,
  MESSAGING_ARCHITECTURE,
  METRIC_GROUPS,
  NINETY_DAY_PLAN,
  POSITIONING_BY_MARKET,
  REFERENCES,
  SECTIONS,
  TIERS,
} from './gtmData';

function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500">{children}</p>;
}

export const ActualGTMStrategy = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [openPhase, setOpenPhase] = useState<string | null>('Phase 1');
  const [openTier, setOpenTier] = useState<string | null>('Tier 1');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
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

  return (
    <div className="gtm-shell relative flex w-full bg-[#F7F8FB] text-slate-900">
      {/* Sidebar nav */}
      <nav
        aria-label="Section navigation"
        className="fixed left-0 top-0 z-40 hidden h-screen w-56 flex-col border-r border-slate-200 bg-white/90 px-5 py-8 backdrop-blur lg:flex"
      >
        <p className="font-mono text-sm font-bold tracking-tight text-slate-900">@Actual</p>
        <p className="mt-1 text-xs text-slate-400">GTM &amp; Targeting</p>

        <div className="mt-8 flex flex-col gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollTo(s.id)}
              aria-current={activeSection === s.id}
              className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                activeSection === s.id
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="w-full lg:pl-56">
        {/* OVERVIEW */}
        <section
          id="overview"
          ref={registerRef('overview')}
          className="flex min-h-[85vh] w-full flex-col items-center justify-center px-6 py-24 sm:px-12"
        >
          <Kicker>GTM Recommendation</Kicker>
          <h1 className="mt-4 max-w-3xl text-center text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Not &ldquo;everyone&rsquo;s group chat.&rdquo; That&rsquo;s the vision, not the wedge.
          </h1>

          <div className="mt-8 max-w-2xl rounded-3xl border-2 border-indigo-200 bg-indigo-50 px-8 py-6 text-center">
            <p className="text-lg font-semibold text-indigo-900">
              Slack-first growth, product marketing, and founder-led teams at AI-native B2B SaaS
              companies that need to turn messy internal conversations into live launch assets,
              prototypes, and campaign pages.
            </p>
          </div>

          <div className="mt-8 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                The wedge
              </p>
              <p className="mt-1.5 text-base font-medium text-slate-800">
                Actual turns Slack threads into branded launch assets and working visual
                software.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                The category
              </p>
              <p className="mt-1.5 text-base font-medium text-slate-800">
                The app layer for every conversation.
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-xl text-center text-sm text-slate-500">
            The consumer/personal messaging vision is powerful — treat it as the mythology of the
            company, not the first GTM motion.
          </p>
        </section>

        {/* MARKET MAP */}
        <section
          id="market-map"
          ref={registerRef('market-map')}
          className="w-full border-t border-slate-200 bg-white px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-4xl">
            <Kicker>The Market Map</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Ten segments, ranked by priority.
            </h2>
            <p className="mt-3 max-w-2xl text-slate-500">
              Slack is the strongest immediate wedge — the platform explicitly positions around
              agents and AI, with 200k+ paid customers and 77 of the Fortune 100
              <Citation id={1} />. Slack describes its platform as purpose-built for bringing
              agents and AI into business workflows
              <Citation id={2} />.
            </p>
            <p className="mt-3 max-w-2xl text-slate-500">
              Discord is attractive for social proof — 90M+ daily active users as of Q4 2025
              <Citation id={3} />. WhatsApp is tempting but risky: OpenAI says ChatGPT leaves
              WhatsApp after January 15, 2026 due to a platform policy change, as Meta pushes its
              own Business Agent
              <Citation id={4} />.
            </p>

            <div className="mt-8">
              <MarketMapTable />
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section
          id="tiers"
          ref={registerRef('tiers')}
          className="w-full px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-3xl">
            <Kicker>Targeting Hierarchy</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Five tiers, in order.
            </h2>

            <div className="mt-8 space-y-2">
              {TIERS.map((t) => {
                const isOpen = openTier === t.tier;
                return (
                  <div key={t.tier} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenTier(isOpen ? null : t.tier)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                        {t.tier.split(' ')[1]}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-slate-900">
                          {t.title}
                        </span>
                        <span className="block truncate text-sm text-slate-500">{t.subtitle}</span>
                      </span>
                      <span className="shrink-0 text-slate-300">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="gtm-fade-in border-t border-slate-100 px-5 py-4 pl-[68px]">
                        <p className="text-sm text-slate-600">{t.detail}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ICP */}
        <section
          id="icp"
          ref={registerRef('icp')}
          className="w-full border-t border-slate-200 bg-white px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-3xl">
            <Kicker>The Beachhead ICP</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              &ldquo;Velocity Teams&rdquo;
            </h2>
            <p className="mt-3 text-slate-500">
              Teams where ideas die because execution cannot keep up with conversation.
            </p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
              {ICP_PROFILE.map((row, i) => (
                <div
                  key={row.attribute}
                  className={`grid grid-cols-[1fr_2fr] gap-4 px-5 py-3 text-sm ${
                    i % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                  }`}
                >
                  <span className="font-semibold text-slate-700">{row.attribute}</span>
                  <span className="text-slate-500">{row.ideal}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-slate-900 px-6 py-5 text-center">
              <p className="text-lg font-medium text-white">
                &ldquo;We had the idea in Slack three days ago and still don&rsquo;t have the
                page, mockup, email, or asset.&rdquo;
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Actual should sell momentum, not automation.
              </p>
            </div>
          </div>
        </section>

        {/* PERSONAS */}
        <section
          id="personas"
          ref={registerRef('personas')}
          className="w-full px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-3xl text-center">
            <Kicker>Primary Personas</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Who actually says yes.
            </h2>
          </div>

          <div className="mx-auto mt-8 max-w-3xl">
            <PersonaSwitcher />
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-left">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
              Do not chase first
            </p>
            <p className="mt-1.5 text-base font-semibold text-slate-800">{AVOID_PERSONA.title}</p>
            <p className="mt-1.5 text-sm text-slate-500">
              {AVOID_PERSONA.detail}
              <Citation id={AVOID_PERSONA.citation} />
            </p>
          </div>
        </section>

        {/* POSITIONING BY MARKET */}
        <section
          id="positioning"
          ref={registerRef('positioning')}
          className="w-full border-t border-slate-200 bg-white px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-4xl">
            <Kicker>Positioning by Market</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              One category, four taglines.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {POSITIONING_BY_MARKET.map((p) => (
                <div key={p.market} className="rounded-2xl border border-slate-200 bg-[#F7F8FB] p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-indigo-500">
                    {p.market}
                  </p>
                  <p className="mt-1.5 text-base font-medium text-slate-800">{p.tagline}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.useCases.map((u) => (
                      <span
                        key={u}
                        className="rounded-full bg-white px-2.5 py-1 text-[11px] text-slate-500"
                      >
                        {u}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GTM PHASES */}
        <section
          id="phases"
          ref={registerRef('phases')}
          className="w-full px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-3xl">
            <Kicker>The GTM Sequence</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Six phases, in order.
            </h2>

            <div className="mt-8 space-y-2">
              {GTM_PHASES.map((p) => {
                const isOpen = openPhase === p.phase;
                return (
                  <div key={p.phase} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setOpenPhase(isOpen ? null : p.phase)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left"
                    >
                      <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
                        {p.phase}
                      </span>
                      <span className="min-w-0 flex-1 text-sm font-semibold text-slate-900">
                        {p.title}
                      </span>
                      <span className="shrink-0 text-slate-300">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="gtm-fade-in border-t border-slate-100 px-5 py-4">
                        <p className="text-sm text-slate-600">
                          {p.goal}
                          {p.citation && <Citation id={p.citation} />}
                        </p>
                        <ul className="mt-3 space-y-1.5">
                          {p.actions.map((a) => (
                            <li key={a} className="flex items-start gap-2 text-sm text-slate-500">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 30/60/90 */}
        <section
          id="plan"
          ref={registerRef('plan')}
          className="w-full border-t border-slate-200 bg-white px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-5xl">
            <Kicker>The 30 / 60 / 90 Plan</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Prove, package, expand.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {NINETY_DAY_PLAN.map((block) => (
                <div key={block.range} className="rounded-2xl border border-slate-200 bg-[#F7F8FB] p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-indigo-500">
                    {block.range}
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">{block.title}</p>
                  <p className="mt-2 text-sm text-slate-500">{block.goal}</p>
                  <ul className="mt-3 space-y-1.5">
                    {block.actions.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                        {a}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs font-medium text-white">
                    {block.question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* METRICS */}
        <section
          id="metrics"
          ref={registerRef('metrics')}
          className="w-full px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-4xl">
            <Kicker>Metrics That Matter</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Not prompts. Not installs.
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {METRIC_GROUPS.map((g) => (
                <div key={g.group} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-indigo-500">
                    {g.group}
                  </p>
                  <ul className="mt-2 space-y-1.5">
                    {g.metrics.map((m) => (
                      <li key={m} className="text-sm text-slate-500">
                        · {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-indigo-600 px-8 py-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">
                North star
              </p>
              <p className="mt-1.5 text-xl font-bold text-white">
                Useful artifacts created from real conversations.
              </p>
            </div>
          </div>
        </section>

        {/* MESSAGING */}
        <section
          id="messaging"
          ref={registerRef('messaging')}
          className="w-full border-t border-slate-200 bg-white px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-3xl">
            <Kicker>Messaging Architecture</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Say this. Not that.
            </h2>

            <div className="mt-8 space-y-2">
              {MESSAGING_ARCHITECTURE.map((m) => (
                <div
                  key={m.label}
                  className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-[#F7F8FB] px-5 py-4 sm:flex-row sm:items-center sm:gap-4"
                >
                  <span className="w-24 shrink-0 text-xs font-bold uppercase tracking-wide text-indigo-500">
                    {m.label}
                  </span>
                  <span className="text-base font-medium text-slate-800">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-rose-500">
                  Actual is not
                </p>
                <ul className="mt-2 space-y-1.5">
                  {ANTI_POSITIONING.map((a) => (
                    <li key={a} className="text-sm text-slate-500 line-through">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-indigo-600">
                  Actual is
                </p>
                <p className="mt-2 text-base font-semibold text-indigo-900">
                  The fastest path from shared intent to working software.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REFERENCES */}
        <section
          id="references"
          ref={registerRef('references')}
          className="w-full px-6 py-20 sm:px-12"
        >
          <div className="mx-auto max-w-3xl">
            <Kicker>References</Kicker>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">Sources cited</h2>

            <ul className="mt-8 space-y-2">
              {REFERENCES.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
                    {r.id}
                  </span>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-sm font-medium text-indigo-600 hover:underline"
                  >
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-10 text-center text-sm text-slate-400">
              Start where conversations already have high-value commercial intent: Slack launch,
              growth, and product marketing channels.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
