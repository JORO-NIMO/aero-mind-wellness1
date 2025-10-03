import { Award, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface GamificationBadgesProps {
  history: Array<{ date: string; score: number }>;
  score: number;
}

export const GamificationBadges = ({ history, score }: GamificationBadgesProps) => {
  const calculateStreak = () => {
    let wellRestedDays = 0;
    let fatigueRiskDays = 0;
    
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].score > 70) {
        wellRestedDays++;
      } else if (history[i].score < 40) {
        fatigueRiskDays++;
      }
    }
    
    return { wellRestedDays, fatigueRiskDays };
  };

  const { wellRestedDays, fatigueRiskDays } = calculateStreak();

  const badges = [
    {
      condition: wellRestedDays >= 3,
      icon: <TrendingUp className="w-5 h-5" />,
      text: `🟢 ${wellRestedDays} Days Well Rested`,
      variant: "secondary" as const,
      bgColor: "bg-success/10",
      borderColor: "border-success/30",
    },
    {
      condition: score > 85,
      icon: <Award className="w-5 h-5" />,
      text: "🏆 Peak Performance Achieved",
      variant: "default" as const,
      bgColor: "bg-primary/10",
      borderColor: "border-primary/30",
    },
    {
      condition: fatigueRiskDays >= 2,
      icon: <TrendingDown className="w-5 h-5" />,
      text: `🔴 ${fatigueRiskDays} Days Fatigue Risk`,
      variant: "destructive" as const,
      bgColor: "bg-critical/10",
      borderColor: "border-critical/30",
    },
  ];

  const activeBadges = badges.filter((badge) => badge.condition);

  if (activeBadges.length === 0) return null;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Wellness Achievements</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {activeBadges.map((badge, index) => (
          <div
            key={index}
            className={`${badge.bgColor} ${badge.borderColor} border rounded-lg p-4 flex items-center gap-3`}
          >
            <div className="text-foreground">
              {badge.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{badge.text}</p>
            </div>
            <Badge variant={badge.variant} className="text-xs">
              Active
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
