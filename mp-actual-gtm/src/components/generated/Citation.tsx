import { REFERENCES } from './gtmData';

export function Citation({ id }: { id: number }) {
  const ref = REFERENCES.find((r) => r.id === id);
  if (!ref) return null;

  return (
    <a
      href={ref.url}
      target="_blank"
      rel="noopener noreferrer"
      title={ref.label}
      className="ml-0.5 inline-flex h-4 w-4 -translate-y-1.5 items-center justify-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-700 no-underline transition-colors hover:bg-indigo-600 hover:text-white"
    >
      {id}
    </a>
  );
}
