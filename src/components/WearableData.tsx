import { Heart, Moon, Footprints } from "lucide-react";
import { Card } from "@/components/ui/card";

interface WearableDataProps {
  heartRate: number;
  sleepHours: number;
  steps: number;
}

export const WearableData = ({ heartRate, sleepHours, steps }: WearableDataProps) => {
  const dataCards = [
    {
      icon: Heart,
      label: "Heart Rate",
      value: heartRate,
      unit: "bpm",
      color: "text-critical",
      bgColor: "bg-critical/10",
    },
    {
      icon: Moon,
      label: "Sleep",
      value: sleepHours.toFixed(1),
      unit: "hours",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Footprints,
      label: "Steps",
      value: steps.toLocaleString(),
      unit: "steps",
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {dataCards.map((card) => (
        <Card key={card.label} className="p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground mb-2">{card.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">{card.value}</span>
                <span className="text-sm text-muted-foreground">{card.unit}</span>
              </div>
            </div>
            <div className={`${card.bgColor} ${card.color} p-3 rounded-lg`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
