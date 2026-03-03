import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AiLabDemo } from "@/lib/data";

type DemoCardProps = {
  demo: AiLabDemo;
  active?: boolean;
  onSelect?: (id: AiLabDemo["id"]) => void;
};

export function DemoCard({ demo, active, onSelect }: DemoCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(demo.id)}
      className="text-left"
      aria-pressed={active}
    >
      <Card
        className={cn(
          "h-full border-border/70 bg-background/70 transition-colors hover:border-foreground/40",
          active ? "border-foreground/50 bg-foreground/5" : ""
        )}
      >
        <CardContent className="flex h-full flex-col gap-4 p-6">
          <Badge variant="outline" className="w-fit border-border/60">
            {demo.tag}
          </Badge>
          <div>
            <h3 className="text-lg font-semibold">{demo.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{demo.summary}</p>
          </div>
          <p className="text-sm text-muted-foreground">{demo.detail}</p>
        </CardContent>
      </Card>
    </button>
  );
}
