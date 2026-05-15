import { VisualGitGraph } from "./visual-git-graph";
import { WwhwCard } from "./wwhw-card";

const strategies = [
  {
    title: "Normal merge",
    emoji: "🔀",
    story:
      "You and a friend both edited a shared Google Doc. Git adds a special “merge” bookmark that shows both lines of history joined.",
    what: "Combine your branch into main and keep every commit visible, including a merge commit.",
    where: "On your machine, or when you click “Merge pull request” on GitHub (default).",
    how: "Checkout main, then run merge with your branch name.",
    why: "Safe and honest history — you can see exactly when a feature landed.",
    command: "git checkout main && git merge feature/login",
    graph: {
      title: "History looks like a fork that joins",
      caption: "Blue M = merge commit. You still see commits D and E on the side.",
      branches: [
        {
          name: "main",
          commits: [
            { id: "A", label: "start", color: "zinc" as const },
            { id: "B", label: "base", color: "zinc" as const },
            { id: "C", label: "team", color: "blue" as const },
            { id: "M", label: "merge", color: "orange" as const },
          ],
        },
        {
          name: "your feature (joined in)",
          commits: [
            { id: "D", label: "work", color: "amber" as const },
            { id: "E", label: "work", color: "amber" as const },
          ],
        },
      ],
    },
    pickWhen: "You are new, or the team wants full history and does not mind extra merge bubbles.",
  },
  {
    title: "Squash merge",
    emoji: "🥞",
    story:
      "You made 20 messy drafts (“fix typo”, “wip”, “oops”). Squash squashes them into one clean chapter before putting it in the official book.",
    what: "All your branch commits become ONE new commit on main.",
    where: "Often on GitHub: “Squash and merge” button on a Pull Request.",
    how: "Locally: merge with --squash, then make one commit message.",
    why: "Main stays tidy — one commit per feature, easy to read for beginners scanning history.",
    command: 'git merge --squash feature/login && git commit -m "feat: add login"',
    graph: {
      title: "Many small commits → one on main",
      caption: "S = single squashed commit. Your messy steps are not on main anymore.",
      branches: [
        {
          name: "main",
          commits: [
            { id: "A", label: "start", color: "zinc" as const },
            { id: "B", label: "base", color: "zinc" as const },
            { id: "C", label: "team", color: "blue" as const },
            { id: "S", label: "feature", color: "amber" as const },
          ],
        },
      ],
    },
    pickWhen: "Your PR has lots of tiny commits and you want main to read like a clean story.",
  },
  {
    title: "Rebase",
    emoji: "📎",
    story:
      "Your homework was written under chapter 2, but the textbook is now on chapter 3. Rebase copies your answers onto fresh pages after chapter 3.",
    what: "Move your commits to start after the newest main — no merge bubble.",
    where: "On your laptop, on a feature branch, BEFORE others depend on your commits.",
    how: "Checkout your branch, fetch main, then rebase onto main.",
    why: "Straight line history — easier to follow “what happened when” on main.",
    command: "git checkout feature/login && git fetch origin main && git rebase origin/main",
    graph: {
      title: "Straight line — your work sits on top",
      caption: "D′ and E′ are replayed copies (new dots, same changes).",
      branches: [
        {
          name: "main + your work (linear)",
          commits: [
            { id: "A", label: "start", color: "zinc" as const },
            { id: "B", label: "base", color: "zinc" as const },
            { id: "C", label: "team", color: "blue" as const },
            { id: "D′", label: "yours", color: "emerald" as const },
            { id: "E′", label: "yours", color: "emerald" as const },
          ],
        },
      ],
    },
    pickWhen: "You are updating your own branch before a PR, and nobody else pulled your old commits yet.",
  },
];

export function MergeStrategiesBeginner() {
  return (
    <div className="space-y-10">
      {strategies.map((s) => (
        <div
          key={s.title}
          className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-50">
              Story:{" "}
            </span>
            {s.story}
          </p>
          <div className="grid gap-6 lg:grid-cols-2">
            <VisualGitGraph
              title={s.graph.title}
              caption={s.graph.caption}
              branches={s.graph.branches}
            />
            <WwhwCard
              title={s.title}
              emoji={s.emoji}
              what={s.what}
              where={s.where}
              how={s.how}
              why={s.why}
              command={s.command}
            />
          </div>
          <p className="mt-4 rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800">
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              Pick this when:{" "}
            </span>
            {s.pickWhen}
          </p>
        </div>
      ))}
    </div>
  );
}
