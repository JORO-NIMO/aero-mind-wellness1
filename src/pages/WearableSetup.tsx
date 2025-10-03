import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Watch, Loader2, Check, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const WearableSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Check if wearable already connected
    const isConnected = localStorage.getItem("aeromind_wearable_connected");
    if (isConnected === "true") {
      setConnected(true);
    }
  }, []);

  const handleConnect = () => {
    setConnecting(true);

    // Simulate connection delay
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      localStorage.setItem("aeromind_wearable_connected", "true");
      
      toast({
        title: "Wearable Connected!",
        description: "Successfully connected to your smartwatch.",
      });

      // Navigate to dashboard after short delay
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }, 2500);
  };

  const handleSkip = () => {
    localStorage.setItem("aeromind_wearable_connected", "false");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8">
        <div className="text-center space-y-6">
          {/* Icon */}
          <div className={`mx-auto inline-block p-6 rounded-full transition-colors ${
            connected ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
          }`}>
            {connected ? (
              <Check className="w-16 h-16" />
            ) : (
              <Watch className="w-16 h-16" />
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {connected ? "Wearable Connected!" : "Connect Your Wearable"}
            </h1>
            <p className="text-muted-foreground">
              {connected
                ? "Your smartwatch is successfully connected. Redirecting to dashboard..."
                : "Link your smartwatch to start monitoring your wellness metrics in real-time."}
            </p>
          </div>

          {/* Device List */}
          {!connected && !connecting && (
            <div className="space-y-3">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-2 border-primary/20">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-8 h-8 text-primary" />
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Apple Watch Series 9</h3>
                    <p className="text-sm text-muted-foreground">Available nearby</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <Watch className="w-8 h-8 text-muted-foreground" />
                  <div className="text-left">
                    <h3 className="font-semibold text-foreground">Garmin Forerunner</h3>
                    <p className="text-sm text-muted-foreground">Available nearby</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Connecting State */}
          {connecting && (
            <div className="py-8">
              <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-foreground font-medium">Connecting to Apple Watch...</p>
              <p className="text-sm text-muted-foreground mt-2">Please wait while we sync your data.</p>
            </div>
          )}

          {/* Action Buttons */}
          {!connected && (
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleConnect}
                className="w-full"
                size="lg"
                disabled={connecting}
              >
                {connecting ? "Connecting..." : "Connect Apple Watch"}
              </Button>

              <Button
                onClick={handleSkip}
                variant="ghost"
                className="w-full"
                disabled={connecting}
              >
                Skip for Now
              </Button>
            </div>
          )}

          {/* Note */}
          <p className="text-xs text-muted-foreground pt-4">
            {connected
              ? "You can change your wearable settings anytime from the dashboard."
              : "For this demo, we'll simulate wearable data. In production, we'd connect to real devices via Bluetooth or APIs."}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WearableSetup;
