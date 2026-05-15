import { CodeBlock } from "./code-block";
import { GitTimeline, HistoryList } from "./git-timeline";

type StrategySectionProps = {
  number: number;
  title: string;
  color: "blue" | "amber" | "emerald";
  oneLiner: string;
  step1: {
    visualTitle: string;
    timeline: React.ComponentProps<typeof GitTimeline>["rows"];
    history: React.ComponentProps<typeof HistoryList>["branches"];
    commands: string[];
  };
  step2: {
    visualTitle: string;
    timeline: React.ComponentProps<typeof GitTimeline>["rows"];
    history: React.ComponentProps<typeof HistoryList>["branches"];
    commands: string[];
  };
};

const borderColor = {
  blue: "border-blue-500/40",
  amber: "border-amber-500/40",
  emerald: "border-emerald-500/40",
};

const badgeColor = {
  blue: "bg-blue-500/15 text-blue-700 dark:text-blue-400",
  amber: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  emerald: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
};

export function StrategySection({
  number,
  title,
  color,
  oneLiner,
  step1,
  step2,
}: StrategySectionProps) {
  return (
    <section
      id={title.toLowerCase().replace(/\s+/g, "-")}
      className={`scroll-mt-8 rounded-2xl border-2 ${borderColor[color]} bg-white p-5 sm:p-6 dark:bg-zinc-900`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-900">
          {number}
        </span>
        <div>
          <span
            className={`rounded px-2 py-0.5 text-xs font-bold uppercase ${badgeColor[color]}`}
          >
            {title}
          </span>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{oneLiner}</p>
        </div>
      </div>

      <StepBlock
        label="Step A — feature/login → staging"
        visualTitle={step1.visualTitle}
        timeline={step1.timeline}
        history={step1.history}
        commands={step1.commands}
      />
      <StepBlock
        label="Step B — staging → main"
        visualTitle={step2.visualTitle}
        timeline={step2.timeline}
        history={step2.history}
        commands={step2.commands}
      />
    </section>
  );
}

function StepBlock({
  label,
  visualTitle,
  timeline,
  history,
  commands,
}: {
  label: string;
  visualTitle: string;
  timeline: React.ComponentProps<typeof GitTimeline>["rows"];
  history: React.ComponentProps<typeof HistoryList>["branches"];
  commands: string[];
}) {
  return (
    <div className="mt-6 border-t border-zinc-100 pt-6 first:mt-0 first:border-0 first:pt-0 dark:border-zinc-800">
      <h4 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
        {label}
      </h4>
      <div className="grid gap-4 lg:grid-cols-2">
        <GitTimeline title={visualTitle} rows={timeline} />
        <HistoryList title="Commit history (newest on right)" branches={history} />
      </div>
      <div className="mt-4">
        <CodeBlock lines={commands} />
      </div>
    </div>
  );
}

