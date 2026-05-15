type Commit = {
  id: string;
  msg: string;
  color?: "zinc" | "blue" | "purple" | "amber" | "emerald" | "orange";
};

type BranchRow = {
  name: string;
  commits: Commit[];
  indent?: number;
};

const colors = {
  zinc: "bg-zinc-400",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  orange: "bg-orange-500",
};

export function GitTimeline({
  title,
  rows,
  note,
}: {
  title?: string;
  rows: BranchRow[];
  note?: string;
}) {
  return (
    <figure className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      {title ? (
        <figcaption className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </figcaption>
      ) : null}
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.name}>
            <p className="mb-1.5 font-mono text-xs font-medium text-zinc-500">
              {row.name}
            </p>
            <div
              className="flex flex-wrap items-center gap-y-2"
              style={{ marginLeft: (row.indent ?? 0) * 24 }}
            >
              {row.commits.map((c, i) => (
                <div key={`${row.name}-${c.id}`} className="flex items-center">
                  <CommitBubble commit={c} />
                  {i < row.commits.length - 1 ? (
                    <span className="mx-0.5 h-0.5 w-4 bg-zinc-300 sm:w-6 dark:bg-zinc-600" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {note ? (
        <p className="mt-3 text-xs leading-relaxed text-zinc-500">{note}</p>
      ) : null}
    </figure>
  );
}

function CommitBubble({ commit }: { commit: Commit }) {
  const bg = colors[commit.color ?? "zinc"];
  return (
    <div className="group flex flex-col items-center">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-[11px] font-bold text-white ${bg}`}
        title={commit.msg}
      >
        {commit.id}
      </span>
      <span className="mt-1 hidden max-w-[4.5rem] truncate text-center text-[9px] text-zinc-500 sm:block">
        {commit.msg}
      </span>
    </div>
  );
}

export function HistoryList({
  title,
  branches,
}: {
  title?: string;
  branches: { name: string; commits: string[] }[];
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
      {title ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          {title}
        </p>
      ) : null}
      <ul className="space-y-2 font-mono text-xs">
        {branches.map((b) => (
          <li key={b.name} className="text-zinc-700 dark:text-zinc-300">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {b.name}:
            </span>{" "}
            {b.commits.length ? b.commits.join(" → ") : "(empty)"}
          </li>
        ))}
      </ul>
    </div>
  );
}

