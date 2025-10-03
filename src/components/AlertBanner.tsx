import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, AlertTriangle, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AlertBannerProps {
  score: number;
}

export const AlertBanner = ({ score }: AlertBannerProps) => {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);

  useEffect(() => {
    if (score < 40) {
      setShowEmergencyDialog(true);
    }
  }, [score]);
  if (score > 70) {
    return (
      <Alert className="border-success bg-success/10">
        <CheckCircle className="h-5 w-5 text-success" />
        <AlertDescription className="text-success-foreground ml-2">
          <strong>✅ You are fit to fly.</strong> Your wellness metrics indicate you're in excellent condition.
        </AlertDescription>
      </Alert>
    );
  }

  if (score >= 40) {
    return (
      <Alert className="border-warning bg-warning/10">
        <AlertTriangle className="h-5 w-5 text-warning" />
        <AlertDescription className="text-warning-foreground ml-2">
          <strong>⚠️ You may be fatigued.</strong> Consider taking a rest before your next flight.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Alert className="border-critical bg-critical/10">
        <AlertCircle className="h-5 w-5 text-critical" />
        <AlertDescription className="text-critical-foreground ml-2">
          <strong>❌ Pilot may be unfit for flight.</strong> Please consult with a medical professional immediately.
        </AlertDescription>
      </Alert>

      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="border-critical">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-critical">
              <AlertCircle className="w-6 h-6" />
              Emergency Alert: Critical Wellness Level
            </DialogTitle>
            <DialogDescription>
              Your wellness score has dropped to a critical level ({score}/100).
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-critical/10 border border-critical/20 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Immediate Actions Required:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🚫 <strong>Do not operate aircraft</strong> - You are not cleared for duty</li>
                <li>🏥 Contact your aviation medical examiner immediately</li>
                <li>📞 Inform your flight operations manager</li>
                <li>😴 Get immediate rest in a safe environment</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowEmergencyDialog(false)}
              >
                I Understand
              </Button>
              <Button 
                className="flex-1 bg-critical hover:bg-critical/90"
                onClick={() => {
                  // In a real app, this would contact emergency services
                  alert("Emergency services contacted. Help is on the way.");
                  setShowEmergencyDialog(false);
                }}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
