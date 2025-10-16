import { useEffect, useMemo, useState } from "react";
import { Sparkles, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface AIInsightsProps {
  heartRate: number;
  sleepHours: number;
  score: number;
}

export const AIInsights = ({ heartRate, sleepHours, score }: AIInsightsProps) => {
  const [who, setWho] = useState("Pilot");
  const [whatIf, setWhatIf] = useState(false);
  const [simHR, setSimHR] = useState<number>(heartRate);
  const [simSleep, setSimSleep] = useState<number>(sleepHours);
  const [simScore, setSimScore] = useState<number>(score);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    const s = localStorage.getItem("aeromind_user");
    if (s) {
      try {
        const u = JSON.parse(s);
        const name = u?.name || "";
        const email = u?.email || "";
        const display = name || (email ? email.split("@")[0] : "Pilot");
        setWho(display);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (!whatIf) {
      setSimHR(heartRate);
      setSimSleep(sleepHours);
      setSimScore(score);
    }
  }, [whatIf, heartRate, sleepHours, score]);

  const active = useMemo(() => ({
    heartRate: whatIf ? simHR : heartRate,
    sleepHours: whatIf ? simSleep : sleepHours,
    score: whatIf ? simScore : score,
  }), [whatIf, simHR, simSleep, simScore, heartRate, sleepHours, score]);

  const pool = useMemo(() => ({
    sleepLow: [
      "🛌 Low sleep detected. Consider a 20-minute power nap before duty.",
      "🛌 Sleep under target. A short nap or earlier rest can improve alertness.",
      "🛌 Inadequate sleep. Plan a buffer and hydrate to offset fatigue.",
    ],
    hrHigh: [
      "💓 Elevated heart rate. Try a 3-minute breathing session.",
      "💓 High HR trend. Reduce caffeine and do a short walk.",
      "💓 Stress marker up. Use box-breathing before pre-flight.",
    ],
    riskHigh: [
      "⚠️ Fatigue risk detected. Defer non-critical tasks.",
      "⚠️ Elevated risk. Add a rest break before operations.",
      "⚠️ Watch status. Consider swapping a leg if feasible.",
    ],
    excellent: [
      "✨ Excellent wellness. You’re set for optimal performance.",
      "✨ Strong readiness. Maintain your current routine.",
      "✨ Great metrics. Keep hydration and pacing steady.",
    ],
    neutral: [
      "📊 Metrics are stable. Maintain your routine.",
      "📊 Balanced day. Keep consistent rest and meals.",
      "📊 All steady. Light mobility breaks recommended.",
    ],
  }), []);

  const pick = (arr: string[], n: number) => arr[(n + nonce) % arr.length];

  const computed = useMemo(() => {
    const items: { tip: string; why: string }[] = [];
    if (active.sleepHours < 6) items.push({ tip: pick(pool.sleepLow, 1), why: `Sleep ${active.sleepHours.toFixed(1)}h < 6h.` });
    if (active.heartRate > 85) items.push({ tip: pick(pool.hrHigh, 2), why: `HR ${Math.round(active.heartRate)}bpm > 85.` });
    if (active.score < 60) items.push({ tip: pick(pool.riskHigh, 3), why: `Score ${Math.round(active.score)} < 60.` });
    if (active.score > 80 && active.sleepHours > 7) items.push({ tip: pick(pool.excellent, 4), why: `Score > 80 and Sleep > 7h.` });
    if (items.length === 0) items.push({ tip: pick(pool.neutral, 5), why: `No risk triggers.` });
    return items;
  }, [active, pool, nonce]);

  const applyPreset = (preset: "healthy" | "stressed" | "critical") => {
    if (preset === "healthy") { setWhatIf(true); setSimHR(65); setSimSleep(8); setSimScore(85); }
    if (preset === "stressed") { setWhatIf(true); setSimHR(90); setSimSleep(5.5); setSimScore(55); }
    if (preset === "critical") { setWhatIf(true); setSimHR(100); setSimSleep(4); setSimScore(25); }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI Wellness Insights</h3>
        <Badge variant="secondary" className="ml-auto text-xs">Demo</Badge>
        <Badge variant="secondary" className="text-xs">Powered by AI</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Switch checked={whatIf} onCheckedChange={setWhatIf} />
          <Label className="text-sm">What-if mode</Label>
        </div>
        <div className="text-xs text-muted-foreground">Hello, {who}</div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setNonce((n) => n + 1)}>
            <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
          </Button>
          <Button variant="outline" size="sm" onClick={() => { setWhatIf(false); setNonce((n) => n + 1); }}>Use current metrics</Button>
        </div>
      </div>

      {whatIf && (
        <div className="space-y-4 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs">Heart Rate: {Math.round(simHR)} bpm</Label>
              <Slider value={[simHR]} min={50} max={120} step={1} onValueChange={(v) => setSimHR(v[0])} />
            </div>
            <div>
              <Label className="text-xs">Sleep: {simSleep.toFixed(1)} h</Label>
              <Slider value={[simSleep]} min={0} max={10} step={0.5} onValueChange={(v) => setSimSleep(v[0])} />
            </div>
            <div>
              <Label className="text-xs">Score: {Math.round(simScore)}</Label>
              <Slider value={[simScore]} min={0} max={100} step={1} onValueChange={(v) => setSimScore(v[0])} />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" onClick={() => applyPreset("healthy")}>Preset: Healthy</Button>
            <Button size="sm" variant="secondary" onClick={() => applyPreset("stressed")}>Preset: Stressed</Button>
            <Button size="sm" variant="secondary" onClick={() => applyPreset("critical")}>Preset: Critical</Button>
          </div>
        </div>
      )}

      <Separator className="my-3" />

      <div className="flex flex-wrap items-center gap-2 mb-3 text-xs">
        <Badge variant="secondary">HR {Math.round(active.heartRate)} bpm</Badge>
        <Badge variant="secondary">Sleep {active.sleepHours.toFixed(1)} h</Badge>
        <Badge variant="secondary">Score {Math.round(active.score)}</Badge>
      </div>

      <div className="space-y-3">
        {computed.map((item, idx) => (
          <div key={idx} className="bg-card p-3 rounded-lg border border-border">
            <div className="text-sm text-foreground">{item.tip}</div>
            <div className="text-xs text-muted-foreground mt-1">Reason: {item.why}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};
