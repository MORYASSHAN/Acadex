/**
 * All copy for the Acadex site, carried over from every page of acadex.ereefian.com
 * (full scan in docs/source-content-full-scan.txt). Components only read from here.
 *
 * Items marked CHECK are on the live site but need the client's confirmation before launch.
 */

export const APP_URL = "https://acadex.ereefian.com";

export const links = {
  login: `${APP_URL}/auth/login`,
  register: `${APP_URL}/auth/signup`,
};

export const nav = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#modules" },
  { label: "AI", href: "#ai" },
  { label: "Security", href: "#security" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  badge: "AI-powered academic operations platform for colleges and universities",
  title: "A smarter way to run academic operations",
  lead: "Acadex is building a smarter way for colleges and universities to manage academic operations.",
  body: "We bring attendance, communication, scheduling, resources, and academic workflows into one unified digital platform for administrators, teachers, and students.",
  primary: "Register Institution",
  secondary: "Login to Dashboard",
  chips: ["Unified digital platform", "Real-time attendance", "Institution-controlled data"],
};

// CHECK: "Active subscriptions: 0" and "90%" are shown on the live site as-is.
export const stats = [
  { label: "Partner colleges", value: "4", note: "Colleges using Acadex to standardize operations." },
  { label: "Active subscriptions", value: "0", note: "Live plans powering production campus workflows." },
  { label: "Countries served", value: "4", note: "Regional rollouts with shared platform governance." },
  { label: "Client satisfaction", value: "90%", note: "Based on handled plan and support request outcomes." },
];

// Replaces the live site's "Trusted by" institution list (removed at the client's request).
export const featureStrip = {
  label: "Platform features",
  title: "Everything your institution needs, in one academic platform",
  items: [
    "Smart Attendance",
    "Attendance Analytics",
    "Digital Timetable",
    "Academic Calendar",
    "Announcements",
    "Resource Management",
    "Quizzes & Assessments",
    "Dynamic Forms",
    "Role-Based Access",
    "Audit Logs",
    "Bulk Import",
    "OTP Login",
    "AI Assistant",
    "In-House Hosting",
  ],
};

export const pricing = {
  label: "Pricing & plans",
  title: "Choose the rollout model that fits your institution.",
  intro: "Start with the plan that matches your institution today, then scale into custom workflows, permissions, deployment support, and AI-enabled operations.",
  saveLabel: "Save 16%",
  note: "All plans include automated enrollment.",
  plans: [
    // CHECK: live plan descriptions were placeholders ("This plan offers basic subscription."), rewritten here.
    // perks below are taken from the live comparison table
    { name: "Basic", users: "Up to 1,500 users", blurb: "The core Acadex platform for a single college.", monthly: 59, annual: 590, perks: ["Course management", "Attendance tracking", "Grade book", "Basic analytics dashboard"], cta: "Purchase Plan" },
    { name: "Premium", users: "Up to 2,500 users", blurb: "More seats and faster support for larger institutions.", monthly: 99, annual: 990, perks: ["Everything in Basic", "Parent portal", "API access & SSO integration", "Advanced analytics, email priority support"], cta: "Purchase Plan", featured: true },
    { name: "Enterprise", users: "Custom", blurb: "For custom deployment, advanced approvals, and college groups.", monthly: null, annual: null, priceNote: "Tailored rollout, governance, and commercial scope.", perks: ["In-house hosting", "Dedicated success team", "Enterprise governance"], cta: "Request Quote" },
  ],
  billedYearly: "Billed yearly with discounted pricing.",
  billedMonthly: "Billed monthly.",
  compareTitle: "Compare plans",
  compareIntro: "See what's included in each plan at a glance.",
  // From the live /plans page. CHECK: it labels the middle plan "Professional" and Basic as "Up to 500";
  // aligned here to the plan cards (Premium, 1,500).
  compare: [
    { feature: "Institutional users", values: ["Up to 1,500", "Up to 2,500", "Unlimited"] },
    { feature: "Course management", values: [true, true, true] },
    { feature: "Attendance tracking", values: [true, true, true] },
    { feature: "Grade book", values: [true, true, true] },
    { feature: "Parent portal", values: [false, true, true] },
    { feature: "Analytics dashboard", values: ["Basic", "Advanced", "Custom"] },
    { feature: "API access", values: [false, true, true] },
    { feature: "SSO integration", values: [false, true, true] },
    { feature: "Custom branding", values: [false, false, true] },
    { feature: "Priority support", values: [false, "Email", "24/7 phone"] },
  ],
};

export const enterprise = {
  label: "Enterprise / Request quote",
  title: "Need institution-controlled deployment or custom academic workflows?",
  body: "We support in-house hosting, role-based permissions, structured rollout, and AI-enabled assistance for institutions with custom governance requirements.",
  tags: ["In-house hosting", "Custom workflows", "Secure permissions", "AI-enabled assistance"],
  primary: "Discuss Deployment",
  secondary: "Contact Us",
};

export const onboarding = {
  label: "College onboarding",
  title: "Roll out with secure onboarding and academic structure setup.",
  steps: [
    "Import students and teachers in bulk",
    "Verify access with college-scoped login and OTP recovery",
    "Configure departments, subjects, classes, and mentorship mappings",
  ],
  cta: "Start Institution Setup",
};

