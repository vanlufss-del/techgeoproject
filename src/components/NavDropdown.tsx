"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";

type Item = { label: string; href: string };

/** Пункт шапки с выпадающим списком.
 *  Открывается наведением и с клавиатуры, закрывается по Esc и клику вне. */
export function NavDropdown({ label, href, items }: { label: string; href: string; items: readonly Item[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={href}
        aria-expanded={open}
        aria-controls={id}
        onFocus={() => setOpen(true)}
        className="flex items-center gap-1.5 whitespace-nowrap py-2 text-[15px] text-white/90 no-underline transition hover:text-amber [text-shadow:0_1px_12px_rgba(0,0,0,.4)]"
      >
        {label}
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={`text-amber transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </Link>

      <div
        id={id}
        role="group"
        aria-label={label}
        className={`absolute left-1/2 top-full z-50 w-[268px] -translate-x-1/2 pt-3 transition-all duration-200 ${
          open ? "visible opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="relative rounded-xl border border-white/12 bg-[rgba(28,32,36,.98)] p-2 shadow-[0_18px_44px_rgba(0,0,0,.45)] backdrop-blur-md">
          <span className="absolute -top-[6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-white/12 bg-[rgba(28,32,36,.98)]" />
          {items.map((it) => (
            <Link
              key={it.href + it.label}
              href={it.href}
              onClick={() => setOpen(false)}
              className="relative block rounded-lg px-4 py-2.5 text-[14.5px] leading-snug text-white/82 no-underline transition-colors hover:bg-white/[0.07] hover:text-white"
            >
              {it.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
