# Copy humanizer pass

Run on 2026-11-11 with cleverhumanizer.ai (Humanize AI, "Normal" style).

## What was sent

All 37 body paragraphs from `src/content/site.ts`, in page order:

- hero body
- the problem statement and its three cards
- the platform intro and the seven module descriptions
- the four role descriptions
- the security intro and its four items
- the AI assistant description
- the three onboarding steps
- the three plan blurbs
- the six FAQ answers
- the contact line
- the footer line

Headlines, labels, buttons and the mock UI text were **not** sent, because rewriting them would break the layout and the display type.

## What came back

The tool returned two versions, and both kept the 37 paragraphs in order:

- **Version 1** ("best pick") was rougher. It turned "students see their attendance numbers" into "results per subject". It also dropped most details and added Title Case at random.
- **Version 2** kept the meaning better, so it was used as the base.

## Corrections made after the humanizer (Version 2 → site)

| Humanizer output | Problem | Fixed to |
|---|---|---|
| "Most colleges aren't using digital systems." | Overclaims | "Most colleges still rely on registers, spreadsheets and group chats…" |
| "Everyone logs in using **there** college specific account" | Typo | "their college-specific account" |
| "**todays** timetable" | Missing apostrophe | "today's timetable" |
| "**Setup** your departments…" | Verb vs noun | "Set up your departments…" |
| "Yes, **we can host it in house**…" | Wrong: the college hosts it, not Acadex | "Acadex can be hosted in-house…" |
| "Acadex can be hosted on your own servers." | Repeated the line above it word for word | "Deploy Acadex on your own servers and keep institutional data in-house." |
| "7 **M**odules", "**C**olleges and **U**niversities", "Admins, **T**eachers…" | Random Title Case | Sentence case |
| "Deleted **resources** can be recovered" | Wrong noun: the recycle bin restores records | "Deleted records…" |
| Attendance card lost "online or offline" | Dropped a real feature | Restored |
| Forms card lost "see the results" | Dropped a real feature | "Validate responses and view the results." |
| "Automate everyday tasks." | Fragment with no subject | "…and helps automate everyday tasks." |

Every other paragraph is the humanizer's wording with punctuation fixes only (for example "&" → "and", "upgrade/downgrade" → "upgrade or downgrade").

## Terminology change from the humanizer

The rewrite changed two terms, and the site now uses the new ones everywhere:

- "notices" became "announcements"
- "study material" became "learning resources"

The matching module card is now titled "Learning resources".
