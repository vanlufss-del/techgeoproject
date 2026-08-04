"use client";

import { useEffect } from "react";
import { reachGoal, type Goal } from "@/lib/metrika";

/** Один слушатель на весь сайт вместо обработчика на каждой ссылке.
 *
 *  Телефон и мессенджеры разбросаны по шапке, подвалу, форме, блоку призыва
 *  и странице контактов — навешивать обработчики поштучно значит однажды забыть
 *  про новое место. Здесь событие ловится на всплытии и цель определяется
 *  по адресу ссылки, поэтому новые кнопки учитываются сами. */
export function GoalTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      let goal: Goal | null = null;

      if (href.startsWith("tel:")) goal = "phone_click";
      else if (href.includes("wa.me")) goal = "whatsapp_click";
      else if (href.includes("max.ru")) goal = "max_click";
      else if (href.startsWith("mailto:")) goal = "email_click";

      if (goal) reachGoal(goal);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
