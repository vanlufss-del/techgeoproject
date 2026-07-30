import type { ReactNode } from "react";

/** Знак компании, иконки мессенджеров и услуг. Все декоративные — aria-hidden. */

export function Mark({ size = 44, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <rect x="8" y="8" width="52" height="52" fill="none" stroke={color} strokeWidth="8" />
      <rect x="40" y="40" width="52" height="52" fill="none" stroke={color} strokeWidth="8" />
      <rect x="40" y="40" width="20" height="20" fill="#F2A73B" />
    </svg>
  );
}

export function MaxIcon({ id, size = 36 }: { id: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img">
      <title>MAX</title>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3B6DF5" />
          <stop offset=".45" stopColor="#6E45E8" />
          <stop offset="1" stopColor="#C42BB8" />
        </linearGradient>
      </defs>
      <path fill={`url(#${id})`} d="M12.6 36.2 3.4 46l14.2-4.1z" />
      <path
        fill={`url(#${id})`}
        fillRule="evenodd"
        d="M24 3a21 21 0 1 0 0 42 21 21 0 0 0 0-42Zm0 10.6a10.4 10.4 0 1 1 0 20.8 10.4 10.4 0 0 1 0-20.8Z"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img">
      <title>WhatsApp</title>
      <circle cx="24" cy="24" r="24" fill="#25D366" />
      <path
        fill="#fff"
        d="M33.6 14.3A13.4 13.4 0 0 0 12.4 30.4l-1.9 6.9 7.1-1.9a13.4 13.4 0 0 0 19.8-11.7c0-3.6-1.4-7-3.8-9.4Zm-9.6 20.6c-2 0-4-.6-5.8-1.7l-.4-.2-4.2 1.1 1.1-4.1-.3-.4a11.1 11.1 0 1 1 9.6 5.3Z"
      />
      <path
        fill="#fff"
        d="M30.1 27.1c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2s-.8 1-1 1.2c-.2.2-.4.2-.7.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5 1-1.6.1-.2 0-.4 0-.6l-1.1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.2 0-.6.1-.9.5-1.2 1.3-1.2 3.2-.2 4.8 1.7 2.6 3 4 5.8 5.4 1.7.8 2.9 1 3.9.8.7-.2 2-.9 2.3-1.7.3-.8.3-1.5.2-1.7 0-.2-.3-.3-.6-.4Z"
      />
    </svg>
  );
}

export function MailIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img">
      <title>Почта</title>
      <circle cx="24" cy="24" r="24" fill="#F2A73B" />
      <rect x="13" y="17" width="22" height="15" rx="2.5" fill="none" stroke="#22262B" strokeWidth="2.2" />
      <path d="m13.8 18.6 10.2 6.9 10.2-6.9" fill="none" stroke="#22262B" strokeWidth="2.2" strokeLinejoin="round" />
    </svg>
  );
}

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6 } as const;

export const advIcons: Record<string, ReactNode> = {
  price: <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  check: <><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></>,
  shield: <><path d="M12 2 3 6v6c0 5 3.8 9.3 9 10 5.2-.7 9-5 9-10V6z" /><path d="m9 12 2 2 4-4" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  drone: <><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 10 5 6M15 10l4-4M9 14l-4 4M15 14l4 4" /><circle cx="4" cy="5" r="2" /><circle cx="20" cy="5" r="2" /><circle cx="4" cy="19" r="2" /><circle cx="20" cy="19" r="2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" /></>,
};

export function AdvIcon({ name }: { name: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" {...S} aria-hidden="true">
      {advIcons[name]}
    </svg>
  );
}
