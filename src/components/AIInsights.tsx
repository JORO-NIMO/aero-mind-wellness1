import { Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AIInsightsProps {
  heartRate: number;
  sleepHours: number;
  score: number;
}

export const AIInsights = ({ heartRate, sleepHours, score }: AIInsightsProps) => {
  const generateInsights = () => {
    const insights: string[] = [];
    
    if (sleepHours < 6) {
      insights.push("🛌 Low sleep detected. Consider a 20-minute power nap before duty.");
    }
    
    if (heartRate > 85) {
      insights.push("💓 Elevated heart rate. Try our breathing exercise to reduce stress.");
    }
    
    if (score < 60) {
      insights.push("⚠️ High fatigue risk detected. Recommend postponing non-critical flights.");
    }
    
    if (score > 80 && sleepHours > 7) {
      insights.push("✨ Excellent wellness! You're in optimal condition for flight operations.");
    }

    if (insights.length === 0) {
      insights.push("📊 Your metrics look stable. Maintain your current routine.");
    }
    
    return insights;
  };

  const insights = generateInsights();

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">AI Wellness Insights</h3>
        <Badge variant="secondary" className="ml-auto text-xs">Powered by AI</Badge>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="bg-card p-3 rounded-lg border border-border text-sm text-foreground"
          >
            {insight}
          </div>
        ))}
      </div>
    </Card>
  );
};
