import type { ReactNode } from "react";

/**
 * Надстрочник над заголовком раздела: янтарная плашка с графитовым текстом.
 * Тот же приём, что и в блоке «Наша цель», — держит фирменную пару цветов.
 */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-block rounded-[3px] bg-amber pb-[6px] pl-3 pr-[9px] pt-[7px] font-mono text-[13px] font-medium uppercase leading-none tracking-[0.16em] text-ink max-lg:text-[12px] ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Заголовок раздела с одним подсвеченным словом.
 * Подсветка — янтарная полоса под нижней третью слова, как след маркера:
 * пара «жёлтый + графит» читается, но не спорит с плашкой надстрочника.
 */
export function Headline({
  text,
  mark,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  mark?: string;
  className?: string;
  as?: "h1" | "h2";
}) {
  if (!mark || !text.includes(mark)) return <Tag className={className}>{text}</Tag>;

  const at = text.indexOf(mark);
  return (
    <Tag className={className}>
      {text.slice(0, at)}
      <span className="relative inline-block">
        <span
          aria-hidden="true"
          className="absolute inset-x-[-0.06em] bottom-[0.1em] h-[0.32em] -skew-x-[10deg] rounded-[2px] bg-amber"
        />
        <span className="relative">{mark}</span>
      </span>
      {text.slice(at + mark.length)}
    </Tag>
  );
}
