import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SketchItem, SketchStory } from "@/lib/data";

const gradients = [
  "from-slate-200/30 via-slate-100/60 to-transparent dark:from-slate-800/40 dark:via-slate-900/60",
  "from-neutral-200/40 via-neutral-100/60 to-transparent dark:from-neutral-800/50 dark:via-neutral-900/60",
  "from-zinc-200/40 via-zinc-100/70 to-transparent dark:from-zinc-800/60 dark:via-zinc-900/60",
  "from-stone-200/40 via-stone-100/70 to-transparent dark:from-stone-800/60 dark:via-stone-900/60"
];

type SketchGridProps = {
  sketches: SketchItem[];
  stories: SketchStory[];
};

export function SketchGrid({ sketches, stories }: SketchGridProps) {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 md:grid-cols-2">
        {sketches.map((sketch, index) => (
          <Card key={sketch.title} className="overflow-hidden border-border/60">
            <div
              className={`h-40 w-full bg-gradient-to-br ${gradients[index % gradients.length]}`}
              style={
                sketch.image
                  ? { backgroundImage: `url(${sketch.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                  : undefined
              }
            />
            <CardHeader>
              <CardTitle>{sketch.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{sketch.caption}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {stories.map((story) => (
          <Card key={story.title} className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              {story.steps.map((step) => (
                <p key={step}>• {step}</p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
