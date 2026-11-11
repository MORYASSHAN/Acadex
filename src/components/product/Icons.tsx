/* Small line icons used inside the product mock-ups (24px grid, stroke = currentColor). */
const paths: Record<string, React.ReactNode> = {
  grid: <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />,
  users: <path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 3.5 6" />,
  cap: <path d="M2.5 9 12 4.5 21.5 9 12 13.5zM6 11v4.5c3.5 2.5 8.5 2.5 12 0V11" />,
  building: <path d="M4 20V5.5L12 3l8 2.5V20M9 20v-4h6v4M8 8h1M8 11.5h1M15 8h1M15 11.5h1M3 20h18" />,
  book: <path d="M4 5.5C6.5 4 9.5 4 12 5.5 14.5 4 17.5 4 20 5.5V19c-2.5-1.5-5.5-1.5-8 0-2.5-1.5-5.5-1.5-8 0z M12 5.5V19" />,
  layers: <path d="M12 3 2.5 8 12 13l9.5-5zM2.5 12.5 12 17.5l9.5-5M2.5 16.5 12 21.5l9.5-5" />,
  shield: <path d="M12 3 5 6v5.5c0 4.2 2.9 7.7 7 9 4.1-1.3 7-4.8 7-9V6z" />,
  alert: <path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 8v5M12 16h.01" />,
  calendar: <path d="M4.5 6h15v14h-15zM4.5 10h15M8.5 3.5v4M15.5 3.5v4" />,
  megaphone: <path d="M4 10v4h3l7 4V6L7 10zM17 9.5a3.5 3.5 0 0 1 0 5" />,
  chat: <path d="M4 5h16v11H10l-4 3.5V16H4z" />,
  wallet: <path d="M4 6.5h14a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H4zM4 6.5 15 3.5v3M16 13.5h.01" />,
  file: <path d="M6 3h8l4 4v14H6zM14 3v4h4" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  bell: <path d="M6 10a6 6 0 0 1 12 0v4l1.5 2.5h-15L6 14zM10 19.5a2 2 0 0 0 4 0" />,
  home: <path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z" />,
  clock: <path d="M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 7.5V12l3 2" />,
  search: <path d="M10.5 4a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM20 20l-4.8-4.8" />,
  sparkle: <path d="M12 3c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7z" />,
  workflow: <path d="M4 4h6v6H4zM14 14h6v6h-6zM7 10v4a3 3 0 0 0 3 3h4" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M21 20H3" />,
  pin: <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />,
};

export default function Icon({ name, className = "h-5 w-5", strokeWidth = 1.7 }: { name: keyof typeof paths | string; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name] ?? paths.grid}
    </svg>
  );
}
