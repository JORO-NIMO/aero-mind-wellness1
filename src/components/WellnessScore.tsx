import { Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WellnessScoreProps {
  score: number;
}

export const WellnessScore = ({ score }: WellnessScoreProps) => {
  const getStatusColor = () => {
    if (score > 70) return "success";
    if (score >= 40) return "warning";
    return "critical";
  };

  const getStatusText = () => {
    if (score > 70) return "Healthy";
    if (score >= 40) return "Stressed";
    return "Critical";
  };

  const status = getStatusColor();
  const statusText = getStatusText();

  const getGradientClass = () => {
    if (score > 70) return "bg-gradient-success";
    if (score >= 40) return "bg-gradient-warning";
    return "bg-gradient-critical";
  };

  return (
    <Card className="p-8 text-center relative overflow-hidden shadow-lg">
      <div className="absolute inset-0 opacity-5 bg-gradient-primary" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Activity className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Wellness Score</h2>
        </div>
        
        <div className="relative w-48 h-48 mx-auto mb-4">
          {/* Outer ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
            />
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke={`hsl(var(--${status}))`}
              strokeWidth="12"
              strokeDasharray={`${(score / 100) * 534} 534`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          
          {/* Score display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-6xl font-bold ${getGradientClass()} bg-clip-text text-transparent`}>
              {score}
            </div>
            <div className="text-sm font-medium text-muted-foreground mt-1">
              {statusText}
            </div>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-success" />
            <span className="text-muted-foreground">Healthy (71-100)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <span className="text-muted-foreground">Stressed (40-70)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-critical" />
            <span className="text-muted-foreground">Critical (&lt;40)</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
