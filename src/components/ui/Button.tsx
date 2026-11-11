import type { ReactNode } from "react";

type Variant = "dark" | "light" | "ghost" | "white" | "fg" | "outline" | "accent";

const variants: Record<Variant, string> = {
  dark: "bg-ink text-white hover:bg-ink-2",
  light: "bg-tile text-ink hover:bg-[#e3e3e1]",
  ghost: "border border-line text-ink hover:border-ink/30",
  white: "bg-white text-ink hover:bg-white/90",
  // follow the current section theme
  fg: "bg-[var(--fg)] text-[var(--bg)] hover:opacity-90",
  outline: "border-2 border-[color-mix(in_srgb,var(--fg)_35%,transparent)] text-[var(--fg)] hover:border-[var(--fg)]",
  accent: "bg-[var(--ac)] text-[var(--bg)] hover:opacity-90",
};

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Button({
  href,
  children,
  variant = "dark",
  arrow = false,
  className = "",
  type,
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = `group inline-flex h-12 items-center justify-center gap-2.5 rounded-[14px] px-6 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-300 disabled:opacity-60 ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-0.5" />}
    </>
  );
  return href ? (
    <a href={href} className={cls}>
      {content}
    </a>
  ) : (
    <button type={type ?? "button"} className={cls} disabled={disabled}>
      {content}
    </button>
  );
}
