type ComparisonCardProps = {
  title: string;
  badge?: string;
  badgeColor?: "orange" | "emerald" | "blue" | "amber" | "zinc";
  description: string;
  pros: string[];
  cons: string[];
  command: string;
  when: string;
};

const badgeStyles = {
  orange: "bg-orange-500/15 text-orange-600 dark:text-orange-400",
  emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  amber: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  zinc: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400",
};

export function ComparisonCard({
  title,
  badge,
  badgeColor = "zinc",
  description,
  pros,
  cons,
  command,
  when,
}: ComparisonCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          {title}
        </h3>
        {badge ? (
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeStyles[badgeColor]}`}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mb-4 rounded-lg bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-800 dark:bg-zinc-900 dark:text-emerald-300">
        {command}
      </div>
      <div className="mb-4 grid flex-1 gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
            Pros
          </p>
          <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {pros.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-500">+</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-orange-600 dark:text-orange-400">
            Cons
          </p>
          <ul className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
            {cons.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-orange-500">−</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-auto border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-zinc-800">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">
          Use when:{" "}
        </span>
        {when}
      </p>
    </article>
  );
}
