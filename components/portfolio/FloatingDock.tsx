"use client";

import { motion } from "framer-motion";
import { MessageSquare, Mic, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DOCK } from "@/lib/data";

const icons = {
  chat: MessageSquare,
  voice: Mic,
  search: Search
};

type FloatingDockProps = {
  onChat: () => void;
  onVoice: () => void;
  onSearch: () => void;
};

export function FloatingDock({ onChat, onVoice, onSearch }: FloatingDockProps) {
  const handlers = {
    chat: onChat,
    voice: onVoice,
    search: onSearch
  };

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2 rounded-3xl border border-border/60 bg-background/80 p-2 shadow-glass backdrop-blur-xl">
        {DOCK.actions.map((action) => {
          const Icon = icons[action.id as keyof typeof icons];
          return (
            <Button
              key={action.id}
              variant="ghost"
              size="sm"
              onClick={handlers[action.id as keyof typeof handlers]}
              aria-label={action.hint}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden text-xs sm:inline">{action.label}</span>
            </Button>
          );
        })}
      </div>
    </motion.div>
  );
}
