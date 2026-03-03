"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { PORTFOLIO } from "@/lib/data";
import { Button } from "@/components/ui/button";

export function TopNav() {
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
      // Ignore storage errors in restricted environments.
    }
  };

  return (
    <header className="sticky top-6 z-30">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-3xl border border-border/60 bg-background/80 px-6 py-4 shadow-glass backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-foreground" aria-hidden />
          <div>
            <p className="text-sm font-semibold tracking-wide">{PORTFOLIO.profile.name}</p>
            <p className="text-xs text-muted-foreground">{PORTFOLIO.profile.primaryTitle}</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          {PORTFOLIO.navItems.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="transition-colors hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={PORTFOLIO.uiLabels.toggleTheme}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
