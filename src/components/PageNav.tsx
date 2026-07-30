"use client";

import { useEffect, useState } from "react";

/** Прилипающее меню по разделам длинной страницы. Подсвечивает активный раздел. */
export function PageNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-140px 0px -55% 0px", threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Разделы страницы"
      className="sticky top-[68px] z-30 border-y border-line bg-white/92 backdrop-blur-md"
    >
      <div className="mx-auto w-full max-w-[1180px] px-8 max-lg:px-5">
        <ul className="scrollbar-none -mx-1 flex list-none gap-1 overflow-x-auto p-0 py-2.5">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={active === i.id ? "true" : undefined}
                className={`block whitespace-nowrap rounded-full px-4 py-2 text-[14px] no-underline transition-colors ${
                  active === i.id
                    ? "bg-graphite font-medium text-white"
                    : "text-muted hover:bg-cream hover:text-ink"
                }`}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
