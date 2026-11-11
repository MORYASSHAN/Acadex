/**
 * Product story for the sections below the hero.
 * Sources: the Acadex Introductory Brochure (Drive), the product screen recording (Drive),
 * and the live site scan (docs/source-content-full-scan.txt).
 * Items marked CHECK need the client's confirmation before launch.
 */

export const reel = {
  title: "College, simplified.",
  left: "Less chaos.",
  right: "More clarity.",
  // each step swaps the centre frame while the page is pinned
  steps: [
    { key: "dashboard", label: "Web app · Admin", caption: "A live overview of your whole institution. Click any card to drill into the details." },
    { key: "student", label: "Mobile · Student", caption: "Classes, attendance and updates in one place, so students can track progress without the hassle." },
    { key: "teacher", label: "Mobile · Teacher", caption: "Quick access to schedules, announcements and attendance sheets for every class." },
    { key: "attendance", label: "Attendance", caption: "Subject-wise attendance with a monthly view, online or offline." },
    { key: "campus", label: "Campus life", caption: "Announcements and events reach the right students, teachers and groups instantly." },
    { key: "finance", label: "Finance & HR", caption: "Fees, payroll and self-service run on the same platform as academics." },
  ],
};

export const about = {
  label: "Who we are",
  lead: "Acadex is building an AI-powered smarter way for colleges and universities to manage academic operations.",
  goal: "Our goal is to make academic management more structured, efficient, and transparent for administrators, teachers, and students.",
  body: [
    "We help institutions move beyond manual processes, disconnected tools, and inefficient communication by bringing core academic workflows into one unified digital platform.",
    "Whether you are a standalone college or part of a larger university system, our scalable infrastructure adapts to your specific requirements, with focused access for administrators, faculty, students, and system owners.",
  ],
  highlights: [
    { title: "Easy setup", body: "Connect your college and begin configuring your academic operations in minutes." },
    { title: "Fast operations", body: "Lightning-fast user management, bulk enrollments, and performance tracking without lag." },
    { title: "Enterprise security", body: "Student data protected by strong security standards and automatic backups." },
  ],
};

// Five problems from the brochure. Each one maps to one piece of the Acadex mark.
export const problems = {
  label: "Problems universities face",
  title: "Five things that break a campus",
  outro: "Acadex puts the pieces back together.",
  items: [
    { title: "Inefficient manual processes", body: "A lot of documents and fragmented tools make academic administration inconvenient, slow and difficult to manage." },
    { title: "Communication gaps", body: "Important announcements don't always reach students, faculty and administration. Inboxes are overloaded, so updates get overlooked." },
    { title: "Scattered institutional resources", body: "Classrooms, academic data, events and student records are hard to manage without a centralized system." },
    { title: "No centralized academic data", body: "Without one unified system, accessing and analyzing academic information becomes difficult for institutions." },
    { title: "No real-time attendance", body: "Manual attendance leads to delays, errors and limited visibility for administrators." },
  ],
};

export type RoleKey = "students" | "teachers" | "crs" | "admins";

export const apps = {
  label: "Apps for everyone",
  title: "One Acadex. Every screen.",
  intro: "A mobile app for students and teachers, and a full web app for administrators. Everyone gets the view their role needs, all on the same live data.",
  // CHECK: confirm which app stores the mobile app is published on before naming them.
  platforms: [
    { name: "Web app", note: "Any modern browser" },
    { name: "Mobile app", note: "Students & teachers" },
    { name: "Dark mode", note: "On every screen" },
  ],
  roles: [
    {
      key: "students" as RoleKey,
      name: "Students",
      body: "Track progress without the hassle: today's classes, subject-wise attendance, quizzes, resources and every announcement that matters.",
      points: ["Subject-wise attendance", "Today's classes & timetable", "Quizzes & results", "Events & community", "Self-service: library, transport, placements, grievances"],
    },
    {
      key: "teachers" as RoleKey,
      name: "Teachers",
      body: "Mark attendance faster, share resources, run quizzes, track syllabus coverage and keep private notes on student groups.",
      points: ["Fast attendance marking", "Syllabus coverage tracking", "Quiz builder & grading", "Student groups & evaluations", "Leave, payslips & appraisal"],
    },
    {
      key: "crs" as RoleKey,
      name: "Class reps",
      body: "Keep the class informed with updates and group chats, using only the access the college gives you.",
      points: ["Class announcements", "Group & subject chats", "Schedule changes", "Scoped permissions"],
    },
    {
      key: "admins" as RoleKey,
      name: "Administrators",
      body: "Run the whole institution from one dashboard: structure, people, fees, payroll, workflows, reports and access control.",
      points: ["Institution overview", "Academic structure", "Fees, payroll & accounting", "Workflow engine & rules", "Roles, policies & audit logs"],
    },
  ],
};

