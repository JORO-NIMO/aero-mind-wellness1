import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

interface HistoryChartProps {
  history: Array<{ date: string; score: number }>;
}

export const HistoryChart = ({ history }: HistoryChartProps) => {
  // Generate fatigue risk trend (simple moving average prediction)
  const historyWithTrend = history.map((item, index) => ({
    ...item,
    fatigueRisk: index >= 2 
      ? Math.max(0, Math.min(100, (history[index - 2].score + history[index - 1].score + item.score) / 3 - 5))
      : item.score - 5,
  }));

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Wellness History & Fatigue Risk Trend</h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={historyWithTrend} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              padding: '8px',
            }}
          />
          <ReferenceLine y={70} stroke="hsl(var(--success))" strokeDasharray="3 3" />
          <ReferenceLine y={40} stroke="hsl(var(--critical))" strokeDasharray="3 3" />
          <Line
            type="monotone"
            dataKey="score"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--primary))', r: 5 }}
            activeDot={{ r: 7 }}
            name="Wellness Score"
          />
          <Line
            type="monotone"
            dataKey="fatigueRisk"
            stroke="hsl(var(--warning))"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Fatigue Risk Trend"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="flex justify-center gap-6 mt-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-8 h-0.5 bg-primary" />
          <span className="text-muted-foreground">Wellness Score</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-8 h-0.5 bg-warning" style={{ borderTop: "2px dashed" }} />
          <span className="text-muted-foreground">Fatigue Risk Trend</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-8 h-0.5 bg-success" />
          <span className="text-muted-foreground">Healthy (70+)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-8 h-0.5 bg-critical" />
          <span className="text-muted-foreground">Critical (40-)</span>
        </div>
      </div>
    </Card>
  );
};
