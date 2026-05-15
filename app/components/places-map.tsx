/** Visual: where Git things live — for absolute beginners */
export function PlacesMap() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <PlaceCard
        icon="💻"
        title="Your computer (local)"
        items={[
          "Project folder — files you edit in VS Code",
          "Staging area — files you marked ready",
          "Local repo — saved snapshots (commits)",
        ]}
        color="blue"
      />
      <PlaceCard
        icon="🌿"
        title="Branches (timelines)"
        items={[
          "main — the shared “official” line",
          "feature/xyz — your experiment line",
          "You switch branches; files change",
        ]}
        color="emerald"
      />
      <PlaceCard
        icon="☁️"
        title="Remote (GitHub / GitLab)"
        items={[
          "origin — nickname for the server copy",
          "Teammates push & pull from here",
          "Pull requests merge into main here",
        ]}
        color="orange"
      />
      <div className="md:col-span-3">
        <div className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-linear-to-r from-blue-500/5 via-emerald-500/5 to-orange-500/5 p-6 dark:border-zinc-800 sm:flex-row sm:justify-center sm:gap-8">
          <FlowBox label="You edit files" />
          <Arrow />
          <FlowBox label="git add + commit" sub="save snapshot locally" />
          <Arrow />
          <FlowBox label="git push" sub="send to cloud" />
          <Arrow />
          <FlowBox label="Teammates git pull" sub="get your work" />
        </div>
      </div>
    </div>
  );
}

function PlaceCard({
  icon,
  title,
  items,
  color,
}: {
  icon: string;
  title: string;
  items: string[];
  color: "blue" | "emerald" | "orange";
}) {
  const border = {
    blue: "border-blue-500/30",
    emerald: "border-emerald-500/30",
    orange: "border-orange-500/30",
  }[color];
  return (
    <div className={`rounded-xl border-2 ${border} bg-white p-5 dark:bg-zinc-900`}>
      <span className="text-2xl" aria-hidden>
        {icon}
      </span>
      <h3 className="mt-2 font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-zinc-400">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FlowBox({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-center dark:border-zinc-700 dark:bg-zinc-800">
      <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">{label}</p>
      {sub ? <p className="mt-0.5 text-xs text-zinc-500">{sub}</p> : null}
    </div>
  );
}

function Arrow() {
  return (
    <span className="text-zinc-400 rotate-90 sm:rotate-0" aria-hidden>
      →
    </span>
  );
}

