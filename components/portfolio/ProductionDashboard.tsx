import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { ReadinessMetric } from "@/lib/data";

export type ProductionDashboardProps = {
  title: string;
  metrics: ReadinessMetric[];
  pillarsHeadline: string;
  pillars: string[];
};

export function ProductionDashboard({ title, metrics, pillarsHeadline, pillars }: ProductionDashboardProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="border-border/70 bg-background/70">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">{metric.label}</span>
                <span className="text-muted-foreground">{metric.value}%</span>
              </div>
              <Progress value={metric.value} />
              <p className="text-xs text-muted-foreground">{metric.note}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="border-border/70 bg-background/70">
        <CardHeader>
          <CardTitle>{pillarsHeadline}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {pillars.map((pillar) => (
            <p key={pillar}>• {pillar}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
