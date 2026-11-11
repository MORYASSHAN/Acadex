import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Acadex collects, uses and protects data for colleges and universities.",
};

export default function PrivacyPage() {
  return <LegalPage {...legal.privacy} />;
}
