import type { ReactNode } from "react";
import type { Block } from "@/blog";

/** Минимальная разметка внутри абзаца: **жирный**. Ничего больше не нужно. */
function inline(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((chunk, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink">
        {chunk}
      </strong>
    ) : (
      chunk
    ),
  );
}

const p = "m-0 text-[17.5px] leading-[1.72] text-graphite";

export function BlogBody({ blocks }: { blocks: readonly Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2
                key={i}
                className="mb-0 mt-8 text-[clamp(24px,2.6vw,32px)] font-semibold leading-tight tracking-[-0.02em] text-ink first:mt-0"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mb-0 mt-4 text-[20px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className={p}>
                {inline(b.text)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="m-0 flex list-none flex-col gap-2.5 p-0">
                {b.items.map((it) => (
                  <li
                    key={it}
                    className="relative pl-6 text-[17px] leading-[1.6] text-graphite before:absolute before:left-0 before:top-[11px] before:h-[6px] before:w-[6px] before:rounded-full before:bg-amber"
                  >
                    {inline(it)}
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="m-0 flex list-none flex-col gap-3 p-0">
                {b.items.map((it, n) => (
                  <li key={it} className="flex gap-4 text-[17px] leading-[1.6] text-graphite">
                    <span className="num-tab mt-[3px] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-graphite font-mono text-[12px] font-medium leading-none text-amber">
                      {n + 1}
                    </span>
                    <span>{inline(it)}</span>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <aside
                key={i}
                className="my-2 border-l-[3px] border-amber bg-cream px-6 py-5 text-[16.5px] leading-[1.6] text-ink"
              >
                {inline(b.text)}
              </aside>
            );
          case "table":
            return (
              <div key={i} className="my-2 overflow-x-auto">
                <table className="w-full min-w-[520px] border-collapse text-left">
                  <thead>
                    <tr>
                      {b.head.map((h) => (
                        <th
                          key={h}
                          className="border-b-2 border-graphite pb-3 pr-6 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-amber-dk last:pr-0"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((row) => (
                      <tr key={row.join()} className="align-top">
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className={`border-b border-line py-4 pr-6 text-[16px] leading-[1.5] last:pr-0 ${
                              ci === 0 ? "font-medium text-ink" : "text-graphite"
                            }`}
                          >
                            {inline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
