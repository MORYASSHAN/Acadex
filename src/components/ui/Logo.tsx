import type { SVGProps } from "react";
import { LOGO_PATH } from "@/lib/logo";

export function LogoMark({ className = "", ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 193 213" className={className} aria-hidden fill="currentColor" {...rest}>
      <path d={LOGO_PATH} fillRule="evenodd" />
    </svg>
  );
}

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-6 w-auto text-brand" />
      <span className="text-[19px] font-semibold tracking-[-0.04em]">Acadex</span>
    </span>
  );
}
