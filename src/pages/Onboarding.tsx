import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    airline: "",
    role: "",
    restHours: "",
    compliance: "",
    metrics: {
      heartRate: true,
      sleep: true,
      stress: true,
      steps: true,
    },
  });

  useEffect(() => {
    // Require login first
    const isLoggedIn = localStorage.getItem("aeromind_logged_in");
    if (isLoggedIn !== "true") {
      navigate("/login");
      return;
    }

    // Check if already onboarded
    const isOnboarded = localStorage.getItem("aeromind_onboarded");
    if (isOnboarded === "true") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Save to localStorage
      const existing = localStorage.getItem("aeromind_user");
      const prev = existing ? JSON.parse(existing) : {};
      localStorage.setItem("aeromind_user", JSON.stringify({ ...prev, ...formData }));
      localStorage.setItem("aeromind_onboarded", "true");
      // Navigate directly to dashboard - wearable can be connected later
      navigate("/");
    }
  };

  const canProceed = () => {
    if (step === 1) return true;
    if (step === 2) return formData.name && formData.airline && formData.role && formData.restHours;
    if (step === 3) return formData.compliance;
    if (step === 4) return Object.values(formData.metrics).some(v => v);
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className={`w-full max-w-2xl p-8 transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= s
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {step > s ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 5 && (
                <div
                  className={`h-1 w-12 mx-2 ${
                    step > s ? "bg-primary" : "bg-secondary"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <div className="bg-gradient-primary text-white p-6 rounded-lg inline-block">
              <Plane className="w-16 h-16" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Welcome to AeroMind</h1>
            <p className="text-lg text-muted-foreground">
              Your Personal Mental Health Assistant for Pilots
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              Monitor your wellness, track metrics from your wearable, and ensure you're always fit to fly.
            </p>
          </div>
        )}

        {/* Step 2: User Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about yourself</h2>
              <p className="text-muted-foreground">We'll use this to personalize your experience.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Mike Makula"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="airline">Airline</Label>
                <Input
                  id="airline"
                  placeholder="e.g., Uganda Airlines"
                  value={formData.airline}
                  onChange={(e) => setFormData({ ...formData, airline: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="captain">Captain</SelectItem>
                    <SelectItem value="first-officer">First Officer</SelectItem>
                    <SelectItem value="trainee">Trainee Pilot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="restHours">Typical Rest Hours per Night</Label>
                <Input
                  id="restHours"
                  type="number"
                  placeholder="7"
                  value={formData.restHours}
                  onChange={(e) => setFormData({ ...formData, restHours: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Compliance Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Regulatory Compliance</h2>
              <p className="text-muted-foreground">Select your airline's regulatory authority.</p>
            </div>

            <div className="space-y-3">
              {[
                { key: "UCAA", label: "UCAA", desc: "Uganda Civil Aviation Authority" },
                { key: "KCAA", label: "KCAA", desc: "Kenya Civil Aviation Authority" },
                { key: "TCAA", label: "TCAA", desc: "Tanzania Civil Aviation Authority" },
              ].map((compliance) => (
                <Card 
                  key={compliance.key} 
                  className={`p-4 cursor-pointer hover:shadow-md transition-all ${
                    formData.compliance === compliance.key ? "border-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, compliance: compliance.key })}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.compliance === compliance.key 
                        ? "border-primary bg-primary" 
                        : "border-muted-foreground"
                    }`}>
                      {formData.compliance === compliance.key && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{compliance.label}</h3>
                      <p className="text-sm text-muted-foreground">{compliance.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Metrics Selection */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Choose metrics to track</h2>
              <p className="text-muted-foreground">Select what you want to monitor from your wearable.</p>
            </div>

            <div className="space-y-4">
              {[
                { key: "heartRate", label: "Heart Rate", desc: "Monitor your resting and active heart rate" },
                { key: "sleep", label: "Sleep Quality", desc: "Track your sleep duration and quality" },
                { key: "stress", label: "Stress Levels", desc: "Measure stress throughout the day" },
                { key: "steps", label: "Step Count", desc: "Daily activity and movement tracking" },
              ].map((metric) => (
                <Card key={metric.key} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={formData.metrics[metric.key as keyof typeof formData.metrics]}
                      onCheckedChange={(checked) =>
                        setFormData({
                          ...formData,
                          metrics: { ...formData.metrics, [metric.key]: checked },
                        })
                      }
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{metric.label}</h3>
                      <p className="text-sm text-muted-foreground">{metric.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="text-center space-y-6">
            <div className="bg-success/10 text-success p-6 rounded-lg inline-block">
              <Check className="w-16 h-16" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">Setup Complete!</h2>
            <p className="text-lg text-muted-foreground">
              Welcome aboard, {formData.name}! Let's start monitoring your wellness.
            </p>
            <div className="bg-secondary p-4 rounded-lg text-left max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">Your profile:</p>
              <p className="text-foreground"><strong>Airline:</strong> {formData.airline}</p>
              <p className="text-foreground"><strong>Role:</strong> {formData.role}</p>
              <p className="text-foreground"><strong>Compliance:</strong> {formData.compliance}</p>
              <p className="text-foreground"><strong>Rest Hours:</strong> {formData.restHours} hrs/night</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed()}>
            {step === 5 ? "Complete Setup" : "Next"}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Onboarding;
