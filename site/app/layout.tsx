import type { Metadata } from "next";
import { Onest, Geologica, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { THEME_SCRIPT } from "@tsaaguur/ui";
import { Shell } from "@/components/shell";
import { fetchCommits } from "@/components/commits";

export const revalidate = 600;

const onest = Onest({ subsets: ["cyrillic", "latin"], variable: "--font-onest", display: "swap" });
const geologica = Geologica({ subsets: ["cyrillic", "latin"], variable: "--font-geologica", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["cyrillic", "latin"], variable: "--font-jbmono", display: "swap" });

export const metadata: Metadata = {
  title: { template: "%s · Tsaaguur UI", default: "Tsaaguur UI" },
  description: "@tsaaguur/ui: a hand-drawn React UI library for Next.js and Tailwind v4. Tokens, 115 icons, animated pictograms, inputs, navigation, feedback, data display, surfaces.",
  robots: { index: false, follow: false },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [commits, now] = [await fetchCommits(5), Date.now()];
  return (
    <html lang="en" suppressHydrationWarning className={`${onest.variable} ${geologica.variable} ${mono.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} /></head>
      <body className="relative isolate min-h-svh font-sans">
        <div className="tz-noise" aria-hidden />
        <Shell commits={commits} now={now}>{children}</Shell>
      </body>
    </html>
  );
}
