type CodeBlockProps = {
  title?: string;
  lines: string[];
};

export function CodeBlock({ title, lines }: CodeBlockProps) {
  return (
    <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-950 px-4 py-3 font-mono text-sm leading-relaxed text-emerald-300 dark:border-zinc-800">
      {title ? (
        <div className="mb-2 font-sans text-xs font-medium uppercase tracking-wider text-zinc-500">
          {title}
        </div>
      ) : null}
      {lines.map((line, i) => (
        <div key={i}>
          {line.startsWith("#") ? (
            <span className="text-zinc-500">{line}</span>
          ) : (
            <>
              <span className="select-none text-zinc-500">$ </span>
              {line}
            </>
          )}
        </div>
      ))}
    </pre>
  );
}
