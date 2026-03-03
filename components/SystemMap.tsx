"use client";

import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PORTFOLIO } from "@/lib/data";

export function SystemMap() {
  const nodes = PORTFOLIO.systemMap.nodes;
  const [activeId, setActiveId] = useState<string>(nodes[0]?.id ?? "");
  const activeNode = useMemo(
    () => nodes.find((node) => node.id === activeId) ?? nodes[0],
    [activeId, nodes]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="grid gap-3 rounded-3xl border border-border/60 bg-muted/30 p-4 sm:grid-cols-2">
        {nodes.map((node) => (
          <button
            key={node.id}
            type="button"
            onClick={() => setActiveId(node.id)}
            className={cn(
              "rounded-2xl border border-border/60 bg-background/80 px-4 py-3 text-left text-sm font-semibold transition",
              activeId === node.id ? "border-foreground/60 text-foreground" : "text-muted-foreground"
            )}
          >
            <p className="text-sm font-semibold">{node.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{node.summary}</p>
          </button>
        ))}
      </div>
      <Card className="border-border/60 bg-background/70">
        <CardHeader>
          <CardTitle>{activeNode.label}</CardTitle>
          <p className="text-sm text-muted-foreground">{activeNode.summary}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {PORTFOLIO.systemMap.labels.stack}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {activeNode.stack.map((item) => (
                <Badge key={item} variant="outline" className="border-border/60">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {PORTFOLIO.systemMap.labels.proof}
            </p>
            <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
              {activeNode.proof.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
