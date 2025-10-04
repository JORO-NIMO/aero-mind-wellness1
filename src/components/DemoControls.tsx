import { Zap, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DemoControlsProps {
  onSetHealthy: () => void;
  onSetStressed: () => void;
  onSetCritical: () => void;
}

export const DemoControls = ({ onSetHealthy, onSetStressed, onSetCritical }: DemoControlsProps) => {
  return (
    <Card className="p-6 bg-secondary/50 border-2 border-dashed">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Demo Controls</h3>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Quickly set wellness state for demonstration purposes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Button
          onClick={onSetHealthy}
          variant="outline"
          className="border-success text-success hover:bg-success hover:text-success-foreground"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Set Healthy (85)
        </Button>
        
        <Button
          onClick={onSetStressed}
          variant="outline"
          className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
        >
          <AlertTriangle className="w-4 h-4 mr-2" />
          Set Stressed (55)
        </Button>
        
        <Button
          onClick={onSetCritical}
          variant="outline"
          className="border-critical text-critical hover:bg-critical hover:text-critical-foreground"
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Set Critical (25)
        </Button>
      </div>
    </Card>
  );
};
