import { useState } from 'react';

interface NodeDef {
  id: string;
  label: string;
  detail: string;
}

const SOURCES: NodeDef[] = [
  { id: 'slack', label: 'Slack', detail: 'Work conversations, launch threads, growth brainstorms.' },
  { id: 'discord', label: 'Discord', detail: 'Community discussion, public build rooms.' },
  { id: 'whatsapp', label: 'WhatsApp', detail: 'Group chats, founder-to-team, customer threads.' },
  { id: 'figma', label: 'Figma', detail: 'Design comments, mockup context.' },
  { id: 'linear', label: 'Linear', detail: 'Tickets — the task, without the discourse behind it.' },
];

const AGENTS: NodeDef[] = [
  { id: 'codex', label: 'Codex', detail: 'Repo-aware implementation, debugging, PRs.' },
  { id: 'cursor', label: 'Cursor', detail: 'IDE-native iteration, codebase-aware review.' },
  { id: 'claude', label: 'Claude Code', detail: 'Long multi-file reasoning, terminal workflows.' },
  { id: 'future', label: 'Future agents', detail: 'Refactors, frontend, QA, data, security, design-to-code.' },
];

export function NetworkDiagram() {
  const [active, setActive] = useState<NodeDef | null>(null);

  function NodeButton({ node, align }: { node: NodeDef; align: 'left' | 'right' }) {
    const isActive = active?.id === node.id;
    return (
      <button
        type="button"
        onClick={() => setActive(isActive ? null : node)}
        aria-pressed={isActive}
        className={`flex items-center gap-2 ${align === 'right' ? 'flex-row-reverse' : ''}`}
      >
        <span
          className={`rounded-full border px-3 py-1.5 font-mono text-xs font-semibold transition-all ${
            isActive
              ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200'
              : 'border-white/15 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white/90'
          }`}
        >
          {node.label}
        </span>
        <span
          className={`h-px w-6 transition-colors sm:w-10 ${
            isActive ? 'bg-cyan-400' : 'bg-white/15'
          }`}
        />
      </button>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-[1fr_auto_1fr]">
        <div className="flex flex-col items-end gap-2.5">
          {SOURCES.map((s) => (
            <NodeButton key={s.id} node={s} align="left" />
          ))}
        </div>

        <div className="mx-auto flex flex-col items-center gap-1 rounded-2xl border-2 border-cyan-400/60 bg-cyan-400/10 px-6 py-5 text-center shadow-[0_0_40px_-10px_rgba(34,211,238,0.5)]">
          <span className="font-mono text-lg font-bold text-white">Actual</span>
          <span className="text-[10px] uppercase tracking-widest text-cyan-300">+ MagicPath</span>
        </div>

        <div className="flex flex-col items-start gap-2.5">
          {AGENTS.map((a) => (
            <NodeButton key={a.id} node={a} align="right" />
          ))}
        </div>
      </div>

      <div className="mt-6 flex min-h-[52px] items-center justify-center">
        {active ? (
          <p className="net-fade-in max-w-md rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-center text-sm text-white/70">
            <span className="font-mono font-semibold text-cyan-300">{active.label}</span> —{' '}
            {active.detail}
          </p>
        ) : (
          <p className="text-center text-xs uppercase tracking-widest text-white/25">
            Click a node to trace the connection
          </p>
        )}
      </div>
    </div>
  );
}
