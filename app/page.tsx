import { CodeBlock } from "./components/code-block";
import { GitTimeline, HistoryList } from "./components/git-timeline";
import { StrategySection } from "./components/strategy-section";

/** One repo, one story — used for normal merge, squash, and rebase */
const EXAMPLE = "shop-app";

const c = {
  A: { id: "A", msg: "init", color: "zinc" as const },
  B: { id: "B", msg: "products", color: "zinc" as const },
  C: { id: "C", msg: "payment API", color: "purple" as const },
  D: { id: "D", msg: "login form", color: "amber" as const },
  E: { id: "E", msg: "fix login", color: "amber" as const },
  M: { id: "M", msg: "merge", color: "orange" as const },
  M2: { id: "M2", msg: "merge", color: "orange" as const },
  S: { id: "S", msg: "login (1)", color: "amber" as const },
  Dp: { id: "D′", msg: "login form", color: "emerald" as const },
  Ep: { id: "E′", msg: "fix login", color: "emerald" as const },
};

const START_TIMELINE = [
  { name: "main", commits: [c.A, c.B] },
  { name: "staging", commits: [c.C], indent: 1 },
  { name: "feature/login", commits: [c.D, c.E], indent: 2 },
];

const START_HISTORY = [
  { name: "main", commits: ["A init", "B products"] },
  { name: "staging", commits: ["A", "B", "C payment API"] },
  { name: "feature/login", commits: ["A", "B", "C", "D login form", "E fix login"] },
];

const SETUP_CMDS = [
  "# 1. New repo + main",
  "git init shop-app && cd shop-app",
  'git commit --allow-empty -m "A: init"',
  'git commit --allow-empty -m "B: products page"',
  "# 2. staging from main",
  "git checkout -b staging",
  'git commit --allow-empty -m "C: payment API"',
  "# 3. feature from staging",
  "git checkout -b feature/login",
  'git commit --allow-empty -m "D: login form"',
  'git commit --allow-empty -m "E: fix login"',
  "# Everyone stops here — same picture for all 3 methods below",
];

