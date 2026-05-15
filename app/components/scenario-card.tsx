type ScenarioCardProps = {
  number: number;
  situation: string;
  feeling: string;
  doThis: string[];
  pickCommand: string;
  learn: string;
};

export function ScenarioCard({
  number,
  situation,
  feeling,
  doThis,
  pickCommand,
  learn,
}: ScenarioCardProps) {
  return (
    <article className="rounded-xl border-2 border-dashed border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-lg font-bold text-white">
          {number}
        </span>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
            {situation}
          </h3>
          <p className="text-sm text-zinc-500 italic">&ldquo;{feeling}&rdquo;</p>
        </div>
      </div>
      <ol className="mb-4 space-y-2">
        {doThis.map((step, i) => (
          <li
            key={step}
            className="flex gap-2 text-sm text-zinc-700 dark:text-zinc-300"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold dark:bg-zinc-700">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className="rounded-lg bg-zinc-950 px-3 py-2 font-mono text-xs text-emerald-300">
        <span className="text-zinc-500">Try: </span>
        {pickCommand}
      </p>
      <p className="mt-3 text-xs text-zinc-500">
        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
          You learn:{" "}
        </span>
        {learn}
      </p>
    </article>
  );
}
