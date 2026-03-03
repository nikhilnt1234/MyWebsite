import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CaseStudy } from "@/lib/data";

type CaseStudyCardProps = {
  study: CaseStudy;
  constraintsLabel: string;
  decisionsLabel: string;
};

export function CaseStudyCard({ study, constraintsLabel, decisionsLabel }: CaseStudyCardProps) {
  return (
    <Card className="border-border/70 bg-background/70">
      <CardHeader>
        <CardTitle>{study.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{study.impact}</p>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{constraintsLabel}</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            {study.constraints.map((constraint) => (
              <li key={constraint}>• {constraint}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{decisionsLabel}</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            {study.decisions.map((decision) => (
              <li key={decision}>• {decision}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-2">
          {study.metrics.map((metric) => (
            <Badge key={metric} variant="outline" className="border-border/60">
              {metric}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <Badge key={tag} className="bg-secondary text-secondary-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
