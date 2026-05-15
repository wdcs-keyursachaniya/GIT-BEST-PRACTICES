type CommitNode = {
  id: string;
  label: string;
  color?: "zinc" | "blue" | "amber" | "emerald" | "orange" | "purple";
};

type BranchLine = {
  name: string;
  commits: CommitNode[];
  row?: number;
  mergeInto?: string;
};

const dotColors = {
  zinc: "bg-zinc-400 ring-zinc-300",
  blue: "bg-blue-500 ring-blue-300",
  amber: "bg-amber-500 ring-amber-300",
  emerald: "bg-emerald-500 ring-emerald-300",
  orange: "bg-orange-500 ring-orange-300",
  purple: "bg-purple-500 ring-purple-300",
};

export function VisualGitGraph({
  title,
  caption,
  branches,
  mergeLabel,
}: {
  title: string;
  caption: string;
  branches: BranchLine[];
  mergeLabel?: string;
}) {
  return (
    <figure className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <figcaption className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </figcaption>
      <div className="space-y-5 overflow-x-auto pb-1">
        {branches.map((branch) => (
          <div key={branch.name} className="min-w-[280px]">
            <p className="mb-2 font-mono text-xs font-medium text-zinc-500">
              {branch.name}
            </p>
            <div className="flex items-center gap-0">
              {branch.commits.map((c, i) => (
                <div key={c.id} className="flex items-center">
                  <CommitDot commit={c} />
                  {i < branch.commits.length - 1 ? (
                    <span className="h-0.5 w-6 shrink-0 bg-zinc-300 dark:bg-zinc-600" />
                  ) : null}
                </div>
              ))}
              {mergeLabel && branch.mergeInto ? (
                <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">
                  → {mergeLabel}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-zinc-500">{caption}</p>
    </figure>
  );
}

function CommitDot({ commit }: { commit: CommitNode }) {
  const color = commit.color ?? "zinc";
  return (
    <div className="group relative flex flex-col items-center">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ${dotColors[color]}`}
        title={commit.label}
      >
        {commit.id}
      </span>
      <span className="mt-1 max-w-[3rem] truncate text-center text-[9px] text-zinc-500">
        {commit.label}
      </span>
    </div>
  );
}

/** Stacked before/after for rebase lesson */
export function RebaseStoryVisual() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <StoryPanel step={1} title="Before — you are behind main">
        <div className="space-y-4">
          <BranchRow label="main (team)" commits={["A", "B", "C"]} colors={["zinc", "zinc", "blue"]} />
          <BranchRow
            label="your branch"
            commits={["D", "E"]}
            colors={["amber", "amber"]}
            offset
          />
        </div>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          You started from <strong>B</strong>. While you coded, teammates added{" "}
          <strong>C</strong> to main. Your branch still “thinks” the latest is B.
        </p>
      </StoryPanel>
      <StoryPanel step={2} title="After rebase — you sit on top of C">
        <div className="space-y-4">
          <BranchRow label="main" commits={["A", "B", "C"]} colors={["zinc", "zinc", "blue"]} />
          <BranchRow
            label="your branch (rebased)"
            commits={["D′", "E′"]}
            colors={["emerald", "emerald"]}
            indent
          />
        </div>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
          Git <em>replays</em> your changes as new commits on top of C. Same code,
          new dots — like copying homework onto a fresh page under the newest
          chapter.
        </p>
      </StoryPanel>
    </div>
  );
}

function StoryPanel({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900/50">
      <span className="mb-2 inline-block rounded-full bg-zinc-200 px-2 py-0.5 text-xs font-bold text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
        Step {step}
      </span>
      <h4 className="mb-4 font-semibold text-zinc-900 dark:text-zinc-50">{title}</h4>
      {children}
    </div>
  );
}

function BranchRow({
  label,
  commits,
  colors,
  offset,
  indent,
}: {
  label: string;
  commits: string[];
  colors: ("zinc" | "blue" | "amber" | "emerald")[];
  offset?: boolean;
  indent?: boolean;
}) {
  return (
    <div className={indent ? "ml-8" : offset ? "ml-6" : ""}>
      <p className="mb-1.5 font-mono text-xs text-zinc-500">{label}</p>
      <div className="flex items-center gap-1">
        {commits.map((c, i) => (
          <div key={c} className="flex items-center">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold text-white ${
                colors[i] === "zinc"
                  ? "bg-zinc-400"
                  : colors[i] === "blue"
                    ? "bg-blue-500"
                    : colors[i] === "amber"
                      ? "bg-amber-500"
                      : "bg-emerald-500"
              }`}
            >
              {c}
            </span>
            {i < commits.length - 1 ? (
              <span className="h-0.5 w-5 bg-zinc-300 dark:bg-zinc-600" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
