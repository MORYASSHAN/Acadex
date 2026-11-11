/* Web app screens, recreated from the Acadex admin app with neutral demo data. Design size 1000 × 625. */
"use client";

import { LogoMark } from "../ui/Logo";
import Icon from "./Icons";
import { d, Num } from "./live";

function Toast({ icon, title, note, delay = 1.6, className = "" }: { icon: string; title: string; note: string; delay?: number; className?: string }) {
  return (
    <div className={`lv-toast absolute flex items-center gap-3 rounded-[14px] bg-[#14161c] px-4 py-3 text-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.45)] ${className}`} style={d(delay)}>
      <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#34d399] text-[#0b2b1f]">
        <Icon name={icon} className="h-4 w-4" strokeWidth={2.2} />
      </span>
      <span className="leading-tight">
        <span className="block text-[12.5px] font-medium">{title}</span>
        <span className="block text-[10.5px] text-white/55">{note}</span>
      </span>
    </div>
  );
}

const nav: { group: string; items: { icon: string; label: string; key: string }[] }[] = [
  { group: "Overview", items: [{ icon: "grid", label: "Dashboard", key: "dashboard" }] },
  {
    group: "Academic",
    items: [
      { icon: "building", label: "Departments", key: "departments" },
      { icon: "book", label: "Subjects", key: "subjects" },
      { icon: "users", label: "Students", key: "students" },
      { icon: "calendar", label: "Timetable", key: "timetable" },
    ],
  },
  {
    group: "Campus",
    items: [
      { icon: "megaphone", label: "Announcements", key: "announcements" },
      { icon: "pin", label: "Events", key: "events" },
      { icon: "chat", label: "Chat", key: "chat" },
    ],
  },
  {
    group: "Finance",
    items: [
      { icon: "wallet", label: "Fees", key: "fees" },
      { icon: "file", label: "Payroll", key: "payroll" },
    ],
  },
  {
    group: "Access control",
    items: [
      { icon: "shield", label: "Roles & policies", key: "roles" },
      { icon: "workflow", label: "Workflows", key: "workflows" },
    ],
  },
];