export default function Home() {
  return (
    <div className="min-h-full bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white px-6 py-10 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
            One example · three ways
          </p>
          <h1 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Git: merge vs squash vs rebase
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Same repo <strong>{EXAMPLE}</strong>, same branches, same commits{" "}
            <strong>A → B → C → D → E</strong>. Only the commands in step A & B
            change — watch how history differs.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-10 px-6 py-10">
        {/* SETUP */}
        <section id="setup" className="scroll-mt-8">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            0. Build the same starting point
          </h2>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            <strong>main</strong> = live site · <strong>staging</strong> = QA ·{" "}
            <strong>feature/login</strong> = your task. Each branch keeps its own
            commits until you merge.
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <GitTimeline
              title="All 3 methods start HERE"
              rows={START_TIMELINE}
              note="Dots = commits. staging branched after B. feature branched after C."
            />
            <HistoryList title="git log --oneline (each branch)" branches={START_HISTORY} />
          </div>

          <div className="mt-4">
            <CodeBlock title="Setup commands (run once)" lines={SETUP_CMDS} />
          </div>
        </section>

        <p className="rounded-lg bg-zinc-200/60 px-4 py-3 text-center text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          ↓ Same starting point below. Compare step A (feature → staging) and step
          B (staging → main).
        </p>

        <StrategySection
          number={1}
          title="Normal merge"
          color="blue"
          oneLiner="Keeps every commit + adds a merge commit (M). History shows the fork."
          step1={{
            visualTitle: "After merge feature → staging",
            timeline: [
              { name: "main", commits: [c.A, c.B] },
              { name: "staging", commits: [c.C, c.D, c.E, c.M], indent: 1 },
              { name: "feature/login", commits: [c.D, c.E], indent: 2 },
            ],
            history: [
              { name: "main", commits: ["A", "B"] },
              {
                name: "staging",
                commits: ["A", "B", "C", "D", "E", "M merge feature"],
              },
              { name: "feature/login", commits: ["A", "B", "C", "D", "E"] },
            ],
            commands: [
              "git checkout staging",
              "git merge feature/login -m \"M: merge feature/login\"",
              "git log --oneline --graph -5",
            ],
          }}
          step2={{
            visualTitle: "After merge staging → main",
            timeline: [
              { name: "main", commits: [c.A, c.B, c.M2], indent: 0 },
              { name: "staging", commits: [c.C, c.M], indent: 1 },
              { name: "feature/login", commits: [c.D, c.E], indent: 2 },
            ],
            history: [
              {
                name: "main",
                commits: ["A", "B", "C", "D", "E", "M", "M2 merge staging"],
              },
              { name: "staging", commits: ["A", "B", "C", "D", "E", "M"] },
              { name: "feature/login", commits: ["A", "B", "C", "D", "E"] },
            ],
            commands: [
              "git checkout main",
              "git merge staging -m \"M2: release staging to main\"",
              "git log --oneline --graph -8",
            ],
          }}
        />

        <StrategySection
          number={2}
          title="Squash merge"
          color="amber"
          oneLiner="D + E become one commit (S) on staging. Messy steps hidden on staging/main."
          step1={{
            visualTitle: "After squash feature → staging",
            timeline: [
              { name: "main", commits: [c.A, c.B] },
              { name: "staging", commits: [c.C, c.S], indent: 1 },
              { name: "feature/login", commits: [c.D, c.E], indent: 2 },
            ],
            history: [
              { name: "main", commits: ["A", "B"] },
              { name: "staging", commits: ["A", "B", "C", "S login (squashed D+E)"] },
              { name: "feature/login", commits: ["A", "B", "C", "D", "E"] },
            ],
            commands: [
              "git checkout staging",
              "git merge --squash feature/login",
              'git commit -m "S: login (squashed D+E)"',
              "git log --oneline -4",
            ],
          }}
          step2={{
            visualTitle: "After merge staging → main",
            timeline: [
              { name: "main", commits: [c.A, c.B, c.C, c.S] },
              { name: "staging", commits: [c.C, c.S], indent: 1 },
              { name: "feature/login", commits: [c.D, c.E], indent: 2 },
            ],
            history: [
              { name: "main", commits: ["A", "B", "C", "S"] },
              { name: "staging", commits: ["A", "B", "C", "S"] },
              { name: "feature/login", commits: ["A", "B", "C", "D", "E"] },
            ],
            commands: [
              "git checkout main",
              "git merge staging -m \"release staging\"",
              "git log --oneline -5",
            ],
          }}
        />

        <StrategySection
          number={3}
          title="Rebase"
          color="emerald"
          oneLiner="Replay D,E on top of C → D′,E′. Straight line, no merge bubble on staging."
          step1={{
            visualTitle: "After rebase feature onto staging, then fast-forward staging",
            timeline: [
              { name: "main", commits: [c.A, c.B] },
              { name: "staging", commits: [c.C, c.Dp, c.Ep], indent: 1 },
              { name: "feature/login", commits: [c.Dp, c.Ep], indent: 2 },
            ],
            history: [
              { name: "main", commits: ["A", "B"] },
              { name: "staging", commits: ["A", "B", "C", "D′ login", "E′ fix"] },
              { name: "feature/login", commits: ["A", "B", "C", "D′", "E′"] },
            ],
            commands: [
              "git checkout feature/login",
              "git rebase staging",
              "git checkout staging",
              "git merge feature/login",
              "git log --oneline --graph -5",
            ],
          }}
          step2={{
            visualTitle: "After fast-forward main to staging",
            timeline: [
              { name: "main", commits: [c.A, c.B, c.C, c.Dp, c.Ep] },
              { name: "staging", commits: [c.C, c.Dp, c.Ep], indent: 1 },
              { name: "feature/login", commits: [c.Dp, c.Ep], indent: 2 },
            ],
            history: [
              { name: "main", commits: ["A", "B", "C", "D′", "E′"] },
              { name: "staging", commits: ["A", "B", "C", "D′", "E′"] },
              { name: "feature/login", commits: ["A", "B", "C", "D′", "E′"] },
            ],
            commands: [
              "git checkout main",
              "git merge staging",
              "git log --oneline -6",
            ],
          }}
        />

        {/* Compare table */}
        <section className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
            Same example — what changed?
          </h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="py-2 pr-2">Method</th>
                <th className="py-2 pr-2">staging after feature</th>
                <th className="py-2">main after release</th>
              </tr>
            </thead>
            <tbody className="text-zinc-600 dark:text-zinc-400">
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2 font-medium text-blue-600">Normal merge</td>
                <td className="py-2">C, D, E, M</td>
                <td className="py-2">all commits + M, M2</td>
              </tr>
              <tr className="border-b border-zinc-100 dark:border-zinc-800">
                <td className="py-2 font-medium text-amber-600">Squash</td>
                <td className="py-2">C, S (one commit)</td>
                <td className="py-2">A, B, C, S</td>
              </tr>
              <tr>
                <td className="py-2 font-medium text-emerald-600">Rebase</td>
                <td className="py-2">C, D′, E′ (straight line)</td>
                <td className="py-2">A, B, C, D′, E′</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-4 text-xs text-zinc-500">
            feature/login still has D,E after squash/merge — only staging/main
            history shape changes. Rebase rewrites to D′,E′ (same code, new ids).
          </p>
        </section>
      </main>
    </div>
  );
}
