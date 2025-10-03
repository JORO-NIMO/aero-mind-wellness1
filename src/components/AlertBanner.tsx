import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AlertBannerProps {
  score: number;
}

export const AlertBanner = ({ score }: AlertBannerProps) => {
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
    <Alert className="border-critical bg-critical/10">
      <AlertCircle className="h-5 w-5 text-critical" />
      <AlertDescription className="text-critical-foreground ml-2">
        <strong>❌ Pilot may be unfit for flight.</strong> Please consult with a medical professional immediately.
      </AlertDescription>
    </Alert>
  );
};
