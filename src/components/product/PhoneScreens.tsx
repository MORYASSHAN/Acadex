"use client";

/* Mobile app screens, recreated from the Acadex brochure mock-ups. Render inside <Phone>. */
import Icon from "./Icons";
import { d, Num } from "./live";

function Ring({ value, size = 64, stroke = 7, color = "#4f46e5", track = "rgba(0,0,0,0.08)" }: { value: number; size?: number; stroke?: number; color?: string; track?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        className="lv-ring"
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        style={{ ["--c" as string]: c, ["--off" as string]: c * (1 - value / 100) } as React.CSSProperties}
      />
    </svg>
  );
}

/** A notification banner that drops in from the top of the phone. */
function Banner({ title, note, delay = 1.4 }: { title: string; note: string; delay?: number }) {
  return (
    <div className="lv-drop absolute inset-x-3 top-10 z-10 flex items-center gap-3 rounded-[18px] bg-white/95 p-3 shadow-[0_14px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur" style={d(delay)}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-[#4f46e5] text-white">
        <Icon name="bell" className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.04em] text-[#7a7f8c]">Acadex · now</span>
        <span className="block truncate text-[12.5px] font-semibold">{title}</span>
        <span className="block truncate text-[11px] text-[#7a7f8c]">{note}</span>
      </span>
    </div>
  );
}

function TabBar({ active = 0, dark = false }: { active?: number; dark?: boolean }) {
  const tabs = [
    ["home", "Home"],
    ["calendar", "Classes"],
    ["chat", "Chat"],
    ["users", "Profile"],
  ];
  return (
    <div className={`absolute inset-x-0 bottom-0 flex h-[64px] items-start justify-around border-t pt-2 ${dark ? "border-white/10 bg-[#101014]" : "border-black/[0.06] bg-white"}`}>
      {tabs.map(([icon, label], i) => (
        <span key={label} className={`flex flex-col items-center gap-0.5 text-[9.5px] ${i === active ? "text-[#4f46e5]" : dark ? "text-white/40" : "text-[#9aa0ad]"}`}>
          <Icon name={icon} className="h-[19px] w-[19px]" />
          {label}
        </span>
      ))}
    </div>
  );
}

export function StudentHome() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-[11px] text-[#7a7f8c]">Welcome back,</p>
          <p className="text-[21px] font-semibold tracking-[-0.03em]">Alex</p>
        </div>
        <span className="relative grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm">
          <Icon name="bell" className="h-[17px] w-[17px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
        </span>
      </div>

      <div className="mt-4 rounded-[22px] bg-white p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
        <span className="rounded-full bg-[#eef0ff] px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.06em] text-[#4f46e5]">Attendance overview</span>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-[20px] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-[#1e2a5a]">
              Steady
              <br />
              progress
            </p>
            <p className="mt-1.5 text-[10.5px] text-[#7a7f8c]">Meeting 70% of your goal</p>
          </div>
          <div className="relative">
            <Ring value={78} size={74} stroke={8} />
            <span className="absolute inset-0 grid place-items-center text-center text-[15px] font-semibold leading-none">
              <Num to={78} suffix="%" delay={200} />
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-[14px] font-semibold">Today&apos;s classes</p>
        <p className="text-[10.5px] text-[#4f46e5]">View schedule</p>
      </div>
      <div className="mt-2 space-y-2">
        {[
          ["Digital Logic", "09:30 – 10:30 · Room 3.1", "Ongoing"],
          ["Circuits & Systems", "11:00 – 12:00 · Lab 2", "Next"],
        ].map(([t, m, s], i) => (
          <div key={t} className="lv-in flex items-center justify-between rounded-[16px] bg-white p-3.5 shadow-[0_6px_20px_-14px_rgba(0,0,0,0.25)]" style={d(0.4 + i * 0.15)}>
            <div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase ${i === 0 ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#f1f2f6] text-[#7a7f8c]"}`}>{s}</span>
              <p className="mt-1.5 text-[13.5px] font-semibold">{t}</p>
              <p className="text-[10.5px] text-[#7a7f8c]">{m}</p>
            </div>
            <span className="text-[11px] text-[#7a7f8c]">1 hr</span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[14px] font-semibold">Quick actions</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {[
          ["check", "Attend."],
          ["calendar", "Timetable"],
          ["file", "Resources"],
          ["sparkle", "Quizzes"],
        ].map(([i, l]) => (
          <span key={l} className="flex flex-col items-center gap-1 rounded-[14px] bg-white py-2.5 text-[9.5px] text-[#4a4f5c] shadow-[0_6px_20px_-16px_rgba(0,0,0,0.3)]">
            <Icon name={i} className="h-[18px] w-[18px] text-[#4f46e5]" />
            {l}
          </span>
        ))}
      </div>
      <TabBar active={0} />
      <Banner title="Quiz 3 is now open" note="DBMS · closes at 5:00 PM" delay={1.5} />
    </div>
  );
}

export function TeacherHome() {
  return (
    <div className="px-5">
      <div className="flex items-center justify-between pt-2">
        <div>
          <p className="text-[19px] font-semibold tracking-[-0.03em]">Good morning, Dr. Miller</p>
          <p className="mt-0.5 flex items-center gap-1 text-[10.5px] text-[#7a7f8c]">
            <Icon name="calendar" className="h-3 w-3" /> Monday, Feb 23, 2026
          </p>
        </div>
        <span className="h-9 w-9 rounded-full bg-gradient-to-br from-[#c7d2fe] to-[#818cf8]" />
      </div>

      <div className="mt-4 rounded-[22px] bg-[#14161c] p-4 text-white">
        <p className="text-[10.5px] text-white/50">Weekly attendance</p>
        <div className="mt-1 flex items-end justify-between">
          <div>
            <p className="text-[30px] font-semibold leading-none tracking-[-0.03em]">
              <Num to={84.2} decimals={1} suffix="%" />
            </p>
            <p className="mt-1.5 text-[10px] text-white/50">CSE 2024 · Sem 4</p>
          </div>
          <div className="flex h-12 items-end gap-[5px]">
            {[22, 30, 26, 38, 34, 44, 40].map((h, i) => (
              <span key={i} className="lv-bar w-[7px] rounded-[2px] bg-white" style={{ height: h, opacity: 0.35 + i * 0.09, ...d(0.2 + i * 0.07) }} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[14px] font-semibold">Quick access</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[
          ["calendar", "Schedule"],
          ["megaphone", "Announcements"],
          ["users", "Attendance sheets"],
        ].map(([i, l]) => (
          <span key={l} className="flex flex-col items-center gap-1.5 rounded-[14px] bg-white px-1 py-3 text-center text-[9.5px] leading-tight text-[#4a4f5c] shadow-[0_6px_20px_-16px_rgba(0,0,0,0.3)]">
            <Icon name={i} className="h-[19px] w-[19px] text-[#4f46e5]" />
            {l}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <p className="text-[14px] font-semibold">Today&apos;s classes</p>
        <p className="text-[10.5px] text-[#4f46e5]">View schedule</p>
      </div>
      <div className="mt-2 rounded-[16px] bg-white p-3.5 shadow-[0_6px_20px_-14px_rgba(0,0,0,0.25)]">
        <p className="text-[13.5px] font-semibold">Advanced Algorithms</p>
        <p className="mt-0.5 text-[10.5px] text-[#7a7f8c]">Room 4.205 · CSE 2024 · Sem 4</p>
        <div className="mt-2.5 flex items-center justify-between">
          <span className="text-[10.5px] text-[#7a7f8c]">10:00 – 11:00</span>
          <span className="lv-tap flex items-center gap-1 rounded-full bg-[#1e2a5a] px-3 py-1.5 text-[10.5px] font-medium text-white" style={d(1.3)}>
            <Icon name="check" className="h-3 w-3" /> Attendance
          </span>
        </div>
      </div>
      <TabBar active={0} />
      <div
        className="lv-toast absolute inset-x-4 bottom-[76px] z-10 flex items-center gap-2.5 rounded-[14px] bg-[#14161c] px-3.5 py-3 text-white shadow-xl"
        style={d(1.8)}
      >
        <span className="grid h-7 w-7 place-items-center rounded-full bg-[#34d399] text-[#0b2b1f]">
          <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.4} />
        </span>
        <span className="leading-tight">
          <span className="block text-[12px] font-medium">30/32 marked · synced</span>
          <span className="block text-[10px] text-white/55">Works offline, syncs when back online</span>
        </span>
      </div>
    </div>
  );
}

export function ClassChat() {
  const msgs = [
    { me: false, who: "Riya (CR)", text: "DBMS lab moved to Room 204 today 📍", time: "9:12" },
    { me: false, who: "Prof. Sharma", text: "Thanks Riya. Bring your ER diagrams.", time: "9:14" },
    { me: true, who: "", text: "Got it, see you there!", time: "9:15" },
    { me: false, who: "Riya (CR)", text: "Quiz 3 opens at 5 PM on Acadex.", time: "9:20" },
  ];
  return (
    <div className="flex h-[calc(100%-44px)] flex-col">
      <div className="flex items-center gap-3 border-b border-black/[0.06] bg-white px-5 pb-3 pt-1">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eef0ff] text-[12px] font-semibold text-[#4f46e5]">2B</span>
        <div className="leading-tight">
          <p className="text-[14px] font-semibold">CSE 2B · Class group</p>
          <p className="text-[10.5px] text-[#15803d]">64 members · 12 online</p>
        </div>
      </div>
      <div className="flex-1 space-y-2.5 px-4 py-4">
        <p className="mx-auto w-fit rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[9.5px] text-[#7a7f8c]">Today</p>
        {msgs.map((m, i) => (
          <div key={i} className={`lv-in flex ${m.me ? "justify-end" : "justify-start"}`} style={d(0.3 + i * 0.55)}>
            <div className={`max-w-[78%] rounded-[16px] px-3 py-2 text-[12px] leading-snug ${m.me ? "rounded-br-[5px] bg-[#4f46e5] text-white" : "rounded-bl-[5px] bg-white shadow-[0_4px_14px_-10px_rgba(0,0,0,0.3)]"}`}>
              {!m.me && <p className="mb-0.5 text-[10px] font-semibold text-[#4f46e5]">{m.who}</p>}
              {m.text}
              <p className={`mt-0.5 text-right text-[9px] ${m.me ? "text-white/70" : "text-[#9aa0ad]"}`}>
                {m.time}
                {m.me ? " ✓✓" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-[64px] flex items-center gap-2 border-t border-black/[0.06] bg-white px-4 py-2.5">
        <span className="flex-1 rounded-full bg-[#f1f2f6] px-3.5 py-2 text-[11px] text-[#9aa0ad]">Message the class…</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#4f46e5] text-white">
          <Icon name="chat" className="h-4 w-4" />
        </span>
      </div>
      <TabBar active={2} />
    </div>
  );
}

export function AttendanceDetail() {
  // March 2026 starts on a Sunday
  const absent = [5, 12, 19];
  const holiday = [8];
  return (
    <div className="px-5">
      <p className="pt-2 text-[19px] font-semibold tracking-[-0.03em]">Attendance</p>
      <div className="mt-3 flex items-center gap-4 rounded-[22px] bg-white p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
        <div className="relative">
          <Ring value={68} size={78} stroke={8} color="#f59e0b" />
          <span className="absolute inset-0 grid place-items-center text-[16px] font-semibold">
            <Num to={68} suffix="%" delay={200} />
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-[13px] font-semibold leading-tight">Database Management Systems</p>
          <p className="mt-1 text-[10px] text-[#7a7f8c]">Prof. R. Sharma</p>
          <p className="mt-1.5 flex gap-2 text-[10px]">
            <span className="text-[#15803d]">● 18 present</span>
            <span className="text-[#dc2626]">● 4 absent</span>
          </p>
        </div>
      </div>
      <p className="lv-in mt-2.5 rounded-[12px] bg-[#fff7ed] px-3 py-2 text-[10.5px] text-[#9a3412]" style={d(1.6)}>
        Attend 6 more classes to reach 75%.
      </p>

      <div className="mt-3 rounded-[22px] bg-white p-4 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]">
        <p className="text-[13px] font-semibold">March 2026</p>
        <div className="mt-2 grid grid-cols-7 gap-y-1.5 text-center text-[10.5px]">
          {["S", "M", "T", "W", "T", "F", "S"].map((w, i) => (
            <span key={i} className="text-[9.5px] text-[#9aa0ad]">
              {w}
            </span>
          ))}
          {Array.from({ length: 31 }).map((_, i) => {
            const day = i + 1;
            const weekend = (i % 7 === 0) || (i % 7 === 6);
            const cls = absent.includes(day)
              ? "bg-[#fee2e2] text-[#b91c1c]"
              : holiday.includes(day)
                ? "bg-[#f1f2f6] text-[#9aa0ad]"
                : weekend || day > 24
                  ? "text-[#9aa0ad]"
                  : "bg-[#dcfce7] text-[#15803d]";
            return (
              <span key={day} className={`lv-dot mx-auto grid h-[26px] w-[26px] place-items-center rounded-full ${cls}`} style={d(0.3 + i * 0.035)}>
                {day}
              </span>
            );
          })}
        </div>
      </div>
      <TabBar active={1} />
    </div>
  );
}
