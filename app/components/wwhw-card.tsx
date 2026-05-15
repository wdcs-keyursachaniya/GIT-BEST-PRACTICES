type WwhwCardProps = {
  title: string;
  emoji?: string;
  what: string;
  where: string;
  how: string;
  why: string;
  command?: string;
  analogy?: string;
};

export function WwhwCard({
  title,
  emoji,
  what,
  where,
  how,
  why,
  command,
  analogy,
}: WwhwCardProps) {
  const rows = [
    { key: "What", text: what, color: "bg-blue-500" },
    { key: "Where", text: where, color: "bg-purple-500" },
    { key: "How", text: how, color: "bg-emerald-500" },
    { key: "Why", text: why, color: "bg-orange-500" },
  ];

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {emoji ? <span aria-hidden>{emoji}</span> : null}
        {title}
      </h3>
      {analogy ? (
        <p className="mt-2 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-900 dark:text-amber-200">
          <span className="font-medium">Think of it like: </span>
          {analogy}
        </p>
      ) : null}
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.key} className="flex gap-3">
            <dt className="shrink-0">
              <span
                className={`inline-flex w-14 justify-center rounded-md px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white ${row.color}`}
              >
                {row.key}
              </span>
            </dt>
            <dd className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {row.text}
            </dd>
          </div>
        ))}
      </dl>
      {command ? (
        <div className="mt-4 rounded-lg bg-zinc-950 px-3 py-2 font-mono text-xs text-emerald-300">
          <span className="text-zinc-500">$ </span>
          {command}
        </div>
      ) : null}
    </article>
  );
}
