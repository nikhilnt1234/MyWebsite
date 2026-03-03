import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import type { AiLabDemo, DocPreview, RagPreview, VoicePreview } from "@/lib/data";

export function LiveDemoPanel({ demo, previewLabel }: { demo: AiLabDemo; previewLabel: string }) {
  return (
    <Card className="border-border/70 bg-background/70">
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <CardTitle>{demo.title}</CardTitle>
          <Badge variant="outline" className="border-border/60">
            {previewLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {demo.preview.type === "rag" ? <RagPreviewPanel data={demo.preview} /> : null}
        {demo.preview.type === "voice" ? <VoicePreviewPanel data={demo.preview} /> : null}
        {demo.preview.type === "doc" ? <DocPreviewPanel data={demo.preview} /> : null}
      </CardContent>
    </Card>
  );
}

function RagPreviewPanel({ data }: { data: RagPreview }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.queryLabel}</p>
        <Input value={data.query} readOnly />
      </div>
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.answerLabel}</p>
        <p className="text-sm text-foreground/80">{data.answer}</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span>{data.confidenceLabel}</span>
          <span>{data.confidence}%</span>
        </div>
        <Progress value={data.confidence} />
      </div>
      <Separator />
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.snippetsLabel}</p>
        <div className="grid gap-3 md:grid-cols-2">
          {data.snippets.map((snippet) => (
            <div key={snippet.title} className="rounded-2xl border border-border/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{snippet.title}</p>
                <span className="text-xs text-muted-foreground">{snippet.score}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{snippet.snippet}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VoicePreviewPanel({ data }: { data: VoicePreview }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.transcriptLabel}</p>
        <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm">{data.transcript}</div>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.replyLabel}</p>
        <div className="rounded-2xl border border-border/60 bg-background/80 p-4 text-sm">{data.reply}</div>
      </div>
      <Separator />
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.pipelineLabel}</p>
        <div className="flex flex-wrap gap-2">
          {data.pipeline.map((step) => (
            <Badge key={step} variant="outline" className="border-border/60">
              {step}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function DocPreviewPanel({ data }: { data: DocPreview }) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
        {data.dropLabel}
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.summaryLabel}</p>
        <p className="text-sm text-foreground/80">{data.summary}</p>
      </div>
      <Separator />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.entitiesLabel}</p>
          <div className="space-y-2">
            {data.entities.map((entity) => (
              <div key={entity.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{entity.label}</span>
                <span className="font-semibold">{entity.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{data.checklistLabel}</p>
          <div className="space-y-2">
            {data.checklist.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-semibold">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