// Docs FAQ + Plans FAQ from the live site.
export const faq = {
  label: "Support",
  title: "Frequently asked questions",
  items: [
    { q: "What is Acadex?", a: "Acadex is a comprehensive platform designed for colleges to easily manage subscriptions, students, and courses in a streamlined environment." },
    { q: "How do I subscribe my college?", a: "You can visit the Plans section, choose the tier that fits your college size and requirements, and submit a plan request. Our administration team will review and approve your request shortly." },
    { q: "Can I manage different roles like teachers and students?", a: "Yes, our platform provides robust role-based access control out of the box. Administrators can invite teachers and students, configure permissions, and monitor activity across the college." },
    { q: "Do you offer customer support for new colleges?", a: "Absolutely! We provide dedicated support channels for all registered colleges. Higher tier plans also include priority support with dedicated account managers." },
    { q: "Is the platform secure and compliant?", a: "Security is our top priority. We employ industry-standard encryption, regular security audits, and comply with standard educational data privacy regulations to ensure your college's data remains safe." },
    { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any differences." },
    // CHECK: the free trial only appears on the live /plans page.
    { q: "Is there a free trial?", a: "Yes! All plans come with a 14-day free trial. No credit card required to start." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and bank transfers for annual plans." },
  ],
  more: {
    title: "Still have questions?",
    body: "Our team is here to help you find the perfect plan for your institution.",
    primary: "Contact Sales",
    secondary: "Schedule Demo",
  },
};

export const contact = {
  label: "Get in touch",
  title: "Contact our team",
  intro: "Have questions about platform integration? Our administration team is ready to help your institution succeed.",
  // CHECK: placeholder address. The live site shows a leftover ("support@mangosubscription.com").
  // Replace with the real Acadex support/sales inbox before launch.
  email: "hello@acadex.ereefian.com",
  emailSubject: "Acadex enquiry",
  emailCta: "Email us",
  copyCta: "Copy email",
  copied: "Copied",
  reply: "We usually reply within one working day.",
  hoursTitle: "Support hours",
  hours: "Monday – Friday, 9:00 AM – 6:00 PM (IST)",
  priorityTitle: "Priority support included",
  priority: [
    "All Enterprise plans include a dedicated account manager.",
    "Premium plans receive guaranteed 24-hour response times.",
    "Basic plans receive standard email support.",
  ],
};

export const footer = {
  blurb: "Acadex brings core academic workflows into one unified digital platform, making academic management more structured, efficient, and transparent.",
  points: ["In-house hosting available for institutional control", "AI-enabled assistance for academic operations"],
  groups: [
    {
      title: "Product",
      links: [
        { label: "Product tour", href: "#product" },
        { label: "Apps", href: "#apps" },
        { label: "Features", href: "#modules" },
        { label: "Register Institution", href: links.register },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Support", href: "#faq" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ],
  newsletter: {
    title: "Newsletter",
    body: "Monthly product notes, rollout guidance, and academic operations ideas for colleges and universities.",
    placeholder: "you@college.edu",
    cta: "Join update list",
  },
  // CHECK: these are the live site's links, which point to the networks' home pages. Swap in the real profiles.
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "X", href: "https://x.com" },
    { label: "YouTube", href: "https://www.youtube.com" },
  ],
  copyright: "Copyright 2026 Acadex. AI-powered academic operations for colleges and universities.",
  tagline: "Structured workflows, secure data control, and future-ready campus operations.",
};

export const legal = {
  privacy: {
    title: "Privacy Policy",
    intro: "This page explains the general privacy posture for Acadex. It is intended to help institutes understand how platform data is handled across onboarding, operations, billing, and support.",
    sections: [
      { h: "What we collect", p: "We collect institute account details, administrator profile information, operational platform data, billing records, and support interactions required to provide the Acadex service." },
      { h: "How we use data", p: "Your information is used to operate the workspace, authenticate users, provision plans, improve reliability, and support your institute through onboarding and product operations." },
      { h: "Data protection", p: "Access is controlled through role-based permissions, monitored systems, and reasonable technical and organizational safeguards appropriate for education software workflows." },
      { h: "Your controls", p: "Institutes may request account updates, data exports, or account closure through the Acadex support and contact channels. Legal and billing retention obligations may still apply." },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "These terms describe the general rules for using Acadex. They are a concise product-facing summary and can be supplemented by plan-specific commercial agreements where needed.",
    sections: [
      { h: "Service scope", p: "Acadex provides subscription-based institute management tooling for operational workflows such as onboarding, student administration, timetable, communication, and reporting." },
      { h: "Account responsibility", p: "Institutes are responsible for authorized use of administrator accounts, the accuracy of submitted organizational data, and the lawful handling of data entered into the platform." },
      { h: "Plans and billing", p: "Paid features, onboarding scope, and support levels are governed by the plan selected by the institute or by a separately agreed enterprise quote where applicable." },
      { h: "Acceptable use", p: "Users may not misuse the platform, interfere with service operation, attempt unauthorized access, or use Acadex in a way that violates applicable law or institutional policy obligations." },
    ],
  },
};
