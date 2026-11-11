import type { Metadata, Viewport } from "next";
import { Anton, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const description =
  "Acadex is an AI-powered academic operations platform for colleges and universities. Attendance, communication, scheduling, resources and academic workflows in one unified digital platform.";

export const metadata: Metadata = {
  metadataBase: new URL("https://acadex.ereefian.com"),
  title: {
    default: "Acadex | College Management System & ERP SaaS Platform",
    template: "%s | Acadex",
  },
  description,
  applicationName: "Acadex",
  keywords: [
    "Acadex",
    "college management system",
    "college ERP",
    "university management system",
    "attendance management",
    "timetable software",
    "academic operations platform",
  ],
  openGraph: {
    type: "website",
    url: "https://acadex.ereefian.com",
    siteName: "Acadex",
    title: "Acadex | A smarter way to run academic operations",
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Acadex | A smarter way to run academic operations",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f6",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${anton.variable} ${interTight.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