export type Module = { name: string; body?: string };

// Every module, from the brochure and the product recording.
export const modules = {
  label: "Features",
  title: "Everything a campus runs on",
  intro: "Academic, administrative, financial and campus life, in one connected platform.",
  groups: [
    {
      name: "Academics",
      items: [
        { name: "Institution setup & academic structure", body: "Manage colleges, departments, sections, courses, subjects, classes, subject groups, students, teachers, and mentorship mappings from one academic backbone." },
        { name: "Digital timetable & academic calendar", body: "Create class schedules, manage temporary reschedules or cancellations, and maintain a structured academic calendar for semester-wide planning." },
        { name: "Syllabus planning & coverage tracking", body: "Define subject-wise syllabus modules and topics, let teachers track topic completion, and give students visibility into academic progress." },
        { name: "Quiz & assessment system", body: "Create quizzes with scheduling, timing, grading, analytics, result publishing, draft saving, and student response tracking." },
        { name: "Student grouping & assessment workspace", body: "Let teachers create project or lab groups, assign students, record repeated evaluations, and maintain private academic notes." },
        { name: "Faculty feedback system", body: "Collect structured student feedback for teachers through controlled, optionally anonymous forms with moderation and reporting support." },
        { name: "Research" },
      ] as Module[],
    },
    {
      name: "Attendance",
      items: [
        { name: "Smart attendance system", body: "Real-time attendance tracking with online and offline support, giving teachers faster marking tools and students clear subject-wise visibility." },
        { name: "Attendance policies & analytics", body: "Configure attendance rules, monitor subject and class performance, and quickly identify students falling below required thresholds." },
        { name: "Class attendance ranking" },
        { name: "Face photo & identity verification", body: "Manage secure face-photo uploads, update requests, and approval workflows to support identity-linked academic operations." },
      ] as Module[],
    },
    {
      name: "Campus life",
      items: [
        { name: "Real-time notifications & announcements", body: "Instantly deliver announcements, schedule changes, and important institutional updates to the right students, teachers, and academic groups." },
        { name: "Group communication & real-time chat", body: "Direct chats, group chats, and subject-wise conversations with live delivery, read receipts, and message sync." },
        { name: "Events, registration & selections", body: "Plan seminars, workshops, meetups, and campus events with registration, approvals, participant limits, and round-wise selections." },
        { name: "Community, recommendations & sharing", body: "Support campus communities, clubs, and societies through shared resources, peer recommendations, comments, voting, and moderated discovery." },
        { name: "Smart resource management", body: "Organize class materials, documents, and institutional resources with approval flows, search, and structured categorization." },
        { name: "Appointment booking & approvals", body: "Review incoming requests, assign a slot, and keep appointment status aligned with each participant." },
        { name: "Emergency contacts", body: "Maintain college-specific emergency directories such as medical, transport, security, and helpline contacts for quick access when needed." },
      ] as Module[],
    },
    {
      name: "Finance & HR",
      items: [
        { name: "Fee structures & ledger" },
        { name: "Payments & concessions" },
        { name: "Refunds & recovery" },
        { name: "Government collections" },
        { name: "Fee automation & accounting" },
        { name: "Payroll, salary grades & payslips" },
        { name: "Leave & appraisal" },
        { name: "No-dues" },
      ] as Module[],
    },
    {
      name: "Student services",
      items: [
        { name: "Admissions & applications" },
        { name: "Placements" },
        { name: "Library" },
        { name: "Transport" },
        { name: "Grievances" },
        { name: "Self-service profile" },
      ] as Module[],
    },
    {
      name: "Admin & control",
      items: [
        { name: "Dynamic forms & workflow management", body: "Build reusable digital forms for semester registration, electives, feedback, and custom institutional workflows with targeting, validation, and analytics." },
        { name: "Workflow engine & rule library" },
        { name: "Role & permission hierarchy", body: "Control who can access, create, approve, or manage each module through flexible role-based permissions for admins, teachers, CRs, and students." },
        { name: "Bulk import, secure login & onboarding", body: "Speed up rollout with bulk student and teacher import, college-scoped authentication, and OTP-based verification or recovery flows." },
        { name: "Admin dashboard, audit & recovery", body: "Dashboards, audit logs, activity history, security monitoring, and recycle-bin style recovery for deleted data." },
        { name: "Executive reports & dashboard layouts" },
        { name: "Website CMS" },
      ] as Module[],
    },
  ],
};

