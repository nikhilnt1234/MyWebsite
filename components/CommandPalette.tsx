"use client";

import { useEffect, useMemo, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PORTFOLIO } from "@/lib/data";

export type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAction: (action: (typeof PORTFOLIO.commandPalette.actions)[number]) => void;
};

export function CommandPalette({ open, onOpenChange, onAction }: CommandPaletteProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const actions = useMemo(() => PORTFOLIO.commandPalette.actions, []);
  const getActionDetail = (action: (typeof PORTFOLIO.commandPalette.actions)[number]) => {
    return action.detail;
  };

  useEffect(() => {
    const handler = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenChange]);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
    }
  }, [open]);

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) => (prev + 1) % actions.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) => (prev - 1 + actions.length) % actions.length);
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const action = actions[activeIndex];
      onAction(action);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur" />
        <Dialog.Content
          className="fixed left-1/2 top-24 z-50 w-[90vw] max-w-2xl -translate-x-1/2 rounded-3xl border border-border/60 bg-background/95 p-6 shadow-2xl"
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            const target = event.currentTarget as HTMLElement | null;
            target?.focus();
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <Dialog.Title className="text-lg font-semibold">{PORTFOLIO.commandPalette.title}</Dialog.Title>
              <Dialog.Description className="text-sm text-muted-foreground">
                {PORTFOLIO.commandPalette.description}
              </Dialog.Description>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Command className="h-4 w-4" />
              {PORTFOLIO.commandPalette.hint}
            </div>
          </div>
          <div className="mt-6 grid gap-3">
            {actions.map((action, index) => (
              <button
                key={action.id}
                type="button"
                onClick={() => onAction(action)}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex w-full items-center justify-between rounded-2xl border border-border/60 px-4 py-3 text-left text-sm transition-colors",
                  index === activeIndex ? "bg-muted/40" : "bg-background/80"
                )}
              >
                <div>
                  <p className="font-semibold">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{getActionDetail(action)}</p>
                </div>
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-border/60 bg-muted/40 p-4 text-xs text-muted-foreground">
            {PORTFOLIO.commandPalette.summary.map((line, index) => (
              <p key={line} className={index === 0 ? "font-semibold" : "mt-1"}>
                {line}
              </p>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {PORTFOLIO.commandPalette.closeLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
