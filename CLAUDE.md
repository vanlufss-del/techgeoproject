# STUDIO RULES — Weblove Method

## Кто я
Соло веб-дизайнер. Строю кинематографические анимированные сайты для малого и среднего бизнеса с помощью AI. Работаю через Claude Code.

## Стек по умолчанию
- Next.js 15+ (App Router)
- TypeScript everywhere
- Tailwind CSS v4
- Framer Motion (UI-анимации)
- GSAP + ScrollTrigger (скролл-кинематография)
- Lenis (плавный скролл)
- shadcn/ui (компоненты)
- Lucide React (иконки)

## Бэкенд (когда нужен)
- Sanity CMS (контент)
- Supabase (auth + БД + storage)
- Stripe Checkout (платежи)
- Resend (транзакционный email)
- Vercel (хостинг + edge functions)

## Конвенции кода
- Server Components по умолчанию. Клиентские — помечать `'use client'`
- Только именованные экспорты (не default)
- Только Tailwind-классы, никаких inline-стилей
- Все изображения через `next/image`
- Все тексты в `src/copy.ts` (для мультиязычности)
- Анимационные хуки в `/src/animations/`
- 3D-сцены в `/src/scenes/`

## Бюджет производительности
- Lighthouse Performance >= 90 desktop, >= 80 mobile
- LCP < 2.5s, CLS < 0.1, INP < 200ms
- Hero-изображение < 200 KB (AVIF/WebP)
- Hero-видео < 2 MB (MP4 + WebM)
- Никакая анимация не работает при `prefers-reduced-motion: reduce`
- Анимировать ТОЛЬКО `transform`, `opacity`, `filter`, `clip-path`
- НИКОГДА не анимировать `width`, `height`, `top`, `left`, `margin`, `padding`

## Структура папок
```
/src
  /app          — маршруты Next.js
  /components   — переиспользуемые компоненты
  /animations   — хуки анимации (useFadeUp, useSmoothCursor и т.д.)
  /scenes       — 3D-сцены (R3F, Spline)
  /lib          — утилиты, клиенты (supabase, sanity, stripe)
  /copy.ts      — все тексты сайта
  /styles       — глобальные стили
```

## Команды
- `npm run dev` — dev-сервер
- `npm run build` — продакшн-сборка
- `npm run lint` — проверка стиля

## Запрещено
- Inline-стили
- Установка пакетов без проверки размера бандла
- `any` типы в TypeScript
- CSS-анимации layout-свойств
- Автовоспроизведение аудио без кнопки отключения
- Пропуск чек-листа полировки перед запуском
- Пропуск `prefers-reduced-motion` для любой анимации
