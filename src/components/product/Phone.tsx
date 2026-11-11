import type { ReactNode } from "react";

/** A plain phone body for mobile app screens. Design size 300 × 620. */
export default function Phone({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div className="relative h-[620px] w-[300px] rounded-[46px] bg-[#0d0d0f] p-[9px] shadow-[0_50px_90px_-30px_rgba(0,0,0,0.55),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
      <div className={`relative h-full w-full overflow-hidden rounded-[38px] ${dark ? "bg-[#101014] text-white" : "bg-[#f5f6fa] text-[#14161c]"}`}>
        {/* status bar */}
        <div className="flex h-11 items-center justify-between px-7 pt-1 text-[12px] font-semibold">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2.5 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black" />
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span key={h} className="w-[3px] rounded-[1px] bg-current" style={{ height: h }} />
              ))}
            </span>
            <span className="ml-1 h-[10px] w-[20px] rounded-[3px] border border-current p-[1px]">
              <span className="block h-full w-[70%] rounded-[1px] bg-current" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