function Shell({ active, children }: { active: string; children: React.ReactNode }) {
  return (
    <div className="flex h-[625px] w-[1000px] overflow-hidden bg-[#f7f8fb] text-[#14161c]" style={{ fontFamily: "var(--font-inter-tight)" }}>
      <aside className="flex w-[196px] shrink-0 flex-col border-r border-[#e8eaf0] bg-white px-3 py-4">
        <div className="flex items-center gap-2 px-2">
          <LogoMark className="h-5 w-auto text-[#4f46e5]" />
          <span className="text-[15px] font-semibold tracking-[-0.03em]">Acadex</span>
        </div>
        <div className="mt-5 flex-1 space-y-3.5 overflow-hidden">
          {nav.map((g) => (
            <div key={g.group}>
              <p className="px-2 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#9aa0ad]">{g.group}</p>
              <ul className="mt-1.5 space-y-0.5">
                {g.items.map((it) => (
                  <li
                    key={it.key}
                    className={`flex items-center gap-2.5 rounded-[9px] px-2 py-[6px] text-[12.5px] ${
                      it.key === active ? "bg-[#eef0ff] font-medium text-[#3f37c9]" : "text-[#4a4f5c]"
                    }`}
                  >
                    <Icon name={it.icon} className="h-[15px] w-[15px]" />
                    {it.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2.5 rounded-[12px] bg-[#f4f5f9] p-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#e3e6ff] text-[11px] font-semibold text-[#3f37c9]">IA</span>
          <span className="leading-tight">
            <span className="block text-[12px] font-medium">Institute Admin</span>
            <span className="block text-[10.5px] text-[#9aa0ad]">Super admin</span>
          </span>
        </div>
      </aside>
      <main className="relative flex-1 overflow-hidden">
        <div className="flex h-[52px] items-center justify-between border-b border-[#e8eaf0] bg-white px-6">
          <div className="flex w-[240px] items-center gap-2 rounded-[10px] border border-[#e8eaf0] px-3 py-1.5 text-[12px] text-[#9aa0ad]">
            <Icon name="search" className="h-3.5 w-3.5" />
            Search features…
            <span className="ml-auto rounded-[5px] border border-[#e8eaf0] px-1.5 text-[10px]">⌘K</span>
          </div>
          <div className="flex items-center gap-3 text-[#6b7180]">
            <span className="flex items-center gap-1.5 rounded-full bg-[#eef0ff] px-2.5 py-1 text-[11px] font-medium text-[#3f37c9]">
              <Icon name="sparkle" className="h-3 w-3" /> Ask AI
            </span>
            <Icon name="bell" className="h-[18px] w-[18px]" />
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}

function Title({ crumb, title, sub }: { crumb?: string; title: string; sub: string }) {
  return (
    <div>
      {crumb && <p className="text-[11px] text-[#9aa0ad]">{crumb}</p>}
      <h4 className="text-[22px] font-semibold tracking-[-0.03em]">{title}</h4>
      <p className="mt-0.5 text-[12px] text-[#6b7180]">{sub}</p>
    </div>
  );
}

export function DashboardScreen() {
  const stats = [
    { icon: "users", label: "Total students", value: 882, note: "Enrolled" },
    { icon: "cap", label: "Total teachers", value: 38, note: "Active faculty" },
    { icon: "building", label: "Departments", value: 7, note: "Academic depts." },
    { icon: "book", label: "Courses", value: 3, note: "Active courses" },
    { icon: "grid", label: "Classes", value: 27, note: "Class sections" },
  ];
  const sem = [62, 38, 51, 74, 44, 58];
  const ranking = [
    ["CSE 2B", "94.1%"],
    ["ECE 3A", "91.6%"],
    ["ICE-B Sem 4", "87.3%"],
    ["ME 2A", "82.0%"],
  ];
  return (
    <Shell active="dashboard">
      <Title title="Dashboard" sub="Your role-specific overview. Click any card to drill into details." />
      <div className="mt-4 rounded-[14px] border border-[#e8eaf0] bg-white p-4">
        <p className="text-[12.5px] font-semibold">Institution overview · Northfield College</p>
        <div className="mt-3 grid grid-cols-5 gap-2.5">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 rounded-[11px] border border-[#eceef3] p-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#f4f5f9] text-[#6b7180]">
                <Icon name={s.icon} className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[10px] text-[#6b7180]">{s.label}</span>
                <span className="block text-[17px] font-semibold">
                  <Num to={s.value} />
                </span>
                <span className="block text-[9.5px] text-[#9aa0ad]">{s.note}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 rounded-[14px] border border-[#e8eaf0] bg-white p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-[12.5px] font-semibold">Attendance summary</p>
          <p className="text-[10.5px] text-[#6b7180]">Threshold 75%</p>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {(
            [
              ["Attendance OK", 90, "≥ 75%", "bg-[#ecfdf3] border-[#bfeccf] text-[#15803d]"],
              ["Below threshold", 9, "< 75%", "bg-[#fff1f2] border-[#fecdd3] text-[#be123c]"],
              ["Critical (< 65%)", 3, "Needs urgent action", "bg-[#fff7ed] border-[#fed7aa] text-[#c2410c]"],
            ] as const
          ).map(([l, v, n, c], i) => (
            <div key={l} className={`lv-in rounded-[11px] border p-3 ${c}`} style={d(0.3 + i * 0.12)}>
              <p className="text-[10.5px]">{l}</p>
              <p className="text-[20px] font-semibold text-[#14161c]">
                <Num to={v} delay={300} />
              </p>
              <p className="text-[9.5px]">{n}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-[1.2fr_1fr] gap-3">
        <div className="rounded-[14px] border border-[#e8eaf0] bg-white p-4">
          <p className="text-[12.5px] font-semibold">Students by semester</p>
          <div className="mt-3 flex h-[86px] items-end gap-3">
            {sem.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1">
                <span className="lv-bar w-full rounded-t-[5px] bg-[#6d66ff]" style={{ height: `${v}px`, opacity: 0.55 + i * 0.07, ...d(0.5 + i * 0.08) }} />
                <span className="text-[9px] text-[#9aa0ad]">S{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[14px] border border-[#e8eaf0] bg-white p-4">
          <p className="text-[12.5px] font-semibold">Class attendance ranking</p>
          <ul className="mt-2 space-y-1.5">
            {ranking.map(([n, v], i) => (
              <li key={n} className="lv-in flex items-center justify-between text-[11.5px]" style={d(0.6 + i * 0.12)}>
                <span>
                  <span className="mr-2 text-[#9aa0ad]">{i + 1}</span>
                  {n}
                </span>
                <span className="font-medium text-[#15803d]">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Toast icon="check" title="Attendance synced" note="CSE 2B · 30/32 marked just now" delay={1.8} className="bottom-5 right-5" />
    </Shell>
  );
}

export function CampusScreen() {
  const ann = [
    ["Exam hall allocation published", "Exams", true],
    ["Urgent: campus closed due to heavy rainfall", "General", true],
    ["Mid-semester exam schedule published", "Exams", false],
    ["Library hours extended during exams", "General", false],
  ] as const;
  const events = [
    ["Data Science Summit 2026", "18 Aug · Main Conference Hall", "Inter-College"],
    ["Design & UI/UX Hackathon 2026", "28 Jul · Design Studio Hall", "Campus"],
    ["Cyber Security Challenge 2026", "12 Jun · Computer Lab Complex", "Inter-College"],
    ["AI & ML Bootcamp 2026", "20 May · Seminar Hall", "Campus"],
  ];
  return (
    <Shell active="announcements">
      <Title crumb="Dashboard › Announcements" title="Announcements" sub="Manage and broadcast announcements" />
      <div className="mt-4 grid grid-cols-[1.25fr_1fr] gap-3">
        <div className="rounded-[14px] border border-[#e8eaf0] bg-white">
          <div className="flex items-center justify-between border-b border-[#eceef3] px-4 py-3">
            <div className="flex w-[200px] items-center gap-2 rounded-[9px] border border-[#e8eaf0] px-2.5 py-1.5 text-[11px] text-[#9aa0ad]">
              <Icon name="search" className="h-3 w-3" /> Search announcements…
            </div>
            <span className="rounded-[9px] bg-[#4f46e5] px-3 py-1.5 text-[11px] font-medium text-white">+ New</span>
          </div>
          <ul>
            {ann.map(([t, c, pin], i) => (
              <li
                key={t}
                className={`flex items-center gap-3 border-b border-[#f1f2f6] px-4 py-3 last:border-0 ${i === 0 ? "lv-new bg-[#f7f7ff]" : ""}`}
                style={i === 0 ? d(0.9) : undefined}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[#eef0ff] text-[#4f46e5]">
                  <Icon name="megaphone" className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12px] font-medium">{t}</span>
                  <span className="block text-[10px] text-[#9aa0ad]">{i === 0 ? "Just now · sending to all students" : `Sent to all students and staff${pin ? " · pinned" : ""}`}</span>
                </span>
                {i === 0 ? (
                  <span className="lv-pulse rounded-full bg-[#4f46e5] px-2 py-0.5 text-[10px] font-medium text-white">New</span>
                ) : (
                  <span className="rounded-full border border-[#e8eaf0] px-2 py-0.5 text-[10px] text-[#4a4f5c]">{c}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[14px] border border-[#e8eaf0] bg-white p-4">
          <div className="flex items-baseline justify-between">
            <p className="text-[12.5px] font-semibold">Upcoming events</p>
            <p className="text-[10.5px] text-[#6b7180]">View all →</p>
          </div>
          <ul className="mt-2.5 space-y-2">
            {events.map(([t, when, k], i) => (
              <li key={t} className="lv-in flex items-center gap-2.5 rounded-[10px] border border-[#eceef3] p-2.5" style={d(0.3 + i * 0.12)}>
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-[#f4f5f9] text-[#6b7180]">
                  <Icon name="calendar" className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block truncate text-[11.5px] font-medium">{t}</span>
                  <span className="block text-[9.5px] text-[#9aa0ad]">{when}</span>
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9.5px] ${
                    k === "Campus" ? "bg-[#eef0ff] text-[#3f37c9]" : "bg-[#fff1e8] text-[#c2410c]"
                  }`}
                >
                  {k}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Toast icon="megaphone" title="Delivered instantly" note="1,248 students · 38 staff notified" delay={1.9} className="bottom-5 left-6" />
    </Shell>
  );
}

export function FinanceScreen() {
  const grades = [
    ["AP-1", "Assistant Professor", "Teaching", "₹68,000", "₹61,200"],
    ["SDE1", "Software Engineer", "Any", "₹42,000", "₹38,400"],
    ["LIB-1", "Librarian", "Non-teaching", "₹36,000", "₹32,900"],
    ["DRV-1", "Driver", "Transport", "₹22,000", "₹20,400"],
  ];
  return (
    <Shell active="payroll">
      <div className="flex items-start justify-between">
        <Title crumb="Payroll › Grades" title="Salary grades" sub="Reusable pay templates assigned to many employees." />
        <span className="rounded-[10px] bg-[#4f46e5] px-3.5 py-2 text-[11.5px] font-medium text-white">+ New grade</span>
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {(
          [
            ["Fee collected", 86, "%", "This semester"],
            ["Pending dues", 142, "", "Students"],
            ["Concessions", 38, "", "Approved"],
            ["Payslips", 64, "", "Sent for October"],
          ] as const
        ).map(([l, v, suf, n], i) => (
          <div key={l} className="lv-in rounded-[12px] border border-[#e8eaf0] bg-white p-3" style={d(0.1 + i * 0.1)}>
            <p className="text-[10.5px] text-[#6b7180]">{l}</p>
            <p className="mt-1 text-[19px] font-semibold">
              <Num to={v} suffix={suf} />
            </p>
            <p className="text-[9.5px] text-[#9aa0ad]">{n}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-[14px] border border-[#e8eaf0] bg-white">
        <div className="grid grid-cols-[80px_1.4fr_1fr_1fr_1fr_60px] border-b border-[#eceef3] px-4 py-2.5 text-[10.5px] font-semibold text-[#6b7180]">
          <span>Code</span>
          <span>Name</span>
          <span>Applicable to</span>
          <span>Gross</span>
          <span>Net</span>
          <span>Active</span>
        </div>
        {grades.map((g, i) => (
          <div key={g[0]} className="lv-in grid grid-cols-[80px_1.4fr_1fr_1fr_1fr_60px] border-b border-[#f1f2f6] px-4 py-3 text-[12px] last:border-0" style={d(0.5 + i * 0.12)}>
            <span className="font-mono text-[11px] text-[#6b7180]">{g[0]}</span>
            <span className="font-medium">{g[1]}</span>
            <span className="text-[#6b7180]">{g[2]}</span>
            <span>{g[3]}</span>
            <span>{g[4]}</span>
            <span className="text-[#15803d]">Yes</span>
          </div>
        ))}
      </div>
      <Toast icon="file" title="Payslips sent" note="64 employees · October" delay={1.9} className="bottom-5 right-5" />
    </Shell>
  );
}
