import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, RefreshCw, Wind, Watch, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { WellnessScore } from "@/components/WellnessScore";
import { WearableData } from "@/components/WearableData";
import { MoodCheckIn } from "@/components/MoodCheckIn";
import { AlertBanner } from "@/components/AlertBanner";
import { BreathingExercise } from "@/components/BreathingExercise";
import { HistoryChart } from "@/components/HistoryChart";
import { DemoControls } from "@/components/DemoControls";
import { AIInsights } from "@/components/AIInsights";
import { GamificationBadges } from "@/components/GamificationBadges";
import { Sidebar } from "@/components/Sidebar";
import { useToast } from "@/hooks/use-toast";
import { useWearable } from "@/contexts/WearableContext";

const generateMockData = (baseScore?: number) => {
  const score = baseScore ?? Math.floor(Math.random() * 100);
  return {
    score,
    heartRate: score > 70 ? 65 + Math.floor(Math.random() * 15) : 
               score >= 40 ? 75 + Math.floor(Math.random() * 20) : 
               85 + Math.floor(Math.random() * 25),
    sleepHours: score > 70 ? 7 + Math.random() * 2 :
                score >= 40 ? 5 + Math.random() * 2 :
                3 + Math.random() * 2,
    steps: score > 70 ? 8000 + Math.floor(Math.random() * 4000) :
           score >= 40 ? 4000 + Math.floor(Math.random() * 4000) :
           1000 + Math.floor(Math.random() * 3000),
  };
};

const generateHistory = (currentScore: number) => {
  const history = [];
  const dates = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];
  
  for (let i = 0; i < 7; i++) {
    const variance = Math.random() * 30 - 15;
    const score = Math.max(0, Math.min(100, currentScore + variance));
    history.push({
      date: dates[i],
      score: Math.floor(score),
    });
  }
  
  history[6].score = currentScore;
  return history;
};

const Index = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(generateMockData(75));
  const [history, setHistory] = useState(generateHistory(75));
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [userName, setUserName] = useState("Pilot");
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();
  const { isConnected: wearableConnected, isConnecting: connectingWearable, connectWearable } = useWearable();

  // Check onboarding status on mount
  useEffect(() => {
    const isOnboarded = localStorage.getItem("aeromind_onboarded");
    if (isOnboarded !== "true") {
      navigate("/onboarding");
      return;
    }

    // Load user data
    const userData = localStorage.getItem("aeromind_user");
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || "Pilot");
    }

    // Load profile photo
    const savedPhoto = localStorage.getItem("aeromind_profile_photo");
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, [navigate]);

  useEffect(() => {
    setHistory(generateHistory(data.score));
  }, [data.score]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const refreshData = () => {
    const newData = generateMockData();
    setData(newData);
    toast({
      title: "Data Refreshed",
      description: "Wearable data has been updated with new readings.",
    });
  };

  const handleMoodSubmit = (mood: number) => {
    const moodImpact = (mood - 5) * 3;
    const newScore = Math.max(0, Math.min(100, data.score + moodImpact));
    setData({ ...data, score: Math.floor(newScore) });
    toast({
      title: "Mood Recorded",
      description: "Your wellness score has been updated based on your mood.",
    });
  };

  const setHealthy = () => {
    setData(generateMockData(85));
    toast({ title: "Demo Mode", description: "Set to Healthy state (85)" });
  };

  const setStressed = () => {
    setData(generateMockData(55));
    toast({ title: "Demo Mode", description: "Set to Stressed state (55)" });
  };

  const setCritical = () => {
    setData(generateMockData(25));
    toast({ title: "Demo Mode", description: "Set to Critical state (25)" });
  };

  const handleConnectWearable = () => {
    connectWearable();
    
    toast({
      title: "Wearable Connected!",
      description: "Successfully connected to your smartwatch. Data is now being tracked.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar 
        userName={userName} 
        wearableConnected={wearableConnected} 
        wellnessScore={data.score}
        profilePhoto={profilePhoto}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-80 min-h-screen">
        {/* Header */}
        <header className="bg-gradient-primary text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Plane className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">AeroMind</h1>
                  <p className="text-white/80 text-sm">Welcome back, {userName}!</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={() => setBreathingOpen(true)}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <Wind className="w-4 h-4 mr-2" />
                  Breathing Exercise
                </Button>
                
                <Button
                  onClick={refreshData}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className={`container mx-auto px-6 py-8 space-y-8 max-w-7xl transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
        {/* Alert Banner */}
        <AlertBanner score={data.score} />

        {/* Wellness Score & Mood Check-in */}
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 transform transition-all duration-500 ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
          <div className="lg:col-span-2">
            <WellnessScore score={data.score} />
          </div>
          <div>
            <MoodCheckIn onMoodSubmit={handleMoodSubmit} />
          </div>
        </div>

        {/* Wearable Data or Connect Button */}
        {wearableConnected ? (
          <WearableData
            heartRate={data.heartRate}
            sleepHours={data.sleepHours}
            steps={data.steps}
          />
        ) : (
          <Card className={`p-8 text-center bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 transition-all duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <div className="space-y-4">
              <div className="bg-primary/20 p-4 rounded-full inline-block">
                <Watch className="w-12 h-12 text-primary" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Connect Your Wearable
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Connect your smartwatch to start monitoring your wellness metrics in real-time.
                </p>
              </div>

              {connectingWearable ? (
                <div className="py-4">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                  <p className="text-foreground font-medium">Connecting to Apple Watch...</p>
                  <p className="text-sm text-muted-foreground mt-1">Please wait while we sync your data.</p>
                </div>
              ) : (
                <Button
                  onClick={handleConnectWearable}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 active:scale-[0.99] transition-transform"
                >
                  <Watch className="w-4 h-4 mr-2" />
                  Connect Wearable
                </Button>
              )}

              <p className="text-xs text-muted-foreground pt-2">
                For this demo, we'll simulate wearable data. In production, we'd connect to real devices via Bluetooth or APIs.
              </p>
            </div>
          </Card>
        )}

        {/* AI Insights */}
        <AIInsights 
          heartRate={data.heartRate}
          sleepHours={data.sleepHours}
          score={data.score}
        />

        {/* Gamification Badges */}
        <GamificationBadges history={history} score={data.score} />

        {/* History Chart */}
        <HistoryChart history={history} />

        {/* Demo Controls */}
        <DemoControls
          onSetHealthy={setHealthy}
          onSetStressed={setStressed}
          onSetCritical={setCritical}
        />
      </main>

      {/* Breathing Exercise Modal */}
      <BreathingExercise isOpen={breathingOpen} onClose={() => setBreathingOpen(false)} />

        {/* Footer */}
        <footer className="bg-secondary border-t border-border mt-12 py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              AeroMind © 2025 · Hackathon Demo Project · Not for actual medical use
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