export const ai = {
  label: "AI-powered",
  title: "AI that does the work",
  intro: "An AI assistant and prompt-driven agent built into Acadex. It answers academic questions using your own institution's data, and carries out tasks you'd otherwise do by hand.",
  modes: [
    { word: "Ask", title: "Academic queries", body: "Students, teachers and admins ask questions in plain language and get answers straight away." },
    { word: "Know", title: "Contextual access", body: "Answers come from your institution's own data, scoped to what each role is allowed to see." },
    { word: "Do", title: "Prompt-driven tasks", body: "The agent turns a single prompt into actions: finding records, drafting notices and sending them." },
  ],
  demo: {
    prompt: "Remind CSE 2B students below 75% in DBMS, and copy their mentors.",
    steps: [
      "Read the attendance policy · threshold 75%",
      "Found 6 students below threshold in DBMS",
      "Drafted an announcement for CSE 2B",
      "Sent to 6 students and 2 mentors",
    ],
    done: "Done · 4 actions completed",
  },
};

// CHECK: wording built from real features (class attendance ranking, progress goals,
// community voting, round-wise event selections). Confirm with the client.
export const gamify = {
  label: "Engagement",
  title: "Make progress something to chase",
  intro: "Rankings, goals and community votes turn everyday academic work into progress students can see.",
  ranking: {
    title: "Class attendance ranking",
    rows: [
      { name: "CSE 2B", value: 94 },
      { name: "ECE 3A", value: 91 },
      { name: "ICE-B Sem 4", value: 87 },
      { name: "ME 2A", value: 82 },
      { name: "CIV 3B", value: 76 },
    ],
  },
  goal: { title: "Steady progress", value: 78, note: "Meeting 70% of your goal" },
  community: { title: "Top recommendation this week", item: "DBMS normalisation notes", votes: 128 },
  rounds: { title: "Design & UI/UX Hackathon", round: 2, of: 3, status: "Selected for next round" },
};

export const security = {
  label: "Security",
  title: "Your data. Your walls.",
  intro: "Built for institutions that can't afford to get data wrong. Every layer is designed so the right people see the right things, and nothing is lost.",
  layers: [
    { name: "In-house hosting", body: "Run Acadex on your own infrastructure, so institutional data stays with you rather than with us." },
    { name: "Encryption & audits", body: "Industry-standard encryption, regular security audits, and automatic backups." },
    { name: "College-scoped sign-in", body: "Accounts are scoped to your college, with OTP-based verification and recovery." },
    { name: "Identity verification", body: "Face-photo uploads with update requests and approval workflows." },
    { name: "Roles & UI policies", body: "Role-based permissions and UI policies decide who can view, create, approve or manage each module." },
    { name: "Audit & monitoring", body: "Audit logs, activity history and security monitoring for every important action." },
    { name: "Recovery bin", body: "Deleted data can be restored from a recycle-bin style recovery." },
  ],
};

export const why = {
  label: "Why us",
  title: "Why Acadex",
  items: [
    { title: "All-in-one", body: "Manage attendance, schedules, communication, resources, and workflows from one centralized system." },
    { title: "Less manual work", body: "Reduce paperwork, repetitive tasks, and fragmented processes across departments so teams move faster." },
    { title: "Better control", body: "Give administrators clear visibility into academic activities, records, and day-to-day operations." },
    { title: "Role-based & secure", body: "Ensure the right access for the right people with controlled permissions and reliable data handling." },
    { title: "Future-ready", body: "Built to support growing institutional needs with digital workflows and AI-enabled assistance." },
    { title: "Your data, your control", body: "In-house hosting lets colleges manage and store their data within their own infrastructure." },
  ],
};
