# Acadex — current site audit

Scanned: https://acadex.ereefian.com on 2026-11-10

## Tech & design system (current)

- **Stack:** Next.js (App Router, Turbopack build), Tailwind, Radix UI (tabs), dark theme by default with a light/dark toggle
- **Fonts:** Plus Jakarta Sans + JetBrains Mono are loaded via `next/font`, but **not applied**. Every element renders in the system fallback (`ui-sans-serif, system-ui` → Segoe UI on Windows).
- **Colors:** indigo primary (`#4f46e5` light / `#818cf8` dark), slate text, accent cyan/emerald/amber/rose; `theme-color` meta is violet `#7c3aed` (doesn't match the indigo primary)
- **Tokens already defined:** spacing 4–64px, radius 6–28px, glass surfaces with blur, motion durations/easings, container widths 640–1536px
- **Logo / favicon:** `ereefian_logo.svg` (also used as the og:image)

## Sitemap

| Page | Route | Notes |
|---|---|---|
| Home | `/` | Single long landing page (~7,900px desktop, ~17,500px mobile) |
| Plans | `/plans` | Pricing cards, comparison table, FAQ |
| Contact | `/contact` | Support info + form |
| Docs | `/docs` | "Documentation & FAQ" (really a short about + FAQ) |
| Privacy | `/privacy` | 4 short paragraphs |
| Terms | `/terms` | 4 short paragraphs |
| Login | `/auth/login` | Email/password + Google |
| Signup | `/auth/signup` | College name, GST/PAN, admin name/email, password + Google |

No `/about`, `/features` or `/blog` pages (all 404).

## Homepage content, in order

1. **Nav:** Who We Are · Problems · Features · Why Us · Pricing · Contact Us · theme toggle · Log In · Signup
2. **Hero:** pill "AI-powered academic operations platform for colleges and universities"
   - H1: "Acadex is building a smarter way for colleges and universities to manage academic operations."
   - Sub: attendance, communication, scheduling, resources, workflows in one platform for admins, teachers, students
   - CTAs: Register Institution / Login to Dashboard
   - Chips: Unified digital platform · Real-time attendance · Institution-controlled data
   - Stats: Partner colleges **4** · Active subscriptions **0** · Countries served **4** · Client satisfaction **90%**
   - Mock dashboard: Attendance / Timetable / Resources / Notices / Assessments, "Today's queue", etc.
3. **Trusted by (logo marquee):** Calcutta University, Stanford, Oxford, IIT Delhi, IIT Bombay, IIT Madras, IIT KGP (text only, no logos)
4. **Solutions (`#features`)**, 6 cards:
   - Attendance Policies & Analytics Dashboard
   - Smart Attendance System (online + offline)
   - Smart Resource Management
   - Real-Time Notifications & Announcements
   - Digital Timetable & Academic Calendar
   - Quiz & Assessment System
5. **Problems (`#tour`)**: 4 tabs (Problems / Attendance / Coordination / Governance), each with a problem statement, 3 bullets and a "problem-to-solution" mock panel (generic "Metric 1–4" bars at 72/54/88/64%)
6. **Features (`#portals`)**, 6 cards with tags:
   - Dynamic Forms & Workflow Management
   - Institution Setup & Academic Structure Management
   - Bulk Import, Secure Login & Onboarding (OTP)
   - Role & Permission Hierarchy (admin, teacher, CR, student)
   - Admin Dashboard, Audit & Recovery Tools
   - AI-Powered Academic Assistant
7. **Why Us (`#testimonials`)**, 6 cards in a marquee: All-in-One · Less Manual Work · Better Institutional Control · Role-Based & Secure · Scalable & Future-Ready · Institution-Controlled Data (in-house hosting)
8. **Pricing (`#pricing`)**: Monthly/Annual toggle ("Save 16%")
   - Basic: up to 1,500 users, $590/yr
   - Premium: up to 2,500 users, $990/yr
   - Enterprise: custom, request quote
9. **Enterprise CTA:** in-house hosting, custom workflows, permissions, AI assistance → Discuss Deployment / Contact Us
10. **Onboarding steps:** bulk import → OTP / college-scoped login → configure departments, subjects, classes, mentorship → "Start Institution Setup"
11. **Footer:** blurb, Product / Resources links, newsletter ("Join update list"), LinkedIn / X / YouTube, © 2026

## Content problems to fix in the redesign

### Critical (credibility / legal)

- **Contact page has placeholder data from another project:** contact name "Kaccha Aam, Pakka Mango", email `support@mangosubscription.com`.
- **"Trusted by" names Stanford, Oxford, IITs, Calcutta University** next to a "4 partner colleges" stat. If these aren't real customers, this is a legal and trust risk. Remove it, or replace it with real customers and their permission.
- **"Active subscriptions: 0"** is shown publicly in the hero stats.
- **"90% client satisfaction"** has no source.

### Pricing inconsistencies

- The homepage shows $590/$990 **per year**, while `/plans` shows $59/$99 **per month**.
- Plan names differ: the homepage and `/plans` cards say Basic / Premium / Enterprise, the `/plans` comparison table says Basic / **Professional** / Enterprise, and the contact page says "**Pro** plans".
- User limits differ: the Basic card says "Up to 1500 users", the comparison table says "Up to 500".
- Every homepage plan card is labelled "ENTERPRISE".
- The plan descriptions are placeholders: "This plan offers basic subscription." and "This is Premium subscription."
- `/plans` promises a "14-day free trial, no credit card", which isn't mentioned anywhere else.
- The comparison table lists features the homepage never mentions (Grade Book, Parent Portal, API, SSO, Custom Branding).

### Navigation / IA

- The nav labels don't match the section content:
  - "Who We Are" goes to the Solutions section.
  - "Features" goes to `#portals`.
  - "Why Us" goes to `#testimonials`.
  - There is no actual "who we are" content anywhere.
- Subpages use a different nav (Features / Plans / Docs / Contact Us) and a logo without the wordmark.
- The Enterprise "Contact Us" button links to `/docs`, not `/contact`.
- The footer social links go to the generic linkedin.com / x.com / youtube.com homepages.
- There are no testimonials, case studies, team/about page, screenshots of the real product or demo video.

### Messaging

- The H1 is long (19 words) and soft ("is building…"). It doesn't say what the product is in 3 seconds.
- The two feature grids ("Solutions" and "Features") overlap and feel repetitive. "Why Us" repeats the same points a third time, and its marquee duplicates every card.
- Login and signup say "manage your college's **subscription**", which frames the product around billing, not academics.
- The Docs page is not documentation; it's a generic about blurb and FAQ.
- The Privacy and Terms pages are 4-paragraph summaries, which is thin for a product holding student data (no data processor, retention, DPDP Act / GDPR or contact details).
- The Problems section mock uses meaningless labels ("Metric 1–4", "Ready 2 items").

### SEO / meta

- The og:image / twitter:image is the SVG logo, which most social platforms won't render. Use a 1200×630 PNG.
- Login and signup reuse the homepage `<title>`.
- `/plans` and `/docs` titles end in "| Acadex | Acadex" (duplicated).
- Keywords meta mentions enrollment, exams, faculty and fees, while the site itself focuses on attendance, timetable and resources.

### Visual / UX quick notes

- The brand fonts aren't applied (see above).
- The page is very long, especially on mobile (~17.5k px), and much of the length comes from the decorative mock dashboards.
- The hero H1 fades in slowly on mobile, so the first paint is near-invisible text.

## Content worth keeping

- Clear product scope: attendance (online and offline), timetable and calendar, resources, announcements, quizzes, dynamic forms, academic structure, roles and permissions, audit and recovery, AI assistant.
- Strong differentiator: **in-house hosting / institution-controlled data**.
- Roles: admin, teacher, CR (class representative), student.
- Onboarding flow: bulk import → OTP login → academic structure setup.
- India-first signals: en_IN locale, GST/PAN at signup, IST support hours.
