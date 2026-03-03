"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PORTFOLIO } from "@/lib/data";

export function NavigationRail() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // ignore
    }
  };

  return (
    <>
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-72 lg:flex-col lg:gap-10 lg:border-r lg:border-border/60 lg:bg-background/70 lg:px-8 lg:py-10 lg:backdrop-blur-xl">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {PORTFOLIO.profile.primaryTitle}
          </p>
          <h1 className="mt-2 text-xl font-semibold">{PORTFOLIO.profile.name}</h1>
          <p className="text-sm text-muted-foreground">{PORTFOLIO.profile.location}</p>
          </div>
        <nav className="flex flex-col gap-4 text-sm">
          {PORTFOLIO.navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="rounded-2xl px-4 py-2 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={PORTFOLIO.uiLabels.toggleTheme}
            className="w-full justify-between"
          >
            {PORTFOLIO.uiLabels.toggleTheme}
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </aside>

      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-xl lg:hidden">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            {PORTFOLIO.profile.primaryTitle}
          </p>
          <p className="text-sm font-semibold">{PORTFOLIO.profile.name}</p>
        </div>
        <div className="flex items-center gap-2">
          {PORTFOLIO.navItems.slice(1, 4).map((item) => (
            <a key={item.id} href={`#${item.id}`} className="text-xs text-muted-foreground">
              {item.label}
            </a>
          ))}
          <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label={PORTFOLIO.uiLabels.toggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>
    </>
  );
}
