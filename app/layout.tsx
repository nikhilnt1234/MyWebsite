import type { Metadata } from "next";
import "./globals.css";
import { PORTFOLIO } from "@/lib/data";

export const metadata: Metadata = {
  title: `${PORTFOLIO.profile.name} — ${PORTFOLIO.profile.primaryTitle}`,
  description: PORTFOLIO.hero.subheadline,
  metadataBase: new URL(PORTFOLIO.profile.links.linkedin)
};

const themeScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored || (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
