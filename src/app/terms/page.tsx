import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { legal } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules, responsibilities and policies for using Acadex.",
};

export default function TermsPage() {
  return <LegalPage {...legal.terms} />;
}
