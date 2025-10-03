import { useState, useEffect } from "react";
import { Wind, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BreathingExercise = ({ isOpen, onClose }: BreathingExerciseProps) => {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [countdown, setCountdown] = useState(4);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(false);
      setPhase("inhale");
      setCountdown(4);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isActive || !isOpen) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Move to next phase
        if (phase === "inhale") {
          setPhase("hold");
          return 4;
        } else if (phase === "hold") {
          setPhase("exhale");
          return 6;
        } else {
          setPhase("inhale");
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, isOpen]);

  const getPhaseText = () => {
    if (phase === "inhale") return "Breathe In";
    if (phase === "hold") return "Hold";
    return "Breathe Out";
  };

  const getCircleSize = () => {
    if (phase === "inhale") return "scale-150";
    if (phase === "hold") return "scale-150";
    return "scale-100";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-primary" />
            Breathing Exercise
          </DialogTitle>
        </DialogHeader>

        <div className="py-8">
          <div className="relative flex items-center justify-center h-64">
            {/* Animated circle */}
            <div
              className={`
                absolute w-32 h-32 rounded-full bg-gradient-primary opacity-30
                transition-transform duration-[4000ms] ease-in-out
                ${getCircleSize()}
              `}
            />
            
            <div className="relative z-10 text-center">
              <div className="text-5xl font-bold text-primary mb-2">{countdown}</div>
              <div className="text-xl font-medium text-foreground">{getPhaseText()}</div>
            </div>
          </div>

          <div className="text-center space-y-4">
            {!isActive ? (
              <Button onClick={() => setIsActive(true)} className="w-full" size="lg">
                Start Exercise
              </Button>
            ) : (
              <Button onClick={() => setIsActive(false)} variant="outline" className="w-full" size="lg">
                Pause
              </Button>
            )}
            
            <p className="text-sm text-muted-foreground">
              Follow the breathing pattern to reduce stress and improve focus.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
